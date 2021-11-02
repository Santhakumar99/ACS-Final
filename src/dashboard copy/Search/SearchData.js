import React from "react";
import "../../dashboard/Search/Search.css";
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
// import TextField from '@mui/material/TextField';

const SearchData = () => {
  const [Loans, setLoans] = useState([]);
  const [values, setValues] = useState({
    name: "",
    mobile: "",
    icNumber: "",
    // loan details
    loanId: "",
    loanAmount: "",
    tenure: "",
    productType: "",
    fromDate: "",
    toDate: "",
    overdue: "",
    approver: "", // not yet done
    prepared: "",
  });
  //-------------------- onchange handle Project------------------

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    let inputValues = values;
    inputValues[name] = value;
    setValues({ ...inputValues });
  };
  const FilterData = async (e) => {
    e.preventDefault();
    // setIsLoading(true);
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
      setLoans(Result.data.loans);
      // setIsLoading(false);
    } catch (error) {
      console.log(error);
      // setIsLoading(false);
      // error != null &&
      // error.response != null &&
      // error.response.data != null &&
      // error.response.data.errors[0]
      //   ? handleClickOpen(
      //       error != null &&
      //         error.response != null &&
      //         error.response.data != null &&
      //         error.response.data.errors[0] &&
      //         error.response.data.errors[0].msg
      //     )
      //   : handleClickOpen("Something went wrong !!!");
    }
    // closeForm();
  };
  const serverSideColumns = [
    {
      name: "S.No",
      selector: "id",
      sortable: true,
      maxWidth: "5rem",
      wrap: true,
    },
    {
      name: "Name",
      selector: "Loan",
      sortable: true,
      minWidth: "14rem",
      wrap: true,
    },
    {
      name: "Loan Id",
      selector: "LoanId",
      sortable: true,
      minWidth: "14rem",

      wrap: true,
    },
    {
      name: "Application Date",
      selector: "applicationDate",
      sortable: true,

      // {
      //   return (
      //     row.createdOn != null && new Date(row.createdOn).toLocaleDateString()
      //   );
      // },
      // wrap: true,
    },
    {
      name: "Amount (RM)",
      selector: "AmountbyRm",
      sortable: true,
      right: true,

      // format: (row) => {
      //   return row.loanAmount;
      // },
      wrap: true,
    },
    {
      name: "Tenure (Months)",
      selector: "tenureMonths",
      sortable: true,
      right: true,

      // format: (row) => {
      //   return row.tenure;
      // },
      wrap: true,
    },
    {
      name: "Acs Score",
      selector: "acsScore",
      sortable: true,
      right: true,

      // format: (row) => {
      //   return 7;
      // },
      wrap: true,
    },
    {
      name: "Product",
      selector: "Product",
      sortable: true,

      // format: (row) => {
      //   return row.productType;
      // },
      wrap: true,
    },
  ];
  return (
    <div>
      <div className="search-head" style={{ marginTop: "50px" }}>
        <h1 style={{ fontSize: "25px", padding: "10px" }}>Search</h1>

        <div className="container">
          <div className="Search-head">
            <div className="row one">
              <div className="col-lg-4 col-md-4 col-sm-12 search-field">
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
              <div className="col-lg-4 col-md-4 col-sm-12 search-field">
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
              <div className="col-lg-4 col-md-4 col-sm-12 search-field">
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
            </div>
            <div className="row two">
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
            </div>
            <div className="row three">
              <div className="col-lg-4 col-md-4 col-sm-12 search-field">
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                  <InputLabel id="demo-simple-select-helper-label">
                    Loan Tenure
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={values.tenure}
                    label="Age"
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
              </div>
              <div className="col-lg-4 col-md-4 col-sm-12 search-field">
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                  <InputLabel id="demo-simple-select-helper-label">
                    ACS score
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    // value={values}
                    label="Age"
                    // onChange={onChangeHandler}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {/* <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={4}>4</MenuItem>
                    <MenuItem value={5}>5</MenuItem>
                    <MenuItem value={6}>6</MenuItem>
                    <MenuItem value={7}>7</MenuItem>
                    <MenuItem value={8}>8</MenuItem>
                    <MenuItem value={9}>9</MenuItem>
                    <MenuItem value={10}>10</MenuItem> */}
                  </Select>
                </FormControl>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-12 search-field">
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                  <InputLabel id="demo-simple-select-helper-label">
                    Product
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={values.productType}
                    // label="Age"
                    name="productType"
                    onChange={onChangeHandler}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={"BNPL"}>BNPL</MenuItem>
                    <MenuItem value={"Quad Hasan"}>Quad Hasan</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>
            <div className="row four">
              <div className="col-lg-4 col-md-4 col-sm-12 search-field">
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                  <InputLabel id="demo-simple-select-helper-label">
                    Approver
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={values.approver}
                    label="Age"
                    name="approver"
                    onChange={onChangeHandler}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>30+ DPD</MenuItem>
                    <MenuItem value={20}>60+ DPD</MenuItem>
                    <MenuItem value={30}>90+ DPD</MenuItem>
                    <MenuItem value={30}>120+ DPD</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-12 search-field">
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                  <InputLabel id="demo-simple-select-helper-label">
                    Preparer
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={values.prepared}
                    label="Age"
                    name="prepared"
                    onChange={onChangeHandler}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>30+ DPD</MenuItem>
                    <MenuItem value={20}>60+ DPD</MenuItem>
                    <MenuItem value={30}>90+ DPD</MenuItem>
                    <MenuItem value={30}>120+ DPD</MenuItem>
                  </Select>
                </FormControl>
              </div>
              {/* <div className="col-lg-4 col-md-4 col-sm-12 search-field">
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                  <InputLabel id="demo-simple-select-helper-label">
                    Age
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={age}
                    label="Age"
                    onChange={onChangeHandler}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>
              </div> */}
              <div className="col-lg-4 col-md-4 col-sm-12 search-field">
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                  <InputLabel id="demo-simple-select-helper-label">
                    Over Due
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={values.overdue}
                    label="Age"
                    name="overdue"
                    onChange={onChangeHandler}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
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
                Filter
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="PieChart-Table">
        <DataTable
          noHeader
          className="react-dataTable"
          columns={serverSideColumns}
          pagination={true}
          paginationPerpage={10}
          // conditionalRowStyles={conditionalRowStyles}
          data={Loans}
        />
      </div>
    </div>
  );
};

export default SearchData;
