export function load () {
    QUnit.module("Transform Tests");

    function typedToArray (typed) {
        var arr = [];
        for (var i = 0; i < typed.length; i++) {
            arr.push(typed[i]);
        }
        return arr;
    }

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
            grid = Fayde.Markup.LoadXaml<Fayde.Controls.Grid>(null, xaml);
            grid.XamlNode.SetIsAttached(true);
        } catch (err) {
            ok(false, err);
        }
        var xforms = <Fayde.Media.TransformGroup>grid.RenderTransform;
        var tt = <Fayde.Media.TranslateTransform>xforms.Children.GetValueAt(1);
        ok(tt instanceof Fayde.Media.TranslateTransform);
        strictEqual(10, tt.X);
    });

    test("TransformGroup", () => {
        var tg = new Fayde.Media.TransformGroup();

        var tt = new Fayde.Media.TranslateTransform();
        tt.X = 10;
        tt.Y = 20;
        tg.Children.Add(tt);

        var rt = new Fayde.Media.RotateTransform();
        rt.Angle = 45;
        tg.Children.Add(rt);

        ok(mat3.equal(tg.Value._Raw, mat3.create([Math.SQRT1_2, Math.SQRT1_2, -Math.SQRT1_2, Math.SQRT1_2, -Math.SQRT1_2 * 10, Math.SQRT1_2 * 30])));
    });
}