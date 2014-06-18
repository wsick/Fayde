/// <reference path="Enums.ts" />
/// <reference path="../Core/FrameworkElement.ts" />

module Fayde.Controls {
    export class TextBlockNode extends FENode implements Documents.IInlinesChangedListener {
        XObject: TextBlock;
        private _ActualWidth: number = 0.0;
        private _ActualHeight: number = 0.0;
        _Layout: Text.TextLayout = new Text.TextLayout();
        private _WasSet: boolean = true;
        private _Dirty: boolean = true;
        private _Font: Font = new Font();
        private _SetsValue: boolean = true;

        constructor(xobj: TextBlock) {
            super(xobj);
            this.LayoutUpdater.CanHitElement = true;
        }

        GetInheritedEnumerator(): IEnumerator<DONode> {
            var xobj = this.XObject;
            var inlines = xobj.Inlines;
            if (inlines)
                return <IEnumerator<DONode>>inlines.GetNodeEnumerator();
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
        Render(ctx: RenderContextEx) {
            var tb = this.XObject;
            var padding = tb.Padding;
            var offset: Point = null;
            if (padding) offset = new Point(padding.Left, padding.Top);
            if (tb.FlowDirection === Fayde.FlowDirection.RightToLeft) {
                NotImplemented("TextBlock._Render: Right to left");
            }
            this._Layout.Render(ctx, null, offset);
        }

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
        _InvalidateDirty(setDirty?: boolean) {
            if (setDirty) this._Dirty = true;
            var lu = this.LayoutUpdater;
            if (this._Dirty) {
                lu.InvalidateMeasure();
                lu.InvalidateArrange();
                lu.UpdateBounds(true);
            }
            lu.Invalidate();
        }

        private _UpdateFont(force?: boolean) {
            var f = this._Font;
            var xobj = this.XObject;
            f.Family = xobj.FontFamily;
            f.Stretch = xobj.FontStretch;
            f.Style = xobj.FontStyle;
            f.Weight = xobj.FontWeight;
            f.Size = xobj.FontSize;
            return f.IsChanged || force;
        }
        private _UpdateFonts(force?: boolean): boolean {
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
            while (enumerator.moveNext()) {
                length = this._UpdateLayoutAttributesForInline(<Documents.Inline>enumerator.current, length, runs);
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
                while (enumerator.moveNext()) {
                    length = this._UpdateLayoutAttributesForInline(<Documents.Inline>enumerator.current, length, runs);
                }
            }
            return length;
        }

        private _GetTextInternal(inlines: Documents.InlineCollection) {
            if (!inlines)
                return "";
            var block = "";
            var enumerator = inlines.GetEnumerator();
            while (enumerator.moveNext()) {
                block += (<Documents.Inline>enumerator.current)._SerializeText();
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
                Providers.InheritedStore.PropagateInheritedOnAdd(xobj, run.XamlNode);
            } else {
                inlines.Clear();
                xobj.Text = "";
            }

            this._SetsValue = true;
        }

        InlinesChanged(newInline: Documents.Inline, isAdd: boolean) {
            if (!this._SetsValue)
                return;
            
            var xobj = this.XObject;
            if (isAdd)
                Providers.InheritedStore.PropagateInheritedOnAdd(xobj, newInline.XamlNode);
            
            var inlines = xobj.Inlines;
            this._SetsValue = false;
            xobj.SetCurrentValue(TextBlock.TextProperty, this._GetTextInternal(inlines));
            this._SetsValue = true;

            this._UpdateLayoutAttributes();
            var lu = this.LayoutUpdater;
            lu.InvalidateMeasure();
            lu.InvalidateArrange();
            lu.UpdateBounds(true);
            lu.Invalidate();
        }
    }
    Fayde.RegisterType(TextBlockNode, "Fayde.Controls");

    export class TextBlock extends FrameworkElement implements IFontChangeable {
        XamlNode: TextBlockNode;
        CreateNode(): TextBlockNode { return new TextBlockNode(this); }
        CreateLayoutUpdater(node: TextBlockNode) { return new TextBlockLayoutUpdater(node); }

        static PaddingProperty: DependencyProperty = DependencyProperty.RegisterCore("Padding", () => Thickness, TextBlock, undefined, (d, args) => (<TextBlock>d).XamlNode._InvalidateDirty(true));
        static FontFamilyProperty: DependencyProperty = InheritableOwner.FontFamilyProperty.ExtendTo(TextBlock);
        static FontSizeProperty: DependencyProperty = InheritableOwner.FontSizeProperty.ExtendTo(TextBlock);
        static FontStretchProperty: DependencyProperty = InheritableOwner.FontStretchProperty.ExtendTo(TextBlock);
        static FontStyleProperty: DependencyProperty = InheritableOwner.FontStyleProperty.ExtendTo(TextBlock);
        static FontWeightProperty: DependencyProperty = InheritableOwner.FontWeightProperty.ExtendTo(TextBlock);
        static ForegroundProperty: DependencyProperty = InheritableOwner.ForegroundProperty.ExtendTo(TextBlock);
        static TextDecorationsProperty: DependencyProperty = InheritableOwner.TextDecorationsProperty.ExtendTo(TextBlock);
        static TextProperty: DependencyProperty = DependencyProperty.Register("Text", () => String, TextBlock, "", (d, args) => (<TextBlock>d).XamlNode._TextChanged(args));
        static InlinesProperty = DependencyProperty.RegisterImmutable<Documents.InlineCollection>("Inlines", () => Documents.InlineCollection, TextBlock);
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

        constructor() {
            super();
            
            var inlines = TextBlock.InlinesProperty.Initialize(this);
            inlines.AttachTo(this);
            inlines.Listen(this.XamlNode);
        }

        MeasureOverride(availableSize: size): size {
            var constraint = size.copyTo(availableSize);
            var padding = this.Padding;
            if (padding) size.shrinkByThickness(constraint, padding);
            var desired = this.XamlNode.Measure(constraint);
            if (padding) size.growByThickness(desired, padding);
            return desired;
        }
        ArrangeOverride(finalSize: size): size {
            var constraint = size.copyTo(finalSize);
            var padding = this.Padding;
            if (padding) size.shrinkByThickness(constraint, padding);
            this.XamlNode.Arrange(constraint, padding);
            return finalSize;
        }

        private _ForegroundListener: Media.IBrushChangedListener;
        FontChanged(args: IDependencyPropertyChangedEventArgs) {
            var node = this.XamlNode;
            if (args.Property === InheritableOwner.TextDecorationsProperty) {
                node._InvalidateDirty();
            } else if (args.Property === InheritableOwner.ForegroundProperty) {
                var lu = node.LayoutUpdater;
                var newBrush = <Media.Brush>args.NewValue;
                if (this._ForegroundListener)
                    this._ForegroundListener.Detach();
                this._ForegroundListener = null;
                if (newBrush)
                    this._ForegroundListener = newBrush.Listen((brush) => lu.Invalidate());
                lu.Invalidate();
            } else {
                this.XamlNode._FontChanged(args);
            }
        }

        IsInheritable(propd: DependencyProperty): boolean {
            if (TextBlockInheritedProps.indexOf(propd) > -1)
                return true;
            return super.IsInheritable(propd);
        }
    }
    Fayde.RegisterType(TextBlock, "Fayde.Controls", Fayde.XMLNS);
    Xaml.Content(TextBlock, TextBlock.InlinesProperty);
    Xaml.TextContent(TextBlock, TextBlock.TextProperty);

    var TextBlockInheritedProps = [
        TextBlock.FontFamilyProperty,
        TextBlock.FontSizeProperty,
        TextBlock.FontStretchProperty,
        TextBlock.FontStyleProperty,
        TextBlock.FontWeightProperty,
        TextBlock.ForegroundProperty
    ];

    export class TextBlockLayoutUpdater extends LayoutUpdater {
        ComputeActualSize(): size {
            var node = <TextBlockNode>this.Node;
            var tb = <TextBlock>node.XObject;
            return node.ComputeActualSize(this, tb.Padding);
        }

        ComputeExtents(actualSize: size) {
            var node = <TextBlockNode>this.Node;
            rect.copyTo(node._Layout.RenderExtents, this.Extents);
            var padding = node.XObject.Padding;
            if (padding) {
                this.Extents.X += padding.Left;
                this.Extents.Y += padding.Top;
            }
            rect.copyTo(this.Extents, this.ExtentsWithChildren);
        }

        Render(ctx: RenderContextEx, region: rect) {
            ctx.save();
            this.RenderLayoutClip(ctx);
            var node = <TextBlockNode>this.Node;
            node.Render(ctx);
            ctx.restore();
        }
    }
}