/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="../Core/Collections/DependencyObjectCollection.js"/>
/// CODE
/// <reference path="ColumnDefinition.js"/>

//#region ColumnDefinitionCollection
var ColumnDefinitionCollection = Nullstone.Create("ColumnDefinitionCollection", DependencyObjectCollection);

ColumnDefinitionCollection.Instance.AddedToCollection = function (value, error) {
    if (this.Contains(value)) {
        error.SetErrored(BError.Argument, "ColumnDefinition is already a member of this collection.");
        return false;
    }
    return this.AddedToCollection$DependencyObjectCollection(value, error);
};
ColumnDefinitionCollection.Instance.IsElementType = function (value) {
    return value instanceof ColumnDefinition;
};

Nullstone.FinishCreate(ColumnDefinitionCollection);
//#endregion