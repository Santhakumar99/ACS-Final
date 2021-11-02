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
import PageLoader from "../FullPageLoader/PageLoader";
import moment from "moment";
const TransactionQueue = () => {
  const history = useHistory();
  const [pages, setPages] = useState({
    currentPage: 1,
    totalPages: 1,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [TransactionQueue, setTransactionQueue] = React.useState([{}]);
  useEffect(() => {
    getLoansApprovedData();
  }, [pages.currentPage]);

  const getLoansApprovedData = async () => {
    setIsLoading(true);
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_URL}/loans/not_approve?page=${pages.currentPage}`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      console.log(result.data.data);
      // setTransactionQueue(result.data.data);

      if (result && result.data) {
        let array = result.data.data;
        for (let i = 0; i < array.length; i++) {
          const element = array[i];
          element.id = i + 1;
        }
        // var ProductQH =
        //   array != null &&
        //   array.filter((pr) => pr.productType === "Qard Hasan");
        // console.log(ProductQH);
        // let arrayQH = ProductQH != null && ProductQH;
        // for (let i = 0; i < ProductQH.length; i++) {
        //   const element = arrayQH[i];
        //   element.id = i + 1;
        // }
        setTransactionQueue(array);
        console.log(array);
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

  const onRowClicked = () =>
    TransactionQueue.map(
      (result) => (e) => history.push("/loanApplications?id=" + result._id)
    );
  var nf = new Intl.NumberFormat();
  const serverSideColumns = [
    {
      name: "S.No",
      selector: "id",
      sortable: true,
      maxWidth: "1rem",
      format: (row) => (
        <div data-tag="allowRowEvents" className="tq-td">
          <div
            aria-hidden="true"
            onClick={(e) => history.push("/loanApplications?id=" + row.id)}
          >
            {row.id}
          </div>
        </div>
      ),
      wrap: true,
    },
    {
      name: "Name",
      selector: "LoanId",
      sortable: true,
      minWidth: "3rem",

      format: (row) => (
        <div data-tag="allowRowEvents" className="tq-td">
          <div
            aria-hidden="true"
            onClick={(e) => history.push("/loanApplications?id=" + row._id)}
          >
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
          <div
            aria-hidden="true"
            onClick={(e) => history.push("/loanApplications?id=" + row._id)}
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
      format: (row) => (
        <div data-tag="allowRowEvents" className="tq-td">
          <div
            aria-hidden="true"
            onClick={(e) => history.push("/loanApplications?id=" + row._id)}
          >
            {row.createdOn != null && row.createdOn
              ? moment(row.createdOn).format("DD-MM-YYYY")
              : // new Date(row.createdOn).toLocaleDateString()
                undefined}
          </div>
        </div>
      ),
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
      format: (row) => (
        <div data-tag="allowRowEvents" className="tq-td">
          <div
            aria-hidden="true"
            onClick={(e) => history.push("/loanApplications?id=" + row._id)}
            className="amount"
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
      format: (row) => (
        <div data-tag="allowRowEvents" className="tq-td">
          <div
            aria-hidden="true"
            onClick={(e) => history.push("/loanApplications?id=" + row._id)}
          >
            {row.tenure}
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
      sortable: true,
      right: true,
      format: (row) => (
        <div data-tag="allowRowEvents" className="tq-td">
          <div
            aria-hidden="true"
            onClick={(e) => history.push("/loanApplications?id=" + row._id)}
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
            onClick={(e) => history.push("/loanApplications?id=" + row._id)}
          >
            {row.productType}
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
        paddingLeft: "8px", // override the cell padding for head cells
        paddingRight: "8px",
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

  // const columns = [
  //   {
  //     field: "S.No",
  //     headerName: "S.No",
  //     width: 100,
  //     sortable: false,
  //     renderCell: (row) => (
  //       <div data-tag="allowRowEvents" className="tq-td">
  //         <div
  //           aria-hidden="true"
  //           onClick={(e) => history.push("/loanApplications?id=" + row._id)}
  //         >
  //           {row.productType}
  //         </div>
  //       </div>
  //     ),
  //   },

  //   {
  //     field: "Name",
  //     headerName: "S.No",
  //     width: 100,
  //     sortable: false,
  //     renderCell: (row) => (
  //       <div data-tag="allowRowEvents" className="tq-td">
  //         <div
  //           aria-hidden="true"
  //           onClick={(e) => history.push("/loanApplications?id=" + row._id)}
  //         >
  //           <span className="name">
  //             {" "}
  //             {row != null && row.userId != null && row.userId.firstName}
  //           </span>
  //           {row != null && row.userId != null && row.userId.lastName}
  //         </div>
  //       </div>
  //     ),
  //   },

  //   {
  //     field: "Loan Id",
  //     headerName: "S.No",
  //     width: 100,
  //     sortable: false,
  //     renderCell: (row) => (
  //       <div data-tag="allowRowEvents" className="tq-td">
  //         <div
  //           aria-hidden="true"
  //           onClick={(e) => history.push("/loanApplications?id=" + row._id)}
  //         >
  //           {row._id}
  //         </div>
  //       </div>
  //     ),
  //   },
  //   {
  //     field: "Application Date",
  //     headerName: "S.No",
  //     width: 100,
  //     sortable: false,
  //     renderCell: (row) => (
  //       <div data-tag="allowRowEvents" className="tq-td">
  //         <div
  //           aria-hidden="true"
  //           onClick={(e) => history.push("/loanApplications?id=" + row._id)}
  //         >
  //           {row.createdOn != null &&
  //             new Date(row.createdOn).toLocaleDateString()}
  //         </div>
  //       </div>
  //     ),
  //   },
  //   {
  //     field: "Amount (RM)",
  //     headerName: "Role",
  //     width: 300,
  //     renderCell: (row) => (
  //       <div data-tag="allowRowEvents" className="tq-td">
  //         <div
  //           aria-hidden="true"
  //           onClick={(e) => history.push("/loanApplications?id=" + row._id)}
  //         >
  //           {nf.format(row.loanAmount)}
  //         </div>
  //       </div>
  //     ),
  //   },
  //   {
  //     field: "Tenure (Months)",
  //     headerName: "Active",
  //     width: 300,
  //     renderCell: (row) => (
  //       <div data-tag="allowRowEvents" className="tq-td">
  //         <div
  //           aria-hidden="true"
  //           onClick={(e) => history.push("/loanApplications?id=" + row._id)}
  //         >
  //           {row.tenure}
  //         </div>
  //       </div>
  //     ),
  //   },
  //   {
  //     field: "ACS Score",
  //     headerName: "Active",
  //     width: 300,
  //     renderCell: (row) => (
  //       <div data-tag="allowRowEvents" className="tq-td">
  //         <div
  //           aria-hidden="true"
  //           onClick={(e) => history.push("/loanApplications?id=" + row._id)}
  //         >
  //           7 / 10
  //         </div>
  //       </div>
  //     ),
  //   },

  //   {
  //     field: "Product",
  //     headerName: "Active",
  //     width: 300,
  //     renderCell: (row) => (
  //       <div data-tag="allowRowEvents" className="tq-td">
  //         <div
  //           aria-hidden="true"
  //           onClick={(e) => history.push("/loanApplications?id=" + row._id)}
  //         >
  //           {row.productType}
  //         </div>
  //       </div>
  //     ),
  //   },
  // ];
  const handlePagination = (page) => {
    setPages({ ...pages, currentPage: page.selected + 1 });
  };
  const count = Number(pages.totalPages);
  return (
    <div>
      {isLoading && <Loader />}
      <div
        className="Navlink"
        style={{ marginTop: "40px", marginLeft: "15px" }}
      >
        <NavLink to="/">
          <ListItemText primary={"Home"} />
        </NavLink>
        <span className="slash">&#47;</span>
        <NavLink to="/pendingApproval">
          <ListItemText primary={"Pending Approval"} />
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
            {/* Transaction Queue */}
            Pending Approval
          </div>
          {TransactionQueue != null &&
          TransactionQueue.length > 0 &&
          TransactionQueue ? (
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
                  onRowClicked={onRowClicked}
                  // selectableRows
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
          ) : (
            ""
          )}
        </div>
      )}
    </div>
  );
};

export default TransactionQueue;
