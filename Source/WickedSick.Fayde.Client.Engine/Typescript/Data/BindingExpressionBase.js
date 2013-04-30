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
                this._Cached = false;
                this._CachedValue = undefined;
                this._Binding = binding;
                this.Target = target;
                if(target instanceof Fayde.FrameworkElement) {
                    this.TargetFE = target;
                }
                this.Property = propd;
                var bindsToView = propd._ID === Fayde.FrameworkElement.DataContextProperty._ID || propd.GetTargetType() === Fayde.IEnumerable_ || propd.GetTargetType() === Fayde.Data.ICollectionView_;
                var walker = this.PropertyPathWalker = new Data.PropertyPathWalker(binding.Path.ParsePath, binding.BindsDirectlyToSource, bindsToView, this.IsBoundToAnyDataContext);
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
            Object.defineProperty(BindingExpressionBase.prototype, "DataContextSource", {
                get: function () {
                    return this._DataContextSource;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(BindingExpressionBase.prototype, "IsBoundToAnyDataContext", {
                get: function () {
                    return !this.Binding.ElementName && !this.Binding.Source;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(BindingExpressionBase.prototype, "IsSelfDataContextBound", {
                get: function () {
                    return this.IsBoundToAnyDataContext && this.TargetFE && (this.Property._ID !== Fayde.FrameworkElement.DataContextProperty._ID);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(BindingExpressionBase.prototype, "IsParentDataContextBound", {
                get: function () {
                    return this.IsBoundToAnyDataContext && this.TargetFE && (this.Property._ID === Fayde.FrameworkElement.DataContextProperty._ID || this.Property._ID === Fayde.Controls.ContentPresenter.ContentProperty._ID);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(BindingExpressionBase.prototype, "IsMentorDataContextBound", {
                get: function () {
                    return this.IsBoundToAnyDataContext && !this.TargetFE;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(BindingExpressionBase.prototype, "IsTwoWayTextBoxText", {
                get: function () {
                    return this.Target instanceof Fayde.Controls.TextBox;
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
                if(this.IsTwoWayTextBoxText) {
                    this.TargetFE.LostFocus.Subscribe(this._TextBoxLostFocus, this);
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
                if(this.IsTwoWayTextBoxText) {
                    this.TargetFE.LostFocus.Unsubscribe(this._TextBoxLostFocus, this);
                }
                var tfe = this.TargetFE;
                if(this.IsMentorDataContextBound) {
                    tfe.MentorChanged.Unsubscribe(this._MentorChanged, this);
                    this.SetDataContextSource(null);
                } else if(this.IsParentDataContextBound) {
                    tfe.VisualParentChanged.Subscribe(this._VisualParentChanged, this);
                    this.SetDataContextSource(null);
                } else if(this.IsSelfDataContextBound) {
                    this.SetDataContextSource(null);
                }
                if(!tfe) {
                    tfe = this.Target.Mentor;
                }
                /*
                if (tfe && this.CurrentError != null) {
                //TODO: Validation.RemoveError(tfe, this.CurrentError);
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
                    if(!force && this.IsTwoWayTextBoxText && App.Instance.MainSurface.FocusedNode === this.Target.XamlNode) {
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
                        if(value == null && this.IsBoundToAnyDataContext && !binding.Path.Path) {
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
                var source;
                if(this.Binding.Source) {
                    this.PropertyPathWalker.Update(this.Binding.Source);
                } else if(this.Binding.ElementName != null) {
                    source = this._FindSourceByElementName();
                    var feTarget = this.TargetFE;
                    if(!feTarget && !(feTarget = this.Target.Mentor)) {
                        this.Target.MentorChanged.Subscribe(this._InvalidateAfterMentorChanged, this);
                    } else {
                        feTarget.Loaded.Subscribe(this._HandleFeTargetLoaded, this);
                    }
                    this.PropertyPathWalker.Update(source);
                } else if(this.Binding.RelativeSource && this.Binding.RelativeSource.Mode === Data.RelativeSourceMode.Self) {
                    this.PropertyPathWalker.Update(this.Target);
                } else {
                    var fe = this.TargetFE;
                    var propd = this.Property;
                    if(fe && (propd._ID === Fayde.FrameworkElement.DataContextProperty._ID || propd._ID === Fayde.Controls.ContentPresenter.ContentProperty._ID)) {
                        fe.VisualParentChanged.Subscribe(this._VisualParentChanged, this);
                        var vpNode = fe.XamlNode.VisualParentNode;
                        fe = (vpNode) ? vpNode.XObject : null;
                        this.SetDataContextSource(fe);
                    } else {
                        if(!fe) {
                            this.Target.MentorChanged.Subscribe(this._MentorChanged, this);
                            fe = this.Target.Mentor;
                        }
                        if(fe && this.Binding.RelativeSource && this.Binding.RelativeSource.Mode === Data.RelativeSourceMode.TemplatedParent) {
                            this.PropertyPathWalker.Update(fe.TemplateOwner);
                        } else {
                            this.SetDataContextSource(fe);
                        }
                    }
                }
            };
            BindingExpressionBase.prototype.SetDataContextSource = function (value) {
                if(this._DataContextSource && this._DataContextPropertyListener) {
                    this._DataContextPropertyListener.Detach();
                    this._DataContextPropertyListener = null;
                }
                this._DataContextSource = value;
                if(this._DataContextSource) {
                    this._DataContextPropertyListener = Fayde.ListenToPropertyChanged(this._DataContextSource, Fayde.FrameworkElement.DataContextProperty, this._DataContextChanged, this);
                }
                if(this._DataContextSource || this.IsMentorDataContextBound) {
                    this.PropertyPathWalker.Update(!this._DataContextSource ? null : this._DataContextSource.DataContext);
                }
            };
            BindingExpressionBase.prototype._InvalidateAfterMentorChanged = function (sender, e) {
                this.Target.MentorChanged.Unsubscribe(this._InvalidateAfterMentorChanged, this);
                var source = this._FindSourceByElementName();
                if(!source) {
                    this.Target.Mentor.Loaded.Subscribe(this._HandleFeTargetLoaded, this);
                } else {
                    this.PropertyPathWalker.Update(source);
                }
                this._Invalidate();
                this.Target.SetValue(this.Property, this);
            };
            BindingExpressionBase.prototype._HandleFeTargetLoaded = function (sender, e) {
                var fe = sender;
                fe.Loaded.Unsubscribe(this._HandleFeTargetLoaded, this);
                var source = this._FindSourceByElementName();
                if(source) {
                    this.PropertyPathWalker.Update(source);
                }
                this._Invalidate();
                this.Target.SetValue(this.Property, this);
            };
            BindingExpressionBase.prototype._FindSourceByElementName = function () {
                var source;
                var fe = this.TargetFE;
                if(!fe && !(fe = this.Target.Mentor)) {
                    while(fe && !source) {
                        source = fe.FindName(this.Binding.ElementName);
                        if(!source && fe.TemplateOwner) {
                            fe = fe.TemplateOwner;
                        } else if(fe.Mentor && Fayde.Controls.ItemsControl.GetItemsOwner(fe.Mentor)) {
                            fe = fe.Mentor;
                        } else {
                            fe = null;
                        }
                    }
                }
                return source;
            };
            BindingExpressionBase.prototype._Invalidate = function () {
                this._Cached = false;
                this._CachedValue = undefined;
            };
            BindingExpressionBase.prototype._MentorChanged = function (sender, e) {
                try  {
                    var mentor = this.Target.Mentor;
                    if(this.Binding.RelativeSource && this.Binding.RelativeSource.Mode === Data.RelativeSourceMode.TemplatedParent) {
                        if(!mentor) {
                            this.PropertyPathWalker.Update(null);
                        } else {
                            this.PropertyPathWalker.Update(mentor.TemplateOwner);
                        }
                        this.Refresh();
                    } else {
                        this.SetDataContextSource(mentor);
                    }
                } catch (err) {
                }
            };
            BindingExpressionBase.prototype._VisualParentChanged = function (sender, e) {
                try  {
                    var vpNode = this.TargetFE.XamlNode.VisualParentNode;
                    var vp = vpNode ? vpNode.XObject : null;
                    this.SetDataContextSource(vp);
                } catch (err) {
                }
            };
            BindingExpressionBase.prototype._DataContextChanged = function (sender, args) {
                try  {
                    var fe = sender;
                    this.PropertyPathWalker.Update(fe.DataContext);
                    if(this.Binding.Mode === Data.BindingMode.OneTime) {
                        this.Refresh();
                    }
                } catch (err) {
                    Warn(err.message);
                }
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
