/// CODE
/// <reference path="DependencyObject.ts" />

module Fayde {
    export function Clone(value: any): any {
        if (value instanceof DependencyObject)
            return (<DependencyObject>value).Clone();

        if (typeof value === "number" || typeof value === "string")
            return value;

        var typeName = value.constructor._TypeName;
        switch (typeName) {
            case "Uri":
            case "rect":
            case "size":
            case "FontFamily":
            case "Point":
            case "Color":
            case "PropertyPath":
            case "RepeatBehavior":
            case "Duration":
            case "KeyTime":
            case "GridLength":
            case "CornerRadius":
            case "Thickness":
                return (<ICloneable>value).Clone();
        }

        return new value.constructor();
    }
}