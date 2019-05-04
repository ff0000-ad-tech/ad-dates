<a name="TzDate"></a>

## TzDate
**Kind**: global class  
**Npmpackage**:   

* [TzDate](#TzDate)
    * [new TzDate()](#new_TzDate_new)
    * [.outputTimezone](#TzDate.outputTimezone) : <code>object</code> \| <code>string</code> \| <code>number</code>
    * [.clone()](#TzDate.clone) ⇒ [<code>TzDate</code>](#TzDate)
    * [.getHoursIn()](#TzDate.getHoursIn) ⇒ <code>number</code>
    * [.format()](#TzDate.format) ⇒ <code>String</code>
    * [.getIn()](#TzDate.getIn) ⇒ [<code>TzDate</code>](#TzDate)
    * [.print()](#TzDate.print) ⇒ <code>string</code>
    * [.toFullDateTime()](#TzDate.toFullDateTime) ⇒ <code>string</code>
    * [.toSimpleDate()](#TzDate.toSimpleDate) ⇒ <code>string</code>
    * [.toDate()](#TzDate.toDate) ⇒ <code>string</code>
    * [.toDateTime()](#TzDate.toDateTime) ⇒ <code>string</code>
    * [.toSimpleDateTime()](#TzDate.toSimpleDateTime) ⇒ <code>string</code>
    * [.toTime()](#TzDate.toTime) ⇒ <code>string</code>
    * [.toSimpleTime()](#TzDate.toSimpleTime) ⇒ <code>string</code>
    * [.toMeridiem()](#TzDate.toMeridiem) ⇒ <code>string</code>
    * [.toShortestTime()](#TzDate.toShortestTime) ⇒ <code>string</code>

<a name="new_TzDate_new"></a>

### new TzDate()
This class is a wrapper for the Javascript "Date" object.
<br><br>
Import from <a href="https://github.com/ff0000-ad-tech/ad-dates">ad-dates</a>
<pre class="sunlight-highlight-javascript">
import { TzDate } from 'ad-dates'
</pre>
The standard Date object only returns the local time. TzDate returns that local time but adds the ability to
get that same date, time, and meridium in ANY timezone, without extra conversions.  Simply ask for anything
in any timezone and it will return you the adjusted date/time while maintaining the original date.
<br><br>
One thing to understand is the difference between: the timezone the TzDate is being DECLARED in versus the
timezone the TzDate is DISPLAYING in. When creating a TzDate, you will be providing the date, time, and timezone
of the DECLARED time. A way to think of it would be: If you are in Los Angeles, you are in the US/Pacific timezone.
So if you look at your calendar 	and clock on the wall, you would enter that date, time and provide the timezone
for US/Pacific.
<pre class="sunlight-highlight-javascript">
const myDate = new TzDate({
	datetime: ['2017-05-18T12:00:00', 'US/Pacific']
})
console.log(myDate) // "Thu May 18 2017 12:00:00 GMT-0700 (PDT)"
myDate.print() // "Thu May 18 2017 12:00:00 US/Pacific"
</pre>
<br>
Tracing out a date can get confusing with that end part "GMT-0700 (PDT)". That is how the browser reports the local
timezone. However, we need to be able to see the date clearly in any timezone.  The print() method allows for a clearer
output specifically telling you what timezone you have asked for. Lets look at that same date in other timezones:
<pre class="sunlight-highlight-javascript">
myDate.print('US/Mountain') // "Thu May 18 2017 13:00:00 US/Mountain"
myDate.print('US/Eastern') // "Thu May 18 2017 15:00:00 US/Eastern"
</pre>
<br>
An important concept to understand is UTC = Universal Time Coordinated. All time is based off of "zero" point, which
is also called Greenwich Mean Time.  Let's look at our same time in UTC:
<pre class="sunlight-highlight-javascript">
myDate.print('UTC') // "Thu May 18 2017 19:00:00 UTC"
</pre>
<br>
You can start to see how the timezones affect time by seeing that noon on the west coast is the same 7 PM (aka 19 hours)
at the origin. So the time we first declared at the beginning could also be created as any of these other times that we
have seen.  Remember that when a time is created, no matter what timezone, there is a different way of saying it, but
the actual time is just a snap shot of a momnet 	in time.  Let's look at how we could create the same date different ways:
<pre class="sunlight-highlight-javascript">
const myDate_eastern = new TzDate({
	datetime: ['2017-05-18T15:00:00', 'US/Eastern']
})
myDate_eastern.print() // "Thu May 18 2017 15:00:00 US/Eastern"
myDate_eastern.print('US/Pacific') // "Thu May 18 2017 12:00:00 US/Pacific"
</pre>
<br>
This time, we created the date as if we were on the east coast in the US/Eastern timezone, so the clock on the wall would
say 3:00 PM. Notice that all the outputs are all the same, that is because these dates are the same moment, just expressed
differently.
<br><br>
Sometimes, you will create the date IN a specific timezone, but you always want to see it in another.  Lets take our first
date we created. We could pass the timezone into the print() method everytime, but that can get repetitive and sometimes you
don't have access to that timezone later on.  So you can create an outputTimezone for the date, so all methods will return
in that timezone:
<pre class="sunlight-highlight-javascript">
const myDate = new TzDate({
	datetime: ['2017-05-18T12:00:00', 'US/Pacific'],
	outputTimezone: 'US/Eastern'
})
myDate.print() // "Thu May 18 2017 15:00:00 US/Eastern"
</pre>
<br>
This can be also changed after the date was created, and again it will always output to that timezone.  BUT, if you pass
in a timezone to a method, that will take priority:
<pre class="sunlight-highlight-javascript">
myDate.outputTimezone = 'US/Pacific'
myDate.print() // "Thu May 18 2017 12:00:00 US/Pacific"
myDate.print('US/Eastern') // "Thu May 18 2017 15:00:00 US/Eastern"
</pre>
<br><br>
On to slightly more advanced concepts: ISO dates. Notice that the date strings we have been passing in so far have been
in this format:
<br>
<pre class="sunlight-highlight-javascript">
'2017-05-18T12:00:00' // Year - Month - Day T Hour : Minute : Second
</pre>
<br>
This is a partial ISO date string.  The last part that is missing is the timezone.  So our first date we created, in proper
ISO would actually look like this:
<br>
<pre class="sunlight-highlight-javascript">
'2017-05-18T12:00:00-07:00' // Year - Month - Day T Hour : Minute : Second - US/Pacific Timezone
</pre>
<br>
The -07:00 on the end is the timezone of the time.  Think of it like this: The date and time are what you see on that clock
and calendar on your wall where you are currently standing.  That last part, the timezone, is saying how far FROM the origin
(UTC) you are. Lets look at it as a simple math problem.
<pre class="sunlight-highlight-javascript">
(origin zero point) - timezone = (date and time where you are)
		UTC - 07:00 = 2017-05-18T12:00:00
			UTC = 2017-05-18T12:00:00 + 07:00
			UTC = 2017-05-18T19:00:00+00:00
</pre>
<br>
This proper ISO full datetime can be used when creating a TzDate, rather than the array if you are confident of the timezone:
<pre class="sunlight-highlight-javascript">
const myDate = new TzDate({
	datetime: '2017-05-18T12:00:00-07:00'
})
myDate.print() // "Thu May 18 2017 12:00:00 US/Pacific"
</pre>
<br><br>
<b>Velvet JSON dates</b>
<br><br>
Dates that are in the Velvet JSON will be in proper ISO format AND there will be a timezone provided, like so:
<pre class="sunlight-highlight-javascript">
const jsonDateSnippet = {
	datetime : "2017-05-18T19:00:00+00:00",
	timezone : "US/Eastern"
}
</pre>
<br>
This is providing the date/time in UTC and then saying that the dates should be output in US/Eastern timezone.  So we would
create our TzDate:
<pre class="sunlight-highlight-javascript">
const myDate = new TzDate({
	datetime: jsonDateSnippet.datetime,
	outputTimezone: jsonDateSnippet.timezone
})
myDate.print() // "Thu May 18 2017 15:00:00 US/Eastern"
</pre>

<a name="TzDate.outputTimezone"></a>

### TzDate.outputTimezone : <code>object</code> \| <code>string</code> \| <code>number</code>
Getter|Setter : Change the timezone that all methods will default return the date/time in. Does NOT change the date, just how it is output.

**Kind**: static property of [<code>TzDate</code>](#TzDate)  
**Example**  
```js
// get
console.log(myDate.outputTimezone)
// set
myDate.outputTimezone = 'US/Eastern'
```
<a name="TzDate.clone"></a>

### TzDate.clone() ⇒ [<code>TzDate</code>](#TzDate)
A shorthand for making a new TzDate with the same datetime and outputTimezone

**Kind**: static method of [<code>TzDate</code>](#TzDate)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| newTimezone | <code>object</code> \| <code>string</code> \| <code>number</code> | Change the outputTimezone of the new reeturned TzDate |

**Example**  
```js
var myCopy = myDate.clone()
myCopy.print()
```
<a name="TzDate.getHoursIn"></a>

### TzDate.getHoursIn() ⇒ <code>number</code>
Similar to Date.getHours(), but this will return the hours in a specified timezone,
		defaulting to the outputTimezone of the instance

**Kind**: static method of [<code>TzDate</code>](#TzDate)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| inTimezone | <code>object</code> \| <code>string</code> \| <code>number</code> | The timezone at which you would like the hours, if null, will use the outputTimezone |
| inMilitary | <code>boolean</code> | Whether the hours should be in military 24 hour or standard 12 hour. true = base 24, false = base 12. Default is false. |

**Example**  
```js
var hours = myDate.getHoursIn('US/Eastern', false)
```
<a name="TzDate.format"></a>

### TzDate.format() ⇒ <code>String</code>
Direct usage of DateFormatter.format()

**Kind**: static method of [<code>TzDate</code>](#TzDate)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| format | <code>String</code> | Pass in a mark up output of the date, including html, inline styling and spacing. In place of key data, use tokens from chart wrapped in ${} |
| args | <code>Object</code> | Optional Object to change the outputTimezone, language of formatting |

**Example**  
```js
const output = myDate.format('${M}/${D}/${YYYY}')
```
<a name="TzDate.getIn"></a>

### TzDate.getIn() ⇒ [<code>TzDate</code>](#TzDate)
If you need the actual TzDate object with the adjust time applied. <br><span style="color:#ff0000">WARN: This will return a TzDate
		with a different base time. This method is mostly used by other internal methods and DateSchedule. This should be used with caution.</span>

**Kind**: static method of [<code>TzDate</code>](#TzDate)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| inTimezone | <code>object</code> \| <code>string</code> \| <code>number</code> | The timezone at which you would like the TzDate CHANGED to |

**Example**  
```js
var changedDate = myDate.getIn('US/Eastern')
```
<a name="TzDate.print"></a>

### TzDate.print() ⇒ <code>string</code>
Is a shorthand for .toFullDateTime()

**Kind**: static method of [<code>TzDate</code>](#TzDate)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| inTimezone | <code>object</code> \| <code>string</code> \| <code>number</code> | The timezone at which you would like the TzDate printed out as, defaults to outputTimezone. |

**Example**  
```js
myDate.print('US/Eastern')
```
<a name="TzDate.toFullDateTime"></a>

### TzDate.toFullDateTime() ⇒ <code>string</code>
Returns a string in the format of "Weekday Mon DD YYYY HH:MM:SS Timezone"

**Kind**: static method of [<code>TzDate</code>](#TzDate)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| inTimezone | [<code>Timezone</code>](#Timezone) \| <code>object</code> \| <code>string</code> \| <code>number</code> | The timezone at which you would like the TzDate printed out as, defaults to outputTimezone. |

<a name="TzDate.toSimpleDate"></a>

### TzDate.toSimpleDate() ⇒ <code>string</code>
Returns a string in the format "MM/DD"

**Kind**: static method of [<code>TzDate</code>](#TzDate)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| inTimezone | [<code>Timezone</code>](#Timezone) \| <code>object</code> \| <code>string</code> \| <code>number</code> | The timezone at which you would like the TzDate printed out as, defaults to outputTimezone. |

<a name="TzDate.toDate"></a>

### TzDate.toDate() ⇒ <code>string</code>
Returns a string in the format "MM/DD/YYYY"

**Kind**: static method of [<code>TzDate</code>](#TzDate)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| inTimezone | [<code>Timezone</code>](#Timezone) \| <code>object</code> \| <code>string</code> \| <code>number</code> | The timezone at which you would like the TzDate printed out as, defaults to outputTimezone. |

<a name="TzDate.toDateTime"></a>

### TzDate.toDateTime() ⇒ <code>string</code>
Returns a string in the format "MM/DD/YYYY HH:MMa/p"

**Kind**: static method of [<code>TzDate</code>](#TzDate)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| inTimezone | [<code>Timezone</code>](#Timezone) \| <code>object</code> \| <code>string</code> \| <code>number</code> | The timezone at which you would like the TzDate printed out as, defaults to outputTimezone. |

<a name="TzDate.toSimpleDateTime"></a>

### TzDate.toSimpleDateTime() ⇒ <code>string</code>
Returns a string in the format "MM/DD HH:MM"

**Kind**: static method of [<code>TzDate</code>](#TzDate)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| inTimezone | [<code>Timezone</code>](#Timezone) \| <code>object</code> \| <code>string</code> \| <code>number</code> | The timezone at which you would like the TzDate printed out as, defaults to outputTimezone. |

<a name="TzDate.toTime"></a>

### TzDate.toTime() ⇒ <code>string</code>
Returns a string in the format "HH:MM AM/PM"

**Kind**: static method of [<code>TzDate</code>](#TzDate)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| inTimezone | [<code>Timezone</code>](#Timezone) \| <code>object</code> \| <code>string</code> \| <code>number</code> | The timezone at which you would like the TzDate printed out as, defaults to outputTimezone. |

<a name="TzDate.toSimpleTime"></a>

### TzDate.toSimpleTime() ⇒ <code>string</code>
Returns a string in the format "HH:MM"

**Kind**: static method of [<code>TzDate</code>](#TzDate)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| inTimezone | [<code>Timezone</code>](#Timezone) \| <code>object</code> \| <code>string</code> \| <code>number</code> | The timezone at which you would like the TzDate printed out as, defaults to outputTimezone. |
| inMilitary | <code>boolean</code> | Whether the hours should be in military 24 hour or standard 12 hour. true = base 24, false = base 12. Default is false. |

**Example**  
```js
myDate.toSimpleTime()
myDate.toSimpleTime('US/Pacific')
myDate.toSimpleTime('US/Pacific', true)
```
<a name="TzDate.toMeridiem"></a>

### TzDate.toMeridiem() ⇒ <code>string</code>
Returns the meridiem "am", "pm" or "am/et", "am/et"

**Kind**: static method of [<code>TzDate</code>](#TzDate)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| inTimezone | [<code>Timezone</code>](#Timezone) \| <code>object</code> \| <code>string</code> \| <code>number</code> | The timezone at which you would like the TzDate printed out as, defaults to outputTimezone. |
| includeTimezone | <code>boolean</code> | Whether to include the timezone, defaults to false |

**Example**  
```js
myDate.toMeridiem();
// returns "am" or "pm"

myDate.toMeridiem('US/Pacific')
// returns "am" or "pm", of the datetime in Pacific Timezone

myDate.toMeridiem('US/Pacific', true)
// returns "am/pt" or "pm/pt", of the datetime in Pacific Timezone

myDate.toMeridiem(null, true)
// returns "am/et" or "pm/et", of the datetime in the outputTimezone
```
<a name="TzDate.toShortestTime"></a>

### TzDate.toShortestTime() ⇒ <code>string</code>
Returns a string in the format "HH:MM", but if there are no minutes will return "HH"

**Kind**: static method of [<code>TzDate</code>](#TzDate)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| inTimezone | [<code>Timezone</code>](#Timezone) \| <code>object</code> \| <code>string</code> \| <code>number</code> | The timezone at which you would like the TzDate printed out as, defaults to outputTimezone. |
| inMilitary | <code>boolean</code> | Whether the hours should be in military 24 hour or standard 12 hour. true = base 24, false = base 12. Default is false. |

