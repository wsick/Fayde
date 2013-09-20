/// <reference path="Enumerable.ts" />

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

module Fayde {
    //export interface IEnumerable<T> {
        //Aggregate<TAccumulate>(seed: TAccumulate, func: (u: TAccumulate, t: T) => TAccumulate): TAccumulate;
        //Where(filter: (t: T) => boolean): IEnumerable < T>;
        //Select<TOut>(projection: (t: T) => TOut): IEnumerable < TOut>;
        //All(filter: (t: T) => boolean): boolean;
        //Any(filter: (t: T) => boolean): boolean;
        //Average(func: (t: T) => number): number;
    //}

    class Enumerable<T> implements IEnumerable<T>, IEnumerator<T> {
        GetEnumerator(): IEnumerator<T> { return this; }
        Current: T = null;
        MoveNext(): boolean { return false; }

        Aggregate<TAccumulate>(seed: TAccumulate, func: (u: TAccumulate, t: T) => TAccumulate): TAccumulate {
            var cur = seed;
            while (this.MoveNext()) {
                cur = func(cur, this.Current);
            }
            return cur;
        }
        Where(filter: (t: T) => boolean): IEnumerable<T> {
            return new WhereEnumerable<T>(this, filter);
        }
        Select<TOut>(projection: (t: T) => TOut): IEnumerable<TOut> {
            return new SelectEnumerable<T, TOut>(this, projection);
        }
        All(filter: (t: T) => boolean): boolean {
            while (this.MoveNext()) {
                if (filter(this.Current) !== true)
                    return false;
            }
            return true;
        }
        Any(filter: (t: T) => boolean): boolean {
            while (this.MoveNext()) {
                if (filter(this.Current) === true)
                    return true;
            }
            return false;
        }
        Average(func: (t: T) => number): number {
            var total = 0;
            var count = 0;
            while (this.MoveNext()) {
                total += func(this.Current);
                count++;
            }
            return total / count;
        }
    }

    class WhereEnumerable<T> extends Enumerable<T> {
        private _Filter: (t: T) => boolean;
        private _PreviousEnumerator: IEnumerator<T>;
        constructor(e: IEnumerable<T>, filter: (t: T) => boolean) {
            super();
            this._Filter = filter;
            this._PreviousEnumerator = e.GetEnumerator();
        }
        MoveNext(): boolean {
            var c: T;
            while (this._PreviousEnumerator.MoveNext()) {
                c = this._PreviousEnumerator.Current;
                if (this._Filter(c) === true) {
                    this.Current = c;
                    return true;
                }
            }
            return false;
        }
    }

    class SelectEnumerable<TIn, TOut> extends Enumerable<TOut> {
        private _Projection: (t: TIn) => TOut;
        private _PreviousEnumerator: IEnumerator<TIn>;
        constructor(e: IEnumerable<TIn>, projection: (t: TIn) => TOut) {
            super();
            this._Projection = projection;
            this._PreviousEnumerator = e.GetEnumerator();
        }
        MoveNext(): boolean {
            var c: TIn;
            if (this._PreviousEnumerator.MoveNext()) {
                c = this._PreviousEnumerator.Current;
                this.Current = this._Projection(c);
                return true;
            } else {
                this.Current = null;
                return false;
            }
        }
    }
    
    Object.defineProperty(Array.prototype, "Aggregate", { value: Enumerable.prototype.Aggregate, enumerable: false });
    Object.defineProperty(Array.prototype, "Where", { value: Enumerable.prototype.Where, enumerable: false });
    Object.defineProperty(Array.prototype, "Select", { value: Enumerable.prototype.Select, enumerable: false });
    Object.defineProperty(Array.prototype, "All", { value: Enumerable.prototype.All, enumerable: false });
    Object.defineProperty(Array.prototype, "Any", { value: Enumerable.prototype.Any, enumerable: false });
    Object.defineProperty(Array.prototype, "Average", { value: Enumerable.prototype.Average, enumerable: false });
}