/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="TextElement.js"/>
/// CODE
/// <reference path="BlockCollection.js"/>

//#region Section
var Section = Nullstone.Create("Section", TextElement);

//#region Dependency Properties

Section.BlocksProperty = DependencyProperty.Register("Blocks", function () { return BlockCollection; }, Section);

Nullstone.AutoProperties(Section, [
    Section.BlocksProperty
]);

//#endregion

Nullstone.FinishCreate(Section);
//#endregion