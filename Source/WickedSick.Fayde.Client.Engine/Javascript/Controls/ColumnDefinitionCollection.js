/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="../Core/Collections/DependencyObjectCollection.js"/>
/// CODE
/// <reference path="ColumnDefinition.js"/>

//#region ColumnDefinitionCollection

function ColumnDefinitionCollection() {
    if (!Nullstone.IsReady)
        return;
    this.$super();
}
Nullstone.Extend(ColumnDefinitionCollection, "ColumnDefinitionCollection", DependencyObjectCollection);

ColumnDefinitionCollection.prototype.AddedToCollection = function (value, error) {
    if (this.Contains(value)) {
        error.SetErrored(BError.Argument, "ColumnDefinition is already a member of this collection.");
        return false;
    }
    return this.AddedToCollection$super(value, error);
};
ColumnDefinitionCollection.prototype.IsElementType = function (value) {
    return value instanceof ColumnDefinition;
};

//#endregion
