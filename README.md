##### RED Interactive Agency - Ad Technology

[![npm
(tag)](https://img.shields.io/npm/v/@ff0000-ad-tech%2Fad-dates.svg?style=flat-square)](https://www.npmjs.com/package/@ff0000-ad-tech%2Fad-dates)
[![GitHub
issues](https://img.shields.io/github/issues/ff0000-ad-tech/ad-dates.svg?style=flat-square)](https://github.com/ff0000-ad-tech/ad-dates)
[![npm
downloads](https://img.shields.io/npm/dm/@ff0000-ad-tech%2Fad-dates.svg?style=flat-square)](https://www.npmjs.com/package/@ff0000-ad-tech%2Fad-dates)

[![GitHub
contributors](https://img.shields.io/github/contributors/ff0000-ad-tech/ad-dates.svg?style=flat-square)](https://github.com/ff0000-ad-tech/ad-dates/graphs/contributors/)
[![GitHub
commit-activity](https://img.shields.io/github/commit-activity/y/ff0000-ad-tech/ad-dates.svg?style=flat-square)](https://github.com/ff0000-ad-tech/ad-dates/commits/master)
[![npm
license](https://img.shields.io/npm/l/@ff0000-ad-tech%2Fad-dates.svg?style=flat-square)](https://github.com/ff0000-ad-tech/ad-dates/blob/master/LICENSE)
[![PRs
Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

# Dates



* * *


## <a name="DateFormatter" href="./docs/DateFormatter.md">DateFormatter</a>

* <a href="./docs/DateFormatter.md#DateFormatter.setLanguage">.setLanguage()</a>
* <a href="./docs/DateFormatter.md#DateFormatter.addLanguage">.addLanguage()</a>
* <a href="./docs/DateFormatter.md#DateFormatter.getLabels">.getLabels()</a> ⇒ <code>TzDate</code> \| <code>Date</code>
* <a href="./docs/DateFormatter.md#DateFormatter.getNumericSuffixFor">.getNumericSuffixFor()</a> ⇒ <code>String</code>
* <a href="./docs/DateFormatter.md#DateFormatter.format">.format()</a> ⇒ <code>String</code>

## <a name="DateManager" href="./docs/DateManager.md">DateManager</a>

* <a href="./docs/DateManager.md#DateManager.init">.init()</a>
* <a href="./docs/DateManager.md#DateManager.getNow">.getNow()</a> ⇒ <code>TzDate</code>

## <a name="DateSchedule" href="./docs/DateSchedule.md">DateSchedule</a>

* new DateSchedule(arg)
* <a href="./docs/DateSchedule.md#DateSchedule.target">.target</a> : <code>TzDate</code>
* <a href="./docs/DateSchedule.md#DateSchedule.current">.current</a> : <code>object</code>
* <a href="./docs/DateSchedule.md#DateSchedule.currentDate">.currentDate</a> : <code>TzDate</code>
* <a href="./docs/DateSchedule.md#DateSchedule.currentLabel">.currentLabel</a> : <code>String</code>
* <a href="./docs/DateSchedule.md#DateSchedule.currentIndex">.currentIndex</a> : <code>Number</code>
* <a href="./docs/DateSchedule.md#DateSchedule.next">.next</a> : <code>object</code>
* <a href="./docs/DateSchedule.md#DateSchedule.nextDate">.nextDate</a> : <code>TzDate</code>
* <a href="./docs/DateSchedule.md#DateSchedule.nextLabel">.nextLabel</a> : <code>String</code>
* <a href="./docs/DateSchedule.md#DateSchedule.nextIndex">.nextIndex</a> : <code>Number</code>
* <a href="./docs/DateSchedule.md#DateSchedule.isLive">.isLive</a> : <code>Boolean</code>
* <a href="./docs/DateSchedule.md#DateSchedule.isComplete">.isComplete</a> : <code>Boolean</code>
* <a href="./docs/DateSchedule.md#DateSchedule.addDate">.addDate(tzDate, label, callback)</a>
* <a href="./docs/DateSchedule.md#DateSchedule.print">.print()</a> ⇒
* <a href="./docs/DateSchedule.md#DateSchedule.getDates">.getDates()</a> ⇒ <code>Array</code>

## <a name="DateUtils" href="./docs/DateUtils.md">DateUtils</a>

* <a href="./docs/DateUtils.md#DateUtils.getTimeDifference">.getTimeDifference()</a> ⇒ <code>Object</code>
* <a href="./docs/DateUtils.md#DateUtils.adjust">.adjust()</a> ⇒ <code>TzDate</code> \| <code>Date</code>
* <a href="./docs/DateUtils.md#DateUtils.isPast">.isPast(date, context)</a> ⇒ <code>boolean</code>

## <a name="RecurringSchedule" href="./docs/RecurringSchedule.md">RecurringSchedule</a>

* new RecurringSchedule()
* <a href="./docs/RecurringSchedule.md#RecurringSchedule.currentSchedule">.currentSchedule</a> : <code>object</code>
* <a href="./docs/RecurringSchedule.md#RecurringSchedule.current">.current</a> : <code>object</code>
* <a href="./docs/RecurringSchedule.md#RecurringSchedule.currentDate">.currentDate</a> : <code>TzDate</code>
* <a href="./docs/RecurringSchedule.md#RecurringSchedule.currentLabel">.currentLabel</a> : <code>String</code>
* <a href="./docs/RecurringSchedule.md#RecurringSchedule.print">.print()</a>

## <a name="Timezone" href="./docs/Timezone.md">Timezone</a>

* <a href="./docs/Timezone.md#Timezone.get">.get()</a> ⇒ <code>string</code>

## <a name="TzDate" href="./docs/TzDate.md">TzDate</a>

* new TzDate()
* <a href="./docs/TzDate.md#TzDate.outputTimezone">.outputTimezone</a> : <code>object</code> \| <code>string</code> \| <code>number</code>
* <a href="./docs/TzDate.md#TzDate.clone">.clone()</a> ⇒ <code>TzDate</code>
* <a href="./docs/TzDate.md#TzDate.getHoursIn">.getHoursIn()</a> ⇒ <code>number</code>
* <a href="./docs/TzDate.md#TzDate.format">.format()</a> ⇒ <code>String</code>
* <a href="./docs/TzDate.md#TzDate.getIn">.getIn()</a> ⇒ <code>TzDate</code>
* <a href="./docs/TzDate.md#TzDate.print">.print()</a> ⇒ <code>string</code>
* <a href="./docs/TzDate.md#TzDate.toFullDateTime">.toFullDateTime()</a> ⇒ <code>string</code>
* <a href="./docs/TzDate.md#TzDate.toSimpleDate">.toSimpleDate()</a> ⇒ <code>string</code>
* <a href="./docs/TzDate.md#TzDate.toDate">.toDate()</a> ⇒ <code>string</code>
* <a href="./docs/TzDate.md#TzDate.toDateTime">.toDateTime()</a> ⇒ <code>string</code>
* <a href="./docs/TzDate.md#TzDate.toSimpleDateTime">.toSimpleDateTime()</a> ⇒ <code>string</code>
* <a href="./docs/TzDate.md#TzDate.toTime">.toTime()</a> ⇒ <code>string</code>
* <a href="./docs/TzDate.md#TzDate.toSimpleTime">.toSimpleTime()</a> ⇒ <code>string</code>
* <a href="./docs/TzDate.md#TzDate.toMeridiem">.toMeridiem()</a> ⇒ <code>string</code>
* <a href="./docs/TzDate.md#TzDate.toShortestTime">.toShortestTime()</a> ⇒ <code>string</code>

* * *