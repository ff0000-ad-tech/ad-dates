import * as adDates from './index.js'
;['TzDate', 'RecurringSchedule', 'DateSchedule', 'spanish', 'DateFormatter', 'DateManager', 'DateUtils', 'Timezone'].forEach(function(key) {
	window[key] = adDates[key]
})
