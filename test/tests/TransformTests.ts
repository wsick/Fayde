export function load() {
    QUnit.module("Transform Tests");

    test("Change Notification", (assert) => {
        var collchanged = false;
        var coll = new Fayde.Media.TransformCollection();
        var scope = {};
        Fayde.ReactTo(coll, scope, () => collchanged = true);

        var transformchanged = false;
        var translate = new Fayde.Media.TranslateTransform();
        Fayde.ReactTo(translate, scope, () => transformchanged = true);

        translate.X = 10;
        assert.ok(transformchanged, "Translate should notify listener of change.");
        transformchanged = false;

        Fayde.UnreactTo(translate, scope);
        translate.X = 20;
        assert.ok(!transformchanged, "Translate should not notify detached listener of change.");
        transformchanged = false;

        coll.Add(translate);
        assert.ok(collchanged, "Adding a transform to TransformCollection should notify listener of change.");
        collchanged = false;

        translate.Y = 5;
        assert.ok(collchanged, "Changing TranslateTransform property in TransformCollection should notify Collection listener of change.");
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