# jStorage

**jStorage** is a cross-browser key-value store database to store data locally in the browser - jStorage supports all major browsers, both in **desktop** (yes - even Internet Explorer 6) and in **mobile**.

Additionally jStorage is library agnostic, it works well with any other JavaScript library on the same webpage, be it jQuery, Prototype, MooTools or something else. Though you still need to have either a third party library (Prototype, MooTools) or [JSON2](https://github.com/douglascrockford/JSON-js/blob/master/json2.js) on the page to support older IE versions.

jStorage supports storing Strings, Numbers, JavaScript objects, Arrays and even native XML nodes which kind of makes it a JSON storage. jStorage also supports setting TTL values for auto expiring stored keys and - best of all - notifying other tabs/windows when a key has been changed, which makes jStorage also a local PubSub platform for web applications.

jStorage is pretty small, about 10kB when minified, 4kB gzipped.

If jStorage is loaded on the page localStorage and sessionStorage polyfills are added to IE6 and IE7 in addition to regular $.jStorage methods. 
You can use regular setItem/getItem
methods with the polyfills but getter/setters can be used as well:

    localStorage.mykey = myval;

is absolutely valid with jStorage. The only downside is that you can't use *onstorage* event, you need to fall back to *listenKeyChange* instead.

## Donate

Support jStorage development

[![Donate to author](https://www.paypalobjects.com/en_US/i/btn/btn_donate_SM.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=DB26KWR2BQX5W)

## Features

jStorage supports the following features:

  * store and retrieve data from browser storage using any JSON compatible data format (+ native XML nodes)
  * set TTL values to stored keys for auto expiring
  * publish and subscribe to cross-window/tab events
  * listen for key changes (update, delete) from the current or any other browser window
  * use any browser since IE6, both in desktop and in mobile

## Browser support

Current availability: jStorage supports all major browsers - Internet Explorer 6+, Firefox 2+, 
Safari 4+, Chrome 4+, Opera 10.50+

If the browser doesn't support data caching, then no exceptions are raised - jStorage can still 
be used by the script but nothing is actually stored.

## Tests

See [tests/testrunner.html](http://www.jstorage.info/static/tests/testrunner.html) for unit tests

**NB!** - listenKeyChange and publish/subscribe tests tend to fail sometimes in Internet Explorer, which should be ok.

## Docs

Project homepage and docs: [www.jstorage.info](http://www.jstorage.info)

## License

**MIT**