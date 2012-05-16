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

    this._SubscribeDebugService("Coordinates", function (position) { HUDUpdate("mouse", position.toString()); });
    this._SubscribeDebugService("HitTest", function (inputList) { HUDUpdate("els", "Elements Found: " + inputList._Count.toString()); });
};

//#region Dependency Properties

App.ResourcesProperty = DependencyProperty.RegisterFull("Resources", function () { return ResourceDictionary; }, App, undefined, { GetValue: function () { return new ResourceDictionary(); } });
App.Instance.GetResources = function () {
    return this.$GetValue(App.ResourcesProperty);
};
App.Instance.SetResources = function (value) {
    this.$SetValue(App.ResourcesProperty, value);
};

//#endregion

//#region Properties

App.Instance.GetAddress = function () {
    ///<returns type="Uri"></returns>
    return this._Address;
};
App.Instance.SetAddress = function (value) {
    ///<param name="value" type="Uri"></param>
    this._Address = value;
};

//#endregion

App.Instance.Load = function (element, containerId, width, height) {
    /// <param name="element" type="UIElement"></param>
    this.SetAddress(new Uri(document.URL));
    this.MainSurface.Register(containerId, width, height);
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
    this._IsRunning = true;
    var extents = this.MainSurface.GetExtents();
    var region = new Rect(0, 0, extents.Width, extents.Height);
    //try {
        this.MainSurface.ProcessDirtyElements(region);
    //} catch (err) {
        //Fatal("An error occurred processing dirty elements: " + err.toString());
    //}
    this._IsRunning = false;
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
                var styleKey = fe.GetDefaultStyleKey();
                if (styleKey != null)
                    genericXamlStyle = this._GetGenericXamlStyleFor(styleKey);
            }
        }
    }
    if ((styleMask & _StyleMask.ApplicationResources) != 0) {
        appResourcesStyle = this.GetResources().Get(fe.constructor);
        if (appResourcesStyle == null)
            appResourcesStyle = this.GetResources().Get(fe._TypeName);
    }
    if ((styleMask & _StyleMask.VisualTree) != 0) {
        var isControl = fe instanceof Control;
        var el = fe;
        while (el != null) {
            if (el.GetTemplateOwner() != null && fe.GetTemplateOwner() == null) {
                el = el.GetTemplateOwner();
                continue;
            }
            if (!isControl && el == fe.GetTemplateOwner())
                break;

            visualTreeStyle = el.GetResources().Get(fe.constructor);
            if (visualTreeStyle != null)
                break;
            visualTreeStyle = el.GetResources().Get(fe._TypeName);
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
    this._DebugFunc[id] = func;
};
App.Instance._UnsubscribeDebugService = function (id) {
    delete this._DebugFunc[id];
};

App.Instance._NotifyDebugCoordinates = function (position) {
    var func = this._DebugFunc["Coordinates"];
    if (!func)
        return;
    func(position);
};
App.Instance._NotifyDebugHitTest = function (inputList) {
    var func = this._DebugFunc["HitTest"];
    if (!func)
        return;
    func(inputList);
};

//#endregion

Nullstone.FinishCreate(App);
//#endregion