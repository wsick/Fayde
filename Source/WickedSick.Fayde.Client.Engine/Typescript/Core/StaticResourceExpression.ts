/// <reference path="Expression.ts" />
/// CODE
/// <reference path="ResourceDictionary.ts" />
/// <reference path="../Markup/JsonParser.ts" />
/// <reference path="ResourceTarget.ts" />

module Fayde {
    export class StaticResourceExpression extends Expression {
        Key: any;
        Target: XamlObject;
        Property: DependencyProperty;
        PropertyName: string;
        constructor(key, target: XamlObject, propd: DependencyProperty, propName: string, templateBindingSource: XamlObject) {
            super();
            this.Key = key;
            this.Target = target;
            this.Property = propd;
            this.PropertyName = propName;
        }

        GetValue(propd: DependencyProperty): any {
            //Does nothing
            return undefined;
        }
        private _GetValue(resChain: ResourceDictionary[]): any {
            var o: XamlObject;
            var key = this.Key;

            var len = resChain.length;
            for (var i = len - 1; i >= 0; i--) {
                o = resChain[i].Get(key);
                if (o)
                    return o;
            }

            var cur = this.Target;
            var rd: ResourceDictionary;
            var curNode = cur ? cur.XamlNode : null;
            while (curNode) {
                cur = curNode.XObject;
                
                if (cur instanceof FrameworkElement)
                    rd = (<FrameworkElement>cur).Resources;
                else if (cur instanceof ResourceDictionary)
                    rd = <ResourceDictionary>cur;

                if (rd && (o = rd.Get(key)))
                    return o;
                curNode = curNode.ParentNode;
            }

            return App.Instance.Resources.Get(key);
        }
        Resolve(parser: JsonParser, resChain: ResourceDictionary[]) {
            var isAttached = false;
            var ownerType;
            var propd = this.Property;
            if (propd) {
                isAttached = propd._IsAttached;
                ownerType = propd.OwnerType;
            }

            var value = this._GetValue(resChain);
            if (value instanceof ResourceTarget)
                value = value.CreateResource();
            if (!value)
                throw new XamlParseException("Could not resolve StaticResource: '" + this.Key.toString() + "'.");
            parser.TrySetPropertyValue(this.Target, propd, value, null, isAttached, ownerType, this.PropertyName);
        }
    }
    Nullstone.RegisterType(StaticResourceExpression, "StaticResourceExpression");
}