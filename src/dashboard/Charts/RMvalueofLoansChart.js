import React from "react";
import { Bar } from "react-chartjs-2";
import { useEffect, useState } from "react";
import ChartDataLabels from "chartjs-plugin-datalabels";
import DataTable from "react-data-table-component";
const RMvalueofLoansChart = ({ parentToChild }) => {
  const [values, setValues] = useState();
  const [data, setData] = useState(null);
  const [property, setProperty] = useState([]);

  useEffect(() => {
    const fetchBankNameData = async () => {
      const values =
        parentToChild != null &&
        parentToChild.loansByACSScore != null &&
        parentToChild.loansByACSScore;
      setValues(values);
      const dataSets = {
        labels: [],
        backgroundColor: [],
        data: [],
        percentage: [],
      };

      for (let i = 0; i < values.length; i++) {
        dataSets.labels.push(values[i].acsScore);
        dataSets.data.push(values[i].count);
        // dataSets.percentage.push(values[i].percentage);
        let color = getRandomColor();
        const checkColor = () => dataSets.backgroundColor.includes(color);
        while (checkColor()) {
          color = getRandomColor();
        }
        dataSets.backgroundColor.push(color);
      }
      // console.log(dataSets.percentage);
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
        percentage: dataSets.percentage,
        datasets: [
          {
            // datalabels: {
            //   // anchor: "top",
            //   align: "center",
            //   offset: 50,
            // },
            label: "Count",
            backgroundColor: dataSets.backgroundColor,
            data: dataSets.data,
            borderWidth: 0,
          },
        ],
      };
      setData(data);
      console.log(data);
    };
    fetchBankNameData();
  }, [parentToChild]);

  const serverSideColumns = [
    {
      name: "Acs score",
      selector: "ACS score",
      sortable: true,
      format: (row) => {
        return row.acsScore;
      },
      wrap: true,
    },

    {
      name: "Count",
      selector: "count",
      sortable: true,
      format: (row) => {
        return row.count;
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
        color: "blueviolet",
        "&:hover": {
          cursor: "pointer",
        },
      },
    },
  ];
  const customStyles = {
    rows: {
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
    headCells: {
      style: {
        background: "#0984e1",
        fontWeight: "700",
        color: "white",
        fontSize: "10px",
      },
    },
  };
  return (
    <div>
      <div style={{ height: "200px" }}>
        <Bar
          // getElementAtEvent={(element) => {
          //   setProperty(
          //     element.length > 0 ? values[element[0].index].data : []
          //   );
          // }}
          //
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
                    )}`;
                  },
                },
              },

              // datalabels: {
              //   formatter: (value, ctx) => {
              //     return `RM${ctx.chart.data.count[ctx.dataIndex]}`;
              //   },
              //   fontSize: "10px",
              //   color: "#fff",
              //   backgroundColor: "#404040",
              // },
              legend: {
                display: false,
                position: "right",
              },
            },
          }}
          // plugins={[ChartDataLabels]}
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
          data={values}
        />
        {console.log(values)}
      </div>
    </div>
  );
};

export default RMvalueofLoansChart;
