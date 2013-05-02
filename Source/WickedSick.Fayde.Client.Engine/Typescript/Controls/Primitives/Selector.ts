/// <reference path="../ItemsControl.ts" />
/// CODE
/// <reference path="../ListBoxItem.ts" />

module Fayde.Controls.Primitives {
    export class Selector extends ItemsControl {
        NotifyListItemClicked(lbi: ListBoxItem) {
            //TODO: Implement
        }
        NotifyListItemGotFocus (lbi: ListBoxItem) { }
        NotifyListItemLostFocus (lbi: ListBoxItem) { }
    }
    Nullstone.RegisterType(Selector, "Selector");
}