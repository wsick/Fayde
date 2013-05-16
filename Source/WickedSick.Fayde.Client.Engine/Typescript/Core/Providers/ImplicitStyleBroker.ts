/// CODE
/// <reference path="../FrameworkElement.ts" />

module Fayde.Providers {
    export enum StyleIndex {
        VisualTree = 0,
        ApplicationResources = 1,
        GenericXaml = 2,
        Count = 3,
    }
    export enum StyleMask {
        None = 0,
        VisualTree = 1 << StyleIndex.VisualTree,
        ApplicationResources = 1 << StyleIndex.ApplicationResources,
        GenericXaml = 1 << StyleIndex.GenericXaml,
        All = StyleMask.VisualTree | StyleMask.ApplicationResources | StyleMask.GenericXaml,
    }

    export interface IImplicitStyleHolder {
        _ImplicitStyles: Style[];
        _StyleMask: number;
    }

    export class ImplicitStyleBroker {
        static Set(fe: FrameworkElement, mask: StyleMask, styles?: Style[]) {
            if (!styles)
                styles = ImplicitStyleBroker.GetImplicitStyles(mask);
            if (styles) {
                var error = new BError();
                var len = StyleIndex.Count;
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
            ImplicitStyleBroker.SetImpl(fe, mask, styles);
        }
        private static SetImpl(fe: FrameworkElement, mask: StyleMask, styles: Style[]) {
            if (!styles)
                return;

            var oldStyles = (<IImplicitStyleHolder>fe.XamlNode)._ImplicitStyles;
            var newStyles: Style[] = [null, null, null];
            if (oldStyles) {
                newStyles[StyleIndex.GenericXaml] = oldStyles[StyleIndex.GenericXaml];
                newStyles[StyleIndex.ApplicationResources] = oldStyles[StyleIndex.ApplicationResources];
                newStyles[StyleIndex.VisualTree] = oldStyles[StyleIndex.VisualTree];
            }
            if (mask & StyleMask.GenericXaml)
                newStyles[StyleIndex.GenericXaml] = styles[StyleIndex.GenericXaml];
            if (mask & StyleMask.ApplicationResources)
                newStyles[StyleIndex.ApplicationResources] = styles[StyleIndex.ApplicationResources];
            if (mask & StyleMask.VisualTree)
                newStyles[StyleIndex.VisualTree] = styles[StyleIndex.VisualTree];

            ImplicitStyleBroker.ApplyStyles(fe, mask, styles);
        }
        static Clear(fe: FrameworkElement, mask: StyleMask) {
            var oldStyles = (<IImplicitStyleHolder>fe.XamlNode)._ImplicitStyles;
            if (!oldStyles)
                return;

            var newStyles = oldStyles.slice(0);
            //TODO: Do we need a deep copy?
            if (mask & StyleMask.GenericXaml)
                newStyles[StyleIndex.GenericXaml] = null;
            if (mask & StyleMask.ApplicationResources)
                newStyles[StyleIndex.ApplicationResources] = null;
            if (mask & StyleMask.VisualTree)
                newStyles[StyleIndex.VisualTree] = null;

            this.ApplyStyles(this._StyleMask & ~mask, newStyles);
        }
        private static ApplyStyles(fe: FrameworkElement, mask: StyleMask, styles: Style[]) {
            var holder = <IImplicitStyleHolder>fe.XamlNode;

            var oldStyles = holder._ImplicitStyles;
            var isChanged = !oldStyles || mask !== holder._StyleMask;
            if (!isChanged) {
                for (var i = 0; i < StyleIndex.Count; i++) {
                    if (styles[i] !== oldStyles[i]) {
                        isChanged = true;
                        break;
                    }
                }
            }
            if (!isChanged)
                return;

            var arr = (<IPropertyStorageOwner>fe)._PropertyStorage;
            var store = PropertyStore.Instance;

            var oldWalker = MultipleStylesWalker(oldStyles);
            var newWalker = MultipleStylesWalker(styles);
            var oldSetter = oldWalker.Step();
            var newSetter = newWalker.Step();
            var oldProp: DependencyProperty;
            var newProp: DependencyProperty;
            
            var storage: IPropertyStorage;
            var oldValue = undefined;
            var newValue = undefined;
            var propd: DependencyProperty;
            while (oldSetter || newSetter) {
                if (oldSetter) {
                    propd = oldProp = oldSetter.Property;
                    oldValue = oldSetter.ConvertedValue;
                }
                if (newSetter) {
                    propd = newProp = newSetter.Property;
                    newValue = newSetter.ConvertedValue;
                }
                
                storage = arr[propd._ID];
                if (!storage)
                    storage = arr[propd._ID] = store.CreateStorage(fe, propd);
                store.SetImplicitStyle(storage, newValue);
                
                if (oldProp)
                    oldSetter = oldWalker.Step();
                if (newProp)
                    newSetter = newWalker.Step();
            }

            holder._ImplicitStyles = styles;
            holder._StyleMask = mask;
        }

        private static GetImplicitStyles(mask: StyleMask) {
            var fe = <FrameworkElement>this._Object;
            var feType = (<any>fe).constructor;
            var feTypeName = (<any>feType)._TypeName;

            var genericXamlStyle: Style = undefined;
            if ((mask & StyleMask.GenericXaml) != 0) {
                if (fe instanceof Controls.Control) {
                    genericXamlStyle = (<Controls.Control>fe).GetDefaultStyle();
                    if (!genericXamlStyle) {
                        var styleKey = fe.DefaultStyleKey;
                        if (styleKey)
                            genericXamlStyle = ImplicitStyleBroker.GetGenericXamlStyleFor(styleKey);
                    }
                }
            }

            var appResourcesStyle: Style = undefined;
            var rd = App.Current.Resources;
            if ((mask & StyleMask.ApplicationResources) != 0) {
                appResourcesStyle = <Style>rd.Get(feType);
                if (!appResourcesStyle)
                    appResourcesStyle = <Style>rd.Get(feTypeName);
                //if (appResourcesStyle)
                //appResourcesStyle._ResChain = [rd];
            }


            var visualTreeStyle: Style = undefined;
            if ((mask & StyleMask.VisualTree) != 0) {
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
            styles[StyleIndex.GenericXaml] = genericXamlStyle;
            styles[StyleIndex.ApplicationResources] = appResourcesStyle;
            styles[StyleIndex.VisualTree] = visualTreeStyle;
            return styles;
        }
        private static GetGenericXamlStyleFor(type: any): Style {
            var rd = App.GetGenericResourceDictionary();
            if (rd)
                return <Style>rd.Get(type);
        }
    }
}