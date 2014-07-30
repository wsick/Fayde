var require = {
    baseUrl: "./",
    paths: {
        "text": "lib/requirejs-text/text",
        "Fayde": "lib/Fayde/Fayde"
    },
    deps: ["text", "Fayde"],
    callback: function (text, Fayde) {
        requirejs(['text!fayde.json'], function (faydejson) {
            try {
                Fayde.Configure(JSON.parse(faydejson));
            } catch (err) {
                console.warn("Invalid fayde.json.", err);
            }
            Fayde.Run();
        }, function (err) {
            console.warn('Could not load fayde.json', err);
            Fayde.Run();
        });
    },
    shim: {
        "Fayde": {
            exports: "Fayde",
            deps: ["text"]
        },
        "runner": {
            deps: ["Fayde"]
        }
    }
};