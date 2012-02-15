/// <reference path="DependencyObjectCollection.js"/>
/// CODE
/// <reference path="ResourceDictionary.js"/>

//#region ResourceDictionaryCollection

function ResourceDictionaryCollection() {
    DependencyObjectCollection.call(this);
}
ResourceDictionaryCollection.InheritFrom(DependencyObjectCollection);

ResourceDictionaryCollection.prototype.AddedToCollection = function (value, error) {
    if (!DependencyObjectCollection.prototype.AddedToCollection.call(this, value, error))
        return false;
    var parent = this._GetParent();
    if (!parent)
        return true;

    return this._WalkSubtreeLookingForCycle(value, parent, error);
};
ResourceDictionaryCollection.prototype.IsElementType = function (value) {
    return value instanceof ResourceDictionary;
};
ResourceDictionaryCollection.prototype._WalkSubtreeLookingForCycle = function (subtreeRoot, firstAncestor, error) {
    var source = subtreeRoot._GetInternalSource();

    var p = firstAncestor;
    while (p) {
        if (p instanceof ResourceDictionary) {
            var cycleFound = false;
            var rdSource = p._GetInternalSource();
            if (p == subtreeRoot)
                cycleFound = true;
            else if (source && rdSource && !source.localeCompare(rdSource))
                cycleFound = true;

            if (cycleFound) {
                error.SetErrored(BError.InvalidOperation, "Cycle found in resource dictionaries.");
                return false;
            }
        }
        p = p._GetParent();
    }

    var children = subtreeRoot.GetMergedDictionaries();
    for (var i = 0; i < children.GetCount(); i++) {
        if (!this._WalkSubtreeLookingForCycle(children.GetValueAt(i), firstAncestor, error))
            return false;
    }

    return true;
};

//#endregion