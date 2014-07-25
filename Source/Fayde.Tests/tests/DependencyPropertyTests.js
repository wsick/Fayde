/// <reference path="../lib/qunit/qunit.d.ts" />
/// <reference path="../lib/Fayde/Fayde.d.ts" />
define(["require", "exports"], function(require, exports) {
    function run() {
        QUnit.module("Dependency Property Tests");

        function coercer(dobj, propd, value) {
            if (value < 0)
                return 0;
            return value;
        }
        function validator(dobj, propd, value) {
            return typeof value === "string";
        }

        var Mock3Property = DependencyProperty.RegisterFull("Mock3", function () {
            return Number;
        }, Fayde.DependencyObject, undefined, undefined, coercer);
        var Mock4Property = DependencyProperty.RegisterFull("Mock4", function () {
            return String;
        }, Fayde.DependencyObject, undefined, undefined, undefined, false, validator);

        test("Coerce", function () {
            var d = new Fayde.DependencyObject();
            d.SetValue(Mock3Property, -1);
            strictEqual(d.GetValue(Mock3Property), 0);
            d.SetValue(Mock3Property, 1);
            strictEqual(d.GetValue(Mock3Property), 1);
        });

        test("Validate", function () {
            var d = new Fayde.DependencyObject();
            d.SetValue(Mock4Property, "1");
            strictEqual(d.GetValue(Mock4Property), "1");
            d.SetValue(Mock4Property, 1);
            strictEqual(d.GetValue(Mock4Property), "1");
        });
    }
    exports.run = run;
});
//# sourceMappingURL=DependencyPropertyTests.js.map
