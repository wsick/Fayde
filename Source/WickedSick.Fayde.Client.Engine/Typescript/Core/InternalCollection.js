var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="XamlObject.ts" />
/// <reference path="../Runtime/Enumerable.ts" />
/// CODE
/// <reference path="../Runtime/BError.ts" />
var Fayde;
(function (Fayde) {
    var InternalCollection = (function (_super) {
        __extends(InternalCollection, _super);
        function InternalCollection() {
            _super.apply(this, arguments);

            this._ht = [];
            this._listeners = [];
        }
        Object.defineProperty(InternalCollection.prototype, "Count", {
            get: function () {
                return this._ht.length;
            },
            enumerable: true,
            configurable: true
        });
        InternalCollection.prototype.GetValueAt = function (index) {
            return this._ht[index];
        };
        InternalCollection.prototype.SetValueAt = function (index, value) {
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
        InternalCollection.prototype.Add = function (value) {
            var rv = this.Insert(this._ht.length, value);
            return rv ? this._ht.length - 1 : -1;
        };
        InternalCollection.prototype.Insert = function (index, value) {
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
        InternalCollection.prototype.Remove = function (value) {
            var index = this.IndexOf(value);
            if(index == -1) {
                return false;
            }
            return this.RemoveAt(index);
        };
        InternalCollection.prototype.RemoveAt = function (index) {
            if(index < 0 || index >= this._ht.length) {
                return false;
            }
            var value = this._ht[index];
            this._ht.splice(index, 1);
            this.RemovedFromCollection(value, true);
            this._RaiseItemRemoved(value, index);
            return true;
        };
        InternalCollection.prototype.Clear = function () {
            //LOOKS_USELESS: this._RaiseClearing();
            var old = this._ht;
            this._ht = [];
            for(var i = 0; i < old.length; i++) {
                this.RemovedFromCollection(old[i], true);
            }
            this._RaiseCleared();
            return true;
        };
        InternalCollection.prototype.IndexOf = function (value) {
            var count = this._ht.length;
            for(var i = 0; i < count; i++) {
                if(Nullstone.Equals(value, this._ht[i])) {
                    return i;
                }
            }
            return -1;
        };
        InternalCollection.prototype.Contains = function (value) {
            return this.IndexOf(value) > -1;
        };
        InternalCollection.prototype.CanAdd = function (value) {
            return true;
        };
        InternalCollection.prototype.AddedToCollection = function (value, error) {
            return true;
        };
        InternalCollection.prototype.RemovedFromCollection = function (value, isValueSafe) {
        };
        InternalCollection.prototype.GetEnumerator = function () {
            return Fayde.ArrayEx.GetEnumerator(this._ht);
        };
        InternalCollection.prototype._RaiseItemAdded = function (value, index) {
        };
        InternalCollection.prototype._RaiseItemRemoved = function (value, index) {
        };
        InternalCollection.prototype._RaiseItemReplaced = function (removed, added, index) {
        };
        InternalCollection.prototype._RaiseCleared = //_RaiseClearing() { }
        function () {
        };
        return InternalCollection;
    })(Fayde.XamlObject);
    Fayde.InternalCollection = InternalCollection;    
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=InternalCollection.js.map
