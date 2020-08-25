import { SET_ERROR, REMOVE_ERROR } from "../actions/types";

export default function (
  state = {
    showError: false,
    title: null,
    msg: null,
  },
  action
) {
  switch (action.type) {
    case SET_ERROR:
      return {
        showError: true,
        title: action.errorData.title,
        msg: action.errorData.msg,
      };

    case REMOVE_ERROR:
      return {
        showError: false,
        title: null,
        msg: null,
      };

    default:
      return state;
  }
}
