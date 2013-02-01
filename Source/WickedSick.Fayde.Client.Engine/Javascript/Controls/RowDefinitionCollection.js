/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="../Core/Collections/DependencyObjectCollection.js"/>
/// CODE
/// <reference path="RowDefinition.js"/>

(function (namespace) {
    var RowDefinitionCollection = Nullstone.Create("RowDefinitionCollection", Fayde.DependencyObjectCollection);

    RowDefinitionCollection.Instance.AddedToCollection = function (value, error) {
        if (this.Contains(value)) {
            error.SetErrored(BError.Argument, "RowDefinition is already a member of this collection.");
            return false;
        }
        return this.AddedToCollection$DependencyObjectCollection(value, error);
    };

    RowDefinitionCollection.Instance.IsElementType = function (value) {
        return value instanceof namespace.RowDefinition;
    };

    namespace.RowDefinitionCollection = Nullstone.FinishCreate(RowDefinitionCollection);
})(Nullstone.Namespace("Fayde.Controls"));