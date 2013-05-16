/// <reference path="../Runtime/Nullstone.ts" />
/// <reference path="Providers/InheritedStore.ts" />
/// CODE
/// <reference path="DependencyProperty.ts" />
var Fayde;
(function (Fayde) {
    var InheritableOwner = (function () {
        function InheritableOwner() { }
        InheritableOwner._UseLayoutRoundingPropertyChanged = function _UseLayoutRoundingPropertyChanged(dobj, args) {
            var uie = dobj;
            var lu = uie.XamlNode.LayoutUpdater;
            lu.InvalidateMeasure();
            lu.InvalidateArrange();
        };
        InheritableOwner.UseLayoutRoundingProperty = DependencyProperty.RegisterInheritable("UseLayoutRounding", function () {
            return Boolean;
        }, InheritableOwner, true, InheritableOwner._UseLayoutRoundingPropertyChanged);
        InheritableOwner._FlowDirectionPropertyChanged = function _FlowDirectionPropertyChanged(dobj, args) {
            var feNode = (dobj).XamlNode;
            if(feNode._FlowDirectionChanged) {
                feNode._FlowDirectionChanged(args);
            }
        };
        InheritableOwner.FlowDirectionProperty = DependencyProperty.RegisterInheritable("FlowDirection", function () {
            return new Enum(Fayde.FlowDirection);
        }, InheritableOwner, Fayde.FlowDirection.LeftToRight, InheritableOwner._FlowDirectionPropertyChanged);
        InheritableOwner._FontFamilyPropertyChanged = function _FontFamilyPropertyChanged(dobj, args) {
            if((dobj).FontChanged) {
                (dobj).FontChanged(args);
            }
        };
        InheritableOwner.FontFamilyProperty = DependencyProperty.RegisterInheritable("FontFamily", function () {
            return String;
        }, InheritableOwner, Font.DEFAULT_FAMILY, InheritableOwner._FontFamilyPropertyChanged);
        InheritableOwner._FontSizePropertyChanged = function _FontSizePropertyChanged(dobj, args) {
            if((dobj).FontChanged) {
                (dobj).FontChanged(args);
            }
        };
        InheritableOwner.FontSizeProperty = DependencyProperty.RegisterInheritable("FontSize", function () {
            return Number;
        }, InheritableOwner, Font.DEFAULT_SIZE, InheritableOwner._FontSizePropertyChanged);
        InheritableOwner._FontStretchPropertyChanged = function _FontStretchPropertyChanged(dobj, args) {
            if((dobj).FontChanged) {
                (dobj).FontChanged(args);
            }
        };
        InheritableOwner.FontStretchProperty = DependencyProperty.RegisterInheritable("FontStretch", function () {
            return String;
        }, InheritableOwner, Font.DEFAULT_STRETCH, InheritableOwner._FontStretchPropertyChanged);
        InheritableOwner._FontStylePropertyChanged = function _FontStylePropertyChanged(dobj, args) {
            if((dobj).FontChanged) {
                (dobj).FontChanged(args);
            }
        };
        InheritableOwner.FontStyleProperty = DependencyProperty.RegisterInheritable("FontStyle", function () {
            return String;
        }, InheritableOwner, Font.DEFAULT_STYLE, InheritableOwner._FontStylePropertyChanged);
        InheritableOwner._FontWeightPropertyChanged = function _FontWeightPropertyChanged(dobj, args) {
            if((dobj).FontChanged) {
                (dobj).FontChanged(args);
            }
        };
        InheritableOwner.FontWeightProperty = DependencyProperty.RegisterInheritable("FontWeight", function () {
            return new Enum(Fayde.FontWeight);
        }, InheritableOwner, Font.DEFAULT_WEIGHT, InheritableOwner._FontWeightPropertyChanged);
        InheritableOwner._ForegroundPropertyChanged = function _ForegroundPropertyChanged(dobj, args) {
            if((dobj).FontChanged) {
                (dobj).FontChanged(args);
            }
        };
        InheritableOwner.ForegroundProperty = DependencyProperty.RegisterInheritable("Foreground", function () {
            return Fayde.Media.Brush;
        }, InheritableOwner, undefined, InheritableOwner._ForegroundPropertyChanged);
        InheritableOwner._TextDecorationsPropertyChanged = function _TextDecorationsPropertyChanged(dobj, args) {
            if((dobj).FontChanged) {
                (dobj).FontChanged(args);
            }
        };
        InheritableOwner.TextDecorationsProperty = DependencyProperty.RegisterInheritable("TextDecorations", function () {
            return new Enum(Fayde.TextDecorations);
        }, InheritableOwner, Fayde.TextDecorations.None, InheritableOwner._TextDecorationsPropertyChanged);
        InheritableOwner._LanguagePropertyChanged = function _LanguagePropertyChanged(dobj, args) {
            if((dobj).FontChanged) {
                (dobj).FontChanged(args);
            }
        };
        InheritableOwner.LanguageProperty = DependencyProperty.RegisterInheritable("Language", function () {
            return String;
        }, InheritableOwner, undefined, InheritableOwner._LanguagePropertyChanged);
        return InheritableOwner;
    })();
    Fayde.InheritableOwner = InheritableOwner;    
    InheritableOwner.AllInheritedProperties = [
        InheritableOwner.ForegroundProperty, 
        InheritableOwner.FontFamilyProperty, 
        InheritableOwner.FontStretchProperty, 
        InheritableOwner.FontStyleProperty, 
        InheritableOwner.FontWeightProperty, 
        InheritableOwner.FontSizeProperty, 
        InheritableOwner.LanguageProperty, 
        InheritableOwner.FlowDirectionProperty, 
        InheritableOwner.UseLayoutRoundingProperty, 
        InheritableOwner.TextDecorationsProperty, 
        
    ];
    Nullstone.RegisterType(InheritableOwner, "InheritableOwner");
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=InheritableOwner.js.map
