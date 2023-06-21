var xValues = [];

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

function makeActualPieChart(title) {
  const promises = [fetchDataXValues(title), fetchDataYValues(title)];

  Promise.all(promises)
    .then(([xValues, yValues]) => {
      console.log('Resolved values:', xValues, yValues);
      console.log(xValues.length);
      const numColors = xValues.length; // Specify the desired number of colors
      const randomColorArray = generateRandomColorArray(numColors);

      const pieChart = pieChartDisplayer(xValues, yValues, randomColorArray, title);
      const doughnutChart = doughnutChartDisplayer(xValues, yValues, randomColorArray, title);
      activeChart = [pieChart, doughnutChart];
      // Use the resolved values as needed here
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

//for generating a random array with random colours
function generateRandomHexColor() {
  const randomColor = Math.floor(Math.random() * 16777215).toString(16); // Generate a random number and convert it to hex
  return "#" + randomColor.padStart(6, "0"); // Ensure the hex code is 6 digits long
}

function generateRandomColorArray(numColors) {
  const colorArray = [];
  for (let i = 0; i < numColors; i++) {
    const randomColor = generateRandomHexColor();
    colorArray.push(randomColor);
  }
  return colorArray;
}

function pieChartDisplayer(xValues, yValues, barColors, title) {
  return new Chart("pieChart", {
    type: "pie",
    data: {
      labels: xValues,
      datasets: [{
        backgroundColor: barColors,
        data: yValues
      }]
    },
    options: {
      title: {
        display: true,
        text: "Terrorism by " + title
      }
    }
  });
}

function doughnutChartDisplayer(xValues, yValues, barColors, title) {
  return new Chart("doughnutChart", {
    type: "doughnut",
    data: {
      labels: xValues,
      datasets: [{
        backgroundColor: barColors,
        data: yValues
      }]
    },
    options: {
      title: {
        display: true,
        text: "Terrorism by " + title
      }
    }
  });
}