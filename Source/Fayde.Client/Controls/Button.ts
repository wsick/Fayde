/// <reference path="Primitives/ButtonBase.ts" />

module Fayde.Controls {
    export class Button extends Primitives.ButtonBase {
        constructor() {
            super();
            this.DefaultStyleKey = (<any>this).constructor;
        }

        OnApplyTemplate() {
            super.OnApplyTemplate();
            this.UpdateVisualState(false);
        }

        OnIsEnabledChanged(e: IDependencyPropertyChangedEventArgs) {
            super.OnIsEnabledChanged(e);
            this.IsTabStop = e.NewValue;
        }
    }
    Fayde.RegisterType(Button, "Fayde.Controls", Fayde.XMLNS);
    TemplateVisualStates(Button, 
        { GroupName: "CommonStates", Name: "Normal" },
        { GroupName: "CommonStates", Name: "MouseOver" },
        { GroupName: "CommonStates", Name: "Pressed" },
        { GroupName: "CommonStates", Name: "Disabled" },
        { GroupName: "FocusStates", Name: "Unfocused" },
        { GroupName: "FocusStates", Name: "Focused" });
}