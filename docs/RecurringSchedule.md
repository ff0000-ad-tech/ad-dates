<a name="RecurringSchedule"></a>

## RecurringSchedule
**Kind**: global class  
**Npmpackage**:   

* [RecurringSchedule](#RecurringSchedule)
    * [new RecurringSchedule()](#new_RecurringSchedule_new)
    * [.currentSchedule](#RecurringSchedule.currentSchedule) : <code>object</code>
    * [.current](#RecurringSchedule.current) : <code>object</code>
    * [.currentDate](#RecurringSchedule.currentDate) : [<code>TzDate</code>](#TzDate)
    * [.currentLabel](#RecurringSchedule.currentLabel) : <code>String</code>
    * [.print()](#RecurringSchedule.print)

<a name="new_RecurringSchedule_new"></a>

### new RecurringSchedule()
Import from <a href="https://github.com/ff0000-ad-tech/ad-dates">ad-dates</a>
<br>
<pre class="sunlight-highlight-javascript">
// importing into an ES6 class
import { RecurringSchedule } from 'ad-dates'
</pre>
<br><br>

This class is for determining the next showtime for events that repeat on a weekly basis. For example, you have a tune-in that
is every Friday at 6pm, and you want your date messaging to update dynamically.

<pre class="sunlight-highlight-javascript">
var schedule = new RecurringSchedule({	
	tuneins: [
		{	
			days: ['Friday'],
			startTime: '18:00',
			eventDuration : 60
		}
	]
});			
</pre>
<br>
For more complex schedules( like sports tournaments ), a more complex model might look like this
<pre class="sunlight-highlight-javascript">
var schedule = new RecurringSchedule({	
	tuneins: [
		{	
			days: ['Friday','Saturday','Sunday'],
			startTime: '21:00',
			eventDuration : 60,
			timezone: 'US/Eastern'
		},
		{	
			days: ['Monday','Tuesday','Wednesday','Thursday'],
			startTime: '18:00',
			eventDuration : 75,
			timezone: 'US/Eastern'
		}
	]
});
</pre>
<br>

Just like DateSchedule, this uses the standard schedule to create the date messaging, which is accessed with
the same methods.
<pre class="sunlight-highlight-javascript">
schedule.print()
schedule.currentSchedule.print()
schedule.currentSchedule.target.print()
console.log(schedule.current)
schedule.currentDate.print()
console.log(schedule.currentLabel)
</pre>

<a name="RecurringSchedule.currentSchedule"></a>

### RecurringSchedule.currentSchedule : <code>object</code>
Getter : A DateSchedule is created for the current date, allowing for the standard messaging to be created

**Kind**: static property of [<code>RecurringSchedule</code>](#RecurringSchedule)  
**Example**  
```js
mySchedule.currentSchedule.print()
```
<a name="RecurringSchedule.current"></a>

### RecurringSchedule.current : <code>object</code>
Getter : An object of the current date, label and optional callback

**Kind**: static property of [<code>RecurringSchedule</code>](#RecurringSchedule)  
**Example**  
```js
mySchedule.current.date
mySchedule.current.label
mySchedule.current.callback()
```
<a name="RecurringSchedule.currentDate"></a>

### RecurringSchedule.currentDate : [<code>TzDate</code>](#TzDate)
Getter : Is direct access to the current date, same as mySchedule.current.date

**Kind**: static property of [<code>RecurringSchedule</code>](#RecurringSchedule)  
**Example**  
```js
mySchedule.currentDate
```
<a name="RecurringSchedule.currentLabel"></a>

### RecurringSchedule.currentLabel : <code>String</code>
Getter : Is direct access to the current label, same as mySchedule.current.label

**Kind**: static property of [<code>RecurringSchedule</code>](#RecurringSchedule)  
**Example**  
```js
mySchedule.currentLabel
```
<a name="RecurringSchedule.print"></a>

### RecurringSchedule.print()
Traces out all dates in order 

<pre class="sunlight-highlight-javascript">
// called on Thursday 2017-06-01 14:08:00-07:00
mySchedule.print()

// DateSchedule.print(), length: 8
//  - 0 Sat Jan 01 2000 00:00:00 UTC label: 1/1 12:00 am
//  - 1 Thu Jun 01 2017 18:00:00 US/Eastern label: undefined
//  - 2 Fri Jun 02 2017 21:00:00 US/Eastern label: undefined
//  - 3 Sat Jun 03 2017 21:00:00 US/Eastern label: undefined
//  - 4 Sun Jun 04 2017 21:00:00 US/Eastern label: undefined
//  - 5 Mon Jun 05 2017 18:00:00 US/Eastern label: undefined
//  - 6 Tue Jun 06 2017 18:00:00 US/Eastern label: undefined
//  - 7 Wed Jun 07 2017 18:00:00 US/Eastern label: undefined
</pre>

**Kind**: static method of [<code>RecurringSchedule</code>](#RecurringSchedule)  
