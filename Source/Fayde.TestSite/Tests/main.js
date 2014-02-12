/// <reference path="../scripts/require.d.ts" />
require.config({
    baseUrl: "./",
    paths: {
        "text": "../scripts/text",
        "Fayde": "/Fayde/Fayde"
    },
    deps: ["text", "Fayde"],
    callback: function () {
        var modules = [];
        for (var _i = 0; _i < (arguments.length - 0); _i++) {
            modules[_i] = arguments[_i + 0];
        }
        modules[1].RegisterLibrary("Fayde.Controls", "App/Fayde.Controls/source.js", "App/Fayde.Controls/generic.xml");
        modules[1].Run();
    },
    shim: {
        "Fayde": {
            exports: "Fayde",
            init: function () {
            }
        },
        "App/Fayde.Controls/source.js": {
            exports: "Fayde.Controls"
        }
    }
});
