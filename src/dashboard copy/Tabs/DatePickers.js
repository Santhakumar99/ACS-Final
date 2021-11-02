import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import "../Css/Loanperformance.css";
const DatePickers = () => {
  const [values, setValues] = useState({
    fromDate: "",
    toDate: "",
  });
  const [Dashboard, setDashboard] = useState([{}]);
  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    let inputValues = values;
    inputValues[name] = value;
    setValues({ ...inputValues });
  };
  //   const FilterData = () => {
  //     const valuesObj = {
  //       ...values,
  //     };
  //     console.log(valuesObj);
  //   };
  const FilterData1 = () => {
    setDashboard(Dashboard);
  };
  useEffect(() => {
    FilterData1();
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
  return (
    <div>
      <div className="d-picker">
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
          />
          <div className="contact-us-form-group DashdateSubmit">
            <button
              className="contact-us-form-btn"
              style={{ marginLeft: "20px", marginTop: "-5px" }}
              onClick={FilterData}
            >
              Filter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DatePickers;
