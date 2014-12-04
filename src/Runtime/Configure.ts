module Fayde {
    var jsonFile = 'fayde.json';

    declare var require;

    export function LoadConfigJson (onComplete: (config: any, err?: any) => void) {
        require(['text!' + jsonFile],
            (jsontext) => configure(jsontext, onComplete),
            (err) => onComplete(err));
    }

    function configure (jsontext: string, onComplete: (config: any, err?: any) => void) {
        var json: any;
        try {
            json = JSON.parse(jsontext);
        } catch (err) {
            return onComplete(null, err);
        }
        if (json) {
            libs.configure(json.libs || {});
            themes.configure(json.themes || {});
            debug.configure(json.debug || {});
        }
        onComplete(json);
    }

    module libs {
        interface ILibraryConfig {
            name: string;
            path: string;
            deps: string[];
            exports: string
        }

        export function configure (json) {
            var libs = [];
            for (var libName in json) {
                libs.push(getLibConfig(libName, json[libName]));
            }

            var configObject = <RequireConfig>{
                paths: {},
                deps: [],
                shim: {},
                map: {
                    "*": {}
                }
            };
            for (var i = 0; i < libs.length; i++) {
                setupLibraryConfig(libs[i], configObject);
            }
            requirejs.config(configObject);
        }

        function getLibConfig (libName: string, libJson: any): ILibraryConfig {
            return {
                name: libName,
                path: libJson.path,
                deps: libJson.deps,
                exports: libJson.exports
            };
        }

        function setupLibraryConfig (lib: ILibraryConfig, co: RequireConfig) {
            var libName = lib.name;

            co.paths[libName] = lib.path;

            var shim = co.shim[libName] = co.shim[libName] || {};

            if (lib.exports)
                shim.exports = lib.exports;
            if (lib.deps)
                shim.deps = lib.deps;

            co.map['*'][lib.path] = libName;

            var library = Fayde.TypeManager.resolveLibrary("lib://" + lib.name);
            if (!!lib.path)
                library.sourcePath = lib.path;
        }
    }

    module themes {
        export function configure (json) {
            for (var libName in json) {
                var co = json[libName];
                var path = co === "none" ? null : (co.path ? co.path : undefined);
                ThemeConfig.Set(libName, path);
            }
        }
    }

    module debug {
        export function configure (json) {
            if (toBoolean(json.warnMissingThemes))
                Theme.WarnMissing = true;
        }

        function toBoolean (val: any): boolean {
            return val === "true"
                || val === true;
        }
    }
}