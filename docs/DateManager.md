<a name="DateManager"></a>

## DateManager
**Kind**: global class  
**Npmpackage**:   

* [DateManager](#DateManager)
    * [new DateManager()](#new_DateManager_new)
    * [.init()](#DateManager.init)
    * [.getNow()](#DateManager.getNow) ⇒ [<code>TzDate</code>](#TzDate)

<a name="new_DateManager_new"></a>

### new DateManager()
This class initailizes the ads understanding of "now" for use with all other Date oriented classes.
<br><br>
Import from <a href="https://github.com/ff0000-ad-tech/ad-dates">ad-dates</a>
<pre class="sunlight-highlight-javascript">
import { DateManager } from 'ad-dates'
</pre>

<a name="DateManager.init"></a>

### DateManager.init()
This function is meant to be called at the very beginning of the ad's lifespan. Automatically, it sets initial time which
		is used to keep an internal clock that can is used to reference the lifespan of the ad, show countdowns, changes in live states, etc.
		Additional settings on args include:
<br>
<table>
		<tr><td>dateOverride</td><td>optionally overrides the system date with a hard-coded one</td></tr>
		<tr><td>language</td><td>optionally sets the default language to be used for date-messaging</td></tr>
		<tr><td>isDev</td><td>set before init, not in the index, optionally allows for the date set in the index to be NOW setting</td></tr>
</table>

**Kind**: static method of [<code>DateManager</code>](#DateManager)  
**Example**  
```js
// in index.html
var adParams = {
	environmentId: 'debug',
	...
	dateSettings: {
		dateOverride: ['2016-09-16 14:07:00', 'US/Eastern'],
		language: 'spanish'
	},
	...
}

// in Preflight.js
// add boolean checking environmentId external to module
adParams.dateSettings.inDev = adParams.environmentId == 'staging' || adParams.environmentId == 'debug'
// pass object in
DateManager.init(window.adParams.dateSettings)
```
<a name="DateManager.getNow"></a>

### DateManager.getNow() ⇒ [<code>TzDate</code>](#TzDate)
Returns a TzDate representing the exact time it is called.<br>You can override system time in the following ways:

**Kind**: static method of [<code>DateManager</code>](#DateManager)  
**Example**  
```js
// in the index
var adParams = {
	dateSettings: {
		dateOverride: ['2016-09-16 14:07:00', 'US/Eastern']
	}
}

// with a query string:
// add this to your index file's url:
?date=2017-05-17T17:45:00+00:00

// NOTE: the browser address bar will automatically "url encode" some of the characters
// so full url would look like:
http://10.0.86.13:4200/build/300x250/index.html?date=2017-05-17T17%3A45%3A00%2B00%3A00
```
