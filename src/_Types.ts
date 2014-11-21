module Fayde {
    export var XMLNS = "http://schemas.wsick.com/fayde";
    export var XMLNSX = "http://schemas.wsick.com/fayde/x";
    export var XMLNSINTERNAL = "http://schemas.wsick.com/fayde/internal";

    export var Enum = nullstone.Enum;
    export interface Enum {
        new(): nullstone.Enum;
    }

    export var Uri = nullstone.Uri;
    export interface Uri extends nullstone.Uri {
    }

    export var TypeManager = new nullstone.TypeManager(XMLNS, XMLNSX);

    export function RegisterType (type: Function, uri: string, name: string) {
        TypeManager.add(uri, name, type)
    }

    export function RegisterEnum (enu: any, uri: string, name: string) {
        TypeManager.addEnum(uri, name, enu)
    }
}