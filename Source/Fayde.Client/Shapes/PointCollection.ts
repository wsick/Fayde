/// <reference path="../Core/XamlObjectCollection.ts" />

module Fayde.Shapes {
    export class PointCollection implements IEnumerable<Point> {
        private _ht: Point[] = [];

        OnChanged: () => void;
        
        get Count() { return this._ht.length; }

        static FromData(data: string): PointCollection {
            var pc = new PointCollection();
            pc._ht = pc._ht.concat(Media.ParseShapePoints(data));
            return pc;
        }
        static FromArray(data: Point[]): PointCollection {
            var pc = new PointCollection();
            pc._ht = pc._ht.concat(data);
            return pc;
        }

        GetValueAt(index: number): Point { return this._ht[index]; }
        SetValueAt(index: number, value: Point): boolean {
            if (index < 0 || index >= this._ht.length)
                return false;
            var removed = this._ht[index];
            var added = value;
            this._ht[index] = added;

            var oc = this.OnChanged;
            if (oc) oc();
        }
        Add(value: Point) {
            this._ht.push(value);
            
            var oc = this.OnChanged;
            if (oc) oc();
        }
        AddRange(points: Point[]) {
            this._ht.push.apply(this._ht, points);
            
            var oc = this.OnChanged;
            if (oc) oc();
        }
        Insert(index: number, value: Point) {
            if (index < 0)
                return;
            var len = this._ht.length;
            if (index > len)
                index = len;
            this._ht.splice(index, 0, value);
            
            var oc = this.OnChanged;
            if (oc) oc();
        }
        Remove(value: Point) {
            var index = this.IndexOf(value);
            if (index === -1)
                return;
            this.RemoveAt(index);
            
            var oc = this.OnChanged;
            if (oc) oc();
        }
        RemoveAt(index: number) {
            if (index < 0 || index >= this._ht.length)
                return;
            var value = this._ht.splice(index, 1)[0];
            
            var oc = this.OnChanged;
            if (oc) oc();
        }
        Clear() {
            this._ht = [];
            
            var oc = this.OnChanged;
            if (oc) oc();
        }
        IndexOf(value: Point): number {
            var count = this._ht.length;
            for (var i = 0; i < count; i++) {
                if (Nullstone.Equals(value, this._ht[i]))
                    return i;
            }
            return -1;
        }
        Contains(value: Point): boolean { return this.IndexOf(value) > -1; }

        getEnumerator(reverse?: boolean): IEnumerator<Point> { return ArrayEx.GetEnumerator(this._ht, reverse); }
    }
    Fayde.RegisterType(PointCollection, "Fayde.Shapes", Fayde.XMLNS);

    Fayde.RegisterTypeConverter(PointCollection, (val: string): PointCollection => {
        var pc = new PointCollection();
        pc.AddRange(Fayde.Media.ParseShapePoints(val));
        return pc;
    });
}