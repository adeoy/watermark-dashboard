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
  setEmployee: "SET_EMPLOYEE",
  setSettings: "SET_SETTINGS",

  setModalOpen: "SET_MODAL_OPEN",
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

export const setEmployee = (payload) => ({
  type: actions.setEmployee,
  payload,
});

export const setModalOpen = (payload) => ({
  type: actions.setModalOpen,
  payload,
});

export const setError = (payload) => ({
  type: actions.setError,
  payload,
});

export const getInitialState = () => {
  return (dispatch) => {
    Promise.all([
      axios.get("https://consultaunica.mx/watermark/sales/"),
      axios.get("https://consultaunica.mx/watermark/products/"),
      axios.get("https://consultaunica.mx/watermark/prices_rules/"),
      axios.get("https://consultaunica.mx/watermark/offers/"),
      axios.get("https://consultaunica.mx/watermark/routes/"),
      axios.get("https://consultaunica.mx/watermark/employees/"),
      axios.get("https://consultaunica.mx/watermark/business_discounts/"),
      axios.get("https://consultaunica.mx/watermark/employee_types/"),
    ])
      .then(([sales, products, pricesRules, offers, routes, employees, businessDiscounts, employeeTypes]) => {
        dispatch(
          setInitialState({
            sales: sales.data.data,
            staticData: {
              products: products.data.data,
              pricesRules: pricesRules.data.data,
              offers: offers.data.data,
              routes: routes.data.data,
              employees: employees.data.data,
              businessDiscounts: businessDiscounts.data.data,
              employeeTypes: employeeTypes.data.data,
            },
          })
        );
      })
      .catch((err) => {
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
  };
};

export const uploadSale = (sale) => {
  return (dispatch) => {
    axios
      .post("https://consultaunica.mx/watermark/sales/", sale)
      .then(({ status, data }) => {
        if (status === 201) {
          dispatch(addSale(data.data));
        }
      });
  };
};


export const setSettings = (payload) => ({
  type: actions.setSettings,
  payload,
});
