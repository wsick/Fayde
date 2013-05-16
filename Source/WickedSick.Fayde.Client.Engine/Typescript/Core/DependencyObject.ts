/// <reference path="XamlObject.ts" />
/// <reference path="DependencyProperty.ts" />
/// CODE
/// <reference path="Providers/PropertyStore.ts" />
/// <reference path="Providers/DataContextStore.ts" />
/// <reference path="Expression.ts" />
/// <reference path="../Data/BindingExpression.ts" />
/// <reference path="FrameworkElement.ts" />
/// <reference path="../Media/Animation/AnimationStore.ts" />

module Fayde {
    export class DONode extends XamlNode {
        XObject: DependencyObject;
        constructor(xobj: DependencyObject) {
            super(xobj);
        }
        
        OnParentChanged(oldParentNode: XamlNode, newParentNode: XamlNode) {
            var propd = DependencyObject.DataContextProperty;
            var storage = <Providers.IDataContextStorage>Providers.GetStorage(this.XObject, propd);
            var newInherited = newParentNode ? newParentNode.DataContext : undefined;
            (<Providers.DataContextStore>propd.Store).EmitInheritedChanged(storage, newInherited);
        }

        get DataContext(): any { return this.XObject.DataContext; }
        set DataContext(value: any) {
            var propd = DependencyObject.DataContextProperty;
            var storage = <Providers.IDataContextStorage>Providers.GetStorage(this.XObject, propd);
            (<Providers.DataContextStore>propd.Store).EmitInheritedChanged(storage, value);
            this.OnDataContextChanged(undefined, value);
        }
        
        _DataContextPropertyChanged(args: IDependencyPropertyChangedEventArgs) {
            this.OnDataContextChanged(args.OldValue, args.NewValue);
        }
    }
    Nullstone.RegisterType(DONode, "DONode");

    export class DependencyObject extends XamlObject implements ICloneable, Providers.IPropertyStorageOwner {
        private _Expressions: Expression[] = [];
        private _PropertyStorage: Providers.IPropertyStorage[] = [];

        static DataContextProperty: DependencyProperty = DependencyProperty.Register("DataContext", () => Object, DependencyObject, undefined, (d, args) => (<DependencyObject>d).XamlNode._DataContextPropertyChanged(args));
        DataContext: any;

        constructor() {
            super();
        }
        XamlNode: DONode;
        CreateNode(): DONode { return new DONode(this); }

        GetValue(propd: DependencyProperty): any {
            if (!propd)
                throw new ArgumentException("No property specified.");
            var storage = Providers.GetStorage(this, propd);
            return propd.Store.GetValue(storage);
        }
        SetValue(propd: DependencyProperty, value: any) {
            if (!propd)
                throw new ArgumentException("No property specified.");
            if (propd.IsReadOnly)
                throw new InvalidOperationException("DependencyProperty '" + (<any>propd.OwnerType)._TypeName + "." + propd.Name + "' is read only.");
            this.SetValueInternal(propd, value);
        }
        SetValueInternal(propd: DependencyProperty, value: any) {
            var expression: Expression;
            if (value instanceof Expression)
                expression = value;
            if (expression instanceof Data.BindingExpressionBase) {
                var binding = (<Data.BindingExpressionBase>expression).Binding;
                var path = binding.Path.Path;
                if ((!path || path === ".") && binding.Mode === Data.BindingMode.TwoWay)
                    throw new ArgumentException("TwoWay bindings require a non-empty Path.");
                binding.Seal();
            }

            var existing = this._Expressions[propd._ID];

            var updateTwoWay = false;
            var addingExpression = false;
            if (expression) {
                if (expression !== existing) {
                    if (expression.IsAttached)
                        throw new ArgumentException("Cannot attach the same Expression to multiple FrameworkElements");

                    if (existing)
                        this._RemoveExpression(propd);
                    this._AddExpression(propd, expression);
                }
                addingExpression = true;
                value = expression.GetValue(propd);
            } else if (existing) {
                if (existing instanceof Data.BindingExpressionBase) {
                    var binding = (<Data.BindingExpressionBase>existing).Binding;
                    if (binding.Mode === Data.BindingMode.TwoWay) {
                        updateTwoWay = !existing.IsUpdating && !propd.IsCustom;
                    } else if (!existing.IsUpdating || binding.Mode === Data.BindingMode.OneTime) {
                        this._RemoveExpression(propd);
                    }
                } else if (!existing.IsUpdating) {
                    this._RemoveExpression(propd);
                }
            }
            
            var storage = Providers.GetStorage(this, propd);
            try {
                propd.Store.SetLocalValue(storage, value);
                if (updateTwoWay)
                    (<Data.BindingExpressionBase>existing)._TryUpdateSourceObject(value);
            } catch (err) {
                if (!addingExpression)
                    throw err;
                propd.Store.SetLocalValue(storage, propd.DefaultValue);
                if (updateTwoWay)
                    (<Data.BindingExpressionBase>existing)._TryUpdateSourceObject(value);
            }
        }
        SetStoreValue(propd: DependencyProperty, value: any) {
            var storage = Providers.GetStorage(this, propd);
            propd.Store.SetLocalValue(storage, value);
        }
        ClearValue(propd: DependencyProperty) {
            if (!propd)
                throw new ArgumentException("No dependency property.");
            if (propd.IsReadOnly && !propd.IsCustom)
                throw new ArgumentException("This property is readonly.");
            this._RemoveExpression(propd);
            
            if (Media.Animation.AnimationStore.Get(this, propd))
                return;
                
            var storage = Providers.GetStorage(this, propd);
            propd.Store.ClearValue(storage);
        }
        ReadLocalValue(propd: DependencyProperty): any {
            if (!propd)
                throw new ArgumentException("No property specified.");
            var expr = this._Expressions[propd._ID]
            if (expr)
                return expr;
                
            var storage = Providers.GetStorage(this, propd);
            var val = storage.Local;
            if (val === undefined)
                return UnsetValue;
            return val;
        }

        private _AddExpression(propd: DependencyProperty, expr: Expression) {
            this._Expressions[propd._ID] = expr;
            expr.OnAttached(this);
        }
        private _RemoveExpression(propd: DependencyProperty) {
            var expr = this._Expressions[propd._ID];
            if (expr) {
                this._Expressions[propd._ID] = undefined;
                expr.OnDetached(this);
            }
        }
        _HasDeferredValueExpression(propd: DependencyProperty) {
            var expr = this._Expressions[propd._ID];
            return expr instanceof DeferredValueExpression;
        }
        GetBindingExpression(propd: DependencyProperty): Data.BindingExpressionBase {
            var expr = this._Expressions[propd._ID];
            if (expr instanceof Data.BindingExpressionBase)
                return <Data.BindingExpressionBase>expr;
        }
        SetBinding(propd: DependencyProperty, binding: Data.Binding): Data.BindingExpressionBase {
            if (!propd)
                throw new ArgumentException("propd");
            if (!binding)
                throw new ArgumentException("binding");

            var e = new Data.BindingExpression(binding, this, propd);
            this.SetValueInternal(propd, e);
            return e;
        }

        private CloneCore(source: DependencyObject) {
            var sarr = source._PropertyStorage;
            var darr = this._PropertyStorage = [];
            for (var id in sarr) {
                var storage: Providers.IPropertyStorage = sarr[id];
                darr[id] = storage.Property.Store.Clone(this, storage);
            }
        }
    }
    Nullstone.RegisterType(DependencyObject, "DependencyObject");

    DependencyObject.DataContextProperty.Store = Fayde.Providers.DataContextStore.Instance;
}