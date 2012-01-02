/// <reference path="FrameworkElement.js"/>
/// <reference path="TextLayout.js"/>

TextBlock.prototype = new FrameworkElement;
TextBlock.prototype.constructor = TextBlock;
function TextBlock() {
    FrameworkElement.call(this);
    this._Providers[_PropertyPrecedence.DynamicValue] = new _TextBlockDynamicPropertyValueProvider(this, _PropertyPrecedence.DynamicValue);
    this._WasSet = true;
    this._Dirty = true;
    this._SetValue = true;
    this._Layout = new TextLayout();
}

//////////////////////////////////////////
// DEPENDENCY PROPERTIES
//////////////////////////////////////////
TextBlock.ForegroundProperty = DependencyProperty.Register("Foreground", TextBlock);
TextBlock.prototype.GetForeground = function () {
    return this.GetValue(TextBlock.ForegroundProperty);
};
TextBlock.prototype.SetForeground = function (value) {
    this.SetValue(TextBlock.ForegroundProperty, value);
};

TextBlock.FontFamilyProperty = DependencyProperty.Register("FontFamily", TextBlock);
TextBlock.prototype.GetFontFamily = function () {
    return this.GetValue(TextBlock.FontFamilyProperty);
};
TextBlock.prototype.SetFontFamily = function (value) {
    this.SetValue(TextBlock.FontFamilyProperty, value);
};

TextBlock.FontStretchProperty = DependencyProperty.Register("FontStretch", TextBlock);
TextBlock.prototype.GetFontStretch = function () {
    return this.GetValue(TextBlock.FontStretchProperty);
};
TextBlock.prototype.SetFontStretch = function (value) {
    this.SetValue(TextBlock.FontStretchProperty, value);
};

TextBlock.FontStyleProperty = DependencyProperty.Register("FontStyle", TextBlock);
TextBlock.prototype.GetFontStyle = function () {
    return this.GetValue(TextBlock.FontStyleProperty);
};
TextBlock.prototype.SetFontStyle = function (value) {
    this.SetValue(TextBlock.FontStyleProperty, value);
};

TextBlock.FontWeightProperty = DependencyProperty.Register("FontWeight", TextBlock);
TextBlock.prototype.GetFontWeight = function () {
    return this.GetValue(TextBlock.FontWeightProperty);
};
TextBlock.prototype.SetFontWeight = function (value) {
    this.SetValue(TextBlock.FontWeightProperty, value);
};

TextBlock.FontSizeProperty = DependencyProperty.Register("FontSize", TextBlock);
TextBlock.prototype.GetFontSize = function () {
    return this.GetValue(TextBlock.FontSizeProperty);
};
TextBlock.prototype.SetFontSize = function (value) {
    this.SetValue(TextBlock.FontSizeProperty, value);
};

TextBlock.TextDecorationsProperty = DependencyProperty.Register("TextDecorations", TextBlock);
TextBlock.prototype.GetTextDecorations = function () {
    return this.GetValue(TextBlock.TextDecorationsProperty);
};
TextBlock.prototype.SetTextDecorations = function (value) {
    this.SetValue(TextBlock.TextDecorationsProperty, value);
};

TextBlock.FontResourceProperty = DependencyProperty.Register("FontResource", TextBlock);
TextBlock.prototype.GetFontResource = function () {
    return this.GetValue(TextBlock.FontResourceProperty);
};
TextBlock.prototype.SetFontResource = function (value) {
    this.SetValue(TextBlock.FontResourceProperty, value);
};

TextBlock.FontSourceProperty = DependencyProperty.Register("FontSource", TextBlock);
TextBlock.prototype.GetFontSource = function () {
	return this.GetValue(TextBlock.FontSourceProperty);
};
TextBlock.prototype.SetFontSource = function (value) {
	this.SetValue(TextBlock.FontSourceProperty, value);
};

TextBlock.TextProperty = DependencyProperty.Register("Text", TextBlock);
TextBlock.prototype.GetText = function () {
    return this.GetValue(TextBlock.TextProperty);
};
TextBlock.prototype.SetText = function (value) {
    this.SetValue(TextBlock.TextProperty, value);
};

TextBlock.InlinesProperty = DependencyProperty.Register("Inlines", TextBlock);
TextBlock.prototype.GetInlines = function () {
    return this.GetValue(TextBlock.InlinesProperty);
};
TextBlock.prototype.SetInlines = function (value) {
    this.SetValue(TextBlock.InlinesProperty, value);
};

TextBlock.LineStackingStrategyProperty = DependencyProperty.Register("LineStackingStrategy", TextBlock);
TextBlock.prototype.GetLineStackingStrategy = function () {
    return this.GetValue(TextBlock.LineStackingStrategyProperty);
};
TextBlock.prototype.SetLineStackingStrategy = function (value) {
    this.SetValue(TextBlock.LineStackingStrategyProperty, value);
};

TextBlock.LineHeightProperty = DependencyProperty.Register("LineHeight", TextBlock, 0.0);
TextBlock.prototype.GetLineHeight = function () {
    return this.GetValue(TextBlock.LineHeightProperty);
};
TextBlock.prototype.SetLineHeight = function (value) {
    this.SetValue(TextBlock.LineHeightProperty, value);
};

TextBlock.TextAlignmentProperty = DependencyProperty.Register("TextAlignment", TextBlock);
TextBlock.prototype.GetTextAlignment = function () {
    return this.GetValue(TextBlock.TextAlignmentProperty);
};
TextBlock.prototype.SetTextAlignment = function (value) {
    this.SetValue(TextBlock.TextAlignmentProperty, value);
};

TextBlock.TextTrimmingProperty = DependencyProperty.Register("TextTrimming", TextBlock);
TextBlock.prototype.GetTextTrimming = function () {
    return this.GetValue(TextBlock.TextTrimmingProperty);
};
TextBlock.prototype.SetTextTrimming = function (value) {
    this.SetValue(TextBlock.TextTrimmingProperty, value);
};

TextBlock.TextWrappingProperty = DependencyProperty.Register("TextWrapping", TextBlock);
TextBlock.prototype.GetTextWrapping = function () {
    return this.GetValue(TextBlock.TextWrappingProperty);
};
TextBlock.prototype.SetTextWrapping = function (value) {
    this.SetValue(TextBlock.TextWrappingProperty, value);
};

//////////////////////////////////////////
// INSTANCE METHODS
//////////////////////////////////////////
TextBlock.prototype._ComputeBounds = function () {
    this._Extents = this._Layout.GetRenderExtents();
    var padding = this.GetPadding();
    
    this._Extents.X += padding.Left;
    this._Extents.Y += padding.Top;
    
    this._ExtentsWithChildren = this._Extents;
    
    this._Bounds = this._IntersectBoundsWithClipPath(this._Extents/*.GrowBy(this._EffectPadding)*/, false); //.Transform(this._AbsoluteTransform);
    this._BoundsWithChildren = this._Bounds;

    this._ComputeGlobalBounds();
    this._ComputeSurfaceBounds();
};
TextBlock.prototype._ComputeActualSize = function () {
    var padding = this.GetPadding();
    var constraint = this._ApplySizeConstraints(new Size(Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY));
    var result = new Size(0.0, 0.0);

    if (this._ReadLocalValue(LayoutInformation.LayoutSlotProperty) != null || LayoutInformation.GetPreviousConstraint(this) != null) {
        this._Layout.Layout();
        var actuals = this._Layout.GetActualExtents();
        this._ActualWidth = actuals.Width;
        this._ActualHeight = actuals.Height;
    } else {
        constraint = constraint.GrowByThickness(padding.Negate());
        this.Layout(constraint);
    }
    result = new Size(this._ActualWidth, this._ActualHeight);
    result = result.GrowByThickness(padding);
    return result;
};
TextBlock.prototype._MeasureOverrideWithEror = function (availableSize, error) {
    var padding = this.GetPadding();
    var constraint = availableSize.GrowByThickness(padding.Negate());
    this.Layout(constraint);
    desired = new Size(this._ActualWidth, this._ActualHeight).GrowByThickness(padding);
    return desired;
};
TextBlock.prototype._ArrangeOverrideWithError = function (finalSize, error) {
    var padding = this.GetPadding();
    var constraint = finalSize.GrowByThickness(padding.Negate());
    this.Layout(constraint);
    var arranged = new Size(this._ActualWidth, this._ActualHeight);
    arranged = arranged.Max(constraint);
    this._Layout.SetAvailableWidth(constraint.Width);
    arranged = arranged.GrowByThickness(padding);
    return finalSize;
};

TextBlock.prototype.Layout = function (/* Size */constraint) {
    if (this._WasSet && this._GetValueNoDefault(TextBlock.TextProperty) == null) {
        //TODO: Set this._ActualHeight based on font properties
        NotImplemented("TextBlock.Layout --> Discover font height");
        this._ActualWidth = 0.0;
    } else if (!this._WasSet) {
        this._ActualHeight = 0.0;
        this._ActualWidth = 0.0;
    } else {
        this._Layout.SetMaxWidth(constraint.Width);
        this._Layout.Layout();
        var actuals = this._Layout.GetActualExtents();
        this._ActualWidth = actuals.Width;
        this._ActualHeight = actuals.Height;
    }
    this._Dirty = false;
};
TextBlock.prototype._UpdateFontDescriptions = function () {
    NotImplemented("TextBlock._UpdateFontDescriptions");
};

TextBlock.prototype._OnPropertyChanged = function (args, error) {
    var invalidate = true;
    if (args.Property.OwnerType !== TextBlock) {
        FrameworkElement.prototype._OnPropertyChanged.call(this, args, error);
        if (args.Property != FrameworkElement.LanguageProperty)
            return;
        if (!this._UpdateFontDescriptions(false))
            return;
        this._Dirty = true;
    }

    if (args.Property == TextBlock.FontFamilyProperty) {
    } else if (args.Property == TextBlock.FontSizeProperty) {
    } else if (args.Property == TextBlock.FontStretchProperty) {
    } else if (args.Property == TextBlock.FontStyleProperty) {
    } else if (args.Property == TextBlock.FontWeightProperty) {
    } else if (args.Property == TextBlock.TextProperty) {
    } else if (args.Property == TextBlock.InlinesProperty) {
    } else if (args.Property == TextBlock.LineStackingStrategyProperty) {
    } else if (args.Property == TextBlock.LineHeightProperty) {
    } else if (args.Property == TextBlock.TextDecorationsProperty) {
    } else if (args.Property == TextBlock.TextAlignmentProperty) {
    } else if (args.Property == TextBlock.TextTrimmingProperty) {
    } else if (args.Property == TextBlock.TextWrappingProperty) {
    } else if (args.Property == TextBlock.FontSourceProperty) {
    }

    if (invalidate) {
        if (dirty) {
            this._InvalidateMeasure();
            this._InvalidateArrange();
            this._UpdateBounds(true);
        }
        this._Invalidate();
    }
    this.PropertyChanged.Raise(this, args);
};
TextBlock.prototype._OnSubPropertyChanged = function (sender, args) {
    if (args.Property != null && args.Property == TextBlock.ForegroundProperty) {
        this._Invalidate();
    } else {
        FrameworkElement.prototype._OnSubPropertyChanged.call(this, sender, args);
    }
};




_TextBlockDynamicPropertyValueProvider.prototype = new _FrameworkElementProvider;
_TextBlockDynamicPropertyValueProvider.prototype.constructor = _TextBlockDynamicPropertyValueProvider;
function _TextBlockDynamicPropertyValueProvider(obj, propPrecedence) {
    _FrameworkElementProvider.call(this, obj, propPrecedence);
    this._BaselineOffsetValue = null;
    this._TextValue = null;
}
_TextBlockDynamicPropertyValueProvider.prototype.GetPropertyValue = function (propd) {
    if (propd == TextBlock.BaselineOffsetProperty) {
        var layout = this._Object._Layout;
        if (layout == null)
            return 0;
        return layout.GetBaselineOffset();
    }
    return _FrameworkElementProvider.prototype.GetPropertyValue.call(this, propd);
};