/// <reference path="../lib/qunit/qunit.d.ts" />
/// <reference path="../lib/Fayde/Fayde.d.ts" />

export function run() {
    QUnit.module("Dependency Loading Tests");

    asyncTest("XamlDocument Load", () => {
        Fayde.Xaml.XamlDocument.GetAsync("Theme.Silverlight.xml")
            .success(res => {
                start();
                ok(true, "Xaml Document resolved.");
            })
            .error(error => {
                start();
                ok(false, error);
            });
    });

    asyncTest("XamlDocument Missing Load", () => {
        Fayde.Xaml.XamlDocument.GetAsync("nofile.xml")
            .success(res => {
                start();
                ok(false, "Xaml Document resolved.");
            })
            .error(error => {
                start();
                ok(true, error);
            });
    });

    asyncTest("Library Load", () => {
        var library = Fayde.Library.Get("lib:Fayde.Controls");
        var timeout = setTimeout(() => {
            start();
            ok(false, "Timed out.");
        }, 1000);
        library.Resolve({ ThemeName: "Default", Resolving: [] })
            .success(res => {
                window.clearTimeout(timeout);
                start();
                ok(!!res.Module);
                ok(!!res.CurrentTheme);
                ok(res.CurrentTheme.Resources.Count > 0);
            })
            .error(error => {
                window.clearTimeout(timeout);
                start();
                ok(false, error);
            });
    });
}