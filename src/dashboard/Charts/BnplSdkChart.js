import React from "react";
import { Bar } from "react-chartjs-2";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import ChartDataLabels from "chartjs-plugin-datalabels";
const BnplSdkChart = ({ parentToChild }) => {
  const [data, setData] = useState(null);
  const [property, setProperty] = useState([]);
  const [values, setValues] = useState(null);
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
      // console.log(values);
      setValues(values);

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
      name: "Education Level",
      selector: "dob",
      sortable: true,
      format: (row) => {
        return row.educationLevel;
      },
      wrap: true,
    },
    {
      name: "Age",
      selector: "dob",
      sortable: true,
      format: (row) => {
        var d = row.dob;
        var dob = new Date(d);
        //calculate month difference from current date in time
        var month_diff = Date.now() - dob.getTime();

        //convert the calculated difference in date format
        var age_dt = new Date(month_diff);

        //extract year from date
        var year = age_dt.getUTCFullYear();

        //now calculate the age of the user
        var age = Math.abs(year - 1970);
        return age;
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
        color: "blue",
        "&:hover": {
          cursor: "pointer",
        },
      },
    },
  ];

  const data1 = {
    labels: ["Active", "30+DPD", "60+DPD", "90+DPD", "> 90+DPD"],
    datasets: [
      {
        // label: false,
        datalabels: {
          // anchor: "top",
          align: "right",
          offset: 100,
        },
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
        <div style={{ height: "200px", width: "300px" }}>
          <Bar
            getElementAtEvent={(element) => {
              setProperty(
                element.length > 0 ? values[element[0].index].data : []
              );
            }}
            data={data1}
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
              scales: {
                yAxes: [{ ticks: { mirror: true } }],
              },
            }}
          />
        </div>
      </div>
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

export default BnplSdkChart;
