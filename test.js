log.warn('foo');
log.warn('foo %p', {
	foo : 'bar'
});

/**
log.LOG = function (message) {
	var img = new Image();
	img.src = '/api/report_js_error?' +
		'&loc=' + encodeURIComponent(location.href) +
		'&msg=' + encodeURIComponent(message);
};
*/
