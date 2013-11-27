module Gerudo {
    function serializeNode(uin: Fayde.UINode): Gerudo.ITreeNode {
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
    }

    export function GetTree() {
        var app = Fayde.Application.Current;
        var layers = <Fayde.UINode[]>(<any>app)._Layers;

        var tree: Gerudo.ITreeNode[] = [];
        for (var i = 0, len = layers.length; i < len; i++) {
            tree.push(serializeNode(layers[i]));
        }
        return JSON.stringify(tree);
    };
}