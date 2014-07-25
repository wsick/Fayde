/// <reference path="../lib/qunit/qunit.d.ts" />
/// <reference path="../lib/Fayde/Fayde.d.ts" />
define(["require", "exports"], function(require, exports) {
    function run() {
        QUnit.module("Dependency Loading Tests");

        asyncTest("XamlDocument Load", function () {
            Fayde.Xaml.XamlDocument.GetAsync("Theme.Silverlight.xml").success(function (res) {
                start();
                ok(true, "Xaml Document resolved.");
            }).error(function (error) {
                start();
                ok(false, error);
            });
        });

        asyncTest("XamlDocument Missing Load", function () {
            Fayde.Xaml.XamlDocument.GetAsync("nofile.xml").success(function (res) {
                start();
                ok(false, "Xaml Document resolved.");
            }).error(function (error) {
                start();
                ok(true, error);
            });
        });

        asyncTest("Library Load", function () {
            var library = Fayde.Library.Get("lib:Fayde.Controls");
            var timeout = setTimeout(function () {
                start();
                ok(false, "Timed out.");
            }, 1000);
            library.Resolve({ ThemeName: "Default", Resolving: [] }).success(function (res) {
                window.clearTimeout(timeout);
                start();
                ok(!!res.Module);
                ok(!!res.CurrentTheme);
                ok(res.CurrentTheme.Resources.Count > 0);
            }).error(function (error) {
                window.clearTimeout(timeout);
                start();
                ok(false, error);
            });
        });
    }
    exports.run = run;
});
//# sourceMappingURL=DependencyLoadTests.js.map
