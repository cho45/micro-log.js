micro-log.js
============

https://github.com/cho45/micro-log.js

micro logger library for both browsers and node.js


SYNOPSYS
========

```
log.setLevel('info');

log.warn('foobar'); // output to console.log by default
log.info('foobar');
log.debug('aaaaaa'); // does not ouput
```

Send JavaScript errors to server:

```
log.LOG = function (message) {
	var img = new Image();
	img.src = '/api/report_js_error?' +
		'&loc=' + encodeURIComponent(location.href) +
		'&msg=' + encodeURIComponent(message);
};
```


LICENSE
=======

MIT: http://cho45.github.com/mit-license