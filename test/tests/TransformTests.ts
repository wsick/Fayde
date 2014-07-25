/// <reference path="../qunit.d.ts" />
/// <reference path="../lib/Fayde/Fayde.d.ts" />

export function load() {
    QUnit.module("Transform Tests");

    test("Change Notification", () => {
        var collchanged = false;
        var coll = new Fayde.Media.TransformCollection();
        coll.RelayChanges(() => collchanged = true);

        var transformchanged = false;
        var translate = new Fayde.Media.TranslateTransform();
        var listener = translate.Listen((source) => transformchanged = true);

        translate.X = 10;
        ok(transformchanged, "Translate should notify listener of change.");
        transformchanged = false;

        listener.Detach();
        translate.X = 20;
        ok(!transformchanged, "Translate should not notify detached listener of change.");
        transformchanged = false;

        coll.Add(translate);
        ok(collchanged, "Adding a transform to TransformCollection should notify listener of change.");
        collchanged = false;

        translate.Y = 5;
        ok(collchanged, "Changing TranslateTransform property in TransformCollection should notify Collection listener of change.");
        collchanged = false;
    });

    test("Binding", () => {
        var xaml = "<Grid xmlns=\"http://schemas.wsick.com/fayde\" xmlns:x=\"http://schemas.wsick.com/fayde/x\">"
            + "<Grid.RenderTransform>"
            + "<TransformGroup>"
            + "<ScaleTransform x:Name=\"Scale\" ScaleX=\"10\" />"
            + "<TranslateTransform X=\"{Binding ElementName=Scale,Path=ScaleX}\" />"
            + "</TransformGroup>"
            + "</Grid.RenderTransform>"
            + "</Grid>";

        var grid: Fayde.Controls.Grid;
        try {
            grid = <Fayde.Controls.Grid>Fayde.Xaml.Load(new Fayde.Xaml.XamlDocument(xaml).Document);
            grid.XamlNode.SetIsAttached(true);
        } catch (err) {
            ok(false, err);
        }
        var xforms = <Fayde.Media.TransformGroup>grid.RenderTransform;
        var tt = <Fayde.Media.TranslateTransform>xforms.Children.GetValueAt(1);
        ok(tt instanceof Fayde.Media.TranslateTransform);
        strictEqual(10, tt.X);
    });
}