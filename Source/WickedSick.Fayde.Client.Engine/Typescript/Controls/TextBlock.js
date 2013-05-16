var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Fayde;
(function (Fayde) {
    /// <reference path="../Core/FrameworkElement.ts" />
    /// CODE
    /// <reference path="../Core/XamlObjectCollection.ts" />
    /// <reference path="../Documents/Run.ts" />
    /// <reference path="../Documents/Span.ts" />
    /// <reference path="../Documents/LineBreak.ts" />
    /// <reference path="../Text/TextLayout.ts" />
    (function (Controls) {
        var TextBlockNode = (function (_super) {
            __extends(TextBlockNode, _super);
            function TextBlockNode(xobj) {
                        _super.call(this, xobj);
                this._ActualWidth = 0.0;
                this._ActualHeight = 0.0;
                this._Layout = new Fayde.Text.TextLayout();
                this._WasSet = true;
                this._Dirty = true;
                this._Font = new Font();
                this._SetsValue = true;
            }
            TextBlockNode.prototype.GetInheritedEnumerator = function () {
                var xobj = this.XObject;
                var inlines = xobj.Inlines;
                if(inlines) {
                    return inlines.GetNodeEnumerator();
                }
            };
            TextBlockNode.prototype.ComputeBounds = function (baseComputer, lu) {
                rect.copyTo(this._Layout.RenderExtents, lu.Extents);
                var padding = this.XObject.Padding;
                if(padding) {
                    lu.Extents.X += padding.Left;
                    lu.Extents.Y += padding.Top;
                }
                rect.copyTo(lu.Extents, lu.ExtentsWithChildren);
                lu.IntersectBoundsWithClipPath(lu.Bounds, lu.AbsoluteXform);
                rect.copyTo(lu.Bounds, lu.BoundsWithChildren);
                lu.ComputeGlobalBounds();
                lu.ComputeSurfaceBounds();
            };
            TextBlockNode.prototype.Measure = function (constraint) {
                this.Layout(constraint);
                return size.fromRaw(this._ActualWidth, this._ActualHeight);
            };
            TextBlockNode.prototype.Arrange = function (constraint, padding) {
                this.Layout(constraint);
                var arranged = size.fromRaw(this._ActualWidth, this._ActualHeight);
                size.max(arranged, constraint);
                this._Layout.AvailableWidth = constraint.Width;
                if(padding) {
                    size.growByThickness(arranged, padding);
                }
            };
            TextBlockNode.prototype.Layout = function (constraint) {
                if(this._WasSet) {
                    if(false) {
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
            };
            TextBlockNode.prototype.ComputeActualSize = function (lu, padding) {
                var constraint = lu.CoerceSize(size.createInfinite());
                if(lu.PreviousConstraint !== undefined || lu.LayoutSlot !== undefined) {
                    this._Layout.Layout();
                    var actuals = this._Layout.ActualExtents;
                    this._ActualWidth = actuals.Width;
                    this._ActualHeight = actuals.Height;
                } else {
                    if(padding) {
                        size.shrinkByThickness(constraint, padding);
                    }
                    this.Layout(constraint);
                }
                var result = size.fromRaw(this._ActualWidth, this._ActualHeight);
                if(padding) {
                    size.growByThickness(result, padding);
                }
                return result;
            };
            TextBlockNode.prototype._CanFindElement = function () {
                return true;
            };
            TextBlockNode.prototype._FontChanged = function (args) {
                this._UpdateFonts(false);
                this._InvalidateDirty();
            };
            TextBlockNode.prototype._TextChanged = function (args) {
                if(this._SetsValue) {
                    this._SetTextInternal(args.NewValue);
                    this._UpdateLayoutAttributes();
                    this._InvalidateDirty(true);
                } else {
                    this._UpdateLayoutAttributes();
                }
            };
            TextBlockNode.prototype._LineStackingStrategyChanged = function (args) {
                this._Dirty = this._Layout.SetLineStackingStategy(args.NewValue);
                this._InvalidateDirty();
            };
            TextBlockNode.prototype._LineHeightChanged = function (args) {
                this._Dirty = this._Layout.SetLineHeight(args.NewValue);
                this._InvalidateDirty();
            };
            TextBlockNode.prototype._TextAlignmentChanged = function (args) {
                this._Dirty = this._Layout.SetTextAlignment(args.NewValue);
                this._InvalidateDirty();
            };
            TextBlockNode.prototype._TextTrimmingChanged = function (args) {
                this._Dirty = this._Layout.SetTextTrimming(args.NewValue);
                this._InvalidateDirty();
            };
            TextBlockNode.prototype._TextWrappingChanged = function (args) {
                this._Dirty = this._Layout.SetTextWrapping(args.NewValue);
                this._InvalidateDirty();
            };
            TextBlockNode.prototype._InvalidateDirty = function (setDirty) {
                if(setDirty) {
                    this._Dirty = true;
                }
                var lu = this.LayoutUpdater;
                if(this._Dirty) {
                    lu.InvalidateMeasure();
                    lu.InvalidateArrange();
                    lu.UpdateBounds(true);
                }
                lu.Invalidate();
            };
            TextBlockNode.prototype._UpdateFont = function (force) {
                var f = this._Font;
                var xobj = this.XObject;
                f.Family = xobj.FontFamily;
                f.Stretch = xobj.FontStretch;
                f.Style = xobj.FontStyle;
                f.Weight = xobj.FontWeight;
                f.Size = xobj.FontSize;
                return f.IsChanged || force;
            };
            TextBlockNode.prototype._UpdateFonts = function (force) {
                if(!this._UpdateFont(force)) {
                    return false;
                }
                var lu = this.LayoutUpdater;
                lu.InvalidateMeasure();
                lu.InvalidateArrange();
                lu.UpdateBounds(true);
                this._Dirty = true;
                return true;
            };
            TextBlockNode.prototype._UpdateLayoutAttributes = function () {
                var xobj = this.XObject;
                var inlines = xobj.Inlines;
                var lu = this.LayoutUpdater;
                lu.InvalidateMeasure();
                lu.InvalidateArrange();
                this._UpdateFont(false);
                var length = 0;
                var runs = [];
                var count = inlines.Count;
                var enumerator = inlines.GetEnumerator();
                while(enumerator.MoveNext()) {
                    length = this._UpdateLayoutAttributesForInline(enumerator.Current, length, runs);
                }
                if(count > 0) {
                    this._WasSet = true;
                }
                this._Layout.Text = xobj.Text;
                this._Layout.TextAttributes = runs;
            };
            TextBlockNode.prototype._UpdateLayoutAttributesForInline = function (item, length, runs) {
                if(item instanceof Fayde.Documents.Run) {
                    var text = (item).Text;
                    if(text && text.length) {
                        runs.push(new Fayde.Text.TextLayoutAttributes(item, length));
                        length += text.length;
                    }
                } else if(item instanceof Fayde.Documents.LineBreak) {
                    runs.push(new Fayde.Text.TextLayoutAttributes(item, length));
                    length += 1//line break length
                    ;
                } else if(item instanceof Fayde.Documents.Span) {
                    var inlines = (item).Inlines;
                    var enumerator = inlines.GetEnumerator();
                    while(enumerator.MoveNext()) {
                        length = this._UpdateLayoutAttributesForInline(enumerator.Current, length, runs);
                    }
                }
                return length;
            };
            TextBlockNode.prototype._GetTextInternal = function (inlines) {
                if(!inlines) {
                    return "";
                }
                var block = "";
                var enumerator = inlines.GetEnumerator();
                while(enumerator.MoveNext()) {
                    block += (enumerator.Current)._SerializeText();
                }
                return block;
            };
            TextBlockNode.prototype._SetTextInternal = function (text) {
                this._SetsValue = false;
                var value = null;
                var xobj = this.XObject;
                var inlines = xobj.Inlines;
                if(text) {
                    var count = inlines.Count;
                    var run = null;
                    if(count > 0 && (value = inlines.GetValueAt(0)) && value instanceof Fayde.Documents.Run) {
                        run = value;
                        if(run.Autogen) {
                            while(count > 1) {
                                inlines.RemoveAt(count - 1);
                                count--;
                            }
                        } else {
                            run = null;
                        }
                    }
                    if(!run) {
                        inlines.Clear();
                        run = new Fayde.Documents.Run();
                        run.Autogen = true;
                        inlines.Add(run);
                    }
                    run.Text = text;
                    Fayde.Providers.InheritedStore.PropagateInheritedOnAdd(xobj, run.XamlNode);
                } else {
                    inlines.Clear();
                    xobj.Text = "";
                }
                this._SetsValue = true;
            };
            TextBlockNode.prototype.InlinesChanged = function (newInline, isAdd) {
                if(!this._SetsValue) {
                    return;
                }
                var xobj = this.XObject;
                if(isAdd) {
                    Fayde.Providers.InheritedStore.PropagateInheritedOnAdd(xobj, newInline.XamlNode);
                }
                var inlines = xobj.Inlines;
                this._SetsValue = false;
                xobj.SetStoreValue(TextBlock.TextProperty, this._GetTextInternal(inlines));
                this._SetsValue = true;
                this._UpdateLayoutAttributes();
                var lu = this.LayoutUpdater;
                lu.InvalidateMeasure();
                lu.InvalidateArrange();
                lu.UpdateBounds(true);
                lu.Invalidate();
            };
            return TextBlockNode;
        })(Fayde.FENode);
        Controls.TextBlockNode = TextBlockNode;        
        Nullstone.RegisterType(TextBlockNode, "TextBlockNode");
        var TextBlock = (function (_super) {
            __extends(TextBlock, _super);
            function TextBlock() {
                        _super.call(this);
                var inlines = new Fayde.Documents.InlineCollection();
                inlines.AttachTo(this);
                Object.defineProperty(this, "Inlines", {
                    value: inlines,
                    writable: false
                });
                inlines.Listen(this.XamlNode);
            }
            TextBlock.prototype.CreateNode = function () {
                return new TextBlockNode(this);
            };
            TextBlock.PaddingProperty = DependencyProperty.RegisterCore("Padding", function () {
                return Thickness;
            }, TextBlock, undefined, function (d, args) {
                return (d).XamlNode._InvalidateDirty(true);
            });
            TextBlock.FontFamilyProperty = Fayde.InheritableOwner.FontFamilyProperty;
            TextBlock.FontSizeProperty = Fayde.InheritableOwner.FontSizeProperty;
            TextBlock.FontStretchProperty = Fayde.InheritableOwner.FontStretchProperty;
            TextBlock.FontStyleProperty = Fayde.InheritableOwner.FontStyleProperty;
            TextBlock.FontWeightProperty = Fayde.InheritableOwner.FontWeightProperty;
            TextBlock.ForegroundProperty = Fayde.InheritableOwner.ForegroundProperty;
            TextBlock.TextDecorationsProperty = Fayde.InheritableOwner.TextDecorationsProperty;
            TextBlock.TextProperty = DependencyProperty.Register("Text", function () {
                return String;
            }, TextBlock, "", function (d, args) {
                return (d).XamlNode._TextChanged(args);
            });
            TextBlock.LineStackingStrategyProperty = DependencyProperty.RegisterCore("LineStackingStrategy", function () {
                return new Enum(Fayde.LineStackingStrategy);
            }, TextBlock, Fayde.LineStackingStrategy.MaxHeight, function (d, args) {
                return (d).XamlNode._LineStackingStrategyChanged(args);
            });
            TextBlock.LineHeightProperty = DependencyProperty.RegisterCore("LineHeight", function () {
                return Number;
            }, TextBlock, NaN, function (d, args) {
                return (d).XamlNode._LineHeightChanged(args);
            });
            TextBlock.TextAlignmentProperty = DependencyProperty.RegisterCore("TextAlignment", function () {
                return new Enum(Fayde.TextAlignment);
            }, TextBlock, Fayde.TextAlignment.Left, function (d, args) {
                return (d).XamlNode._TextAlignmentChanged(args);
            });
            TextBlock.TextTrimmingProperty = DependencyProperty.RegisterCore("TextTrimming", function () {
                return new Enum(Controls.TextTrimming);
            }, TextBlock, Controls.TextTrimming.None, function (d, args) {
                return (d).XamlNode._TextTrimmingChanged(args);
            });
            TextBlock.TextWrappingProperty = DependencyProperty.RegisterCore("TextWrapping", function () {
                return new Enum(Controls.TextWrapping);
            }, TextBlock, Controls.TextWrapping.NoWrap, function (d, args) {
                return (d).XamlNode._TextWrappingChanged(args);
            });
            TextBlock.Annotations = {
                ContentProperty: "Inlines"
            };
            TextBlock.prototype._MeasureOverride = function (availableSize, error) {
                var constraint = size.copyTo(availableSize);
                var padding = this.Padding;
                if(padding) {
                    size.shrinkByThickness(constraint, padding);
                }
                var desired = this.XamlNode.Measure(constraint);
                if(padding) {
                    size.growByThickness(desired, padding);
                }
                return desired;
            };
            TextBlock.prototype._ArrangeOverride = function (finalSize, error) {
                var constraint = size.copyTo(finalSize);
                var padding = this.Padding;
                if(padding) {
                    size.shrinkByThickness(constraint, padding);
                }
                this.XamlNode.Arrange(constraint, padding);
                return finalSize;
            };
            TextBlock.prototype.Render = function (ctx, lu, region) {
                ctx.Save();
                lu._RenderLayoutClip(ctx);
                var padding = this.Padding;
                var offset = null;
                if(padding) {
                    offset = new Point(padding.Left, padding.Top);
                }
                if(this.FlowDirection === Fayde.FlowDirection.RightToLeft) {
                    NotImplemented("TextBlock._Render: Right to left");
                }
                this.XamlNode._Layout.Render(ctx, null, offset);
                ctx.Restore();
            };
            TextBlock.prototype.ComputeActualSize = function (baseComputer, lu) {
                return this.XamlNode.ComputeActualSize(lu, this.Padding);
            };
            TextBlock.prototype._ForegroundChanged = function (args) {
                var _this = this;
                var newBrush = args.NewValue;
                if(this._ForegroundListener) {
                    this._ForegroundListener.Detach();
                }
                this._ForegroundListener = null;
                if(newBrush) {
                    this._ForegroundListener = newBrush.Listen(function (brush) {
                        return _this.BrushChanged(brush);
                    });
                }
            };
            TextBlock.prototype.BrushChanged = function (newBrush) {
                this.XamlNode.LayoutUpdater.Invalidate();
            };
            TextBlock.prototype.FontChanged = function (args) {
                if(args.Property === Fayde.InheritableOwner.TextDecorationsProperty) {
                    this.XamlNode._InvalidateDirty();
                } else {
                    this.XamlNode._FontChanged(args);
                }
            };
            return TextBlock;
        })(Fayde.FrameworkElement);
        Controls.TextBlock = TextBlock;        
        Nullstone.RegisterType(TextBlock, "TextBlock");
    })(Fayde.Controls || (Fayde.Controls = {}));
    var Controls = Fayde.Controls;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=TextBlock.js.map
