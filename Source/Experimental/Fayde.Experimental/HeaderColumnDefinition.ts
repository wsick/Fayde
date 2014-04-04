module Fayde.Experimental {
    import ColumnDefinition = Fayde.Controls.ColumnDefinition;
    import GridLength = Fayde.Controls.GridLength;
    import GridUnitType = Fayde.Controls.GridUnitType;

    export class HeaderColumnDefinition extends Fayde.Controls.ColumnDefinition {
        private _LinkedListener: Fayde.Providers.IPropertyChangedListener = null;
        private _LinkedColDef: ColumnDefinition = null;

        constructor() {
            super();
            this.Width = new GridLength(1, GridUnitType.Auto);
            Fayde.Providers.ActualSizeStore.Instance.ListenToChanged(this, ColumnDefinition.ActualWidthProperty, this._ActualWidthChanged, this);
        }

        Link(coldef: ColumnDefinition) {
            this.Unlink();
            this._LinkedListener = Fayde.Providers.ActualSizeStore.Instance.ListenToChanged(coldef, ColumnDefinition.ActualWidthProperty, this._LinkedActualWidthChanged, this);
            this._LinkedColDef = coldef;
        }
        Unlink() {
            if (this._LinkedListener)
                this._LinkedListener.Detach();
            this._LinkedListener = null;
            this._LinkedColDef = null;
        }

        private _ActualWidthChanged(sender: any, args: DependencyPropertyChangedEventArgs) {
            var aw = args.NewValue;
            if (isNaN(aw) || !isFinite(aw))
                return;
            var coldef = this._LinkedColDef;
            if (!coldef || aw === coldef.ActualWidth)
                return;

            if (coldef.MinWidth < aw)
                coldef.MinWidth = aw;
        }

        private _LinkedActualWidthChanged(sender: any, args: DependencyPropertyChangedEventArgs) {
            var aw = args.NewValue;
            if (isNaN(aw) || !isFinite(aw))
                return;
            if (aw === this.ActualWidth)
                return;
            var coldef = this._LinkedColDef;
            this.Width = coldef.Width.Clone();
            this.MinWidth = aw || 0;
        }
    }
}