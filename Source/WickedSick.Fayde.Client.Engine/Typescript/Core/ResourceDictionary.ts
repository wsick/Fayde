/// <reference path="InternalCollection.ts" />
/// CODE

module Fayde {
    export class ResourceDictionaryCollection extends InternalCollection {
        AddedToCollection(value: ResourceDictionary, error: BError): bool {
            if (!super.AddedToCollection(value, error))
                return false;
            return this._AssertNoCycles(value, value.XamlNode.ParentNode, error);
        }
        private _AssertNoCycles(subtreeRoot: ResourceDictionary, firstAncestorNode: XamlNode, error: BError) {
            var curNode = firstAncestorNode;
            while (curNode) {
                var rd = <ResourceDictionary>curNode.XObject;
                if (rd instanceof ResourceDictionary) {
                    var cycleFound = false;
                    if (rd === subtreeRoot)
                        cycleFound = true;
                    else if (rd.Source === subtreeRoot.Source)
                        cycleFound = true;

                    if (cycleFound) {
                        error.Message = "Cycle found in resource dictionaries.";
                        error.Number = BError.InvalidOperation;
                        return false;
                    }
                }
                curNode = curNode.ParentNode;
            }

            var enumerator = subtreeRoot.MergedDictionaries.GetEnumerator();
            while (enumerator.MoveNext()) {
                if (!this._AssertNoCycles(enumerator.Current, firstAncestorNode, error))
                    return false;
            }

            return true;
        }
    }

    export class ResourceDictionary extends InternalCollection {
        private _KeyIndex: number[] = [];

        MergedDictionaries: ResourceDictionaryCollection;
        Source: string = "";

        constructor() {
            super();
            Object.defineProperty(this, "MergedDictionaries", {
                value: new ResourceDictionaryCollection(),
                writable: false
            });
        }

        ContainsKey(key: any): bool {
            return this._KeyIndex[key] !== undefined;
        }
        Get(key: any): any {
            var index = this._KeyIndex[key];
            if (index !== undefined)
                return this.GetValueAt(index);
            return this._GetFromMerged(key);
        }
        Set(key: any, value: any) {
            var oldValue;
            if (this.ContainsKey(key)) {
                oldValue = this.Get(key);
                this.Remove(oldValue);
            }
            var index = super.Add(value);
            this._KeyIndex[key] = index;
            this._RaiseItemReplaced(oldValue, value, index);
            return true;
        }

        Add(value: any): number {
            throw new InvalidOperationException("Cannot add to ResourceDictionary. Use Set instead.");
        }
        Remove(value: any): bool {
            throw new InvalidOperationException("Cannot remove from ResourceDictionary. Use Set instead.");
        }
        
        private _GetFromMerged(key: any): any {
            var merged = this.MergedDictionaries;

            if (!merged)
                return undefined;

            var enumerator = merged.GetEnumerator();
            var cur;
            while (enumerator.MoveNext()) {
                cur = (<ResourceDictionary>enumerator.Current).Get(key);
                if (cur !== undefined)
                    return cur;
            }
            return undefined;
        }
    }
}