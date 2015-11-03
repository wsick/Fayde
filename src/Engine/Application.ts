/// <reference path="../Core/DependencyObject" />

interface ITimeline {
    Update(nowTime: number);
}

module Fayde {
    export class Application extends DependencyObject implements IResourcable, ITimerListener {
        static Current: Application;
        MainSurface: Surface;
        Loaded = new nullstone.Event();
        Address: Uri = null;
        AllowNavigation = true;
        private _IsRunning: boolean = false;
        private _IsLoaded = false;
        private _Storyboards: ITimeline[] = [];
        private _ClockTimer: ClockTimer = new ClockTimer();
        private _RootVisual: UIElement = null;

        static ResourcesProperty = DependencyProperty.RegisterImmutable<ResourceDictionary>("Resources", () => ResourceDictionary, Application);
        static ThemeNameProperty = DependencyProperty.Register("ThemeName", () => String, Application, "Default", (d: Application, args) => d.OnThemeNameChanged(args.OldValue, args.NewValue));
        static ZoomFactorProperty = DependencyProperty.RegisterReadOnly("ZoomFactor", () => Number, Application, 1.0, (d: Application, args) => d.OnZoomFactorChanged(args.OldValue, args.NewValue));
        Resources: ResourceDictionary;
        ThemeName: string;
        ZoomFactor: number;

        private OnThemeNameChanged(oldThemeName: string, newThemeName: string) {
            if (!this._IsLoaded)
                return;
            ThemeManager.LoadAsync(newThemeName)
                .then(() => this._ApplyTheme(),
                    err => console.error("Could not load theme.", err));
        }

        private OnZoomFactorChanged(oldZoom: number, newZoom: number) {
        }

        private _ApplyTheme() {
            for (var walker = this.MainSurface.walkLayers(); walker.step();) {
                for (var subwalker = walker.current.walkDeep(); subwalker.step();) {
                    var node = subwalker.current.getAttachedValue("$node");
                    Providers.ImplicitStyleBroker.Set(<FrameworkElement>node.XObject, Providers.StyleMask.Theme);
                }
            }
        }

        Resized = new RoutedEvent<SizeChangedEventArgs>();

        OnResized(oldSize: minerva.Size, newSize: minerva.Size) {
            this.Resized.raise(this, new SizeChangedEventArgs(oldSize, newSize));
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
            this.Update();
            this.Render();
            this._ClockTimer.RegisterTimer(this);
            this._IsLoaded = true;
            this.Loaded.raiseAsync(this, null);
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
            perfex.timer.start('StoryboardsProcess', this);
            for (var i = 0, sbs = this._Storyboards; i < sbs.length; i++) {
                sbs[i].Update(nowTime);
            }
            perfex.timer.stop();
        }

        private Update() {
            if (this._IsRunning)
                return;
            this._IsRunning = true;
            perfex.timer.start('UpdateLayout', this);
            var updated = this.MainSurface.updateLayout();
            perfex.timer.stop();
            this._IsRunning = false;
        }

        private Render() {
            perfex.timer.start('Render', this);
            this.MainSurface.render();
            perfex.timer.stop();
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

        static GetAsync(url: string): Promise<Application> {
            return Markup.Resolve(url)
                .then(appm => {
                    TimelineProfile.Parse(true, "App");
                    var app = Markup.Load<Application>(null, appm);
                    TimelineProfile.Parse(false, "App");
                    if (!(app instanceof Application))
                        throw new Error("Markup must be an Application.");
                    return app;
                });
        }
    }
    Fayde.CoreLibrary.add(Application);
}