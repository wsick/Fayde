Object.Clone = function (o) {
    return eval(uneval(o));
};

Function.prototype.Clone = function () {
    return eval(uneval(this));
};

String.prototype.indexOfAny = function (carr, start) {
    if (!(carr instanceof Array))
        return -1;
    if (start == null)
        start = 0;
    for (var cur = start; cur < this.length; cur++) {
        var c = this.charAt(c);
        for (var i = 0; i < carr.length; i++) {
            if (c === carr[i])
                return cur;
        }
    }
    return -1;
};

Array.indexOfNullstone = function (arr, ns) {
    /// <param name="ns" type="Object"></param>
    /// <returns type="Number" />
    for (var i = 0; i < arr.length; i++) {
        if (Nullstone.RefEquals(arr[i], ns))
            return i;
    }
    return -1;
};
Array.containsNullstone = function (arr, ns) {
    /// <param name="ns" type="Object"></param>
    /// <returns type="Boolean" />
    return Array.indexOfNullstone(arr, ns) > -1;
};
Array.addDistinctNullstone = function (arr, ns) {
    /// <param name="ns" type="Object"></param>
    /// <returns type="Boolean" />
    if (Array.containsNullstone(arr, ns))
        return false;
    arr.push(ns);
    return true;
};
Array.removeNullstone = function (arr, ns) {
    /// <param name="ns" type="Object"></param>
    for (var i = 0; i < arr.length; i++) {
        if (Nullstone.RefEquals(arr[i], ns)) {
            arr.splice(i, 1);
            return;
        }
    }
};

Number.isNumber = function (o) {
    return typeof o == "number";
};

String.isString = function (o) {
    return typeof o == "string";
};
String.contains = function (str, match) {
    if (!str)
        return false;
    if (!match)
        return false;
    var j = 0;
    for (var i = 0; i < str.length && j < match.length; i++) {
        if (str.charAt(i) === match.charAt(j))
            j++;
        else
            j = 0;
    }
    return j >= match.length;
};
String.format = function (str) {
    var args = arguments;
    return str.replace(/{(\d+)}/g, function (match, number) {
        var i = parseInt(number);
        return typeof args[i + 1] != 'undefined'
          ? args[i + 1]
          : match;
    });
};

window.onerror = function (msg, url, line) {
    alert("Error (" + url + ") @ " + line + "\n" + msg);
};
window.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 200);
        };
    })();