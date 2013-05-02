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
    /// <reference path="ControlTemplate.ts" />
    /// <reference path="Grid.ts" />
    /// <reference path="../Markup/BindingMarkup.ts" />
    (function (Controls) {
        var ContentPresenterNode = (function (_super) {
            __extends(ContentPresenterNode, _super);
            function ContentPresenterNode(xobj) {
                        _super.call(this, xobj);
            }
            ContentPresenterNode.prototype._ClearRoot = function () {
                if(this._ContentRoot) {
                    this.DetachVisualChild(this._ContentRoot, null);
                }
                this._ContentRoot = null;
            };
            Object.defineProperty(ContentPresenterNode.prototype, "FallbackRoot", {
                get: function () {
                    var fr = this._FallbackRoot;
                    if(!fr) {
                        var ft = this._FallbackTemplate;
                        if(!ft) {
                            ft = this._CreateFallbackTemplate();
                        }
                        fr = this._FallbackRoot = ft.GetVisualTree(this.XObject);
                    }
                    return fr;
                },
                enumerable: true,
                configurable: true
            });
            ContentPresenterNode.prototype._CreateFallbackTemplate = // <ControlTemplate><Grid><TextBlock Text="{Binding}" /></Grid></ControlTemplate>
            function () {
                return new Controls.ControlTemplate(ContentPresenter, {
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
                //TODO: ControlTemplate wants a res chain, do we need to pass it our res chain?
                            };
            ContentPresenterNode.prototype.InvokeLoaded = function () {
                var xobj = this.XObject;
                if(xobj.Content instanceof Fayde.UIElement) {
                    xobj.ClearValue(Fayde.DependencyObject.DataContextProperty);
                } else {
                    xobj.SetValue(Fayde.DependencyObject.DataContextProperty, xobj.Content);
                }
            };
            ContentPresenterNode.prototype._GetDefaultTemplate = function () {
                var xobj = this.XObject;
                if(xobj.TemplateOwner instanceof Controls.ContentControl) {
                    if(xobj.ReadLocalValue(ContentPresenter.ContentProperty) instanceof Fayde.UnsetValue) {
                        xobj.SetValue(ContentPresenter.ContentProperty, new Fayde.TemplateBindingExpression(Controls.ContentControl.ContentProperty, ContentPresenter.ContentProperty, "Content"));
                    }
                    if(xobj.ReadLocalValue(ContentPresenter.ContentTemplateProperty) instanceof Fayde.UnsetValue) {
                        xobj.SetValue(ContentPresenter.ContentTemplateProperty, new Fayde.TemplateBindingExpression(Controls.ContentControl.ContentTemplateProperty, ContentPresenter.ContentTemplateProperty, "ContentTemplate"));
                    }
                }
                if(xobj.ContentTemplate) {
                    var vt = xobj.ContentTemplate.GetVisualTree(this.XObject);
                    if(vt instanceof Fayde.UIElement) {
                        this._ContentRoot = vt;
                    }
                } else {
                    var content = xobj.Content;
                    if(content instanceof Fayde.UIElement) {
                        this._ContentRoot = content;
                    }
                    if(!this._ContentRoot && content) {
                        this._ContentRoot = this.FallbackRoot;
                    }
                }
                return this._ContentRoot;
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
                return (d)._ContentChanged(args);
            });
            ContentPresenter.ContentTemplateProperty = DependencyProperty.Register("ContentTemplate", function () {
                return Fayde.DataTemplate;
            }, ContentPresenter, undefined, function (d, args) {
                return (d)._ContentTemplateChanged(args);
            });
            ContentPresenter.Annotations = {
                ContentProperty: ContentPresenter.ContentProperty
            };
            ContentPresenter.prototype._ContentChanged = function (args) {
                var node = this.XamlNode;
                var newContent = args.NewValue;
                var newUie;
                if(newContent instanceof Fayde.UIElement) {
                    newUie = newContent;
                }
                if(newUie || args.OldValue instanceof Fayde.UIElement) {
                    node._ClearRoot();
                }
                if(newContent && !newUie) {
                    this._Store.SetValue(Fayde.DependencyObject.DataContextProperty, newContent);
                } else {
                    this._Store.ClearValue(Fayde.DependencyObject.DataContextProperty);
                }
                node.LayoutUpdater.InvalidateMeasure();
            };
            ContentPresenter.prototype._ContentTemplateChanged = function (args) {
                var node = this.XamlNode;
                node._ClearRoot();
                node.LayoutUpdater.InvalidateMeasure();
            };
            return ContentPresenter;
        })(Fayde.FrameworkElement);
        Controls.ContentPresenter = ContentPresenter;        
        Nullstone.RegisterType(ContentPresenter, "ContentPresenter");
    })(Fayde.Controls || (Fayde.Controls = {}));
    var Controls = Fayde.Controls;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=ContentPresenter.js.map
