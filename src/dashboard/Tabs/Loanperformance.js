import React, { useEffect, useState } from "react";
import "../Css/Loanperformance.css";
import axios from "axios";
import "react-circular-progressbar/dist/styles.css";
import LoansApprovedChart from "../Charts/LoansApprovedChart";
import ValueofLoansApproved from "../Charts/ValueofLoansApproved";
import StatusofLoansChart from "../Charts/BnplStatusofLoansChart";
import QhStatusofLoansChart from "../Charts/QhStatusofLoansChart";
import Loader from "../../common/Loader";
// import Datepicker from "../DatePicker/Datepicker";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import DatePickers from "./DatePickers";
import PageLoader from "../FullPageLoader/PageLoader";

const Loanperformance = ({ FilterDashboard, FilterDashboardStatus }) => {
  const [Dashboard, setDashboard] = useState();
  const [statusofLoan, setStatusofLoan] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [values, setValues] = useState({
    startdate: "",
    enddate: "",
  });
  const cardStyle = {
    paddingRight: "5px",
    paddingLeft: "5px",
  };

  const Filterlog = FilterDashboard;
  const FilterDashboardStatusLog = FilterDashboardStatus;
  console.log(Filterlog);
  console.log(FilterDashboardStatusLog);

  useEffect(() => {
    const getLoansApprovedData = async () => {
      setIsLoading(true);
      try {
        const result = await axios.get(
          `${process.env.REACT_APP_URL}/loans/dashboard_loan_approved`,
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );

        // setDashboard(result.data.dashboardObj);

        if (FilterDashboard && FilterDashboard.length === 1) {
          console.log(FilterDashboard);
          setDashboard(result.data.dashboardObj);
        } else {
          console.log("working");
          setDashboard(FilterDashboard);
        }
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };
    const getStatusofLoans = async () => {
      setIsLoading(true);
      try {
        const result = await axios.get(
          `${process.env.REACT_APP_URL}/loans/dashboard_loan_status`,
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );
        // setStatusofLoan(result.data.dashboardObj);
        console.log(result.data.dashboardObj);

        if (
          FilterDashboardStatusLog != null &&
          FilterDashboardStatusLog.length === 1
        ) {
          setStatusofLoan(result.data.dashboardObj);
        } else {
          setStatusofLoan(FilterDashboardStatusLog);
        }

        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };
    const parentToChild = () => {
      setDashboard(Dashboard);
    };

    getLoansApprovedData();
    getStatusofLoans();
    parentToChild();

    return () => {
      console.log("working");
    };
  }, [FilterDashboard, FilterDashboardStatus]);

  var nf = new Intl.NumberFormat();

  const AcsScore =
    Dashboard != null && Dashboard.byAcsScore != null && Dashboard.byAcsScore;
  var decimal = AcsScore ? eval(AcsScore) : undefined;
  var ACS = decimal * 10;

  var totalofLoans =
    (statusofLoan != null &&
      statusofLoan.bnpl != null &&
      statusofLoan.bnpl.totalLoans) +
    (statusofLoan != null &&
      statusofLoan.qardHasan != null &&
      statusofLoan.qardHasan.totalLoans);

  // console.log(totalofLoans);

  var BnplRepayment =
    statusofLoan != null &&
    statusofLoan.bnpl != null &&
    statusofLoan.bnpl.repaymentDue
      ? nf.format(
          statusofLoan != null &&
            statusofLoan.bnpl != null &&
            statusofLoan.bnpl.repaymentDue
        )
      : undefined;
  var QHRepayment = nf.format(
    statusofLoan != null &&
      statusofLoan.qardHasan != null &&
      statusofLoan.qardHasan.repaymentDue
  );
  // console.log(BnplRepayment);
  // console.log(QHRepayment);

  var RepaymentDue =
    (statusofLoan != null &&
      statusofLoan.bnpl != null &&
      statusofLoan.bnpl.repaymentDue) +
    (statusofLoan != null &&
      statusofLoan.qardHasan != null &&
      statusofLoan.qardHasan.repaymentDue);
  RepaymentDue = RepaymentDue ? nf.format(RepaymentDue) : undefined;
  var BNPLamount =
    Dashboard != null && Dashboard.bnplAmountApproved
      ? nf.format(Dashboard != null && Dashboard.bnplAmountApproved)
      : undefined;
  var QHamount =
    Dashboard != null && Dashboard.qardHasanAmountApproved
      ? nf.format(Dashboard != null && Dashboard.qardHasanAmountApproved)
      : undefined;

  return (
    <div>
      {isLoading && <Loader />}
      {isLoading && isLoading ? (
        ""
      ) : (
        <div>
          {Dashboard != null && Dashboard ? (
            <div className="LPHeader">
              <div className="card overviewBorrowers">
                <div className="row" style={cardStyle}>
                  <div
                    className="col-lg-7 col-md-12 sm-12 loan-head"
                    style={{ padding: "5px 5px" }}
                  >
                    <div className="card loanTable h-100">
                      <div className="card-title LoansAP">Loans Approved</div>{" "}
                      <div className="table-content">
                        {" "}
                        <div className="table-responsive">
                          <table
                            className="table table-bordered"
                            style={{ background: "white" }}
                          >
                            <thead>
                              <tr>
                                <th scope="col">Number of Applications</th>
                                <th scope="col">Product</th>
                                {/* <th scope="col">Number of Applications</th> */}
                                <th scope="col">% of Approved</th>
                                <th scope="col">Number of Approved </th>
                                <th scope="col">Value Approved (RM)</th>
                              </tr>
                            </thead>
                            <tbody>
                              {/* <tr>
                                <td rowSpan="3" className="total-applications">
                                  {Dashboard.totalNumOfLoanApplication}
                                </td>
                                <td>BNPL</td>
                                <td className="countValue">
                                  {" "}
                                  {Dashboard != null &&
                                    Dashboard.bnplApprovedLoans != null &&
                                    Dashboard.bnplApprovedLoans.count}
                                </td>
                                <td className="countValue">
                                  {Dashboard != null &&
                                  Dashboard.bnplPercentageApproved
                                    ? Dashboard.bnplPercentageApproved
                                    : undefined}
                                </td>
                                <td className="countValue">
                                  {" "}
                                  {Dashboard != null &&
                                    Dashboard.bnplApprovedLoans != null &&
                                    Dashboard.bnplApprovedLoans.count}
                                </td>
                                <td className="countValue">
                                  <span className="Rm-value">
                                    {" "}
                                    {BNPLamount}
                                  </span>
                                </td>
                              </tr> */}
                              <tr>
                                <td className="total-applications">
                                  {Dashboard.qardHasanApprovedLoans != null &&
                                    Dashboard.qardHasanApprovedLoans.count}
                                </td>
                                <td>QH</td>
                                {/* <td className="countValue">
                                  {" "}
                                  {Dashboard != null &&
                                    Dashboard.qardHasanApprovedLoans != null &&
                                    Dashboard.qardHasanApprovedLoans.count}
                                </td> */}
                                <td className="countValue">
                                  {Dashboard != null &&
                                  Dashboard.qardHasanPercentageApproved
                                    ? Dashboard.qardHasanPercentageApproved
                                    : undefined}
                                </td>
                                <td className="countValue">
                                  {" "}
                                  {Dashboard != null &&
                                    Dashboard.qardHasanApprovedLoans != null &&
                                    Dashboard.qardHasanApprovedLoans.count}
                                </td>
                                {/* <td className="countValue">
                                  <span className="Rm-text">RM</span> {QHamount}
                                </td> */}
                                <td className="countValue">
                                  {/* <span className="Rm-text loan">RM</span> */}
                                  {/* {Dashboard != null && Dashboard.bnplAmountApproved} */}
                                  <span className="Rm-value">{QHamount}</span>
                                </td>
                              </tr>
                              {/* <tr>
                                <td>BNPL - SDK</td>
                                <td className="countValue">0</td>
                                <td className="countValue">0</td>
                                <td className="countValue">0</td>
                                <td className="countValue">
                                  {" "}
                                  <span className="Rm-text loan">RM</span>{" "}
                                  <span className="Rm-value">0</span>
                                </td>
                              </tr> */}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="col-lg-5 col-md-12 col-sm-12"
                    style={{ padding: "5px 5px" }}
                  >
                    {/* <div className="card overviewBorrowers"> */}
                    {/* <div className="card-title">Repayments</div> */}
                    <div
                      className="card repay h-100"
                      // style={{ padding: "0px 5px" }}
                    >
                      <div className="card-title">Repayments</div>
                      <div className="table-responsive">
                        <table
                          className="table table-bordered"
                          style={{ background: "white" }}
                        >
                          <thead>
                            <tr>
                              <th scope="col">Product</th>
                              <th scope="col">Number of Loans by Product</th>
                              <th scope="col">Repayment Due (RM)</th>
                            </tr>
                          </thead>
                          <tbody>
                            {/* <tr>
                              <td>BNPL</td>
                              <td className="countValue">
                                {statusofLoan != null &&
                                  statusofLoan.bnpl != null &&
                                  statusofLoan.bnpl.totalLoans}
                              </td>
                              <td className="countValue">
                                {BnplRepayment}
                              </td>
                            </tr> */}
                            <tr>
                              {/* <th scope="row"></th> */}
                              <td>QH</td>
                              <td className="countValue">
                                {statusofLoan != null &&
                                  statusofLoan.qardHasan != null &&
                                  statusofLoan.qardHasan.totalLoans}
                              </td>
                              <td className="countValue">
                                {/* <span className="Rm-text loan">RM</span>{" "} */}
                                {/* {statusofLoan != null &&
                              statusofLoan.qardHasan != null &&
                              statusofLoan.qardHasan.repaymentDue} */}
                                {QHRepayment}
                              </td>
                            </tr>
                            {/* <tr>
                              <td>Total</td>
                              <td className="countValue">{totalofLoans}</td>
                              <td className="countValue">
                                {" "}
                                {RepaymentDue}
                              </td>
                            </tr> */}
                          </tbody>
                        </table>
                      </div>
                    </div>
                    {/* </div> */}
                  </div>
                  {/* <div className="col-lg-5 col-md-12 col-sm-12 ">
                    <div className="card ">
                      <div className="card-title">Number of Loans Approved</div>
                      <div className="card-body">
                        <LoansApprovedChart parentToChild={Dashboard} />
                      </div>
                    </div>
                  </div> */}
                </div>
                <div className="row">
                  <div
                    className="col-lg-4 col-md-12 col-sm-12 numberofloans"
                    style={{ padding: "5px 5px" }}
                  >
                    <div className="card h-100" style={cardStyle}>
                      <div className="card-title">
                        Number of Loans Approved{" "}
                      </div>

                      <LoansApprovedChart parentToChild={Dashboard} />
                    </div>
                  </div>
                  <div
                    className="col-lg-4 col-md-12 col-sm-12"
                    style={{ padding: "5px 5px" }}
                  >
                    <div className="card loansapprove h-100" style={cardStyle}>
                      <div className="card-title">Value of Loans Approved</div>

                      <ValueofLoansApproved parentToChild={Dashboard} />
                    </div>
                  </div>
                  {/* <div
                    className="col-lg-3 col-md-12 col-sm-12"
                    style={{ padding: "5px 5px" }}
                  >
                    <div className="card h-100" style={cardStyle}>
                      <div className="card-title">
                        Status of Loans - BNPL
                        <StatusofLoansChart parentToChild={statusofLoan} />
                      </div>
                    </div>
                  </div> */}
                  <div
                    className="col-lg-4 col-md-12 col-sm-12"
                    style={{ padding: "5px 5px" }}
                  >
                    <div className="card h-100" style={cardStyle}>
                      <div className="card-title">
                        Status of Loans - Qard Hasan
                        <QhStatusofLoansChart parentToChild={statusofLoan} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* <div style={cardStyle} className="row">
                <div className="col-lg-12 col-md-12 col-sm-12">
                  <div className="card statusofLoan">
                    <div className="row">
                      <div className="col-lg-6 col-md-12 col-sm-12">
                        <div className="card">
                          <div className="card-body">
                            <div className="card-title">
                              Status of Loans - BNPL
                              <StatusofLoansChart
                                parentToChild={statusofLoan}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-12 col-sm-12">
                        <div className="card">
                          <div className="card-body">
                            <div className="card-title">
                              Status of Loans - Qard Hasan
                              <QhStatusofLoansChart
                                parentToChild={statusofLoan}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-12 col-sm-12">
                        <div className="card">
                          <div className="card-body">
                            <div className="card-title">
                              BNPL - SDK
                              <QhStatusofLoansChart
                                parentToChild={statusofLoan}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}
            </div>
          ) : (
            "No Data Found"
          )}
        </div>
      )}
    </div>
  );
};

export default Loanperformance;
