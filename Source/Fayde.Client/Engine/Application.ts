/// <reference path="../Core/DependencyObject.ts" />

interface ITimeline {
    Update(nowTime: number);
}

module Fayde {
    export class Application extends DependencyObject implements IResourcable, ITimerListener {
        static Version: string = "0.9.6.0";
        static Current: Application;
        MainSurface: Surface;
        Loaded = new MulticastEvent<EventArgs>();
        Address: Uri = null;
        DebugInterop: DebugInterop;
        private _IsRunning: boolean = false;
        private _Storyboards: ITimeline[] = [];
        private _ClockTimer: ClockTimer = new ClockTimer();

        static ResourcesProperty = DependencyProperty.RegisterImmutable<ResourceDictionary>("Resources", () => ResourceDictionary, Application);
        static ThemeProperty = DependencyProperty.Register("Theme", () => Xaml.Theme, Application);
        Resources: ResourceDictionary;
        Theme: Xaml.Theme;

        constructor() {
            super();
            this.XamlNode.NameScope = new NameScope(true);
            var rd = Application.ResourcesProperty.Initialize(this);
            this.MainSurface = new Surface(this);
            this.DebugInterop = new DebugInterop(this);
            this.Address = new Uri(document.URL);
        }

        get RootVisual(): UIElement { return this.MainSurface._RootLayer; }

        Start() {
            this._ClockTimer.RegisterTimer(this);
            this.Loaded.RaiseAsync(this, EventArgs.Empty);
        }
        OnTicked(lastTime: number, nowTime: number) {
            this.DebugInterop.NumFrames++;
            this.ProcessStoryboards(lastTime, nowTime);
            this.Update();
            this.Render();
        }
        private StopEngine() {
            this._ClockTimer.UnregisterTimer(this);
        }

        private ProcessStoryboards(lastTime: number, nowTime: number) {
            var sbs = this._Storyboards;
            var len = sbs.length;
            for (var i = 0; i < len; i++) {
                sbs[i].Update(nowTime);
            }
        }
        private Update() {
            if (this._IsRunning)
                return;

            //var startLayoutTime;
            //var isLayoutPassTimed;
            //if (isLayoutPassTimed = (this._DebugFunc[3] != null))
            //startLayoutTime = new Date().getTime();

            this._IsRunning = true;
            //try {
            var updated = this.MainSurface.ProcessDirtyElements();
            //} catch (err) {
            //Fatal("An error occurred processing dirty elements: " + err.toString());
            //}
            this._IsRunning = false;

            //if (updated && isLayoutPassTimed)
            //this._NotifyDebugLayoutPass(new Date().getTime() - startLayoutTime);
        }
        private Render() {
            this.MainSurface.Render();
        }

        RegisterStoryboard(storyboard: ITimeline) {
            var sbs = this._Storyboards;
            var index = sbs.indexOf(storyboard);
            if (index === -1)
                sbs.push(storyboard);
        }
        UnregisterStoryboard(storyboard: ITimeline) {
            var sbs = this._Storyboards;
            var index = sbs.indexOf(storyboard);
            if (index !== -1)
                sbs.splice(index, 1);
        }

        GetImplicitStyle(type: any): Style {
            var theme = this.Theme;
            var style: Style;
            if (theme && (style = theme.GetImplicitStyle(type)))
                return style;

            /*
            var enumerator = this.Libraries.GetEnumerator();
            while (enumerator.MoveNext()) {
                style = enumerator.Current.GetImplicitStyle(type);
                if (style)
                    return style;
            }
            */
            return undefined;
        }

        private __DebugLayers(): string {
            return this.MainSurface.__DebugLayers();
        }
        private __GetById(id: number): UIElement {
            return this.MainSurface.__GetById(id);
        }
    }
    Fayde.RegisterType(Application, "Fayde", Fayde.XMLNS);

    var isReady = false;
    function doOnReady(onReady: () => void) {
        // Mozilla, Opera and webkit nightlies currently support this event
        if (document.addEventListener) {
            // Use the handy event callback
            document.addEventListener("DOMContentLoaded", function () {
                (<any>document).removeEventListener("DOMContentLoaded", arguments.callee, false);
                onReady();
            }, false);

            // If IE event model is used
        } else if (document.attachEvent) {
            // ensure firing before onload,
            // maybe late but safe also for iframes
            document.attachEvent("onreadystatechange", function () {
                if (document.readyState === "complete") {
                    (<any>document).detachEvent("onreadystatechange", arguments.callee);
                    onReady();
                }
            });
        }

        window.onload = onReady;
    }
    doOnReady(Run);
    export function Run(loaded?: (app: Application) => void) {
        if (isReady) return loaded && loaded(Fayde.Application.Current);
        isReady = true;
        var url = document.body.getAttribute("faydeapp");
        if (!url)
            return;
        
        var canvas = document.getElementsByTagName("canvas")[0];
        if (!canvas)
            document.body.appendChild(canvas = document.createElement("canvas"));

        Xaml.LoadApplicationAsync(url)
            .success(app => {
                app.MainSurface.Register(canvas);
                app.Start();
                loaded && loaded(app);
            })
            .error(error => {
                alert("An error occurred retrieving the application.");
                console.log("An error occurred retrieving the application. " + error);
            });
    }
}