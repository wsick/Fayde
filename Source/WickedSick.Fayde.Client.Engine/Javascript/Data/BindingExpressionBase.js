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
    this.SetTarget(target);
    this.SetProperty(propd);

    var bindsToView = propd._ID === FrameworkElement.DataContextProperty._ID; //TODO: || propd.GetTargetType() === IEnumerable || propd.GetTargetType() === ICollectionView
    this.SetPropertyPathWalker(new _PropertyPathWalker(binding.GetPath().GetParsePath(), binding.GetBindsDirectlyToSource(), bindsToView, this.GetIsBoundToAnyDataContext()));
    if (binding.GetMode() !== BindingMode.OneTime) {
        var walker = this.GetPropertyPathWalker();
        walker.IsBrokenChanged.Subscribe(this._PropertyPathValueChanged, this);
        walker.ValueChanged.Subscribe(this._PropertyPathValueChanged, this);
    }
};

BindingExpressionBase.Instance.GetValue = function (propd) {
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

BindingExpressionBase.Instance._OnAttached = function (element) {
    ///<param name="element" type="DependencyObject"></param>
    if (this.GetAttached())
        return;
    this._OnAttached$Expression(element);
    this._CalculateDataSource();

    if (this.GetIsTwoWayTextBoxText())
        this.GetTarget().LostFocus.Subscribe(this._TextBoxLostFocus, this);

    var targetFE = Nullstone.As(element, FrameworkElement);
    if (this.GetBinding().GetMode() === BindingMode.TwoWay && this.GetProperty()._IsCustom) {
        var updateDataSourceCallback = function () {
            try {
                if (!this.GetUpdating())
                    this._TryUpdateSourceObject(this.GetTarget().$GetValue(this.GetProperty()));
            } catch (err) {
                //ignore
            }
        };
        this._PropertyListener = new PropertyChangedListener(this.GetTarget(), this.GetProperty(), this, updateDataSourceCallback);
    }
};
BindingExpressionBase.Instance._OnDetached = function (element) {
    ///<param name="element" type="DependencyObject"></param>
    if (!this.GetAttached())
        return;

    this._OnDetached$Expression(element);
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

    if (!targetFE)
        targetFE = this.GetTarget().GetMentor();

    if (targetFE && this.GetCurrentError() != null) {
        //TODO: Validation.RemoveError(targetFE, this.GetCurrentError());
        this.SetCurrentError(null);
    }

    if (this._PropertyListener) {
        this._PropertyListener.Detach();
        this._PropertyListener = null;
    }
    this.GetPropertyPathWalker().Update(null);
};

BindingExpressionBase.Instance._TextBoxLostFocus = function () {
    this._UpdateSourceObject();
};
BindingExpressionBase.Instance._TryUpdateSourceObject = function (value) {
    if (!this.GetUpdating() && this.GetBinding().GetUpdateSourceTrigger() === UpdateSourceTrigger.Default) {
        this._UpdateSourceObject(value, false);
    }
};
BindingExpressionBase.Instance._UpdateSourceObject = function (value, force) {
    if (value === undefined)
        value = GetTarget().$GetValue(GetProperty());
    if (force === undefined)
        force = false;
    if (this.GetBinding().Mode !== BindingMode.TwoWay)
        return;

    var dataError;
    var exception;
    var oldUpdating = this.GetUpdating();
    var node = this.GetPropertyPathWalker().GetFinalNode();

    try {
        // If the user calls BindingExpresion.UpdateSource (), we must update regardless of focus state.
        // Otherwise we only update if the textbox is unfocused.
        //TODO: FocusManager
        //if (!force && this.GetIsTwoWayTextBoxText() && Nullstone.RefEquals(FocusManager.GetFocusedElement(), this.GetTarget()))
        //return;

        if (this.GetPropertyPathWalker().GetFinalNode().GetIsPathBroken())
            return;

        if (this.GetBinding().GetTargetNullValue()) {
            try {
                if (Nullstone.RefEquals(this.GetBinding().GetTargetNullValue(), value))
                    value = null;
            } catch (err) {
                //ignore
            }
        }

        var converter = this.GetBinding().GetConverter();
        if (converter) {
            value = converter.ConvertBack(value, node.GetValueType(), this.GetBinding().GetConverterParameter(), /* TODO: Culture */null);
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
        //if (this.GetBinding().GetValidatesOnDataErrors() && !exception && node.GetSource().DoesImplement(IDataErrorInfo) && node.GetPropertyInfo() != null) {
        //dataError = node.GetSource()[node.GetPropertyInfo().Name];
        //}
    }
    this._MaybeEmitError(dataError, exception);
};
BindingExpressionBase.Instance._MaybeEmitError = function (message, exception) {
    /// <param name="message" type="String"></param>
    /// <param name="exception" type="Exception"></param>
    var fe = Nullstone.As(this.GetTarget(), FrameworkElement);
    if (!fe)
        fe = this.GetTarget().GetMentor();
    if (!fe)
        return;

    if (String.isString(message) && message === "")
        message = null;

    var oldError = this.GetCurrentError();
    if (message != null)
        this.SetCurrentError(new ValidationError(message, null));
    else if (exception)
        this.SetCurrentError(new ValidationError(null, exception));
    else
        this.SetCurrentError(null);

    if (oldError && this.GetCurrentError()) {
        Validation.AddError(fe, this.GetCurrentError());
        Validation.RemoveError(fe, oldError);
        if (this.GetBinding().GetNotifyOnValidationError()) {
            fe.RaiseBindingValidationError(new ValidationErrorEventArgs(ValidationErrorEventAction.Removed, oldError));
            fe.RaiseBindingValidationError(new ValidationErrorEventArgs(ValidationErrorEventAction.Added, this.GetCurrentError()));
        }
    } else if (oldError) {
        Validation.RemoveError(fe, oldError);
        if (this.GetBinding().GetNotifyOnValidationError())
            fe.RaiseBindingValidationError(new ValidationErrorEventArgs(ValidationErrorEventAction.Removed, oldError));
    } else if (this.GetCurrentError()) {
        Validation.AddError(fe, this.GetCurrentError());
        if (this.GetBinding().GetNotifyOnValidationError())
            fe.RaiseBindingValidationError(new ValidationErrorEventArgs(ValidationErrorEventAction.Added, this.GetCurrentError()));
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
        if (!this.GetPropertyPathWalker().GetIsPathBroken() && this.GetBinding().GetConverter()) {
            value = this.GetBinding().GetConverter().Convert(value, this.GetProperty().GetTargetType(), this.GetBinding().GetConverterParameter(), {});
        }
        if (value === DependencyProperty.UnsetValue || this.GetPropertyPathWalker().GetIsPathBroken()) {
            value = this.GetBinding().GetFallbackValue();
            if (value === undefined)
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
    if (this.GetBinding().GetSource()) {
        this.GetPropertyPathWalker().Update(this.GetBinding().GetSource());
    } else if (this.GetBinding().GetElementName() != null) {
        source = this._FindSourceByElementName();
        var feTarget = Nullstone.As(this.GetTarget(), FrameworkElement);
        if (!feTarget)
            feTarget = this.GetTarget().GetMentor();
        if (!feTarget) {
            this.GetTarget().MentorChanged.Subscribe(this._InvalidateAfterMentorChanged, this);
        } else {
            feTarget.Loaded.Subscribe(this._HandleFeTargetLoaded, this);
        }
        this.GetPropertyPathWalker().Update(source);
    } else if (this.GetBinding().GetRelativeSource() && this.GetBinding().GetRelativeSource().GetMode() === RelativeSourceMode.Self) {
        this.GetPropertyPathWalker().Update(this.GetTarget());
    } else {
        var fe = Nullstone.As(this.GetTarget(), FrameworkElement);
        var propd = this.GetProperty();
        if (fe && (propd._ID === FrameworkElement.DataContextProperty._ID || propd._ID === ContentPresenter.ContentProperty._ID)) {
            fe.VisualParentChanged.Subscribe(this._ParentChanged, this);
            fe = fe.GetVisualParent();
            this.SetDataContextSource(fe);
        } else {
            if (!fe) {
                this.GetTarget().MentorChanged.Subscribe(this._MentorChanged, this);
                fe = this.GetTarget().GetMentor();
            }

            if (fe && this.GetBinding().GetRelativeSource() && this.GetBinding().GetRelativeSource().GetMode() === RelativeSourceMode.TemplatedParent) {
                this.GetPropertyPathWalker().Update(fe.TemplateOwner);
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

    if (this._DataContextSource || this.GetIsMentorDataContextBound())
        this.GetPropertyPathWalker().Update(!this._DataContextSource ? null : this._DataContextSource.DataContext);
};
BindingExpressionBase.Instance._InvalidateAfterMentorChanged = function (sender, e) {
    ///<param name="e" type="EventArgs"></param>
    this.GetTarget().MentorChanged.Unsubscribe(this._InvalidateAfterMentorChanged, this);
    var source = this._FindSourceByElementName();
    if (!source) {
        this.GetTarget().GetMentor().Loaded.Subscribe(this._HandleFeTargetLoaded, this);
    } else {
        this.GetPropertyPathWalker().Update(source);
    }

    this._Invalidate();
    this.GetTarget().$SetValue(this.GetProperty(), this);
};
BindingExpressionBase.Instance._HandleFeTargetLoaded = function (sender, e) {
    var fe = sender;
    fe.Loaded.Unsubscribe(this._HandleFeTargetLoaded, this);

    var source = this._FindSourceByElementName();
    if (source)
        this.GetPropertyPathWalker().Update(source);

    this._Invalidate();
    this.GetTarget().$SetValue(this.GetProperty(), this);
};
BindingExpressionBase.Instance._FindSourceByElementName = function () {
    var source;
    var fe = Nullstone.As(this.GetTarget(), FrameworkElement);
    if (!fe)
        fe = this.GetTarget().GetMentor();
    while (fe && !source) {
        source = fe.FindName(this.GetBinding().GetElementName());
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
        var mentor = this.GetTarget().GetMentor();
        if (this.GetBinding().GetRelativeSource() && this.GetBinding().GetRelativeSource().GetMode() === RelativeSourceMode.TemplatedParent) {
            if (!mentor)
                this.GetPropertyPathWalker().Update(null);
            else
                this.GetPropertyPathWalker().Update(mentor.TemplateOwner);
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
        var targetFE = this.GetTarget();
        this.SetDataContextSource(targetFE.GetVisualParent());
    } catch (err) {
        //ignore
    }
};
BindingExpressionBase.Instance._DataContextChanged = function (sender, e) {
    try {
        var fe = sender;
        this.GetPropertyPathWalker().Update(fe.DataContext);
        if (this.GetBinding().GetMode() === BindingMode.OneTime)
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

    if (!this.GetAttached())
        return;

    //TODO: ERROR/VALIDATION
    //var node = this.GetPropertyPathWalker().GetFinalNode();
    //var source = node.GetSource();
    //source = Nullstone.As(source, INotifyDataErrorInfo));
    //this._AttachToNotifyError(source);

    //source = Nullstone.As(node.GetSource(), IDataErrorInfo);
    //if (!this.GetUpdating() && this.GetBinding().GetValidatesOnDataErrors() && source && node.GetPropertyInfo())
    //dataError = source[node.GetPropertyInfo().Name];

    var oldUpdating = this.GetUpdating();
    try {
        this.SetUpdating(true);
        this._Invalidate();
        this.GetTarget().$SetValue(this.GetProperty(), this);
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

//#region Properties

BindingExpressionBase.Instance.GetBinding = function () {
    /// <returns type="Binding"></returns>
    return this._Binding;
};

//NOT USED YET
BindingExpressionBase.Instance.GetCurrentError = function () {
    /// <returns type="ValidationError" />
    return this._CurrentError;
};
BindingExpressionBase.Instance.SetCurrentError = function (value) {
    /// <param name="value" type="ValidationError"></param>
    this._CurrentError = value;
};

BindingExpressionBase.Instance.GetCurrentNotifyError = function () {
    /// <returns type="INotifyDataErrorInfo" />
    return this._CurrentNotifyError;
};
BindingExpressionBase.Instance.SetCurrentNotifyError = function (value) {
    /// <param name="value" type="INotifyDataErrorInfo"></param>
    this._CurrentNotifyError = value;
};
//NOT USED YET

BindingExpressionBase.Instance.GetDataContextSource = function () {
    /// <returns type="FrameworkElement"></returns>
    return this._DataContextSource;
};

BindingExpressionBase.Instance.GetDataSource = function () {
    return this.GetPropertyPathWalker().GetSource();
};

BindingExpressionBase.Instance.GetIsBoundToAnyDataContext = function () {
    return !this.GetBinding().GetElementName() && !this.GetBinding().GetSource();
};
BindingExpressionBase.Instance.GetIsSelfDataContextBound = function () {
    return this.GetIsBoundToAnyDataContext()
        && this.GetTarget() instanceof FrameworkElement
        && this.GetProperty() !== FrameworkElement.DataContextProperty;
};
BindingExpressionBase.Instance.GetIsParentDataContextBound = function () {
    return this.GetIsBoundToAnyDataContext()
        && this.GetTarget() instanceof FrameworkElement
        && (this.GetProperty() === FrameworkElement.DataContextProperty || this.GetProperty() === ContentPresenter.ContentProperty);
};
BindingExpressionBase.Instance.GetIsMentorDataContextBound = function () {
    return this.GetIsBoundToAnyDataContext()
        && !(this.GetTarget() instanceof FrameworkElement);
};

BindingExpressionBase.Instance.GetTarget = function () {
    /// <returns type="DependencyObject"></returns>
    return this._Target;
};
BindingExpressionBase.Instance.SetTarget = function (value) {
    /// <param name="value" type="DependencyObject"></param>
    this._Target = value;
};

BindingExpressionBase.Instance.GetProperty = function () {
    /// <returns type="DependencyProperty"></returns>
    return this._Property;
};
BindingExpressionBase.Instance.SetProperty = function (value) {
    /// <param name="value" type="DependencyProperty"></param>
    this._Property = value;
};

BindingExpressionBase.Instance.GetPropertyPathWalker = function () {
    /// <returns type="_PropertyPathWalker"></returns>
    return this._PropertyPathWalker;
};
BindingExpressionBase.Instance.SetPropertyPathWalker = function (value) {
    /// <param name="value" type="_PropertyPathWalker"></param>
    this._PropertyPathWalker = value;
};

BindingExpressionBase.Instance.GetIsTwoWayTextBoxText = function () {
    return this.GetTarget() instanceof TextBox && this.GetProperty() === TextBox.TextProperty && this.GetBinding().GetMode() === BindingMode.TwoWay;
};

//#endregion

Nullstone.FinishCreate(BindingExpressionBase);
//#endregion