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
            {
                myChart = Chart.getChart("pieChart");
                const labels = myChart.data.labels;
                const dataset = myChart.data.datasets;
                for (let i = 0; i < labels.length; i++) {
                    csvData += `${labels[i]}, ${dataset[0].data[i]}\n`;
                }
                break;
            }
        case "treemap":     // Treemap
            {
                myChart = Chart.getChart("treemap");
                myChart.data.datasets[0].tree.forEach(element => {
                    csvData += `${element.key}, ${element.value}\n`;
                });
                break;
            }
        case "lineChart":        // Line chart
            {
                myChart = Chart.getChart("lineChart");
                const labels = myChart.data.labels;
                const dataset = myChart.data.datasets;
                for (let i = 0; i < labels.length; i++) {
                    csvData += `${labels[i]}, ${dataset[0].data[i]}\n`;
                }
                break;
            }
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

function downloadPNG(myChart) {
    const link = document.createElement('a');
    link.href = myChart.toBase64Image();
    link.download = 'chart_image.png';
    link.click();
}

function exportChartToPNG(title) {
    switch (activeChartId) {
        case "pieChart":    // Pie chart & Doughnut chart
            downloadPNG(Chart.getChart("pieChart"));
            downloadPNG(Chart.getChart("doughnutChart"));
            break;
        case "treemap":     // Treemap
            downloadPNG(Chart.getChart("treemap"));
            break;
        case "lineChart":        // Line chart
            downloadPNG(Chart.getChart("lineChart"));
            break;
        default:
            break;
    }
}

function downloadJSON(jsonData) {
    const blob = new Blob([jsonData], { type: 'application/json' });

    // Create a download link
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = "chart_data.json";
    link.click();

    // Clean up
    URL.revokeObjectURL(link.href);
}

function exportChartToJSON(title) {
    const jsonData = [];

    let myChart = null;

    switch (activeChartId) {
        case "pieChart":    // Pie chart & Doughnut chart
            {
                myChart = Chart.getChart("pieChart");
                const labels = myChart.data.labels;
                const dataset = myChart.data.datasets;
                for (let i = 0; i < labels.length; i++) {
                    const key = labels[i];
                    const value = dataset[0].data[i];
                    const dataObject = { [title]: key, count: value };
                    jsonData.push(dataObject);
                }
                break;
            }
        case "treemap":     // Treemap
            {
                myChart = Chart.getChart("treemap");
                myChart.data.datasets[0].tree.forEach(element => {
                    const key = element.key;
                    const value = element.value;
                    const dataObject = { [title]: key, count: value };
                    jsonData.push(dataObject);
                });
                break;
            }
        case "lineChart":        // Line chart
            {
                myChart = Chart.getChart("lineChart");
                const labels = myChart.data.labels;
                const dataset = myChart.data.datasets;
                for (let i = 0; i < labels.length; i++) {
                    const key = labels[i];
                    const value = dataset[0].data[i];
                    const dataObject = { [title]: key, count: value };
                    jsonData.push(dataObject);
                }
                break;
            }
        default:
            break;
    }

    downloadJSON(JSON.stringify(jsonData));
}