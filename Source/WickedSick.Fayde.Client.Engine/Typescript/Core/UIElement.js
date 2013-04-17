var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="DependencyObject.ts" />
/// <reference path="XamlNode.ts" />
/// <reference path="Providers/Enums.ts" />
/// <reference path="Enums.ts" />
/// <reference path="../Media/Effects/Effect.ts"/>
/// <reference path="../Media/Transform.ts"/>
/// <reference path="../Media/Projection.ts"/>
/// <reference path="../Primitives/Point.ts"/>
/// CODE
/// <reference path="../Engine/Surface.ts" />
/// <reference path="Walkers.ts" />
/// <reference path="LayoutUpdater.ts" />
/// <reference path="Providers/InheritedProvider.ts" />
/// <reference path="Providers/InheritedProviderStore.ts"/>
/// <reference path="../Runtime/MulticastEvent.ts"/>
/// <reference path="RoutedEvent.ts"/>
/// <reference path="../Engine/Interfaces.ts"/>
var Fayde;
(function (Fayde) {
    var UINode = (function (_super) {
        __extends(UINode, _super);
        function UINode(xobj) {
                _super.call(this, xobj);
            this.IsTopLevel = false;
            this.IsLoaded = false;
            this.LayoutUpdater = new Fayde.LayoutUpdater(this);
        }
        UINode.prototype.GetInheritedEnumerator = function () {
            return this.GetVisualTreeEnumerator(Fayde.VisualTreeDirection.Logical);
        };
        UINode.prototype.OnIsAttachedChanged = function (newIsAttached) {
            this.LayoutUpdater.OnIsAttachedChanged(newIsAttached, this.VisualParentNode);
        };
        UINode.prototype._ElementAdded = function (uie) {
            var lu = this.LayoutUpdater;
            lu.UpdateBounds(true);
            lu.InvalidateMeasure();
            lu.PreviousConstraint = undefined;
            var un = uie.XamlNode;
            un.VisualParentNode = this;
            this.XObject._Store.PropagateInheritedOnAdd(uie);
            un.LayoutUpdater.OnAddedToTree();
            un.SetIsLoaded(this.IsLoaded);
        };
        UINode.prototype._ElementRemoved = function (uie) {
            var lu = this.LayoutUpdater;
            var un = uie.XamlNode;
            lu.Invalidate(un.LayoutUpdater.SubtreeBounds);
            lu.InvalidateMeasure();
            un.VisualParentNode = null;
            un.SetIsLoaded(false);
            un.LayoutUpdater.OnRemovedFromTree();
            this.XObject._Store.ClearInheritedOnRemove(uie);
        };
        UINode.prototype.SetIsLoaded = function (value) {
            if(this.IsLoaded === value) {
                return;
            }
            this.IsLoaded = value;
            this.OnIsLoadedChanged(value);
        };
        UINode.prototype.OnIsLoadedChanged = function (newIsLoaded) {
        };
        UINode.prototype._EmitFocusChange = function (type) {
            if(type === "got") {
                this._EmitGotFocus();
            } else if(type === "lost") {
                this._EmitLostFocus();
            }
        };
        UINode.prototype._EmitLostFocus = function () {
            var e = new Fayde.RoutedEventArgs();
            var x = this.XObject;
            x.OnLostFocus(e);
            x.LostFocus.Raise(x, e);
        };
        UINode.prototype._EmitGotFocus = function () {
            var e = new Fayde.RoutedEventArgs();
            var x = this.XObject;
            x.OnGotFocus(e);
            x.GotFocus.Raise(x, e);
        };
        UINode.prototype._EmitKeyDown = function (args) {
            var x = this.XObject;
            x.OnKeyDown(args);
            x.KeyDown.Raise(x, args);
        };
        UINode.prototype._EmitKeyUp = function (args) {
            var x = this.XObject;
            x.OnKeyUp(args);
            x.KeyUp.Raise(x, args);
        };
        UINode.prototype._EmitLostMouseCapture = function (pos) {
        };
        UINode.prototype._EmitMouseEvent = function (type, isLeftButton, isRightButton, args) {
            var x = this.XObject;
            if(type === "up") {
                if(isLeftButton) {
                    x.MouseLeftButtonUp.Raise(x, args);
                } else if(isRightButton) {
                    x.MouseRightButtonUp.Raise(x, args);
                }
            } else if(type === "down") {
                if(isLeftButton) {
                    x.MouseLeftButtonDown.Raise(x, args);
                } else if(isRightButton) {
                    x.MouseRightButtonDown.Raise(x, args);
                }
            } else if(type === "leave") {
                (x)._IsMouseOver = false;
                x.OnMouseLeave(args);
                x.MouseLeave.Raise(x, args);
            } else if(type === "enter") {
                (x)._IsMouseOver = true;
                x.OnMouseEnter(args);
                x.MouseEnter.Raise(x, args);
            } else if(type === "move") {
                x.MouseMove.Raise(x, args);
            } else if(type === "wheel") {
                x.MouseWheel.Raise(x, args);
            } else {
                return false;
            }
            return args.Handled;
        };
        UINode.prototype._HitTestPoint = function (ctx, p, uielist) {
            uielist.unshift(this);
        };
        UINode.prototype.CanCaptureMouse = function () {
            return true;
        };
        UINode.prototype._ResortChildrenByZIndex = function () {
            Warn("_Dirty.ChildrenZIndices only applies to Panel subclasses");
        };
        return UINode;
    })(Fayde.XamlNode);
    Fayde.UINode = UINode;    
    var UIElement = (function (_super) {
        __extends(UIElement, _super);
        function UIElement() {
            _super.apply(this, arguments);

            this._IsMouseOver = false;
            this.LostFocus = new Fayde.RoutedEvent();
            this.GotFocus = new Fayde.RoutedEvent();
            this.KeyDown = new MulticastEvent();
            this.KeyUp = new MulticastEvent();
            this.MouseLeftButtonUp = new Fayde.RoutedEvent();
            this.MouseRightButtonUp = new Fayde.RoutedEvent();
            this.MouseLeftButtonDown = new Fayde.RoutedEvent();
            this.MouseRightButtonDown = new Fayde.RoutedEvent();
            this.MouseLeave = new Fayde.RoutedEvent();
            this.MouseEnter = new Fayde.RoutedEvent();
            this.MouseMove = new Fayde.RoutedEvent();
            this.MouseWheel = new Fayde.RoutedEvent();
        }
        UIElement.prototype.CreateStore = function () {
            var s = new Fayde.Providers.InheritedProviderStore(this);
            s.SetProviders([
                null, 
                new Fayde.Providers.LocalValueProvider(), 
                null, 
                null, 
                null, 
                new Fayde.Providers.InheritedProvider(), 
                null, 
                new Fayde.Providers.DefaultValueProvider(), 
                new Fayde.Providers.AutoCreateProvider()
            ]);
            return s;
        };
        UIElement.prototype.CreateNode = function () {
            return new UINode(this);
        };
        UIElement.ClipProperty = DependencyProperty.RegisterCore("Clip", function () {
            return Fayde.Media.Geometry;
        }, UIElement);
        UIElement.EffectProperty = DependencyProperty.Register("Effect", function () {
            return Fayde.Media.Effects.Effect;
        }, UIElement);
        UIElement.IsHitTestVisibleProperty = DependencyProperty.RegisterCore("IsHitTestVisible", function () {
            return Boolean;
        }, UIElement, true);
        UIElement.OpacityMaskProperty = DependencyProperty.RegisterCore("OpacityMask", function () {
            return Fayde.Media.Brush;
        }, UIElement);
        UIElement.OpacityProperty = DependencyProperty.RegisterCore("Opacity", function () {
            return Number;
        }, UIElement, 1.0);
        UIElement.ProjectionProperty = DependencyProperty.Register("Projection", function () {
            return Fayde.Media.Projection;
        }, UIElement);
        UIElement.RenderTransformProperty = DependencyProperty.Register("RenderTransform", function () {
            return Fayde.Media.Transform;
        }, UIElement);
        UIElement.RenderTransformOriginProperty = DependencyProperty.Register("RenderTransformOrigin", function () {
            return Point;
        }, UIElement);
        UIElement.TagProperty = DependencyProperty.Register("Tag", function () {
            return Object;
        }, UIElement);
        UIElement.UseLayoutRoundingProperty = DependencyProperty.RegisterInheritable("UseLayoutRounding", function () {
            return Boolean;
        }, UIElement, true, undefined, undefined, Fayde.Providers._Inheritable.UseLayoutRounding);
        UIElement.VisibilityProperty = DependencyProperty.RegisterCore("Visibility", function () {
            return new Enum(Fayde.Visibility);
        }, UIElement, Fayde.Visibility.Visible);
        Object.defineProperty(UIElement.prototype, "IsMouseOver", {
            get: function () {
                return this._IsMouseOver;
            },
            enumerable: true,
            configurable: true
        });
        UIElement.prototype.Focus = function () {
            return false;
        };
        UIElement.prototype.OnGotFocus = function (e) {
        };
        UIElement.prototype.OnLostFocus = function (e) {
        };
        UIElement.prototype.OnKeyDown = function (args) {
        };
        UIElement.prototype.OnKeyUp = function (args) {
        };
        UIElement.prototype.OnMouseLeave = function (args) {
        };
        UIElement.prototype.OnMouseEnter = function (args) {
        };
        return UIElement;
    })(Fayde.DependencyObject);
    Fayde.UIElement = UIElement;    
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=UIElement.js.map
