import React from "react";
import { useState } from "react";
import axios from "axios";
import "../Products/Product.css";
import Loader from "../../common/Loader";
import "../../css/style.css";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
const AddProduct = () => {
  const [values, setValues] = useState({
    product: "",
    description: "",
    profit_rate_pm: "",
    fee: "",
    loanAmountMax: "",
    loanAmountMin: "",
    penalty_pm: "",
    tenureMax: "",
    tenureMin: "",
  });
  const [open, setOpen] = React.useState(false);
  const [errMsg, setErrMsg] = useState(undefined);
  const [success, setSuccess] = useState(undefined);

  const handleClickOpen = (msg) => {
    setErrMsg(msg);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    return success && (window.location = "/login");
  };
  const [products, setProducts] = useState();
  const [isLoading, setIsLoading] = useState(false);
  //-------------------- onchange handle Project------------------

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    let inputValues = values;
    inputValues[name] = value;
    setValues({ ...inputValues });
  };

  const closeForm = () => {
    setValues({
      product: "",
      description: "",
      profit_rate_pm: "",
      fee: "",
      loanAmountMax: "",
      loanAmountMin: "",
      penalty_pm: "",
      tenureMax: "",
      tenureMin: "",
    });
  };
  const AddHandleProducts = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      let vals = values;
      const valuesObj = {
        ...vals,
      };
      console.log(valuesObj);
      const Result = await axios.post(
        `${process.env.REACT_APP_URL}/products`,
        valuesObj,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      console.log(Result);
      setProducts(Result);
      setIsLoading(false);
      handleClickOpen("Product Created Successfully");
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      error != null &&
      error.response != null &&
      error.response.data != null &&
      error.response.data.errors[0]
        ? handleClickOpen(
            error != null &&
              error.response != null &&
              error.response.data != null &&
              error.response.data.errors[0] &&
              error.response.data.errors[0].msg
          )
        : handleClickOpen("Something went wrong !!!");
    }
    closeForm();
  };

  return (
    <div>
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
      {isLoading && isLoading ? (
        "loading"
      ) : (
        <div className="addProduct" style={{ marginTop: "80px" }}>
          <div className="container add">
            <h1 style={{ fontSize: "2rem", padding: "20px" }}>Add Product</h1>
            <form onSubmit={AddHandleProducts}>
              <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12">
                  <label>
                    Product <span className="require-icon">*</span>
                  </label>
                  <input
                    type="text"
                    name="product"
                    id="product"
                    value={values.product}
                    onChange={(e) => onChangeHandler(e)}
                    className="form-control"
                    placeholder="Product"
                    required
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-12">
                  <label>
                    Loan Amount (Min)<span className="require-icon">*</span>
                  </label>
                  <input
                    type="number"
                    name="loanAmountMin"
                    id="loanAmountMax"
                    value={values.loanAmountMin}
                    onChange={(e) => onChangeHandler(e)}
                    className="form-control"
                    placeholder="Loan Amount"
                    required
                  />
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12">
                  <label>
                    Loan Amount (Max)<span className="require-icon">*</span>
                  </label>
                  <input
                    type="number"
                    name="loanAmountMax"
                    id="loanAmountMax"
                    value={values.loanAmountMax}
                    onChange={(e) => onChangeHandler(e)}
                    className="form-control"
                    placeholder="Loan Amount"
                    required
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-12">
                  <label>
                    Tenure (Min) <span className="require-icon">*</span>
                  </label>
                  <input
                    type="number"
                    name="tenureMin"
                    id="projectname"
                    value={values.tenureMin}
                    onChange={(e) => onChangeHandler(e)}
                    className="form-control"
                    placeholder="Tenure"
                    required
                  />
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12">
                  <label>
                    Tenure (Max)<span className="require-icon">*</span>
                  </label>
                  <input
                    type="number"
                    name="tenureMax"
                    id="projectname"
                    value={values.tenureMax}
                    onChange={(e) => onChangeHandler(e)}
                    className="form-control"
                    placeholder="Tenure"
                    required
                  />
                </div>
              </div>
              <div className=" row">
                <div className="col-lg-6 col-md-6 col-sm-12">
                  <label>
                    Profit Rate pm <span className="require-icon">*</span>
                  </label>
                  <input
                    type="number"
                    name="profit_rate_pm"
                    id="projectname"
                    value={values.profit_rate_pm}
                    onChange={(e) => onChangeHandler(e)}
                    className="form-control"
                    placeholder="Profit Rate Pm"
                    required
                  />
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12">
                  <label>
                    Fee <span className="require-icon">*</span>
                  </label>
                  <input
                    type="number"
                    name="fee"
                    id="fee"
                    value={values.fee}
                    onChange={(e) => onChangeHandler(e)}
                    className="form-control"
                    placeholder="Fee"
                    required
                  />
                </div>
              </div>
              <div className=" row">
                <div className="col-lg-12 col-md-12 col-sm-12">
                  <label>
                    Penalty <span className="require-icon">*</span>
                  </label>
                  <input
                    type="number"
                    name="penalty_pm"
                    id="projectname"
                    value={values.penalty_pm}
                    onChange={(e) => onChangeHandler(e)}
                    className="form-control"
                    placeholder="Penalty"
                    required
                  />
                </div>
              </div>
              <div className=" row">
                <div className="col-lg-12 col-md-12 col-sm-12">
                  <label>Description</label>
                  <textarea
                    type="text"
                    name="description"
                    id="description"
                    value={values.description}
                    onChange={(e) => onChangeHandler(e)}
                    className="form-control"
                    placeholder="Description"
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                className="btn btn-primary add"
                // onClick={AddHandleProducts}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
export default AddProduct;
