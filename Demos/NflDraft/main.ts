/// <reference path="lib/requirejs/require.d.ts" />

require.config({
    baseUrl: "./",
    paths: {
        "text": "lib/requirejs/text",
        "Fayde": "lib/Fayde/Fayde"
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