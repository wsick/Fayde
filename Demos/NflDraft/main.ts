/// <reference path="lib/requirejs/require.d.ts" />

require.config({
    baseUrl: "./",
    paths: {
        "text": "lib/requirejs/text",
        "Fayde": "lib/Fayde/Fayde"
    },
    deps: ["text","Fayde"],
    callback: (...modules: any[]) => {
        modules[1].RegisterLibrary("Fayde.Controls", "lib/Fayde.Controls/source.js", "lib/Fayde.Controls/generic.xml");
        modules[1].Run();
    },
    shim: {
        "Fayde": {
            exports: "Fayde"
        },
        "lib/Fayde.Controls/source.js": {
            exports: "Fayde.Controls"
        }
    }
});