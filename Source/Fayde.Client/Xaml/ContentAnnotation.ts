module Fayde.Xaml {
    export interface IContentAnnotation {
        (type: Function, prop: any);
        Get(type: Function): any;
    }
    export var Content = <IContentAnnotation>(function () {
        function ca(type: Function, prop: any) {
            Annotation(type, "Content", prop, true);
        }
        (<any>ca).Get = function (type: Function): any {
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
}