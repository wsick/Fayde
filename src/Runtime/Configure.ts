module Fayde {
    var jsonFile = 'fayde.json';

    declare var require;

    export function LoadConfigJson (onComplete: (config: any, err?: any) => void) {
        var cscr = findFaydeConfigScripts();
        if (cscr.length > 0) {

        }

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
        if (json)
            configureLibs(json.libs || {});
        onComplete(json);
    }

    interface ILibraryConfig {
        name: string;
        path: string;
        deps: string[];
        exports: string
    }

    function configureLibs (json) {
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
        var path = libJson.path;
        if (!path)
            path = "lib/" + libName + "/" + libName;

        return {
            name: libName,
            path: path,
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

        var library = Library.Get("lib:" + lib.name);
        library.GetModuleRequireUrl = () => lib.path;
    }

    function findFaydeConfigScripts (): HTMLScriptElement[] {
        var arr: HTMLScriptElement[] = [];
        for (var i = 0, scripts = document.scripts, len = scripts.length; i < len; i++) {
            var script = scripts[i];
            if (script.id === "fayde-config")
                arr.push(script);
        }
        return arr;
    }
}