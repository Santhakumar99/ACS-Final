import React from "react";
import { useState } from "react";
import axios from "axios";
// import "../Products/Product.css";
import Loader from "../../common/Loader";
import "../../css/style.css";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import { TextField } from "@material-ui/core";
import { useHistory } from "react-router-dom";
const AddRole = () => {
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
      type: "",
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
        `${process.env.REACT_APP_URL}/usertypes`,
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
      handleClickOpen("Role Created Successfully");
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
            <h1 style={{ fontSize: "2rem", padding: "20px" }}>Add Role</h1>
            <form onSubmit={AddHandleProducts}>
              <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12">
                  {/* <label>
                    Role <span className="require-icon">*</span>
                  </label> */}
                  {/* <input
                    type="text"
                    name="type"
                    id="type"
                    value={values.type}
                    onChange={(e) => onChangeHandler(e)}
                    className="form-control"
                    placeholder="Role"
                    required
                  /> */}
                  <TextField
                    label="Role"
                    size="medium"
                    type="text"
                    name="type"
                    fullWidth
                    variant="outlined"
                    value={values.type ? values.type : undefined}
                    onChange={(e) => onChangeHandler(e)}
                    required
                    autoFocus
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
export default AddRole;
