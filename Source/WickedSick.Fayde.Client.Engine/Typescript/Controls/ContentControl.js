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
            ContentControlNode.prototype._GetDefaultTemplate = function () {
                var xobj = this.XObject;
                var content = xobj.Content;
                if(content instanceof Fayde.UIElement) {
                    return content;
                }
                if(content) {
                    var fr = this.FallbackRoot;
                    fr.XamlNode.DataContext = content;
                    return fr;
                }
            };
            ContentControlNode.prototype.OnContentChanged = function (newContent) {
                if(this._FallbackRoot) {
                    this._FallbackRoot.XamlNode.DataContext = newContent;
                }
            };
            Object.defineProperty(ContentControlNode.prototype, "FallbackRoot", {
                get: function () {
                    var fr = this._FallbackRoot;
                    if(!fr) {
                        var ft = ContentControlNode._FallbackTemplate;
                        if(!ft) {
                            ft = ContentControlNode._CreateFallbackTemplate();
                        }
                        fr = this._FallbackRoot = ft.GetVisualTree(this.XObject);
                    }
                    return fr;
                },
                enumerable: true,
                configurable: true
            });
            ContentControlNode._CreateFallbackTemplate = // <ControlTemplate><Grid><TextBlock Text="{Binding}" /></Grid></ControlTemplate>
            function _CreateFallbackTemplate() {
                return new Controls.ControlTemplate(ContentControl, {
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
            ContentControl.ContentProperty = DependencyProperty.RegisterCore("Content", function () {
                return Object;
            }, ContentControl, undefined, function (d, args) {
                return (d)._ContentChanged(args);
            });
            ContentControl.ContentTemplateProperty = DependencyProperty.RegisterCore("ContentTemplate", function () {
                return Controls.ControlTemplate;
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
                this.XamlNode.OnContentChanged(args.NewValue);
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
