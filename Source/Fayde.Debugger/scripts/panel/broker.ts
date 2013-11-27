
module Gerudo {
    export var IsFaydePage = false;
    export function onPanelShown(doc: HTMLDocument) {
        Gerudo.eval("(!!window.Fayde)", (result) => {
            IsFaydePage = result;
            if (!IsFaydePage)
                return (doc.body.innerText = "Fayde not found.");
            doc.body.innerHTML = "";
            loadVisualTree(doc);
        }, () => alert("Error"));
    }
    export function onPanelHidden() {
        IsFaydePage = false;
    }

    function loadVisualTree(doc: HTMLDocument) {
        Gerudo.evalFn(
            (window) => {
                if (!window.Gerudo || !window.Gerudo.GetTree) return null;
                return window.Gerudo.GetTree();
            },
            {},
            (result) => updateTree(doc, result),
            () => alert("ERROR!")
            );
    }
    function updateTree(doc: HTMLDocument, tree: ITreeNode[]) {
        for (var i = 0, len = tree.length; i < len; i++) {
            doc.body.appendChild(createElFromTreeNode(tree[i]));
        }
    }
    function createElFromTreeNode(tn: ITreeNode): HTMLDivElement {
        var div = document.createElement("div");
        div.style.marginLeft = "20px";
        div.innerText = tn.TypeName + " [" + tn.ID + (tn.Name ? ":" + tn.Name : "") + "]";

        for (var i = 0, len = tn.Children.length; i < len; i++) {
            div.appendChild(createElFromTreeNode(tn.Children[i]));
        }

        return div;
    }
}