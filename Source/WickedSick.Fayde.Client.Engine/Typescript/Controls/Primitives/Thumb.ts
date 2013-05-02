/// <reference path="../Control.ts" />
/// CODE
/// <reference path="DragEventArgs.ts" />

module Fayde.Controls.Primitives {
    export class Thumb extends Control {
        private _PreviousPosition: Point = null;
        private _Origin: Point = null;

        DragCompleted: RoutedEvent = new RoutedEvent();
        DragDelta: RoutedEvent = new RoutedEvent();
        DragStarted: RoutedEvent = new RoutedEvent();

        static IsDraggingProperty: DependencyProperty = DependencyProperty.RegisterReadOnly("IsDragging", () => Boolean, Thumb, false, (d, args) => (<Thumb>d).OnDraggingChanged(args));
        static IsFocusedProperty: DependencyProperty = DependencyProperty.RegisterReadOnly("IsFocused", () => Boolean, Thumb);
        IsDragging: bool;
        IsFocused: bool;

        constructor() {
            super();
            this.DefaultStyleKey = (<any>this).constructor;
        }

        OnApplyTemplate() {
            super.OnApplyTemplate();
            this.UpdateVisualState(false);
        }

        CancelDrag() {
            if (this.IsDragging) {
                this.SetValueInternal(Thumb.IsDraggingProperty, false);
                this._RaiseDragCompleted(true);
            }
        }

        private _FocusChanged(hasFocus: bool) {
            this.SetValueInternal(Thumb.IsFocusedProperty, hasFocus);
            this.UpdateVisualState();
        }

        private OnDraggingChanged(args: IDependencyPropertyChangedEventArgs) {
            this.UpdateVisualState();
        }
        private OnIsEnabledChanged(e: IDependencyPropertyChangedEventArgs) {
            super.OnIsEnabledChanged(e);
            this.UpdateVisualState();
        }

        OnGotFocus(e: RoutedEventArgs) {
            super.OnGotFocus(e);
            this._FocusChanged(this.XamlNode._HasFocus());
        }
        OnLostFocus(e: RoutedEventArgs) {
            super.OnLostFocus(e);
            this._FocusChanged(this.XamlNode._HasFocus());
        }

        OnLostMouseCapture(e: Input.MouseEventArgs) {
            super.OnLostMouseCapture(e);
            this._RaiseDragCompleted(false);
            this.SetValueInternal(Thumb.IsDraggingProperty, false);
        }
        OnMouseEnter(e: Input.MouseEventArgs) {
            super.OnMouseEnter(e);
            if (this.IsEnabled)
                this.UpdateVisualState();
        }
        OnMouseLeave(e: Input.MouseEventArgs) {
            super.OnMouseLeave(e);
            if (this.IsEnabled)
                this.UpdateVisualState();
        }
        OnMouseLeftButtonDown(e: Input.MouseButtonEventArgs) {
            super.OnMouseLeftButtonDown(e);
            if (e.Handled)
                return;
            if (!this.IsDragging && this.IsEnabled) {
                e.Handled = true;
                this.CaptureMouse();
                this.SetValueInternal(Thumb.IsDraggingProperty, true);

                var vpNode = this.XamlNode.VisualParentNode;
                this._Origin = this._PreviousPosition = e.GetPosition((vpNode) ? vpNode.XObject : undefined);
                var success = false;
                try {
                    this._RaiseDragStarted();
                    success = true;
                } finally {
                    if (!success)
                        this.CancelDrag();
                }
            }
        }
        OnMouseMove(e: Input.MouseEventArgs) {
            super.OnMouseMove(e);
            if (!this.IsDragging)
                return;
            var vpNode = this.XamlNode.VisualParentNode;
            var p = e.GetPosition((vpNode) ? vpNode.XObject : undefined);
            if (!Point.Equals(p, this._PreviousPosition)) {
                this._RaiseDragDelta(p.X - this._PreviousPosition.X, p.Y - this._PreviousPosition.Y);
                this._PreviousPosition = p;
            }
        }

        private _RaiseDragStarted() {
            this.DragStarted.Raise(this, new DragStartedEventArgs(this._Origin.X, this._Origin.Y));
        }
        private _RaiseDragDelta(x: number, y: number) {
            this.DragDelta.Raise(this, new DragDeltaEventArgs(x, y));
        }
        private _RaiseDragCompleted(canceled: bool) {
            this.DragCompleted.Raise(this, new DragCompletedEventArgs(this._PreviousPosition.X - this._Origin.X, this._PreviousPosition.Y - this._Origin.Y, canceled));
        }

        GetVisualStateCommon(): string {
            if (!this.IsEnabled) {
                return "Disabled";
            } else if (this.IsDragging) {
                return "Pressed";
            } else if (this.IsMouseOver) {
                return "MouseOver";
            } else {
                return "Normal";
            }
        }
    }
    Nullstone.RegisterType(Thumb, "Thumb");
}