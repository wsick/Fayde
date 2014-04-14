/// <reference path="../Runtime/Annotations.ts" />

module Fayde.Xaml {
    export interface IContentAnnotation {
        (type: Function, prop: DependencyProperty);
        Get(type: Function): DependencyProperty;
    }
    export var Content = <IContentAnnotation>(function () {
        function ca(type: Function, prop: DependencyProperty) {
            Annotation(type, "Content", prop, true);
        }
        (<any>ca).Get = function (type: Function): DependencyProperty {
            var cur = type;
            while (cur) {
                var anns = GetAnnotations(cur, "Content");
                if (anns) {
                    var cp = anns[0];
                    if (cp)
                        return cp;
                }
                cur = GetTypeParent(cur);
            }
            return undefined;
        };
        return ca;
    })();

    export interface ITextContentAnnotation {
        (type: Function, prop: DependencyProperty);
        Get(type: Function): DependencyProperty;
    }
    export var TextContent = <ITextContentAnnotation>(function () {
        function tca(type: Function, prop: DependencyProperty) {
            Annotation(type, "TextContent", prop, true);
        }
        (<any>tca).Get = function (type: Function): DependencyProperty {
            var cur = type;
            while (cur) {
                var anns = GetAnnotations(cur, "TextContent");
                if (anns) {
                    var cp = anns[0];
                    if (cp)
                        return cp;
                }
                cur = GetTypeParent(cur);
            }
            return undefined;
        }
        return tca;
    })();
}