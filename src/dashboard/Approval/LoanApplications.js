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
import { NavLink } from "react-router-dom";
import ListItemText from "@material-ui/core/ListItemText";
// import logo3 from "../../images/line3.png";
import ProfileAvatar from "../../images/Profile_Avatar.png";
import Toastify from "../Toaster/Toastify";
import PageLoader from "../FullPageLoader/PageLoader";
const LoanApplications = () => {
  const history = useHistory();
  const [LoanApplications, setLoanApplications] = React.useState([{}]);
  const [values, setvalues] = React.useState({
    remarks: "",
  });
  const [image, setImage] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [errMsg, setErrMsg] = useState(undefined);
  const [success, setSuccess] = useState(undefined);
  const [approveAlert, setApproveAlert] = useState({
    alertBox: false,
  });
  const [rejectAlert, setRejectAlert] = useState({
    alertBox: false,
  });
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
    // ProfileImage();
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
      remarks: values.remarks,
    };
    if (valuesObj.isLoanApproved === true) {
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
        console.log(result.data.isLoanApproved);
        // toast.success("Approved Successfully");
        result.data
          ? handleClickOpen("Approved Successfully")
          : handleClickOpen("Something went Wrong!!!");
        setIsLoading(false);
        setApproveAlert({
          alertBox: false,
        });
        closeForm();
        if (result.data.isLoanApproved === true) {
          return (window.location = "/pendingApproval");
          // history.push("/pendingApproval");
        } else {
          return;
        }
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
          : // handleClickOpen("Something went wrong !!!");
            toast.warning("Something went wrong !!!");
      }
      // history.push("/pendingApproval");
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
      setRejectAlert({
        alertBox: false,
      });
      // toast.success("Rejected Successfully");
      result.data
        ? handleClickOpen("Rejected Successfully")
        : handleClickOpen("Something went Wrong!!!");
      closeForm();
      if (result.data.isLoanApproved === false) {
        return (window.location = "/pendingApproval");
        // history.push("/pendingApproval");
      } else {
        return;
      }
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
        : toast.warning("Something went wrong !!!");
      // handleClickOpen("Something went wrong !!!");
    }
  };

  const profileimage =
    LoanApplications != null &&
    LoanApplications.loanApplication != null &&
    LoanApplications.loanApplication.userId != null &&
    LoanApplications.loanApplication.userId.docPhoto
      ? LoanApplications.loanApplication.userId.docPhoto
      : undefined;
  console.log(profileimage);

  // const ProfileImage = async () => {
  //   try {
  //     const result = await axios.get(
  //       `${process.env.REACT_APP_URL}/users/${profileimage}?key=docPhoto`,
  //       {
  //         headers: {
  //           Authorization: localStorage.getItem("token"),
  //           "Content-Type": "image/jpg",
  //         },
  //       }
  //     );
  //     console.log(result.data);
  //     setImage(result.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  var d =
    LoanApplications != null &&
    LoanApplications.loanApplication != null &&
    LoanApplications.loanApplication.userId != null &&
    LoanApplications.loanApplication.userId.dob;

  console.log(d);
  var dob = new Date(d);

  //calculate month difference from current date in time
  var month_diff = Date.now() - dob.getTime();
  console.log(month_diff);
  //convert the calculated difference in date format
  var age_dt = new Date(month_diff);
  console.log(age_dt);
  //extract year from date
  var year = age_dt.getUTCFullYear();
  console.log(year);
  //now calculate the age of the user
  var age = Math.abs(year - 1970);
  // return age;
  console.log(age);

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
  console.log(profileimage);

  const GoBACK = () => {
    history.goBack();
  };
  const ApproveLoan = () => {
    setApproveAlert({
      ...approveAlert,
      alertBox: true,
    });
    return;
  };
  const RejectLoan = () => {
    setRejectAlert({
      ...rejectAlert,
      alertBox: true,
    });

    return;
  };

  return (
    <div>
      {isLoading && <Loader />}
      <Toastify />
      {approveAlert.alertBox && (
        <div className="deleteAlertBox">
          <span>
            <div className="deleteAlertBoxContent">
              <i className="fa fa-trash-alt"></i>
              <h4 style={{ fontSize: "18px" }}>Are you sure ?</h4>
              <div className="deleteAlertBoxbutton">
                <div className="deleteAlertBoxDeleteButton">
                  <button className="btn btn-danger" onClick={LoanApprove}>
                    Yes
                  </button>
                </div>
                <div className=" deleteAlertBoxcancelButton">
                  <button
                    className="btn btn-success"
                    onClick={() =>
                      setApproveAlert({
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
      {rejectAlert.alertBox && (
        <div className="deleteAlertBox">
          <span>
            <div className="deleteAlertBoxContent">
              <i className="fa fa-trash-alt"></i>
              <h4 style={{ fontSize: "18px" }}>Are you sure ?</h4>
              <div className="deleteAlertBoxbutton">
                <div className="deleteAlertBoxDeleteButton">
                  <button className="btn btn-danger" onClick={LoanReject}>
                    Yes
                  </button>
                </div>
                <div className=" deleteAlertBoxcancelButton">
                  <button
                    className="btn btn-success"
                    onClick={() =>
                      setRejectAlert({
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
          <div
            className="Navlink"
            style={{ marginTop: "40px", marginLeft: "15px" }}
          >
            <NavLink to="/">
              <ListItemText primary={"Home"} />
            </NavLink>
            <span className="slash">&#47;</span>
            <NavLink to="/pendingApproval">
              <ListItemText primary={"Pending Approval"} />
            </NavLink>
            <span className="slash">&#47;</span>
            <NavLink to="/loanApplications">
              <ListItemText primary={"Loan Application Details"} />
            </NavLink>
          </div>
          <div className="backbutton">
            <button className="btn btn-primary Goback" onClick={GoBACK}>
              <i className="fa fa-arrow-circle-left"></i> Go Back
            </button>
          </div>
          <div>
            <div
              className="card-title loanApp"
              style={{
                padding: "10px",
                textAlign: "left",
                fontSize: "28px",
              }}
            >
              Loan Application Details
            </div>
          </div>

          <div className="LaonApplications">
            <div className="row">
              <div className="col-lg-3 col-md-3 col-sm-12">
                <div className="card">
                  <div className="card-title">Profile Photo</div>

                  {LoanApplications != null &&
                  LoanApplications.loanApplication != null &&
                  LoanApplications.loanApplication.userId != null &&
                  LoanApplications.loanApplication.userId.docPhoto ? (
                    <img
                      src={`${process.env.REACT_APP_URL}/profile_photo/${profileimage}`}
                      alt="images"
                      className="img-radius"
                      width="140px"
                      height="140px"
                    />
                  ) : (
                    // <img
                    //   src={`${process.env.REACT_APP_URL}/profile_photo/08da04d0-056e-11ec-8812-5d7e9463f29b.png}`}
                    //   alt="Profile"
                    //   width="140px"
                    //   height="140px"
                    //   className="Profile-image"
                    // />
                    <img
                      src={ProfileAvatar}
                      className="img-radius"
                      alt="User-Profile"
                    />
                  )}
                </div>
              </div>
              <div className="col-lg-9 col-md-9 col-sm-12">
                <div className="row">
                  <div className="col-lg-4 col-md-4 col-sm-12">
                    <div className="card">
                      <div className="card-title">Acs Score</div>
                      <p className="Loan-app-view count">7/10</p>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-4 col-sm-12">
                    <div className="card">
                      <div className="card-title">Loan Amount (RM)</div>
                      <p className="Loan-app-view count">
                        {/* <span className="Rm-text">RM</span> */}
                        {LoanAmount}
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-4 col-sm-12">
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
                </div>
                <div className="row">
                  <div className="col-lg-4 col-md-4 col-sm-12">
                    <div className="card">
                      <div className="card-title">Loan ID</div>
                      <p className="Loan-app-view">
                        {LoanApplications.loanApplication &&
                          LoanApplications.loanApplication._id}
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-4 col-sm-12">
                    <div className="card">
                      <div className="card-title">Product</div>
                      <p className="Loan-app-view ">
                        {LoanApplications != null &&
                          LoanApplications.loanApplication != null &&
                          LoanApplications.loanApplication.productType}
                      </p>
                    </div>
                  </div>

                  <div className="col-lg-4 col-md-4 col-sm-12">
                    <div className="card">
                      <div className="card-title">Repeat Customer</div>
                      <p className="Loan-app-view">
                        {LoanApplications != null &&
                          LoanApplications.repeatBorrower != null &&
                          LoanApplications.repeatBorrower.isRepeat}
                      </p>
                    </div>
                  </div>
                </div>
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
                    IC Number:
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
                LoanApplications.repeatBorrower.isRepeat === "Yes" ? (
                  <div className="card">
                    <div className="card-title outstanding">Loan History</div>
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
                  <div className="col-sm-12">
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
                      type="button"
                      onClick={ApproveLoan}
                    >
                      Approve
                    </button>
                    {/* </div>
                  <div className="col-lg-6 contact-us-form-group"> */}
                    <button
                      className="contact-us-form-btn approveReject"
                      type="button"
                      onClick={RejectLoan}
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
