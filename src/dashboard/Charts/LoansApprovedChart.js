import React from "react";
import { Bar } from "react-chartjs-2";
import { useEffect, useState } from "react";
import { Chart } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import DataTable from "react-data-table-component";
const LoansApprovedChart = ({ parentToChild }) => {
  const [data, setData] = useState(null);
  const [property, setProperty] = useState([]);
  const [values, setValues] = useState([]);
  const [BNPLvalues, setBNPLValues] = useState(null);
  const [Qhvalues, setQhvalues] = useState(null);
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    responsiveAnimationDuration: 500,

    legend: {
      display: false,
      position: "right",
      labels: {
        usePointStyle: true,
        padding: 25,
        boxWidth: 9,
      },
    },
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

  useEffect(() => {
    const fetchBankNameData = async () => {
      let BNPLarray = [];
      let QHarray = [];
      BNPLarray.push(
        parentToChild != null &&
          parentToChild.bnplApprovedLoans != null &&
          parentToChild.bnplApprovedLoans
      );
      QHarray.push(
        parentToChild != null &&
          parentToChild.qardHasanApprovedLoans != null &&
          parentToChild.qardHasanApprovedLoans
      );

      console.log(BNPLarray);
      console.log(QHarray);

      let value = [];

      /************************************************ for BNPL  table data ******************************************/
      // value.push({
      //   count: BNPLarray != null && BNPLarray[0].count,
      //   product: "BNPL",
      // });
      /************************************************ for BNPL  table data ******************************************/

      value.push({
        count: QHarray != null && QHarray[0].count,
        product: "Qard Hasan",
      });
      setValues(value);
      console.log(value);
      const BNPLvalues = BNPLarray;
      const QHvalues = QHarray;
      setBNPLValues(BNPLvalues);

      setQhvalues(QHvalues);
      const dataSetsBnpl = { labels: [], backgroundColor: [], data: [] };
      const dataSetsQh = { labels: [], backgroundColor: [], data: [] };

      for (let i = 0; i < BNPLvalues.length; i++) {
        dataSetsBnpl.data.push(BNPLvalues[i].count);
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
        dataSetsQh.data.push(QHvalues[i].count);

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
      name: "Number of Loans",
      selector: "Value",
      sortable: true,
      format: (row) => {
        return row.count;
      },
      wrap: true,
    },
  ];
  // const dataToRender = () => {
  //   const filters = {
  //     q: "",
  //   };

  //   const isFiltered = Object.keys(filters).some(function (k) {
  //     return filters[k].length > 0;
  //   });
  //   // console.log(property);
  //   if (property.length > 0) {
  //     return property;
  //   } else if (property.length === 0 && isFiltered) {
  //     return [];
  //   } else {
  //     return property.slice();
  //   }
  // };
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

  const data1 = {
    labels: [
      // "Jan",
      // "Feb",
      // "Mar",
      // "Apr",
      // "May",
      // "Jun",
      // "Jul",
      "Aug",
      "Sep",
      "Oct",
      // "Nov",
      // "Dec",
    ],
    datasets: [
      {
        label: "BNPL",
        data: [65, 77, 90],
        // data: [65, 77, 90, 81, 56, 34, 40, 7, 15, 29, 111, 99],
        fill: true,
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgb(54, 162, 235)",
        pointBackgroundColor: "rgb(54, 162, 235)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgb(54, 162, 235)",
      },
      {
        label: "QH",
        data: [28, 48, 30],
        fill: true,
        backgroundColor: "rgba(255, 99, 132, 0.1)",
        borderColor: "rgb(255, 99, 132)",
        pointBackgroundColor: "rgb(255, 99, 132)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgb(255, 99, 132)",
      },
      // {
      //   label: "BNPL - SDK",
      //   data: [32, 41, 76],
      //   fill: true,
      //   backgroundColor: "rgba(43, 41, 41,0.2)",
      //   borderColor: "rgba(0,0,0)",
      //   pointBackgroundColor: "rgba(0,0,0)",
      //   pointBorderColor: "#fff",
      //   pointHoverBackgroundColor: "#fff",
      //   pointHoverBorderColor: "rgba(0,0,0)",
      // },
    ],
  };
  console.log(values);
  return (
    <div>
      <div className="valueofLoansChart" style={{ height: "185px" }}>
        <Bar
          data={data}
          getElementAtEvent={(element) => {
            setProperty(
              element.length > 0 ? values[element[0].index].data : []
            );
          }}
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
              // x: {},
              y: {
                title: {
                  display: true,
                  text: "Value",
                  color: "blue",
                },
                min: 0,
                ticks: {
                  // forces step size to be 50 units
                  // stepSize: 5,
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

export default LoansApprovedChart;
