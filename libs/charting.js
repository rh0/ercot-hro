export default function (selector, dataSeries, key, color) {
  // Some helpful vars.
  const width = 500,
    height = 200,
    margin = {top: 10, right: 30, bottom: 30, left: 60},
    colorMods = ['dark', '', 'light']

  // Set the scales.
  let x = d3.scaleUtc()
    .domain(d3.extent(dataSeries[dataSeries.length - 1], d => d.date))
    .range([margin.left, width - margin.right])
  let y = d3.scaleLinear()
    .domain(d3.extent(dataSeries[0].concat(dataSeries[1]).concat(dataSeries[2]), d => d[key])).nice()
    .range([height - margin.bottom, margin.top])

  // Define the Axes
  let xAxis = g => g
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0))
  let yAxis = g => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y))
    .call(g => g.select(".domain").remove())
    .call(g => g.select(".tick:last-of-type text").clone()
      .attr("x", 3)
      .attr("text-anchor", "start")
      .attr("font-weight", "bold")
      .text('MW'))

  // Define the data line.
  let line = d3.line()
    .defined(d => !isNaN(d[key]))
    .x(d => x(d.date))
    .y(d => y(d[key]))

  // Add the svg canvas.
  var svg = d3.select(selector)
    .append("svg:svg")
    .attr("viewBox", [0, 0, width, height])
  svg.append("g")
    .call(xAxis)
  svg.append("g")
    .call(yAxis)

  // Draw lines for each data set. (going backwards so most recent is on top)
  for(let i=dataSeries.length - 1; i>=0; i--) {
    svg.append("path")
      .datum(dataSeries[i])
      .attr("fill", "none")
      .attr("stroke", colorMods[i] + color)
      .attr("stroke-width", 1)
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("d", line)
  }
}
