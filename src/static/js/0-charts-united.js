function displayPieChart() {
  // alert('Hello world');
  let lineChart = document.getElementById("bring-line-chart");
  lineChart.style.display = "none";

  let treemapChart = document.getElementById("bring-treemap-chart");
  treemapChart.style.display = "none";

  let pieChart = document.getElementById("bring-pie-chart");
  pieChart.style.display = "block";
}

function displayLineChart() {
  let pieChart = document.getElementById("bring-pie-chart");
  pieChart.style.display = "none";

  let treemapChart = document.getElementById("bring-treemap-chart");
  treemapChart.style.display = "none";

  let lineChart = document.getElementById("bring-line-chart");
  lineChart.style.display = "block";
}

function displayTreemapChart() {
  let pieChart = document.getElementById("bring-pie-chart");
  pieChart.style.display = "none";

  let lineChart = document.getElementById("bring-line-chart");
  lineChart.style.display = "none";
  
  let treemapChart = document.getElementById("bring-treemap-chart");
  treemapChart.style.display = "block";
}

