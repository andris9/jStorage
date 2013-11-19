# jStorage

**jStorage** is a cross-browser key-value store database to store data locally in the browser - jStorage supports all major browsers, both in **desktop** (yes - even Internet Explorer 6) and in **mobile**.

Additionally jStorage is library agnostic, it works well with any other JavaScript library on the same webpage, be it jQuery, Prototype, MooTools or something else. Though you still need to have either a third party library (Prototype, MooTools) or [JSON2](https://github.com/douglascrockford/JSON-js/blob/master/json2.js) on the page to support older IE versions.

jStorage supports storing Strings, Numbers, JavaScript objects, Arrays and even native XML nodes which kind of makes it a JSON storage. jStorage also supports setting TTL values for auto expiring stored keys and - best of all - notifying other tabs/windows when a key has been changed, which makes jStorage also a local PubSub platform for web applications.

jStorage is pretty small, about 7kB when minified, 3kB gzipped.

## Function reference

### set(key, value[, options])

```javascript
$.jStorage.set(key, value, options)
```

Saves a value to local storage. key needs to be string otherwise an exception is thrown. value can be any JSONeable value, including objects and arrays or a XML node.
Currently XML nodes can't be nested inside other objects: `$.jStorage.set("xml", xml_node)` is OK but `$.jStorage.set("xml", {xml: xml_node})` is not.

Options is an optional options object. Currently only available option is options.TTL which can be used to set the TTL value to the key `$.jStorage.set(key, value, {TTL: 1000})`. NB - if no TTL option value has been set, any currently used TTL value for the key will be removed.

### get(key[, default])

```javascript
value = $.jStorage.get(key)
value = $.jStorage.get(key, "default value")
```

get retrieves the value if key exists, or default if it doesn't. key needs to be string otherwise an exception is thrown. default can be any value.

### deleteKey(key)

```javascript
$.jStorage.deleteKey(key)
```

Removes a key from the storage. key needs to be string otherwise an exception is thrown.

### setTTL(key, ttl)

```javascript
$.jStorage.set("mykey", "keyvalue");
$.jStorage.setTTL("mykey", 3000); // expires in 3 seconds
```

Sets a TTL (in milliseconds) for an existing key. Use 0 or negative value to clear TTL.

### getTTL(key)

```javascript
ttl = $.jStorage.getTTL("mykey"); // TTL in milliseconds or 0
Gets remaining TTL (in milliseconds) for a key or 0 if not TTL has been set.
```

### flush()

```javascript
$.jStorage.flush()
```

Clears the cache.

### index()

```javascript
$.jStorage.index()
```

Returns all the keys currently in use as an array.

```javascript
var index = $.jStorage.index();
console.log(index); // ["key1","key2","key3"]
```

### storageSize()

```javascript
$.jStorage.storageSize()
```

Returns the size of the stored data in bytes

### currentBackend()

```javascript
$.jStorage.currentBackend()
```

Returns the storage engine currently in use or false if none

### reInit()

```javascript
$.jStorage.reInit()
```

Reloads the data from browser storage

### storageAvailable()

```javascript
$.jStorage.storageAvailable()
```

Returns true if storage is available

### subscribe(channel, callback)

```javascript
$.jStorage.subscribe("ch1", function(channel, payload){
    console.log(payload+ " from " + channel);
});
```

Subscribes to a Publish/Subscribe channel (see demo)

### publish(channel, payload)

```javascript
$.jStorage.publish("ch1", "data");
```

Publishes payload to a Publish/Subscribe channel (see demo)

### listenKeyChange(key, callback)

```javascript
$.jStorage.listenKeyChange("mykey", function(key, action){
    console.log(key + " has been " + action);
});
```

Listens for updates for selected key. NB! even updates made in other windows/tabs are reflected, so this feature can also be used for some kind of publish/subscribe service.

If you want to listen for any key change, use `"*"` as the key name

```javascript
$.jStorage.listenKeyChange("*", function(key, action){
    console.log(key + " has been " + action);
});
```

### stopListening(key[, callback])

```javascript
$.jStorage.stopListening("mykey"); // cancel all listeners for "mykey" change
```

Stops listening for key change. If callback is set, only the used callback will be cleared, otherwise all listeners will be dropped.

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

See [tests/index.html](http://www.jstorage.info/static/tests/index.html) for unit tests

## Docs

Project homepage and docs: [www.jstorage.info](http://www.jstorage.info)

## License

[Unlicense](http://unlicense.org/) Since version 0.4.7

**MIT** (versions up to 0.4.6)


[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/andris9/jstorage/trend.png)](https://bitdeli.com/free "Bitdeli Badge")

