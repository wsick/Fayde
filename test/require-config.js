var require = {
    baseUrl: "./",
    paths: {
        "text": "lib/requirejs-text/text",
        "minerva": "lib/minerva/minerva",
        "Fayde": "lib/Fayde/Fayde"
    },
    deps: ["text", "minerva", "Fayde"],
    shim: {
        "Fayde": {
            exports: "Fayde",
            deps: ["text", "minerva"]
        },
        "runner": {
            deps: ["Fayde"]
        }
    }
};