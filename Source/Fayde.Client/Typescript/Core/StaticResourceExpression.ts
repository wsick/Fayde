/// <reference path="Expression.ts" />
/// CODE
/// <reference path="ResourceDictionary.ts" />
/// <reference path="ResourceTarget.ts" />

module Fayde {
    export class StaticResourceExpression extends Expression {
        private _Key: any;
        private _Target: XamlObject;
        private _Property: DependencyProperty;
        private _ResChain: ResourceDictionary[];
        constructor(key, target: XamlObject, propd: DependencyProperty, resChain: ResourceDictionary[]) {
            super();
            this._Key = key;
            this._Target = target;
            this._Property = propd;
            this._ResChain = resChain;
        }

        GetValue(propd: DependencyProperty): any {
            var value = this._GetValue(this._ResChain);
            if (value instanceof ResourceTarget)
                value = (<ResourceTarget>value).CreateResource();
            if (value === undefined)
                throw new XamlParseException("Could not resolve StaticResource: '" + this._Key.toString() + "'.");
            return value;
        }
        private _GetValue(resChain: ResourceDictionary[]): any {
            var o: XamlObject;
            var key = this._Key;

            var len = resChain.length;
            for (var i = len - 1; i >= 0; i--) {
                o = resChain[i].Get(key);
                if (o)
                    return o;
            }

            var cur = this._Target;
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

            return Application.Current.Resources.Get(key);
        }
        Resolve(parser: JsonParser) {
            var isAttached = false;
            var ownerType: Function;
            var propd = this._Property;
            if (propd) {
                isAttached = propd.IsAttached;
                ownerType = propd.OwnerType;
            }
            var value = this.GetValue(propd);
            parser.TrySetPropertyValue(this._Target, propd, value, null, isAttached, ownerType, propd.Name);
        }
    }
    Fayde.RegisterType(StaticResourceExpression, {
    	Name: "StaticResourceExpression",
    	Namespace: "Fayde",
    	XmlNamespace: Fayde.XMLNS
    });
}