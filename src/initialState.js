const initialState = {
  sales: [],
  expenses: [],
  employee: {
    _id: "5f9ee402b157a32c178f2cdd",
    name: "Héctor Hugo",
    _id_type: "5f9ee532b157a32c178f2ca1",
    _id_route: "5f9ee46db157a32c178f2ce0",
  },
  settings: {
    _id_offer: "",
    _id_business_discount: "",
  },

  staticData: {
    products: [],
    pricesRules: [],
    offers: [],
    routes: [],
    employees: [],
    businessDiscounts: [],
  },

  modalOpen: false,
  error: false,
};

export default initialState;
