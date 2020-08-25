import { TURN_ON_IS_LOADING, TURN_OFF_IS_LOADING } from "../actions/types";

export default function (state = false, action) {
  switch (action.type) {
    case TURN_ON_IS_LOADING:
      return true;

    case TURN_OFF_IS_LOADING:
      return false;

    default:
      return state;
  }
}
