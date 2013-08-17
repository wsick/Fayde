/// <reference path="XamlObjectCollection.ts" />
/// CODE

// http://msdn.microsoft.com/en-us/library/cc903952(v=vs.95).aspx
module Fayde {
    export interface IResourcable {
        Resources: Fayde.ResourceDictionary;
    }

    export class ResourceDictionaryCollection extends XamlObjectCollection<ResourceDictionary> {
        AddingToCollection(value: ResourceDictionary, error: BError): boolean {
            if (!super.AddingToCollection(value, error))
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
    Fayde.RegisterType(ResourceDictionaryCollection, {
    	Name: "ResourceDictionaryCollection",
    	Namespace: "Fayde",
    	XmlNamespace: Fayde.XMLNS
    });

    export class ResourceDictionary extends XamlObjectCollection<XamlObject> {
        private _KeyIndex: number[] = [];

        MergedDictionaries: ResourceDictionaryCollection;
        Source: string = "";

        constructor() {
            super();
            var rdc = new ResourceDictionaryCollection();
            rdc.AttachTo(this);
            Object.defineProperty(this, "MergedDictionaries", {
                value: rdc,
                writable: false
            });
        }

        ContainsKey(key: any): boolean {
            return this._KeyIndex[key] !== undefined;
        }
        Get(key: any): XamlObject {
            var index = this._KeyIndex[key];
            if (index > -1)
                return this._ht[index];
            return this._GetFromMerged(key);
        }
        Set(key: any, value: XamlObject): boolean {
            var index = this._KeyIndex[key];
            if (index === undefined && value === undefined)
                return false;

            if (value === undefined) {
                this._KeyIndex[key] = undefined;
                return this.RemoveAt(index);
            }

            if (index === undefined) {
                index = this._ht.length;
                this._KeyIndex[key] = index;
                return this.Insert(index, value);
            }

            var oldValue = this.GetValueAt[index];
            this._ht[index] = value;
            this._RaiseItemReplaced(oldValue, value, index);
            return true;
        }

        Add(value: XamlObject): number {
            throw new InvalidOperationException("Cannot add to ResourceDictionary. Use Set instead.");
        }
        Remove(value: XamlObject): boolean {
            throw new InvalidOperationException("Cannot remove from ResourceDictionary. Use Set instead.");
        }
        
        private _GetFromMerged(key: any): XamlObject {
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
    Fayde.RegisterType(ResourceDictionary, {
    	Name: "ResourceDictionary",
    	Namespace: "Fayde",
    	XmlNamespace: Fayde.XMLNS
    });
}