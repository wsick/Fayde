var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Fayde;
(function (Fayde) {
    /// <reference path="Control.ts" />
    /// CODE
    /// <reference path="Grid.ts" />
    /// <reference path="../Markup/BindingMarkup.ts" />
    (function (Controls) {
        var ContentControlNode = (function (_super) {
            __extends(ContentControlNode, _super);
            function ContentControlNode(xobj) {
                        _super.call(this, xobj);
            }
            ContentControlNode.prototype.GetDefaultVisualTree = function () {
                var xobj = this.XObject;
                var content = xobj.Content;
                if(content instanceof Fayde.UIElement) {
                    return content;
                }
                var presenter = new Controls.ContentPresenter();
                presenter.TemplateOwner = this.XObject;
                presenter.SetValue(Controls.ContentPresenter.ContentProperty, new Fayde.TemplateBindingExpression(ContentControl.ContentProperty, Controls.ContentPresenter.ContentProperty, "Content"));
                presenter.SetValue(Controls.ContentPresenter.ContentTemplateProperty, new Fayde.TemplateBindingExpression(ContentControl.ContentTemplateProperty, Controls.ContentPresenter.ContentTemplateProperty, "ContentTemplate"));
                return presenter;
            };
            return ContentControlNode;
        })(Controls.ControlNode);
        Controls.ContentControlNode = ContentControlNode;        
        Nullstone.RegisterType(ContentControlNode, "ContentControlNode");
        var ContentControl = (function (_super) {
            __extends(ContentControl, _super);
            function ContentControl() {
                _super.apply(this, arguments);

                this._ContentSetsParent = true;
            }
            ContentControl.prototype.CreateNode = function () {
                return new ContentControlNode(this);
            };
            ContentControl.ContentProperty = DependencyProperty.Register("Content", function () {
                return Object;
            }, ContentControl, undefined, function (d, args) {
                return (d)._ContentChanged(args);
            });
            ContentControl.ContentTemplateProperty = DependencyProperty.Register("ContentTemplate", function () {
                return Fayde.DataTemplate;
            }, ContentControl, undefined, function (d, args) {
                return (d)._ContentTemplateChanged(args);
            });
            ContentControl.Annotations = {
                ContentProperty: ContentControl.ContentProperty
            };
            ContentControl.prototype.OnContentChanged = function (oldContent, newContent) {
            };
            ContentControl.prototype.OnContentTemplateChanged = function (oldContentTemplate, newContentTemplate) {
            };
            ContentControl.prototype._ContentChanged = function (args) {
                if(args.OldValue instanceof Fayde.UIElement) {
                    this.XamlNode.DetachVisualChild(args.OldValue, null);
                }
                this.OnContentChanged(args.OldValue, args.NewValue);
                this.XamlNode.LayoutUpdater.InvalidateMeasure();
            };
            ContentControl.prototype._ContentTemplateChanged = function (args) {
                this.OnContentTemplateChanged(args.OldValue, args.NewValue);
                this.XamlNode.LayoutUpdater.InvalidateMeasure();
            };
            return ContentControl;
        })(Controls.Control);
        Controls.ContentControl = ContentControl;        
        Nullstone.RegisterType(ContentControl, "ContentControl");
    })(Fayde.Controls || (Fayde.Controls = {}));
    var Controls = Fayde.Controls;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=ContentControl.js.map
