export function load () {
    QUnit.module("Markup Load Tests");

    test("Border with Child", () => {
        var xaml = "<Border xmlns=\"http://schemas.wsick.com/fayde\" xmlns:x=\"http://schemas.wsick.com/fayde/x\"><TextBlock Text=\"Hey!\" /></Border>";
        var root = Fayde.Markup.LoadXaml<Fayde.Controls.Border>(null, xaml);
        var child = <Fayde.Controls.TextBlock>root.Child;
        strictEqual((<any>child).constructor, Fayde.Controls.TextBlock, "Border Child should be a TextBlock.");
        strictEqual(child.Text, "Hey!", "Border Child should have Text property set to 'Hey!'");
    });

    test("Panel with Children", () => {
        var xaml = "<StackPanel xmlns=\"http://schemas.wsick.com/fayde\" xmlns:x=\"http://schemas.wsick.com/fayde/x\"><Border /><TextBlock /></StackPanel>";
        var root = Fayde.Markup.LoadXaml<Fayde.Controls.StackPanel>(null, xaml);
        strictEqual(root.Children.Count, 2, "There should be 2 children in StackPanel.");
        var child1 = <Fayde.Controls.Border>root.Children.GetValueAt(0);
        var child2 = <Fayde.Controls.TextBlock>root.Children.GetValueAt(1);
        strictEqual((<any>child1).constructor, Fayde.Controls.Border, "First child should be a Border.");
        strictEqual((<any>child2).constructor, Fayde.Controls.TextBlock, "Second child should be a TextBlock.");
    });

    test("ContentControl", () => {
        var xaml = "<CheckBox xmlns=\"http://schemas.wsick.com/fayde\" xmlns:x=\"http://schemas.wsick.com/fayde/x\">Hey</CheckBox>";
        var checkbox = Fayde.Markup.LoadXaml<Fayde.Controls.CheckBox>(null, xaml);
        strictEqual(checkbox.Content, "Hey", "Text Content");
    });

    test("TextBlock Text", () => {
        var xaml = "<TextBlock xmlns=\"http://schemas.wsick.com/fayde\" xmlns:x=\"http://schemas.wsick.com/fayde/x\">Hey</TextBlock>";
        var tb = Fayde.Markup.LoadXaml<Fayde.Controls.TextBlock>(null, xaml);
        strictEqual(tb.Text, "Hey", "Text Content");
    });

    test("ControlTemplate", () => {
        var xaml = "<ControlTemplate xmlns=\"http://schemas.wsick.com/fayde\" xmlns:x=\"http://schemas.wsick.com/fayde/x\">"
            + "<Grid></Grid>"
            + "</ControlTemplate>";

        var ct: Fayde.Controls.ControlTemplate;
        try {
            ct = Fayde.Markup.LoadXaml<Fayde.Controls.ControlTemplate>(null, xaml);
            ok(false, "Loading a ControlTemplate should error if no TargetType is specified.");
        } catch (err) {
            ok(err instanceof XamlParseException, "Loading a ControlTemplate should error if no TargetType is specified.");
        }

        xaml = "<ControlTemplate xmlns=\"http://schemas.wsick.com/fayde\" xmlns:x=\"http://schemas.wsick.com/fayde/x\" TargetType=\"Control\">"
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
        var xaml = "<ItemsPanelTemplate xmlns=\"http://schemas.wsick.com/fayde\" xmlns:x=\"http://schemas.wsick.com/fayde/x\">"
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

        xaml = "<ItemsPanelTemplate xmlns=\"http://schemas.wsick.com/fayde\" xmlns:x=\"http://schemas.wsick.com/fayde/x\">"
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
}