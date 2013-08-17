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

test("Load with basic attribute", () => {
    var root = <Fayde.Controls.TextBlock>Fayde.Xaml.Load("<TextBlock xmlns=\"http://schemas.wsick.com/fayde\" xmlns:x=\"http://schemas.wsick.com/fayde/x\" Text=\"Testing!\" />");

    strictEqual(root.Text, "Testing!", "TextBlock should have the Text property set to 'Testing!'.");
});