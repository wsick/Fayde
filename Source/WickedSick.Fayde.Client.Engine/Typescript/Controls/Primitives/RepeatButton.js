var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Fayde;
(function (Fayde) {
    (function (Controls) {
        /// <reference path="ButtonBase.ts" />
        /// CODE
        /// <reference path="../../Core/VisualTreeHelper.ts" />
        (function (Primitives) {
            var RepeatButton = (function (_super) {
                __extends(RepeatButton, _super);
                function RepeatButton() {
                                _super.call(this);
                    this._KeyboardCausingRepeat = false;
                    this._MouseCausingRepeat = false;
                    this._MousePosition = null;
                    this._IntervalID = null;
                    this._NewInterval = null;
                    this._ElementRoot = null;
                    this.ClickMode = Controls.ClickMode.Press;
                    this.DefaultStyleKey = (this).constructor;
                }
                RepeatButton.DelayProperty = DependencyProperty.Register("Delay", function () {
                    return Number;
                }, RepeatButton, 500, function (d, args) {
                    return (d).OnDelayChanged(args);
                });
                RepeatButton.IntervalProperty = DependencyProperty.Register("Interval", function () {
                    return Number;
                }, RepeatButton, 33, function (d, args) {
                    return (d).OnIntervalChanged(args);
                });
                RepeatButton.prototype.OnApplyTemplate = function () {
                    _super.prototype.OnApplyTemplate.call(this);
                    var er = this.GetTemplateChild("Root");
                    if(er instanceof Fayde.FrameworkElement) {
                        this._ElementRoot = er;
                    }
                    this.UpdateVisualState(false);
                };
                RepeatButton.prototype.OnDelayChanged = function (args) {
                    if(args.NewValue < 0) {
                        throw new ArgumentException("Delay Property cannot be negative.");
                    }
                };
                RepeatButton.prototype.OnIntervalChanged = function (args) {
                    if(args.NewValue < 0) {
                        throw new ArgumentException("Interval Property cannot be negative.");
                    }
                    this._NewInterval = args.NewValue;
                };
                RepeatButton.prototype.OnIsEnabledChanged = function (e) {
                    _super.prototype.OnIsEnabledChanged.call(this, e);
                    this._KeyboardCausingRepeat = false;
                    this._MouseCausingRepeat = false;
                    this._UpdateRepeatState();
                };
                RepeatButton.prototype.OnKeyDown = function (e) {
                    if(e.Key === Fayde.Input.Key.Space && this.ClickMode !== Controls.ClickMode.Hover) {
                        this._KeyboardCausingRepeat = true;
                        this._UpdateRepeatState();
                    }
                    _super.prototype.OnKeyDown.call(this, e);
                };
                RepeatButton.prototype.OnKeyUp = function (e) {
                    _super.prototype.OnKeyUp.call(this, e);
                    if(e.Key === Fayde.Input.Key.Space && this.ClickMode !== Controls.ClickMode.Hover) {
                        this._KeyboardCausingRepeat = false;
                        this._UpdateRepeatState();
                    }
                    this.UpdateVisualState();
                };
                RepeatButton.prototype.OnLostFocus = function (e) {
                    _super.prototype.OnLostFocus.call(this, e);
                    if(this.ClickMode !== Controls.ClickMode.Hover) {
                        this._KeyboardCausingRepeat = false;
                        this._MouseCausingRepeat = false;
                        this._UpdateRepeatState();
                    }
                };
                RepeatButton.prototype.OnMouseEnter = function (e) {
                    _super.prototype.OnMouseEnter.call(this, e);
                    if(this.ClickMode === Controls.ClickMode.Hover) {
                        this._MouseCausingRepeat = true;
                        this._UpdateRepeatState();
                    }
                    this.UpdateVisualState();
                    this._UpdateMousePosition(e);
                };
                RepeatButton.prototype.OnMouseLeave = function (e) {
                    _super.prototype.OnMouseLeave.call(this, e);
                    if(this.ClickMode === Controls.ClickMode.Hover) {
                        this._MouseCausingRepeat = false;
                        this._UpdateRepeatState();
                    }
                    this.UpdateVisualState();
                };
                RepeatButton.prototype.OnMouseLeftButtonDown = function (e) {
                    if(e.Handled) {
                        return;
                    }
                    _super.prototype.OnMouseLeftButtonDown.call(this, e);
                    if(this.ClickMode !== Controls.ClickMode.Hover) {
                        this._MouseCausingRepeat = true;
                        this._UpdateRepeatState();
                    }
                };
                RepeatButton.prototype.OnMouseLeftButtonUp = function (e) {
                    if(e.Handled) {
                        return;
                    }
                    _super.prototype.OnMouseLeftButtonUp.call(this, e);
                    if(this.ClickMode !== Controls.ClickMode.Hover) {
                        this._MouseCausingRepeat = false;
                        this._UpdateRepeatState();
                    }
                    this.UpdateVisualState();
                };
                RepeatButton.prototype.OnMouseMove = function (e) {
                    this._UpdateMousePosition(e);
                };
                RepeatButton.prototype._UpdateMousePosition = function (e) {
                    var curNode = this.XamlNode;
                    var parentNode = curNode;
                    while(curNode instanceof Fayde.FENode) {
                        parentNode = curNode;
                        curNode = curNode.ParentNode;
                    }
                    this._MousePosition = e.GetPosition(parentNode.XObject);
                };
                RepeatButton.prototype._UpdateRepeatState = function () {
                    var _this = this;
                    if(this._MouseCausingRepeat || this._KeyboardCausingRepeat) {
                        if(this._IntervalID == null) {
                            this._IntervalID = window.setInterval(function () {
                                return _this._OnTimeout();
                            }, this.Interval);
                        }
                    } else {
                        if(this._IntervalID != null) {
                            window.clearInterval(this._IntervalID);
                        }
                        this._IntervalID = null;
                    }
                };
                RepeatButton.prototype._OnTimeout = function () {
                    var _this = this;
                    if(this._NewInterval != null) {
                        window.clearInterval(this._IntervalID);
                        this._IntervalID = window.setInterval(function () {
                            return _this._OnTimeout();
                        }, this._NewInterval);
                        this._NewInterval = null;
                    }
                    if(!this.IsPressed) {
                        return;
                    }
                    if(this._KeyboardCausingRepeat) {
                        this.OnClick();
                        return;
                    }
                    var er = this._ElementRoot;
                    var els = Fayde.VisualTreeHelper.FindElementsInHostCoordinates(this._MousePosition, this);
                    for(var i = 0; i < els.length; i++) {
                        if(els[i] === er) {
                            this.OnClick();
                        }
                    }
                };
                return RepeatButton;
            })(Primitives.ButtonBase);
            Primitives.RepeatButton = RepeatButton;            
            Nullstone.RegisterType(RepeatButton, "RepeatButton");
        })(Controls.Primitives || (Controls.Primitives = {}));
        var Primitives = Controls.Primitives;
    })(Fayde.Controls || (Fayde.Controls = {}));
    var Controls = Fayde.Controls;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=RepeatButton.js.map
