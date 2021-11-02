import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";

import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import axios from "axios";

import Loader from "../../common/Loader";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";

import DeleteIcon from "@material-ui/icons/Delete";

// import { TextField } from "@material-ui/core";

import Card from "../../common/Card";

import "../../css/style.css";

const columns = [
  { id: "sr", label: "Sr No", minWidth: 70 },
  { id: "userTypeId", label: "Role", minWidth: 170 },
  // { id: "features", label: "Features", minWidth: 170 },

  { id: "edit", label: "Edit" },
  { id: "delete", label: "Delete" },
];

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
  head: {
    backgroundColor: "#0984e1",
    color: "white",
    fontWeight: 700,
  },
});

export default function ListRoleMappings() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const history = useHistory();
  let token = localStorage.getItem("token");

  const [open, setOpen] = React.useState(false);
  const [errMsg, setErrMsg] = useState(undefined);

  const handleClickOpen = (msg) => {
    setErrMsg(msg);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [isLoading, setIsLoading] = useState(false);
  const [rows, setRows] = useState([]);

  const [searchText, setSearchText] = useState();

  const fetchData = async () => {
    if (token) {
      try {
        setIsLoading(true);
        const result = await axios
          .get(`${process.env.REACT_APP_URL}/rolemappings`, {
            headers: { Authorization: token },
          })
          .catch((error) => {
            console.log("error ", error.response.data.errors[0].msg);
            setIsLoading(false);

            error.response.data.errors[0].msg
              ? handleClickOpen(error.response.data.errors[0].msg)
              : handleClickOpen("Something went wrong !!!");
          });
        if (result && result.data) {
          let data = result?.data?.roleMappings;
          setRows(data);
          setIsLoading(false);
        }
      } catch (err) {
        setIsLoading(false);

        handleClickOpen("Something went wrong !!!");
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  const deleteHandler = async (id) => {
    if (token) {
      try {
        setIsLoading(true);
        const result = await axios
          .delete(`${process.env.REACT_APP_URL}/rolemappings/${id}`, {
            headers: { Authorization: token },
          })
          .catch((error) => {
            console.log("error ", error.response.data.errors[0].msg);
            setIsLoading(false);

            error.response.data.errors[0].msg
              ? handleClickOpen(error.response.data.errors[0].msg)
              : handleClickOpen("Something went wrong !!!");
          });
        if (result && result.data) {
          let data = result?.data?.result;
          console.log(data);
          setIsLoading(false);
          handleClickOpen(data);
          fetchData();
        }
      } catch (err) {
        setIsLoading(false);

        handleClickOpen("Something went wrong !!!");
      }
    }
  };

  return (
    <React.Fragment>
      {isLoading && <Loader />}
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {errMsg ? errMsg : "Something went wrong"}
          </DialogTitle>

          <DialogActions>
            <Button onClick={handleClose} color="primary" autoFocus>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      {!isLoading && (
        <div className="features-section">
          {/* <div className="container features-container"></div> */}
          <Card>
            <div className="col-lg-12">
              {/* <div style={{ overflow: "auto" }}> */}
              <div>
                <div className="floatLeft">
                  <h1 className="title">User Role Mapping</h1>
                </div>
                <div className="floatRight">
                  <button
                    className="contact-us-form-btn"
                    onClick={() => history.push("/rolemappings/add")}
                  >
                    Add User Role Mapping
                  </button>
                </div>
              </div>
            </div>
            <br />

            <div className="features-container">
              <Paper className={classes.root}>
                <TableContainer className={classes.container}>
                  <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                      <TableRow className={classes.head}>
                        {columns.map((column) => (
                          <TableCell
                            key={column.id}
                            align={column.align}
                            style={{
                              minWidth: column.minWidth,
                              maxWidth: column.maxWidth,
                            }}
                            className={classes.head}
                          >
                            {column.label}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows &&
                        rows.length > 0 &&
                        rows.map((row, i) => {
                          return (
                            <TableRow
                              hover
                              role="checkbox"
                              tabIndex={-1}
                              key={row._id}
                            >
                              <TableCell
                                onClick={() =>
                                  history.push(`/rolemappings/edit/${row._id}`)
                                }
                              >
                                {i + 1}
                              </TableCell>
                              <TableCell
                                onClick={() =>
                                  history.push(`/rolemappings/edit/${row._id}`)
                                }
                              >
                                {row.userTypeId.type}
                              </TableCell>

                              <TableCell
                                onClick={() =>
                                  history.push(`/rolemappings/edit/${row._id}`)
                                }
                              >
                                {"Edit"}
                              </TableCell>
                              <TableCell onClick={() => deleteHandler(row._id)}>
                                <DeleteIcon />
                              </TableCell>
                            </TableRow>
                          );
                        })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </div>
          </Card>
          {/* </div> */}
        </div>
      )}
    </React.Fragment>
  );
}
