function BindingBase() {
    RefObject.call(this);
}
BindingBase.InheritFrom(RefObject);
BindingBase.prototype.CheckSealed = function () {
    if (this.GetSealed())
        throw new InvalidOperationException("The Binding cannot be changed after it has been used.");
};
BindingBase.prototype.Seal = function () {
    this.SetSealed(true);
};
BindingBase.prototype.GetFallbackValue = function () {
    return this._FallbackValue;
};
BindingBase.prototype.SetFallbackValue = function (value) {
    this.CheckSealed();
    this._FallbackValue = value;
};
BindingBase.prototype.GetSealed = function () {
    return this._Sealed;
};
BindingBase.prototype.SetSealed = function (value) {
    this._Sealed = value;
};
BindingBase.prototype.GetStringFormat = function () {
    return this._StringFormat;
};
BindingBase.prototype.SetStringFormat = function (value) {
    this.CheckSealed();
    this._StringFormat = value;
};
BindingBase.prototype.GetTargetNullValue = function () {
    return this._TargetNullValue;
};
BindingBase.prototype.SetTargetNullValue = function (value) {
    this.CheckSealed();
    this._TargetNullValue = value;
};

function CurrentChangedListener(source, closure, func) {
    RefObject.call(this);
    if (!source)
        return;
    this._Source = source;
    this._Closure = closure;
    this._Func = func;
    this._Source.CurrentChanged.Subscribe(this, this.OnCurrentChangedInternal);
}
CurrentChangedListener.InheritFrom(RefObject);
CurrentChangedListener.prototype.Detach = function () {
    if (this._Source != null) {
        this._Source.CurrentChanged.Unsubscribe(this, this.OnCurrentChangedInternal);
        this._Source = null;
        this._Closure = null;
        this._Func = null;
    }
};
CurrentChangedListener.prototype.OnCurrentChangedInternal = function (s, e) {
    if (this._Closure != null && this._Func != null)
        this._Func.call(this._Closure, s, e);
};

var RelativeSourceMode = {
    TemplatedParent: 1,
    Self: 2
};
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
var _PropertyNodeType = {
    AttachedProperty: 0,
    Property: 1,
    Indexed: 2,
    None: 3
};

function NPCListener(source, closure, func) {
    RefObject.call(this);
    this._Source = source;
    this._Closure = closure;
    this._Func = func;
    if (this._Source)
        this._Source.PropertyChanged.Subscribe(this._Func, this._Closure);
}
NPCListener.InheritFrom(RefObject);
NPCListener.prototype.Detach = function () {
    this._Source.PropertyChanged.Unsubscribe(this._Closure, this._Func);
};

function PropertyChangedListener(source, propd, closure, func) {
    RefObject.call(this);
    if (!source)
        return;
    this._Source = source;
    this._Property = propd;
    this._Closure = closure;
    this._Func = func;
    this._Source.PropertyChanged.Subscribe(this.OnPropertyChangedInternal, this);
}
PropertyChangedListener.InheritFrom(RefObject);
PropertyChangedListener.prototype.Detach = function () {
    if (this._Source != null) {
        this._Source.PropertyChanged.Unsubscribe(this, this.OnPropertyChangedInternal);
        this._Source = null;
        this._Closure = null;
        this._Func = null;
    }
};
PropertyChangedListener.prototype.OnPropertyChangedInternal = function (s, e) {
    if (e.Property !== this._Property)
        return;
    if (this._Closure != null && this._Func != null)
        this._Func.call(this._Closure, s, e);
};

function _PropertyPath(path, expandedPath) {
    RefObject.call(this);
    this._Path = path;
    this._ExpandedPath = expandedPath;
}
_PropertyPath.InheritFrom(RefObject);
_PropertyPath.CreateFromParameter = function (parameter) {
    var p = new _PropertyPath();
    p._Propd = RefObject.As(parameter, DependencyProperty);
    p._Path = null;
    if (parameter instanceof String)
        p._Path = parameter;
    return p;
};
_PropertyPath.prototype.HasDependencyProperty = function () {
    return this._Propd != null;
};
_PropertyPath.prototype.GetDP = function () {
    return this._Propd;
};
_PropertyPath.prototype.GetPath = function () {
    return this._Propd == null ? this._Path : "(0)";
};
_PropertyPath.prototype.GetExpandedPath = function () {
    return this._Propd == null ? this._ExpandedPath : "(0)";
};
_PropertyPath.prototype.GetParsePath = function () {
    if (this._Propd != null)
        return "(0)";
    if (this._ExpandedPath != null)
        return this._ExpandedPath;
    return this._Path;
};

function _PropertyPathParser(path) {
    RefObject.call(this);
    this.SetPath(path);
}
_PropertyPathParser.InheritFrom(RefObject);
_PropertyPathParser.prototype.Step = function (data) {
    var type = _PropertyNodeType.None;
    if (this.GetPath().length === 0) {
        data.typeName = null;
        data.propertyName = null;
        data.index = null;
        return type;
    }
    var end;
    if (this.GetPath().charAt(0) === '(') {
        type = _PropertyNodeType.AttachedProperty;
        end = this.GetPath().indexOf(')');
        if (end === -1)
            throw new ArgumentException("Invalid property path. Attached property is missing the closing bracket");
        var splitIndex;
        var tickOpen = this.GetPath().indexOf('\'');
        var tickClose = 0;
        var typeOpen;
        var typeClose;
        var propOpen;
        var propClose;
        typeOpen = this.GetPath().indexOf('\'');
        if (typeOpen > 0) {
            typeOpen++;
            typeClose = this.GetPath().indexOf('\'', typeOpen + 1);
            if (typeClose < 0)
                throw new Exception("Invalid property path, Unclosed type name '" + this.GetPath() + "'.");
            propOpen = this.GetPath().indexOf('.', typeClose);
            if (propOpen < 0)
                throw new Exception("Invalid properth path, No property indexer found '" + this.GetPath() + "'.");
            propOpen++;
        } else {
            typeOpen = 1;
            typeClose = this.GetPath().indexOf('.', typeOpen);
            if (typeClose < 0)
                throw new Exception("Invalid property path, No property indexer found on '" + this.GetPath() + "'.");
            propOpen = typeClose + 1;
        }
        propClose = end;
        data.typeName = this.GetPath().slice(typeOpen, typeClose);
        data.propertyName = this.GetPath().slice(propOpen, propClose);
        data.index = null;
        if (this.GetPath().length > (end + 1) && this.GetPath().charAt(end + 1) === '.')
            end++;
        this.SetPath(this.GetPath().substr(end + 1));
    } else if (this.GetPath().charAt(0) === '[') {
        type = _PropertyNodeType.Indexed;
        end = this.GetPath().indexOf(']');
        data.typeName = null;
        data.propertyName = null;
        data.index = this.GetPath().substr(1, end - 1);
        this.SetPath(this.GetPath().substr(end + 1));
        if (this.GetPath().charAt(0) === '.')
            this.SetPath(this.GetPath().substr(1));
    } else {
        type = _PropertyNodeType.Property;
        end = this.GetPath().indexOfAny(['.', '[']);
        if (end === -1) {
            data.propertyName = this.GetPath();
            this.SetPath("");
        } else {
            data.propertyName = this.GetPath().substr(0, end);
            if (this.GetPath().charAt(end) === '.')
                this.SetPath(this.GetPath().substr(end + 1));
            else
                this.SetPath(this.GetPath().substr(end));
        }
        data.typeName = null;
        data.index = null;
    }
    return type;
};
_PropertyPathParser.prototype.GetPath = function () {
    return this._Path;
};
_PropertyPathParser.prototype.SetPath = function (value) {
    this._Path = value;
};

function Binding(path) {
    BindingBase.call(this);
    if (!path)
        path = "";
    this.SetMode(BindingMode.OneWay);
    this.SetPath(new _PropertyPath(path));
    this.SetValidatesOnNotifyDataErrors(true);
    this.SetUpdateSourceTrigger(UpdateSourceTrigger.Default);
}
Binding.InheritFrom(BindingBase);
Binding.prototype.GetBindsDirectlyToSource = function () { return this._BindsDirectlyToSource; };
Binding.prototype.SetBindsDirectlyToSource = function (/* Boolean */value) { this.CheckSealed(); this._BindsDirectlyToSource = value; };
Binding.prototype.GetConverter = function () { return this._Converter; };
Binding.prototype.SetConverter = function (/* IValueConverter */value) { this.CheckSealed(); this._Converter = value; };
Binding.prototype.GetConverterCulture = function () { return this._ConverterCulture; };
Binding.prototype.SetConverterCulture = function (/* Culture */value) { this.CheckSealed(); this._ConverterCulture = value; };
Binding.prototype.GetConverterParameter = function () { return this._ConverterParameter; };
Binding.prototype.SetConverterParameter = function (/* Object */value) { this.CheckSealed(); this._ConverterParameter = value; };
Binding.prototype.GetElementName = function () { return this._ElementName; };
Binding.prototype.SetElementName = function (/* String */value) {
    this.CheckSealed();
    if (this.GetSource() != null || this.GetRelativeSource() != null)
        throw new InvalidOperationException("ElementName cannot be set if either RelativeSource or Source is set");
    this._ElementName = value;
};
Binding.prototype.GetMode = function () { return this._Mode; };
Binding.prototype.SetMode = function (/* Number */value) { this.CheckSealed(); this._Mode = value; };
Binding.prototype.GetNotifyOnValidationError = function () { return this._NotifyOnValidationError; };
Binding.prototype.SetNotifyOnValidationError = function (/* Boolean */value) { this.CheckSealed(); this._NotifyOnValidationError = value; };
Binding.prototype.GetRelativeSource = function () {
    return this._RelativeSource; 
 };
Binding.prototype.SetRelativeSource = function (/* RelativeSource */value) {
    this.CheckSealed();
    if (this.GetSource() != null || this.GetElementName() != null)
        throw new InvalidOperationException("RelativeSource cannot be set if either ElementName or Source is set");
    this._RelativeSource = value;
};
Binding.prototype.GetPath = function () { return this._Path; };
Binding.prototype.SetPath = function (/* PropertyPath */value) {
    this.CheckSealed();
    if (value.HasDependencyProperty())
        throw new ArgumentException("PropertyPaths which are instantiated with a DependencyProperty are not supported");
    this._Path = value;
};
Binding.prototype.GetSource = function () { return this._Source; };
Binding.prototype.SetSource = function (/* RefObject */value) {
    this.CheckSealed();
    if (this.GetElementName() != null || this.GetRelativeSource() != null)
        throw new InvalidOperationException("Source cannot be set if either ElementName or RelativeSource is set");
    this._Source = value; 
};
Binding.prototype.GetUpdateSourceTrigger = function () { return this._UpdateSourceTrigger; };
Binding.prototype.SetUpdateSourceTrigger = function (/* Number */value) { this.CheckSealed(); this._UpdateSourceTrigger = value; };
Binding.prototype.GetValidatesOnExceptions = function () { return this._ValidatesOnExceptions; };
Binding.prototype.SetValidatesOnExceptions = function (/* Boolean */value) { this.CheckSealed(); this._ValidatesOnExceptions = value; };
Binding.prototype.GetValidatesOnDataErrors = function () { return this._ValidatesOnDataErrors; };
Binding.prototype.SetValidatesOnDataErrors = function (/* Boolean */value) { this.CheckSealed(); this._ValidatesOnDataErrors = value; };
Binding.prototype.GetValidatesOnNotifyDataErrors = function () { return this._ValidatesOnNotifyDataErrors; };
Binding.prototype.SetValidatesOnNotifyDataErrors = function (/* Boolean */value) { this.CheckSealed(); this._ValidatesOnNotifyDataErrors = value; };

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
    this.SetPropertyPathWalker(new _PropertyPathWalker(binding.GetPath().GetParsePath(), binding.GetBindsDirectlyToSource(), bindsToView, this.GetIsBoundToAnyDataContext()));
    if (binding.GetMode() !== BindingMode.OneTime) {
        var walker = this.GetPropertyPathWalker();
        walker.IsBrokenChanged.Subscribe(this._PropertyPathValueChanged, this);
        walker.ValueChanged.Subscribe(this._PropertyPathValueChanged, this);
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
            }
        };
        this._PropertyListener = new PropertyChangedListener(this.GetTarget(), this.GetProperty(), this, updateDataSourceCallback);
    }
};
BindingExpressionBase.prototype._OnDetached = function (element) {
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
        if (this.GetPropertyPathWalker().GetFinalNode().GetIsPathBroken())
            return;
        if (this.GetBinding().GetTargetNullValue() != null) {
            try {
                if (RefObject.RefEquals(this.GetBinding().GetTargetNullValue(), value))
                    value = null;
            } catch (err) {
            }
        }
        var converter = this.GetBinding().GetConverter();
        if (converter != null) {
            value = converter.ConvertBack(value, node.GetValueType(), this.GetBinding().GetConverterParameter(), /* TODO: Culture */null);
        }
        if (value instanceof String) {
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
    NotImplemented("BindingExpressionBase._AttachToNotifyError");
};
BindingExpressionBase.prototype._NotifyErrorsChanged = function (o, e) {
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
    }
};
BindingExpressionBase.prototype._ParentChanged = function (sender, e) {
    try {
        var targetFE = this.GetTarget();
        this.SetDataContextSource(targetFE.GetVisualParent());
    } catch (err) {
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
BindingExpressionBase.prototype.GetBinding = function () {
    return this._Binding;
};
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
BindingExpressionBase.prototype.GetDataContextSource = function () {
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
    return this._Target;
};
BindingExpressionBase.prototype.SetTarget = function (/* DependencyObject */value) {
    this._Target = value;
};
BindingExpressionBase.prototype.GetProperty = function () {
    return this._Property;
};
BindingExpressionBase.prototype.SetProperty = function (/* DependencyProperty */value) {
    this._Property = value;
};
BindingExpressionBase.prototype.GetPropertyPathWalker = function () {
    return this._PropertyPathWalker;
};
BindingExpressionBase.prototype.SetPropertyPathWalker = function (/* _PropertyPathWalker */value) {
    this._PropertyPathWalker = value;
};
BindingExpressionBase.prototype.GetIsTwoWayTextBoxText = function () {
    return this.GetTarget() instanceof TextBox && this.GetProperty() === TextBox.TextProperty && this.GetBinding().GetMode() === BindingMode.TwoWay;
};

function CollectionViewSource() {
    DependencyObject.call(this);
}
CollectionViewSource.InheritFrom(DependencyObject);
CollectionViewSource.SourceProperty = DependencyProperty.Register("Source", function () { return RefObject; }, CollectionViewSource);
CollectionViewSource.prototype.GetSource = function () {
    return this.GetValue(CollectionViewSource.SourceProperty);
};
CollectionViewSource.prototype.SetSource = function (value) {
    this.SetValue(CollectionViewSource.SourceProperty, value);
};
CollectionViewSource.ViewProperty = DependencyProperty.Register("View", function () { return ICollectionView; }, CollectionViewSource);
CollectionViewSource.prototype.GetView = function () {
    return this.GetValue(CollectionViewSource.ViewProperty);
};
CollectionViewSource.prototype.SetView = function (value) {
    this.SetValue(CollectionViewSource.ViewProperty, value);
};

function ICollectionView() {
    RefObject.call(this);
    this.CurrentChanged = new MulticastEvent();
}
ICollectionView.InheritFrom(RefObject);

function INotifyPropertyChanged() {
    RefObject.call(this);
    this.PropertyChanged = new MulticastEvent();
}
INotifyPropertyChanged.InheritFrom(RefObject);
INotifyPropertyChanged.prototype.RaisePropertyChanged = function (propertyName) {
    this.PropertyChanged.Raise(this, new PropertyChangedEventArgs(propertyName));
};

function PropertyChangedEventArgs() {
    EventArgs.call(this);
}
PropertyChangedEventArgs.InheritFrom(EventArgs);
PropertyChangedEventArgs.prototype.GetPropertyName = function () {
    return this._PropertyName;
};
PropertyChangedEventArgs.prototype.SetPropertyName = function (value) {
    this._PropertyName = value;
};

function _PropertyPathNode() {
    RefObject.call(this);
    this.SetIsBroken(true);
    this.IsBrokenChanged = new MulticastEvent();
    this.ValueChanged = new MulticastEvent();
}
_PropertyPathNode.InheritFrom(RefObject);
_PropertyPathNode.prototype.OnSourceChanged = function (oldSource, newSource) {
};
_PropertyPathNode.prototype.OnSourcePropertyChanged = function (o, e) {
};
_PropertyPathNode.prototype.UpdateValue = function () {
    AbstractMethod("_PropertyPathNode.UpdateValue");
};
_PropertyPathNode.prototype.SetValue = function (value) {
    AbstractMethod("_PropertyPathNode.SetValue");
};
_PropertyPathNode.prototype.SetSource = function (value) {
    if (value == null || !RefObject.Equals(value, this._Source)) {
        var oldSource = this._Source;
        var listener = this.GetListener();
        if (listener != null) {
            listener.Detach();
            listener = null;
            this.SetListener(listener);
        }
        this._Source = value;
        if (this._Source != null && this._Source instanceof RefObject && this._Source.DoesImplement(INotifyPropertyChanged)) {
            listener = new NPCListener(this._Source, this, this.OnSourcePropertyChanged);
            this.SetListener(listener);
        }
        this.OnSourceChanged(oldSource, this._Source);
        this.UpdateValue();
        if (this.GetNext() != null)
            this.GetNext().SetSource(this._Value);
    }
};
_PropertyPathNode.prototype._UpdateValueAndIsBroken = function (newValue, isBroken) {
    var emitBrokenChanged = this.GetIsBroken() !== isBroken;
    var emitValueChanged = !RefObject.Equals(this.GetValue(), newValue);
    this.SetIsBroken(isBroken);
    this._Value = newValue;
    if (emitValueChanged) {
        this.ValueChanged.Raise(this, new EventArgs());
    } else if (emitBrokenChanged) {
        this.IsBrokenChanged.Raise(this, new EventArgs());
    }
};
_PropertyPathNode.prototype._CheckIsBroken = function () {
    return this.GetSource() == null || (this.GetPropertyInfo() == null && this.GetDependencyProperty() == null);
};
_PropertyPathNode.prototype.GetIsBroken = function () {
    return this._IsBroken;
};
_PropertyPathNode.prototype.SetIsBroken = function (value) {
    this._IsBroken = value;
};
_PropertyPathNode.prototype.GetDependencyProperty = function () {
    return this._DependencyProperty;
};
_PropertyPathNode.prototype.SetDependencyProperty = function (value) {
    this._DependencyProperty = value;
};
_PropertyPathNode.prototype.GetNext = function () {
    return this._Next;
};
_PropertyPathNode.prototype.SetNext = function (value) {
    this._Next = value;
};
_PropertyPathNode.prototype.GetPropertyInfo = function () {
    return this._PropertyInfo;
};
_PropertyPathNode.prototype.SetPropertyInfo = function (value) {
    this._PropertyInfo = value;
};
_PropertyPathNode.prototype.GetListener = function () {
    return this._Listener;
};
_PropertyPathNode.prototype.SetListener = function (value) {
    this._Listener = value;
};
_PropertyPathNode.prototype.GetSource = function () {
    return this._Source;
};
_PropertyPathNode.prototype.GetValue = function () {
    return this._Value;
};
_PropertyPathNode.prototype.GetValueType = function () {
    return this._ValueType;
};
_PropertyPathNode.prototype.SetValueType = function (value) {
    this._ValueType = value;
};

function _PropertyPathWalker(path, bindDirectlyToSource, bindsToView, isDataContextBound) {
    RefObject.call(this);
    if (bindDirectlyToSource == null)
        bindDirectlyToSource = true;
    if (bindsToView == null)
        bindsToView = false;
    if (isDataContextBound == null)
        isDataContextBound = false;
    this.IsBrokenChanged = new MulticastEvent();
    this.ValueChanged = new MulticastEvent();
    this._Init(path, bindDirectlyToSource, bindsToView, isDataContextBound);
}
_PropertyPathWalker.InheritFrom(RefObject);
_PropertyPathWalker.prototype._Init = function (path, bindDirectlyToSource, bindsToView, isDataContextBound) {
    this.SetPath(path);
    this.SetIsDataContextBound(isDataContextBound);
    var lastCVNode = null;
    if (!path || path === ".") {
        lastCVNode = new _CollectionViewNode(bindDirectlyToSource, bindsToView);
        this.SetNode(lastCVNode);
        this.SetFinalNode(lastCVNode);
    } else {
        var data = {
            typeName: undefined,
            propertyName: undefined,
            index: undefined
        };
        var type;
        var parser = new _PropertyPathParser(path);
        while ((type = parser.Step(data)) !== _PropertyNodeType.None) {
            var isViewProperty = false;
            var node = new _CollectionViewNode(bindDirectlyToSource, isViewProperty);
            lastCVNode = node;
            switch (type) {
                case _PropertyNodeType.AttachedProperty:
                case _PropertyNodeType.Property:
                    node.SetNext(new _StandardPropertyPathNode(data.typeName, data.propertyName));
                    break;
                case _PropertyNodeType.Indexed:
                    node.SetNext(new _IndexedPropertyPathNode(data.index));
                    break;
                default:
                    break;
            }
            if (this.GetFinalNode() != null)
                this.GetFinalNode().SetNext(node);
            else
                this.SetNode(node);
            this.SetFinalNode(node.GetNext());
        }
    }
    lastCVNode.SetBindToView(lastCVNode.GetBindToView() || bindsToView);
    this.GetFinalNode().IsBrokenChanged.Subscribe(function (s, a) {
        this.SetValueInternal(RefObject.As(s, _PropertyPathNode).GetValue());
        this.IsBrokenChanged.Raise(this, new EventArgs());
    },
    this);
    this.GetFinalNode().ValueChanged.Subscribe(function (s, a) {
        this.SetValueInternal(RefObject.As(s, _PropertyPathNode).GetValue());
        this.ValueChanged.Raise(this, new EventArgs());
    },
    this);
};
_PropertyPathWalker.prototype.GetValue = function (item) {
    this.Update(item);
    var o = this.GetFinalNode().GetValue();
    this.Update(null);
    return o;
};
_PropertyPathWalker.prototype.Update = function (source) {
    this.SetSource(source);
    this.GetNode().SetSource(source);
};
_PropertyPathWalker.prototype.GetSource = function () {
    return this._Source;
};
_PropertyPathWalker.prototype.SetSource = function (value) {
    this._Source = value;
};
_PropertyPathWalker.prototype.GetPath = function () {
    return this._Path;
};
_PropertyPathWalker.prototype.SetPath = function (value) {
    this._Path = value;
};
_PropertyPathWalker.prototype.GetValueInternal = function () {
    return this._ValueInternal;
};
_PropertyPathWalker.prototype.SetValueInternal = function (value) {
    this._ValueInternal = value;
};
_PropertyPathWalker.prototype.GetIsDataContextBound = function () {
    return this._IsDataContextBound;
};
_PropertyPathWalker.prototype.SetIsDataContextBound = function (value) {
    this._IsDataContextBound = value;
};
_PropertyPathWalker.prototype.GetNode = function () {
    return this._Node;
};
_PropertyPathWalker.prototype.SetNode = function (value) {
    this._Node = value;
};
_PropertyPathWalker.prototype.GetFinalNode = function () {
    return this._FinalNode;
};
_PropertyPathWalker.prototype.SetFinalNode = function (value) {
    this._FinalNode = value;
};
_PropertyPathWalker.prototype.GetIsPathBroken = function () {
    var path = this.GetPath();
    if (this.GetIsDataContextBound() && (path == null || path.length < 1))
        return false;
    var node = this.GetNode();
    while (node != null) {
        if (node.GetIsBroken())
            return true;
        node = node.GetNext();
    }
    return false;
};

function RelativeSource(mode) {
    RefObject.call(this);
    if (mode == null)
        mode = RelativeSourceMode.TemplatedParent;
    this.SetMode(mode);
}
RelativeSource.InheritFrom(RefObject);
RelativeSource.prototype.GetMode = function () {
    return this._Mode;
};
RelativeSource.prototype.SetMode = function (/* RelativeSourceMode */value) {
    this._Mode = value;
};

function _StandardPropertyPathNode(typeName, propertyName) {
    _PropertyPathNode.call(this);
    this._STypeName = typeName;
    this._PropertyName = propertyName;
}
_StandardPropertyPathNode.InheritFrom(_PropertyPathNode);
_StandardPropertyPathNode.prototype.SetValue = function (value) {
    if (this.GetDependencyProperty() != null)
        this.GetSource().SetValue(this.GetDependencyProperty(), value);
    else if (this.GetPropertyInfo() != null)
        this.GetPropertyInfo().SetValue(this.GetSource(), value, null);
};
_StandardPropertyPathNode.prototype.UpdateValue = function () {
    if (this.GetDependencyProperty() != null) {
        this.SetValueType(this.GetDependencyProperty().GetTargetType());
        this._UpdateValueAndIsBroken(this.GetSource().GetValue(this.GetDependencyProperty()), this._CheckIsBroken());
    } else if (this.GetPropertyInfo() != null) {
        this.SetValueType(null);
        try {
            this._UpdateValueAndIsBroken(this.GetPropertyInfo().GetValue(this.GetSource(), null), this._CheckIsBroken());
        } catch (err) {
            this._UpdateValueAndIsBroken(null, this._CheckIsBroken());
        }
    } else {
        this.SetValueType(null);
        this._UpdateValueAndIsBroken(null, this._CheckIsBroken());
    }
};
_StandardPropertyPathNode.prototype.OnSourceChanged = function (oldSource, newSource) {
    _PropertyPathNode.prototype.OnSourceChanged.call(this, oldSource, newSource);
    var oldDO = RefObject.As(oldSource, DependencyObject);
    var newDO = RefObject.As(newSource, DependencyObject);
    var listener = this.GetListener();
    if (listener != null) {
        listener.Detach();
        this.SetListener(listener);
    }
    this.SetDependencyProperty(null);
    this.SetPropertyInfo(null);
    if (this.GetSource() == null)
        return;
    if (newDO != null) {
        propd = DependencyProperty.GetDependencyProperty(this.GetSource().constructor, this.GetPropertyName());
        if (propd != null) {
            this.SetDependencyProperty(propd);
            listener = new PropertyChangedListener(newDO, propd, this, this.OnPropertyChanged);
            this.SetListener(listener);
        }
    }
    if (this.GetDependencyProperty() == null || !this.GetDependencyProperty()._IsAttached) {
        this.SetPropertyInfo(PropertyInfo.Find(this.GetSource(), this.GetPropertyName()));
    }
};
_StandardPropertyPathNode.prototype.OnPropertyChanged = function (s, e) {
    try {
        this.UpdateValue();
        if (this.GetNext() != null)
            this.GetNext().SetSource(this.GetValue());
    } catch (err) {
    }
};
_StandardPropertyPathNode.prototype.OnSourcePropertyChanged = function (o, e) {
    if (e.PropertyName === this.GetPropertyName() && this.GetPropertyInfo() != null) {
        this.UpdateValue();
        var next = this.GetNext();
        if (next != null)
            next.SetSource(this.GetValue());
    }
};
_StandardPropertyPathNode.prototype.GetTypeName = function () {
    return this._STypeName;
};
_StandardPropertyPathNode.prototype.GetPropertyName = function () {
    return this._PropertyName;
};

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

function _CollectionViewNode(bindsDirectlyToSource, bindToView, viewChanged) {
    _PropertyPathNode.call(this);
    this.SetBindsDirectlyToSource(bindsDirectlyToSource === true);
    this.SetBindToView(bindToView === true);
    this.SetViewChangedHandler(this.ViewChanged);
}
_CollectionViewNode.InheritFrom(_PropertyPathNode);
_CollectionViewNode.prototype.OnSourceChanged = function (oldSource, newSource) {
    _PropertyPathNode.prototype.OnSourceChanged.call(this, oldSource, newSource);
    this.DisconnectViewHandlers();
    this.ConnectViewHandlers(RefObject.As(newSource, CollectionViewSource), RefObject.As(newSource, ICollectionView));
};
_CollectionViewNode.prototype.ViewChanged = function (sender, e) {
    this.DisconnectViewHandlers(true);
    this.ConnectViewHandlers(null, e.NewValue);
    this.ViewCurrentChanged(this, new EventArgs());
};
_CollectionViewNode.prototype.ViewCurrentChanged = function (sender, e) {
    this.UpdateValue();
    if (this.GetNext() != null)
        this.GetNext().SetSource(this.GetValue());
};
_CollectionViewNode.prototype.SetValue = function () {
    throw new NotImplementedException();
};
_CollectionViewNode.prototype.UpdateValue = function () {
    if (this.GetBindsDirectlyToSource()) {
        this.SetValueType(this.GetSource() == null ? null : this.GetSource().constructor);
        this._UpdateValueAndIsBroken(this.GetSource(), this._CheckIsBroken());
    } else {
        var usableSource = this.GetSource();
        var view = null;
        if (this.GetSource() instanceof CollectionViewSource) {
            usableSource = null;
            view = this.GetSource().GetView();
        } else if (this.GetSource().DoesImplement(ICollectionView)) {
            view = this.GetSource();
        }
        if (view == null) {
            this.SetValueType(usableSource == null ? null : usableSource.constructor);
            this._UpdateValueAndIsBroken(usableSource, this._CheckIsBroken());
        } else {
            if (this.GetBindToView()) {
                this.SetValueType(view.constructor);
                this._UpdateValueAndIsBroken(view, this._CheckIsBroken());
            } else {
                this.SetValueType(view.GetCurrentItem() == null ? null : view.GetCurrentItem().constructor);
                this._UpdateValueAndIsBroken(view.GetCurrentItem(), this._CheckIsBroken());
            }
        }
    }
};
_CollectionViewNode.prototype._CheckIsBroken = function () {
    return this.GetSource() == null;
};
_CollectionViewNode.prototype.ConnectViewHandlers = function (source, view) {
    if (source != null) {
        this._ViewPropertyListener = new PropertyChangedListener(source, source.constructor.ViewProperty, this, this.ViewChanged);
        view = source.GetView();
    }
    if (view != null)
        this._ViewListener = new CurrentChangedListener(view, this, this.ViewCurrentChanged);
};
_CollectionViewNode.prototype.DisconnectViewHandlers = function (onlyView) {
    if (onlyView == null)
        onlyView = false;
    if (this._ViewPropertyListener != null && !onlyView) {
        this._ViewPropertyListener.Detach();
        this._ViewPropertyListener = null;
    }
    if (this._ViewListener != null) {
        this._ViewListener.Detach();
        this._ViewListener = null;
    }
};
_CollectionViewNode.prototype.GetBindsDirectlyToSource = function () {
    return this._BindsDirectlyToSource;
};
_CollectionViewNode.prototype.SetBindsDirectlyToSource = function (value) {
    this._BindsDirectlyToSource = value;
};
_CollectionViewNode.prototype.GetBindToView = function () {
    return this._BindToView;
};
_CollectionViewNode.prototype.SetBindToView = function (value) {
    this._BindToView = value;
};
_CollectionViewNode.prototype.GetViewChangedHandler = function () {
    return this._ViewChangedHandler;
};
_CollectionViewNode.prototype.SetViewChangedHandler = function (value) {
    this._ViewChangedHandler = value;
};

function _IndexedPropertyPathNode(index) {
    _PropertyPathNode.call(this);
    this._isBroken = false;
    var val = parseInt(index, 10);
    if (isNaN(val))
        this.SetIndex(index);
    else
        this.SetIndex(val);
}
_IndexedPropertyPathNode.InheritFrom(_PropertyPathNode);
_IndexedPropertyPathNode.prototype._CheckIsBroken = function () {
    return this._isBroken || _PropertyPathNode.prototype._CheckIsBroken.call(this);
};
_IndexedPropertyPathNode.prototype.UpdateValue = function () {
    NotImplemented("_IndexedPropertyPathNode.UpdateValue");
};
_IndexedPropertyPathNode.prototype.GetIndex = function () {
    return this._Index;
};
_IndexedPropertyPathNode.prototype.SetIndex = function (value) {
    this._Index = value;
};

