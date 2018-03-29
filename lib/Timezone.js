/**
	@class Timezone
	@desc
		<a href="https://github.com/ff0000-ad-tech/ad-dates">Github repo</a>
		<br><br>
		
		This class provides constants and methods for accessing Timezone offsets, used by the TzDate class.
*/

import * as DateManager from './DateManager.js'
import * as DateUtils from './DateUtils.js'
import { TextUtils } from 'ad-utils'

const dict = {
	'US/Eastern': 'et,edt,est|-4,-5',
	'US/Central': 'ct,cdt,cst|-5,-6',
	'US/Mountain': 'mt,mdt,mst|-6,-7',
	'US/Pacific': 'pt,pdt,pst|-7,-8',
	'US/Alaska': 'akt,akdt,akst|-8,-9',
	'US/Arizona': 'az|-7',
	'US/Hawaii': 'hast|-10',
	'Australia/Brisbane': 'aest|10',
	'Australia/Sydney': 'aedt,aest|10,11',
	'America/Mexico_City': 'mx|-5,-6',
	'America/Bogota': 'cot|-5',
	'America/Argentina/Buenos_Aires': 'art|-3'
}

const dls = {
	US: '03-11,11-04',
	Australia: '04-01,10-07',
	Mexico_City: '04-01,10-28'
}

let _local
let _tzDiff = [0, 0, 0] // used in DateSchedule for shifting upcoming dates

export function getTzDiff() {
	return _tzDiff
}

export function setLocal(val) {
	log('setLocal()')
	_local = get(val)
	log('-------- setLocal() complete')
	// get that timezone for the tz offset
	let tz = _local.value
	let tzOff = new Date().getTimezoneOffset()
	let hr = Math.floor(tzOff / 60)
	let min = tzOff % 60
	let valHr = Math.floor(tz)
	let valMin = (tz % 1) * 60
	let adjHr = -(valHr + hr)
	let adjMin = -(valMin + min)
	if (tz == 0) {
		offset = 0 //UTC
	} else if (tz > 0) {
		// acounts for time in the future from UTC
		adjHr = 24 + adjHr
	}
	// console.log( 'hr:', hr, 'min:', min, '| adjHr:', adjHr, 'adjMin:', adjMin, '|val:', val )
	_tzDiff[0] = adjHr
	_tzDiff[1] = adjMin
	console.log('Timezone.setLocal() ->', _local, val, tz, _tzDiff)
}

function getByAbbr(timezone) {
	let choice
	const tzLc = timezone.toLowerCase()
	for (let item in dict) {
		const abbrs = dict[item].split('|')[0].split(',')
		// log('\t -->', item, dict[item], abbrs, timezone, tzLc, abbrs.includes(tzLc))
		if (abbrs.includes(tzLc)) {
			choice = item
			break
		}
	}
	return choice
}

function getTrueLocal(context) {
	log('getTrueLocal()')
	// calculate the local based on the context
	let localNow = context || new Date()
	// get a true local now to extract the timezone abbr
	const dateString = localNow.toTimeString()
	log('  -- dateString:', dateString)
	let tzStr = dateString.split('(')[1]
	tzStr = tzStr.substr(0, tzStr.length - 1)
	log('  ------- tzStr:', tzStr)
	// IE & Edge print timezones as words, not abbreviated, so strip it down to just abbreviation
	return tzStr.replace(/[a-z\.\s]/g, '')
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
export function get(timezone, context) {
	log(Array(80).join('~'), '\n~~| Timezone |~~:', 'get()', timezone, context)

	let choice = timezone

	if (timezone == 'local' || timezone == undefined) {
		// check for the timezone being set externally from DateManager
		if (_local) {
			log('\t if _local:', _local)
			choice = typeof _local == 'string' ? _local : _local.label
		} else {
			choice = getTrueLocal(context)
		}
	} else if (timezone == 'UTC' || timezone.label == 'UTC') {
		log('return UTC\n', Array(80).join('`'))
		return { label: 'UTC', abbr: ['utc'], value: 0 }
	} else if (timezone == 'trueLocal') {
		choice = getTrueLocal(context)
		log('\t else if trueLocal:', choice)
	}

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
	let output = {}

	// proeceed with dictionary lookup
	let tzDataRaw = dict[choice]
	log('\t tzDataRaw:', tzDataRaw)

	if (tzDataRaw) {
		const tzDataSplit = tzDataRaw.split('|')
		log('\t tzDataSplit:', tzDataSplit)
		output.label = choice
		output.abbr = tzDataSplit[0].split(',')

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
			let dateSplit = dataDls.split(',')
			log('\t\t  dateSplit:', dateSplit)

			let now = context || new Date()
			let year = now.getFullYear()
			let first = new Date(year + '-' + dateSplit[0] + 'T03:00:00' + toISO(dlsSplit[1])) //+11:00')
			let second = new Date(year + '-' + dateSplit[1] + 'T03:00:00' + toISO(dlsSplit[0])) //+10:00')

			let nowAdj = DateUtils.adjust(now, { hour: dlsSplit[0] })
			log('\t\t     now:', now)
			log('\t\t    UTC month:', now.getUTCMonth() + 1)
			log('\t\t    UTC  date:', now.getUTCDate())
			log('\t\t    UTC hours:', now.getUTCHours())
			log('\t\t     nowAdj:', nowAdj)
			log('\t\t    UTC month:', nowAdj.getUTCMonth() + 1)
			log('\t\t    UTC  date:', nowAdj.getUTCDate())
			log('\t\t    UTC hours:', nowAdj.getUTCHours())
			// log('\t\t   first:', first)
			// log('\t\t  second:', second)
			let isBetween = now.getTime() > first.getTime() && now.getTime() < second.getTime()
			let tzIndex = isBetween ? 0 : 1
			log('\t\t tzIndex:', tzIndex)
			output.value = dlsSplit[tzIndex]
		} else {
			output.value = dlsSplit[0]
		}
	} else {
		// determine based on machine info
		output.label = choice
		output.abbr = [choice.toLowerCase()]
		output.value = -(new Date().getTimezoneOffset() / 60)
	}
	log('\t output:', output)

	log('return output\n', Array(80).join('`'))
	return output
}

export function toISO(timezone) {
	const num = isNaN(timezone) ? timezone.value : timezone
	let hours = num > 0 ? Math.floor(num) : Math.ceil(num)
	let minutes = (num % 1) * 60
	minutes = num > 0 ? Math.floor(minutes) : Math.ceil(minutes)

	const operator = num < 0 ? '-' : '+'
	return operator + TextUtils.pad(Math.abs(hours), 2) + ':' + TextUtils.pad(Math.abs(minutes), 2)
}

function log() {
	// Function.prototype.apply.call(console.log, console, arguments)
}
