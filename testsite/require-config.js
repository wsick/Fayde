var require = {
    baseUrl: "./",
    paths: {
        "text": "lib/requirejs-text/text"
    },
    deps: ["text", "text!fayde.json"],
    callback: function (text, config) {
        Fayde.Bootstrap();
    }
};