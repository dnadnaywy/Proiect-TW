// setup 
const data = {
    datasets: [{
        label: 'Countries where terrorist incidents happen often',
        tree: [
            { country: 'Iraq', value: '24636' },
            { country: 'Pakistan', value: '14368' },
            { country: 'Afghanistan', value: '12731' },
            { country: 'India', value: '11960' },
            { country: 'Colombia', value: '8306' },
            { country: 'Philippines', value: '6908' },
            { country: 'Peru', value: '6096' },
            { country: 'El Salvador', value: '5320' },
            { country: 'United Kingdom', value: '5235' },
            { country: 'Turkey', value: '4292' },
            { country: 'Somalia', value: '4142' },
            { country: 'Nigeria', value: '3907' },
            { country: 'Thailand', value: '3849' },
            { country: 'Yemen', value: '3347' },
            { country: 'Spain', value: '3249' },
            { country: 'Ethiopia', value: '190' },
            { country: 'Tajikistan', value: '188' },
            { country: 'Uruguay', value: '82' },
            { country: 'Albania', value: '80' },
            { country: 'Romania', value: '6' },
            { country: 'Andorra', value: '1' },
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
            formatter: (ctx) => {
                console.log(ctx);
                return `${ctx.raw._data.country}: ${ctx.raw._data.value}`;
            },
        },
        key: 'value',
    }]
};

// tooltip block
const getOrCreateTooltip = (chart) => {
    let tooltipEL = chart.canvas.parentNode.querySelector('div');
    if (!tooltipEL) {
        tooltipEL = document.createElement('div');
        tooltipEL.classList.add('tooltipDesign');
        tooltipUL = document.createElement('ul');
        tooltipUL.classList.add('tooltipUL');
        
        //append to parent
        tooltipEL.appendChild(tooltipUL);
        chart.canvas.parentNode.appendChild(tooltipEL);
        console.log(chart.canvas);

        // structure:
        // <canvas>
        //     <div class="cssclass">
        //         <ul class="abc">

        //         </ul>
        //     </div>
        // </canvas>
    }
    return tooltipEL;
};

//trigger
const externalTooltipHandler = (context) => {
    const { chart, tooltip } = context;
    console.log(chart);
    const tooltipEL = getOrCreateTooltip(chart);

    //hide if mouseout
    if(tooltip.opacity === 0) {
        tooltipEL.style.opacity = 0;
        //opacity = 1 === 100% visible
        //0 === 100% transparent
        return;
    };
};

// config 
const config = {
    type: 'treemap',
    data,
    options: {
        plugins: {
            tooltip: {
                enabled: false,
                position: 'nearest',
                external: externalTooltipHandler
            }
        }
    }
};

//color block
function colorFromRaw(ctx) {
    console.log(ctx);
    if (ctx.type != 'data') {
        return 'transparent';
    }
    console.log(ctx.raw);
    const value = ctx.raw.v;
    let alpha = (Math.log(value) / 9);
    console.log(alpha);
    return `rgba(112, 72, 213, ${alpha})`;
}

// render init block
const myChart = new Chart(
    document.getElementById('myChart'),
    config
);

// Instantly assign Chart.js version
const chartVersion = document.getElementById('chartVersion');
chartVersion.innerText = Chart.version;