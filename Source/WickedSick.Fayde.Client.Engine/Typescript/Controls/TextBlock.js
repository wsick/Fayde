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
    /// <reference path="../Text/TextLayout.ts" />
    (function (Controls) {
        var TextBlockNode = (function (_super) {
            __extends(TextBlockNode, _super);
            function TextBlockNode(xobj) {
                        _super.call(this, xobj);
            }
            TextBlockNode.prototype.GetInheritedWalker = function () {
                var coll = (this.XObject).GetValue(TextBlock.InlinesProperty);
                if(coll) {
                    return (coll).GetEnumerator();
                }
            };
            TextBlockNode.prototype.ComputeBounds = function (baseComputer, lu) {
                rect.copyTo(this._Layout.GetRenderExtents(), lu.Extents);
                var padding = this.XObject.Padding;
                lu.Extents.X += padding.Left;
                lu.Extents.Y += padding.Top;
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
                this._Layout.SetAvailableWidth(constraint.Width);
                size.growByThickness(arranged, padding);
            };
            TextBlockNode.prototype.Layout = function (constraint) {
                //TODO: Implement
                            };
            return TextBlockNode;
        })(Fayde.FENode);
        Controls.TextBlockNode = TextBlockNode;        
        Nullstone.RegisterType(TextBlockNode, "TextBlockNode");
        var TextBlock = (function (_super) {
            __extends(TextBlock, _super);
            function TextBlock() {
                _super.apply(this, arguments);

                this._Layout = new Fayde.Text.TextLayout();
            }
            TextBlock.prototype.CreateNode = function () {
                return new TextBlockNode(this);
            };
            TextBlock.prototype._MeasureOverride = function (availableSize, error) {
                var padding = this.Padding;
                var constraint = size.clone(availableSize);
                size.shrinkByThickness(constraint, padding);
                var desired = this.XamlNode.Measure(constraint);
                size.growByThickness(desired, padding);
                return desired;
            };
            TextBlock.prototype._ArrangeOverride = function (finalSize, error) {
                var padding = this.Padding;
                var constraint = size.clone(finalSize);
                size.shrinkByThickness(constraint, padding);
                this.XamlNode.Arrange(constraint, padding);
                return finalSize;
            };
            TextBlock.prototype.Render = function (ctx, lu, region) {
                ctx.Save();
                lu._RenderLayoutClip(ctx);
                var padding = this.Padding;
                var offset = new Point(padding.Left, padding.Top);
                if(this.FlowDirection === Fayde.FlowDirection.RightToLeft) {
                    NotImplemented("TextBlock._Render: Right to left");
                }
                this._Layout.Render(ctx, null, offset);
                ctx.Restore();
            };
            return TextBlock;
        })(Fayde.FrameworkElement);
        Controls.TextBlock = TextBlock;        
        Nullstone.RegisterType(TextBlock, "TextBlock");
    })(Fayde.Controls || (Fayde.Controls = {}));
    var Controls = Fayde.Controls;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=TextBlock.js.map
