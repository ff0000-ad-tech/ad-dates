/**
	@class DateFormatter

	@classdesc
		This class provides a collection of year, month, date labels along with a utility for mananipulating
		a TzDate/Date object.		
*/
import { TextUtils } from 'ad-utils'

var DateFormatter = new function(){

	var D = this;

	D.MS_PER_SECOND	 = 1000;
	D.MS_PER_MINUTE  = 6e4;		// 1000 * 60;
	D.MS_PER_HOUR    = 36e5;	// D.MS_PER_MINUTE * 60;
	D.MS_PER_DAY     = 864e5;	// D.MS_PER_HOUR * 24;
	D.MS_PER_WEEK    = 6048e5;	// D.MS_PER_DAY * 7;

	/**
		@memberOf DateFormatter	
		@method adjust
		@property {TzDate|Date} date
			The date that will be the starting point for adjustment
		@property {Object} times
			An Object of time keys to adjust the date with. Positive numbers will increase the time, while negative numbers
			will decrement it. The accepted keys are: week, day, hour, minute, second
		@returns {TzDate|Date}
		@desc
			Returns the same type of Object provided: TzDate returns TzDate, Date returns Date

		<codeblock>
			// adjust the time of a TzDate
			var myTzDate = new TzDate({
				datetime : [ '2017-12-31 12:00:00', Timezone.UTC ]
			})
			var adjustedTzDate = DateFormatter.adjust( myTzDate, { day:-1.5, hour:4.2, minute:90 });
			// Sat Dec 30 2017 05:42:00 UTC


			// adjust the time of a regualar Date object
			var myDate = new Date(2017,0,1)
			var adjustedDate = DateFormatter.adjust( myDate, { day:-1.5, hour:4.2, minute:90 });
			// Fri Dec 30 2016 17:42:00 GMT-0800 (PST)
		</codeblock>
	*/
	D.adjust = function ( date, times ){
		var dateAdj;
		if ( date._isTzDate ){
			dateAdj = date.clone();
		} else {
			dateAdj = new Date ( date );
		}
		
		for ( var key in times ){
			var cons = 'MS_PER_' + key.toUpperCase();
			var val = D [ cons ];
			var add = times [ key ] * val;
			// trace ( 'key:', key, times[key] )
			// trace ( '\tcons:', cons )
			// trace ( '\tval:', val )
			// trace ( '\tadd:', add )
			dateAdj.setTime( dateAdj.getTime() + add );
		}
		// trace ( 'date:', date )
		// trace ( 'dateAdj:', dateAdj )
		return dateAdj;
	}

	D.getNumericSuffixFor = function ( value, includeDate ){
		var value = value.toString();
		var lastNumber = value.slice(value.length - 1);
		var labels = D.getLabels();
		var output = labels.TH;

		switch ( lastNumber ) {
			case '1':
				if (value != '11') output = labels.ST;
				break;
			case '2':
				if (value != '12') output = labels.ND;
				break;
			case '3':
				if (value != '13') output = labels.RD;
				break;
		}

		return (includeDate ? value : '') + output;
	}

	D.format = function( tzDate, format, args ){
		// YYYY - 2017
		// YY - 17
		// MMMM - September
		// MMM - Sept
		// MM - 09, 10, 11
		// M - 9, 10, 11
		// DDDD - Monday
		// DDD = Mon
		// DD - 08, 09, 10 (date)
		// D - 8, 9, 10
		// Do - 1st, 2nd, 3rd, 4th
		// HH - 0...23 > 09, 10, 11
		// H - 0...23 > 9, 10, 11
		// hh - 1...12 > 09, 10, 11
		// h - 1...12 > 9, 10, 11
		// mm - 0...59 > 09, 10, 11
		// m - 0...59 > 9, 10, 11
		// ss - 0...59 > 09, 10, 11
		// s - 0...59 > 9, 10, 11
		// T - 7:00, 8:15
		// t - 7, 8:15
		// a - am pm
		// z - timezone abbreviation
		// ^ - toUpperCase()

		// args - language, weekday exceptions, month exceptions
		args = args || {}	

		var tz = args.inTimezone || tzDate.outputTimezone;
		var language = args.language;
		
		var dateIn = tzDate.getIn ( tz );
		trace ( '.format( \'' + format + '\' )' )
		
		var labels = D.getLabels( language );
		var month = dateIn.getMonth();
		var hours = dateIn.getHours();
		var minutes = dateIn.getMinutes();

		// ${YYYY}
		var result = format.replace(/\$\{(.*?)\}/g, function(match, token) {
			
			var output = token;			
			var trim = 0; // only used for year
			var padding;
			var needsLabel;
			var upper = false;
			var keep = true;

			// searches for ^ char for toUpperCase()
			token.replace( /(.+)(\^)/, function(match3, token3){
				token = token3;
				upper = true;
				trace ( '\t\t\t', match3, token3 )
			})

			// check for a set of 2, except Y. flags padding then converts to single character MM > M
			if ( token.length == 2 ) {
				token.replace( /(?![Yo])([a-zA-Z]).*?\1/, function(match2, token2){	
					token = token2.substr(0,1);
					trace ( '\t\t', match2, token2, token )
					padding = 2;
				});
			}

			switch ( token ){
				case 'YY' :
					trim = -2;
				case 'YYYY' :
					output = ( '' + dateIn.getFullYear() ).slice( trim );
					break;

				case 'M' :
					output = month + 1;
					break;
				case 'MMM' :
					output = labels.MONTHS_ABRV [ month ];
					break;
				case 'MMMM' :
					output = labels.MONTHS_FULL [ month ];
					break;

				case 'D' :
					output = dateIn.getDate();
					break;
				case 'Do' :
					output = D.getNumericSuffixFor ( dateIn.getDate(), true );
					break;
				case 'DDD' :
					output = labels.WEEKDAYS_ABRV [ dateIn.getDay() ];
					break;
				case 'DDDD' :
					output = labels.WEEKDAYS_FULL [ dateIn.getDay() ];
					break;
				
				case 't' :
					keep = minutes > 0;
				case 'T' :
					output = hours;
					if ( keep ){
						output += ':' + TextUtils.pad ( minutes, 2 )
					}
					break;

				case 'H' :
					output = hours;
					break;

				case 'h' :
					output = hours % 12;					
					if ( output == 0 ) {
						output = 12;
					}
					break;

				case 'm' :
					output = minutes;
					break;

				case 's' :
					output = dateIn.getSeconds();
					break;

				case 'a' :
					output = hours >= 12 ? 'pm' : 'am';
					break;

				case 'z' :
					output = tz.abbr;
					break;
			}

			if ( padding ){
				output = TextUtils.pad ( output, padding );
			}

			if ( upper ){
				output = output.toUpperCase();
			}

			trace ( '\t', match, token, output )

			return output;
		});
	
		// trace ( '<' )
		return result;
		
	}

	
	// -------------------------------------------------------------------------------------------------------------------
	// LABELS
	/**
		@memberOf DateFormatter	
		@var language
		@desc
			This controls what language date-messaging will use. 
	*/
	D.language = 'english';

	var _languageLabels = {
		'english' : {
			MONTHS_FULL: ['January','February','March','April','May','June','July','August','September','October','November','December'],
			MONTHS_ABRV: ['jan','feb','mar','apr','may','jun','jul','aug','sep','oct','nov','dec'],
			MONTHS_EXCP: ['','','','','','','','','sept','','',''],
			
			WEEKDAYS_FULL: ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
			WEEKDAYS_ABRV: ['sun','mon','tue','wed','thu','fri','sat'],
			WEEKDAYS_EXCP1: ['','','tues','wednes','thur','',''],
			WEEKDAYS_EXCP2: ['','','','','thurs','',''],
						
			ST: 'st',
			ND: 'nd',
			RD: 'rd',
			TH: 'th',
			OF: 'of',
			
			TOMORROW: 'Tomorrow',
			TODAY: 'Today',
			TONIGHT: 'Tonight',
			NOW: 'Live Now',
			PAST: 'Past'
		},
		'spanish' : {
			MONTHS_FULL: ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'],
			MONTHS_ABRV: ['enero','feb','marzo','abr','mayo','jun','jul','agosto','sept','oct','nov','dic'],
			MONTHS_EXCP: ['','','','','','','','','sep','','',''],
			
			WEEKDAYS_FULL: ['domingo','lunes','martes','mi&#201;rcoles','jueves','viernes','s&#193;bado'],
			WEEKDAYS_ABRV: ['dom','lun','mar','mi&#201;r','jue','vier','s&#193;b'],
			WEEKDAYS_EXCP1: ['','','tues','wednes','thur','',''],
			WEEKDAYS_EXCP2: ['','','','','thurs','',''],
			
			ST: 'ro',
			ND: 'ndo',
			RD: 'rd',
			TH: 'th',
			OF: 'de',
			
			TOMORROW: 'ma&#209;ana',
			TODAY: 'hoy',
			TONIGHT: 'esta noche',
			NOW: 'en vivo',
			PAST: 'past'
		}
	};

	D.monthsFull = 'MONTHS_FULL';
	D.monthsAbrv = 'MONTHS_ABRV';
	D.weekdaysFull = 'WEEKDAYS_FULL';
	D.weekdaysAbrv = 'WEEKDAYS_ABRV';

	/**
		@memberOf DateFormatter	
		@method 
			
		@memberOf DateFormatter	
		@method getLabels
		@property {String} language
			The language that will be used.  Currently only "english" and "spanish".  Defaults to the value set on the class level Dateformatter.langauge
		@returns {TzDate|Date}
		@desc
			Returns an objects that defines labels that date-messaging will use in the ad, used directly by DateSchedule and RecurringSchedule 
	*/
	D.getLabels = function ( language ) {
		return _languageLabels [ language || D.language ];
	}

	// D.applyMonthException = function() {
	// 	applyExceptions ( 'MONTHS', '' );
	// }

	// D.applyWeekDayException = function ( index ) {
	// 	applyExceptions ( 'WEEKDAYS', index );
	// }

	// function applyExceptions ( type, index ){
	// 	for ( var key in _languageLabels ){
	// 		var lang = _languageLabels[key];
	// 		var base = lang [ type + '_ABRV' ];
	// 		var next = lang [ type + '_EXCP' + index ];
	// 		for ( var i = 0; i < base.length; i++ ){
	// 			if ( next[i] != '' ){
	// 				base[i] = next[i]
	// 			}
	// 		}
	// 	}
	// }
}

export default DateFormatter