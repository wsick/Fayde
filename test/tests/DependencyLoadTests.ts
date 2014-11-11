export function load() {
    QUnit.module("Dependency Load Tests");

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

    /*

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

    */

    asyncTest("Library Load", () => {
        var library = Fayde.Library.Get("lib:Fayde.Controls");
        var timeout = setTimeout(() => {
            start();
            ok(false, "Timed out.");
        }, 1000);
        library.Resolve(<Fayde.IDependencyAsyncContext>{ ThemeName: "Default", Resolving: <Fayde.Library[]>[] })
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