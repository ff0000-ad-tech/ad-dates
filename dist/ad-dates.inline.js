!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.adDates=t():e.adDates=t()}("undefined"!=typeof self?self:this,function(){return function(e){function t(r){if(n[r])return n[r].exports;var a=n[r]={i:r,l:!1,exports:{}};return e[r].call(a.exports,a,a.exports,t),a.l=!0,a.exports}var n={};return t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=0)}([function(e,t,n){"use strict";function r(e,t){var n="";for(e<0&&(n="-"),e=e.toString().replace(/\-/,"",e);e.length<t;)e="0"+e;return n+e}function a(e){M=e||M}function o(e){for(var t in e)z[t]=e[t]}function i(e){return z[e||M]}function u(e,t){var e=e.toString(),n=e.slice(e.length-1),r=i(),a=r.TH;switch(n){case"1":"11"!=e&&(a=r.ST);break;case"2":"12"!=e&&(a=r.ND);break;case"3":"13"!=e&&(a=r.RD)}return(t?e:"")+a}function c(e,t,n){n=n||{};var a=n.inTimezone||e.outputTimezone,o=n.language,c=e.getIn(a),l=i(o),s=c.getMonth(),f=c.getHours(),d=c.getMinutes();return t.replace(/\$\{(.*?)\}/g,function(e,t){var n=t,o=0,i=void 0,g=!1,m=!0,T=!0;switch(t.replace(/(.+)(\^)/,function(e,n){t=n,g=!0}),2==t.length&&t.replace(/(?![Yo])([a-zA-Z]).*?\1/,function(e,n){t=n.substr(0,1),i=2}),t){case"YY":o=-2;case"YYYY":n=(""+c.getFullYear()).slice(o);break;case"M":n=s+1;break;case"MMM":n=l.MONTHS_ABRV[s];break;case"MMMM":n=l.MONTHS_FULL[s];break;case"D":n=c.getDate();break;case"o":T=!1;case"Do":n=u(c.getDate(),T);break;case"DDD":n=l.WEEKDAYS_ABRV[c.getDay()];break;case"DDDD":n=l.WEEKDAYS_FULL[c.getDay()];break;case"t":m=!1;case"T":n=f,m||0==(n%=12)&&(n=12),d>0&&(i=!0),i&&(n+=":"+r(d,2));break;case"H":n=f;break;case"h":n=f%12,0==n&&(n=12);break;case"m":n=d;break;case"s":n=c.getSeconds();break;case"a":n=f>=12?"pm":"am";break;case"z":n=a.abbr[0]}return i&&(n=r(n,i)),g&&"string"==typeof n&&(n=n.toUpperCase()),n})}function l(e){var t={},n=window.location.href.split("?");if(n.length>1){var r=n[1].split("&");for(var a in r){var o=r[a].split("=");2==o.length&&(t[o[0]]=decodeURIComponent(o[1]))}}return e?t[e]:Object.keys(t).length>0?t:void 0}function s(e,t){var n=t.getTime()/1e3-e.getTime()/1e3;n<0&&(n=0);for(var r={day:n/86400,hour:n/3600%24,minute:n/60%60,second:n%60,output:""},a=["day","hour","minute","second"],o=0;o<4;o++)r.output+=TextUtils.pad(Math.floor(r[a[o]]),2),o<3&&(r.output+=":");return r}function f(e,t){var n=void 0;n=e._isTzDate?e.clone():new Date(e);for(var r in t){var a=I[r.toUpperCase()],o=t[r]*a;n.setTime(n.getTime()+o)}return n}function d(e,t){return void 0==t&&(t=h()),t.getTime()>=e.getTime()}function g(){return _}function m(e){j=T(e);var t=j.value,n=(new Date).getTimezoneOffset(),r=Math.floor(n/60),a=n%60,o=Math.floor(t),i=t%1*60,u=-(o+r),c=-(i+a);t>0&&(u=24+u),console.log("hr:",r,"min:",a,"| adjHr:",u,"adjMin:",c),_[0]=u,_[1]=c,console.log("Timezone.setLocal() ->",j,e,t,_)}function T(e,t){var n=e;if("local"==e||void 0==e)n=j?"string"==typeof j?j:j.label:D(t);else{if("UTC"==e||"UTC"==e.label||"utc"==e)return{label:"UTC",abbr:["utc"],value:0};"trueLocal"==e&&(n=D(t))}if("string"==typeof n){if(n.length<5){var r=v(n);r&&(n=r)}}else n=e.label;var a={},o=L[n];if(o){var i=o.split("|");a.label=n,a.abbr=i[0].split(",");var u=i[1].split(",");if(u.length>1){var c=t||new Date,l=c.getFullYear();l<2018&&(l=2018);var s=n.split("/"),d=b(s[0],l);d||(d=b(s[1],l));var g=d.split(","),m=new Date(l+"-"+g[0]+"T03:00:00"+p(u[1])),T=new Date(l+"-"+g[1]+"T03:00:00"+p(u[0])),S=(f(c,{hour:u[0]}),c.getTime()>m.getTime()&&c.getTime()<T.getTime()),h=S?0:1;a.value=u[h]}else a.value=u[0]}else a.label=n,a.abbr=[n.toLowerCase()],a.value=-(new Date).getTimezoneOffset()/60;return a}function p(e){var t=isNaN(e)?e.value:e,n=t>0?Math.floor(t):Math.ceil(t),a=t%1*60;return a=t>0?Math.floor(a):Math.ceil(a),(t<0?"-":"+")+r(Math.abs(n),2)+":"+r(Math.abs(a),2)}function v(e){var t=void 0,n=e.toLowerCase();for(var r in L){if(L[r].split("|")[0].split(",").indexOf(n)>=0){t=r;break}}return t}function D(e){var t=e||new Date,n=t.toTimeString(),r=n.split("(")[1];return r=r.substr(0,r.length-1),r.replace(/[a-z\.\s]/g,"")}function b(e,t){if("string"==typeof N[e]){var n=N[e].split("|").map(function(e){return e.split(",").map(function(e){return r(e,2)})});N[e]={};var a=n[0],o=n[2];n[1].map(function(t,n){N[e][x+n]=a[0]+"-"+t+","+a[1]+"-"+o[n]})}if(N[e])return N[e][t]}function S(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};if(console.log("DateManager.init()",e),!H){H=!0;var t=l("date"),n="SYSTEM-DATE";t?(Y=t,n="EXTERNAL-DATE"):!e.dateOverride||"staging"!=e.environmentId&&"debug"!=e.environmentId||(Y=e.dateOverride,n="INTERNAL-DATE");var r=void 0;if(Y){r=new O({datetime:Y}).outputTimezone,console.log("DateManager tz:",r);var o=l("tz");o&&(r=o)}m(r);var i=l("ltz");i&&(W=i),console.log("-- CURRENT DATE "+Array(104).join("-")),console.log(""),console.log("\t DATE-MODE:"),console.log("\t\t",n),console.log(""),console.log("\t Time for this unit is now assumed to be: "),console.log("\t\t",h().toFullDateTime()),console.log(""),i&&(console.log("\t External default timezone is: "),console.log("\t\t",i),console.log("")),console.log(Array(120).join("-")),e.language&&a(e.language)}}function h(){var e=Y;return void 0==e&&(e=(new Date).toISOString().split(".")[0]+"+00:00"),new O({datetime:e,outputTimezone:T("local")})}function O(e){e=e||{};var t="local",n=e.datetime;if(Array.isArray(n)){n=e.datetime[0],t=e.datetime[1];if(!n.match(/(\+|\-)([0-9]{2})\:([0-9]{2})/g)){n+=p(T(t))}}"string"==typeof n&&(n=n.replace(/(\T|\s)/g,"T")),e.outputTimezone?t=e.outputTimezone:W&&(t=W);var a=new Date(n);return Object.defineProperties(a,{outputTimezone:{get:function(){return t},set:function(e){t=T(e)}}}),a.clone=function(e){return e=e||a.outputTimezone,new O({datetime:a,outputTimezone:e})},a.getHoursIn=function(e,t){var n=a.getIn(e),r=n.getHours();return 1!=t&&r>12&&(r%=12),r},a.format=function(e,t){return c(a,e,t)},a.getIn=function(e){var t=a.toISOString().split(".")[0],n=p(T("trueLocal",a)),r=T(e||a.outputTimezone,a);return f(new Date(t+n),{hour:r.value})},a.print=function(e){var t=a.toFullDateTime(e);return console.log(t),t},a.toFullDateTime=function(e){return e=e||a.outputTimezone,a.getIn(e).toString().split("GMT")[0]+e.label},a.toSimpleDate=function(e){var t=a.getIn(e);return t.getMonth()+1+"/"+t.getDate()},a.toDate=function(e){var t=a.getIn(e);return a.toSimpleDate(e)+"/"+t.getFullYear()},a.toDateTime=function(e){return a.toDate(e)+" "+a.toTime(e)},a.toSimpleDateTime=function(){return a.toSimpleDate()+" "+a.toTime()},a.toTime=function(e){return a.toSimpleTime(e)+" "+a.toMeridiem(e)},a.toSimpleTime=function(e,t){var n=a.getIn(e),o=a.getHoursIn(e,t);return 0!=o||t||(o=12),t&&(o=r(o,2)),o+":"+r(n.getMinutes(),2)},a.toMeridiem=function(e,t){var n=e||a.outputTimezone;return(a.getIn(n).getHours()>=12?"pm":"am")+(1==t?"/"+n.abbr[0]:"")},a.toShortestTime=function(e,t){return a.toSimpleTime(e,t).replace(/:00$/g,"")},a.toDateTimeISO=function(e){var t=a.toDate(e),n=t.split("/");return n[2]+"-"+r(n[0],2)+"-"+r(n[1],2)+"T"+a.toSimpleTime(e,!0)+":00"},a.toISO=function(){return a.toDateTimeISO(a.outputTimezone)+p(a.outputTimezone)},a._isTzDate=!0,a.outputTimezone=t,a}function y(e,t,n){return Math.max(t,Math.min(n,e))}function A(e){e=e||{};var t=this,n=[],a={},o=void 0,u=!1,c=e.callback||function(){},l=e.tonightStartsAt||"17:30",s=0!=e.hasOneDayOf,m=e.eventDuration||120;Object.defineProperties(t,{target:{get:function(){return o}},current:{get:function(){return n[t.currentIndex]}},currentDate:{get:function(){return t.current.date}},currentLabel:{get:function(){return t.current.label}},currentIndex:{get:function(){for(var e=-1,t=0,r=n.length;t<r&&d(n[t].date);t++)e=t;return e}},next:{get:function(){return n[t.nextIndex]}},nextDate:{get:function(){return t.next.date}},nextLabel:{get:function(){return t.next.label}},nextIndex:{get:function(){return y(t.currentIndex+1,0,n.length-1)}},isLive:{get:function(){return"NOW"==t.current.standardKey}},isComplete:{get:function(){return"PAST"==t.current.standardKey}}}),t.addDate=function(e,c,d){var m=arguments[3],p=e,v=!1,D=!0;if(!e._isTzDate){var b=o;switch(m){case"PAST":D=!1;break;case"TONIGHT":for(var S=o.toDateTimeISO().split("T")[0]+"T",h=l.split(":"),y=0;y<3;y++)S+=r(h[y]||0,2)+":";S=S.slice(0,-1),b=new O({datetime:[S,o.outputTimezone]}),v=b.getTime()>o.getTime(),u=!v,D=s&&u;break;case"TODAY":v=s&&u}D&&(b=o.clone(T("local")),b.setHours.apply(b,g())),p=f(b,e)}var A=c;if(m){var E=a[m];void 0!=E?c=E:"string"==typeof c&&(c=i()[m])}if("function"==typeof c){var M=m&&o?o:p,z=m?"WEEK"==m?A.call(t,M):i()[m]:null;c=c.call(t,M,z)}return v||(n.push({date:p,label:c,standardKey:m,callback:d||function(){}}),n.sort(function(e,t){var n=e.date.getTime(),r=t.date.getTime();return n<r?-1:n>r?1:0})),p},t.print=function(){var e=n.length;console.log("DateSchedule.print(), length:",e);for(var t=0;t<e;t++)console.log(" -",t,n[t].date.toFullDateTime(),"label:",n[t].label)},t.getDates=function(e){e=!!e;for(var t=[],r=0,a=n.length;r<a;r++)t.push(e?n[r]:n[r].date);return t};var p=e.standardOverrides;if(p)for(var v in p)a[v]=p[v];e.target&&(o=t.addDate(e.target,"",c,"NOW"),t.addDate({minute:m},"",c,"PAST")),t.addDate(new O({datetime:"2000-01-01T00:00:00+00:00",outputTimezone:"UTC"}),function(e){return e.toSimpleDateTime()},c,"DATE"),o&&1==e.isStandard&&(t.addDate({},"",c,"TONIGHT"),t.addDate({},"",c,"TODAY"),t.addDate({hour:-24},"",c,"TOMORROW"),t.addDate({hour:-144},function(e){return i().WEEKDAYS_FULL[e.getIn(o.outputTimezone).getDay()]},c,"WEEK"))}Object.defineProperty(t,"__esModule",{value:!0}),n.d(t,"DateFormatter",function(){return w}),n.d(t,"DateManager",function(){return C}),n.d(t,"DateUtils",function(){return k}),n.d(t,"Timezone",function(){return U}),n.d(t,"TzDate",function(){return O}),n.d(t,"RecurringSchedule",function(){return R}),n.d(t,"DateSchedule",function(){return A}),n.d(t,"spanish",function(){return F});var E={english:{MONTHS_FULL:["January","February","March","April","May","June","July","August","September","October","November","December"],MONTHS_ABRV:["jan","feb","mar","apr","may","jun","jul","aug","sep","oct","nov","dec"],MONTHS_EXCP:["","","","","","","","","sept","","",""],WEEKDAYS_FULL:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],WEEKDAYS_ABRV:["sun","mon","tue","wed","thu","fri","sat"],WEEKDAYS_EXCP1:["","","tues","wednes","thur","",""],WEEKDAYS_EXCP2:["","","","","thurs","",""],ST:"st",ND:"nd",RD:"rd",TH:"th",OF:"of",TOMORROW:"Tomorrow",TODAY:"Today",TONIGHT:"Tonight",NOW:"Live Now",PAST:"Past"}},M="english",z={};o(E);var w=Object.freeze({setLanguage:a,addLanguage:o,getLabels:i,getNumericSuffixFor:u,format:c}),I={SECOND:1e3,MINUTE:6e4,HOUR:36e5,DAY:864e5,WEEK:6048e5},k=Object.freeze({getTimeDifference:s,adjust:f,isPast:d}),L={"US/Eastern":"et,edt,est|-4,-5","US/Central":"ct,cdt,cst|-5,-6","US/Mountain":"mt,mdt,mst|-6,-7","US/Pacific":"pt,pdt,pst|-7,-8","US/Alaska":"akt,akdt,akst|-8,-9","US/Arizona":"az|-7","US/Hawaii":"hast|-10","Australia/Brisbane":"aest|10","Australia/Sydney":"aedt,aest|10,11","America/Mexico_City":"mx|-5,-6","America/Bogota":"cot|-5","America/Argentina/Buenos_Aires":"art|-3"},x=2018,N={US:"3,11|11,10,8,14,13,12,10,9|4,3,1,7,6,5,3,2",Australia:"4,10|1,7,5,4,3,2,7,6|7,6,4,3,2,1,6,5",Mexico_City:"4,10|1,7,5,4,3,2,7,6|28,27,25,31,30,29,27,26"},j=void 0,_=[0,0,0],U=Object.freeze({getTzDiff:g,setLocal:m,get:T,toISO:p}),Y=void 0,H=!1,W=void 0,C=Object.freeze({get defaultTimezone(){return W},init:S,getNow:h}),R=function(e){var t,n=this;Object.defineProperties(n,{currentSchedule:{get:function(){var e=t.current.date,n=new A({target:e,isStandard:!0,eventDuration:e.eventDuration,callback:e.callback});if(n.isComplete){var r=t.next.date;n=new A({target:r,isStandard:!0,eventDuration:r.eventDuration,callback:r.callback})}return n}},current:{get:function(){return n.currentSchedule.current}},currentDate:{get:function(){return n.current.date}},currentLabel:{get:function(){return n.current.label}}}),n.print=function(){t.print()},function(){var n=h(),r=i().WEEKDAYS_FULL;t=new A;for(var a=e.tuneins,o=0;o<a.length;o++)for(var u=a[o],c=u.days,l=n.getDay(),s=0;s<c.length;s++){var g=c[s],m=r.indexOf(g),T=m-l,p=new O({datetime:[n.toDateTimeISO().split("T")[0]+"T"+u.startTime+":00",u.timezone]});if(p=f(p,{day:T}),d(p,n)){var v=f(p,{minute:u.eventDuration});d(v,n)&&(p=f(p,{day:7}))}p.eventDuration=u.eventDuration,p.callback=u.callback,console.log("\t",p.print()),t.addDate(p)}}()},F={spanish:{MONTHS_FULL:["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"],MONTHS_ABRV:["enero","feb","marzo","abr","mayo","jun","jul","agosto","sept","oct","nov","dic"],MONTHS_EXCP:["","","","","","","","","sep","","",""],WEEKDAYS_FULL:["domingo","lunes","martes","mi&#201;rcoles","jueves","viernes","s&#193;bado"],WEEKDAYS_ABRV:["dom","lun","mar","mi&#201;r","jue","vier","s&#193;b"],WEEKDAYS_EXCP1:["","","tues","wednes","thur","",""],WEEKDAYS_EXCP2:["","","","","thurs","",""],ST:"ro",ND:"ndo",RD:"rd",TH:"th",OF:"de",TOMORROW:"ma&#209;ana",TODAY:"hoy",TONIGHT:"esta noche",NOW:"en vivo",PAST:"past"}}}])});
;['TzDate', 'RecurringSchedule', 'DateSchedule', 'spanish', 'DateFormatter', 'DateManager', 'DateUtils', 'Timezone'].forEach(key => {
	window[key] = adDates[key]
})
