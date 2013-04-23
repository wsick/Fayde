/// <reference path="../Core/DependencyObject.ts" />
/// <reference path="../Core/XamlObjectCollection.ts" />
/// CODE
/// <reference path="../Primitives/Point.ts" />
/// <reference path="../Shapes/RawPath.ts" />
/// <reference path="PathSegment.ts" />

module Fayde.Media {
    export class PathFigure extends DependencyObject {
        static Annotations = { ContentProperty: "Segments" }
        static IsClosedProperty: DependencyProperty = DependencyProperty.RegisterCore("IsClosed", () => Boolean, PathFigure, false);
        static StartPointProperty: DependencyProperty = DependencyProperty.RegisterCore("StartPoint", () => Point, PathFigure);
        static IsFilledProperty: DependencyProperty = DependencyProperty.RegisterCore("IsFilled", () => Boolean, PathFigure, true);
        IsClosed: bool;
        Segments: PathSegmentCollection;
        StartPoint: Point;
        IsFilled: bool;

        private _Path: Shapes.IPathEntry[] = [];

        private _Build() {
            this._Path = [];

            var start = this.StartPoint;
            this._Path.push({ type: Shapes.PathEntryType.Move, x: start.X, y: start.Y });

            var enumerator = this.Segments.GetEnumerator();
            while (enumerator.MoveNext()) {
                (<PathSegment>enumerator.Current)._Append(this._Path);
            }
            if (this.IsClosed)
                this._Path.push({ type: Shapes.PathEntryType.Close });
        }
    }
    Nullstone.RegisterType(PathFigure, "PathFigure");

    export class PathFigureCollection extends XamlObjectCollection {
    }
    Nullstone.RegisterType(PathFigureCollection, "PathFigureCollection");
}