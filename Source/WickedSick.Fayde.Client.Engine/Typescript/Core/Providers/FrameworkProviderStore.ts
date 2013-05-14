/// <reference path="InheritedProviderStore.ts" />
/// CODE
/// <reference path="../FrameworkElement.ts" />
/// <reference path="../../Engine/App.ts" />

module Fayde.Providers {
    export interface ILocalStylesProvider extends IPropertyProvider {
        UpdateStyle(style: Style, error: BError);
    }
    export interface IImplicitStylesProvider extends IPropertyProvider {
        SetStyles(styleMask: _StyleMask, styles: Style[], error: BError);
        ClearStyles(styleMask: _StyleMask, error: BError);
    }

    export class FrameworkProviderStore extends InheritedProviderStore {
        constructor(dobj: DependencyObject) {
            super(dobj);
        }

        SetProviders(providerArr: Providers.IPropertyProvider[]) {
            this._LocalValueProvider = this._Providers[1] = <LocalValueProvider>providerArr[1];
            this._DynamicValueProvider = this._Providers[2] = providerArr[2];
            this._LocalStyleProvider = this._Providers[3] = <ILocalStylesProvider>providerArr[3];
            this._ImplicitStyleProvider = this._Providers[4] = <IImplicitStylesProvider>providerArr[4];
            this._InheritedProvider = this._Providers[5] = <IInheritedProvider>providerArr[5];
            this._InheritedDataContextProvider = this._Providers[6] = <IInheritedDataContextProvider>providerArr[6];
            this._DefaultValueProvider = this._Providers[7] = <DefaultValueProvider>providerArr[7];
            this._AutoCreateProvider = this._Providers[8] = <AutoCreateProvider>providerArr[8];
        }

        private _Providers: IPropertyProvider[];
        private _LocalValueProvider: LocalValueProvider;
        private _DynamicValueProvider: IPropertyProvider;
        private _LocalStyleProvider: ILocalStylesProvider;
        private _ImplicitStyleProvider: IImplicitStylesProvider;
        private _InheritedProvider: IInheritedProvider;
        private _InheritedDataContextProvider: IInheritedDataContextProvider;
        private _DefaultValueProvider: DefaultValueProvider;
        private _AutoCreateProvider: AutoCreateProvider;

        SetImplicitStyles(styleMask: _StyleMask, styles?: Style[]) {
            if (!styles)
                styles = this._GetImplicitStyles(styleMask);
            if (styles) {
                var error = new BError();
                var len = Providers._StyleIndex.Count;
                for (var i = 0; i < len; i++) {
                    var style = styles[i];
                    if (!style)
                        continue;
                    if (!style.Validate(this._Object, error)) {
                        error.ThrowException();
                        //Warn("Style validation failed. [" + error.Message + "]");
                        return;
                    }
                }
            }

            this._ImplicitStyleProvider.SetStyles(styleMask, styles, error);
        }
        private _GetImplicitStyles(styleMask: _StyleMask): Style[] {
            var fe = <FrameworkElement>this._Object;
            var feType = (<any>fe).constructor;
            var feTypeName = (<any>feType)._TypeName;

            var genericXamlStyle: Style = undefined;
            if ((styleMask & _StyleMask.GenericXaml) != 0) {
                if (fe instanceof Controls.Control) {
                    genericXamlStyle = (<Controls.Control>fe).GetDefaultStyle();
                    if (!genericXamlStyle) {
                        var styleKey = fe.DefaultStyleKey;
                        if (styleKey)
                            genericXamlStyle = this._GetGenericXamlStyleFor(styleKey);
                    }
                }
            }
            
            var appResourcesStyle: Style = undefined;
            var rd = App.Current.Resources;
            if ((styleMask & _StyleMask.ApplicationResources) != 0) {
                appResourcesStyle = <Style>rd.Get(feType);
                if (!appResourcesStyle)
                    appResourcesStyle = <Style>rd.Get(feTypeName);
                //if (appResourcesStyle)
                    //appResourcesStyle._ResChain = [rd];
            }


            var visualTreeStyle: Style = undefined;
            if ((styleMask & _StyleMask.VisualTree) != 0) {
                var cur = fe;
                var curNode = fe.XamlNode;
                var isControl = curNode instanceof Controls.ControlNode;

                while (curNode) {
                    cur = curNode.XObject;
                    if (cur.TemplateOwner && !fe.TemplateOwner) {
                        cur = <FrameworkElement>cur.TemplateOwner;
                        curNode = cur.XamlNode;
                        continue;
                    }
                    if (!isControl && cur === fe.TemplateOwner)
                        break;

                    rd = cur.Resources;
                    if (rd) {
                        visualTreeStyle = <Style>rd.Get(feType);
                        if (!visualTreeStyle)
                            visualTreeStyle = <Style>rd.Get(feTypeName);
                        if (visualTreeStyle)
                            break;
                    }

                    curNode = <FENode>curNode.VisualParentNode;
                }
            }

            var styles = [];
            styles[_StyleIndex.GenericXaml] = genericXamlStyle;
            styles[_StyleIndex.ApplicationResources] = appResourcesStyle;
            styles[_StyleIndex.VisualTree] = visualTreeStyle;
            return styles;
        }
        private _GetGenericXamlStyleFor(type: any): Style {
            var rd = App.GetGenericResourceDictionary();
            if (rd)
                return <Style>rd.Get(type);
        }
        ClearImplicitStyles(styleMask: _StyleMask) {
            var error = new BError();
            this._ImplicitStyleProvider.ClearStyles(styleMask, error);
        }
        SetLocalStyle(style: Style, error: BError) {
            this._LocalStyleProvider.UpdateStyle(style, error);
        }
    }
    Nullstone.RegisterType(FrameworkProviderStore, "FrameworkProviderStore");
}