var Fayde;
(function (Fayde) {
    /// CODE
    /// <reference path="../Runtime/TypeManagement.ts" />
    (function (Xaml) {
        var PRIMITIVE_MAPPINGS = [];
        PRIMITIVE_MAPPINGS["String"] = String;
        PRIMITIVE_MAPPINGS["Number"] = Number;
        PRIMITIVE_MAPPINGS["Date"] = Date;
        PRIMITIVE_MAPPINGS["RegExp"] = RegExp;
        PRIMITIVE_MAPPINGS["Array"] = Array;
        PRIMITIVE_MAPPINGS["Null"] = null;

        Xaml.TypeResolver = {
            GetAnnotation: function (type, name) {
                if (!type)
                    return;
                var t = type;
                var anns = (t).Annotations;
                var annotation;
                if (anns && (annotation = anns[name]))
                    return annotation;
                return this.GetAnnotationMember(t.BaseClass, name);

                return null;
            },
            Resolve: function (xmlns, xmlname) {
                if (xmlns === Fayde.XMLNS) {
                    var mapping = PRIMITIVE_MAPPINGS[xmlname];
                    if (mapping !== undefined) {
                        return {
                            Type: mapping,
                            IsPrimitive: true
                        };
                    }
                }
                return undefined;
            }
        };
    })(Fayde.Xaml || (Fayde.Xaml = {}));
    var Xaml = Fayde.Xaml;
})(Fayde || (Fayde = {}));
//# sourceMappingURL=TypeResolver.js.map
