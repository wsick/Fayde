/// <reference path="../Control.js"/>
/// CODE
/// <reference path="DragStartedEventArgs.js"/>
/// <reference path="DragDeltaEventArgs.js"/>
/// <reference path="DragCompletedEventArgs.js"/>

//#region Thumb
var Thumb = Nullstone.Create("Thumb", Control);

Thumb.Instance.Init = function () {
    this.Init$Control();
    this.DragCompleted = new MulticastEvent();
    this.DragDelta = new MulticastEvent();
    this.DragStarted = new MulticastEvent();
};

//#region Dependency Properties

Thumb.IsDraggingProperty = DependencyProperty.RegisterReadOnly("IsDragging", function () { return Boolean; }, Thumb, false, function (d, args) { d.OnDraggingChanged(args); });
Thumb.Instance.GetIsDragging = function () {
    ///<returns type="Boolean"></returns>
    return this.GetValue(Thumb.IsDraggingProperty);
};

Thumb.IsFocusedProperty = DependencyProperty.RegisterReadOnly("IsFocused", function () { return Boolean; }, Thumb);
Thumb.Instance.GetIsFocused = function () {
    ///<returns type="Boolean"></returns>
    return this.GetValue(Thumb.IsFocusedProperty);
};

//#endregion

Thumb.Instance.CancelDrag = function () {
    if (this.GetIsDragging()) {
        this._SetValueInternal(Thumb.IsDraggingProperty, false);
        this._RaiseDragCompleted(true);
    }
};

Thumb.Instance.OnApplyTemplate = function () {
    this.OnApplyTemplate$Control();
    this.UpdateVisualState(false);
};

Thumb.Instance._FocusChanged = function (hasFocus) {
    this._SetValueInternal(Thumb.IsFocusedProperty, hasFocus);
    this.UpdateVisualState();
};

Thumb.Instance.OnDraggingChanged = function (args) {
    this.UpdateVisualState();
};
Thumb.Instance.OnIsEnabledChanged = function (args) {
    this.OnIsEnabledChanged$Control(args);
    if (!this.GetIsEnabled())
        this._IsMouseOver = false;
    this.UpdateVisualState();
};

//#region Focus

Thumb.Instance.OnGotFocus = function (sender, args) {
    this.OnGotFocus$Control(sender, args);
    this._FocusChanged(this._HasFocus());
};
Thumb.Instance.OnLostFocus = function (sender, args) {
    this.OnLostFocus$Control(sender, args);
    this._FocusChanged(this._HasFocus());
};

//#endregion

//#region Mouse

Thumb.Instance.OnLostMouseCapture = function (sender, args) {
    if (this.GetIsDragging() && this.GetIsEnabled()) {
        this._SetValueInternal(Thumb.IsDraggingProperty, false);
        this.ReleaseMouseCapture();
        this._RaiseDragCompleted(false);
    }
};
Thumb.Instance.OnMouseEnter = function (sender, args) {
    this.OnMouseEnter$Control(sender, args);
    if (this.GetIsEnabled()) {
        this._IsMouseOver = true;
        this.UpdateVisualState();
    }
};
Thumb.Instance.OnMouseLeave = function (sender, args) {
    this.OnMouseLeave$Control(sender, args);
    if (this.GetIsEnabled()) {
        this._IsMouseOver = false;
        this.UpdateVisualState();
    }
};
Thumb.Instance.OnMouseLeftButtonDown = function (sender, args) {
    this.OnMouseLeftButtonDown$Control(sender, args);
    if (args.Handled)
        return;
    if (!this.GetIsDragging() && this.GetIsEnabled()) {
        args.Handled = true;
        this.CaptureMouse();
        this._SetValueInternal(Thumb.IsDraggingProperty, true);

        this._Origin = this._PreviousPosition = args.GetPosition(this._Parent);
        try {
            this._RaiseDragStarted();
        } finally {
            this.CancelDrag();
        }
    }
};
Thumb.Instance.OnMouseMove = function (sender, args) {
    /// <param name="args" type="MouseEventArgs"></param>
    this.OnMouseMove$Control(sender, args);
    if (!this.GetIsDragging())
        return;
    var p = args.GetPosition(this._Parent);
    if (!Point.Equals(p, this._PreviousPosition)) {
        this._RaiseDragDelta(p.X - this._PreviousPosition.X, p.Y - this._PreviousPosition.Y);
        this._PreviousPosition = p;
    }
};

//#endregion

Thumb.Instance.UpdateVisualState = function (useTransitions) {
    if (useTransitions === undefined) useTransitions = true;
    if (!this.GetIsEnabled()) {
        this._GoToState(useTransitions, "Disabled");
    } else if (this.GetIsDragging()) {
        this._GoToState(useTransitions, "Pressed");
    } else if (this._IsMouseOver) {
        this._GoToState(useTransitions, "MouseOver");
    } else {
        this._GoToState(useTransitions, "Normal");
    }

    if (this.GetIsFocused() && this.GetIsEnabled())
        this._GoToState(useTransitions, "Focused");
    else
        this._GoToState(useTransitions, "Unfocused");
};

Thumb.Instance._RaiseDragStarted = function () {
    this.DragStarted.Raise(this, new DragStartedEventArgs(this._Origin.X, this._Origin.Y));
};
Thumb.Instance._RaiseDragDelta = function (x, y) {
    this.DragDelta.Raise(this, new DragDeltaEventArgs(x, y));
};
Thumb.Instance._RaiseDragCompleted = function (canceled) {
    this.DragCompleted.Raise(this, new DragCompletedEventArgs(this._PreviousPosition.X - this._Origin.X, this._PreviousPosition.Y - this._Origin.Y, canceled));
};

Thumb.Instance.GetDefaultStyle = function () {
    var styleJson = {
        Type: Style,
        Props: {
            TargetType: "Thumb"
        },
        Children: [
            {
                Type: Setter,
                Props: {
                    Property: DependencyProperty.GetDependencyProperty(Thumb, "Background"),
                    Value: "#FF1F3B53"
                }
            },
            {
                Type: Setter,
                Props: {
                    Property: DependencyProperty.GetDependencyProperty(Thumb, "BorderThickness"),
                    Value: "1"
                }
            },
            {
                Type: Setter,
                Props: {
                    Property: DependencyProperty.GetDependencyProperty(Thumb, "IsTabStop"),
                    Value: "False"
                }
            },
            {
                Type: Setter,
                Props: {
                    Property: DependencyProperty.GetDependencyProperty(Thumb, "BorderBrush"),
                    Value: {
                        Type: LinearGradientBrush,
                        Props: {
                            EndPoint: new Point(0.5, 1),
                            StartPoint: new Point(0.5, 0)
                        },
                        Children: [
                            {
                                Type: GradientStop,
                                Props: {
                                    Color: Color.FromHex("#FFA3AEB9"),
                                    Offset: 0
                                }
                            },
                            {
                                Type: GradientStop,
                                Props: {
                                    Color: Color.FromHex("#FF8399A9"),
                                    Offset: 0.375
                                }
                            },
                            {
                                Type: GradientStop,
                                Props: {
                                    Color: Color.FromHex("#FF718597"),
                                    Offset: 0.375
                                }
                            },
                            {
                                Type: GradientStop,
                                Props: {
                                    Color: Color.FromHex("#FF617584"),
                                    Offset: 1
                                }
                            }
                        ]
                    }
                }
            },
            {
                Type: Setter,
                Props: {
                    Property: DependencyProperty.GetDependencyProperty(Thumb, "Template"),
                    Value: {
                        Type: ControlTemplate,
                        Props: {
                            TargetType: "Thumb"
                        },
                        Content: {
                            Type: Grid,
                            Children: [
                                {
                                    Type: Border,
                                    Props: {
                                        CornerRadius: new CornerRadius(2, 2, 2, 2),
                                        Background: {
                                            Type: SolidColorBrush,
                                            Props: {
                                                Color: Color.FromHex("#FFFFFFFF")
                                            }
                                        },
                                        BorderThickness: new TemplateBindingMarkup("BorderThickness"),
                                        BorderBrush: new TemplateBindingMarkup("BorderBrush")
                                    },
                                    Content: {
                                        Type: Grid,
                                        Props: {
                                            Background: new TemplateBindingMarkup("Background"),
                                            Margin: new Thickness(1, 1, 1, 1)
                                        },
                                        Children: [
                                            {
                                                Type: Border,
                                                Props: {
                                                    Opacity: 0,
                                                    Background: {
                                                        Type: SolidColorBrush,
                                                        Props: {
                                                            Color: Color.FromHex("#FF448DCA")
                                                        }
                                                    }
                                                }
                                            },
                                            {
                                                Type: Rectangle,
                                                Props: {
                                                    Fill: {
                                                        Type: LinearGradientBrush,
                                                        Props: {
                                                            StartPoint: new Point(0.7, 0),
                                                            EndPoint: new Point(0.7, 1)
                                                        },
                                                        Children: [
                                                            {
                                                                Type: GradientStop,
                                                                Props: {
                                                                    Color: Color.FromHex("#FFFFFFFF"),
                                                                    Offset: 0
                                                                }
                                                            },
                                                            {
                                                                Type: GradientStop,
                                                                Props: {
                                                                    Color: Color.FromHex("#F9FFFFFF"),
                                                                    Offset: 0.375
                                                                }
                                                            },
                                                            {
                                                                Type: GradientStop,
                                                                Props: {
                                                                    Color: Color.FromHex("#E5FFFFFF"),
                                                                    Offset: 0.625
                                                                }
                                                            },
                                                            {
                                                                Type: GradientStop,
                                                                Props: {
                                                                    Color: Color.FromHex("#C6FFFFFF"),
                                                                    Offset: 1
                                                                }
                                                            }
                                                        ]
                                                    }
                                                }
                                            }
                                        ]
                                    }
                                },
                                {
                                    Type: Rectangle,
                                    Props: {
                                        RadiusX: 2,
                                        RadiusY: 2,
                                        Fill: {
                                            Type: SolidColorBrush,
                                            Props: {
                                                Color: Color.FromHex("#FFFFFFFF")
                                            }
                                        },
                                        Opacity: 0,
                                        IsHitTestVisible: "false"
                                    }
                                },
                                {
                                    Type: Rectangle,
                                    Props: {
                                        RadiusX: 1,
                                        RadiusY: 1,
                                        Margin: new Thickness(1, 1, 1, 1),
                                        Stroke: {
                                            Type: SolidColorBrush,
                                            Props: {
                                                Color: Color.FromHex("#FF6DBDD1")
                                            }
                                        },
                                        StrokeThickness: 1,
                                        Opacity: 0,
                                        IsHitTestVisible: "false"
                                    }
                                }
                            ]
                        }
                    }
                }
            }
        ]
    };
    var parser = new JsonParser();
    return parser.CreateObject(styleJson, new NameScope());
};



Nullstone.FinishCreate(Thumb);
//#endregion