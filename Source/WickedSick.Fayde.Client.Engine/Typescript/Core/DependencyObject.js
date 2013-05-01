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
/// <reference path="../Data/BindingExpression.ts" />
/// <reference path="FrameworkElement.ts" />
/// <reference path="Providers/InheritedDataContextProvider.ts" />
var Fayde;
(function (Fayde) {
    var UnsetValue = (function () {
        function UnsetValue() { }
        return UnsetValue;
    })();
    Fayde.UnsetValue = UnsetValue;    
    var DONode = (function (_super) {
        __extends(DONode, _super);
        function DONode(xobj) {
                _super.call(this, xobj);
        }
        DONode.prototype.OnParentChanged = function (oldParentNode, newParentNode) {
            this.Store.SetDataContextSourceNode(newParentNode);
        };
        Object.defineProperty(DONode.prototype, "DataContext", {
            get: function () {
                return this.XObject.DataContext;
            },
            set: function (value) {
                var old = this.XObject.DataContext;
                if(!this.Store.OnDataContextSourceValueChanged(old, value)) {
                    return;
                }
                this.OnDataContextChanged(old, value);
            },
            enumerable: true,
            configurable: true
        });
        return DONode;
    })(Fayde.XamlNode);
    Fayde.DONode = DONode;    
    Nullstone.RegisterType(DONode, "DONode");
    var DependencyObject = (function (_super) {
        __extends(DependencyObject, _super);
        function DependencyObject() {
                _super.call(this);
            this._Expressions = [];
            this.XamlNode.Store = this._Store = this.CreateStore();
        }
        DependencyObject.DataContextProperty = DependencyProperty.RegisterCore("DataContext", function () {
            return Object;
        }, DependencyObject, undefined);
        DependencyObject.prototype.CreateNode = function () {
            return new DONode(this);
        };
        DependencyObject.prototype.CreateStore = function () {
            var s = new Fayde.Providers.BasicProviderStore(this);
            s.SetProviders([
                null, 
                new Fayde.Providers.LocalValueProvider(), 
                null, 
                null, 
                null, 
                null, 
                new Fayde.Providers.InheritedDataContextProvider(s), 
                new Fayde.Providers.DefaultValueProvider(), 
                new Fayde.Providers.AutoCreateProvider()
            ]);
            return s;
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
        DependencyObject.prototype.GetBindingExpression = function (propd) {
            var expr = this._Expressions[propd._ID];
            if(expr instanceof Fayde.Data.BindingExpressionBase) {
                return expr;
            }
        };
        DependencyObject.prototype.SetBinding = function (propd, binding) {
            if(!propd) {
                throw new ArgumentException("propd");
            }
            if(!binding) {
                throw new ArgumentException("binding");
            }
            var e = new Fayde.Data.BindingExpression(binding, this, propd);
            this.SetValueInternal(propd, e);
            return e;
        };
        DependencyObject.prototype.CloneCore = function (source) {
            this._Store.CloneCore(source._Store);
        };
        return DependencyObject;
    })(Fayde.XamlObject);
    Fayde.DependencyObject = DependencyObject;    
    Nullstone.RegisterType(DependencyObject, "DependencyObject");
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=DependencyObject.js.map
