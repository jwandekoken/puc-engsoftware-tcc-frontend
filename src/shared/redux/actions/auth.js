import {
  LOGIN_USER,
  LOGOUT_USER,
  TURN_ON_IS_LOADING,
  TURN_OFF_IS_LOADING,
  SET_ERROR,
} from "./types";

// make request to log in user, store data at localStorage and set user data on redux store
export const logInUser = (email, password) => async (dispatch) => {
  // set isLoading to true
  dispatch({
    type: TURN_ON_IS_LOADING,
  });

  let responseData;
  try {
    const response = await fetch("http://localhost:5000/api/usuarios/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    responseData = await response.json();
    console.log(responseData);

    if (responseData.error) {
      // set Error
      dispatch({
        type: SET_ERROR,
        errorData: {
          title: "Erro ao logar",
          msg: responseData.error,
        },
      });
    } else {
      // set userData at localStorage
      localStorage.setItem(
        "userData",
        JSON.stringify({
          token: responseData.token,
        })
      );

      dispatch({
        type: LOGIN_USER,
        token: responseData.token,
      });
    }
  } catch (error) {
    console.log(error);
    // set Error
    dispatch({
      type: SET_ERROR,
      errorData: {
        title: "Erro ao logar",
        msg: error,
      },
    });
  }

  // set isLoading to false
  dispatch({
    type: TURN_OFF_IS_LOADING,
  });
};

export const autoLogInUser = () => (dispatch) => {
  const storedData = JSON.parse(localStorage.getItem("userData"));

  if (storedData && storedData.token) {
    dispatch({
      type: LOGIN_USER,
      token: storedData.token,
    });
  }
};

export const logOffUser = () => (dispatch) => {
  localStorage.removeItem("userData");

  dispatch({
    type: LOGOUT_USER,
  });
};
