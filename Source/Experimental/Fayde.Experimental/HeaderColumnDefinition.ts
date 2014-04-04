module Fayde.Experimental {
    import ColumnDefinition = Fayde.Controls.ColumnDefinition;
    import GridLength = Fayde.Controls.GridLength;
    import GridUnitType = Fayde.Controls.GridUnitType;

    export class HeaderColumnDefinition extends Fayde.Controls.ColumnDefinition {
        private _LinkedListener: Fayde.Providers.IPropertyChangedListener = null;
        Link(coldef: ColumnDefinition) {
            this.Unlink();
            this._LinkedListener = Fayde.Providers.ActualSizeStore.Instance.ListenToChanged(coldef, ColumnDefinition.ActualWidthProperty, this._LinkedActualWidthChanged, this);
        }
        Unlink() {
            if (this._LinkedListener)
                this._LinkedListener.Detach();
            this._LinkedListener = null;
        }

        private _LinkedActualWidthChanged(sender: any, args: DependencyPropertyChangedEventArgs) {
            var aw = args.NewValue;
            if (isNaN(aw) || !isFinite(aw))
                this.Width = undefined;
            else
                this.Width = new GridLength(aw || 0, GridUnitType.Pixel);
        }
    }
}