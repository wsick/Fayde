import TestControl = require('../../mocks/TestControl');

export function load () {
    QUnit.module("Markup Load Tests");

    test("Valid XAML Document", () => {
        try {
            var xaml = "<Border />";
            var root = Fayde.Markup.LoadXaml<Fayde.Controls.Border>(null, xaml);
            ok(false, "An error should let us know that there is no valid default namespace.");
        } catch (err) {
            ok(err instanceof XamlParseException, "An error should let us know that there is no valid default namespace.");
        }
    });

    test("Basic Load", () => {
        var xaml = "<Border xmlns=\"http://schemas.wsick.com/fayde\" xmlns:x=\"http://schemas.wsick.com/fayde/x\" />";
        var root = Fayde.Markup.LoadXaml<Fayde.Controls.Border>(null, xaml);

        strictEqual((<any>root).constructor, Fayde.Controls.Border, "Root Object should be a Border.");
        equal(root.Child, null, "Border should not have a child.");
    });

    test("Basic attribute", () => {
        var xaml = "<TextBlock xmlns=\"http://schemas.wsick.com/fayde\" xmlns:x=\"http://schemas.wsick.com/fayde/x\" Text=\"Testing!\" HorizontalAlignment=\"Right\" />";
        var root = Fayde.Markup.LoadXaml<Fayde.Controls.TextBlock>(null, xaml);

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
        var sp = Fayde.Markup.LoadXaml<Fayde.Controls.StackPanel>(null, xaml);
        var bg = <Fayde.Media.SolidColorBrush>sp.Background;
        strictEqual(bg.Color.ToHexStringNoAlpha(), "#aabbcc", "Color");
    });

    test("Empty property value", () => {
        var xaml = "<StackPanel xmlns=\"http://schemas.wsick.com/fayde\" xmlns:x=\"http://schemas.wsick.com/fayde/x\">"
            + "<StackPanel.DataContext>"
            + "<!-- someone commented out -->"
            + "</StackPanel.DataContext>"
            + "</StackPanel>";
        try {
            var sp = Fayde.Markup.LoadXaml<Fayde.Controls.StackPanel>(null, xaml);
            ok(true);
        } catch (err) {
            ok(false, err);
        }
    });

    test("Enum tag", () => {
        var xaml = "<StackPanel xmlns=\"http://schemas.wsick.com/fayde\" xmlns:x=\"http://schemas.wsick.com/fayde/x\">"
            + "<StackPanel.Orientation>"
            + "<Orientation>Horizontal</Orientation>"
            + "</StackPanel.Orientation>"
            + "</StackPanel>";
        var sp = Fayde.Markup.LoadXaml<Fayde.Controls.StackPanel>(null, xaml);
        strictEqual(sp.Orientation, Fayde.Orientation.Horizontal, "Orientation");
    });
}