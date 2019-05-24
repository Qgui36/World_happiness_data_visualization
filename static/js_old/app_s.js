// @TODO: YOUR CODE HERE!
var svgWidth = 800;
var svgHeight = 400;
var url = "http://127.0.0.1:5000/data";

var margin = {
  top: 30,
  right: 30,
  bottom: 30,
  left: 30
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
var svg = d3.select("#scatter")
  .append("svg")
  .attr("width", width)
  .attr("height", height);
svg.append("rect")
  .attr("width", "100%")
  .attr("height", "100%")
  .attr("fill", "white");

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Import Data
// // d3.csv("./assets/data/2017.csv")
d3.json(url).then(function(bcData) {
  // .then(function(bcData) {

    // Step 1: Parse Data/Cast as numbers
    // ==============================
    bcData.forEach(function(data) {
        data.happy = +data.Happiness_Score;
        data.economy = +data.Economy_GDP_per_Capita;
        data.family = +data.Family;
        data.health = +data.Health_Life_Expectancy;
        data.freedom = +data.Freedom;
        data.generosity = +data.Generosity
        data.trust = +data.Trust_Government_Corruption;
    });
    // Step 2: Create scale functions
    // ==============================
    var xLinearScale = d3.scaleLinear()
      .domain([d3.min(bcData, d => d.economy)-.1, d3.max(bcData, d => d.economy)])
      .range([0, width]);

    var yLinearScale = d3.scaleLinear()
      .domain([d3.min(bcData, d => d.happy)-.2, d3.max(bcData, d => d.happy)])
      .range([height, 0]);

    // Step 3: Create axis functions
    // ==============================
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    // Step 4: Append Axes to the chart
    // ==============================
    chartGroup.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(bottomAxis)
      .attr("class", "axisText");

    chartGroup.append("g")
      .call(leftAxis)
      .attr("class", "axisText");

    // Step 5a: Create blue Circles
    // ==============================
    var circlesGroup1 = chartGroup.selectAll("circle")
    .data(bcData)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d.economy))
    .attr("cy", d => yLinearScale(d.happy))
    .attr("r", "18")
    .attr("class", "stateCircle")
    .attr("opacity", ".6");
    
    // Step 5b: Create Circle text
    // ==============================
    var circlesGroup = chartGroup.selectAll(null)
    .data(bcData)
    .enter()
    .append("text")
    .attr("dx", d => xLinearScale(d.economy))
    .attr("dy", d => yLinearScale(d.happy))
    .attr("class", "inactive")
    .attr("opacity", ".9")
    .text(d => d.Abbr_three);

     // Step 6: Initialize tool tip
    // ==============================
    var toolTip = d3.tip()
      .attr("class", "d3-tip")
      .offset([100, 130])
      .html(function(d) {
        return (`<h2>${d.Country}</h2>Happiness Rank: ${d.happy}%<br>Economy (GDP/Capita): ${d.economy}%`);
      });

     // Step 7: Create tooltip in the chart
    // ==============================
    chartGroup.call(toolTip);

    // Step 8: Create event listeners to display and hide the tooltip
    // ==============================
    circlesGroup.on("click", function(data) {
        toolTip.show(data, this);
        
      })
    
      // onmouseout event
        .on("mouseout", function(data, index) {
          toolTip.hide(data);
        });
    
        // circlesGroup1.on("mouseover", function() {
        //       d3.select(this)
        //      .attr("r", 25)
        //      .attr("fill", "lightgreen");
        //   })

        // // onmouseout event
        // .on("mouseout", function() {
        //   d3.select(this)
        //   .attr("r", "18")
        //   .attr("class", "stateCircle")
        //   .attr("opacity", ".6");
        // });

    // Create axes labels
    chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left + 40)
      .attr("x", 0 - (height / 2))
      .attr("dy", "1em")
      .attr("class", "aText")
      .text("Happiness Rank");

    chartGroup.append("text")
      .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
      .attr("class", "aText")
      .text("Economy (GDP per Capita)");

});
