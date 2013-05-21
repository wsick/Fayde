/// <reference path="../Runtime/Nullstone.ts" />
/// CODE
/// <reference path="Surface.ts" />
/// <reference path="../Core/ResourceDictionary.ts" />
/// <reference path="../Primitives/Uri.ts" />
/// <reference path="ClockTimer.ts" />
/// <reference path="../Markup/JsonParser.ts" />
/// <reference path="../Navigation/NavService.ts" />
/// <reference path="DebugInterop.ts" />
var Fayde;
(function (Fayde) {
    function Run() {
    }
    Fayde.Run = Run;
    function Start(appType, rjson, json, canvas) {
        var cur = App.Current = new (appType)();
        cur.LoadResources(rjson);
        cur.LoadInitial(canvas, json);
    }
    Fayde.Start = Start;
})(Fayde || (Fayde = {}));
var App = (function () {
    function App() {
        this.Loaded = new MulticastEvent();
        this.Address = null;
        this._IsRunning = false;
        this._Storyboards = [];
        this._ClockTimer = new Fayde.ClockTimer();
        this.MainSurface = new Surface(this);
        Object.defineProperty(this, "Resources", {
            value: new Fayde.ResourceDictionary(),
            writable: false
        });
        this.Resources.XamlNode.NameScope = new Fayde.NameScope(true);
        this.DebugInterop = new Fayde.DebugInterop(this);
    }
    App.Version = "0.9.4.0";
    App._GenericResourceDictionary = null;
    Object.defineProperty(App.prototype, "RootVisual", {
        get: function () {
            return this.MainSurface._TopLevel;
        },
        enumerable: true,
        configurable: true
    });
    App.prototype.LoadResources = function (json) {
        Fayde.JsonParser.ParseResourceDictionary(this.Resources, json);
    };
    App.prototype.LoadInitial = function (canvas, json) {
        this.Address = new Uri(document.URL);
        this.MainSurface.Register(canvas);
        this.NavService = new Fayde.Navigation.NavService(this);
        //canProfile = profiles.initialParse;
        //profile("Initial Parse");
        var ns = new Fayde.NameScope(true);
        var element = Fayde.JsonParser.Parse(json, undefined, ns);
        //profileEnd();
        //canProfile = false;
        if(element instanceof Fayde.UIElement) {
            var uie = element;
            uie.XamlNode.NameScope = ns;
            this.MainSurface.Attach(uie);
        }
        //canProfile = profiles.initialUpdate;
        this.StartEngine();
        this.EmitLoaded();
    };
    App.prototype.EmitLoaded = function () {
        this.Loaded.RaiseAsync(this, EventArgs.Empty);
    };
    App.prototype.StartEngine = function () {
        this._ClockTimer.RegisterTimer(this);
    };
    App.prototype.Tick = function (lastTime, nowTime) {
        this.DebugInterop.NumFrames++;
        this.ProcessStoryboards(lastTime, nowTime);
        this.Update();
        this.Render();
    };
    App.prototype.StopEngine = function () {
        this._ClockTimer.UnregisterTimer(this);
    };
    App.prototype.ProcessStoryboards = function (lastTime, nowTime) {
        var sbs = this._Storyboards;
        var len = sbs.length;
        for(var i = 0; i < len; i++) {
            sbs[i].Update(nowTime);
        }
    };
    App.prototype.Update = function () {
        if(this._IsRunning) {
            return;
        }
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
            };
    App.prototype.Render = function () {
        this.MainSurface.Render();
    };
    App.prototype.RegisterStoryboard = function (storyboard) {
        var sbs = this._Storyboards;
        var index = sbs.indexOf(storyboard);
        if(index === -1) {
            sbs.push(storyboard);
        }
    };
    App.prototype.UnregisterStoryboard = function (storyboard) {
        var sbs = this._Storyboards;
        var index = sbs.indexOf(storyboard);
        if(index !== -1) {
            sbs.splice(index, 1);
        }
    };
    App.GetGenericResourceDictionary = function GetGenericResourceDictionary() {
        var rd = App._GenericResourceDictionary;
        if(!rd) {
            App._GenericResourceDictionary = rd = App.GetGenericResourceDictionaryImpl();
        }
        return rd;
    };
    App.GetGenericResourceDictionaryImpl = function GetGenericResourceDictionaryImpl() {
        return undefined;
    };
    App.prototype.__DebugLayers = function () {
        return this.MainSurface.__DebugLayers();
    };
    App.prototype.__GetById = function (id) {
        return this.MainSurface.__GetById(id);
    };
    return App;
})();
Nullstone.RegisterType(App, "App");
//@ sourceMappingURL=App.js.map
