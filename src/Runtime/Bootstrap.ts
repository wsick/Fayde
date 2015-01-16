module Fayde {
    export function Bootstrap (onLoaded?: (app: Application) => any) {
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

    function bootstrap (url: string, canvas: HTMLCanvasElement, onLoaded: (app: Application) => any) {
        var app: Application;

        function run () {
            Timing.Phase = Timing.Phases.ResolveConfig;
            Fayde.LoadConfigJson((config, err) => {
                if (err)
                    console.warn('Could not load fayde configuration file.', err);
                resolveApp();
            });
        }

        function resolveApp () {
            Timing.Phase = Timing.Phases.ResolveApp;
            Application.GetAsync(url)
                .then(resolveTheme, finishError);
        }

        function resolveTheme (res) {
            Timing.Phase = Timing.Phases.ResolveTheme;
            app = Application.Current = res;
            ThemeManager.LoadAsync(app.ThemeName)
                .then(startApp, finishError);
        }

        function finishError (err: any) {
            console.error("An error occurred retrieving the application.", err);
        }

        function startApp () {
            Timing.Phase = Timing.Phases.StartApp;
            app.Attach(canvas);
            app.Start();
            loaded();
        }

        function loaded () {
            Timing.Phase = Timing.Phases.Loaded;
            onLoaded && onLoaded(app);
        }

        run();
    }
}