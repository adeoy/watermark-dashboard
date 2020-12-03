import React from "react";
import { Line } from "@reactchartjs/react-chart.js";
import moment from "moment";

const MainChart = ({ sales, form }) => {
  const salesInMonth = [];
  for (let i = 1; i < form.monthLastDay + 1; i++) {
    salesInMonth.push([]);
  }

  const onlySalesThisMonth = [];
  sales.forEach((sale) => {
    const year = moment(sale.date).format("YYYY");
    const month = moment(sale.date).format("M");
    const yearMonth = `${year}-${month}`;

    if (yearMonth === form.yearMonth) {
      onlySalesThisMonth.push(sale);
    }
  });

  onlySalesThisMonth.forEach((sale) => {
    const dayOfMonth = moment(sale.date).date();

    for (let i = 1; i < form.monthLastDay + 1; i++) {
      if (dayOfMonth === i) {
        salesInMonth[i - 1].push(sale);
        break;
      }
    }
  });

  const generateDatasets = (label, showValue, backgroundColor, borderColor) => {
    const data = [];
    for (let i = 0; i < salesInMonth.length; i++) {
      if (salesInMonth[i].length > 0) {
        data.push(
          salesInMonth[i].reduce((acc, item) => acc + item[showValue], 0)
        );
      } else {
        data.push(0);
      }
    }

    return {
      label,
      fill: "start",
      data,
      backgroundColor,
      borderColor,
      pointBackgroundColor: "#ffffff",
      pointHoverBackgroundColor: borderColor,
      borderWidth: 1.5,
      pointRadius: 0,
      pointHoverRadius: 3,
    };
  };

  const chartData = {
    labels: Array.from(new Array(form.monthLastDay + 1), (_, i) => i + 1),
    datasets: [
      generateDatasets(
        "Ventas",
        "total_cost",
        "rgba(0,123,255,0.1)",
        "rgb(0,123,255)"
      ),
      generateDatasets(
        "Garrafones",
        "units",
        "rgba(0, 184, 216, 0.1)",
        "rgb(0, 184, 216)"
      ),
      generateDatasets(
        "Comisiones",
        "comision",
        "rgba(23,198,113,0.1)",
        "rgb(23,198,113)"
      ),
      generateDatasets(
        "Cargo por gasolina",
        "gas_charge",
        "rgba(255,180,0,0.1)",
        "rgb(255,180,0)"
      ),
      generateDatasets(
        "Promociones",
        "offer_discount",
        "rgba(255,65,105,0.1)",
        "rgb(255,65,105)"
      ),
    ],
  };

  const chartOptions = {
    responsive: true,
    legend: {
      position: "top",
    },
    elements: {
      line: {
        // A higher value makes the line look skewed at this ratio.
        tension: 0.3,
      },
      point: {
        radius: 0,
      },
    },
    scales: {
      xAxes: [
        {
          gridLines: false,
          ticks: {
            callback(tick, index) {
              // Jump every 7 values on the X axis labels to avoid clutter.
              return index % 7 !== 0 ? "" : tick;
            },
          },
        },
      ],
      yAxes: [
        {
          ticks: {
            suggestedMax: 45,
            callback(tick) {
              if (tick === 0) {
                return tick;
              }
              // Format the amounts using Ks for thousands.
              return tick > 999 ? `${(tick / 1000).toFixed(1)}K` : tick;
            },
          },
        },
      ],
    },
    hover: {
      mode: "nearest",
      intersect: false,
    },
    tooltips: {
      custom: false,
      mode: "nearest",
      intersect: false,
    },
  };

  return (
    <div>
      <Line data={chartData} options={chartOptions} />
    </div>
  );
};

export default MainChart;
