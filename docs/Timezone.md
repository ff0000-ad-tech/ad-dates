<a name="Timezone"></a>

## Timezone
**Kind**: global class  
**Npmpackage**:   

* [Timezone](#Timezone)
    * [new Timezone()](#new_Timezone_new)
    * [.get()](#Timezone.get) ⇒ <code>string</code>

<a name="new_Timezone_new"></a>

### new Timezone()
This class provides methods for accessing Timezone offsets, used by the TzDate class. Typically,
this class is used internally by other methods in this package, When creating a [TzDate](#TzDate) simply
provide the timezone label as a string.
<br><br>
Import from <a href="https://github.com/ff0000-ad-tech/ad-dates">ad-dates</a>
<br>
<pre class="sunlight-highlight-javascript">
import { Timezone } from 'ad-dates'
</pre>
<b>Explicitly covered Timezones:</b><br>
<table>
	<tr><td>US/Eastern</td></tr>
	<tr><td>US/Central</td></tr>
	<tr><td>US/Mountain</td></tr>
	<tr><td>US/Pacific</td></tr>
	<tr><td>US/Alaska</td></tr>
	<tr><td>US/Arizona</td></tr>
	<tr><td>US/Hawaii</td></tr>
	<tr><td>Australia/Brisbane</td></tr>
	<tr><td>Australia/Sydney</td></tr>
	<tr><td>America/Mexico_City</td></tr>
	<tr><td>America/Bogota</td></tr>
	<tr><td>America/Argentina/Buenos_Aires</td></tr>
</table>

<a name="Timezone.get"></a>

### Timezone.get() ⇒ <code>string</code>
Returns an object with the timezone's label and value

**Kind**: static method of [<code>Timezone</code>](#Timezone)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| timezone | <code>object</code> \| <code>string</code> | The timezone constant, label or value of the Timezone object desired. |

