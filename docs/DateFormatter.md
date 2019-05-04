<a name="DateFormatter"></a>

## DateFormatter
**Kind**: global class  
**Npmpackage**:   

* [DateFormatter](#DateFormatter)
    * [new DateFormatter()](#new_DateFormatter_new)
    * [.setLanguage()](#DateFormatter.setLanguage)
    * [.addLanguage()](#DateFormatter.addLanguage)
    * [.getLabels()](#DateFormatter.getLabels) ⇒ [<code>TzDate</code>](#TzDate) \| <code>Date</code>
    * [.getNumericSuffixFor()](#DateFormatter.getNumericSuffixFor) ⇒ <code>String</code>
    * [.format()](#DateFormatter.format) ⇒ <code>String</code>

<a name="new_DateFormatter_new"></a>

### new DateFormatter()
This class provides a collection of year, month, date labels along with a utility for mananipulating
a TzDate/Date object. <br>
Import from <a href="https://github.com/ff0000-ad-tech/ad-dates">ad-dates</a>
<pre class="sunlight-highlight-javascript">
import { DateFormatter } from 'ad-dates'
</pre>

<a name="DateFormatter.setLanguage"></a>

### DateFormatter.setLanguage()
Changes the language used for date formatting. NOTE: This is initally set from [DateManager](#DateManager).init
<pre class="sunlight-highlight-javascript">
DateFormatter.setLanguage(spanish)
</pre>

**Kind**: static method of [<code>DateFormatter</code>](#DateFormatter)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| value | <code>String</code> | The label associated with an added language object, such as 'english' or 'spanish' |

<a name="DateFormatter.addLanguage"></a>

### DateFormatter.addLanguage()
Adds a langauge option. 
<pre class="sunlight-highlight-javascript">
import { spanish } from 'ad-dates'
DateFormatter.addLanguage(spanish)
</pre>

**Kind**: static method of [<code>DateFormatter</code>](#DateFormatter)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| value | <code>Object</code> | A language object, such as labelSpanish.js |

<a name="DateFormatter.getLabels"></a>

### DateFormatter.getLabels() ⇒ [<code>TzDate</code>](#TzDate) \| <code>Date</code>
Returns an objects that defines labels that date-messaging will use in the ad, used directly by DateSchedule & RecurringSchedule

**Kind**: static method of [<code>DateFormatter</code>](#DateFormatter)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| language | <code>String</code> | The language that will be used.  Currently only "english". Otheres such as "spanish" must be imported and use addLanguage(). 		Defaults to the value set on the class level Dateformatter.langauge |

<a name="DateFormatter.getNumericSuffixFor"></a>

### DateFormatter.getNumericSuffixFor() ⇒ <code>String</code>
Returns the numeric suffix, eg. st, nd, rd, th in the language set from [DateManager](#DateManager)

**Kind**: static method of [<code>DateFormatter</code>](#DateFormatter)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| value | <code>Number</code> | An integer |
| includeValue | <code>Boolean</code> | Whether or not to include the number in the return. true = 1st; false = 1 |

**Example**  
```js
const date = new TzDate({
	datetime: '2020-01-01T12:00:00+00:00'
})
const dateOf = DateFormatter.getNumericSuffixFor(date.getDate(), true) // 1st
const suffix = DateFormatter.getNumericSuffixFor(date.getDate()) // st
```
<a name="DateFormatter.format"></a>

### DateFormatter.format() ⇒ <code>String</code>
Formats a TzDate in any possible mutation by accepting tokens and strings<br>
		<b>List of possible tokens to use:</b><br>
<table>
	<tr><td>YYYY</td>	<td>Year as full Number</td><td>2018</td></tr>
	<tr><td>YY</td>		<td>Year as abbreviated Number</td> <td>18</td></tr>
	<tr><td>MMMM</td>	<td>Month as full String</td> <td>September</td></tr>
	<tr><td>MMM</td>	<td>Month as abbreviated String</td> <td>sept</td></tr>
	<tr><td>MM</td>		<td>Month as full Number</td> <td>08, 09, 10, 11</td></tr>
	<tr><td>M</td>		<td>Month as shortest Number</td> <td>8, 9, 10, 11</td></tr>
	<tr><td>DDDD</td>	<td>Day of the week as full String</td> <td>Monday</td></tr>
	<tr><td>DDD</td>	<td>Day of the week as abbreviated String</td> <td>mon</td></tr>
	<tr><td>DD</td>		<td>Date as full Number</td> <td>08, 09, 10, 11</td></tr>
	<tr><td>D</td>		<td>Date as shortest Number</td> <td>8, 9, 10, 11</td></tr>
	<tr><td>o</td>		<td>Date Suffix String</td> <td>st, nd, rd, th</td></tr>
	<tr><td>Do</td>		<td>Date AND Suffix as Number/String</td> <td>1st, 2nd, 3rd, 4th</td></tr>
	<tr><td>TT</td>		<td>Time (Hour:Minute) in full military time as String</td> <td>19:00, 20:15</td></tr>
	<tr><td>T</td>		<td>Time (Hour:Minute) in shortest military time as String</td> <td>19, 20:15</td></tr>
	<tr><td>tt</td>		<td>Time (Hour:Minute) in full standard time as String</td> <td>7:00, 8:15</td></tr>
	<tr><td>t</td>		<td>Time (Hour:Minute) in shortest standard time as String</td> <td>7, 8:15</td></tr>
	<tr><td>HH</td>		<td>Hour in full military time as Number</td> <td>0...23 > 08, 09, 10, 20, 21</td></tr>
	<tr><td>H</td>		<td>Hour in shortest military time as Number</td> <td>0...23 > 8, 9, 10, 20, 21</td></tr>
	<tr><td>hh</td>		<td>Hour in full standard time as Number</td> <td>1...12 > 08, 09, 10, 11</td></tr>
	<tr><td>h</td>		<td>Hour in shortest standard time as Number</td> <td>1...12 > 8, 9, 10, 11</td></tr>
	<tr><td>mm</td>		<td>Minute in full standard time as Number</td> <td>0...59 > 08, 09, 10, 11</td></tr>
	<tr><td>m</td>		<td>Minute in shortest standard time as Number</td> <td>0...59 > 8, 9, 10, 11</td></tr>
	<tr><td>ss</td>		<td>Second in full standard time as Number</td> <td>0...59 > 08, 09, 10, 11</td></tr>
	<tr><td>s</td>		<td>Second in shortest standard time as Number</td> <td>0...59 > 8, 9, 10, 11</td></tr>
	<tr><td>a</td>		<td>Meridiem as String</td> <td>am, pm</td></tr>
	<tr><td>z</td>		<td>Timezone abbreviation as String</td> <td>pt, mt, ct, et</td></tr>
	<tr><td>^</td>		<td>Special Character - add to the end of any token will<br>run toUpperCase() the return as String</td> <td>${Do} = 1st, ${Do^} = 1ST</td></tr>
</table>

**Kind**: static method of [<code>DateFormatter</code>](#DateFormatter)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| tzDate | [<code>TzDate</code>](#TzDate) | The date to format |
| format | <code>String</code> | Pass in a mark up output of the date, including html, inline styling and spacing. In place of key data, use tokens from chart wrapped in ${} |
| args | <code>Object</code> | Optional Object to change the outputTimezone, langouage of formatting |

**Example**  
```js
const targetDate = new TzDate({
	datetime: ['2015-08-01 14:00:07', 'US/Eastern']
})

const asDateSlashed = targetDate.format('${M}/${D}/${YYYY}')
// 8/1/2015

const asDayOfMonth = targetDate.format('Watch this ${DDDD} the ${Do} of ${MMMM}')
// Watch this Saturday the 1st of August

const asTuneIn = targetDate.format('${M}/${D} <span style="color: red;">${t}${a^}</span>')
// 8/1 <span style="color: red;">2PM</span>
```
