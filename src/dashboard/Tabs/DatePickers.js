import React from "react";
import { useState, useEffect } from "react";
import "../Tabs/Tabs.css";
import Businessperformance from "./Businessperformance";
import Loanperformance from "./Loanperformance";
import { NavLink } from "react-router-dom";
import ProfileofBorrowers from "./ProfileofBorrowers";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";
import PageLoader from "../FullPageLoader/PageLoader";
import ListItemText from "@material-ui/core/ListItemText";
import Toastify from "../Toaster/Toastify";
import Loader from "../../common/Loader";

const Dpicker = () => {
  let Token = localStorage.getItem("token");
  const [toggleState, setToggleState] = useState(1);
  const [Dashboard, setDashboard] = useState([{}]);
  const [DashboardStatus, setDashboardStatus] = useState([{}]);
  const [BusinessPerformance, setBusinessPerformance] = useState([{}]);
  const [values, setValues] = useState({
    fromDate: "",
    toDate: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const toggleTab = (index) => {
    setToggleState(index);
  };
  useEffect(() => {
    if (values.fromDate !== "" && values.toDate !== "") {
      FilterData();
      FilterDashboard();
      FilterDashboardStatus();
      BusinessPerformanceFilter();
    }
  }, []);

  const FilterData = async () => {
    // setIsLoading(true);;
    const FromDate = values.fromDate != null && values.fromDate;
    const ToDate = values.toDate != null && values.toDate;

    /******************************************* handle API for Loan Approved *****************************************/
    if (Token) {
      try {
        const result = await axios.get(
          `${process.env.REACT_APP_URL}/loans/dashboard_loan_approved?fromDate=${FromDate}&toDate=${ToDate}`,
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
      /******************************************* handle API for Loan Status *****************************************/
      try {
        const result = await axios.get(
          `${process.env.REACT_APP_URL}/loans/dashboard_loan_status?fromDate=${FromDate}&toDate=${ToDate}`,
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );
        console.log(result.data.dashboardObj);
        setDashboardStatus(result.data.dashboardObj);
        // return <Loanperformance FilterDashboard={result.data.dashboardObj} />;
        // setIsLoading(false);
      } catch (error) {
        console.log(error);
        // setIsLoading(false);
      }
      /******************************************* handle API for Business Performance *****************************************/
      try {
        const result = await axios.get(
          `${process.env.REACT_APP_URL}/loans/dashboard_business_performance?fromDate=${FromDate}&toDate=${ToDate}`,
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );
        console.log(result.data.dashboardObj);
        setBusinessPerformance(result.data.dashboardObj);
        // setIsLoading(false);
      } catch (error) {
        console.log(error);
        // setIsLoading(false);
      }
    }
  };

  /******************************************* handle on change input values *****************************************/
  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    let inputValues = values;
    inputValues[name] = value;
    setValues({ ...inputValues });
  };
  /******************************************* Props *****************************************/
  const FilterDashboard = () => {
    setDashboard(Dashboard);
  };
  const FilterDashboardStatus = () => {
    setDashboardStatus(DashboardStatus);
  };
  const BusinessPerformanceFilter = () => {
    setBusinessPerformance(BusinessPerformance);
  };

  return (
    <div>
      {isLoading && <Loader />}

      {isLoading && isLoading ? (
        ""
      ) : (
        <>
          {/* </div> */}
          <div
            className="col-lg-12 col-md-12 col-sm-12 content-tabs"
            style={{ marginTop: "50px" }}
          >
            <div className="DateSelect">
              {/* {toggleState === 2 ? "" : <DatePickers />} */}

              <div className="d-picker">
                {/* <form> */}
                <div className="Fromdate">
                  <span className="date-content">From</span>
                  <input
                    type="date"
                    name="fromDate"
                    max={values.fromDate}
                    id="startdate"
                    value={values.startdate}
                    onChange={(e) => onChangeHandler(e)}
                    className="form-control"
                    required
                  />
                  <span className="date-content">To</span>
                  <input
                    type="date"
                    name="toDate"
                    min={values.fromDate}
                    max={values.enddate}
                    id="enddate"
                    value={values.enddate}
                    onChange={(e) => onChangeHandler(e)}
                    className="form-control"
                    required
                  />
                  <div className="contact-us-form-group DashdateSubmit">
                    <button
                      type="button"
                      className="contact-us-form-btn"
                      style={{ marginLeft: "20px", marginTop: "-5px" }}
                      onClick={FilterData}
                    >
                      Filter
                    </button>
                  </div>
                </div>
                {/* </form> */}
                {/* <Loanperformance
                  FilterDashboard={Dashboard}
                  FilterDashboardStatus={DashboardStatus}
                /> */}
                ;
              </div>
              <Toastify />
              <PageLoader />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Dpicker;
