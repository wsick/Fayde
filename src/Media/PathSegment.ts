/// <reference path="../Core/DependencyObject.ts" />
/// <reference path="../Core/XamlObjectCollection.ts" />

module Fayde.Media {
    export class PathSegment extends DependencyObject {
        _Append(path: minerva.path.Path) {
            //Abstract method
        }
    }
    Fayde.CoreLibrary.add(PathSegment);

    export class PathSegmentCollection extends XamlObjectCollection<PathSegment> {
        AddingToCollection(value: PathSegment, error: BError): boolean {
            if (this._Source != null) {
                console.warn("Cannot modify Path Segments Collection when bound to SegmentsSource.");
                return false;
            }
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

        private _Source: nullstone.IEnumerable<PathSegment> = null;
        SetSource(source: nullstone.IEnumerable<PathSegment>) {
            var onc = Collections.INotifyCollectionChanged_.as(this._Source);
            if (onc)
                onc.CollectionChanged.off(this._OnSegmentsCollectionChanged, this);
            var oen = nullstone.IEnumerable_.as(this._Source);
            if (oen) {
                this.Clear();
            }

            this._Source = source;
            var nen = nullstone.IEnumerable_.as(this._Source);
            if (nen) {
                for (var en = nen.getEnumerator(); en.moveNext(); ) {
                    this.Add(en.current);
                }
            }
            var nnc = Collections.INotifyCollectionChanged_.as(this._Source);
            if (nnc)
                nnc.CollectionChanged.on(this._OnSegmentsCollectionChanged, this);
        }

        private _OnSegmentsCollectionChanged(sender, args: Collections.CollectionChangedEventArgs) {
            for (var i = 0, items = args.OldItems; i < items.length; i++) {
                this.RemoveAt(i);
            }
            for (var i = 0, items = args.NewItems; i < items.length; i++) {
                this.Insert(args.NewStartingIndex + i, items[i]);
            }
        }
    }
    Fayde.CoreLibrary.add(PathSegmentCollection);
}