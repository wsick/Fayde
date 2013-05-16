var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Fayde;
(function (Fayde) {
    /// <reference path="../Core/FrameworkElement.ts" />
    /// CODE
    /// <reference path="../Core/TemplateBindingExpression.ts" />
    /// <reference path="ContentControl.ts" />
    /// <reference path="Grid.ts" />
    /// <reference path="../Markup/BindingMarkup.ts" />
    /// <reference path="../Core/DataTemplate.ts" />
    (function (Controls) {
        var ContentPresenterNode = (function (_super) {
            __extends(ContentPresenterNode, _super);
            function ContentPresenterNode(xobj) {
                        _super.call(this, xobj);
            }
            Object.defineProperty(ContentPresenterNode.prototype, "ContentRoot", {
                get: function () {
                    return this._ContentRoot;
                },
                enumerable: true,
                configurable: true
            });
            ContentPresenterNode.prototype.DoApplyTemplateWithError = function (error) {
                if(this._ContentRoot) {
                    return false;
                }
                var xobj = this.XObject;
                if(xobj.TemplateOwner instanceof Controls.ContentControl) {
                    if(xobj.ReadLocalValue(ContentPresenter.ContentProperty) === Fayde.UnsetValue) {
                        xobj.SetValue(ContentPresenter.ContentProperty, new Fayde.TemplateBindingExpression(Controls.ContentControl.ContentProperty, ContentPresenter.ContentProperty, "Content"));
                    }
                    if(xobj.ReadLocalValue(ContentPresenter.ContentTemplateProperty) === Fayde.UnsetValue) {
                        xobj.SetValue(ContentPresenter.ContentTemplateProperty, new Fayde.TemplateBindingExpression(Controls.ContentControl.ContentTemplateProperty, ContentPresenter.ContentTemplateProperty, "ContentTemplate"));
                    }
                }
                var content = xobj.Content;
                if(!content) {
                    return false;
                }
                if(content instanceof Fayde.UIElement) {
                    this._ContentRoot = content;
                } else {
                    this._ContentRoot = (xobj.ContentTemplate || this.FallbackTemplate).GetVisualTree(xobj);
                }
                if(!this._ContentRoot) {
                    return false;
                }
                return this.AttachVisualChild(this._ContentRoot, error);
            };
            ContentPresenterNode.prototype.ClearRoot = function () {
                if(this._ContentRoot) {
                    this.DetachVisualChild(this._ContentRoot, null);
                }
                this._ContentRoot = null;
            };
            Object.defineProperty(ContentPresenterNode.prototype, "FallbackTemplate", {
                get: // <DataTemplate><Grid><TextBlock Text="{Binding}" /></Grid></DataTemplate>
                function () {
                    return new Fayde.DataTemplate({
                        ParseType: Controls.Grid,
                        Children: [
                            {
                                ParseType: Controls.TextBlock,
                                Props: {
                                    Text: new Fayde.BindingMarkup({
                                    })
                                }
                            }
                        ]
                    });
                },
                enumerable: true,
                configurable: true
            });
            ContentPresenterNode.prototype._ContentChanged = function (args) {
                var newContent = args.NewValue;
                var newUie;
                if(newContent instanceof Fayde.UIElement) {
                    newUie = newContent;
                }
                if(newUie || args.OldValue instanceof Fayde.UIElement) {
                    this.ClearRoot();
                }
                if(newContent && !newUie) {
                    this.XObject.DataContext = newContent;
                } else {
                    this.XObject.DataContext = undefined;
                }
                this.LayoutUpdater.InvalidateMeasure();
            };
            ContentPresenterNode.prototype._ContentTemplateChanged = function () {
                this.ClearRoot();
                this.LayoutUpdater.InvalidateMeasure();
            };
            return ContentPresenterNode;
        })(Fayde.FENode);
        Controls.ContentPresenterNode = ContentPresenterNode;        
        Nullstone.RegisterType(ContentPresenterNode, "ContentPresenterNode");
        var ContentPresenter = (function (_super) {
            __extends(ContentPresenter, _super);
            function ContentPresenter() {
                _super.apply(this, arguments);

            }
            ContentPresenter.prototype.CreateNode = function () {
                return new ContentPresenterNode(this);
            };
            ContentPresenter.ContentProperty = DependencyProperty.Register("Content", function () {
                return Object;
            }, ContentPresenter, undefined, function (d, args) {
                return (d).XamlNode._ContentChanged(args);
            });
            ContentPresenter.ContentTemplateProperty = DependencyProperty.Register("ContentTemplate", function () {
                return Fayde.DataTemplate;
            }, ContentPresenter, undefined, function (d, args) {
                return (d).XamlNode._ContentTemplateChanged();
            });
            ContentPresenter.Annotations = {
                ContentProperty: ContentPresenter.ContentProperty
            };
            return ContentPresenter;
        })(Fayde.FrameworkElement);
        Controls.ContentPresenter = ContentPresenter;        
        Nullstone.RegisterType(ContentPresenter, "ContentPresenter");
    })(Fayde.Controls || (Fayde.Controls = {}));
    var Controls = Fayde.Controls;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=ContentPresenter.js.map
