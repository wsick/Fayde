require.config({
    baseUrl: "./",
    paths: {
        "text": "lib/requirejs/text",
        "Fayde": "lib/Fayde/Fayde"
    },
    deps: ["text","Fayde"],
    callback: function (text, Fayde) {
        Fayde.Run();
    },
    shim: {
        "Fayde": {
            exports: "Fayde"
        }
    }
});