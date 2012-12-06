/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="../Core/FrameworkElement.js"/>
/// <reference path="PropertyValueProviders/TextBlockDynamicPropertyValueProvider.js"/>
/// <reference path="../Primitives/Font.js"/>
/// CODE
/// <reference path="../Runtime/LinkedList.js"/>
/// <reference path="../Text/TextLayout.js"/>

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

    this.AddProvider(new _TextBlockDynamicPropertyValueProvider(this, _PropertyPrecedence.DynamicValue));

    this._Font = new Font();
};

//#region Properties

TextBlock.PaddingProperty = DependencyProperty.RegisterCore("Padding", function () { return Thickness; }, TextBlock, new Thickness());
TextBlock.ForegroundProperty = DependencyProperty.RegisterInheritable("Foreground", function () { return Brush; }, TextBlock, undefined, undefined, { GetValue: function () { return new SolidColorBrush(new Color(0, 0, 0)); } }, _Inheritable.Foreground);
TextBlock.FontFamilyProperty = DependencyProperty.RegisterInheritable("FontFamily", function () { return String; }, TextBlock, Font.DEFAULT_FAMILY, undefined, undefined, _Inheritable.FontFamily);
TextBlock.FontStretchProperty = DependencyProperty.RegisterInheritable("FontStretch", function () { return String; }, TextBlock, Font.DEFAULT_STRETCH, undefined, undefined, _Inheritable.FontStretch);
TextBlock.FontStyleProperty = DependencyProperty.RegisterInheritable("FontStyle", function () { return String; }, TextBlock, Font.DEFAULT_STYLE, undefined, undefined, _Inheritable.FontStyle);
TextBlock.FontWeightProperty = DependencyProperty.RegisterInheritable("FontWeight", function () { return new Enum(FontWeight); }, TextBlock, Font.DEFAULT_WEIGHT, undefined, undefined, _Inheritable.FontWeight);
TextBlock.FontSizeProperty = DependencyProperty.RegisterInheritable("FontSize", function () { return Number; }, TextBlock, Font.DEFAULT_SIZE, undefined, undefined, _Inheritable.FontSize);
TextBlock.TextDecorationsProperty = DependencyProperty.RegisterInheritable("TextDecorations", function () { return new Enum(TextDecorations); }, TextBlock, TextDecorations.None, undefined, undefined, _Inheritable.TextDecorations);
TextBlock.FontSourceProperty = DependencyProperty.RegisterCore("FontSource", function () { return Object; }, TextBlock);
TextBlock.TextProperty = DependencyProperty.RegisterCore("Text", function () { return String; }, TextBlock, "");
TextBlock.InlinesProperty = DependencyProperty.RegisterFull("Inlines", function () { return InlineCollection; }, TextBlock, undefined, undefined, { GetValue: function () { return new InlineCollection(); } });
TextBlock.LineStackingStrategyProperty = DependencyProperty.RegisterCore("LineStackingStrategy", function () { return new Enum(LineStackingStrategy); }, TextBlock);
TextBlock.LineHeightProperty = DependencyProperty.RegisterCore("LineHeight", function () { return Number; }, TextBlock, NaN);
TextBlock.TextAlignmentProperty = DependencyProperty.RegisterCore("TextAlignment", function () { return new Enum(TextAlignment); }, TextBlock, TextAlignment.Left);
TextBlock.TextTrimmingProperty = DependencyProperty.RegisterCore("TextTrimming", function () { return new Enum(TextTrimming); }, TextBlock, TextTrimming.None);
TextBlock.TextWrappingProperty = DependencyProperty.RegisterCore("TextWrapping", function () { return new Enum(TextWrapping); }, TextBlock, TextWrapping.NoWrap);

Nullstone.AutoProperties(TextBlock, [
    TextBlock.PaddingProperty,
    TextBlock.ForegroundProperty,
    TextBlock.FontFamilyProperty,
    TextBlock.FontStretchProperty,
    TextBlock.FontStyleProperty,
    TextBlock.FontWeightProperty,
    TextBlock.FontSizeProperty,
    TextBlock.TextDecorationsProperty,
    TextBlock.FontSourceProperty,
    TextBlock.TextProperty,
    TextBlock.InlinesProperty,
    TextBlock.LineStackingStrategyProperty,
    TextBlock.LineHeightProperty,
    TextBlock.TextAlignmentProperty,
    TextBlock.TextTrimmingProperty,
    TextBlock.TextWrappingProperty
]);

//#endregion

//#region Instance Methods

TextBlock.Instance._ComputeBounds = function () {
    this._Extents = this._Layout.GetRenderExtents();
    var padding = this.Padding;

    this._Extents.X += padding.Left;
    this._Extents.Y += padding.Top;

    this._ExtentsWithChildren = this._Extents;

    this._Bounds = this._IntersectBoundsWithClipPath(this._Extents.GrowBy(this._EffectPadding), false).Transform(this._AbsoluteXform);
    this._BoundsWithChildren = this._Bounds;

    this._ComputeGlobalBounds();
    this._ComputeSurfaceBounds();
};
TextBlock.Instance._ComputeActualSize = function () {
    var padding = this.Padding;
    var constraint = this._ApplySizeConstraints(new Size(Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY));
    var result = new Size(0.0, 0.0);

    if (LayoutInformation.GetPreviousConstraint(this) !== undefined || this._ReadLocalValue(LayoutInformation.LayoutSlotProperty) !== undefined) {
        this._Layout.Layout();
        var actuals = this._Layout.GetActualExtents();
        this._ActualWidth = actuals.Width;
        this._ActualHeight = actuals.Height;
    } else {
        constraint = constraint.ShrinkByThickness(padding);
        this.Layout(constraint);
    }
    result = new Size(this._ActualWidth, this._ActualHeight);
    result = result.GrowByThickness(padding);
    return result;
};

TextBlock.Instance._GetTransformOrigin = function () {
    var userXformOrigin = this.RenderTransformOrigin;
    var xformSize = this._ApplySizeConstraints(this.RenderSize);
    return new Point (xformSize.Width * userXformOrigin.X, xformSize.height * userXformOrigin.Y);
};

//#region Measure

TextBlock.Instance._MeasureOverrideWithError = function (availableSize, error) {
    var padding = this.Padding;
    var constraint = availableSize.ShrinkByThickness(padding);
    this.Layout(constraint);
    desired = new Size(this._ActualWidth, this._ActualHeight).GrowByThickness(padding);
    return desired;
};

//#endregion

//#region Arrange

TextBlock.Instance._ArrangeOverrideWithError = function (finalSize, error) {
    var padding = this.Padding;
    var constraint = finalSize.ShrinkByThickness(padding);
    this.Layout(constraint);
    var arranged = new Size(this._ActualWidth, this._ActualHeight);
    arranged = arranged.Max(constraint);
    this._Layout.SetAvailableWidth(constraint.Width);
    arranged = arranged.GrowByThickness(padding);
    return finalSize;
};

//#endregion

//#region Render

TextBlock.Instance._Render = function (ctx, region) {
    ctx.Save();
    this._RenderLayoutClip(ctx);
    var padding = this.Padding;
    var offset = new Point(padding.Left, padding.Top);
    if (this.FlowDirection === FlowDirection.RightToLeft) {
        NotImplemented("TextBlock._Render: Right to left");
    }
    this._Layout._Render(ctx, this._GetOriginPoint(), offset);
    ctx.Restore();
};

//#endregion

TextBlock.Instance.Layout = function (constraint) {
    /// <param name="constraint" type="Size"></param>
    if (this._WasSet && this._GetValueNoDefault(TextBlock.TextProperty) === undefined) {
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
    this._Font.Family = this.FontFamily;
    this._Font.Stretch = this.FontStretch;
    this._Font.Style = this.FontStyle;
    this._Font.Weight = this.FontWeight;
    this._Font.Size = this.FontSize;
    return this._Font.IsChanged || force;
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
    var inlines = this.Inlines;

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
    this._Layout.SetText(this.Text, length);
    this._Layout.SetTextAttributes(runs);
};
TextBlock.Instance._UpdateLayoutAttributesForInline = function (item, length, runs) {
    if (item instanceof Run) {
        var text = item.Text;
        if (text && text.length) {
            runs.Append(new _TextLayoutAttributes(item, length));
            length += text.length;
        }
    } else if (item instanceof LineBreak) {
        runs.Append(new _TextLayoutAttributes(item, length));
        length += 1; //line break length
    } else if (item instanceof Span) {
        var inlines = item.Inlines;
        var count = inlines.GetCount();
        for (var i = 0; i < count; i++) {
            length = this._UpdateLayoutAttributesForInline(inlines.GetValueAt(i), length, runs);
        }
    }
    return length;
};
TextBlock.Instance._SerializeText = function (str) {
    var inlines = this.Inlines;
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
        block += inlines.GetValueAt(i)._SerializeText();
    }
    return block;
};
TextBlock.Instance._SetTextInternal = function (text) {
    this._SetsValue = false;

    var value;
    var inlines = this._GetValue(TextBlock.InlinesProperty);
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
        if (!run) {
            inlines.Clear();
            run = new Run();
            run._SetAutogenerated(true);
            inlines.Add(run);
        }
        run.Text = text;
        this._Providers[_PropertyPrecedence.Inherited].PropagateInheritedPropertiesOnAddingToTree(run);
    } else {
        inlines.Clear();
        this.Text = "";
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
        if (args.Property._ID !== FrameworkElement.LanguageProperty._ID)
            return;
        if (!this._UpdateFonts(false))
            return;
    }

    var ivprop = false;
    if (args.Property._ID === TextBlock.FontFamilyProperty._ID
        || args.Property._ID === TextBlock.FontSizeProperty._ID
        || args.Property._ID === TextBlock.FontStretchProperty._ID
        || args.Property._ID === TextBlock.FontStyleProperty._ID
        || args.Property._ID === TextBlock.FontWeightProperty._ID) {
        ivprop = true;
        this._UpdateFonts(false);
    } else if (args.Property._ID === TextBlock.TextProperty._ID) {
        if (this._SetsValue) {
            this._SetTextInternal(args.NewValue);

            this._UpdateLayoutAttributes();
            this._Dirty = true;
        } else {
            this._UpdateLayoutAttributes();
            invalidate = false;
        }
        ivprop = true;
    } else if (args.Property._ID === TextBlock.InlinesProperty._ID) {
        if (this._SetsValue) {
            this._SetsValue = false;
            this._SetValue(TextBlock.TextProperty, this._GetTextInternal(args.NewValue));
            this._SetsValue = true;

            this._UpdateLayoutAttributes();
            this._Dirty = true;
        } else {
            this._UpdateLayoutAttributes();
            invalidate = false;
        }
    } else if (args.Property._ID === TextBlock.LineStackingStrategyProperty._ID) {
        this._Dirty = this._Layout.SetLineStackingStrategy(args.NewValue);
    } else if (args.Property._ID === TextBlock.LineHeightProperty._ID) {
        this._Dirty = this._Layout.SetLineHeight(args.NewValue);
        ivprop = true;
    } else if (args.Property._ID === TextBlock.TextDecorationsProperty._ID) {
        this._Dirty = true;
        ivprop = true;
    } else if (args.Property._ID === TextBlock.TextAlignmentProperty._ID) {
        this._Dirty = this._Layout.SetTextAlignment(args.NewValue);
        ivprop = true;
    } else if (args.Property._ID === TextBlock.TextTrimmingProperty._ID) {
        this._Dirty = this._Layout.SetTextTrimming(args.NewValue);
    } else if (args.Property._ID === TextBlock.TextWrappingProperty._ID) {
        this._Dirty = this._Layout.SetTextWrapping(args.NewValue);
        ivprop = true;
    } else if (args.Property._ID === TextBlock.PaddingProperty._ID) {
        this._Dirty = true;
    } else if (args.Property._ID === TextBlock.FontSourceProperty._ID) {
    } else if (args.Property._ID === TextBlock.ForegroundProperty._ID) {
        ivprop = true;
    }

    if (invalidate) {
        if (this._Dirty) {
            this._InvalidateMeasure();
            this._InvalidateArrange();
            this._UpdateBounds(true);
        }
        this._Invalidate();
    }
    if (ivprop)
        this.InvalidateProperty(args.Property, args.OldValue, args.NewValue);
    this.PropertyChanged.Raise(this, args);
};
TextBlock.Instance._OnSubPropertyChanged = function (propd, sender, args) {
    if (propd && propd._ID === TextBlock.ForegroundProperty._ID) {
        this._Invalidate();
        this.InvalidateProperty(propd);
    } else {
        this._OnSubPropertyChanged$FrameworkElement(propd, sender, args);
    }
};
TextBlock.Instance._OnCollectionChanged = function (sender, args) {
    if (!this._PropertyHasValueNoAutoCreate(TextBlock.InlinesProperty, sender)) {
        this._OnCollectionChanged$FrameworkElement(sender, args);
        return;
    }

    var inlines = this.Inlines;
    if (args.Action === CollectionChangedArgs.Action.Clearing)
        return;

    if (!this._SetsValue)
        return;

    if (args.Action === CollectionChangedArgs.Add)
        this._Providers[_PropertyPrecedence.Inherited].PropagateInheritedPropertiesOnAddingToTree(args.NewValue);

    this._SetsValue = false;
    this._SetValue(TextBlock.TextProperty, this._GetTextInternal(inlines));
    this._SetsValue = true;

    this._UpdateLayoutAttributes();
    this._InvalidateMeasure();
    this._InvalidateArrange();
    this._UpdateBounds(true);
    this._Invalidate();
};


TextBlock.Instance.InitializeHtml = function (rootEl) {
    this.InitializeHtml$FrameworkElement(rootEl);

    var contentEl = rootEl.firstChild;
    contentEl.style.fontFamily = this.FontFamily.toString();
    contentEl.style.fontSize = this.FontSize + "px";
    contentEl.style.fontStretch = this.FontStretch;
    contentEl.style.fontStyle = this.FontStyle;
    contentEl.style.fontWeight = this.FontWeight.toString();
    this.ApplyTextAlignmentHtml(contentEl, this.TextAlignment);
    this.ApplyLineHeightHtml(contentEl, this.LineHeight);
    this.ApplyForegroundHtml(contentEl, this.Foreground);
};
TextBlock.Instance.ApplyHtmlChange = function (change) {
    var propd = change.Property;
    if (propd.OwnerType !== TextBlock) {
        this.ApplyHtmlChange$FrameworkElement(change);
        return;
    }

    var rootEl = this.GetRootHtmlElement();
    var contentEl = rootEl.firstChild;
    if (propd._ID === TextBlock.TextProperty._ID) {
        contentEl.textContent = change.NewValue;
    } else if (propd._ID === TextBlock.FontFamilyProperty._ID) {
        contentEl.style.fontFamily = change.NewValue.toString();
    } else if (propd._ID === TextBlock.FontSizeProperty._ID) {
        contentEl.style.fontSize = change.NewValue + "px";
    } else if (propd._ID === TextBlock.FontStretchProperty._ID) {
        contentEl.style.fontStretch = change.NewValue;
    } else if (propd._ID === TextBlock.FontStyleProperty._ID) {
        contentEl.style.fontStyle = change.NewValue;
    } else if (propd._ID === TextBlock.FontWeightProperty._ID) {
        contentEl.style.fontWeight = change.NewValue.toString();
    } else if (propd._ID === TextBlock.ForegroundProperty._ID) {
        var brush = change.NewValue;
        if (!brush)
            brush = this.Foreground;
        this.ApplyForegroundHtml(contentEl, brush);
    } else if (propd._ID === TextBlock.LineHeightProperty._ID) {
        this.ApplyLineHeightHtml(contentEl, change.NewValue);
    } else if (propd._ID === TextBlock.TextAlignmentProperty._ID) {
        var alignment = change.NewValue;
        this.ApplyTextAlignmentHtml(contentEl, alignment);
    } else if (propd._ID === TextBlock.TextWrappingProperty._ID) {
        var wrapping = change.NewValue;
    } else if (propd._ID === TextBlock.TextDecorationsProperty._ID) {
        var decorations = change.NewValue;
        this.ApplyTextDecorationsHtml(contentEl, decorations);
    }
};
TextBlock.Instance.ApplyForegroundHtml = function (contentEl, foreground) {
    foreground.SetupBrush(null, null);
    contentEl.style.color = foreground.ToHtml5Object();
};
TextBlock.Instance.ApplyLineHeightHtml = function (contentEl, lineHeight) {
    if (isNaN(lineHeight))
        contentEl.style.lineHeight = "";
    else
        contentEl.style.lineHeight = lineHeight + "px";
};
TextBlock.Instance.ApplyTextAlignmentHtml = function (contentEl, alignment) {
    switch (alignment) {
        case TextAlignment.Left:
            contentEl.style.textAlign = "left";
            break;
        case TextAlignment.Center:
            contentEl.style.textAlign = "center";
            break;
        case TextAlignment.Right:
            contentEl.style.textAlign = "right";
            break;
    }
};
TextBlock.Instance.ApplyTextDecorationsHtml = function (contentEl, decorations) {
    var finalStyle = "";
    if (decorations & TextDecorations.Underline)
        finalStyle += "underline ";
    contentEl.style.textDecoration = finalStyle;
};

//#endregion

//#region Annotations

TextBlock.Annotations = {
    ContentProperty: TextBlock.InlinesProperty
};

//#endregion

Nullstone.FinishCreate(TextBlock);
//#endregion