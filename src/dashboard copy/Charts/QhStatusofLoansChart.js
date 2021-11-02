import React from "react";
import { Bar } from "react-chartjs-2";
import { useEffect, useState } from "react";
import ChartDataLabels from "chartjs-plugin-datalabels";
const QhStatusofLoansChart = ({ parentToChild }) => {
  const [data, setData] = useState(null);
  // const [property, setProperty] = useState([]);
  const [values, setValues] = useState(null);
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
        parentToChild.qardHasan != null &&
        parentToChild.qardHasan.length > 0 &&
        parentToChild.qardHasan;

      let QHarray = [];
      QHarray.push(
        parentToChild != null &&
          parentToChild.qardHasan != null &&
          parentToChild.qardHasan.dpd30
      );
      QHarray.push(
        parentToChild != null &&
          parentToChild.qardHasan != null &&
          parentToChild.qardHasan.dpd60
      );
      QHarray.push(
        parentToChild != null &&
          parentToChild.qardHasan != null &&
          parentToChild.qardHasan.dpd90
      );
      QHarray.push(
        parentToChild != null &&
          parentToChild.qardHasan != null &&
          parentToChild.qardHasan.dpd120
      );
      QHarray.push(
        parentToChild != null &&
          parentToChild.qardHasan != null &&
          parentToChild.qardHasan.latePayment
      );
      const values = QHarray;
      console.log(values);
      setValues(values);

      // setQhvalues(QhValues);
      const dataSetsBnpl = { labels: [], backgroundColor: [], data: [] };
      // const dataSetsQh = { labels: [], backgroundColor: [], data: [] };
      console.log(dataSetsBnpl);
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
              offset: 100,
            },
            label: "Count",
            backgroundColor: dataSetsBnpl.backgroundColor,
            data: dataSetsBnpl.data,
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

  const data1 = {
    labels: ["Active", "30+DPD", "60+DPD", "90+DPD", "> 90+DPD"],
    datasets: [
      {
        // label: false,
        position: "right",

        data: [15, 9, 30, 21, 7, 1],
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
        <div style={{ height: "200px", width: "400px" }}>
          <Bar
            data={data}
            plugins={[ChartDataLabels]}
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
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default QhStatusofLoansChart;
