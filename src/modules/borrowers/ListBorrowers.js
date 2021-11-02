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

import { TextField } from "@material-ui/core";

import Card from "../../common/Card";

import "../../css/style.css";

const columns = [
  { id: "firstName", label: "First Name", minWidth: 170 },
  { id: "lastName", label: "Last Name", minWidth: 170 },
  { id: "mobile", label: "Mobile", minWidth: 170 },
  { id: "city", label: "City", minWidth: 170 },
  { id: "employmentStatus", label: "Employment Status", minWidth: 170 },
  //   { id: "code", label: "ISO\u00a0Code", minWidth: 100 },
  //   {
  //     id: "population",
  //     label: "Population",
  //     minWidth: 170,
  //     align: "right",
  //     format: (value) => value.toLocaleString("en-US"),
  //   },
  //   {
  //     id: "size",
  //     label: "Size\u00a0(km\u00b2)",
  //     minWidth: 170,
  //     align: "right",
  //     format: (value) => value.toLocaleString("en-US"),
  //   },
  //   {
  //     id: "density",
  //     label: "Density",
  //     minWidth: 170,
  //     align: "right",
  //     format: (value) => value.toFixed(2),
  //   },
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
            `${
              process.env.REACT_APP_URL
                ? process.env.REACT_APP_URL
                : "http://104.131.5.210:7400/api"
            }/users?page=${page ? page : 1}&searchText=${searchText}`,
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

  // const dashboardAPI = async () => {
  //   if (token) {
  //     try {
  //       setIsLoading(true);
  //       const result = await axios
  //         // .get(`${process.env.REACT_APP_URL}/loans/dashboard_loan_approved`, {
  //         // .get(`${process.env.REACT_APP_URL}/loans/dashboard_loan_status`, {
  //         // .get(`${process.env.REACT_APP_URL}/loans/dashboard_borrower_profile`, {
  //         .get(`${process.env.REACT_APP_URL}/loans/dashboard_business_performance`, {
  //           headers: { Authorization: token },
  //         })
  //         .catch((error) => {
  //           console.log("error ", error.response.data.errors[0].msg);
  //           setIsLoading(false);

  //           error.response.data.errors[0].msg
  //             ? handleClickOpen(error.response.data.errors[0].msg)
  //             : handleClickOpen("Something went wrong !!!");
  //         });
  //       if (result && result.data) {
  //         let data = result?.data?.data;
  //         console.log("dahboard ", data)
  //         setIsLoading(false);
  //       }
  //     } catch (err) {
  //       setIsLoading(false);

  //       handleClickOpen("Something went wrong !!!");
  //     }
  //   }
  // };
  useEffect(() => {
    fetchData();
    // dashboardAPI();
  }, [page]);

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
        <div className="padding2rem">
          <Card>
            <form onSubmit={fetchData}>
              <div className="col-md-12">
                <div className="row">
                  <div className="col-lg-10">
                    <TextField
                      label="Search Text"
                      size="small"
                      type="text"
                      fullWidth
                      name="searchText"
                      variant="outlined"
                      value={searchText}
                      onChange={(event) => setSearchText(event.target.value)}
                    />
                  </div>
                  <div className="col-lg-2">
                    <button className="contact-us-form-btn" type="submit">
                      Search
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </Card>
          <br />
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
                            onClick={() =>
                              history.push(`/borrowers/${row._id}`)
                            }
                          >
                            {columns.map((column) => {
                              const value = row[column.id];
                              return (
                                <TableCell key={column.id} align={column.align}>
                                  {column.format && typeof value === "number"
                                    ? column.format(value)
                                    : value}
                                </TableCell>
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
      )}
    </React.Fragment>
  );
}
