/// <reference path="qunit-1.10.0.d.ts" />

QUnit.module("Xaml Load Tests");

test("Valid XAML Document", () => {
    try {
        var root = <Fayde.Controls.Border>Fayde.Xaml.Load("<Border />");
        ok(false, "An error should let us know that there is no valid default namespace.");
    } catch (err) {
        ok(err instanceof XamlParseException, "An error should let us know that there is no valid default namespace.");
    }
});

test("Basic Load", () => {
    var root = <Fayde.Controls.Border>Fayde.Xaml.Load("<Border xmlns=\"http://schemas.wsick.com/fayde\" xmlns:x=\"http://schemas.wsick.com/fayde/x\" />");

    strictEqual((<any>root).constructor, Fayde.Controls.Border, "Root Object should be a Border.");
    equal(root.Child, null, "Border should not have a child.");
});

test("Basic attribute", () => {
    var root = <Fayde.Controls.TextBlock>Fayde.Xaml.Load("<TextBlock xmlns=\"http://schemas.wsick.com/fayde\" xmlns:x=\"http://schemas.wsick.com/fayde/x\" Text=\"Testing!\" />");

    strictEqual(root.Text, "Testing!", "TextBlock should have Text property set to 'Testing!'.");
});

test("Border with Child", () => {
    var root = <Fayde.Controls.Border>Fayde.Xaml.Load("<Border xmlns=\"http://schemas.wsick.com/fayde\" xmlns:x=\"http://schemas.wsick.com/fayde/x\"><TextBlock Text=\"Hey!\" /></Border>");
    var child = <Fayde.Controls.TextBlock>root.Child;
    strictEqual((<any>child).constructor, Fayde.Controls.TextBlock, "Border Child should be a TextBlock.");
    strictEqual(child.Text, "Hey!", "Border Child should have Text property set to 'Hey!'");
});

test("Panel with Children", () => {
    var root = <Fayde.Controls.StackPanel>Fayde.Xaml.Load("<StackPanel xmlns=\"http://schemas.wsick.com/fayde\" xmlns:x=\"http://schemas.wsick.com/fayde/x\"><Border /><TextBlock /></StackPanel>");
    strictEqual(root.Children.Count, 2, "There should be 2 children in StackPanel.");
    var child1 = <Fayde.Controls.Border>root.Children.GetValueAt(0);
    var child2 = <Fayde.Controls.TextBlock>root.Children.GetValueAt(1);
    strictEqual((<any>child1).constructor, Fayde.Controls.Border, "First child should be a Border.");
    strictEqual((<any>child2).constructor, Fayde.Controls.TextBlock, "Second child should be a TextBlock.");
});

test("Resource Dictionary", () => {
    var xaml = "<StackPanel xmlns=\"http://schemas.wsick.com/fayde\" xmlns:x=\"http://schemas.wsick.com/fayde/x\">"
        + "<StackPanel.Resources>"
        + "<x:Thickness x:Key=\"SomeThickness\">1,2,3,4</x:Thickness>"
        + "</StackPanel.Resources>"
        + "</StackPanel>";
    var root = <Fayde.Controls.StackPanel>Fayde.Xaml.Load(xaml);
    var resources = root.Resources;
    ok(resources.ContainsKey("SomeThickness"), "Resources should contain a resource with a key 'SomeThickness'");
    var thickness = <Thickness>resources.Get("SomeThickness");
    strictEqual(thickness.Left, 1, "Thickness.Left must equal 1 and not \"1\".");
    strictEqual(thickness.Top, 2, "Thickness.Top must equal 2 and not \"2\".");
    strictEqual(thickness.Right, 3, "Thickness.Right must equal 3 and not \"3\".");
    strictEqual(thickness.Bottom, 4, "Thickness.Bottom must equal 4 and not \"4\".");
});

test("Style", () => {
    var xaml = "<StackPanel xmlns=\"http://schemas.wsick.com/fayde\" xmlns:x=\"http://schemas.wsick.com/fayde/x\">"
        + "<StackPanel.Resources>"
        + "<Style x:Key=\"SomeStyle\" TargetType=\"Button\">"
        + "<Setter Property=\"Margin\" Value=\"1\" />"
        + "</Style>"
        + "</StackPanel.Resources>"
        + "</StackPanel>";
    var root = <Fayde.Controls.StackPanel>Fayde.Xaml.Load(xaml);

    var resources = root.Resources;
    var style = <Fayde.Style>resources.Get("SomeStyle");
    style.Seal();
    strictEqual(style.TargetType, Fayde.Controls.Button, "TargetType on Style should be set to Button.");
    var setters = style.Setters;
    strictEqual(setters.Count, 1, "There should be 1 setter in the Style.");
    var setter = setters.GetValueAt(0);
    strictEqual(setter.Property, Fayde.FrameworkElement.MarginProperty, "Setter Property should be Margin property.");
    ok(Thickness.Equals(setter.ConvertedValue, new Thickness(1, 1, 1, 1)), "Setter Value should be a Thickness (1, 1, 1, 1).");
});

test("DataTemplate", () => {
    var xaml = "<DataTemplate xmlns=\"http://schemas.wsick.com/fayde\" xmlns:x=\"http://schemas.wsick.com/fayde/x\">"
        + "<Grid></Grid>"
        + "</DataTemplate>";

    var dt: Fayde.DataTemplate;
    try {
        dt = <Fayde.DataTemplate>Fayde.Xaml.Load(xaml);
    } catch (err) {
        ok(false, "Loading a DataTemplate should not error. " + err.toString());
    }
    strictEqual((<any>dt).constructor, Fayde.DataTemplate, "Resulting object should be a DataTemplate.");

    var visual = dt.GetVisualTree(null);
    strictEqual((<any>visual).constructor, Fayde.Controls.Grid, "Root visual from created visual tree should be a Grid.");
});

test("ControlTemplate", () => {
    var xaml = "<ControlTemplate xmlns=\"http://schemas.wsick.com/fayde\" xmlns:x=\"http://schemas.wsick.com/fayde/x\">"
        + "<Grid></Grid>"
        + "</ControlTemplate>";

    var ct: Fayde.Controls.ControlTemplate;
    try {
        ct = <Fayde.Controls.ControlTemplate>Fayde.Xaml.Load(xaml);
        ok(false, "Loading a ControlTemplate should error if no TargetType is specified.");
    } catch (err) {
        ok(err instanceof XamlParseException, "Loading a ControlTemplate should error if no TargetType is specified.");
    }
    
    xaml = "<ControlTemplate xmlns=\"http://schemas.wsick.com/fayde\" xmlns:x=\"http://schemas.wsick.com/fayde/x\" TargetType=\"Control\">"
        + "<Grid></Grid>"
        + "</ControlTemplate>";
    
    try {
        ct = <Fayde.Controls.ControlTemplate>Fayde.Xaml.Load(xaml);
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
        ipt = <Fayde.Controls.ItemsPanelTemplate>Fayde.Xaml.Load(xaml);
        var tempPanel = ipt.GetVisualTree(null);
        ok(false, "Getting the visual tree for an ItemsPanelTemplate with a non-Panel root visual should error.");
    } catch (err) {
        ok(err instanceof XamlParseException, "Getting the visual tree for an ItemsPanelTemplate with a non-Panel root visual should error.");
    }

    xaml = "<ItemsPanelTemplate xmlns=\"http://schemas.wsick.com/fayde\" xmlns:x=\"http://schemas.wsick.com/fayde/x\">"
        + "<Grid></Grid>"
        + "</ItemsPanelTemplate>";

    try {
        ipt = <Fayde.Controls.ItemsPanelTemplate>Fayde.Xaml.Load(xaml);
    } catch (err) {
        ok(false, "Loading a ItemsPanelTemplate should not error. " + err.toString());
    }
    strictEqual((<any>ipt).constructor, Fayde.Controls.ItemsPanelTemplate, "Resulting object should be a ItemsPanelTemplate.");

    var visual = ipt.GetVisualTree(null);
    strictEqual((<any>visual).constructor, Fayde.Controls.Grid, "Root visual from created visual tree should be a Grid.");
});