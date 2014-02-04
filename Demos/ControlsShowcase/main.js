require.config({
    baseUrl: "./",
    paths: {
        "text": "scripts/text",
        "Fayde": "scripts/Fayde"
    },
    deps: ["text","Fayde"],
    callback: function (text, Fayde) {
        Fayde.RegisterLibrary("Fayde.Controls", "scripts/Fayde.Controls/source.js", "scripts/Fayde.Controls/generic.xml");
        Fayde.Run();
    },
    shim: {
        "Fayde": {
            exports: "Fayde"
        },
        "scripts/Fayde.Controls/source.js": {
            exports: "Fayde.Controls"
        }
    }
});