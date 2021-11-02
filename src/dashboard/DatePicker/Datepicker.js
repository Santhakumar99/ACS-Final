import React, { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import PageLoader from "../FullPageLoader/PageLoader";
import Toastify from "../Toaster/Toastify";

const Datepicker = () => {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <div>
      <DatePicker
        selected={startDate}
        dateFormat="dd-MM-yyyy"
        onChange={(date) => setStartDate(date)}
      />
      <Toastify />
      {/* <PageLoader /> */}
    </div>
  );
};
export default Datepicker;
