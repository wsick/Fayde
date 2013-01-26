/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="TextElement.js"/>
/// CODE
/// <reference path="Block.js"/>

(function (namespace) {
    var Section = Nullstone.Create("Section", namespace.TextElement);

    //#region Properties

    Section.BlocksProperty = DependencyProperty.Register("Blocks", function () { return namespace.BlockCollection; }, Section);

    Nullstone.AutoProperties(Section, [
        Section.BlocksProperty
    ]);

    //#endregion

    namespace.Section = Nullstone.FinishCreate(Section);
})(Nullstone.Namespace("Fayde.Documents"));