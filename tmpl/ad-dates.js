/*-- Red.Inject.ad-dates.start --*/
/*-- Red.Inject.ad-dates.end --*/
;['TzDate', 'RecurringSchedule', 'DateSchedule', 'spanish', 'DateFormatter', 'DateManager', 'DateUtils', 'Timezone'].forEach(key => {
	console.log(key, adDates[key])
	window[key] = adDates[key]
})
