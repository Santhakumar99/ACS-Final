import React from "react";
// import "../../dashboard/Search/Search.css";
import { useEffect, useState } from "react";
import { TextField } from "@material-ui/core";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";
import Stack from "@mui/material/Stack";
import DataTable from "react-data-table-component";
import XLSX from "xlsx";
import Button from "@material-ui/core/Button";
import Loader from "../../common/Loader";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import PageLoader from "../FullPageLoader/PageLoader";
import { NavLink } from "react-router-dom";
import ListItemText from "@material-ui/core/ListItemText";
// import TextField from '@mui/material/TextField';

const Profile = () => {
  const [Loans, setLoans] = useState([]);
  const [Users, setUsers] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [errMsg, setErrMsg] = useState(undefined);
  const [success, setSuccess] = useState(undefined);

  const handleClickOpen = (msg) => {
    setErrMsg(msg);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [values, setValues] = useState({
    name: "",
    mobile: "",
    icNumber: "",
    loanId: "",
    loanAmount: "",
    tenure: "",
    productType: "",
    fromDate: "",
    toDate: "",
    overdue: "",
    approver: "",
    prepared: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  //-------------------- onchange handle Project------------------
  useEffect(() => {
    GetUsers();
    RepaymentDisbursement();
  }, []);
  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    let inputValues = values;
    inputValues[name] = value;
    setValues({ ...inputValues });
  };
  const FilterData = async (e) => {
    setIsLoading(true);
    try {
      let vals = values;
      const valuesObj = {
        ...vals,
      };
      console.log(valuesObj);
      const Result = await axios.post(
        `${process.env.REACT_APP_URL}/loans/searchdata`,
        valuesObj,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      console.log(Result.data.loans);

      if (Result && Result.data) {
        let array = Result.data.loans;
        for (let i = 0; i < array.length; i++) {
          const element = array[i];
          element.id = i + 1;
        }
        setLoans(array);
        console.log(array);
        setIsLoading(false);
      }
      // setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
    // closeForm();
  };

  const GetUsers = async (e) => {
    setIsLoading(true);
    try {
      const Result = await axios.get(
        `${process.env.REACT_APP_URL}/users/webusers`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      console.log(Result.data.data);
      setUsers(Result.data.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
    // closeForm();
  };
  var nf = new Intl.NumberFormat();
  const serverSideColumns = [
    {
      name: "S.No",
      selector: "id",
      sortable: true,
      maxWidth: "5rem",
      format: (row) => (
        <div data-tag="allowRowEvents" className="tq-td">
          <div aria-hidden="true">{row.id}</div>
        </div>
      ),
      wrap: true,
    },
    {
      name: "Name",
      selector: "LoanId",
      sortable: true,
      minWidth: "14rem",

      format: (row) => (
        <div data-tag="allowRowEvents" className="tq-td">
          <div aria-hidden="true">
            <span className="name">
              {" "}
              {row != null && row.userId != null && row.userId.firstName}
            </span>
            {row != null && row.userId != null && row.userId.lastName}
          </div>
        </div>
      ),
      wrap: true,
    },
    {
      name: "Loan Id",
      selector: "LoanId",
      sortable: true,
      minWidth: "14rem",

      format: (row) => (
        <div data-tag="allowRowEvents" className="tq-td">
          <div aria-hidden="true">{row != null && row._id}</div>
        </div>
      ),
      wrap: true,
    },
    {
      name: "Application Date",
      selector: "applicationDate",
      sortable: true,
      format: (row) => (
        <div data-tag="allowRowEvents" className="tq-td">
          <div aria-hidden="true">
            {row.createdOn != null &&
              row.createdOn.length > 0 &&
              new Date(row.createdOn).toLocaleDateString()}
          </div>
        </div>
      ),

      // wrap: true,
    },
    {
      name: "Amount (RM)",
      selector: "AmountbyRm",
      sortable: true,
      right: true,
      format: (row) => (
        <div data-tag="allowRowEvents" className="tq-td">
          <div aria-hidden="true" className="amount">
            {nf.format(row.loanAmount)}
          </div>
        </div>
      ),

      wrap: true,
    },
    {
      name: "Tenure (Months)",
      selector: "tenureMonths",
      sortable: true,
      right: true,
      format: (row) => (
        <div data-tag="allowRowEvents" className="tq-td">
          <div aria-hidden="true">{row.tenure}</div>
        </div>
      ),

      wrap: true,
    },
    {
      name: "Acs Score",
      selector: "acsScore",
      sortable: true,
      right: true,
      format: (row) => (
        <div data-tag="allowRowEvents" className="tq-td">
          <div aria-hidden="true">7 / 10</div>
        </div>
      ),
      wrap: true,
    },
    {
      name: "Product",
      selector: "Product",
      sortable: true,
      format: (row) => (
        <div data-tag="allowRowEvents" className="tq-td">
          <div aria-hidden="true">{row.productType}</div>
        </div>
      ),
      // format: (row) => {
      //   return row.productType;
      // },
      wrap: true,
    },
  ];

  //------------------------------------------ Export Excel Sheet Handling ----------------------------------------------//

  const downloadExcel = () => {
    const Data = Loans != null && Loans.length > 0 && Loans;
    const newData =
      Data != null &&
      Data.map((row) => {
        delete row.createdBy;
        delete row.lastModifiedBy;
        delete row.lastModifiedOn;
        delete row.isActive;
        // delete row.userId;
        delete row.loanRepaymentDetails;
        delete row.__v;
        delete row.isLoanApproved;
        delete row.fundsReceivedFromPartner;
        delete row.isFundReleased;
        // delete row._id;
        delete row.createdAt;
        delete row.updatedAt;

        return row;
      });

    const workSheet = XLSX.utils.json_to_sheet(newData);
    console.log(workSheet);
    const workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, "Loan Details");
    //Buffer
    let buf = XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
    //Binary string
    XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
    //Download

    if (Loans.length > 0) {
      handleClickOpen("File Downloaded Successfully");
      let Download = XLSX.writeFile(workBook, "LoanDetails.xlsx");
    } else {
      handleClickOpen("Something Went Wrong!!!");
    }
  };

  const conditionalRowStyles = [
    {
      when: (row) => row,
      style: {
        // backgroundColor: 'green',
        border: "1px black",
        color: "blueviolet",
        "&:hover": {
          cursor: "pointer",
        },
      },
    },
  ];
  const customStyles = {
    rows: {
      style: {
        // backgroundColor: 'green',
        border: "1px black",
        color: "blueviolet",
        "&:hover": {
          cursor: "pointer",
        },
        fontSize: "10px",
      },
    },
    headCells: {
      style: {
        background: "#0984e1",
        fontWeight: "700",
        color: "white",
        fontSize: "10px",
      },
    },
  };
  const Onpayment = async () => {
    // let myLoans = loans;

    const payment = {
      loanId: "61442bd4be2e975d7416a669",
      emiAmount: "1000",
      paymentDateTime: "2021-10-25T18:54",
      transaction_ref_no: "fghjhg67890",
      remarks: "no",
    };
    try {
      const result = await axios.post(
        `http://localhost:7400/api/payments/via_portal`,
        payment,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      console.log(result);
    } catch (e) {
      console.log(e);
    }
  };
  const RepaymentDisbursement = async () => {
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_URL}/loans/mydisbursed`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault(); // Prevent default submission
    try {
      await Onpayment();
      alert("success");
      setValues({ paidDate: "", transactionId: "" });
      // handleCloseModel();
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div>
      {isLoading && <Loader />}
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
      {isLoading && isLoading ? (
        ""
      ) : (
        <>
          <div
            className="Navlink"
            style={{ marginTop: "40px", marginLeft: "15px" }}
          >
            <NavLink to="/">
              <ListItemText primary={"Home"} />
            </NavLink>
            <span className="slash">&#47;</span>
            <NavLink to="/Search">
              <ListItemText primary={"Search"} />
            </NavLink>
          </div>
          <div className="search-head">
            <h1 style={{ fontSize: "25px", padding: "10px" }}>Search Data</h1>

            {/* <div className="container"> */}
            <div className="Search-head">
              <form onSubmit={FilterData}>
                <div className="row one">
                  <div className="col-lg-3 col-md-3 col-sm-12 search-field">
                    <TextField
                      label="Loan Id"
                      size="small"
                      type="text"
                      fullWidth
                      name="loanId"
                      variant="outlined"
                      value={values.loanId}
                      onChange={(e) => onChangeHandler(e)}
                      required
                      autoFocus
                    />
                  </div>
                  <div className="col-lg-3 col-md-3 col-sm-12 search-field">
                    <TextField
                      label="IC Number"
                      size="small"
                      type="text"
                      fullWidth
                      name="icNumber"
                      variant="outlined"
                      value={values.icNumber}
                      onChange={(e) => onChangeHandler(e)}
                      required
                      autoFocus
                    />
                  </div>
                  <div className="col-lg-3 col-md-3 col-sm-12 search-field">
                    <TextField
                      label="Name"
                      size="small"
                      type="text"
                      fullWidth
                      name="name"
                      variant="outlined"
                      value={values.name}
                      onChange={(e) => onChangeHandler(e)}
                      // required
                      autoFocus
                    />
                  </div>
                  <div className="col-lg-3 col-md-3 col-sm-12 search-field">
                    <TextField
                      label="Phone number"
                      size="small"
                      type="number"
                      fullWidth
                      name="mobile"
                      variant="outlined"
                      value={values.mobile}
                      onChange={(e) => onChangeHandler(e)}
                      autoFocus
                    />
                  </div>
                </div>
                <div className="row two">
                  <div className="col-lg-3 col-md-3 col-sm-12 search-field">
                    {/* <label>Loan amount</label> */}
                    <TextField
                      label="Loan amount"
                      size="small"
                      type="text"
                      fullWidth
                      name="loanAmount"
                      variant="outlined"
                      value={values.loanAmount}
                      onChange={(e) => onChangeHandler(e)}
                      autoFocus
                    />
                  </div>
                  <div className="col-lg-3 col-md-3 col-sm-12 search-field">
                    <Stack component="form" noValidate spacing={3}>
                      <TextField
                        id="date"
                        label="From Date"
                        type="date"
                        name="fromDate"
                        variant="outlined"
                        defaultValue="dd-mm-yyyy"
                        value={values.fromDate}
                        onChange={(e) => onChangeHandler(e)}
                        sx={{ width: 220 }}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </Stack>
                  </div>
                  <div className="col-lg-3 col-md-3 col-sm-12 search-field">
                    {/* <label>Loan amount</label> */}
                    <Stack component="form" noValidate spacing={3}>
                      <TextField
                        id="date"
                        label="To Date"
                        type="date"
                        variant="outlined"
                        name="toDate"
                        defaultValue="dd-mm-yyyy"
                        value={values.toDate}
                        onChange={(e) => onChangeHandler(e)}
                        sx={{ width: 220 }}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </Stack>
                  </div>

                  <div
                    className="col-lg-3 col-md-3 col-sm-12 search-field lt"
                    style={{ marginBottom: "5px" }}
                  >
                    <FormControl sx={{ m: 1, minWidth: 120 }}>
                      <InputLabel id="demo-simple-select-helper-label">
                        Loan Tenure
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        value={values.tenure}
                        label="Loan Tenure"
                        name="tenure"
                        onChange={onChangeHandler}
                      >
                        <MenuItem value={1}>1</MenuItem>
                        <MenuItem value={2}>2</MenuItem>
                        <MenuItem value={3}>3</MenuItem>
                        <MenuItem value={4}>4</MenuItem>
                        <MenuItem value={5}>5</MenuItem>
                        <MenuItem value={6}>6</MenuItem>
                        <MenuItem value={7}>7</MenuItem>
                        <MenuItem value={8}>8</MenuItem>
                        <MenuItem value={9}>9</MenuItem>
                        <MenuItem value={10}>10</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                </div>
                <div className="row three">
                  {/* <div className="col-lg-4 col-md-4 col-sm-12 search-field">
                    <FormControl sx={{ m: 1, minWidth: 120 }}>
                      <InputLabel id="demo-simple-select-helper-label">
                        Loan Tenure
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        value={values.tenure}
                        label="Loan Tenure"
                        name="tenure"
                        onChange={onChangeHandler}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value={3}>3</MenuItem>
                        <MenuItem value={4}>4</MenuItem>
                        <MenuItem value={5}>5</MenuItem>
                        <MenuItem value={6}>6</MenuItem>
                        <MenuItem value={7}>7</MenuItem>
                        <MenuItem value={8}>8</MenuItem>
                        <MenuItem value={9}>9</MenuItem>
                        <MenuItem value={10}>10</MenuItem>
                      </Select>
                    </FormControl>
                  </div> */}
                  <div className="col-lg-3 col-md-3 col-sm-12 search-field">
                    <FormControl sx={{ m: 1, minWidth: 120 }}>
                      <InputLabel id="demo-simple-select-helper-label">
                        ACS score
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        // value={values}
                        label="ACS score"
                        // onChange={onChangeHandler}
                      >
                        <MenuItem value={1}>1</MenuItem>
                        <MenuItem value={2}>2</MenuItem>
                        <MenuItem value={3}>3</MenuItem>
                        <MenuItem value={4}>4</MenuItem>
                        <MenuItem value={5}>5</MenuItem>
                        <MenuItem value={6}>6</MenuItem>
                        <MenuItem value={7}>7</MenuItem>
                        <MenuItem value={8}>8</MenuItem>
                        <MenuItem value={9}>9</MenuItem>
                        <MenuItem value={10}>10</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                  <div className="col-lg-3 col-md-3 col-sm-12 search-field">
                    <FormControl sx={{ m: 1, minWidth: 120 }}>
                      <InputLabel id="demo-simple-select-helper-label">
                        Product
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        value={values.productType}
                        label="Product"
                        name="productType"
                        onChange={onChangeHandler}
                      >
                        <MenuItem value={"BNPL"}>BNPL</MenuItem>
                        <MenuItem value={"Quad Hasan"}>Quad Hasan</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                  <div className="col-lg-3 col-md-3 col-sm-12 search-field">
                    <FormControl sx={{ m: 1, minWidth: 120 }}>
                      <InputLabel id="demo-simple-select-helper-label">
                        Approver
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        value={values.approver}
                        label="Approver"
                        name="approver"
                        onChange={onChangeHandler}
                      >
                        {Users?.map((option) => {
                          return (
                            <MenuItem key={option.userName} value={option._id}>
                              {option.userName ?? option.userName}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                  </div>
                  <div className="col-lg-3 col-md-3 col-sm-12 search-field">
                    <FormControl sx={{ m: 1, minWidth: 120 }}>
                      <InputLabel id="demo-simple-select-helper-label">
                        Preparer
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        value={values.prepared}
                        label="Preparer"
                        name="prepared"
                        onChange={onChangeHandler}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        {/* <MenuItem value={10}>30+ DPD</MenuItem>
                          <MenuItem value={20}>60+ DPD</MenuItem>
                          <MenuItem value={30}>90+ DPD</MenuItem>
                          <MenuItem value={30}>120+ DPD</MenuItem> */}
                      </Select>
                    </FormControl>
                  </div>
                </div>
                <div className="row four">
                  <div className="col-lg-3 col-md-3 col-sm-12 search-field">
                    <FormControl sx={{ m: 1, minWidth: 120 }}>
                      <InputLabel id="demo-simple-select-helper-label">
                        Over Due
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        value={values.overdue}
                        label="Over Due"
                        name="overdue"
                        onChange={onChangeHandler}
                      >
                        <MenuItem value={"30+dpd"}>30+ DPD</MenuItem>
                        <MenuItem value={"60+dpd"}>60+ DPD</MenuItem>
                        <MenuItem value={"90+dpd"}>90+ DPD</MenuItem>
                        <MenuItem value={"120+dpd"}>120+ DPD</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                </div>
                <div>
                  <button
                    type="button"
                    className="btn btn-primary search"
                    onClick={FilterData}
                  >
                    <i className="fa fa-filter"></i> Filter
                  </button>
                </div>
              </form>
            </div>
            {/* </div> */}
          </div>
        </>
      )}
      <button className="btn btn-primary" onClick={Onpayment}>
        payment
      </button>
      {Loans.length > 0 && Loans ? (
        <div>
          <div className="export-button">
            <button className="btn btn-primary export" onClick={downloadExcel}>
              <i className="fa fa-file-excel-o" aria-hidden="true"></i> Export
            </button>
          </div>
          <div className="Search Table">
            <DataTable
              noHeader
              className="react-dataTable"
              columns={serverSideColumns}
              pagination={true}
              paginationPerpage={10}
              customStyles={customStyles}
              conditionalRowStyles={conditionalRowStyles}
              data={Loans}
            />
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Profile;
