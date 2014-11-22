/// <reference path="../Core/Expression.ts" />

module Fayde.Data {
    export class BindingExpressionBase extends Expression implements IPropertyPathWalkerListener {
        //read-only properties
        ParentBinding: Data.Binding;
        Target: DependencyObject;
        Property: DependencyProperty;

        private PropertyPathWalker: PropertyPathWalker;
        private _PropertyListener: Providers.IPropertyChangedListener;
        private _SourceAvailableMonitor: IIsAttachedMonitor;

        private _IsDataContextBound: boolean;
        private _DataContext: any;
        private _TwoWayLostFocusElement: UIElement = null;

        get DataItem (): any {
            return this.PropertyPathWalker.Source;
        }

        private _Cached: boolean = false;
        private _CachedValue: any = undefined;

        constructor (binding: Data.Binding) {
            super();
            Object.defineProperty(this, "ParentBinding", {
                value: binding,
                writable: false
            });
        }

        private _IsSealed = false;

        Seal (owner: DependencyObject, prop: any) {
            if (this._IsSealed)
                return;
            this._IsSealed = true;

            Object.defineProperty(this, "Target", {
                value: owner,
                writable: false
            });
            var propd = <DependencyProperty>prop;
            Object.defineProperty(this, "Property", {
                value: propd,
                writable: false
            });

            var binding = this.ParentBinding;
            var path = binding.Path.Path;
            if ((!path || path === ".") && binding.Mode === Data.BindingMode.TwoWay)
                throw new ArgumentException("TwoWay bindings require a non-empty Path.");

            if (binding.Mode === BindingMode.TwoWay && (owner instanceof Controls.TextBox || owner instanceof Controls.PasswordBox))
                this._TwoWayLostFocusElement = <UIElement>owner;

            this._IsDataContextBound = !binding.ElementName && !binding.Source && !binding.RelativeSource;

            var bindsToView = propd === DependencyObject.DataContextProperty || propd.GetTargetType() === <any>nullstone.IEnumerable_ || propd.GetTargetType() === <any>Data.ICollectionView_;
            var walker = this.PropertyPathWalker = new PropertyPathWalker(binding.Path.ParsePath, binding.BindsDirectlyToSource, bindsToView, this._IsDataContextBound);
            if (binding.Mode !== BindingMode.OneTime)
                walker.Listen(this);
        }

        OnAttached (element: DependencyObject) {
            if (this.IsAttached)
                return;
            if (this.Target && this.Target !== element)
                throw new Error("Cannot attach BindingExpression to another DependencyObject.");
            if (Fayde.Data.Debug && window.console)
                console.log("[BINDING] OnAttached: [" + (<any>element).constructor.name + "] {Path=" + this.ParentBinding.Path.Path + "}");

            super.OnAttached(element);

            this._SourceAvailableMonitor = this.Target.XamlNode.MonitorIsAttached((newIsAttached) => this._OnSourceAvailable());
            var source = this._FindSource();
            this.PropertyPathWalker.Update(source);

            if (this._TwoWayLostFocusElement)
                this._TwoWayLostFocusElement.LostFocus.on(this._TargetLostFocus, this);

            if (this.ParentBinding.Mode === BindingMode.TwoWay && this.Property.IsCustom) {
                this._PropertyListener = this.Property.Store.ListenToChanged(this.Target, this.Property, this._UpdateSourceCallback, this);
            }
        }

        GetValue (propd: DependencyProperty): any {
            if (this._Cached)
                return this._CachedValue;

            if (this.PropertyPathWalker.IsPathBroken) {
                var target = this.Target;
                if (target && target.XamlNode.IsAttached && (!(target instanceof Fayde.FrameworkElement) || (<FrameworkElement>target).XamlNode.IsLoaded))
                    console.warn("[BINDING] Path Broken --> Path='" + this.PropertyPathWalker.Path + "'");
                this._CachedValue = null;
            } else {
                this._CachedValue = this.PropertyPathWalker.ValueInternal;
            }

            this._CachedValue = this._ConvertToType(propd, this._CachedValue);
            this._Cached = true;
            return this._CachedValue;
        }

        private _OnSourceAvailable () {
            this._SourceAvailableMonitor.Detach();
            var source = this._FindSource();
            if (source) this.PropertyPathWalker.Update(source);
            this._Invalidate();
            this.Target.SetValue(this.Property, this);
        }

        private _FindSource (): any {
            if (this.ParentBinding.Source) {
                return this.ParentBinding.Source;
            } else if (this.ParentBinding.ElementName != null) {
                return this._FindSourceByElementName();
            } else if (this.ParentBinding.RelativeSource) {
                var rs = this.ParentBinding.RelativeSource;
                switch (rs.Mode) {
                    case RelativeSourceMode.Self:
                        return this.Target;
                    case RelativeSourceMode.TemplatedParent:
                        return this.Target.TemplateOwner;
                    case RelativeSourceMode.FindAncestor:
                        return findAncestor(this.Target, rs);
                    case RelativeSourceMode.ItemsControlParent:
                        return findItemsControlAncestor(this.Target, rs);
                }
            }
            return this._DataContext;
        }

        private _FindSourceByElementName (): XamlObject {
            var name = this.ParentBinding.ElementName;
            var xobj: XamlObject = this.Target;
            if (!xobj)
                return undefined;
            var source = xobj.FindName(name, true);
            if (source)
                return source;
            //TODO: Crawl out of ListBoxItem?
            return undefined;
        }

        OnDetached (element: DependencyObject) {
            if (!this.IsAttached)
                return;
            if (Fayde.Data.Debug && window.console)
                console.log("[BINDING] OnDetached: [" + (<any>element).constructor.name + "] {Path=" + this.ParentBinding.Path.Path + "}");

            super.OnDetached(element);

            if (this._TwoWayLostFocusElement)
                this._TwoWayLostFocusElement.LostFocus.off(this._TargetLostFocus, this);

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

        IsBrokenChanged () {
            this.Refresh();
        }

        ValueChanged () {
            this.Refresh();
        }

        UpdateSource () {
            return this._UpdateSourceObject();
        }

        _TryUpdateSourceObject (value: any) {
            if (this._ShouldUpdateSource())
                this._UpdateSourceObject(value);
        }

        private _UpdateSourceCallback (sender, args: IDependencyPropertyChangedEventArgs) {
            try {
                if (this._ShouldUpdateSource())
                    this._UpdateSourceObject(this.Target.GetValue(this.Property));
            } catch (err) {
                console.warn("[BINDING] UpdateSource: " + err.toString());
            }
        }

        private _TargetLostFocus (sender: any, e: nullstone.IEventArgs) {
            if (this.ParentBinding.UpdateSourceTrigger === UpdateSourceTrigger.Explicit)
                return;
            this._UpdateSourceObject();
        }

        private _ShouldUpdateSource () {
            if (this.IsUpdating)
                return false;
            if (!this._TwoWayLostFocusElement)
                return this.ParentBinding.UpdateSourceTrigger !== UpdateSourceTrigger.Explicit;
            return this.ParentBinding.UpdateSourceTrigger === UpdateSourceTrigger.PropertyChanged;
        }

        private _UpdateSourceObject (value?: any) {
            if (value === undefined)
                value = this.Target.GetValue(this.Property);
            var binding = this.ParentBinding;
            if (binding.Mode !== BindingMode.TwoWay)
                return;

            var dataError;
            var exception: Exception;
            var oldUpdating = this.IsUpdating;
            var node = this.PropertyPathWalker.FinalNode;

            try {
                if (this.PropertyPathWalker.IsPathBroken)
                    return;
                value = this._ConvertFromTargetToSource(binding, node, value);
                if (this._CachedValue === undefined && value === undefined)
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

        OnDataContextChanged (newDataContext: any) {
            if (Fayde.Data.Debug && window.console)
                console.log("[BINDING] DataContextChanged: [" + (<any>this.Target)._ID + ":" + (<any>this.Target).constructor.name + "] {Path=" + this.ParentBinding.Path.Path + "}");

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

        private _Invalidate () {
            this._Cached = false;
            this._CachedValue = undefined;
        }

        Refresh () {
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
                } else {
                    console.warn(err);
                }
            } finally {
                this.IsUpdating = oldUpdating;
            }
            this._MaybeEmitError(dataError, exception);
        }

        private _ConvertFromTargetToSource (binding: Data.Binding, node: IPropertyPathNode, value: any): any {
            if (binding.TargetNullValue && binding.TargetNullValue === value)
                value = null;

            var converter = binding.Converter;
            if (converter) {
                value = converter.ConvertBack(value, node.ValueType, binding.ConverterParameter, binding.ConverterCulture);
            }

            //TODO: attempt to parse string for target type
            // We don't have a target type for plain objects
            //if (value instanceof String) { }

            return value;
        }

        private _ConvertToType (propd: DependencyProperty, value: any): any {
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
                        value = Localization.Format(format, value);
                    }
                }
            } catch (err) {
                console.warn("[BINDING]" + err.toString());
                value = binding.FallbackValue;
            }
            return nullstone.convertAnyToType(value, <Function>targetType);
        }

        private _MaybeEmitError (message: string, exception: Exception) {
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

        private _AttachToNotifyError (element) {
            ///<param name="element" type="INotifyDataErrorInfo"></param>
            console.warn("BindingExpressionBase._AttachToNotifyError");
        }

        private _NotifyErrorsChanged (o, e) {
            ///<param name="e" type="DataErrorsChangedEventArgs"></param>
            console.warn("BindingExpressionBase._NotifyErrorsChanged");
        }
    }

    function findAncestor (target: DependencyObject, relSource: RelativeSource): DependencyObject {
        var ancestorType = relSource.AncestorType;
        if (typeof ancestorType !== "function") {
            console.warn("RelativeSourceMode.FindAncestor with no AncestorType specified.");
            return;
        }
        var ancestorLevel = relSource.AncestorLevel;
        if (isNaN(ancestorLevel)) {
            console.warn("RelativeSourceMode.FindAncestor with no AncestorLevel specified.");
            return;
        }
        for (var parent = VisualTreeHelper.GetParent(target); parent != null; parent = VisualTreeHelper.GetParent(parent)) {
            if (parent instanceof ancestorType && --ancestorLevel < 1)
                return parent;
        }
    }

    function findItemsControlAncestor (target: XamlObject, relSource: Data.RelativeSource): XamlObject {
        if (!(target instanceof DependencyObject))
            return;
        var ancestorLevel = relSource.AncestorLevel;
        ancestorLevel = ancestorLevel || 1; //NOTE: Will coerce 0 to 1 also
        for (var parent = VisualTreeHelper.GetParent(<DependencyObject>target); parent != null; parent = VisualTreeHelper.GetParent(parent)) {
            if (!!(<UIElement>parent).IsItemsControl && --ancestorLevel < 1)
                return parent;
        }
    }
}