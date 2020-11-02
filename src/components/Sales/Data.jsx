import React from "react";
import { connect } from "react-redux";
import DataTable from "@bit/adeoy.utils.data-table";
import Moment from "react-moment";

import { searchStaticData } from "../../util/local";
import { formatMoney } from "../../util/index";

const Data = ({ sales, staticData }) => {
  const betterSales = sales.map((sale, idx) => {
    sale["#"] = idx + 1;
    sale["employee"] = searchStaticData(
      staticData.employees,
      sale._id_employee
    );
    sale["offer"] = searchStaticData(staticData.offers, sale._id_offer);
    sale["product"] = searchStaticData(staticData.products, sale._id_product);
    sale["priceRule"] = searchStaticData(staticData.pricesRules, sale._id_rule);
    return sale;
  });

  const columns = [
    { title: "#", data: "#" },
    { title: "Product", data: "product.name" },
    {
      title: "Image",
      data: "product.image",
      format: (src) => (
        <img src={src} alt="Producto" style={{ maxWidth: "48px" }} />
      ),
    },
    { title: "Units", data: "units" },
    { title: "Total Cost", data: "total_cost", format: formatMoney },
    { title: "Pay Received", data: "pay_received", format: formatMoney },
    { title: "Employee Name", data: "employee.name" },
    {
      title: "Date",
      data: "date",
      format: (date) => <Moment locale="es-us">{date}</Moment>,
    },
  ];

  const click = (row) => {
    console.log(row);
  };

  return (
    <DataTable
      data={betterSales}
      columns={columns}
      striped={true}
      hover={true}
      responsive={true}
      onClickRow={click}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    sales: state.sales,
    staticData: state.staticData,
  };
};

export default connect(mapStateToProps, null)(Data);
