/// <reference path="Nullstone.js" />
/// <reference path="Dictionary.js" />
/// CODE

//#region DoubleKeyedDictionary

var DoubleKeyedDictionary = Nullstone.Create("DoubleKeyedDictionary");

DoubleKeyedDictionary.Instance.Init = function () {
    this._forward = new Dictionary();
    this._backward = new Dictionary();
};

DoubleKeyedDictionary.Instance.GetValueFromKey1 = function (key2) {
    var result = {};
    if (this._backward.TryGetValue(key2, result)) {
        return result.Value;
    }
    return null;
};

DoubleKeyedDictionary.Instance.GetValueFromKey2 = function (key1) {
    var result = {};
    if (this._forward.TryGetValue(key1, result)) {
        return result.Value;
    }
    return null;
};

DoubleKeyedDictionary.Instance.Add = function (key1, key2) {
    this.Add(key1, key2, false);
};

DoubleKeyedDictionary.Instance.Add = function (key1, key2, ignoreExisting) {
    var result = {};
    if (!ignoreExisting && (this._forward.TryGetValue(key1, result) || this._backward.TryGetValue(key2, result))) {
        throw new InvalidOperationException("Dictionary already contains this key pair");
    }
    this._forward.Add(key1, key2);
    this._backward.Add(key2, key1);
};

DoubleKeyedDictionary.Instance.Clear = function () {
    this._forward.Clear();
    this._backward.Clear();
};

DoubleKeyedDictionary.Instance.Remove = function (key1, key2) {
    this.Remove(key1, key2, false);
};

DoubleKeyedDictionary.Instance.Remove = function (key1, key2, ignoreExisting) {
    var result = {};
    if (!ignoreExisting && (!this._forward.TryGetValue(key1, result) || !this._backward.TryGetValue(key2, result))) {
        throw new InvalidOperationException("Dictionary does not contain this key pair");
    }
    this._forward.Remove(key1);
    this._backward.Remove(key2);
};

DoubleKeyedDictionary.Instance.TryMapFromKey1 = function (key1, key2) {
    return this._forward.TryGetValue(key1, key2);
};

DoubleKeyedDictionary.Instance.TryMapFromKey2 = function (key2, key1) {
    return this._backward.TryGetValue(key2, key1);
};

Nullstone.FinishCreate(DoubleKeyedDictionary);

//#endregion