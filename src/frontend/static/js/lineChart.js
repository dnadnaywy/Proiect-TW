var xValuesLineChart = [50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150];
var yValues = [7, 8, 8, 9, 9, 9, 10, 11, 14, 14, 15];
new Chart("lineChart", {
  type: "line",
  data: {
    labels: xValuesLineChart,
    datasets: [{
      fill: false,
      lineTension: 0,
      backgroundColor: "transparent",
      borderColor: "#7048D5", // set the border color to #7048D5
      borderWidth: 2,
      data: yValues
    }]
  },
  options: {
    legend: { display: false },
    scales: {
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: "something",
          fontColor: "white",
          rotation: -90
        },
        ticks: {
          fontColor: "white",
          min: 6,
          max: 16
        },
        gridLines: {
          color: "#454449" //y-axis grid lines
        }
      }],
      xAxes: [{
        scaleLabel: {
          display: true,
          labelString: "something",
          fontColor: "white",
          rotation: 90
        },
        ticks: {
          fontColor: "white"
        },
        gridLines: {
          color: "#454449" //x-axis grid lines
        }
      }]
    }
  },
  shadow: {
    color: "#000000",
    blur: 10,
    offsetX: 5,
    offsetY: 5,
    opacity: 0.5
  }
});