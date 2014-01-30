/// <reference path="../scripts/require.d.ts" />

require.config({
    baseUrl: "./",
    paths: {
        "text": "../scripts/text",
        "Fayde": "/Fayde/Fayde"
    },
    deps: ["text","Fayde"],
    callback: (...modules: any[]) => {
        modules[1].RegisterLibrary("Fayde.Controls.Input", "App/Fayde.Controls.Input/source.js", "App/Fayde.Controls.Input/generic.xml");
        modules[1].Run();
    },
    shim: {
        "Fayde": {
            exports: "Fayde",
            init: () => {
            }
        },
        "App/Fayde.Controls.Input/source.js": {
            exports: "Fayde.Controls.Input"
        }
    }
});