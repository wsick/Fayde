require.config({
    baseUrl: "./",
    paths: {
        "text": "scripts/text",
        "Fayde": "scripts/Fayde"
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