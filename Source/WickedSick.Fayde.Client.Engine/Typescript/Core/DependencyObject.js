var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="XamlObject.ts" />
/// CODE
/// <reference path="DependencyProperty.ts" />
/// <reference path="Providers/BasicProviderStore.ts" />
/// <reference path="Expression.ts" />
/// <reference path="../Data/BindingExpressionBase.ts" />
var Fayde;
(function (Fayde) {
    var UnsetValue = (function () {
        function UnsetValue() { }
        return UnsetValue;
    })();
    Fayde.UnsetValue = UnsetValue;    
    var DependencyObject = (function (_super) {
        __extends(DependencyObject, _super);
        function DependencyObject() {
                _super.call(this);
            this._Expressions = [];
            this._CachedValues = [];
            this._Store = this.CreateStore();
        }
        DependencyObject.prototype.CreateStore = function () {
            return new Fayde.Providers.BasicProviderStore(this);
        };
        DependencyObject.prototype.GetValue = function (propd) {
            if(!propd) {
                throw new ArgumentException("No property specified.");
            }
            return this._Store.GetValue(propd);
        };
        DependencyObject.prototype.SetValue = function (propd, value) {
            if(!propd) {
                throw new ArgumentException("No property specified.");
            }
            if(propd.IsReadOnly) {
                throw new InvalidOperationException("DependencyProperty '" + (propd.OwnerType)._TypeName + "." + propd.Name + "' is read only.");
            }
            this.SetValueInternal(propd, value);
        };
        DependencyObject.prototype.SetValueInternal = function (propd, value) {
            var expression;
            if(value instanceof Fayde.Expression) {
                expression = value;
            }
            if(expression instanceof Fayde.Data.BindingExpressionBase) {
                var binding = (expression).Binding;
                var path = binding.Path.Path;
                if((!path || path === ".") && binding.Mode === Fayde.Data.BindingMode.TwoWay) {
                    throw new ArgumentException("TwoWay bindings require a non-empty Path.");
                }
                binding.Seal();
            }
            var existing = this._Expressions[propd._ID];
            var updateTwoWay = false;
            var addingExpression = false;
            if(expression) {
                if(expression !== existing) {
                    if(expression.IsAttached) {
                        throw new ArgumentException("Cannot attach the same Expression to multiple FrameworkElements");
                    }
                    if(existing) {
                        this._RemoveExpression(propd);
                    }
                    this._AddExpression(propd, expression);
                }
                addingExpression = true;
                value = expression.GetValue(propd);
            } else if(existing) {
                if(existing instanceof Fayde.Data.BindingExpressionBase) {
                    var binding = (existing).Binding;
                    if(binding.Mode === Fayde.Data.BindingMode.TwoWay) {
                        updateTwoWay = !existing.IsUpdating && !propd.IsCustom;
                    } else if(!existing.IsUpdating || binding.Mode === Fayde.Data.BindingMode.OneTime) {
                        this._RemoveExpression(propd);
                    }
                } else if(!existing.IsUpdating) {
                    this._RemoveExpression(propd);
                }
            }
            try  {
                this._Store.SetValue(propd, value);
                if(updateTwoWay) {
                    (existing)._TryUpdateSourceObject(value);
                }
            } catch (err) {
                if(!addingExpression) {
                    throw err;
                }
                this._Store.SetValue(propd, propd.DefaultValue);
                if(updateTwoWay) {
                    (existing)._TryUpdateSourceObject(value);
                }
            }
        };
        DependencyObject.prototype.ClearValue = function (propd) {
            if(!propd) {
                throw new ArgumentException("No dependency property.");
            }
            if(propd.IsReadOnly && !propd.IsCustom) {
                throw new ArgumentException("This property is readonly.");
            }
            this._RemoveExpression(propd);
            this._Store.ClearValue(propd, true);
        };
        DependencyObject.prototype.ReadLocalValue = function (propd) {
            if(!propd) {
                throw new ArgumentException("No property specified.");
            }
            var expr = this._Expressions[propd._ID];
            if(expr) {
                return expr;
            }
            return this._Store.ReadLocalValue(propd);
        };
        DependencyObject.prototype._OnPropertyChanged = function (args) {
        };
        DependencyObject.prototype._AddExpression = function (propd, expr) {
            this._Expressions[propd._ID] = expr;
            expr.OnAttached(this);
        };
        DependencyObject.prototype._RemoveExpression = function (propd) {
            var expr = this._Expressions[propd._ID];
            if(expr) {
                this._Expressions[propd._ID] = undefined;
                expr.OnDetached(this);
            }
        };
        return DependencyObject;
    })(Fayde.XamlObject);
    Fayde.DependencyObject = DependencyObject;    
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=DependencyObject.js.map
