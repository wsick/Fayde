require.config({
    baseUrl: "./",
    paths: {
        "text": "lib/requirejs/text",
        "Fayde": "lib/Fayde/Fayde"
    },
    deps: ["text","Fayde"],
    callback: function (text, Fayde) {
        Fayde.RegisterLibrary("Fayde.Controls", "lib/Fayde.Controls/source.js", "lib/Fayde.Controls/generic.xml");
        Fayde.Run();
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