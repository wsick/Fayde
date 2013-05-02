var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Fayde;
(function (Fayde) {
    /// <reference path="Primitives/ToggleButton.ts" />
    /// CODE
    (function (Controls) {
        var RadioButton = (function (_super) {
            __extends(RadioButton, _super);
            function RadioButton() {
                        _super.call(this);
                RadioButton.Register("", this);
                this.DefaultStyleKey = (this).constructor;
            }
            RadioButton.GroupNameProperty = DependencyProperty.RegisterReadOnly("GroupName", function () {
                return String;
            }, RadioButton, false, function (d, args) {
                return (d).OnGroupNameChanged(args);
            });
            RadioButton._GroupNameToElements = [];
            RadioButton.Register = function Register(groupName, radioButton) {
                // Treat null as being string.Empty
                if(!groupName) {
                    groupName = "";
                }
                var list = RadioButton._GroupNameToElements[groupName];
                if(!list) {
                    list = [];
                    RadioButton._GroupNameToElements[groupName] = list;
                }
                list.push(radioButton);
            };
            RadioButton.Unregister = function Unregister(groupName, radioButton) {
                // Treat null as being string.Empty
                if(!groupName) {
                    groupName = "";
                }
                var list = RadioButton._GroupNameToElements[groupName];
                if(list) {
                    for(var i = 0; i < list.length; i++) {
                        if(radioButton === list[i]) {
                            list.splice(i, 1);
                            break;
                        }
                    }
                }
            };
            RadioButton.prototype.OnGroupNameChanged = function (e) {
                RadioButton.Unregister(e.OldValue, this);
                RadioButton.Register(e.NewValue, this);
            };
            RadioButton.prototype.OnIsCheckedChanged = function (e) {
                if(e.NewValue === true) {
                    this.UpdateRadioButtonGroup();
                }
                _super.prototype.OnIsCheckedChanged.call(this, e);
            };
            RadioButton.prototype.OnToggle = function () {
                this.IsChecked = true;
            };
            RadioButton.prototype.UpdateRadioButtonGroup = function () {
                var groupName = this.GroupName || "";
                var elements = RadioButton._GroupNameToElements[groupName];
                if(!elements) {
                    return;
                }
                //if this RadioButton has been assigned a group
                var element = null;
                if(groupName) {
                    var rootNode = this.XamlNode.GetVisualRoot();
                    for(var i = 0; i < elements.length; i++) {
                        element = elements[i];
                        if(element === this) {
                            continue;
                        }
                        if(!element.IsChecked) {
                            continue;
                        }
                        if(rootNode !== element.XamlNode.GetVisualRoot()) {
                            continue;
                        }
                        element.IsChecked = false;
                    }
                } else {
                    //no group has been assigned
                    //it is automatically groups with all RadioButtons with no group and with the same visual root
                    var vpNode = this.XamlNode.VisualParentNode;
                    for(var i = 0; i < elements.length; i++) {
                        element = elements[i];
                        if(element === this) {
                            continue;
                        }
                        if(!element.IsChecked) {
                            continue;
                        }
                        if(vpNode !== element.XamlNode.VisualParentNode) {
                            continue;
                        }
                        element.IsChecked = false;
                    }
                }
            };
            return RadioButton;
        })(Controls.Primitives.ToggleButton);
        Controls.RadioButton = RadioButton;        
        Nullstone.RegisterType(RadioButton, "RadioButton");
    })(Fayde.Controls || (Fayde.Controls = {}));
    var Controls = Fayde.Controls;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=RadioButton.js.map
