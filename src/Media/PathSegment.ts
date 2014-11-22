/// <reference path="../Core/DependencyObject.ts" />
/// <reference path="../Core/XamlObjectCollection.ts" />

module Fayde.Media {
    export class PathSegment extends DependencyObject {
        _Append(path: minerva.path.Path) {
            //Abstract method
        }
    }
    Fayde.RegisterType(PathSegment, Fayde.XMLNS);

    export class PathSegmentCollection extends XamlObjectCollection<PathSegment> {
        AddingToCollection(value: PathSegment, error: BError): boolean {
            if (!super.AddingToCollection(value, error))
                return false;
            ReactTo(value, this, () => Incite(this));
            Incite(this);
            return true;
        }
        RemovedFromCollection(value: PathSegment, isValueSafe: boolean) {
            super.RemovedFromCollection(value, isValueSafe);
            UnreactTo(value, this);
            Incite(this);
        }
    }
    Fayde.RegisterType(PathSegmentCollection, Fayde.XMLNS);
}