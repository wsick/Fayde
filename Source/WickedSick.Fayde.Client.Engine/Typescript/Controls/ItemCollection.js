var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Fayde;
(function (Fayde) {
    /// <reference path="../Core/DependencyObject.ts" />
    /// CODE
    (function (Controls) {
        var ItemCollection = (function (_super) {
            __extends(ItemCollection, _super);
            function ItemCollection() {
                _super.apply(this, arguments);

                this._ht = [];
                this.ItemsChanged = new MulticastEvent();
                this.PropertyChanged = new MulticastEvent();
                this.IsReadOnly = false;
            }
            ItemCollection.prototype.GetEnumerator = function () {
                return Fayde.ArrayEx.GetEnumerator(this._ht);
            };
            ItemCollection.prototype.ToArray = function () {
                return this._ht.slice(0);
            };
            Object.defineProperty(ItemCollection.prototype, "Count", {
                get: function () {
                    return this._ht.length;
                },
                enumerable: true,
                configurable: true
            });
            ItemCollection.prototype.GetValueAt = function (index) {
                var ht = this._ht;
                if(index < 0 || index >= ht.length) {
                    throw new IndexOutOfRangeException(index);
                }
                return ht[index];
            };
            ItemCollection.prototype.GetRange = function (startIndex, endIndex) {
                return this._ht.slice(startIndex, endIndex);
            };
            ItemCollection.prototype.SetValueAt = function (index, value) {
                this._ValidateReadOnly();
                this.SetValueAtImpl(index, value);
            };
            ItemCollection.prototype.SetValueAtImpl = function (index, value) {
                var ht = this._ht;
                if(index < 0 || index >= ht.length) {
                    throw new IndexOutOfRangeException(index);
                }
                var oldValue = ht[index];
                ht[index] = value;
                this.ItemsChanged.Raise(this, Fayde.Collections.NotifyCollectionChangedEventArgs.Replace(value, oldValue, index));
            };
            ItemCollection.prototype.Add = function (value) {
                this._ValidateReadOnly();
                if(value == null) {
                    throw new ArgumentException("value");
                }
                this.AddImpl(value);
            };
            ItemCollection.prototype.AddImpl = function (value) {
                var index = this._ht.push(value) - 1;
                this.ItemsChanged.Raise(this, Fayde.Collections.NotifyCollectionChangedEventArgs.Add(value, index));
            };
            ItemCollection.prototype.AddRange = function (values) {
                this._ValidateReadOnly();
                if(!values) {
                    return;
                }
                for(var i = 0; i < values.length; i++) {
                    if(values[i] == null) {
                        throw new ArgumentException("value");
                    }
                }
                this.AddRangeImpl(values);
            };
            ItemCollection.prototype.AddRangeImpl = function (values) {
                var index = this._ht.push(values) - 1;
                this.ItemsChanged.Raise(this, Fayde.Collections.NotifyCollectionChangedEventArgs.AddRange(values, index));
            };
            ItemCollection.prototype.Insert = function (value, index) {
                this._ValidateReadOnly();
                if(value == null) {
                    throw new ArgumentException("value");
                }
                this.InsertImpl(value, index);
            };
            ItemCollection.prototype.InsertImpl = function (value, index) {
                var ht = this._ht;
                if(index < 0 || index > ht.length) {
                    throw new IndexOutOfRangeException(index);
                }
                if(index >= ht.length) {
                    ht.push(value);
                } else {
                    ht.splice(index, 0, value);
                }
                this.ItemsChanged.Raise(this, Fayde.Collections.NotifyCollectionChangedEventArgs.Add(value, index));
            };
            ItemCollection.prototype.IndexOf = function (value) {
                return this._ht.indexOf(value);
            };
            ItemCollection.prototype.Contains = function (value) {
                return this._ht.indexOf(value) > 0;
            };
            ItemCollection.prototype.Remove = function (value) {
                this._ValidateReadOnly();
                this.RemoveImpl(value);
            };
            ItemCollection.prototype.RemoveImpl = function (value) {
                var index = this._ht.indexOf(value);
                if(index < 0) {
                    return;
                }
                this._ht.splice(index, 1);
                this.ItemsChanged.Raise(this, Fayde.Collections.NotifyCollectionChangedEventArgs.Remove(value, index));
            };
            ItemCollection.prototype.RemoveAt = function (index) {
                this._ValidateReadOnly();
                if(index < 0 || index >= this._ht.length) {
                    throw new IndexOutOfRangeException(index);
                }
                this.RemoveAtImpl(index);
            };
            ItemCollection.prototype.RemoveAtImpl = function (index) {
                var item = this._ht.splice(index, 1)[0];
                this.ItemsChanged.Raise(this, Fayde.Collections.NotifyCollectionChangedEventArgs.Remove(item, index));
            };
            ItemCollection.prototype.Clear = function () {
                this._ValidateReadOnly();
                this.ClearImpl();
            };
            ItemCollection.prototype.ClearImpl = function () {
                this._ht = [];
                this.ItemsChanged.Raise(this, Fayde.Collections.NotifyCollectionChangedEventArgs.Reset());
            };
            ItemCollection.prototype._ValidateReadOnly = function () {
                if(this.IsReadOnly) {
                    throw new InvalidOperationException("The collection is readonly.");
                }
            };
            return ItemCollection;
        })(Fayde.DependencyObject);
        Controls.ItemCollection = ItemCollection;        
        Nullstone.RegisterType(ItemCollection, "ItemCollection");
    })(Fayde.Controls || (Fayde.Controls = {}));
    var Controls = Fayde.Controls;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=ItemCollection.js.map
