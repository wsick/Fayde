/// <reference path="../Core/DependencyObject.ts" />
/// <reference path="../Core/XamlObjectCollection.ts" />

module Fayde.Media {
    export interface IPathFigureListener {
        PathFigureChanged(newPathFigure: PathFigure);
    }

    export class PathFigure extends DependencyObject implements IPathSegmentListener {
        static IsClosedProperty: DependencyProperty = DependencyProperty.RegisterCore("IsClosed", () => Boolean, PathFigure, false, (d, args) => (<PathFigure>d).InvalidatePathFigure());
        static StartPointProperty: DependencyProperty = DependencyProperty.RegisterCore("StartPoint", () => Point, PathFigure, undefined, (d, args) => (<PathFigure>d).InvalidatePathFigure());
        static IsFilledProperty: DependencyProperty = DependencyProperty.RegisterCore("IsFilled", () => Boolean, PathFigure, true, (d, args) => (<PathFigure>d).InvalidatePathFigure());
        static SegmentsProperty = DependencyProperty.RegisterImmutable<PathSegmentCollection>("Segments", () => PathSegmentCollection, PathFigure);
        IsClosed: boolean;
        Segments: PathSegmentCollection;
        StartPoint: Point;
        IsFilled: boolean;

        private _Path: Path.RawPath = null;
        private _Listener: IPathFigureListener;

        constructor() {
            super();
            var coll = PathFigure.SegmentsProperty.Initialize(this);
            coll.AttachTo(this);
            coll.Listen(this);
        }

        private _Build(): Path.RawPath {
            var p = new Path.RawPath();

            var start = this.StartPoint;
            p.Move(start.X, start.Y);

            var enumerator = this.Segments.GetEnumerator();
            while (enumerator.MoveNext()) {
                (<PathSegment>enumerator.Current)._Append(p);
            }
            if (this.IsClosed)
                p.Close();

            return p;
        }

        PathSegmentChanged(newPathSegment: PathSegment) {
            this._Path = null;
            var listener = this._Listener;
            if (listener) listener.PathFigureChanged(this);
        }
        private InvalidatePathFigure() {
            this._Path = null;
            var listener = this._Listener;
            if (listener) listener.PathFigureChanged(this);
        }

        Listen(listener: IPathFigureListener) { this._Listener = listener; }
        Unlisten(listener: IPathFigureListener) { if (this._Listener === listener) this._Listener = null; }

        MergeInto(rp: Path.RawPath) {
            if (!this._Path)
                this._Path = this._Build();
            Path.RawPath.Merge(rp, this._Path);
        }
    }
    Fayde.RegisterType(PathFigure, "Fayde.Media", Fayde.XMLNS);
    Xaml.Content(PathFigure, PathFigure.SegmentsProperty);

    export class PathFigureCollection extends XamlObjectCollection<PathFigure> implements IPathFigureListener {
        private _Listener: IPathFigureListener;

        AddingToCollection(value: PathFigure, error: BError): boolean {
            if (!super.AddingToCollection(value, error))
                return false;
            value.Listen(this);
            var listener = this._Listener;
            if (listener) listener.PathFigureChanged(value);
            return true;
        }
        RemovedFromCollection(value: PathFigure, isValueSafe: boolean) {
            super.RemovedFromCollection(value, isValueSafe);
            value.Unlisten(this);
            var listener = this._Listener;
            if (listener) listener.PathFigureChanged(value);
        }

        Listen(listener: IPathFigureListener) { this._Listener = listener; }
        Unlisten(listener: IPathFigureListener) { if (this._Listener === listener) this._Listener = null; }
        
        PathFigureChanged(newPathFigure: PathFigure) {
            var listener = this._Listener;
            if (listener) listener.PathFigureChanged(newPathFigure);
        }
    }
    Fayde.RegisterType(PathFigureCollection, "Fayde.Media", Fayde.XMLNS);
}