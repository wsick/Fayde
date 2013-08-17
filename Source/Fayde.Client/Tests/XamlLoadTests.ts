/// <reference path="qunit-1.10.0.d.ts" />

QUnit.module("Xaml Load Tests");

test("Valid XAML Document", () => {
    throws(() => { var root = <Fayde.Controls.Border>Fayde.Xaml.Load("<Border />"); }, XamlParseException, "An error should let us know that there is no valid default namespace.");
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
        + "<x:Thickness x:Key=\"SomeThickness\" Left=\"1\" Top=\"2\" Right=\"3\" Bottom=\"4\" />"
        + "</StackPanel.Resources>"
        + "</StackPanel>";
    var root = <Fayde.Controls.StackPanel>Fayde.Xaml.Load(xaml);
    var resources = root.Resources;
    ok(resources.ContainsKey("SomeThickness"), "Resources should contain a resource with a key 'SomeThickness'");
    var thickness = <Thickness>resources.Get("SomeThickness");
    strictEqual(thickness.Left, 1, "Thickness.Left must equal 1 and not \"1\"");
    strictEqual(thickness.Top, 2, "Thickness.Top must equal 2 and not \"2\"");
    strictEqual(thickness.Right, 3, "Thickness.Right must equal 3 and not \"3\"");
    strictEqual(thickness.Bottom, 4, "Thickness.Bottom must equal 4 and not \"4\"");
});