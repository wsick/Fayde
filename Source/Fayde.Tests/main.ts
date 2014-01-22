/// <reference path="scripts/require.d.ts" />
/// <reference path="scripts/qunit.d.ts" />

require.config({
    baseUrl: "./",
    paths: {
        "text": "scripts/text",
        "Fayde": "/Fayde/Fayde",
        "qunit": "scripts/qunit-1.13.0"
    },
    deps: ["text","Fayde","qunit","runner"],
    callback: (...modules: any[]) => {
        require("runner").run();
    },
    shim: {
        "Fayde": {
            exports: "Fayde",
            init: () => {
            }
        },
        "qunit": {
            exports: "qunit",
            init: () => {
                QUnit.config.autoload = false;
                QUnit.config.autostart = false;
            }
        },
        "runner": {
            deps: ["Fayde"]
        }
    }
});