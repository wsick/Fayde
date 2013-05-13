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

                }
                PopupNode.prototype.GetInheritedEnumerator = function () {
                    var popup = (this.XObject);
                    if(!popup) {
                        return;
                    }
                    var index = -1;
                    return {
                        MoveNext: function () {
                            index++;
                            return index === 0;
                        },
                        Current: popup.Child
                    };
                };
                PopupNode.prototype.ComputeBounds = function (baseComputer, lu) {
                };
                PopupNode.prototype.OnIsAttachedChanged = function (newIsAttached) {
                    _super.prototype.OnIsAttachedChanged.call(this, newIsAttached);
                    if(!newIsAttached && this.XObject.IsOpen) {
                        this.XObject.IsOpen = false;
                    }
                };
                PopupNode.prototype._HitTestPoint = function (ctx, p, uinlist) {
                    if(this.XObject.IsVisible) {
                        _super.prototype._HitTestPoint.call(this, ctx, p, uinlist);
                    }
                };
                return PopupNode;
            })(Fayde.FENode);
            Primitives.PopupNode = PopupNode;            
            Nullstone.RegisterType(PopupNode, "PopupNode");
            var Popup = (function (_super) {
                __extends(Popup, _super);
                function Popup() {
                                _super.call(this);
                    this._ClickCatcher = null;
                    this._IsVisible = false;
                    this.Opened = new MulticastEvent();
                    this.Closed = new MulticastEvent();
                    this.ClickedOutside = new MulticastEvent();
                }
                Popup.prototype.CreateNode = function () {
                    return new PopupNode(this);
                };
                Popup.ChildProperty = DependencyProperty.RegisterCore("Child", function () {
                    return Fayde.UIElement;
                }, Popup, undefined, function (d, args) {
                    return (d)._OnChildChanged(args);
                });
                Popup.HorizontalOffsetProperty = DependencyProperty.RegisterCore("HorizontalOffset", function () {
                    return Number;
                }, Popup, 0.0, function (d, args) {
                    return (d)._OnOffsetChanged(args);
                });
                Popup.VerticalOffsetProperty = DependencyProperty.RegisterCore("VerticalOffset", function () {
                    return Number;
                }, Popup, 0.0, function (d, args) {
                    return (d)._OnOffsetChanged(args);
                });
                Popup.IsOpenProperty = DependencyProperty.RegisterCore("IsOpen", function () {
                    return Boolean;
                }, Popup, false, function (d, args) {
                    return (d)._OnIsOpenChanged(args);
                });
                Popup.Annotations = {
                    ContentProperty: Popup.ChildProperty
                };
                Object.defineProperty(Popup.prototype, "IsVisible", {
                    get: function () {
                        return this._IsVisible;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Popup.prototype, "RealChild", {
                    get: function () {
                        if(this._ClickCatcher) {
                            return (this.Child).Children.GetValueAt(1);
                        }
                        return this.Child;
                    },
                    enumerable: true,
                    configurable: true
                });
                Popup.prototype._Hide = function (child) {
                    if(!this._IsVisible || !child) {
                        return;
                    }
                    this._IsVisible = false;
                    App.Instance.MainSurface.DetachLayer(child);
                };
                Popup.prototype._Show = function (child) {
                    if(this._IsVisible || !child) {
                        return;
                    }
                    this._IsVisible = true;
                    App.Instance.MainSurface.AttachLayer(child);
                };
                Popup.prototype._OnOpened = function () {
                    this._UpdateCatcher();
                    this.Opened.RaiseAsync(this, EventArgs.Empty);
                };
                Popup.prototype._OnClosed = function () {
                    this.Closed.RaiseAsync(this, EventArgs.Empty);
                };
                Popup.prototype.CatchClickedOutside = function () {
                    var child = this.Child;
                    if(!child) {
                        return;
                    }
                    var root = new Controls.Canvas();
                    this._ClickCatcher = new Controls.Canvas();
                    this._ClickCatcher.Background = Fayde.Media.SolidColorBrush.FromColor(Color.FromRgba(255, 255, 255, 0));
                    this.Child = root;
                    root.Children.Add(this._ClickCatcher);
                    root.Children.Add(child);
                    this._ClickCatcher.LayoutUpdated.Subscribe(this._UpdateCatcher, this);
                    this._ClickCatcher.MouseLeftButtonDown.Subscribe(this._RaiseClickedOutside, this);
                };
                Popup.prototype._UpdateCatcher = function () {
                    if(!this._ClickCatcher) {
                        return;
                    }
                    try  {
                        var xform = this.Child.TransformToVisual(null);
                        if(xform instanceof Fayde.Media.Transform) {
                            this._ClickCatcher.Projection = null;
                            this._ClickCatcher.RenderTransform = (xform).Inverse;
                        } else if(xform instanceof Fayde.Media.InternalTransform) {
                            var projection = (xform).CreateMatrix3DProjection();
                            this._ClickCatcher.RenderTransform = null;
                            this._ClickCatcher.Projection = projection;
                        }
                    } catch (err) {
                        if(!(err instanceof ArgumentException)) {
                            throw err;
                        }
                    }
                    var surfaceExtents = App.Instance.MainSurface.Extents;
                    this._ClickCatcher.Width = surfaceExtents.Width;
                    this._ClickCatcher.Height = surfaceExtents.Height;
                };
                Popup.prototype._RaiseClickedOutside = function (sender, e) {
                    this.ClickedOutside.Raise(this, EventArgs.Empty);
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
                    var error = new BError();
                    if(oldFE) {
                        if(this.IsOpen) {
                            this._Hide(oldFE);
                        }
                        //TODO: Fix this
                        //this.XamlNode.DetachVisualChild(oldFE, error);
                        this._Store.PropagateInheritedOnAdd(oldFE.XamlNode);
                    }
                    if(newFE) {
                        //TODO: Fix this
                        //this.XamlNode.AttachVisualChild(newFE, error);
                        this._Store.ClearInheritedOnRemove(newFE.XamlNode);
                        if(this.IsOpen) {
                            this._Show(newFE);
                        }
                    }
                    if(error.Message) {
                        error.ThrowException();
                    }
                };
                Popup.prototype._OnOffsetChanged = function (args) {
                    var child = this.Child;
                    if(child) {
                        child.XamlNode.LayoutUpdater.InvalidateMeasure();
                    }
                };
                Popup.prototype._OnIsOpenChanged = function (args) {
                    if(args.NewValue) {
                        this._Show(this.Child);
                        this._OnOpened();
                    } else {
                        this._Hide(this.Child);
                        this._OnClosed();
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
