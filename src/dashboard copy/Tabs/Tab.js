import { Tabs } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import React from "react";
import { useState, useEffect } from "react";
import "../Tabs/Tabs.css";
import Businessperformance from "./Businessperformance";
import Loanperformance from "./Loanperformance";
import RiskIndicators from "./RiskIndicators";
import { NavLink } from "react-router-dom";
import ProfileofBorrowers from "./ProfileofBorrowers";
import LoanPerformanceSecondary from "./LoanPerformanceSecondary";
import DatePicker from "react-datepicker";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";
// import Products from "../../Products/products";
const Tab = () => {
  const [toggleState, setToggleState] = useState(1);
  const [Dashboard, setDashboard] = useState([{}]);
  const [startDate, setStartDate] = React.useState(new Date());
  const [toDate, setToDate] = React.useState(new Date());
  const [values, setValues] = useState({
    startDate: "",
    endDate: "",
  });
  const toggleTab = (index) => {
    setToggleState(index);
  };
  useEffect(() => {
    getLoansApprovedData();
  }, []);
  const getLoansApprovedData = async () => {
    // setIsLoading(true);
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_URL}/loans/dashboard_loan_approved?fromDate=${startDate}&toDate=${startDate}`,
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
  return (
    <div>
      <div className="Navlink">
        <NavLink to="/">
          <ListItemText primary={"Home"} />
        </NavLink>
        <span className="slash">&#47;</span>
        <NavLink to="/content">
          <ListItemText primary={"Dashboard"} />
        </NavLink>
      </div>
      {/* <div className="d-picker">
        <div className="Fromdate">
          <span className="date-content">From</span>
          <DatePicker
            selected={startDate}
            dateFormat="dd-MM-yyyy"
            onChange={(date) => setStartDate(date)}
          />
          <span className="date-content">To</span>
          <DatePicker
            selected={toDate}
            minDate={startDate}
            dateFormat="dd-MM-yyyy"
            onChange={(date) => setToDate(date)}
          />

          <div className="contact-us-form-group DashdateSubmit">
            <button
              className="contact-us-form-btn"
              style={{ marginLeft: "20px", marginTop: "-5px" }}
            >
              Filter
            </button>
          </div>
        </div>
      </div> */}
      <div className="bloc-tabs">
        <button
          className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(1)}
        >
          Loan Performance
        </button>
        <button
          className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(2)}
        >
          Profile of Borrowers
        </button>
        <button
          className={toggleState === 3 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(3)}
        >
          Business Performance
        </button>
        {/* <button
          className={toggleState === 4 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(4)}
        >
          Risk Indicaters
        </button> */}
      </div>

      <div className="content-tabs">
        <div
          className={toggleState === 1 ? "content  active-content" : "content"}
        >
          <Loanperformance />
        </div>

        <div
          className={toggleState === 2 ? "content  active-content" : "content"}
        >
          <ProfileofBorrowers />
        </div>

        <div
          className={toggleState === 3 ? "content  active-content" : "content"}
        >
          {/* <p>No Data Found</p> */}
          <Businessperformance />
        </div>

        {/* <div
          className={toggleState === 4 ? "content  active-content" : "content"}
        >
          <p>No Data Found</p>

        </div> */}
      </div>
      {/* </div> */}
    </div>
  );
};

export default Tab;
