module Fayde {
    export function _VisualTree(id: number): string {
        var uin = findNodeById(id);
        return flattenTree(uin)
            .map(serializeTreeNode)
            .join("\n");
    }

    function findNodeById(id: number): UINode {
        var rv = Application.Current.RootVisual;
        var topNode = (rv) ? rv.XamlNode : null;
        if (!topNode)
            return;

        if (!id)
            return topNode;

        var walker = DeepTreeWalker(topNode);
        var curNode: UINode;
        while (curNode = walker.Step()) {
            if ((<any>curNode.XObject)._ID === id)
                return curNode;
        }
    }
    interface ITreeNode {
        node: UINode;
        level: number;
    }
    function flattenTree(uin: UINode, arr?: ITreeNode[], level?: number): ITreeNode[] {
        arr = arr || [];
        level = level || 0;
        arr.push({ node: uin, level: level });
        var enumerator = uin.GetVisualTreeEnumerator();
        while (enumerator.moveNext()) {
            flattenTree(enumerator.current, arr, level + 1);
        }
        return arr;
    }
    function serializeTreeNode(tn: ITreeNode): string {
        var s = repeatString("\t", tn.level);
        var uie = tn.node.XObject;
        s += (<any>uie).constructor.name;
        var id = (<any>uie)._ID;
        if (id) s += "[" + id + "]";
        var name = tn.node.Name;
        s += " [";
        var ns = tn.node.NameScope;
        if (!ns)
            s += "^";
        else if (ns.IsRoot)
            s += "+";
        else
            s += "-";
        s += name + "]";

        s += serializeUIElement(uie);

        if (uie instanceof Controls.Grid)
            s += serializeGrid(<Controls.Grid>uie, tn.level);

        return s;
    }
    function serializeUIElement(uie: UIElement) {
        var str = "(";
        if (uie.Visibility === Fayde.Visibility.Visible)
            str += "Visible";
        else
            str += "Collapsed";

        var lu = uie.XamlNode.LayoutUpdater;
        if (lu) {
            str += " ";
            var p = lu.VisualOffset;
            if (p)
                str += p.toString();
            var s = size.fromRaw(lu.ActualWidth, lu.ActualHeight);
            str += " ";
            str += s.toString();
        }
        str += ")";

        return str;
    }

    function serializeGrid(grid: Controls.Grid, level: number) {
        if (!grid)
            return "";
        
        var str = "";

        var rds = enumToArray(grid.RowDefinitions)
            .map((rd, i) => serializeRowDef(rd, i, level))
            .join("\n");
        if (rds)
            str += repeatString("\t", level) + "  Rows (" + grid.RowDefinitions.Count + "):\n" + rds;

        var cds = enumToArray(grid.ColumnDefinitions)
            .map((cd, i) => serializeColDef(cd, i, level))
            .join("\n");
        if (cds) {
            if (str) str += "\n";
            str += repeatString("\t", level) + "  Columns (" + grid.ColumnDefinitions.Count + "):\n" + cds;
        }

        if (str)
            return "\n" + str;
        return "";
    }
    function serializeRowDef(row: Controls.RowDefinition, index: number, level: number): string {
        return repeatString("\t", level + 1)
            + "[" + index + "] -> " + row.ActualHeight;
    }
    function serializeColDef(col: Controls.ColumnDefinition, index: number, level: number): string {
        return repeatString("\t", level + 1)
            + "[" + index + "] -> " + col.ActualWidth;
    }
    
    function enumToArray<T>(en: IEnumerable<T>): T[] {
        var e = en.getEnumerator();
        var arr: T[] = [];
        while (e.moveNext()) {
            arr.push(e.current);
        }
        return arr;
    }
    function repeatString(s: string, n: number): string {
        var str = "";
        for (var i = 0; i < n; i++) {
            str += s;
        }
        return str;
    }
}