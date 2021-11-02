import React from "react";
import { useEffect, useState } from "react";
// import { Loading } from "./Loading";
import axios from "axios";
import { Bar } from "react-chartjs-2";
// import { MDBContainer } from "mdbreact";
import "../Css/Loanperformance.css";
import DataTable from "react-data-table-component";
import { MDBContainer } from "mdbreact";
const TotalLoansDisbursed = ({ labelColor, tooltipShadow, parentToChild }) => {
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
    animation: {
      animateRotate: false,
    },
  };

  useEffect(() => {
    const fetchBankNameData = async () => {
      const values =
        parentToChild != null &&
        parentToChild.totalLoanDisbursed != null &&
        parentToChild.totalLoanDisbursed;
      // const values = result.data.totalLoanDisbursed;
      console.log(values);
      setValues(values);

      const dataSets = { labels: [], backgroundColor: [], data: [] };

      for (let i = 0; i < values.length; i++) {
        dataSets.labels.push(values[i].key);
        dataSets.data.push(values[i].counts);

        let color = getRandomColor();
        const checkColor = () => dataSets.backgroundColor.includes(color);
        while (checkColor()) {
          color = getRandomColor();
        }
        dataSets.backgroundColor.push(color);
      }
      console.log(dataSets);
      function getRandomColor() {
        let letters = "0123456789ABCDEF";
        let color = "#";

        for (let i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      }
      console.log(dataSets);
      const data = {
        labels: dataSets.labels,
        datasets: [
          {
            label: false,
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
      name: " LOAN ID",
      selector: "_id",
      sortable: true,
      format: (row) => {
        return row._id;
      },
      wrap: true,
    },
    {
      name: "Loan Amount",
      selector: "loanAmount",
      sortable: true,
      format: (row) => {
        return row.loanAmount;
      },
      wrap: true,
    },
    {
      name: "Tenure",
      selector: "tenure",
      sortable: true,
      format: (row) => {
        return row.tenure;
      },
      wrap: true,
    },
    {
      name: "EMI Amount",
      selector: "emiAmount",
      sortable: true,
      format: (row) => {
        return row.emiAmount;
      },
      wrap: true,
    },
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
        color: "blue",
        "&:hover": {
          cursor: "pointer",
        },
      },
    },
  ];
  return (
    <div>
      {/* <div className="pie-header" style={{ height: "350px" }}>
        {data && (
          <Bar
            getElementAtEvent={(element) => {
              setProperty(element.length > 0 ? values : []);
            }}
            data={data}
            options={options}
            height={350}
          />
        )}
      </div> */}
      <MDBContainer>
        {/* <h3 className="mt-5">Line chart</h3> */}
        <Bar
          data={data}
          getElementAtEvent={(element) => {
            setProperty(
              element.length > 0 ? values[element[0].index].data : []
            );
          }}
          options={{
            responsive: true,
            plugins: {
              title: {
                display: true,
              },
              legend: {
                display: false,
                position: "right",
              },
            },
          }}
        />
      </MDBContainer>
      {/* {console.log(values)} */}
      <div className="PieChart-Table">
        <DataTable
          noHeader
          // pagination
          // paginationServer
          className="react-dataTable"
          columns={serverSideColumns}
          pagination={true}
          paginationPerpage={5}
          conditionalRowStyles={conditionalRowStyles}
          data={dataToRender()}
        />
      </div>
    </div>
  );
};

export default TotalLoansDisbursed;
