/// <reference path="ButtonBase.ts" />

module Fayde.Controls.Primitives {
    export class ToggleButton extends ButtonBase {
        Checked: RoutedEvent<RoutedEventArgs> = new RoutedEvent<RoutedEventArgs>();
        Indeterminate: RoutedEvent<RoutedEventArgs> = new RoutedEvent<RoutedEventArgs>();
        Unchecked: RoutedEvent<RoutedEventArgs> = new RoutedEvent<RoutedEventArgs>();

        static IsCheckedProperty: DependencyProperty = DependencyProperty.RegisterCore("IsChecked", () => Boolean, ToggleButton, false, (d, args) => (<ToggleButton>d).OnIsCheckedChanged(args));
        static IsThreeStateProperty: DependencyProperty = DependencyProperty.RegisterCore("IsThreeState", () => Boolean, ToggleButton, false);
        IsChecked: boolean;
        IsThreeState: boolean;

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
        UpdateVisualState(useTransitions?: boolean) {
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
            var rargs = new RoutedEventArgs();
            if (isChecked === true) {
                this.Checked.Raise(this, rargs);
            } else if (isChecked === false) {
                this.Unchecked.Raise(this, rargs);
            } else {
                this.Indeterminate.Raise(this, rargs);
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
    Fayde.RegisterType(ToggleButton, {
    	Name: "ToggleButton",
    	Namespace: "Fayde.Controls.Primitives",
    	XmlNamespace: Fayde.XMLNS
    });
}