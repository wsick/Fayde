/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="../Core/FrameworkElement.js"/>
/// <reference path="PropertyValueProviders/TextBlockDynamicPropertyValueProvider.js"/>
/// <reference path="../Primitives/Font.js"/>
/// CODE
/// <reference path="../Runtime/LinkedList.js"/>
/// <reference path="../Text/TextLayout.js"/>
/// <reference path="Enums.js"/>
/// <reference path="TextBlockMetrics.js"/>

(function (namespace) {
    var TextBlock = Nullstone.Create("TextBlock", Fayde.FrameworkElement);

    TextBlock.Instance.Init = function () {
        this.Init$FrameworkElement();

        this._Layout = new Fayde.Text.TextLayout();

        this._ActualHeight = 0.0;
        this._ActualWidth = 0.0;
        this._SetsValue = true;
        this._WasSet = true;
        this._Dirty = true;

        this.AddProvider(new namespace._TextBlockDynamicPropertyValueProvider(this, _PropertyPrecedence.DynamicValue));

        this._Font = new Font();
    };
    TextBlock.Instance.InitSpecific = function () {
        this._Metrics = new Fayde.Controls.TextBlockMetrics();
    };

    //#region Properties

    TextBlock.PaddingProperty = DependencyProperty.RegisterCore("Padding", function () { return Thickness; }, TextBlock, new Thickness());
    TextBlock.ForegroundProperty = DependencyProperty.RegisterInheritable("Foreground", function () { return Fayde.Media.Brush; }, TextBlock, undefined, undefined, { GetValue: function () { return new Fayde.Media.SolidColorBrush(new Color(0, 0, 0)); } }, _Inheritable.Foreground);
    TextBlock.FontFamilyProperty = DependencyProperty.RegisterInheritable("FontFamily", function () { return String; }, TextBlock, Font.DEFAULT_FAMILY, undefined, undefined, _Inheritable.FontFamily);
    TextBlock.FontStretchProperty = DependencyProperty.RegisterInheritable("FontStretch", function () { return String; }, TextBlock, Font.DEFAULT_STRETCH, undefined, undefined, _Inheritable.FontStretch);
    TextBlock.FontStyleProperty = DependencyProperty.RegisterInheritable("FontStyle", function () { return String; }, TextBlock, Font.DEFAULT_STYLE, undefined, undefined, _Inheritable.FontStyle);
    TextBlock.FontWeightProperty = DependencyProperty.RegisterInheritable("FontWeight", function () { return new Enum(Fayde.FontWeight); }, TextBlock, Font.DEFAULT_WEIGHT, undefined, undefined, _Inheritable.FontWeight);
    TextBlock.FontSizeProperty = DependencyProperty.RegisterInheritable("FontSize", function () { return Number; }, TextBlock, Font.DEFAULT_SIZE, undefined, undefined, _Inheritable.FontSize);
    TextBlock.TextDecorationsProperty = DependencyProperty.RegisterInheritable("TextDecorations", function () { return new Enum(Fayde.TextDecorations); }, TextBlock, Fayde.TextDecorations.None, undefined, undefined, _Inheritable.TextDecorations);
    TextBlock.FontSourceProperty = DependencyProperty.RegisterCore("FontSource", function () { return Object; }, TextBlock);
    TextBlock.TextProperty = DependencyProperty.RegisterCore("Text", function () { return String; }, TextBlock, "");
    TextBlock.InlinesProperty = DependencyProperty.RegisterFull("Inlines", function () { return Fayde.Documents.InlineCollection; }, TextBlock, undefined, undefined, { GetValue: function () { return new Fayde.Documents.InlineCollection(); } });
    TextBlock.LineStackingStrategyProperty = DependencyProperty.RegisterCore("LineStackingStrategy", function () { return new Enum(Fayde.LineStackingStrategy); }, TextBlock);
    TextBlock.LineHeightProperty = DependencyProperty.RegisterCore("LineHeight", function () { return Number; }, TextBlock, NaN);
    TextBlock.TextAlignmentProperty = DependencyProperty.RegisterCore("TextAlignment", function () { return new Enum(Fayde.TextAlignment); }, TextBlock, Fayde.TextAlignment.Left);
    TextBlock.TextTrimmingProperty = DependencyProperty.RegisterCore("TextTrimming", function () { return new Enum(namespace.TextTrimming); }, TextBlock, namespace.TextTrimming.None);
    TextBlock.TextWrappingProperty = DependencyProperty.RegisterCore("TextWrapping", function () { return new Enum(namespace.TextWrapping); }, TextBlock, namespace.TextWrapping.NoWrap);

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

    //#region Annotations

    TextBlock.Annotations = {
        ContentProperty: TextBlock.InlinesProperty
    };

    //#endregion

    //#region Instance Methods

    TextBlock.Instance._ComputeActualSize = function () {
        var padding = this.Padding;
        var constraint = this._ApplySizeConstraints(size.createInfinite());

        var metrics = this._UpdateMetrics;
        if (metrics.PreviousConstraint !== undefined || Fayde.LayoutInformation.GetLayoutSlot(this, true) !== undefined) {
            this._Layout.Layout();
            var actuals = this._Layout.GetActualExtents();
            this._ActualWidth = actuals.Width;
            this._ActualHeight = actuals.Height;
        } else {
            size.shrinkByThickness(constraint, padding);
            this.Layout(constraint);
        }
        var result = size.fromRaw(this._ActualWidth, this._ActualHeight);
        size.growByThickness(result, padding);
        return result;
    };

    TextBlock.Instance._GetTransformOrigin = function () {
        var userXformOrigin = this.RenderTransformOrigin;
        var xformSize = this._ApplySizeConstraints(size.clone(this.RenderSize));
        return new Point(xformSize.Width * userXformOrigin.X, xformSize.height * userXformOrigin.Y);
    };

    //#region Measure/Arrange

    TextBlock.Instance._MeasureOverride = function (availableSize, pass, error) {
        var padding = this.Padding;
        var constraint = size.clone(availableSize);
        size.shrinkByThickness(constraint, padding);
        this.Layout(constraint);
        var desired = size.fromRaw(this._ActualWidth, this._ActualHeight);
        size.growByThickness(desired, padding);
        return desired;
    };
    TextBlock.Instance._ArrangeOverride = function (finalSize, pass, error) {
        var padding = this.Padding;
        var constraint = size.clone(finalSize);
        size.shrinkByThickness(constraint, padding);
        this.Layout(constraint);
        var arranged = size.fromRaw(this._ActualWidth, this._ActualHeight);
        size.max(arranged, constraint);
        this._Layout.SetAvailableWidth(constraint.Width);
        size.growByThickness(arranged, padding);
        return finalSize;
    };

    //#endregion

    //#region Render

    TextBlock.Instance._Render = function (ctx, region) {
        ctx.Save();
        this._RenderLayoutClip(ctx);
        var padding = this.Padding;
        var offset = new Point(padding.Left, padding.Top);
        if (this.FlowDirection === Fayde.FlowDirection.RightToLeft) {
            NotImplemented("TextBlock._Render: Right to left");
        }
        this._Layout._Render(ctx, this._GetOriginPoint(), offset);
        ctx.Restore();
    };

    //#endregion

    TextBlock.Instance.Layout = function (constraint) {
        /// <param name="constraint" type="size"></param>
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
        if (item instanceof Fayde.Documents.Run) {
            var text = item.Text;
            if (text && text.length) {
                runs.Append(new Fayde.Text._TextLayoutAttributes(item, length));
                length += text.length;
            }
        } else if (item instanceof Fayde.Documents.LineBreak) {
            runs.Append(new Fayde.Text._TextLayoutAttributes(item, length));
            length += 1; //line break length
        } else if (item instanceof Fayde.Documents.Span) {
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
            if (count > 0 && (value = inlines.GetValueAt(0)) && value instanceof Fayde.Documents.Run) {
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
                run = new Fayde.Documents.Run();
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

    //#endregion

    //#region Changed

    //#if !ENABLE_CANVAS
    if (!Fayde.IsCanvasEnabled) {
        TextBlock.Instance._OnPropertyChanged = function (args, error) {
            if (args.Property.OwnerType !== TextBlock) {
                this._OnPropertyChanged$FrameworkElement(args, error);
                if (args.Property._ID !== Fayde.FrameworkElement.LanguageProperty._ID)
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
                    this.SetChildHtmlAsText(args.NewValue);
                    this._UpdateLayoutAttributes();
                    this._Dirty = true;
                } else {
                    this._UpdateLayoutAttributes();
                }
            } else if (args.Property._ID === TextBlock.InlinesProperty._ID) {
                if (this._SetsValue) {
                    this._SetsValue = false;
                    this._SetValue(TextBlock.TextProperty, this._GetTextInternal(args.NewValue));
                    this._SetsValue = true;

                    this._UpdateLayoutAttributes();
                    this._Dirty = true;
                    this.SetChildrenHtml(args.NewValue);
                } else {
                    this._UpdateLayoutAttributes();
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

            if (ivprop)
                this.InvalidateProperty(args.Property, args.OldValue, args.NewValue);
            this.PropertyChanged.Raise(this, args);
        };
        TextBlock.Instance._OnSubPropertyChanged = function (propd, sender, args) {
            if (propd && propd._ID === TextBlock.ForegroundProperty._ID) {
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
            if (args.IsClearing)
                return;

            if (!this._SetsValue)
                return;

            if (args.IsAdd)
                this._Providers[_PropertyPrecedence.Inherited].PropagateInheritedPropertiesOnAddingToTree(args.NewValue);

            this._SetsValue = false;
            this._SetValue(TextBlock.TextProperty, this._GetTextInternal(inlines));
            this._SetsValue = true;

            this._UpdateLayoutAttributes();

            if (args.IsCleared) {
                this.ClearChildrenHtml();
            } else if (args.IsAdd) {
                this.AddChildHtml(args.NewValue, args.Index);
            } else if (args.IsRemove) {
                this.RemoveChildHtml(args.NewValue);
            } else if (args.IsReplace) {
                this.ReplaceChildHtml(args.OldValue, args.NewValue);
            }
        };
    }
    //#else
    if (Fayde.IsCanvasEnabled) {
        TextBlock.Instance._OnPropertyChanged = function (args, error) {
            var invalidate = true;
            if (args.Property.OwnerType !== TextBlock) {
                this._OnPropertyChanged$FrameworkElement(args, error);
                if (args.Property._ID !== Fayde.FrameworkElement.LanguageProperty._ID)
                    return;
                if (!this._UpdateFonts(false))
                    return;
            }

            if (args.Property._ID === TextBlock.FontFamilyProperty._ID
                || args.Property._ID === TextBlock.FontSizeProperty._ID
                || args.Property._ID === TextBlock.FontStretchProperty._ID
                || args.Property._ID === TextBlock.FontStyleProperty._ID
                || args.Property._ID === TextBlock.FontWeightProperty._ID) {
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
            } else if (args.Property._ID === TextBlock.TextDecorationsProperty._ID) {
                this._Dirty = true;
            } else if (args.Property._ID === TextBlock.TextAlignmentProperty._ID) {
                this._Dirty = this._Layout.SetTextAlignment(args.NewValue);
            } else if (args.Property._ID === TextBlock.TextTrimmingProperty._ID) {
                this._Dirty = this._Layout.SetTextTrimming(args.NewValue);
            } else if (args.Property._ID === TextBlock.TextWrappingProperty._ID) {
                this._Dirty = this._Layout.SetTextWrapping(args.NewValue);
            } else if (args.Property._ID === TextBlock.PaddingProperty._ID) {
                this._Dirty = true;
            } else if (args.Property._ID === TextBlock.FontSourceProperty._ID) {
            } else if (args.Property._ID === TextBlock.ForegroundProperty._ID) {
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
            if (propd && propd._ID === TextBlock.ForegroundProperty._ID) {
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

            var inlines = this.Inlines;
            if (args.IsClearing)
                return;

            if (!this._SetsValue)
                return;

            if (args.IsAdd)
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
    }
    //#endif

    //#endregion

    //#if !ENABLE_CANVAS
    if (!Fayde.IsCanvasEnabled) {
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
            if (propd._ID === TextBlock.FontFamilyProperty._ID) {
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
                case Fayde.TextAlignment.Left:
                    contentEl.style.textAlign = "left";
                    break;
                case Fayde.TextAlignment.Center:
                    contentEl.style.textAlign = "center";
                    break;
                case Fayde.TextAlignment.Right:
                    contentEl.style.textAlign = "right";
                    break;
            }
        };
        TextBlock.Instance.ApplyTextDecorationsHtml = function (contentEl, decorations) {
            var finalStyle = "";
            if (decorations & Fayde.TextDecorations.Underline)
                finalStyle += "underline ";
            contentEl.style.textDecoration = finalStyle;
        };
        TextBlock.Instance.GetIsFixedWidth = function () {
            return true;
        };
        TextBlock.Instance.GetIsFixedHeight = function () {
            return true;
        };
        TextBlock.Instance.GetParentIsFixedWidth = function () {
            return false;
        };
        TextBlock.Instance.GetParentIsFixedHeight = function () {
            return false;
        };

        TextBlock.Instance.SetChildrenHtml = function (inlines) {
            var rootEl = this.GetRootHtmlElement();
            var contentEl = rootEl.firstChild;

            while (contentEl.hasChildNodes()) {
                contentEl.removeChild(contentEl.lastChild);
            }

            var len = inlines.GetCount();
            for (var i = 0; i < len; i++) {
                var te = inlines.GetValueAt(i);
                contentEl.appendChild(te.GetRootHtmlElement());
            }
        };
        TextBlock.Instance.AddChildHtml = function (inline, newIndex) {
            var rootEl = this.GetRootHtmlElement();
            var contentEl = rootEl.firstChild;

            var index = 0;
            var curEl = contentEl.firstChild;
            while (curEl && index < newIndex) {
                curEl = curEl.nextSibling;
                index++;
            }

            contentEl.insertBefore(inline.GetRootHtmlElement(), curEl);
        };
        TextBlock.Instance.ReplaceChildHtml = function (oldInline, newInline) {
            var rootEl = this.GetRootHtmlElement();
            var contentEl = rootEl.firstChild;
            contentEl.replaceChild(newInline.GetRootHtmlElement(), oldInline.GetRootHtmlElement());
        };
        TextBlock.Instance.RemoveChildHtml = function (inline) {
            var rootEl = this.GetRootHtmlElement();
            var contentEl = rootEl.firstChild;
            contentEl.removeChild(inline.GetRootHtmlElement());
        };
        TextBlock.Instance.ClearChildrenHtml = function () {
            var rootEl = this.GetRootHtmlElement();
            var contentEl = rootEl.firstChild;

            while (contentEl.hasChildNodes()) {
                contentEl.removeChild(contentEl.lastChild);
            }
        };
        TextBlock.Instance.SetChildHtmlAsText = function (text) {
            var rootEl = this.GetRootHtmlElement();
            var contentEl = rootEl.firstChild;
            while (contentEl.hasChildNodes()) {
                contentEl.removeChild(contentEl.lastChild);
            }
            contentEl.appendChild(document.createTextNode(text));
        };
    }
    //#endif

    namespace.TextBlock = Nullstone.FinishCreate(TextBlock);
})(Nullstone.Namespace("Fayde.Controls"));