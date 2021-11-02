import React from "react";
import { Bar } from "react-chartjs-2";
import { useEffect, useState } from "react";
import ChartDataLabels from "chartjs-plugin-datalabels";
import DataTable from "react-data-table-component";
const ValueofLoansApproved = ({ parentToChild }) => {
  const [data, setData] = useState(null);
  const [property, setProperty] = useState([]);
  const [values, setValues] = useState([]);
  const [BNPLvalues, setBNPLValues] = useState(null);
  const [Qhvalues, setQhvalues] = useState(null);
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    responsiveAnimationDuration: 500,
    plugins: {
      title: {
        display: true,
        // text: "Current Company",
      },
      legend: {
        display: true,
        position: "right",
      },
    },
    // indexAxis: "y",
  };
  // const data1 = {
  //   labels: [
  //     // "Jan",
  //     // "Feb",
  //     // "Mar",
  //     // "Apr",
  //     // "May",
  //     // "Jun",
  //     // "Jul",
  //     "Aug",
  //     "Sep",
  //     "Oct",
  //     // "Nov",
  //     // "Dec",
  //   ],
  //   datasets: [
  //     {
  //       label: "BNPL",
  //       position: "right",
  //       data: [12, 19, 3],
  //       datalabels: {
  //         anchor: "top",
  //         align: "top",
  //         offset: 10,
  //       },
  //       backgroundColor: [
  //         // "rgba(255, 99, 132, 0.2)",
  //         "rgba(54, 162, 235, 0.2)",
  //         // "rgba(255, 206, 86, 0.2)",
  //         // "rgba(75, 192, 192, 0.2)",
  //         // "rgba(153, 102, 255, 0.2)",
  //         // "rgba(255, 159, 64, 0.2)",
  //       ],
  //       borderColor: [
  //         // "rgba(255, 99, 132, 1)",
  //         "rgba(54, 162, 235, 1)",
  //         // "rgba(255, 206, 86, 1)",
  //         // "rgba(75, 192, 192, 1)",
  //         // "rgba(153, 102, 255, 1)",
  //         // "rgba(255, 159, 64, 1)",
  //       ],
  //       borderWidth: 1,
  //       pointBackgroundColor: "rgb(54, 162, 235)",
  //       pointBorderColor: "#fff",
  //       pointHoverBackgroundColor: "#fff",
  //       pointHoverBorderColor: "rgb(54, 162, 235)",
  //       // data: [12, 19, 3, 106, 24, 37, 65, 91, 83, 78, 44, 99],
  //     },
  //     {
  //       label: "QH",
  //       data: [28, 48, 30],
  //       fill: true,
  //       datalabels: {
  //         // anchor: "top",
  //         align: "top",
  //         offset: 30,
  //       },
  //       backgroundColor: [
  //         "rgba(255, 99, 132, 0.2)",
  //         // "rgba(54, 162, 235, 0.2)",
  //         // "rgba(255, 206, 86, 0.2)",
  //         // "rgba(75, 192, 192, 0.2)",
  //         // "rgba(153, 102, 255, 0.2)",
  //         // "rgba(255, 159, 64, 0.2)",
  //       ],
  //       borderColor: [
  //         "rgba(255, 99, 132, 1)",
  //         // "rgba(54, 162, 235, 1)",
  //         // "rgba(255, 206, 86, 1)",
  //         // "rgba(75, 192, 192, 1)",
  //         // "rgba(153, 102, 255, 1)",
  //         // "rgba(255, 159, 64, 1)",
  //       ],
  //       borderWidth: 1,
  //     },
  //     // {
  //     //   label: "BNPL - SDK",
  //     //   data: [32, 41, 76],
  //     //   datalabels: {
  //     //     anchor: "top",
  //     //     align: "top",
  //     //     offset: 20,
  //     //   },
  //     //   backgroundColor: [
  //     //     // "rgba(255, 99, 132, 0.2)",
  //     //     // "rgba(54, 162, 235, 0.2)",
  //     //     "rgba(0,0,0)",
  //     //     // "rgba(75, 192, 192, 0.2)",
  //     //     // "rgba(153, 102, 255, 0.2)",
  //     //     // "rgba(255, 159, 64, 0.2)",
  //     //   ],
  //     //   borderColor: [
  //     //     // "rgba(255, 99, 132, 1)",
  //     //     // "rgba(54, 162, 235, 1)",
  //     //     "rgba(0,0,0)",
  //     //     // "rgba(75, 192, 192, 1)",
  //     //     // "rgba(153, 102, 255, 1)",
  //     //     // "rgba(255, 159, 64, 1)",
  //     //   ],
  //     //   borderWidth: 1,
  //     //   pointBackgroundColor: "rgb(0,0,0)",
  //     //   pointBorderColor: "#fff",
  //     //   pointHoverBackgroundColor: "#fff",
  //     //   pointHoverBorderColor: "rgb(0,0,0)",
  //     // },
  //   ],
  // };

  useEffect(() => {
    const fetchBankNameData = async () => {
      let BNPLarray = [];
      let QHarray = [];
      BNPLarray.push(
        parentToChild != null &&
          parentToChild.bnplAmountApproved != null &&
          parentToChild.bnplAmountApproved
      );
      // BNPLarray.push({ productType: "BNPL" });
      QHarray.push(
        parentToChild != null &&
          parentToChild.qardHasanAmountApproved != null &&
          parentToChild.qardHasanAmountApproved
      );
      // BNPLarray.push({ productType: "Qard Hasan" });
      let value = [];

      // value.push({
      //   count:
      //     parentToChild != null &&
      //     parentToChild.bnplAmountApproved != null &&
      //     parentToChild.bnplAmountApproved,
      //   product: "BNPL",
      // });
      // BNPLarray.push({});
      value.push({
        count:
          parentToChild != null &&
          parentToChild.qardHasanAmountApproved != null &&
          parentToChild.qardHasanAmountApproved,
        product: "Qard Hasan",
      });
      console.log(value);
      setValues(value);
      console.log(BNPLarray);
      console.log(QHarray);
      const BNPLvalues = BNPLarray;
      const QHvalues = QHarray;
      // console.log(parentToChild.bnplApprovedLoans);
      // console.log(BNPLvalues);
      setBNPLValues(BNPLvalues);

      setQhvalues(QHvalues);
      const dataSetsBnpl = { labels: [], backgroundColor: [], data: [] };
      const dataSetsQh = { labels: [], backgroundColor: [], data: [] };

      for (let i = 0; i < BNPLvalues.length; i++) {
        dataSetsBnpl.data.push(BNPLvalues[i]);
        // console.log(dataSetsBnpl);
        let color = getRandomColor();
        const checkColor = () => dataSetsBnpl.backgroundColor.includes(color);
        while (checkColor()) {
          color = getRandomColor();
        }
        dataSetsBnpl.backgroundColor.push(color);
      }
      // console.log(dataSetsBnpl);
      for (let i = 0; i < QHvalues.length; i++) {
        dataSetsQh.data.push(QHvalues[i]);

        let color = getRandomColor();
        const checkColor = () => dataSetsQh.backgroundColor.includes(color);
        while (checkColor()) {
          color = getRandomColor();
        }
        dataSetsQh.backgroundColor.push(color);
      }
      // console.log(dataSetsQh);

      function getRandomColor() {
        let letters = "0123456789ABCDEF";
        let color = "#";

        for (let i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      }

      const data = {
        labels: [""],
        datasets: [
          // {
          //   label: "BNPL",
          //   data: dataSetsBnpl.data,
          //   fill: true,
          //   backgroundColor: ["rgba(54, 162, 235, 0.2)"],
          //   borderColor: ["rgba(54, 162, 235, 1)"],
          //   borderWidth: 1,
          //   pointBackgroundColor: "rgb(54, 162, 235)",
          //   pointBorderColor: "#fff",
          //   pointHoverBackgroundColor: "#fff",
          //   pointHoverBorderColor: "rgb(54, 162, 235)",
          // },
          {
            label: "QH",
            data: dataSetsQh.data,
            fill: true,
            backgroundColor: ["rgba(255, 99, 132, 0.2)"],
            borderColor: ["rgba(255, 99, 132, 1)"],
            borderWidth: 1,
          },
        ],
      };
      setData(data);
    };
    fetchBankNameData();
  }, [parentToChild]);
  const serverSideColumns = [
    {
      name: "Product",
      selector: "product",
      sortable: true,
      format: (row) => {
        return row.product;
      },
      wrap: true,
    },

    {
      name: "Value (RM)",
      selector: "Value",
      sortable: true,
      format: (row) => {
        return row.count;
      },
      wrap: true,
    },
  ];
  const conditionalRowStyles = [
    {
      when: (row) => row,
      style: {
        // backgroundColor: 'green',
        border: "1px black",
        color: "blueviolet",
        "&:hover": {
          cursor: "pointer",
        },
      },
    },
  ];
  const customStyles = {
    rows: {
      style: {
        // backgroundColor: 'green',
        border: "1px black",
        color: "blueviolet",
        "&:hover": {
          cursor: "pointer",
        },
        fontSize: "10px",
      },
    },
    headCells: {
      style: {
        background: "#0984e1",
        fontWeight: "700",
        color: "white",
        fontSize: "10px",
      },
    },
  };

  return (
    <div>
      <div style={{ height: "185px" }}>
        <Bar
          getElementAtEvent={(element) => {
            setProperty(
              element.length > 0 ? values[element[0].index].data : []
            );
          }}
          data={data}
          // plugins={[ChartDataLabels]}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            responsiveAnimationDuration: 500,
            plugins: {
              title: {
                display: true,
              },
              legend: {
                display: true,
                position: "top",
              },
            },
            scales: {
              // x: {
              //   title: {
              //     display: true,
              //     // text: "Product",
              //     color: "blue",
              //   },
              // },
              y: {
                title: {
                  display: true,
                  text: "Value",
                  color: "blue",
                },
              },
            },
          }}
        />
      </div>
      <div className="PieChart-Table">
        <DataTable
          noHeader
          // pagination
          // paginationServer
          className="react-dataTable"
          columns={serverSideColumns}
          // pagination={true}
          // paginationPerpage={10}
          customStyles={customStyles}
          conditionalRowStyles={conditionalRowStyles}
          data={values}
        />
      </div>
    </div>
  );
};

export default ValueofLoansApproved;
