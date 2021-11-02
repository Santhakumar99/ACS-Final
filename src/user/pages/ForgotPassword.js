import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";

import { TextField } from "@material-ui/core";
import alfieLogo from "../../images/ACS-Logo.png";

import Loader from "../../common/Loader";

import "./Auth.css";
import "../../css/style.css";
import "../login.css";

const ForgotPassword = () => {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [errEmail, setErrEmail] = useState();
  const [serverResponse, setServerResponse] = useState("");

  const [open, setOpen] = React.useState(false);
  const [errMsg, setErrMsg] = useState(undefined);

  const handleClickOpen = (msg) => {
    setErrMsg(msg);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    // console.log("authSubmitHandler", formState.inputs);

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setErrEmail("Please enter valid Email");
    } else {
      setIsLoading(true);
      setServerResponse("");

      try {
        const dbResult = await axios
          .post(`${process.env.REACT_APP_URL}/users/forgotPassword`, {
            // .post(`http://localhost:7400/api/users/forgotPassword`, {
            email: email,
          })
          .catch((error) => {
            console.log("error", error);
            setIsLoading(false);
            error.response.data.errors[0].msg
              ? handleClickOpen(error.response.data.errors[0].msg)
              : handleClickOpen("Something went wrong !!!");

            // handleClickOpen("Please check email !!!");
          });

        if (dbResult && dbResult.data) {
          console.log("Forgot Password response ", dbResult?.data);
          setIsLoading(false);
          handleClickOpen("Reset Link sent to provided email ID");
          setEmail("");
        }
      } catch (err) {
        setIsLoading(false);
        handleClickOpen("someting went wrong");
      }
    }
  };
  const BacktoLogin = () => {
    setIsLoading(true);
    return (window.location = "/login");
    // setIsLoading(false);
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
          >
            <div className="navbar-container container">
              <div className="navbar-brand">
                <a className="navbar-brand-logo" href={"/"}>
                  <img src={alfieLogo} width="140px" />
                </a>
              </div>
            </div>
          </nav> */}
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
                      <h2 className="title">Forgot Password</h2>
                      <br />

                      {!isLoading && serverResponse == "" && (
                        <h5 className="title-details">
                          Enter Email to receive password RESET link
                        </h5>
                      )}
                    </div>
                    {isLoading ? (
                      "Loading"
                    ) : (
                      <div className="form-section">
                        <form
                          className="contact-us-form"
                          onSubmit={submitHandler}
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

                          <div className="col-md-12 contact-us-form-group">
                            <div className="row">
                              <div className="col-lg-6 contact-us-form-group">
                                <button
                                  className="contact-us-form-btn"
                                  type="submit"
                                >
                                  Submit
                                </button>
                              </div>
                              <div className="col-lg-6 contact-us-form-group">
                                <button
                                  className="contact-us-form-btn"
                                  type="button"
                                  onClick={BacktoLogin}
                                >
                                  Login
                                </button>
                              </div>
                            </div>
                          </div>
                          <br />
                          {serverResponse && (
                            <h5 className="title-details">{serverResponse}</h5>
                          )}
                        </form>
                      </div>
                    )}
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

export default ForgotPassword;
