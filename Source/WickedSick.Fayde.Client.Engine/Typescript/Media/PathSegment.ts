/// <reference path="../Core/DependencyObject.ts" />
/// <reference path="../Core/XamlObjectCollection.ts" />
/// CODE
/// <reference path="../Shapes/RawPath.ts" />

module Fayde.Media {
    export class PathSegment extends DependencyObject {
        _Append(path: Shapes.IPathEntry[]) {
            //Abstract method
        }
    }
    Nullstone.RegisterType(PathSegment, "PathSegment");

    export class PathSegmentCollection extends XamlObjectCollection {
    }
    Nullstone.RegisterType(PathSegmentCollection, "PathSegmentCollection");
}