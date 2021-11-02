import React from "react";
import { Bar } from "react-chartjs-2";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import ChartDataLabels from "chartjs-plugin-datalabels";
const StatusofLoansChart = ({ parentToChild }) => {
  const [data, setData] = useState(null);
  const [property, setProperty] = useState([]);
  const [values, setValues] = useState(null);
  const [tableValues, setTableValues] = useState();
  // const [Qhvalues, setQhvalues] = useState(null);

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
    indexAxis: "y",
  };

  useEffect(() => {
    const fetchBankNameData = async () => {
      const value =
        parentToChild != null &&
        parentToChild.bnpl != null &&
        parentToChild.bnpl.length > 0 &&
        parentToChild.bnpl;

      let QHarray = [];
      QHarray.push(
        parentToChild != null &&
          parentToChild.bnpl != null &&
          parentToChild.bnpl.dpd30
      );
      QHarray.push(
        parentToChild != null &&
          parentToChild.bnpl != null &&
          parentToChild.bnpl.dpd60
      );
      QHarray.push(
        parentToChild != null &&
          parentToChild.bnpl != null &&
          parentToChild.bnpl.dpd90
      );
      QHarray.push(
        parentToChild != null &&
          parentToChild.bnpl != null &&
          parentToChild.bnpl.dpd120
      );
      QHarray.push(
        parentToChild != null &&
          parentToChild.bnpl != null &&
          parentToChild.bnpl.latePayment
      );
      const values = QHarray;
      console.log(values);
      setValues(values);
      setTableValues(values);
      // setQhvalues(QhValues);
      const dataSetsBnpl = { labels: [], backgroundColor: [], data: [] };
      // const dataSetsQh = { labels: [], backgroundColor: [], data: [] };
      // console.log(dataSetsBnpl);
      for (let i = 0; i < values.length; i++) {
        // dataSetsBnpl.labels.push(values[i].cityName);
        dataSetsBnpl != null &&
          dataSetsBnpl.data != null &&
          dataSetsBnpl.data.push(values[i].count);
        dataSetsBnpl.labels.push(values[i].key);
        // console.log(dataSetsBnpl.data);
        let color = getRandomColor();
        const checkColor = () => dataSetsBnpl.backgroundColor.includes(color);
        while (checkColor()) {
          color = getRandomColor();
        }
        dataSetsBnpl.backgroundColor.push(color);
      }
      // console.log(dataSetsBnpl.data);
      let x = dataSetsBnpl.data.pop();
      // console.log(x);
      // console.log(dataSetsBnpl.data);
      dataSetsBnpl.data.unshift(x);
      // console.log(dataSetsBnpl.data);

      function getRandomColor() {
        let letters = "0123456789ABCDEF";
        let color = "#";

        for (let i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      }
      const data = {
        labels: ["Late Payment", "30+DPD", "60+DPD", "90+DPD", "120+DPD"],
        // labels: dataSetsBnpl.labels,

        datasets: [
          {
            datalabels: {
              // anchor: "top",
              align: "right",
              offset: 50,
            },
            label: "Count",
            fill: true,
            backgroundColor: ["rgba(54, 162, 235, 0.5)"],
            borderColor: ["rgba(54, 162, 235, 1)"],
            borderWidth: 1,
            pointBackgroundColor: "rgb(54, 162, 235)",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgb(54, 162, 235)",
            data: dataSetsBnpl.data,
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
      name: "Category",
      selector: "key",
      sortable: true,
      format: (row) => {
        return row.key;
      },
      wrap: true,
    },

    {
      name: "Number of Loans",
      selector: "count",
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
        fontSize: "10px",
      },
    },
  ];
  const customStyles = {
    rows: {
      style: {
        // backgroundColor: 'green',
        border: "1px black",
        color: "blue",
        "&:hover": {
          cursor: "pointer",
        },
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

  //

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
  const data1 = {
    labels: ["Active", "30+DPD", "60+DPD", "90+DPD", "> 90+DPD"],
    datasets: [
      {
        datalabels: {
          // anchor: "top",

          align: "right",
          offset: 50,
        },
        // label: false,
        position: "right",
        data: [12, 19, 3, 21, 9, 11],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <div>
      <div>
        <div style={{ height: "200px" }}>
          <Bar
            getElementAtEvent={(element) => {
              setProperty(
                element.length > 0 ? tableValues[element[0].index].data : []
              );
            }}
            // plugins={[ChartDataLabels]}
            data={data}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              responsiveAnimationDuration: 500,
              indexAxis: "y",

              plugins: {
                title: {
                  display: true,
                },
                legend: {
                  display: false,
                  position: "right",
                },
              },
              scales: {
                yAxes: [{ ticks: { mirror: true } }],
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
            data={tableValues}
          />
        </div>
      </div>
    </div>
  );
};

export default StatusofLoansChart;
