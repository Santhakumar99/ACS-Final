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

const Loanperformance = ({ DatePickerToDashboard }) => {
  const [Dashboard, setDashboard] = useState([{}]);
  const [statusofLoan, setStatusofLoan] = useState([{}]);
  const [isLoading, setIsLoading] = useState(false);
  // const [startDate, setStartDate] = useState(new Date());
  // const [toDate, setToDate] = useState(new Date());
  const [values, setValues] = useState({
    startdate: "",
    enddate: "",
  });
  const cardStyle = {
    paddingTop: "10px",
    paddingBottom: "10px",
    fontFamily: "Arial",
  };
  // console.log(tab.active);
  useEffect(() => {
    getLoansApprovedData();
    getStatusofLoans();
    parentToChild();
    FilterData();
  }, []);

  const FilterData = async () => {
    // setIsLoading(true);
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_URL}/loans/dashboard_loan_approved?fromDate=${values.fromDate}&toDate=${values.toDate}`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      console.log(result.data.dashboardObj);
      setDashboard(result.data.dashboardObj);
      // setIsLoading(false);
    } catch (error) {
      console.log(error);
      // setIsLoading(false);
    }
  };
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
      // console.log(result.data.dashboardObj);
      setDashboard(result.data.dashboardObj);
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
      console.log(result.data.dashboardObj);
      setStatusofLoan(result.data.dashboardObj);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  const parentToChild = () => {
    setDashboard(Dashboard);
  };
  var nf = new Intl.NumberFormat();
  const percentage =
    Dashboard != null &&
    Dashboard.totalApplications != null &&
    Dashboard.totalApplications;
  const value =
    Dashboard != null &&
    Dashboard.approvedPercentage != null &&
    Dashboard.approvedPercentage;
  const Active =
    Dashboard != null && Dashboard.active != null && Dashboard.active;
  const LatePayment =
    Dashboard != null &&
    Dashboard.latePayment != null &&
    Dashboard.latePayment.count;

  const AcsScore =
    Dashboard != null && Dashboard.byAcsScore != null && Dashboard.byAcsScore;
  var decimal = eval(AcsScore);
  var ACS = decimal * 10;

  var totalofLoans =
    (statusofLoan != null &&
      statusofLoan.bnpl != null &&
      statusofLoan.bnpl.totalLoans) +
    (statusofLoan != null &&
      statusofLoan.qardHasan != null &&
      statusofLoan.qardHasan.totalLoans);

  console.log(totalofLoans);

  var BnplRepayment = nf.format(
    statusofLoan != null &&
      statusofLoan.bnpl != null &&
      statusofLoan.bnpl.repaymentDue
  );
  var QHRepayment = nf.format(
    statusofLoan != null &&
      statusofLoan.qardHasan != null &&
      statusofLoan.qardHasan.repaymentDue
  );
  console.log(BnplRepayment);
  console.log(QHRepayment);

  var RepaymentDue =
    (statusofLoan != null &&
      statusofLoan.bnpl != null &&
      statusofLoan.bnpl.repaymentDue) +
    (statusofLoan != null &&
      statusofLoan.qardHasan != null &&
      statusofLoan.qardHasan.repaymentDue);
  RepaymentDue = nf.format(RepaymentDue);
  var BNPLamount = nf.format(Dashboard != null && Dashboard.bnplAmountApproved);
  var QHamount = nf.format(
    Dashboard != null && Dashboard.qardHasanAmountApproved
  );

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    let inputValues = values;
    inputValues[name] = value;
    setValues({ ...inputValues });
  };
  return (
    <div>
      {isLoading && <Loader />}
      {isLoading && isLoading ? (
        ""
      ) : (
        <div>
          {Dashboard != null && Dashboard ? (
            <div className="LPHeader">
              {/* <div className="type-selector">
                <select
                  className="form-select"
                  aria-label="Default select example"
                >
                  <option selected>Daily</option>
                  <option value="1">Monthly</option>
                  <option value="2">Quarterly</option>
                  <option value="3">Yearly YTD</option>
                </select>
              </div> */}
              <DatePickers />
              <div className="card overviewBorrowers">
                <div className="row">
                  <div className="col-lg-7 col-md-12 sm-12 loan-head">
                    <div className="card loanTable">
                      <div className="card-title">Loans Approved</div>{" "}
                      <div className="table-content">
                        {" "}
                        <div class="table-responsive">
                          <table
                            class="table table-bordered"
                            style={{ background: "white" }}
                          >
                            <thead>
                              <tr>
                                {/* <th scope="col">#</th> */}
                                <th scope="col">Number of Applications</th>
                                <th scope="col">Product</th>
                                <th scope="col">Number of Applications</th>
                                <th scope="col">% of Approved</th>
                                <th scope="col">Number of Approved </th>
                                <th scope="col">Value Approved</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                {/* <th scope="col"></th> */}
                                <td rowspan="3" className="total-applications">
                                  {/* 33 */}
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
                                    Dashboard.bnplPercentageApproved}
                                </td>
                                <td className="countValue">
                                  {" "}
                                  {Dashboard != null &&
                                    Dashboard.bnplApprovedLoans != null &&
                                    Dashboard.bnplApprovedLoans.count}
                                </td>
                                <td className="countValue">
                                  <span className="Rm-text loan">RM</span>
                                  {/* {Dashboard != null && Dashboard.bnplAmountApproved} */}
                                  <span className="Rm-value">
                                    {" "}
                                    {BNPLamount}
                                  </span>
                                </td>
                              </tr>
                              <tr>
                                {/* <th scope="row"></th> */}
                                <td>QH</td>
                                <td className="countValue">
                                  {" "}
                                  {Dashboard != null &&
                                    Dashboard.qardHasanApprovedLoans != null &&
                                    Dashboard.qardHasanApprovedLoans.count}
                                </td>
                                <td className="countValue">
                                  {Dashboard != null &&
                                    Dashboard.qardHasanPercentageApproved}
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
                                  <span className="Rm-text loan">RM</span>
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
                  <div className="col-lg-5 col-md-12 col-sm-12">
                    <div className="card overviewBorrowers">
                      <div className="card-title">Repayments</div>
                      <div className="card">
                        <div class="table-responsive">
                          <table
                            class="table table-bordered"
                            style={{ background: "white" }}
                          >
                            <thead>
                              <tr>
                                <th scope="col">Product</th>
                                <th scope="col">Number of Loans by Product</th>
                                <th scope="col">Repayment Due</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                {/* <th scope="col"></th> */}
                                <td>BNPL</td>
                                <td className="countValue">
                                  {statusofLoan != null &&
                                    statusofLoan.bnpl != null &&
                                    statusofLoan.bnpl.totalLoans}
                                </td>
                                <td className="countValue">
                                  <span className="Rm-text loan">RM</span>{" "}
                                  {BnplRepayment}
                                </td>
                              </tr>
                              <tr>
                                {/* <th scope="row"></th> */}
                                <td>QH</td>
                                <td className="countValue">
                                  {statusofLoan != null &&
                                    statusofLoan.qardHasan != null &&
                                    statusofLoan.qardHasan.totalLoans}
                                </td>
                                <td className="countValue">
                                  <span className="Rm-text loan">RM</span>{" "}
                                  {/* {statusofLoan != null &&
                              statusofLoan.qardHasan != null &&
                              statusofLoan.qardHasan.repaymentDue} */}
                                  {QHRepayment}
                                </td>
                              </tr>
                              <tr>
                                {/* <th scope="row"></th> */}
                                <td>Total</td>
                                <td className="countValue">{totalofLoans}</td>
                                <td className="countValue">
                                  {" "}
                                  <span className="Rm-text loan">RM</span>
                                  {RepaymentDue}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
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
                  <div className="col-lg-6 col-md-6 col-sm-12 ">
                    <div className="card ">
                      <div className="card-title">Number of Loans Approved</div>
                      <div className="card-body">
                        <LoansApprovedChart parentToChild={Dashboard} />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-12 col-sm-12 ">
                    <div className="card ">
                      <div className="card-title">Value of Loans Approved</div>
                      <div className="card-body">
                        <ValueofLoansApproved />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div style={cardStyle} className="row">
                <div className="col-lg-12 col-md-12 col-sm-12">
                  <div className="card statusofLoan">
                    {/* <div className="card-title">Status of Loans</div> */}
                    <div className="row">
                      <div className="col-lg-6 col-md-6 col-sm-12">
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
                      <div className="col-lg-6 col-md-6 col-sm-12">
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
                      {/* <div className="col-lg-4 col-md-12 col-sm-12">
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
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
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
