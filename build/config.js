module.exports = function (json, libPath) {
    return {
        libs: libs(json, libPath)
    }
};

function libs(json, libPath) {
    var libNames = [];
    var libcos = [];
    for (var libName in json.libs) {
        libNames.push(libName);
        var co = json.libs[libName];
        co.name = libName;
        libcos.push(co);
    }

    return {
        linksTo: function (dir) {
            return libNames.map(function (libName) {
                return {src: libPath + '/' + libName, dest: dir + '/' + libName};
            });
        },
        typings: function () {
            return libcos.filter(function (libco) {
                return Array.isArray(libco.typings);
            }).reduce(function (all, libco) {
                return all.concat(libco.typings.map(function (t) {
                    return libPath + '/' + libco.name + '/' + t;
                }));
            }, []);
        }
    };
}