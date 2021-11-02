import React from "react";
import { useEffect, useState } from "react";
// import { Loading } from "./Loading";
import axios from "axios";
import { Pie } from "react-chartjs-2";
// import { MDBContainer } from "mdbreact";
import "../Css/Loanperformance.css";
import DataTable from "react-data-table-component";
import ChartDataLabels from "chartjs-plugin-datalabels";
const ByGenderChart = ({ labelColor, tooltipShadow, parentToChild }) => {
  const [values, setValues] = useState(null);
  const [data, setData] = useState(null);
  const [property, setProperty] = useState([]);
  //   const [property, setProperty] = useState([]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    responsiveAnimationDuration: 500,

    legend: {
      display: true,
      position: "right",
      labels: {
        usePointStyle: true,
        padding: 25,
        boxWidth: 9,
        fontColor: labelColor,
      },
    },
    layout: {
      padding: {
        top: -5,
        bottom: -45,
      },
    },
    plugins: {
      title: {
        display: true,
      },
      legend: {
        display: true,
        position: "right",
      },
    },
    tooltips: {
      // Updated default tooltip UI
      shadowOffsetX: 1,
      shadowOffsetY: 1,
      shadowBlur: 8,
      shadowColor: tooltipShadow,
      backgroundColor: "#fff",
      titleFontColor: "#000",
      bodyFontColor: "#000",
      callbacks: {
        label: function (tooltipItem) {
          const value = values[tooltipItem.index];
          return `${value.cityName}: ${value.count}%`;
        },
      },
    },
    // scale: {
    //   scaleShowLine: true,
    //   scaleLineWidth: 1,
    //   ticks: {
    //     display: false,
    //     fontColor: labelColor,
    //   },
    //   reverse: false,
    //   gridLines: {
    //     display: false,
    //   },
    // },

    // scales: {
    //   x: {
    //     title: {
    //       display: true,
    //       text: "Location",
    //     },
    //   },
    //   y: {
    //     title: {
    //       display: true,
    //       text: "Count",
    //     },
    //     min: 0,
    //     max: 10,
    //     ticks: {
    //       // forces step size to be 50 units
    //       stepSize: 1,
    //     },
    //   },
    // },
    animation: {
      animateRotate: false,
    },
  };

  useEffect(() => {
    const fetchBankNameData = async () => {
      const values =
        parentToChild != null &&
        parentToChild.byGender != null &&
        parentToChild.byGender;

      setValues(values);

      const dataSets = { labels: [], backgroundColor: [], data: [] };

      for (let i = 0; i < values.length; i++) {
        dataSets.labels.push(values[i].gender);
        dataSets.data.push(values[i].count);

        let color = getRandomColor();
        const checkColor = () => dataSets.backgroundColor.includes(color);
        while (checkColor()) {
          color = getRandomColor();
        }
        dataSets.backgroundColor.push(color);
      }
      // console.log(dataSets);
      function getRandomColor() {
        let letters = "0123456789ABCDEF";
        let color = "#";

        for (let i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      }

      const data = {
        labels: dataSets.labels,
        datasets: [
          {
            label: "Count",
            backgroundColor: dataSets.backgroundColor,
            data: dataSets.data,
            borderWidth: 0,
          },
        ],
      };

      setData(data);
      // } catch (error) {
      //   console.log(error);
      // }
    };
    fetchBankNameData();
  }, [parentToChild]);

  const serverSideColumns = [
    {
      name: "Name",
      selector: "firstname",
      sortable: true,
      format: (row) => {
        return row.firstName;
      },
      wrap: true,
    },
    {
      name: "Mobile",
      selector: "mobile",
      sortable: true,
      format: (row) => {
        return row.mobile;
      },
      wrap: true,
    },
    {
      name: "Gender",
      selector: "gender",
      sortable: true,
      format: (row) => {
        return row.gender;
      },
      wrap: true,
    },

    // {
    //   name: "Count",
    //   selector: "count",
    //   sortable: true,
    //   format: (row) => {
    //     return row.count;
    //   },
    //   wrap: true,
    // },
  ];

  const dataToRender = () => {
    const filters = {
      q: "",
    };

    const isFiltered = Object.keys(filters).some(function (k) {
      return filters[k].length > 0;
    });
    // console.log(property);
    if (property.length > 0) {
      return property;
    } else if (property.length === 0 && isFiltered) {
      return [];
    } else {
      return property.slice();
    }
  };
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
      <div style={{ height: "300px", width: "400px" }}>
        {data && (
          <Pie
            getElementAtEvent={(element) => {
              setProperty(
                element.length > 0 ? values[element[0].index].data : []
              );
            }}
            data={data}
            // options={options}
            // height={350}
            plugins={[ChartDataLabels]}
          />
        )}
      </div>
      {/* {console.log(values)} */}
      <div className="PieChart-Table">
        <DataTable
          noHeader
          // pagination
          // paginationServer
          className="react-dataTable"
          columns={serverSideColumns}
          pagination={true}
          paginationPerpage={10}
          conditionalRowStyles={conditionalRowStyles}
          data={dataToRender()}
        />
      </div>
    </div>
  );
};

export default ByGenderChart;
