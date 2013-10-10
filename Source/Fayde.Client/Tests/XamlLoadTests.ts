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
    var root = <Fayde.Controls.TextBlock>Fayde.Xaml.Load("<TextBlock xmlns=\"http://schemas.wsick.com/fayde\" xmlns:x=\"http://schemas.wsick.com/fayde/x\" Text=\"Testing!\" HorizontalAlignment=\"Right\" />");

    strictEqual(root.Text, "Testing!", "TextBlock should have Text property set to 'Testing!'.");
    strictEqual(root.HorizontalAlignment, Fayde.HorizontalAlignment.Right, "Enum Attribute");
});

test("Simple tag", () => {
    var xaml = "<StackPanel xmlns=\"http://schemas.wsick.com/fayde\" xmlns:x=\"http://schemas.wsick.com/fayde/x\">"
        + "<StackPanel.Background>"
        + "<SolidColorBrush>"
        + "<SolidColorBrush.Color>"
        + "<Color>#AABBCC</Color>"
        + "</SolidColorBrush.Color>"
        + "</SolidColorBrush>"
        + "</StackPanel.Background>"
        + "</StackPanel>";
    var sp = <Fayde.Controls.StackPanel>Fayde.Xaml.Load(xaml);
    var bg = <Fayde.Media.SolidColorBrush>sp.Background;
    strictEqual(bg.Color.ToHexStringNoAlpha(), "#aabbcc", "Color");
});

test("Enum tag", () => {
    var xaml = "<StackPanel xmlns=\"http://schemas.wsick.com/fayde\" xmlns:x=\"http://schemas.wsick.com/fayde/x\">"
        + "<StackPanel.Orientation>"
        + "<Orientation>Horizontal</Orientation>"
        + "</StackPanel.Orientation>"
        + "</StackPanel>";
    var sp = <Fayde.Controls.StackPanel>Fayde.Xaml.Load(xaml);
    strictEqual(sp.Orientation, Fayde.Orientation.Horizontal, "Orientation");
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

test("ContentControl", () => {
    var xaml = "<CheckBox xmlns=\"http://schemas.wsick.com/fayde\" xmlns:x=\"http://schemas.wsick.com/fayde/x\">Hey</CheckBox>";
    var checkbox = <Fayde.Controls.CheckBox>Fayde.Xaml.Load(xaml);
    strictEqual(checkbox.Content, "Hey", "Text Content");
});

test("FrameworkElement Resources", () => {
    var xaml = "<StackPanel xmlns=\"http://schemas.wsick.com/fayde\" xmlns:x=\"http://schemas.wsick.com/fayde/x\">"
        + "<StackPanel.Resources>"
        + "<x:Thickness x:Key=\"SomeThickness\">1,2,3,4</x:Thickness>"
        + "</StackPanel.Resources>"
        + "</StackPanel>";
    var root = <Fayde.Controls.StackPanel>Fayde.Xaml.Load(xaml);
    var resources = root.Resources;
    ok(resources.Contains("SomeThickness"), "Resources should contain a resource with a key 'SomeThickness'");
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

test("Setter+Template Binding", () => {
    var xaml = "<CheckBox xmlns=\"http://schemas.wsick.com/fayde\" xmlns:x=\"http://schemas.wsick.com/fayde/x\">"
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

    var checkbox = <Fayde.Controls.CheckBox>Fayde.Xaml.Load(xaml);
    checkbox.ApplyTemplate();
    var cp = <Fayde.Controls.ContentPresenter>Fayde.VisualTreeHelper.GetChild(checkbox, 0);
    strictEqual(cp.HorizontalAlignment, Fayde.HorizontalAlignment.Right, "HorizontalAlignment");

    
    xaml = "<CheckBox xmlns=\"http://schemas.wsick.com/fayde\" xmlns:x=\"http://schemas.wsick.com/fayde/x\">"
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
    checkbox = <Fayde.Controls.CheckBox>Fayde.Xaml.Load(xaml);
    checkbox.ApplyTemplate();
    var r = <Fayde.Shapes.Rectangle>Fayde.VisualTreeHelper.GetChild(checkbox, 0);
    strictEqual(r.StrokeThickness, 1, "StrokeThickness");
});

QUnit.asyncTest("Theme", 1, () => {
    var theme = new Fayde.Xaml.Theme("../Theme.Metro.xml");
    theme.LoadAsync((state: any) => {
        try {
            theme.Create();
            ok(true, "Create Theme");
        } catch (err) {
            ok(false, "Create Theme: " + err.toString());
        }
        start();
    });
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

test("HierarchicalDataTemplate", () => {
    var xaml = "<HierarchicalDataTemplate xmlns=\"http://schemas.wsick.com/fayde\" xmlns:x=\"http://schemas.wsick.com/fayde/x\" ItemsSource=\"{Binding SomePath}\">"
        + "<Grid></Grid>"
        + "</HierarchicalDataTemplate>";

    var hdt: Fayde.HierarchicalDataTemplate;
    try {
        hdt = <Fayde.HierarchicalDataTemplate>Fayde.Xaml.Load(xaml);
    } catch (err) {
        ok(false, "Loading a HierarchicalDataTemplate should not error. " + err.toString());
    }
    strictEqual((<any>hdt).constructor, Fayde.HierarchicalDataTemplate, "Resulting object should be a HierarchicalDataTemplate.");

    ok(hdt.ItemsSource instanceof Fayde.Data.Binding, "HierarchicalDataTemplate.ItemsSource should be set to a Binding.");
    
    var visual = hdt.GetVisualTree(null);
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

test("VisualStateManager", () => {
    var xaml = "<Grid xmlns=\"http://schemas.wsick.com/fayde\" xmlns:x=\"http://schemas.wsick.com/fayde/x\">"
        + "<VisualStateManager.VisualStateGroups>"
        + "<VisualStateGroup x:Name=\"CommonStates\">"
        + "<VisualState x:Name=\"Normal\" />"
        + "</VisualStateGroup>"
        + "</VisualStateManager.VisualStateGroups>"
        + "</Grid>";

    var root = <Fayde.Controls.Grid>Fayde.Xaml.Load(xaml);
    var groups = Fayde.Media.VSM.VisualStateManager.GetVisualStateGroups(root);
    strictEqual((<any>groups).constructor, Fayde.Media.VSM.VisualStateGroupCollection, "VisualStateGroups on Grid should be a VisualStateGroupCollection.");
    strictEqual(groups.Count, 1, "There should be 1 VisualStateGroup in collection.");
});

class TestControl extends Fayde.Controls.ContentControl {
    CallbackFired: boolean = false;
    TestCallback(sender: any, e: EventArgs) {
        this.CallbackFired = true;
    }
}
Fayde.RegisterType(TestControl, {
    Name: "TestControl",
    Namespace: "window",
    XmlNamespace: "http://schemas.test.com/"
});

test("Events", () => {
    var xaml = "<test:TestControl xmlns=\"http://schemas.wsick.com/fayde\" xmlns:x=\"http://schemas.wsick.com/fayde/x\" xmlns:test=\"http://schemas.test.com/\">"
        + "<test:TestControl.Content>"
        + "<Button Click=\"TestCallback\" />"
        + "</test:TestControl.Content>"
        + "</test:TestControl>";
    var tc = <TestControl>Fayde.Xaml.Load(xaml);
    var button = <Fayde.Controls.Button>tc.Content;
    button.Click.Raise(button, new Fayde.RoutedEventArgs());
    ok(tc.CallbackFired, "Raise");
});