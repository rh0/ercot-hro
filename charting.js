(async function loadChart () {
  const width = 700,
        height = 400,
        margin = {top: 10, right: 30, bottom: 30, left: 60}

  const data = await d3.csv("./HROC/latest.csv", function(d) {
    return {
      date: new Date(d.Date).setHours(d.HourEnding),
      value: d.TotalResourceMW
    }
  })
  const data1h = await d3.csv("./HROC/previous-1h.csv", function(d) {
    return {
      date: new Date(d.Date).setHours(d.HourEnding),
      value: d.TotalResourceMW
    }
  })
  const data2h = await d3.csv("./HROC/previous-2h.csv", function(d) {
    return {
      date: new Date(d.Date).setHours(d.HourEnding),
      value: d.TotalResourceMW
    }
  })

  let x = d3.scaleUtc()
      .domain(d3.extent(data, d => d.date))
      .range([margin.left, width - margin.right])

  let y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.value)]).nice()
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
          .text(data.y))

  let line = d3.line()
      .defined(d => !isNaN(d.value))
      .x(d => x(d.date))
      .y(d => y(d.value))

  var svg = d3.select('#chart')
    .append("svg:svg")
    .attr("viewBox", [0, 0, width, height])

  svg.append("g")
    .call(xAxis)

  svg.append("g")
    .call(yAxis)

  svg.append("path")
    .datum(data)
    .attr("fill", "none")
    .attr("stroke", "darkblue")
    .attr("stroke-width", 1.5)
    .attr("stroke-linejoin", "round")
    .attr("stroke-linecap", "round")
    .attr("d", line)

  svg.append("path")
    .datum(data1h)
    .attr("fill", "none")
    .attr("stroke", "steelblue")
    .attr("stroke-width", 1.5)
    .attr("stroke-linejoin", "round")
    .attr("stroke-linecap", "round")
    .attr("d", line)

  svg.append("path")
    .datum(data2h)
    .attr("fill", "none")
    .attr("stroke", "lightblue")
    .attr("stroke-width", 1.5)
    .attr("stroke-linejoin", "round")
    .attr("stroke-linecap", "round")
    .attr("d", line)



  console.log('boop')
})()
