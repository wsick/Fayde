var require = {
    baseUrl: "./",
    paths: {
        "text": "lib/requirejs-text/text",
        "minerva": "lib/minerva/minerva",
        "Fayde": "lib/Fayde/Fayde"
    },
    deps: ["text", "minerva", "Fayde"],
    callback: function (text, minerva, Fayde) {
        Fayde.LoadConfigJson(function (config, err) {
            if (err)
                console.warn('Could not load fayde configuration file.', err);
            Fayde.Run();
        });
    },
    shim: {
        "Fayde": {
            exports: "Fayde",
            deps: ["text", "minerva"]
        }
    }
};