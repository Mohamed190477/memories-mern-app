import React, { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import useStyles from "./styles.js";
import Input from "./Input.js";
import { GoogleLogin } from "react-google-login";
import Icon from "./icon";
import { gapi } from "gapi-script";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { signup, login } from "../../actions/auth";

const Auth = () => {
  //memories-app-363722 => Project ID
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const intialState = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  useEffect(() => {
    const clientId =
      "144000848028-j8u3ff54e4elbf51cub6bnpl3b4uubfd.apps.googleusercontent.com";
    function start() {
      gapi.client.init({ clientId: clientId, scope: "" });
    }
    gapi.load("client:auth2", start);
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfrimPassword, setShowConfirmPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState(intialState);

  const state = null;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    if (isSignUp) {
      dispatch(signup(formData, history)); // we pass the history to navigate when history changes
    } else {
      dispatch(login(formData, history));
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleShowConfirmPassword = () =>
    setShowConfirmPassword((prev) => !prev);

  const switchMode = () => {
    setIsSignUp((prev) => !prev);
  };

  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;

    try {
      dispatch({ type: "AUTH", data: { result, token } });
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  //"You have created a new client application that uses libraries for user authentication or authorization that will soon be deprecated. New clients must use the new libraries instead; existing clients must also migrate before these libraries are deprecated. See the [Migration Guide](https://developers.google.com/identity/gsi/web/guides/gis-migration) for more information."

  const googleFailure = (err) => {
    console.log("Google sign in failure");
    console.log("The error object  => ", err);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">{isSignUp ? "Sign up" : "Log in"}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              gap: "20px",
            }}
          >
            {isSignUp && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  handelChange={handleChange}
                  autoFocus
                  type="text"
                  half
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  handelChange={handleChange}
                  type="text"
                  half
                />
              </>
            )}
            <Input
              name="email"
              label="Email Address"
              handelChange={handleChange}
              type="email"
            />
            <Input
              name="password"
              label="Password"
              handelChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            {isSignUp && (
              <Input
                name="confirmPassword"
                label="Confrim Password"
                handelChange={handleChange}
                type={showConfrimPassword ? "text" : "password"}
                handleShowPassword={handleShowConfirmPassword}
              />
            )}
          </div>
          <div style={{ marginTop: "20px", marginBottom: "-25px" }}>
            <GoogleLogin
              clientId="144000848028-j8u3ff54e4elbf51cub6bnpl3b4uubfd.apps.googleusercontent.com"
              onSuccess={googleSuccess}
              onFailure={googleFailure}
              cookiePolicy="single_host_origin"
              render={(renderProps) => (
                <Button
                  className={classes.googleButton}
                  color="primary"
                  fullWidth
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                  variant="contained"
                  startIcon={<Icon />}
                >
                  Sign in with Google
                </Button>
              )}
            />
          </div>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {isSignUp ? "Sign up" : "Log in"}
          </Button>
          <Grid
            container
            justifyContent="flex-end"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Grid item>
              <Button onClick={switchMode}>
                {isSignUp
                  ? "Already have an acount, Log in"
                  : "Don't have an acoount, Sign up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
