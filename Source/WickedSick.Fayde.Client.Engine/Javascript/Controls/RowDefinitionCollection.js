/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="../Core/Collections/DependencyObjectCollection.js"/>
/// CODE
/// <reference path="RowDefinition.js"/>

//#region RowDefinitionCollection
var RowDefinitionCollection = Nullstone.Create("RowDefinitionCollection", DependencyObjectCollection);

RowDefinitionCollection.Instance.AddedToCollection = function (value, error) {
    if (this.Contains(value)) {
        error.SetErrored(BError.Argument, "RowDefinition is already a member of this collection.");
        return false;
    }
    return this.AddedToCollection$super(value, error);
};

RowDefinitionCollection.Instance.IsElementType = function (value) {
    return value instanceof RowDefinition;
};

Nullstone.FinishCreate(RowDefinitionCollection);
//#endregion