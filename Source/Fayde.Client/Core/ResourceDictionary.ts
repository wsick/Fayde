/// <reference path="DependencyObject.ts" />
/// <reference path="XamlObjectCollection.ts" />

// http://msdn.microsoft.com/en-us/library/cc903952(v=vs.95).aspx
module Fayde {
    export interface IResourcable {
        Resources: Fayde.ResourceDictionary;
    }

    export class ResourceDictionaryCollection extends XamlObjectCollection<ResourceDictionary> {
        Get(key: any): any {
            var enumerator = this.GetEnumerator();
            var cur: any;
            while (enumerator.MoveNext()) {
                cur = enumerator.Current.Get(key);
                if (cur !== undefined)
                    return cur;
            }
            return undefined;
        }
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
                    else if (rd.Source && Uri.Equals(rd.Source, subtreeRoot.Source))
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
    Fayde.RegisterType(ResourceDictionaryCollection, "Fayde", Fayde.XMLNS);

    export class ResourceDictionary extends XamlObject implements IEnumerable<any> {
        private _Keys: any[] = [];
        private _Values: any[] = [];

        private _IsSourceLoaded: boolean = false;

        private _MergedDictionaries: ResourceDictionaryCollection;
        get MergedDictionaries(): ResourceDictionaryCollection {
            var md = this._MergedDictionaries;
            if (!md) {
                md = this._MergedDictionaries = new ResourceDictionaryCollection();
                md.AttachTo(this);
            }
            return md;
        }
        Source: Uri;

        get Count(): number { return this._Values.length; }

        AttachTo(xobj: XamlObject) {
            var error = new BError();
            if (!this.XamlNode.AttachTo(xobj.XamlNode, error))
                error.ThrowException();
        }

        Contains(key: any): boolean { return this._Keys.indexOf(key) > -1; }
        Get(key: any): any {
            var index = this._Keys.indexOf(key);
            if (index > -1)
                return this._Values[index];
            return this.MergedDictionaries.Get(key);
        }
        Set(key: any, value: any): boolean {
            if (key === undefined)
                return false;
            if (value === undefined)
                return this.Remove(key);

            var index = this._Keys.indexOf(key);
            var error = new BError();
            if (value instanceof XamlObject && !(<XamlObject>value).XamlNode.AttachTo(this.XamlNode, error)) {
                if (error.Message)
                    throw new Exception(error.Message);
                return false;
            }

            if (index < 0) {
                this._Keys.push(key);
                this._Values.push(value);
            } else {
                var oldValue = this._Values[index];
                this._Keys[index] = key;
                this._Values[index] = value;
                if (oldValue instanceof XamlObject)
                    (<XamlObject>oldValue).XamlNode.Detach();
            }
            return true;
        }
        Remove(key: any): boolean {
            var index = this._Keys.indexOf(key);
            if (index < 0)
                return false;
            this._Keys.splice(index, 1);
            var oldvalue = this._Values.splice(index, 1)[0];
            if (oldvalue instanceof XamlObject)
                (<XamlObject>oldvalue).XamlNode.Detach();
        }

        GetEnumerator(reverse?: boolean): IEnumerator<any> {
            return Fayde.ArrayEx.GetEnumerator(this._Values, reverse);
        }
        GetNodeEnumerator<U extends XamlNode>(reverse?: boolean): IEnumerator<U> {
            return Fayde.ArrayEx.GetNodeEnumerator<any, U>(this._Values, reverse);
        }
    }
    Fayde.RegisterType(ResourceDictionary, "Fayde", Fayde.XMLNS);
}