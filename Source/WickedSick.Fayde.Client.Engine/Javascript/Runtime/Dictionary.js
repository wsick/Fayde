/// <reference path="Nullstone.js"/>
/// CODE

(function (namespace) {
    var Dictionary = Nullstone.Create("Dictionary", undefined, 2);

    Dictionary.Instance.Init = function (type1, type2) {
        this._ht = [];
        this._Type1 = type1;
        this._IsKeyNullstone = type1._IsNullstone === true;
        if (this._IsKeyNullstone)
            this._k = [];
        this._Type2 = type2;
        this._IsValueNullstone = type2._IsNullstone === true;
    };

    Dictionary.Instance.TryGetValue = function (key, data) {
        if (this._IsKeyNullstone)
            data.Value = this._ht[key._ID];
        else
            data.Value = this._ht[key];
        return data.Value != null;
    };
    Dictionary.Instance.GetValue = function (key) {
        if (this._IsKeyNullstone)
            return this._ht[key._ID];
        return this._ht[key];
    };
    Dictionary.Instance.GetKeyFromValue = function (value) {
        var len = this._ht.length;
        var func = this._IsValueNullstone ? Nullstone.RefEquals : Nullstone.Equals;
        if (this._IsValueNullstone) {
            for (var keyID in this._ht) {
                if (keyID === value._ID)
                    return this._k[keyID];
            }
        } else {
            for (var key in this._ht) {
                if (Nullstone.Equals(this._ht[key], value)) {
                    if (this._IsKeyNullstone)
                        return this._k[key];
                    return key;
                }
            }
        }
        return null;
    };
    Dictionary.Instance.Add = function (key, value) {
        if (this._IsKeyNullstone) {
            this._k[key._ID] = key;
            this._ht[key._ID] = value;
        } else {
            this._ht[key] = value;
        }
    };
    Dictionary.Instance.Remove = function (key) {
        if (this._IsKeyNullstone) {
            delete this._k[key._ID];
            delete this._ht[key._ID];
        } else {
            delete this._ht[key];
        }
    };
    Dictionary.Instance.Clear = function () {
        this._ht = [];
        delete this._k;
        if (this._IsKeyNullstone)
            this._k = [];
    };

    namespace.Dictionary = Nullstone.FinishCreate(Dictionary);
})(window);