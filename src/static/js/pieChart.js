var xValues = ["Bombing/Explosion", "Armed Assault", "Assassination", "Kidnapping", "Others"];
var yValues = [55, 49, 44, 24, 15];
var barColors = [
  "#23b5d3",
  "#4B3F72",
  "#EFE9F4",
  "#141B41",
  "#306BAC"
];

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