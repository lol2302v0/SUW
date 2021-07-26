function isUndef(v) {
	return Object.prototype.toString.call(v) == "[object Undefined]";
}

function isNull(v) {
	return Object.prototype.toString.call(v) == "[object Null]";
}

function isObj(v) {
	return Object.prototype.toString.call(v) == "[object Object]";
}

function isArr(v) {
	return Object.prototype.toString.call(v) == "[object Array]";
}

function isBool(v) {
	return Object.prototype.toString.call(v) == "[object Boolean]";
}

function isNum(v) {
	return Object.prototype.toString.call(v) == "[object Number]";
}

function isStr(v) {
	return Object.prototype.toString.call(v) == "[object String]";
}
