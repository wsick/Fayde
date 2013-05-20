var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="DependencyObject.ts" />
/// <reference path="XamlNode.ts" />
/// <reference path="Providers/InheritedStore.ts" />
/// <reference path="Enums.ts" />
/// <reference path="../Media/Effects/Effect.ts"/>
/// <reference path="../Media/Transform.ts"/>
/// <reference path="../Media/Projection.ts"/>
/// <reference path="../Primitives/Point.ts"/>
/// <reference path="InheritableOwner.ts" />
/// CODE
/// <reference path="../Engine/Surface.ts" />
/// <reference path="Walkers.ts" />
/// <reference path="LayoutUpdater.ts" />
/// <reference path="../Runtime/MulticastEvent.ts"/>
/// <reference path="RoutedEvent.ts"/>
/// <reference path="../Engine/Interfaces.ts"/>
/// <reference path="../Media/GeneralTransform.ts"/>
/// <reference path="Triggers.ts"/>
var Fayde;
(function (Fayde) {
    var UINode = (function (_super) {
        __extends(UINode, _super);
        function UINode(xobj) {
                _super.call(this, xobj);
            this.IsTopLevel = false;
            this.IsMouseOver = false;
            this.IsLoaded = false;
            this.LayoutUpdater = new Fayde.LayoutUpdater(this);
            this.LayoutUpdater.SetContainerMode(false);
        }
        UINode.prototype.SetSurfaceFromVisualParent = function () {
            if(this._Surface) {
                return this.VisualParentNode;
            }
            var vpNode = this.VisualParentNode;
            if(vpNode) {
                this.SetSurface(vpNode._Surface);
            }
            return vpNode;
        };
        UINode.prototype.SetSurface = function (surface) {
            this._Surface = surface;
            this.LayoutUpdater.Surface = surface;
        };
        UINode.prototype.GetVisualRoot = function () {
            var curNode = this;
            var vpNode;
            while(vpNode = curNode.VisualParentNode) {
                curNode = vpNode;
            }
            return curNode;
        };
        UINode.prototype.GetInheritedEnumerator = function () {
            return this.GetVisualTreeEnumerator(Fayde.VisualTreeDirection.Logical);
        };
        UINode.prototype.OnIsAttachedChanged = function (newIsAttached) {
            var vpNode = null;
            if(newIsAttached) {
                vpNode = this.SetSurfaceFromVisualParent();
            }
            this.LayoutUpdater.OnIsAttachedChanged(newIsAttached, vpNode);
            _super.prototype.OnIsAttachedChanged.call(this, newIsAttached);
        };
        UINode.prototype.SetIsLoaded = function (value) {
        };
        UINode.prototype.OnVisualChildAttached = function (uie) {
            var lu = this.LayoutUpdater;
            lu.UpdateBounds(true);
            lu.InvalidateMeasure();
            lu.PreviousConstraint = undefined;
            var un = uie.XamlNode;
            un.SetVisualParentNode(this);
            Fayde.Providers.InheritedStore.PropagateInheritedOnAdd(this.XObject, un);
            un.LayoutUpdater.OnAddedToTree();
        };
        UINode.prototype.OnVisualChildDetached = function (uie) {
            var lu = this.LayoutUpdater;
            var un = uie.XamlNode;
            lu.Invalidate(un.LayoutUpdater.SurfaceBoundsWithChildren);
            lu.InvalidateMeasure();
            un.SetVisualParentNode(null);
            un.LayoutUpdater.OnRemovedFromTree();
            Fayde.Providers.InheritedStore.ClearInheritedOnRemove(this.XObject, un);
        };
        UINode.prototype.SetVisualParentNode = function (visualParentNode) {
            if(this.VisualParentNode === visualParentNode) {
                return;
            }
            this.VisualParentNode = visualParentNode;
            if(visualParentNode) {
                this.SetSurface(visualParentNode._Surface);
            } else {
                this.SetSurface(null);
            }
        };
        UINode.prototype.Focus = function (recurse) {
            return false;
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
            var x = this.XObject;
            var e = new Fayde.Input.MouseEventArgs(pos);
            x.OnLostMouseCapture(e);
            x.LostMouseCapture.Raise(x, e);
        };
        UINode.prototype._EmitMouseEvent = function (type, isLeftButton, isRightButton, args) {
            var x = this.XObject;
            switch(type) {
                case InputType.MouseUp:
                    if(isLeftButton) {
                        x.OnMouseLeftButtonUp(args);
                        x.MouseLeftButtonUp.Raise(x, args);
                    } else if(isRightButton) {
                        x.OnMouseRightButtonUp(args);
                        x.MouseRightButtonUp.Raise(x, args);
                    }
                    break;
                case InputType.MouseDown:
                    if(isLeftButton) {
                        x.OnMouseLeftButtonDown(args);
                        x.MouseLeftButtonDown.Raise(x, args);
                    } else if(isRightButton) {
                        x.OnMouseRightButtonDown(args);
                        x.MouseRightButtonDown.Raise(x, args);
                    }
                    break;
                case InputType.MouseLeave:
                    this.IsMouseOver = false;
                    x.OnMouseLeave(args);
                    x.MouseLeave.Raise(x, args);
                    break;
                case InputType.MouseEnter:
                    this.IsMouseOver = true;
                    x.OnMouseEnter(args);
                    x.MouseEnter.Raise(x, args);
                    break;
                case InputType.MouseMove:
                    x.OnMouseMove(args);
                    x.MouseMove.Raise(x, args);
                    break;
                case InputType.MouseWheel:
                    x.OnMouseWheel(args);
                    x.MouseWheel.Raise(x, args);
                    break;
                default:
                    return false;
            }
            return args.Handled;
        };
        UINode.prototype.CanCaptureMouse = function () {
            return true;
        };
        UINode.prototype.CaptureMouse = function () {
            if(!this.IsAttached) {
                return false;
            }
            this._Surface.SetMouseCapture(this);
            return true;
        };
        UINode.prototype.ReleaseMouseCapture = function () {
            if(!this.IsAttached) {
                return;
            }
            this._Surface.ReleaseMouseCapture(this);
        };
        UINode.prototype._ResortChildrenByZIndex = function () {
            Warn("_Dirty.ChildrenZIndices only applies to Panel subclasses");
        };
        UINode.prototype.InvalidateParent = function (r) {
            var vpNode = this.VisualParentNode;
            if(vpNode) {
                vpNode.LayoutUpdater.Invalidate(r);
            } else if(this.IsAttached) {
                this._Surface._Invalidate(r);
            }
        };
        UINode.prototype.InvalidateClip = function (oldClip, newClip) {
            var lu = this.LayoutUpdater;
            if(!newClip) {
                rect.clear(lu.ClipBounds);
            } else {
                rect.copyTo(newClip.GetBounds(), lu.ClipBounds);
            }
            this.InvalidateParent(lu.SurfaceBoundsWithChildren);
            lu.UpdateBounds(true);
            lu.ComputeComposite();
        };
        UINode.prototype.InvalidateEffect = function (oldEffect, newEffect) {
            var lu = this.LayoutUpdater;
            var changed = (newEffect) ? newEffect.GetPadding(lu.EffectPadding) : false;
            this.InvalidateParent(lu.SurfaceBoundsWithChildren);
            if(changed) {
                lu.UpdateBounds();
            }
            lu.ComputeComposite();
            if(oldEffect !== newEffect && this.IsAttached) {
                this._Surface._AddDirtyElement(this.LayoutUpdater, _Dirty.Transform);
            }
        };
        UINode.prototype.InvalidateOpacity = function () {
            var lu = this.LayoutUpdater;
            lu.UpdateTotalRenderVisibility();
            this.InvalidateParent(lu.SurfaceBoundsWithChildren);
        };
        UINode.prototype.InvalidateVisibility = function (newVisibility) {
            var lu = this.LayoutUpdater;
            if(newVisibility === Fayde.Visibility.Visible) {
                lu.Flags |= Fayde.UIElementFlags.RenderVisible;
            } else {
                lu.Flags &= ~Fayde.UIElementFlags.RenderVisible;
            }
            lu.UpdateTotalRenderVisibility();
            this.InvalidateParent(lu.SurfaceBoundsWithChildren);
            lu.InvalidateMeasure();
            var vpNode = this.VisualParentNode;
            if(vpNode) {
                vpNode.LayoutUpdater.InvalidateMeasure();
            }
            var surface = this._Surface;
            if(surface) {
                surface._RemoveFocusFrom(lu);
            }
        };
        UINode.prototype.IsAncestorOf = function (uin) {
            var vpNode = uin;
            while(vpNode && vpNode !== this) {
                vpNode = vpNode.VisualParentNode;
            }
            return vpNode === this;
        };
        UINode.prototype.TransformToVisual = function (uin) {
            if(uin && !uin.IsAttached) {
                throw new ArgumentException("UIElement not attached.");
            }
            var curNode = this;
            var ok = false;
            var surface = this._Surface;
            if(this.IsAttached) {
                while(curNode) {
                    if(curNode.IsTopLevel) {
                        ok = true;
                    }
                    curNode = curNode.VisualParentNode;
                }
            }
            if(!ok) {
                throw new ArgumentException("UIElement not attached.");
            }
            if(uin && !uin.IsTopLevel) {
                ok = false;
                curNode = uin.VisualParentNode;
                if(curNode && uin.IsAttached) {
                    while(curNode) {
                        if(curNode.IsTopLevel) {
                            ok = true;
                        }
                        curNode.VisualParentNode;
                    }
                }
                if(!ok) {
                    throw new ArgumentException("UIElement not attached.");
                }
            }
            return this.LayoutUpdater.TransformToVisual(uin);
        };
        return UINode;
    })(Fayde.DONode);
    Fayde.UINode = UINode;    
    Nullstone.RegisterType(UINode, "UINode");
    var UIElement = (function (_super) {
        __extends(UIElement, _super);
        function UIElement() {
            _super.apply(this, arguments);

            this._ClipListener = null;
            this._EffectListener = null;
            this.LostFocus = new Fayde.RoutedEvent();
            this.GotFocus = new Fayde.RoutedEvent();
            this.LostMouseCapture = new Fayde.RoutedEvent();
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
        UIElement.prototype.CreateNode = function () {
            return new UINode(this);
        };
        UIElement.ClipProperty = DependencyProperty.RegisterCore("Clip", function () {
            return Fayde.Media.Geometry;
        }, UIElement, undefined, function (d, args) {
            return (d)._ClipChanged(args);
        });
        UIElement.EffectProperty = DependencyProperty.Register("Effect", function () {
            return Fayde.Media.Effects.Effect;
        }, UIElement, undefined, function (d, args) {
            return (d)._EffectChanged(args);
        });
        UIElement.IsHitTestVisibleProperty = DependencyProperty.RegisterCore("IsHitTestVisible", function () {
            return Boolean;
        }, UIElement, true, function (d, args) {
            return (d)._IsHitTestVisibleChanged(args);
        });
        UIElement.OpacityMaskProperty = DependencyProperty.RegisterCore("OpacityMask", function () {
            return Fayde.Media.Brush;
        }, UIElement);
        UIElement.OpacityProperty = DependencyProperty.RegisterCore("Opacity", function () {
            return Number;
        }, UIElement, 1.0, function (d, args) {
            return (d).XamlNode.InvalidateOpacity();
        });
        UIElement.ProjectionProperty = DependencyProperty.Register("Projection", function () {
            return Fayde.Media.Projection;
        }, UIElement, undefined, function (d, args) {
            return (d).XamlNode.LayoutUpdater.UpdateProjection();
        });
        UIElement.RenderTransformProperty = DependencyProperty.Register("RenderTransform", function () {
            return Fayde.Media.Transform;
        }, UIElement, undefined, function (d, args) {
            return (d).XamlNode.LayoutUpdater.UpdateTransform();
        });
        UIElement.RenderTransformOriginProperty = DependencyProperty.Register("RenderTransformOrigin", function () {
            return Point;
        }, UIElement, undefined, function (d, args) {
            return (d).XamlNode.LayoutUpdater.UpdateTransform();
        });
        UIElement.TagProperty = DependencyProperty.Register("Tag", function () {
            return Object;
        }, UIElement);
        UIElement.TriggersProperty = DependencyProperty.RegisterCore("Triggers", function () {
            return Fayde.TriggerCollection;
        }, UIElement, undefined, function (d, args) {
            return (d)._TriggersChanged(args);
        });
        UIElement.UseLayoutRoundingProperty = Fayde.InheritableOwner.UseLayoutRoundingProperty.ExtendTo(UIElement);
        UIElement.VisibilityProperty = DependencyProperty.RegisterCore("Visibility", function () {
            return new Enum(Fayde.Visibility);
        }, UIElement, Fayde.Visibility.Visible, function (d, args) {
            return (d).XamlNode.InvalidateVisibility(args.NewValue);
        });
        UIElement.prototype.IsInheritable = function (propd) {
            return propd === UIElement.UseLayoutRoundingProperty;
        };
        Object.defineProperty(UIElement.prototype, "IsMouseOver", {
            get: function () {
                return this.XamlNode.IsMouseOver;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UIElement.prototype, "DesiredSize", {
            get: function () {
                return this.XamlNode.LayoutUpdater.DesiredSize;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UIElement.prototype, "RenderSize", {
            get: function () {
                return this.XamlNode.LayoutUpdater.RenderSize;
            },
            enumerable: true,
            configurable: true
        });
        UIElement.prototype.Focus = function () {
            return this.XamlNode.Focus();
        };
        UIElement.prototype.CaptureMouse = function () {
            return this.XamlNode.CaptureMouse();
        };
        UIElement.prototype.ReleaseMouseCapture = function () {
            this.XamlNode.ReleaseMouseCapture();
        };
        UIElement.prototype.IsAncestorOf = function (uie) {
            if(!uie) {
                return false;
            }
            return this.XamlNode.IsAncestorOf(uie.XamlNode);
        };
        UIElement.prototype.TransformToVisual = function (uie) {
            var uin = (uie) ? uie.XamlNode : null;
            return this.XamlNode.TransformToVisual(uin);
        };
        UIElement.prototype.InvalidateMeasure = function () {
            this.XamlNode.LayoutUpdater.InvalidateMeasure();
        };
        UIElement.prototype.Measure = function (availableSize) {
            var error = new BError();
            this.XamlNode.LayoutUpdater._Measure(availableSize, error);
            if(error.Message) {
                error.ThrowException();
            }
        };
        UIElement.prototype.InvalidateArrange = function () {
            this.XamlNode.LayoutUpdater.InvalidateArrange();
        };
        UIElement.prototype.Arrange = function (finalRect) {
            var error = new BError();
            this.XamlNode.LayoutUpdater._Arrange(finalRect, error);
            if(error.Message) {
                error.ThrowException();
            }
        };
        UIElement.prototype.OnGotFocus = function (e) {
        };
        UIElement.prototype.OnLostFocus = function (e) {
        };
        UIElement.prototype.OnLostMouseCapture = function (e) {
        };
        UIElement.prototype.OnKeyDown = function (e) {
        };
        UIElement.prototype.OnKeyUp = function (e) {
        };
        UIElement.prototype.OnMouseEnter = function (e) {
        };
        UIElement.prototype.OnMouseLeave = function (e) {
        };
        UIElement.prototype.OnMouseLeftButtonDown = function (e) {
        };
        UIElement.prototype.OnMouseLeftButtonUp = function (e) {
        };
        UIElement.prototype.OnMouseMove = function (e) {
        };
        UIElement.prototype.OnMouseRightButtonDown = function (e) {
        };
        UIElement.prototype.OnMouseRightButtonUp = function (e) {
        };
        UIElement.prototype.OnMouseWheel = function (e) {
        };
        UIElement.prototype._ClipChanged = function (args) {
            var _this = this;
            var oldClip = args.OldValue;
            var newClip = args.NewValue;
            this.XamlNode.InvalidateClip(oldClip, newClip);
            if(oldClip == newClip) {
                return;
            }
            if(oldClip) {
                oldClip.Unlisten(this._ClipListener);
            }
            if(newClip) {
                if(!this._ClipListener) {
                    this._ClipListener = {
                        GeometryChanged: function (newGeometry) {
                            return _this.XamlNode.InvalidateClip(newGeometry, newGeometry);
                        }
                    };
                }
                newClip.Listen(this._ClipListener);
            }
        };
        UIElement.prototype._EffectChanged = function (args) {
            var _this = this;
            var oldEffect = args.OldValue;
            var newEffect = args.NewValue;
            this.XamlNode.InvalidateEffect(oldEffect, newEffect);
            if(oldEffect === newEffect) {
                return;
            }
            if(oldEffect) {
                oldEffect.Unlisten(this._EffectListener);
            }
            if(newEffect) {
                if(!this._EffectListener) {
                    this._EffectListener = {
                        EffectChanged: function (effect) {
                            return _this.XamlNode.InvalidateEffect(effect, effect);
                        }
                    };
                }
                newEffect.Listen(this._EffectListener);
            }
        };
        UIElement.prototype._UseLayoutRoundingChanged = function (args) {
            var lu = this.XamlNode.LayoutUpdater;
            lu.InvalidateMeasure();
            lu.InvalidateArrange();
        };
        UIElement.prototype._IsHitTestVisibleChanged = function (args) {
            var lu = this.XamlNode.LayoutUpdater;
            if(args.NewValue === true) {
                lu.Flags |= Fayde.UIElementFlags.HitTestVisible;
            } else {
                lu.Flags &= ~Fayde.UIElementFlags.HitTestVisible;
            }
            lu.UpdateTotalHitTestVisibility();
        };
        UIElement.prototype._TriggersChanged = function (args) {
            var oldTriggers = args.OldValue;
            var newTriggers = args.NewValue;
            if(oldTriggers instanceof Fayde.TriggerCollection) {
                oldTriggers.DetachTarget(this);
            }
            if(newTriggers instanceof Fayde.TriggerCollection) {
                newTriggers.AttachTarget(this);
            }
        };
        return UIElement;
    })(Fayde.DependencyObject);
    Fayde.UIElement = UIElement;    
    Nullstone.RegisterType(UIElement, "UIElement");
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=UIElement.js.map
