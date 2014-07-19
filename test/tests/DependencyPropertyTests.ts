/// <reference path="../qunit.d.ts" />
/// <reference path="../lib/Fayde/Fayde.d.ts" />

export function run() {
    QUnit.module("Dependency Property Tests");

    function coercer(dobj: Fayde.DependencyObject, propd: DependencyProperty, value: any): any {
        if (value < 0)
            return 0;
        return value;
    }
    function validator(dobj: Fayde.DependencyObject, propd: DependencyProperty, value: any): boolean {
        return typeof value === "string";
    }

    var Mock3Property = DependencyProperty.RegisterFull("Mock3", () => Number, Fayde.DependencyObject, undefined, undefined, coercer);
    var Mock4Property = DependencyProperty.RegisterFull("Mock4", () => String, Fayde.DependencyObject, undefined, undefined, undefined, false, validator);

    test("Coerce", () => {
        var d = new Fayde.DependencyObject();
        d.SetValue(Mock3Property, -1);
        strictEqual(d.GetValue(Mock3Property), 0)
        d.SetValue(Mock3Property, 1);
        strictEqual(d.GetValue(Mock3Property), 1)
    });

    test("Validate", () => {
        var d = new Fayde.DependencyObject();
        d.SetValue(Mock4Property, "1");
        strictEqual(d.GetValue(Mock4Property), "1");
        d.SetValue(Mock4Property, 1);
        strictEqual(d.GetValue(Mock4Property), "1");
    });
}