test( "backend" , function(){
	ok(!!$.jStorage.currentBackend(), $.jStorage.currentBackend())
});

test( "flush/index", function() {
	ok($.jStorage.flush());
	$.jStorage.set("test", "value");
	deepEqual($.jStorage.index(), ["test"]);
	ok($.jStorage.flush());
	deepEqual($.jStorage.index(), []);
	ok(!$.jStorage.get("test"));
});

module( "set" );

test("missing", function() {
  	ok($.jStorage.get("test") === null);
  	$.jStorage.flush();
});

test("use default", function() {
	$.jStorage.set("value exists", "value");
  	ok($.jStorage.get("no value", "def") === "def");
  	ok($.jStorage.get("value exists", "def") === "value");
  	$.jStorage.flush();
});

test("string", function() {
	ok($.jStorage.set("test", "value") == "value");
  	ok($.jStorage.get("test") == "value");
  	$.jStorage.flush();
});

test("boolean", function() {
	ok($.jStorage.set("test true", true) === true);
  	ok($.jStorage.get("test true") === true);
  	ok($.jStorage.set("test false", false) === false);
  	ok($.jStorage.get("test false") === false);
  	$.jStorage.flush();
});

test("number", function() {
	ok($.jStorage.set("test", 10.01) === 10.01);
  	ok($.jStorage.get("test") === 10.01);
  	$.jStorage.flush();
});

test("obejct", function() {
	var testObj = {arr:[1,2,3]};
	deepEqual($.jStorage.set("test", testObj), testObj);
	deepEqual($.jStorage.get("test"), testObj);
	ok($.jStorage.get("test") != testObj);
  	$.jStorage.flush();
});

asyncTest( "XML", function() {
	var xmlhttp;

	expect(3);

    if (window.XMLHttpRequest){
        xmlhttp = new XMLHttpRequest();
    }else{
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }

    xmlhttp.onreadystatechange=function(){
        if(xmlhttp.readyState==4 && xmlhttp.status==200){
            ok($.jStorage.set("jskey_xml", xmlhttp.responseXML));
            ok($.jStorage.get("jskey_xml") != xmlhttp.responseXML);
            ok($.jStorage.get("jskey_xml").getElementsByTagName("title")[0].firstChild.nodeValue == "Pealkiri");
            $.jStorage.flush();
            start();
        }
    }
    xmlhttp.open("GET","data.xml",true);
    xmlhttp.send();
});

asyncTest("TTL", function() {
	expect(2);
	$.jStorage.set("ttlkey", "value", {TTL:500});
	setTimeout(function(){
		ok($.jStorage.get("ttlkey") == "value");
		setTimeout(function(){
			ok($.jStorage.get("ttlkey") === null);
			$.jStorage.flush();
			start();
		}, 500);
	}, 250);
});

module();

asyncTest("setTTL", function() {
	expect(2);
	$.jStorage.set("ttlkey", "value");
	$.jStorage.setTTL("ttlkey", 500);
	setTimeout(function(){
		ok($.jStorage.get("ttlkey") == "value");
		setTimeout(function(){
			ok($.jStorage.get("ttlkey") === null);
			$.jStorage.flush();
			start();
		}, 500);
	}, 250);
});

asyncTest("getTTL", function() {
	expect(2);
	$.jStorage.set("ttlkey", "value", {TTL: 500});
	setTimeout(function(){
		ok($.jStorage.getTTL("ttlkey") > 0);
		setTimeout(function(){
			ok($.jStorage.getTTL("ttlkey") === 0);
			$.jStorage.flush();
			start();
		}, 500);
	}, 250);
});

test("deleteKey", function() {
	deepEqual($.jStorage.index(), []);
	$.jStorage.set("test", "value");
	deepEqual($.jStorage.index(), ["test"]);
	ok($.jStorage.deleteKey("test"));
	ok(!$.jStorage.deleteKey("test"));
	deepEqual($.jStorage.index(), []);
  	$.jStorage.flush();
});

asyncTest("publish/subscribe", function() {
	expect(2);
	$.jStorage.subscribe("testchannel", function(channel, payload){
		ok(channel == "testchannel");
		deepEqual(payload, {arr: [1,2,3]});
		$.jStorage.flush();
	    start();
	});

	setTimeout(function(){
		$.jStorage.publish("testchannel", {arr: [1,2,3]});
	}, 100);
});

module("listenKeyChange");

asyncTest("specific key - updated", function() {
	$.jStorage.listenKeyChange("testkey", function(key, action){
		ok(key == "testkey");
		ok(action == "updated");
		$.jStorage.stopListening("testkey");
	    start();
	});

	setTimeout(function(){
		$.jStorage.set("testkey", "value");
	}, 100);
});

asyncTest("specific key - deleted", function() {
	$.jStorage.listenKeyChange("testkey", function(key, action){
		ok(key == "testkey");
		ok(action == "deleted");
		$.jStorage.stopListening("testkey");
		$.jStorage.flush();
	    start();
	});

	setTimeout(function(){
		$.jStorage.deleteKey("testkey");
	}, 100);
});

asyncTest("all keys - updated", function() {
    $.jStorage.listenKeyChange("*", function(key, action){
        ok(key == "testkey");
        ok(action == "updated");
        $.jStorage.stopListening("*");
        start();
    });

    setTimeout(function(){
        $.jStorage.set("testkey", "value");
    }, 100);
});

asyncTest("specific key - deleted", function() {
    $.jStorage.listenKeyChange("*", function(key, action){
        ok(key == "testkey");
        ok(action == "deleted");
        $.jStorage.stopListening("*");
        $.jStorage.flush();
        start();
    });

    setTimeout(function(){
        $.jStorage.deleteKey("testkey");
    }, 100);
});
