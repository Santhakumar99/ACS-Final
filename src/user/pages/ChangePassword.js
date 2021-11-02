import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

import { TextField } from "@material-ui/core";
import alfieLogo from "../../images/ACS-Logo.png";
import Loader from "../../common/Loader";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";

import "./Auth.css";
import "../../css/style.css";
import "../login.css";

const ChangePassword = () => {
  const history = useHistory();

  let token = localStorage.getItem("token");

  const [open, setOpen] = React.useState(false);
  const [errMsg, setErrMsg] = useState(undefined);
  const [success, setSuccess] = useState(undefined);

  const handleClickOpen = (msg) => {
    setErrMsg(msg);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    return success && (window.location = "/login");
  };

  const [isLoading, setIsLoading] = useState(false);

  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errConfirmPassword, setErrConfirmPassword] = useState(undefined);

  const validateData = () => {
    if (password != confirmPassword) {
      setErrConfirmPassword("New password and Confirm Password should be same");
      return false;
    } else if (!token) handleClickOpen("No Token Avaibale, Please try Login");
    else return true;
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    if (validateData()) {
      setIsLoading(true);

      try {
        const dbResult = await axios
          .post(
            `${process.env.REACT_APP_URL}/users/changePassword`,
            {
              oldPassword: oldPassword,
              newPassword: password,
            },
            {
              headers: {
                Authorization: token,
                // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MTMwYzc4NWUxYTQyMGFkZmRkZTFiMzQiLCJyb2xlIjoiMSIsImZpcnN0TmFtZSI6Ik11aGFtbWFkIiwibGFzdE5hbWUiOiJCaWxhbCIsImRvY0VLWUMiOiJjM2RkOGVlMC0wYmViLTExZWMtYTNiYy0xM2UyNmE4NWJmOWIuanBnIiwiaWF0IjoxNjMwNjc1NDMyfQ.Rf8-wbOcbOHkF31qEZHq-AcHogtUbIpY1ugUO0TMrIA",
              },
            }
          )
          .catch((error) => {
            console.log("Error", error);
            setIsLoading(false);
            error.response.data.errors[0].msg
              ? handleClickOpen(error.response.data.errors[0].msg)
              : handleClickOpen("Something went wrong !!!");
            // alert("Please check old password and try again ");
          });

        if (dbResult && dbResult.data) {
          console.log("Change Password response ", dbResult?.data);

          setIsLoading(false);
          localStorage.removeItem("token");
          localStorage.removeItem("userData");

          setSuccess(true);
          handleClickOpen(
            "Your password was changed successfully, please LOG IN to continue"
          );
          // Redirect
          // return (window.location = "/login");
        }
      } catch (err) {
        handleClickOpen("someting went wrong");
        setIsLoading(false);
      }
    }
    // console.log("authSubmitHandler", formState.inputs);
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
                      <h2 className="title">Change Password</h2>
                      <br />
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
                              label="Old Password"
                              size="small"
                              type="password"
                              fullWidth
                              variant="outlined"
                              value={oldPassword}
                              onChange={(event) =>
                                setOldPassword(event.target.value)
                              }
                              required
                              autoFocus
                            />
                          </div>
                          <span id="user-error"></span>

                          <br />
                          <div className="col-md-12">
                            <TextField
                              label="New Password"
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

                          <br />
                          <div className="col-md-12">
                            <TextField
                              label="Confirm New Password"
                              size="small"
                              type="password"
                              fullWidth
                              variant="outlined"
                              value={confirmPassword}
                              onChange={(event) =>
                                setConfirmPassword(event.target.value)
                              }
                              required
                            />
                          </div>
                          <span id="user-error">{errConfirmPassword}</span>
                          {/*  */}

                          <br />

                          <div className="col-md-12 contact-us-form-group">
                            <div className="row">
                              <div className="col-lg-6 contact-us-form-group">
                                <button
                                  className="contact-us-form-btn"
                                  type="submit"
                                >
                                  Change Password
                                </button>
                              </div>
                            </div>
                          </div>
                          <br />
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

export default ChangePassword;
