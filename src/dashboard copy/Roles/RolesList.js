import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { DataGrid } from "@material-ui/data-grid";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import "../../modules/Products/Product.css";
import Loader from "../../common/Loader";
import "../../css/style.css";
import "../Roles/Roles.css";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import { NavLink } from "react-router-dom";
import ListItemText from "@material-ui/core/ListItemText";
// import Button from "@material-ui/core/Button";
const RolesList = () => {
  const history = useHistory();
  const [ListProducts, setListProducts] = useState();
  const [deleteAlert, setDeleteAlert] = useState({
    alertBox: false,
    deleteId: "",
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
  useEffect(() => {
    getProducts();
  }, []);
  const getProducts = async (e) => {
    setIsLoading(true);
    try {
      const result = await axios.get(`${process.env.REACT_APP_URL}/usertypes`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      if (result && result.data) {
        let array = result.data.userTypes;
        for (let i = 0; i < array.length; i++) {
          const element = array[i];
          element.id = i + 1;
        }
        setListProducts(array);
        setDeleteAlert(array);
        setIsLoading(false);
      }
      // console.log(result.data.productMasters);
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

  //-------------------- delete Project ------------------
  const deleteProject = async (id) => {
    setIsLoading(true);
    setDeleteAlert({
      ...deleteAlert,
      alertBox: true,
      deleteId: "",
    });
    try {
      await axios.delete(`${process.env.REACT_APP_URL}/usertypes/${id}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      setDeleteAlert({
        ...deleteAlert,
        alertBox: false,
        deleteId: "",
      });
      getProducts();
      setIsLoading(false);
      handleClickOpen("Deleted Successfully");
    } catch (error) {
      console.log(error);
      setDeleteAlert({
        ...deleteAlert,
        alertBox: false,
        deleteId: "",
      });
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
  //--------------columns-----------
  const columns = [
    { field: "id", headerName: "S.No", width: 100, sortable: false },
    { field: "type", headerName: "Role", width: 300 },
    // { field: "isActive", headerName: "Active", width: 300 },
    {
      field: "Edit",
      headerName: " EDIT ",
      sortable: false,
      width: 200,
      disableClickEventBubbling: false,
      renderCell: (params) => {
        // const onEdit = () => {
        const handleRoute = (_id) => {
          history.push("/UpdateRole?RoleId=" + params.row._id);
          return;
        };

        return (
          <>
            <Button onClick={handleRoute}>
              <EditIcon />
            </Button>
            {/* <Button onClick={onDelete}>
              <DeleteIcon />
            </Button> */}
          </>
        );
      },
    },
    {
      field: "",
      headerName: "DELETE ",
      sortable: false,
      width: 200,
      disableClickEventBubbling: false,
      renderCell: (params) => {
        // const onEdit = () => {
        //   const handleRoute = (_id) => {
        //     history.push("/updateproduct?productid=" + params.row._id);
        //     return;
        //   };

        const onDelete = () => {
          setDeleteAlert({
            ...deleteAlert,
            alertBox: true,
            deleteId: params.row._id,
          });

          return;
        };
        return (
          <>
            {/* <Button onClick={handleRoute}>
                <EditIcon />
              </Button> */}
            <Button onClick={onDelete}>
              <DeleteIcon />
            </Button>
          </>
        );
      },
    },
  ];
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
      {deleteAlert.alertBox && (
        <div className="deleteAlertBox">
          <span>
            <div className="deleteAlertBoxContent">
              <i class="fas fa-trash-alt"></i>
              <h4>Are you sure ?</h4>
              <div className="deleteAlertBoxbutton">
                <div className="deleteAlertBoxDeleteButton">
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteProject(deleteAlert.deleteId)}
                  >
                    Delete
                  </button>
                </div>
                <div className=" deleteAlertBoxcancelButton">
                  <button
                    className="btn btn-success btn-sm"
                    onClick={() =>
                      setDeleteAlert({
                        ...deleteAlert,
                        alertBox: false,
                        deleteId: "",
                      })
                    }
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </span>
        </div>
      )}
      <div
        className="Navlink"
        style={{ marginTop: "40px", marginLeft: "15px" }}
      >
        <NavLink to="/">
          <ListItemText primary={"Home"} />
        </NavLink>
        <span className="slash">&#47;</span>
        <NavLink to="/ListRoles">
          <ListItemText primary={"Roles"} />
        </NavLink>
      </div>
      <div className="addButton" style={{}}>
        <button
          className="contact-us-form-btn addrole"
          onClick={() => history.push("/addRole")}
        >
          Add Role
        </button>
      </div>
      {isLoading && isLoading ? (
        ""
      ) : (
        <div className="table-head" style={{ marginTop: "30px" }}>
          {ListProducts != null && ListProducts.length > 0 && ListProducts ? (
            <div style={{ height: 650, width: "100%" }}>
              <DataGrid rows={ListProducts} columns={columns} pageSize={10} />
            </div>
          ) : (
            isLoading && <Loader />
          )}
        </div>
      )}
    </div>
  );
};

export default RolesList;
