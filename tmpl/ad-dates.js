/*-- Red.Inject.ad-dates.start --*/
/*-- Red.Inject.ad-dates.end --*/
;['TzDate', 'RecurringSchedule', 'DateSchedule', 'spanish', 'DateFormatter', 'DateManager', 'DateUtils', 'Timezone'].forEach(key => {
	window[key] = adDates[key]
})
