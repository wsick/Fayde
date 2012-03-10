/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="Enums.js"/>
/// <reference path="../Core/Expression.js"/>
/// CODE

//#region BindingExpressionBase
var BindingExpressionBase = Nullstone.Create("BindingExpressionBase", Expression, 3);

BindingExpressionBase.prototype.Init = function (binding, target, propd) {
    this.Init$super();
    if (!binding)
        return;

    this._Cached = false;
    this._CachedValue = null;

    this._Binding = binding;
    this.SetTarget(target);
    this.SetProperty(propd);

    var bindsToView = propd === FrameworkElement.DataContextProperty; //TODO: || propd.GetTargetType() === IEnumerable || propd.GetTargetType() === ICollectionView
    this.SetPropertyPathWalker(new _PropertyPathWalker(binding.GetPath().GetParsePath(), binding.GetBindsDirectlyToSource(), bindsToView, this.GetIsBoundToAnyDataContext()));
    if (binding.GetMode() !== BindingMode.OneTime) {
        var walker = this.GetPropertyPathWalker();
        walker.IsBrokenChanged.Subscribe(this._PropertyPathValueChanged, this);
        walker.ValueChanged.Subscribe(this._PropertyPathValueChanged, this);
    }
};

BindingExpressionBase.prototype.GetValue = function (propd) {
    if (this._Cached)
        return this._CachedValue;

    this._Cached = true;
    if (this.GetPropertyPathWalker().GetIsPathBroken()) {
        this._CachedValue = null;
    } else {
        this._CachedValue = this.GetPropertyPathWalker().GetValueInternal();
    }

    try {
        this._CachedValue = this._ConvertToType(propd, this._CachedValue);
    } catch (err) {
        this._CachedValue = propd.GetDefaultValue(this.GetTarget());
    }
    return this._CachedValue;
};

BindingExpressionBase.prototype._OnAttached = function (element) {
    ///<param name="element" type="DependencyObject"></param>
    if (this.GetAttached())
        return;
    this._OnAttached$super(element);
    this._CalculateDataSource();

    if (this.GetIsTwoWayTextBoxText())
        this.GetTarget().LostFocus.Subscribe(this._TextBoxLostFocus, this);

    var targetFE = Nullstone.As(element, FrameworkElement);
    if (this.GetBinding().GetMode() === BindingMode.TwoWay && this.GetProperty()._IsCustom) {
        var updateDataSourceCallback = function () {
            try {
                if (!this.GetUpdating())
                    this._TryUpdateSourceObject(this.GetTarget().GetValue(this.GetProperty()));
            } catch (err) {
                //ignore
            }
        };
        this._PropertyListener = new PropertyChangedListener(this.GetTarget(), this.GetProperty(), this, updateDataSourceCallback);
    }
};
BindingExpressionBase.prototype._OnDetached = function (element) {
    ///<param name="element" type="DependencyObject"></param>
    if (!this.GetAttached())
        return;

    this._OnDetached$super(element);
    if (this.GetIsTwoWayTextBoxText())
        this.GetTarget().LostFocus.Unsubscribe(this._TextBoxLostFocus, this);

    var targetFE = Nullstone.As(element, FrameworkElement);
    if (this.GetIsMentorDataContextBound()) {
        targetFE.MentorChanged.Unsubscribe(this._MentorChanged, this);
        this.SetDataContextSource(null);
    } else if (this.GetIsParentDataContextBound()) {
        targetFE.VisualParentChanged.Subscribe(this._ParentChanged, this);
        this.SetDataContextSource(null);
    } else if (this.GetIsSelfDataContextBound()) {
        this.SetDataContextSource(null);
    }

    if (targetFE == null)
        targetFE = this.GetTarget().GetMentor();

    if (targetFE != null && this.GetCurrentError() != null) {
        //TODO: Validation.RemoveError(targetFE, this.GetCurrentError());
        this.SetCurrentError(null);
    }

    if (this._PropertyListener != null) {
        this._PropertyListener.Detach();
        this._PropertyListener = null;
    }
    this.GetPropertyPathWalker().Update(null);
};

BindingExpressionBase.prototype._TextBoxLostFocus = function () {
    this._UpdateSourceObject();
};
BindingExpressionBase.prototype._TryUpdateSourceObject = function (value) {
    if (!this.GetUpdating() && this.GetBinding().GetUpdateSourceTrigger() === UpdateSourceTrigger.Default) {
        this._UpdateSourceObject(value, false);
    }
};
BindingExpressionBase.prototype._UpdateSourceObject = function (value, force) {
    if (value === undefined)
        value = GetTarget().GetValue(GetProperty());
    if (force === undefined)
        force = false;
    if (this.GetBinding().Mode !== BindingMode.TwoWay)
        return;

    var dataError = null;
    var exception = null;
    var oldUpdating = this.GetUpdating();
    var node = this.GetPropertyPathWalker().GetFinalNode();

    try {
        // If the user calls BindingExpresion.UpdateSource (), we must update regardless of focus state.
        // Otherwise we only update if the textbox is unfocused.
        //TODO: FocusManager
        //if (!force && this.GetIsTwoWayTextBoxText() && RefObject.RefEquals(FocusManager.GetFocusedElement(), this.GetTarget()))
        //return;

        if (this.GetPropertyPathWalker().GetFinalNode().GetIsPathBroken())
            return;

        if (this.GetBinding().GetTargetNullValue() != null) {
            try {
                if (RefObject.RefEquals(this.GetBinding().GetTargetNullValue(), value))
                    value = null;
            } catch (err) {
                //ignore
            }
        }

        var converter = this.GetBinding().GetConverter();
        if (converter != null) {
            value = converter.ConvertBack(value, node.GetValueType(), this.GetBinding().GetConverterParameter(), /* TODO: Culture */null);
        }

        if (value instanceof String) {
            //TODO: attempt to parse string for target type
        }

        try {
            if (value != null)
                value = this._ConvertFromTargetToSource(value);
        } catch (err) {
            return;
        }

        if (this._CachedValue == null && value == null)
            return;

        this.SetUpdating(true);
        node.SetValue(value);
        this._CachedValue = value;
    } catch (err) {
        if (this.GetBinding().GetValidatesOnExceptions()) {
            if (err instanceof TargetInvocationException)
                exception = err.InnerException;
            exception = err;
        }
    } finally {
        this.SetUpdating(oldUpdating);
        //TODO: IDataErrorInfo
        //if (this.GetBinding().GetValidatesOnDataErrors() && exception == null && node.GetSource().DoesImplement(IDataErrorInfo) && node.GetPropertyInfo() != null) {
        //dataError = node.GetSource()[node.GetPropertyInfo().Name];
        //}
    }
    this._MaybeEmitError(dataError, exception);
};
BindingExpressionBase.prototype._MaybeEmitError = function (message, exception) {
    /// <param name="message" type="String"></param>
    /// <param name="exception" type="Exception"></param>
    var fe = Nullstone.As(this.GetTarget(), FrameworkElement);
    if (fe == null)
        fe = this.GetTarget().GetMentor();
    if (fe == null)
        return;

    if (String.isString(message) && message === "")
        message = null;

    var oldError = this.GetCurrentError();
    if (message != null)
        this.SetCurrentError(new ValidationError(message, null));
    else if (exception != null)
        this.SetCurrentError(new ValidationError(null, exception));
    else
        this.SetCurrentError(null);

    if (oldError != null && this.GetCurrentError() != null) {
        Validation.AddError(fe, this.GetCurrentError());
        Validation.RemoveError(fe, oldError);
        if (this.GetBinding().GetNotifyOnValidationError()) {
            fe.RaiseBindingValidationError(new ValidationErrorEventArgs(ValidationErrorEventAction.Removed, oldError));
            fe.RaiseBindingValidationError(new ValidationErrorEventArgs(ValidationErrorEventAction.Added, this.GetCurrentError()));
        }
    } else if (oldError != null) {
        Validation.RemoveError(fe, oldError);
        if (this.GetBinding().GetNotifyOnValidationError())
            fe.RaiseBindingValidationError(new ValidationErrorEventArgs(ValidationErrorEventAction.Removed, oldError));
    } else if (this.GetCurrentError() != null) {
        Validation.AddError(fe, this.GetCurrentError());
        if (this.GetBinding().GetNotifyOnValidationError())
            fe.RaiseBindingValidationError(new ValidationErrorEventArgs(ValidationErrorEventAction.Added, this.GetCurrentError()));
    }
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
    try {
        if (!this.GetPropertyPathWalker().GetIsPathBroken() && this.GetBinding().GetConverter() != null) {
            value = this.GetBinding().GetConverter().Convert(value, this.GetProperty().GetTargetType(), this.GetBinding().GetConverterParameter(), {});
        }
        if (value === DependencyProperty.UnsetValue || this.GetPropertyPathWalker().GetIsPathBroken()) {
            value = this.GetBinding().GetFallbackValue();
            if (value == null)
                value = propd.GetDefaultValue(this.GetTarget());
        } else if (value == null) {
            value = this.GetBinding().GetTargetNullValue();
            if (value == null && this.GetIsBoundToAnyDataContext() && !this.GetBinding().GetPath().GetPath())
                value = propd.GetDefaultValue(this.GetTarget());
        } else {
            var format = this.GetBinding().GetStringFormat();
            if (format) {
                if (!String.contains(format, "{0"))
                    format = "{0:" + format + "}";
                value = String.format({}, format, value);
            }
        }
    } catch (err) {
        return Fayde.TypeConverter.ConvertObject(propd, this.GetBinding().GetFallbackValue(), this.GetTarget().constructor, true);
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
    var source = null;
    if (this.GetBinding().GetSource() != null) {
        this.GetPropertyPathWalker().Update(this.GetBinding().GetSource());
    } else if (this.GetBinding().GetElementName() != null) {
        source = this._FindSourceByElementName();
        var feTarget = Nullstone.As(this.GetTarget(), FrameworkElement);
        if (feTarget == null)
            feTarget = this.GetTarget().GetMentor();
        if (feTarget == null) {
            this.GetTarget().MentorChanged.Subscribe(this._InvalidateAfterMentorChanged, this);
        } else {
            feTarget.Loaded.Subscribe(this._HandleFeTargetLoaded, this);
        }
        this.GetPropertyPathWalker().Update(source);
    } else if (this.GetBinding().GetRelativeSource() != null && this.GetBinding().GetRelativeSource().GetMode() === RelativeSourceMode.Self) {
        this.GetPropertyPathWalker().Update(this.GetTarget());
    } else {
        var fe = Nullstone.As(this.GetTarget(), FrameworkElement);
        if (fe != null && (this.GetProperty() === FrameworkElement.DataContextProperty || this.GetProperty() === ContentPresenter.ContentProperty)) {
            fe.VisualParentChanged.Subscribe(this._ParentChanged, this);
            fe = fe.GetVisualParent();
            this.SetDataContextSource(fe);
        } else {
            if (fe == null) {
                this.GetTarget().MentorChanged.Subscribe(this._MentorChanged, this);
                fe = this.GetTarget().GetMentor();
            }

            if (fe != null && this.GetBinding().GetRelativeSource() != null && this.GetBinding().GetRelativeSource().GetMode() === RelativeSourceMode.TemplatedParent) {
                this.GetPropertyPathWalker().Update(fe.GetTemplateOwner());
            } else {
                this.SetDataContextSource(fe);
            }
        }
    }
};
BindingExpressionBase.prototype.SetDataContextSource = function (value) {
    ///<param name="value" type="FrameworkElement"></param>
    if (this._DataContextSource != null && this._DataContextPropertyListener != null) {
        this._DataContextPropertyListener.Detach();
        this._DataContextPropertyListener = null;
    }
    this._DataContextSource = value;
    if (this._DataContextSource != null) {
        this._DataContextPropertyListener = new PropertyChangedListener(this._DataContextSource, FrameworkElement.DataContextProperty, this, this._DataContextChanged);
    }

    if (this._DataContextSource != null || this.GetIsMentorDataContextBound())
        this.GetPropertyPathWalker().Update(this._DataContextSource == null ? null : this._DataContextSource.GetDataContext());
};
BindingExpressionBase.prototype._InvalidateAfterMentorChanged = function (sender, e) {
    ///<param name="e" type="EventArgs"></param>
    this.GetTarget().MentorChanged.Unsubscribe(this._InvalidateAfterMentorChanged, this);
    var source = this._FindSourceByElementName();
    if (source == null) {
        this.GetTarget().GetMentor().Loaded.Subscribe(this._HandleFeTargetLoaded, this);
    } else {
        this.GetPropertyPathWalker().Update(source);
    }

    this._Invalidate();
    this.GetTarget().SetValue(this.GetProperty(), this);
};
BindingExpressionBase.prototype._HandleFeTargetLoaded = function (sender, e) {
    var fe = sender;
    fe.Loaded.Unsubscribe(this._HandleFeTargetLoaded, this);

    var source = this._FindSourceByElementName();
    if (source != null)
        this.GetPropertyPathWalker().Update(source);

    this._Invalidate();
    this.GetTarget().SetValue(this.GetProperty(), this);
};
BindingExpressionBase.prototype._FindSourceByElementName = function () {
    var source = null;
    var fe = Nullstone.As(this.GetTarget(), FrameworkElement);
    if (!fe)
        fe = this.GetTarget().GetMentor();
    while (fe != null && source == null) {
        source = fe.FindName(this.GetBinding().GetElementName());
        if (source == null && fe.GetTemplateOwner() != null)
            fe = fe.GetTemplateOwner();
        else if (fe.GetMentor() != null && ItemsControl.GetItemsOwner(fe.GetMentor()) != null)
            fe = fe.GetMentor();
        else
            fe = null;
    }
    return source;
};

BindingExpressionBase.prototype._Invalidate = function () {
    this._Cached = false;
    this._CachedValue = null;
};
BindingExpressionBase.prototype._MentorChanged = function (sender, e) {
    /// <param name="e" type="EventArgs"></param>
    try {
        var mentor = this.GetTarget().GetMentor();
        if (this.GetBinding().GetRelativeSource() != null && this.GetBinding().GetRelativeSource().GetMode() === RelativeSourceMode.TemplatedParent) {
            if (mentor == null)
                this.GetPropertyPathWalker().Update(null);
            else
                this.GetPropertyPathWalker().Update(menotr.GetTemplateOwner());
            this.Refresh();
        } else {
            this.SetDataContextSource(mentor);
        }
    } catch (err) {
        //ignore
    }
};
BindingExpressionBase.prototype._ParentChanged = function (sender, e) {
    /// <param name="e" type="EventArgs"></param>
    try {
        var targetFE = this.GetTarget();
        this.SetDataContextSource(targetFE.GetVisualParent());
    } catch (err) {
        //ignore
    }
};
BindingExpressionBase.prototype._DataContextChanged = function (sender, e) {
    try {
        var fe = sender;
        this.GetPropertyPathWalker().Update(fe.GetDataContext());
        if (this.GetBinding().GetMode() === BindingMode.OneTime)
            this.Refresh();
    } catch (err) {
        Warn(err.message);
    }
};
BindingExpressionBase.prototype._PropertyPathValueChanged = function () {
    this.Refresh();
};
BindingExpressionBase.prototype.Refresh = function () {
    var dataError = null;
    var exception = null;

    if (!this.GetAttached())
        return;

    //TODO: ERROR/VALIDATION
    //var node = this.GetPropertyPathWalker().GetFinalNode();
    //var source = node.GetSource();
    //source = Nullstone.As(source, INotifyDataErrorInfo));
    //this._AttachToNotifyError(source);

    //source = Nullstone.As(node.GetSource(), IDataErrorInfo);
    //if (!this.GetUpdating() && this.GetBinding().GetValidatesOnDataErrors() && source != null && node.GetPropertyInfo() != null)
    //dataError = source[node.GetPropertyInfo().Name];

    var oldUpdating = this.GetUpdating();
    try {
        this.SetUpdating(true);
        this._Invalidate();
        this.GetTarget().SetValue(this.GetProperty(), this);
    } catch (err) {
        if (this.GetBinding().GetValidatesOnExceptions()) {
            exception = err;
            if (exception instanceof TargetInvocationException)
                exception = exception.InnerException;
        }
    } finally {
        this.SetUpdating(oldUpdating);
    }
    this._MaybeEmitError(dataError, exception);
};

//#region PROPERTIES

BindingExpressionBase.prototype.GetBinding = function () {
    /// <returns type="Binding"></returns>
    return this._Binding;
};

//NOT USED YET
BindingExpressionBase.prototype.GetCurrentError = function () {
    return this._CurrentError;
};
BindingExpressionBase.prototype.SetCurrentError = function (/* ValidationError */value) {
    this._CurrentError = value;
};

BindingExpressionBase.prototype.GetCurrentNotifyError = function () {
    return this._CurrentNotifyError;
};
BindingExpressionBase.prototype.SetCurrentNotifyError = function (/* INotifyDataErrorInfo */value) {
    this._CurrentNotifyError = value;
};
//NOT USED YET

BindingExpressionBase.prototype.GetDataContextSource = function () {
    /// <returns type="FrameworkElement"></returns>
    return this._DataContextSource;
};

BindingExpressionBase.prototype.GetDataSource = function () {
    return this.GetPropertyPathWalker().GetSource();
};

BindingExpressionBase.prototype.GetIsBoundToAnyDataContext = function () {
    return !this.GetBinding().GetElementName() && this.GetBinding().GetSource() == null;
};
BindingExpressionBase.prototype.GetIsSelfDataContextBound = function () {
    return this.GetIsBoundToAnyDataContext()
        && this.GetTarget() instanceof FrameworkElement
        && this.GetProperty() !== FrameworkElement.DataContextProperty;
};
BindingExpressionBase.prototype.GetIsParentDataContextBound = function () {
    return this.GetIsBoundToAnyDataContext()
        && this.GetTarget() instanceof FrameworkElement
        && (this.GetProperty() === FrameworkElement.DataContextProperty || this.GetProperty() === ContentPresenter.ContentProperty);
};
BindingExpressionBase.prototype.GetIsMentorDataContextBound = function () {
    return this.GetIsBoundToAnyDataContext()
        && !(this.GetTarget() instanceof FrameworkElement);
};

BindingExpressionBase.prototype.GetTarget = function () {
    /// <returns type="DependencyObject"></returns>
    return this._Target;
};
BindingExpressionBase.prototype.SetTarget = function (/* DependencyObject */value) {
    this._Target = value;
};

BindingExpressionBase.prototype.GetProperty = function () {
    /// <returns type="DependencyProperty"></returns>
    return this._Property;
};
BindingExpressionBase.prototype.SetProperty = function (/* DependencyProperty */value) {
    this._Property = value;
};

BindingExpressionBase.prototype.GetPropertyPathWalker = function () {
    /// <returns type="_PropertyPathWalker"></returns>
    return this._PropertyPathWalker;
};
BindingExpressionBase.prototype.SetPropertyPathWalker = function (/* _PropertyPathWalker */value) {
    this._PropertyPathWalker = value;
};

BindingExpressionBase.prototype.GetIsTwoWayTextBoxText = function () {
    return this.GetTarget() instanceof TextBox && this.GetProperty() === TextBox.TextProperty && this.GetBinding().GetMode() === BindingMode.TwoWay;
};

//#endregion

Nullstone.FinishCreate(BindingExpressionBase);
//#endregion