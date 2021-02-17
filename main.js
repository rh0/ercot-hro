import chart from './libs/charting.js'

(async function loadChart () {

  const filenames = ['latest.csv', 'previous-1h.csv', 'previous-2h.csv']
  const data = []

  for(let f=0; f<filenames.length; f++) {
    data.push(
      await d3.csv(`./HROC/${filenames[f]}`, function(d) {
        return {
          date: new Date(d.Date).setHours(d.HourEnding),
          resource: d.TotalResourceMW,
          irr: d.TotalIRRMW,
          newEquip: d.TotalNewEquipResourceMW
        }
      })
    )
  }

  chart('#tot-resources', data, 'resource','blue')
  chart('#tot-irr', data, 'irr', 'green')
  chart('#tot-new', data, 'newEquip', 'black')
})()
