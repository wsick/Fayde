var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="XamlObjectCollection.ts" />
/// CODE
var Fayde;
(function (Fayde) {
    var ResourceDictionaryCollection = (function (_super) {
        __extends(ResourceDictionaryCollection, _super);
        function ResourceDictionaryCollection() {
            _super.apply(this, arguments);

        }
        ResourceDictionaryCollection.prototype.AddedToCollection = function (value, error) {
            if(!_super.prototype.AddedToCollection.call(this, value, error)) {
                return false;
            }
            return this._AssertNoCycles(value, value.XamlNode.ParentNode, error);
        };
        ResourceDictionaryCollection.prototype._AssertNoCycles = function (subtreeRoot, firstAncestorNode, error) {
            var curNode = firstAncestorNode;
            while(curNode) {
                var rd = curNode.XObject;
                if(rd instanceof ResourceDictionary) {
                    var cycleFound = false;
                    if(rd === subtreeRoot) {
                        cycleFound = true;
                    } else if(rd.Source === subtreeRoot.Source) {
                        cycleFound = true;
                    }
                    if(cycleFound) {
                        error.Message = "Cycle found in resource dictionaries.";
                        error.Number = BError.InvalidOperation;
                        return false;
                    }
                }
                curNode = curNode.ParentNode;
            }
            var enumerator = subtreeRoot.MergedDictionaries.GetEnumerator();
            while(enumerator.MoveNext()) {
                if(!this._AssertNoCycles(enumerator.Current, firstAncestorNode, error)) {
                    return false;
                }
            }
            return true;
        };
        return ResourceDictionaryCollection;
    })(Fayde.XamlObjectCollection);
    Fayde.ResourceDictionaryCollection = ResourceDictionaryCollection;    
    Nullstone.RegisterType(ResourceDictionaryCollection, "ResourceDictionaryCollection");
    var ResourceDictionary = (function (_super) {
        __extends(ResourceDictionary, _super);
        function ResourceDictionary() {
                _super.call(this);
            this._KeyIndex = [];
            this.Source = "";
            Object.defineProperty(this, "MergedDictionaries", {
                value: new ResourceDictionaryCollection(),
                writable: false
            });
        }
        ResourceDictionary.prototype.ContainsKey = function (key) {
            if(typeof key === "string") {
                return this._KeyIndex[key] !== undefined;
            }
        };
        ResourceDictionary.prototype.Get = function (key) {
            var index;
            if(typeof key === "string") {
                index = this._KeyIndex[key];
            } else {
                var index = this._KeyIndex[key];
            }
            if(index !== undefined) {
                return this.GetValueAt(index);
            }
            return this._GetFromMerged(key);
        };
        ResourceDictionary.prototype.Set = function (key, value) {
            var oldValue;
            if(this.ContainsKey(key)) {
                oldValue = this.Get(key);
                this.Remove(oldValue);
            }
            var index = _super.prototype.Add.call(this, value);
            this._KeyIndex[key] = index;
            this._RaiseItemReplaced(oldValue, value, index);
            return true;
        };
        ResourceDictionary.prototype.Add = function (value) {
            throw new InvalidOperationException("Cannot add to ResourceDictionary. Use Set instead.");
        };
        ResourceDictionary.prototype.Remove = function (value) {
            throw new InvalidOperationException("Cannot remove from ResourceDictionary. Use Set instead.");
        };
        ResourceDictionary.prototype._GetFromMerged = function (key) {
            var merged = this.MergedDictionaries;
            if(!merged) {
                return undefined;
            }
            var enumerator = merged.GetEnumerator();
            var cur;
            while(enumerator.MoveNext()) {
                cur = (enumerator.Current).Get(key);
                if(cur !== undefined) {
                    return cur;
                }
            }
            return undefined;
        };
        return ResourceDictionary;
    })(Fayde.XamlObjectCollection);
    Fayde.ResourceDictionary = ResourceDictionary;    
    Nullstone.RegisterType(ResourceDictionary, "ResourceDictionary");
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=ResourceDictionary.js.map
