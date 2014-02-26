module Fayde.Controls.Internal {

    export class DragValidator {
        private _targetElement: UIElement;
        private _start: Point;
        private _draggingActive: boolean;

        constructor(targetElement: UIElement) {
            this._targetElement = targetElement;
            this._targetElement.MouseLeftButtonDown.Subscribe(this.TargetElement_MouseLeftButtonDown, this);
            this._targetElement.MouseLeftButtonUp.Subscribe(this.TargetElement_MouseLeftButtonUp, this);
            this._targetElement.MouseMove.Subscribe(this.TargetElement_MouseMove, this);
        }

        private OnDragCompleted(e: Fayde.Input.MouseEventArgs, canceled: boolean): void {
            if (this.DragCompletedEvent != null) {
                if (!canceled) {
                    var pos = e.GetPosition(this._targetElement);
                    if (this._targetElement.RenderTransform != null) {
                        pos = this._targetElement.RenderTransform.Transform(pos);
                    }
                    var point = new Point(pos.X - this._start.X, pos.Y - this._start.Y);
                }
                else {
                    point = new Point();
                }
                this.DragCompletedEvent.Raise(this._targetElement, new Controls.Primitives.DragCompletedEventArgs(point.X, point.Y, canceled));
            }
        }

        private OnDragDelta(e: Fayde.Input.MouseEventArgs): void {
            if (this.DragDeltaEvent != null) {
                var pos = e.GetPosition(this._targetElement);
                if (this._targetElement.RenderTransform != null) {
                    pos = this._targetElement.RenderTransform.Transform(pos);
                }
                this.DragDeltaEvent.Raise(this._targetElement, new Controls.Primitives.DragDeltaEventArgs(pos.X - this._start.X, pos.Y - this._start.Y));
            }
        }

        private OnDragStarted(): void {
            if (this.DragStartedEvent != null) {
                this.DragStartedEvent.Raise(this._targetElement, new Controls.Primitives.DragStartedEventArgs(0, 0));
            }
        }

        private TargetElement_MouseLeftButtonDown(sender: any, e: Fayde.Input.MouseButtonEventArgs): void {
            this._start = e.GetPosition(this._targetElement);
            if (this._targetElement.RenderTransform != null) {
                this._start = this._targetElement.RenderTransform.Transform(this._start);
            }
            this._draggingActive = this._targetElement.CaptureMouse();
            if (this._draggingActive) {
                this.OnDragStarted();
            }
        }

        private TargetElement_MouseLeftButtonUp(sender: any, e: Fayde.Input.MouseButtonEventArgs): void {
            this._targetElement.ReleaseMouseCapture();
            this._draggingActive = false;
            this.OnDragCompleted(e, false);
        }

        private TargetElement_MouseMove(sender: any, e: Fayde.Input.MouseEventArgs) {
            if (this._draggingActive) {
                this.OnDragDelta(e);
            }
        }

        DragCompletedEvent: Fayde.RoutedEvent<Fayde.Controls.Primitives.DragCompletedEventArgs> = new Fayde.RoutedEvent<Fayde.Controls.Primitives.DragCompletedEventArgs>();

        DragDeltaEvent: Fayde.RoutedEvent<Fayde.Controls.Primitives.DragDeltaEventArgs> = new Fayde.RoutedEvent<Fayde.Controls.Primitives.DragDeltaEventArgs>();

        DragStartedEvent: Fayde.RoutedEvent<Fayde.Controls.Primitives.DragStartedEventArgs> = new Fayde.RoutedEvent<Fayde.Controls.Primitives.DragStartedEventArgs>();
    }
}