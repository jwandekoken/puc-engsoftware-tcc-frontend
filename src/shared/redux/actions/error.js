import { SET_ERROR, REMOVE_ERROR } from "./types";

export const setError = (msg, title = "Ops...") => (dispatch) => {
  dispatch({
    type: SET_ERROR,
    errorData: {
      title,
      msg,
    },
  });
};

export const removeError = () => (dispatch) => {
  dispatch({
    type: REMOVE_ERROR,
  });
};
