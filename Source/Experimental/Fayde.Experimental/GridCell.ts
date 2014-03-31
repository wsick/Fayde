module Fayde.Experimental {
    export class GridCell extends Fayde.Controls.ContentControl {
        static IsEditingProperty = DependencyProperty.Register("IsEditing", () => Boolean, GridCell, false, (d, args) => (<GridCell>d).OnIsEditingChanged(args.OldValue, args.NewValue));
        IsEditing: boolean;
        private OnIsEditingChanged(oldIsEditing: boolean, newIsEditing: boolean) {

        }

        constructor() {
            super();
            this.DefaultStyleKey = (<any>this).constructor;
        }
    }
} 