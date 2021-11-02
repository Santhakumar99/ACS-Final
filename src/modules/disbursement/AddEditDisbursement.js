import React, { useEffect, useState } from "react";
// import { makeStyles } from "@material-ui/core/styles";

import axios from "axios";
import moment from "moment";

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
import Card from "../../common/Card";

import "../../css/style.css";
// import '../../../common/css/Form.css';

const AddEditDisbursement = () => {
  let token = localStorage.getItem("token");
  var todayDate = new Date(new Date().setHours(23, 59));

  todayDate = moment(todayDate).format("YYYY-MM-DDTHH:MM");
  //   console.log("Today Date", todayDate);
  // Utility Common Functions

  // 1.5% per month for BNPL & for QH no interest rate or profit rate
  const calcProfit = (amt, productType) => {
    let ans = productType === "Qard Hasan" ? 0 : (1.5 / 100) * amt;
    return ans >= 0 ? Math.round(ans) : "NA";
  };

  // 1% for BNPL & QH
  const calcFees = (amt) => {
    let ans = (1 / 100) * amt;
    return ans ? Math.round(ans) : "NA";
  };
  const calcEMI = (amt, tenure, productType) => {
    let profit = calcProfit(amt, productType);
    let ans = Math.round(amt / parseInt(tenure) + parseFloat(profit));
    console.log("profit ", profit);
    console.log("EMI ", ans);
    return ans ? Math.round(ans) : "NA";
  };

  const [fundsReceivedFromPartner, setFundsReceivedFromPartner] =
    useState(false);

  const [isFundReleased, setIsFundReleased] = useState(false);

  const [values, setValues] = useState({
    _id: "",
    createdOn: "",
    // finance to alfie
    fpDateTime: "",
    fpAmountReceived: "",
    fpFeesDeducted: "",
    refIdOfContract: "",
    // alfie to borrower
    alfDateTime: "",
    alfAmountDisburse: "",
    alfTransferType: "",

    // Repayment
    emiStartDate: "",
    remarks: "",
  });

  const resetFormValues = () => {
    setFundsReceivedFromPartner(false);
    setIsFundReleased(false);

    setValues({
      _id: "",
      createdOn: "",
      // finance to alfie
      fpDateTime: "",
      fpAmountReceived: "",
      fpFeesDeducted: "",
      refIdOfContract: "",
      // alfie to borrower
      alfDateTime: "",
      alfAmountDisburse: "",
      alfTransferType: "",

      // Repayment
      emiStartDate: "",
      remarks: "",
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
    // alert("close")
  };
  // const auth = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(false);
  //   const [isSuccess, setIsSuccess] = useState(false);

  const validateData = () => {
    if (!token) handleClickOpen("No Token Avaibale, Please Login !!!");
    else if (!selectedLoan && !selectedLoan._id)
      handleClickOpen("Please select Loan Id !!!");
    else return true;
  };

  //   const id = useParams().id;

  const [borrower, setBorrower] = useState();
  const [loanApplicants, setLoanApplicants] = useState([]);

  const [loans, setLoans] = useState([]);
  const [selectedLoan, setSelectedLoan] = useState();

  const [isLoanData, setIsLoanData] = useState(false);

  // get all loan applicant
  const getLoanApplicants = async () => {
    try {
      setIsLoading(true);

      const result = await axios
        .get(
          `${
            process.env.REACT_APP_URL
              ? process.env.REACT_APP_URL
              : "http://104.131.5.210:7400/api"
          }/loans/loanapplicants`,
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
        let applicants = result?.data?.data;

        setLoanApplicants(applicants);

        setIsLoading(false);
      }
    } catch (err) {
      console.log("Fetching applicant data error : ", err);
      setIsLoading(false);

      handleClickOpen("someting went wrong");
    }
  };
  useEffect(() => {
    getLoanApplicants();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setSelectedLoan({});
      setLoans([]);
      // reset form values
      resetFormValues();
      if (borrower && borrower._id) {
        try {
          setIsLoading(true);
          // get all Loans by user ID
          const result = await axios
            .get(
              `${
                process.env.REACT_APP_URL
                  ? process.env.REACT_APP_URL
                  : "http://104.131.5.210:7400/api"
              }/loans/byborrowerid?borrowerId=${borrower._id}`,
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
            let allLoans = result?.data?.data;

            setLoans(allLoans);
            allLoans.length === 1 && setSelectedLoan(allLoans[0]);
            setIsLoading(false);
          }
        } catch (err) {
          console.log("Fetching Loan data error : ", err);
          setIsLoading(false);
          setSelectedLoan({});

          handleClickOpen("someting went wrong");
        }
      }
    };
    fetchData();
  }, [borrower]);

  useEffect(() => {
    const fetchData = async () => {
      if (selectedLoan && selectedLoan._id) {
        try {
          setIsLoading(true);

          // get all Loans by user ID
          let myLoans = loans;

          let result = myLoans.find((aRow) => aRow._id === selectedLoan._id);
          if (result) {
            setFundsReceivedFromPartner(result.fundsReceivedFromPartner);
            setIsFundReleased(result.isFundReleased);
            setValues({
              _id: result._id,
              createdOn: result.createdOn
                ? moment(result.createdOn).format("YYYY-MM-DDTHH:MM")
                : "",

              // finance to alfie
              fpDateTime: result.fpDateTime
                ? moment(result.fpDateTime).format("YYYY-MM-DDTHH:MM")
                : "",
              fpAmountReceived: result.fpAmountReceived
                ? result.fpAmountReceived
                : result.loanAmount,
              fpFeesDeducted: result.fpFeesDeducted,
              refIdOfContract: result.refIdOfContract,
              // alfie to borrower
              alfDateTime: result.alfDateTime
                ? moment(result.alfDateTime).format("YYYY-MM-DDTHH:MM")
                : "",
              alfAmountDisburse: result.alfAmountDisburse
                ? result.alfAmountDisburse
                : result.loanAmount,
              alfTransferType: result.alfTransferType,

              loanAmount: result.loanAmount,
              tenure: result.tenure ? parseInt(result.tenure) : "NA",

              profit: result.loanAmount
                ? calcProfit(result.loanAmount, result.productType)
                : "NA",
              fees: result.loanAmount ? calcFees(result.loanAmount) : "NA",
              amtCredited: result.loanAmount
                ? result.loanAmount - calcFees(result.loanAmount)
                : "NA",
              emiAmountPerMonth: result.loanAmount
                ? calcEMI(result.loanAmount, result.tenure, result.productType)
                : "NA",

              emiStartDate: result.emiStartDate
                ? moment(result.emiStartDate).format("YYYY-MM-DD")
                : "",
              remarks: result.remarks,
            });

            setIsLoanData(true);
            setIsLoading(false);
          } else {
            setIsLoanData(false);
            handleClickOpen("Loan Details Not Found for this Loan ID");
          }
        } catch (err) {
          setIsLoading(false);
          setIsLoanData(false);
          resetFormValues();

          handleClickOpen("someting went wrong");
        }
      } else {
        // reset form values
        resetFormValues();
        setIsLoanData(false);
      }
    };
    fetchData();
  }, [selectedLoan]);

  const SubmitHandler = async (event) => {
    event.preventDefault();
    if (validateData()) {
      setIsLoading(true);
      try {
        const dbResult = await axios
          .put(
            `${
              process.env.REACT_APP_URL
                ? process.env.REACT_APP_URL
                : "http://104.131.5.210:7400/api"
            }/loans/disburse/${selectedLoan._id}`,
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

              emiStartDate:
                values.emiStartDate &&
                values.emiStartDate !== "" &&
                values.emiStartDate,
              remarks:
                values.remarks && values.remarks !== "" && values.remarks,
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

          // reset values
          resetFormValues();

          setBorrower();
          setLoanApplicants([]);
          setLoans([]);
          setSelectedLoan({});

          // Everything is fine then reset page
          getLoanApplicants();
          //   history.push("/disbursement");
          handleClickOpen("Loan Disbursed processed successfully !!!");
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
        <div className="features-section">
          <div className="container contact-us-container">
            <Card>
              <div className="container contact-us-content-container">
                <div className="col-md-12 contact-us-form-section">
                  {/* <div className="col-md-6 contact-us-form-section"> */}
                  <div className="col-md-12 title-section contact-us-title-section">
                    <h2 className="title">DISBURSEMENT OF FUNDS</h2>
                  </div>
                  <div className="form-section">
                    <form onSubmit={SubmitHandler}>
                      <div className="col-md-12">
                        <div className="row">
                          <div className="col-md-6">
                            <Autocomplete
                              size="small"
                              getOptionSelected={(option, value) =>
                                option === value
                              }
                              getOptionLabel={(option) =>
                                typeof option === "string"
                                  ? option
                                  : option.firstName + " " + option.lastName
                              }
                              options={loanApplicants}
                              renderInput={(params) => (
                                <TextField
                                  label="Loan Applicant / Borrower"
                                  name="borrower"
                                  {...params}
                                  fullWidth
                                  variant="outlined"
                                />
                              )}
                              value={borrower}
                              onChange={(event, value) => {
                                setBorrower(value);
                              }}
                            />
                          </div>
                          <div className="col-md-6">
                            <Autocomplete
                              size="small"
                              getOptionSelected={(option, value) =>
                                option === value
                              }
                              getOptionLabel={(option) =>
                                typeof option === "string" ? option : option._id
                              }
                              options={loans}
                              renderInput={(params) => (
                                <TextField
                                  label="Loan Ids"
                                  name="loans"
                                  {...params}
                                  fullWidth
                                  variant="outlined"
                                />
                              )}
                              value={selectedLoan}
                              onChange={(event, value) =>
                                setSelectedLoan(value)
                              }
                              disabled={loans.length === 1}
                            />
                          </div>
                        </div>
                      </div>

                      {isLoanData && (
                        <>
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
                                        min: values.createdOn,
                                        max: todayDate,
                                      }}
                                      value={values.fpDateTime}
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
                                      name="fpAmountReceived"
                                      variant="outlined"
                                      value={values.fpAmountReceived}
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
                                    <TextField
                                      label="Fees"
                                      size="small"
                                      type="number"
                                      fullWidth
                                      name="fpFeesDeducted"
                                      variant="outlined"
                                      value={values.fpFeesDeducted}
                                      onChange={(event) =>
                                        onChangeHandler(event)
                                      }
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
                                      onChange={(event) =>
                                        onChangeHandler(event)
                                      }
                                      required
                                    />
                                  </div>
                                </div>
                              </div>
                              <br />

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
                                            min: values.fpDateTime,
                                            max: todayDate,
                                          }}
                                          value={values.alfDateTime}
                                          onChange={(event) => {
                                            onChangeHandler(event);
                                          }}
                                          variant="outlined"
                                          size="small"
                                          fullWidth
                                          required
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
                                          inputProps={{
                                            min: 0,
                                            max: values.fpAmountReceived,
                                          }}
                                          value={values.alfAmountDisburse}
                                          onChange={(event) =>
                                            onChangeHandler(event)
                                          }
                                          required
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
                                              required
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

                              <br />
                              {/* Loan & repayment Details */}
                              <div className="col-md-12">
                                <div className="row">
                                  <div className="col-md-6">
                                    <table className="table">
                                      <tbody>
                                        <tr>
                                          <td>Applied Amount</td>
                                          <td className="text-right">
                                            RM {values.loanAmount}
                                          </td>
                                        </tr>
                                        <tr>
                                          <td>Profit</td>
                                          <td className="text-right">
                                            RM {values.profit} Per Month
                                          </td>
                                        </tr>
                                        <tr>
                                          <td>Fees</td>
                                          <td className="text-right">
                                            RM {values.fees}
                                          </td>
                                        </tr>
                                        <tr>
                                          <td>Amount Credited to Borrower</td>
                                          <td className="text-right">
                                            RM {values.amtCredited}
                                          </td>
                                        </tr>
                                        <tr>
                                          <td>Tenure</td>
                                          <td className="text-right">
                                            {values.tenure} {" Months"}
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                              <hr />

                              {isFundReleased && (
                                <>
                                  <div className="col-md-12">
                                    <h1>
                                      {" "}
                                      <b>REPAYMENT DETAILS </b>
                                    </h1>
                                    <br />
                                    <div className="row">
                                      <div className="col-md-6">
                                        <h3>
                                          EMI Amount:{" RM "}
                                          {values.emiAmountPerMonth}
                                        </h3>
                                        <br />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-12">
                                    <div className="row">
                                      <div className="col-md-6">
                                        <TextField
                                          label="EMI Start Date"
                                          name="emiStartDate"
                                          type="date"
                                          InputLabelProps={{
                                            shrink: true,
                                          }}
                                          inputProps={{
                                            min: moment(
                                              values.alfDateTime
                                            ).format("YYYY-MM-DD"),
                                          }}
                                          value={values.emiStartDate}
                                          onChange={(event) =>
                                            onChangeHandler(event)
                                          }
                                          variant="outlined"
                                          size="small"
                                          fullWidth
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
                                          label="Remarks"
                                          name="remarks"
                                          // type="text"
                                          multiline
                                          rows={3}
                                          rowsMax={5}
                                          InputLabelProps={{
                                            shrink: true,
                                          }}
                                          value={values.remarks}
                                          onChange={(event) =>
                                            onChangeHandler(event)
                                          }
                                          variant="outlined"
                                          size="small"
                                          fullWidth
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </>
                              )}
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
            </Card>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default AddEditDisbursement;
