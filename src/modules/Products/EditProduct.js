import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Loader from "../../common/Loader";
import "../../css/style.css";
import "../Products/Product.css";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
const EditProduct = () => {
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
  };
  const [isLoading, setIsLoading] = useState(false);
  const [UpdateButton, setUpdateButton] = useState({ update: false, _id: "" });
  const [products, setProducts] = useState();
  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    let inputValues = values;
    inputValues[name] = value;
    setValues({ ...inputValues });
  };
  useEffect(() => {
    getProducts();
  }, []);

  const search = useLocation().search;
  const ProductID = new URLSearchParams(search).get("productid");
  const getProducts = async (e) => {
    setIsLoading(true);
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_URL}/products/${ProductID}`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      setProducts(result.data);
      setValues(result.data);
      setUpdateButton({ update: true, _id: result.data._id });
      console.log(result.data);
      setSuccess(true);
      setIsLoading(false);
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
  };
  //--------------------  update Project------------------
  const productUpdateHandler = async (e, _id) => {
    setIsLoading(true);
    try {
      const valuesObj = {
        ...values,
      };
      console.log(_id);
      await axios.put(
        `${process.env.REACT_APP_URL}/products/${_id}`,
        valuesObj,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      setIsLoading(false);
      handleClickOpen("Updated Successfuly");
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
        "Loading"
      ) : (
        <div className="addProduct" style={{ marginTop: "80px" }}>
          <div className="container add">
            <h1 style={{ fontSize: "2rem", padding: "10px" }}>
              Update Product
            </h1>
            <form>
              <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12">
                  <label>
                    Product <span className="require-icon">*</span>
                  </label>
                  <input
                    type="text"
                    name="product"
                    id="product"
                    value={values.product ? values.product : ""}
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
              <div className="row">
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
              <div className="row">
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
              <div className="row">
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
              {/* <button
              type="button"
              className="btn btn-primary"
              onClick={projectUpdateHandler}
            >
              Update

            </button> */}
              {/* {console.log(products._id)} */}
              {UpdateButton ? (
                <button
                  type="button"
                  className="btn btn-primary add"
                  onClick={(e) => productUpdateHandler(e, UpdateButton._id)}
                >
                  Update
                </button>
              ) : (
                ""
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProduct;
