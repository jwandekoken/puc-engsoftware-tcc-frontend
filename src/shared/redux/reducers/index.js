import { combineReducers } from "redux";
// reducers
import auth from "./auth";
import isLoading from "./is-loading";
import error from "./error";

export default combineReducers({
  isLoading,
  error,
  auth,
});
