/// <reference path="../scripts/qunit.d.ts" />
/// <reference path="../scripts/Fayde.d.ts" />

export function run() {
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
}