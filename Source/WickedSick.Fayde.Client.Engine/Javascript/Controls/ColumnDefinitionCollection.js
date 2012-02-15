/// <reference path="../Core/Collections/DependencyObjectCollection.js"/>
/// CODE
/// <reference path="ColumnDefinition.js"/>

//#region ColumnDefinitionCollection

function ColumnDefinitionCollection() {
    DependencyObjectCollection.call(this);
}
ColumnDefinitionCollection.InheritFrom(DependencyObjectCollection);

ColumnDefinitionCollection.prototype.AddedToCollection = function (value, error) {
    if (this.Contains(value)) {
        error.SetErrored(BError.Argument, "ColumnDefinition is already a member of this collection.");
        return false;
    }
    return DependencyObjectCollection.prototype.AddedToCollection.call(this, value, error);
};
ColumnDefinitionCollection.prototype.IsElementType = function (value) {
    return value instanceof ColumnDefinition;
};

//#endregion