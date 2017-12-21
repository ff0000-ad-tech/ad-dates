/**
	@class DateManager

	@classdesc
		This class initailizes the ads understanding of "now" for use with all other Date oriented classes.		
*/
import { NetUtils, TextUtils } from 'ad-utils'
import TzDate from './TzDate'
import DateFormatter from './DateFormatter'
import TZ from './Timezone'

let D;
const DateManager = function(){
	const Timezone = new TZ()

	if (D) return D;
	D = this;

	var _currentDate;

	// ---------------------------------------------------------------------------------------------------------------
	// PUBLIC METHODS
	/**
		@memberOf DateManager
		@method init
		@desc
			This function is meant to be called at the very beginning of the ad's lifespan. Automatically, it sets initial time which 
			is used to keep an internal clock that can is used to reference the lifespan of the ad, show countdowns, changes in live states, etc.
			Additional settings on args include:<br>

			<ul>
				<li>dateOverride - optionally overrides the system date with a hard-coded one</li>
				<li>language - optionally sets the default language to be used for date-messaging</li>
			</ul>
	*/
	D.init = function( args ){
		trace ( 'DateManager.init()' )

		// should this use global.getQueryParams() instead?
		var externalDate = NetUtils.getQueryParameterBy( 'date' );
		var dateMode = 'SYSTEM-DATE';

		// Call LOCAL here to establish its value
		Timezone.LOCAL;

		if( externalDate ) {
			_currentDate = externalDate;	
			dateMode = 'EXTERNAL-DATE';
		} else if ( args.dateOverride && ( adParams.environmentId == 'staging' || adParams.environmentId == 'debug' ) ){
			_currentDate = args.dateOverride();
			dateMode = 'INTERNAL-DATE';
		}

		if ( _currentDate ){
			// grab now, extract output timezone
			var now = new TzDate ({
				datetime : _currentDate
			});	
			trace ( '\t_currentDate set |', now.outputTimezone, '|', now, '|', now.toFullDateTime(), '|', now.outputTimezone )
			
			var tz = now.outputTimezone;
			//look for a timezone label, only changes the LABEL not the actual timezone value
			var externalTzLabel = NetUtils.getQueryParameterBy( 'tz' );
			if ( externalTzLabel ){
				tz.label = tz.abbr = externalTzLabel;
			}

			Timezone.LOCAL = tz;
		}

		// check for default timezone, used in Velvet preview since segment not loaded
		var externalDefaultTimezone = NetUtils.getQueryParameterBy( 'ltz' );
		if ( externalDefaultTimezone ) {
			adParams.defaultTimezone = externalDefaultTimezone;
		}

		trace( '-- CURRENT DATE ' + ( Array( 104 ).join( '-' ) ));
		trace( '' );
		trace( '    DATE-MODE: ' + dateMode );
		trace( '' );		
		trace( '     Time for this unit is now assumed to be: ' );
		trace( '      ', D.getNow().toFullDateTime() );
		trace( '' );
		if ( externalDefaultTimezone ) {
			trace( '     External default timezone is: ' );
			trace( '      ', externalDefaultTimezone );
			trace( '' );
		}
		trace( Array( 120 ).join( '-' ) );

		if ( args.language ) {
			DateFormatter.language = args.language;
		}
	}
	
	/**
		@memberOf DateManager	
		@method getNow
		@returns {TzDate}
		@desc
			Returns a TzDate representing the exact time it is called.

			You can override system time in the following ways:
			<br>
			<codeblock>
				// in the index
				var adParams = {
					dateSettings: {
						dateOverride : function() { return [ '2016-09-16 14:07:00', Timezone.PST ]; }
					}
				}

				// with a query string:
				// add this to your index file's url:
				?date=2017-05-17T17:45:00+00:00

				// NOTE: the browser address bar will automatically "url encode" some of the characters
				// so full url would look like:
				http:/ /10.0.86.13:4200/build/300x250/index.html?date=2017-05-17T17%3A45%3A00%2B00%3A00
			</codeblock>

			<b>NOTE::</b> <i>Ads built before v2.8.0 (June 2017) use {@link DateUtils} whose query-string format is different.</i>
			<br>
	*/
	D.getNow = function(){
		var date = _currentDate;
		if ( date == undefined ){
			date = new Date().toISOString().split('.')[0] + '+00:00';
		}

		return new TzDate ({
			datetime : date,
			outputTimezone : Timezone.LOCAL
		});	
	}
	
	/** 
		@memberOf DateManager	
		@method isPast
		@param {Date} date
			date to be compared
		@param {Date} context
			date to compare against, generally {@link DateUtils}
		@returns {boolean}
		@desc
			Returns true for a date that has passed the context.
	*/	
	D.isPast = function( date, context ) {
		if ( context == undefined ){
			context = D.getNow();
		}

		// trace ( 'isPast()\n\t', date, '|', date.toFullDateTime(), '\n\t', context, '|', context.toFullDateTime() )

		// make it > and = to account for schedules a time such as 8:00pm vs 8:00pm should comes as true, not needing to set it as 8:00:01pm
		return context.getTime() >= date.getTime();
	}


	D.getTimeDifference = function( startTime, endTime ) {
		var diff = endTime.getTime() / 1000 - startTime.getTime() / 1000;
		if ( diff < 0 ) {
			diff = 0;	
		}
		var obj = {
			day: diff / ( 24 * 60 * 60 ),
			hour: diff / ( 60 * 60 ) % 24,
			minute: diff / ( 60 ) % 60,
			second: diff % 60,
			output: ''
		};
		var label = [ 'day', 'hour', 'minute', 'second' ];
		for ( var i = 0; i < 4; i++ ){
			obj.output += TextUtils.pad( Math.floor( obj[label[i]] ), 2 );
			if ( i < 3 ) obj.output += ':';
		}
		/*
		obj.output = TextUtils.pad( Math.floor(obj.day), 2 ) + ':' 
					+ TextUtils.pad( Math.floor(obj.hour), 2 ) + ':'
					+ TextUtils.pad( Math.floor(obj.minute), 2 ) + ':' 
					+ TextUtils.pad( Math.floor(obj.second), 2 );
		*/
		return obj;
	}

}

export default DateManager