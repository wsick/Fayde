var require = {
    baseUrl: "./",
    paths: {
        "text": "lib/requirejs-text/text",
        "Fayde": "lib/Fayde/Fayde"
    },
    deps: ["text", "Fayde"],
    shim: {
        "Fayde": {
            exports: "Fayde",
            deps: ['text']
        },
        "runner": {
            deps: ["Fayde"]
        }
    }
};

require.shim["lib/Fayde.Controls/Fayde.Controls"] = {
    exports: "Fayde.Controls"
};