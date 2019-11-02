import { createStore } from 'redux';

const initialState = {
  aroundLocation: null,
  errorMessage: '',
  clubs: [],
};

const appReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'SET_ERROR': {
      return {
        ...state,
        errorMessage: payload,
      }
    }

    case 'CLEAR_ERROR': {
      return {
        ...state,
        errorMessage: '',
      }
    }

    case 'SET_CLUBS': {
      return {
        ...state,
        clubs: payload,
      }
    }

    case 'SET_AROUND_LOCATION': {
      return {
        ...state,
        aroundLocation: payload,
      }
    }

    default: {
      return state;
    }
  }
}

const store = createStore(
  appReducer,
);

export default store;
