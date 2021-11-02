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

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

// import Alert from "@mui/material/Alert";
// import AlertTitle from '@mui/material/AlertTitle';
// import Stack from '@mui/material/Stack';

import "../../css/style.css";

const columns = [
  { id: "sr", label: "No", minWidth: 50 },
  { id: "module", label: "Feature", minWidth: 170 },
  { id: "View", label: "View", minWidth: 70 },
  { id: "Create", label: "Create", minWidth: 70 },
  { id: "Update", label: "Update", minWidth: 70 },
  { id: "Delete", label: "Delete", minWidth: 70 },
  { id: "Other", label: "Other", minWidth: 70 },
];

const features = [
  "Loan Approval",
  "Loan Disbursement",
  "View Borrowers",
  "Outstanding Loans",

  // only for admin, but it is dynamic
  "Users",
  "Role",
  "User Role Mapping",
  "Product",
];
const createFeaturesAccessLevel = () => {
  var temp = [];

  features.map((data, i) => {
    temp.push({
      module: data,
      view: false,
      create: false,
      update: false,
      delete: false,
      other: false,
    });
  });
  return temp;
};

var featuresAccessLevel = createFeaturesAccessLevel();
const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
  head: {
    backgroundColor: "#0984e1",
    color: "white",
    fontWeight: 700,
  },
});

const AddEditRoleMapping = () => {
  const classes = useStyles();

  const [featureList, setFeatureList] = useState(featuresAccessLevel);

  let token = localStorage.getItem("token");
  const history = useHistory();
  const [values, setValues] = useState({
    _id: "",
    userTypeId: {},
  });

  const handleInputChange = (index, module, actionKey, value) => {
    const list = [...featureList];
    list[index][actionKey] = value;

    console.log("handleInputChange - Input List", list);
    setFeatureList(list);
  };

  const resetFormValues = () => {
    setValues({
      _id: "",
      userTypeId: {},
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

  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [userTypes, setUserTypes] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      if (token) {
        // ProductMaster
        // try {
        // const dbResult = await axios
        //   .post(
        //     `${process.env.REACT_APP_URL}/products`,
        //     {
        //       product: "BNPL",
        //       loanAmountMin: 1000,
        //       loanAmountMax: 15000,
        //       tenureMin: 3,
        //       tenureMax: 9,
        //       fee: 1, // It is in percent
        //       profit_rate_pm: 1.5, // It is in percent
        //       penalty_pm: 2,
        //       description: `Buy now, pay later (BNPL) is a microfinance product that offers you an unsecured cash advance loan of up to RM15,000 over a maximum period of 9 months.`,
        //       alfie_fees_collected : 0,
        //       alfie_late_payment_fees_collected : 0,
        //     },
        //     { headers: { Authorization: token } }
        //   )
        //   .catch((error) => {
        //     console.log("Error", error);
        //     setIsLoading(false);
        //     error.response.data.errors[0].msg
        //       ? handleClickOpen(error.response.data.errors[0].msg)
        //       : handleClickOpen("Something went wrong !!!");
        //   });

        //   if (dbResult && dbResult.data) {
        //     console.log("response ", dbResult?.data);

        //     setIsLoading(false);
        //     handleClickOpen("Success !!!");
        //   }
        // } catch (err) {
        //   setIsLoading(false);
        //   handleClickOpen("someting went wrong");
        // }
        // ProductMaster

        let allRolesMapping = [];
        let userTypes = [];

        // Get User Types

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
            userTypes = result?.data?.userTypes;
            // setUserTypes(userTypes);
            setIsLoading(false);
          }
        } catch (err) {
          setIsLoading(false);

          handleClickOpen("Something went wrong !!!");
        }

        // Get All Roles
        try {
          setIsLoading(true);

          const result = await axios
            .get(`${process.env.REACT_APP_URL}/rolemappings/`, {
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
            allRolesMapping = result?.data?.roleMappings;
            setIsLoading(false);
          }
        } catch (err) {
          setIsLoading(false);

          handleClickOpen("Something went wrong !!!");
        }

        let userArray = userTypes;
        let roleMapping = allRolesMapping;
        let allUserTypes = userTypes;
        for (var key in roleMapping) {
          var aPerm = roleMapping[key];
          for (var user in allUserTypes) {
            var userType = allUserTypes[user];
            if (userType._id === aPerm.userTypeId._id)
              userArray.splice(user, 1);
          }
        }
        setUserTypes(userArray);

        if (id) {
          setIsUpdateMode(true);
          try {
            setIsLoading(true);
            const result = await axios
              .get(`${process.env.REACT_APP_URL}/rolemappings/${id}`, {
                headers: { Authorization: token },
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
                userTypeId: data.userTypeId,
              });
              setFeatureList(data.features);
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
    else if (values.userTypeId === {})
      handleClickOpen("Please select user type !!!");
    else return true;
  };

  // Submit
  const SubmitHandler = async (event) => {
    event.preventDefault();
    if (validateData()) {
      if (isUpdateMode) {
        setIsLoading(true);
        try {
          const dbResult = await axios
            .put(
              `${process.env.REACT_APP_URL}/rolemappings/${id}`,
              {
                userTypeId:
                  values.userTypeId &&
                  values.userTypeId !== {} &&
                  values.userTypeId._id,
                features: featureList,
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

            history.push("/rolemappings");
          }
        } catch (err) {
          setIsLoading(false);
          handleClickOpen("someting went wrong");
        }
      } else {
        setIsLoading(true);
        try {
          const dbResult = await axios
            .post(
              `${process.env.REACT_APP_URL}/rolemappings`,
              {
                userTypeId:
                  values.userTypeId &&
                  values.userTypeId !== {} &&
                  values.userTypeId._id,
                features: featureList,
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
            // handleClickOpen("Success !!!");
            history.push("/rolemappings");
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
      {/* <Alert severity="success">
        <AlertTitle>Success</AlertTitle>
        This is a success alert — <strong>check it out!</strong>
      </Alert> */}
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
            <div className="col-lg-12 col-md-12 features-content-section">
              <Card>
                <div className="col-md-12 title-section">
                  <h2 className="title">
                    {isUpdateMode ? "Update " : "Add "} Role Mapping
                  </h2>
                </div>
                <div className="form-section">
                  <form onSubmit={SubmitHandler}>
                    <div className="col-md-12">
                      <Autocomplete
                        size="small"
                        getOptionSelected={(option, value) =>
                          typeof option === "string"
                            ? option === value
                            : option.type === value.type
                        }
                        getOptionLabel={(option) =>
                          typeof option === "string" ? option : option.type
                        }
                        options={userTypes}
                        value={values.userTypeId}
                        onChange={(event, value) =>
                          onChangeHandler(event, "userTypeId", value)
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
                        disabled={isUpdateMode}
                      />
                    </div>
                    <br />

                    {/* Role mapping table */}
                    <Paper className={classes.root}>
                      <TableContainer className={classes.container}>
                        <Table stickyHeader aria-label="sticky table">
                          <TableHead>
                            <TableRow className={classes.head}>
                              {columns.map((column) => (
                                <TableCell
                                  key={column.id}
                                  align={column.align}
                                  style={{ minWidth: column.minWidth }}
                                  className={classes.head}
                                >
                                  {column.label}
                                </TableCell>
                              ))}
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {featureList.map((module, i) => {
                              return (
                                <TableRow key={i * 221}>
                                  <TableCell width="1px">{i + 1}</TableCell>

                                  <TableCell
                                    component="th"
                                    scope="row"
                                    width="30%"
                                  >
                                    {module.module}
                                  </TableCell>

                                  <TableCell>
                                    <FormControlLabel
                                      control={
                                        <Checkbox
                                          checked={module.view}
                                          onChange={(event) =>
                                            handleInputChange(
                                              i,
                                              module,
                                              "view",
                                              event.target.checked
                                            )
                                          }
                                          value="view"
                                        />
                                      }
                                    />
                                  </TableCell>

                                  <TableCell>
                                    <FormControlLabel
                                      control={
                                        <Checkbox
                                          checked={module.create}
                                          onChange={(event) =>
                                            handleInputChange(
                                              i,
                                              module,
                                              "create",
                                              event.target.checked
                                            )
                                          }
                                          value="create"
                                        />
                                      }
                                    />
                                  </TableCell>
                                  <TableCell>
                                    <FormControlLabel
                                      control={
                                        <Checkbox
                                          checked={module.update}
                                          onChange={(event) =>
                                            handleInputChange(
                                              i,
                                              module,
                                              "update",
                                              event.target.checked
                                            )
                                          }
                                          value="update"
                                        />
                                      }
                                    />
                                  </TableCell>
                                  <TableCell>
                                    <FormControlLabel
                                      control={
                                        <Checkbox
                                          checked={module.delete}
                                          onChange={(event) =>
                                            handleInputChange(
                                              i,
                                              module,
                                              "delete",
                                              event.target.checked
                                            )
                                          }
                                          value="delete"
                                        />
                                      }
                                    />
                                  </TableCell>
                                  <TableCell>
                                    <FormControlLabel
                                      control={
                                        <Checkbox
                                          checked={module.other}
                                          onChange={(event) =>
                                            handleInputChange(
                                              i,
                                              module,
                                              "other",
                                              event.target.checked
                                            )
                                          }
                                          value="other"
                                        />
                                      }
                                    />
                                  </TableCell>
                                </TableRow>
                              );
                            })}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Paper>
                    {/* Role mapping table */}

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

export default AddEditRoleMapping;
