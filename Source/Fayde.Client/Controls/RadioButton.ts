/// <reference path="Primitives/ToggleButton.ts" />

module Fayde.Controls {
    export class RadioButton extends Primitives.ToggleButton {
        static GroupNameProperty: DependencyProperty = DependencyProperty.Register("GroupName", () => String, RadioButton, false, (d, args) => (<RadioButton>d).OnGroupNameChanged(args));
        GroupName: string;
        OnGroupNameChanged(args: IDependencyPropertyChangedEventArgs) {
            unregister(args.OldValue, this);
            register(args.NewValue, this);
        }

        constructor() {
            super();
            this.DefaultStyleKey = (<any>this).constructor;
            register("", this);
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
            var elements = groupNameToElements[groupName];
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
    Fayde.RegisterType(RadioButton, "Fayde.Controls", Fayde.XMLNS);

    var groupNameToElements: RadioButton[][] = [];
    function register(groupName: string, radioButton: RadioButton) {
        // Treat null as being string.Empty
        if (!groupName) groupName = "";

        var list: RadioButton[] = groupNameToElements[groupName];
        if (!list)
            groupNameToElements[groupName] = list = [];
        list.push(radioButton);
    }
    function unregister(groupName: string, radioButton: RadioButton) {
        // Treat null as being string.Empty
        if (!groupName) groupName = "";

        var list: RadioButton[] = groupNameToElements[groupName];
        if (list) {
            var index = list.indexOf(radioButton);
            if (index > -1)
                list.splice(index, 1);
        }
    }
}