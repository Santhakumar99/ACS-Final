import React, { useEffect, useState } from "react";
// import { makeStyles } from "@material-ui/core/styles";
import { useLocation } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import { Modal } from "react-bootstrap";
import DataTable from "react-data-table-component";
// import AddIcon from "@material-ui/icons/Add";
import { useHistory } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import XLSX from "xlsx";
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

const Repayment = ({ toChild }) => {
  const location = useLocation();
  const [selectedData, setSelectedData] = useState([{}]);
  const history = useHistory();
  const [repaymentSelectId, setRepaymentSelectId] = useState([]);
  let token = localStorage.getItem("token");
  var todayDate = new Date();
  const [show, setShow] = useState(false);
  const [users, setUsers] = useState();
  const handleCloseModel = () => setShow(false);
  const handleShowModel = () => setShow(true);
  const [paymentAlert, setPaymentAlert] = useState({
    alertBox: false,
  });
  const [errors, setError] = useState({
    transactionIdError: "",
    paidDateError: "",
  });
  const [visibleEmi, setVisbleEmi] = useState();
  var allUsers = [];
  // console.log(allUsers);
  /**************************** get the selected table data from unpaid loans start ***************************************** */
  // useEffect(() => {
  //   getData();
  // }, [location]);

  /******************************* getting user details in selected loans display in borrowers dropdown start ************** */

  // let borrowers = selectedData != null && selectedData.map((uId) => uId.userId);
  // console.log(borrowers);

  /******************************* getting the selected disbursement loans data **************************************/

  // const getData = () => {
  //   console.log(location.state.selectedRows);
  //   const Datavalue =
  //     location != null && location.state != null && location.state.selectedRows;
  //   setSelectedData(Datavalue);
  //   console.log(selectedData);
  // };

  /******************************* Calculating total loan amount and fees ********************************/

  // let bulkDataLoanFees = [];
  // let bulkDataLoanAmount = [];

  // const bulkData1 =
  //   location != null && location.state != null && location.state.selectedRows;
  // console.log(bulkData1);
  // bulkDataLoanFees = bulkData1.map((bd) => bd.loanFees);
  // bulkDataLoanAmount = bulkData1.map((bd) => bd.loanAmount);
  // console.log(bulkDataLoanFees);
  // console.log(bulkDataLoanAmount);

  // let LoanFeesSum = 0;
  // let LoanAmountSum = 0;

  // for (let i = 0; i < bulkDataLoanFees.length; i++) {
  //   LoanFeesSum += bulkDataLoanFees[i];
  // }
  // for (let i = 0; i < bulkDataLoanAmount.length; i++) {
  //   LoanAmountSum += bulkDataLoanAmount[i];
  // }
  // const totalApprovedLoan = LoanAmountSum + LoanFeesSum;
  // console.log(totalApprovedLoan);
  // console.log(LoanFeesSum);
  // console.log(LoanAmountSum);

  /*******************************XL sheet List data selected ********************************/

  /**************************** get the selected table data from unpaid loans end ***************************************** */

  todayDate = moment(todayDate).format("YYYY-MM-DDTHH:MM");
  //   console.log("Today Date", todayDate);
  // Utility Common Functions

  const calcProfit = (amt, productType) => {
    let ans = productType === "Qard Hasan" ? 0 : (1.5 / 100) * amt;
    return ans >= 0 ? Math.round(ans) : "NA";
  };

  const calcFees = (amt) => {
    let ans = (1 / 100) * amt;
    return ans ? Math.round(ans) : "NA";
  };
  const calcEMI = (amt, tenure, productType) => {
    let profit = calcProfit(amt, productType);
    let ans = Math.round(amt / parseInt(tenure) + parseFloat(profit));
    // console.log("profit ", profit);
    // console.log("EMI ", ans);
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
    emiAmount: "",
    remarks: "",
    paidAmount: "",
    paidDate: "",
    transactionId: "",
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
  const [selectedLoan, setSelectedLoan] = useState([]);

  const [isLoanData, setIsLoanData] = useState(false);

  // get all loan applicant
  useEffect(() => {
    getLoanApplicants();
    const RepaymentDisbursement = async () => {
      try {
        const result = await axios.get(
          `http://localhost:7400/api/loans/mydisbursed`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        console.log(result.data);
      } catch (error) {
        console.log(error);
      }
    };
    RepaymentDisbursement();
  }, []);
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
      // console.log(result);
      if (result && result.data) {
        setLoanApplicants(result.data?.data);
        setUsers(result.data?.data);
        setIsLoading(false);
      }
    } catch (err) {
      console.log("Fetching applicant data error : ", err);
      setIsLoading(false);

      handleClickOpen("someting went wrong");
    }
  };

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
              }/loans/mydisbursed?userId=${borrower._id}`,
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
          console.log(result);
          if (result && result.data) {
            let allLoans = result?.data?.loans;

            setLoans(allLoans != null && allLoans);
            allLoans != null &&
              allLoans.length === 1 &&
              setSelectedLoan(allLoans != null && allLoans[0]);
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
    let sk;

    fetchData();
    GetRepayment();
  }, [selectedLoan]);

  const fetchData = async () => {
    if (selectedLoan && selectedLoan._id) {
      try {
        setIsLoading(true);

        // get all Loans by user ID
        let myLoans = loans;

        let result = myLoans.find((aRow) => aRow._id === selectedLoan._id);
        // console.log(result._id);
        setRepaymentSelectId(result._id);
        // console.log(repaymentSelectId);
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
            emiAmount: result.emiAmount ? result.emiAmount : undefined,
            fpFeesDeducted: result.fpFeesDeducted
              ? result.fpFeesDeducted
              : result.loanFees,
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

  const GetRepayment = async () => {
    if (selectedLoan && selectedLoan._id) {
      setIsLoading(true);
      try {
        let myLoans = loans;

        let Result = myLoans.find((aRow) => aRow._id === selectedLoan._id);

        const RepaymentSelectedID = Result != null && Result._id;
        // console.log(RepaymentSelectedID);
        const result = await axios.get(
          `${process.env.REACT_APP_URL}/payments/myrepayments?loanId=${RepaymentSelectedID}`,
          // `http://localhost:7400/api/payments/myrepayments?loanId=615428791792de2262b722b4`,
          // 615428791792de2262b722b4
          {
            headers: {
              Authorization: token,
            },
          }
        );
        if (result != null && result.data) {
          let array = result.data.repayments;
          for (let i = 0; i < array.length; i++) {
            const element = array[i];
            element.id = i + 1;
            // element.Name = getInterviewerName(
            //   element.userId != null && element.userId ? element.userId : "-"
            // );
          }
          // console.log(array);
          const Rpm =
            array != null &&
            array[0] != null &&
            array[0].loanRepaymentDetails != null &&
            array[0].loanRepaymentDetails.map((sk) => sk);
          console.log(Rpm);
          setRepaymentSelectId(Rpm);
          console.log(RepaymentSelectedID);

          var VEmi =
            Rpm != null &&
            Rpm.filter((em) => em.emiMonth && em.isEMIRepaid === false);
          console.log(VEmi);

          if (VEmi != null && VEmi.length > 0 && VEmi) {
            var Data =
              VEmi != null &&
              VEmi.reduce(function (prev, curr) {
                // sk = prev.emiMonth < curr.emiMonth ? prev : curr;
                return prev.emiMonth < curr.emiMonth ? prev : curr;
              });
            console.log(Data);
          }
          setVisbleEmi(Data);
        }
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    }
  };

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

  const onSubmit = async (event) => {
    event.preventDefault(); // Prevent default submission
    // await Onpayment();
    setIsLoading(true);
    let myLoans = loans;
    let Result = myLoans.find((aRow) => aRow._id === selectedLoan._id);
    const RepaymentLoanId = Result != null && Result._id;

    const payment = {
      loanId: RepaymentLoanId,
      emiAmount: values.emiAmount,
      paymentDateTime: values.paidDate,
      transaction_ref_no: values.transactionId,
      remarks: values.remarks,
    };
    console.log(payment);
    if (
      repaymentSelectId != null &&
      values.emiAmount &&
      values.paidDate &&
      values.transactionId
    ) {
      try {
        // setIsLoading(true);
        const result = await axios.post(
          `${
            process.env.REACT_APP_URL
              ? process.env.REACT_APP_URL
              : "http://104.131.5.210:7400/api"
          }/payments/via_portal`,
          payment,
          { headers: { Authorization: token } }
        );
        console.log(result);
        handleCloseModel();
        setIsLoading(false);
        result.data
          ? handleClickOpen("Payment Successful")
          : handleClickOpen("Something went wrong !!!");
        GetRepayment();
        setValues({ paidDate: "", transactionId: "", remarks: "" });
      } catch (error) {
        console.log("Error", error);
        setIsLoading(false);
        error.result
          ? handleClickOpen(error.result)
          : handleClickOpen("Something went wrong !!!");
      }
    } else {
      return;
    }
  };
  var sk;
  const Disable = () => {
    return;
  };

  const conditionalRowStyles = [
    {
      when: (row) => row,
      style: {
        // backgroundColor: 'green',
        border: "1px black",
        color: "black",
        fontWeight: 500,
        "&:hover": {
          cursor: "pointer",
        },
      },
    },
  ];
  const customStyles = {
    headCells: {
      style: {
        // paddingLeft: "8px", // override the cell padding for head cells
        // paddingRight: "8px",
        backgroundColor: "#0984e1",
        color: "white",
        fontWeight: 700,
      },
    },
    cells: {
      style: {
        // fontSize: "17px",
        // paddingLeft: "0 8px",
        // backgroundColor: "#0984e1",
      },
    },
  };
  var nf = new Intl.NumberFormat();
  const serverSideColumns = [
    {
      name: "EMI Month",
      selector: "Product",
      sortable: true,
      format: (row) => (
        <div data-tag="allowRowEvents" className="tq-td">
          <div aria-hidden="true">
            {row.emiMonth ? row.emiMonth : undefined}
          </div>
        </div>
      ),
      // format: (row) => {
      //   return row.productType;
      // },
      wrap: true,
    },
    {
      name: "EMI Due Date",
      selector: "AmountbyRm",
      sortable: true,
      format: (row) => (
        <div data-tag="allowRowEvents" className="tq-td">
          <div aria-hidden="true">
            {row.emiDueDate
              ? moment(row.emiDueDate).format("DD-MM-YYYY")
              : undefined}
          </div>
        </div>
      ),
      // format: (row) => {
      //   return row.loanAmount;
      // },
      wrap: true,
    },
    {
      name: "EMI Amount (RM)",
      selector: "fees",
      sortable: true,
      right: true,
      format: (row) => (
        <div data-tag="allowRowEvents" className="tq-td">
          <div
            aria-hidden="true"
            // onClick={(e) =>
            //   history.push("/outstandingLoanDetails?id=" + row._id)
            // }
          >
            {EMIamount}
          </div>
        </div>
      ),
      // format: (row) => {
      //   return row.productType;
      // },
      wrap: true,
    },

    {
      name: "Status",
      selector: "Status",
      sortable: true,
      format: (row) => (
        <div data-tag="allowRowEvents" className="tq-td">
          <div aria-hidden="true">
            {row != null && row.isEMIRepaid === true ? (
              <span style={{ color: "green", fontWeight: "600" }}>PAID</span>
            ) : (
              <button
                type="button"
                disabled={
                  (row != null && row.emiMonth != null && row.emiMonth) ===
                    (visibleEmi.emiMonth != null &&
                      visibleEmi.emiMonth != null &&
                      visibleEmi.emiMonth) && row.isEMIRepaid === false ? (
                    ""
                  ) : (
                    <span className="DisableButton">{Disable}</span>
                  )
                }
                className="btn btn-primary"
                onClick={handleShowModel}
                style={{
                  background: "linear-gradient(60deg, #0066ff, #ff99ff)",
                  border: "none",
                  marginTop: "10px",
                }}
              >
                Make Payment
              </button>
            )}
            {/* {console.log(sk != null && sk.emiMonth)} */}
          </div>
        </div>
      ),
      wrap: true,
    },
  ];

  const EMIamount = selectedLoan != null && selectedLoan.emiAmount;
  const CloseForm = () => {
    handleCloseModel();
    setValues({ paidDate: "", transactionId: "", remarks: "" });
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
            <Button onClick={handleClose} autoFocus>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      <Button variant="primary" onClick={handleShowModel}>
        Launch demo modal
      </Button>

      <Modal
        show={show}
        onHide={handleCloseModel}
        style={{ marginTop: "100px" }}
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title>Repayment Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <form onSubmit={onSubmit}>
              <div>
                <h5 style={{ padding: "10px", fontSize: "18px" }}>
                  EMI Amount (RM):{" "}
                  <span style={{ color: "blueviolet" }}>{EMIamount}</span>
                </h5>
              </div>
              <div className="AlertBox Date" style={{ margin: "10px" }}>
                <TextField
                  label="Date"
                  name="paidDate"
                  type="datetime-local"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  // inputProps={{
                  //   min: todayDate,
                  //   // max: todayDate,
                  // }}
                  InputProps={{
                    inputProps: { max: todayDate },
                  }}
                  value={values.paidDate}
                  onChange={(event) => {
                    // console.log("Date ", event.target.value);
                    onChangeHandler(event);
                  }}
                  variant="outlined"
                  size="small"
                  fullWidth
                  required
                />
              </div>
              <div className="paymentID" style={{ margin: "10px" }}>
                <TextField
                  label="Transaction Id"
                  size="small"
                  type="text"
                  fullWidth
                  name="transactionId"
                  variant="outlined"
                  value={values.transactionId}
                  onChange={(event) => {
                    // console.log("Tid ", event.target.value);
                    onChangeHandler(event);
                  }}
                  required
                />
              </div>
              <div className="paymentID" style={{ margin: "10px" }}>
                <TextField
                  label="Remarks"
                  size="small"
                  type="text"
                  fullWidth
                  name="remarks"
                  variant="outlined"
                  value={values.remarks}
                  onChange={(event) => {
                    // console.log("Tid ", event.target.value);
                    onChangeHandler(event);
                  }}
                  // required
                />
              </div>
              <Modal.Footer>
                <Button
                  variant="outlined"
                  // onClick={Onpayment}
                  style={{
                    background: "linear-gradient(60deg, #0066ff, #ff99ff)",
                    color: "white",
                  }}
                  type="submit"
                >
                  Submit
                </Button>
                <Button
                  variant="primary"
                  onClick={CloseForm}
                  style={{
                    background: "linear-gradient(60deg, #0066ff, #ff99ff)",
                    color: "white",
                  }}
                >
                  close
                </Button>
              </Modal.Footer>
            </form>
          </div>
        </Modal.Body>
      </Modal>

      {!isLoading && (
        <div className="features-section" style={{ padding: "50px" }}>
          <div className="contact-us-container">
            <Card>
              <div className="contact-us-content-container">
                <div className="col-md-12 contact-us-form-section">
                  {/* <div className="col-md-6 contact-us-form-section"> */}
                  <div className="col-md-12 title-section contact-us-title-section">
                    <h2 className="title">REPAYMENTS</h2>
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
                              required
                            />
                            {errors.paidDateError && (
                              <small
                                className="email-error"
                                style={{ color: "red" }}
                              >
                                {errors.paidDateError}
                              </small>
                            )}
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
                              onChange={(event, value) => {
                                // console.log(value);
                                setSelectedLoan(value);
                              }}
                              disabled={loans.length === 1}
                              required
                            />
                            {errors.transactionIdError && (
                              <small
                                className="email-error"
                                style={{ color: "red" }}
                              >
                                {errors.transactionIdError}
                              </small>
                            )}
                          </div>
                        </div>
                      </div>
                      <br />
                      {/* <button
                        type="button"
                        className="btn btn-primary"
                        onClick={handleShowModel}
                        style={{
                          background:
                            "linear-gradient(60deg, #0066ff, #ff99ff)",
                          border: "none",
                          float: "right",
                        }}
                      >
                        Make Payment
                      </button> */}
                      {borrower &&
                      borrower._id &&
                      repaymentSelectId != null &&
                      repaymentSelectId.length > 0 &&
                      repaymentSelectId ? (
                        <div className="PieChart-Table">
                          <DataTable
                            className="react-dataTable"
                            columns={serverSideColumns}
                            // pagination={true}
                            // paginationPerpage={10}
                            customStyles={customStyles}
                            conditionalRowStyles={conditionalRowStyles}
                            data={repaymentSelectId}
                            height={400}
                          />
                        </div>
                      ) : undefined}
                      {/* <div className="table-responsive">
                        <table className="table table-bordered">
                          <thead>
                            <tr>
                              <th scope="col">S.No</th>
                              <th scope="col">EMI Amount (RM)</th>
                              <th scope="col"> Repayment Status</th>
                              <th scope="col">Payment</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>1</td>
                              <td>{values.emiAmount}</td>
                              <td>Due</td>
                              <th>
                                <button
                                  type="button"
                                  className="btn btn-primary"
                                  onClick={handleShowModel}
                                  style={{
                                    background:
                                      "linear-gradient(60deg, #0066ff, #ff99ff)",
                                    border: "none",
                                  }}
                                >
                                  Make Payment
                                </button>
                              </th>
                            </tr>
                          </tbody>
                        </table>
                      </div> */}

                      {/* <button
                        type="button"
                        className="btn btn-primary dSubmit"
                        onClick={Onpayment}
                      >
                        Submit
                      </button> */}
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

export default Repayment;
