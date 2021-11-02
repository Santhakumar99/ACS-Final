import React, { useEffect, useState } from "react";
import axios from "axios";

import Loader from "../common/Loader";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";

import "../css/style.css";

const Home = () => {
  let token = localStorage.getItem("token");

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

  const [dashboard, setDashboard] = useState({
    totalApplications: 0,
    approvedPercentage: 0, // % appr
    amountApproved: 0, // voulme

    // borrower overview
    byAcsScore: "7/10",
    byValueOfLoan: 0,
    byLocation: [],
    byAgeGroup: [],

    // statusOfLoans
    totalLoanDisbursedDaily: 0,
    totalLoanDisbursedMonthly: 0,
    totalLoanDisbursedQuarterly: 0,
    totalLoanDisbursedYTD: 0,

    totalLoanOutstandingDaily: 0,
    totalLoanOutstandingMonthly: 0,
    totalLoanOutstandingQuarterly: 0,
    totalLoanOutstandingYTD: 0,

    active: 0,
  });
  useEffect(() => {
    const fetchData = async () => {
      if (token) {
        try {
          setIsLoading(true);
          const result = await axios
            .get(
              `${
                process.env.REACT_APP_URL
                  ? process.env.REACT_APP_URL
                  : "http://104.131.5.210:7400/api"
              }/loans/dashboard`,
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
            let dashboards = result?.data;

            console.log("dashboard ", dashboards);

            setDashboard({
              totalApplications: dashboards.totalApplications,
              approvedPercentage: dashboards.approvedPercentage, // % appr
              amountApproved: dashboards.amountApproved, // voulme

              // borrower overview
              byAcsScore: "7/10",
              byValueOfLoan: dashboards.byValueOfLoan,
              byLocation: dashboards.byLocation ? dashboards.byLocation : [],
              byAgeGroup: dashboards.byAgeGroup ? dashboards.byAgeGroup : [],

              // statusOfLoans
              totalLoanDisbursedDaily: dashboards.totalLoanDisbursedDaily,
              totalLoanDisbursedMonthly: dashboards.totalLoanDisbursedMonthly,
              totalLoanDisbursedQuarterly:
                dashboards.totalLoanDisbursedQuarterly,
              totalLoanDisbursedYTD: dashboards.totalLoanDisbursedYTD,

              totalLoanOutstandingDaily: dashboards.totalLoanOutstandingDaily,
              totalLoanOutstandingMonthly:
                dashboards.totalLoanOutstandingMonthly,
              totalLoanOutstandingQuarterly:
                dashboards.totalLoanOutstandingQuarterly,
              totalLoanOutstandingYTD: dashboards.totalLoanOutstandingYTD,

              active: dashboards.active,
            });

            setIsLoading(false);
          }
        } catch (err) {
          setIsLoading(false);

          handleClickOpen("No Token Available");
        }
      }
    };
    fetchData();
  }, []);

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
                      <h2 className="title">DASHBOARD</h2>
                      <br />
                      <div className="col-md-12">
                        <div className="row">
                          <div className="col-md-6">
                            <div className="features-card-content-section">
                              <h3>Loan Performance </h3>{" "}
                            </div>
                            <table className="table">
                              <tbody>
                                <tr>
                                  <td>Number of Applications</td>
                                  <td className="text-right">
                                    {dashboard.totalApplications}
                                  </td>
                                </tr>
                                <tr>
                                  <td>% and volume approved</td>
                                  <td className="text-right">
                                    {dashboard.approvedPercentage} % || RM{" "}
                                    {dashboard.amountApproved}{" "}
                                  </td>
                                </tr>
                                {/* <hr /> */}
                                <div className="features-card-content-section">
                                  <h3>Overview of borrowers </h3>{" "}
                                </div>
                                <tr>
                                  <td>By ACS score</td>
                                  <td className="text-right">
                                    {dashboard.byAcsScore}
                                  </td>
                                </tr>
                                <tr>
                                  <td>By value of loan</td>
                                  <td className="text-right">
                                    RM {dashboard.byValueOfLoan}
                                  </td>
                                </tr>

                                <tr>
                                  <td>By location</td>
                                  <td className="text-right">
                                    {dashboard.byLocation &&
                                      dashboard.byLocation.length > 0 &&
                                      dashboard.byLocation.map(
                                        (data, index) => {
                                          return (
                                            <>
                                              <div className="row">
                                                <div className="col-md-6">
                                                  {data.cityName}
                                                </div>
                                                <div className="col-md-6">
                                                  {data.count}
                                                </div>
                                              </div>
                                            </>
                                          );
                                        }
                                      )}
                                  </td>
                                </tr>

                                <tr>
                                  <td>By age group</td>
                                  <td className="text-right">
                                    {dashboard.byAgeGroup &&
                                      dashboard.byAgeGroup.length > 0 &&
                                      dashboard.byAgeGroup.map((data) => {
                                        return (
                                          <>
                                            <div className="row">
                                              <div className="col-md-6">
                                                {data.group}
                                              </div>
                                              <div className="col-md-6">
                                                {data.count}
                                              </div>
                                            </div>
                                          </>
                                        );
                                      })}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                          <div className="col-md-6">
                            <div className="features-card-content-section">
                              <h3>Status of loans </h3>{" "}
                            </div>
                            <table className="table">
                              <tbody>
                                <tr>
                                  <td>Total Loan Disbursed (D|M|Y|YTD)</td>
                                  <td className="text-right">
                                    {dashboard.totalLoanDisbursedDaily} |{" "}
                                    {dashboard.totalLoanDisbursedMonthly} |{" "}
                                    {dashboard.totalLoanDisbursedQuarterly} |{" "}
                                    {dashboard.totalLoanDisbursedYTD}
                                  </td>
                                </tr>
                                <tr>
                                  <td>Total Loan Outstanding (D|M|Y|YTD)</td>
                                  <td className="text-right">
                                    {dashboard.totalLoanOutstandingDaily} |{" "}
                                    {dashboard.totalLoanOutstandingMonthly} |{" "}
                                    {dashboard.totalLoanOutstandingQuarterly} |{" "}
                                    {dashboard.totalLoanOutstandingYTD}
                                  </td>
                                </tr>
                                <tr>
                                  <td>Active</td>
                                  <td className="text-right">
                                    {dashboard.active}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
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

export default Home;
