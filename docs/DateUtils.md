<a name="DateUtils"></a>

## DateUtils
**Kind**: global class  
**Npmpackage**:   

* [DateUtils](#DateUtils)
    * [.getTimeDifference()](#DateUtils.getTimeDifference) ⇒ <code>Object</code>
    * [.adjust()](#DateUtils.adjust) ⇒ [<code>TzDate</code>](#TzDate) \| <code>Date</code>
    * [.isPast(date, context)](#DateUtils.isPast) ⇒ <code>boolean</code>

<a name="DateUtils.getTimeDifference"></a>

### DateUtils.getTimeDifference() ⇒ <code>Object</code>
Returns an Object of the time remaining until the target date, with the day, hour, minute, second as numbers and output as a string '##:##:##:##'
<br>
Import from <a href="https://github.com/ff0000-ad-tech/ad-dates">ad-dates</a>
<br>
<pre class="sunlight-highlight-javascript">
import { DateUtils } from 'ad-dates'
</pre>

**Kind**: static method of [<code>DateUtils</code>](#DateUtils)  
**Example**  
```js
// to use as a countdown
var targetDate = new TzDate({
	datetime: ['2017-06-06 11:37:00', 'US/Pacific']
})

// use FrameRate to set a ticker of once a second.
FrameRate.register(this, handleCountdown, 1)
function handleCountdown(){
	const countdownStr = DateUtils.getTimeDifference(DateManager.getNow(), targetDate)
	if (DateUtils.isPast(targetDate)) {
		FrameRate.unregister(this, handleCountdown, 1)
	}
}
```
<a name="DateUtils.adjust"></a>

### DateUtils.adjust() ⇒ [<code>TzDate</code>](#TzDate) \| <code>Date</code>
Returns the same type of Object provided: TzDate returns TzDate, Date returns Date

**Kind**: static method of [<code>DateUtils</code>](#DateUtils)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| date | [<code>TzDate</code>](#TzDate) \| <code>Date</code> | The date that will be the starting point for adjustment |
| times | <code>Object</code> | An Object of time keys to adjust the date with. Positive numbers will increase the time, while negative numbers 		will decrement it. The accepted keys are: week, day, hour, minute, second |

**Example**  
```js
// adjust the time of a TzDate
var myTzDate = new TzDate({
	datetime: ['2017-12-31 12:00:00', 'utc']
})
var adjustedTzDate = DateUtils.adjust(myTzDate, { day:-1.5, hour:4.2, minute:90 })
// Sat Dec 30 2017 05:42:00 UTC

// adjust the time of a regualar Date object
var myDate = new Date(2017,0,1)
var adjustedDate = DateUtils.adjust(myDate, { day:-1.5, hour:4.2, minute:90 })
// Fri Dec 30 2016 17:42:00 GMT-0800 (PST)
```
<a name="DateUtils.isPast"></a>

### DateUtils.isPast(date, context) ⇒ <code>boolean</code>
Returns true for a date that has passed the context.

**Kind**: static method of [<code>DateUtils</code>](#DateUtils)  

| Param | Type | Description |
| --- | --- | --- |
| date | <code>Date</code> | date to be compared |
| context | <code>Date</code> | date to compare against, generally [DateUtils](#DateUtils) |

