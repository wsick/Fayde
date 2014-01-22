/// <reference path="scripts/require.d.ts" />
/// <reference path="scripts/qunit.d.ts" />
require.config({
    baseUrl: "./",
    paths: {
        "text": "scripts/text",
        "Fayde": "/Fayde/Fayde",
        "qunit": "scripts/qunit-1.13.0"
    },
    deps: ["text", "Fayde", "qunit", "runner"],
    callback: function () {
        var modules = [];
        for (var _i = 0; _i < (arguments.length - 0); _i++) {
            modules[_i] = arguments[_i + 0];
        }
        require("runner").run();
    },
    shim: {
        "Fayde": {
            exports: "Fayde",
            init: function () {
            }
        },
        "qunit": {
            exports: "qunit",
            init: function () {
                QUnit.config.autoload = false;
                QUnit.config.autostart = false;
            }
        },
        "runner": {
            deps: ["Fayde"]
        }
    }
});
//# sourceMappingURL=main.js.map
