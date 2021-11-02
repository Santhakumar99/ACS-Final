import React, { useState, useContext } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

import { TextField } from "@material-ui/core";
import alfieLogo from "../../images/ACS-Logo.png";

import Loader from "../../common/Loader";

import "./Auth.css";
import "../../css/style.css";
import "../login.css";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";

import { AuthContext } from "../context/auth-context";

const Auth = (props) => {
  const history = useHistory();

  const auth = useContext(AuthContext);

  const [open, setOpen] = React.useState(false);
  const [errMsg, setErrMsg] = useState(undefined);

  const handleClickOpen = (msg) => {
    setErrMsg(msg);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    // alert("close")
  };
  // const auth = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [errEmail, setErrEmail] = useState();

  const [password, setPassword] = useState("");

  const authSubmitHandler = async (event) => {
    event.preventDefault();
    // console.log("authSubmitHandler", formState.inputs);

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setErrEmail("Please enter valid Email");
    } else {
      setIsLoading(true);
      console.log("In Login");
      setErrEmail("");

      try {
        const loginResult = await axios
          .post(`${process.env.REACT_APP_URL}/users/login`, {
            mobile: email,
            password: password,
            webLogin: true,
          })
          .catch((error) => {
            console.log("error ", error.response.data.errors[0].msg);
            setIsLoading(false);

            error.response.data.errors[0].msg
              ? handleClickOpen(error.response.data.errors[0].msg)
              : handleClickOpen("Something went wrong !!!");
          });

        if (loginResult && loginResult.data) {
          console.log("Logged in", loginResult?.data?.token);
          let token = loginResult?.data?.token;
          // localStorage.setItem("token", token);

          auth.login(token);
          // history.push("/dashboard");
          return (window.location = "/dashboard");
          // setIsLoading(false);
        }

        // auth.login(responseData.email, responseData.token);
      } catch (err) {
        setIsLoading(false);

        handleClickOpen("someting went wrong");
      }
    }
  };

  return (
    <React.Fragment>
      {isLoading && <Loader />}
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {errMsg ? errMsg : "Something went wrong"}
          </DialogTitle>

          <DialogActions>
            <Button onClick={handleClose} color="primary" autoFocus>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      {!isLoading && (
        <>
          {/* <!-- NAVBAR --> */}
          {/* <nav
            id="navbar"
            className="navbar fixed-top navbar-expand-md navbar-header navbar-mobile"
          > */}
          {/* <div className="navbar-container container">
              <div className="navbar-brand">
                <a className="navbar-brand-logo" href={"/"}>
                  <img src={alfieLogo} width="140px" />
                </a>
              </div>
            </div> */}
          {/* </nav> */}
          {/* <!-- SECTION LABEL --> */}
          <div id="top"></div>
          {/* <!-- WRAPPER --> */}
          <div className="wrapper">
            <div id="contact"></div>
            {/* <!-- CONTACT SECTION --> */}
            <div id="login-page" className="contact-us-section Login-page">
              <div className="container contact-us-container">
                <div className="container contact-us-content-container">
                  <div className="col-md-6 contact-us-form-section">
                    <div className="col-md-12 title-section contact-us-title-section">
                      <p className="subtitle"></p>
                      <h2 className="title">Login</h2>
                      <h5 className="title-details">
                        Please login to continue
                      </h5>
                    </div>
                    <div className="form-section">
                      <form
                        className="contact-us-form"
                        onSubmit={authSubmitHandler}
                      >
                        <div className="col-md-12">
                          <TextField
                            label="Email"
                            size="small"
                            type="email"
                            fullWidth
                            name="username"
                            variant="outlined"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            required
                            autoFocus
                          />

                          <span id="user-error">{errEmail}</span>
                        </div>
                        <br />
                        <div className="col-md-12">
                          <TextField
                            label="Password"
                            size="small"
                            type="password"
                            fullWidth
                            variant="outlined"
                            value={password}
                            onChange={(event) =>
                              setPassword(event.target.value)
                            }
                            required
                          />
                        </div>

                        <div className="col-md-12 contact-us-form-group">
                          <div className="row">
                            <div className="col-lg-6 contact-us-form-group">
                              <button
                                className="contact-us-form-btn"
                                type="submit"
                              >
                                Login
                              </button>
                            </div>
                            <div className="col-lg-6 contact-us-form-group">
                              <button
                                className="contact-us-form-btn"
                                onClick={() => history.push("/forgotpassword")}
                              >
                                Forgot Password
                              </button>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- SECTION LABEL --> */}
            <div id="footer"></div>
          </div>
        </>
      )}{" "}
    </React.Fragment>
  );
};

export default Auth;
