import axios from "axios";

import employeesJson from "../__data__/employees.json";
import offersJson from "../__data__/offers.json";
import pricesRulesJson from "../__data__/pricesRules.json";
import productsJson from "../__data__/products.json";
import routesJson from "../__data__/routes.json";
import salesJson from "../__data__/sales.json";
import businessDiscountsJson from "../__data__/businessDiscounts.json";
import employeeTypesJson from '../__data__/employeeTypes.json';

export const actions = {
  setInitialState: "SET_INITIAL_STATE",

  addSale: "ADD_SALE",
  removeSale: "REMOVE_SALE",
  updateSale: "UPDATE_SALE",

  addProduct: "ADD_PRODUCT",
  removeProduct: "REMOVE_PRODUCT",
  updateProduct: "UPDATE_PRODUCT",

  addExpense: "ADD_EXPENSE",
  removeExpense: 'REMOVE_EXPENSE',
  updateExpense: "UPDATE_EXPENSE",

  setEmployee: "SET_EMPLOYEE",
  setSettings: "SET_SETTINGS",

  setError: "SET_ERROR",
};

export const setInitialState = (payload) => ({
  type: actions.setInitialState,
  payload,
});

export const addSale = (payload) => ({
  type: actions.addSale,
  payload,
});

export const removeSale = (payload) => ({
  type: actions.removeSale,
  payload,
});

export const updateSale = (payload) => ({
  type: actions.updateSale,
  payload,
});

export const addProduct = (payload) => ({
  type: actions.addProduct,
  payload,
});

export const removeProduct = (payload) => ({
  type: actions.removeSale,
  payload,
});

export const updateProduct = (payload) => ({
  type: actions.updateProduct,
  payload,
});

export const addExpense = (payload) => ({
  type: actions.addExpense,
  payload,
});

export const removeExpense = (payload) => ({
  type: actions.removeExpense,
  payload,
});

export const updateExpense = (payload) => ({
  type: actions.updateExpense,
  payload,
});

export const setEmployee = (payload) => ({
  type: actions.setEmployee,
  payload,
});

export const setSettings = (payload) => ({
  type: actions.setSettings,
  payload,
});

export const setError = (payload) => ({
  type: actions.setError,
  payload,
});

export const getInitialState = () => {
  return async (dispatch) => {
    Promise.all([
      axios.get("https://consultaunica.mx/watermark/employees/5f9ee402b157a32c178f2cdd"),
      axios.get("https://consultaunica.mx/watermark/sales/"),
      axios.get("https://consultaunica.mx/watermark/products/"),
      axios.get("https://consultaunica.mx/watermark/prices_rules/"),
      axios.get("https://consultaunica.mx/watermark/offers/"),
      axios.get("https://consultaunica.mx/watermark/routes/"),
      axios.get("https://consultaunica.mx/watermark/employees/"),
      axios.get("https://consultaunica.mx/watermark/business_discounts/"),
      axios.get("https://consultaunica.mx/watermark/employee_types/"),
      axios.get("https://consultaunica.mx/watermark/expenses/"),
      axios.get("https://consultaunica.mx/watermark/expense_types/"),
    ]).then(([employee, sales, products, pricesRules, offers, routes, employees, businessDiscounts, employeeTypes, expenses, expense_types]) => {
      dispatch(
        setInitialState({
          sales: sales.data.data,
          employee: employee.data.data,
          expenses: expenses.data.data,
          staticData: {
            products: products.data.data,
            pricesRules: pricesRules.data.data,
            offers: offers.data.data,
            routes: routes.data.data,
            employees: employees.data.data,
            businessDiscounts: businessDiscounts.data.data,
            employeeTypes: employeeTypes.data.data,
            expenseTypes: expense_types.data.data,
          },
        })
      );
    }).catch((err) => {
      console.log(err);
      dispatch(
        setInitialState({
          sales: salesJson.data,
          staticData: {
            products: productsJson.data,
            pricesRules: pricesRulesJson.data,
            offers: offersJson.data,
            routes: routesJson.data,
            employees: employeesJson.data,
            businessDiscounts: businessDiscountsJson.data,
            employeeTypes: employeeTypesJson.data,
          },
        })
      );
    });
  }
}

export const uploadSale = (sale) => {
  return (dispatch) => {
    axios
      .post("https://consultaunica.mx/watermark/sales/", sale)
      .then(({ status, data }) => {
        if (status === 201) {
          dispatch(addSale({ _id: data.data, ...sale }));
        }
      });
  };
};

export const patchEmployee = (_id, employee) => {
  return (dispatch) => {
    axios
      .patch(`https://consultaunica.mx/watermark/employees/${_id}`, employee)
      .then(({ status }) => {
        if (status === 200) {
          dispatch(setEmployee(employee));
        }
      });
  };
};

export const deleteSale = (_id) => {
  return (dispatch) => {
    axios
      .delete(`https://consultaunica.mx/watermark/sales/${_id}`)
      .then(({ status }) => {
        if (status === 200) {
          dispatch(removeSale(_id));
        }
      });
  };
};

export const putSale = (sale) => {
  return (dispatch) => {
    const _id = sale._id;
    delete sale['#'];
    delete sale._id;
    delete sale.employee;
    delete sale.product;
    axios
      .put(`https://consultaunica.mx/watermark/sales/${_id}`, sale)
      .then(({ status }) => {
        if (status === 200) {
          dispatch(updateSale({ _id: _id, ...sale }));
        }
      });
  };
};

export const deleteProduct = (_id) => {
  return (dispatch) => {
    axios
      .delete(`https://consultaunica.mx/watermark/products/${_id}`)
      .then(({ status }) => {
        if (status === 200) {
          dispatch(removeProduct(_id));
        }
      });
  };
};

export const deleteExpense = (_id) => {
  return (dispatch) => {
    axios
      .delete(`https://consultaunica.mx/watermark/expenses/${_id}`)
      .then(({ status }) => {
        if (status === 200) {
          dispatch(removeExpense(_id));
        }
      });
  };
};



export const putExpense = (expense) => {
  return (dispatch) => {
    const _id = expense._id;
    delete expense['#'];
    delete expense._id;
    delete expense.expenseType;
    axios
      .put(`https://consultaunica.mx/watermark/expenses/${_id}`, expense)
      .then(({ status }) => {
        if (status === 200) {
          dispatch(updateExpense({ _id: _id, ...expense }));
        }
      });
  };
};

export const uploadExpense = (expense) => {
  return (dispatch) => {
    axios
      .post("https://consultaunica.mx/watermark/expenses/", expense)
      .then(({ status, data }) => {
        if (status === 201) {
          dispatch(addExpense({ _id: data.data, ...expense }));
        }
      });
  };
};