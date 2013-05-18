var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="XamlObject.ts" />
/// <reference path="DependencyProperty.ts" />
/// CODE
/// <reference path="Providers/PropertyStore.ts" />
/// <reference path="Providers/DataContextStore.ts" />
/// <reference path="Expression.ts" />
/// <reference path="../Data/BindingExpression.ts" />
/// <reference path="FrameworkElement.ts" />
var Fayde;
(function (Fayde) {
    var DONode = (function (_super) {
        __extends(DONode, _super);
        function DONode(xobj) {
                _super.call(this, xobj);
        }
        DONode.prototype.OnParentChanged = function (oldParentNode, newParentNode) {
            var propd = DependencyObject.DataContextProperty;
            var storage = Fayde.Providers.GetStorage(this.XObject, propd);
            var newInherited = newParentNode ? newParentNode.DataContext : undefined;
            (propd.Store).EmitInheritedChanged(storage, newInherited);
        };
        Object.defineProperty(DONode.prototype, "DataContext", {
            get: function () {
                return this.XObject.DataContext;
            },
            set: function (value) {
                var propd = DependencyObject.DataContextProperty;
                var storage = Fayde.Providers.GetStorage(this.XObject, propd);
                (propd.Store).EmitInheritedChanged(storage, value);
                this.OnDataContextChanged(undefined, value);
            },
            enumerable: true,
            configurable: true
        });
        DONode.prototype._DataContextPropertyChanged = function (args) {
            this.OnDataContextChanged(args.OldValue, args.NewValue);
        };
        return DONode;
    })(Fayde.XamlNode);
    Fayde.DONode = DONode;    
    Nullstone.RegisterType(DONode, "DONode");
    var DependencyObject = (function (_super) {
        __extends(DependencyObject, _super);
        function DependencyObject() {
                _super.call(this);
            this._Expressions = [];
            this._PropertyStorage = [];
        }
        DependencyObject.DataContextProperty = DependencyProperty.Register("DataContext", function () {
            return Object;
        }, DependencyObject, undefined, function (d, args) {
            return (d).XamlNode._DataContextPropertyChanged(args);
        });
        DependencyObject.prototype.CreateNode = function () {
            return new DONode(this);
        };
        DependencyObject.prototype.GetValue = function (propd) {
            if(!propd) {
                throw new ArgumentException("No property specified.");
            }
            var storage = Fayde.Providers.GetStorage(this, propd);
            return propd.Store.GetValue(storage);
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
            var storage = Fayde.Providers.GetStorage(this, propd);
            try  {
                propd.Store.SetLocalValue(storage, value);
                if(updateTwoWay) {
                    (existing)._TryUpdateSourceObject(value);
                }
            } catch (err) {
                if(!addingExpression) {
                    throw err;
                }
                propd.Store.SetLocalValue(storage, propd.DefaultValue);
                if(updateTwoWay) {
                    (existing)._TryUpdateSourceObject(value);
                }
            }
        };
        DependencyObject.prototype.SetStoreValue = function (propd, value) {
            var storage = Fayde.Providers.GetStorage(this, propd);
            propd.Store.SetLocalValue(storage, value);
        };
        DependencyObject.prototype.ClearValue = function (propd) {
            if(!propd) {
                throw new ArgumentException("No dependency property.");
            }
            if(propd.IsReadOnly && !propd.IsCustom) {
                throw new ArgumentException("This property is readonly.");
            }
            this._RemoveExpression(propd);
            var storage = Fayde.Providers.GetStorage(this, propd);
            var anims = storage.Animation;
            if(anims && anims.length > 0) {
                return;
            }
            propd.Store.ClearValue(storage);
        };
        DependencyObject.prototype.ReadLocalValue = function (propd) {
            if(!propd) {
                throw new ArgumentException("No property specified.");
            }
            var expr = this._Expressions[propd._ID];
            if(expr) {
                return expr;
            }
            var storage = Fayde.Providers.GetStorage(this, propd);
            var val = storage.Local;
            if(val === undefined) {
                return Fayde.UnsetValue;
            }
            return val;
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
        DependencyObject.prototype._HasDeferredValueExpression = function (propd) {
            var expr = this._Expressions[propd._ID];
            return expr instanceof Fayde.DeferredValueExpression;
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
            var sarr = source._PropertyStorage;
            var darr = this._PropertyStorage = [];
            for(var id in sarr) {
                var storage = sarr[id];
                darr[id] = storage.Property.Store.Clone(this, storage);
            }
        };
        return DependencyObject;
    })(Fayde.XamlObject);
    Fayde.DependencyObject = DependencyObject;    
    Nullstone.RegisterType(DependencyObject, "DependencyObject");
    DependencyObject.DataContextProperty.Store = Fayde.Providers.DataContextStore.Instance;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=DependencyObject.js.map
