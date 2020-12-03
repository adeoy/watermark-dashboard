import { actions } from "../actions";

const reducer = (state, action) => {
  switch (action.type) {
    case actions.setInitialState:
      return {
        ...state,
        ...action.payload,
      };
    case actions.addSale:
      return {
        ...state,
        sales: [...state.sales, action.payload],
      };
    case actions.removeSale:
      return {
        ...state,
        sales: state.sales.filter((item) => item._id !== action.payload),
      };
    case actions.updateSale:
      const filtered = state.sales.filter((item) => item._id !== action.payload._id);
      return {
        ...state,
        sales: [...filtered, action.payload],
      };
    case actions.addProduct:
      return {
        ...state,
        staticData: {
          ...state.staticData,
          products: [...state.staticData.products, action.payload]
        },
      };
    case actions.removeProduct:
      return {
        ...state,
        staticData: {
          ...state.staticData,
          products: state.staticData.products.filter((item) => item._id !== action.payload),
        },
      };
    case actions.updateProduct:
      const filtered2 = state.staticData.products.filter((item) => item._id !== action.payload._id);
      return {
        ...state,
        staticData: {
          ...state.staticData,
          products: [...filtered2, action.payload],
        },
      };
    case actions.addExpense:
      return {
        ...state,
        expenses: [...state.expenses, action.payload]
      };
    case actions.removeExpense:
      return {
        ...state,
        expenses: state.expenses.filter((item) => item._id !== action.payload),
      };
    case actions.updateExpense:
      const filtered3 = state.expenses.filter((item) => item._id !== action.payload._id);
      return {
        ...state,
        expenses: [...filtered3, action.payload],
      };
    case actions.setEmployee:
      return {
        ...state,
        employee: { ...state.employee, ...action.payload },
      };
    case actions.setSettings:
      return {
        ...state,
        settings: { ...state.settings, ...action.payload }
      };
    case actions.setError:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
