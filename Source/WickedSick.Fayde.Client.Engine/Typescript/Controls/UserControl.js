var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Fayde;
(function (Fayde) {
    /// <reference path="Control.ts" />
    /// CODE
    (function (Controls) {
        var UCNode = (function (_super) {
            __extends(UCNode, _super);
            function UCNode(xobj) {
                        _super.call(this, xobj);
                this._IsParsing = false;
                this.LayoutUpdater.BreaksLayoutClipRender = true;
                this.LayoutUpdater.SetContainerMode(true);
            }
            UCNode.prototype.GetDefaultTemplate = function () {
                var xobj = this.XObject;
                var type = (xobj).constructor;
                var json = type.__TemplateJson;
                if(json) {
                    this._IsParsing = true;
                    return Fayde.JsonParser.ParseUserControl(json, this);
                    this._IsParsing = false;
                }
            };
            return UCNode;
        })(Controls.ControlNode);
        Controls.UCNode = UCNode;        
        Nullstone.RegisterType(UCNode, "UCNode");
        var UserControl = (function (_super) {
            __extends(UserControl, _super);
            function UserControl() {
                _super.apply(this, arguments);

            }
            UserControl.ContentProperty = DependencyProperty.Register("Content", function () {
                return Object;
            }, UserControl, undefined, function (d, args) {
                return (d)._InvalidateContent(args);
            });
            UserControl.Annotations = {
                ContentProperty: UserControl.ContentProperty
            };
            UserControl.prototype.CreateNode = function () {
                return new UCNode(this);
            };
            UserControl.prototype.InitializeComponent = function () {
                this.ApplyTemplate();
            };
            UserControl.prototype._InvalidateContent = function (args) {
                var node = this.XamlNode;
                if(node._IsParsing) {
                    return;
                }
                var error = new BError();
                if(args.OldValue instanceof Fayde.UIElement) {
                    node.DetachVisualChild(args.OldValue, error);
                }
                if(args.NewValue instanceof Fayde.UIElement) {
                    node.AttachVisualChild(args.NewValue, error);
                }
                if(error.Message) {
                    error.ThrowException();
                }
                node.LayoutUpdater.UpdateBounds();
            };
            UserControl.prototype._MeasureOverride = function (availableSize, error) {
                var desired;
                availableSize = size.clone(availableSize);
                var border = this.Padding.Plus(this.BorderThickness);
                size.shrinkByThickness(availableSize, border);
                var enumerator = this.XamlNode.GetVisualTreeEnumerator();
                while(enumerator.MoveNext()) {
                    var childLu = (enumerator.Current).LayoutUpdater;
                    childLu._Measure(availableSize, error);
                    desired = size.clone(childLu.DesiredSize);
                }
                if(!desired) {
                    desired = new size();
                }
                size.growByThickness(desired, border);
                return desired;
            };
            UserControl.prototype._ArrangeOverride = function (finalSize, error) {
                var border = this.Padding.Plus(this.BorderThickness);
                var arranged;
                var enumerator = this.XamlNode.GetVisualTreeEnumerator();
                while(enumerator.MoveNext()) {
                    var childLu = (enumerator.Current).LayoutUpdater;
                    var childRect = rect.fromSize(finalSize);
                    rect.shrinkByThickness(childRect, border);
                    childLu._Arrange(childRect, error);
                    arranged = size.fromRect(childRect);
                    size.growByThickness(arranged, border);
                }
                if(!arranged) {
                    return finalSize;
                }
                return arranged;
            };
            return UserControl;
        })(Controls.Control);
        Controls.UserControl = UserControl;        
        Nullstone.RegisterType(UserControl, "UserControl");
    })(Fayde.Controls || (Fayde.Controls = {}));
    var Controls = Fayde.Controls;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=UserControl.js.map
