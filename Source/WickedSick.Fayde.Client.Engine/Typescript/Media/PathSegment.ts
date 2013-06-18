/// <reference path="../Core/DependencyObject.ts" />
/// <reference path="../Core/XamlObjectCollection.ts" />
/// CODE
/// <reference path="../Shapes/RawPath.ts" />

module Fayde.Media {
    export interface IPathSegmentListener {
        PathSegmentChanged(newPathSegment: PathSegment);
    }

    export class PathSegment extends DependencyObject {
        private _Listener: IPathSegmentListener;

        _Append(path: Shapes.RawPath) {
            //Abstract method
        }

        Listen(listener: IPathSegmentListener) { this._Listener = listener; }
        Unlisten(listener: IPathSegmentListener) { if (this._Listener === listener) this._Listener = null; }
    }
    Nullstone.RegisterType(PathSegment, "PathSegment");

    export class PathSegmentCollection extends XamlObjectCollection implements IPathSegmentListener {
        private _Listener: IPathSegmentListener;

        AddingToCollection(value: PathSegment, error: BError): bool {
            if (!super.AddingToCollection(value, error))
                return false;
            value.Listen(this);
            var listener = this._Listener;
            if (listener) listener.PathSegmentChanged(value);
            return true;
        }
        RemovedFromCollection(value: PathSegment, isValueSafe: bool) {
            super.RemovedFromCollection(value, isValueSafe);
            value.Unlisten(this);
            var listener = this._Listener;
            if (listener) listener.PathSegmentChanged(value);
        }

        Listen(listener: IPathSegmentListener) { this._Listener = listener; }
        Unlisten(listener: IPathSegmentListener) { if (this._Listener === listener) this._Listener = null; }
        
        private PathSegmentChanged(newPathSegment: PathSegment) {
            var listener = this._Listener;
            if (listener) listener.PathSegmentChanged(newPathSegment);
        }
    }
    Nullstone.RegisterType(PathSegmentCollection, "PathSegmentCollection");
}