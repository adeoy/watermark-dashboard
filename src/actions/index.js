import axios from 'axios';

export const actions = {
  setInitialState: 'SET_INITIAL_STATE',

  addSale: 'ADD_SALE',

  setModalOpen: 'SET_MODAL_OPEN',
  setError: 'SET_ERROR',
};

export const setInitialState = payload => ({
  type: actions.setInitialState,
  payload,
});

export const addSale = payload => ({
  type: actions.addSale,
  payload,
});

export const setModalOpen = payload => ({
  type: actions.setModalOpen,
  payload,
});

export const setError = payload => ({
  type: actions.setError,
  payload,
});

export const getInitialState = () => {
  return (dispatch) => {
    Promise.all([
      axios.get('https://consultaunica.mx/watermark/sales/'),
      axios.get('https://consultaunica.mx/watermark/products/'),
      axios.get('https://consultaunica.mx/watermark/prices_rules/'),
      axios.get('https://consultaunica.mx/watermark/offers/'),
      axios.get('https://consultaunica.mx/watermark/routes/'),
      axios.get('https://consultaunica.mx/watermark/employees/'),
    ]).then(([sales, products, pricesRules, offers, routes, employees]) => {
      dispatch(setInitialState({
        sales: sales.data.data,
        staticData: {
          products: products.data.data,
          pricesRules: pricesRules.data.data,
          offers: offers.data.data,
          routes: routes.data.data,
          employees: employees.data.data,
        }
      }));
    });
  };
}

export const uploadSale = (sale) => {
  return (dispatch) => {
    axios.post('https://consultaunica.mx/watermark/sales/', sale)
      .then(({ status, data }) => {
        if (status === 201) {
          dispatch(addSale(data.data));
        }
      });
  };
}