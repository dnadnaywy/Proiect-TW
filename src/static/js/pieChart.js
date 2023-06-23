var xValues = [];

function getRouteByTitlePieChart(title) {
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

function fetchDataXValuesPieChart(title) {
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

function fetchDataYValuesPieChart(title) {
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

function makeActualPieChart(title) {
  const promises = [fetchDataXValuesPieChart(title), fetchDataYValuesPieChart(title)];

  Promise.all(promises)
    .then(([xValues, yValues]) => {
      console.log('Resolved values:', xValues, yValues);
      console.log(xValues.length);
      const numColors = xValues.length; // Specify the desired number of colors
      const randomColorArray = generateRandomColorArray(numColors);

      const pieChart = pieChartDisplayer(xValues, yValues, randomColorArray, title);
      const doughnutChart = doughnutChartDisplayer(xValues, yValues, randomColorArray, title);
      activeChart = [pieChart, doughnutChart];
      activeChartId = 'pieChart';
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