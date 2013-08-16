/// CODE
/// <reference path="../Runtime/TypeManagement.ts" />

module Fayde.Xaml {
    var PRIMITIVE_MAPPINGS = [];
    PRIMITIVE_MAPPINGS["String"] = String;
    PRIMITIVE_MAPPINGS["Number"] = Number;
    PRIMITIVE_MAPPINGS["Date"] = Date;
    PRIMITIVE_MAPPINGS["RegExp"] = RegExp;
    PRIMITIVE_MAPPINGS["Array"] = Array;
    PRIMITIVE_MAPPINGS["Null"] = null;

    export interface ITypeResolution {
        IsPrimitive: boolean;
        Type: Function;
    }
    export interface ITypeResolver {
        GetAnnotation(type: Function, name: string): any;
        Resolve(xmlns: string, xmlname: string): ITypeResolution;
    }
    export var TypeResolver: ITypeResolver = {
        GetAnnotation: function (type: Function, name: string): any {
            if (!type)
                return;
            var t = <ITypeRegistration>type;
            var anns = (<any>t).Annotations;
            var annotation: any;
            if (anns && (annotation = anns[name]))
                return annotation;
            return this.GetAnnotationMember(t._BaseClass, name);
        },
        Resolve: function (xmlns: string, xmlname: string): ITypeResolution {
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
    }
}