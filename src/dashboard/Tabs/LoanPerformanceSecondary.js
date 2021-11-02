import React, { useEffect } from "react";
import "../Css/Loanperformance.css";
import axios from "axios";
import ByagegroupChart from "../Charts/ByagegroupChart";
import ByLocationChart from "../Charts/ByLocationChart";
import TotalLoansDisbursed from "../Tables/TotalLoansDisbursed";
import TotalLoansOustanding from "../Tables/TotalLoansOutstandingData";
import ByGenderChart from "../Charts/ByGenderChart";
import { useHistory, NavLink } from "react-router-dom";
import logo1 from "../../images/line1.png";
import logo2 from "../../images/line2.png";
import logo3 from "../../images/line3.png";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
const Loanperformance = () => {
  const [Dashboard, setDashboard] = React.useState([]);
  const cardStyle = {
    paddingTop: "10px",
    paddingBottom: "10px",
    fontFamily: "Arial",
  };
  // console.log(tab.active);
  // useEffect(() => {
  //   getDashboardData();
  //   parentToChild();
  // }, []);

  // const getDashboardData = async () => {
  //   try {
  //     const result = await axios.get(
  //       `${process.env.REACT_APP_URL}/loans/dashboard`,
  //       {
  //         headers: {
  //           Authorization: localStorage.getItem("token"),
  //         },
  //       }
  //     );
  //     console.log(result.data);
  //     setDashboard(result.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // const parentToChild = () => {
  //   setDashboard(Dashboard);
  // };
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
  console.log(decimal);
  console.log(ACS);
  return (
    <div>
      {Dashboard != null && Dashboard ? (
        <div className="LPHeader">
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-12 ">
              <div className="card ">
                <div className="card-body">
                  <div className="row">
                    <div className="col-8">
                      <div className="card-title">Number of Applications</div>
                      <span className="count total-application">
                        {Dashboard.totalApplications}
                      </span>
                    </div>

                    <div className="col-4">
                      <div style={{ width: 100, height: 100 }}>
                        <CircularProgressbar
                          value={percentage}
                          text={`${percentage}`}
                          styles={buildStyles({
                            rotation: 0.25,
                            strokeLinecap: "butt",
                            textSize: "16px",
                            pathTransitionDuration: 0.5,
                            pathColor: "purple",
                            textColor: "purple",
                            trailColor: "#d6d6d6",
                            backgroundColor: "#3e98c7",
                          })}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 ">
              <div className="card ">
                <div className="card-body">
                  <div className="row">
                    <div className="col-8">
                      <div className="card-title">
                        Percentage and Volume Approved
                      </div>
                      <span className="count">
                        {Dashboard.approvedPercentage} %
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        {Dashboard.amountApproved}
                      </span>
                    </div>

                    <div className="col-4">
                      <div style={{ width: 100, height: 100 }}>
                        <CircularProgressbar
                          value={value}
                          text={`${value * 1}%`}
                          styles={buildStyles({
                            rotation: 0.25,
                            strokeLinecap: "butt",
                            textSize: "16px",
                            pathTransitionDuration: 0.5,
                            pathColor: "red",
                            textColor: "red",
                            trailColor: "#d6d6d6",
                            backgroundColor: "#3e98c7",
                          })}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <div style={cardStyle} className="row">
            <div className="col-lg-6 col-md-12 col-sm-12">
              <div className="card">
                <div className="card-body">
                  <div className="card-title">Number of Applications</div>
                  <span className="count">{Dashboard.totalApplications}</span>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-12 col-sm-12">
              <div className="card">
                <div className="card-body">
                  <div className="card-title">
                    Percentage and Volume Approved
                  </div>
                  <span className="count">
                    {Dashboard.approvedPercentage} % &nbsp;&nbsp;&nbsp;&nbsp;
                    {Dashboard.amountApproved}
                  </span>
                </div>
              </div>
            </div>
          </div> */}
          <div style={cardStyle} className="row">
            <div className="col-lg-12 col-md-12 col-sm-12">
              <div className="card overviewBorrowers">
                <div className="card-title">Overview of Borrowers</div>
                <div className="row">
                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="card ">
                      <div className="card-body">
                        <div className="row">
                          <div className="col-8">
                            <div className="card-title">By ACS Score</div>
                            <span className="count">
                              {Dashboard.byAcsScore}
                            </span>
                          </div>

                          <div className="col-4">
                            <div style={{ width: 95, height: 95 }}>
                              <CircularProgressbar
                                value={ACS}
                                maxValue={10}
                                text={`${ACS}`}
                                styles={buildStyles({
                                  rotation: 0.25,
                                  strokeLinecap: "butt",
                                  textSize: "16px",
                                  pathTransitionDuration: 0.5,
                                  pathColor: "brown",
                                  textColor: "brown",
                                  trailColor: "#d6d6d6",
                                  backgroundColor: "#3e98c7",
                                })}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <div className="card">
                      <div className="card-body">
                        <div className="card-title">By ACS Score</div>
                        <span className="count">{Dashboard.byAcsScore}</span>
                      </div>
                    </div> */}
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="card ">
                      <div className="card-body">
                        <div className="row">
                          <div className="col-8">
                            <div className="card-title">By Value Loan</div>
                            <span className="count">
                              {Dashboard.byValueOfLoan}
                            </span>
                          </div>

                          <div className="col-4">
                            {/* <div style={{ width: 100, height: 100 }}>
                              <CircularProgressbar
                                value={ValueOfLoan}
                                text={`${ValueOfLoan}`}
                              />
                            </div> */}
                            <div className="counter-icon box-shadow-primary brround bg-success-gradient">
                              {/* <i
                                className="fas fa-dollar-sign"
                                style={{ color: "white" }}
                              ></i> */}
                              <i
                                className="fas fa-money-bill-wave"
                                style={{ color: "black" }}
                              ></i>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <div className="card">
                      <div className="card-body">
                        <div className="card-title">By Value Loan</div>
                        <span className="count">{Dashboard.byValueOfLoan}</span>
                      </div>
                    </div> */}
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-6 col-md-12 col-sm-12">
                    <div className="card">
                      <div className="card-body">
                        <div className="card-title">By Location</div>
                        <ByLocationChart parentToChild={Dashboard} />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-12 col-sm-12">
                    <div className="card">
                      <div className="card-body">
                        <div className="card-title">By Age group</div>
                        <ByagegroupChart parentToChild={Dashboard} />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-1 col-md-12 col-sm-12"></div>
                  <div className="col-lg-10 col-md-12 col-sm-12">
                    <div className="card">
                      <div className="card-body">
                        <div className="card-title">By Gender</div>
                        <ByGenderChart parentToChild={Dashboard} />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-1 col-md-12 col-sm-12"></div>
                </div>
                {/* <div className="col-lg-12 col-md-12 col-sm-12"> */}

                {/* </div> */}
              </div>
            </div>
            <div className="col-lg-12 col-md-12 col-sm-12">
              <div className="card statusofLoan">
                <div className="card-title">Status of Loans</div>
                <div className="row">
                  <div className="col-lg-6 col-md-12 col-sm-12">
                    <div className="card">
                      <div className="card-body">
                        <div className="card-title">
                          Total loans disbursed (D/M/Q/YTD)
                          <TotalLoansDisbursed parentToChild={Dashboard} />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-12 col-sm-12">
                    <div className="card">
                      <div className="card-body">
                        <div className="card-title">
                          Total loans outstanding (D/M/Q/YTD)
                          <TotalLoansOustanding parentToChild={Dashboard} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="card ">
                      <div className="card-body">
                        <div className="row">
                          <div className="col-8">
                            <div className="card-title">Active</div>
                            <span className="count">{Dashboard.active}</span>
                          </div>

                          <div className="col-4">
                            <div style={{ width: 95, height: 100 }}>
                              <CircularProgressbar
                                value={Active}
                                text={`${Active}`}
                                styles={buildStyles({
                                  rotation: 0.25,
                                  strokeLinecap: "butt",
                                  textSize: "16px",
                                  pathTransitionDuration: 0.5,
                                  pathColor: "#28a745",
                                  textColor: "#28a745",
                                  trailColor: "#d6d6d6",
                                  backgroundColor: "#3e98c7",
                                })}
                              />
                            </div>

                            {/* <div className="counter-icon box-shadow-primary brround bg-totalClarification-gradient">
                              <i
                                className="fas fa-chart-line"
                                style={{ color: "white" }}
                              ></i>
                            </div> */}
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <div className="card">
                      <div className="card-body">
                        <div className="card-title">Active</div>
                        <span className="count">{Dashboard.active}</span>
                      </div>
                    </div> */}
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="card ">
                      <div className="card-body">
                        <div className="row">
                          <div className="col-8">
                            <div className="card-title">Late Payment</div>
                            <span className="count">
                              {Dashboard != null &&
                                Dashboard.latePayment != null &&
                                Dashboard.latePayment.count}
                            </span>
                          </div>

                          <div className="col-4">
                            <div style={{ width: 95, height: 100 }}>
                              <CircularProgressbar
                                value={LatePayment}
                                text={`${LatePayment}`}
                                styles={buildStyles({
                                  rotation: 0.25,
                                  strokeLinecap: "butt",
                                  textSize: "16px",
                                  pathTransitionDuration: 0.5,
                                  pathColor: "orange",
                                  textColor: "orange",
                                  trailColor: "#d6d6d6",
                                  backgroundColor: "#3e98c7",
                                })}
                              />
                            </div>
                            {/* <div className="counter-icon box-shadow-primary brround bg-PendingClarification-gradient">
          <i
            className="fas fa-calendar-times"
            style={{ color: "white" }}
          ></i>
        </div> */}
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <div className="card">
                      <div className="card-body">
                        <div className="card-title">Active</div>
                        <span className="count">{Dashboard.active}</span>
                      </div>
                    </div> */}
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-4 col-md-12 col-sm-12">
                    <div className="card ">
                      <div className="card-body">
                        <div className="row">
                          <div className="col-8">
                            <div className="card-title">30+ DPD</div>
                            <span className="count">
                              {" "}
                              {Dashboard != null &&
                                Dashboard.dpd30 != null &&
                                Dashboard.dpd30.count}
                            </span>
                          </div>
                          <div className="col-4">
                            <div className="DPD">
                              <img src={logo2} className="DPD-image" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <div className="card">
                      <div className="card-body">
                        <div className="card-title">30+ DPD</div>
                        <span className="count">
                          {" "}
                          {Dashboard != null &&
                            Dashboard.dpd30 != null &&
                            Dashboard.dpd30.count}
                        </span>
                      </div>
                    </div> */}
                  </div>
                  <div className="col-lg-4 col-md-12 col-sm-12">
                    <div className="card ">
                      <div className="card-body">
                        <div className="row">
                          <div className="col-8">
                            <div className="card-title">60+ DPD</div>
                            <span className="count">
                              {" "}
                              {Dashboard != null &&
                                Dashboard.dpd60 != null &&
                                Dashboard.dpd60.count}
                            </span>
                          </div>
                          <div className="col-4">
                            <div className="DPD">
                              <img src={logo1} className="DPD-image" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <div className="card">
                      <div className="card-body">
                        <div className="card-title">60+ DPD</div>
                        <span className="count">
                          {" "}
                          {Dashboard != null &&
                            Dashboard.dpd60 != null &&
                            Dashboard.dpd60.count}
                        </span>
                      </div>
                    </div> */}
                  </div>
                  <div className="col-lg-4 col-md-12 col-sm-12">
                    <div className="card ">
                      <div className="card-body">
                        <div className="row">
                          <div className="col-8">
                            <div className="card-title">90+ DPD</div>
                            <span className="count">
                              {Dashboard != null &&
                                Dashboard.dpd90 != null &&
                                Dashboard.dpd90.count}
                            </span>
                          </div>

                          <div className="col-4">
                            <div className="DPD">
                              <img src={logo3} className="DPD-image" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <div className="card">
                      <div className="card-body">
                        <div className="card-title">90+ DPD</div>
                        <span className="count">
                          {Dashboard != null &&
                            Dashboard.dpd90 != null &&
                            Dashboard.dpd90.count}
                        </span>
                      </div>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <div style={cardStyle} className="row">
        <div className="col-lg-6 col-md-12 col-sm-12">
          <div className="card">
            <div className="card-body">
              <div className="card-title">Pie Chart </div>
              <ChartContent />
            </div>
          </div>
        </div>
        <div className="col-lg-6 col-md-12 col-sm-12">
          <div className="card">
            <div className="card-body">
              <div className="card-title">Bar Chart</div>
              <BarChart />
            </div>
          </div>
        </div>
      </div> */}
        </div>
      ) : (
        "No Data Found"
      )}
    </div>
  );
};

export default Loanperformance;
