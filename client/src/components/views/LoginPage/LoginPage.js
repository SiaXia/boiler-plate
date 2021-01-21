import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../../_actions/user_action";
import { withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import VpnKeyRoundedIcon from "@material-ui/icons/VpnKeyRounded";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

function LoginPage(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };
  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };
  const onSubmitHandler = (event) => {
    event.preventDefault();

    let body = {
      email: Email,
      password: Password,
    };

    dispatch(loginUser(body)).then((response) => {
      if (response.payload.loginSuccess) {
        props.history.push("/");
      } else {
        alert("Login error");
      }
    });
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={onSubmitHandler}
      >
        <h2>Log in</h2>
        <br />
        <TextField
          color="primary"
          label="Email"
          helperText="Type the e-mail form with '@'"
          variant="outlined"
          type="email"
          value={Email}
          onChange={onEmailHandler}
        />
        <br />
        <TextField
          color="primary"
          label="Password"
          helperText="Minimum 5 words"
          variant="outlined"
          type="password"
          value={Password}
          onChange={onPasswordHandler}
        />

        <br />
        <Button
          color="primary"
          className={classes.button}
          startIcon={<VpnKeyRoundedIcon />}
          type="submit"
        >
          Login
        </Button>
      </form>
    </div>
  );
}

export default withRouter(LoginPage);
