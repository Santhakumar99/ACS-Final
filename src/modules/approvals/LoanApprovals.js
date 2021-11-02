import React, { useEffect, useState } from "react";
// import { makeStyles } from "@material-ui/core/styles";

import axios from "axios";
import moment from "moment";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";

import Loader from "../../common/Loader";
import Card from "../../common/Card";

// Excel
import XLSX from "xlsx";

import "../../css/style.css";
// import '../../../common/css/Form.css';

const LoanApprovals = () => {
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

  const sendExcelToPartner = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const dbResult = await axios
        .get(`${process.env.REACT_APP_URL}/loans/exceltopartner`, {
          headers: { Authorization: token },
        })
        .catch((error) => {
          console.log("Error", error);
          setIsLoading(false);
          // Only in this method, error is in different format
          error.response.data.result
            ? handleClickOpen(error.response.data.result)
            : handleClickOpen("Something went wrong !!!");
        });

      if (dbResult && dbResult.data) {
        console.log("response ", dbResult?.data);

        let response = dbResult?.data?.result;
        setIsLoading(false);

        handleClickOpen(response);
      }
    } catch (err) {
      setIsLoading(false);
      handleClickOpen("someting went wrong");
    }
  };

  const [faultLoans, setFaultLoans] = useState([]);
  const importExcelDataToDb = async (filteredLoans) => {
    try {
      setIsLoading(true);

      const dbResult = await axios
        .post(
          `${process.env.REACT_APP_URL}/loans/importexcel`,
          { filteredLoans },
          {
            headers: { Authorization: token },
          }
        )
        .catch((error) => {
          console.log("Error", error);
          setIsLoading(false);
          // Only in this method, error is in different format
          error.response.data.errors[0].msg
            ? handleClickOpen(error.response.data.errors[0].msg)
            : handleClickOpen("Something went wrong !!!");
        });

      if (dbResult && dbResult.data) {
        console.log("response ", dbResult?.data);

        // invalidLoans, loanUpdatedCount
        let response = dbResult?.data;
        setIsLoading(false);
        console.log("response ", response);
        response.invalidLoans && setFaultLoans(response.invalidLoans);
        // Show here, how many records are updated
        handleClickOpen("Updated Loans count : " + response.loanUpdatedCount);
      }
    } catch (err) {
      setIsLoading(false);
      handleClickOpen("someting went wrong");
    }
  };

  const fileHandler = async (e) => {
    const file = e.target.files[0];

    console.log(file);

    const reader = new FileReader();

    if (
      file.type ===
      ("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
        "application/vnd.ms-excel")
    ) {
      reader.readAsBinaryString(file);
    } else {
      handleClickOpen("Error, Please select only excel file !!! ");
      return;
    }
    reader.onload = (event) => {
      const fileData = reader.result;

      const workBook = XLSX.read(fileData, { type: "binary" });
      workBook.SheetNames.forEach(function (sheetName) {
        const rowObj = XLSX.utils.sheet_to_row_object_array(
          workBook.Sheets[sheetName]
        );
        console.log(rowObj);
        let filteredLoans = [];

        // Address: "salem"
        // Approval Amount: 13500
        // Approval Date Time: 44542
        // Borrower Name: "Ramesh Ramesh"
        // Fees: 233
        // Loan Amount: "13500"
        // Loan Approved: "Yes"             // if not approved then Rejected & Vice versa
        // Loan ID: "61436ed1be2e975d7416a60b"
        // Mobile: "9524665416"
        // Reference ID of Contract: "ABS00990"
        // Tenure (In Months): "4"

        // Approval Date Time Time
        // Approval Amount
        // Fees
        // Reference ID of Contract
        function isValidDate(d) {
          var dt = new Date(d);
          return dt instanceof Date && !isNaN(dt);
        }

        for (let i = 0; i < rowObj.length; i++) {
          const rowValues = {};
          if (!rowObj[i]["Loan ID"]) {
            handleClickOpen(`Loan ID is required in Excel row=${i + 1}`);
            return;
          }
          if (!rowObj[i]["Loan Approved"]) {
            handleClickOpen(`Loan Approved is required in Excel row=${i + 1}`);
            return;
          }

          if (!rowObj[i]["Approval Date Time"]) {
            handleClickOpen(
              `Approval Date Time is required in Excel row=${i + 1}`
            );
            return;
          }

          if (!isValidDate(rowObj[i]["Approval Date Time"])) {
            handleClickOpen(
              `Approval Date Time is Invalid Date in Excel row=${i + 1}`
            );
            return;
          }

          if (!rowObj[i]["Approval Amount"]) {
            handleClickOpen(
              `Approval Amount is required in Excel row=${i + 1}`
            );
            return;
          }

          if (!rowObj[i]["Fees"]) {
            handleClickOpen(`Fees is required in Excel row=${i + 1}`);
            return;
          }

          if (!rowObj[i]["Reference ID of Contract"]) {
            handleClickOpen(
              `Reference ID of Contract is required in Excel row=${i + 1}`
            );
            return;
          }

          rowValues["loanId"] = rowObj[i]["Loan ID"];
          rowValues["fundsReceivedFromPartner"] =
            rowObj[i]["Loan Approved"].toLowerCase() === "yes" ? true : false;
          rowValues["fpDateTime"] = new Date(rowObj[i]["Approval Date Time"]);
          rowValues["fpAmountReceived"] = rowObj[i]["Approval Amount"];
          rowValues["fpFeesDeducted"] = rowObj[i]["Fees"];
          rowValues["refIdOfContract"] = rowObj[i]["Reference ID of Contract"];

          filteredLoans.push(rowValues);
          console.log(filteredLoans);
        }

        importExcelDataToDb(filteredLoans);
      });
    };
  };

  const downloadFile = async (filename) => {
    try {
      setIsLoading(true);

      const dbResult = await axios
        .get(`${process.env.REACT_APP_URL}/loans/not_disbursed_loan_download`, {
          headers: { Authorization: token },
        })
        .catch((error) => {
          console.log("Error", error);
          setIsLoading(false);
          // Only in this method, error is in different format
          error.response.data.errors[0].msg
            ? handleClickOpen(error.response.data.errors[0].msg)
            : handleClickOpen("Something went wrong !!!");
        });

      if (dbResult && dbResult.data) {
        console.log("response ", dbResult?.data);

        // invalidLoans, loanUpdatedCount
        let response = dbResult?.data;
        setIsLoading(false);
        console.log("response ", response);

        if (response.result && response.filePath) {
          // fetch(`${process.env.REACT_APP_URL}/${filename}`).then(
          fetch(`${process.env.REACT_APP_URL}/file/${response.filePath}`).then(
            (resp) => {
              resp.blob().then((blob) => {
                console.log("Response arrives");
                let url = window.URL.createObjectURL(blob);
                let a = document.createElement("a");
                a.href = url;
                a.download = response.filePath;
                a.click();
              });
            }
          );
        } else handleClickOpen(response.result);
      }
    } catch (err) {
      setIsLoading(false);
      handleClickOpen("someting went wrong");
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
          <div className="container features-container">
            <div className="col-lg-8 col-md-12 features-content-section">
              <Card>
                <div className="col-md-12 title-section features-title-section">
                  <h2 className="title">Loan Approval</h2>
                  <p className="title-details">
                    Send not approved loans to partner
                    <br />
                    <br />
                    <div className="col-md-12">
                      <button
                        className="contact-us-form-btn"
                        onClick={sendExcelToPartner}
                      >
                        Export Excel to partner
                      </button>
                    </div>
                    <br />
                    <div className="col-md-12">
                      <button
                        className="contact-us-form-btn"
                        onClick={() => downloadFile()}
                      >
                        Download Excel
                      </button>
                    </div>
                    {/* </Button> */}
                  </p>
                </div>
              </Card>
              <br />
              <Card>
                <div className="col-md-12 title-section features-title-section">
                  <h2 className="title">
                    Loan Approval Status and fund details from partner
                  </h2>
                  <p className="title-details">
                    Select Excel File, Please Click on button to import.
                    <br />
                    <br />
                    <input
                      id="dataImport"
                      //   className="actionButtons"
                      variant="contained"
                      color="primary"
                      type="file"
                      onChange={(e) => fileHandler(e)}
                      style={{ padding: "10px", display: "  none" }}
                    />
                    <button
                      className="contact-us-form-btn"
                      onClick={(e) =>
                        document.getElementById("dataImport").click()
                      }
                    >
                      Import Excel
                    </button>
                  </p>
                  <br />
                  {faultLoans.length > 0 && (
                    <h2 className="title-details">
                      {" "}
                      Invalid Loan Details after import:{" "}
                    </h2>
                  )}

                  {faultLoans &&
                    faultLoans.length > 0 &&
                    faultLoans.map((data) => {
                      return (
                        <>
                          <div className="row">
                            {/* <div className="col-md-6">{data.loanId}</div> */}
                            <div className="col-md-12">{data.msg}</div>
                          </div>
                        </>
                      );
                    })}
                </div>
              </Card>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default LoanApprovals;
