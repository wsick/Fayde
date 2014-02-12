/// <reference path="lib/requirejs/require.d.ts" />
require.config({
    baseUrl: "./",
    paths: {
        "text": "lib/requirejs/text",
        "Fayde": "lib/Fayde/Fayde"
    },
    deps: ["text", "Fayde"],
    callback: function () {
        var modules = [];
        for (var _i = 0; _i < (arguments.length - 0); _i++) {
            modules[_i] = arguments[_i + 0];
        }
        modules[1].Run();
    },
    shim: {
        "Fayde": {
            exports: "Fayde",
            init: function () {
            }
        }
    }
});
//# sourceMappingURL=main.js.map
