var Fayde;
(function (Fayde) {
    /// <reference path="../Core/XamlObjectCollection.ts" />
    /// CODE
    (function (Shapes) {
        var PointCollection = (function () {
            function PointCollection() {
                this._ht = [];
            }
            Object.defineProperty(PointCollection.prototype, "Count", {
                get: function () {
                    return this._ht.length;
                },
                enumerable: true,
                configurable: true
            });
            PointCollection.FromData = function FromData(data) {
                var pc = new PointCollection();
                pc._ht.concat(Fayde.Media.ParseShapePoints(data));
                return pc;
            };
            PointCollection.prototype.GetValueAt = function (index) {
                return this._ht[index];
            };
            PointCollection.prototype.SetValueAt = function (index, value) {
                if(index < 0 || index >= this._ht.length) {
                    return false;
                }
                var removed = this._ht[index];
                var added = value;
                this._ht[index] = added;
                var owner = this.Owner;
                if(owner) {
                    owner._InvalidateNaturalBounds();
                }
            };
            PointCollection.prototype.Add = function (value) {
                this._ht.push(value);
                var owner = this.Owner;
                if(owner) {
                    owner._InvalidateNaturalBounds();
                }
            };
            PointCollection.prototype.AddRange = function (points) {
                this._ht.concat(points);
                var owner = this.Owner;
                if(owner) {
                    owner._InvalidateNaturalBounds();
                }
            };
            PointCollection.prototype.Insert = function (index, value) {
                if(index < 0) {
                    return;
                }
                var len = this._ht.length;
                if(index > len) {
                    index = len;
                }
                this._ht.splice(index, 0, value);
                var owner = this.Owner;
                if(owner) {
                    owner._InvalidateNaturalBounds();
                }
            };
            PointCollection.prototype.Remove = function (value) {
                var index = this.IndexOf(value);
                if(index === -1) {
                    return;
                }
                this.RemoveAt(index);
                var owner = this.Owner;
                if(owner) {
                    owner._InvalidateNaturalBounds();
                }
            };
            PointCollection.prototype.RemoveAt = function (index) {
                if(index < 0 || index >= this._ht.length) {
                    return;
                }
                var value = this._ht.splice(index, 1)[0];
                var owner = this.Owner;
                if(owner) {
                    owner._InvalidateNaturalBounds();
                }
            };
            PointCollection.prototype.Clear = function () {
                this._ht = [];
                var owner = this.Owner;
                if(owner) {
                    owner._InvalidateNaturalBounds();
                }
            };
            PointCollection.prototype.IndexOf = function (value) {
                var count = this._ht.length;
                for(var i = 0; i < count; i++) {
                    if(Nullstone.Equals(value, this._ht[i])) {
                        return i;
                    }
                }
                return -1;
            };
            PointCollection.prototype.Contains = function (value) {
                return this.IndexOf(value) > -1;
            };
            PointCollection.prototype.GetEnumerator = function (reverse) {
                return Fayde.ArrayEx.GetEnumerator(this._ht, reverse);
            };
            return PointCollection;
        })();
        Shapes.PointCollection = PointCollection;        
        Nullstone.RegisterType(PointCollection, "PointCollection");
    })(Fayde.Shapes || (Fayde.Shapes = {}));
    var Shapes = Fayde.Shapes;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=PointCollection.js.map
