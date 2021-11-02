import React from "react";
import { Bar } from "react-chartjs-2";
import { useEffect, useState } from "react";
import ChartDataLabels from "chartjs-plugin-datalabels";
const AcsScoreChart = ({ parentToChild }) => {
  const [values, setValues] = useState(null);
  const [data, setData] = useState(null);
  const [property, setProperty] = useState([]);
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    responsiveAnimationDuration: 500,
    plugins: {
      title: {
        display: true,
      },
      legend: {
        display: false,
        position: "right",
      },
    },
    indexAxis: "y",
  };
  const data1 = {
    labels: ["8-10", "5-7", "1-4"],
    datasets: [
      {
        datalabels: {
          // anchor: "top",

          align: "right",
          offset: 120,
        },
        // label: false,
        position: "right",
        data: [12, 19, 3],
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

  useEffect(() => {
    const fetchBankNameData = async () => {
      const values =
        parentToChild != null &&
        parentToChild.borrowersByACSScore != null &&
        parentToChild.borrowersByACSScore;

      setValues(values);

      const dataSets = { labels: [], backgroundColor: [], data: [] };

      for (let i = 0; i < values.length; i++) {
        dataSets.labels.push(values[i].acsScore);
        dataSets.data.push(values[i].count);

        let color = getRandomColor();
        const checkColor = () => dataSets.backgroundColor.includes(color);
        while (checkColor()) {
          color = getRandomColor();
        }
        dataSets.backgroundColor.push(color);
      }
      console.log(dataSets);
      console.log(dataSets.data);
      let x = dataSets.data.pop();
      console.log(x);
      dataSets.data.unshift(x);
      console.log(dataSets.data);
      let y = dataSets.data.pop();
      console.log(y);
      dataSets.data.unshift(y);
      console.log(dataSets.data);

      function getRandomColor() {
        let letters = "0123456789ABCDEF";
        let color = "#";

        for (let i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      }

      const data = {
        labels: ["8-10", "5-7", "1-4"],
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
  return (
    <div>
      <div>
        <div style={{ height: "220px" }}>
          <Bar data={data} options={options} plugins={[ChartDataLabels]} />
        </div>
      </div>
    </div>
  );
};

export default AcsScoreChart;
