/// <reference path="XamlObject.ts" />
/// <reference path="../Runtime/Enumerable.ts" />
/// CODE
/// <reference path="../Runtime/BError.ts" />

module Fayde {
    export class InternalCollection extends XamlObject implements IEnumerable {
        private _ht = [];
        private _listeners = [];
        
        get Count() { return this._ht.length; }

        GetValueAt(index: number): any {
            return this._ht[index];
        }
        SetValueAt(index: number, value: any): bool {
            if (!this.CanAdd(value))
                return false;

            if (index < 0 || index >= this._ht.length)
                return false;

            var removed = this._ht[index];
            var added = value;

            var error = new BError();
            if (this.AddedToCollection(added, error)) {
                this._ht[index] = added;
                this.RemovedFromCollection(removed, true);
                this._RaiseItemReplaced(removed, added, index);
                return true;
            }
            return false;
        }
        Add(value: any): number {
            var rv = this.Insert(this._ht.length, value);
            return rv ? this._ht.length - 1 : -1;
        }
        Insert(index: number, value: any): bool {
            if (!this.CanAdd(value))
                return false;
            if (index < 0)
                return false;
            var count = this._ht.length;
            if (index > count)
                index = count;

            var error = new BError();
            if (this.AddedToCollection(value, error)) {
                this._ht.splice(index, 0, value);
                this._RaiseItemAdded(value, index);
                return true;
            }
            if (error.Message)
                throw new Exception(error.Message);
            return false;
        }
        Remove(value: any): bool {
            var index = this.IndexOf(value);
            if (index == -1)
                return false;
            return this.RemoveAt(index);
        }
        RemoveAt(index: number): bool {
            if (index < 0 || index >= this._ht.length)
                return false;
            var value = this._ht[index];
            this._ht.splice(index, 1);
            this.RemovedFromCollection(value, true);
            this._RaiseItemRemoved(value, index);
            return true;
        }
        Clear(): bool {
            //LOOKS_USELESS: this._RaiseClearing();
            var old = this._ht;
            this._ht = [];
            for (var i = 0; i < old.length; i++) {
                this.RemovedFromCollection(old[i], true);
            }
            this._RaiseCleared();
            return true;
        }
        IndexOf(value: any): number {
            var count = this._ht.length;
            for (var i = 0; i < count; i++) {
                if (Nullstone.Equals(value, this._ht[i]))
                    return i;
            }
            return -1;
        }
        Contains(value: any): bool { return this.IndexOf(value) > -1; }
        CanAdd (value: any): bool { return true; }
        AddedToCollection(value: any, error: BError): bool { return true; }
        RemovedFromCollection(value: any, isValueSafe: bool) { }

        GetEnumerator(): IEnumerator {
            return ArrayEx.GetEnumerator(this._ht);
        }

        _RaiseItemAdded(value: any, index: number) { }
        _RaiseItemRemoved(value: any, index: number) { }
        _RaiseItemReplaced(removed: any, added: any, index: number) { }
        //_RaiseClearing() { }
        _RaiseCleared() { }
    }
}