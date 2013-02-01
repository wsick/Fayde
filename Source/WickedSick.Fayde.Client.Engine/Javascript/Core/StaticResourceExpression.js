/// <reference path="Expression.js"/>
/// CODE
/// <reference path="ResourceTarget.js"/>

(function (namespace) {
    var StaticResourceExpression = Nullstone.Create("StaticResourceExpression", namespace.Expression, 5);

    StaticResourceExpression.Instance.Init = function (key, target, propd, propName, templateBindingSource) {
        this.Key = key;
        this.Target = target;
        this.Property = propd;
        this.PropertyName = propName;
    };

    StaticResourceExpression.Instance.GetValue = function (resChain) {
        var o;
        var key = this.Key;

        var len = resChain.length;
        for (var i = len - 1; i >= 0; i--) {
            o = resChain[i].Get(key);
            if (o)
                return o;
        }

        var cur = this.Target;
        while (cur) {
            if (cur instanceof Fayde.FrameworkElement) {
                o = cur.Resources.Get(key);
                if (o)
                    return o;
            }
            if (cur instanceof Fayde.ResourceDictionary) {
                o = cur.Get(key);
                if (o)
                    return o;
            }
            cur = cur._Parent;
        }

        return App.Instance.Resources.Get(key);
    };

    StaticResourceExpression.Instance.Resolve = function (parser) {
        /// <param name="parser" type="JsonParser"></param>
        var isAttached = false;
        var ownerType;
        var prop = this.Property;
        if (prop) {
            isAttached = prop._IsAttached;
            ownerType = prop.OwnerType;
        }

        var value = this.GetValue(parser._ResChain);
        if (value instanceof Fayde.ResourceTarget)
            value = value.CreateResource();
        if (!value)
            throw new XamlParseException("Could not resolve StaticResource: '" + this.Key.toString() + "'.");
        parser.TrySetPropertyValue(this.Target, prop, value, null, isAttached, ownerType, this.PropertyName);
    };

    namespace.StaticResourceExpression = Nullstone.FinishCreate(StaticResourceExpression);
})(Nullstone.Namespace("Fayde"));