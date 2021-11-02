import React from "react";
import { useEffect, useState } from "react";
import "../Css/Loanperformance.css";
import axios from "axios";
import DataTable from "react-data-table-component";
import ReactPaginate from "react-paginate";
import { useHistory } from "react-router-dom";
import { NavLink } from "react-router-dom";
import ListItemText from "@material-ui/core/ListItemText";
import Loader from "../../common/Loader";
import "../../dashboard/Approval/Approval.css";
import "../Outstanding/Outstanding.css";
import PageLoader from "../FullPageLoader/PageLoader";
import DisbursementFunds from "./DisbursementFunds";
import Profile from "../Approval/Profile";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Toastify from "../Toaster/Toastify";
import moment from "moment";
const OutstandingLoansList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [users, setUsers] = useState();
  const [Filterusers, setFilterusers] = useState([]);
  const history = useHistory();
  const [pages, setPages] = useState({
    currentPage: 1,
    totalPages: 1,
  });
  let allUsers = [];
  const [TransactionQueue, setTransactionQueue] = React.useState([]);
  useEffect(() => {
    getDetails();
  }, [pages.currentPage]);

  const GetUsers = async () => {
    setIsLoading(true);
    try {
      const Result = await axios.get(
        `${process.env.REACT_APP_URL}/loans/loanapplicants`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      console.log(Result.data.data);
      setIsLoading(false);
      setUsers(Result.data?.data);
      setFilterusers(Result.data?.data);
      allUsers = Result.data && Result.data.data ? Result.data.data : [];
      return Result;
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
    // closeForm();
  };
  const getDetails = async () => {
    await GetUsers();
    getLoansApprovedData();
  };
  const getLoansApprovedData = async () => {
    setIsLoading(true);
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_URL}/loans/not_disbursed?page=${pages.currentPage}`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      console.log(result.data.data);
      // setTransactionQueue(result.data.data);
      if (result && result.data) {
        let array = result.data?.data;

        // let array = result != null && result.data != null && result.data.data;
        for (let i = 0; i < array.length; i++) {
          const element = array[i];
          element.id = i + 1;
          element.Name = getUsername(
            element.userId != null && element.userId
              ? element.userId
              : undefined
          );
          element.ICnumber = getIcnumber(
            element.userId != null && element.userId
              ? element.userId
              : undefined
          );
        }
        // var ProductQH = array.filter((pr) => pr.productType === "Qard Hasan");
        // console.log(ProductQH);
        // let arrayQH = ProductQH != null && ProductQH;
        // for (let i = 0; i < ProductQH.length; i++) {
        //   const element = arrayQH[i];
        //   element.id = i + 1;
        //   element.Name = getUsername(
        //     element.userId != null && element.userId
        //       ? element.userId
        //       : undefined
        //   );
        //   element.ICnumber = getIcnumber(
        //     element.userId != null && element.userId
        //       ? element.userId
        //       : undefined
        //   );
        // }
        setTransactionQueue(array);
        // console.log("QH arrary", arrayQH);
        setIsLoading(false);
      }
      setPages({
        currentPage: pages.currentPage,
        totalPages: result.data.totalPages,
      });
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const getUsername = (id) => {
    console.log(id);
    console.log(allUsers);
    let userName =
      allUsers != null && allUsers.find((aUser) => aUser._id === id);
    var Name = userName.firstName + " " + userName.lastName;
    // var icNumber = userName.icNumber;
    return Name;
  };
  const getIcnumber = (id) => {
    let userName =
      allUsers != null && allUsers.find((aUser) => aUser._id === id);
    var icNumber = userName.icNumber;
    return icNumber;
  };
  var nf = new Intl.NumberFormat();
  const onRowClicked = () =>
    TransactionQueue.map(
      (result) => (e) => history.push("/unpaidLoanDetails?id=" + result._id)
    );
  const serverSideColumns = [
    {
      name: "S.No",
      selector: "id",
      sortable: true,
      width: "6rem",
      format: (row) => (
        <div data-tag="allowRowEvents" className="tq-td">
          <div
            aria-hidden="true"
            onClick={(e) => history.push("/unpaidLoanDetails?id=" + row.id)}
          >
            {row.id}
          </div>
        </div>
      ),
      wrap: true,
    },
    {
      name: "Name",
      selector: "Name",
      sortable: true,
      minWidth: "10rem",

      format: (row) => (
        <div data-tag="allowRowEvents" className="tq-td">
          <div
            aria-hidden="true"
            onClick={(e) => history.push("/unpaidLoanDetails?id=" + row._id)}
          >
            <span className="name">
              {" "}
              {row != null && row.Name != null && row.Name}
            </span>
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
          <div
            aria-hidden="true"
            onClick={(e) => history.push("/unpaidLoanDetails?id=" + row._id)}
          >
            {row._id}
          </div>
        </div>
      ),
      wrap: true,
    },
    {
      name: "Application Date",
      selector: "applicationDate",
      sortable: true,
      width: "10rem",
      format: (row) => (
        <div data-tag="allowRowEvents" className="tq-td">
          <div
            aria-hidden="true"
            onClick={(e) => history.push("/unpaidLoanDetails?id=" + row._id)}
          >
            {row.createdOn != null && row.createdOn
              ? moment(row.createdOn).format("DD-MM-YYYY")
              : // new Date(row.createdOn).toLocaleDateString()
                undefined}
          </div>
        </div>
      ),
      // format: (row) => {
      //   return (
      //     row.createdOn != null && new Date(row.createdOn).toLocaleDateString()
      //   );
      // },
      wrap: true,
    },
    {
      name: "Amount (RM)",
      selector: "AmountbyRm",
      sortable: true,
      width: "9rem",
      right: true,
      format: (row) => (
        <div data-tag="allowRowEvents" className="tq-td">
          <div
            aria-hidden="true"
            onClick={(e) => history.push("/unpaidLoanDetails?id=" + row._id)}
          >
            {row.loanAmount ? nf.format(row.loanAmount) : undefined}
          </div>
        </div>
      ),
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
      width: "10rem",
      format: (row) => (
        <div data-tag="allowRowEvents" className="tq-td">
          <div
            aria-hidden="true"
            onClick={(e) => history.push("/unpaidLoanDetails?id=" + row._id)}
          >
            {row.tenure && row.tenure}
          </div>
        </div>
      ),
      // format: (row) => {
      //   return row.tenure;
      // },
      wrap: true,
    },
    {
      name: "Acs Score",
      selector: "acsScore",
      right: true,
      sortable: true,
      width: "8rem",
      format: (row) => (
        <div data-tag="allowRowEvents" className="tq-td">
          <div
            aria-hidden="true"
            onClick={(e) => history.push("/unpaidLoanDetails?id=" + row._id)}
          >
            {row._id && row._id ? "7/10" : undefined}
          </div>
        </div>
      ),
      // format: (row) => {
      //   return 7;
      // },
      wrap: true,
    },
    {
      name: "Product",
      selector: "Product",
      sortable: true,
      format: (row) => (
        <div data-tag="allowRowEvents" className="tq-td">
          <div
            aria-hidden="true"
            onClick={(e) => history.push("/unpaidLoanDetails?id=" + row._id)}
          >
            {row.productType && row.productType}
          </div>
        </div>
      ),
      // format: (row) => {
      //   return row.productType;
      // },
      wrap: true,
    },
    {
      name: "Loan Status",
      selector: "Product",
      sortable: true,
      width: "8rem",
      format: (row) => (
        <div data-tag="allowRowEvents" className="tq-td">
          <div
            aria-hidden="true"
            onClick={(e) => history.push("/unpaidLoanDetails?id=" + row._id)}
          >
            {row.loanStatus && row.loanStatus}
          </div>
        </div>
      ),
      // format: (row) => {
      //   return row.productType;
      // },
      wrap: true,
    },
  ];
  const conditionalRowStyles = [
    {
      when: (row) => row,
      style: {
        // backgroundColor: 'green',
        border: "1px black",
        color: "black",
        fontWeight: 500,
        "&:hover": {
          cursor: "pointer",
        },
      },
    },
  ];
  const customStyles = {
    headCells: {
      style: {
        // paddingLeft: "8px", // override the cell padding for head cells
        // paddingRight: "8px",
        backgroundColor: "#0984e1",
        color: "white",
        fontWeight: 700,
        fontSize: "13px",
      },
    },
    cells: {
      style: {
        // fontSize: "17px",
        // paddingLeft: "0 8px",
        // backgroundColor: "#0984e1",
      },
    },
  };
  const handlePagination = (page) => {
    setPages({ ...pages, currentPage: page.selected + 1 });
  };
  const count = Number(pages.totalPages);
  const handleChange = ({ selectedRows }) => {
    setSelectedRows(selectedRows);
    console.log(selectedRows);
  };
  const toChild = () => {
    setSelectedRows(selectedRows);
  };
  // let Ddata;

  // const pass = (selectedRows) => {
  //   history.push({
  //     pathname: "/disbursementfunds",
  //     search: "",
  //     state: { selectedRows: selectedRows },
  //   });
  // };

  const DisbursementData = () => {
    history.push({
      pathname: "/disbursementLoans",
      search: "",
      state: { selectedRows: selectedRows },
    });
  };
  return (
    <div>
      {isLoading && <Loader />}
      <Toastify />
      <div
        className="Navlink"
        style={{ marginTop: "40px", marginLeft: "15px" }}
      >
        <NavLink to="/">
          <ListItemText primary={"Home"} />
        </NavLink>
        <span className="slash">&#47;</span>
        <NavLink to="/unpaidLoans">
          <ListItemText primary={"  Unpaid Loans"} />
        </NavLink>
      </div>
      {isLoading && isLoading ? (
        ""
      ) : (
        <div>
          <div
            className="card-title trans-head"
            style={{ padding: "10px", textAlign: "left", fontSize: "28px" }}
          >
            {/* Outstanding Loans */}
            Unpaid Loans
          </div>
          <div className="disburse-buttonHeader">
            {selectedRows != null && selectedRows.length > 0 && selectedRows ? (
              <button
                className="btn btn-primary disbursement-button"
                onClick={DisbursementData}
                type="button"
              >
                Proceed to Disbursement
              </button>
            ) : (
              ""
            )}
          </div>
          {TransactionQueue != null && TransactionQueue ? (
            <>
              <div className="PieChart-Table">
                <DataTable
                  className="react-dataTable"
                  columns={serverSideColumns}
                  pagination={true}
                  paginationPerpage={10}
                  customStyles={customStyles}
                  conditionalRowStyles={conditionalRowStyles}
                  data={TransactionQueue}
                  height={400}
                  onSelectedRowsChange={handleChange}
                  selectableRows
                  onRowClicked={onRowClicked}
                />
              </div>
              <div className="Pagination-part">
                <ReactPaginate
                  previousLabel={"Prev"}
                  nextLabel={"Next"}
                  breakLabel="..."
                  pageCount={count || 1}
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={2}
                  activeClassName="active"
                  forcePage={
                    pages.currentPage !== 0 ? pages.currentPage - 1 : 0
                  }
                  onPageChange={(page) => handlePagination(page)}
                  pageClassName={"page-item"}
                  nextLinkClassName={"page-link"}
                  nextClassName={"page-item next"}
                  previousClassName={"page-item prev"}
                  previousLinkClassName={"page-link"}
                  pageLinkClassName={"page-link"}
                  breakClassName="page-item"
                  breakLinkClassName="page-link"
                  containerClassName={
                    "pagination react-paginate separated-pagination pagination-sm justify-content-end pr-1 mt-1"
                  }
                />
              </div>
            </>
          ) : undefined}
        </div>
      )}
    </div>
  );
};

export default OutstandingLoansList;
