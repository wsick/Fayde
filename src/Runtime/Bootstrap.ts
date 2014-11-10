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
                .success(app => {
                    (Application.Current = app).Resolve()
                        .success(app => this.finishLoad(app))
                        .error(error => this.finishLoad(null, error));
                })
                .error(error => this.finishLoad(null, error));
        }

        finishLoad (app: Application, error?: any) {
            if (error) {
                alert("An error occurred retrieving the application.");
                console.error("An error occurred retrieving the application.", error);
                return;
            }
            app.Attach(this.canvas);
            app.Start();
            return this.onLoaded && this.onLoaded(app);
        }
    }
}