import React from "react";
import axios from "axios";
import "../Css/BusinessPerformance.css";
import Loader from "../../common/Loader";
import "react-circular-progressbar/dist/styles.css";
import logo3 from "../../images/line3.png";
import PageLoader from "../FullPageLoader/PageLoader";

const Businessperformance = ({ BusinessPerformanceFilter }) => {
  const [Businessperformance, setBusinessperformance] = React.useState([{}]);
  const [isLoading, setIsLoading] = React.useState(false);
  const cardStyle = {
    padding: "10px",
    fontFamily: "Arial",
  };
  React.useEffect(() => {
    getBorrowerData();
  }, [BusinessPerformanceFilter]);

  /***********************************Props value************************************/
  const FilterDashboardBussinessPerformanceLog = BusinessPerformanceFilter;
  console.log(FilterDashboardBussinessPerformanceLog);

  /***********************************Get the API response ************************************/

  const getBorrowerData = async () => {
    setIsLoading(true);
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_URL}/loans/dashboard_business_performance`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      // console.log(result.data);

      if (
        FilterDashboardBussinessPerformanceLog != null &&
        FilterDashboardBussinessPerformanceLog.length === 1
      ) {
        setBusinessperformance(result.data.dashboardObj);
      } else {
        setBusinessperformance(FilterDashboardBussinessPerformanceLog);
      }
      // setBusinessperformance(result.data?.dashboardObj);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  /***********************************Format the values into x,xxx************************************/
  var nf = new Intl.NumberFormat();
  var TotalFeesCollected =
    Businessperformance != null &&
    Businessperformance.totalActualInterestAndFeesCollected != null &&
    Businessperformance.totalActualInterestAndFeesCollected
      ? nf.format(
          Businessperformance != null &&
            Businessperformance.totalActualInterestAndFeesCollected != null &&
            Businessperformance.totalActualInterestAndFeesCollected
        )
      : undefined;
  const BNPLinterestCollected =
    Businessperformance != null &&
    Businessperformance.bnplInterestAndFeesCollected != null &&
    Businessperformance.bnplInterestAndFeesCollected
      ? nf.format(
          Businessperformance != null &&
            Businessperformance.bnplInterestAndFeesCollected != null &&
            Businessperformance.bnplInterestAndFeesCollected
        )
      : undefined;
  const QHinterestCollected =
    Businessperformance != null &&
    Businessperformance.qardHasanInterestAndFeesCollected != null &&
    Businessperformance.qardHasanInterestAndFeesCollected
      ? nf.format(
          Businessperformance != null &&
            Businessperformance.qardHasanInterestAndFeesCollected != null &&
            Businessperformance.qardHasanInterestAndFeesCollected
        )
      : undefined;

  const percentage =
    Businessperformance != null && Businessperformance.totalNumOfUsers
      ? Businessperformance != null && Businessperformance.totalNumOfUsers
      : "0";

  const NewUsers =
    Businessperformance != null &&
    Businessperformance.newUsers != null &&
    Businessperformance.newUsers.count
      ? Businessperformance != null &&
        Businessperformance.newUsers != null &&
        Businessperformance.newUsers.count
      : "0";

  const InActiveUsers =
    Businessperformance != null &&
    Businessperformance.inActiveUsers != null &&
    Businessperformance.inActiveUsers.count
      ? Businessperformance != null &&
        Businessperformance.inActiveUsers != null &&
        Businessperformance.inActiveUsers.count
      : "0";
  // console.log(TotalFeesCollected);

  const totalProjectedCollections =
    Businessperformance != null && Businessperformance.totalProjectedCollection
      ? nf.format(
          Businessperformance != null &&
            Businessperformance.totalProjectedCollection
        )
      : "0";

  /***********************************Format the values into x,xxx************************************/
  return (
    <div>
      {isLoading && <PageLoader />}
      {isLoading && isLoading ? (
        ""
      ) : (
        <div>
          <div className="row businessPerformance">
            <div className="col-lg-9 col-md-12 col-sm-12">
              <div className="row bp-section-1">
                <div className="col-lg-4 col-md-12 col-sm-12">
                  <div className="card">
                    <div className="DPD">
                      <img src={logo3} className="DPD-images" />
                    </div>
                    <div className="title-header">
                      <div className="card">
                        <div className="card-title">
                          Total Projected Collections (RM)
                        </div>
                        <p style={{ fontSize: "24px" }}>
                          {totalProjectedCollections}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="col-lg-8 col-md-12 col-sm-12"
                  style={{ padding: "5px" }}
                >
                  <div
                    className="table-responsive"
                    style={{ marginTop: "0px 5px 0px 3px", padding: "10px" }}
                  >
                    <table
                      className="table table-bordered"
                      style={{ background: "white" }}
                    >
                      <thead>
                        <tr>
                          <th scope="col">Product</th>
                          <th scope="col">Total Fees Collected (RM)</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Qard Hasan</td>
                          <td> {QHinterestCollected}</td>
                          {/* <td className="countValue">
                            <span className="countValue">BNPL </span>
                            {BNPLinterestCollected}
                          </td> */}
                        </tr>
                        {/* <tr>
                          <td className="countValue">
                            <span className="countValue">QH </span>
                            {QHinterestCollected}
                          </td>
                        </tr> */}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-12 col-sm-12">
              <div className="card">
                <div className="row">
                  <div className="col-5">
                    {/* <div className="col-4"> */}
                    <div className="counter-icon box-shadow-primary brround bg-primary-gradient">
                      {/* <FontAwesomeIcon icon={faCoffee} /> */}
                      {/* <i id="fasIcon" className="fa fa-tasks"></i> */}
                      <i id="fasIcon" className="fa fa-users"></i>
                    </div>
                    {/* </div> */}
                  </div>
                  <div className="col-7">
                    <div className="card-title BP">Total Number of Users</div>
                    <p className="count total-application BP">{percentage}</p>
                  </div>
                </div>
              </div>
              <div className="card">
                <div className="row">
                  <div className="col-5">
                    {/* <div className="col-4"> */}
                    <div className="counter-icon box-shadow-primary brround bg-secondary-gradient">
                      {/* <FontAwesomeIcon icon={faCoffee} /> */}
                      <i id="fasIcon" className="fa fa-user-plus"></i>
                    </div>
                    {/* </div> */}
                  </div>
                  <div className="col-7">
                    <div className="card-title BP">New Users</div>
                    <p className="count total-application BP">{NewUsers}</p>
                  </div>
                </div>
              </div>
              <div className="card">
                <div className="row">
                  <div className="col-5">
                    {/* <div className="col-4"> */}

                    <div className="counter-icon box-shadow-primary brround bg-danger-gradient">
                      {/* <FontAwesomeIcon icon={faCoffee} /> */}
                      <i id="fasIcon" className="fa fa-user"></i>
                    </div>
                    {/* </div> */}
                  </div>
                  <div className="col-7">
                    <div className="card-title BP">Inactive Users</div>
                    <p className="count total-application BP">
                      {InActiveUsers}
                    </p>
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

export default Businessperformance;
