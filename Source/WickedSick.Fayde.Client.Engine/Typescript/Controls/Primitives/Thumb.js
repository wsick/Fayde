var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Fayde;
(function (Fayde) {
    (function (Controls) {
        /// <reference path="../Control.ts" />
        /// CODE
        /// <reference path="DragEventArgs.ts" />
        (function (Primitives) {
            var Thumb = (function (_super) {
                __extends(Thumb, _super);
                function Thumb() {
                                _super.call(this);
                    this._PreviousPosition = null;
                    this._Origin = null;
                    this.DragCompleted = new Fayde.RoutedEvent();
                    this.DragDelta = new Fayde.RoutedEvent();
                    this.DragStarted = new Fayde.RoutedEvent();
                    this.DefaultStyleKey = (this).constructor;
                }
                Thumb.IsDraggingProperty = DependencyProperty.RegisterReadOnly("IsDragging", function () {
                    return Boolean;
                }, Thumb, false, function (d, args) {
                    return (d).OnDraggingChanged(args);
                });
                Thumb.IsFocusedProperty = DependencyProperty.RegisterReadOnly("IsFocused", function () {
                    return Boolean;
                }, Thumb);
                Thumb.prototype.OnApplyTemplate = function () {
                    _super.prototype.OnApplyTemplate.call(this);
                    this.UpdateVisualState(false);
                };
                Thumb.prototype.CancelDrag = function () {
                    if(this.IsDragging) {
                        this.SetValueInternal(Thumb.IsDraggingProperty, false);
                        this._RaiseDragCompleted(true);
                    }
                };
                Thumb.prototype._FocusChanged = function (hasFocus) {
                    this.SetValueInternal(Thumb.IsFocusedProperty, hasFocus);
                    this.UpdateVisualState();
                };
                Thumb.prototype.OnDraggingChanged = function (args) {
                    this.UpdateVisualState();
                };
                Thumb.prototype.OnIsEnabledChanged = function (e) {
                    _super.prototype.OnIsEnabledChanged.call(this, e);
                    this.UpdateVisualState();
                };
                Thumb.prototype.OnGotFocus = function (e) {
                    _super.prototype.OnGotFocus.call(this, e);
                    this._FocusChanged(this.XamlNode._HasFocus());
                };
                Thumb.prototype.OnLostFocus = function (e) {
                    _super.prototype.OnLostFocus.call(this, e);
                    this._FocusChanged(this.XamlNode._HasFocus());
                };
                Thumb.prototype.OnLostMouseCapture = function (e) {
                    _super.prototype.OnLostMouseCapture.call(this, e);
                    this._RaiseDragCompleted(false);
                    this.SetValueInternal(Thumb.IsDraggingProperty, false);
                };
                Thumb.prototype.OnMouseEnter = function (e) {
                    _super.prototype.OnMouseEnter.call(this, e);
                    if(this.IsEnabled) {
                        this.UpdateVisualState();
                    }
                };
                Thumb.prototype.OnMouseLeave = function (e) {
                    _super.prototype.OnMouseLeave.call(this, e);
                    if(this.IsEnabled) {
                        this.UpdateVisualState();
                    }
                };
                Thumb.prototype.OnMouseLeftButtonDown = function (e) {
                    _super.prototype.OnMouseLeftButtonDown.call(this, e);
                    if(e.Handled) {
                        return;
                    }
                    if(!this.IsDragging && this.IsEnabled) {
                        e.Handled = true;
                        this.CaptureMouse();
                        this.SetValueInternal(Thumb.IsDraggingProperty, true);
                        var vpNode = this.XamlNode.VisualParentNode;
                        this._Origin = this._PreviousPosition = e.GetPosition((vpNode) ? vpNode.XObject : undefined);
                        var success = false;
                        try  {
                            this._RaiseDragStarted();
                            success = true;
                        }finally {
                            if(!success) {
                                this.CancelDrag();
                            }
                        }
                    }
                };
                Thumb.prototype.OnMouseMove = function (e) {
                    _super.prototype.OnMouseMove.call(this, e);
                    if(!this.IsDragging) {
                        return;
                    }
                    var vpNode = this.XamlNode.VisualParentNode;
                    var p = e.GetPosition((vpNode) ? vpNode.XObject : undefined);
                    if(!Point.Equals(p, this._PreviousPosition)) {
                        this._RaiseDragDelta(p.X - this._PreviousPosition.X, p.Y - this._PreviousPosition.Y);
                        this._PreviousPosition = p;
                    }
                };
                Thumb.prototype._RaiseDragStarted = function () {
                    this.DragStarted.Raise(this, new Primitives.DragStartedEventArgs(this._Origin.X, this._Origin.Y));
                };
                Thumb.prototype._RaiseDragDelta = function (x, y) {
                    this.DragDelta.Raise(this, new Primitives.DragDeltaEventArgs(x, y));
                };
                Thumb.prototype._RaiseDragCompleted = function (canceled) {
                    this.DragCompleted.Raise(this, new Primitives.DragCompletedEventArgs(this._PreviousPosition.X - this._Origin.X, this._PreviousPosition.Y - this._Origin.Y, canceled));
                };
                Thumb.prototype.GetVisualStateCommon = function () {
                    if(!this.IsEnabled) {
                        return "Disabled";
                    } else if(this.IsDragging) {
                        return "Pressed";
                    } else if(this.IsMouseOver) {
                        return "MouseOver";
                    } else {
                        return "Normal";
                    }
                };
                return Thumb;
            })(Controls.Control);
            Primitives.Thumb = Thumb;            
            Nullstone.RegisterType(Thumb, "Thumb");
        })(Controls.Primitives || (Controls.Primitives = {}));
        var Primitives = Controls.Primitives;
    })(Fayde.Controls || (Fayde.Controls = {}));
    var Controls = Fayde.Controls;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=Thumb.js.map
