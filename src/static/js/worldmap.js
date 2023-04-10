const width = 300;
const height = 300;

const svg = d3.select('#div-map')
    .append('svg')
    .attr('width', width)
    .attr('height', height);

const projection = d3.geoMercator().scale(140).translate([width / 2, height / 1.4]);
const path = d3.geoPath(projection);

const g = svg.append('g');

svg.call(d3.zoom().on('zoom', () => {
    g.attr('transform', d3.event.transform);
}));

d3.json('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json')
    .then(data => {
        const countries = topojson.feature(data, data.objects.countries);
        g.selectAll('path')
            .data(countries.features)
            .enter()
            .append('path')
            .attr('class', 'country')
            .attr("cursor", "pointer")
            .attr('d', path)
            .append('title')
            .text(d => d.properties.name);
    });