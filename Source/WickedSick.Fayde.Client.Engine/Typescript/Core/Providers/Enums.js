var Fayde;
(function (Fayde) {
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
        (function (_Inheritable) {
            _Inheritable._map = [];
            _Inheritable.Foreground = 1 << 0;
            _Inheritable.FontFamily = 1 << 1;
            _Inheritable.FontStretch = 1 << 2;
            _Inheritable.FontStyle = 1 << 3;
            _Inheritable.FontWeight = 1 << 4;
            _Inheritable.FontSize = 1 << 5;
            _Inheritable.Language = 1 << 6;
            _Inheritable.FlowDirection = 1 << 7;
            _Inheritable.UseLayoutRounding = 1 << 8;
            _Inheritable.TextDecorations = 1 << 9;
            _Inheritable.All = 2047;
            _Inheritable.None = 0;
        })(Providers._Inheritable || (Providers._Inheritable = {}));
        var _Inheritable = Providers._Inheritable;
    })(Fayde.Providers || (Fayde.Providers = {}));
    var Providers = Fayde.Providers;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=Enums.js.map
