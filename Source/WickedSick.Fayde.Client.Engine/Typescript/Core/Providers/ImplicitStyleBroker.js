var Fayde;
(function (Fayde) {
    /// CODE
    /// <reference path="../FrameworkElement.ts" />
    (function (Providers) {
        (function (StyleIndex) {
            StyleIndex._map = [];
            StyleIndex.VisualTree = 0;
            StyleIndex.ApplicationResources = 1;
            StyleIndex.GenericXaml = 2;
            StyleIndex.Count = 3;
        })(Providers.StyleIndex || (Providers.StyleIndex = {}));
        var StyleIndex = Providers.StyleIndex;
        (function (StyleMask) {
            StyleMask._map = [];
            StyleMask.None = 0;
            StyleMask.VisualTree = 1 << StyleIndex.VisualTree;
            StyleMask.ApplicationResources = 1 << StyleIndex.ApplicationResources;
            StyleMask.GenericXaml = 1 << StyleIndex.GenericXaml;
            StyleMask.All = StyleMask.VisualTree | StyleMask.ApplicationResources | StyleMask.GenericXaml;
        })(Providers.StyleMask || (Providers.StyleMask = {}));
        var StyleMask = Providers.StyleMask;
        var ImplicitStyleBroker = (function () {
            function ImplicitStyleBroker() { }
            ImplicitStyleBroker.Set = function Set(fe, mask, styles) {
                if(!styles) {
                    styles = ImplicitStyleBroker.GetImplicitStyles(fe, mask);
                }
                if(styles) {
                    var error = new BError();
                    var len = StyleIndex.Count;
                    for(var i = 0; i < len; i++) {
                        var style = styles[i];
                        if(!style) {
                            continue;
                        }
                        if(!style.Validate(fe, error)) {
                            error.ThrowException();
                            //Warn("Style validation failed. [" + error.Message + "]");
                            return;
                        }
                    }
                }
                ImplicitStyleBroker.SetImpl(fe, mask, styles);
            };
            ImplicitStyleBroker.SetImpl = function SetImpl(fe, mask, styles) {
                if(!styles) {
                    return;
                }
                var oldStyles = (fe.XamlNode)._ImplicitStyles;
                var newStyles = [
                    null, 
                    null, 
                    null
                ];
                if(oldStyles) {
                    newStyles[StyleIndex.GenericXaml] = oldStyles[StyleIndex.GenericXaml];
                    newStyles[StyleIndex.ApplicationResources] = oldStyles[StyleIndex.ApplicationResources];
                    newStyles[StyleIndex.VisualTree] = oldStyles[StyleIndex.VisualTree];
                }
                if(mask & StyleMask.GenericXaml) {
                    newStyles[StyleIndex.GenericXaml] = styles[StyleIndex.GenericXaml];
                }
                if(mask & StyleMask.ApplicationResources) {
                    newStyles[StyleIndex.ApplicationResources] = styles[StyleIndex.ApplicationResources];
                }
                if(mask & StyleMask.VisualTree) {
                    newStyles[StyleIndex.VisualTree] = styles[StyleIndex.VisualTree];
                }
                ImplicitStyleBroker.ApplyStyles(fe, mask, styles);
            };
            ImplicitStyleBroker.Clear = function Clear(fe, mask) {
                var holder = fe.XamlNode;
                var oldStyles = holder._ImplicitStyles;
                if(!oldStyles) {
                    return;
                }
                var newStyles = oldStyles.slice(0);
                //TODO: Do we need a deep copy?
                if(mask & StyleMask.GenericXaml) {
                    newStyles[StyleIndex.GenericXaml] = null;
                }
                if(mask & StyleMask.ApplicationResources) {
                    newStyles[StyleIndex.ApplicationResources] = null;
                }
                if(mask & StyleMask.VisualTree) {
                    newStyles[StyleIndex.VisualTree] = null;
                }
                ImplicitStyleBroker.ApplyStyles(fe, holder._StyleMask & ~mask, newStyles);
            };
            ImplicitStyleBroker.ApplyStyles = function ApplyStyles(fe, mask, styles) {
                var holder = fe.XamlNode;
                var oldStyles = holder._ImplicitStyles;
                var isChanged = !oldStyles || mask !== holder._StyleMask;
                if(!isChanged) {
                    for(var i = 0; i < StyleIndex.Count; i++) {
                        if(styles[i] !== oldStyles[i]) {
                            isChanged = true;
                            break;
                        }
                    }
                }
                if(!isChanged) {
                    return;
                }
                var arr = (fe)._PropertyStorage;
                var store = Providers.PropertyStore.Instance;
                var oldWalker = Fayde.MultipleStylesWalker(oldStyles);
                var newWalker = Fayde.MultipleStylesWalker(styles);
                var oldSetter = oldWalker.Step();
                var newSetter = newWalker.Step();
                var oldProp;
                var newProp;
                var storage;
                var oldValue = undefined;
                var newValue = undefined;
                var propd;
                while(oldSetter || newSetter) {
                    if(oldSetter) {
                        propd = oldProp = oldSetter.Property;
                        oldValue = oldSetter.ConvertedValue;
                    }
                    if(newSetter) {
                        propd = newProp = newSetter.Property;
                        newValue = newSetter.ConvertedValue;
                    }
                    storage = arr[propd._ID];
                    if(!storage) {
                        storage = arr[propd._ID] = store.CreateStorage(fe, propd);
                    }
                    store.SetImplicitStyle(storage, newValue);
                    if(oldProp) {
                        oldSetter = oldWalker.Step();
                    }
                    if(newProp) {
                        newSetter = newWalker.Step();
                    }
                }
                holder._ImplicitStyles = styles;
                holder._StyleMask = mask;
            };
            ImplicitStyleBroker.GetImplicitStyles = function GetImplicitStyles(fe, mask) {
                var feType = (fe).constructor;
                var feTypeName = (feType)._TypeName;
                var genericXamlStyle = undefined;
                if((mask & StyleMask.GenericXaml) != 0) {
                    if(fe instanceof Fayde.Controls.Control) {
                        genericXamlStyle = (fe).GetDefaultStyle();
                        if(!genericXamlStyle) {
                            var styleKey = fe.DefaultStyleKey;
                            if(styleKey) {
                                genericXamlStyle = ImplicitStyleBroker.GetGenericXamlStyleFor(styleKey);
                            }
                        }
                    }
                }
                var appResourcesStyle = undefined;
                var rd = App.Current.Resources;
                if((mask & StyleMask.ApplicationResources) != 0) {
                    appResourcesStyle = rd.Get(feType);
                    if(!appResourcesStyle) {
                        appResourcesStyle = rd.Get(feTypeName);
                    }
                    //if (appResourcesStyle)
                    //appResourcesStyle._ResChain = [rd];
                                    }
                var visualTreeStyle = undefined;
                if((mask & StyleMask.VisualTree) != 0) {
                    var cur = fe;
                    var curNode = fe.XamlNode;
                    var isControl = curNode instanceof Fayde.Controls.ControlNode;
                    while(curNode) {
                        cur = curNode.XObject;
                        if(cur.TemplateOwner && !fe.TemplateOwner) {
                            cur = cur.TemplateOwner;
                            curNode = cur.XamlNode;
                            continue;
                        }
                        if(!isControl && cur === fe.TemplateOwner) {
                            break;
                        }
                        rd = cur.Resources;
                        if(rd) {
                            visualTreeStyle = rd.Get(feType);
                            if(!visualTreeStyle) {
                                visualTreeStyle = rd.Get(feTypeName);
                            }
                            if(visualTreeStyle) {
                                break;
                            }
                        }
                        curNode = curNode.VisualParentNode;
                    }
                }
                var styles = [];
                styles[StyleIndex.GenericXaml] = genericXamlStyle;
                styles[StyleIndex.ApplicationResources] = appResourcesStyle;
                styles[StyleIndex.VisualTree] = visualTreeStyle;
                return styles;
            };
            ImplicitStyleBroker.GetGenericXamlStyleFor = function GetGenericXamlStyleFor(type) {
                var rd = App.GetGenericResourceDictionary();
                if(rd) {
                    return rd.Get(type);
                }
            };
            return ImplicitStyleBroker;
        })();
        Providers.ImplicitStyleBroker = ImplicitStyleBroker;        
    })(Fayde.Providers || (Fayde.Providers = {}));
    var Providers = Fayde.Providers;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=ImplicitStyleBroker.js.map
