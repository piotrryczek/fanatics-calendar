import { createStore } from 'redux';

const initialState = {
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

    default: {
      return state;
    }
  }
}

const store = createStore(
  appReducer,
);

export default store;
