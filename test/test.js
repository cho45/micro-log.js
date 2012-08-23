#!/usr/bin/env node

var assert = require('assert');

var log = require('../lib/micro-log.js').log;
var message = null;
log.LOG = function (_) { message = _ };

log.setLevel('debug');

log.warn('foo');
assert.ok(message.match(/^\d\d\d\d-\d\d-\d\d \d\d:\d\d:\d\d\+\d\d:\d\d \[warn\] foo/), message);
message = null;

log.debug('foo');
assert.ok(message.match(/^\d\d\d\d-\d\d-\d\d \d\d:\d\d:\d\d\+\d\d:\d\d \[debug\] foo/), message);
message = null;

log.info('foo');
assert.ok(message.match(/^\d\d\d\d-\d\d-\d\d \d\d:\d\d:\d\d\+\d\d:\d\d \[info\] foo/), message);
message = null;

log.critical('foo');
assert.ok(message.match(/^\d\d\d\d-\d\d-\d\d \d\d:\d\d:\d\d\+\d\d:\d\d \[critical\] foo/), message);
message = null;

log.setLevel('info');
log.debug('foo');
assert.equal(message, null);

//===

log.warn('foo %p', {
	foo : 'bar'
});
assert.ok(message.match(/^\d\d\d\d-\d\d-\d\d \d\d:\d\d:\d\d\+\d\d:\d\d \[warn\] foo \(\{"foo":"bar"\}\)/));
message = null;

/**
log.LOG = function (message) {
	var img = new Image();
	img.src = '/api/report_js_error?' +
		'&loc=' + encodeURIComponent(location.href) +
		'&msg=' + encodeURIComponent(message);
};
*/
