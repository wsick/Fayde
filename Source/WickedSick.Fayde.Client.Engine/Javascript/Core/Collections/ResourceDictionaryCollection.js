/// <reference path="../../Runtime/Nullstone.js" />
/// <reference path="DependencyObjectCollection.js"/>
/// CODE
/// <reference path="ResourceDictionary.js"/>

//#region ResourceDictionaryCollection
var ResourceDictionaryCollection = Nullstone.Create("ResourceDictionaryCollection", DependencyObjectCollection);

ResourceDictionaryCollection.Instance.AddedToCollection = function (value, error) {
    if (!this.AddedToCollection$DependencyObjectCollection(value, error))
        return false;
    var parent = this._Parent;
    if (!parent)
        return true;

    return this._WalkSubtreeLookingForCycle(value, parent, error);
};
ResourceDictionaryCollection.Instance.IsElementType = function (value) {
    return value instanceof ResourceDictionary;
};
ResourceDictionaryCollection.Instance._WalkSubtreeLookingForCycle = function (subtreeRoot, firstAncestor, error) {
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
        p = p._Parent;
    }

    var children = subtreeRoot.MergedDictionaries;
    var count = children.GetCount();
    for (var i = 0; i < count; i++) {
        if (!this._WalkSubtreeLookingForCycle(children.GetValueAt(i), firstAncestor, error))
            return false;
    }

    return true;
};

Nullstone.FinishCreate(ResourceDictionaryCollection);
//#endregion