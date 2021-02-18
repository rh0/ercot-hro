import chart from './libs/charting.js'

(async function loadChart () {

  const filenames = ['latest.csv', 'previous-1h.csv', 'previous-2h.csv']
  const data = []

  for(let f=0; f<filenames.length; f++) {
    data.push(
      await d3.csv(`./HROC/${filenames[f]}`, function(d) {
        let current = new Date()
        let future = new Date(current.getTime() + 43200000)
        let dataDate = new Date(d.Date)

        if (dataDate < future) {
          return {
            date: dataDate.setHours(d.HourEnding),
            resource: Number(d.TotalResourceMW),
            irr: Number(d.TotalIRRMW),
            newEquip: Number(d.TotalNewEquipResourceMW)
          }
        }
      })
    )
  }

  chart('#tot-resources', data, 'resource','blue')
  chart('#tot-irr', data, 'irr', 'green')
  chart('#tot-new', data, 'newEquip', 'blue')
})()
