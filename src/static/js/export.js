function showExportButtons() {
    document.getElementById("export-buttons-container").style.display = "flex";
}

function hideExportButtons() {
    document.getElementById("export-buttons-container").style.display = "none";
}

function exportChartToCSV(title) {
    let csvData = "data:text/csv;charset=utf-8,";
    // Add the header
    csvData += `${title}, Count\n`;

    let myChart = null;

    switch (activeChartId) {
        case "pieChart":    // Pie chart & Doughnut chart
            myChart = Chart.getChart("pieChart");
            const labels = myChart.data.labels;
            const dataset = myChart.data.datasets;
            for (let i = 0; i < labels.length; i++) {
                csvData += `${labels[i]}, ${dataset[0].data[i]}\n`;
            }
            break;
        case "canvas2":     // Treemap
            myChart = Chart.getChart("canvas2");
            myChart.data.datasets[0].tree.forEach(element => {
                csvData += `${element.key}, ${element.value}\n`;
            });
            break;
        case "line":        // Line chart
            break;
        default:
            break;
    }

    // Create a download link
    const encodedUri = encodeURI(csvData);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "chart_data.csv");
    document.body.appendChild(link);
    link.click();
}

function exportChartToPNG(title) {

}

function exportChartToSVG(title) {

}