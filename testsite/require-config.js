var require = {
    baseUrl: "./",
    paths: {
        "text": "lib/requirejs-text/text"
    },
    deps: ["text"],
    callback: function (text) {
        Fayde.Bootstrap();
    }
};