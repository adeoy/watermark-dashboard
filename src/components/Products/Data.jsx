import React from "react";
import { connect } from "react-redux";

import DataView from '../Wrappers/DataView';

import { formatMoney } from "../../util/index";
import { deleteProduct } from "../../actions";

const Data = ({ setForm, staticData, deleteProduct, setModalOpen }) => {
  const better = staticData.products.map((sale, idx) => {
    sale["#"] = idx + 1;
    return sale;
  });

  const columns = [
    { title: "#", data: "#" },
    { title: "Product", data: "name" },
    {
      title: "Image",
      format: (row) => (
        <img
          src={row.image}
          alt={row.name}
          style={{ maxWidth: "48px" }}
        />
      ),
    },
    { title: "Slug", data: "slug" },
    { title: "Price", format: (row) => formatMoney(row.price) },
    { title: "Comision", format: (row) => formatMoney(row.comision) },
  ];

  return (
    <DataView
      data={better}
      columns={columns}
      setForm={setForm}
      deleteItem={deleteProduct}
      setModalOpen={setModalOpen}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    staticData: state.staticData,
  };
};

const mapDispatchToProps = {
  deleteProduct,
};

export default connect(mapStateToProps, mapDispatchToProps)(Data);
