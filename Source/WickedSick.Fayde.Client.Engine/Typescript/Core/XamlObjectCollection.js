var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="XamlObject.ts" />
/// <reference path="../Runtime/Enumerable.ts" />
/// CODE
/// <reference path="Clone.ts" />
/// <reference path="../Runtime/BError.ts" />
/// <reference path="../Runtime/Nullstone.ts" />
var Fayde;
(function (Fayde) {
    var XamlObjectCollection = (function (_super) {
        __extends(XamlObjectCollection, _super);
        function XamlObjectCollection() {
            _super.apply(this, arguments);

            this._ht = [];
        }
        Object.defineProperty(XamlObjectCollection.prototype, "Count", {
            get: function () {
                return this._ht.length;
            },
            enumerable: true,
            configurable: true
        });
        XamlObjectCollection.prototype.GetRange = function (startIndex, endIndex) {
            return this._ht.slice(startIndex, endIndex);
        };
        XamlObjectCollection.prototype.GetValueAt = function (index) {
            return this._ht[index];
        };
        XamlObjectCollection.prototype.SetValueAt = function (index, value) {
            if(!this.CanAdd(value)) {
                return false;
            }
            if(index < 0 || index >= this._ht.length) {
                return false;
            }
            var removed = this._ht[index];
            var added = value;
            var error = new BError();
            if(this.AddedToCollection(added, error)) {
                this._ht[index] = added;
                this.RemovedFromCollection(removed, true);
                this._RaiseItemReplaced(removed, added, index);
                return true;
            }
            return false;
        };
        XamlObjectCollection.prototype.Add = function (value) {
            var rv = this.Insert(this._ht.length, value);
            return rv ? this._ht.length - 1 : -1;
        };
        XamlObjectCollection.prototype.Insert = function (index, value) {
            if(!this.CanAdd(value)) {
                return false;
            }
            if(index < 0) {
                return false;
            }
            var count = this._ht.length;
            if(index > count) {
                index = count;
            }
            var error = new BError();
            if(this.AddedToCollection(value, error)) {
                this._ht.splice(index, 0, value);
                this._RaiseItemAdded(value, index);
                return true;
            }
            if(error.Message) {
                throw new Exception(error.Message);
            }
            return false;
        };
        XamlObjectCollection.prototype.Remove = function (value) {
            var index = this.IndexOf(value);
            if(index === -1) {
                return false;
            }
            return this.RemoveAt(index);
        };
        XamlObjectCollection.prototype.RemoveAt = function (index) {
            if(index < 0 || index >= this._ht.length) {
                return false;
            }
            var value = this._ht[index];
            this._ht.splice(index, 1);
            this.RemovedFromCollection(value, true);
            this._RaiseItemRemoved(value, index);
            return true;
        };
        XamlObjectCollection.prototype.Clear = function () {
            var old = this._ht;
            //LOOKS USELESS: this._RaiseClearing(old);
            this._ht = [];
            var len = old.length;
            for(var i = 0; i < len; i++) {
                this.RemovedFromCollection(old[i], true);
            }
            this._RaiseCleared();
            return true;
        };
        XamlObjectCollection.prototype.IndexOf = function (value) {
            return this._ht.indexOf(value);
        };
        XamlObjectCollection.prototype.Contains = function (value) {
            return this.IndexOf(value) > -1;
        };
        XamlObjectCollection.prototype.CanAdd = function (value) {
            return true;
        };
        XamlObjectCollection.prototype.AddedToCollection = function (value, error) {
            if(value instanceof Fayde.XamlObject) {
                return value.XamlNode.AttachTo(this.XamlNode, error);
            }
        };
        XamlObjectCollection.prototype.RemovedFromCollection = function (value, isValueSafe) {
            if(value instanceof Fayde.XamlObject) {
                value.XamlNode.Detach();
            }
        };
        XamlObjectCollection.prototype.GetEnumerator = function (reverse) {
            return Fayde.ArrayEx.GetEnumerator(this._ht, reverse);
        };
        XamlObjectCollection.prototype.GetNodeEnumerator = function (reverse) {
            return Fayde.ArrayEx.GetNodeEnumerator(this._ht, reverse);
        };
        XamlObjectCollection.prototype._RaiseItemAdded = function (value, index) {
        };
        XamlObjectCollection.prototype._RaiseItemRemoved = function (value, index) {
        };
        XamlObjectCollection.prototype._RaiseItemReplaced = function (removed, added, index) {
        };
        XamlObjectCollection.prototype._RaiseCleared = //_RaiseClearing(arr: XamlObject[]) { }
        function () {
        };
        XamlObjectCollection.prototype.CloneCore = function (source) {
            var enumerator = Fayde.ArrayEx.GetEnumerator(this._ht);
            while(enumerator.MoveNext()) {
                this.Add(Fayde.Clone(enumerator.Current));
            }
        };
        return XamlObjectCollection;
    })(Fayde.XamlObject);
    Fayde.XamlObjectCollection = XamlObjectCollection;    
    Nullstone.RegisterType(XamlObjectCollection, "XamlObjectCollection", [
        Fayde.IEnumerable_
    ]);
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=XamlObjectCollection.js.map
