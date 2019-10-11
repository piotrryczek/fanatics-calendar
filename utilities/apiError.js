import store from 'root/config/store';

class ApiError {
  constructor(error) {
    const action = {
      type: 'SET_ERROR',
    };

    if (!error.response) {
      Object.assign(action, {
        payload: 'NETWORK_ERROR',
      });
    } else if (!error.response.data) {
      Object.assign(action, {
        payload: 'UNKNOWN_ERROR',
      });
    } else {
      const { response: { data: { type: errorType } } } = error;

      Object.assign(action, {
        payload: 'errorType',
      });
    }

    store.dispatch(action);
  }
}

export default ApiError;
