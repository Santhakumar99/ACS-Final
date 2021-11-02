import React from "react";
// import LoaderGif from "../../images/Block-Loader-1.gif";
import "../../dashboard/FullPageLoader/PgLoader.css";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
const PageLoader = () => {
  return (
    <div>
      <div className="Fullpage-loader-container">
        <div className="Fullpage-loader">
          <Box sx={{ display: "flex" }}>
            <CircularProgress />
          </Box>
        </div>
      </div>
    </div>
  );
};

export default PageLoader;
