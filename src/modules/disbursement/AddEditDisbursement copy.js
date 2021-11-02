import React, { useEffect, useState } from "react";
// import { makeStyles } from "@material-ui/core/styles";

import { Link, useParams, useHistory } from "react-router-dom";

import axios from "axios";

// import AddIcon from "@material-ui/icons/Add";

import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";

// Radio
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";

import Loader from "../../common/Loader";

import "../../css/style.css";
import "./login.css";
// import '../../../common/css/Form.css';

const AddEditDisbursement = () => {
  const history = useHistory();
  let token = localStorage.getItem("token");

  const [values, setValues] = useState({
    _id: "",
    // finance to alfie
    fpDateTime: "",
    fpAmountReceived: "",
    fpFeesDeducted: "",
    refIdOfContract: "",
    borrower: "",
    // alfie to borrower
    alfDateTime: "",
    alfAmountDisburse: "",
    alfTransferType: "",
  });

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
    // alert("close")
  };
  // const auth = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(false);

  const [fundsReceivedFromPartner, setFundsReceivedFromPartner] =
    useState(false);

  const [isFundReleased, setIsFundReleased] = useState(false);

  const validateData = () => {
    if (!token) handleClickOpen("No Token Avaibale, Please Login !!!");
    else return true;
  };

  const id = useParams().id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        const result = await axios
          .get(
            `${
              process.env.REACT_APP_URL
                ? process.env.REACT_APP_URL
                : "http://104.131.5.210:7400/api"
            }/loans/${id}`,
            {
              headers: {
                Authorization: token,
              },
            }
          )
          .catch((error) => {
            console.log("error ", error.response.data.errors[0].msg);
            setIsLoading(false);

            error.response.data.errors[0].msg
              ? handleClickOpen(error.response.data.errors[0].msg)
              : handleClickOpen("Something went wrong !!!");
          });
        if (result && result.data) {
          console.log("Logged in", result?.data?.data);
          let loan = result?.data?.data;
          setIsLoading(false);
          setValues({
            _id: loan._id,
            // finance to alfie
            fpDateTime: loan.fpDateTime,
            fpAmountReceived: loan.fpAmountReceived,
            fpFeesDeducted: loan.fpFeesDeducted,
            refIdOfContract: loan.refIdOfContract,
            borrower: loan.borrower,
            // alfie to borrower
            alfDateTime: loan.alfDateTime,
            alfAmountDisburse: loan.alfAmountDisburse,
            alfTransferType: loan.alfTransferType,
          });
        }
      } catch (err) {
        console.log("Fetching Loan data error : ", err);
        setIsLoading(false);

        handleClickOpen("someting went wrong");
      }
    };
    fetchData();
  }, []);

  const SubmitHandler = async (event) => {
    event.preventDefault();
    // console.log("SubmitHandler", formState.inputs);

    if (validateData()) {
      setIsLoading(true);

      console.log("In Login");

      try {
        const dbResult = await axios
          .put(
            // `${
            //   process.env.REACT_APP_URL
            //     ? process.env.REACT_APP_URL
            //     : "http://104.131.5.210:7400/api"
            // }/loans/disburse/${id}`,
            `http://localhost:7400/api/loans/disburse/${id}`,
            {
              // finance to alfie
              fundsReceivedFromPartner,
              fpDateTime:
                values.fpDateTime &&
                values.fpDateTime !== "" &&
                values.fpDateTime,
              fpAmountReceived:
                values.fpAmountReceived &&
                values.fpAmountReceived !== "" &&
                parseFloat(values.fpAmountReceived),
              fpFeesDeducted:
                values.fpFeesDeducted &&
                values.fpFeesDeducted !== "" &&
                parseFloat(values.fpFeesDeducted),
              refIdOfContract:
                values.refIdOfContract &&
                values.refIdOfContract !== "" &&
                values.refIdOfContract,
              borrower:
                values.borrower && values.borrower !== "" && values.borrower,
              // alfie to borrower
              isFundReleased,

              alfDateTime:
                values.alfDateTime &&
                values.alfDateTime !== "" &&
                values.alfDateTime,
              alfAmountDisburse:
                values.alfAmountDisburse &&
                values.alfAmountDisburse !== "" &&
                parseFloat(values.alfAmountDisburse),
              alfTransferType:
                values.alfTransferType &&
                values.alfTransferType !== "" &&
                values.alfTransferType,
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
          console.log("response ", dbResult?.data);

          setIsLoading(false);

          history.push("/disbursement");
        }
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
        <div className="padding2rem">
          <div className="wrapper">
            <div id="contact"></div>
            {/* <!-- CONTACT SECTION --> */}
            <div>
              {/* <div id="login-page" className="contact-us-section Login-page"> */}
              <div className="container contact-us-container">
                <div className="container contact-us-content-container">
                  <div className="col-md-12 contact-us-form-section">
                    {/* <div className="col-md-6 contact-us-form-section"> */}
                    <div className="col-md-12 title-section contact-us-title-section">
                      <p className="subtitle"></p>
                      <h2 className="title">Disbursement Funds</h2>
                    </div>
                    <div className="form-section">
                      <form
                        // className="contact-us-form"
                        onSubmit={SubmitHandler}
                      >
                        <div className="col-md-12 contact-us-form-group">
                          <div className="row">
                            <div className="col-lg-6 contact-us-form-group">
                              <h2> Funds received from finance partner ? </h2>
                              <FormControl component="fieldset">
                                <RadioGroup
                                  row
                                  aria-label="Funds received from finance partner ?"
                                  name="fundsReceivedFromPartner"
                                  value={fundsReceivedFromPartner}
                                  onChange={(event) => {
                                    console.log("asd", event.target.value);
                                    setFundsReceivedFromPartner(
                                      event.target.value === "true"
                                        ? true
                                        : false
                                    );
                                  }}
                                >
                                  <FormControlLabel
                                    value={true}
                                    control={<Radio />}
                                    label="Yes"
                                  />
                                  <FormControlLabel
                                    value={false}
                                    control={<Radio />}
                                    label="No"
                                  />
                                </RadioGroup>
                              </FormControl>
                            </div>
                          </div>
                        </div>
                        {fundsReceivedFromPartner && (
                          <>
                            <div className="col-md-12">
                              <div className="row">
                                <div className="col-md-6">
                                  <TextField
                                    label="Date Time"
                                    name="fpDateTime"
                                    type="datetime-local"
                                    InputLabelProps={{
                                      shrink: true,
                                    }}
                                    inputProps={{
                                      max: new Date(),
                                    }}
                                    value={values.fpDateTime}
                                    onChange={(event) => {
                                      console.log("Date ", event.target.value);
                                      onChangeHandler(event);
                                    }}
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                  />
                                </div>
                                <div className="col-md-6">
                                  <TextField
                                    label="Amount"
                                    size="small"
                                    type="number"
                                    fullWidth
                                    name="fpAmountReceived"
                                    variant="outlined"
                                    value={values.fpAmountReceived}
                                    onChange={(event) => onChangeHandler(event)}
                                    required
                                    inputProps={{
                                      min: 0,
                                    }}
                                  />
                                </div>
                              </div>
                            </div>
                            <br />
                            <div className="col-md-12">
                              <div className="row">
                                <div className="col-md-6">
                                  <TextField
                                    label="Fees"
                                    size="small"
                                    type="number"
                                    fullWidth
                                    name="fpFeesDeducted"
                                    variant="outlined"
                                    value={values.fpFeesDeducted}
                                    onChange={(event) => onChangeHandler(event)}
                                    required
                                    inputProps={{
                                      min: 0,
                                    }}
                                  />
                                </div>
                                <div className="col-md-6">
                                  <TextField
                                    label="Reference ID of Contract"
                                    size="small"
                                    type="text"
                                    fullWidth
                                    name="refIdOfContract"
                                    variant="outlined"
                                    value={values.refIdOfContract}
                                    onChange={(event) => onChangeHandler(event)}
                                    required
                                  />
                                </div>
                              </div>
                            </div>
                            <br />
                            <div className="col-md-12">
                              <div className="row">
                                <div className="col-md-6">
                                  <TextField
                                    label="Borrower"
                                    size="small"
                                    type="text"
                                    fullWidth
                                    name="borrower"
                                    variant="outlined"
                                    value={values.borrower}
                                    onChange={(event) => onChangeHandler(event)}
                                    required
                                  />
                                </div>
                              </div>
                            </div>

                            <hr />

                            {/* From Alfie to Borrower */}
                            <div className="col-md-12 contact-us-form-group">
                              <div className="row">
                                <div className="col-lg-6 contact-us-form-group">
                                  <h2>
                                    {" "}
                                    Funds released by ALFIE to borrower ?{" "}
                                  </h2>
                                  <FormControl component="fieldset">
                                    <RadioGroup
                                      row
                                      aria-label="Funds released by ALFIE to borrower"
                                      name="isFundReleased"
                                      value={isFundReleased}
                                      onChange={(event) => {
                                        setIsFundReleased(
                                          event.target.value === "true"
                                            ? true
                                            : false
                                        );
                                      }}
                                    >
                                      <FormControlLabel
                                        value={true}
                                        control={<Radio />}
                                        label="Yes"
                                      />
                                      <FormControlLabel
                                        value={false}
                                        control={<Radio />}
                                        label="No"
                                      />
                                    </RadioGroup>
                                  </FormControl>
                                </div>
                              </div>
                            </div>
                            {isFundReleased && (
                              <>
                                <br />
                                <div className="col-md-12">
                                  <div className="row">
                                    <div className="col-md-6">
                                      <TextField
                                        label="Date Time"
                                        name="alfDateTime"
                                        type="datetime-local"
                                        InputLabelProps={{
                                          shrink: true,
                                        }}
                                        inputProps={{
                                          max: new Date(),
                                        }}
                                        value={values.alfDateTime}
                                        onChange={(event) => {
                                          console.log(
                                            "Date ",
                                            event.target.value
                                          );
                                          onChangeHandler(event);
                                        }}
                                        variant="outlined"
                                        size="small"
                                        fullWidth
                                      />
                                    </div>
                                    <div className="col-md-6">
                                      <TextField
                                        label="Amount"
                                        size="small"
                                        type="number"
                                        fullWidth
                                        name="alfAmountDisburse"
                                        variant="outlined"
                                        value={values.alfAmountDisburse}
                                        onChange={(event) =>
                                          onChangeHandler(event)
                                        }
                                        required
                                        inputProps={{
                                          min: 0,
                                        }}
                                      />
                                    </div>
                                  </div>
                                </div>
                                <br />

                                <div className="col-md-12">
                                  <div className="row">
                                    <div className="col-md-6">
                                      <Autocomplete
                                        label="Transfer Type"
                                        name="alfTransferType"
                                        size="small"
                                        getOptionSelected={(option, value) =>
                                          option === value
                                        }
                                        getOptionLabel={(option) =>
                                          typeof option === "string"
                                            ? option
                                            : option
                                        }
                                        options={["NetBanking", "e-wallet"]}
                                        renderInput={(params) => (
                                          <TextField
                                            label="Transfer Type"
                                            name="alfTransferType"
                                            {...params}
                                            fullWidth
                                            variant="outlined"
                                          />
                                        )}
                                        value={values.alfTransferType}
                                        onChange={(event, value) =>
                                          onChangeHandler(
                                            event,
                                            "alfTransferType",
                                            value
                                          )
                                        }
                                      />
                                    </div>
                                  </div>
                                </div>
                              </>
                            )}
                          </>
                        )}

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
                            {/* <div className="col-lg-6 contact-us-form-group">
                              <button
                                className="contact-us-form-btn"
                                onClick={() => history.push("/forgotpassword")}
                              >
                                Forgot Password
                              </button>
                            </div> */}
                          </div>
                        </div>
                        <br />
                        <br />
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default AddEditDisbursement;


useEffect(() => {
  const fetchData = async () => {
    try {
      setIsLoading(true);

      const result = await axios
        .get(
          `${
            process.env.REACT_APP_URL
              ? process.env.REACT_APP_URL
              : "http://104.131.5.210:7400/api"
          }/loans/${id}`,
          {
            headers: {
              Authorization: token,
            },
          }
        )
        .catch((error) => {
          console.log("error ", error.response.data.errors[0].msg);
          setIsLoading(false);

          error.response.data.errors[0].msg
            ? handleClickOpen(error.response.data.errors[0].msg)
            : handleClickOpen("Something went wrong !!!");
        });
      if (result && result.data) {
        console.log("Logged in", result?.data?.data);
        let loan = result?.data;

        setFundsReceivedFromPartner(loan.fundsReceivedFromPartner);
        setIsFundReleased(loan.isFundReleased);
        setValues({
          _id: loan._id,
          // finance to alfie
          fpDateTime: loan.fpDateTime,
          fpAmountReceived: loan.fpAmountReceived,
          fpFeesDeducted: loan.fpFeesDeducted,
          refIdOfContract: loan.refIdOfContract,
          borrower: loan.borrower,
          // alfie to borrower
          alfDateTime: loan.alfDateTime,
          alfAmountDisburse: loan.alfAmountDisburse,
          alfTransferType: loan.alfTransferType,
        });
        setIsLoading(false);
      }
    } catch (err) {
      console.log("Fetching Loan data error : ", err);
      setIsLoading(false);

      handleClickOpen("someting went wrong");
    }
  };
  fetchData();
}, [borrower]);
