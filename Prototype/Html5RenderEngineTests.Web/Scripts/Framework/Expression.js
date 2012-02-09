/// <reference path="RefObject.js"/>
/// CODE
/// <reference path="DependencyProperty.js"/>
/// <reference path="ContentControl.js"/>
/// <reference path="PropertyPath.js"/>
/// <reference path="FrameworkElement.js"/>
/// <reference path="ContentPresenter.js"/>
/// <reference path="TextBox.js"/>
/// <reference path="RelativeSource.js"/>
/// <reference path="Binding.js"/>

var BindingMode = {
    TwoWay: 0,
    OneWay: 1,
    OneTime: 2,
    OneWayToSource: 3
};

var UpdateSourceTrigger = {
    Default: 0,
    Explicit: 3
};

//#region Expression

function Expression() {
    RefObject.call(this);
}
Expression.InheritFrom(RefObject);

Expression.prototype.GetValue = function (propd) {
    AbstractMethod("Expression.GetValue");
};
Expression.prototype._OnAttached = function (element) {
    ///<param name="element" type="DependencyObject"></param>
    this.SetAttached(true);
};
Expression.prototype._OnDetached = function (element) {
    this.SetAttached(false);
};

//#region PROPERTIES

Expression.prototype.GetAttached = function () {
    return this._Attached;
};
Expression.prototype.SetAttached = function (/* Boolean */value) {
    this._Attached = value;
};

Expression.prototype.GetUpdating = function () {
    return this._Updating;
};
Expression.prototype.SetUpdating = function (/* Boolean */value) {
    this._Updating = value;
};

//#endregion

//#endregion

//#region BindingExpressionBase

function BindingExpressionBase(binding, target, propd) {
    Expression.call(this);

    if (!binding)
        return;

    this._Cached = false;
    this._CachedValue = null;

    this._Binding = binding;
    this.SetTarget(target);
    this.SetProperty(propd);

    var bindsToView = propd === FrameworkElement.DataContextProperty; //TODO: || propd.GetTargetType() === IEnumerable || propd.GetTargetType() === ICollectionView
    this._SetPropertyPathWalker(new _PropertyPathWalker(binding.GetPath().GetParsePath(), binding.GetBindsDirectlyToSource(), bindsToView, this.GetIsBoundToAnyDataContext()));
    if (binding.Mode !== BindingMode.OneTime) {
        var walker = this.GetPropertyPathWalker();
        walker.IsBrokenChanged.Subscribe(this, this._PropertyPathValueChanged);
        walker.ValueChanged.Subscribe(this, this._PropertyPathValueChanged);
    }
}
BindingExpressionBase.InheritFrom(Expression);

BindingExpressionBase.prototype.GetValue = function (propd) {
    if (this._Cached)
        return this._CachedValue;

    this._Cached = true;
    if (this.GetPropertyPathWalker().GetIsPathBroken()) {
        this._CachedValue = null;
    } else {
        this._CachedValue = this.GetPropertyPathWalker().GetValue();
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
    Expression.prototype._OnAttached.call(this, element);
    this._CalculateDataSource();

    if (this.GetIsTwoWayTextBoxText())
        this.GetTarget().LostFocus.Subscribe(this._TextBoxLostFocus, this);

    var targetFE = RefObject.As(element, FrameworkElement);
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

    Expression.prototype._OnDetached.call(this, element);
    if (this.GetIsTwoWayTextBoxText())
        this.GetTarget().LostFocus.Unsubscribe(this._TextBoxLostFocus, this);

    var targetFE = RefObject.As(element, FrameworkElement);
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
BindingExpressionBase.prototype._MaybeEmitError = function (dataError, exception) {
    NotImplemented("BindingExpressionBase._MaybeEmitError");
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
    NotImplemented("BindingExpressionBase._ConvertToType");
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
        var feTarget = RefObject.As(this.GetTarget(), FrameworkElement);
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
        var fe = RefObject.As(this.GetTarget(), FrameworkElement);
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
    var fe = RefObject.As(this.GetTarget(), FrameworkElement);
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
        //ignore
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
    //source = RefObject.As(source, INotifyDataErrorInfo));
    //this._AttachToNotifyError(source);

    //source = RefObject.As(node.GetSource(), IDataErrorInfo);
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

//#endregion

//#region BindingExpression

function BindingExpression(binding, target, propd) {
    BindingExpressionBase.call(this, binding, target, propd);
}
BindingExpression.InheritFrom(BindingExpressionBase);

BindingExpression.prototype.GetParentBinding = function () {
    return this.GetBinding();
};
BindingExpression.prototype.GetDataItem = function () {
    return this.GetDataSource();
};
BindingExpression.prototype.UpdateSource = function () {
    return this._UpdateSourceObject(undefined, true);
};

//#endregion

//#region BindingOperations

function BindingOperations() {
    RefObject.call(this);
}
BindingOperations.InheritFrom(RefObject);

BindingOperations.SetBinding = function (/* DependencyObject */target, /* DependencyProperty */dp, /* BindingBase */binding) {
    if (target == null)
        throw new ArgumentNullException("target");
    if (dp == null)
        throw new ArgumentNullException("dp");
    if (binding == null)
        throw new ArgumentNullException("binding");

    var e = new BindingExpression(binding, target, dp);
    target.SetValue(dp, e);
    return e;
};

//#endregion

//#region TemplateBindingExpression

function TemplateBindingExpression(sourcePropd, targetPropd) {
    Expression.call(this);
    this.SourceProperty = sourcePropd;
    this.TargetProperty = targetPropd;
}
TemplateBindingExpression.InheritFrom(Expression);

TemplateBindingExpression.prototype.GetValue = function (propd) {
    var source = this.Target.GetTemplateOwner();
    var value = null;
    if (source != null)
        value = source.GetValue(this.SourceProperty);
    return value; //TODO: Send through TypeConverter
};
TemplateBindingExpression.prototype._OnAttached = function (element) {
    Expression.prototype._OnAttached.call(this, element);

    this.Target = element;
    var listener = this.GetListener();
    if (listener != null) {
        listener.Detach();
        listener = null;
        this.SetListener(listener);
    }

    var c = RefObject.As(this.Target, ContentControl);
    if (this.TargetProperty === ContentControl.ContentProperty && c != null) {
        this.SetsParent = c._ContentSetsParent;
        c._ContentSetsParent = false;
    }

    var source = this.Target.GetTemplateOwner();
    if (source != null) {
        listener = new PropertyChangedListener(source, this.SourceProperty, this, this.OnPropertyChanged);
        this.SetListener(listener);
    }
};
TemplateBindingExpression.prototype._OnDetached = function (element) {
    Expression.prototype._OnDetached.call(this, element);

    var listener = this.GetListener();
    if (listener == null)
        return;

    var c = RefObject.As(this.Target, ContentControl);
    if (c != null)
        c._ContentSetsParent = this.SetsParent;

    listener.Detach();
    listener = null;
    this.SetListener(listener);
    this.Target = null;
};
TemplateBindingExpression.prototype.OnPropertyChanged = function (sender, args) {
    try {
        // Type converting doesn't happen for TemplateBindings
        this.SetUpdating(true);
        try {
            this.Target.SetValue(this.TargetProperty, this.GetValue(null));
        } catch (err2) {
            this.Target.SetValue(this.TargetProperty, this.TargetProperty.GetDefaultValue(this.Target));
        }
    } catch (err) {

    } finally {
        this.SetUpdating(false);
    }
};

TemplateBindingExpression.prototype.GetListener = function () {
    return this._Listener;
};
TemplateBindingExpression.prototype.SetListener = function (/* PropertyChangedListener */value) {
    this._Listener = value;
};

//#endregion