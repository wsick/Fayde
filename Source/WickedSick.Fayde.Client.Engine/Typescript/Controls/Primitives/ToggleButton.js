var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Fayde;
(function (Fayde) {
    (function (Controls) {
        /// <reference path="ButtonBase.ts" />
        /// CODE
        (function (Primitives) {
            var ToggleButton = (function (_super) {
                __extends(ToggleButton, _super);
                function ToggleButton() {
                                _super.call(this);
                    this.Checked = new Fayde.RoutedEvent();
                    this.Indeterminate = new Fayde.RoutedEvent();
                    this.Unchecked = new Fayde.RoutedEvent();
                    this.DefaultStyleKey = (this).constructor;
                }
                ToggleButton.IsCheckedProperty = DependencyProperty.RegisterCore("IsChecked", function () {
                    return Boolean;
                }, ToggleButton, false, function (d, args) {
                    return (d).OnIsCheckedChanged(args);
                });
                ToggleButton.IsThreeStateProperty = DependencyProperty.RegisterCore("IsThreeState", function () {
                    return Boolean;
                }, ToggleButton, false);
                ToggleButton.prototype.OnApplyTemplate = function () {
                    _super.prototype.OnApplyTemplate.call(this);
                    this.UpdateVisualState(false);
                };
                ToggleButton.prototype.OnContentChanged = function (oldContent, newContent) {
                    _super.prototype.OnContentChanged.call(this, oldContent, newContent);
                    this.UpdateVisualState();
                };
                ToggleButton.prototype.OnClick = function () {
                    this.OnToggle();
                    _super.prototype.OnClick.call(this);
                };
                ToggleButton.prototype.UpdateVisualState = function (useTransitions) {
                    useTransitions = useTransitions !== false;
                    _super.prototype.UpdateVisualState.call(this, useTransitions);
                    var isChecked = this.IsChecked;
                    var vsm = Fayde.Media.VSM.VisualStateManager;
                    if(isChecked === true) {
                        vsm.GoToState(this, "Checked", useTransitions);
                    } else if(isChecked === false) {
                        vsm.GoToState(this, "Unchecked", useTransitions);
                    } else {
                        // isChecked is null
                        if(!vsm.GoToState(this, "Indeterminate", useTransitions)) {
                            vsm.GoToState(this, "Unchecked", useTransitions);
                        }
                    }
                };
                ToggleButton.prototype.OnIsCheckedChanged = function (args) {
                    var isChecked = args.NewValue;
                    this.UpdateVisualState();
                    if(isChecked === true) {
                        this.Checked.Raise(this, new Fayde.RoutedEventArgs());
                    } else if(isChecked === false) {
                        this.Unchecked.Raise(this, new Fayde.RoutedEventArgs());
                    } else {
                        this.Indeterminate.Raise(this, new Fayde.RoutedEventArgs());
                    }
                };
                ToggleButton.prototype.OnToggle = function () {
                    var isChecked = this.IsChecked;
                    if(isChecked === true) {
                        this.IsChecked = this.IsThreeState ? null : false;
                    } else {
                        this.IsChecked = isChecked != null;
                    }
                };
                return ToggleButton;
            })(Primitives.ButtonBase);
            Primitives.ToggleButton = ToggleButton;            
            Nullstone.RegisterType(ToggleButton, "ToggleButton");
        })(Controls.Primitives || (Controls.Primitives = {}));
        var Primitives = Controls.Primitives;
    })(Fayde.Controls || (Fayde.Controls = {}));
    var Controls = Fayde.Controls;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=ToggleButton.js.map
