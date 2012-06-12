/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="../Core/DependencyObject.js"/>
/// CODE
/// <reference path="Surface.js"/>
/// <reference path="../Runtime/Collections.js"/>
/// <reference path="../Core/UIElement.js"/>
/// <reference path="Clock.js"/>
/// <reference path="../Runtime/JsEx.js"/>

//#region App
var App = Nullstone.Create("App", DependencyObject);

App.Instance.Init = function () {
    this.Init$DependencyObject();
    this.MainSurface = new Surface(this);
    this._Clock = new Clock();
    this._Storyboards = [];
    this._DebugFunc = {};

    this.Loaded = new MulticastEvent();

    //this._SubscribeDebugService("Coordinates", function (position) { HUDUpdate("mouse", position.toString()); });
    //this._SubscribeDebugService("HitTest", function (inputList) { HUDUpdate("els", "Elements Found: " + inputList._Count.toString()); });
    /*
    this._SubscribeDebugService("LayoutTime", function (elapsedTime) {
        Info("LayoutTime: " + elapsedTime.toString());
    });
    this._SubscribeDebugService("RenderTime", function (elapsedTime) {
        Info("RenderTime: " + elapsedTime.toString());
    });
    */
};

//#region Dependency Properties

App.ResourcesProperty = DependencyProperty.RegisterFull("Resources", function () { return ResourceDictionary; }, App, undefined, { GetValue: function () { return new ResourceDictionary(); } });

Nullstone.AutoProperties(App, [
    App.ResourcesProperty,
    "Address"
]);

//#endregion

App.Instance.Load = function (element, containerId, width, widthType, height, heightType) {
    /// <param name="element" type="UIElement"></param>
    this.Address = new Uri(document.URL);
    this.MainSurface.Register(containerId, width, widthType, height, heightType);
    if (!(element instanceof UIElement))
        return;
    this.MainSurface._Attach(element);
    this.Start();
};
App.Instance.OnLoaded = function () {
    this.Loaded.RaiseAsync(this, new EventArgs());
};

App.Instance.Start = function () {
    this._Clock.RegisterTimer(this);
};
App.Instance._Tick = function (lastTime, nowTime) {
    this.ProcessStoryboards(lastTime, nowTime);
    this.ProcessDirty();
};
App.Instance._Stop = function () {
    this._Clock.UnregisterTimer(this);
};

App.Instance.ProcessStoryboards = function (lastTime, nowTime) {
    for (var i = 0; i < this._Storyboards.length; i++) {
        this._Storyboards[i]._Tick(lastTime, nowTime);
    }
};
App.Instance.ProcessDirty = function () {
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
        if (fe instanceof Control) {
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
    }
    if ((styleMask & _StyleMask.VisualTree) != 0) {
        var isControl = fe instanceof Control;
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
    NotImplemented("App._GetGenericXamlStyleFor");
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
    return null;
};

App.Instance._NotifyDebugCoordinates = function (position) {
    var func = this._DebugFunc[1];
    if (!func)
        return;
    func(position);
};
App.Instance._NotifyDebugHitTest = function (inputList) {
    var func = this._DebugFunc[2];
    if (!func)
        return;
    func(inputList);
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

//#endregion

Nullstone.FinishCreate(App);
//#endregion