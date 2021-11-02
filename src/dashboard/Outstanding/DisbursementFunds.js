import React, { useEffect, useState } from "react";
// import { makeStyles } from "@material-ui/core/styles";
import { useLocation } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import DataTable from "react-data-table-component";
// import AddIcon from "@material-ui/icons/Add";
import { useHistory } from "react-router-dom";
import Toastify from "../Toaster/Toastify";
import XLSX from "xlsx";
// Radio
import { Modal } from "react-bootstrap";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";

import Loader from "../../common/Loader";
import Card from "../../common/Card";

import "../../css/style.css";
import { create } from "@mui/material/styles/createTransitions";
import { Add } from "@material-ui/icons";
// import '../../../common/css/Form.css';

const DisbursementFunds = ({ toChild }) => {
  const location = useLocation();
  var nf = new Intl.NumberFormat();
  const [deleteAlert, setDeleteAlert] = useState({
    alertBox: false,
    deleteId: "",
  });

  const [data, setData] = useState();
  const [selectedData, setSelectedData] = useState([{}]);
  const history = useHistory();
  let token = localStorage.getItem("token");
  var todayDate = new Date(new Date().setHours(23, 59));

  /**************************** get the selected table data from unpaid loans start ***************************************** */
  useEffect(() => {
    getData();
  }, [location]);

  /******************************* getting user details in selected loans display in borrowers dropdown start ************** */

  let borrowers = selectedData != null && selectedData.map((uId) => uId.userId);
  // console.log(borrowers);

  /******************************* getting the selected disbursement loans data **************************************/

  const getData = () => {
    console.log(location.state.selectedRows);
    const Datavalue =
      location != null && location.state != null && location.state.selectedRows;

    if (Datavalue != null && Datavalue) {
      let array = Datavalue;
      for (let i = 0; i < array.length; i++) {
        const element = array[i];
        element.id = i + 1;
        element.sheet = [];
        element.TotalAmountToBorrower = element.loanAmount - element.loanFees;
        element.BorrowerName =
          element.Name != null && element.Name ? element.Name : undefined;
        element.LoanId = element._id;
        element.TotalApprovedAmount = element.loanAmount;
        element.Product = element != null && element.productType;
        element.sheet = {
          "Borrower Name": (element.BorrowerName =
            element.Name != null && element.Name ? element.Name : undefined),
          "IC Number": element.ICnumber ? element.ICnumber : "-",
          "Loan ID": element.LoanId ? element.LoanId : "-",
          "Product Name": element.Product ? element.Product : "-",
          "Total Approved Amount (RM)": element.TotalApprovedAmount
            ? element.TotalApprovedAmount
            : "-",
          "Bank Name":
            element.bankId != null && element.bankId.bankName
              ? element.bankId.bankName
              : "-",
          "Account Number":
            element.bankId != null && element.bankId.accountNumber
              ? element.bankId.accountNumber
              : "-",
        };
        console.log(array);
      }

      setSelectedData(array);
    }
  };

  /******************************* Calculating total loan amount and fees ********************************/

  let bulkDataLoanFees = [];
  let bulkDataLoanAmount = [];

  const bulkData1 =
    location != null && location.state != null && location.state.selectedRows;
  console.log(bulkData1);

  bulkDataLoanFees = bulkData1 != null && bulkData1.map((bd) => bd.loanFees);
  bulkDataLoanAmount =
    bulkData1 != null && bulkData1.map((bd) => bd.loanAmount);
  console.log(bulkDataLoanFees);
  console.log(bulkDataLoanAmount);

  let LoanFeesSum = 0;
  let LoanAmountSum = 0;

  for (let i = 0; i < bulkDataLoanFees.length; i++) {
    LoanFeesSum += bulkDataLoanFees[i];
  }
  for (let i = 0; i < bulkDataLoanAmount.length; i++) {
    LoanAmountSum += bulkDataLoanAmount[i];
  }
  const totalApprovedLoan = LoanAmountSum - LoanFeesSum;
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

  const [show, setShow] = useState(false);

  const handleCloseModel = () => setShow(false);
  const handleShowModel = () => setShow(true);

  const handleClickOpen = (msg) => {
    // handleShowModel();
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
        // let applicants = result?.data?.data;
        // console.log(applicants);
        let applicants =
          selectedData != null &&
          selectedData.userId != null &&
          selectedData.userId;
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
    let DisbursementResult;
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
          // console.log(result);
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
      name: "S.No",
      selector: "id",
      sortable: true,
      maxWidth: "3rem",
      format: (row) => (
        <div data-tag="allowRowEvents" className="tq-td">
          <div aria-hidden="true">{row.id}</div>
        </div>
      ),
      wrap: true,
    },
    {
      name: "Borrower Name",
      selector: "LoanId",
      sortable: true,
      minWidth: "3rem",

      format: (row) => (
        <div data-tag="allowRowEvents" className="tq-td">
          <div aria-hidden="true">{row != null && row.BorrowerName}</div>
        </div>
      ),
      wrap: true,
    },
    {
      name: "Product",
      selector: "Product",
      sortable: true,
      format: (row) => (
        <div data-tag="allowRowEvents" className="tq-td">
          <div aria-hidden="true">{row.productType && row.productType}</div>
        </div>
      ),
      // format: (row) => {
      //   return row.productType;
      // },
      wrap: true,
    },
    {
      name: "Approved Loan Amount (RM)",
      selector: "AmountbyRm",
      sortable: true,
      right: true,
      minWidth: "10rem",
      format: (row) => (
        <div data-tag="allowRowEvents" className="tq-td">
          <div aria-hidden="true">
            {row.loanAmount ? nf.format(row.loanAmount) : undefined}
          </div>
        </div>
      ),
      // format: (row) => {
      //   return row.loanAmount;
      // },
      wrap: true,
    },

    {
      name: "Fees (RM)",
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
            {row.loanFees != null && row.loanFees}
          </div>
        </div>
      ),
      // format: (row) => {
      //   return row.productType;
      // },
      wrap: true,
    },
    {
      name: "Amount Credited to Borrower (RM)",
      selector: "TotalAmountToBorrower",
      sortable: true,
      right: true,
      minWidth: "18rem",
      format: (row) => (
        <div data-tag="allowRowEvents" className="tq-td">
          <div
            aria-hidden="true"
            // onClick={(e) =>
            //   history.push("/outstandingLoanDetails?id=" + row._id)
            // }
          >
            {row.TotalAmountToBorrower != null && row.TotalAmountToBorrower
              ? nf.format(row.TotalAmountToBorrower)
              : undefined}
          </div>
        </div>
      ),
      // format: (row) => {
      //   return row.productType;
      // },
      wrap: true,
    },
  ];
  const GoBACK = () => {
    history.goBack();
  };

  //------------------------------------------ Export Excel Sheet Handling ----------------------------------------------//

  const downloadExcel = () => {
    const Data = selectedData != null && selectedData.map((s) => s.sheet);
    console.log(Data);
    const newData =
      Data != null &&
      Data.map((row) => {
        delete row.createdBy;
        delete row.lastModifiedBy;
        delete row.lastModifiedOn;
        delete row.isActive;
        // delete row.userId;
        delete row.loanRepaymentDetails;
        delete row.__v;
        delete row.isLoanApproved;
        delete row.fundsReceivedFromPartner;
        delete row.isFundReleased;
        delete row._id;
        delete row.createdAt;
        delete row.updatedAt;

        delete row.loanStatus;
        delete row.createdOn;
        delete row.isLoanApproved;
        delete row.fundsReceivedFromPartner;
        delete row.isFundReleased;
        delete row._id;
        delete row.createdAt;
        delete row.updatedAt;
        return row;
      });

    const workSheet = XLSX.utils.json_to_sheet(newData);
    console.log(workSheet);
    const workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(
      workBook,
      workSheet,
      "Loan Disbursement Details"
    );
    //Buffer
    let buf = XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
    //Binary string
    XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
    //Download

    if (selectedData.length > 0) {
      handleClickOpen("File Downloaded Successfully");
      let Download = XLSX.writeFile(workBook, "LoanDetails.xlsx");
    } else {
      handleClickOpen("Something Went Wrong!!!");
    }
  };
  const SelectedTotalDisbursement =
    values.fpAmountReceived - values.fpFeesDeducted;

  const OnDisburse = () => {
    setDeleteAlert({
      ...deleteAlert,
      alertBox: true,
    });

    return;
  };
  var DisbursementResult;
  const DisbursementData = async () => {
    let bulkData = [];
    const bulkData1 = selectedData != null && selectedData;
    bulkData = bulkData1.map((bd) => bd._id);
    setDeleteAlert({
      alertBox: false,
    });
    try {
      setIsLoading(true);
      const result = await axios.put(
        `${process.env.REACT_APP_URL}/loans/bulk_disburse`,
        { loanIds: bulkData },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      console.log(result);

      let DisbursementResult = result;
      console.log(DisbursementResult);
      const response = result.data.faultedLoanIds.map((sk) => sk.loanId);
      const responseMessage = result.data.faultedLoanIds.map((sk) => sk.msg);
      console.log(response);
      console.log(responseMessage);
      const reponseSuccess = result.data.successLoanIds.map((sk) => sk);
      console.log(reponseSuccess);
      setData(result);
      console.log(data);
      // handleShowModel();
      result
        ? handleClickOpen(`Failed Loan ID's :
            ${response ? response : "-"} and Message :${
            responseMessage ? responseMessage : "-"
          }, 
              Successful Loan ID's : ${reponseSuccess ? reponseSuccess : "-"}
            `)
        : // : toast.warning("Something went wrong !!!");
          handleClickOpen("Something went wrong !!!");

      // toast.success("Selected Loans Disbursed Successfully");
      setIsLoading(false);
      // return (window.location = "/unpaidLoans");
    } catch (error) {
      console.log(error);
      handleClickOpen("Something went wrong !!!");
      setIsLoading(false);
    }
  };
  return (
    <React.Fragment>
      <Toastify />
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
      <Modal
        show={show}
        onHide={handleCloseModel}
        style={{ marginTop: "100px" }}
        backdrop="static"
      >
        <Modal.Body>
          <div>
            <span style={{ fontSize: "20px" }}>Successfull Loan ID's</span>
            <br />
            {/* {DisbursementResult != null &&
            DisbursementResult.data.successLoanIds != null &&
            DisbursementResult.data.successLoanIds
              ? DisbursementResult.data.successLoanIds.map((sk) => sk.loanId)
              : undefined} */}
          </div>
          <div>
            {" "}
            <span style={{ fontSize: "20px" }}>Failed Loan ID's</span>
            <br />
            {/* {DisbursementResult != null &&
            DisbursementResult.data.faultedLoanIds != null &&
            DisbursementResult.data.faultedLoanIds
              ? DisbursementResult.data.faultedLoanIds.map((sk) => sk.loanId)
              : undefined} */}
            {console.log(
              "DisbursementResult",
              DisbursementResult != null && DisbursementResult.data
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={handleCloseModel}
            style={{
              background: "linear-gradient(60deg, #0066ff, #ff99ff)",
              color: "white",
            }}
          >
            close
          </Button>
        </Modal.Footer>
      </Modal>

      {deleteAlert.alertBox && (
        <div className="deleteAlertBox">
          <span>
            <div className="deleteAlertBoxContent">
              <i className="fa fa-trash-alt"></i>
              <h4 style={{ fontSize: "18px" }}>Are you sure ?</h4>
              <div className="deleteAlertBoxbutton">
                <div className="deleteAlertBoxDeleteButton">
                  <button className="btn btn-danger" onClick={DisbursementData}>
                    Yes
                  </button>
                </div>
                <div className=" deleteAlertBoxcancelButton">
                  <button
                    className="btn btn-success"
                    onClick={() =>
                      setDeleteAlert({
                        alertBox: false,
                      })
                    }
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </span>
        </div>
      )}
      {!isLoading && (
        <div className="features-section" style={{ paddingTop: "40px" }}>
          <div className="backbutton">
            <button className="btn btn-primary Goback" onClick={GoBACK}>
              <i className="fa fa-arrow-circle-left"></i> Go Back
            </button>
          </div>
          <div className="contact-us-container">
            <Card>
              <div
                className="contact-us-content-container"
                style={{ padding: "10px", background: "white" }}
              >
                <div className="col-md-12 contact-us-form-section">
                  {/* <div className="col-md-6 contact-us-form-section"> */}
                  <div className="col-md-12 title-section contact-us-title-section">
                    <h2 className="title">DISBURSEMENT OF LOANS</h2>
                  </div>
                  <div className="col-md-12">
                    <div className="row">
                      <div className="col-lg-12 col-md-12 col-sm-12">
                        <div className="table-responsive">
                          <table className="table table-bordered">
                            <thead>
                              <tr>
                                <th scope="col">Total Approved Amount (RM)</th>
                                <th scope="col">Total Fees (RM)</th>
                                <th scope="col">
                                  {" "}
                                  Total Amount Credited to Borrowers (RM)
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>
                                  {LoanAmountSum
                                    ? nf.format(LoanAmountSum)
                                    : undefined}
                                </td>
                                <td>
                                  {LoanFeesSum
                                    ? nf.format(LoanFeesSum)
                                    : undefined}
                                </td>
                                <td>
                                  {totalApprovedLoan
                                    ? nf.format(totalApprovedLoan)
                                    : undefined}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="export-button">
                    <button
                      className="btn btn-primary export"
                      onClick={downloadExcel}
                      type="button"
                      style={{ marginRight: "15px" }}
                    >
                      <i className="fa fa-file-excel-o" aria-hidden="true"></i>{" "}
                      Export
                    </button>
                  </div>
                  <div className="PieChart-Table">
                    <DataTable
                      className="react-dataTable"
                      columns={serverSideColumns}
                      // pagination={true}
                      // paginationPerpage={10}
                      customStyles={customStyles}
                      conditionalRowStyles={conditionalRowStyles}
                      data={selectedData}
                      height={400}
                    />
                  </div>

                  <div
                    className="DisbursementSubmit"
                    style={{ padding: "10px" }}
                  >
                    <button
                      type="button"
                      className="btn btn-primary dSubmit"
                      onClick={OnDisburse}
                    >
                      Disbursement
                    </button>
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

export default DisbursementFunds;
