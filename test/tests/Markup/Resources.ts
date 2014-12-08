export function load () {
    QUnit.module("Markup Load Tests");

    var nsdecl = "xmlns=\"" + Fayde.XMLNS + "\" xmlns:x=\"" + Fayde.XMLNSX + "\"";

    test("FrameworkElement Resources", () => {
        var xaml = "<StackPanel " + nsdecl + ">"
            + "<StackPanel.Resources>"
            + "<Thickness x:Key=\"SomeThickness\">1,2,3,4</Thickness>"
            + "</StackPanel.Resources>"
            + "</StackPanel>";
        var root = Fayde.Markup.LoadXaml<Fayde.Controls.StackPanel>(null, xaml);
        var resources = root.Resources;
        ok(resources.Contains("SomeThickness"), "Resources should contain a resource with a key 'SomeThickness'");
        var thickness = <Thickness>resources.Get("SomeThickness");
        strictEqual(thickness.left, 1, "Thickness.Left must equal 1 and not \"1\".");
        strictEqual(thickness.top, 2, "Thickness.Top must equal 2 and not \"2\".");
        strictEqual(thickness.right, 3, "Thickness.Right must equal 3 and not \"3\".");
        strictEqual(thickness.bottom, 4, "Thickness.Bottom must equal 4 and not \"4\".");
    });

    test("Explicit Resources", () => {
        var xaml = "\
            <Grid " + nsdecl + ">\
                <Grid.Resources>\
                    <ResourceDictionary>\
                        <SolidColorBrush x:Key=\"SomeColor\" Color=\"Yellow\" />\
                    </ResourceDictionary>\
                </Grid.Resources>\
            </Grid>";

        var grid = Fayde.Markup.LoadXaml<Fayde.Controls.Grid>(null, xaml);
        var scb = grid.Resources.Get("SomeColor");
        deepEqual(scb.Color, Color.KnownColors.Yellow);
    });

    test("StaticResource external context", () => {
        var xaml = "\
            <Grid " + nsdecl + ">\
                <Grid.Resources>\
                    <SolidColorBrush x:Key=\"SomeColor\" Color=\"Yellow\" />\
                    <DataTemplate x:Key=\"SomeTemplate\">\
                        <Grid Background=\"{StaticResource SomeColor}\">\
                        </Grid>\
                    </DataTemplate>\
                </Grid.Resources>\
            </Grid>";

        var grid = Fayde.Markup.LoadXaml<Fayde.Controls.Grid>(null, xaml);
        var dt = grid.Resources.Get("SomeTemplate");
        var grid2 = <Fayde.Controls.Grid>dt.GetVisualTree(grid);
        ok(grid2.Background instanceof Fayde.Media.SolidColorBrush);
        var scb = <Fayde.Media.SolidColorBrush>grid2.Background;
        deepEqual(scb.Color, Color.KnownColors.Yellow);
    });
}