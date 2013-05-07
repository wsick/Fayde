/// <reference path="XamlObject.ts" />
/// <reference path="../Runtime/Enumerable.ts" />
/// CODE
/// <reference path="Clone.ts" />
/// <reference path="../Runtime/BError.ts" />
/// <reference path="../Runtime/Nullstone.ts" />

module Fayde {
    export class XamlObjectCollection extends XamlObject implements IEnumerable {
        private _ht: XamlObject[] = [];
        
        get Count() { return this._ht.length; }

        GetRange(startIndex: number, endIndex: number): XamlObject[] {
            return this._ht.slice(startIndex, endIndex);
        }

        GetValueAt(index: number): XamlObject {
            return this._ht[index];
        }
        SetValueAt(index: number, value: XamlObject): bool {
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
        Add(value: XamlObject): number {
            var rv = this.Insert(this._ht.length, value);
            return rv ? this._ht.length - 1 : -1;
        }
        Insert(index: number, value: XamlObject): bool {
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
        Remove(value: XamlObject): bool {
            var index = this.IndexOf(value);
            if (index === -1)
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
            var old = this._ht;
            //LOOKS USELESS: this._RaiseClearing(old);
            this._ht = [];
            var len = old.length;
            for (var i = 0; i < len; i++) {
                this.RemovedFromCollection(old[i], true);
            }
            this._RaiseCleared();
            return true;
        }
        IndexOf(value: XamlObject): number {
            return this._ht.indexOf(value);
        }
        Contains(value: XamlObject): bool { return this.IndexOf(value) > -1; }
        CanAdd (value: XamlObject): bool { return true; }
        AddedToCollection(value: XamlObject, error: BError): bool {
            if (value instanceof XamlObject)
                return value.XamlNode.AttachTo(this.XamlNode, error);
        }
        RemovedFromCollection(value: XamlObject, isValueSafe: bool) {
            if (value instanceof XamlObject)
                value.XamlNode.Detach();
        }

        GetEnumerator(reverse?: bool): IEnumerator {
            return ArrayEx.GetEnumerator(this._ht, reverse);
        }

        _RaiseItemAdded(value: XamlObject, index: number) { }
        _RaiseItemRemoved(value: XamlObject, index: number) { }
        _RaiseItemReplaced(removed: XamlObject, added: XamlObject, index: number) { }
        //_RaiseClearing(arr: XamlObject[]) { }
        _RaiseCleared() { }

        CloneCore(source: XamlObjectCollection) {
            var enumerator = ArrayEx.GetEnumerator(this._ht);
            while (enumerator.MoveNext()) {
                this.Add(Fayde.Clone(enumerator.Current));
            }
        }
    }
    Nullstone.RegisterType(XamlObjectCollection, "XamlObjectCollection", [IEnumerable_]);
}