/// <reference path="../Runtime/Nullstone.ts" />
/// CODE
/// <reference path="../Core/NameScope.ts" />
/// <reference path="../Core/ResourceDictionary.ts" />
/// <reference path="../Controls/UserControl.ts" />
/// <reference path="../Controls/ControlTemplate.ts" />
/// <reference path="../Core/DataTemplate.ts" />
/// <reference path="../Core/ResourceTarget.ts" />
/// <reference path="../Core/Style.ts" />
/// <reference path="Markup.ts" />
/// <reference path="../Core/StaticResourceExpression.ts" />
/// <reference path="../Core/DeferredValueExpression.ts" />

module Fayde {
    export interface IAttachedDefinition {
        Owner: Function;
        Prop: string;
        Value: any;
    }
    
    var WARN_ON_SET_READ_ONLY: bool = true;
    export class JsonParser {

        private _ResChain: Fayde.ResourceDictionary[] = [];
        private _RootXamlObject: XamlObject = null;
        private _TemplateBindingSource: DependencyObject = null;
        private _SRExpressions: StaticResourceExpression[] = [];

        static Parse(json: any, templateBindingSource?: DependencyObject, namescope?: NameScope, resChain?: Fayde.ResourceDictionary[], rootXamlObject?: XamlObject): any {
            var parser = new JsonParser();
            if (resChain)
                parser._ResChain = resChain.slice(0);
            parser._TemplateBindingSource = templateBindingSource;
            parser._RootXamlObject = rootXamlObject;

            if (!namescope)
                namescope = new NameScope();

            //var app = App.Instance;
            //var perfTimer = new Fayde.PerfTimer();
            //perfTimer.ReportFunc = function (elapsed) { app._NotifyDebugParserPass(json.ParseType, elapsed); };
            //perfTimer.IsDisabled = app._DebugFunc[5] == null;

            //perfTimer.Start();
            var xobj = parser.CreateObject(json, namescope);
            //perfTimer.Stop();

            return xobj;
        }
        static ParseUserControl(uc: Controls.UserControl, json: any): UIElement {
            //Sets up UserControl, then returns root element
            var parser = new JsonParser();
            parser._RootXamlObject = uc;
            return <UIElement>parser.SetObject(json, uc, new Fayde.NameScope(true));
        }
        static ParseResourceDictionary(rd: Fayde.ResourceDictionary, json: any) {
            var parser = new JsonParser();
            parser._RootXamlObject = rd;
            parser._ResChain.push(rd);
            var ns = rd.XamlNode.NameScope;
            if (!ns) ns = new NameScope();
            if (json.Children) {
                parser.SetResourceDictionary(rd, json.Children, ns);
                parser.ResolveStaticResourceExpressions();
            }
        }
        static ParsePage(json: any): Controls.Page {
            if (!json.ParseType)
                return undefined;
            var page = new json.ParseType();
            if (!page || !(page instanceof Controls.Page))
                return undefined;
            var parser = new JsonParser();
            parser._RootXamlObject = page;
            parser.SetObject(json, page, new Fayde.NameScope(true));
            return page;
        }

        CreateObject(json: any, namescope: NameScope, ignoreResolve?: bool): any {
            var type = json.ParseType;
            if (!type) {
                if (json instanceof FrameworkTemplate)
                    (<FrameworkTemplate>json).ResChain = this._ResChain.slice(0);
                return json;
            }

            if (type === Number || type === String || type === Boolean)
                return json.Value;

            var xobj = new type();
            if (!this._RootXamlObject)
                this._RootXamlObject = xobj;
            this.SetObject(json, xobj, namescope, ignoreResolve);
            return xobj;
        }
        SetObject(json: any, xobj: XamlObject, namescope: NameScope, ignoreResolve?: bool): any {
            //Sets object properties; will return Children/Content object if exists
            var xnode: XamlNode;
            if (xobj)
                xnode = xobj.XamlNode;

            if (xnode) {
                if (namescope)
                    xnode.NameScope = namescope;
                var name = json.Name;
                if (name)
                    xnode.SetName(name);
            }

            xobj.TemplateOwner = this._TemplateBindingSource;

            var dobj: DependencyObject;
            if (xobj instanceof DependencyObject)
                dobj = <DependencyObject>xobj;

            var type = json.ParseType;

            var propd: DependencyProperty;
            var propValue;

            var shouldPopResChain = false;
            if (json.Resources) {
                shouldPopResChain = true;
                var rd = (<IResourcable><any>xobj).Resources;
                this._ResChain.push(rd);
                this.SetResourceDictionary(rd, json.Resources.Children, namescope);
            }

            if (json.Props) {
                for (var propName in json.Props) {
                    propValue = json.Props[propName];
                    if (propValue === undefined)
                        continue;

                    var ctor = (<any>xobj).constructor;
                    if (dobj)
                        propd = DependencyProperty.GetDependencyProperty(ctor, propName, true);
                    this.TrySetPropertyValue(xobj, propd, propValue, namescope, false, ctor, propName);
                }
            }

            var attachedProps: IAttachedDefinition[] = json.AttachedProps;
            if (attachedProps) {
                if (!isArray(attachedProps))
                    throw new Exception("json.AttachedProps is not an array");
                for (var i in attachedProps) {
                    var attachedDef: IAttachedDefinition = attachedProps[i];
                    //TODO: Namespace Prefixes?
                    propd = DependencyProperty.GetDependencyProperty(attachedDef.Owner, attachedDef.Prop);
                    propValue = attachedDef.Value;
                    this.TrySetPropertyValue(xobj, propd, propValue, namescope, true, attachedDef.Owner, attachedDef.Prop);
                }
            }

            if (json.Events) {
                for (var i in json.Events) {
                    var targetEvent = xobj[i];
                    if (!targetEvent || !(targetEvent instanceof MulticastEvent))
                        throw new ArgumentException("Could not locate event '" + i + "' on object '" + type._TypeName + "'.");
                    var root = this._RootXamlObject;
                    var callbackName = json.Events[i];
                    var targetCallback = root[callbackName];
                    if (!targetCallback || typeof targetCallback !== "function")
                        throw new ArgumentException("Could not locate event callback '" + callbackName + "' on object '" + (<any>root).constructor._TypeName + "'.");
                    targetEvent.Subscribe(targetCallback, root);
                }
            }

            var content: any;
            var contentProp = this.GetAnnotationMember(type, "ContentProperty");
            var pd: DependencyProperty;
            var pn: string;
            if (contentProp) {
                if (contentProp instanceof DependencyProperty) {
                    pd = contentProp;
                    pn = pd.Name;
                } else if (typeof contentProp === "string") {
                    pn = contentProp;
                }
                content = json.Content;
                if (content) {
                    if (content instanceof Markup)
                        content = (<Markup>content).Transmute(xobj, contentProp, "Content", this._TemplateBindingSource, this._ResChain.slice(0));
                    else
                        content = this.CreateObject(content, namescope, true);
                    this.SetValue(xobj, pd, pn, content);
                }
            }
            if (json.Children) {
                this.TrySetCollectionProperty(<any[]>json.Children, xobj, pd, pn, namescope);
            }

            if (!ignoreResolve) {
                this.ResolveStaticResourceExpressions();
            }

            if (shouldPopResChain)
                this._ResChain.pop();

            return content;
        }

        TrySetPropertyValue(xobj: XamlObject, propd: DependencyProperty, propValue: any, namescope: NameScope, isAttached: bool, ownerType: Function, propName: string) {
            if (propValue instanceof Markup)
                propValue = (<Markup>propValue).Transmute(xobj, propd, propName, this._TemplateBindingSource, this._ResChain.slice(0));

            if (propValue instanceof FrameworkTemplate) {
                (<FrameworkTemplate>propValue).ResChain = this._ResChain.slice(0);
                this.SetValue(xobj, propd, propName, propValue);
                return;
            } else if (propValue instanceof StaticResourceExpression) {
                this.SetValue(xobj, propd, propName, propValue);
                return;
            } else if (propValue.ParseType === ResourceDictionary) {
                //TODO: Kill
                //this.SetResourceDictionary(xobj[propName], propValue.Children, namescope);
                return;
            }

            if (propValue.ParseType)
                propValue = this.CreateObject(propValue, namescope, true);

            if (!propd && isAttached) {
                //There is no fallback if we can't find attached property
                Warn("Could not find attached property: " + (<any>ownerType)._TypeName + "." + propName);
                return;
            }

            if (this.TrySetCollectionProperty(propValue, xobj, propd, propName, namescope))
                return;

            if (propd) {
                this.SetValue(xobj, propd, propName, propValue);
                return;
            }

            if (WARN_ON_SET_READ_ONLY) {
                var descriptor = Nullstone.GetPropertyDescriptor(xobj, propName);
                if (!descriptor)
                    Warn("Parser is setting a property that has not been defined yet: " + propName);
                else if (!descriptor.writable && !descriptor.set )
                    Warn("Parser is trying to set a read-only property: " + propName);
            }
            xobj[propName] = propValue;
        }
        TrySetCollectionProperty(subJson: any[], xobj: XamlObject, propd: DependencyProperty, propertyName: string, namescope: NameScope) {
            if (!subJson)
                return false;
            if (!((Array.isArray && Array.isArray(subJson)) || (<any>subJson).constructor === Array))
                return false;

            var coll: XamlObjectCollection;
            if (propd) {
                var targetType = propd.GetTargetType();
                if (!Nullstone.DoesInheritFrom(targetType, XamlObjectCollection))
                    return false;
                if (propd._IsAutoCreated) {
                    coll = (<DependencyObject>xobj).GetValue(propd);
                } else {
                    coll = <XamlObjectCollection>new (<any>targetType)();
                    (<DependencyObject>xobj).SetValue(propd, coll);
                }
            } else if (typeof propertyName === "string") {
                coll = xobj[propertyName];
            } else if (xobj instanceof XamlObjectCollection) {
                coll = <XamlObjectCollection>xobj;
            }

            if (!(coll instanceof XamlObjectCollection))
                return false;

            coll.XamlNode.NameScope = namescope;

            if (coll instanceof ResourceDictionary) {
                this.SetResourceDictionary(<ResourceDictionary>coll, subJson, namescope);
            } else {
                for (var i = 0; i < subJson.length; i++) {
                    coll.Add(this.CreateObject(subJson[i], namescope, true));
                }
            }

            return true;
        }
        SetResourceDictionary(rd: ResourceDictionary, subJson: any[], namescope: NameScope) {
            rd.XamlNode.NameScope = namescope;

            var fobj: XamlObject;
            var cur: any;
            var key: any;
            var val: any;
            for (var i = 0; i < subJson.length; i++) {
                cur = subJson[i];
                key = cur.Key;
                val = cur.Value;

                if (val.ParseType === Style) {
                    fobj = this.CreateObject(val, namescope, true);
                    if (!key)
                        key = (<Style>fobj).TargetType;
                } else {
                    fobj = new ResourceTarget(val, namescope, this._TemplateBindingSource, this._ResChain.slice(0));
                }
                if (key)
                    rd.Set(key, fobj);
            }
        }
        ResolveStaticResourceExpressions() {
            var srs = this._SRExpressions;
            if (!srs || srs.length === 0)
                return;
            var cur: StaticResourceExpression;
            while (cur = srs.shift()) {
                cur.Resolve(this);
            }
        }
        SetValue(xobj: XamlObject, propd: DependencyProperty, propName: string, value: any) {
            if (propd) {
                if (value instanceof StaticResourceExpression) {
                    this._SRExpressions.push(value);
                    (<DependencyObject>xobj).SetValueInternal(propd, new DeferredValueExpression());
                } else if (value instanceof Expression) {
                    (<DependencyObject>xobj).SetValueInternal(propd, value);
                } else {
                    (<DependencyObject>xobj)._Store.SetValue(propd, value);
                }
            } else if (propName) {
                xobj[propName] = value;
            }
        }
        private GetAnnotationMember(type: Function, member: string) {
            if (!type)
                return;
            //if (!type._IsNullstone)
            //  return;
            var t = <any>type;
            var anns = t.Annotations;
            var annotation;
            if (anns && (annotation = anns[member]))
                return annotation;
            return this.GetAnnotationMember(t._BaseClass, member);
        }
    }
    Nullstone.RegisterType(JsonParser, "JsonParser");
    
    function isArray(o) {
        if (Array.isArray)
            return Array.isArray(o);
        return o && o.constructor === Array;
    }
}