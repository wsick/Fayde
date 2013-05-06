var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Fayde;
(function (Fayde) {
    /// <reference path="../Core/DependencyObject.ts" />
    /// <reference path="../Core/XamlObjectCollection.ts" />
    /// CODE
    /// <reference path="GridLength.ts" />
    (function (Controls) {
        var RowDefinition = (function (_super) {
            __extends(RowDefinition, _super);
            function RowDefinition() {
                _super.apply(this, arguments);

            }
            RowDefinition.HeightProperty = DependencyProperty.RegisterCore("Height", function () {
                return Controls.GridLength;
            }, RowDefinition, undefined, function (d, args) {
                return (d)._HeightsChanged(args);
            });
            RowDefinition.MaxHeightProperty = DependencyProperty.RegisterCore("MaxHeight", function () {
                return Number;
            }, RowDefinition, Number.POSITIVE_INFINITY, function (d, args) {
                return (d)._HeightsChanged(args);
            });
            RowDefinition.MinHeightProperty = DependencyProperty.RegisterCore("MinHeight", function () {
                return Number;
            }, RowDefinition, 0.0, function (d, args) {
                return (d)._HeightsChanged(args);
            });
            RowDefinition.ActualHeightProperty = DependencyProperty.RegisterReadOnlyCore("ActualHeight", function () {
                return Number;
            }, RowDefinition, 0.0, function (d, args) {
                return (d)._HeightsChanged(args);
            });
            RowDefinition.prototype.Listen = function (listener) {
                this._Listener = listener;
            };
            RowDefinition.prototype.Unlisten = function (listener) {
                if(this._Listener === listener) {
                    this._Listener = null;
                }
            };
            RowDefinition.prototype._HeightsChanged = function (args) {
                var listener = this._Listener;
                if(listener) {
                    listener.RowDefinitionChanged(this);
                }
            };
            return RowDefinition;
        })(Fayde.DependencyObject);
        Controls.RowDefinition = RowDefinition;        
        Nullstone.RegisterType(RowDefinition, "RowDefinition");
        var RowDefinitionCollection = (function (_super) {
            __extends(RowDefinitionCollection, _super);
            function RowDefinitionCollection() {
                _super.apply(this, arguments);

            }
            RowDefinitionCollection.prototype.Listen = function (listener) {
                this._Listener = listener;
            };
            RowDefinitionCollection.prototype.Unlisten = function (listener) {
                if(this._Listener === listener) {
                    this._Listener = null;
                }
            };
            RowDefinitionCollection.prototype.RowDefinitionChanged = function (rowDefinition) {
                var listener = this._Listener;
                if(listener) {
                    listener.RowDefinitionsChanged(this);
                }
            };
            RowDefinitionCollection.prototype.AddedToCollection = function (value, error) {
                if(!_super.prototype.AddedToCollection.call(this, value, error)) {
                    return false;
                }
                value.Listen(this);
                var listener = this._Listener;
                if(listener) {
                    listener.RowDefinitionsChanged(this);
                }
                return true;
            };
            RowDefinitionCollection.prototype.RemovedFromCollection = function (value, isValueSafe) {
                _super.prototype.RemovedFromCollection.call(this, value, isValueSafe);
                value.Unlisten(this);
                var listener = this._Listener;
                if(listener) {
                    listener.RowDefinitionsChanged(this);
                }
            };
            return RowDefinitionCollection;
        })(Fayde.XamlObjectCollection);
        Controls.RowDefinitionCollection = RowDefinitionCollection;        
        Nullstone.RegisterType(RowDefinitionCollection, "RowDefinitionCollection");
    })(Fayde.Controls || (Fayde.Controls = {}));
    var Controls = Fayde.Controls;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=RowDefinition.js.map
