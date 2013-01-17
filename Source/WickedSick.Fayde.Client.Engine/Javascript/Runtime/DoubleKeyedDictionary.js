/// <reference path="Nullstone.js" />
/// <reference path="Dictionary.js" />
/// CODE

(function (namespace) {
    var DoubleKeyedDictionary = Nullstone.Create("DoubleKeyedDictionary", undefined, 2);

    DoubleKeyedDictionary.Instance.Init = function (type1, type2) {
        this._forward = new Dictionary(type1, type2);
        this._backward = new Dictionary(type2, type1);
    };

    DoubleKeyedDictionary.Instance.GetValueFromKey1 = function (key1) {
        var result = {};
        if (this._forward.TryGetValue(key1, result))
            return result.Value;
        return null;
    };
    DoubleKeyedDictionary.Instance.GetValueFromKey2 = function (key2) {
        var result = {};
        if (this._backward.TryGetValue(key2, result))
            return result.Value;
        return null;
    };

    DoubleKeyedDictionary.Instance.Add = function (key1, key2, ignoreExisting) {
        var result = {};
        if (!ignoreExisting && (this._forward.TryGetValue(key1, result) || this._backward.TryGetValue(key2, result))) {
            //throw new InvalidOperationException("Dictionary already contains this key pair");
        }
        this._forward.Add(key1, key2);
        this._backward.Add(key2, key1);
    };

    DoubleKeyedDictionary.Instance.Clear = function () {
        this._forward.Clear();
        this._backward.Clear();
    };

    DoubleKeyedDictionary.Instance.Remove = function (key1, key2, ignoreExisting) {
        var result = {};
        if (!ignoreExisting && (!this._forward.TryGetValue(key1, result) || !this._backward.TryGetValue(key2, result))) {
            throw new InvalidOperationException("Dictionary does not contain this key pair");
        }
        this._forward.Remove(key1);
        this._backward.Remove(key2);
    };

    DoubleKeyedDictionary.Instance.MapFromKey1 = function (key1) {
        var data = {};
        if (this._forward.TryGetValue(key1, data))
            return data.Value;
        return null;
    };
    DoubleKeyedDictionary.Instance.MapFromKey2 = function (key2) {
        var data = {};
        if (this._backward.TryGetValue(key2, data))
            return data.Value;
        return null;
    };

    namespace.DoubleKeyedDictionary = Nullstone.FinishCreate(DoubleKeyedDictionary);
})(window);