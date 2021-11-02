import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Loader from "../../common/Loader";
import { TextField } from "@material-ui/core";
import "../../css/style.css";
// import "../Products/Product.css";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
const UpdateRoles = () => {
  const history = useHistory();
  const [values, setValues] = useState({
    type: "",
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
  const RoleID = new URLSearchParams(search).get("RoleId");
  console.log(RoleID);
  const getProducts = async (e) => {
    setIsLoading(true);
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_URL}/usertypes/${RoleID}`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      // setProducts(result.data.userTypes);
      console.log(result.data.data);
      setValues(result != null && result.data != null && result.data);
      setUpdateButton({ update: true, _id: result.data._id });
      //   setUpdateButton({ update: true, _id: result.data.userTypes._id });
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
  const RoleUpdateHandler = async (e, _id) => {
    setIsLoading(true);
    try {
      const valuesObj = {
        ...values,
      };
      console.log(_id);
      await axios.put(
        `${process.env.REACT_APP_URL}/usertypes/${_id}`,
        valuesObj,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      setIsLoading(false);
      handleClickOpen("Updated Successfully");
      // return (window.location = "/listRoles");
      history.push("/listRoles");
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
            <h1 style={{ fontSize: "2rem", padding: "10px", margin: "10px" }}>
              Update Product
            </h1>
            <form onSubmit={RoleUpdateHandler}>
              <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12">
                  {/* <label>
                    Role <span className="require-icon">*</span>
                  </label>
                  <input
                    type="text"
                    name="type"
                    id="type"
                    value={values.type ? values.type : undefined}
                    onChange={(e) => onChangeHandler(e)}
                    className="form-control"
                    placeholder="Role"
                    required
                  /> */}
                  <TextField
                    label="Role"
                    size="medium"
                    type="text"
                    fullWidth
                    name="type"
                    variant="outlined"
                    value={values.type ? values.type : undefined}
                    onChange={(e) => onChangeHandler(e)}
                    required
                    autoFocus
                  />
                </div>
              </div>
              {UpdateButton ? (
                <button
                  type="button"
                  className="btn btn-primary add"
                  onClick={(e) => RoleUpdateHandler(e, UpdateButton._id)}
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

export default UpdateRoles;
