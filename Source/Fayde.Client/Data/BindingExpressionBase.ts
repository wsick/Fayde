/// <reference path="../Core/Expression.ts" />

module Fayde.Data {
    export class BindingExpressionBase extends Fayde.Expression implements IPropertyPathWalkerListener {
        //read-only properties
        ParentBinding: Data.Binding;
        Target: DependencyObject;
        Property: DependencyProperty;

        private PropertyPathWalker: PropertyPathWalker;
        private _PropertyListener: Providers.IPropertyChangedListener;
        private _SourceAvailableMonitor: IIsAttachedMonitor;

        private _IsDataContextBound: boolean;
        private _DataContext: any;
        private _TwoWayTextBox: Controls.TextBox = null;

        get DataItem(): any { return this.PropertyPathWalker.Source; }

        private _Cached: boolean = false;
        private _CachedValue: any = undefined;

        constructor(binding: Data.Binding, target: DependencyObject, propd: DependencyProperty) {
            super();
            this._Init(binding, target, propd);
        }

        private _Init(binding: Data.Binding, target: DependencyObject, propd: DependencyProperty) {
            Object.defineProperty(this, "ParentBinding", {
                value: binding,
                writable: false
            });
            Object.defineProperty(this, "Target", {
                value: target,
                writable: false
            });
            Object.defineProperty(this, "Property", {
                value: propd,
                writable: false
            });

            if (target instanceof Controls.TextBox && binding.Mode === BindingMode.TwoWay)
                this._TwoWayTextBox = <Controls.TextBox>target;

            this._IsDataContextBound = !binding.ElementName && !binding.Source && !binding.RelativeSource;

            var bindsToView = propd === DependencyObject.DataContextProperty || propd.GetTargetType() === <any>IEnumerable_ || propd.GetTargetType() === <any>Data.ICollectionView_;
            var walker = this.PropertyPathWalker = new PropertyPathWalker(binding.Path.ParsePath, binding.BindsDirectlyToSource, bindsToView, this._IsDataContextBound);
            if (binding.Mode !== BindingMode.OneTime)
                walker.Listen(this);
        }

        GetValue(propd: DependencyProperty): any {
            if (this._Cached)
                return this._CachedValue;

            this._Cached = true;
            if (this.PropertyPathWalker.IsPathBroken) {
                if (this.Target && this.Target.XamlNode.IsAttached)
                    console.warn("[BINDING] Path Broken --> Path='" + this.PropertyPathWalker.Path + "'");
                this._CachedValue = null;
            } else {
                this._CachedValue = this.PropertyPathWalker.ValueInternal;
            }

            this._CachedValue = this._ConvertToType(propd, this._CachedValue);
            return this._CachedValue;
        }

        OnAttached(element: DependencyObject) {
            if (this.IsAttached)
                return;
            if (Fayde.Data.Debug && window.console)
                console.log("[BINDING] OnAttached: [" + (<any>element).constructor._TypeName + "] {Path=" + this.ParentBinding.Path.Path + "}");
            
            super.OnAttached(element);
            
            var source: any;
            if (this.ParentBinding.Source) {
                source = this.ParentBinding.Source;
            } else if (this.ParentBinding.ElementName != null) {
                source = this._FindSourceByElementName();
                this._SourceAvailableMonitor = this.Target.XamlNode.MonitorIsAttached((newIsAttached) => this._OnSourceAvailable());
            } else if (this.ParentBinding.RelativeSource) {
                switch (this.ParentBinding.RelativeSource.Mode) {
                    case RelativeSourceMode.Self:
                        source = this.Target;
                        break;
                    case RelativeSourceMode.TemplatedParent:
                        source = this.Target.TemplateOwner;
                        break;
                    case RelativeSourceMode.FindAncestor:
                        //TODO: Implement
                        break;
                }
            } else {
                source = this._DataContext;
            }
            this.PropertyPathWalker.Update(source);

            if (this._TwoWayTextBox)
                this._TwoWayTextBox.LostFocus.Subscribe(this._TextBoxLostFocus, this);

            if (this.ParentBinding.Mode === BindingMode.TwoWay && this.Property.IsCustom) {
                this._PropertyListener = this.Property.Store.ListenToChanged(this.Target, this.Property, this._UpdateSourceCallback, this);
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
            var name = this.ParentBinding.ElementName;
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

        OnDetached(element: DependencyObject) {
            if (!this.IsAttached)
                return;
            if (Fayde.Data.Debug && window.console)
                console.log("[BINDING] OnDetached: [" + (<any>element).constructor._TypeName + "] {Path=" + this.ParentBinding.Path.Path + "}");
            
            super.OnDetached(element);

            if (this._TwoWayTextBox)
                this._TwoWayTextBox.LostFocus.Unsubscribe(this._TextBoxLostFocus, this);

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

            this.Target = undefined;
        }
        
        IsBrokenChanged() { this.Refresh(); }
        ValueChanged() { this.Refresh(); }
        UpdateSource() {
            return this._UpdateSourceObject(undefined, true);
        }
        _TryUpdateSourceObject(value: any) {
            if (!this.IsUpdating && this.ParentBinding.UpdateSourceTrigger === UpdateSourceTrigger.Default)
                this._UpdateSourceObject(value, false);
        }
        private _UpdateSourceCallback(sender, args: IDependencyPropertyChangedEventArgs) {
            try {
                if (!this.IsUpdating && this.ParentBinding.UpdateSourceTrigger === UpdateSourceTrigger.Default)
                    this._UpdateSourceObject(this.Target.GetValue(this.Property), false);
            } catch (err) {
                console.warn("[BINDING] UpdateSource: " + err.toString());
            }
        }
        private _TextBoxLostFocus() {
            this._UpdateSourceObject();
        }
        private _UpdateSourceObject(value?: any, force?: boolean) {
            if (value === undefined)
                value = this.Target.GetValue(this.Property);
            force = force === true;
            var binding = this.ParentBinding;
            if (binding.Mode !== BindingMode.TwoWay)
                return;

            var dataError;
            var exception: Exception;
            var oldUpdating = this.IsUpdating;
            var node = this.PropertyPathWalker.FinalNode;

            try {
            // If the user calls BindingExpresion.UpdateSource (), we must update regardless of focus state.
            // Otherwise we only update if the textbox is unfocused.
                if (!force && this._TwoWayTextBox && Application.Current.MainSurface.FocusedNode === this.Target.XamlNode)
                    return;

                if (this.PropertyPathWalker.IsPathBroken)
                    return;

                if (binding.TargetNullValue && binding.TargetNullValue === value)
                    value = null;

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
                    console.warn("[BINDING] ConvertFromTargetToSource: " + err.toString());
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
        OnDataContextChanged(newDataContext: any) {
            if (Fayde.Data.Debug && window.console)
                console.log("[BINDING] DataContextChanged: [" + (<any>this.Target)._ID + ":" + (<any>this.Target).constructor._TypeName + "] {Path=" + this.ParentBinding.Path.Path + "}");

            if (this._DataContext === newDataContext)
                return;
            this._DataContext = newDataContext;
            if (!this._IsDataContextBound)
                return;

            if (Fayde.Data.IsCounterEnabled)
                Fayde.Data.DataContextCounter++;
            try {
                this.PropertyPathWalker.Update(newDataContext);
                if (this.ParentBinding.Mode === BindingMode.OneTime)
                    this.Refresh();
            } catch (err) {
                console.warn("[BINDING] DataContextChanged Error: " + err.message);
            }
        }

        private _Invalidate() {
            this._Cached = false;
            this._CachedValue = undefined;
        }
        Refresh() {
            var dataError: any;
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
                if (this.ParentBinding.ValidatesOnExceptions) {
                    exception = err;
                    if (exception instanceof TargetInvocationException)
                        exception = (<TargetInvocationException>exception).InnerException;
                }
            } finally {
                this.IsUpdating = oldUpdating;
            }
            this._MaybeEmitError(dataError, exception);
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
            var targetType = this.Property.GetTargetType();
            try {
                var binding = this.ParentBinding;
                if (!this.PropertyPathWalker.IsPathBroken && binding.Converter) {
                    value = binding.Converter.Convert(value, targetType, binding.ConverterParameter, binding.ConverterCulture);
                }
                if (value === DependencyProperty.UnsetValue || this.PropertyPathWalker.IsPathBroken) {
                    value = binding.FallbackValue;
                    if (value === undefined)
                        value = propd.DefaultValue;
                } else if (value == null) {
                    value = binding.TargetNullValue;
                    if (value == null && this._IsDataContextBound && !binding.Path.Path)
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
                console.warn("[BINDING]" + err.toString());
                value = binding.FallbackValue;
            }
            return Fayde.ConvertAnyToType(value, <Function>targetType);
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
        private _AttachToNotifyError(element) {
            ///<param name="element" type="INotifyDataErrorInfo"></param>
            NotImplemented("BindingExpressionBase._AttachToNotifyError");
        }
        private _NotifyErrorsChanged(o, e) {
            ///<param name="e" type="DataErrorsChangedEventArgs"></param>
            NotImplemented("BindingExpressionBase._NotifyErrorsChanged");
        }
    }
    Fayde.RegisterType(BindingExpressionBase, {
    	Name: "BindingExpressionBase",
    	Namespace: "Fayde.Data"
    });
}