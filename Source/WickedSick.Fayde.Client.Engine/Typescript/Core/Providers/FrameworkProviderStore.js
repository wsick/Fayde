var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Fayde;
(function (Fayde) {
    /// <reference path="InheritedProviderStore.ts" />
    /// CODE
    /// <reference path="../FrameworkElement.ts" />
    /// <reference path="../../Engine/App.ts" />
    (function (Providers) {
        var FrameworkProviderStore = (function (_super) {
            __extends(FrameworkProviderStore, _super);
            function FrameworkProviderStore(dobj) {
                        _super.call(this, dobj);
            }
            FrameworkProviderStore.prototype.SetProviders = function (providerArr) {
                this._LocalValueProvider = this._Providers[1] = providerArr[1];
                this._DynamicValueProvider = this._Providers[2] = providerArr[2];
                this._LocalStyleProvider = this._Providers[3] = providerArr[3];
                this._ImplicitStyleProvider = this._Providers[4] = providerArr[4];
                this._InheritedProvider = this._Providers[5] = providerArr[5];
                this._InheritedDataContextProvider = this._Providers[6] = providerArr[6];
                this._DefaultValueProvider = this._Providers[7] = providerArr[7];
                this._AutoCreateProvider = this._Providers[8] = providerArr[8];
            };
            FrameworkProviderStore.prototype.SetImplicitStyles = function (styleMask, styles) {
                if(!styles) {
                    styles = this._GetImplicitStyles(styleMask);
                }
                if(styles) {
                    var error = new BError();
                    var len = Fayde.Providers._StyleIndex.Count;
                    for(var i = 0; i < len; i++) {
                        var style = styles[i];
                        if(!style) {
                            continue;
                        }
                        if(!style.Validate(this._Object, error)) {
                            error.ThrowException();
                            //Warn("Style validation failed. [" + error.Message + "]");
                            return;
                        }
                    }
                }
                this._ImplicitStyleProvider.SetStyles(styleMask, styles, error);
            };
            FrameworkProviderStore.prototype._GetImplicitStyles = function (styleMask) {
                var fe = this._Object;
                var feType = (fe).constructor;
                var feTypeName = (fe)._TypeName;
                var genericXamlStyle = undefined;
                if((styleMask & Providers._StyleMask.GenericXaml) != 0) {
                    if(fe instanceof Fayde.Controls.Control) {
                        genericXamlStyle = (fe).GetDefaultStyle();
                        if(!genericXamlStyle) {
                            var styleKey = fe.DefaultStyleKey;
                            if(styleKey) {
                                genericXamlStyle = this._GetGenericXamlStyleFor(styleKey);
                            }
                        }
                    }
                }
                var appResourcesStyle = undefined;
                var rd = App.Instance.Resources;
                if((styleMask & Providers._StyleMask.ApplicationResources) != 0) {
                    appResourcesStyle = rd.Get(feType);
                    if(!appResourcesStyle) {
                        appResourcesStyle = rd.Get(feTypeName);
                    }
                    //if (appResourcesStyle)
                    //appResourcesStyle._ResChain = [rd];
                                    }
                var visualTreeStyle = undefined;
                if((styleMask & Providers._StyleMask.VisualTree) != 0) {
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
                styles[Providers._StyleIndex.GenericXaml] = genericXamlStyle;
                styles[Providers._StyleIndex.ApplicationResources] = appResourcesStyle;
                styles[Providers._StyleIndex.VisualTree] = visualTreeStyle;
                return styles;
            };
            FrameworkProviderStore.prototype._GetGenericXamlStyleFor = function (type) {
                var rd = App.GetGenericResourceDictionary();
                if(rd) {
                    return rd.Get(type);
                }
            };
            FrameworkProviderStore.prototype.ClearImplicitStyles = function (styleMask) {
                var error = new BError();
                this._ImplicitStyleProvider.ClearStyles(styleMask, error);
            };
            FrameworkProviderStore.prototype.SetLocalStyle = function (style, error) {
                this._LocalStyleProvider.UpdateStyle(style, error);
            };
            FrameworkProviderStore.prototype.EmitDataContextChanged = function () {
                this._InheritedDataContextProvider.EmitChanged();
            };
            FrameworkProviderStore.prototype.SetDataContextSource = function (source) {
                this._InheritedDataContextProvider.SetDataSource(source);
            };
            return FrameworkProviderStore;
        })(Providers.InheritedProviderStore);
        Providers.FrameworkProviderStore = FrameworkProviderStore;        
    })(Fayde.Providers || (Fayde.Providers = {}));
    var Providers = Fayde.Providers;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=FrameworkProviderStore.js.map
