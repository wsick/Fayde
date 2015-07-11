import Grid = Fayde.Controls.Grid;
import GridLength = Fayde.Controls.GridLength;
import GridUnitType = minerva.controls.grid.GridUnitType;

export function load () {
    QUnit.module("Markup/Controls");

    var nsdecl = 'xmlns="' + Fayde.XMLNS + '" xmlns:x="' + Fayde.XMLNSX + '"';

    test("Border with Child", () => {
        var xaml = "<Border " + nsdecl + "><TextBlock Text=\"Hey!\" /></Border>";
        var root = Fayde.Markup.LoadXaml<Fayde.Controls.Border>(null, xaml);
        var child = <Fayde.Controls.TextBlock>root.Child;
        strictEqual((<any>child).constructor, Fayde.Controls.TextBlock, "Border Child should be a TextBlock.");
        strictEqual(child.Text, "Hey!", "Border Child should have Text property set to 'Hey!'");
    });

    test("Panel with Children", () => {
        var xaml = "<StackPanel " + nsdecl + "><Border /><TextBlock /></StackPanel>";
        var root = Fayde.Markup.LoadXaml<Fayde.Controls.StackPanel>(null, xaml);
        strictEqual(root.Children.Count, 2, "There should be 2 children in StackPanel.");
        var child1 = <Fayde.Controls.Border>root.Children.GetValueAt(0);
        var child2 = <Fayde.Controls.TextBlock>root.Children.GetValueAt(1);
        strictEqual((<any>child1).constructor, Fayde.Controls.Border, "First child should be a Border.");
        strictEqual((<any>child2).constructor, Fayde.Controls.TextBlock, "Second child should be a TextBlock.");
    });

    test("ContentControl", () => {
        var xaml = "<CheckBox " + nsdecl + ">Hey</CheckBox>";
        var checkbox = Fayde.Markup.LoadXaml<Fayde.Controls.CheckBox>(null, xaml);
        strictEqual(checkbox.Content, "Hey", "Text Content");
    });

    test("TextBlock Text", () => {
        var xaml = "<TextBlock " + nsdecl + ">Hey</TextBlock>";
        var tb = Fayde.Markup.LoadXaml<Fayde.Controls.TextBlock>(null, xaml);
        strictEqual(tb.Text, "Hey", "Text Content");
    });

    test("ControlTemplate", () => {
        var xaml = "<ControlTemplate " + nsdecl + ">"
            + "<Grid></Grid>"
            + "</ControlTemplate>";

        var ct: Fayde.Controls.ControlTemplate;
        try {
            ct = Fayde.Markup.LoadXaml<Fayde.Controls.ControlTemplate>(null, xaml);
            ok(false, "Loading a ControlTemplate should error if no TargetType is specified.");
        } catch (err) {
            ok(err instanceof XamlParseException, "Loading a ControlTemplate should error if no TargetType is specified.");
        }

        xaml = "<ControlTemplate " + nsdecl + " TargetType=\"Control\">"
        + "<Grid></Grid>"
        + "</ControlTemplate>";

        try {
            ct = Fayde.Markup.LoadXaml<Fayde.Controls.ControlTemplate>(null, xaml);
            ok(true, "Loading a ControlTemplate with a TargetType should succeed.");
        } catch (err) {
            ok(false, "Loading a ControlTemplate with a TargetType should succeed.");
        }

        strictEqual((<any>ct).constructor, Fayde.Controls.ControlTemplate, "Template should be a ControlTemplate.");
        strictEqual(ct.TargetType, Fayde.Controls.Control, "ControlTemplate.TargetType should be Control.");

        var visual = ct.GetVisualTree(null);
        strictEqual((<any>visual).constructor, Fayde.Controls.Grid, "Root visual from created visual tree should be a Grid.");
    });

    test("ItemsPanelTemplate", () => {
        var xaml = "<ItemsPanelTemplate " + nsdecl + ">"
            + "<Border />"
            + "</ItemsPanelTemplate>";

        var ipt: Fayde.Controls.ItemsPanelTemplate;
        try {
            ipt = Fayde.Markup.LoadXaml<Fayde.Controls.ItemsPanelTemplate>(null, xaml);
            var tempPanel = ipt.GetVisualTree(null);
            ok(false, "Getting the visual tree for an ItemsPanelTemplate with a non-Panel root visual should error.");
        } catch (err) {
            ok(err instanceof XamlParseException, "Getting the visual tree for an ItemsPanelTemplate with a non-Panel root visual should error.");
        }

        xaml = "<ItemsPanelTemplate " + nsdecl + ">"
        + "<Grid></Grid>"
        + "</ItemsPanelTemplate>";

        try {
            ipt = Fayde.Markup.LoadXaml<Fayde.Controls.ItemsPanelTemplate>(null, xaml);
        } catch (err) {
            ok(false, "Loading a ItemsPanelTemplate should not error. " + err.toString());
        }
        strictEqual((<any>ipt).constructor, Fayde.Controls.ItemsPanelTemplate, "Resulting object should be a ItemsPanelTemplate.");

        var visual = ipt.GetVisualTree(null);
        strictEqual((<any>visual).constructor, Fayde.Controls.Grid, "Root visual from created visual tree should be a Grid.");
    });

    test("Terse Grid Cols/Rows", () => {
        var xaml = "<Grid " + nsdecl + " ColumnDefinitions=\"auto 200 *\" RowDefinitions=\"100 * auto\"></Grid>";
        var grid = Fayde.Markup.LoadXaml<Grid>(null, xaml);
        var cols = grid.ColumnDefinitions.ToArray();
        strictEqual(cols.length, 3);
        deepEqual(cols[0].Width, new GridLength(0, GridUnitType.Auto));
        deepEqual(cols[1].Width, new GridLength(200, GridUnitType.Pixel));
        deepEqual(cols[2].Width, new GridLength(1, GridUnitType.Star));
        var rows = grid.RowDefinitions.ToArray();
        deepEqual(rows[0].Height, new GridLength(100, GridUnitType.Pixel));
        deepEqual(rows[1].Height, new GridLength(1, GridUnitType.Star));
        deepEqual(rows[2].Height, new GridLength(0, GridUnitType.Auto));
    });
}