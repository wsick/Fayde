/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="TextElement.js"/>
/// CODE
/// <reference path="BlockCollection.js"/>

(function (namespace) {
    var Section = Nullstone.Create("Section", TextElement);

    //#region Properties

    Section.BlocksProperty = DependencyProperty.Register("Blocks", function () { return BlockCollection; }, Section);

    Nullstone.AutoProperties(Section, [
        Section.BlocksProperty
    ]);

    //#endregion

    namespace.Section = Nullstone.FinishCreate(Section);
})(window);