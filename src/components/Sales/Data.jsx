import React from "react";
import { connect } from "react-redux";
import Moment from "react-moment";

import DataView from '../Wrappers/DataView';

import { searchStaticData } from "../../util/local";
import { formatMoney } from "../../util/index";
import { deleteSale } from "../../actions";

const Data = ({ setForm, sales, staticData, deleteSale, setModalOpen }) => {
  const betterSales = sales.map((sale, idx) => {
    sale["#"] = idx + 1;
    sale["employee"] = searchStaticData(staticData.employees, sale._id_employee);
    //sale["offer"] = searchStaticData(staticData.offers, sale._id_offer);
    sale["product"] = searchStaticData(staticData.products, sale._id_product);
    //sale["priceRule"] = searchStaticData(staticData.pricesRules, sale._id_rule);
    return sale;
  });

  const columns = [
    { title: "#", data: "#" },
    { title: "Product", data: "product.name" },
    {
      title: "Image",
      format: (row) => (
        <img
          src={row.product.image}
          alt={row.product.name}
          style={{ maxWidth: "48px" }}
        />
      ),
    },
    { title: "Units", data: "units" },
    { title: "Total Cost", format: (row) => formatMoney(row.total_cost) },
    { title: "Pay Received", format: (row) => formatMoney(row.pay_received) },
    { title: "Employee Name", data: "employee.name" },
    {
      title: "Date",
      format: (row) => <Moment locale="es-us" format="LLLL">{row.date}</Moment>,
    },
  ];

  return (
    <DataView
      data={betterSales}
      columns={columns}
      setForm={setForm}
      deleteItem={deleteSale}
      setModalOpen={setModalOpen}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    sales: state.sales,
    staticData: state.staticData,
  };
};

const mapDispatchToProps = {
  deleteSale
};

export default connect(mapStateToProps, mapDispatchToProps)(Data);
