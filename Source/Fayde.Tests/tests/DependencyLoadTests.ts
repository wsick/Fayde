/// <reference path="../scripts/qunit.d.ts" />
/// <reference path="../scripts/Fayde.d.ts" />

export function run() {
    QUnit.module("Dependency Loading Tests");

    asyncTest("XamlDocument Load", () => {
        Fayde.Xaml.XamlDocument.Resolve("Theme.Silverlight.xml")
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
        Fayde.Xaml.XamlDocument.Resolve("nofile.xml")
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
        Fayde.RegisterLibrary("Fayde.Controls", "mocks/Fayde.Controls/source.js", "mocks/Fayde.Controls/generic.xml");
        var library = Fayde.Library.Get("lib:Fayde.Controls");
        var timeout = setTimeout(() => {
            start();
            ok(false, "Timed out.");
        }, 1000);
        library.Resolve()
            .success(res => {
                window.clearTimeout(timeout);
                start();
                ok(!!res.Module);
                ok(!!res.Theme);
                ok(res.Theme.Resources.Count > 0);
            })
            .error(error => {
                window.clearTimeout(timeout);
                start();
                ok(false, error);
            });
    });
}