/// <reference path="scripts/typings/requirejs/require.d.ts" />

require.config({
    baseUrl: "./",
    paths: {
        "text": "scripts/text",
        "Fayde": "scripts/Fayde"
    },
    deps: ["text","Fayde"],
    callback: (...modules: any[]) => {
        modules[1].Run();
    },
    shim: {
        "Fayde": {
            exports: "Fayde",
            init: () => {
            }
        }
    }
});