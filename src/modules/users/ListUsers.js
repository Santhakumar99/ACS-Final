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

import { TextField } from "@material-ui/core";

import Card from "../../common/Card";

import "../../css/style.css";

const columns = [
  { id: "userName", label: "Username", minWidth: 170 },
  { id: "email", label: "Email", minWidth: 170 },
  { id: "roleId", label: "Role", minWidth: 170 },
  { id: "edit", label: "Edit", minWidth: 170 },
  { id: "delete", label: "Delete", minWidth: 170 },
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

export default function StickyHeadTable() {
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
          .get(
            `${process.env.REACT_APP_URL}/users/webusers?page=${
              page ? page : 1
            }&searchText=${searchText}`,
            {
              headers: {
                Authorization: token,
              },
            }
          )
          .catch((error) => {
            console.log("error ", error.response.data.errors[0].msg);
            setIsLoading(false);

            error.response.data.errors[0].msg
              ? handleClickOpen(error.response.data.errors[0].msg)
              : handleClickOpen("Something went wrong !!!");
          });
        if (result && result.data) {
          let data = result?.data?.data;
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
          .delete(`${process.env.REACT_APP_URL}/users/${id}`, {
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
                  <h1 className="title">Users</h1>
                </div>
                <div className="floatRight">
                  <button
                    className="contact-us-form-btn"
                    onClick={() => history.push("/users/add")}
                  >
                    Add User
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
                            style={{ minWidth: column.minWidth }}
                            className={classes.head}
                          >
                            {column.label}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows.length > 0 &&
                        rows
                          .slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          )
                          .map((row) => {
                            return (
                              <TableRow
                                hover
                                role="checkbox"
                                tabIndex={-1}
                                key={row._id}
                                // onClick={() =>
                                //   history.push(`/users/edit/${row._id}`)
                                // }
                              >
                                {columns.map((column) => {
                                  const value = row[column.id];
                                  return column.id === "roleId" ? (
                                    <TableCell
                                      key={column.id}
                                      align={column.align}
                                      onClick={() =>
                                        history.push(`/users/edit/${row._id}`)
                                      }
                                    >
                                      {value && value.type}
                                    </TableCell>
                                  ) : (
                                    <>
                                      {column.id === "edit" && (
                                        <TableCell
                                          onClick={() =>
                                            history.push(
                                              `/users/edit/${row._id}`
                                            )
                                          }
                                        >
                                          {"Edit"}
                                        </TableCell>
                                      )}
                                      {column.id === "delete" && (
                                        <TableCell
                                          onClick={() => deleteHandler(row._id)}
                                        >
                                          {/* {"Delete"} */}
                                          <DeleteIcon />
                                        </TableCell>
                                      )}
                                      {column.id !== "edit" &&
                                        column.id !== "delete" && (
                                          <TableCell
                                            key={column.id}
                                            align={column.align}
                                            onClick={() =>
                                              history.push(
                                                `/users/edit/${row._id}`
                                              )
                                            }
                                          >
                                            {column.format &&
                                            typeof value === "number"
                                              ? column.format(value)
                                              : value}
                                          </TableCell>
                                        )}
                                    </>
                                  );
                                })}
                              </TableRow>
                            );
                          })}
                    </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[10]}
                  component="div"
                  count={rows.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </Paper>
            </div>
          </Card>
          {/* </div> */}
        </div>
      )}
    </React.Fragment>
  );
}
