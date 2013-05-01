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
var Fayde;
(function (Fayde) {
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
                parser._ResChain = resChain;
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
            return parser.SetObject(json, uc, new Fayde.NameScope(true));
        };
        JsonParser.ParseResourceDictionary = function ParseResourceDictionary(rd, json) {
            var parser = new JsonParser();
            parser._RootXamlObject = rd;
            parser.SetObject(json, rd, rd.XamlNode.NameScope);
        };
        JsonParser.prototype.CreateObject = function (json, namescope, ignoreResolve) {
            var type = json.ParseType;
            if(!type) {
                return json;
            }
            if(type === Number || type === String || type === Boolean) {
                return json.Value;
            }
            if(type === Fayde.Controls.ControlTemplate) {
                var targetType = json.Props == null ? null : json.Props.TargetType;
                return new Fayde.Controls.ControlTemplate(targetType, json.Content, this._ResChain);
            }
            if(type === Fayde.DataTemplate) {
                return new Fayde.DataTemplate(json.Content, this._ResChain);
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
                if(namescope) {
                    xnode.NameScope = namescope;
                }
                var name = json.Name;
                if(name) {
                    xnode.SetName(name);
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
            if(json.Props) {
                for(var propName in json.Props) {
                    propValue = json.Props[propName];
                    if(propValue === undefined) {
                        continue;
                    }
                    var ctor = (xobj).constructor;
                    if(dobj) {
                        propd = DependencyProperty.GetDependencyProperty(ctor, propName);
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
                        content = content.Transmute(xobj, contentProp, "Content", this._TemplateBindingSource);
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
            return content;
        };
        JsonParser.prototype.TrySetPropertyValue = function (xobj, propd, propValue, namescope, isAttached, ownerType, propName) {
            if(propValue.ParseType) {
                propValue = this.CreateObject(propValue, namescope, true);
            }
            if(propValue instanceof Fayde.Markup) {
                propValue = propValue.Transmute(xobj, propd, propName, this._TemplateBindingSource);
            }
            if(propValue instanceof Fayde.StaticResourceExpression) {
                this.SetValue(xobj, propd, propName, propValue);
                return;
            }
            //Set property value
            if(propd) {
                if(this.TrySetCollectionProperty(propValue, xobj, propd, undefined, namescope)) {
                    return;
                }
                if(!(propValue instanceof Fayde.Expression)) {
                    var targetType = propd.GetTargetType();
                    if(targetType instanceof Enum) {
                    } else if(!(propValue instanceof targetType)) {
                        var propDesc = Nullstone.GetPropertyDescriptor(xobj, propName);
                        if(propDesc) {
                            var setFunc = propDesc.set;
                            var converter;
                            if(setFunc && (converter = (setFunc).Converter) && converter instanceof Function) {
                                propValue = converter(propValue);
                            }
                        }
                    }
                }
                this.SetValue(xobj, propd, propName, propValue);
            } else if(!isAttached) {
                if(Nullstone.HasProperty(xobj, propName)) {
                    xobj[propName] = propValue;
                } else {
                    var func = xobj["Set" + propName];
                    if(func && func instanceof Function) {
                        func.call(xobj, propValue);
                    }
                }
            } else {
                //There is no fallback if we can't find attached property
                Warn("Could not find attached property: " + (ownerType)._TypeName + "." + propName);
            }
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
                    coll = (new targetType()());
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
            if(coll instanceof Fayde.ResourceDictionary) {
                this.SetResourceDictionary(coll, subJson, namescope);
            } else {
                for(var i = 0; i < subJson.length; i++) {
                    coll.Add(this.CreateObject(subJson[i], namescope, true));
                }
            }
            return true;
        };
        JsonParser.prototype.SetResourceDictionary = function (rd, subJson, namescope) {
            var oldChain = this._ResChain;
            this._ResChain = this._ResChain.slice(0);
            this._ResChain.push(rd);
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
                    fobj = new Fayde.ResourceTarget(val, namescope, this._TemplateBindingSource, this._ResChain);
                }
                if(key) {
                    rd.Set(key, fobj);
                }
            }
            this._ResChain = oldChain;
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
