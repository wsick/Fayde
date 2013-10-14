/// <reference path="../Fayde.d.ts" />

module Fayde.Controls.Input.Internal {
    var SequentialClickThresholdInMilliseconds = 500.0;
    var SequentialClickThresholdInPixelsSquared = 9.0;

    export class InteractionHelper {
        Control: Control = null;
        IsFocused: boolean = false;
        IsMouseOver: boolean = false;
        IsReadOnly: boolean = false;
        IsPressed: boolean = false;
        LastClickTime: number = 0;
        LastClickPosition: Point = null;
        ClickCount: number = 0;

        constructor(control: Control) {
            this.Control = control;
            this.Control.Loaded.Subscribe(this.OnLoaded, this);
            this.Control.IsEnabledChanged.Subscribe(this.OnIsEnabledChanged, this);
        }

        GetVisualStateCommon(): string {
            if (!this.Control.IsEnabled)
                return "Disabled";
            else if (this.IsReadOnly)
                return "ReadOnly";
            else if (this.IsPressed)
                return "Pressed";
            else if (this.IsMouseOver)
                return "MouseOver";
            else
                return "Normal";
        }

        private OnLoaded(sender: any, e: RoutedEventArgs) {
            this.Control.UpdateVisualState(false);
        }
        private OnIsEnabledChanged(sender: any, args: DependencyPropertyChangedEventArgs) {
            if (args.NewValue !== true) {
                this.IsPressed = false;
                this.IsMouseOver = false;
                this.IsFocused = false;
            }
            this.Control.UpdateVisualState(true);
        }

        OnIsReadOnlyChanged(value: boolean) {
            this.IsReadOnly = value;
            if (!value) {
                this.IsPressed = false;
                this.IsMouseOver = false;
                this.IsFocused = false;
            }
            this.Control.UpdateVisualState(true);
        }

        AllowGotFocus(e: RoutedEventArgs): boolean {
            if (!e)
                throw new ArgumentException("e");
            if (!this.Control.IsEnabled)
                return false;
            this.IsFocused = true;
            return true;
        }
        AllowLostFocus(e: RoutedEventArgs): boolean {
            if (!e)
                throw new ArgumentException("e");
            if (!this.Control.IsEnabled)
                return false;
            this.IsFocused = false;
            return true;
        }
        OnLostFocusBase() {
            this.IsPressed = false;
            this.Control.UpdateVisualState(true);
        }

        AllowMouseEnter(e: Fayde.Input.MouseEventArgs): boolean {
            if (!e)
                throw new ArgumentException("e");
            if (!this.Control.IsEnabled)
                return false;
            this.IsMouseOver = true;
            return true;
        }
        AllowMouseLeave(e: Fayde.Input.MouseEventArgs): boolean {
            if (!e)
                throw new ArgumentException("e");
            if (!this.Control.IsEnabled)
                return false;
            this.IsMouseOver = false;
            return true;
        }

        AllowMouseLeftButtonDown(e: Fayde.Input.MouseButtonEventArgs): boolean {
            if (!e)
                throw new ArgumentException("e");
            var isEnabled = this.Control.IsEnabled;
            if (isEnabled) {
                var now = new Date().getTime();
                var position = e.GetPosition(this.Control);
                var totalMilliseconds = now - this.LastClickTime;
                var lastClickPosition = this.LastClickPosition;
                var num1 = position.X - lastClickPosition.X;
                var num2 = position.Y - lastClickPosition.Y;
                var num3 = num1 * num1 + num2 * num2;
                if (totalMilliseconds < 500.0 && num3 < 9.0)
                    ++this.ClickCount;
                else
                    this.ClickCount = 1;
                this.LastClickTime = now;
                this.LastClickPosition = position;
                this.IsPressed = true;
            }
            else
                this.ClickCount = 1;
            return isEnabled;
        }
        AllowMouseLeftButtonUp(e: Fayde.Input.MouseButtonEventArgs): boolean {
            if (!e)
                throw new ArgumentException("e");
            if (!this.Control.IsEnabled)
                return false;
            this.IsPressed = false;
            return true;
        }

        AllowKeyDown(e: Fayde.Input.KeyEventArgs): boolean {
            if (!e)
                throw new ArgumentException("e");
            return this.Control.IsEnabled;
        }
        AllowKeyUp(e: Fayde.Input.KeyEventArgs): boolean {
            if (!e)
                throw new ArgumentException("e");
            return this.Control.IsEnabled;
        }

        static GetLogicalKey(flowDirection: Fayde.FlowDirection, originalKey: Fayde.Input.Key): Fayde.Input.Key {
            var key = originalKey;
            if (flowDirection === Fayde.FlowDirection.RightToLeft) {
                switch (originalKey) {
                    case Fayde.Input.Key.Left:
                        key = Fayde.Input.Key.Right;
                        break;
                    case Fayde.Input.Key.Right:
                        key = Fayde.Input.Key.Left;
                        break;
                }
            }
            return key;
        }
    }
}