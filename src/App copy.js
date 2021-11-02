import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import Auth from "./user/pages/Auth";
import ForgotPassword from "./user/pages/ForgotPassword";
import ChangePassword from "./user/pages/ChangePassword";
import ResetPassword from "./user/pages/ResetPassword";

// import SideBar from "./pages/SideBar";
import SideDrawer from "./pages/SideDrawer";
import Home from "./common/Home";

// Modules

// Disbursement
import DisbursementList from "./modules/disbursement/DisbursementList";
import AddEditDisbursement from "./modules/disbursement/AddEditDisbursement";

import LoanApprovals from "./modules/approvals/LoanApprovals";

// Borrowers
import ListBorrowers from "./modules/borrowers/ListBorrowers";
import ViewBorrower from "./modules/borrowers/ViewBorrower";

import Content from "./dashboard/Content";

import "./App.css";
function App() {
  // use Auth for auto login and logout
  // const { token, login, logout, userId } = useAuth();

  let token = localStorage.getItem("token");
  // const token = null;

  let routes;
  if (token) {
    routes = (
      <React.Fragment>
        <Switch>
          {/* <Route path="/" exact>
            <Home />
          </Route> */}

          <Route path="/" exact>
            <SideDrawer />
          </Route>
          <Route path="/dashboard" exact>
            <SideDrawer />
          </Route>

          <Route path="/changepassword">
            <ChangePassword />
          </Route>

          <Route path="/borrowers/:id">
            <ViewBorrower />
          </Route>

          <Route path="/borrowers">
            <ListBorrowers />
          </Route>

          {/* Approvals */}
          <Route path="/approval">
            <LoanApprovals />
          </Route>

          {/* <Route path="/disbursement/addedit/:id"> */}
          <Route path="/disbursement">
            <AddEditDisbursement />
          </Route>

          {/* <Route path="/disbursement">
            <DisbursementList />
          </Route> */}

          {/* Default Redirect */}
          <Redirect to="/" />
        </Switch>
      </React.Fragment>
    );
  } else {
    routes = (
      <React.Fragment>
        <Switch>
          {/* <Route path="/">
            <Auth />
          </Route> */}
          <Route path="/login">
            <Auth />
          </Route>

          <Route path="/forgotpassword">
            <ForgotPassword />
          </Route>
          <Route path="/resetpassword">
            <ResetPassword />
          </Route>

          <Redirect to="/login" />
        </Switch>
      </React.Fragment>
    );
  }
  return (
    // add user id, ********* add token  *******
    // <AuthContext.Provider
    //   value={{
    //     isLoggedIn: !!token,
    //     token: token,
    //     userId: userId,
    //     login: login,
    //     logout: logout,
    //   }}
    // >
    <Router>
      {token && <SideDrawer />}

      {/* {token && <MainNavigation />} */}
      <main>{routes}</main>
    </Router>
    // </AuthContext.Provider>
  );
}

export default App;
