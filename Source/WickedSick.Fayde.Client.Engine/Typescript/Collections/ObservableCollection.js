var Fayde;
(function (Fayde) {
    /// <reference path="INotifyCollectionChanged.ts" />
    /// <reference path="../Runtime/Enumerable.ts" />
    /// CODE
    /// <reference path="NotifyCollectionChangedEventArgs.ts" />
    (function (Collections) {
        var ObservableCollection = (function () {
            function ObservableCollection() {
                this._ht = [];
                this.CollectionChanged = new MulticastEvent();
                this.PropertyChanged = new MulticastEvent();
            }
            ObservableCollection.prototype.GetEnumerator = function () {
                return Fayde.ArrayEx.GetEnumerator(this._ht);
            };
            Object.defineProperty(ObservableCollection.prototype, "Count", {
                get: function () {
                    return this._ht.length;
                },
                enumerable: true,
                configurable: true
            });
            ObservableCollection.prototype.GetValueAt = function (index) {
                var ht = this._ht;
                if(index < 0 || index >= ht.length) {
                    throw new IndexOutOfRangeException(index);
                }
                return ht[index];
            };
            ObservableCollection.prototype.SetValueAt = function (index, value) {
                var ht = this._ht;
                if(index < 0 || index >= ht.length) {
                    throw new IndexOutOfRangeException(index);
                }
                var oldValue = ht[index];
                ht[index] = value;
                this.CollectionChanged.Raise(this, Collections.NotifyCollectionChangedEventArgs.Replace(value, oldValue, index));
            };
            ObservableCollection.prototype.Add = function (value) {
                var index = this._ht.push(value) - 1;
                this.CollectionChanged.Raise(this, Collections.NotifyCollectionChangedEventArgs.Add(value, index));
                this._RaisePropertyChanged("Count");
            };
            ObservableCollection.prototype.AddRange = function (values) {
                var index = this._ht.length;
                var len = values.length;
                for(var i = 0; i < len; i++) {
                    this._ht.push(values[i]);
                }
                this.CollectionChanged.Raise(this, Collections.NotifyCollectionChangedEventArgs.AddRange(values, index));
                this._RaisePropertyChanged("Count");
            };
            ObservableCollection.prototype.Insert = function (value, index) {
                var ht = this._ht;
                if(index < 0 || index > ht.length) {
                    throw new IndexOutOfRangeException(index);
                }
                if(index >= ht.length) {
                    ht.push(value);
                } else {
                    ht.splice(index, 0, value);
                }
                this.CollectionChanged.Raise(this, Collections.NotifyCollectionChangedEventArgs.Add(value, index));
                this._RaisePropertyChanged("Count");
            };
            ObservableCollection.prototype.IndexOf = function (value) {
                return this._ht.indexOf(value);
            };
            ObservableCollection.prototype.Contains = function (value) {
                return this._ht.indexOf(value) > 0;
            };
            ObservableCollection.prototype.Remove = function (value) {
                var index = this._ht.indexOf(value);
                if(index < 0) {
                    return;
                }
                this._ht.splice(index, 1);
                this.CollectionChanged.Raise(this, Collections.NotifyCollectionChangedEventArgs.Remove(value, index));
                this._RaisePropertyChanged("Count");
            };
            ObservableCollection.prototype.RemoveAt = function (index) {
                if(index < 0 || index >= this._ht.length) {
                    throw new IndexOutOfRangeException(index);
                }
                var item = this._ht.splice(index, 1)[0];
                this.CollectionChanged.Raise(this, Collections.NotifyCollectionChangedEventArgs.Remove(item, index));
                this._RaisePropertyChanged("Count");
            };
            ObservableCollection.prototype.Clear = function () {
                this._ht = [];
                this.CollectionChanged.Raise(this, Collections.NotifyCollectionChangedEventArgs.Reset());
                this._RaisePropertyChanged("Count");
            };
            ObservableCollection.prototype._RaisePropertyChanged = function (propertyName) {
                this.PropertyChanged.Raise(this, new Fayde.PropertyChangedEventArgs(propertyName));
            };
            return ObservableCollection;
        })();
        Collections.ObservableCollection = ObservableCollection;        
        Nullstone.RegisterType(ObservableCollection, "ObservableCollection", [
            Fayde.IEnumerable_, 
            Collections.INotifyCollectionChanged_, 
            Fayde.INotifyPropertyChanged_
        ]);
    })(Fayde.Collections || (Fayde.Collections = {}));
    var Collections = Fayde.Collections;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=ObservableCollection.js.map
