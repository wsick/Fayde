/// <reference path="ButtonBase.js"/>
/// CODE
/// <reference path="Style.js"/>
/// <reference path="JsonParser.js"/>
/// <reference path="Brushes.js"/>
/// <reference path="Primitives.js"/>

//#region Button

function Button() {
    ButtonBase.call(this);
    this._ElementRoot = null;
    this._ElementFocusVisual = null;
    this._StateNormal = null;
    this.SetIsTabStop(false);
}
RefObject.Register(Button, ButtonBase);

Button.StateDisabled = "";
Button.StatePressed = "";
Button.StatePressed = "";
Button.StateMouseOver = "";
Button.StateNormal = "";
Button.StateFocused = "";
Button.StateUnfocused = "";

Button.prototype.OnApplyTemplate = function () {
    ButtonBase.prototype.OnApplyTemplate.call(this);

    this.UpdateVisualState(false);
};
Button.prototype.ChangeVisualState = function (useTransitions) {
    if (!this.GetIsEnabled()) {
        this._GoToState(useTransitions, Button.StateDisabled);
    } else if (this.GetIsPressed()) {
        this._GoToState(useTransitions, Button.StatePressed);
    } else if (this.GetIsMouseOver()) {
        this._GoToState(useTransitions, Button.StateMouseOver);
    } else {
        this._GoToState(useTransitions, Button.StateNormal);
    }

    if (this.GetIsFocused() && this.GetIsEnabled()) {
        this._GoToState(useTransitions, Button.StateFocused);
    } else {
        this._GoToState(useTransitions, Button.StateUnfocused);
    }
};
Button.prototype.OnIsEnabledChanged = function (e) {
    ButtonBase.prototype.OnIsEnabledChanged.call(this, e);
    this.SetIsTabStop(e.NewValue);
};

//#region DEFAULT STYLE

Button.prototype.GetDefaultStyle = function () {

    var style = new Style();

    style._AddSetter(this, "Background", new SolidColorBrush(Color.FromHex("#FF1F3B53")));
    style._AddSetter(this, "Foreground", new SolidColorBrush(Color.FromHex("#FF000000")));
    style._AddSetter(this, "Padding", new Thickness(3, 3, 3, 3));
    style._AddSetter(this, "BorderThickness", new Thickness(1, 1, 1, 1));

    style._AddSetterJson(this, "BorderBrush", {
        Type: LinearGradientBrush,
        StartPoint: new Point(0.5, 1),
        EndPoint: new Point(0.5, 1),
        GradientStops: [
            {
                Color: Color.FromHex("#FFA3AEB9"),
                Offset: 0.0
            },
            {
                Color: Color.FromHex("#FF8399A9"),
                Offset: 0.375
            },
            {
                Color: Color.FromHex("#FF718597"),
                Offset: 0.375
            },
            {
                Color: Color.FromHex("#FF617584"),
                Offset: 1.0
            }
        ]
    });

    style._AddSetterControlTemplate(this, "Template", {
        Type: Grid,
        Children: [
            
        ]
    });


    return style;
};

//#endregion

//#endregion