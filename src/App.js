import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import jwt from "jwt-decode"; // import dependency

import Auth from "./user/pages/Auth";
import ForgotPassword from "./user/pages/ForgotPassword";
import ChangePassword from "./user/pages/ChangePassword";
import ResetPassword from "./user/pages/ResetPassword";

// import SideBar from "./pages/SideBar";
// import SideDrawer from "./pages/SideDrawer";
// import Home from "./common/Home";

// Modules

// Disbursement
// import DisbursementList from "./modules/disbursement/DisbursementList";
import AddEditDisbursement from "./modules/disbursement/AddEditDisbursement";

import LoanApprovals from "./modules/approvals/LoanApprovals";

// Borrowers
import ListBorrowers from "./modules/borrowers/ListBorrowers";
import ViewBorrower from "./modules/borrowers/ViewBorrower";

// Users
import AddEditUser from "./modules/users/AddEditUser";
import ListUsers from "./modules/users/ListUsers";

// RoleMappings
import AddEditRoleMapping from "./modules/roleMappings/AddEditRoleMapping";
// import AddEditRoleMapping from "./modules/roleMappings/AddEditRoleMapping";
import ListRoleMappings from "./modules/roleMappings/ListRoleMappings";

import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
// import InboxIcon from "@material-ui/icons/MoveToInbox";
// import MailIcon from "@material-ui/icons/Mail";

// import PaymentIcon from "@material-ui/icons/Payment";
// import VpnKeyIcon from "@material-ui/icons/VpnKey";
// import ExitToAppIcon from "@material-ui/icons/ExitToApp";
// import ThumbUpIcon from "@material-ui/icons/ThumbUp";
// import PeopleIcon from "@material-ui/icons/People";
// import DashboardIcon from "@material-ui/icons/Dashboard";

// Santha
import Tabs from "./dashboard/Tabs/Tab";
import AddProduct from "./modules/Products/AddProduct";
import ListProducts from "./modules/Products/ListProducts";
import EditProduct from "./modules/Products/EditProduct";
// import Approval from "./dashboard/Approval/Approval";
import LoanApplications from "./dashboard/Approval/LoanApplications";
import TransactionQueue from "./dashboard/Approval/TransactionQueue";
import OutstandingLoansList from "./dashboard/Outstanding/OutstandingLoansList";
import OutstandingLoansDetails from "./dashboard/Outstanding/OutstandingLoansDetails";
import AddRole from "./dashboard/Roles/Addrole";
import RolesList from "./dashboard/Roles/RolesList";
import UpdateRoles from "./dashboard/Roles/UpdateRoles";
import StatusofLoansChart from "./dashboard/Charts/BnplStatusofLoansChart";
import alfieLogo from "./images/ACS-Logo.png";
import "./App.css";
import SearchData from "./dashboard/Search/SearchData";
import Dpicker from "./dashboard/Tabs/DatePickers";
import Profile from "./dashboard/Approval/Profile";
import Repayment from "./dashboard/Repayments/Repayment";
import PersonIcon from "@mui/icons-material/Person";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import SearchIcon from "@mui/icons-material/Search";
import PaymentIcon from "@material-ui/icons/Payment";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import PeopleIcon from "@material-ui/icons/People";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import PaidIcon from "@mui/icons-material/Paid";
import { useHistory, NavLink } from "react-router-dom";
import DisbursementFunds from "./dashboard/Outstanding/DisbursementFunds";
import { AuthContext } from "../src/user/context/auth-context";
import { useAuth } from "../src/user/hook/auth-hook";
// import Repayment from "./dashboard/Repayments/Repayment";
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

function App() {
  // const history = useHistory();
  // use Auth for auto login and logout
  const { token, login, logout } = useAuth();

  const classes = useStyles();
  const theme = useTheme();
  // const [open, setOpen] = React.useState(true);
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const cardStyle = {
    padding: "10px",
    fontFamily: "Arial",
    fontSize: "27px",
  };

  let tokens = localStorage.getItem("token");

  var roles = [];

  var checkPermission = (module, permission) => {
    if (tokens) {
      const user = jwt(tokens);
      roles = user.roles ? user.roles.features : [];
      console.log("User ", user);
    }
    if (!roles || roles.length <= 0) {
      return false;
    }
    var perm = roles.find((mod) => mod.module === module);
    // console.log(perm);
    if (perm) {
      return perm[permission];
    } else return false;
  };

  let routes;
  if (tokens) {
    routes = (
      <React.Fragment>
        <Switch>
          <Route path="/" exact>
            <Tabs />
          </Route>

          <Route path="/dashboard" exact>
            <Tabs />
          </Route>

          <Route path="/changepassword" exact>
            <ChangePassword />
          </Route>

          {/* Users */}
          {checkPermission("Users", "create") && (
            <Route path="/users/add" exact>
              <AddEditUser />
            </Route>
          )}

          {checkPermission("Users", "update") && (
            <Route path="/users/edit/:id" exact>
              <AddEditUser />
            </Route>
          )}

          {checkPermission("Users", "view") && (
            <Route path="/users" exact>
              <ListUsers />
            </Route>
          )}
          {/* Users */}

          {/* View Borrowers */}
          {checkPermission("View Borrowers", "view") && (
            <Route path="/borrowers/:id" exact>
              <ViewBorrower />
            </Route>
          )}

          {checkPermission("View Borrowers", "view") && (
            <Route path="/borrowers" exact>
              <ListBorrowers />
            </Route>
          )}
          {/* View Borrowers */}

          {/* Loan Approval */}
          {checkPermission("Loan Approval", "view") && (
            <Route path="/approval" exact>
              <LoanApprovals />
            </Route>
          )}

          <Route path="/transactionQueue" exact>
            <TransactionQueue />
          </Route>

          {/*  Accept or reject loans */}
          <Route path="/loanApplications" exact>
            <LoanApplications />
          </Route>
          {/* Loan Approval */}

          {/* <Route path="/disbursement/addedit/:id"> */}
          {/* Loan Disbursement */}
          {(checkPermission("Loan Disbursement", "create") ||
            checkPermission("Loan Disbursement", "update")) && (
            <Route path="/disbursement" exact>
              <AddEditDisbursement />
            </Route>
          )}
          {/* Loan Disbursement */}

          {/* Outstanding loan */}
          {checkPermission("Outstanding Loans", "view") && (
            <Route path="/outstandingLoans" exact>
              <OutstandingLoansList />
            </Route>
          )}

          {checkPermission("Outstanding Loans", "view") && (
            <Route path="/outstandingLoanDetails" exact>
              <OutstandingLoansDetails />
            </Route>
          )}
          {/* Outstanding loan */}

          {/* User Role Mapping */}
          {checkPermission("User Role Mapping", "create") && (
            <Route path="/rolemappings/add" exact>
              <AddEditRoleMapping />
            </Route>
          )}

          {checkPermission("User Role Mapping", "update") && (
            <Route path="/rolemappings/edit/:id" exact>
              <AddEditRoleMapping />
            </Route>
          )}

          {checkPermission("User Role Mapping", "view") && (
            <Route path="/rolemappings" exact>
              <ListRoleMappings />
            </Route>
          )}
          {/* /--------------- // santhakumar changes start //--------------- */}
          <Route path="/pendingApproval">
            <TransactionQueue />
          </Route>

          {/*  Accept or reject loans */}

          <Route path="/loanApplications">
            <LoanApplications />
          </Route>

          <Route path="/profile">
            <Profile />
          </Route>

          <Route path="/unpaidLoans">
            <OutstandingLoansList />
          </Route>

          <Route path="/unpaidLoanDetails">
            <OutstandingLoansDetails />
          </Route>

          <Route path="/repayment">
            <Repayment />
          </Route>

          <Route path="/Search">
            <SearchData />
          </Route>

          <Route path="/picker">
            <Dpicker />
          </Route>

          <Route path="/addrole">
            <AddRole />
          </Route>

          <Route path="/listRoles">
            <RolesList />
          </Route>

          <Route path="/updateRole">
            <UpdateRoles />
          </Route>

          <Route path="/disbursementLoans">
            <DisbursementFunds />
          </Route>
          {/* /--------------- // santhakumar changes end //--------------- */}

          {/* Product */}
          {checkPermission("Product", "create") && (
            <Route path="/addproduct" exact>
              <AddProduct />
            </Route>
          )}
          {checkPermission("Product", "view") && (
            <Route path="/listproducts" exact>
              <ListProducts />
            </Route>
          )}
          {checkPermission("Product", "update") && (
            <Route path="/updateproduct" exact>
              <EditProduct />
            </Route>
          )}
          {/* Product */}

          {/* Role */}
          {checkPermission("Role", "create") && (
            <Route path="/addrole" exact>
              <AddRole />
            </Route>
          )}

          {checkPermission("Role", "view") && (
            <Route path="/listRoles" exact>
              <RolesList />
            </Route>
          )}

          {checkPermission("Role", "update") && (
            <Route path="/updateRole" exact>
              <UpdateRoles />
            </Route>
          )}
          {/* Role */}

          <Route path="/status" exact>
            <StatusofLoansChart />
          </Route>
          {/* Santha END*/}
          {/* <Route path="/forgotpassword" exact>
            <ForgotPassword />
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
          <Route path="/forgotpassword" exact>
            <ForgotPassword />
          </Route>
          <Route path="/resetpassword" exact>
            <ResetPassword />
          </Route>
          <Route path="/login">
            <Auth />
          </Route>

          <Redirect to="/login" />
        </Switch>
      </React.Fragment>
    );
  }
  return (
    // add user id, ********* add token  *******
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        login: login,
        logout: logout,
      }}
    >
      <Router>
        {tokens && (
          <div className={classes.root}>
            <CssBaseline />
            <AppBar
              position="fixed"
              className={clsx(classes.appBar, {
                [classes.appBarShift]: open,
              })}
            >
              <Toolbar>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={handleDrawerOpen}
                  edge="start"
                  className={clsx(classes.menuButton, open && classes.hide)}
                >
                  <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap>
                  {/* <NavLink to="/"> */}
                  ACS Web Portal
                  {/* </NavLink> */}
                </Typography>
              </Toolbar>
            </AppBar>
            <Drawer
              className={classes.drawer}
              variant="persistent"
              anchor="left"
              open={open}
              classes={{
                paper: classes.drawerPaper,
              }}
            >
              <div className={classes.drawerHeader}>
                <div className="Logoname" style={cardStyle}>
                  <NavLink to="/">
                    <img src={alfieLogo} width="140px" alt="Logo" />
                  </NavLink>
                  {/* ACS */}
                </div>
                <IconButton onClick={handleDrawerClose}>
                  {theme.direction === "ltr" ? (
                    <ChevronLeftIcon />
                  ) : (
                    <ChevronRightIcon />
                  )}
                </IconButton>
              </div>
              <Divider />
              {token && (
                <List>
                  <ListItem key={"Home"}>
                    <ListItemIcon>
                      <DashboardIcon />
                    </ListItemIcon>
                    <NavLink to="/">
                      <ListItemText primary={"Home"} />
                    </NavLink>
                  </ListItem>

                  {checkPermission("View Borrowers", "view") && (
                    <ListItem button key={"Borrowers"}>
                      <ListItemIcon>
                        <PeopleIcon />
                      </ListItemIcon>
                      <NavLink to="/borrowers">
                        <ListItemText primary={"Borrowers"} />
                      </NavLink>
                    </ListItem>
                  )}
                  {/* 
                  {checkPermission("Loan Approval", "view") && (
                    <ListItem button key={"Pending Approval"}>
                      <ListItemIcon>
                        <ThumbUpIcon />
                      </ListItemIcon>
                      <NavLink to="/transactionQueue">
                        <ListItemText primary={"Pending Approval"} />
                      </NavLink>
                    </ListItem>
                  )}

                  {checkPermission("Outstanding Loans", "other") && (
                    <ListItem button key={"Pending Disbursement"}>
                      <ListItemIcon>
                        <ThumbUpIcon />
                      </ListItemIcon>
                      <NavLink to="/outstandingLoans">
                        <ListItemText primary={"Pending Disbursement"} />
                      </NavLink>
                    </ListItem>
                  )}

                  {checkPermission("Loan Approval", "other") && (
                    <ListItem button key={"Loan Approval - Export Import"}>
                      <ListItemIcon>
                        <ThumbUpIcon />
                      </ListItemIcon>
                      <NavLink to="/approval">
                        <ListItemText
                          primary={"Loan Approval - Export Import"}
                        />
                      </NavLink>
                    </ListItem>
                  )}

                  {checkPermission("Loan Approval", "view") && (
                    <ListItem button key={"Loan Disbursement"}>
                      <ListItemIcon>
                        <PaymentIcon />
                      </ListItemIcon>
                      <NavLink to="/disbursement">
                        <ListItemText primary={"Loan Disbursement"} />
                      </NavLink>
                    </ListItem>
                  )} */}

                  {checkPermission("Loan Approval", "view") && (
                    <ListItem button key={"Pending Approval"}>
                      <ListItemIcon>
                        {/* <ThumbUpIcon /> */}
                        <PendingActionsIcon />
                      </ListItemIcon>
                      <NavLink to="/pendingApproval">
                        <ListItemText primary={"Pending Approval"} />
                      </NavLink>
                    </ListItem>
                  )}

                  {checkPermission("Outstanding Loans", "other") && (
                    <ListItem button key={"Unpaid Loans"}>
                      <ListItemIcon>
                        <PaidIcon />
                      </ListItemIcon>
                      <NavLink to="/unpaidLoans">
                        <ListItemText primary={"Unpaid Loans"} />
                      </NavLink>
                    </ListItem>
                  )}

                  {checkPermission("Loan Approval", "other") && (
                    <ListItem button key={"Loan Approval - Export Import"}>
                      <ListItemIcon>
                        <ThumbUpIcon />
                      </ListItemIcon>
                      <NavLink to="/approval">
                        <ListItemText
                          primary={"Loan Approval - Export Import"}
                        />
                      </NavLink>
                    </ListItem>
                  )}
                  <ListItem button key={"Repayments"}>
                    <ListItemIcon>
                      <PaymentIcon />
                    </ListItemIcon>
                    <NavLink to="/repayment">
                      <ListItemText primary={"Repayments"} />
                    </NavLink>
                  </ListItem>
                </List>
              )}
              {/* {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))} */}
              <Divider />
              <List>
                {/* {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))} */}

                <ListItem button key={"Change Password"}>
                  <ListItemIcon>
                    <VpnKeyIcon />
                  </ListItemIcon>
                  <NavLink to="/changepassword">
                    <ListItemText primary={"Change Password"} />
                  </NavLink>
                </ListItem>

                {checkPermission("Users", "view") && (
                  <ListItem button key={"Users"}>
                    <ListItemIcon>
                      <PeopleIcon />
                    </ListItemIcon>
                    <NavLink to="/users">
                      <ListItemText primary={"Users"} />
                    </NavLink>
                  </ListItem>
                )}

                <ListItem button key={"User Role"}>
                  <ListItemIcon>
                    <PersonAddIcon />
                  </ListItemIcon>
                  <NavLink to="/listRoles">
                    <ListItemText primary={"User Role"} />
                  </NavLink>
                </ListItem>

                {checkPermission("User Role Mapping", "view") && (
                  <ListItem button key={"User Role Mapping"}>
                    <ListItemIcon>
                      <PersonIcon />
                    </ListItemIcon>
                    <NavLink to="/rolemappings">
                      <ListItemText primary={"User Role Mapping"} />
                    </NavLink>
                  </ListItem>
                )}
                <ListItem button key={"Search Data"}>
                  <ListItemIcon>
                    <SearchIcon />
                  </ListItemIcon>
                  <NavLink to="/Search">
                    <ListItemText primary={"Search Data"} />
                  </NavLink>
                </ListItem>
                <ListItem
                  button
                  key={"Logout"}
                  // onClick={auth.logout}
                  onClick={() => {
                    console.log("Loggout");
                    localStorage.removeItem("token");

                    localStorage.removeItem("userData");
                    return (window.location = "/login");
                  }}
                >
                  <ListItemIcon>
                    <ExitToAppIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Logout"} />
                </ListItem>
              </List>
            </Drawer>
            <main
              className={clsx(classes.content, {
                [classes.contentShift]: open,
              })}
            >
              {routes}
            </main>
          </div>
        )}
        {!tokens && <main>{routes}</main>}
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
