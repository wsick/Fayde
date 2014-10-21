var require = {
    baseUrl: "./",
    paths: {
        "text": "lib/requirejs-text/text"
    },
    deps: ["text"],
    callback: function (text) {
        Fayde.LoadConfigJson(function (config, err) {
            if (err)
                console.warn('Could not load fayde configuration file.', err);
            Fayde.Run();
        });
    }
};