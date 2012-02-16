/// <reference path="../Runtime/RefObject.js" />
/// <reference path="../Core/Collections/DependencyObjectCollection.js"/>
/// CODE
/// <reference path="RowDefinition.js"/>

//#region RowDefinitionCollection

function RowDefinitionCollection() {
    DependencyObjectCollection.call(this);
}
RowDefinitionCollection.InheritFrom(DependencyObjectCollection);

RowDefinitionCollection.prototype.AddedToCollection = function (value, error) {
    if (this.Contains(value)) {
        error.SetErrored(BError.Argument, "RowDefinition is already a member of this collection.");
        return false;
    }
    return DependencyObjectCollection.prototype.AddedToCollection.call(this, value, error);
};

RowDefinitionCollection.prototype.IsElementType = function (value) {
    return value instanceof RowDefinition;
};

//#endregion
