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

    test("Style", () => {
        var xaml = "<StackPanel xmlns=\"http://schemas.wsick.com/fayde\" xmlns:x=\"http://schemas.wsick.com/fayde/x\">"
            + "<StackPanel.Resources>"
            + "<Style x:Key=\"SomeStyle\" TargetType=\"Button\">"
            + "<Setter Property=\"Margin\" Value=\"1\" />"
            + "</Style>"
            + "</StackPanel.Resources>"
            + "</StackPanel>";
        var root = Fayde.Markup.LoadXaml<Fayde.Controls.StackPanel>(null, xaml);

        var resources = root.Resources;
        var style = <Fayde.Style>resources.Get("SomeStyle");
        style.Seal();
        strictEqual(style.TargetType, Fayde.Controls.Button, "TargetType on Style should be set to Button.");
        var setters = style.Setters;
        strictEqual(setters.Count, 1, "There should be 1 setter in the Style.");
        var setter = setters.GetValueAt(0);
        strictEqual(setter.Property, Fayde.FrameworkElement.MarginProperty, "Setter Property should be Margin property.");
        deepEqual(setter.ConvertedValue, new Thickness(1, 1, 1, 1), "Setter Value should be a Thickness (1, 1, 1, 1).")


        xaml = "<StackPanel xmlns=\"http://schemas.wsick.com/fayde\" xmlns:x=\"http://schemas.wsick.com/fayde/x\">"
        + "<StackPanel.Resources>"
        + "<Style x:Key=\"SomeStyle\">"
        + "<Setter Property=\"Margin\" Value=\"1\" />"
        + "</Style>"
        + "</StackPanel.Resources>"
        + "</StackPanel>";
        try {
            root = Fayde.Markup.LoadXaml<Fayde.Controls.StackPanel>(null, xaml);
            ok(false, "Loading a style without a TargetType should fail.");
        } catch (err) {
            ok(err instanceof XamlParseException, "Error from loading a Style without a TargetType should be a XamlParseException.");
            strictEqual(err.Message, "Style must have a TargetType.");
        }
    });

    test("Setter+Template Binding", () => {
        var xaml = "<CheckBox " + nsdecl + ">"
            + "<CheckBox.Style>"
            + "<Style TargetType=\"CheckBox\">"
            + "<Setter Property=\"HorizontalContentAlignment\" Value=\"Right\" />"
            + "<Setter Property=\"Template\">"
            + "<Setter.Value>"
            + "<ControlTemplate TargetType=\"CheckBox\">"
            + "<ContentPresenter HorizontalAlignment=\"{TemplateBinding HorizontalContentAlignment}\" />"
            + "</ControlTemplate>"
            + "</Setter.Value>"
            + "</Setter>"
            + "</Style>"
            + "</CheckBox.Style>"
            + "</CheckBox>";

        var checkbox = Fayde.Markup.LoadXaml<Fayde.Controls.CheckBox>(null, xaml);
        checkbox.ApplyTemplate();
        var cp = <Fayde.Controls.ContentPresenter>Fayde.VisualTreeHelper.GetChild(checkbox, 0);
        strictEqual(cp.HorizontalAlignment, Fayde.HorizontalAlignment.Right, "HorizontalAlignment");


        xaml = "<CheckBox " + nsdecl + ">"
        + "<CheckBox.Style>"
        + "<Style TargetType=\"CheckBox\">"
        + "<Setter Property=\"BorderThickness\" Value=\"1\" />"
        + "<Setter Property=\"Template\">"
        + "<Setter.Value>"
        + "<ControlTemplate TargetType=\"CheckBox\">"
        + "<Rectangle StrokeThickness=\"{TemplateBinding BorderThickness}\" />"
        + "</ControlTemplate>"
        + "</Setter.Value>"
        + "</Setter>"
        + "</Style>"
        + "</CheckBox.Style>"
        + "</CheckBox>";
        checkbox = Fayde.Markup.LoadXaml<Fayde.Controls.CheckBox>(null, xaml);
        checkbox.ApplyTemplate();
        var r = <Fayde.Shapes.Rectangle>Fayde.VisualTreeHelper.GetChild(checkbox, 0);
        strictEqual(r.StrokeThickness, 1, "StrokeThickness");
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

    test("HierarchicalDataTemplate", () => {
        var xaml = "<HierarchicalDataTemplate " + nsdecl + " ItemsSource=\"{Binding SomePath}\">"
            + "<Grid></Grid>"
            + "</HierarchicalDataTemplate>";

        var hdt: Fayde.HierarchicalDataTemplate;
        try {
            hdt = Fayde.Markup.LoadXaml<Fayde.HierarchicalDataTemplate>(null, xaml);
        } catch (err) {
            ok(false, "Loading a HierarchicalDataTemplate should not error. " + err.toString());
        }
        strictEqual((<any>hdt).constructor, Fayde.HierarchicalDataTemplate, "Resulting object should be a HierarchicalDataTemplate.");

        var isexpr = hdt.GetBindingExpression(Fayde.HierarchicalDataTemplate.ItemsSourceProperty);
        ok(isexpr, "HierarchicalDataTemplate.ItemsSource should have a BindingExpression.");
        strictEqual(isexpr.ParentBinding.Path.Path, "SomePath", "BindingExpression.ParentBinding should have `Path=SomePath`.");

        var visual = hdt.GetVisualTree(null);
        strictEqual((<any>visual).constructor, Fayde.Controls.Grid, "Root visual from created visual tree should be a Grid.");
    });
}