window.onload = function() {
    const salesData = [
        {'year': 2012, 'sales': 978},
        {'year': 2013, 'sales': 1076},
        {'year': 2014, 'sales': 1214},
        {'year': 2015, 'sales': 1107},
        {'year': 2016, 'sales': 1520},
        {'year': 2017, 'sales': 1712},
        {'year': 2018, 'sales': 1606},
        {'year': 2019, 'sales': 2188},
    ];

    const margin = 50;
    const width = 800;
    const height = 500;
    const chartWidth = width - 2 * margin;
    const chartHeight = height - 2 * margin;

    const colourScale = d3.scaleLinear()
                          .domain([978, 2188])
                          .range(['red', 'blue']);
    
    const xScale = d3.scaleBand()
                     .range([0, chartWidth])
                     .domain(salesData.map((s) => s.year))
                     .padding(0.3);
    
    const yScale = d3.scaleLinear()
                     .range([chartHeight, 0])
                     .domain([0, 2200]);
    
    const svg = d3.select('body')
                  .append('svg')
                    .attr('width', width)
                    .attr('height', height);
    
    const canvas = svg.append('g')
                        .attr('transform', `translate(${margin}, ${margin})`);
    
    // chart title
    svg.append('text')
          .attr('x', margin + chartWidth / 2)
          .attr('y', margin)
          .attr('text-anchor', 'middle')
          .text('Sales by Year');

    // x-axis and label
    canvas.append('g')
             .attr('transform', `translate(${margin}, ${chartHeight})`)
             .call(d3.axisBottom(xScale));

    svg.append('text')
           .attr('x', margin + chartWidth / 2 + margin)
           .attr('y', chartHeight + 2 * margin - 15)
           .attr('text-anchor', 'middle')
           .text('Year');

    // y-axis and label
    canvas.append('g')
             .attr('transform', `translate(${margin}, 0)`)
             .call(d3.axisLeft(yScale));

    svg.append('text')
           .attr('x', -margin + -(chartWidth / 2))
           .attr('y', margin)
           .attr('transform', 'rotate(-90)')
           .attr('text-anchor', 'middle')
           .text('Sales ($)');
    
    // the bar chart
    const bars = canvas.selectAll('rect')
                       .data(salesData)
                       .enter()
                          .append('rect')
                              .attr('x', (data) => margin + xScale(data.year))
                              .attr('y', chartHeight)
                              .attr('height', 0)
                              .attr('width', xScale.bandwidth())
                              .attr('fill', (data) => colourScale(data.sales))
                              .on('mouseenter', function(source, index) {
                                  d3.select(this)
                                    .transition()
                                    .duration(200)
                                    .attr('opacity', 0.5);
                              })
                              .on('mouseleave', function(source, index) {
                                d3.select(this)
                                    .transition()
                                    .duration(200)
                                    .attr('opacity', 1.0);
                              });
    bars.transition()
        .ease(d3.easeElastic)
        .duration(800)
        .delay((data, index) => index * 50)
        .attr('y', (data) => yScale(data.sales))
        .attr('height', (data) => chartHeight - yScale(data.sales));
};