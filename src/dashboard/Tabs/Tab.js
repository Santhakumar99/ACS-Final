import ListItemText from "@material-ui/core/ListItemText";
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
import Loader from "../../common/Loader";
// import Products from "../../Products/products";
const Tab = () => {
  let Token = localStorage.getItem("token");
  const [toggleState, setToggleState] = useState(1);
  const [Dashboard, setDashboard] = useState([{}]);
  const [DashboardStatus, setDashboardStatus] = useState([{}]);
  const [BusinessPerformance, setBusinessPerformance] = useState([{}]);
  const [values, setValues] = useState({
    fromDate: "",
    toDate: "",
  });
  const [selectPicker, setSelectPicker] = useState({ iscal: false });
  const [isLoading, setIsLoading] = useState(false);
  const toggleTab = (index) => {
    setToggleState(index);
  };

  const FromDate = values.fromDate != null && values.fromDate;
  const ToDate = values.toDate != null && values.toDate;

  useEffect(() => {
    if (selectPicker.iscal === true) {
      console.log(selectPicker, "selectPicker");
      FilterData();
      FilterDashboard();
      FilterDashboardStatus();
      BusinessPerformanceFilter();
    }
    return () => {
      console.log("working");
    };
  }, []);
  const FilterData = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    try {
      const [firstResponse, secondResponse, thirdResponse] = await Promise.all([
        axios.get(
          `${process.env.REACT_APP_URL}/loans/dashboard_loan_approved?fromDate=${FromDate}&toDate=${ToDate}`
        ),
        axios.get(
          `${process.env.REACT_APP_URL}/loans/dashboard_loan_status?fromDate=${FromDate}&toDate=${ToDate}`
        ),
        axios.get(
          `${process.env.REACT_APP_URL}/loans/dashboard_business_performance?fromDate=${FromDate}&toDate=${ToDate}`
        ),
      ]);
      console.log(firstResponse);
      setDashboard(firstResponse.data.dashboardObj);
      console.log(secondResponse);
      setDashboardStatus(secondResponse.data.dashboardObj);
      console.log(thirdResponse);
      setBusinessPerformance(thirdResponse.data.dashboardObj);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    let inputValues = values;
    inputValues[name] = value;
    setValues({ ...inputValues });
  };

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
          <div className="Navlink">
            <NavLink to="/">
              <ListItemText primary={"Home"} />
            </NavLink>
            <span className="slash">&#47;</span>
            <NavLink to="/content">
              <ListItemText primary={"Dashboard"} />
            </NavLink>
          </div>
          {/* <div className="col-12"> */}
          <div className="col-12 bloc-tabs">
            <div className="row" style={{ width: "100%" }}>
              <div className="col-4">
                <button
                  className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
                  onClick={() => toggleTab(1)}
                >
                  Loan Performance
                </button>
              </div>
              <div className="col-4">
                <button
                  className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
                  onClick={() => toggleTab(2)}
                >
                  Profile of Borrowers
                </button>
              </div>
              <div className="col-4">
                <button
                  className={toggleState === 3 ? "tabs active-tabs" : "tabs"}
                  onClick={() => toggleTab(3)}
                >
                  Business Performance
                </button>
              </div>
            </div>
          </div>
          {/* </div> */}
          <div className="col-12 content-tabs">
            <div className="DateSelect">
              {toggleState === 2 ? (
                ""
              ) : (
                <div className="d-picker">
                  <form onSubmit={FilterData}>
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
                          type="submit"
                          className="contact-us-form-btn"
                          style={{ marginTop: "-5px" }}
                          // onClick={setSelectPicker( iscal: true )}
                          iscal={true}
                        >
                          Filter
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              )}
            </div>
            <div className="col-12">
              <div
                className={
                  toggleState === 1 ? "content  active-content" : "content"
                }
              >
                <Loanperformance
                  FilterDashboard={Dashboard}
                  FilterDashboardStatus={DashboardStatus}
                />
              </div>
            </div>
            <div className="col-12">
              <div
                className={
                  toggleState === 2 ? "content  active-content" : "content"
                }
              >
                <ProfileofBorrowers />
              </div>
            </div>
            <div className="col-12">
              <div
                className={
                  toggleState === 3 ? "content  active-content" : "content"
                }
              >
                <Businessperformance
                  BusinessPerformanceFilter={BusinessPerformance}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Tab;
