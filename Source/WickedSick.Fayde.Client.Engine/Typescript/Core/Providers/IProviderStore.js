var Fayde;
(function (Fayde) {
    /// CODE
    /// <reference path="../../Runtime/BError.ts" />
    /// <reference path="../DependencyProperty.ts" />
    (function (Providers) {
        (function (_PropertyPrecedence) {
            _PropertyPrecedence._map = [];
            _PropertyPrecedence.IsEnabled = 0;
            _PropertyPrecedence.LocalValue = 1;
            _PropertyPrecedence.DynamicValue = 2;
            _PropertyPrecedence.LocalStyle = 3;
            _PropertyPrecedence.ImplicitStyle = 4;
            _PropertyPrecedence.Inherited = 5;
            _PropertyPrecedence.InheritedDataContext = 6;
            _PropertyPrecedence.DefaultValue = 7;
            _PropertyPrecedence.AutoCreate = 8;
            _PropertyPrecedence.Lowest = 8;
            _PropertyPrecedence.Highest = 0;
            _PropertyPrecedence.Count = 9;
        })(Providers._PropertyPrecedence || (Providers._PropertyPrecedence = {}));
        var _PropertyPrecedence = Providers._PropertyPrecedence;
    })(Fayde.Providers || (Fayde.Providers = {}));
    var Providers = Fayde.Providers;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=IProviderStore.js.map
