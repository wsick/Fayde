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
        (function (_StyleIndex) {
            _StyleIndex._map = [];
            _StyleIndex.VisualTree = 0;
            _StyleIndex.ApplicationResources = 1;
            _StyleIndex.GenericXaml = 2;
            _StyleIndex.Count = 3;
        })(Providers._StyleIndex || (Providers._StyleIndex = {}));
        var _StyleIndex = Providers._StyleIndex;
        (function (_StyleMask) {
            _StyleMask._map = [];
            _StyleMask.None = 0;
            _StyleMask.VisualTree = 1 << _StyleIndex.VisualTree;
            _StyleMask.ApplicationResources = 1 << _StyleIndex.ApplicationResources;
            _StyleMask.GenericXaml = 1 << _StyleIndex.GenericXaml;
            _StyleMask.All = _StyleMask.VisualTree | _StyleMask.ApplicationResources | _StyleMask.GenericXaml;
        })(Providers._StyleMask || (Providers._StyleMask = {}));
        var _StyleMask = Providers._StyleMask;
    })(Fayde.Providers || (Fayde.Providers = {}));
    var Providers = Fayde.Providers;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=IProviderStore.js.map
