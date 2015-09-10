module Fayde {
    import XamlMarkup = nullstone.markup.xaml.XamlMarkup;

    export function Bootstrap(onLoaded?: (app: Application) => any) {
        var url = document.body.getAttribute("fayde-app");
        if (!url) {
            console.warn("No application specified.");
            return;
        }

        var canvas: HTMLCanvasElement = document.getElementsByTagName("canvas")[0];
        if (!canvas)
            document.body.appendChild(canvas = document.createElement("canvas"));

        bootstrap(url, canvas, onLoaded);
    }

    function bootstrap(url: string, canvas: HTMLCanvasElement, onLoaded: (app: Application) => any) {
        var app: Application;

        function resolveConfig(): Promise<void> {
            perfex.phases.start('ResolveConfig');
            return new Promise<void>((resolve, reject) => {
                Fayde.LoadConfigJson((config, err) => {
                    if (err)
                        console.warn('Could not load fayde configuration file.', err);
                    resolve();
                });
            });
        }

        function getApp(): Promise<XamlMarkup> {
            perfex.phases.start('RetrieveApp');
            return Markup.Retrieve(url);
        }

        function resolveTheme(markup: XamlMarkup): Promise<XamlMarkup> {
            perfex.phases.start('ResolveTheme');
            var root = <Element>markup.root;
            var themeName = root.getAttribute("ThemeName") || DEFAULT_THEME_NAME;
            return ThemeManager.LoadAsync(themeName);
        }

        function resolveApp() {
            perfex.phases.start('ResolveApp');
            return Application.GetAsync(url)
                .then(result => Application.Current = app = result);
        }

        function finishError(err: any) {
            console.error("An error occurred retrieving the application.", err);
        }

        function startApp() {
            perfex.phases.start('StartApp');
            app.Attach(canvas);
            app.Start();
            loaded();
        }

        function loaded() {
            onLoaded && onLoaded(app);
            perfex.phases.start('Running');
        }

        resolveConfig()
            .then(getApp, finishError)
            .then(resolveTheme, finishError)
            .then(resolveApp, finishError)
            .then(startApp, finishError);
    }
}