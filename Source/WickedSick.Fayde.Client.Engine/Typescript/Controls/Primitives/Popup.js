var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Fayde;
(function (Fayde) {
    (function (Controls) {
        /// <reference path="../../Core/FrameworkElement.ts" />
        /// CODE
        /// <reference path="../../Primitives/Color.ts" />
        /// <reference path="../../Media/SolidColorBrush.ts" />
        (function (Primitives) {
            var PopupNode = (function (_super) {
                __extends(PopupNode, _super);
                function PopupNode() {
                    _super.apply(this, arguments);

                    this._HorizontalOffset = 0;
                    this._VerticalOffset = 0;
                    this._IsVisible = false;
                    this._IsCatchingClick = false;
                    this._Catcher = null;
                }
                PopupNode.prototype.GetInheritedEnumerator = function () {
                    var popup = (this.XObject);
                    if(!popup) {
                        return Fayde.ArrayEx.EmptyEnumerator;
                    }
                    var child = popup.Child;
                    if(!child) {
                        return Fayde.ArrayEx.EmptyEnumerator;
                    }
                    return Fayde.ArrayEx.GetEnumerator([
                        popup.Child.XamlNode
                    ]);
                };
                PopupNode.prototype.ComputeBounds = function (baseComputer, lu) {
                };
                PopupNode.prototype.OnIsAttachedChanged = function (newIsAttached) {
                    _super.prototype.OnIsAttachedChanged.call(this, newIsAttached);
                    if(!newIsAttached && this.XObject.IsOpen) {
                        this.XObject.IsOpen = false;
                    }
                };
                PopupNode.prototype._ChildChanged = function (oldChild, newChild) {
                    var popup = this.XObject;
                    this._Hide();
                    if(oldChild) {
                        Fayde.Providers.InheritedStore.ClearInheritedOnRemove(popup, oldChild.XamlNode);
                    }
                    this._PrepareVisualChild(newChild);
                    if(newChild) {
                        Fayde.Providers.InheritedStore.PropagateInheritedOnAdd(popup, newChild.XamlNode);
                        if(popup.IsOpen) {
                            this._Show();
                        }
                    }
                };
                PopupNode.prototype._PrepareVisualChild = function (newChild) {
                    if(!newChild) {
                        return;
                    }
                    if(this._IsCatchingClick) {
                        var root = this._VisualChild;
                        if(!root) {
                            var root = new Controls.Canvas();
                            var clickCatcher = new Controls.Canvas();
                            clickCatcher.Background = Fayde.Media.SolidColorBrush.FromColor(Color.FromRgba(255, 255, 255, 0));
                            clickCatcher.LayoutUpdated.Subscribe(this._UpdateCatcher, this);
                            clickCatcher.MouseLeftButtonDown.Subscribe(this._RaiseClickedOutside, this);
                            root.Children.Add(clickCatcher);
                            this._Catcher = clickCatcher;
                            this._VisualChild = root;
                        } else {
                            root.Children.RemoveAt(1);
                        }
                        root.Children.Add(newChild);
                    } else {
                        this._VisualChild = newChild;
                    }
                };
                PopupNode.prototype.CatchClickedOutside = function () {
                    if(!this._IsCatchingClick) {
                        this._VisualChild = null;
                    }
                    this._IsCatchingClick = true;
                    this._PrepareVisualChild(this.XObject.Child);
                };
                PopupNode.prototype._UpdateCatcher = function () {
                    var root = this._VisualChild;
                    if(!root) {
                        return;
                    }
                    var surfaceExtents = this._Surface.Extents;
                    root.Width = surfaceExtents.Width;
                    root.Height = surfaceExtents.Height;
                    var catcher = this._Catcher;
                    if(!catcher) {
                        return;
                    }
                    catcher.Width = root.Width;
                    catcher.Height = root.Height;
                };
                PopupNode.prototype._RaiseClickedOutside = function (sender, e) {
                    this.XObject.ClickedOutside.Raise(this, EventArgs.Empty);
                };
                PopupNode.prototype.PostCompute = function (lu, hasLocalProjection) {
                    var child = this.XObject.Child;
                    if(!child) {
                        return;
                    }
                    var childLu = child.XamlNode.LayoutUpdater;
                    var popup = this.XObject;
                    if(lu.TotalRenderProjection) {
                        var projection = mat4.clone(lu.AbsoluteProjection);
                        var m = mat4.createTranslate(popup.HorizontalOffset, popup.VerticalOffset, 0.0);
                        mat4.multiply(m, projection, projection)//projection = projection * m
                        ;
                        childLu.CarrierProjection = projection;
                        childLu.CarrierXform = null;
                        childLu.UpdateProjection();
                    } else {
                        var xform = mat3.clone(lu.AbsoluteXform);
                        mat3.translate(xform, popup.HorizontalOffset, popup.VerticalOffset);
                        childLu.CarrierProjection = null;
                        childLu.CarrierXform = xform;
                        childLu.UpdateTransform();
                    }
                };
                PopupNode.prototype.OnHorizontalOffsetChanged = function (args) {
                    var child = this.XObject.Child;
                    if(!child) {
                        return;
                    }
                    var childLu = child.XamlNode.LayoutUpdater;
                    var tween = args.NewValue - this._HorizontalOffset;
                    if(tween === 0) {
                        return;
                    }
                    this._HorizontalOffset = args.NewValue;
                    if(childLu.CarrierProjection) {
                        var m = mat4.createTranslate(tween, 0.0, 0.0);
                        mat4.multiply(m, childLu.CarrierProjection, childLu.CarrierProjection);
                    } else if(childLu.CarrierXform) {
                        mat3.translate(childLu.CarrierXform, tween, 0.0);
                    }
                    this._VisualChild.InvalidateMeasure();
                };
                PopupNode.prototype.OnVerticalOffsetChanged = function (args) {
                    var child = this.XObject.Child;
                    if(!child) {
                        return;
                    }
                    var childLu = child.XamlNode.LayoutUpdater;
                    var tween = args.NewValue - this._VerticalOffset;
                    if(tween === 0) {
                        return;
                    }
                    this._VerticalOffset = args.NewValue;
                    if(childLu.CarrierProjection) {
                        var m = mat4.createTranslate(0.0, tween, 0.0);
                        mat4.multiply(m, childLu.CarrierProjection, childLu.CarrierProjection);
                    } else if(childLu.CarrierXform) {
                        mat3.translate(childLu.CarrierXform, 0.0, tween);
                    }
                    this._VisualChild.InvalidateMeasure();
                };
                PopupNode.prototype._Hide = function () {
                    var child = this._VisualChild;
                    if(!this._IsVisible || !child) {
                        return;
                    }
                    this._IsVisible = false;
                    this.LayoutUpdater.ShouldSkipHitTest = true;
                    this._Surface.DetachLayer(child);
                };
                PopupNode.prototype._Show = function () {
                    this._UpdateCatcher();
                    var child = this._VisualChild;
                    if(this._IsVisible || !child) {
                        return;
                    }
                    this._IsVisible = true;
                    this.LayoutUpdater.ShouldSkipHitTest = false;
                    this._Surface.AttachLayer(child);
                };
                return PopupNode;
            })(Fayde.FENode);
            Primitives.PopupNode = PopupNode;            
            Nullstone.RegisterType(PopupNode, "PopupNode");
            var Popup = (function (_super) {
                __extends(Popup, _super);
                function Popup() {
                    _super.apply(this, arguments);

                    this.Opened = new MulticastEvent();
                    this.Closed = new MulticastEvent();
                    this.ClickedOutside = new MulticastEvent();
                }
                Popup.prototype.CreateNode = function () {
                    return new PopupNode(this);
                };
                Popup.ChildProperty = DependencyProperty.Register("Child", function () {
                    return Fayde.UIElement;
                }, Popup, undefined, function (d, args) {
                    return (d)._OnChildChanged(args);
                });
                Popup.HorizontalOffsetProperty = DependencyProperty.Register("HorizontalOffset", function () {
                    return Number;
                }, Popup, 0.0, function (d, args) {
                    return (d).XamlNode.OnHorizontalOffsetChanged(args);
                });
                Popup.VerticalOffsetProperty = DependencyProperty.Register("VerticalOffset", function () {
                    return Number;
                }, Popup, 0.0, function (d, args) {
                    return (d).XamlNode.OnVerticalOffsetChanged(args);
                });
                Popup.IsOpenProperty = DependencyProperty.Register("IsOpen", function () {
                    return Boolean;
                }, Popup, false, function (d, args) {
                    return (d)._OnIsOpenChanged(args);
                });
                Popup.Annotations = {
                    ContentProperty: Popup.ChildProperty
                };
                Popup.prototype._OnChildChanged = function (args) {
                    var oldFE;
                    if(args.OldValue instanceof Fayde.FrameworkElement) {
                        oldFE = args.OldValue;
                    }
                    var newFE;
                    if(args.NewValue instanceof Fayde.FrameworkElement) {
                        newFE = args.NewValue;
                    }
                    this.XamlNode._ChildChanged(oldFE, newFE);
                };
                Popup.prototype._OnIsOpenChanged = function (args) {
                    if(args.NewValue) {
                        this.XamlNode._Show();
                        this.Opened.RaiseAsync(this, EventArgs.Empty);
                    } else {
                        this.XamlNode._Hide();
                        this.Closed.RaiseAsync(this, EventArgs.Empty);
                    }
                };
                return Popup;
            })(Fayde.FrameworkElement);
            Primitives.Popup = Popup;            
            Nullstone.RegisterType(Popup, "Popup");
        })(Controls.Primitives || (Controls.Primitives = {}));
        var Primitives = Controls.Primitives;
    })(Fayde.Controls || (Fayde.Controls = {}));
    var Controls = Fayde.Controls;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=Popup.js.map
