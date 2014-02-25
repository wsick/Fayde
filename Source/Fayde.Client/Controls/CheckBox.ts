/// <reference path="Primitives/ToggleButton.ts" />

module Fayde.Controls {
    export class CheckBox extends Primitives.ToggleButton {
        constructor() {
            super();
            this.DefaultStyleKey = (<any>this).constructor;
        }
    }
    Fayde.RegisterType(CheckBox, "Fayde.Controls", Fayde.XMLNS);
    TemplateVisualStates(CheckBox, 
        { GroupName: "CommonStates", Name: "Normal" },
        { GroupName: "CommonStates", Name: "MouseOver" },
        { GroupName: "CommonStates", Name: "Pressed" },
        { GroupName: "CommonStates", Name: "Disabled" },
        { GroupName: "FocusStates", Name: "Unfocused" },
        { GroupName: "FocusStates", Name: "Focused" },
        { GroupName: "CheckStates", Name: "Checked" },
        { GroupName: "CheckStates", Name: "Unchecked" },
        { GroupName: "CheckStates", Name: "Indeterminate" },
        { GroupName: "ValidationStates", Name: "InvalidUnfocused" },
        { GroupName: "ValidationStates", Name: "InvalidFocused" },
        { GroupName: "ValidationStates", Name: "Valid" });
}