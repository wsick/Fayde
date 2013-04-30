/// <reference path="ButtonBase.ts" />
/// CODE

module Fayde.Controls.Primitives {
    export class ToggleButton extends ButtonBase {
        Checked: RoutedEvent = new RoutedEvent();
        Indeterminate: RoutedEvent = new RoutedEvent();
        Unchecked: RoutedEvent = new RoutedEvent();

        static IsCheckedProperty: DependencyProperty = DependencyProperty.RegisterCore("IsChecked", () => Boolean, ToggleButton, false, (d, args) => (<ToggleButton>d).OnIsCheckedChanged(args));
        static IsThreeStateProperty: DependencyProperty = DependencyProperty.RegisterCore("IsThreeState", () => Boolean, ToggleButton, false);
        IsChecked: bool;
        IsThreeState: bool;

        constructor() {
            super();
            this.DefaultStyleKey = (<any>this).constructor;
        }

        OnApplyTemplate() {
            super.OnApplyTemplate();
            this.UpdateVisualState(false);
        }

        OnContentChanged(oldContent: any, newContent: any) {
            super.OnContentChanged(oldContent, newContent);
            this.UpdateVisualState();
        }
        OnClick() {
            this.OnToggle();
            super.OnClick();
        }
        UpdateVisualState(useTransitions?: bool) {
            useTransitions = useTransitions !== false;
            super.UpdateVisualState(useTransitions);

            var isChecked = this.IsChecked;
            var vsm = Fayde.Media.VSM.VisualStateManager;
            if (isChecked === true) {
                vsm.GoToState(this, "Checked", useTransitions);
            } else if (isChecked === false) {
                vsm.GoToState(this, "Unchecked", useTransitions);
            } else {
                // isChecked is null
                if (!vsm.GoToState(this, "Indeterminate", useTransitions)) {
                    vsm.GoToState(this, "Unchecked", useTransitions)
                }
            }
        }

        OnIsCheckedChanged(args: IDependencyPropertyChangedEventArgs) {
            var isChecked = args.NewValue;
            this.UpdateVisualState();
            if (isChecked === true) {
                this.Checked.Raise(this, new RoutedEventArgs());
            } else if (isChecked === false) {
                this.Unchecked.Raise(this, new RoutedEventArgs());
            } else {
                this.Indeterminate.Raise(this, new RoutedEventArgs());
            }
        }
        OnToggle() {
            var isChecked = this.IsChecked;
            if (isChecked === true) {
                this.IsChecked = this.IsThreeState ? null : false;
            } else {
                this.IsChecked = isChecked != null;
            }
        }
    }
    Nullstone.RegisterType(ToggleButton, "ToggleButton");
}