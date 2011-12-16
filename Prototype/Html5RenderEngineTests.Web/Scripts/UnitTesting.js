/// <reference path="jquery-1.7.js" />

var _Output;
function SetupTests(selector) {
    _Output = selector;
}

var Assert = {
    _GetFunctionName: function (func, fallback) {
        var funcNameRegex = /function (.{1,})\(/;
        var results = (funcNameRegex).exec(func.toString());
        if (results && results.length > 1)//&& results[1].length > 0)
            return results[1];
        return fallback;
    },
    IsTrue: function (inputFunction, name) {
        var result = inputFunction();
        $(_Output).append(Assert._GetFunctionName(inputFunction, name));
        if (result == true) {
            $(_Output).append(" : <span style=\"color: Green;\">Passed</span>");
        } else {
            $(_Output).append(" : <span style=\"color: Red;\">Failed</span>");
        }
        $(_Output).append("<br />");
    },
    IsFalse: function (inputFunction, name) {
        var result = inputFunction();
        $(_Output).append(Assert._GetFunctionName(inputFunction, name));
        if (result == false) {
            $(_Output).append(" : <span style=\"color: Green;\">Passed</span>");
        } else {
            $(_Output).append(" : <span style=\"color: Red;\">Failed</span>");
        }
        $(_Output).append("<br />");
    }
};