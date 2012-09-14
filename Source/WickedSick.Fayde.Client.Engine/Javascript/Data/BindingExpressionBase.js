/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="Enums.js"/>
/// <reference path="../Core/Expression.js"/>
/// CODE

//#region BindingExpressionBase
var BindingExpressionBase = Nullstone.Create("BindingExpressionBase", Expression, 3);

BindingExpressionBase.Instance.Init = function (binding, target, propd) {
    if (!binding)
        return;

    this._Cached = false;
    this._CachedValue = null;

    this._Binding = binding;
    this.Target = target;
    this.Property = propd;

    var bindsToView = propd._ID === FrameworkElement.DataContextProperty._ID; //TODO: || propd.GetTargetType() === IEnumerable || propd.GetTargetType() === ICollectionView
    var walker = this.PropertyPathWalker = new _PropertyPathWalker(binding.Path.ParsePath, binding.BindsDirectlyToSource, bindsToView, this.IsBoundToAnyDataContext);
    if (binding.Mode !== BindingMode.OneTime) {
        walker.IsBrokenChanged.Subscribe(this._PropertyPathValueChanged, this);
        walker.ValueChanged.Subscribe(this._PropertyPathValueChanged, this);
    }
};

//#region Properties

Nullstone.AutoProperties(BindingExpressionBase, [
    "Target",
    "PropertyPathWalker",
    "Property",
    "CurrentError",
    "CurrentNotifyError"
]);

Nullstone.Property(BindingExpressionBase, "Binding", {
    get: function () { return this._Binding; }
});
Nullstone.Property(BindingExpressionBase, "DataSource", {
    get: function () { return this.PropertyPathWalker.Source; }
});
Nullstone.Property(BindingExpressionBase, "DataContextSource", {
    get: function () { return this._DataContextSource; }
});
Nullstone.Property(BindingExpressionBase, "IsBoundToAnyDataContext", {
    get: function () { return !this.Binding.ElementName && !this.Binding.Source; }
});
Nullstone.Property(BindingExpressionBase, "IsSelfDataContextBound", {
    get: function () {
        return this.IsBoundToAnyDataContext
            && (this.Target instanceof FrameworkElement)
            && (this.Property._ID !== FrameworkElement.DataContextProperty._ID);
    }
});
Nullstone.Property(BindingExpressionBase, "IsParentDataContextBound", {
    get: function () {
        return this.IsBoundToAnyDataContext
            && (this.Target instanceof FrameworkElement)
            && (this.Property._ID === FrameworkElement.DataContextProperty._ID || this.Property._ID === ContentPresenter.ContentProperty._ID);
    }
});
Nullstone.Property(BindingExpressionBase, "IsMentorDataContextBound", {
    get: function () {
        return this.IsBoundToAnyDataContext
            && !(this.Target instanceof FrameworkElement);
    }
});
Nullstone.Property(BindingExpressionBase, "IsTwoWayTextBoxText", {
    get: function () {
        return (this.Target instanceof TextBox)
            && (this.Property._ID === TextBox.TextProperty._ID)
            && (this.Binding.Mode === BindingMode.TwoWay);
    }
});

//#endregion

BindingExpressionBase.Instance.GetValue = function (propd) {
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
        this._CachedValue = propd.GetDefaultValue(this.Target);
    }
    return this._CachedValue;
};

BindingExpressionBase.Instance._OnAttached = function (element) {
    ///<param name="element" type="DependencyObject"></param>
    if (this.Attached)
        return;
    this._OnAttached$Expression(element);
    this._CalculateDataSource();

    if (this.IsTwoWayTextBoxText)
        this.Target.LostFocus.Subscribe(this._TextBoxLostFocus, this);

    var targetFE = Nullstone.As(element, FrameworkElement);
    if (this.Binding.Mode === BindingMode.TwoWay && this.Property._IsCustom) {
        var updateDataSourceCallback = function () {
            try {
                if (!this.Updating)
                    this._TryUpdateSourceObject(this.Target.$GetValue(this.Property));
            } catch (err) {
                //ignore
            }
        };
        this._PropertyListener = new PropertyChangedListener(this.Target, this.Property, this, updateDataSourceCallback);
    }
};
BindingExpressionBase.Instance._OnDetached = function (element) {
    ///<param name="element" type="DependencyObject"></param>
    if (!this.Attached)
        return;

    this._OnDetached$Expression(element);
    if (this.IsTwoWayTextBoxText)
        this.Target.LostFocus.Unsubscribe(this._TextBoxLostFocus, this);

    var targetFE = Nullstone.As(element, FrameworkElement);
    if (this.IsMentorDataContextBound) {
        targetFE.MentorChanged.Unsubscribe(this._MentorChanged, this);
        this.SetDataContextSource(null);
    } else if (this.IsParentDataContextBound) {
        targetFE.VisualParentChanged.Subscribe(this._ParentChanged, this);
        this.SetDataContextSource(null);
    } else if (this.IsSelfDataContextBound) {
        this.SetDataContextSource(null);
    }

    if (!targetFE)
        targetFE = this.Target.GetMentor();

    if (targetFE && this.CurrentError != null) {
        //TODO: Validation.RemoveError(targetFE, this.CurrentError);
        this.CurrentError = null;
    }

    if (this._PropertyListener) {
        this._PropertyListener.Detach();
        this._PropertyListener = null;
    }
    this.PropertyPathWalker.Update(null);
};

BindingExpressionBase.Instance._TextBoxLostFocus = function () {
    this._UpdateSourceObject();
};
BindingExpressionBase.Instance._TryUpdateSourceObject = function (value) {
    if (!this.Updating && this.Binding.UpdateSourceTrigger === UpdateSourceTrigger.Default) {
        this._UpdateSourceObject(value, false);
    }
};
BindingExpressionBase.Instance._UpdateSourceObject = function (value, force) {
    if (value === undefined)
        value = this.Target.$GetValue(this.Property);
    if (force === undefined)
        force = false;
    var binding = this.Binding;
    if (binding.Mode !== BindingMode.TwoWay)
        return;

    var dataError;
    var exception;
    var oldUpdating = this.Updating;
    var node = this.PropertyPathWalker.FinalNode;

    try {
        // If the user calls BindingExpresion.UpdateSource (), we must update regardless of focus state.
        // Otherwise we only update if the textbox is unfocused.
        //TODO: FocusManager
        //if (!force && this.IsTwoWayTextBoxText && Nullstone.RefEquals(FocusManager.GetFocusedElement(), this.Target))
        //return;

        if (this.PropertyPathWalker.FinalNode.IsPathBroken)
            return;

        if (binding.TargetNullValue) {
            try {
                if (Nullstone.RefEquals(binding.TargetNullValue, value))
                    value = null;
            } catch (err) {
                //ignore
            }
        }

        var converter = binding.Converter;
        if (converter) {
            value = converter.ConvertBack(value, node.GetValueType(), binding.ConverterParameter, binding.ConverterCulture);
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

        this.Updating = true;
        node.SetValue(value);
        this._CachedValue = value;
    } catch (err) {
        if (binding.ValidatesOnExceptions) {
            if (err instanceof TargetInvocationException)
                exception = err.InnerException;
            exception = err;
        }
    } finally {
        this.Updating = oldUpdating;
        //TODO: IDataErrorInfo
        //if (binding.ValidatesOnDataErrors && !exception && node.Source.DoesImplement(IDataErrorInfo) && node.GetPropertyInfo() != null) {
        //dataError = node.Source[node.GetPropertyInfo().Name];
        //}
    }
    this._MaybeEmitError(dataError, exception);
};
BindingExpressionBase.Instance._MaybeEmitError = function (message, exception) {
    /// <param name="message" type="String"></param>
    /// <param name="exception" type="Exception"></param>
    var fe = Nullstone.As(this.Target, FrameworkElement);
    if (!fe)
        fe = this.Target.GetMentor();
    if (!fe)
        return;

    if (String.isString(message) && message === "")
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
};

BindingExpressionBase.Instance._ConvertFromTargetToSource = function (value) {
    NotImplemented("BindingExpressionBase._ConvertFromTargetToSource");
    return value;
};
BindingExpressionBase.Instance._ConvertFromSourceToTarget = function (value) {
    NotImplemented("BindingExpressionBase._ConvertFromSourceToTarget");
    return value;
};
BindingExpressionBase.Instance._ConvertToType = function (propd, value) {
    try {
        var binding = this.Binding;
        if (!this.PropertyPathWalker.IsPathBroken && binding.Converter) {
            value = binding.Converter.Convert(value, this.Property.GetTargetType(), binding.ConverterParameter, binding.ConverterCulture);
        }
        if (value === DependencyProperty.UnsetValue || this.PropertyPathWalker.IsPathBroken) {
            value = binding.FallbackValue;
            if (value === undefined)
                value = propd.GetDefaultValue(this.Target);
        } else if (value == null) {
            value = binding.TargetNullValue;
            if (value == null && this.IsBoundToAnyDataContext && !binding.Path.Path)
                value = propd.GetDefaultValue(this.Target);
        } else {
            var format = binding.StringFormat;
            if (format) {
                if (!String.contains(format, "{0"))
                    format = "{0:" + format + "}";
                value = String.format({}, format, value);
            }
        }
    } catch (err) {
        return Fayde.TypeConverter.ConvertObject(propd, binding.FallbackValue, this.Target.constructor, true);
    }
    return value;
};

BindingExpressionBase.Instance._AttachToNotifyError = function (element) {
    ///<param name="element" type="INotifyDataErrorInfo"></param>
    NotImplemented("BindingExpressionBase._AttachToNotifyError");
};
BindingExpressionBase.Instance._NotifyErrorsChanged = function (o, e) {
    ///<param name="e" type="DataErrorsChangedEventArgs"></param>
    NotImplemented("BindingExpressionBase._NotifyErrorsChanged");
};

BindingExpressionBase.Instance._CalculateDataSource = function () {
    var source;
    if (this.Binding.Source) {
        this.PropertyPathWalker.Update(this.Binding.Source);
    } else if (this.Binding.ElementName != null) {
        source = this._FindSourceByElementName();
        var feTarget = Nullstone.As(this.Target, FrameworkElement);
        if (!feTarget)
            feTarget = this.Target.GetMentor();
        if (!feTarget) {
            this.Target.MentorChanged.Subscribe(this._InvalidateAfterMentorChanged, this);
        } else {
            feTarget.Loaded.Subscribe(this._HandleFeTargetLoaded, this);
        }
        this.PropertyPathWalker.Update(source);
    } else if (this.Binding.RelativeSource && this.Binding.RelativeSource.Mode === RelativeSourceMode.Self) {
        this.PropertyPathWalker.Update(this.Target);
    } else {
        var fe = Nullstone.As(this.Target, FrameworkElement);
        var propd = this.Property;
        if (fe && (propd._ID === FrameworkElement.DataContextProperty._ID || propd._ID === ContentPresenter.ContentProperty._ID)) {
            fe.VisualParentChanged.Subscribe(this._ParentChanged, this);
            fe = fe.GetVisualParent();
            this.SetDataContextSource(fe);
        } else {
            if (!fe) {
                this.Target.MentorChanged.Subscribe(this._MentorChanged, this);
                fe = this.Target.GetMentor();
            }

            if (fe && this.Binding.RelativeSource && this.Binding.RelativeSource.Mode === RelativeSourceMode.TemplatedParent) {
                this.PropertyPathWalker.Update(fe.TemplateOwner);
            } else {
                this.SetDataContextSource(fe);
            }
        }
    }
};
BindingExpressionBase.Instance.SetDataContextSource = function (value) {
    ///<param name="value" type="FrameworkElement"></param>
    if (this._DataContextSource && this._DataContextPropertyListener) {
        this._DataContextPropertyListener.Detach();
        this._DataContextPropertyListener = null;
    }
    this._DataContextSource = value;
    if (this._DataContextSource) {
        this._DataContextPropertyListener = new PropertyChangedListener(this._DataContextSource, FrameworkElement.DataContextProperty, this, this._DataContextChanged);
    }

    if (this._DataContextSource || this.IsMentorDataContextBound)
        this.PropertyPathWalker.Update(!this._DataContextSource ? null : this._DataContextSource.DataContext);
};
BindingExpressionBase.Instance._InvalidateAfterMentorChanged = function (sender, e) {
    ///<param name="e" type="EventArgs"></param>
    this.Target.MentorChanged.Unsubscribe(this._InvalidateAfterMentorChanged, this);
    var source = this._FindSourceByElementName();
    if (!source) {
        this.Target.GetMentor().Loaded.Subscribe(this._HandleFeTargetLoaded, this);
    } else {
        this.PropertyPathWalker.Update(source);
    }

    this._Invalidate();
    this.Target.$SetValue(this.Property, this);
};
BindingExpressionBase.Instance._HandleFeTargetLoaded = function (sender, e) {
    var fe = sender;
    fe.Loaded.Unsubscribe(this._HandleFeTargetLoaded, this);

    var source = this._FindSourceByElementName();
    if (source)
        this.PropertyPathWalker.Update(source);

    this._Invalidate();
    this.Target.$SetValue(this.Property, this);
};
BindingExpressionBase.Instance._FindSourceByElementName = function () {
    var source;
    var fe = Nullstone.As(this.Target, FrameworkElement);
    if (!fe)
        fe = this.Target.GetMentor();
    while (fe && !source) {
        source = fe.FindName(this.Binding.ElementName);
        if (!source && fe.TemplateOwner)
            fe = fe.GetTemplateOwner();
        else if (fe.GetMentor() && ItemsControl.GetItemsOwner(fe.GetMentor()))
            fe = fe.GetMentor();
        else
            fe = null;
    }
    return source;
};

BindingExpressionBase.Instance._Invalidate = function () {
    this._Cached = false;
    this._CachedValue = null;
};
BindingExpressionBase.Instance._MentorChanged = function (sender, e) {
    /// <param name="e" type="EventArgs"></param>
    try {
        var mentor = this.Target.GetMentor();
        if (this.Binding.RelativeSource && this.Binding.RelativeSource.Mode === RelativeSourceMode.TemplatedParent) {
            if (!mentor)
                this.PropertyPathWalker.Update(null);
            else
                this.PropertyPathWalker.Update(mentor.TemplateOwner);
            this.Refresh();
        } else {
            this.SetDataContextSource(mentor);
        }
    } catch (err) {
        //ignore
    }
};
BindingExpressionBase.Instance._ParentChanged = function (sender, e) {
    /// <param name="e" type="EventArgs"></param>
    try {
        var targetFE = this.Target;
        this.SetDataContextSource(targetFE.GetVisualParent());
    } catch (err) {
        //ignore
    }
};
BindingExpressionBase.Instance._DataContextChanged = function (sender, e) {
    try {
        var fe = sender;
        this.PropertyPathWalker.Update(fe.DataContext);
        if (this.Binding.Mode === BindingMode.OneTime)
            this.Refresh();
    } catch (err) {
        Warn(err.message);
    }
};
BindingExpressionBase.Instance._PropertyPathValueChanged = function () {
    this.Refresh();
};
BindingExpressionBase.Instance.Refresh = function () {
    var dataError;
    var exception;

    if (!this.Attached)
        return;

    //TODO: ERROR/VALIDATION
    //var node = this.PropertyPathWalker.FinalNode;
    //var source = node.Source;
    //source = Nullstone.As(source, INotifyDataErrorInfo));
    //this._AttachToNotifyError(source);

    //source = Nullstone.As(node.Source, IDataErrorInfo);
    //if (!this.Updating && this.Binding.ValidatesOnDataErrors && source && node.GetPropertyInfo())
    //dataError = source[node.GetPropertyInfo().Name];

    var oldUpdating = this.Updating;
    try {
        this.Updating = true;
        this._Invalidate();
        this.Target.$SetValue(this.Property, this);
    } catch (err) {
        if (this.Binding.ValidatesOnExceptions) {
            exception = err;
            if (exception instanceof TargetInvocationException)
                exception = exception.InnerException;
        }
    } finally {
        this.Updating = oldUpdating;
    }
    this._MaybeEmitError(dataError, exception);
};

Nullstone.FinishCreate(BindingExpressionBase);
//#endregion