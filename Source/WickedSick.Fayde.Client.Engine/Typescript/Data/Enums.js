var Fayde;
(function (Fayde) {
    (function (Data) {
        (function (RelativeSourceMode) {
            RelativeSourceMode._map = [];
            RelativeSourceMode.TemplatedParent = 1;
            RelativeSourceMode.Self = 2;
            RelativeSourceMode.FindAncestor = 3;
        })(Data.RelativeSourceMode || (Data.RelativeSourceMode = {}));
        var RelativeSourceMode = Data.RelativeSourceMode;
        (function (BindingMode) {
            BindingMode._map = [];
            BindingMode.TwoWay = 0;
            BindingMode.OneWay = 1;
            BindingMode.OneTime = 2;
            BindingMode.OneWayToSource = 3;
        })(Data.BindingMode || (Data.BindingMode = {}));
        var BindingMode = Data.BindingMode;
        (function (UpdateSourceTrigger) {
            UpdateSourceTrigger._map = [];
            UpdateSourceTrigger.Default = 0;
            UpdateSourceTrigger.PropertyChanged = 1;
            UpdateSourceTrigger.Explicit = 3;
        })(Data.UpdateSourceTrigger || (Data.UpdateSourceTrigger = {}));
        var UpdateSourceTrigger = Data.UpdateSourceTrigger;
        (function (_PropertyNodeType) {
            _PropertyNodeType._map = [];
            _PropertyNodeType.AttachedProperty = 0;
            _PropertyNodeType.Property = 1;
            _PropertyNodeType.Indexed = 2;
            _PropertyNodeType.None = 3;
        })(Data._PropertyNodeType || (Data._PropertyNodeType = {}));
        var _PropertyNodeType = Data._PropertyNodeType;
    })(Fayde.Data || (Fayde.Data = {}));
    var Data = Fayde.Data;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=Enums.js.map
