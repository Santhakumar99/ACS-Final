// import React, { useEffect } from "react";
// import axios from "axios";
// import ByagegroupChart from "../Charts/ByagegroupChart";
// import ByLocationChart from "../Charts/ByLocationChart";
// import AcsScoreChart from "../Charts/AcsScoreChart";
// import RMvalueofLoansChart from "../Charts/RMvalueofLoansChart";
// import { EducationLevelChart } from "../Charts/EducationLevelChart";
// import Loader from "../../common/Loader";
// import ByGenderChart from "../Charts/ByGenderChart";
// const ProfileofBorrowers = () => {
//   const [Profile, setProfile] = React.useState([{}]);
//   const [isLoading, setIsLoading] = React.useState(false);
//   const cardStyle = {
//     paddingTop: "10px",
//     paddingBottom: "10px",
//     fontFamily: "Arial",
//   };
//   // console.log(tab.active);
//   useEffect(() => {
//     getBorrowerData();
//   }, []);

//   const getBorrowerData = async () => {
//     setIsLoading(true);
//     try {
//       const result = await axios.get(
//         `${process.env.REACT_APP_URL}/loans/dashboard_borrower_profile`,
//         {
//           headers: {
//             Authorization: localStorage.getItem("token"),
//           },
//         }
//       );
//       console.log(result.data);
//       setProfile(result.data);
//       setIsLoading(false);
//     } catch (error) {
//       console.log(error);
//       setIsLoading(false);
//     }
//   };
//   const GenderTotal =
//     (Profile != null && Profile.byGender != null && Profile.byGender[0].count) +
//     (Profile != null && Profile.byGender != null && Profile.byGender[1].count) +
//     (Profile != null && Profile.byGender != null && Profile.byGender[2].count);
//   console.log(GenderTotal);
//   return (
//     <div>
//       {isLoading && <Loader />}
//       {isLoading && isLoading ? (
//         ""
//       ) : (
//         <div>
//           <div className="row">
//             <div className="col-lg-6 col-md-12 col-sm-12">
//               <div className="card">
//                 <div className="card-body">
//                   <div className="card-title">ACS Score</div>
//                   <AcsScoreChart parentToChild={Profile} />
//                 </div>
//               </div>
//             </div>
//             <div className="col-lg-6 col-md-12 col-sm-12">
//               <div className="card">
//                 <div className="card-body">
//                   <div className="card-title">By Gender</div>

//                   <div className="table-responsive" style={{ height: "300px" }}>
//                     <table
//                       className="table table-bordered"
//                       style={{ background: "white" }}
//                     >
//                       <thead>
//                         <tr>
//                           <th scope="col">Male</th>
//                           <th scope="col">Female</th>
//                           <th scope="col">Others</th>
//                           <th scope="col">Total</th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         <tr>
//                           <td rowspan="2">
//                             {Profile != null &&
//                               Profile.byGender != null &&
//                               Profile.byGender[0].count}
//                           </td>
//                           <td>
//                             {" "}
//                             {Profile != null &&
//                               Profile.byGender != null &&
//                               Profile.byGender[1].count}
//                           </td>
//                           <td>
//                             {" "}
//                             {Profile != null &&
//                               Profile.byGender != null &&
//                               Profile.byGender[2].count}
//                           </td>
//                           <td>{GenderTotal != null && GenderTotal}</td>
//                         </tr>
//                       </tbody>
//                     </table>
//                   </div>
//                   {/* <ByGenderChart parentToChild={Profile} /> */}
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="row">
//             <div className="col-lg-6 col-md-12 col-sm-12">
//               <div className="card">
//                 <div className="card-body">
//                   <div className="card-title">
//                     RM / Value of loans vs Acs Score
//                   </div>
//                   <RMvalueofLoansChart />
//                 </div>
//               </div>
//             </div>
//             <div className="col-lg-6 col-md-12 col-sm-12">
//               <div className="card">
//                 <div className="card-body">
//                   <div className="card-title">By Age group</div>
//                   <ByagegroupChart parentToChild={Profile} />
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="row">
//             <div className="col-lg-6 col-md-12 col-sm-12">
//               <div className="card">
//                 <div className="card-body">
//                   <div className="card-title">By Location</div>
//                   <ByLocationChart parentToChild={Profile} />
//                 </div>
//               </div>
//             </div>
//             <div className="col-lg-6 col-md-12 col-sm-12">
//               <div className="card">
//                 <div className="card-body">
//                   <div className="card-title">Education Level</div>
//                   <EducationLevelChart parentToChild={Profile} />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProfileofBorrowers;
