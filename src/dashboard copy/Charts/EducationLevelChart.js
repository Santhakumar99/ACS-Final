import React from "react";
import { Pie } from "react-chartjs-2";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import ChartDataLabels from "chartjs-plugin-datalabels";
export const EducationLevelChart = ({ parentToChild }) => {
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
      const values =
        parentToChild != null &&
        parentToChild.byEducationalLevel != null &&
        parentToChild.byEducationalLevel;
      // const values = result.byLocation;
      setValues(values);

      const dataSets = {
        labels: [],
        backgroundColor: [],
        data: [],
        percentage: [],
      };

      for (let i = 0; i < values.length; i++) {
        dataSets.labels.push(values[i].key);
        dataSets.data.push(values[i].count);
        dataSets.percentage.push(values[i].percentage);
        console.log(dataSets.percentage);
        // dataSets.percentage = dataSets.percentage.map((a) => a.toFixed(0));
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
        percentage: dataSets.percentage,
        datasets: [
          {
            datalabels: {
              // anchor: "top",
              align: "right",
            },
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

  return (
    <div>
      <div>
        <Pie
          getElementAtEvent={(element) => {
            setProperty(
              element.length > 0 ? values[element[0].index].data : []
            );
          }}
          plugins={[ChartDataLabels]}
          data={data}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            responsiveAnimationDuration: 500,
            plugins: {
              tooltip: {
                // callbacks: {
                //   label: function (tooltipItem) {
                //     return `${tooltipItem.label}: ${Math.round(
                //       tooltipItem.raw
                //     )}%`;
                //   },
                // },
              },
              datalabels: {
                formatter: (value, ctx) => {
                  return `${ctx.chart.data.percentage[ctx.dataIndex]}%`;
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
          }}
        />
      </div>
      {/* <div className="PieChart-Table">
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
      </div> */}
    </div>
  );
};
