/// <reference path="DependencyObject.js"/>
/// CODE
/// <reference path="Surface.js"/>
/// <reference path="Collections.js"/>

//#region App

function App() {
    DependencyObject.call(this);
    this.MainSurface = new Surface();
}
App.InheritFrom(DependencyObject);

//#region DEPENDENCY PROPERTIES

App.ResourcesProperty = DependencyProperty.RegisterFull("Resources", function () { return ResourceDictionary; }, App, null, { GetValue: function () { return new ResourceDictionary(); } });
App.prototype.GetResources = function () {
    return this.GetValue(App.ResourcesProperty);
};
App.prototype.SetResources = function (value) {
    this.SetValue(App.ResourcesProperty, value);
};

//#endregion

App.prototype.Load = function (/* UIElement */element, containerId, width, height) {
    this.MainSurface.Init(containerId, width, height);
    if (!(element instanceof UIElement))
        return;
    this.MainSurface._Attach(element);
    this.Start();
};
App.prototype.Start = function () {
    var fps = 30.0;
    var app = this;
    this._TickID = setInterval(function () { app._Tick(); }, (1.0 / fps) * 1000.0);
};
App.prototype._Tick = function () {
    if (this._IsRunning)
        return;
    this._IsRunning = true;
    var extents = this.MainSurface.GetExtents();
    var region = new Rect(0, 0, extents.Width, extents.Height);
    try {
        this.MainSurface.ProcessDirtyElements(region);
    } catch (err) {
        Fatal("An error occurred processing dirty elements: " + err.toString());
    }
    this._IsRunning = false;
};
App.prototype._Stop = function () {
    clearInterval(this._TickID);
};
App.prototype._GetImplicitStyles = function (fe, styleMask) {
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
        //appResourcesStyle = this.Resources.Get(fe.constructor);
        //if (appResourcesStyle == null)
        appResourcesStyle = this.GetResources().Get(fe._TypeName);
    }
    if ((styleMask & _StyleMask.VisualTree) != 0) {
        var isControl = fe instanceof Control;
        var el = fe;
        while (el != null) {
            if (el._TemplateOwner != null && fe._TemplateOwner == null) {
                el = el._TemplateOwner;
                continue;
            }
            if (!isControl && el == fe._TemplateOwner)
                break;

            //visualTreeStyle = el.Resources.Get(fe.constructor);
            //if (visualTreeStyle != null)
            //break;
            visualTreeStyle = el.GetResources().Get(fe._TypeName);
            if (visualTreeStyle != null)
                break;

            el = el.GetVisualParent();
        }
    }

    var styles = new Array();
    styles[_StyleIndex.GenericXaml] = genericXamlStyle;
    styles[_StyleIndex.ApplicationResources] = appResourcesStyle;
    styles[_StyleIndex.VisualTree] = visualTreeStyle;
    return styles;
};
App.prototype._GetGenericXamlStyleFor = function (type) {
    NotImplemented("App._GetGenericXamlStyleFor");
};
App.Instance = new App();

//#endregion