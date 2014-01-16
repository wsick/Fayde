/// <reference path="../Core/DependencyObject.ts" />
/// <reference path="../Core/XamlObjectCollection.ts" />

module Fayde.Media {
    export interface IPathSegmentListener {
        PathSegmentChanged(newPathSegment: PathSegment);
    }

    export class PathSegment extends DependencyObject {
        private _Listener: IPathSegmentListener;

        _Append(path: Path.RawPath) {
            //Abstract method
        }

        Listen(listener: IPathSegmentListener) { this._Listener = listener; }
        Unlisten(listener: IPathSegmentListener) { if (this._Listener === listener) this._Listener = null; }
    }
    Fayde.RegisterType(PathSegment, "Fayde.Media", Fayde.XMLNS);

    export class PathSegmentCollection extends XamlObjectCollection<PathSegment> implements IPathSegmentListener {
        private _Listener: IPathSegmentListener;

        AddingToCollection(value: PathSegment, error: BError): boolean {
            if (!super.AddingToCollection(value, error))
                return false;
            value.Listen(this);
            var listener = this._Listener;
            if (listener) listener.PathSegmentChanged(value);
            return true;
        }
        RemovedFromCollection(value: PathSegment, isValueSafe: boolean) {
            super.RemovedFromCollection(value, isValueSafe);
            value.Unlisten(this);
            var listener = this._Listener;
            if (listener) listener.PathSegmentChanged(value);
        }

        Listen(listener: IPathSegmentListener) { this._Listener = listener; }
        Unlisten(listener: IPathSegmentListener) { if (this._Listener === listener) this._Listener = null; }
        
        PathSegmentChanged(newPathSegment: PathSegment) {
            var listener = this._Listener;
            if (listener) listener.PathSegmentChanged(newPathSegment);
        }
    }
    Fayde.RegisterType(PathSegmentCollection, "Fayde.Media", Fayde.XMLNS);
}