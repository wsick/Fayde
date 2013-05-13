/// <reference path="../Runtime/Nullstone.ts" />
/// CODE
/// <reference path="../Core/NameScope.ts" />
/// <reference path="../Core/ResourceDictionary.ts" />
/// <reference path="../Controls/UserControl.ts" />
/// <reference path="../Controls/Page.ts" />
/// <reference path="../Controls/ControlTemplate.ts" />
/// <reference path="../Core/DataTemplate.ts" />
/// <reference path="../Core/ResourceTarget.ts" />
/// <reference path="../Core/Style.ts" />
/// <reference path="Markup.ts" />
/// <reference path="../Core/StaticResourceExpression.ts" />
/// <reference path="../Core/DeferredValueExpression.ts" />
var Fayde;
(function (Fayde) {
    var WARN_ON_SET_READ_ONLY = true;
    var JsonParser = (function () {
        function JsonParser() {
            this._ResChain = [];
            this._RootXamlObject = null;
            this._TemplateBindingSource = null;
            this._SRExpressions = [];
        }
        JsonParser.Parse = function Parse(json, templateBindingSource, namescope, resChain, rootXamlObject) {
            var parser = new JsonParser();
            if(resChain) {
                parser._ResChain = resChain.slice(0);
            }
            parser._TemplateBindingSource = templateBindingSource;
            parser._RootXamlObject = rootXamlObject;
            if(!namescope) {
                namescope = new Fayde.NameScope();
            }
            //var app = App.Instance;
            //var perfTimer = new Fayde.PerfTimer();
            //perfTimer.ReportFunc = function (elapsed) { app._NotifyDebugParserPass(json.ParseType, elapsed); };
            //perfTimer.IsDisabled = app._DebugFunc[5] == null;
            //perfTimer.Start();
            var xobj = parser.CreateObject(json, namescope);
            //perfTimer.Stop();
            return xobj;
        };
        JsonParser.ParseUserControl = function ParseUserControl(uc, json) {
            //Sets up UserControl, then returns root element
            var parser = new JsonParser();
            parser._RootXamlObject = uc;
            var ns = new Fayde.NameScope(true);
            var content = parser.SetObject(json, uc, ns);
            content.XamlNode.NameScope = ns;
            return content;
        };
        JsonParser.ParseResourceDictionary = function ParseResourceDictionary(rd, json) {
            var parser = new JsonParser();
            parser._RootXamlObject = rd;
            parser._ResChain.push(rd);
            var ns = rd.XamlNode.NameScope;
            if(!ns) {
                ns = new Fayde.NameScope();
            }
            parser.SetResourceDictionary(rd, json, ns);
            parser.ResolveStaticResourceExpressions();
        };
        JsonParser.ParsePage = function ParsePage(json) {
            if(!json.ParseType) {
                return undefined;
            }
            var page = new json.ParseType();
            if(!page || !(page instanceof Fayde.Controls.Page)) {
                return undefined;
            }
            var parser = new JsonParser();
            var ns = page.XamlNode.NameScope = new Fayde.NameScope(true);
            parser._RootXamlObject = page;
            parser.SetObject(json, page, ns);
            return page;
        };
        JsonParser.prototype.CreateObject = function (json, namescope, ignoreResolve) {
            var type = json.ParseType;
            if(!type) {
                if(json instanceof Fayde.FrameworkTemplate) {
                    (json).ResChain = this._ResChain.slice(0);
                }
                return json;
            }
            if(type === Number || type === String || type === Boolean) {
                return json.Value;
            }
            var xobj = new type();
            if(!this._RootXamlObject) {
                this._RootXamlObject = xobj;
            }
            this.SetObject(json, xobj, namescope, ignoreResolve);
            return xobj;
        };
        JsonParser.prototype.SetObject = function (json, xobj, namescope, ignoreResolve) {
            //Sets object properties; will return Children/Content object if exists
            var xnode;
            if(xobj) {
                xnode = xobj.XamlNode;
            }
            if(xnode) {
                var name = json.Name;
                if(name) {
                    xnode.Name = name;
                    namescope.RegisterName(name, xnode);
                }
            }
            xobj.TemplateOwner = this._TemplateBindingSource;
            var dobj;
            if(xobj instanceof Fayde.DependencyObject) {
                dobj = xobj;
            }
            var type = json.ParseType;
            var propd;
            var propValue;
            var shouldPopResChain = false;
            if(json.Resources) {
                shouldPopResChain = true;
                var rd = (xobj).Resources;
                this._ResChain.push(rd);
                this.SetResourceDictionary(rd, json.Resources, namescope);
            }
            if(json.Props) {
                for(var propName in json.Props) {
                    propValue = json.Props[propName];
                    if(propValue === undefined) {
                        continue;
                    }
                    var ctor = (xobj).constructor;
                    if(dobj) {
                        propd = DependencyProperty.GetDependencyProperty(ctor, propName, true);
                    }
                    this.TrySetPropertyValue(xobj, propd, propValue, namescope, false, ctor, propName);
                }
            }
            var attachedProps = json.AttachedProps;
            if(attachedProps) {
                if(!isArray(attachedProps)) {
                    throw new Exception("json.AttachedProps is not an array");
                }
                for(var i in attachedProps) {
                    var attachedDef = attachedProps[i];
                    //TODO: Namespace Prefixes?
                    propd = DependencyProperty.GetDependencyProperty(attachedDef.Owner, attachedDef.Prop);
                    propValue = attachedDef.Value;
                    this.TrySetPropertyValue(xobj, propd, propValue, namescope, true, attachedDef.Owner, attachedDef.Prop);
                }
            }
            if(json.Events) {
                for(var i in json.Events) {
                    var targetEvent = xobj[i];
                    if(!targetEvent || !(targetEvent instanceof MulticastEvent)) {
                        throw new ArgumentException("Could not locate event '" + i + "' on object '" + type._TypeName + "'.");
                    }
                    var root = this._RootXamlObject;
                    var callbackName = json.Events[i];
                    var targetCallback = root[callbackName];
                    if(!targetCallback || typeof targetCallback !== "function") {
                        throw new ArgumentException("Could not locate event callback '" + callbackName + "' on object '" + (root).constructor._TypeName + "'.");
                    }
                    targetEvent.Subscribe(targetCallback, root);
                }
            }
            var content;
            var contentProp = this.GetAnnotationMember(type, "ContentProperty");
            var pd;
            var pn;
            if(contentProp) {
                if(contentProp instanceof DependencyProperty) {
                    pd = contentProp;
                    pn = pd.Name;
                } else if(typeof contentProp === "string") {
                    pn = contentProp;
                }
                content = json.Content;
                if(content) {
                    if(content instanceof Fayde.Markup) {
                        content = (content).Transmute(xobj, contentProp, "Content", this._TemplateBindingSource, this._ResChain.slice(0));
                    } else {
                        content = this.CreateObject(content, namescope, true);
                    }
                    this.SetValue(xobj, pd, pn, content);
                }
            }
            if(json.Children) {
                this.TrySetCollectionProperty(json.Children, xobj, pd, pn, namescope);
            }
            if(!ignoreResolve) {
                this.ResolveStaticResourceExpressions();
            }
            if(shouldPopResChain) {
                this._ResChain.pop();
            }
            return content;
        };
        JsonParser.prototype.TrySetPropertyValue = function (xobj, propd, propValue, namescope, isAttached, ownerType, propName) {
            if(propValue instanceof Fayde.Markup) {
                propValue = (propValue).Transmute(xobj, propd, propName, this._TemplateBindingSource, this._ResChain.slice(0));
            }
            if(propValue instanceof Fayde.FrameworkTemplate) {
                (propValue).ResChain = this._ResChain.slice(0);
                this.SetValue(xobj, propd, propName, propValue);
                return;
            } else if(propValue instanceof Fayde.StaticResourceExpression) {
                this.SetValue(xobj, propd, propName, propValue);
                return;
            }
            if(propValue.ParseType) {
                propValue = this.CreateObject(propValue, namescope, true);
            }
            if(!propd && isAttached) {
                //There is no fallback if we can't find attached property
                Warn("Could not find attached property: " + (ownerType)._TypeName + "." + propName);
                return;
            }
            if(this.TrySetCollectionProperty(propValue, xobj, propd, propName, namescope)) {
                return;
            }
            if(propd) {
                this.SetValue(xobj, propd, propName, propValue);
                return;
            }
            if(WARN_ON_SET_READ_ONLY) {
                var descriptor = Nullstone.GetPropertyDescriptor(xobj, propName);
                if(!descriptor) {
                    Warn("Parser is setting a property that has not been defined yet: " + propName);
                } else if(!descriptor.writable && !descriptor.set) {
                    Warn("Parser is trying to set a read-only property: " + propName);
                }
            }
            xobj[propName] = propValue;
        };
        JsonParser.prototype.TrySetCollectionProperty = function (subJson, xobj, propd, propertyName, namescope) {
            if(!subJson) {
                return false;
            }
            if(!((Array.isArray && Array.isArray(subJson)) || (subJson).constructor === Array)) {
                return false;
            }
            var coll;
            if(propd) {
                var targetType = propd.GetTargetType();
                if(!Nullstone.DoesInheritFrom(targetType, Fayde.XamlObjectCollection)) {
                    return false;
                }
                if(propd._IsAutoCreated) {
                    coll = (xobj).GetValue(propd);
                } else {
                    coll = new (targetType)();
                    (xobj).SetValue(propd, coll);
                }
            } else if(typeof propertyName === "string") {
                coll = xobj[propertyName];
            } else if(xobj instanceof Fayde.XamlObjectCollection) {
                coll = xobj;
            }
            if(!(coll instanceof Fayde.XamlObjectCollection)) {
                return false;
            }
            for(var i = 0; i < subJson.length; i++) {
                coll.Add(this.CreateObject(subJson[i], namescope, true));
            }
            return true;
        };
        JsonParser.prototype.SetResourceDictionary = function (rd, json, namescope) {
            var props = json.Props;
            if(props) {
                rd.Source = props.Source;
            }
            //TODO: Implement MergedDictionaries
            var subJson = json.Children;
            if(!subJson) {
                return;
            }
            var fobj;
            var cur;
            var key;
            var val;
            for(var i = 0; i < subJson.length; i++) {
                cur = subJson[i];
                key = cur.Key;
                val = cur.Value;
                if(val.ParseType === Fayde.Style) {
                    fobj = this.CreateObject(val, namescope, true);
                    if(!key) {
                        key = (fobj).TargetType;
                    }
                } else {
                    fobj = new Fayde.ResourceTarget(val, namescope, this._TemplateBindingSource, this._ResChain.slice(0));
                }
                if(key) {
                    rd.Set(key, fobj);
                }
            }
        };
        JsonParser.prototype.ResolveStaticResourceExpressions = function () {
            var srs = this._SRExpressions;
            if(!srs || srs.length === 0) {
                return;
            }
            var cur;
            while(cur = srs.shift()) {
                cur.Resolve(this);
            }
        };
        JsonParser.prototype.SetValue = function (xobj, propd, propName, value) {
            if(propd) {
                if(value instanceof Fayde.StaticResourceExpression) {
                    this._SRExpressions.push(value);
                    (xobj).SetValueInternal(propd, new Fayde.DeferredValueExpression());
                } else if(value instanceof Fayde.Expression) {
                    (xobj).SetValueInternal(propd, value);
                } else {
                    (xobj)._Store.SetValue(propd, value);
                }
            } else if(propName) {
                xobj[propName] = value;
            }
        };
        JsonParser.prototype.GetAnnotationMember = function (type, member) {
            if(!type) {
                return;
            }
            //if (!type._IsNullstone)
            //  return;
            var t = type;
            var anns = t.Annotations;
            var annotation;
            if(anns && (annotation = anns[member])) {
                return annotation;
            }
            return this.GetAnnotationMember(t._BaseClass, member);
        };
        return JsonParser;
    })();
    Fayde.JsonParser = JsonParser;    
    Nullstone.RegisterType(JsonParser, "JsonParser");
    function isArray(o) {
        if(Array.isArray) {
            return Array.isArray(o);
        }
        return o && o.constructor === Array;
    }
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=JsonParser.js.map
