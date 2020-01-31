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
    
    const yScale = d3.scaleBand()
                     .range([chartHeight, 0])
                     .domain([0, 2200]);
    
};