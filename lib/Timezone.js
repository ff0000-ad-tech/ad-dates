/**
	@class Timezone
	@desc
		<a href="https://github.com/ff0000-ad-tech/ad-dates">Github repo</a>
		<br><br>
		
		This class provides constants and methods for accessing Timezone offsets, used by the TzDate class.
*/
let T
const Timezone = function() {
	if (T) return T
	T = this

	var _pool = ['LOCAL', 'UTC', 'EST', 'CST', 'MST', 'PST', 'AKST', 'AZ', 'HST', 'MEX', 'AEST', 'AEST2']
	var _local

	T._trueLOCAL
	T._tzDiff = [0, 0, 0]

	Object.defineProperties(T, {
		/**
			@memberOf Timezone	
			@var {object} LOCAL
			@desc
				Timezone constant for the client's machine; object keys: 
			@example
				// use as static constant
				Timezone.LOCAL

				// returns
				{ label: 'Local', abbr: 'local', value: ? }
		*/
		LOCAL: {
			get: function() {
				if (_local == undefined) {
					//	console.log( 'LOCAL.get init' )
					var now = new Date()
					var offset = T.getDLS(now)
					var val = -(now.getTimezoneOffset() / 60) - offset

					_local = { label: 'Local', abbr: 'local', value: val }
					//console.log( '\t_local:', _local )

					var actualTz = T.get(_local.value)
					//console.log( '\t\tactualTz:', actualTz )
					if (isNaN(actualTz)) {
						_local.label = actualTz.label
						_local.abbr = actualTz.abbr
					} else {
						//	console.log( '\t\t\t timezone not found')
						// timezone not found, so get it from
						var dateString = now.toTimeString()
						var tzStr = dateString.split('(')[1]
						tzStr = tzStr.substr(0, tzStr.length - 1)
						// IE & Edge print timezones as words, not abbreviated, so strip it down to just abbreviation
						tzStr = tzStr.replace(/[a-z\.\s]/g, '')
						_local.label = _local.abbr = tzStr
						console.log('\t\t\t', _local)
					}
					T._trueLOCAL = _local
				}

				return _local
			},
			set: function(val) {
				// console.log( 'LOCAL.set')
				// console.log( '\tval', val )

				var now = new Date()
				var tzOff = now.getTimezoneOffset()
				var hr = Math.floor(tzOff / 60)
				var min = tzOff % 60

				//console.log( val.value, Math.floor(val.value), val.value % 1 )

				var valHr = Math.floor(val.value)
				var valMin = (val.value % 1) * 60

				var adjHr = -(valHr + hr)
				var adjMin = -(valMin + min)
				var offset = Timezone.getDLS(now)
				if (val.value == 0) {
					offset = 0 //UTC
				} else if (val.value > 0) {
					// acounts for time in the future from UTC
					adjHr = 24 + adjHr
				}
				// console.log( 'hr:', hr, 'min:', min, '| adjHr:', adjHr, 'adjMin:', adjMin, '|val:', val )
				T._tzDiff[0] = adjHr - offset
				T._tzDiff[1] = adjMin
				//	console.log( '\t_tzDiff:', T._tzDiff )

				_local = val
				console.log('\tTimezone.LOCAL is now:', val)
			}
		},

		/**
			@memberOf Timezone	
			@var {object} UTC
			@desc
				Timezone constant for Universal Time Coordinated aka Greenwich Mean Time; object keys: 
			@example
				// use as static constant
				Timezone.UTC

				// returns
				{ label: 'UTC', abbr: 'utc', value: 0 }
		*/
		UTC: {
			get: function() {
				return { label: 'UTC', abbr: 'utc', value: 0 }
			}
		},

		/**
			@memberOf Timezone	
			@var {object} EST
			@desc
				Timezone constant for Eastern Time; object keys: 
			@example
				// use as static constant
				Timezone.EST

				// returns
				{ label: 'US/Eastern', abbr: 'et', value: -5 }
		*/
		EST: {
			get: function() {
				return { label: 'US/Eastern', abbr: 'et', value: -5 }
			}
		},

		/**
			@memberOf Timezone	
			@var {object} CST
			@desc
				Timezone constant for Central Time, Mexico Time; object keys: 
			@example
				// use as static constant
				Timezone.CST

				// returns
				{ label: 'US/Central', abbr: 'ct', value: -6 }
		*/
		CST: {
			get: function() {
				return { label: 'US/Central', abbr: 'ct', value: -6 }
			}
		},

		/**
			@memberOf Timezone	
			@var {object} MST
			@desc
				Timezone constant for Mountain Time; object keys: 
			@example
				// use as static constant
				Timezone.MST

				// returns
				{ label: 'US/Mountain', abbr: 'mt', value: -7 }
		*/
		MST: {
			get: function() {
				return { label: 'US/Mountain', abbr: 'mt', value: -7 }
			}
		},

		/**
			@memberOf Timezone	
			@var {object} PST
			@desc
				Timezone constant for Pacific Time; object keys: 
			@example
				// use as static constant
				Timezone.PST

				// returns
				{ label: 'US/Pacific', abbr: 'pt', value: -8 } 
		*/
		PST: {
			get: function() {
				return { label: 'US/Pacific', abbr: 'pt', value: -8 }
			}
		},

		/**
			@memberOf Timezone	
			@var {object} AKST
			@desc
				Timezone constant for Alaska Time; object keys: 
			@example
				// use as static constant
				Timezone.AKST

				// returns
				{ label: 'US/Alaska', abbr: 'akst', value: -9 }
		*/
		AKST: {
			get: function() {
				return { label: 'US/Alaska', abbr: 'akst', value: -9 }
			}
		},

		/**
			@memberOf Timezone	
			@var {object} AZ
			@desc
				Timezone constant for Arizona Time; object keys: 
			@example
				// use as static constant
				Timezone.AZ

				// returns
				{ label: 'US/Arizona', abbr: 'az', value: -7 }
		*/
		AZ: {
			get: function() {
				return { label: 'US/Arizona', abbr: 'az', value: -7 }
			}
		},

		/**
			@memberOf Timezone	
			@var {object} HST
			@desc
				Timezone constant for Hawaii Time; object keys: 
			@example
				// use as static constant
				Timezone.HST

				// returns
				{ label: 'US/Hawaii', abbr: 'hst', value: -10 }
		*/
		HST: {
			get: function() {
				return { label: 'US/Hawaii', abbr: 'hst', value: -10 }
			}
		},

		// TEMP additions until new solution can be found
		MEX: {
			get: function() {
				return { label: 'America/Mexico_City', abbr: 'mx', value: -6 } // is actually 'ct', but ESPN...
			}
		},
		AEST: {
			get: function() {
				return { label: 'Australia/Brisbane', abbr: 'aest', value: 10 }
			}
		},
		AEST2: {
			get: function() {
				return { label: 'Australia/Sydney', abbr: 'aest', value: 10 }
			}
		}
	})

	/**
		@memberOf Timezone	
		@method get
		@property {object|string|number} timezone
			The timezone constant, label or value of the Timezone object desired.
		@returns {string}
		@desc
			Returns an object with the timezone's label and value 
	*/
	T.get = function(timezone) {
		//console.log( 'Timezone.get() >', timezone, '|||', typeof timezone === 'number', isFinite(timezone), Math.floor(timezone) === timezone )
		if (timezone == undefined) return T.LOCAL

		if (typeof timezone === 'string') {
			// is passing a label, such as 'US/Pacific'
			for (var i = 0; i < _pool.length; i++) {
				if (T[_pool[i]].label == timezone) {
					return T[_pool[i]]
				}
			}
			// TODO : should have a fail safe
			return null
		} else if (typeof timezone === 'number' && isFinite(timezone)) {
			// && Math.floor(timezone) === timezone ) {
			// console.log( '\t get by number')
			for (var i = 0; i < _pool.length; i++) {
				if (T[_pool[i]].value === timezone) {
					if (T[_pool[i]].label != 'Local') {
						return T[_pool[i]]
					}
				}
			}
			//return timezone;
			return {
				label: 'Local',
				abbr: 'Local',
				value: timezone
			}
		} else {
			return timezone
		}
	}

	/**
		@memberOf Timezone	
		@method getDLS
		@property {Date|TzDate} date
			The date to check
		@returns {string}
		@desc
			Checks the Daylight Savings offset for a date, then returns either 1 or 0 
	*/
	T.getDLS = function(date) {
		var winter = new Date('2011', '01', '01')
		var summer = new Date('2011', '07', '01')

		var winterOffset = winter.getTimezoneOffset()
		var summerOffset = summer.getTimezoneOffset()
		var dateOffset = date.getTimezoneOffset()

		return dateOffset == summerOffset && dateOffset != winterOffset ? 1 : 0
	}
}

export default Timezone
