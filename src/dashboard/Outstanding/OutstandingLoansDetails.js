import React from "react";
import { useEffect, useState } from "react";
import "../Css/Loanperformance.css";
import axios from "axios";
import "../Approval/Approval.css";
import jwt_decode from "jwt-decode";
import { useLocation } from "react-router-dom";
import Loader from "../../common/Loader";
import { useHistory } from "react-router-dom";
import PageLoader from "../FullPageLoader/PageLoader";
import { NavLink } from "react-router-dom";
import ListItemText from "@material-ui/core/ListItemText";
const OutstandingLoansDetails = () => {
  const history = useHistory();
  const [LoanApplications, setLoanApplications] = React.useState([{}]);

  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    getLoansApprovedData();
  }, []);
  var token = localStorage.getItem("token");
  var decoded = jwt_decode(token);
  console.log(decoded);

  const search = useLocation().search;

  const LoanApplicationID = new URLSearchParams(search).get("id");
  console.log(LoanApplicationID);

  const getLoansApprovedData = async () => {
    setIsLoading(true);
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_URL}/loans/${LoanApplicationID}`,
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
    }
  };
  var nf = new Intl.NumberFormat();
  var d =
    LoanApplications != null &&
    LoanApplications != null &&
    LoanApplications.userId != null &&
    LoanApplications.userId.dob;
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
    LoanApplications.loanApplication.userId.docPhoto;
  const LoanAmount = nf.format(
    LoanApplications != null && LoanApplications.loanAmount
  );
  const EmiAmount = nf.format(
    LoanApplications != null && LoanApplications.emiAmount
  );
  const GoBACK = () => {
    history.goBack();
  };
  return (
    <div>
      {isLoading && <Loader />}
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
            <NavLink to="/unpaidLoans">
              <ListItemText primary={"Unpaid Loans"} />
            </NavLink>
            <span className="slash">&#47;</span>
            <NavLink to="/unpaidLoanDetails">
              <ListItemText primary={"Unpaid Loan Details"} />
            </NavLink>
          </div>
          <div className="backbutton">
            <button className="btn btn-primary Goback" onClick={GoBACK}>
              <i className="fa fa-arrow-circle-left"></i> Go Back
            </button>
          </div>
          <div>
            <div
              className="card-title trans-head"
              style={{
                padding: "10px",
                textAlign: "left",
                fontSize: "28px",
              }}
            >
              Unpaid Loan Details
            </div>
          </div>
          <div className="LaonApplications">
            <div className="row profile-Loan">
              <div className="col-lg-6 col-md-6 col-sm-12">
                <div className="card profile">
                  <div className="card-title outstanding">Profile Details</div>
                  <p className="profile-details">
                    Name :
                    <span className="profile-content">
                      {LoanApplications != null &&
                        LoanApplications != null &&
                        LoanApplications.userId != null &&
                        LoanApplications.userId.firstName}
                      <span style={{ paddingLeft: "5px" }}>
                        {" "}
                        {LoanApplications != null &&
                          LoanApplications != null &&
                          LoanApplications.userId != null &&
                          LoanApplications.userId.lastName}
                      </span>
                    </span>
                  </p>
                  <p className="profile-details">
                    IC Number:
                    <span className="profile-content">
                      {" "}
                      {LoanApplications != null &&
                        LoanApplications != null &&
                        LoanApplications.userId != null &&
                        LoanApplications.userId.icNumber}
                    </span>
                  </p>
                  <p className="profile-details">
                    Gender :
                    <span className="profile-content">
                      {" "}
                      {LoanApplications != null &&
                        LoanApplications != null &&
                        LoanApplications.userId != null &&
                        LoanApplications.userId.gender}
                    </span>
                  </p>
                  <p className="profile-details">
                    Age :<span className="profile-content"> {age}</span>
                  </p>
                  <p className="profile-details">
                    Education Level :
                    <span className="profile-content">
                      {" "}
                      {LoanApplications != null &&
                        LoanApplications != null &&
                        LoanApplications.userId != null &&
                        LoanApplications.userId.educationLevel}
                    </span>
                  </p>
                  <p className="profile-details">
                    Maritial Status :
                    <span className="profile-content">
                      {" "}
                      {LoanApplications != null &&
                        LoanApplications != null &&
                        LoanApplications.userId != null &&
                        LoanApplications.userId.maritalStatus}
                    </span>
                  </p>
                  {/* <p>Others</p> */}
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12">
                <div className="card" style={{ paddingBottom: "40px" }}>
                  <div className="card-title outstanding">Loan Details</div>
                  <p className="profile-details">
                    Acs Score :<span className="LoanContent"> 7 / 10</span>
                  </p>
                  <p className="profile-details">
                    Loan Amount :
                    <span className="LoanContent">
                      {" "}
                      <span className="Rm-text">RM</span>
                      {LoanAmount}
                    </span>
                  </p>
                  <p className="profile-details">
                    EMI Amount :
                    <span className="LoanContent ">
                      {" "}
                      <span className="Rm-text">RM</span>
                      {EmiAmount}
                    </span>
                  </p>
                  <p className="profile-details">
                    Tenure :
                    <span className="LoanContent">
                      {" "}
                      {LoanApplications != null && LoanApplications.tenure}
                    </span>
                  </p>
                  <p className="profile-details">
                    Product :
                    <span className="LoanContent">
                      {" "}
                      {LoanApplications != null && LoanApplications.productType}
                    </span>
                  </p>
                  <p className="profile-details">
                    Loan Id :
                    <span className="LoanContent">
                      {" "}
                      {LoanApplications != null && LoanApplications._id}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OutstandingLoansDetails;
