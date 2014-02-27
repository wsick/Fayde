module Fayde.Controls {

    var dragIncrement = 1;
    var keyIncrement = 10;

    export class GridSplitter extends Control {
        private _Helper: Internal.GridSplitterResizer;
        private _dragValidator: Fayde.Controls.Internal.DragValidator;

        constructor() {
            super();
            this.DefaultStyleKey = (<any>this).constructor;
            this._Helper = new Internal.GridSplitterResizer(this);

            this.LayoutUpdated.Subscribe(this._OnLayoutUpdated, this);

            this._dragValidator = new Fayde.Controls.Internal.DragValidator(this);
            this._dragValidator.DragStartedEvent.Subscribe(this.DragValidator_OnDragStarted, this);
            this._dragValidator.DragDeltaEvent.Subscribe(this.DragValidator_OnDragDelta, this);
            this._dragValidator.DragCompletedEvent.Subscribe(this.DragValidator_OnDragCompleted, this);
        }

        HorizontalTemplateElement: FrameworkElement;
        VerticalTemplateElement: FrameworkElement;

        OnApplyTemplate() {
            super.OnApplyTemplate();
            this.HorizontalTemplateElement = <FrameworkElement>this.GetTemplateChild("HorizontalTemplate", FrameworkElement);
            this.VerticalTemplateElement = <FrameworkElement>this.GetTemplateChild("VerticalTemplate", FrameworkElement);
            if (this._Helper.UpdateResizeDirection(this))
                this._OnResizeDirectionChanged();
            this.UpdateVisualState();
        }
        private _OnLayoutUpdated(sender: any, e: EventArgs) {
            if (this._Helper.UpdateResizeDirection(this))
                this._OnResizeDirectionChanged();
        }
        private _OnResizeDirectionChanged() {
            var isColumns = this._Helper.Direction === Internal.GridResizeDirection.Columns;

            this.Cursor = isColumns ? CursorType.SizeWE : CursorType.SizeNS;

            var ht = this.HorizontalTemplateElement;
            if (ht)
                ht.Visibility = !isColumns ? Visibility.Visible : Visibility.Collapsed;
            var vt = this.VerticalTemplateElement;
            if (vt)
                vt.Visibility = isColumns ? Visibility.Visible : Visibility.Collapsed;
        }

        OnGotFocus(e: RoutedEventArgs) {
            super.OnGotFocus(e);
            this.UpdateVisualState();
        }
        OnLostFocus(e: RoutedEventArgs) {
            super.OnLostFocus(e);
            this.UpdateVisualState();
        }
        OnKeyDown(e: Input.KeyEventArgs) {
            super.OnKeyDown(e);
            if (e.Key === Fayde.Input.Key.Escape) {
                if (!this._Helper)
                    return;
                this._Helper = null;
                e.Handled = true;
                return;
            }
            if (!this.IsFocused || !this.IsEnabled)
                return;
            var horiz = 0;
            var vert = 0;
            switch (e.Key) {
                case Fayde.Input.Key.Left:
                    horiz = -keyIncrement;
                    break;
                case Fayde.Input.Key.Up:
                    vert = -keyIncrement;
                    break;
                case Fayde.Input.Key.Right:
                    horiz = keyIncrement;
                    break;
                case Fayde.Input.Key.Down:
                    vert = keyIncrement;
                    break;
            }
            if (this.FlowDirection === FlowDirection.RightToLeft)
                e.Handled = this._HandleMove(-horiz, vert, true);
            else
                e.Handled = this._HandleMove(horiz, vert, true);
        }

        private DragValidator_OnDragCompleted(sender: any, e: Fayde.Controls.Primitives.DragCompletedEventArgs) {
            this._Helper = null;
            this.UpdateVisualState();
        }
        private DragValidator_OnDragDelta(sender: any, e: Fayde.Controls.Primitives.DragDeltaEventArgs) {
            this._HandleMove(e.HorizontalChange, e.VerticalChange, false);
        }
        private DragValidator_OnDragStarted(sender: any, e: Fayde.Controls.Primitives.DragStartedEventArgs) {
            if (this.IsEnabled) {
                this.Focus();
                this.InitHelper();
            }
        }

        private InitHelper() {
            var parent = <Grid>this.VisualParent;
            if (!(parent instanceof Grid))
                return;
            this._Helper = new Internal.GridSplitterResizer(this);
            if (this._Helper.Setup(this, parent))
                return;
            this._Helper = null;
        }
        private _HandleMove(horiz: number, vert: number, isKeyboard: boolean): boolean {
            if (isKeyboard) {
                if (this._Helper)
                    return false;
                this.InitHelper();
            }
            if (!this._Helper)
                return false;
            if (!this._Helper.Move(<Grid>this.VisualParent, horiz, vert) || isKeyboard)
                this._Helper = null;
            return true;
        }
    }
}