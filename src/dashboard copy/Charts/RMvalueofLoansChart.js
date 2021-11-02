import React from "react";
import { Bar } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
const RMvalueofLoansChart = () => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    responsiveAnimationDuration: 500,
    plugins: {
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.label}: ${Math.round(tooltipItem.raw)}%`;
          },
        },
      },
      legend: {
        display: false,
        position: "right",
      },
      datalabels: {
        formatter: (value, ctx) => {
          return `${ctx.chart.data.data[ctx.dataIndex]}%`;
        },
        fontSize: "10px",
        color: "#fff",
        backgroundColor: "#404040",
      },
      // title: {
      //   display: true,
      //   text: "Interviewers",
      // },
      legend: {
        display: true,
        position: "right",
        labels: {
          fontSize: 10,
        },
      },
    },
  };
  const dataSets = {
    count: [12, 19, 3],
  };
  const data = {
    labels: ["1-4", "5-7", "8-10"],
    count: dataSets.count,
    datasets: [
      {
        datalabels: {
          // anchor: "top",
          align: "top",
          offset: 50,
        },
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
      <div style={{ height: "150px", width: "300px" }}>
        <Bar
          data={data}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            responsiveAnimationDuration: 500,
            plugins: {
              tooltip: {
                callbacks: {
                  label: function (tooltipItem) {
                    return `${tooltipItem.label}: ${Math.round(
                      tooltipItem.raw
                    )}%`;
                  },
                },
              },
              datalabels: {
                formatter: (value, ctx) => {
                  return `RM${ctx.chart.data.count[ctx.dataIndex]}`;
                },
                fontSize: "10px",
                color: "#fff",
                backgroundColor: "#404040",
              },
              legend: {
                display: false,
                position: "right",
              },
            },
          }}
          plugins={[ChartDataLabels]}
        />
      </div>
    </div>
  );
};

export default RMvalueofLoansChart;
