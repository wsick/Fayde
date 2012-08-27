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
    this.DefaultStyleKey = this.constructor;
};

//#region Properties

Thumb.IsDraggingProperty = DependencyProperty.RegisterReadOnly("IsDragging", function () { return Boolean; }, Thumb, false, function (d, args) { d.OnDraggingChanged(args); });
Thumb.IsFocusedProperty = DependencyProperty.RegisterReadOnly("IsFocused", function () { return Boolean; }, Thumb);

Nullstone.AutoPropertiesReadOnly(Thumb, [
    Thumb.IsDraggingProperty
]);
Nullstone.AutoProperty(Thumb, Thumb.IsFocusedProperty, undefined, true);

//#endregion

Thumb.Instance.OnApplyTemplate = function () {
    this.OnApplyTemplate$Control();
    this.$UpdateVisualState(false);
};

Thumb.Instance.CancelDrag = function () {
    if (this.IsDragging) {
        this.$SetValueInternal(Thumb.IsDraggingProperty, false);
        this._RaiseDragCompleted(true);
    }
};

Thumb.Instance._FocusChanged = function (hasFocus) {
    this.$SetValueInternal(Thumb.IsFocusedProperty, hasFocus);
    this.$UpdateVisualState();
};

Thumb.Instance.OnDraggingChanged = function (args) {
    this.$UpdateVisualState();
};
Thumb.Instance.OnIsEnabledChanged = function (args) {
    this.OnIsEnabledChanged$Control(args);
    this.$UpdateVisualState();
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
    this.OnLostMouseCapture$Control(sender, args);
    this._RaiseDragCompleted(false);
    this.$SetValueInternal(Thumb.IsDraggingProperty, false);
};
Thumb.Instance.OnMouseEnter = function (args) {
    this.OnMouseEnter$Control(args);
    if (this.IsEnabled) {
        this.$UpdateVisualState();
    }
};
Thumb.Instance.OnMouseLeave = function (args) {
    this.OnMouseLeave$Control(args);
    if (this.IsEnabled) {
        this.$UpdateVisualState();
    }
};
Thumb.Instance.OnMouseLeftButtonDown = function (sender, args) {
    this.OnMouseLeftButtonDown$Control(sender, args);
    if (args.Handled)
        return;
    if (!this.IsDragging && this.IsEnabled) {
        args.Handled = true;
        this.CaptureMouse();
        this.$SetValueInternal(Thumb.IsDraggingProperty, true);

        this._Origin = this._PreviousPosition = args.GetPosition(this._GetLogicalParent());
        var success = false;
        try {
            this._RaiseDragStarted();
            success = true;
        } finally {
            if (!success)
                this.CancelDrag();
        }
    }
};
Thumb.Instance.OnMouseMove = function (sender, args) {
    /// <param name="args" type="MouseEventArgs"></param>
    this.OnMouseMove$Control(sender, args);
    if (!this.IsDragging)
        return;
    var p = args.GetPosition(this._GetLogicalParent());
    if (!Point.Equals(p, this._PreviousPosition)) {
        this._RaiseDragDelta(p.X - this._PreviousPosition.X, p.Y - this._PreviousPosition.Y);
        this._PreviousPosition = p;
    }
};

//#endregion

Thumb.Instance._RaiseDragStarted = function () {
    this.DragStarted.Raise(this, new DragStartedEventArgs(this._Origin.X, this._Origin.Y));
};
Thumb.Instance._RaiseDragDelta = function (x, y) {
    this.DragDelta.Raise(this, new DragDeltaEventArgs(x, y));
};
Thumb.Instance._RaiseDragCompleted = function (canceled) {
    this.DragCompleted.Raise(this, new DragCompletedEventArgs(this._PreviousPosition.X - this._Origin.X, this._PreviousPosition.Y - this._Origin.Y, canceled));
};

Thumb.Instance.$GetVisualStateCommon = function () {
    if (!this.IsEnabled) {
        return "Disabled";
    } else if (this.IsDragging) {
        return "Pressed";
    } else if (this.IsMouseOver) {
        return "MouseOver";
    } else {
        return "Normal";
    }
};

Nullstone.FinishCreate(Thumb);
//#endregion