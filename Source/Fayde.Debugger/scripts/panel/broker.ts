/// <reference path="../typings/jquery/jquery.d.ts" />
/// <reference path="../typings/jquery.dynatree/jquery.dynatree.d.ts" />

module Gerudo {
    export var IsFaydePage = false;
    var info: JQuery;
    var tree: JQuery;
    export function onPanelShown(doc: HTMLDocument) {
        info = $("#info");
        tree = $("#tree");
        
        Gerudo.eval("(!!window.Fayde)", (result) => {
            IsFaydePage = result;
            if (!IsFaydePage)
                return (info.text("Fayde not found."));
            info.text("Fayde []");
            
            loadVisualTree();
        }, () => alert("Error"));
    }
    export function onPanelHidden() {
        IsFaydePage = false;
    }

    var data: ITreeNode[];
    function loadVisualTree() {
        Gerudo.evalFn(
            (window) => {
                if (!window.Gerudo || !window.Gerudo.GetTree) return null;
                return window.Gerudo.GetTree();
            },
            {},
            (result) => { data = result; updateTree(); },
            () => alert("ERROR!")
            );
    }
    function updateTree() {
        data.forEach(mutateNode);
        (<any>tree).dynatree({
            onActivate: (node) => {

            },
            persist: true,
            children: data
        });
    }
    function mutateNode(node: ITreeNode) {
        (<any>node).title = node.TypeName + " [" + node.ID + (node.Name ? ":" + node.Name : "") + "]";
        (<any>node).children = node.Children;
        if (node.Children)
            node.Children.forEach(mutateNode);
    }
}