import React from "react";
import { Line } from "react-chartjs-2";
import { useEffect, useState } from "react";
import { Chart } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
const LoansApprovedChart = ({ parentToChild }) => {
  const [data, setData] = useState(null);
  const [values, setValues] = useState(null);
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
      const values =
        parentToChild != null &&
        parentToChild.bnplApprovedLoansQuarterly != null &&
        parentToChild.bnplApprovedLoansQuarterly;
      const values1 = parentToChild.bnplApprovedLoansQuarterly;
      console.log(values1);
      setValues(values);

      const QhValues =
        parentToChild != null &&
        parentToChild.qardHasanApprovedLoansQuarterly != null &&
        parentToChild.qardHasanApprovedLoansQuarterly;

      setQhvalues(QhValues);
      const dataSetsBnpl = { labels: [], backgroundColor: [], data: [] };
      const dataSetsQh = { labels: [], backgroundColor: [], data: [] };

      for (let i = 0; i < values.length; i++) {
        // dataSetsBnpl.labels.push(values[i].cityName);
        dataSetsBnpl != null &&
          dataSetsBnpl.data != null &&
          dataSetsBnpl.data.push(values[i].counts);
        console.log(dataSetsBnpl);
        let color = getRandomColor();
        const checkColor = () => dataSetsBnpl.backgroundColor.includes(color);
        while (checkColor()) {
          color = getRandomColor();
        }
        dataSetsBnpl.backgroundColor.push(color);
      }

      for (let i = 0; i < QhValues.length; i++) {
        // dataSetsQh.labels.push(QhValues[i].cityName);
        dataSetsQh.data.push(QhValues[i].counts);

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
        labels: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        datasets: [
          {
            label: "Count",
            backgroundColor: dataSetsBnpl.backgroundColor,
            data: dataSetsBnpl.data,
            borderWidth: 0,
          },
          {
            label: "My Second Dataset",
            data: dataSetsQh.data,
            fill: true,
            backgroundColor: dataSetsBnpl.backgroundColor,
          },
          {
            label: "My Second Dataset",
            data: dataSetsQh.data,
            fill: true,
            backgroundColor: dataSetsBnpl.backgroundColor,
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

  return (
    <div>
      <div
        className="valueofLoansChart"
        style={{ height: "250px", width: "350px" }}
      >
        <Line
          data={data1}
          plugins={[ChartDataLabels]}
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
              x: {
                title: {
                  display: true,
                  text: "Months",
                  color: "blue",
                },
              },
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
    </div>
  );
};

export default LoansApprovedChart;
