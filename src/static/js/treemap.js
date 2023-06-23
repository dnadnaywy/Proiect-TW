function getRouteByTitle(title) {
    let route = 'http://localhost:3000';
    switch (title) {
        case 'Country':
            route += '/api/treemap/country';
            break;
        case 'Region':
            route += '/api/treemap/region';
            break;
        case 'Method of Attack':
            route += '/api/treemap/attack_type';
            break;
        case 'Target':
            route += '/api/treemap/target';
            break;
        case 'Terrorist Groups':
            route += '/api/treemap/group_name';
            break;
        case 'Weapons':
            route += '/api/treemap/weapon_type';
            break;
        case 'Deaths':
            route += '/api/treemap/nkill';
            break;
        case 'Deaths (USA)':
            route += '/api/treemap/nkill_us';
            break;
        default:
            route += '/not-found';
            break;
    }

    return route;
}

function fetchTreemapData(title) {
    return new Promise((resolve, reject) => {
        fetch(getRouteByTitle(title))
            .then(response => response.json())
            .then(data => {
                const treemapData = data;
                resolve(treemapData);
            })
            .catch(error => {
                reject(error);
            });
    });
}

function getHighestValueFromData(data) {
    let highestValue = 0;
    data.forEach((element) => {
        highestValue = Math.max(highestValue, element.value);
    });
    return highestValue;
}

function colorFromRaw(ctx, highestValue) {
    if (ctx.type != 'data') {
        return 'transparent';
    }
    const value = ctx.raw.v;
    const normalizedValue = value / highestValue; // Normalize the value between 0 and 1
    let alpha = normalizedValue * 0.9;
    alpha = Math.min(Math.max(alpha, 0), 1); 
    return `rgba(76, 60, 116, ${alpha})`;
}

function initializeTreemap(title, treemapData) {
    const highestValue = getHighestValueFromData(treemapData);

    // setup 
    const data = {
        datasets: [{
            label: 'Number of Incidents by ' + title,
            tree: treemapData,
            backgroundColor: (ctx) => colorFromRaw(ctx, highestValue),
            borderColor: [
                'rgba(112, 72, 213, 1)',
            ],
            spacing: 1,
            borderWidth: 1,
            hoverBorderWidth: 2,
            labels: {
                display: true,
                align: 'center',
                color: 'white',
                font: {
                    family: "'Source Sans Pro', sans-serif",
                    size: 16,
                },
                formatter: (ctx) => {
                    return `${ctx.raw._data.key}`;
                },
            },
            key: 'value',
        }]
    };

    // config 
    const config = {
        type: 'treemap',
        data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                tooltip: {
                    titleFont: {
                        size: 18,
                        font: "'Source Sans Pro', sans-serif"
                    },
                    bodyFont: {
                        size: 17,
                        font: "'Source Sans Pro', sans-serif"
                    },
                    callbacks: {
                        title: function (context) {
                            return context[0].raw._data.key;
                        },
                        label: function (context) {
                            return ` Number of Incidents: ${context.raw._data.value}`;
                        },
                        labelTextColor: function (context) {
                            return 'white';
                        }
                    }
                }
            }
        }
    };

    return config;
}

function treemapDisplayer(title, data) {
    const config = initializeTreemap(title, data);

    const treemap = new Chart(
        document.getElementById('canvas2'),
        config
    );

    activeChart = [treemap];
    activeChartId = 'canvas2';
}

function makeActualTreemap(title) {
    const promises = [fetchTreemapData(title)];

    Promise.all(promises)
        .then(([treemapData]) => {
            treemapDisplayer(title, treemapData);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}