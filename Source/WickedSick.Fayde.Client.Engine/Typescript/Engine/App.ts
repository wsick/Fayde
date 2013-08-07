/// <reference path="../Runtime/Nullstone.ts" />
/// CODE
/// <reference path="../Runtime/TimelineProfile.ts" />
/// <reference path="Surface.ts" />
/// <reference path="../Core/ResourceDictionary.ts" />
/// <reference path="../Primitives/Uri.ts" />
/// <reference path="ClockTimer.ts" />
/// <reference path="../Markup/JsonParser.ts" />
/// <reference path="../Navigation/NavService.ts" />
/// <reference path="DebugInterop.ts" />
/// <reference path="../Core/Theme.ts" />

module Fayde {
    export function Run() { }
    export function Start(appType: Function, theme: string, rjson: any, json: any, canvas: HTMLCanvasElement) {
        TimelineProfile.TimelineStart = new Date().valueOf();
        var cur = App.Current = <App>new (<any>appType)();
        cur.Theme = theme;
        cur.LoadResources(rjson);
        cur.LoadInitial(canvas, json);
    }
}

interface ITimeline {
    Update(nowTime: number);
}

class App implements Fayde.IResourcable, Fayde.ITimerListener {
    static Version: string = "0.9.4.0";
    static Current: App;
    MainSurface: Surface;
    Resources: Fayde.ResourceDictionary;
    Loaded: MulticastEvent<EventArgs> = new MulticastEvent<EventArgs>();
    Address: Uri = null;
    NavService: Fayde.Navigation.NavService;
    DebugInterop: Fayde.DebugInterop;
    Theme: string = "Default";
    static Themes: Fayde.Theme[] = [];
    private _IsRunning: bool = false;
    private _Storyboards: ITimeline[] = [];
    private _ClockTimer: Fayde.ClockTimer = new Fayde.ClockTimer();
    private static _GenericResourceDictionary: Fayde.ResourceDictionary = null;
    constructor() {
        this.MainSurface = new Surface(this);
        Object.defineProperty(this, "Resources", {
            value: new Fayde.ResourceDictionary(),
            writable: false
        });
        this.Resources.XamlNode.NameScope = new Fayde.NameScope(true);
        this.DebugInterop = new Fayde.DebugInterop(this);
    }
    get RootVisual(): Fayde.UIElement { return this.MainSurface._RootLayer; }

    LoadResources(json: any) {
        TimelineProfile.Parse(true, "App.Resources");
        Fayde.JsonParser.ParseResourceDictionary(this.Resources, json);
        TimelineProfile.Parse(false, "App.Resources");
    }
    LoadInitial(canvas: HTMLCanvasElement, json: any) {
        this.Address = new Uri(document.URL);
        this.MainSurface.Register(canvas);
        this.NavService = new Fayde.Navigation.NavService(this);

        //canProfile = profiles.initialParse;
        //profile("Initial Parse");
        var ns = new Fayde.NameScope(true);
        TimelineProfile.Parse(true, "App");
        var element = Fayde.JsonParser.Parse(json, undefined, ns);
        TimelineProfile.Parse(false, "App");
        //profileEnd();
        //canProfile = false;

        if (element instanceof Fayde.UIElement) {
            var uie = <Fayde.UIElement>element;
            uie.XamlNode.NameScope = ns;
            this.MainSurface.Attach(uie);
        }

        //canProfile = profiles.initialUpdate;

        this.StartEngine();
        this.EmitLoaded();
    }
    private EmitLoaded() {
        this.Loaded.RaiseAsync(this, EventArgs.Empty);
    }

    private StartEngine() {
        this._ClockTimer.RegisterTimer(this);
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

    get CurrentTheme(): Fayde.Theme {
        var themeName = this.Theme;
        var theme = App.Themes.filter(t => t.Name == themeName)[0];
        if (!theme) {
            console.warn("Could not find theme: " + themeName);
            theme = App.Themes[0];
        }
        return theme;
    }
    GetImplicitStyle(type: any): Fayde.Style {
        var theme = this.CurrentTheme;
        if (!theme)
            return;
        var rd = theme.ResourceDictionary;
        if (!rd)
            return;
        return <Fayde.Style><any>rd.Get(type);
    }

    private __DebugLayers(): string {
        return this.MainSurface.__DebugLayers();
    }
    private __GetById(id: number): Fayde.UIElement {
        return this.MainSurface.__GetById(id);
    }
}
Nullstone.RegisterType(App, "App");