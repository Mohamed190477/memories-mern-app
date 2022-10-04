import * as api from "../api";
//action creators are async functions so we have to use redux thunk

export const login = (formData, history) => async (dispatch) => {
  try {
    // log in the user
    const { data } = await api.login(formData);
    dispatch({
      type: "AUTH",
      data: data,
    });
    // navigate to homepage
    history.push("/");
  } catch (error) {
    console.log(error);
  }
};

export const signup = (formData, history) => async (dispatch) => {
  try {
    // sign up the user
    const { data } = await api.signup(formData);
    dispatch({
      type: "AUTH",
      data: data,
    });

    // navigate to homepage
    history.push("/");
  } catch (error) {
    console.log(error);
  }
};
