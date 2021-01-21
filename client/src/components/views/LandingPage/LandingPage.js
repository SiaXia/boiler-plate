import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import {
  makeStyles,
  withStyles,
} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import ExitToAppRoundedIcon from "@material-ui/icons/ExitToAppRounded";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import VpnKeyRoundedIcon from "@material-ui/icons/VpnKeyRounded";
import Grid from "@material-ui/core/Grid";
import { green } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

function LandingPage(props) {
  let loginButton = React.createRef();
  let registerButton = React.createRef();
  let logoutButton = React.createRef();
  const classes = useStyles();
  useEffect(() => {
    axios.get("/api/hello").then((response) => console.log(response));
  }, []);

  axios.get("/api/users/auth").then((response) => {
    if (response.data._id) {
      loginButton.current.hidden = true;
      registerButton.current.hidden = true;
      logoutButton.current.hidden = false;
    } else {
      loginButton.current.hidden = false;
      registerButton.current.hidden = false;
      logoutButton.current.hidden = true;
    }
  });

  const loginHandler = (button) => {
    props.history.push("/login");
  };

  const logoutHandler = (button) => {
    axios.get("/api/users/logout").then((response) => {
      if (response.data.success) {
        props.history.push("/login");
      } else {
        alert("Failed to log out");
      }
    });
  };

  const registerHandler = (button) => {
    props.history.push("/register");
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
      <div style={{ display: "flex", flexDirection: "column" }}>
        <h1 style={{ fontSize: "60px" }}>Landing Page</h1>
        <br />
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          spacing={3}
        >
          <Button
            color="primary"
            className={classes.button}
            startIcon={<VpnKeyRoundedIcon />}
            onClick={loginHandler}
            ref={loginButton}
          >
            Login
          </Button>
          <ColorButton
            color="primary"
            className={classes.button}
            startIcon={<AssignmentIndIcon />}
            onClick={registerHandler}
            ref={registerButton}
          >
            Register
          </ColorButton>
        </Grid>
        <Button
          color="secondary"
          className={classes.button}
          startIcon={<ExitToAppRoundedIcon />}
          onClick={logoutHandler}
          ref={logoutButton}
        >
          Logout
        </Button>
      </div>
    </div>
  );
}

export default withRouter(LandingPage);
