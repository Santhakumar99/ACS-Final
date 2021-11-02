import React from "react";
import { useState } from "react";
import LoanApplications from "./LoanApplications";
import TransactionQueue from "./TransactionQueue";
import "../Approval/Approval.css";
import { NavLink } from "react-router-dom";
import ListItemText from "@material-ui/core/ListItemText";
const Approval = () => {
  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };
  return (
    <div>
      {/* <div
        className="Navlink"
        style={{ marginTop: "40px", marginLeft: "15px" }}
      >
        <NavLink to="/">
          <ListItemText primary={"Home"} />
        </NavLink>
        <span className="slash">&#47;</span>
        <NavLink to="/approve">
          <ListItemText primary={"Approval"} />
        </NavLink>
      </div> */}
      <div>
        <TransactionQueue />
      </div>
      {/* <div className="approval-head">
        <div className="bloc-tabs">
          <button
            className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
            onClick={() => toggleTab(1)}
          >
            Transaction Queue
          </button>
          <button
            className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
            onClick={() => toggleTab(2)}
          >
            Loan Applications
          </button>
        </div>

        <div className="content-tabs">
          <div
            className={
              toggleState === 1 ? "content  active-content" : "content"
            }
          >
            <TransactionQueue />
          </div>

          <div
            className={
              toggleState === 2 ? "content  active-content" : "content"
            }
          >
            <LoanApplications />
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Approval;
