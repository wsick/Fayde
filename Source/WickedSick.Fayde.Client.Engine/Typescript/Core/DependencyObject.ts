/// <reference path="XamlObject.ts" />
/// <reference path="DependencyProperty.ts" />
/// CODE
/// <reference path="Providers/BasicProviderStore.ts" />
/// <reference path="Expression.ts" />
/// <reference path="../Data/BindingExpression.ts" />
/// <reference path="FrameworkElement.ts" />
/// <reference path="Providers/InheritedDataContextProvider.ts" />

module Fayde {
    export class UnsetValue { }

    export class DONode extends XamlNode {
        XObject: DependencyObject;
        Store: Providers.BasicProviderStore;
        constructor(xobj: DependencyObject) {
            super(xobj);
        }
        
        OnParentChanged(oldParentNode: XamlNode, newParentNode: XamlNode) {
            this.Store.SetDataContextSourceNode(newParentNode);
        }

        get DataContext(): any { return this.XObject.DataContext; }
        set DataContext(value: any) {
            this.Store.EmitDataContextChanged();
            this.OnDataContextChanged(undefined, value);
        }
        
        _DataContextPropertyChanged(args: IDependencyPropertyChangedEventArgs) {
            this.OnDataContextChanged(args.OldValue, args.NewValue);
        }
    }
    Nullstone.RegisterType(DONode, "DONode");

    export class DependencyObject extends XamlObject implements ICloneable {
        private _Expressions: Expression[] = [];
        _Store: Providers.BasicProviderStore;

        static DataContextProperty: DependencyProperty = DependencyProperty.RegisterCore("DataContext", () => Object, DependencyObject, undefined, (d, args) => (<DependencyObject>d).XamlNode._DataContextPropertyChanged(args));
        DataContext: any;

        constructor() {
            super();
            this.XamlNode.Store = this._Store = this.CreateStore();
        }
        XamlNode: DONode;
        CreateNode(): DONode { return new DONode(this); }
        CreateStore(): Providers.BasicProviderStore {
            var s = new Providers.BasicProviderStore(this);
            s.SetProviders([null, 
                new Providers.LocalValueProvider(), 
                null,
                null,
                null,
                new Providers.InheritedDataContextProvider(s),
                new Providers.DefaultValueProvider()]
            );
            return s;
        }

        GetValue(propd: DependencyProperty): any {
            if (!propd)
                throw new ArgumentException("No property specified.");
            return this._Store.GetValue(propd);
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

            try {
                this._Store.SetValue(propd, value);
                if (updateTwoWay)
                    (<Data.BindingExpressionBase>existing)._TryUpdateSourceObject(value);
            } catch (err) {
                if (!addingExpression)
                    throw err;
                this._Store.SetValue(propd, propd.DefaultValue);
                if (updateTwoWay)
                    (<Data.BindingExpressionBase>existing)._TryUpdateSourceObject(value);
            }
        }
        ClearValue(propd: DependencyProperty) {
            if (!propd)
                throw new ArgumentException("No dependency property.");
            if (propd.IsReadOnly && !propd.IsCustom)
                throw new ArgumentException("This property is readonly.");
            this._RemoveExpression(propd);
            this._Store.ClearValue(propd, true);
        }
        ReadLocalValue(propd: DependencyProperty): any {
            if (!propd)
                throw new ArgumentException("No property specified.");
            var expr = this._Expressions[propd._ID]
            if (expr)
                return expr;
            return this._Store.ReadLocalValue(propd);
        }

        _OnPropertyChanged(args: IDependencyPropertyChangedEventArgs) { }

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

        CloneCore(source: DependencyObject) {
            this._Store.CloneCore(source._Store);
        }
    }
    Nullstone.RegisterType(DependencyObject, "DependencyObject");
}