import { LOGIN_USER, LOGOUT_USER } from "../actions/types";

// the cart state gonna be an object of product objects, with their quantities
export default (
  state = {
    isLoggedIn: false,
    token: null,
    userData: null,
  },
  action
) => {
  switch (action.type) {
    case LOGIN_USER:
      return {
        isLoggedIn: true,
        token: action.token,
        userData: action.userData,
      };

    case LOGOUT_USER:
      return {
        isLoggedIn: false,
        token: null,
        userData: null,
      };

    default:
      return state;
  }
};
