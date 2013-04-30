var StringEx = (function () {
    function StringEx() { }
    StringEx.Format = function Format(format) {
        var items = [];
        for (var _i = 0; _i < (arguments.length - 1); _i++) {
            items[_i] = arguments[_i + 1];
        }
        var args = arguments;
        return format.replace(/{(\d+)}/g, function (match, num) {
            var i = parseInt(num);
            return typeof items[i] != 'undefined' ? items[i] : match;
        });
    };
    return StringEx;
})();
//@ sourceMappingURL=StringEx.js.map
