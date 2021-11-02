// import React from "react";
// import axios from "axios";
// import "../Css/BusinessPerformance.css";
// import Loader from "../../common/Loader";
// import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
// import "react-circular-progressbar/dist/styles.css";
// import logo1 from "../../images/line1.png";
// import logo2 from "../../images/line2.png";
// import logo3 from "../../images/line3.png";
// import Datepicker from "../DatePicker/Datepicker";
// import DatePicker from "react-datepicker";

// import "react-datepicker/dist/react-datepicker.css";
// import DatePickers from "./DatePickers";
// const Businessperformance = ({ BusinessPerformanceFilter }) => {
//   const [Businessperformance, setBusinessperformance] = React.useState([{}]);
//   const [isLoading, setIsLoading] = React.useState(false);
//   const [startDate, setStartDate] = React.useState(new Date());
//   const [toDate, setToDate] = React.useState(new Date());
//   const [values, setValues] = React.useState({
//     startdate: "",
//     enddate: "",
//   });
//   const cardStyle = {
//     padding: "10px",
//     fontFamily: "Arial",
//   };
//   React.useEffect(() => {
//     getBorrowerData();
//   }, [BusinessPerformanceFilter]);

//   const FilterDashboardBussinessPerformanceLog = BusinessPerformanceFilter;
//   console.log(FilterDashboardBussinessPerformanceLog);

//   const getBorrowerData = async () => {
//     setIsLoading(true);
//     try {
//       const result = await axios.get(
//         `${process.env.REACT_APP_URL}/loans/dashboard_business_performance`,
//         {
//           headers: {
//             Authorization: localStorage.getItem("token"),
//           },
//         }
//       );
//       console.log(result.data);

//       if (
//         FilterDashboardBussinessPerformanceLog != null &&
//         FilterDashboardBussinessPerformanceLog
//       ) {
//         setBusinessperformance(FilterDashboardBussinessPerformanceLog);
//       } else {
//         setBusinessperformance(result.data?.dashboardObj);
//       }
//       // setBusinessperformance(result.data?.dashboardObj);
//       setIsLoading(false);
//     } catch (error) {
//       console.log(error);
//       setIsLoading(false);
//     }
//   };
//   var nf = new Intl.NumberFormat();
//   var TotalFeesCollected =
//     Businessperformance != null &&
//     Businessperformance.totalActualInterestAndFeesCollected != null &&
//     Businessperformance.totalActualInterestAndFeesCollected
//       ? nf.format(
//           Businessperformance != null &&
//             Businessperformance.totalActualInterestAndFeesCollected != null &&
//             Businessperformance.totalActualInterestAndFeesCollected
//         )
//       : undefined;
//   const BNPLinterestCollected =
//     Businessperformance != null &&
//     Businessperformance.bnplInterestAndFeesCollected != null &&
//     Businessperformance.bnplInterestAndFeesCollected
//       ? nf.format(
//           Businessperformance != null &&
//             Businessperformance.bnplInterestAndFeesCollected != null &&
//             Businessperformance.bnplInterestAndFeesCollected
//         )
//       : undefined;
//   const QHinterestCollected =
//     Businessperformance != null &&
//     Businessperformance.qardHasanInterestAndFeesCollected != null &&
//     Businessperformance.qardHasanInterestAndFeesCollected
//       ? nf.format(
//           Businessperformance != null &&
//             Businessperformance.qardHasanInterestAndFeesCollected != null &&
//             Businessperformance.qardHasanInterestAndFeesCollected
//         )
//       : undefined;

//   const percentage =
//     Businessperformance != null && Businessperformance.totalNumOfUsers
//       ? Businessperformance != null && Businessperformance.totalNumOfUsers
//       : "0";

//   const NewUsers =
//     Businessperformance != null &&
//     Businessperformance.newUsers != null &&
//     Businessperformance.newUsers.count
//       ? Businessperformance != null &&
//         Businessperformance.newUsers != null &&
//         Businessperformance.newUsers.count
//       : "0";

//   const InActiveUsers =
//     Businessperformance != null &&
//     Businessperformance.inActiveUsers != null &&
//     Businessperformance.inActiveUsers.count
//       ? Businessperformance != null &&
//         Businessperformance.inActiveUsers != null &&
//         Businessperformance.inActiveUsers.count
//       : "0";
//   console.log(TotalFeesCollected);

//   const totalProjectedCollections =
//     Businessperformance != null && Businessperformance.totalProjectedCollection
//       ? nf.format(
//           Businessperformance != null &&
//             Businessperformance.totalProjectedCollection
//         )
//       : "0";
//   const FilterData = () => {
//     const valuesObj = {
//       ...values,
//     };
//     console.log(valuesObj);
//   };
//   const onChangeHandler = (e) => {
//     const name = e.target.name;
//     const value = e.target.value;
//     let inputValues = values;
//     inputValues[name] = value;
//     setValues({ ...inputValues });
//   };
//   return (
//     <div>
//       {isLoading && <Loader />}
//       {isLoading && isLoading ? (
//         ""
//       ) : (
//         <div>
//           {/* <div className="type-selector">
//             <select className="form-select" aria-label="Default select example">
//               <option selected>Daily</option>
//               <option value="1">Monthly</option>
//               <option value="2">Quarterly</option>
//               <option value="3">Yearly YTD</option>
//             </select>
//           </div> */}
//           {/* <DatePickers /> */}

//           <div className="card overviewBorrowers">
//             <div style={cardStyle} className="row">
//               <div className="col-lg-5 col-md-12 col-sm-12">
//                 <div className="card TPC">
//                   <div className="card-body">
//                     <div className="row">
//                       <div className="col-8">
//                         <div className="card-title">
//                           Total Projected Collections (RM)
//                         </div>
//                         <p style={{ fontSize: "24px" }}>
//                           {/* <span className="Rm-text">RM</span> */}
//                           {totalProjectedCollections}
//                         </p>
//                       </div>
//                       <div className="col-4">
//                         <div className="DPD">
//                           <img src={logo3} className="DPD-image" />
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 {/* <div className="card TPC">
//                   <div className="card-body">
//                     <div className="card-title">
//                       Total Projected Collections
//                     </div>
//                     <p style={{ fontSize: "20px" }}>
//                       <span className="Rm-text">RM</span>
//                       {Businessperformance != null &&
//                         Businessperformance.totalProjectedCollection}
//                     </p>
//                   </div>
//                 </div> */}
//               </div>

//               <div className="col-lg-7 col-md-12 col-sm-12">
//                 <div className="card">
//                   <div className="table-responsive">
//                     <table
//                       className="table table-bordered"
//                       style={{ background: "white" }}
//                     >
//                       <thead>
//                         <tr>
//                           <th scope="col">Total Fees Collected (RM)</th>
//                           <th scope="col">Product (RM)</th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         <tr>
//                           <td rowspan="2">{TotalFeesCollected}</td>
//                           <td className="countValue">
//                             <span className="countValue">BNPL </span>
//                             {BNPLinterestCollected}
//                           </td>
//                         </tr>
//                         <tr>
//                           <td className="countValue">
//                             <span className="countValue">QH </span>
//                             {QHinterestCollected}
//                           </td>
//                         </tr>
//                       </tbody>
//                     </table>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="card overviewBorrowers" style={{ marginTop: "20px" }}>
//             {/* <div className="row">
//               <div className="col-lg-12 col-md-12 col-sm-12"> */}
//             <div className="row">
//               <div className="col-lg-3 col-md-4 col-sm-12">
//                 <div className="card ">
//                   <div className="card-body">
//                     <div className="row">
//                       <div className="col-7">
//                         <div className="card-title">Number of Applications</div>
//                         <p className="count total-application">
//                           {Businessperformance.totalNumOfUsers}
//                         </p>
//                       </div>

//                       <div className="col-5">
//                         <div
//                           style={{ width: 80, height: 80 }}
//                           className="p-bar"
//                         >
//                           <CircularProgressbar
//                             value={percentage}
//                             text={`${percentage}`}
//                             styles={buildStyles({
//                               rotation: 0.25,
//                               strokeLinecap: "butt",
//                               textSize: "16px",
//                               pathTransitionDuration: 0.5,
//                               pathColor: "blue",
//                               textColor: "blue",
//                               trailColor: "#d6d6d6",
//                               backgroundColor: "#3e98c7",
//                             })}
//                           />
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 {/* <div className="card">
//                   <div className="card-body">
//                     <div className="card-title">Total Number of Users</div>
//                     <p style={{ fontSize: "20px" }}>
//                       {Businessperformance != null &&
//                         Businessperformance.totalNumOfUsers}
//                     </p>
//                   </div>
//                 </div> */}
//               </div>
//               <div className="col-lg-4 col-md-4 col-sm-12">
//                 <div className="card ">
//                   <div className="card-body">
//                     <div className="row">
//                       <div className="col-7">
//                         <div className="card-title">New Users</div>
//                         <p className="count total-application">
//                           {Businessperformance != null &&
//                             Businessperformance.newUsers != null &&
//                             Businessperformance.newUsers.count}
//                         </p>
//                       </div>

//                       <div className="col-5">
//                         <div
//                           style={{ width: 80, height: 80 }}
//                           className="p-bar"
//                         >
//                           <CircularProgressbar
//                             value={NewUsers}
//                             text={`${NewUsers}`}
//                             styles={buildStyles({
//                               rotation: 0.25,
//                               strokeLinecap: "butt",
//                               textSize: "16px",
//                               pathTransitionDuration: 0.5,
//                               pathColor: "red",
//                               textColor: "red",
//                               trailColor: "#d6d6d6",
//                               backgroundColor: "#3e98c7",
//                             })}
//                           />
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 {/* <div className="card">
//                   <div className="card-body">
//                     <div className="card-title">New Users</div>
//                     <p style={{ fontSize: "20px" }}>
//                       {Businessperformance != null &&
//                         Businessperformance.newUsers != null &&
//                         Businessperformance.newUsers.count}
//                     </p>
//                   </div>
//                 </div> */}
//               </div>
//               <div className="col-lg-4 col-md-4 col-sm-12">
//                 <div className="card ">
//                   <div className="card-body">
//                     <div className="row">
//                       <div className="col-7">
//                         <div className="card-title">Inactive of Users</div>
//                         <p className="count total-application">
//                           {Businessperformance != null &&
//                             Businessperformance.inActiveUsers != null &&
//                             Businessperformance.inActiveUsers.count}
//                         </p>
//                       </div>

//                       <div className="col-5">
//                         <div
//                           style={{ width: 80, height: 80 }}
//                           className="p-bar"
//                         >
//                           <CircularProgressbar
//                             value={InActiveUsers}
//                             text={`${InActiveUsers}`}
//                             styles={buildStyles({
//                               rotation: 0.25,
//                               strokeLinecap: "butt",
//                               textSize: "16px",
//                               pathTransitionDuration: 0.5,
//                               pathColor: "green",
//                               textColor: "green",
//                               trailColor: "#d6d6d6",
//                               backgroundColor: "#3e98c7",
//                             })}
//                           />
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 {/* <div className="card">
//                   <div className="card-body">
//                     <div className="card-title">Inactive of Users</div>
//                     <p style={{ fontSize: "20px" }}>
//                       {Businessperformance != null &&
//                         Businessperformance.inActiveUsers != null &&
//                         Businessperformance.inActiveUsers.count}
//                     </p>
//                   </div>
//                 </div> */}
//               </div>
//             </div>
//           </div>
//           {/* <div className="col-lg-8 col-md-8 col-sm-12">
//                 <div className="row">
//                   <div className="col-lg-12 col-md-12 col-sm-12">
//                     <div className="card">
//                       <div className="card-title">Late Penalties</div>
//                       <div className="table-responsive">
//                         <table
//                           className="table table-bordered"
//                           style={{ background: "white" }}
//                         >
//                           <thead>
//                             <tr></tr>
//                           </thead>
//                           <tbody>
//                             <tr>
//                               <th>
//                                 {Businessperformance != null &&
//                                   Businessperformance.latePenalties != null &&
//                                   Businessperformance.latePenalties.product}
//                               </th>
//                               <th>Number of Loans</th>
//                             </tr>
//                             <tr>
//                               <td>
//                                 RM{" "}
//                                 {Businessperformance != null &&
//                                   Businessperformance.latePenalties != null &&
//                                   Businessperformance.latePenalties.value}
//                               </td>
//                               <td>
//                                 {Businessperformance != null &&
//                                   Businessperformance.latePenalties != null &&
//                                   Businessperformance.latePenalties.count}
//                               </td>
//                             </tr>
//                           </tbody>
//                         </table>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="col-lg-12 col-md-12 col-sm-12">
//                     <div className="card">
//                       <div className="table-responsive">
//                         <table
//                           className="table table-bordered"
//                           style={{ background: "white" }}
//                         >
//                           <thead>
//                             <tr>
//                               <th scope="col">App Performance</th>
//                               <th scope="col">% of Availablity</th>
//                             </tr>
//                           </thead>
//                           <tbody>
//                             <tr>
//                               <td rowspan="2">-</td>
//                               <td>-</td>
//                             </tr>
//                           </tbody>
//                         </table>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div> */}
//           {/* </div>
//           </div> */}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Businessperformance;
