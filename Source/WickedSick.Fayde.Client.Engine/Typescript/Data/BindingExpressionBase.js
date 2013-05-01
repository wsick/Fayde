var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Fayde;
(function (Fayde) {
    /// <reference path="../Core/Expression.ts" />
    /// CODE
    /// <reference path="Enums.ts" />
    /// <reference path="Binding.ts" />
    /// <reference path="PropertyPathWalker.ts" />
    /// <reference path="../Controls/TextBox.ts" />
    /// <reference path="../Controls/ContentPresenter.ts" />
    /// <reference path="../Controls/ItemsControl.ts" />
    /// <reference path="../Runtime/Enumerable.ts" />
    /// <reference path="ICollectionView.ts" />
    /// <reference path="../Runtime/StringEx.ts" />
    (function (Data) {
        var BindingExpressionBase = (function (_super) {
            __extends(BindingExpressionBase, _super);
            function BindingExpressionBase(binding, target, propd) {
                        _super.call(this);
                this._TwoWayTextBox = null;
                //get DataContextSource(): FrameworkElement { return this._DataContextSource; }
                this._Cached = false;
                this._CachedValue = undefined;
                this._Binding = binding;
                this.Target = target;
                this.Property = propd;
                if(this.Target instanceof Fayde.Controls.TextBox && binding.Mode === Data.BindingMode.TwoWay) {
                    this._TwoWayTextBox = this.Target;
                }
                this._IsBoundToAnyDataContext = !this.Binding.ElementName && !this.Binding.Source;
                var isDcProp = propd === Fayde.DependencyObject.DataContextProperty;
                var isContentProp = propd === Fayde.Controls.ContentPresenter.ContentProperty;
                var bindsToView = isDcProp || propd.GetTargetType() === Fayde.IEnumerable_ || propd.GetTargetType() === Fayde.Data.ICollectionView_;
                var walker = this.PropertyPathWalker = new Data.PropertyPathWalker(binding.Path.ParsePath, binding.BindsDirectlyToSource, bindsToView, this._IsBoundToAnyDataContext);
                if(binding.Mode !== Data.BindingMode.OneTime) {
                    walker.Listen(this);
                }
            }
            Object.defineProperty(BindingExpressionBase.prototype, "Binding", {
                get: function () {
                    return this._Binding;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(BindingExpressionBase.prototype, "DataSource", {
                get: function () {
                    return this.PropertyPathWalker.Source;
                },
                enumerable: true,
                configurable: true
            });
            BindingExpressionBase.prototype.IsBrokenChanged = function () {
                this.Refresh();
            };
            BindingExpressionBase.prototype.ValueChanged = function () {
                this.Refresh();
            };
            BindingExpressionBase.prototype.GetValue = function (propd) {
                if(this._Cached) {
                    return this._CachedValue;
                }
                this._Cached = true;
                if(this.PropertyPathWalker.IsPathBroken) {
                    this._CachedValue = null;
                } else {
                    this._CachedValue = this.PropertyPathWalker.ValueInternal;
                }
                try  {
                    this._CachedValue = this._ConvertToType(propd, this._CachedValue);
                } catch (err) {
                    this._CachedValue = propd.DefaultValue;
                }
                return this._CachedValue;
            };
            BindingExpressionBase.prototype.OnAttached = function (element) {
                if(this.IsAttached) {
                    return;
                }
                _super.prototype.OnAttached.call(this, element);
                this._CalculateDataSource();
                if(this._TwoWayTextBox) {
                    this._TwoWayTextBox.LostFocus.Subscribe(this._TextBoxLostFocus, this);
                }
                if(this.Binding.Mode === Data.BindingMode.TwoWay && this.Property.IsCustom) {
                    this._PropertyListener = Fayde.ListenToPropertyChanged(this.Target, this.Property, this._UpdateSourceCallback, this);
                }
            };
            BindingExpressionBase.prototype._UpdateSourceCallback = function (sender, args) {
                try  {
                    if(!this.IsUpdating) {
                        this._TryUpdateSourceObject(this.Target.GetValue(this.Property));
                    }
                } catch (err) {
                }
            };
            BindingExpressionBase.prototype.OnDetached = function (element) {
                if(!this.IsAttached) {
                    return;
                }
                _super.prototype.OnDetached.call(this, element);
                if(this._TwoWayTextBox) {
                    this._TwoWayTextBox.LostFocus.Unsubscribe(this._TextBoxLostFocus, this);
                }
                if(this._IsBoundToAnyDataContext) {
                    var listener = this._DataContextPropertyMonitor;
                    if(listener) {
                        listener.Detach();
                    }
                    this.SetDataContextSource(null);
                }
                /*
                if (this.Target && this.CurrentError != null) {
                //TODO: Validation.RemoveError(this.Target, this.CurrentError);
                this.CurrentError = null;
                }
                */
                if(this._PropertyListener) {
                    this._PropertyListener.Detach();
                    this._PropertyListener = null;
                }
                this.PropertyPathWalker.Update(null);
            };
            BindingExpressionBase.prototype._TextBoxLostFocus = function () {
                this._UpdateSourceObject();
            };
            BindingExpressionBase.prototype._TryUpdateSourceObject = function (value) {
                if(!this.IsUpdating && this.Binding.UpdateSourceTrigger === Data.UpdateSourceTrigger.Default) {
                    this._UpdateSourceObject(value, false);
                }
            };
            BindingExpressionBase.prototype._UpdateSourceObject = function (value, force) {
                if(value === undefined) {
                    value = this.Target.GetValue(this.Property);
                }
                force = force === true;
                var binding = this.Binding;
                if(binding.Mode !== Data.BindingMode.TwoWay) {
                    return;
                }
                var dataError;
                var exception;
                var oldUpdating = this.IsUpdating;
                var node = this.PropertyPathWalker.FinalNode;
                try  {
                    // If the user calls BindingExpresion.UpdateSource (), we must update regardless of focus state.
                    // Otherwise we only update if the textbox is unfocused.
                    if(!force && this._TwoWayTextBox && App.Instance.MainSurface.FocusedNode === this.Target.XamlNode) {
                        return;
                    }
                    if(this.PropertyPathWalker.IsPathBroken) {
                        return;
                    }
                    if(binding.TargetNullValue) {
                        try  {
                            if(binding.TargetNullValue === value) {
                                value = null;
                            }
                        } catch (err) {
                        }
                    }
                    var converter = binding.Converter;
                    if(converter) {
                        value = converter.ConvertBack(value, node.ValueType, binding.ConverterParameter, binding.ConverterCulture);
                    }
                    if(value instanceof String) {
                    }
                    try  {
                        if(value) {
                            value = this._ConvertFromTargetToSource(value);
                        }
                    } catch (err) {
                        return;
                    }
                    if(!this._CachedValue && !value) {
                        return;
                    }
                    this.IsUpdating = true;
                    node.SetValue(value);
                    this._CachedValue = value;
                } catch (err) {
                    if(binding.ValidatesOnExceptions) {
                        if(err instanceof TargetInvocationException) {
                            exception = err.InnerException;
                        }
                        exception = err;
                    }
                }finally {
                    this.IsUpdating = oldUpdating;
                    //TODO: IDataErrorInfo
                    //if (binding.ValidatesOnDataErrors && !exception && node.Source.DoesImplement(IDataErrorInfo) && node.GetPropertyInfo() != null) {
                    //dataError = node.Source[node.GetPropertyInfo().Name];
                    //}
                                    }
                this._MaybeEmitError(dataError, exception);
            };
            BindingExpressionBase.prototype._MaybeEmitError = function (message, exception) {
                /*
                var fe: FrameworkElement = this.TargetFE;
                if (!fe && !(fe = this.Target.GetMentor()))
                return;
                
                if (message === "")
                message = null;
                
                var oldError = this.CurrentError;
                if (message != null)
                this.CurrentError = new ValidationError(message, null);
                else if (exception)
                this.CurrentError = new ValidationError(null, exception);
                else
                this.CurrentError = null;
                
                if (oldError && this.CurrentError) {
                Validation.AddError(fe, this.CurrentError);
                Validation.RemoveError(fe, oldError);
                if (this.Binding.NotifyOnValidationError) {
                fe.RaiseBindingValidationError(new ValidationErrorEventArgs(ValidationErrorEventAction.Removed, oldError));
                fe.RaiseBindingValidationError(new ValidationErrorEventArgs(ValidationErrorEventAction.Added, this.CurrentError));
                }
                } else if (oldError) {
                Validation.RemoveError(fe, oldError);
                if (this.Binding.NotifyOnValidationError)
                fe.RaiseBindingValidationError(new ValidationErrorEventArgs(ValidationErrorEventAction.Removed, oldError));
                } else if (this.CurrentError) {
                Validation.AddError(fe, this.CurrentError);
                if (this.Binding.NotifyOnValidationError)
                fe.RaiseBindingValidationError(new ValidationErrorEventArgs(ValidationErrorEventAction.Added, this.CurrentError));
                }
                */
                            };
            BindingExpressionBase.prototype._ConvertFromTargetToSource = function (value) {
                NotImplemented("BindingExpressionBase._ConvertFromTargetToSource");
                return value;
            };
            BindingExpressionBase.prototype._ConvertFromSourceToTarget = function (value) {
                NotImplemented("BindingExpressionBase._ConvertFromSourceToTarget");
                return value;
            };
            BindingExpressionBase.prototype._ConvertToType = function (propd, value) {
                try  {
                    var binding = this.Binding;
                    if(!this.PropertyPathWalker.IsPathBroken && binding.Converter) {
                        value = binding.Converter.Convert(value, this.Property.GetTargetType(), binding.ConverterParameter, binding.ConverterCulture);
                    }
                    if(value instanceof Fayde.UnsetValue || this.PropertyPathWalker.IsPathBroken) {
                        value = binding.FallbackValue;
                        if(value === undefined) {
                            value = propd.DefaultValue;
                        }
                    } else if(value == null) {
                        value = binding.TargetNullValue;
                        if(value == null && this._IsBoundToAnyDataContext && !binding.Path.Path) {
                            value = propd.DefaultValue;
                        }
                    } else {
                        var format = binding.StringFormat;
                        if(format) {
                            if(format.indexOf("{0") < 0) {
                                format = "{0:" + format + "}";
                            }
                            value = StringEx.Format(format, value);
                        }
                    }
                } catch (err) {
                    return Fayde.TypeConverter.ConvertObject(propd, binding.FallbackValue, (this.Target).constructor, true);
                }
                return value;
            };
            BindingExpressionBase.prototype._AttachToNotifyError = function (element) {
                ///<param name="element" type="INotifyDataErrorInfo"></param>
                NotImplemented("BindingExpressionBase._AttachToNotifyError");
            };
            BindingExpressionBase.prototype._NotifyErrorsChanged = function (o, e) {
                ///<param name="e" type="DataErrorsChangedEventArgs"></param>
                NotImplemented("BindingExpressionBase._NotifyErrorsChanged");
            };
            BindingExpressionBase.prototype._CalculateDataSource = function () {
                var _this = this;
                var source;
                if(this.Binding.Source) {
                    this.PropertyPathWalker.Update(this.Binding.Source);
                } else if(this.Binding.ElementName != null) {
                    source = this._FindSourceByElementName();
                    this._SourceAvailableMonitor = this.Target.XamlNode.MonitorIsAttached(function (newIsAttached) {
                        return _this._OnSourceAvailable();
                    });
                    this.PropertyPathWalker.Update(source);
                } else if(this.Binding.RelativeSource && this.Binding.RelativeSource.Mode === Data.RelativeSourceMode.Self) {
                    this.PropertyPathWalker.Update(this.Target);
                } else {
                    if(this.Binding.RelativeSource && this.Binding.RelativeSource.Mode === Data.RelativeSourceMode.TemplatedParent) {
                        this.PropertyPathWalker.Update(this.Target.TemplateOwner);
                    } else {
                        this.SetDataContextSource(this.Target);
                    }
                }
            };
            BindingExpressionBase.prototype._OnSourceAvailable = function () {
                this._SourceAvailableMonitor.Detach();
                var source = this._FindSourceByElementName();
                if(source) {
                    this.PropertyPathWalker.Update(source);
                }
                this._Invalidate();
                this.Target.SetValue(this.Property, this);
            };
            BindingExpressionBase.prototype._FindSourceByElementName = function () {
                var xobj = this.Target;
                var sourceNode;
                var name = this.Binding.ElementName;
                var xnode = (xobj) ? xobj.XamlNode : null;
                var parentNode;
                while(xnode) {
                    sourceNode = xnode.FindName(name);
                    if(sourceNode) {
                        return sourceNode.XObject;
                    }
                    if(xnode.XObject.TemplateOwner) {
                        xobj = xnode.XObject.TemplateOwner;
                    } else if((parentNode = xnode.ParentNode) && Fayde.Controls.ItemsControl.GetItemsOwner(parentNode.XObject)) {
                        xnode = parentNode;
                    }
                    break;
                }
                return undefined;
            };
            BindingExpressionBase.prototype.SetDataContextSource = function (value) {
                var _this = this;
                if(this._DataContextPropertyMonitor) {
                    this._DataContextPropertyMonitor.Detach();
                    this._DataContextPropertyMonitor = null;
                }
                var dcs = this._DataContextSourceNode = value.XamlNode;
                if(dcs) {
                    this._DataContextPropertyMonitor = value.XamlNode.MonitorDataContext(function (newDataContext) {
                        return _this._DataContextChanged(newDataContext);
                    });
                    this.PropertyPathWalker.Update(dcs ? dcs.DataContext : undefined);
                }
            };
            BindingExpressionBase.prototype._DataContextChanged = function (newDataContext) {
                try  {
                    this.PropertyPathWalker.Update(newDataContext);
                    if(this.Binding.Mode === Data.BindingMode.OneTime) {
                        this.Refresh();
                    }
                } catch (err) {
                    Warn(err.message);
                }
            };
            BindingExpressionBase.prototype._Invalidate = function () {
                this._Cached = false;
                this._CachedValue = undefined;
            };
            BindingExpressionBase.prototype.Refresh = function () {
                var dataError;
                var exception;
                if(!this.IsAttached) {
                    return;
                }
                //TODO: ERROR/VALIDATION
                //var node = this.PropertyPathWalker.FinalNode;
                //var source = node.Source;
                //source = Nullstone.As(source, INotifyDataErrorInfo));
                //this._AttachToNotifyError(source);
                //source = Nullstone.As(node.Source, IDataErrorInfo);
                //if (!this.Updating && this.Binding.ValidatesOnDataErrors && source && node.GetPropertyInfo())
                //dataError = source[node.GetPropertyInfo().Name];
                var oldUpdating = this.IsUpdating;
                try  {
                    this.IsUpdating = true;
                    this._Invalidate();
                    this.Target.SetValue(this.Property, this);
                } catch (err) {
                    if(this.Binding.ValidatesOnExceptions) {
                        exception = err;
                        if(exception instanceof TargetInvocationException) {
                            exception = (exception).InnerException;
                        }
                    }
                }finally {
                    this.IsUpdating = oldUpdating;
                }
                this._MaybeEmitError(dataError, exception);
            };
            return BindingExpressionBase;
        })(Fayde.Expression);
        Data.BindingExpressionBase = BindingExpressionBase;        
        Nullstone.RegisterType(BindingExpressionBase, "BindingExpressionBase");
    })(Fayde.Data || (Fayde.Data = {}));
    var Data = Fayde.Data;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=BindingExpressionBase.js.map
