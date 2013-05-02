/// <reference path="Primitives/ToggleButton.ts" />
/// CODE

module Fayde.Controls {
    export class RadioButton extends Primitives.ToggleButton {
        static GroupNameProperty: DependencyProperty = DependencyProperty.RegisterReadOnly("GroupName", () => String, RadioButton, false, (d, args) => (<RadioButton>d).OnGroupNameChanged(args));
        GroupName: string;

        constructor() {
            super();
            RadioButton.Register("", this);
            this.DefaultStyleKey = (<any>this).constructor;
        }

        private static _GroupNameToElements: RadioButton[] = [];
        static Register(groupName: string, radioButton: RadioButton) {
            // Treat null as being string.Empty
            if (!groupName) groupName = "";

            var list = RadioButton._GroupNameToElements[groupName];
            if (!list) {
                list = [];
                RadioButton._GroupNameToElements[groupName] = list;
            }
            list.push(radioButton);
        }
        static Unregister(groupName: string, radioButton: RadioButton) {
            // Treat null as being string.Empty
            if (!groupName) groupName = "";

            var list = RadioButton._GroupNameToElements[groupName];
            if (list) {
                for (var i = 0; i < list.length; i++) {
                    if (radioButton === list[i]) {
                        list.splice(i, 1);
                        break;
                    }
                }
            }
        }

        OnGroupNameChanged(e: IDependencyPropertyChangedEventArgs) {
            RadioButton.Unregister(e.OldValue, this);
            RadioButton.Register(e.NewValue, this);
        }

        OnIsCheckedChanged(e: IDependencyPropertyChangedEventArgs) {
            if (e.NewValue === true)
                this.UpdateRadioButtonGroup();
            super.OnIsCheckedChanged(e);
        }
        OnToggle() {
            this.IsChecked = true;
        }

        UpdateRadioButtonGroup() {
            var groupName = this.GroupName || "";
            var elements = RadioButton._GroupNameToElements[groupName];
            if (!elements)
                return;

            //if this RadioButton has been assigned a group
            var element: RadioButton = null;
            if (groupName) {
                var rootNode = this.XamlNode.GetVisualRoot();
                for (var i = 0; i < elements.length; i++) {
                    element = elements[i];
                    if (element === this)
                        continue;
                    if (!element.IsChecked)
                        continue;
                    if (rootNode !== element.XamlNode.GetVisualRoot())
                        continue;
                    element.IsChecked = false;

                }
            } else {
                //no group has been assigned
                //it is automatically groups with all RadioButtons with no group and with the same visual root
                var vpNode = this.XamlNode.VisualParentNode;
                for (var i = 0; i < elements.length; i++) {
                    element = elements[i];
                    if (element === this)
                        continue;
                    if (!element.IsChecked)
                        continue;
                    if (vpNode !== element.XamlNode.VisualParentNode)
                        continue;
                    element.IsChecked = false;
                }
            }
        }
    }
    Nullstone.RegisterType(RadioButton, "RadioButton");
}