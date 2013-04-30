/// <reference path="../Core/FrameworkElement.ts" />
/// CODE
/// <reference path="../Core/XamlObjectCollection.ts" />
/// <reference path="../Documents/Run.ts" />
/// <reference path="../Documents/Span.ts" />
/// <reference path="../Documents/LineBreak.ts" />
/// <reference path="../Text/TextLayout.ts" />

module Fayde.Controls {
    declare var NotImplemented;

    export class TextBlockNode extends FENode implements IBoundsComputable, Documents.IInlinesChangedListener {
        XObject: TextBlock;
        private _ActualWidth: number = 0.0;
        private _ActualHeight: number = 0.0;
        _Layout: Text.TextLayout = new Text.TextLayout();
        private _WasSet: bool = true;
        private _Dirty: bool = true;
        private _Font: Font = new Font();
        private _SetsValue: bool = true;

        constructor(xobj: TextBlock) {
            super(xobj);
        }

        GetInheritedWalker(): IEnumerator {
            var xobj = this.XObject;
            var inlines = xobj.Inlines;
            if (inlines)
                return inlines.GetEnumerator();
        }

        ComputeBounds(baseComputer: () => void , lu: LayoutUpdater) {
            rect.copyTo(this._Layout.RenderExtents, lu.Extents);
            var padding = this.XObject.Padding;
            if (padding) {
                lu.Extents.X += padding.Left;
                lu.Extents.Y += padding.Top;
            }
            rect.copyTo(lu.Extents, lu.ExtentsWithChildren);

            lu.IntersectBoundsWithClipPath(lu.Bounds, lu.AbsoluteXform);
            rect.copyTo(lu.Bounds, lu.BoundsWithChildren);

            lu.ComputeGlobalBounds();
            lu.ComputeSurfaceBounds();
        }

        Measure(constraint: size): size {
            this.Layout(constraint);
            return size.fromRaw(this._ActualWidth, this._ActualHeight);
        }
        Arrange(constraint: size, padding: Thickness) {
            this.Layout(constraint);
            var arranged = size.fromRaw(this._ActualWidth, this._ActualHeight);
            size.max(arranged, constraint);
            this._Layout.AvailableWidth = constraint.Width;
            if (padding) size.growByThickness(arranged, padding);
        }
        Layout(constraint: size) {
            if (this._WasSet) {
                if (false) {
                    this._ActualHeight = this._Font.GetActualHeight();
                    this._ActualWidth = 0.0;
                } else {
                    this._Layout.MaxWidth = constraint.Width;
                    this._Layout.Layout();
                    var actuals = this._Layout.ActualExtents;
                    this._ActualWidth = actuals.Width;
                    this._ActualHeight = actuals.Height;
                }
            } else {
                this._ActualHeight = 0.0;
                this._ActualWidth = 0.0;
            }
            this._Dirty = false;
        }
        ComputeActualSize(lu: LayoutUpdater, padding: Thickness): size {
            var constraint = lu.CoerceSize(size.createInfinite());

            if (lu.PreviousConstraint !== undefined || lu.LayoutSlot !== undefined) {
                this._Layout.Layout();
                var actuals = this._Layout.ActualExtents;
                this._ActualWidth = actuals.Width;
                this._ActualHeight = actuals.Height;
            } else {
                if (padding) size.shrinkByThickness(constraint, padding);
                this.Layout(constraint);
            }
            var result = size.fromRaw(this._ActualWidth, this._ActualHeight);
            if (padding) size.growByThickness(result, padding);
            return result;
        }

        _CanFindElement(): bool { return true; }

        _FontChanged(args: IDependencyPropertyChangedEventArgs) {
            this._UpdateFonts(false);
            this._InvalidateDirty();
        }
        _TextChanged(args: IDependencyPropertyChangedEventArgs) {
            if (this._SetsValue) {
                this._SetTextInternal(args.NewValue);
                this._UpdateLayoutAttributes();
                this._InvalidateDirty(true);
            } else {
                this._UpdateLayoutAttributes();
            }
        }
        _LineStackingStrategyChanged(args: IDependencyPropertyChangedEventArgs) {
            this._Dirty = this._Layout.SetLineStackingStategy(args.NewValue);
            this._InvalidateDirty();
        }
        _LineHeightChanged(args: IDependencyPropertyChangedEventArgs) {
            this._Dirty = this._Layout.SetLineHeight(args.NewValue);
            this._InvalidateDirty();
        }
        _TextAlignmentChanged(args: IDependencyPropertyChangedEventArgs) {
            this._Dirty = this._Layout.SetTextAlignment(args.NewValue);
            this._InvalidateDirty();
        }
        _TextTrimmingChanged(args: IDependencyPropertyChangedEventArgs) {
            this._Dirty = this._Layout.SetTextTrimming(args.NewValue);
            this._InvalidateDirty();
        }
        _TextWrappingChanged(args: IDependencyPropertyChangedEventArgs) {
            this._Dirty = this._Layout.SetTextWrapping(args.NewValue);
            this._InvalidateDirty();
        }
        _InvalidateDirty(setDirty?: bool) {
            if (setDirty) this._Dirty = true;
            var lu = this.LayoutUpdater;
            if (this._Dirty) {
                lu.InvalidateMeasure();
                lu.InvalidateArrange();
                lu.UpdateBounds(true);
            }
            lu.Invalidate();
        }

        private _UpdateFont(force?: bool) {
            var f = this._Font;
            var xobj = this.XObject;
            f.Family = xobj.FontFamily;
            f.Stretch = xobj.FontStretch;
            f.Style = xobj.FontStyle;
            f.Weight = xobj.FontWeight;
            f.Size = xobj.FontSize;
            return f.IsChanged || force;
        }
        private _UpdateFonts(force?: bool): bool {
            if (!this._UpdateFont(force))
                return false;
            var lu = this.LayoutUpdater;
            lu.InvalidateMeasure();
            lu.InvalidateArrange();
            lu.UpdateBounds(true);
            this._Dirty = true;
            return true;
        }
        private _UpdateLayoutAttributes() {
            var xobj = this.XObject;
            var inlines = xobj.Inlines;

            var lu = this.LayoutUpdater;
            lu.InvalidateMeasure();
            lu.InvalidateArrange();

            this._UpdateFont(false);

            var length = 0;
            var runs: Text.ITextAttributes[] = [];
            var count = inlines.Count;
            var enumerator = inlines.GetEnumerator();
            while (enumerator.MoveNext()) {
                length = this._UpdateLayoutAttributesForInline(<Documents.Inline>enumerator.Current, length, runs);
            }
            if (count > 0)
                this._WasSet = true;
            this._Layout.Text = xobj.Text;
            this._Layout.TextAttributes = runs;
        }
        private _UpdateLayoutAttributesForInline(item: Documents.Inline, length: number, runs: Text.ITextAttributes[]): number {
            if (item instanceof Documents.Run) {
                var text = (<Documents.Run>item).Text;
                if (text && text.length) {
                    runs.push(new Text.TextLayoutAttributes(item, length));
                    length += text.length;
                }
            } else if (item instanceof Documents.LineBreak) {
                runs.push(new Text.TextLayoutAttributes(item, length));
                length += 1; //line break length
            } else if (item instanceof Documents.Span) {
                var inlines = (<Documents.Span>item).Inlines;
                var enumerator = inlines.GetEnumerator();
                while (enumerator.MoveNext()) {
                    length = this._UpdateLayoutAttributesForInline(<Documents.Inline>enumerator.Current, length, runs);
                }
            }
            return length;
        }

        private _GetTextInternal(inlines: XamlObjectCollection) {
            if (!inlines)
                return "";
            var block = "";
            var enumerator = inlines.GetEnumerator();
            while (enumerator.MoveNext()) {
                block += (<Documents.Inline>enumerator.Current)._SerializeText();
            }
            return block;
        }
        private _SetTextInternal(text: string) {
            this._SetsValue = false;

            var value: Documents.Inline = null;
            var xobj = this.XObject;
            var inlines = xobj.Inlines;
            if (text) {
                var count = inlines.Count;
                var run: Documents.Run = null;
                if (count > 0 && (value = <Documents.Inline>inlines.GetValueAt(0)) && value instanceof Documents.Run) {
                    run = <Documents.Run>value;
                    if (run.Autogen) {
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
                    run = new Documents.Run();
                    run.Autogen = true;
                    inlines.Add(run);
                }
                run.Text = text;
                xobj._Store.PropagateInheritedOnAdd(run.XamlNode);
            } else {
                inlines.Clear();
                xobj.Text = "";
            }

            this._SetsValue = true;
        }

        private InlinesChanged(newInline: Documents.Inline, isAdd: bool) {
            if (!this._SetsValue)
                return;
            
            var xobj = this.XObject;
            if (isAdd)
                xobj._Store.PropagateInheritedOnAdd(newInline.XamlNode);
            
            var inlines = xobj.Inlines;
            this._SetsValue = false;
            xobj._Store.SetValue(TextBlock.TextProperty, this._GetTextInternal(inlines));
            this._SetsValue = true;

            this._UpdateLayoutAttributes();
            var lu = this.LayoutUpdater;
            lu.InvalidateMeasure();
            lu.InvalidateArrange();
            lu.UpdateBounds(true);
            lu.Invalidate();
        }
    }
    Nullstone.RegisterType(TextBlockNode, "TextBlockNode");

    export class TextBlock extends FrameworkElement implements IMeasurableHidden, IArrangeableHidden, IRenderable, IActualSizeComputable, Media.IBrushChangedListener {
        XamlNode: TextBlockNode;
        CreateNode(): TextBlockNode { return new TextBlockNode(this); }

        static PaddingProperty: DependencyProperty = DependencyProperty.RegisterCore("Padding", () => Thickness, TextBlock, undefined, (d, args) => (<TextBlock>d).XamlNode._InvalidateDirty(true));
        static ForegroundProperty: DependencyProperty = DependencyProperty.RegisterInheritable("Foreground", () => Media.Brush, TextBlock, undefined, undefined, undefined, Providers._Inheritable.Foreground);
        static FontFamilyProperty: DependencyProperty = DependencyProperty.RegisterInheritable("FontFamily", () => String, TextBlock, Font.DEFAULT_FAMILY, (d, args) => (<TextBlock>d).XamlNode._FontChanged(args), undefined, Providers._Inheritable.FontFamily);
        static FontStretchProperty: DependencyProperty = DependencyProperty.RegisterInheritable("FontStretch", () => String, TextBlock, Font.DEFAULT_STRETCH, (d, args) => (<TextBlock>d).XamlNode._FontChanged(args), undefined, Providers._Inheritable.FontStretch);
        static FontStyleProperty: DependencyProperty = DependencyProperty.RegisterInheritable("FontStyle", () => String, TextBlock, Font.DEFAULT_STYLE, (d, args) => (<TextBlock>d).XamlNode._FontChanged(args), undefined, Providers._Inheritable.FontStyle);
        static FontWeightProperty: DependencyProperty = DependencyProperty.RegisterInheritable("FontWeight", () => new Enum(FontWeight), TextBlock, Font.DEFAULT_WEIGHT, (d, args) => (<TextBlock>d).XamlNode._FontChanged(args), undefined, Providers._Inheritable.FontWeight);
        static FontSizeProperty: DependencyProperty = DependencyProperty.RegisterInheritable("FontSize", () => Number, TextBlock, Font.DEFAULT_SIZE, (d, args) => (<TextBlock>d).XamlNode._FontChanged(args), undefined, Providers._Inheritable.FontSize);
        static TextDecorationsProperty: DependencyProperty = DependencyProperty.RegisterInheritable("TextDecorations", () => new Enum(TextDecorations), TextBlock, TextDecorations.None, (d, args) => (<TextBlock>d).XamlNode._InvalidateDirty(true), undefined, Providers._Inheritable.TextDecorations);
        static TextProperty: DependencyProperty = DependencyProperty.Register("Text", () => String, TextBlock, "", (d, args) => (<TextBlock>d).XamlNode._TextChanged(args));
        //static InlinesProperty: DependencyProperty = DependencyProperty.RegisterCore("Inlines", () => Documents.InlineCollection, TextBlock, undefined, (d, args) => (<TextBlock>d).XamlNode._InlinesChanged(args));
        static LineStackingStrategyProperty: DependencyProperty = DependencyProperty.RegisterCore("LineStackingStrategy", () => new Enum(LineStackingStrategy), TextBlock, LineStackingStrategy.MaxHeight, (d, args) => (<TextBlock>d).XamlNode._LineStackingStrategyChanged(args));
        static LineHeightProperty: DependencyProperty = DependencyProperty.RegisterCore("LineHeight", () => Number, TextBlock, NaN, (d, args) => (<TextBlock>d).XamlNode._LineHeightChanged(args));
        static TextAlignmentProperty: DependencyProperty = DependencyProperty.RegisterCore("TextAlignment", () => new Enum(TextAlignment), TextBlock, TextAlignment.Left, (d, args) => (<TextBlock>d).XamlNode._TextAlignmentChanged(args));
        static TextTrimmingProperty: DependencyProperty = DependencyProperty.RegisterCore("TextTrimming", () => new Enum(TextTrimming), TextBlock, TextTrimming.None, (d, args) => (<TextBlock>d).XamlNode._TextTrimmingChanged(args));
        static TextWrappingProperty: DependencyProperty = DependencyProperty.RegisterCore("TextWrapping", () => new Enum(TextWrapping), TextBlock, TextWrapping.NoWrap, (d, args) => (<TextBlock>d).XamlNode._TextWrappingChanged(args));
        Padding: Thickness;
        Foreground: Media.Brush;
        FontFamily: string;
        FontStretch: string;
        FontStyle: string;
        FontWeight: FontWeight;
        FontSize: number;
        TextDecorations: TextDecorations;
        Text: string;
        Inlines: Documents.InlineCollection;
        LineStackingStrategy: LineStackingStrategy;
        LineHeight: number;
        TextAlignment: TextAlignment;
        TextTrimming: TextTrimming;
        TextWrapping: TextWrapping;

        static Annotations = { ContentProperty: "Inlines" }

        constructor() {
            super();

            var inlines = new Documents.InlineCollection();
            Object.defineProperty(this, "Inlines", {
                value: inlines,
                writable: false
            });
            inlines.Listen(this.XamlNode);
        }

        private _MeasureOverride(availableSize: size, error: BError): size {
            var constraint = size.clone(availableSize);
            var padding = this.Padding;
            if (padding) size.shrinkByThickness(constraint, padding);
            var desired = this.XamlNode.Measure(constraint);
            if (padding) size.growByThickness(desired, padding);
            return desired;
        }
        private _ArrangeOverride(finalSize: size, error: BError): size {
            var constraint = size.clone(finalSize);
            var padding = this.Padding;
            if (padding) size.shrinkByThickness(constraint, padding);
            this.XamlNode.Arrange(constraint, padding);
            return finalSize;
        }

        private Render(ctx: RenderContext, lu: LayoutUpdater, region: rect) {
            ctx.Save();
            lu._RenderLayoutClip(ctx);
            var padding = this.Padding;
            var offset: Point = null;
            if (padding) offset = new Point(padding.Left, padding.Top);
            if (this.FlowDirection === Fayde.FlowDirection.RightToLeft) {
                NotImplemented("TextBlock._Render: Right to left");
            }
            this.XamlNode._Layout.Render(ctx, null, offset);
            ctx.Restore();
        }

        private ComputeActualSize(baseComputer: () => size, lu: LayoutUpdater): size {
            return this.XamlNode.ComputeActualSize(lu, this.Padding);
        }

        private _ForegroundChanged(args: IDependencyPropertyChangedEventArgs) {
            var oldBrush = <Media.Brush>args.OldValue;
            var newBrush = <Media.Brush>args.NewValue;
            if (oldBrush) oldBrush.Unlisten(this);
            if (newBrush) newBrush.Listen(this);
        }
        private BrushChanged(newBrush: Media.Brush) {
            this.XamlNode.LayoutUpdater.Invalidate();
        }
    }
    Nullstone.RegisterType(TextBlock, "TextBlock");
}