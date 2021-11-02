import React from "react";
import { Bar } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
const AcsScoreChart = () => {
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
  const data = {
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
  return (
    <div>
      <div>
        <div style={{ height: "150px", width: "300px" }}>
          <Bar data={data} options={options} plugins={[ChartDataLabels]} />
        </div>
      </div>
    </div>
  );
};

export default AcsScoreChart;
