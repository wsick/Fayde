/// <reference path="../Core/XamlObjectCollection.ts" />
/// CODE
/// <reference path="Shape.ts" />

module Fayde.Shapes {
    export class PointCollection implements IEnumerable {
        private _ht: Point[] = [];

        Owner: Shape;
        
        get Count() { return this._ht.length; }

        static FromData(data: string): PointCollection {
            var pc = new PointCollection();
            pc._ht.concat(Media.ParseShapePoints(data));
            return pc;
        }

        GetValueAt(index: number): Point { return this._ht[index]; }
        SetValueAt(index: number, value: Point): bool {
            if (index < 0 || index >= this._ht.length)
                return false;
            var removed = this._ht[index];
            var added = value;
            this._ht[index] = added;
            
            var owner = this.Owner;
            if (owner) owner._InvalidateNaturalBounds();
        }
        Add(value: Point) {
            this._ht.push(value);

            var owner = this.Owner;
            if (owner) owner._InvalidateNaturalBounds();
        }
        AddRange(points: Point[]) {
            this._ht.concat(points);
            var owner = this.Owner;
            if (owner) owner._InvalidateNaturalBounds();
        }
        Insert(index: number, value: Point) {
            if (index < 0)
                return;
            var len = this._ht.length;
            if (index > len)
                index = len;
            this._ht.splice(index, 0, value);

            var owner = this.Owner;
            if (owner) owner._InvalidateNaturalBounds();
        }
        Remove(value: Point) {
            var index = this.IndexOf(value);
            if (index === -1)
                return;
            this.RemoveAt(index);

            var owner = this.Owner;
            if (owner) owner._InvalidateNaturalBounds();
        }
        RemoveAt(index: number) {
            if (index < 0 || index >= this._ht.length)
                return;
            var value = this._ht.splice(index, 1)[0];

            var owner = this.Owner;
            if (owner) owner._InvalidateNaturalBounds();
        }
        Clear() {
            this._ht = [];

            var owner = this.Owner;
            if (owner) owner._InvalidateNaturalBounds();
        }
        IndexOf(value: Point): number {
            var count = this._ht.length;
            for (var i = 0; i < count; i++) {
                if (Nullstone.Equals(value, this._ht[i]))
                    return i;
            }
            return -1;
        }
        Contains(value: Point): bool { return this.IndexOf(value) > -1; }

        GetEnumerator(reverse?: bool): IEnumerator { return ArrayEx.GetEnumerator(this._ht, reverse); }
    }
    Nullstone.RegisterType(PointCollection, "PointCollection");
}