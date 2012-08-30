/**
 * https://github.com/cho45/micro-log.js
 * (c) cho45 http://cho45.github.com/mit-license
 */
var log = {
	levels : ['debug', 'info', 'warn', 'critical'],

	LOG : function (message) { console.log(message) },

	log : function (obj) {
		if (this.level > obj.level) return;
		this.LOG(this.formatLog(obj));
	},

	formatLog : function (obj) {
		var now = new Date();
		var tz = now.getTimezoneOffset();
		var datetime = [
			now.getFullYear(),
			String(100 + now.getMonth() + 1).slice(1),
			String(100 + now.getDate()).slice(1)
		].join('-') + ' ' + [
			String(100 + now.getHours()).slice(1),
			String(100 + now.getMinutes()).slice(1),
			String(100 + now.getSeconds()).slice(1)
		].join(':') + (tz > 0 ? '-' : '+') + [
			String(100 + Math.floor(Math.abs(tz) / 60)).slice(1),
			String(100 + (Math.abs(tz) % 60)).slice(1)
		].join(':');

		var self = this;
		return datetime + ' [' + this.levels[obj.level] + '] ' + String(obj.format).replace(/%./, function (_) {
			var type = self.formatLog_types[_];
			return type ? type.call(self, obj.values.shift()) : _;
		});
	},

	formatLog_types : {
		'%%' : function () { return '%' },
		'%s' : function (_) { return String(_) },
		'%p' : function (_) { return this.inspect(_) }
	},

	levelOf : function (string) {
		if (typeof string === 'number') return string;
		for (var i = 0, it; (it = log.levels[i]); i++) if (it === string) return i;
		return -1;
	},

	setLevel : function (level) {
		this.level = this.levelOf(level);
	},

	// this library is for both browsers and node.js so re-define uneval:
	inspect : function (o) {
		switch (typeof o) {
			case "undefined" : return "(void 0)";
			case "boolean"   : return String(o);
			case "number"    : return String(o);
			case "string"    : return '"' + o.replace(/[^a-z0-9 ]/gi, function (_) { return '\\u' + (0x10000 + _.charCodeAt(0)).toString(16).slice(1) }) + '"';
			case "function"  : return "(" + o.toString() + ")";
			case "object"    :
				if (o === null) return "null";
				var type = Object.prototype.toString.call(o).match(/\[object (.+)\]/);
				if (!type) throw TypeError("unknown type:"+o);
				var ret;
				switch (type[1]) {
					case "Array":
						ret = [];
						for (var i = 0, l = o.length; i < l; ret.push(arguments.callee(o[i++])));
						return "[" + ret.join(", ") + "]";
					case "Object":
						ret = [];
						for (var i in o) if (o.hasOwnProperty(i)) {
							ret.push(arguments.callee(i) + ":" + arguments.callee(o[i]));
						}
						return "({" + ret.join(", ") + "})";
					case "Number":
						return "(new Number(" + o + "))";
					case "String":
						return "(new String(" + arguments.callee(o) + "))";
					case "Date":
						return "(new Date(" + o.getTime() + "))";
					default:
						if (o.toSource) return o.toSource();
						throw TypeError("unknown type:"+o);
				}
		}
		return "";
	}
};

(function () {
	for (var i = 0, it; (it = log.levels[i]); i++) (function (it, level) {
		log[it] = function () {
			this.log({
				level  : level,
				format : Array.prototype.shift.call(arguments),
				values : Array.prototype.slice.call(arguments)
			});
		};
	})(it, i);
})();

log.setLevel('warn');

this.log = log;

