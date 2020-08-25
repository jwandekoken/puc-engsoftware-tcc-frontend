import { TURN_ON_IS_LOADING, TURN_OFF_IS_LOADING } from "./types";

export const turnIsLoadingOn = () => async (dispatch) => {
  dispatch({
    type: TURN_ON_IS_LOADING,
  });
};

export const turnIsLoadingOff = () => async (dispatch) => {
  dispatch({
    type: TURN_OFF_IS_LOADING,
  });
};
