/// <reference path="../Core/DependencyObject.ts" />

interface ITimeline {
    Update(nowTime: number);
}

module Fayde {
    export class Application extends DependencyObject implements IResourcable, ITimerListener {
        static Current: Application;
        MainSurface: Surface;
        Loaded = new MulticastEvent<EventArgs>();
        Address: Uri = null;
        private _IsRunning: boolean = false;
        private _IsLoaded = false;
        private _Storyboards: ITimeline[] = [];
        private _ClockTimer: ClockTimer = new ClockTimer();
        private _RootVisual: UIElement = null;
        private _CoreLibrary: Library = null;

        static ResourcesProperty = DependencyProperty.RegisterImmutable<ResourceDictionary>("Resources", () => ResourceDictionary, Application);
        static ThemeNameProperty = DependencyProperty.Register("ThemeName", () => String, Application, "Default", (d, args) => (<Application>d).OnThemeNameChanged(args));
        Resources: ResourceDictionary;
        ThemeName: string;

        private OnThemeNameChanged(args: DependencyPropertyChangedEventArgs) {
            if (!this._IsLoaded)
                return;
            Library.ChangeTheme(args.NewValue)
                .success(res => this._ApplyTheme())
                .error(err => console.warn("Could not change theme. " + err.toString()));
        }
        private _ApplyTheme() {
            for (var walker = this.MainSurface.walkLayers(); walker.step(); ) {
                for (var subwalker = walker.current.walkDeep(); subwalker.step(); ) {
                    var node = subwalker.current.getAttachedValue("$node");
                    Providers.ImplicitStyleBroker.Set(<FrameworkElement>node.XObject, Providers.StyleMask.Theme);
                }
            }
        }

        Resized = new RoutedEvent<SizeChangedEventArgs>();
        OnResized(oldSize: minerva.Size, newSize: minerva.Size) {
            this.Resized.Raise(this, new SizeChangedEventArgs(oldSize, newSize));
        }

        constructor() {
            super();
            this.XamlNode.NameScope = new NameScope(true);
            var rd = Application.ResourcesProperty.Initialize(this);
            this.MainSurface = new Surface(this);
            this.Address = new Uri(document.URL);
        }

        get RootVisual(): UIElement {
            for (var walker = this.MainSurface.walkLayers(); walker.step();) {
                var node = walker.current.getAttachedValue("$node");
                return node.XObject;
            }
        }

        $$SetRootVisual(value: UIElement) {
            this._RootVisual = value;
        }
        Attach(canvas: HTMLCanvasElement) {
            this.MainSurface.init(canvas);
            this.MainSurface.Attach(this._RootVisual, true);
        }
        Start() {
            this._ClockTimer.RegisterTimer(this);
            this._IsLoaded = true;
            this.Loaded.RaiseAsync(this, EventArgs.Empty);
        }
        OnTicked(lastTime: number, nowTime: number) {
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
            this._IsRunning = true;
            var updated = this.MainSurface.updateLayout();
            this._IsRunning = false;
        }
        private Render() {
            this.MainSurface.render();
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

        /*
        private __DebugLayers(): string {
            return this.MainSurface.__DebugLayers();
        }
        private __GetById(id: number): UIElement {
            return this.MainSurface.__GetById(id);
        }
        */

        static GetAsync(url: string): IAsyncRequest<Application> {
            var d = defer<Application>();
            Xaml.XamlDocument.GetAsync(url)
                .success(xd => {
                    TimelineProfile.Parse(true, "App");
                    var app = <Application>Xaml.Load(xd.Document);
                    TimelineProfile.Parse(false, "App");
                    if (!(app instanceof Application))
                        d.reject("Xaml must be an Application.");
                    else
                        d.resolve(app);
                })
                .error(d.reject);
            return d.request;
        }
        Resolve(): IAsyncRequest<Application> {
            var d = defer<Application>();

            var lib = Library.Get("lib:Fayde") || RegisterLibrary("Fayde", "Fayde");
            lib.Resolve({ ThemeName: this.ThemeName || "Default", Resolving: [] })
                .success(lib => { this._CoreLibrary = lib; d.resolve(this); })
                .error(d.reject);

            return d.request;
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

        window.onload = () => onReady();
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

        Application.GetAsync(url)
            .success(app => {
                (Application.Current = app).Resolve()
                    .success(app => {
                        app.Attach(canvas);
                        app.Start();
                        loaded && loaded(app);
                    })
                    .error(error => {
                        alert("An error occurred loading the application.");
                        console.log("An error occurred loading the application. " + error);
                    });
            })
            .error(error => {
                alert("An error occurred retrieving the application.");
                console.log("An error occurred retrieving the application. " + error);
            });
    }
}