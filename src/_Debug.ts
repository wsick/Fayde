module Fayde {
    export function debugLayers (): any[] {
        var arr = [];
        var app = Fayde.Application.Current;
        for (var walker = app.MainSurface.walkLayers(); walker.step();) {
            arr.push(sexify(walker.current));
        }
        return arr;
    }

    export function sexify (updater: minerva.core.Updater) {
        var node = updater.getAttachedValue("$node");
        var xobj = node.XObject;

        var ctor = new Function("return function " + xobj.constructor.name + "() { }")();
        var obj = new ctor();

        obj.assets = updater.assets;
        obj.children = [];
        obj.id = xobj._ID;
        obj.node = node;

        for (var walker = updater.tree.walk(); walker.step();) {
            obj.children.push(sexify(walker.current));
        }

        return obj;
    }

    export function debugLayersRaw (): string {
        var app = Fayde.Application.Current;
        var output = "";
        for (var walker = app.MainSurface.walkLayers(); walker.step();) {
            output += stringify(walker.current);
        }
        return output;
    }

    function stringify (updater: minerva.core.Updater, level: number = 0): string {
        var node = updater.getAttachedValue("$node");
        var xobj = node.XObject;

        var output = "";

        for (var i = 0; i < level; i++) {
            output += "\t";
        }

        output += xobj.constructor.name;
        output += "[" + xobj._ID + "]";

        var ns = node.NameScope;
        var nsr = !ns ? "^" : (ns.IsRoot ? "+" : "-");
        output += " [" + nsr + node.Name + "]";

        output += "\n";

        for (var walker = updater.tree.walk(); walker.step();) {
            output += stringify(walker.current, level + 1);
        }

        return output;
    }

    export function getById (id: number) {
        var app = Fayde.Application.Current;
        for (var walker = app.MainSurface.walkLayers(); walker.step();) {
            for (var subwalker = walker.current.walkDeep(); subwalker.step();) {
                var upd = subwalker.current;
                var node = upd.getAttachedValue("$node");
                var xobj = node.XObject;
                if (xobj._ID === id) {
                    return {
                        obj: xobj,
                        node: node,
                        updater: upd
                    };
                }
            }
        }
    }

    export function debugLayersFlatten (): any[] {
        var arr = [];
        var app = Fayde.Application.Current;
        for (var walker = app.MainSurface.walkLayers(); walker.step();) {
            for (var subwalker = walker.current.walkDeep(); subwalker.step();) {
                arr.push(subwalker.current);
            }
        }
        return arr;
    }
}