/// <reference path="Enumerable.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/*
interface Array<T> {
Aggregate<TAccumulate>(seed: TAccumulate, func: (u: TAccumulate, t: T) => TAccumulate): TAccumulate;
Where(filter: (t: T) => boolean): Fayde.IEnumerable<T>;
Select<TOut>(projection: (t: T) => TOut): Fayde.IEnumerable<TOut>;
All(filter: (t: T) => boolean): boolean;
Any(filter: (t: T) => boolean): boolean;
Average(func: (t: T) => number): number;
}
*/
var Fayde;
(function (Fayde) {
    //export interface IEnumerable<T> {
    //Aggregate<TAccumulate>(seed: TAccumulate, func: (u: TAccumulate, t: T) => TAccumulate): TAccumulate;
    //Where(filter: (t: T) => boolean): IEnumerable < T>;
    //Select<TOut>(projection: (t: T) => TOut): IEnumerable < TOut>;
    //All(filter: (t: T) => boolean): boolean;
    //Any(filter: (t: T) => boolean): boolean;
    //Average(func: (t: T) => number): number;
    //}
    var Enumerable = (function () {
        function Enumerable() {
            this.Current = null;
        }
        Enumerable.prototype.GetEnumerator = function () {
            return this;
        };

        Enumerable.prototype.MoveNext = function () {
            return false;
        };

        Enumerable.prototype.Aggregate = function (seed, func) {
            var cur = seed;
            while (this.MoveNext()) {
                cur = func(cur, this.Current);
            }
            return cur;
        };
        Enumerable.prototype.Where = function (filter) {
            return new WhereEnumerable(this, filter);
        };
        Enumerable.prototype.Select = function (projection) {
            return new SelectEnumerable(this, projection);
        };
        Enumerable.prototype.All = function (filter) {
            while (this.MoveNext()) {
                if (filter(this.Current) !== true)
                    return false;
            }
            return true;
        };
        Enumerable.prototype.Any = function (filter) {
            while (this.MoveNext()) {
                if (filter(this.Current) === true)
                    return true;
            }
            return false;
        };
        Enumerable.prototype.Average = function (func) {
            var total = 0;
            var count = 0;
            while (this.MoveNext()) {
                total += func(this.Current);
                count++;
            }
            return total / count;
        };

        Enumerable.Count = function (enumerable) {
            var count = 0;
            if (enumerable) {
                var enumerator = enumerable.GetEnumerator();
                while (enumerator.MoveNext()) {
                    count++;
                }
            }
            return count;
        };
        Enumerable.Contains = function (enumerable, item) {
            if (!enumerable)
                return false;
            var enumerator = enumerable.GetEnumerator();
            while (enumerator.MoveNext()) {
                if (enumerator.Current === item)
                    return true;
            }
            return false;
        };
        Enumerable.FirstOrDefault = function (enumerable, filter) {
            if (!enumerable)
                return null;
            var cur;
            var enumerator = enumerable.GetEnumerator();
            while (enumerator.MoveNext()) {
                cur = enumerator.Current;
                if (!filter)
                    return cur;
                if (filter(cur))
                    return cur;
            }
            return null;
        };
        Enumerable.ElementAt = function (enumerable, index) {
            if (!enumerable)
                return null;
            var enumerator = enumerable.GetEnumerator();
            for (var i = 0; i <= index; i++) {
                if (!enumerator.MoveNext())
                    throw new IndexOutOfRangeException(i);
            }
            return enumerator.Current;
        };
        Enumerable.ElementAtOrDefault = function (enumerable, index) {
            if (!enumerable)
                return null;
            var enumerator = enumerable.GetEnumerator();
            for (var i = 0; i <= index; i++) {
                if (!enumerator.MoveNext())
                    return null;
            }
            return enumerator.Current;
        };
        Enumerable.Where = function (enumerable, filter) {
            return new WhereEnumerable(enumerable, filter);
        };
        return Enumerable;
    })();
    Fayde.Enumerable = Enumerable;

    var WhereEnumerable = (function (_super) {
        __extends(WhereEnumerable, _super);
        function WhereEnumerable(e, filter) {
            _super.call(this);
            this._Filter = filter;
            this._PreviousEnumerator = e.GetEnumerator();
        }
        WhereEnumerable.prototype.MoveNext = function () {
            var c;
            while (this._PreviousEnumerator.MoveNext()) {
                c = this._PreviousEnumerator.Current;
                if (this._Filter(c) === true) {
                    this.Current = c;
                    return true;
                }
            }
            return false;
        };
        return WhereEnumerable;
    })(Enumerable);

    var SelectEnumerable = (function (_super) {
        __extends(SelectEnumerable, _super);
        function SelectEnumerable(e, projection) {
            _super.call(this);
            this._Projection = projection;
            this._PreviousEnumerator = e.GetEnumerator();
        }
        SelectEnumerable.prototype.MoveNext = function () {
            var c;
            if (this._PreviousEnumerator.MoveNext()) {
                c = this._PreviousEnumerator.Current;
                this.Current = this._Projection(c);
                return true;
            } else {
                this.Current = null;
                return false;
            }
        };
        return SelectEnumerable;
    })(Enumerable);

    Object.defineProperty(Array.prototype, "Aggregate", { value: Enumerable.prototype.Aggregate, enumerable: false });
    Object.defineProperty(Array.prototype, "Where", { value: function (filter) {
            return new WhereEnumerable(this, filter);
        }, enumerable: false });
    Object.defineProperty(Array.prototype, "Select", { value: Enumerable.prototype.Select, enumerable: false });
    Object.defineProperty(Array.prototype, "All", { value: Enumerable.prototype.All, enumerable: false });
    Object.defineProperty(Array.prototype, "Any", { value: Enumerable.prototype.Any, enumerable: false });
    Object.defineProperty(Array.prototype, "Average", { value: Enumerable.prototype.Average, enumerable: false });
})(Fayde || (Fayde = {}));
//# sourceMappingURL=EnumerableEx.js.map
