<a name="DateSchedule"></a>

## DateSchedule
**Kind**: global class  
**Npmpackage**:   
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| target | [<code>TzDate</code>](#TzDate) | The date that the schedule will count down to |
| isStandard | <code>boolean</code> | If true, will create a standard schedule with default messaging |
| eventDuration | <code>number</code> | In a standard schedule, the amount of minutes after the target time the PAST messaging shows. Defaults to 120 which is 2 hours |
| tonightStartsAt | <code>string</code> | In a standard schedule, when the today message changes to tonight. If the target time is before this value, tonight will never show. Defaults to '17:50' which is 5:30PM |
| hasOneDayOf | <code>boolean</code> | In a standard schedule, will determine if only 'tonight' OR 'today' will show, or if it is possible to have both. For example, in ESPN units, the need is that 		only one of the options will show at midnight day of the event. So if the event is before the tonightStartsAt value, it will only show 'today', while if it is after 		it will only show 'tonight'.  If this is set to false, it will allow for both following the logic of tonightStartsAt.  Defaults to true. |
| standardOverrides | <code>object</code> | An object to overwrite any of the standard labels. Using the standard keys, apply a new label string or callback function passing in the target date |


* [DateSchedule](#DateSchedule)
    * [new DateSchedule(arg)](#new_DateSchedule_new)
    * [.target](#DateSchedule.target) : [<code>TzDate</code>](#TzDate)
    * [.current](#DateSchedule.current) : <code>object</code>
    * [.currentDate](#DateSchedule.currentDate) : [<code>TzDate</code>](#TzDate)
    * [.currentLabel](#DateSchedule.currentLabel) : <code>String</code>
    * [.currentIndex](#DateSchedule.currentIndex) : <code>Number</code>
    * [.next](#DateSchedule.next) : <code>object</code>
    * [.nextDate](#DateSchedule.nextDate) : [<code>TzDate</code>](#TzDate)
    * [.nextLabel](#DateSchedule.nextLabel) : <code>String</code>
    * [.nextIndex](#DateSchedule.nextIndex) : <code>Number</code>
    * [.isLive](#DateSchedule.isLive) : <code>Boolean</code>
    * [.isComplete](#DateSchedule.isComplete) : <code>Boolean</code>
    * [.addDate(tzDate, label, callback)](#DateSchedule.addDate)
    * [.print()](#DateSchedule.print) ⇒
    * [.getDates()](#DateSchedule.getDates) ⇒ <code>Array</code>

<a name="new_DateSchedule_new"></a>

### new DateSchedule(arg)
This class creates a schedule of dates that will be compared agains the currentdate/time. There are 2 ways to use
this class: standard and custom.
<br><br>
Import from <a href="https://github.com/ff0000-ad-tech/ad-dates">ad-dates</a>
<br>
<pre class="sunlight-highlight-javascript">
import { DateSchedule } from 'ad-dates'
</pre>
<br>
<b>AdData.js:</b><br>
It is recommended that you centralize your schedule in AdData. This way changes to the schedule can easily
be achieved with one common update.<br>
<br><br>
<b>Standard</b><br>
This will create a schedule of dates leading up to the target date, which was formerly achieved by using
the selectMessageForDate() method.  This standard way will produce a schedule pre-populated with:
<table>
	<tr><td>DATE</td><td>returns the target date, using the toSimpleDateTime() for anything further than a week out from the target</tr></td>
	<tr><td>WEEK</td><td>returns the day of the week the target date is, ie Wednesday</tr></td>
	<tr><td>TOMORROW</td><td>returns the word "Tomorrow", beginning at midnight the day before the target date</tr></td>
	<tr><td>TODAY</td><td>returns the string "Today", beginning at midnight on the target date</tr></td>
	<tr><td>TONIGHT</td><td>returns the string "Tonight", beginning at the time set with tonightStartsAt</tr></td>
	<tr><td>NOW</td><td>returns the string "Live Now"</tr></td>
	<tr><td>PAST</td><td>returns the string "Past", called after NOW plus the eventDuration value</tr></td>
</table>
<pre class="sunlight-highlight-javascript">
// Standard Schedule
this.schedule = new DateSchedule({
	target: new TzDate({
		datetime: ['2015-08-01 20:00:00', 'US/Eastern'],
		outputTimezone: 'local'
	}),
	isStandard: true
})
this.schedule.print()
this.dateMessage = this.schedule.currentLabel
this.dateHour = this.schedule.target.toDateTime()
</pre>
Each standard label can be overridded by either assigning a different string or by passing in a callback function
that will return a differently formatted message. Note each callback gets fired at runtime, creating each label.
<pre class="sunlight-highlight-javascript">
this.schedule = new DateSchedule({
	target: new TzDate({
		datetime: ['2015-08-01 20:00:00', 'US/Eastern'],
		outputTimezone: 'local'
	}),
	eventDuration: 120,
	isStandard: true,
	standardOverrides: {
		DATE: date => date.format('${M}/${D} ${t} ${a^}'), // 8/1 8 PM
		TOMORROW: (date, label) => label + date.format(' ${t} ${a^}'), // Tomorrow 8 PM
		WEEK: date => date.format('${DDDD^} ${t} ${a^}'), // SATURDAY 8 PM
		NOW: 'Watch Live Now'
	}
})
this.schedule.print()
this.dateMessage = this.schedule.currentLabel
</pre>
<br><br>
<b>Custom</b><br>
This is used to set a specific list of dates to check now against, returning the latest.
<pre class="sunlight-highlight-javascript">
this.schedule = new DateSchedule()
this.schedule.addDate(
	new TzDate({
		datetime: ['2015-08-01 12:00:00', 'US/Eastern'],
		outputTimezone: 'local'
	}),
	"Hey I'm the first date"
)
this.schedule.addDate(
	new TzDate({
		datetime: ['2015-08-05 14:00:00', 'utc'],
		outputTimezone: 'US/Pacific'
	}),
	"I'm the last date"
)
this.schedule.print()
</pre>
The schedule can also be used to call different markup builds.  Use the third param of addDates() to pass in
a callback, then simply call it from Control.preMarkup() or where ever makes sense.
<pre class="sunlight-highlight-javascript">
this.schedule = new DateSchedule()
this.schedule.addDate(
	new TzDate({
		datetime: ['2015-08-01 12:00:00', 'US/Eastern'],
		outputTimezone: 'local'
	}),
	"Hey I'm the first date",
	View.buildFromDate0
)
this.schedule.addDate(
	new TzDate({
		datetime: ['2015-08-05 14:00:00', 'utc'],
		outputTimezone: 'US/Pacific'
	}),
	"I'm the last date",
	View.buildFromDate1
)
this.schedule.print()
</pre>
<b>build.js:</b><br>
In <u>build.View</u>, you can write functions that build out the DOM for each of your states.
<pre class="sunlight-highlight-javascript">
this.buildFromDate0 = function() {
	console.log('View.buildFromDate0()')
	// Markup...
}
this.buildFromDate1 = function() {
	console.log('View.buildFromDate1()')
	// Markup...
}
</pre>
In <u>build.Control</u> or <u>build.buildMarkup</u>, you simply call the callback of the current date on the schedule.  This will
find the current added date object and fire that callback
<pre class="sunlight-highlight-javascript">
const message = adData.schedule.current.callback()
console.log(message)
const myTextField = new UITextField({
	target: T,
	id: 'my-textfield',
	css: {
		width: 300,
		height: 90
	},
	fontSize: 30,
	fontFamily: 'template_font',
	format: TextFormat.INLINE,
	alignText: Align.CENTER,
	text: message.label
})
</pre>


| Param | Type | Description |
| --- | --- | --- |
| arg | <code>object</code> | Settings are passed in via this object, see Properties for more info: |

<a name="DateSchedule.target"></a>

### DateSchedule.target : [<code>TzDate</code>](#TzDate)
Getter : The target date of a standard schedule

**Kind**: static property of [<code>DateSchedule</code>](#DateSchedule)  
**Example**  
```js
mySchedule.target.print()
```
<a name="DateSchedule.current"></a>

### DateSchedule.current : <code>object</code>
Getter : An object of the current date, label and optional callback

**Kind**: static property of [<code>DateSchedule</code>](#DateSchedule)  
**Example**  
```js
mySchedule.current.date
mySchedule.current.label
mySchedule.current.callback()
```
<a name="DateSchedule.currentDate"></a>

### DateSchedule.currentDate : [<code>TzDate</code>](#TzDate)
Getter : Is direct access to the current date, same as mySchedule.current.date

**Kind**: static property of [<code>DateSchedule</code>](#DateSchedule)  
**Example**  
```js
mySchedule.currentDate
```
<a name="DateSchedule.currentLabel"></a>

### DateSchedule.currentLabel : <code>String</code>
Getter : Is direct access to the current label, same as mySchedule.current.label

**Kind**: static property of [<code>DateSchedule</code>](#DateSchedule)  
**Example**  
```js
mySchedule.currentLabel
```
<a name="DateSchedule.currentIndex"></a>

### DateSchedule.currentIndex : <code>Number</code>
Getter : The index, zero based, of the current date

**Kind**: static property of [<code>DateSchedule</code>](#DateSchedule)  
**Example**  
```js
mySchedule.currentIndex
```
<a name="DateSchedule.next"></a>

### DateSchedule.next : <code>object</code>
Getter : An object of the next date, label and optional callback

**Kind**: static property of [<code>DateSchedule</code>](#DateSchedule)  
**Example**  
```js
mySchedule.next.date
mySchedule.next.label
mySchedule.next.callback()
```
<a name="DateSchedule.nextDate"></a>

### DateSchedule.nextDate : [<code>TzDate</code>](#TzDate)
Getter : Is direct access to the next date, same as mySchedule.next.date

**Kind**: static property of [<code>DateSchedule</code>](#DateSchedule)  
**Example**  
```js
mySchedule.nextDate
```
<a name="DateSchedule.nextLabel"></a>

### DateSchedule.nextLabel : <code>String</code>
Getter : Is direct access to the next label, same as mySchedule.next.label

**Kind**: static property of [<code>DateSchedule</code>](#DateSchedule)  
**Example**  
```js
mySchedule.nextLabel
```
<a name="DateSchedule.nextIndex"></a>

### DateSchedule.nextIndex : <code>Number</code>
Getter : The index, zero based, of the next date

**Kind**: static property of [<code>DateSchedule</code>](#DateSchedule)  
**Example**  
```js
mySchedule.nextIndex
```
<a name="DateSchedule.isLive"></a>

### DateSchedule.isLive : <code>Boolean</code>
Getter : When using a standard schedule, whether or not the target date has been passed, but not passed the eventDuration

**Kind**: static property of [<code>DateSchedule</code>](#DateSchedule)  
**Example**  
```js
mySchedule.isLive
```
<a name="DateSchedule.isComplete"></a>

### DateSchedule.isComplete : <code>Boolean</code>
Getter : When using a standard schedule, whether or not the target date and eventDuration has been passed

**Kind**: static property of [<code>DateSchedule</code>](#DateSchedule)  
**Example**  
```js
mySchedule.isComplete
```
<a name="DateSchedule.addDate"></a>

### DateSchedule.addDate(tzDate, label, callback)
Add a date to the schedule, which can be either a TzDate or an object to create a date from the target

**Kind**: static method of [<code>DateSchedule</code>](#DateSchedule)  

| Param | Type | Description |
| --- | --- | --- |
| tzDate | [<code>TzDate</code>](#TzDate) \| <code>Date</code> \| <code>Object</code> | Expected to be either a Date object, a TzDate or an Object for creating a date from the target using DateFormatter.adjust() |
| label | <code>String</code> \| <code>function</code> | Optionally specify a label as a  String or creeate a function to format the date using the TxDate methods |
| callback | <code>function</code> | Optionally a function that can be called when this date is the current. Does NOT auto fire, must me called. |

**Example**  
```js
// start with a target date
const schedule = new DateSchedule({
	target: new TzDate({
		datetime: ['2017-08-01 08:00:00', 'US/Eastern'],
		outputTimezone: 'local'
	})
})
// add TzDate
schedule.addDate(
	new TzDate({
		datetime: '2017-04-01T14:00:00+00:00',
		outputTimezone: 'US/Eastern'
	})
)
// creates a date 1 day before and 4 hours ahead of the target date
schedule.addDate({ day: -1, hour: 4 })
// uses a callback to get a custom date message
schedule.addDate(
	new TzDate({
		datetime: '2017-06-01T22:00:00+00:00',
		outputTimezone: 'local'
	}),
	function(date) {
		return date.toSimpleTime() + ' ' + date.toMeridiem() + '!!'
	}
)
// add a message and a callback
schedule.addDate(
	new TzDate({
		datetime: '2017-05-01T17:00:00+00:00',
		outputTimezone: 'US/Pacific'
	}),
	'Custom Message',
	function() {
		console.log('i am the callback')
	}
)
schedule.print()
// DateSchedule.print(), length: 7
//  - 0 Sat Jan 01 2000 00:00:00 UTC label: 1/1 12:00 am
//  - 1 Sat Apr 01 2017 10:00:00 US/Eastern label: undefined
//  - 2 Mon May 01 2017 10:00:00 US/Pacific label: Custom Message
//  - 3 Thu Jun 01 2017 15:00:00 Local label: 3:00 pm!!
//  - 4 Mon Jul 31 2017 09:00:00 Local label: undefined
//  - 5 Tue Aug 01 2017 05:00:00 Local label: Live Now
//  - 6 Tue Aug 01 2017 07:00:00 Local label: Past
```
<a name="DateSchedule.print"></a>

### DateSchedule.print() ⇒
Traces out all dates in order. Can be called on the instantiation as it returns itself

**Kind**: static method of [<code>DateSchedule</code>](#DateSchedule)  
**Returns**: The DateSchedule instance  
**Example**  
```js
// standard schedule
const schedule = new DateSchedule({
	target: new TzDate({
		datetime: ['2017-08-01 20:00:00', 'US/Eastern'],
		outputTimezone: 'local'
	}),
	isStandard: true
}).print()
// DateSchedule.print(), length: 7
//  - 0 Sat Jan 01 2000 00:00:00 UTC label: 8/1 5:00 pm
//  - 1 Tue Jul 25 2017 17:00:00 Local label: Tuesday
//  - 2 Mon Jul 31 2017 00:00:00 Local label: Tomorrow
//  - 3 Tue Aug 01 2017 00:00:00 Local label: Today
//  - 4 Tue Aug 01 2017 10:30:00 Local label: Tonight
//  - 5 Tue Aug 01 2017 17:00:00 Local label: Live Now
//  - 6 Tue Aug 01 2017 19:00:00 Local label: Past
```
<a name="DateSchedule.getDates"></a>

### DateSchedule.getDates() ⇒ <code>Array</code>
Returns an Array copy of the dates, leaving the original untouched.

**Kind**: static method of [<code>DateSchedule</code>](#DateSchedule)  
**Example**  
```js
schedule.getDates()
```
