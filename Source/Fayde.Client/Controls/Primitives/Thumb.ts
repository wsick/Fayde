/// <reference path="../Control.ts" />

module Fayde.Controls.Primitives {
    export class Thumb extends Control {
        private _PreviousPosition: Point = null;
        private _Origin: Point = null;

        DragCompleted: RoutedEvent<DragCompletedEventArgs> = new RoutedEvent<DragCompletedEventArgs>();
        DragDelta: RoutedEvent<DragDeltaEventArgs> = new RoutedEvent<DragDeltaEventArgs>();
        DragStarted: RoutedEvent<DragStartedEventArgs> = new RoutedEvent<DragStartedEventArgs>();

        static IsDraggingProperty: DependencyProperty = DependencyProperty.RegisterReadOnly("IsDragging", () => Boolean, Thumb, false, (d, args) => (<Thumb>d).OnDraggingChanged(args));
        static IsFocusedProperty: DependencyProperty = DependencyProperty.RegisterReadOnly("IsFocused", () => Boolean, Thumb);
        IsDragging: boolean;
        IsFocused: boolean;

        constructor() {
            super();
            this.DefaultStyleKey = (<any>this).constructor;
        }

        OnApplyTemplate() {
            super.OnApplyTemplate();
            this.UpdateVisualState(false);
        }

        private OnDraggingChanged(args: IDependencyPropertyChangedEventArgs) {
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
        private _FocusChanged(hasFocus: boolean) {
            this.SetStoreValue(Thumb.IsFocusedProperty, hasFocus);
            this.UpdateVisualState();
        }

        OnLostMouseCapture(e: Input.MouseEventArgs) {
            if (!this.IsDragging || !this.IsEnabled)
                return;
            this.SetStoreValue(Thumb.IsDraggingProperty, false);
            this._RaiseDragCompleted(false);
        }
        OnMouseEnter(e: Input.MouseEventArgs) {
            if (this.IsEnabled)
                this.UpdateVisualState();
        }
        OnMouseLeave(e: Input.MouseEventArgs) {
            if (this.IsEnabled)
                this.UpdateVisualState();
        }
        OnMouseLeftButtonDown(e: Input.MouseButtonEventArgs) {
            super.OnMouseLeftButtonDown(e);
            if (e.Handled || this.IsDragging || !this.IsEnabled)
                return;
            e.Handled = true;
            this.CaptureMouse();
            this.SetStoreValue(Thumb.IsDraggingProperty, true);

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
        OnMouseMove(e: Input.MouseEventArgs) {
            if (!this.IsDragging)
                return;
            var vpNode = this.XamlNode.VisualParentNode;
            var p = e.GetPosition((vpNode) ? vpNode.XObject : undefined);
            if (!Point.Equals(p, this._PreviousPosition)) {
                this._RaiseDragDelta(p.X - this._PreviousPosition.X, p.Y - this._PreviousPosition.Y);
                this._PreviousPosition = p;
            }
        }

        CancelDrag() {
            if (!this.IsDragging)
                return;
            this.SetStoreValue(Thumb.IsDraggingProperty, false);
            this._RaiseDragCompleted(true);
        }

        private _RaiseDragStarted() {
            this.DragStarted.Raise(this, new DragStartedEventArgs(this._Origin.X, this._Origin.Y));
        }
        private _RaiseDragDelta(x: number, y: number) {
            this.DragDelta.Raise(this, new DragDeltaEventArgs(x, y));
        }
        private _RaiseDragCompleted(canceled: boolean) {
            this.DragCompleted.Raise(this, new DragCompletedEventArgs(this._PreviousPosition.X - this._Origin.X, this._PreviousPosition.Y - this._Origin.Y, canceled));
        }
        
        GoToStateCommon(gotoFunc: (state: string) => boolean): boolean {
            if (!this.IsEnabled)
                return gotoFunc("Disabled");
            if (this.IsDragging)
                return gotoFunc("Pressed");
            if (this.IsMouseOver)
                return gotoFunc("MouseOver");
            return gotoFunc("Normal");
        }
    }
    Fayde.RegisterType(Thumb, "Fayde.Controls.Primitives", Fayde.XMLNS);
}