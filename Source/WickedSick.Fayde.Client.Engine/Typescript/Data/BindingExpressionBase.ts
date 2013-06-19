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

module Fayde.Data {
    export class BindingExpressionBase extends Fayde.Expression implements IPropertyPathWalkerListener {
        private _Binding: Data.Binding;
        Target: DependencyObject;
        Property: DependencyProperty;
        private PropertyPathWalker: PropertyPathWalker;
        private _DataContextSourceNode: XamlNode;
        private _PropertyListener: Providers.IPropertyChangedListener;
        private _DataContextPropertyMonitor: IDataContextMonitor;
        private _SourceAvailableMonitor: IIsAttachedMonitor;

        private _IsBoundToAnyDataContext: bool;
        private _TwoWayTextBox: Controls.TextBox = null;

        get Binding(): Data.Binding { return this._Binding; }
        get DataSource(): any { return this.PropertyPathWalker.Source; }
        //get DataContextSource(): FrameworkElement { return this._DataContextSource; }

        private _Cached: bool = false;
        private _CachedValue: any = undefined;

        constructor(binding: Data.Binding, target: DependencyObject, propd: DependencyProperty) {
            super();
            this._Binding = binding;
            this.Target = target;
            this.Property = propd;

            if (this.Target instanceof Controls.TextBox && binding.Mode === BindingMode.TwoWay)
                this._TwoWayTextBox = <Controls.TextBox>this.Target;

            this._IsBoundToAnyDataContext = !this.Binding.ElementName && !this.Binding.Source;
            var isDcProp = propd === DependencyObject.DataContextProperty;
            var isContentProp = propd === Controls.ContentPresenter.ContentProperty;

            var bindsToView = isDcProp || propd.GetTargetType() === <any>IEnumerable_ || propd.GetTargetType() === <any>Data.ICollectionView_;
            var walker = this.PropertyPathWalker = new PropertyPathWalker(binding.Path.ParsePath, binding.BindsDirectlyToSource, bindsToView, this._IsBoundToAnyDataContext);
            if (binding.Mode !== BindingMode.OneTime)
                walker.Listen(this);
        }
        IsBrokenChanged() { this.Refresh(); }
        ValueChanged() { this.Refresh(); }

        GetValue(propd: DependencyProperty): any {
            if (this._Cached)
                return this._CachedValue;

            this._Cached = true;
            if (this.PropertyPathWalker.IsPathBroken) {
                this._CachedValue = null;
            } else {
                this._CachedValue = this.PropertyPathWalker.ValueInternal;
            }

            try {
                this._CachedValue = this._ConvertToType(propd, this._CachedValue);
            } catch (err) {
                this._CachedValue = propd.DefaultValue;
            }
            return this._CachedValue;
        }

        OnAttached(element: DependencyObject) {
            if (this.IsAttached)
                return;
            super.OnAttached(element);
            this._CalculateDataSource();

            if (this._TwoWayTextBox)
                this._TwoWayTextBox.LostFocus.Subscribe(this._TextBoxLostFocus, this);

            if (this.Binding.Mode === BindingMode.TwoWay && this.Property.IsCustom) {
                this._PropertyListener = this.Property.Store.ListenToChanged(this.Target, this.Property, this._UpdateSourceCallback, this);
            }
        }
        private _UpdateSourceCallback(sender, args: IDependencyPropertyChangedEventArgs) {
            try {
                if (!this.IsUpdating)
                    this._TryUpdateSourceObject(this.Target.GetValue(this.Property));
            } catch (err) {
            //ignore
            }
        }
        OnDetached(element: DependencyObject) {
            if (!this.IsAttached)
                return;

            super.OnDetached(element);
            if (this._TwoWayTextBox)
                this._TwoWayTextBox.LostFocus.Unsubscribe(this._TextBoxLostFocus, this);

            if (this._IsBoundToAnyDataContext) {
                var listener = this._DataContextPropertyMonitor;
                if (listener) listener.Detach();
                this.SetDataContextSource(null);
            }

            /*
            if (this.Target && this.CurrentError != null) {
                //TODO: Validation.RemoveError(this.Target, this.CurrentError);
                this.CurrentError = null;
            }
            */

            if (this._PropertyListener) {
                this._PropertyListener.Detach();
                this._PropertyListener = null;
            }
            this.PropertyPathWalker.Update(null);
        }

        private _TextBoxLostFocus() {
            this._UpdateSourceObject();
        }
        _TryUpdateSourceObject(value: any) {
            if (!this.IsUpdating && this.Binding.UpdateSourceTrigger === UpdateSourceTrigger.Default) {
                this._UpdateSourceObject(value, false);
            }
        }
        _UpdateSourceObject(value?: any, force?: bool) {
            if (value === undefined)
                value = this.Target.GetValue(this.Property);
            force = force === true;
            var binding = this.Binding;
            if (binding.Mode !== BindingMode.TwoWay)
                return;

            var dataError;
            var exception: Exception;
            var oldUpdating = this.IsUpdating;
            var node = this.PropertyPathWalker.FinalNode;

            try {
            // If the user calls BindingExpresion.UpdateSource (), we must update regardless of focus state.
            // Otherwise we only update if the textbox is unfocused.
                if (!force && this._TwoWayTextBox && App.Current.MainSurface.FocusedNode === this.Target.XamlNode)
                    return;

                if (this.PropertyPathWalker.IsPathBroken)
                    return;

                if (binding.TargetNullValue) {
                    try {
                        if (binding.TargetNullValue === value)
                            value = null;
                    } catch (err) {
                    //ignore
                    }
                }

                var converter = binding.Converter;
                if (converter) {
                    value = converter.ConvertBack(value, node.ValueType, binding.ConverterParameter, binding.ConverterCulture);
                }

                if (value instanceof String) {
                    //TODO: attempt to parse string for target type
                }

                try {
                    if (value)
                        value = this._ConvertFromTargetToSource(value);
                } catch (err) {
                    return;
                }

                if (!this._CachedValue && !value)
                    return;

                this.IsUpdating = true;
                node.SetValue(value);
                this._CachedValue = value;
            } catch (err) {
                if (binding.ValidatesOnExceptions) {
                    if (err instanceof TargetInvocationException)
                        exception = err.InnerException;
                    exception = err;
                }
            } finally {
                this.IsUpdating = oldUpdating;
            //TODO: IDataErrorInfo
            //if (binding.ValidatesOnDataErrors && !exception && node.Source.DoesImplement(IDataErrorInfo) && node.GetPropertyInfo() != null) {
            //dataError = node.Source[node.GetPropertyInfo().Name];
            //}
            }
            this._MaybeEmitError(dataError, exception);
        }
        private _MaybeEmitError(message: string, exception: Exception) {
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
        }

        private _ConvertFromTargetToSource(value: any): any {
            NotImplemented("BindingExpressionBase._ConvertFromTargetToSource");
            return value;
        }
        private _ConvertFromSourceToTarget(value: any): any {
            NotImplemented("BindingExpressionBase._ConvertFromSourceToTarget");
            return value;
        }
        private _ConvertToType(propd: DependencyProperty, value: any): any {
            try {
                var binding = this.Binding;
                if (!this.PropertyPathWalker.IsPathBroken && binding.Converter) {
                    value = binding.Converter.Convert(value, this.Property.GetTargetType(), binding.ConverterParameter, binding.ConverterCulture);
                }
                if (value === UnsetValue || this.PropertyPathWalker.IsPathBroken) {
                    value = binding.FallbackValue;
                    if (value === undefined)
                        value = propd.DefaultValue;
                } else if (value == null) {
                    value = binding.TargetNullValue;
                    if (value == null && this._IsBoundToAnyDataContext && !binding.Path.Path)
                        value = propd.DefaultValue;
                } else {
                    var format = binding.StringFormat;
                    if (format) {
                        if (format.indexOf("{0") < 0)
                            format = "{0:" + format + "}";
                        value = StringEx.Format(format, value);
                    }
                }
            } catch (err) {
                return TypeConverter.ConvertObject(propd, binding.FallbackValue, (<any>this.Target).constructor, true);
            }
            return value;
        }

        private _AttachToNotifyError(element) {
            ///<param name="element" type="INotifyDataErrorInfo"></param>
            NotImplemented("BindingExpressionBase._AttachToNotifyError");
        }
        private _NotifyErrorsChanged(o, e) {
            ///<param name="e" type="DataErrorsChangedEventArgs"></param>
            NotImplemented("BindingExpressionBase._NotifyErrorsChanged");
        }

        private _CalculateDataSource() {
            var source: any;
            if (this.Binding.Source) {
                this.PropertyPathWalker.Update(this.Binding.Source);
            } else if (this.Binding.ElementName != null) {
                source = this._FindSourceByElementName();
                this._SourceAvailableMonitor = this.Target.XamlNode.MonitorIsAttached((newIsAttached) => this._OnSourceAvailable());
                this.PropertyPathWalker.Update(source);
            } else if (this.Binding.RelativeSource && this.Binding.RelativeSource.Mode === RelativeSourceMode.Self) {
                this.PropertyPathWalker.Update(this.Target);
            } else {
                if (this.Binding.RelativeSource && this.Binding.RelativeSource.Mode === RelativeSourceMode.TemplatedParent) {
                    this.PropertyPathWalker.Update(this.Target.TemplateOwner);
                } else {
                    this.SetDataContextSource(this.Target);
                }
            }
        }
        private _OnSourceAvailable() {
            this._SourceAvailableMonitor.Detach();
            var source = this._FindSourceByElementName();
            if (source) this.PropertyPathWalker.Update(source);
            this._Invalidate();
            this.Target.SetValue(this.Property, this);
        }
        private _FindSourceByElementName(): XamlObject {
            var xobj: XamlObject = this.Target;
            var sourceNode: XamlNode;
            var name = this.Binding.ElementName;
            var xnode: XamlNode = (xobj) ? xobj.XamlNode : null;
            var parentNode: XamlNode;
            while (xnode) {
                sourceNode = xnode.FindName(name);
                if (sourceNode)
                    return sourceNode.XObject;
                if (xnode.XObject.TemplateOwner)
                    xobj = xnode.XObject.TemplateOwner;
                else if ((parentNode = xnode.ParentNode) && Controls.ItemsControl.GetItemsOwner(<UIElement>parentNode.XObject))
                    xnode = parentNode;
                break;
            }
            return undefined;
        }
        
        SetDataContextSource(value: XamlObject) {
            if (this._DataContextPropertyMonitor) {
                this._DataContextPropertyMonitor.Detach();
                this._DataContextPropertyMonitor = null;
            }
            var dcs = this._DataContextSourceNode = value.XamlNode;
            if (dcs) {
                this._DataContextPropertyMonitor = value.XamlNode.MonitorDataContext((newDataContext) => this._DataContextChanged(newDataContext));
                this.PropertyPathWalker.Update(dcs ? dcs.DataContext : undefined);
            }
        }
        private _DataContextChanged(newDataContext: any) {
            try {
                this.PropertyPathWalker.Update(newDataContext);
                if (this.Binding.Mode === BindingMode.OneTime)
                    this.Refresh();
            } catch (err) {
                Warn(err.message);
            }
        }

        private _Invalidate() {
            this._Cached = false;
            this._CachedValue = undefined;
        }
        Refresh() {
            var dataError;
            var exception: Exception;

            if (!this.IsAttached)
                return;

            //TODO: ERROR/VALIDATION
            //var node = this.PropertyPathWalker.FinalNode;
            //var source = node.Source;
            //source = Nullstone.As(source, INotifyDataErrorInfo));
            //this._AttachToNotifyError(source);

            //source = Nullstone.As(node.Source, IDataErrorInfo);
            //if (!this.Updating && this.Binding.ValidatesOnDataErrors && source && node.GetPropertyInfo())
            //dataError = source[node.GetPropertyInfo().Name];

            var oldUpdating = this.IsUpdating;
            try {
                this.IsUpdating = true;
                this._Invalidate();
                this.Target.SetValue(this.Property, this);
            } catch (err) {
                if (this.Binding.ValidatesOnExceptions) {
                    exception = err;
                    if (exception instanceof TargetInvocationException)
                        exception = (<TargetInvocationException>exception).InnerException;
                }
            } finally {
                this.IsUpdating = oldUpdating;
            }
            this._MaybeEmitError(dataError, exception);
        }
    }
    Nullstone.RegisterType(BindingExpressionBase, "BindingExpressionBase");
}