// setup 
const data = {
    datasets: [{
        label: 'Number of Incidents by Country',
        tree: [
            { country: 'Iraq', numberOfIncidents: '24636' },
            { country: 'Pakistan', numberOfIncidents: '14368' },
            { country: 'Afghanistan', numberOfIncidents: '12731' },
            { country: 'India', numberOfIncidents: '11960' },
            { country: 'Colombia', numberOfIncidents: '8306' },
            { country: 'Philippines', numberOfIncidents: '6908' },
            { country: 'Peru', numberOfIncidents: '6096' },
            { country: 'El Salvador', numberOfIncidents: '5320' },
            { country: 'United Kingdom', numberOfIncidents: '5235' },
            { country: 'Turkey', numberOfIncidents: '4292' },
            { country: 'Somalia', numberOfIncidents: '4142' },
            { country: 'Nigeria', numberOfIncidents: '3907' },
            { country: 'Thailand', numberOfIncidents: '3849' },
            { country: 'Yemen', numberOfIncidents: '3347' },
            { country: 'Spain', numberOfIncidents: '3249' },
            { country: 'Ethiopia', numberOfIncidents: '190' },
            { country: 'Tajikistan', numberOfIncidents: '188' },
            { country: 'Uruguay', numberOfIncidents: '82' },
            { country: 'Albania', numberOfIncidents: '80' },
            { country: 'Romania', numberOfIncidents: '6' },
            { country: 'Andorra', numberOfIncidents: '3' },
        ],
        backgroundColor: (ctx) => colorFromRaw(ctx),
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
                return `${ctx.raw._data.country}`;
            },
        },
        key: 'numberOfIncidents',
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
                callbacks: {
                    title: function (context) {
                        return context[0].raw._data.country;
                    },
                    label: function (context) {
                        return `Number of Incidents: ${context.raw._data.numberOfIncidents}`;
                    },
                    labelTextColor: function (context) {
                        return 'white';
                    }
                }
            }
        }
    }
};

//color block
function colorFromRaw(ctx) {
    if (ctx.type != 'data') {
        return 'transparent';
    }
    const value = ctx.raw.v;
    let alpha = (Math.log(value) / 9);
    return `rgba(76, 60, 116, ${alpha})`;
}

// render init block
const myChart = new Chart(
    document.getElementById('canvas1'),
    config
);
