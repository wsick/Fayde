/// <reference path="scripts/qunit-1.10.0.d.ts" />
/// <reference path="scripts/Fayde.d.ts" />
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
//# sourceMappingURL=TransformTests.js.map
