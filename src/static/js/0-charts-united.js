let activeChart = null;
let activeChartId = null;

function displayTreemapChart(title) {
  if (activeChart) {
    hideExportButtons();
    activeChart.forEach(element => {
      element.destroy();
    });
  }

  const chartTitle = document.getElementById("chart-title-in-page");
  chartTitle.innerText = `Treemap chart for ${title}`;

  document.getElementById("bring-pie-chart").style.display = "none";
  document.getElementById("bring-line-chart").style.display = "none";
  document.getElementById("bring-treemap-chart").style.display = "block";

  showExportButtons();

  makeActualTreemap(title);
}

function displayLineChart(title) {
  if (activeChart) {
    hideExportButtons();
    activeChart.forEach(element => {
      element.destroy();
    });
  }

  const chartTitle = document.getElementById("chart-title-in-page");
  chartTitle.innerText = `Line chart for ${title}`;

  document.getElementById("bring-pie-chart").style.display = "none";
  document.getElementById("bring-line-chart").style.display = "block";
  document.getElementById("bring-treemap-chart").style.display = "none";

  showExportButtons();

  makeActualLineChart(title);
}

function displayPieChart(title) {
  if (activeChart) {
    hideExportButtons();
    activeChart.forEach(element => {
      element.destroy();
    });
  }

  const chartTitle = document.getElementById("chart-title-in-page");
  chartTitle.innerText = `Pie chart for ${title}`;

  document.getElementById("bring-pie-chart").style.display = "block";
  document.getElementById("bring-line-chart").style.display = "none";
  document.getElementById("bring-treemap-chart").style.display = "none";

  showExportButtons();
  
  makeActualPieChart(title);
}
