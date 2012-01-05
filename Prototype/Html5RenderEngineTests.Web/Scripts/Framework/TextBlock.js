/// <reference path="Primitives.js"/>
/// <reference path="FrameworkElement.js"/>
/// <reference path="TextLayout.js"/>
/// <reference path="Collections.js"/>
/// <reference path="PropertyValueProviders.js"/>

//#region TextBlock

TextBlock.prototype = new FrameworkElement;
TextBlock.prototype.constructor = TextBlock;
function TextBlock() {
    FrameworkElement.call(this);

    this._Layout = new TextLayout();

    this._ActualHeight = 0.0;
    this._ActualWidth = 0.0;
    this._SetValue = true;
    this._WasSet = true;
    this._Dirty = true;

    this._Providers[_PropertyPrecedence.DynamicValue] = new _TextBlockDynamicPropertyValueProvider(this, _PropertyPrecedence.DynamicValue);

    this._Font = new Font();
}

//#region DEPENDENCY PROPERTIES

TextBlock.PaddingProperty = DependencyProperty.Register("Padding", TextBlock, new Thickness());
TextBlock.prototype.GetPadding = function () {
    return this.GetValue(TextBlock.PaddingProperty);
};
TextBlock.prototype.SetPadding = function (value) {
    this.SetValue(TextBlock.PaddingProperty, value);
};

TextBlock.ForegroundProperty = DependencyProperty.Register("Foreground", TextBlock, null, { GetValue: function () { return new SolidColorBrush(new Color(0, 0, 0)); } });
TextBlock.prototype.GetForeground = function () {
    return this.GetValue(TextBlock.ForegroundProperty);
};
TextBlock.prototype.SetForeground = function (value) {
    this.SetValue(TextBlock.ForegroundProperty, value);
};

TextBlock.FontFamilyProperty = DependencyProperty.Register("FontFamily", TextBlock, Font.DEFAULT_FAMILY);
TextBlock.prototype.GetFontFamily = function () {
    return this.GetValue(TextBlock.FontFamilyProperty);
};
TextBlock.prototype.SetFontFamily = function (value) {
    this.SetValue(TextBlock.FontFamilyProperty, value);
};

TextBlock.FontStretchProperty = DependencyProperty.Register("FontStretch", TextBlock, Font.DEFAULT_STRETCH);
TextBlock.prototype.GetFontStretch = function () {
    return this.GetValue(TextBlock.FontStretchProperty);
};
TextBlock.prototype.SetFontStretch = function (value) {
    this.SetValue(TextBlock.FontStretchProperty, value);
};

TextBlock.FontStyleProperty = DependencyProperty.Register("FontStyle", TextBlock, Font.DEFAULT_STYLE);
TextBlock.prototype.GetFontStyle = function () {
    return this.GetValue(TextBlock.FontStyleProperty);
};
TextBlock.prototype.SetFontStyle = function (value) {
    this.SetValue(TextBlock.FontStyleProperty, value);
};

TextBlock.FontWeightProperty = DependencyProperty.Register("FontWeight", TextBlock, Font.DEFAULT_WEIGHT);
TextBlock.prototype.GetFontWeight = function () {
    return this.GetValue(TextBlock.FontWeightProperty);
};
TextBlock.prototype.SetFontWeight = function (value) {
    this.SetValue(TextBlock.FontWeightProperty, value);
};

TextBlock.FontSizeProperty = DependencyProperty.Register("FontSize", TextBlock, Font.DEFAULT_SIZE);
TextBlock.prototype.GetFontSize = function () {
    return this.GetValue(TextBlock.FontSizeProperty);
};
TextBlock.prototype.SetFontSize = function (value) {
    this.SetValue(TextBlock.FontSizeProperty, value);
};

TextBlock.TextDecorationsProperty = DependencyProperty.Register("TextDecorations", TextBlock, TextDecorations.None);
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

TextBlock.TextProperty = DependencyProperty.Register("Text", TextBlock, "");
TextBlock.prototype.GetText = function () {
    return this.GetValue(TextBlock.TextProperty);
};
TextBlock.prototype.SetText = function (value) {
    this.SetValue(TextBlock.TextProperty, value);
};

TextBlock.InlinesProperty = DependencyProperty.Register("Inlines", TextBlock, null, { GetValue: function () { return new InlineCollection(); } });
TextBlock.prototype.GetInlines = function () {
    return this.GetValue(TextBlock.InlinesProperty);
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

TextBlock.TextAlignmentProperty = DependencyProperty.Register("TextAlignment", TextBlock, TextAlignment.Left);
TextBlock.prototype.GetTextAlignment = function () {
    return this.GetValue(TextBlock.TextAlignmentProperty);
};
TextBlock.prototype.SetTextAlignment = function (value) {
    this.SetValue(TextBlock.TextAlignmentProperty, value);
};

TextBlock.TextTrimmingProperty = DependencyProperty.Register("TextTrimming", TextBlock, TextTrimming.None);
TextBlock.prototype.GetTextTrimming = function () {
    return this.GetValue(TextBlock.TextTrimmingProperty);
};
TextBlock.prototype.SetTextTrimming = function (value) {
    this.SetValue(TextBlock.TextTrimmingProperty, value);
};

TextBlock.TextWrappingProperty = DependencyProperty.Register("TextWrapping", TextBlock, TextWrapping.NoWrap);
TextBlock.prototype.GetTextWrapping = function () {
    return this.GetValue(TextBlock.TextWrappingProperty);
};
TextBlock.prototype.SetTextWrapping = function (value) {
    this.SetValue(TextBlock.TextWrappingProperty, value);
};

//#endregion

//#region INSTANCE METHODS

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

TextBlock.prototype._Render = function (ctx, region) {
    var padding = this.GetPadding();
    var offset = new Point(padding.Left, padding.Top);
    if (this.GetFlowDirection() === FlowDirection.RightToLeft) {
        NotImplemented("TextBlock._Render: Right to left");
    }
    this._Layout._Render(ctx, this._GetOriginPoint(), offset);
};

TextBlock.prototype.Layout = function (/* Size */constraint) {
    if (this._WasSet && this._GetValueNoDefault(TextBlock.TextProperty) == null) {
        this._ActualHeight = this._Font.GetActualHeight();
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
TextBlock.prototype._UpdateFont = function (force) {
    var changed = false;

    changed = changed || this._Font.SetFamily(this.GetFontFamily());
    changed = changed || this._Font.SetStretch(this.GetFontStretch());
    changed = changed || this._Font.SetStyle(this.GetFontStyle());
    changed = changed || this._Font.SetWeight(this.GetFontWeight());
    changed = changed || this._Font.SetSize(this.GetFontSize());

    changed = changed || force;
    return changed;
};
TextBlock.prototype._UpdateFonts = function (force) {
    if (!this._UpdateFont(force))
        return false;
    this._InvalidateMeasure();
    this._InvalidateArrange();
    this._UpdateBounds(true);
    this._Dirty = true;
    return true;
};
TextBlock.prototype._UpdateLayoutAttributes = function () {
    var inlines = this.GetInlines();

    this._InvalidateMeasure();
    this._InvalidateArrange();

    this._UpdateFont(false);

    var length = 0;
    var runs = new List();
    var count = inlines.GetCount();
    for (var i = 0; i < count; i++) {
        length = this._UpdateLayoutAttributesForInline(inlines.GetValueAt(i), length, runs);
    }
    if (count > 0)
        this._WasSet = true;
    this._Layout.SetText(this.GetText(), length);
    this._Layout.SetTextAttributes(runs);
};
TextBlock.prototype._UpdateLayoutAttributesForInline = function (item, length, runs) {
    if (item instanceof Run) {
        var text = item.GetText();
        if (text && text.length) {
            runs.Append(new _TextLayoutAttributes(item, length));
            length += text.length;
        }
    } else if (item instanceof LineBreak) {
        runs.Append(new _TextLayoutAttributes(item, length));
        length += 1; //line break length
    } else if (item instanceof Span) {
        var inlines = item.GetInlines();
        var count = inlines.GetCount();
        for (var i = 0; i < count; i++) {
            length = this._UpdateLayoutAttributesForInline(inlines.GetValueAt(i), length, runs);
        }
    }
    return length;
};
TextBlock.prototype._SerializeText = function (str) {
    var inlines = this.GetInlines();
    var count = inlines.GetCount();
    for (var i = 0; i < count; i++) {
        str = inlines.GetValueAt(i)._SerializeText(str);
    }
    return str;
};
TextBlock.prototype._GetTextInternal = function (inlines) {
    if (!inlines)
        return "";
    var block = "";
    var count = inlines.GetCount();
    for (var i = 0; i < count; i++) {
        block = block.concat(inlines.GetValueAt(i)._SerializeText());
    }
    return block;
};
TextBlock.prototype._SetTextInternal = function (text) {
    this._SetValue = false;

    var value;
    var inlines = this.GetValue(TextBlock.InlinesProperty);
    if (text) {
        var count = inlines.GetCount();
        var run = null;
        if (count > 0 && (value = inlines.GetValueAt(0)) && value instanceof Run) {
            run = value;
            if (run._GetAutogenerated()) {
                while (count > 1) {
                    inlines.RemoveAt(count - 1);
                    count--;
                }
            } else {
                run = null;
            }
        }
        if (run == null) {
            inlines.Clear();
            run = new Run();
            run._SetAutogenerated(true);
            inlines.Add(run);
        }
        run.SetText(text);
        this._Providers[_PropertyPrecedence.Inherited].PropagateInheritedPropertiesOnAddingToTree(run);
    } else {
        inlines.Clear();
        this.SetText("");
    }

    this._SetValue = true;
};

TextBlock.prototype._OnPropertyChanged = function (args, error) {
    var invalidate = true;
    if (args.Property.OwnerType !== TextBlock) {
        FrameworkElement.prototype._OnPropertyChanged.call(this, args, error);
        if (args.Property != FrameworkElement.LanguageProperty)
            return;
        if (!this._UpdateFonts(false))
            return;
    }

    if (args.Property == TextBlock.FontFamilyProperty
        || args.Property == TextBlock.FontSizeProperty
        || args.Property == TextBlock.FontStretchProperty
        || args.Property == TextBlock.FontStyleProperty
        || args.Property == TextBlock.FontWeightProperty) {
        this._UpdateFonts(false);
    } else if (args.Property == TextBlock.TextProperty) {
        if (this._SetValue) {
            this._SetTextInternal(args.NewValue)

            this._UpdateLayoutAttributes();
            this._Dirty = true;
        } else {
            this._UpdateLayoutAttributes();
            invalidate = false;
        }
    } else if (args.Property == TextBlock.InlinesProperty) {
        if (this._SetValue) {
            this._SetValue = false;
            this.SetValue(TextBlock.TextProperty, this._GetTextInternal(args.NewValue));
            this._SetValue = true;

            this._UpdateLayoutAttributes();
            this._Dirty = true;
        } else {
            this._UpdateLayoutAttributes();
            invalidate = false;
        }
    } else if (args.Property == TextBlock.LineStackingStrategyProperty) {
        this._Dirty = this._Layout.SetLineStackingStrategy(args.NewValue);
    } else if (args.Property == TextBlock.LineHeightProperty) {
        this._Dirty = this._Layout.SetLineHeight(args.NewValue);
    } else if (args.Property == TextBlock.TextDecorationsProperty) {
        this._Dirty = true;
    } else if (args.Property == TextBlock.TextAlignmentProperty) {
        this._Dirty = this._Layout.SetTextAlignment(args.NewValue);
    } else if (args.Property == TextBlock.TextTrimmingProperty) {
        this._Dirty = this._Layout.SetTextTrimming(args.NewValue);
    } else if (args.Property == TextBlock.TextWrappingProperty) {
        this._Dirty = this._Layout.SetTextWrapping(args.NewValue);
    } else if (args.Property == TextBlock.PaddingProperty) {
        this._Dirty = true;
    } else if (args.Property == TextBlock.FontSourceProperty) {
    }

    if (invalidate) {
        if (this._Dirty) {
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
TextBlock.prototype._OnCollectionChanged = function (sender, args) {
    if (!this._PropertyHasValueNoAutoCreate(TextBlock.InlinesProperty, sender)) {
        FrameworkElement.prototype._OnCollectionChanged.call(this, sender, args);
        return;
    }

    var inlines = this.GetInlines();
    if (args.Action == CollectionChangedArgs.Action.Clearing)
        return;

    if (!this._SetValue)
        return;

    if (args.Action == CollectionChangedArgs.Add)
        this._Providers[_PropertyPrecedence.Inherited].PropagateInheritedPropertiesOnAddingToTree(args.NewValue);

    this._SetValue = false;
    this.SetValue(TextBlock.TextProperty, this._GetTextInternal(inlines));
    this._SetValue = true;

    this._UpdateLayoutAttributes();
    this._InvalidateMeasure();
    this._InvalidateArrange();
    this._UpdateBounds(true);
    this._Invalidate();
};

//#endregion

//#endregion

//#region _TextBlockDynamicPropertyValueProvider

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

//#endregion