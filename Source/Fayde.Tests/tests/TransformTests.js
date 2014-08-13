/// <reference path="../lib/qunit/qunit.d.ts" />
/// <reference path="../lib/Fayde/Fayde.d.ts" />
define(["require", "exports"], function(require, exports) {
    function run() {
        QUnit.module("Transform Tests");

        test("Change Notification", function () {
            var collchanged = false;
            var coll = new Fayde.Media.TransformCollection();
            coll.RelayChanges(function () {
                return collchanged = true;
            });

            var transformchanged = false;
            var translate = new Fayde.Media.TranslateTransform();
            var listener = translate.Listen(function (source) {
                return transformchanged = true;
            });

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

        test("Binding", function () {
            var xaml = "<Grid xmlns=\"http://schemas.wsick.com/fayde\" xmlns:x=\"http://schemas.wsick.com/fayde/x\">" + "<Grid.RenderTransform>" + "<TransformGroup>" + "<ScaleTransform x:Name=\"Scale\" ScaleX=\"10\" />" + "<TranslateTransform X=\"{Binding ElementName=Scale,Path=ScaleX}\" />" + "</TransformGroup>" + "</Grid.RenderTransform>" + "</Grid>";

            var grid;
            try  {
                grid = Fayde.Xaml.Load(new Fayde.Xaml.XamlDocument(xaml).Document);
                grid.XamlNode.SetIsAttached(true);
            } catch (err) {
                ok(false, err);
            }
            var xforms = grid.RenderTransform;
            var tt = xforms.Children.GetValueAt(1);
            ok(tt instanceof Fayde.Media.TranslateTransform);
            strictEqual(10, tt.X);
        });
    }
    exports.run = run;
});
//# sourceMappingURL=TransformTests.js.map
