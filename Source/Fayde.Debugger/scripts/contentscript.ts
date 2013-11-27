/// <reference path="typings/chrome/chrome.d.ts" />
/// <reference path="typings/Fayde.d.ts" />

function inject () {
    // NOTE: Injecting into page
    var fn = function bootstrap(window) {
        var Fayde = window.Fayde;

        if (window.Gerudo)
            return;
        window.Gerudo = {};

        var serializeNode = function (uin: Fayde.UINode): Gerudo.ITreeNode {
            var uie = uin.XObject;
            var children: Gerudo.ITreeNode[] = [];

            var enumerator = uin.GetVisualTreeEnumerator();
            while (enumerator.MoveNext()) {
                children.push(serializeNode(enumerator.Current));
            }

            return {
                ID: (<any>uie)._ID,
                Name: uin.Name,
                TypeName: (<any>uie).constructor._TypeName,
                Children: children
            };
        };

        window.Gerudo.GetTree = function () {
            var app = window.Fayde.Application.Current;
            var layers = <Fayde.UINode[]>app.MainSurface._Layers;

            var tree: Gerudo.ITreeNode[] = [];
            for (var i = 0, len = layers.length; i < len; i++) {
                tree.push(serializeNode(layers[i]));
            }
            return tree;
        };

    };

    var script = window.document.createElement("script");
    script.innerHTML = "(" + fn.toString() + ")(window)";

    document.head.appendChild(script);
}

document.addEventListener("DOMContentLoaded", inject);