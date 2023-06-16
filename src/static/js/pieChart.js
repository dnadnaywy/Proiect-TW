var xValues = [];

function fetchDataXValues() {
  return new Promise((resolve, reject) => {
    fetch('http://localhost:3000/api/countAttackTypes')
      .then(response => response.json())
      .then(data => {
        const xValues = data.map(obj => obj.attack_type);
        const yValues = data.map(obj => obj.count);
        resolve(xValues);
      })
      .catch(error => {
        reject(error);
      });
  });
}

function fetchDataYValues() {
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
}

const promises = [fetchDataXValues(), fetchDataYValues()];

Promise.all(promises)
  .then(([xValues, yValues]) => {
    console.log('Resolved values:', xValues, yValues);
    console.log(xValues.length);
    const numColors = xValues.length; // Specify the desired number of colors
    const randomColorArray = generateRandomColorArray(numColors);
    pieChartDisplayer(xValues, yValues, randomColorArray);
    doughnutChartDisplayer(xValues, yValues, randomColorArray);
    // Use the resolved values as needed here
  })
  .catch(error => {
    console.error('Error:', error);
  });

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

function pieChartDisplayer(xValues, yValues, barColors) {
  new Chart("pieChart", {
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
        text: "Terrorism by Method of Attack"
      }
    }
  });
}

function doughnutChartDisplayer(xValues, yValues, barColors) {
  new Chart("doughnutChart", {
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
        text: "Terrorism by Method of Attack"
      }
    }
  });
}