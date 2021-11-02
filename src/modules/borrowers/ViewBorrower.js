import React, { useEffect, useState } from "react";
import axios from "axios";

import { useParams } from "react-router-dom";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";

import Loader from "../../common/Loader";

import "../../css/style.css";

const AddEditDisbursement = () => {
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

  const id = useParams().id;

  const [profileData, setProfileData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      if (token) {
        try {
          setIsLoading(true);
          const result = await axios
            .get(`${process.env.REACT_APP_URL}/users/${id}`, {
              headers: {
                Authorization: token,
              },
            })
            .catch((error) => {
              console.log("error ", error.response.data.errors[0].msg);
              setIsLoading(false);

              error.response.data.errors[0].msg
                ? handleClickOpen(error.response.data.errors[0].msg)
                : handleClickOpen("Something went wrong !!!");
            });
          if (result && result.data) {
            let data = result?.data;
            setProfileData(data);
            setIsLoading(false);
          }
        } catch (err) {
          setIsLoading(false);

          handleClickOpen("Something went wrong !!!");
        }
      } else handleClickOpen("No Token Avaibale, Please Login !!!");
    };
    fetchData();
  }, []);

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

      {!isLoading && profileData && (
        <div className="features-section">
          <div className="container features-container">
            {/* <div className="col-lg-4 col-md-6 features-header-img-section">
                <img src="assets/images/features.png" />
              </div> */}
            <div className="col-lg-8 col-md-12 features-content-section">
              <div className="col-md-12 title-section features-title-section">
                {/* <p className="subtitle">About Borrower</p> */}
                <h2 className="title">Borrower's Details</h2>
                {/* <p className="title-details">
                    Don't be afraid to brag about some of your unique selling
                    points here. Your visitors would love to find out more about
                    your service features.
                  </p> */}
              </div>
              <div className="container features-card-container">
                <div className="col-md-5 features-card">
                  <div className="features-card-img-section">
                    {/* <img alt="User" src="assets/images/financial-guard-img.svg" /> */}
                  </div>
                  <div className="features-card-content-section">
                    <h3>Name</h3>

                    <p className="BorrowerDetailsText">
                      {profileData.firstName + " " + profileData.lastName}
                    </p>
                  </div>
                </div>
                <div className="col-md-5 features-card">
                  <div className="features-card-img-section">
                    {/* <img src="assets/images/happy-customers-img.svg" /> */}
                  </div>
                  <div className="features-card-content-section">
                    <h3>Gender</h3>
                    <p className="BorrowerDetailsText">{profileData.gender}</p>
                  </div>
                </div>
                <div className="col-md-5 features-card">
                  <div className="features-card-img-section">
                    {/* <img src="assets/images/fulfillment-service-img.svg" /> */}
                  </div>
                  <div className="features-card-content-section">
                    <h3>IC Number</h3>
                    <p className="BorrowerDetailsText">
                      {profileData.icNumber}
                    </p>
                  </div>
                </div>
                <div className="col-md-5 features-card">
                  <div className="features-card-img-section">
                    {/* <img src="assets/images/fulfillment-service-img.svg" /> */}
                  </div>
                  <div className="features-card-content-section">
                    <h3>Date of Birth</h3>
                    <p className="BorrowerDetailsText">
                      {profileData.dob
                        ? new Date(profileData.dob).toLocaleDateString()
                        : "NA"}
                    </p>
                  </div>
                </div>
                <div className="col-md-5 features-card">
                  <div className="features-card-img-section">
                    {/* <img src="assets/images/launch-pad-img.svg" /> */}
                  </div>
                  <div className="features-card-content-section">
                    <h3>Mobile</h3>
                    <p className="BorrowerDetailsText">{profileData.mobile}</p>
                  </div>
                </div>
                <div className="col-md-5 features-card">
                  <div className="features-card-img-section">
                    {/* <img src="assets/images/support-247-img.svg" /> */}
                  </div>
                  <div className="features-card-content-section">
                    <h3>Email</h3>
                    <p className="BorrowerDetailsText">{profileData.email}</p>
                  </div>
                </div>
                <div className="col-md-5 features-card">
                  <div className="features-card-img-section">
                    {/* <img src="assets/images/happy-customers-img.svg" /> */}
                  </div>
                  <div className="features-card-content-section">
                    <h3>Address</h3>
                    <p className="BorrowerDetailsText">
                      {profileData.address1}
                    </p>
                  </div>
                </div>

                <div className="col-md-5 features-card">
                  <div className="features-card-img-section">
                    {/* <img src="assets/images/social-compatibility-img.svg" /> */}
                  </div>
                  <div className="features-card-content-section">
                    <h3>City - Zip code</h3>
                    <p className="BorrowerDetailsText">
                      {profileData.city + " - " + profileData.zipCode}
                    </p>
                  </div>
                </div>
                {/* new  */}
                <div className="col-md-5 features-card">
                  <div className="features-card-img-section">
                    {/* <img src="assets/images/social-compatibility-img.svg" /> */}
                  </div>
                  <div className="features-card-content-section">
                    <h3>Marital Status</h3>
                    <p className="BorrowerDetailsText">
                      {profileData.maritalStatus}
                    </p>
                  </div>
                </div>
                <div className="col-md-5 features-card">
                  <div className="features-card-img-section">
                    {/* <img src="assets/images/social-compatibility-img.svg" /> */}
                  </div>
                  <div className="features-card-content-section">
                    <h3>Number of child</h3>
                    <p className="BorrowerDetailsText">
                      {profileData.numOfChild}
                    </p>
                  </div>
                </div>
                <div className="col-md-5 features-card">
                  <div className="features-card-img-section">
                    {/* <img src="assets/images/social-compatibility-img.svg" /> */}
                  </div>
                  <div className="features-card-content-section">
                    <h3>Educational Level</h3>
                    <p className="BorrowerDetailsText">
                      {profileData.educationLevel}
                    </p>
                  </div>
                </div>
                <div className="col-md-5 features-card">
                  <div className="features-card-img-section">
                    {/* <img src="assets/images/social-compatibility-img.svg" /> */}
                  </div>
                  <div className="features-card-content-section">
                    <h3>Employement Status</h3>
                    <p className="BorrowerDetailsText">
                      {profileData.employmentStatus}
                    </p>
                  </div>
                </div>
                {/* new  */}
              </div>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default AddEditDisbursement;
