/// <reference path="Enums.ts" />
/// <reference path="../Core/FrameworkElement.ts" />

module Fayde.Controls {
    import TextBlockUpdater = minerva.controls.textblock.TextBlockUpdater;
    export class TextBlockNode extends FENode {
        XObject: TextBlock;
        LayoutUpdater: TextBlockUpdater;
        private _ActualWidth: number = 0.0;
        private _ActualHeight: number = 0.0;
        _Layout: Text.TextLayout = new Text.TextLayout();
        private _WasSet: boolean = true;
        private _Dirty: boolean = true;
        private _Font: Font = new Font();
        private _SetsValue: boolean = true;

        constructor (xobj: TextBlock) {
            super(xobj);
        }

        GetInheritedEnumerator (): IEnumerator<DONode> {
            var xobj = this.XObject;
            var inlines = xobj.Inlines;
            if (inlines)
                return <IEnumerator<DONode>>inlines.GetNodeEnumerator();
        }

        Measure (constraint: minerva.Size): minerva.Size {
            this.Layout(constraint);
            return new minerva.Size(this._ActualWidth, this._ActualHeight);
        }

        Arrange (constraint: minerva.Size, padding: Thickness) {
            this.Layout(constraint);
            var arranged = new minerva.Size(this._ActualWidth, this._ActualHeight);
            arranged.width = Math.max(arranged.width, constraint.width);
            arranged.height = Math.max(arranged.height, constraint.height);
            this._Layout.AvailableWidth = constraint.width;
            if (padding)
                minerva.Thickness.growSize(padding, arranged);
        }

        Layout (constraint: minerva.Size) {
            if (this._WasSet) {
                if (false) {
                    this._ActualHeight = this._Font.GetActualHeight();
                    this._ActualWidth = 0.0;
                } else {
                    this._Layout.MaxWidth = constraint.width;
                    this._Layout.Layout();
                    var actuals = this._Layout.ActualExtents;
                    this._ActualWidth = actuals.width;
                    this._ActualHeight = actuals.height;
                }
            } else {
                this._ActualHeight = 0.0;
                this._ActualWidth = 0.0;
            }
            this._Dirty = false;
        }

        /*
         ComputeActualSize(lu: LayoutUpdater, padding: Thickness): minerva.Size {
         var constraint = lu.CoerceSize(minerva.Size.createInfinite());

         if (lu.PreviousConstraint !== undefined || lu.LayoutSlot !== undefined) {
         this._Layout.Layout();
         var actuals = this._Layout.ActualExtents;
         this._ActualWidth = actuals.Width;
         this._ActualHeight = actuals.Height;
         } else {
         if (padding) minerva.Size.shrinkByThickness(constraint, padding);
         this.Layout(constraint);
         }
         var result = minerva.Size.fromRaw(this._ActualWidth, this._ActualHeight);
         if (padding)
         minerva.Thickness.growSize(padding, result);
         return result;
         }
         */
        /*
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
         */

        _TextChanged (args: IDependencyPropertyChangedEventArgs) {
            if (this._SetsValue) {
                this._SetTextInternal(args.NewValue);
                this._UpdateLayoutAttributes();
                this.LayoutUpdater.invalidateTextMetrics();
            } else {
                this._UpdateLayoutAttributes();
            }
        }

        private _UpdateLayoutAttributes () {
            var xobj = this.XObject;
            var inlines = xobj.Inlines;

            var lu = this.LayoutUpdater;
            lu.invalidateFont();

            var length = 0;
            var runs: Text.ITextAttributes[] = [];
            var count = inlines.Count;
            var enumerator = inlines.getEnumerator();
            while (enumerator.moveNext()) {
                length = this._UpdateLayoutAttributesForInline(<Documents.Inline>enumerator.current, length, runs);
            }
            if (count > 0)
                this._WasSet = true;
            this._Layout.Text = xobj.Text;
            this._Layout.TextAttributes = runs;
        }

        private _UpdateLayoutAttributesForInline (item: Documents.Inline, length: number, runs: Text.ITextAttributes[]): number {
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
                var enumerator = inlines.getEnumerator();
                while (enumerator.moveNext()) {
                    length = this._UpdateLayoutAttributesForInline(<Documents.Inline>enumerator.current, length, runs);
                }
            }
            return length;
        }

        private _GetTextInternal (inlines: Documents.InlineCollection) {
            if (!inlines)
                return "";
            var block = "";
            var enumerator = inlines.getEnumerator();
            while (enumerator.moveNext()) {
                block += (<Documents.Inline>enumerator.current)._SerializeText();
            }
            return block;
        }

        private _SetTextInternal (text: string) {
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

        InlinesChanged (newInline: Documents.Inline, isAdd: boolean) {
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

            this.LayoutUpdater.invalidateTextMetrics();
        }
    }
    Fayde.RegisterType(TextBlockNode, "Fayde.Controls");

    export class TextBlock extends FrameworkElement implements IFontChangeable {
        XamlNode: TextBlockNode;

        CreateNode (): TextBlockNode {
            return new TextBlockNode(this);
        }

        CreateLayoutUpdater () {
            return new TextBlockUpdater();
        }

        static PaddingProperty = DependencyProperty.RegisterCore("Padding", () => Thickness, TextBlock);
        static FontFamilyProperty = InheritableOwner.FontFamilyProperty.ExtendTo(TextBlock);
        static FontSizeProperty = InheritableOwner.FontSizeProperty.ExtendTo(TextBlock);
        static FontStretchProperty = InheritableOwner.FontStretchProperty.ExtendTo(TextBlock);
        static FontStyleProperty = InheritableOwner.FontStyleProperty.ExtendTo(TextBlock);
        static FontWeightProperty = InheritableOwner.FontWeightProperty.ExtendTo(TextBlock);
        static ForegroundProperty = InheritableOwner.ForegroundProperty.ExtendTo(TextBlock);
        static TextDecorationsProperty = InheritableOwner.TextDecorationsProperty.ExtendTo(TextBlock);
        static TextProperty = DependencyProperty.Register("Text", () => String, TextBlock, "", (d, args) => (<TextBlock>d).XamlNode._TextChanged(args));
        static InlinesProperty = DependencyProperty.RegisterImmutable<Documents.InlineCollection>("Inlines", () => Documents.InlineCollection, TextBlock);
        static LineStackingStrategyProperty = DependencyProperty.RegisterCore("LineStackingStrategy", () => new Enum(LineStackingStrategy), TextBlock, LineStackingStrategy.MaxHeight);
        static LineHeightProperty = DependencyProperty.RegisterCore("LineHeight", () => Number, TextBlock, NaN);
        static TextAlignmentProperty = DependencyProperty.RegisterCore("TextAlignment", () => new Enum(TextAlignment), TextBlock, TextAlignment.Left);
        static TextTrimmingProperty = DependencyProperty.RegisterCore("TextTrimming", () => new Enum(TextTrimming), TextBlock, TextTrimming.None);
        static TextWrappingProperty = DependencyProperty.RegisterCore("TextWrapping", () => new Enum(TextWrapping), TextBlock, TextWrapping.NoWrap);
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

        constructor () {
            super();

            var inlines = TextBlock.InlinesProperty.Initialize(this);
            inlines.AttachTo(this);
            ReactTo(inlines, this, (change?) => this.XamlNode.InlinesChanged(change.item, change.add));
        }

        /*
         MeasureOverride(availableSize: minerva.Size): minerva.Size {
         var constraint = minerva.Size.copyTo(availableSize);
         var padding = this.Padding;
         if (padding) minerva.Size.shrinkByThickness(constraint, padding);
         var desired = this.XamlNode.Measure(constraint);
         if (padding) minerva.Size.growByThickness(desired, padding);
         return desired;
         }
         ArrangeOverride(finalSize: minerva.Size): minerva.Size {
         var constraint = minerva.Size.copyTo(finalSize);
         var padding = this.Padding;
         if (padding) minerva.Size.shrinkByThickness(constraint, padding);
         this.XamlNode.Arrange(constraint, padding);
         return finalSize;
         }
         */

        FontChanged (args: IDependencyPropertyChangedEventArgs) {
            var name = args.Property.Name;
            name = name.charAt(0).toLowerCase() + name.substr(1);

            var updater = this.XamlNode.LayoutUpdater;
            updater.assets[name] = args.NewValue;
            updater.invalidateFont();
        }

        IsInheritable (propd: DependencyProperty): boolean {
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

    module reactions {
        UIReaction<Thickness>(TextBlock.PaddingProperty, (upd: TextBlockUpdater, ov, nv) => upd.invalidateTextMetrics(), false);
        UIReaction<minerva.LineStackingStrategy>(TextBlock.LineStackingStrategyProperty, (upd: TextBlockUpdater, ov, nv) => upd.invalidateTextMetrics(), false);
        UIReaction<number>(TextBlock.LineHeightProperty, (upd: TextBlockUpdater, ov, nv) => upd.invalidateTextMetrics(), false);
        UIReaction<minerva.TextAlignment>(TextBlock.TextAlignmentProperty, (upd: TextBlockUpdater, ov, nv) => upd.invalidateTextMetrics(), false);
        UIReaction<minerva.TextTrimming>(TextBlock.TextTrimmingProperty, (upd: TextBlockUpdater, ov, nv) => upd.invalidateTextMetrics(), false);
        UIReaction<minerva.TextWrapping>(TextBlock.TextWrappingProperty, (upd: TextBlockUpdater, ov, nv) => upd.invalidateTextMetrics(), false);
    }

    //TODO: Implement textblock updater
    /*
     export class TextBlockLayoutUpdater extends LayoutUpdater {
     ComputeActualSize(): minerva.Size {
     var node = <TextBlockNode>this.Node;
     var tb = <TextBlock>node.XObject;
     return node.ComputeActualSize(this, tb.Padding);
     }

     ComputeExtents(actualSize: minerva.Size) {
     var node = <TextBlockNode>this.Node;
     minerva.Rect.copyTo(node._Layout.RenderExtents, this.Extents);
     var padding = node.XObject.Padding;
     if (padding) {
     this.Extents.X += padding.Left;
     this.Extents.Y += padding.Top;
     }
     minerva.Rect.copyTo(this.Extents, this.ExtentsWithChildren);
     }

     Render(ctx: RenderContextEx, region: minerva.Rect) {
     ctx.save();
     this.RenderLayoutClip(ctx);
     var node = <TextBlockNode>this.Node;
     node.Render(ctx);
     ctx.restore();
     }
     }
     */
}