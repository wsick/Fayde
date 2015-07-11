export function load () {
    QUnit.module("Transform");

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

    test("TransformGroup #2", () => {
        var grp = new Fayde.Media.TransformGroup();
        grp.Children.Add(new Fayde.Media.ScaleTransform());
        grp.Children.Add(new Fayde.Media.SkewTransform());

        var rotate = new Fayde.Media.RotateTransform();
        rotate.Angle = -125.73500000000001;
        grp.Children.Add(rotate);

        var translate = new Fayde.Media.TranslateTransform();
        translate.X = 7.2898730908178564;
        translate.Y = -0.1325903170362821;
        grp.Children.Add(translate);

        var val = grp.Value;
        equal(val.M11, -0.584037184715271);
        equal(val.M12, -0.81172692775726318);
        equal(val.M21, 0.81172692775726318);
        equal(val.M22, -0.584037184715271);
        equal(val.OffsetX, 7.2898731231689453);
        equal(val.OffsetY, -0.13259032368659973);
    });
}