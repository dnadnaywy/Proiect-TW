let centered = null;
let tooltip = d3.select("body").append("div").attr("class", "tooltip").style("opacity", 0);

function fetchData() {
    return new Promise((resolve, reject) => {
        fetch('http://localhost:3000/api/worldmap')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not OK');
                }
                return response.json();
            })
            .then(data => {
                resolve(data);
            })
            .catch(error => {
                reject(error);
            });
    });
}

function renderMap(worldData, terrorismData) {
    const screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    const screenHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

    let width, height;
    const margin = { top: 20, right: 20, bottom: 20, left: 20 };
    if (screenWidth < 1024) {
        width = screenWidth - margin.left - margin.right;
        height = screenHeight - margin.top - margin.bottom;
    } else {
        width = 800;
        height = 400;
    }

    const svg = d3
        .select('#map-container')
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom);

    // Create a projection
    const projection = d3.geoNaturalEarth1()
        .scale(150)
        .translate([width / 2, height / 2]);

    // Create zoom behavior
    const zoom = d3.zoom()
        .scaleExtent([1, 8])
        .on('zoom', zoomed);

    svg.call(zoom);

    // Create a group for the map elements
    const map = svg.append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`);

    // Create a path generator
    const path = d3.geoPath()
        .projection(projection);

    // Render the map
    map.selectAll('path')
        .data(worldData.features)
        .enter()
        .append('path')
        .attr('d', path)
        .attr('class', 'country')
        .attr("cursor", "pointer")
        .on("click", clicked);

    // Create a color scale based on the number of attacks
    const colorScale = d3.scaleThreshold()
        .domain([0, 100, 500, 1000, 5000, 10000, 15000, 20000, 25000])
        .range(d3.schemePurples[9]);

    map.selectAll('.country')
        .attr('fill', d => {
            const countryData = terrorismData.find(item => item.country === d.properties.name);
            return colorScale(countryData ? countryData.count : 0);
        })
        .each(function (d) {
            const originalColor = d3.select(this).attr('fill');
            d3.select(this).attr('data-original-fill', originalColor);
        });

    map.selectAll('.country')
        .on('mouseover', function (event, d) {
            // Darken colour
            const originalColor = d3.select(this).attr('fill');
            const darkerColor = d3.color(originalColor).darker(0.8);
            d3.select(this).attr('fill', darkerColor);

            // Tooltip
            const countryData = terrorismData.find(item => item.country === d.properties.name);
            const tooltipContent = countryData ? `<strong>${d.properties.name}</strong><br/>Attacks: ${countryData.count}` : d.properties.name;

            tooltip.transition()
                .duration(200)
                .style("opacity", .9);
            tooltip.html(tooltipContent)
                .style("left", (event.pageX) + "px")
                .style("top", (event.pageY - 28) + "px");
        })
        .on('mouseout', function () {
            // Restore the original color
            const originalColor = d3.select(this).attr('data-original-fill');
            d3.select(this).attr('fill', originalColor);

            // Tooltip
            tooltip.transition()
                .duration(500)
                .style("opacity", 0);
        });

    function zoomed(event) {
        map.attr("transform", event.transform);
        map.attr("stroke-width", 1 / event.transform.k);
    }

    function clicked(event, feature) {
        const clickedCountry = d3.select(this);

        if (clickedCountry.classed("active")) {
            resetZoom(event);
        } else {
            zoomToCountry(event, feature);
        }
    }

    function resetZoom(event) {
        centered = null;

        map.selectAll(".active").classed("active", false);

        map.transition()
            .duration(750)
            .call(
                zoom.transform,
                d3.zoomIdentity,
                d3.pointer(event, svg.node())
            );
    }

    function zoomToCountry(event, feature) {
        const clickedCountry = d3.select(this);
        const centroid = path.centroid(feature);

        centered = feature;

        map.selectAll(".country").classed("active", d => d === feature);

        const [[x0, y0], [x1, y1]] = path.bounds(feature);
        const dx = x1 - x0;
        const dy = y1 - y0;
        const scale = Math.max(1, Math.min(8, 0.9 / Math.max(dx / width, dy / height)));
        const translate = [width / 2 - scale * centroid[0], height / 2 - scale * centroid[1]];

        map.transition()
            .duration(750)
            .call(
                zoom.transform,
                d3.zoomIdentity.translate(translate[0], translate[1]).scale(scale),
                d3.pointer(event, svg.node())
            );
    }
}

const worldDataUrl = 'https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson';

// Load the GeoJSON data for the world map
d3.json(worldDataUrl).then(worldData => {
    fetchData().then(terrorismData => {
        renderMap(worldData, terrorismData);
    }).catch(error => {
        console.log('Error:', error);
    });
}).catch(error => {
    console.log('Error loading GeoJSON:', error);
});
