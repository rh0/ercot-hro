export default function (selector, dataSeries, key, color) {
  const width = 500,
    height = 200,
    margin = {top: 10, right: 30, bottom: 30, left: 60},
    colorMods = ['dark', '', 'light']

  let x = d3.scaleUtc()
    .domain(d3.extent(dataSeries[dataSeries.length - 1], d => d.date))
    .range([margin.left, width - margin.right])

  let y = d3.scaleLinear()
    .domain([0, d3.max(dataSeries[0], d => d[key])]).nice()
    .range([height - margin.bottom, margin.top])

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

  let line = d3.line()
    .defined(d => !isNaN(d[key]))
    .x(d => x(d.date))
    .y(d => y(d[key]))

  var svg = d3.select(selector)
    .append("svg:svg")
    .attr("viewBox", [0, 0, width, height])

  svg.append("g")
    .call(xAxis)

  svg.append("g")
    .call(yAxis)

  for(let i=0; i<dataSeries.length; i++) {
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
