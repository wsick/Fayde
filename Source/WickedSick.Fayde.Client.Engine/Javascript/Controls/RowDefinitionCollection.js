/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="../Core/Collections/DependencyObjectCollection.js"/>
/// CODE
/// <reference path="RowDefinition.js"/>

//#region RowDefinitionCollection

function RowDefinitionCollection() {
    if (!Nullstone.IsReady)
        return;
    this.$super();
}
Nullstone.Extend(RowDefinitionCollection, "RowDefinitionCollection", DependencyObjectCollection);

RowDefinitionCollection.prototype.AddedToCollection = function (value, error) {
    if (this.Contains(value)) {
        error.SetErrored(BError.Argument, "RowDefinition is already a member of this collection.");
        return false;
    }
    return this.AddedToCollection$super(value, error);
};

RowDefinitionCollection.prototype.IsElementType = function (value) {
    return value instanceof RowDefinition;
};

//#endregion
