var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Fayde;
(function (Fayde) {
    (function (Controls) {
        /// <reference path="../ContentControl.ts" />
        /// CODE
        /// <reference path="../Enums.ts" />
        /// <reference path="../../Input/ICommand.ts" />
        (function (Primitives) {
            var ButtonBase = (function (_super) {
                __extends(ButtonBase, _super);
                function ButtonBase() {
                                _super.call(this);
                    this.Click = new Fayde.RoutedEvent();
                    this._IsMouseCaptured = false;
                    this._IsMouseLeftButtonDown = false;
                    this._IsSpaceKeyDown = false;
                    this._MousePosition = new Point();
                    this._SuspendStateChanges = false;
                    this.IsTabStop = true;
                }
                ButtonBase.ClickModeProperty = DependencyProperty.Register("ClickMode", function () {
                    return new Enum(Controls.ClickMode);
                }, ButtonBase, Controls.ClickMode.Release);
                ButtonBase.IsPressedProperty = DependencyProperty.RegisterReadOnly("IsPressed", function () {
                    return Boolean;
                }, ButtonBase, false, function (d, args) {
                    return (d).OnIsPressedChanged(args);
                });
                ButtonBase.IsFocusedProperty = DependencyProperty.RegisterReadOnly("IsFocused", function () {
                    return Boolean;
                }, ButtonBase, false);
                ButtonBase.CommandProperty = DependencyProperty.RegisterCore("Command", function () {
                    return Fayde.Input.ICommand_;
                }, ButtonBase, undefined, function (d, args) {
                    return (d).OnCommandChanged(args);
                });
                ButtonBase.CommandParameterProperty = DependencyProperty.RegisterCore("CommandParameter", function () {
                    return Object;
                }, ButtonBase, undefined, function (d, args) {
                    return (d).OnCommandParameterChanged(args);
                });
                ButtonBase.prototype.OnIsPressedChanged = function (args) {
                    this.UpdateVisualState();
                };
                ButtonBase.prototype.OnIsEnabledChanged = function (e) {
                    var isEnabled = e.NewValue;
                    this._SuspendStateChanges = true;
                    try  {
                        if(!isEnabled) {
                            this.SetValueInternal(ButtonBase.IsFocusedProperty, false);
                            this.SetValueInternal(ButtonBase.IsPressedProperty, false);
                            this._IsMouseCaptured = false;
                            this._IsSpaceKeyDown = false;
                            this._IsMouseLeftButtonDown = false;
                        }
                    }finally {
                        this._SuspendStateChanges = false;
                        this.UpdateVisualState();
                    }
                };
                ButtonBase.prototype.OnMouseEnter = function (e) {
                    _super.prototype.OnMouseEnter.call(this, e);
                    this._SuspendStateChanges = true;
                    try  {
                        if(this.ClickMode === Controls.ClickMode.Hover && this.IsEnabled) {
                            this.SetValueInternal(ButtonBase.IsPressedProperty, true);
                            this.OnClick();
                        }
                    }finally {
                        this._SuspendStateChanges = false;
                        this.UpdateVisualState();
                    }
                };
                ButtonBase.prototype.OnMouseLeave = function (e) {
                    _super.prototype.OnMouseLeave.call(this, e);
                    this._SuspendStateChanges = true;
                    try  {
                        if(this.ClickMode === Controls.ClickMode.Hover && this.IsEnabled) {
                            this.SetValueInternal(ButtonBase.IsPressedProperty, false);
                        }
                    }finally {
                        this._SuspendStateChanges = false;
                        this.UpdateVisualState();
                    }
                };
                ButtonBase.prototype.OnMouseMove = function (e) {
                    _super.prototype.OnMouseMove.call(this, e);
                    this._MousePosition = e.GetPosition(this);
                    if(this._IsMouseLeftButtonDown && this.IsEnabled && this.ClickMode !== Controls.ClickMode.Hover && this._IsMouseCaptured && !this._IsSpaceKeyDown) {
                        this.SetValueInternal(ButtonBase.IsPressedProperty, this._IsValidMousePosition());
                    }
                };
                ButtonBase.prototype.OnMouseLeftButtonDown = function (e) {
                    _super.prototype.OnMouseLeftButtonDown.call(this, e);
                    this._IsMouseLeftButtonDown = true;
                    if(!this.IsEnabled) {
                        return;
                    }
                    var clickMode = this.ClickMode;
                    if(clickMode === Controls.ClickMode.Hover) {
                        return;
                    }
                    e.Handled = true;
                    this._SuspendStateChanges = true;
                    try  {
                        this.Focus();
                        this._CaptureMouseInternal();
                        if(this._IsMouseCaptured) {
                            this.SetValueInternal(ButtonBase.IsPressedProperty, true);
                        }
                    }finally {
                        this._SuspendStateChanges = false;
                        this.UpdateVisualState();
                    }
                    if(clickMode === Controls.ClickMode.Press) {
                        this.OnClick();
                    }
                };
                ButtonBase.prototype.OnMouseLeftButtonUp = function (e) {
                    _super.prototype.OnMouseLeftButtonDown.call(this, e);
                    this._IsMouseLeftButtonDown = false;
                    if(!this.IsEnabled) {
                        return;
                    }
                    var clickMode = this.ClickMode;
                    if(clickMode === Controls.ClickMode.Hover) {
                        return;
                    }
                    e.Handled = true;
                    if(!this._IsSpaceKeyDown && this.IsPressed && clickMode === Controls.ClickMode.Release) {
                        this.OnClick();
                    }
                    if(!this._IsSpaceKeyDown) {
                        this._ReleaseMouseCaptureInternal();
                        this.SetValueInternal(ButtonBase.IsPressedProperty, false);
                    }
                };
                ButtonBase.prototype.OnGotFocus = function (e) {
                    _super.prototype.OnGotFocus.call(this, e);
                    this.SetValueInternal(ButtonBase.IsFocusedProperty, true);
                    this.UpdateVisualState();
                };
                ButtonBase.prototype.OnLostFocus = function (e) {
                    _super.prototype.OnLostFocus.call(this, e);
                    this.SetValueInternal(ButtonBase.IsFocusedProperty, false);
                    this._SuspendStateChanges = true;
                    try  {
                        if(this.ClickMode !== Controls.ClickMode.Hover) {
                            this.SetValueInternal(ButtonBase.IsPressedProperty, false);
                            this._ReleaseMouseCaptureInternal();
                            this._IsSpaceKeyDown = false;
                        }
                    }finally {
                        this._SuspendStateChanges = false;
                        this.UpdateVisualState();
                    }
                };
                ButtonBase.prototype.OnClick = function () {
                    var cmd = this.Command;
                    var par = this.CommandParameter;
                    if(cmd != null && cmd.CanExecute(par)) {
                        cmd.Execute(par);
                    }
                    this.Click.Raise(this, new Fayde.RoutedEventArgs());
                };
                ButtonBase.prototype.UpdateVisualState = function (useTransitions) {
                    if(this._SuspendStateChanges) {
                        return;
                    }
                    _super.prototype.UpdateVisualState.call(this, useTransitions);
                };
                ButtonBase.prototype.GetVisualStateCommon = function () {
                    if(!this.IsEnabled) {
                        return "Disabled";
                    } else if(this.IsPressed) {
                        return "Pressed";
                    } else if(this.IsMouseOver) {
                        return "MouseOver";
                    } else {
                        return "Normal";
                    }
                };
                ButtonBase.prototype._CaptureMouseInternal = function () {
                    if(!this._IsMouseCaptured) {
                        this._IsMouseCaptured = this.CaptureMouse();
                    }
                };
                ButtonBase.prototype._ReleaseMouseCaptureInternal = function () {
                    this.ReleaseMouseCapture();
                    this._IsMouseCaptured = false;
                };
                ButtonBase.prototype._IsValidMousePosition = function () {
                    var pos = this._MousePosition;
                    return pos.X >= 0.0 && pos.X <= this.ActualWidth && pos.Y >= 0.0 && pos.Y <= this.ActualHeight;
                };
                ButtonBase.prototype.OnCommandChanged = function (args) {
                    var cmd;
                    if(Nullstone.ImplementsInterface(args.OldValue, Fayde.Input.ICommand_)) {
                        cmd = args.OldValue;
                        cmd.CanExecuteChanged.Unsubscribe(this.OnCommandCanExecuteChanged, this);
                    }
                    if(Nullstone.ImplementsInterface(args.NewValue, Fayde.Input.ICommand_)) {
                        cmd = args.NewValue;
                        cmd.CanExecuteChanged.Subscribe(this.OnCommandCanExecuteChanged, this);
                        this.IsEnabled = cmd.CanExecute(this.CommandParameter);
                    }
                };
                ButtonBase.prototype.OnCommandCanExecuteChanged = function (sender, e) {
                    this.IsEnabled = this.Command.CanExecute(this.CommandParameter);
                };
                ButtonBase.prototype.OnCommandParameterChanged = function (args) {
                    var cmd = this.Command;
                    if(cmd) {
                        this.IsEnabled = cmd.CanExecute(args.NewValue);
                    }
                };
                return ButtonBase;
            })(Controls.ContentControl);
            Primitives.ButtonBase = ButtonBase;            
            Nullstone.RegisterType(ButtonBase, "ButtonBase");
        })(Controls.Primitives || (Controls.Primitives = {}));
        var Primitives = Controls.Primitives;
    })(Fayde.Controls || (Fayde.Controls = {}));
    var Controls = Fayde.Controls;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=ButtonBase.js.map
