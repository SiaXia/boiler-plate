import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../../../_actions/user_action";
import { withRouter } from "react-router-dom";
import { makeStyles,  withStyles, } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import { green } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

function RegisterPage(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [Email, setEmail] = useState("");
  const [Name, setName] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };
  const onNameHandler = (event) => {
    setName(event.currentTarget.value);
  };
  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };
  const onConfirmPasswordHandler = (event) => {
    setConfirmPassword(event.currentTarget.value);
  };
  const onSubmitHandler = (event) => {
    event.preventDefault();

    if (Password !== ConfirmPassword) {
      return alert("Passwords are not the same");
    }
    let body = {
      email: Email,
      password: Password,
      name: Name,
    };

    dispatch(registerUser(body)).then((response) => {
      if (response.payload.success) {
        props.history.push("/login");
      } else {
        alert("Failed to sign up");
      }
    });
  };
  const ColorButton = withStyles((theme) => ({
    root: {
      color: theme.palette.getContrastText(green[500]),
      color: green[700],
      "&:hover": {
        backgroundColor: green[100],
      },
    },
  }))(Button);
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
        <h2>Sign up</h2>
        <br />
        <TextField
          label="Email"
          helperText="Type the email form with '@'"
          variant="outlined"
          type="email"
          value={Email}
          onChange={onEmailHandler}
        />
        <br />
        <TextField
          label="Name"
          helperText=""
          variant="outlined"
          type="text"
          value={Name}
          onChange={onNameHandler}
        />
        <br />
        <TextField
          label="Password"
          helperText="Minimum 5 words"
          variant="outlined"
          type="password"
          value={Password}
          onChange={onPasswordHandler}
        />
        <br />
        <TextField
          label="Confirm Password"
          helperText="Repeat the password you typed"
          variant="outlined"
          type="password"
          value={ConfirmPassword}
          onChange={onConfirmPasswordHandler}
        />
        <br />
        <ColorButton
          color="primary"
          className={classes.button}
          startIcon={<AssignmentIndIcon />}
          type="submit"
        >
          Register
        </ColorButton>
      </form>
    </div>
  );
}

export default withRouter(RegisterPage);
