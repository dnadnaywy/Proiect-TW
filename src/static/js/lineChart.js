function getRouteByTitleLineChart(title) {
  let route = 'http://localhost:3000';
  switch (title) {
    case 'Country':
      route += '/api/pie/country';
      break;
    case 'Region':
      route += '/api/pie/region';
      break;
    case 'Method of Attack':
      route += '/api/pie/attack_type';
      break;
    case 'Target':
      route += '/api/pie/target';
      break;
    case 'Terrorist Groups':
      route += '/api/pie/group_name';
      break;
    case 'Weapons':
      route += '/api/pie/weapon_type';
      break;
    case 'Deaths':
      route += '/api/pie/nkill';
      break;
    case 'Deaths (USA)':
      route += '/api/pie/nkill_us';
      break;
    default:
      route += '/not-found';
      break;
  }

  return route;
}

function fetchDataXValuesLineChart(title) {
  return new Promise((resolve, reject) => {
    fetch(getRouteByTitlePieChart(title))
      .then(response => response.json())
      .then(data => {
        const xValues = data.map(obj => obj.key);
        resolve(xValues);
      })
      .catch(error => {
        reject(error);
      });
  });
}

function fetchDataYValuesLineChart(title) {
  return new Promise((resolve, reject) => {
    fetch(getRouteByTitlePieChart(title))
      .then(response => response.json())
      .then(data => {
        const yValues = data.map(obj => obj.value);
        resolve(yValues);
      })
      .catch(error => {
        reject(error);
      });
  });
}

function lineChartDisplayer(xValuesLineChart, yValuesLineChart, title) {
  const lineChart = new Chart("lineChart", {
    type: "line",
    data: {
      labels: xValuesLineChart,
      datasets: [{
        fill: false,
        tension: 0,
        backgroundColor: "transparent",
        borderColor: "#7048D5",
        borderWidth: 2,
        data: yValuesLineChart,
        label: "Number of Incidents"
      }]
    },
    options: {
      plugins: {
        legend: {
          display: false
        },
      },
      scales: {
        y: {
          title: {
            display: true,
            text: "Number of Incidents",
            color: "white",
            font: {
              size: 14
            },
            padding: {
              top: 10,
              bottom: 0
            }
          },
          ticks: {
            color: "white",
            min: 6,
            max: 16
          },
          grid: {
            color: "#454449"
          }
        },
        x: {
          title: {
            display: true,
            text: title,
            color: "white",
            font: {
              size: 14
            },
            padding: {
              top: 10,
              bottom: 0
            }
          },
          ticks: {
            color: "white"
          },
          grid: {
            color: "#454449"
          }
        }
      },
      plugins: {
        shadow: {
          color: "#000000",
          blur: 10,
          offset: {
            x: 5,
            y: 5
          },
          opacity: 0.5
        }
      }
    }
  });

  return lineChart;
}

function makeActualLineChart(title) {
  const promises = [fetchDataXValuesLineChart(title), fetchDataYValuesLineChart(title)];

  Promise.all(promises)
    .then(([xValues, yValues]) => {
      const lineChart = lineChartDisplayer(xValues, yValues, title);
      activeChart = [lineChart];
      activeChartId = 'lineChart';
    })
    .catch(error => {
      console.error('Error:', error);
    });
}