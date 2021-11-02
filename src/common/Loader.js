import "./loader.css";
import "../dashboard/FullPageLoader/PgLoader.css";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
const Loader = () => {
  // return <div className="loader"></div>;
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

export default Loader;
