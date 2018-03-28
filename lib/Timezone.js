/**
	@class Timezone
	@desc
		<a href="https://github.com/ff0000-ad-tech/ad-dates">Github repo</a>
		<br><br>
		
		This class provides constants and methods for accessing Timezone offsets, used by the TzDate class.
*/

import * as DateManager from './DateManager.js'
import { TextUtils } from 'ad-utils'

const Timezone = new function() {
	const T = this

	// var _local

	// T._trueLOCAL
	T._tzDiff = [0, 0, 0] // used in DateSchedule for shifting upcoming dates

	const dict = {
		'US/Eastern': 'et,edt,est|-4,-5',
		'US/Central': 'ct,cdt,cst|-5,-6',
		'US/Mountain': 'mt,mdt,mst|-6,-7',
		'US/Pacific': 'pt,pdt,pst|-7,-8',
		'US/Alaska': 'akt,akdt,akst|-8,-9',
		'US/Arizona': 'az|-7',
		'US/Hawaii': 'hast|-10',
		'Australia/Brisbane': 'aest|10',
		'Australia/Sydney': 'aest|10,11',
		'America/Mexico_City': 'mx|-6,-5'
	}
	const dls = {
		US: '03-11,11-04',
		Australia: '04-01,10-07',
		Mexico_City: '04-01,10-28'
	}
	// store the parsed timezone for later use, no need to re-calc each time
	// const store = [{ label: 'UTC', abbr: ['utc'], value: 0 }]

	// T.init = () => {
	// 	log('Timezone.init()')
	// 	const now = new Date()
	// 	var offset = T.getDLS(now)
	// 	var val = -(now.getTimezoneOffset() / 60) - offset

	// 	_local = {
	// 		value: val,
	// 		isLocal: true
	// 	}
	// 	log('\t_local:', _local)
	// 	// get a true local now to extract the timezone abbr
	// 	const dateString = now.toTimeString()
	// 	log('\t\t dateString:', dateString)
	// 	let tzStr = dateString.split('(')[1]
	// 	tzStr = tzStr.substr(0, tzStr.length - 1)
	// 	log('\t\t tzStr:', tzStr)
	// 	// IE & Edge print timezones as words, not abbreviated, so strip it down to just abbreviation
	// 	tzStr = tzStr.replace(/[a-z\.\s]/g, '')

	// 	let actualTz = T.get(tzStr)
	// 	log('\t\tactualTz:', actualTz)
	// 	if (actualTz) {
	// 		_local.label = actualTz.label
	// 		_local.abbr = actualTz.abbr
	// 		_local.value = actualTz.value 
	// 	} else {
	// 		_local.label = tzStr
	// 		_local.abbr = [tzStr]
	// 	}
	// 	log('\t\t\t _local:', _local)

	// 	T._trueLOCAL = _local
	// }

	function getByAbbr(timezone) {
		let choice
		const tzLc = timezone.toLowerCase()
		for (let item in dict) {
			const abbrs = dict[item].split('|')[0].split(',')
			log('\t -->', item, dict[item], abbrs, timezone, tzLc, abbrs.includes(tzLc))
			if (abbrs.includes(tzLc)) {
				choice = item
				break
			}
		}
		return choice
	}

	// function getStored(timezone) {
	// 	return store.find(element => {
	// 		log('\t ->', element, element.label, timezone)
	// 		if (typeof timezone === 'string') {
	// 			// check label
	// 			if (element.label === timezone) {
	// 				return true
	// 			}
	// 			// check the various abbr options
	// 			if (element.abbr.includes(timezone)) {
	// 				return true
	// 			}
	// 		} else {
	// 			return element.label === timezone.label
	// 		}
	// 	})
	// }

	T.get = (timezone, context) => {
		log(Array(80).join('~'), '\n~~| Timezone |~~:', 'get()', timezone)

		let choice = timezone

		if (timezone == 'UTC' || timezone.label == 'UTC') {
			log('return UTC\n', Array(80).join('`'))
			return { label: 'UTC', abbr: ['utc'], value: 0 }
		} else if (timezone == 'local') {
			// calculate the local based on the context
			// log('return _local\n', Array(80).join('`'))
			// return _local
			
			let localNow = context || new Date()
			// get a true local now to extract the timezone abbr
			const dateString = localNow.toTimeString()
			log('\t\t dateString:', dateString)
			let tzStr = dateString.split('(')[1]
			tzStr = tzStr.substr(0, tzStr.length - 1)
			log('\t\t tzStr:', tzStr)
			// IE & Edge print timezones as words, not abbreviated, so strip it down to just abbreviation
			choice = tzStr.replace(/[a-z\.\s]/g, '')
		}

		// // first check if it has already been stored
		// log('\t store:', store)
		// let inst = getStored(timezone)
		// log('\t inst:', inst)
		// if (inst) {
		// 	log('return stored inst\n', Array(80).join('`'))
		// 	return inst
		// }

		// then check if a string abbr is provided first
		if (typeof choice == 'string') {
			if (choice.length < 5) {
				let choiceAbbr = getByAbbr(choice)
				log('\t\t choiceAbbr:', choiceAbbr)
				// then check if it has already been stored yet again
				if (choiceAbbr) {
					// inst = getStored(choiceAbbr)
					// log('\t\t inst:', inst)
					// if (inst) {
					// 	log('return stored by abbr\n', Array(80).join('`'))
					// 	return inst
					// } else {
						choice = choiceAbbr
					// }
				}
			}
		} else {
			choice = timezone.label
		}
		log('\t choice:', choice)
		let tzDataRaw = dict[choice]
		log('\t tzDataRaw:', tzDataRaw)

		const tzDataSplit = tzDataRaw.split('|')
		log('\t tzDataSplit:', tzDataSplit)
		let output = {
			label: choice,
			abbr: tzDataSplit[0].split(',')
		}
		const dlsSplit = tzDataSplit[1].split(',')
		log('\t dlsSplit:', dlsSplit)
		// check if it has 2 values
		if (dlsSplit.length > 1) {
			log('\t\t dlsSplit.length > 1')
			
			let labelSplit = choice.split('/')
			log('\t\t labelSplit:', labelSplit)
			let dataDls = dls[labelSplit[0]]
			// check here if the dls key is not found on the first value, i.e. Mexico_City 
			if (!dataDls) {
				dataDls = dls[labelSplit[1]]
				if (!dataDls) {
					// no dls found, throw error?
				}
			}
			let timeSplit = dataDls.split(',')
			log('\t\t  timeSplit:', timeSplit)

			let now = context || new Date() // DateManager.getNow()
			let year = now.getFullYear()
			let first = new Date(year + '-' + timeSplit[0])
			let second = new Date(year + '-' + timeSplit[1])
			log('\t\t   first:', first)
			log('\t\t  second:', second)
			let isBetween = now.getTime() > first.getTime() && now.getTime() < second.getTime()
			let tzIndex = isBetween ? 0 : 1
			log('\t\t tzIndex:', tzIndex)
			output.value = dlsSplit[tzIndex]
		} else {
			output.value = dlsSplit[0]
		}
		log('\t output:', output)
		//store.push(output)

		log('return output\n', Array(80).join('`'))
		return output
	}

	/**
		@memberOf Timezone	
		@method get
		@property {object|string|number} timezone
			The timezone constant, label or value of the Timezone object desired.
		@returns {string}
		@desc
			Returns an object with the timezone's label and value 
	*/
	/*
	T.get = timezone => {
		//log( 'Timezone.get() >', timezone, '|||', typeof timezone === 'number', isFinite(timezone), Math.floor(timezone) === timezone )
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
			// log( '\t get by number')
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
	}*/

	/**
		@memberOf Timezone	
		@method getDLS
		@property {Date|TzDate} date
			The date to check
		@returns {string}
		@desc
			Checks the Daylight Savings offset for a date, then returns either 1 or 0 
	*/
	T.getDLS = date => {
		var winter = new Date('2011', '01', '01')
		var summer = new Date('2011', '07', '01')

		var winterOffset = winter.getTimezoneOffset()
		var summerOffset = summer.getTimezoneOffset()
		var dateOffset = date.getTimezoneOffset()

		return dateOffset == summerOffset && dateOffset != winterOffset ? 1 : 0
	}

	T.toISO = timezone => {
		const num = timezone.value
		let hours = num > 0 ? Math.floor(num) : Math.ceil(num)
		let minutes = (num % 1) * 60
		minutes = num > 0 ? Math.floor(minutes) : Math.ceil(minutes)

		const operator = num < 0 ? '-' : '+'
		return operator + TextUtils.pad(Math.abs(hours), 2) + ':' + TextUtils.pad(Math.abs(minutes), 2)
	}
}()

function log() {
	// Function.prototype.apply.call(console.log, console, arguments)
}

export default Timezone
