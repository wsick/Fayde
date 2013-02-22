/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="../Core/DependencyObject.js"/>
/// CODE
/// <reference path="Surface.js"/>
/// <reference path="../Core/Collections/InternalCollection.js"/>
/// <reference path="../Core/UIElement.js"/>
/// <reference path="ClockTimer.js"/>
/// <reference path="../Runtime/JsEx.js"/>
/// <reference path="../Navigation/NavService.js"/>

(function (namespace) {
    var App = Nullstone.Create("App", Fayde.DependencyObject);

    App.Instance.Init = function () {
        this.Init$DependencyObject();
        this.MainSurface = new Surface(this);
        this._ClockTimer = new Fayde.ClockTimer();
        this._Storyboards = [];
        this._DebugFunc = {};

        this.Loaded = new MulticastEvent();

        var app = this;
        this._LayoutTiming = [];
        this._RenderTiming = [];
        this._ParserTiming = [];

        //this._SubscribeDebugService("Coordinates", function (position) { HUDUpdate("mouse", position.toString()); });
        this._SubscribeDebugService("HitTest", function (inputList, elapsedTime) {
            //HUDUpdate("els", "Elements Found: " + inputList._Count.toString()); 
            //Info("HitTestTime: " + elapsedTime.toString());
        });

        this._SubscribeDebugService("LayoutTime", function (elapsedTime) {
            //Info("LayoutTime: " + elapsedTime.toString());
            app._LayoutTiming.push(elapsedTime);
        });
        this._SubscribeDebugService("RenderTime", function (elapsedTime) {
            //Info("RenderTime: " + elapsedTime.toString());
            app._RenderTiming.push(elapsedTime);
        });
        this._SubscribeDebugService("ParserTime", function (type, elapsedTime) {
            //Info("ParserTime: [" + type._TypeName + "]" + elapsedTime.toString());
            app._ParserTiming.push(elapsedTime);
        });
    };

    //#region Properties

    App.ResourcesProperty = DependencyProperty.RegisterFull("Resources", function () { return Fayde.ResourceDictionary; }, App, undefined, undefined, { GetValue: function () { return new Fayde.ResourceDictionary(); } });

    Nullstone.AutoProperties(App, [
        App.ResourcesProperty,
        "Address"
    ]);

    Nullstone.Property(App, "RootVisual", {
        get: function () { return this.MainSurface._TopLevel; }
    });

    //#endregion

    App.Instance.LoadResources = function (json) {
        var rd = Fayde.JsonParser.Parse(json);
        if (rd instanceof Fayde.ResourceDictionary)
            this.Resources = rd;
    };
    App.Instance.LoadInitial = function (containerId, json) {
        this.Address = new Uri(document.URL);
        this.MainSurface.Register(containerId);
        this.NavService = new Fayde.Navigation.NavService(this);

        var element = Fayde.JsonParser.Parse(json);
        if (element instanceof Fayde.UIElement)
            this.MainSurface._Attach(element);

        this.Start();
        this.EmitLoaded();
    };
    App.Instance.EmitLoaded = function () {
        this.Loaded.RaiseAsync(this, new EventArgs());
    };

    App.Instance.Start = function () {
        this._ClockTimer.RegisterTimer(this);
    };
    App.Instance._Tick = function (lastTime, nowTime) {
        profile();
        this.ProcessStoryboards(lastTime, nowTime);
        this.Update();
        profileEnd();
        canProfile = false;
    };
    App.Instance._Stop = function () {
        this._ClockTimer.UnregisterTimer(this);
    };

    App.Instance.ProcessStoryboards = function (lastTime, nowTime) {
        var len = this._Storyboards.length;
        for (var i = 0; i < len; i++) {
            this._Storyboards[i].Update(nowTime);
        }
    };
    if (!Fayde.IsCanvasEnabled) {
        App.Instance.Update = function () {
            this.MainSurface.ProcessHtmlChanges();
            this.MainSurface.ProcessSizingAdjustments();
        };
    } else {
        App.Instance.Update = function () {
            if (this._IsRunning)
                return;

            var startLayoutTime;
            var isLayoutPassTimed;
            if (isLayoutPassTimed = (this._DebugFunc[3] != null))
                startLayoutTime = new Date().getTime();

            this._IsRunning = true;
            //try {
            var updated = this.MainSurface.ProcessDirtyElements();
            //} catch (err) {
            //Fatal("An error occurred processing dirty elements: " + err.toString());
            //}
            this._IsRunning = false;

            if (updated && isLayoutPassTimed)
                this._NotifyDebugLayoutPass(new Date().getTime() - startLayoutTime);
        };
    }

    App.Instance.RegisterStoryboard = function (storyboard) {
        Array.addDistinctNullstone(this._Storyboards, storyboard);
    };
    App.Instance.UnregisterStoryboard = function (storyboard) {
        Array.removeNullstone(this._Storyboards, storyboard);
    };

    App.Instance._GetImplicitStyles = function (fe, styleMask) {
        var genericXamlStyle = undefined;
        var appResourcesStyle = undefined;
        var visualTreeStyle = undefined;
        if ((styleMask & _StyleMask.GenericXaml) != 0) {
            if (fe instanceof Fayde.Controls.Control) {
                genericXamlStyle = fe.GetDefaultStyle();
                if (!genericXamlStyle) {
                    var styleKey = fe.DefaultStyleKey;
                    if (styleKey != null)
                        genericXamlStyle = this._GetGenericXamlStyleFor(styleKey);
                }
            }
        }
        if ((styleMask & _StyleMask.ApplicationResources) != 0) {
            appResourcesStyle = this.Resources.Get(fe.constructor);
            if (appResourcesStyle == null)
                appResourcesStyle = this.Resources.Get(fe._TypeName);
            if (appResourcesStyle != null)
                appResourcesStyle._ResChain = [this.Resources];
        }
        if ((styleMask & _StyleMask.VisualTree) != 0) {
            var isControl = fe instanceof Fayde.Controls.Control;
            var el = fe;
            while (el != null) {
                if (el.TemplateOwner != null && fe.TemplateOwner == null) {
                    el = el.TemplateOwner;
                    continue;
                }
                if (!isControl && Nullstone.RefEquals(el, fe.TemplateOwner))
                    break;

                visualTreeStyle = el.Resources.Get(fe.constructor);
                if (visualTreeStyle != null)
                    break;
                visualTreeStyle = el.Resources.Get(fe._TypeName);
                if (visualTreeStyle != null)
                    break;

                el = el.GetVisualParent();
            }
        }

        var styles = [];
        styles[_StyleIndex.GenericXaml] = genericXamlStyle;
        styles[_StyleIndex.ApplicationResources] = appResourcesStyle;
        styles[_StyleIndex.VisualTree] = visualTreeStyle;
        return styles;
    };
    App.Instance._GetGenericXamlStyleFor = function (type) {
        if (!App.GenericResourceDictionary && App.GetGenericResourceDictionary) {
            App.GenericResourceDictionary = App.GetGenericResourceDictionary();
        }
        if (App.GenericResourceDictionary)
            return App.GenericResourceDictionary.Get(type);
    };

    //#region Debug Service

    App.Instance._SubscribeDebugService = function (id, func) {
        var i = this._GetInternalDebugServiceID(id);
        if (i)
            this._DebugFunc[i] = func;
    };
    App.Instance._UnsubscribeDebugService = function (id) {
        var i = this._GetInternalDebugServiceID(id);
        if (i)
            delete this._DebugFunc[i];
    };
    App.Instance._GetInternalDebugServiceID = function (id) {
        if (id === "Coordinates")
            return 1;
        else if (id === "HitTest")
            return 2;
        else if (id === "LayoutTime")
            return 3;
        else if (id === "RenderTime")
            return 4;
        else if (id === "ParserTime")
            return 5;
        else if (id === "Layer")
            return 6;
        return null;
    };

    App.Instance._NotifyDebugCoordinates = function (position) {
        var func = this._DebugFunc[1];
        if (!func)
            return;
        func(position);
    };
    App.Instance._NotifyDebugHitTest = function (inputList, elapsedTime) {
        var func = this._DebugFunc[2];
        if (!func)
            return;
        func(inputList, elapsedTime);
    };
    App.Instance._NotifyDebugLayer = function (isAdd, layer) {
        var func = this._DebugFunc[6];
        if (!func)
            return;
        func(isAdd, layer);
    };
    App.Instance._NotifyDebugLayoutPass = function (elapsedTime) {
        var func = this._DebugFunc[3];
        if (!func)
            return;
        func(elapsedTime);
    };
    App.Instance._NotifyDebugRenderPass = function (elapsedTime) {
        var func = this._DebugFunc[4];
        if (!func)
            return;
        func(elapsedTime);
    };
    App.Instance._NotifyDebugParserPass = function (type, elapsedTime) {
        var func = this._DebugFunc[5];
        if (!func)
            return;
        func(type, elapsedTime);
    };

    //#endregion

    namespace.App = Nullstone.FinishCreate(App);
})(window);
App.Version = "0.9.4.0";