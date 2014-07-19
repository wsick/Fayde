/// <reference path="../qunit.d.ts" />
/// <reference path="../lib/Fayde/Fayde.d.ts" />

export function run() {
    QUnit.module("DataTemplate Tests");

    test("Basic Load", () => {
        var xaml = "<DataTemplate xmlns=\"http://schemas.wsick.com/fayde\" xmlns:x=\"http://schemas.wsick.com/fayde/x\">"
            + "<Grid></Grid>"
            + "</DataTemplate>";

        var dt: Fayde.DataTemplate;
        try {
            dt = <Fayde.DataTemplate>Fayde.Xaml.Load(new Fayde.Xaml.XamlDocument(xaml).Document);
        } catch (err) {
            ok(false, "Loading a DataTemplate should not error. " + err.toString());
        }
        strictEqual((<any>dt).constructor, Fayde.DataTemplate, "Resulting object should be a DataTemplate.");

        var visual = dt.GetVisualTree(null);
        strictEqual((<any>visual).constructor, Fayde.Controls.Grid, "Root visual from created visual tree should be a Grid.");
    });

    test("Implicit DataTemplate", () => {
        var xaml = "<Grid xmlns=\"http://schemas.wsick.com/fayde\" xmlns:x=\"http://schemas.wsick.com/fayde/x\">"
            + "<Grid.Resources>"
            + "<DataTemplate DataType=\"Color\">"
            + "<TextBlock Text=\"{Binding R}\" />"
            + "</DataTemplate>"
            + "</Grid.Resources>"
            + "<ContentControl Content=\"{x:Static new Color()}\">"
            + "</ContentControl>"
            + "</Grid>";
        var grid: Fayde.Controls.Grid;
        try {
            grid = <Fayde.Controls.Grid>Fayde.Xaml.Load(new Fayde.Xaml.XamlDocument(xaml).Document);
        } catch (err) {
            ok(false, "Loading a DataTemplate should not error. " + err.toString());
        }
        ok(grid.Resources.Contains(Color));
        var dt = <Fayde.DataTemplate>grid.Resources.Get(Color);
        ok(dt instanceof Fayde.DataTemplate);
        strictEqual(dt.DataType, Color, "DataType for DataTemplate should be Color.");

        strictEqual(grid.Children.Count, 1);
        var cc = <Fayde.Controls.ContentControl>grid.Children.GetValueAt(0);
        ok(cc instanceof Fayde.Controls.ContentControl, "Grid should have a ContentControl.");
        cc.Measure(new size());

        var cp = <Fayde.Controls.ContentPresenter>Fayde.VisualTreeHelper.GetChild(cc, 0);
        ok(cp instanceof Fayde.Controls.ContentPresenter, "ContentControl should have a ContentPresenter.");

        var tb = <Fayde.Controls.TextBlock>Fayde.VisualTreeHelper.GetChild(cp, 0);
        ok(tb instanceof Fayde.Controls.TextBlock, "ContentPresenter should have a TextBlock.");
        strictEqual(tb.Text, "0");
    });

    test("Key/TargetType not specified", () => {
        var xaml = "<Grid xmlns=\"http://schemas.wsick.com/fayde\" xmlns:x=\"http://schemas.wsick.com/fayde/x\">"
            + "<Grid.Resources>"
            + "<DataTemplate>"
            + "<Grid></Grid>"
            + "</DataTemplate>"
            + "</Grid.Resources>"
            + "</Grid>";
        var grid: Fayde.Controls.Grid;
        try {
            grid = <Fayde.Controls.Grid>Fayde.Xaml.Load(new Fayde.Xaml.XamlDocument(xaml).Document);
            ok(false, "Expected parse error in xaml load.");
        } catch (err) {
            ok(err instanceof XamlParseException, err);
        }
    });
}