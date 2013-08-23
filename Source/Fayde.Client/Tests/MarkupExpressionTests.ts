/// <reference path="qunit-1.10.0.d.ts" />

QUnit.module("Markup Expression Tests");

test("x:Null", () => {
    var xaml = "<Border xmlns=\"http://schemas.wsick.com/fayde\" xmlns:x=\"http://schemas.wsick.com/fayde/x\" Tag=\"{x:Null}\"></Border>";
    var border = <Fayde.Controls.Border>Fayde.Xaml.Load(xaml);
    strictEqual(border.Tag, null, "x:Null");
});

test("x:Type", () => {
    var xaml = "<Grid xmlns=\"http://schemas.wsick.com/fayde\" xmlns:x=\"http://schemas.wsick.com/fayde/x\" Tag=\"{x:Type Border}\"></Grid>";
    var grid = <Fayde.Controls.Grid>Fayde.Xaml.Load(xaml);
    strictEqual(grid.Tag, Fayde.Controls.Border, "x:Type");
});

test("x:Static", () => {
    ok(true, "Not Implemented yet");
});

test("TemplateBinding", () => {
    ok(true, "Not Implemented yet");
});

test("Binding", () => {
    ok(true, "Not Implemented yet");
});

test("StaticResource", () => {
    ok(true, "Not Implemented yet");
});

test("RelativeSource", () => {
    ok(true, "Not Implemented yet");
});