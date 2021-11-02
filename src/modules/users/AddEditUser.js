import React, { useEffect, useState } from "react";
import axios from "axios";

import { useParams, useHistory } from "react-router-dom";

// import AddIcon from "@material-ui/icons/Add";

import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";

import Loader from "../../common/Loader";
import Card from "../../common/Card";

import "../../css/style.css";

const AddEditUser = () => {
  let token = localStorage.getItem("token");
  const history = useHistory();
  const [values, setValues] = useState({
    _id: "",
    email: "",
    password: "",
    userName: "",
    roleId: {},
  });

  const resetFormValues = () => {
    setValues({
      _id: "",
      email: "",
      password: "",
      userName: "",
      roleId: {},
    });
  };

  const onChangeHandler = (e, name, value) => {
    const key = name ? name : e.target.name;
    const val = value ? value : e.target.value;
    let inputValues = values;

    inputValues[key] = val;
    setValues({ ...inputValues });
  };

  const [open, setOpen] = React.useState(false);
  const [errMsg, setErrMsg] = useState(undefined);

  const handleClickOpen = (msg) => {
    setErrMsg(msg);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [isLoading, setIsLoading] = useState(false);

  const id = useParams().id;

  const [profileData, setProfileData] = useState();

  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [userTypes, setUserTypes] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      if (token) {
        try {
          setIsLoading(true);
          const result = await axios
            .get(`${process.env.REACT_APP_URL}/usertypes`, {
              headers: {
                Authorization: token,
              },
            })
            .catch((error) => {
              console.log("error ", error.response.data.errors[0].msg);
              setIsLoading(false);

              error.response.data.errors[0].msg
                ? handleClickOpen(error.response.data.errors[0].msg)
                : handleClickOpen("Something went wrong !!!");
            });
          if (result && result.data) {
            let data = result?.data?.userTypes;
            setUserTypes(data);
            setIsLoading(false);
          }
        } catch (err) {
          setIsLoading(false);

          handleClickOpen("Something went wrong !!!");
        }

        if (id) {
          setIsUpdateMode(true);
          try {
            setIsLoading(true);
            const result = await axios
              .get(`${process.env.REACT_APP_URL}/users/${id}`, {
                headers: {
                  Authorization: token,
                },
              })
              .catch((error) => {
                console.log("error ", error.response.data.errors[0].msg);
                setIsLoading(false);

                error.response.data.errors[0].msg
                  ? handleClickOpen(error.response.data.errors[0].msg)
                  : handleClickOpen("Something went wrong !!!");
              });
            if (result && result.data) {
              let data = result?.data;
              // setProfileData(data);
              setValues({
                _id: data._id,
                email: data.email,
                password: data.password,
                userName: data.userName,
                roleId: data.roleId,
              });
              setIsLoading(false);
            }
          } catch (err) {
            setIsLoading(false);

            handleClickOpen("Something went wrong !!!");
          }
        } else {
          console.log("No ID present");
          setIsUpdateMode(false);
        }
      } else handleClickOpen("No Token Avaibale, Please Login !!!");
    };
    fetchData();
  }, []);

  const validateData = () => {
    if (!token) handleClickOpen("No Token Avaibale, Please Login !!!");
    else if (!/^\S+@\S+\.\S+$/.test(values.email))
      handleClickOpen("Please enter valid Email !!!");
    else if (!values.password) handleClickOpen("Please enter password !!!");
    else return true;
  };

  // Submit
  const SubmitHandler = async (event) => {
    event.preventDefault();

    if (isUpdateMode) {
      setIsLoading(true);
      try {
        const dbResult = await axios
          .put(
            `${process.env.REACT_APP_URL}/users/webuser/${id}`,
            {
              userName:
                values.userName && values.userName !== "" && values.userName,
              roleId:
                values.roleId && values.roleId !== {} && values.roleId._id,
            },
            { headers: { Authorization: token } }
          )
          .catch((error) => {
            console.log("Error", error);
            setIsLoading(false);
            error.response.data.errors[0].msg
              ? handleClickOpen(error.response.data.errors[0].msg)
              : handleClickOpen("Something went wrong !!!");
          });

        if (dbResult && dbResult.data) {
          console.log("response ", dbResult?.data);

          setIsLoading(false);

          history.push("/users");
        }
      } catch (err) {
        setIsLoading(false);
        handleClickOpen("someting went wrong");
      }
    } else {
      if (validateData()) {
        setIsLoading(true);
        try {
          const dbResult = await axios
            .post(
              `${process.env.REACT_APP_URL}/users/addwebuser`,
              {
                // finance to alfie
                email: values.email && values.email !== "" && values.email,
                password:
                  values.password && values.password !== "" && values.password,
                userName:
                  values.userName && values.userName !== "" && values.userName,
                roleId:
                  values.roleId && values.roleId !== {} && values.roleId._id,
              },
              { headers: { Authorization: token } }
            )
            .catch((error) => {
              console.log("Error", error);
              setIsLoading(false);
              error.response.data.errors[0].msg
                ? handleClickOpen(error.response.data.errors[0].msg)
                : handleClickOpen("Something went wrong !!!");
            });

          if (dbResult && dbResult.data) {
            console.log("response ", dbResult?.data);

            setIsLoading(false);

            history.push("/users");
          }
        } catch (err) {
          setIsLoading(false);
          handleClickOpen("someting went wrong");
        }
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
        <div className="features-section">
          <div className="container features-container">
            <div className="col-lg-8 col-md-12 features-content-section">
              <Card>
                <div className="col-md-12 title-section features-title-section">
                  <h2 className="title">
                    {isUpdateMode ? "Update " : "Add "} User
                  </h2>
                </div>
                <div className="form-section">
                  <form onSubmit={SubmitHandler}>
                    {!isUpdateMode && (
                      <div className="col-md-12">
                        <div className="row">
                          <div className="col-md-6">
                            <TextField
                              label="Email"
                              size="small"
                              type="email"
                              fullWidth
                              name="email"
                              variant="outlined"
                              value={values.email}
                              onChange={(event) => onChangeHandler(event)}
                              required
                              autoFocus
                            />

                            {/* <span id="user-error">{errEmail}</span> */}
                          </div>
                          <div className="col-md-6">
                            <TextField
                              label="Password"
                              size="small"
                              type="password"
                              name="password"
                              fullWidth
                              variant="outlined"
                              value={values.password}
                              onChange={(event) => onChangeHandler(event)}
                              required
                              inputProps={{
                                form: {
                                  autocomplete: "off",
                                },
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                    <br />
                    <div className="col-md-12">
                      <div className="row">
                        <div className="col-md-6">
                          <TextField
                            label="Username"
                            size="small"
                            type="text"
                            fullWidth
                            name="userName"
                            variant="outlined"
                            value={values.userName}
                            onChange={(event) => onChangeHandler(event)}
                            required
                          />

                          {/* <span id="user-error">{errEmail}</span> */}
                        </div>
                        <div className="col-md-6">
                          <Autocomplete
                            size="small"
                            getOptionSelected={(option, value) =>
                              option === value
                            }
                            getOptionLabel={(option) =>
                              typeof option === "string" ? option : option.type
                            }
                            options={userTypes}
                            value={values.roleId}
                            onChange={(event, value) =>
                              onChangeHandler(event, "roleId", value)
                            }
                            renderInput={(params) => (
                              <TextField
                                label="Role"
                                {...params}
                                fullWidth
                                variant="outlined"
                                required
                              />
                            )}
                          />
                        </div>
                      </div>
                    </div>

                    <br />
                    <div className="col-md-12 contact-us-form-group">
                      <div className="row">
                        <div className="col-lg-6 contact-us-form-group">
                          <button className="contact-us-form-btn" type="submit">
                            {isUpdateMode ? "Update" : "Add"}
                          </button>
                        </div>
                        {/* {isUpdateMode && (
                          <div className="col-lg-6 contact-us-form-group">
                            <button
                              className="contact-us-form-btn"
                              onClick={deleteUser}
                            >
                              {isUpdateMode && "Delete User"}
                            </button>
                          </div>
                        )} */}
                      </div>
                    </div>
                  </form>
                </div>
              </Card>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default AddEditUser;
