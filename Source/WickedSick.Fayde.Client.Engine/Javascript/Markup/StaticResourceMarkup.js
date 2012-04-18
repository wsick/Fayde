/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="Markup.js"/>
/// CODE

//#region StaticResourceMarkup
var StaticResourceMarkup = Nullstone.Create("StaticResourceMarkup", Markup, 1);

StaticResourceMarkup.Instance.Init = function (key) {
    this.Key = key;
};

StaticResourceMarkup.Instance.Transmute = function (target, propd, propName, templateBindingSource) {
    /// <param name="target" type="DependencyObject"></param>
    /// <param name="propd" type="DependencyProperty"></param>
    /// <param name="propName" type="String"></param>
    /// <param name="templateBindingSource" type="DependencyObject"></param>
    var o;
    var cur = target;
    while (cur != null) {
        var fe = Nullstone.As(cur, FrameworkElement);
        if (fe != null) {
            o = fe.GetResources().Get(propName);
            if (o != null)
                return o;
        }
        var rd = Nullstone.As(cur, ResourceDictionary);
        if (rd != null) {
            o = rd.Get(propName);
            if (o != null)
                return o;
        }
        cur = cur._Parent;
    }
    return App.Instance.GetResources().Get(propName);
};

Nullstone.FinishCreate(StaticResourceMarkup);
//#endregion