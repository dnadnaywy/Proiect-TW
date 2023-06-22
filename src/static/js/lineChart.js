function fetchDataXValues(title) {
  if (title === 'Method of Attack') {
    return new Promise((resolve, reject) => {
      fetch('http://localhost:3000/api/countAttackTypes')
        .then(response => response.json())
        .then(data => {
          const xValues = data.map(obj => obj.attack_type);
          resolve(xValues);
        })
        .catch(error => {
          reject(error);
        });
    });
  } else if (title === 'Terrorist Groups') {
    return new Promise((resolve, reject) => {
      fetch('http://localhost:3000/api/pie/group_name')
        .then(response => response.json())
        .then(data => {
          const xValues = data.map(obj => obj.group_name);
          resolve(xValues);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
}

function fetchDataYValues(title) {
  if (title === 'Method of Attack') {
    return new Promise((resolve, reject) => {
      fetch('http://localhost:3000/api/countAttackTypes')
        .then(response => response.json())
        .then(data => {
          const yValues = data.map(obj => obj.count);
          resolve(yValues);
        })
        .catch(error => {
          reject(error);
        });
    });
  } else if (title === 'Terrorist Groups') {
    return new Promise((resolve, reject) => {
      fetch('http://localhost:3000/api/pie/group_name')
        .then(response => response.json())
        .then(data => {
          const yValues = data.map(obj => obj.count);
          resolve(yValues);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
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

  activeChart = [lineChart];
}

function makeActualLineChart(title) {
  const promises = [fetchDataXValues(title), fetchDataYValues(title)];

  Promise.all(promises)
    .then(([xValues, yValues]) => {
      lineChartDisplayer(xValues, yValues, title);
      activeChartId = 'lineChart';
    })
    .catch(error => {
      console.error('Error:', error);
    });
}