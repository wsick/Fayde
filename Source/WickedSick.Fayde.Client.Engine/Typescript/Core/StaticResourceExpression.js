var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="Expression.ts" />
/// CODE
/// <reference path="ResourceDictionary.ts" />
/// <reference path="../Markup/JsonParser.ts" />
/// <reference path="ResourceTarget.ts" />
var Fayde;
(function (Fayde) {
    var StaticResourceExpression = (function (_super) {
        __extends(StaticResourceExpression, _super);
        function StaticResourceExpression(key, target, propd, propName, templateBindingSource, resChain) {
                _super.call(this);
            this._Key = key;
            this._Target = target;
            this._Property = propd;
            this._PropertyName = propName;
            this._ResChain = resChain;
        }
        StaticResourceExpression.prototype.GetValue = function (propd) {
            var value = this._GetValue(this._ResChain);
            if(value instanceof Fayde.ResourceTarget) {
                value = (value).CreateResource();
            }
            if(value === undefined) {
                throw new XamlParseException("Could not resolve StaticResource: '" + this._Key.toString() + "'.");
            }
            return value;
        };
        StaticResourceExpression.prototype._GetValue = function (resChain) {
            var o;
            var key = this._Key;
            var len = resChain.length;
            for(var i = len - 1; i >= 0; i--) {
                o = resChain[i].Get(key);
                if(o) {
                    return o;
                }
            }
            var cur = this._Target;
            var rd;
            var curNode = cur ? cur.XamlNode : null;
            while(curNode) {
                cur = curNode.XObject;
                if(cur instanceof Fayde.FrameworkElement) {
                    rd = (cur).Resources;
                } else if(cur instanceof Fayde.ResourceDictionary) {
                    rd = cur;
                }
                if(rd && (o = rd.Get(key))) {
                    return o;
                }
                curNode = curNode.ParentNode;
            }
            return App.Instance.Resources.Get(key);
        };
        StaticResourceExpression.prototype.Resolve = function (parser) {
            var isAttached = false;
            var ownerType;
            var propd = this._Property;
            if(propd) {
                isAttached = propd._IsAttached;
                ownerType = propd.OwnerType;
            }
            var value = this.GetValue(propd);
            parser.TrySetPropertyValue(this._Target, propd, value, null, isAttached, ownerType, this._PropertyName);
        };
        return StaticResourceExpression;
    })(Fayde.Expression);
    Fayde.StaticResourceExpression = StaticResourceExpression;    
    Nullstone.RegisterType(StaticResourceExpression, "StaticResourceExpression");
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=StaticResourceExpression.js.map
