import React from "react";
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
import InboxIcon from "@material-ui/icons/MoveToInbox";
import DashboardIcon from "@material-ui/icons/Dashboard";
import HomeIcon from "@material-ui/icons/Home";
import PaymentIcon from "@material-ui/icons/Payment";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import NavbarItems from "./Navbar/NavbarItems";
import { useHistory, NavLink } from "react-router-dom";
import Tabs from "../Dashboard/Tabs/Tab";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import PeopleIcon from "@material-ui/icons/People";
import "../Dashboard/Tabs/Tabs.css";
// import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";
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

export default function PersistentDrawerLeft() {
  const history = useHistory();

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
  const location = useLocation();

  return (
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
            Dashboard
          </Typography>
          <NavbarItems />
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
            {" "}
            ACS
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

        <List>
          <ListItem key={"Dashboard"}>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <NavLink to="/Dashboard">
              <ListItemText primary={"Dashboard"} />
            </NavLink>
          </ListItem>
          <ListItem button key={"Borrowers"}>
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <NavLink to="/borrowers">
              <ListItemText primary={"Borrowers"} />
            </NavLink>
          </ListItem>
          <ListItem button key={"Loan Approval"}>
            <ListItemIcon>
              <ThumbUpIcon />
            </ListItemIcon>
            <NavLink to="/approval">
              <ListItemText primary={"Loan Approval"} />
            </NavLink>
          </ListItem>
          <ListItem button key={"Loan Disbursement"}>
            <ListItemIcon>
              <PaymentIcon />
            </ListItemIcon>
            <NavLink to="/disbursement">
              <ListItemText primary={"Loan Disbursement"} />
            </NavLink>
          </ListItem>
        </List>
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

          <ListItem
            button
            key={"Logout"}
            onClick={() => {
              localStorage.removeItem("token");
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
        <div className="col-lg-12 col-md-12 col-sm-12">
          {/* <CardsContent /> */}
          <Tabs/>
        </div>
      </main>
    </div>
  );
}
