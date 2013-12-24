# Contributing

I consider jStorage complete, so only bug fixes are accepted but no new features please. jStorage has an extremely
permissive license, you can do whatever you like with the code with no kind of attribution required. If you want a
version of jStorage that has additional features or has some existing features stripped, you can fork or clone the
code of jStorage and treat it as you like. You can even republish it under another name and license if you like,
no constraints about that.

## Alternatives

If you do not need to support IE6 and IE7, you don't even need something like jStorage. You can accomplish all
your storage needs with the folowing simple functions with no dependencies whatsoever

    /**
     * Stores a value to the persistent browser storage
     *
     * @param {String} key The key name of stored object
     * @param {Mixed} value A value to be stored, can be anything that is JSON compatible
     */
    function store(key, value){
        window.localStorage[key] = JSON.stringify(value);
    }

    /**
     * Loads a value from the persistent browser storage by a key
     *
     * @param {String} key The key name of stored object
     * @return {Mixed} Stored value, can be anything that is JSON compatible
     */
    function retrieve(key){
        var value;
        try{
            value = JSON.parse(window.localStorage[key]);
        }catch(E){}
        return value;
    }

The usage of JSON is required to support storing other values than strings which is the "native" storage type
for using localStorage API.

## Formatting

Use 4 spaces instead of tabs. Commas last. Use double quotes instead of single quotes where possible.
