/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="../Core/FrameworkElement.js"/>
/// <reference path="PropertyValueProviders/TextBlockDynamicPropertyValueProvider.js"/>
/// <reference path="../Primitives/Font.js"/>
/// CODE
/// <reference path="../Runtime/LinkedList.js"/>

//#region TextBlock
var TextBlock = Nullstone.Create("TextBlock", FrameworkElement);

TextBlock.Instance.Init = function () {
    this.Init$FrameworkElement();

    this._Layout = new TextLayout();

    this._ActualHeight = 0.0;
    this._ActualWidth = 0.0;
    this._SetsValue = true;
    this._WasSet = true;
    this._Dirty = true;

    this._Providers[_PropertyPrecedence.DynamicValue] = new _TextBlockDynamicPropertyValueProvider(this, _PropertyPrecedence.DynamicValue);

    this._Font = new Font();
};

//#region DEPENDENCY PROPERTIES

TextBlock.PaddingProperty = DependencyProperty.Register("Padding", function () { return Thickness; }, TextBlock, new Thickness());
TextBlock.Instance.GetPadding = function () {
    return this.GetValue(TextBlock.PaddingProperty);
};
TextBlock.Instance.SetPadding = function (value) {
    this.SetValue(TextBlock.PaddingProperty, value);
};

TextBlock.ForegroundProperty = DependencyProperty.RegisterFull("Foreground", function () { return Brush; }, TextBlock, null, { GetValue: function () { return new SolidColorBrush(new Color(0, 0, 0)); } });
TextBlock.Instance.GetForeground = function () {
    return this.GetValue(TextBlock.ForegroundProperty);
};
TextBlock.Instance.SetForeground = function (value) {
    this.SetValue(TextBlock.ForegroundProperty, value);
};

TextBlock.FontFamilyProperty = DependencyProperty.Register("FontFamily", function () { return String; }, TextBlock, Font.DEFAULT_FAMILY);
TextBlock.Instance.GetFontFamily = function () {
    return this.GetValue(TextBlock.FontFamilyProperty);
};
TextBlock.Instance.SetFontFamily = function (value) {
    this.SetValue(TextBlock.FontFamilyProperty, value);
};

TextBlock.FontStretchProperty = DependencyProperty.Register("FontStretch", function () { return String; }, TextBlock, Font.DEFAULT_STRETCH);
TextBlock.Instance.GetFontStretch = function () {
    return this.GetValue(TextBlock.FontStretchProperty);
};
TextBlock.Instance.SetFontStretch = function (value) {
    this.SetValue(TextBlock.FontStretchProperty, value);
};

TextBlock.FontStyleProperty = DependencyProperty.Register("FontStyle", function () { return String; }, TextBlock, Font.DEFAULT_STYLE);
TextBlock.Instance.GetFontStyle = function () {
    return this.GetValue(TextBlock.FontStyleProperty);
};
TextBlock.Instance.SetFontStyle = function (value) {
    this.SetValue(TextBlock.FontStyleProperty, value);
};

TextBlock.FontWeightProperty = DependencyProperty.Register("FontWeight", function () { return String; }, TextBlock, Font.DEFAULT_WEIGHT);
TextBlock.Instance.GetFontWeight = function () {
    return this.GetValue(TextBlock.FontWeightProperty);
};
TextBlock.Instance.SetFontWeight = function (value) {
    this.SetValue(TextBlock.FontWeightProperty, value);
};

TextBlock.FontSizeProperty = DependencyProperty.Register("FontSize", function () { return String; }, TextBlock, Font.DEFAULT_SIZE);
TextBlock.Instance.GetFontSize = function () {
    return this.GetValue(TextBlock.FontSizeProperty);
};
TextBlock.Instance.SetFontSize = function (value) {
    this.SetValue(TextBlock.FontSizeProperty, value);
};

TextBlock.TextDecorationsProperty = DependencyProperty.Register("TextDecorations", function () { return Number; }, TextBlock, TextDecorations.None);
TextBlock.Instance.GetTextDecorations = function () {
    return this.GetValue(TextBlock.TextDecorationsProperty);
};
TextBlock.Instance.SetTextDecorations = function (value) {
    this.SetValue(TextBlock.TextDecorationsProperty, value);
};

TextBlock.FontResourceProperty = DependencyProperty.Register("FontResource", function () { return Object; }, TextBlock);
TextBlock.Instance.GetFontResource = function () {
    return this.GetValue(TextBlock.FontResourceProperty);
};
TextBlock.Instance.SetFontResource = function (value) {
    this.SetValue(TextBlock.FontResourceProperty, value);
};

TextBlock.FontSourceProperty = DependencyProperty.Register("FontSource", function () { return Object; }, TextBlock);
TextBlock.Instance.GetFontSource = function () {
    return this.GetValue(TextBlock.FontSourceProperty);
};
TextBlock.Instance.SetFontSource = function (value) {
    this.SetValue(TextBlock.FontSourceProperty, value);
};

TextBlock.TextProperty = DependencyProperty.Register("Text", function () { return String; }, TextBlock, "");
TextBlock.Instance.GetText = function () {
    return this.GetValue(TextBlock.TextProperty);
};
TextBlock.Instance.SetText = function (value) {
    this.SetValue(TextBlock.TextProperty, value);
};

TextBlock.InlinesProperty = DependencyProperty.RegisterFull("Inlines", function () { return InlineCollection; }, TextBlock, null, { GetValue: function () { return new InlineCollection(); } });
TextBlock.Instance.GetInlines = function () {
    return this.GetValue(TextBlock.InlinesProperty);
};

TextBlock.LineStackingStrategyProperty = DependencyProperty.Register("LineStackingStrategy", function () { return Number; }, TextBlock);
TextBlock.Instance.GetLineStackingStrategy = function () {
    return this.GetValue(TextBlock.LineStackingStrategyProperty);
};
TextBlock.Instance.SetLineStackingStrategy = function (value) {
    this.SetValue(TextBlock.LineStackingStrategyProperty, value);
};

TextBlock.LineHeightProperty = DependencyProperty.Register("LineHeight", function () { return Number; }, TextBlock, 0.0);
TextBlock.Instance.GetLineHeight = function () {
    return this.GetValue(TextBlock.LineHeightProperty);
};
TextBlock.Instance.SetLineHeight = function (value) {
    this.SetValue(TextBlock.LineHeightProperty, value);
};

TextBlock.TextAlignmentProperty = DependencyProperty.Register("TextAlignment", function () { return Number; }, TextBlock, TextAlignment.Left);
TextBlock.Instance.GetTextAlignment = function () {
    return this.GetValue(TextBlock.TextAlignmentProperty);
};
TextBlock.Instance.SetTextAlignment = function (value) {
    this.SetValue(TextBlock.TextAlignmentProperty, value);
};

TextBlock.TextTrimmingProperty = DependencyProperty.Register("TextTrimming", function () { return Number; }, TextBlock, TextTrimming.None);
TextBlock.Instance.GetTextTrimming = function () {
    return this.GetValue(TextBlock.TextTrimmingProperty);
};
TextBlock.Instance.SetTextTrimming = function (value) {
    this.SetValue(TextBlock.TextTrimmingProperty, value);
};

TextBlock.TextWrappingProperty = DependencyProperty.Register("TextWrapping", function () { return Number; }, TextBlock, TextWrapping.NoWrap);
TextBlock.Instance.GetTextWrapping = function () {
    return this.GetValue(TextBlock.TextWrappingProperty);
};
TextBlock.Instance.SetTextWrapping = function (value) {
    this.SetValue(TextBlock.TextWrappingProperty, value);
};

//#endregion

//#region INSTANCE METHODS

TextBlock.Instance._ComputeBounds = function () {
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
TextBlock.Instance._ComputeActualSize = function () {
    var padding = this.GetPadding();
    var constraint = this._ApplySizeConstraints(new Size(Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY));
    var result = new Size(0.0, 0.0);

    if (this.ReadLocalValue(LayoutInformation.LayoutSlotProperty) != null || LayoutInformation.GetPreviousConstraint(this) != null) {
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
TextBlock.Instance._MeasureOverrideWithError = function (availableSize, error) {
    var padding = this.GetPadding();
    var constraint = availableSize.GrowByThickness(padding.Negate());
    this.Layout(constraint);
    desired = new Size(this._ActualWidth, this._ActualHeight).GrowByThickness(padding);
    return desired;
};
TextBlock.Instance._ArrangeOverrideWithError = function (finalSize, error) {
    var padding = this.GetPadding();
    var constraint = finalSize.GrowByThickness(padding.Negate());
    this.Layout(constraint);
    var arranged = new Size(this._ActualWidth, this._ActualHeight);
    arranged = arranged.Max(constraint);
    this._Layout.SetAvailableWidth(constraint.Width);
    arranged = arranged.GrowByThickness(padding);
    return finalSize;
};

TextBlock.Instance._Render = function (ctx, region) {
    ctx.Save();
    this._RenderLayoutClip(ctx);
    var padding = this.GetPadding();
    var offset = new Point(padding.Left, padding.Top);
    if (this.GetFlowDirection() === FlowDirection.RightToLeft) {
        NotImplemented("TextBlock._Render: Right to left");
    }
    this._Layout._Render(ctx, this._GetOriginPoint(), offset);
    ctx.Restore();
};

TextBlock.Instance.Layout = function (/* Size */constraint) {
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
TextBlock.Instance._UpdateFont = function (force) {
    var changed = false;

    changed = changed || this._Font.SetFamily(this.GetFontFamily());
    changed = changed || this._Font.SetStretch(this.GetFontStretch());
    changed = changed || this._Font.SetStyle(this.GetFontStyle());
    changed = changed || this._Font.SetWeight(this.GetFontWeight());
    changed = changed || this._Font.SetSize(this.GetFontSize());

    changed = changed || force;
    return changed;
};
TextBlock.Instance._UpdateFonts = function (force) {
    if (!this._UpdateFont(force))
        return false;
    this._InvalidateMeasure();
    this._InvalidateArrange();
    this._UpdateBounds(true);
    this._Dirty = true;
    return true;
};
TextBlock.Instance._UpdateLayoutAttributes = function () {
    var inlines = this.GetInlines();

    this._InvalidateMeasure();
    this._InvalidateArrange();

    this._UpdateFont(false);

    var length = 0;
    var runs = new LinkedList();
    var count = inlines.GetCount();
    for (var i = 0; i < count; i++) {
        length = this._UpdateLayoutAttributesForInline(inlines.GetValueAt(i), length, runs);
    }
    if (count > 0)
        this._WasSet = true;
    this._Layout.SetText(this.GetText(), length);
    this._Layout.SetTextAttributes(runs);
};
TextBlock.Instance._UpdateLayoutAttributesForInline = function (item, length, runs) {
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
TextBlock.Instance._SerializeText = function (str) {
    var inlines = this.GetInlines();
    var count = inlines.GetCount();
    for (var i = 0; i < count; i++) {
        str = inlines.GetValueAt(i)._SerializeText(str);
    }
    return str;
};
TextBlock.Instance._GetTextInternal = function (inlines) {
    if (!inlines)
        return "";
    var block = "";
    var count = inlines.GetCount();
    for (var i = 0; i < count; i++) {
        block = block.concat(inlines.GetValueAt(i)._SerializeText());
    }
    return block;
};
TextBlock.Instance._SetTextInternal = function (text) {
    this._SetsValue = false;

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

    this._SetsValue = true;
};

TextBlock.Instance._CanFindElement = function () {
    return true;
};

TextBlock.Instance._OnPropertyChanged = function (args, error) {
    var invalidate = true;
    if (args.Property.OwnerType !== TextBlock) {
        this._OnPropertyChanged$FrameworkElement(args, error);
        if (args.Property !== FrameworkElement.LanguageProperty)
            return;
        if (!this._UpdateFonts(false))
            return;
    }

    if (args.Property === TextBlock.FontFamilyProperty
        || args.Property === TextBlock.FontSizeProperty
        || args.Property === TextBlock.FontStretchProperty
        || args.Property === TextBlock.FontStyleProperty
        || args.Property === TextBlock.FontWeightProperty) {
        this._UpdateFonts(false);
    } else if (args.Property === TextBlock.TextProperty) {
        if (this._SetsValue) {
            this._SetTextInternal(args.NewValue)

            this._UpdateLayoutAttributes();
            this._Dirty = true;
        } else {
            this._UpdateLayoutAttributes();
            invalidate = false;
        }
    } else if (args.Property === TextBlock.InlinesProperty) {
        if (this._SetsValue) {
            this._SetsValue = false;
            this.SetValue(TextBlock.TextProperty, this._GetTextInternal(args.NewValue));
            this._SetsValue = true;

            this._UpdateLayoutAttributes();
            this._Dirty = true;
        } else {
            this._UpdateLayoutAttributes();
            invalidate = false;
        }
    } else if (args.Property === TextBlock.LineStackingStrategyProperty) {
        this._Dirty = this._Layout.SetLineStackingStrategy(args.NewValue);
    } else if (args.Property === TextBlock.LineHeightProperty) {
        this._Dirty = this._Layout.SetLineHeight(args.NewValue);
    } else if (args.Property === TextBlock.TextDecorationsProperty) {
        this._Dirty = true;
    } else if (args.Property === TextBlock.TextAlignmentProperty) {
        this._Dirty = this._Layout.SetTextAlignment(args.NewValue);
    } else if (args.Property === TextBlock.TextTrimmingProperty) {
        this._Dirty = this._Layout.SetTextTrimming(args.NewValue);
    } else if (args.Property === TextBlock.TextWrappingProperty) {
        this._Dirty = this._Layout.SetTextWrapping(args.NewValue);
    } else if (args.Property === TextBlock.PaddingProperty) {
        this._Dirty = true;
    } else if (args.Property === TextBlock.FontSourceProperty) {
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
TextBlock.Instance._OnSubPropertyChanged = function (propd, sender, args) {
    if (propd != null && propd._ID === TextBlock.ForegroundProperty._ID) {
        this._Invalidate();
    } else {
        this._OnSubPropertyChanged$FrameworkElement(propd, sender, args);
    }
};
TextBlock.Instance._OnCollectionChanged = function (sender, args) {
    if (!this._PropertyHasValueNoAutoCreate(TextBlock.InlinesProperty, sender)) {
        this._OnCollectionChanged$FrameworkElement(sender, args);
        return;
    }

    var inlines = this.GetInlines();
    if (args.Action === CollectionChangedArgs.Action.Clearing)
        return;

    if (!this._SetsValue)
        return;

    if (args.Action === CollectionChangedArgs.Add)
        this._Providers[_PropertyPrecedence.Inherited].PropagateInheritedPropertiesOnAddingToTree(args.NewValue);

    this._SetsValue = false;
    this.SetValue(TextBlock.TextProperty, this._GetTextInternal(inlines));
    this._SetsValue = true;

    this._UpdateLayoutAttributes();
    this._InvalidateMeasure();
    this._InvalidateArrange();
    this._UpdateBounds(true);
    this._Invalidate();
};

//#endregion

//#region ANNOTATIONS

TextBlock.Annotations = {
    ContentProperty: TextBlock.InlinesProperty
};

//#endregion

Nullstone.FinishCreate(TextBlock);
//#endregion