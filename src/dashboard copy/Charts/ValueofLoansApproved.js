import React from "react";
import { Bar } from "react-chartjs-2";
import { useEffect, useState } from "react";
import ChartDataLabels from "chartjs-plugin-datalabels";
const ValueofLoansApproved = ({ parentToChild }) => {
  const [data, setData] = useState(null);
  const [property, setProperty] = useState([]);
  const [values, setValues] = useState(null);
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
        position: "right",
        data: [12, 19, 3],
        datalabels: {
          anchor: "top",
          align: "top",
          offset: 10,
        },
        backgroundColor: [
          // "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          // "rgba(255, 206, 86, 0.2)",
          // "rgba(75, 192, 192, 0.2)",
          // "rgba(153, 102, 255, 0.2)",
          // "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          // "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          // "rgba(255, 206, 86, 1)",
          // "rgba(75, 192, 192, 1)",
          // "rgba(153, 102, 255, 1)",
          // "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
        pointBackgroundColor: "rgb(54, 162, 235)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgb(54, 162, 235)",
        // data: [12, 19, 3, 106, 24, 37, 65, 91, 83, 78, 44, 99],
      },
      {
        label: "QH",
        data: [28, 48, 30],
        fill: true,
        datalabels: {
          // anchor: "top",
          align: "top",
          offset: 30,
        },
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          // "rgba(54, 162, 235, 0.2)",
          // "rgba(255, 206, 86, 0.2)",
          // "rgba(75, 192, 192, 0.2)",
          // "rgba(153, 102, 255, 0.2)",
          // "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          // "rgba(54, 162, 235, 1)",
          // "rgba(255, 206, 86, 1)",
          // "rgba(75, 192, 192, 1)",
          // "rgba(153, 102, 255, 1)",
          // "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
      // {
      //   label: "BNPL - SDK",
      //   data: [32, 41, 76],
      //   datalabels: {
      //     anchor: "top",
      //     align: "top",
      //     offset: 20,
      //   },
      //   backgroundColor: [
      //     // "rgba(255, 99, 132, 0.2)",
      //     // "rgba(54, 162, 235, 0.2)",
      //     "rgba(0,0,0)",
      //     // "rgba(75, 192, 192, 0.2)",
      //     // "rgba(153, 102, 255, 0.2)",
      //     // "rgba(255, 159, 64, 0.2)",
      //   ],
      //   borderColor: [
      //     // "rgba(255, 99, 132, 1)",
      //     // "rgba(54, 162, 235, 1)",
      //     "rgba(0,0,0)",
      //     // "rgba(75, 192, 192, 1)",
      //     // "rgba(153, 102, 255, 1)",
      //     // "rgba(255, 159, 64, 1)",
      //   ],
      //   borderWidth: 1,
      //   pointBackgroundColor: "rgb(0,0,0)",
      //   pointBorderColor: "#fff",
      //   pointHoverBackgroundColor: "#fff",
      //   pointHoverBorderColor: "rgb(0,0,0)",
      // },
    ],
  };

  useEffect(() => {
    const fetchBankNameData = async () => {
      const values =
        parentToChild != null &&
        parentToChild.bnplApprovedLoansQuarterly != null &&
        parentToChild.bnplApprovedLoansQuarterly;
      // const values1 = parentToChild.bnplApprovedLoansQuarterly;
      // console.log(values1);
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
      console.log(dataSetsQh);

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
            // borderColor: "rgb(54, 162, 235)",
            // pointBackgroundColor: "rgb(54, 162, 235)",
            // pointBorderColor: "#fff",
            // pointHoverBackgroundColor: "#fff",
            // pointHoverBorderColor: "rgb(54, 162, 235)",
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

  return (
    <div>
      <div style={{ height: "250px", width: "400px" }}>
        <Bar
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
              anchor: "end",
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
                  // stepSize: 2,
                },
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default ValueofLoansApproved;
