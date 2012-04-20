/// <reference path="Expression.js"/>
/// CODE

//#region StaticResourceExpression
var StaticResourceExpression = Nullstone.Create("StaticResourceExpression", Expression, 5);

StaticResourceExpression.Instance.Init = function (key, target, propd, propName, templateBindingSource) {
    this.Key = key;
    this.Target = target;
    this.Property = propd;
    this.PropertyName = propName;
};

StaticResourceExpression.Instance.GetValue = function () {
    var o;
    var key = this.Key;
    var cur = this.Target;
    while (cur != null) {
        var fe = Nullstone.As(cur, FrameworkElement);
        if (fe != null) {
            o = fe.GetResources().Get(key);
            if (o != null)
                return o;
        }
        var rd = Nullstone.As(cur, ResourceDictionary);
        if (rd != null) {
            o = rd.Get(key);
            if (o != null)
                return o;
        }
        cur = cur._Parent;
    }
    return App.Instance.GetResources().Get(key);
};

StaticResourceExpression.Instance.Resolve = function (parser) {
    /// <param name="parser" type="JsonParser"></param>
    var isAttached = false;
    var ownerType = null;
    var prop = this.Property;
    if (prop != null) {
        isAttached = prop._IsAttached;
        ownerType = prop.OwnerType;
    }
    var value = this.GetValue();
    parser.TrySetPropertyValue(this.Target, prop, value, null, isAttached, ownerType, this.PropertyName);
};

Nullstone.FinishCreate(StaticResourceExpression);
//#endregion