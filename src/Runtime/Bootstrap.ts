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

        new Bootstrapper(url, canvas, onLoaded).run();
    }

    class Bootstrapper {
        constructor (public url: string, public canvas: HTMLCanvasElement, public onLoaded: (app: Application) => any) {
        }

        run () {
            Fayde.LoadConfigJson((config, err) => {
                if (err)
                    console.warn('Could not load fayde configuration file.', err);
                this.startApp();
            });
            return this;
        }

        startApp () {
            Application.GetAsync(this.url)
                .then(app => {
                    (Application.Current = app).Resolve()
                        .then(app => this.finishLoad(app),
                            err => this.finishLoad(null, err));
                }, err => this.finishLoad(null, err));
        }

        finishLoad (app: Application, error?: any) {
            if (error) {
                console.error("An error occurred retrieving the application.", error);
                return;
            }
            app.Attach(this.canvas);
            app.Start();
            return this.onLoaded && this.onLoaded(app);
        }
    }
}