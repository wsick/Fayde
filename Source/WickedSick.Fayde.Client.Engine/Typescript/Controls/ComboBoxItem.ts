/// <reference path="ListBoxItem.ts" />
/// CODE
/// <reference path="ComboBox.ts" />

module Fayde.Controls {
    export class ComboBoxItem extends ListBoxItem {
        constructor() {
            super();
            this.DefaultStyleKey = (<any>this).constructor;
        }

        OnMouseLeftButtonUp(e: Input.MouseButtonEventArgs) {
            super.OnMouseLeftButtonUp(e);
            if (this.ParentSelector instanceof ComboBox)
                (<ComboBox>this.ParentSelector).IsDropDownOpen = false;
        }
    }
    Nullstone.RegisterType(ComboBoxItem, "ComboBoxItem");
}