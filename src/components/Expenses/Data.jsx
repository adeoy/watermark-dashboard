import React from "react";
import { connect } from "react-redux";
import Moment from "react-moment";

import DataView from "../Wrappers/DataView";

import { formatMoney } from "../../util/index";
import { deleteExpense } from "../../actions";
import { searchStaticData } from "../../util/local";

const Data = ({
  setForm,
  expenses,
  deleteExpense,
  setModalOpen,
  expenseTypes,
}) => {
  const better = expenses.map((item, idx) => {
    item["#"] = idx + 1;
    item["expenseType"] = searchStaticData(expenseTypes, item._id_expense_type);
    return item;
  });

  const columns = [
    { title: "#", data: "#" },
    { title: "Tipo", data: "expenseType.name" },
    { title: "Descripción", data: "description" },
    { title: "Gasto", format: (row) => formatMoney(row.payed) },
    {
      title: "Date",
      format: (row) => (
        <Moment locale="es-us" format="LL">
          {row.date}
        </Moment>
      ),
    },
  ];

  return (
    <DataView
      data={better}
      columns={columns}
      setForm={setForm}
      deleteItem={deleteExpense}
      setModalOpen={setModalOpen}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    expenses: state.expenses,
    expenseTypes: state.staticData.expenseTypes,
  };
};

const mapDispatchToProps = {
  deleteExpense,
};

export default connect(mapStateToProps, mapDispatchToProps)(Data);
