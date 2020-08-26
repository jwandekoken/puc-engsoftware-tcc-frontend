import { LOGIN_USER, LOGOUT_USER } from "../actions/types";

// the cart state gonna be an object of product objects, with their quantities
export default (
  state = {
    isLoggedIn: false,
    token: null,
  },
  action
) => {
  switch (action.type) {
    case LOGIN_USER:
      return {
        isLoggedIn: true,
        token: action.token,
      };

    case LOGOUT_USER:
      return {
        isLoggedIn: false,
        token: null,
      };

    default:
      return state;
  }
};
