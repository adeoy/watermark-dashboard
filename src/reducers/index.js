import { actions } from '../actions';

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
    case actions.setModalOpen:
      return {
        ...state,
        modalOpen: action.payload,
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
