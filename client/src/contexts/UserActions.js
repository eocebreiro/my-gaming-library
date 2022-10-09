import axios from "axios";
import { setAuthToken } from "../utils/setAuthToken";

const { REACT_APP_BASE_URL } = process.env;

// Toggle between the register component and login component in the landing page
export const toggleComponent = (dispatch, component) => {
  dispatch({ type: "SET_COMPONENT", payload: { component } });
};

// Axios call to register a user
export const registerUser = async (dispatch, name, email, password) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ name, email, password });

  try {
    const res = await axios.post(
      REACT_APP_BASE_URL + "/api/user",
      body,
      config
    );
    dispatch({ type: "REGISTER_SUCCESS", payload: res.data });
  } catch (err) {
    dispatch({ type: "REGISTER_FAIL" });
  }
};

// Load User
export const loadUser = async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get(REACT_APP_BASE_URL + "/api/auth");

    dispatch({ type: "USER_LOADED", payload: res.data });
    console.log(res.data);
  } catch (err) {
    dispatch({ type: "AUTH_ERROR" });
  }
};
