import React from "react";
import { useEffect, useState } from "react";
// import "../Css/Loanperformance.css";
import axios from "axios";
import "../Approval/Approval.css";
import jwt_decode from "jwt-decode";
import Loader from "../../common/Loader";
import { useLocation } from "react-router-dom";
import "../../css/style.css";
import "../../common/loader.css";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TextField } from "@material-ui/core";
// import logo3 from "../../images/line3.png";
const LoanApplications = () => {
  const history = useHistory();
  const [LoanApplications, setLoanApplications] = React.useState([{}]);
  const [values, setvalues] = React.useState({
    remarks: "",
  });
  const [open, setOpen] = React.useState(false);
  const [errMsg, setErrMsg] = useState(undefined);
  const [success, setSuccess] = useState(undefined);

  const handleClickOpen = (msg) => {
    setErrMsg(msg);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    getLoansApprovedData();
  }, []);

  //getting the token value

  var token = localStorage.getItem("token");
  var decoded = jwt_decode(token);
  console.log(decoded);

  //getting the loan id from list loans page
  const search = useLocation().search;
  const LoanApplicationID = new URLSearchParams(search).get("id");
  console.log(LoanApplicationID);

  const getLoansApprovedData = async () => {
    setIsLoading(true);
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_URL}/loans/application/${LoanApplicationID}`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      console.log(result.data);
      setLoanApplications(result.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      error != null &&
      error.response != null &&
      error.response.data != null &&
      error.response.data.errors[0]
        ? handleClickOpen(
            error != null &&
              error.response != null &&
              error.response.data != null &&
              error.response.data.errors[0] &&
              error.response.data.errors[0].msg
          )
        : handleClickOpen("Something went wrong !!!");
    }
  };
  const LoanApprove = async () => {
    const valuesObj = {
      isLoanApproved: true,
      // loanApprovedOrRejectedBy: decoded != null && decoded.userId,
      remarks: values.remarks,
    };
    try {
      setIsLoading(true);
      const result = await axios.put(
        `${process.env.REACT_APP_URL}/loans/approve_or_reject/${LoanApplicationID}`,
        valuesObj,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      console.log(result.data);
      setIsLoading(false);
      // if (handleClickOpen) {
      handleClickOpen("Approved Successfuly");
      closeForm();
      history.push("/transactionQueue");
      // return (window.location = "/transactionQueue");
      // }

      // setLoanApplications(result.data);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      error != null &&
      error.response != null &&
      error.response.data != null &&
      error.response.data.errors[0]
        ? handleClickOpen(
            error != null &&
              error.response != null &&
              error.response.data != null &&
              error.response.data.errors[0] &&
              error.response.data.errors[0].msg
          )
        : handleClickOpen("Something went wrong !!!");
    }
  };
  const LoanReject = async () => {
    const valuesObj = {
      isLoanApproved: false,
      // loanApprovedOrRejectedBy: decoded != null && decoded.userId,
      remarks: values.remarks,
    };
    try {
      const result = await axios.put(
        `${process.env.REACT_APP_URL}/loans/approve_or_reject/${LoanApplicationID}`,
        valuesObj,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      console.log(result.data);
      handleClickOpen("Rejected Successfuly");
      // toast.success("Rejected Successfuly", {
      //   position: "top-center",
      //   autoClose: 5000,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined,
      // });
      // closeForm();
      history.push("/transactionQueue");
      // return (window.location = "/transactionQueue");
      // setLoanApplications(result.data);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      error != null &&
      error.response != null &&
      error.response.data != null &&
      error.response.data.errors[0]
        ? handleClickOpen(
            error != null &&
              error.response != null &&
              error.response.data != null &&
              error.response.data.errors[0] &&
              error.response.data.errors[0].msg
          )
        : handleClickOpen("Something went wrong !!!");
    }
  };
  var d =
    LoanApplications != null &&
    LoanApplications.loanApplication != null &&
    LoanApplications.loanApplication.userId != null &&
    LoanApplications.loanApplication.userId.dob;
  var dob = new Date(d);
  //calculate month difference from current date in time
  var month_diff = Date.now() - dob.getTime();

  //convert the calculated difference in date format
  var age_dt = new Date(month_diff);

  //extract year from date
  var year = age_dt.getUTCFullYear();

  //now calculate the age of the user
  var age = Math.abs(year - 1970);
  // return age;
  const profileImage =
    LoanApplications != null &&
    LoanApplications.loanApplication != null &&
    LoanApplications.loanApplication.userId != null &&
    LoanApplications.loanApplication.userId.docPhoto
      ? LoanApplications.loanApplication.userId.docPhoto
      : undefined;

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    let inputValues = values;
    // validateDetails(name, value);
    inputValues[name] = value;
    setvalues({ ...inputValues });
  };

  const closeForm = () => {
    setvalues({
      remarks: "",
    });
  };
  var nf = new Intl.NumberFormat();
  const LoanAmount = nf.format(
    LoanApplications != null &&
      LoanApplications.loanApplication != null &&
      LoanApplications.loanApplication.loanAmount
  );
  console.log(LoanAmount);
  return (
    <div>
      {isLoading && <Loader />}
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
      {isLoading && isLoading ? (
        ""
      ) : (
        <div>
          <div>
            <div
              className="card-title loanApp"
              style={{
                padding: "10px",
                textAlign: "left",
                fontSize: "28px",
                marginTop: "50px",
              }}
            >
              Loan Application Details
            </div>
          </div>
          <p style={{ textAlign: "left", padding: "10px" }} className="loanId">
            Loan Id :{" "}
            {LoanApplications.loanApplication &&
              LoanApplications.loanApplication._id}
          </p>
          <div className="LaonApplications">
            <div className="row">
              <div className="col-lg-2 col-md-2 col-sm-12">
                <div className="card">
                  <div className="card-title">Profile Photo</div>
                  {/* <img src={profileImage} alt="image" /> */}
                  <img
                    src={`http://localhost:7400/api/profile_photo/0b7e68a0-0665-11ec-bd6b-cbcd51ced612.jpeg`}
                    alt="image"
                    width="200"
                  />
                </div>
              </div>
              <div className="col-lg-2 col-md-2 col-sm-12">
                <div className="card">
                  <div className="card-title">ACS Score</div>
                  <p className="Loan-app-view count">7/10</p>
                </div>
              </div>
              <div className="col-lg-2 col-md-2 col-sm-12">
                <div className="card">
                  <div className="card-title">Loan Amount (RM)</div>
                  <p className="Loan-app-view count">
                    {/* <span className="Rm-text">RM</span> */}
                    {LoanAmount}
                  </p>
                </div>
              </div>
              <div className="col-lg-2 col-md-2 col-sm-12">
                <div className="card">
                  <div className="card-title">Tenure (Months)</div>
                  <p className="Loan-app-view count">
                    {LoanApplications != null &&
                      LoanApplications.loanApplication != null &&
                      LoanApplications.loanApplication.tenure}{" "}
                    {/* Months */}
                  </p>
                </div>
              </div>
              <div className="col-lg-2 col-md-2 col-sm-12">
                <div className="card">
                  <div className="card-title">Product</div>
                  <p className="Loan-app-view ">
                    {LoanApplications != null &&
                      LoanApplications.loanApplication != null &&
                      LoanApplications.loanApplication.productType}
                  </p>
                </div>
              </div>
              <div className="col-lg-2 col-md-2 col-sm-12">
                {LoanApplications != null &&
                LoanApplications.repeatBorrower != null &&
                LoanApplications.repeatBorrower.isRepeat ? (
                  <div className="card">
                    <div className="card-title">Repeat Customer</div>
                    <p className="Loan-app-view">
                      {LoanApplications != null &&
                        LoanApplications.repeatBorrower != null &&
                        LoanApplications.repeatBorrower.isRepeat}
                    </p>
                  </div>
                ) : undefined}
              </div>
            </div>
            <div className="row profile-Loan">
              <div className="col-lg-6 col-md-6 col-sm-12">
                <div className="card profile">
                  <div className="card-title outstanding">Profile Details</div>
                  <p className="profile-details">
                    Name:
                    <span className="profile-content">
                      {LoanApplications != null &&
                        LoanApplications.loanApplication != null &&
                        LoanApplications.loanApplication.userId != null &&
                        LoanApplications.loanApplication.userId.firstName}
                    </span>
                  </p>
                  <p className="profile-details">
                    IC:
                    <span className="profile-content">
                      {" "}
                      {LoanApplications != null &&
                        LoanApplications.loanApplication != null &&
                        LoanApplications.loanApplication.userId != null &&
                        LoanApplications.loanApplication.userId.icNumber}
                    </span>
                  </p>
                  <p className="profile-details">
                    Gender:
                    <span className="profile-content">
                      {" "}
                      {LoanApplications != null &&
                        LoanApplications.loanApplication != null &&
                        LoanApplications.loanApplication.userId != null &&
                        LoanApplications.loanApplication.userId.gender}
                    </span>
                  </p>
                  <p className="profile-details">
                    Age:
                    <span className="profile-content"> {age}</span>
                  </p>
                  <p className="profile-details">
                    Education Level:
                    <span className="profile-content">
                      {" "}
                      {LoanApplications != null &&
                        LoanApplications.loanApplication != null &&
                        LoanApplications.loanApplication.userId != null &&
                        LoanApplications.loanApplication.userId.educationLevel}
                    </span>
                  </p>
                  <p className="profile-details">
                    Maritial Status:
                    <span className="profile-content">
                      {" "}
                      {LoanApplications != null &&
                        LoanApplications.loanApplication != null &&
                        LoanApplications.loanApplication.userId != null &&
                        LoanApplications.loanApplication.userId.maritalStatus}
                    </span>
                  </p>
                  {/* <p>Others</p> */}
                </div>
              </div>

              <div className="col-lg-6 col-md-6 col-sm-12">
                {LoanApplications != null &&
                LoanApplications.repeatBorrower != null &&
                LoanApplications.repeatBorrower.isRepeat.No ? (
                  <div className="card">
                    <div className="card-title">Loan History</div>
                    <p className="profile-details">
                      <span className="loan-head">Loan Id:</span>
                      <span className="LoanContent">
                        {" "}
                        {LoanApplications.loanApplication &&
                          LoanApplications.loanApplication._id}
                      </span>
                    </p>
                    <p className="profile-details">
                      <span className="loan-head"> Number of Loans Taken:</span>
                      <span className="LoanContent">
                        {" "}
                        {LoanApplications.numOfLoansTaken != null &&
                          LoanApplications.numOfLoansTaken.count}
                      </span>
                    </p>
                    <p className="profile-details">
                      <span className="loan-head">Late Payments:</span>
                      <span className="LoanContent">
                        {" "}
                        {LoanApplications.anyLatePayments != null &&
                          LoanApplications.anyLatePayments}
                      </span>
                    </p>
                    <p className="profile-details">
                      <span className="loan-head"> Defaults:</span>
                      <span className="LoanContent">
                        {" "}
                        {LoanApplications.anyDefaults != null &&
                          LoanApplications.anyDefaults}
                      </span>
                    </p>
                    <p className="profile-details">
                      Rejected Loans:
                      <span className="LoanContent">
                        {" "}
                        {LoanApplications.numOfRejectedLoans != null &&
                          LoanApplications.numOfRejectedLoans}
                      </span>
                    </p>
                  </div>
                ) : (
                  ""
                )}
                <div className="row">
                  <div className="card-title" style={{ padding: "10px" }}>
                    Remarks
                  </div>
                  <div class="col-sm-12">
                    <textarea
                      className="form-control"
                      id="remarks"
                      rows="3"
                      placeholder="Remarks"
                      name="remarks"
                      value={values.remarks}
                      onChange={(e) => onChangeHandler(e)}
                      required
                    ></textarea>
                  </div>
                  {/* <div className="col-md-12">
                    <TextField
                      id="filled-multiline-flexible"
                      label="Multiline"
                      multiline
                      maxRows={4}
                      // value={value}
                      // onChange={handleChange}
                      variant="filled"
                    />
                  </div> */}
                </div>
                <div className="Action-buttons">
                  {/* <div className="row"> */}
                  {/* <div className="col-lg-6 col-md-6 col-sm-6"> */}
                  <div className="col-lg-6 contact-us-form-group">
                    <button
                      className="contact-us-form-btn approveReject"
                      type="submit"
                      onClick={LoanApprove}
                    >
                      Approve
                    </button>
                    {/* </div>
                  <div className="col-lg-6 contact-us-form-group"> */}
                    <button
                      className="contact-us-form-btn approveReject"
                      type="submit"
                      onClick={LoanReject}
                    >
                      Reject
                    </button>
                  </div>
                  {/* <div className=" col-lg-6 contact-us-form-group approv-button">
                    <button
                      type="button"
                      className="contact-us-form-btn"
                      // className="btn btn-primary approve"
                      onClick={LoanApprove}
                    >
                      Approve
                    </button>
                    <button type="button" className="btn btn-danger reject">
                      Reject
                    </button>
                  </div> */}
                  {/* </div> */}
                  {/* <div className="col-lg-6 col-md-6 col-sm-6"> */}
                  <div className="reject button">
                    {/* </div>
                </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoanApplications;
