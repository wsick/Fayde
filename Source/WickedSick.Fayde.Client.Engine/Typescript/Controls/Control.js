var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Fayde;
(function (Fayde) {
    /// <reference path="../Core/FrameworkElement.ts" />
    /// CODE
    /// <reference path="../Core/Providers/ControlProviderStore.ts" />
    /// <reference path="../Media/VSM/VisualStateManager.ts" />
    (function (Controls) {
        var ControlNode = (function (_super) {
            __extends(ControlNode, _super);
            function ControlNode(xobj) {
                        _super.call(this, xobj);
                this.IsFocused = false;
                this.LayoutUpdater.SetContainerMode(true);
            }
            ControlNode.prototype.TabTo = function () {
                var xobj = this.XObject;
                return xobj.IsEnabled && xobj.IsTabStop && xobj.Focus();
            };
            ControlNode.prototype._ElementAdded = function (uie) {
                this.SetSubtreeNode(uie.XamlNode);
                _super.prototype._ElementAdded.call(this, uie);
            };
            ControlNode.prototype._ElementRemoved = function (uie) {
                this.SetSubtreeNode(null);
                _super.prototype._ElementRemoved.call(this, uie);
            };
            ControlNode.prototype._DoApplyTemplateWithError = function (error) {
                var xobj = this.XObject;
                var t = xobj.Template;
                if(!t) {
                    return _super.prototype._DoApplyTemplateWithError.call(this, error);
                }
                var root = t._GetVisualTreeWithError(xobj, error);
                if(root && !(root instanceof Fayde.UIElement)) {
                    Warn("Root element in template was not a UIElement.");
                    root = null;
                }
                if(!root) {
                    return _super.prototype._DoApplyTemplateWithError.call(this, error);
                }
                if(this.TemplateRoot && this.TemplateRoot !== root) {
                    this._ElementRemoved(this.TemplateRoot);
                    this.TemplateRoot = null;
                }
                this.TemplateRoot = root;
                this._ElementAdded(this.TemplateRoot);
                //TODO: Deployment Loaded Event (Async)
                return true;
            };
            ControlNode.prototype.OnIsAttachedChanged = function (newIsAttached) {
                _super.prototype.OnIsAttachedChanged.call(this, newIsAttached);
                //TODO: Propagate IsEnabled DataSource
                if(!newIsAttached) {
                    Fayde.Media.VSM.VisualStateManager.DestroyStoryboards(this.XObject, this.TemplateRoot);
                }
            };
            ControlNode.prototype._HitTestPoint = function (ctx, p, uielist) {
                if(this.XObject.IsEnabled) {
                    _super.prototype._HitTestPoint.call(this, ctx, p, uielist);
                }
            };
            ControlNode.prototype._CanFindElement = function () {
                return this.XObject.IsEnabled;
            };
            ControlNode.prototype._InsideObject = function (ctx, lu, x, y) {
                return false;
            };
            ControlNode.prototype.CanCaptureMouse = function () {
                return this.XObject.IsEnabled;
            };
            return ControlNode;
        })(Fayde.FENode);
        Controls.ControlNode = ControlNode;        
        Nullstone.RegisterType(ControlNode, "ControlNode");
        var Control = (function (_super) {
            __extends(Control, _super);
            function Control() {
                _super.apply(this, arguments);

            }
            Control.prototype.CreateStore = function () {
                return new Fayde.Providers.ControlProviderStore(this);
            };
            Control.prototype.CreateNode = function () {
                return new ControlNode(this);
            };
            Control.prototype.GetTemplateChild = function (childName) {
                var root = this.XamlNode.TemplateRoot;
                if(root) {
                    var n = root.XamlNode.FindName(name);
                    if(n) {
                        return n.XObject;
                    }
                }
            };
            Control.prototype.ApplyTemplate = function () {
                var error = new BError();
                var result = this.XamlNode._ApplyTemplateWithError(error);
                if(error.Message) {
                    error.ThrowException();
                }
                return result;
            };
            Control.prototype.GetDefaultStyle = function () {
                return undefined;
            };
            Control.prototype.Focus = function () {
                return App.Instance.MainSurface.Focus(this);
            };
            Control.prototype.OnGotFocus = function (e) {
                this.XamlNode.IsFocused = true;
            };
            Control.prototype.OnLostFocus = function (e) {
                this.XamlNode.IsFocused = false;
            };
            Control.prototype.OnKeyDown = function (e) {
            };
            Control.prototype.OnKeyUp = function (e) {
            };
            Control.prototype.OnMouseEnter = function (e) {
            };
            Control.prototype.OnMouseLeave = function (e) {
            };
            Control.prototype.OnMouseLeftButtonDown = function (e) {
            };
            Control.prototype.OnMouseLeftButtonUp = function (e) {
            };
            Control.prototype.OnMouseMove = function (e) {
            };
            Control.prototype.OnMouseRightButtonDown = function (e) {
            };
            Control.prototype.OnMouseRightButtonUp = function (e) {
            };
            Control.prototype.OnMouseWheel = function (e) {
            };
            return Control;
        })(Fayde.FrameworkElement);
        Controls.Control = Control;        
        Nullstone.RegisterType(Control, "Control");
    })(Fayde.Controls || (Fayde.Controls = {}));
    var Controls = Fayde.Controls;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=Control.js.map
