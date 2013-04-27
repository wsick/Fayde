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
        var ColumnDefinition = (function (_super) {
            __extends(ColumnDefinition, _super);
            function ColumnDefinition() {
                _super.apply(this, arguments);

            }
            ColumnDefinition.WidthProperty = DependencyProperty.RegisterCore("Width", function () {
                return Controls.GridLength;
            }, ColumnDefinition, undefined, function (d, args) {
                return (d)._WidthsChanged(args);
            });
            ColumnDefinition.MaxWidthProperty = DependencyProperty.RegisterCore("MaxWidth", function () {
                return Number;
            }, ColumnDefinition, Number.POSITIVE_INFINITY, function (d, args) {
                return (d)._WidthsChanged(args);
            });
            ColumnDefinition.MinWidthProperty = DependencyProperty.RegisterCore("MinWidth", function () {
                return Number;
            }, ColumnDefinition, 0.0, function (d, args) {
                return (d)._WidthsChanged(args);
            });
            ColumnDefinition.ActualWidthProperty = DependencyProperty.RegisterReadOnlyCore("ActualWidth", function () {
                return Number;
            }, ColumnDefinition, 0.0, function (d, args) {
                return (d)._WidthsChanged(args);
            });
            ColumnDefinition.prototype.Listen = function (listener) {
                this._Listener = listener;
            };
            ColumnDefinition.prototype.Unlisten = function (listener) {
                if(this._Listener === listener) {
                    this._Listener = null;
                }
            };
            ColumnDefinition.prototype._WidthsChanged = function (args) {
                var listener = this._Listener;
                if(listener) {
                    listener.ColumnDefinitionChanged(this);
                }
            };
            return ColumnDefinition;
        })(Fayde.DependencyObject);
        Controls.ColumnDefinition = ColumnDefinition;        
        Nullstone.RegisterType(ColumnDefinition, "ColumnDefinition");
        var ColumnDefinitionCollection = (function (_super) {
            __extends(ColumnDefinitionCollection, _super);
            function ColumnDefinitionCollection() {
                _super.apply(this, arguments);

            }
            ColumnDefinitionCollection.prototype.Listen = function (listener) {
                this._Listener = listener;
            };
            ColumnDefinitionCollection.prototype.Unlisten = function (listener) {
                if(this._Listener === listener) {
                    this._Listener = null;
                }
            };
            ColumnDefinitionCollection.prototype.ColumnDefinitionChanged = function (colDefinition) {
                var listener = this._Listener;
                if(listener) {
                    listener.ColumnDefinitionsChanged(this);
                }
            };
            ColumnDefinitionCollection.prototype.AddedToCollection = function (value, error) {
                if(!_super.prototype.AddedToCollection.call(this, value, error)) {
                    return false;
                }
                value.Listen(this);
                var listener = this._Listener;
                if(listener) {
                    listener.ColumnDefinitionsChanged(this);
                }
            };
            ColumnDefinitionCollection.prototype.RemovedFromCollection = function (value, isValueSafe) {
                _super.prototype.RemovedFromCollection.call(this, value, isValueSafe);
                value.Unlisten(this);
                var listener = this._Listener;
                if(listener) {
                    listener.ColumnDefinitionsChanged(this);
                }
            };
            return ColumnDefinitionCollection;
        })(Fayde.XamlObjectCollection);
        Controls.ColumnDefinitionCollection = ColumnDefinitionCollection;        
        Nullstone.RegisterType(ColumnDefinitionCollection, "ColumnDefinitionCollection");
    })(Fayde.Controls || (Fayde.Controls = {}));
    var Controls = Fayde.Controls;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=ColumnDefinition.js.map
