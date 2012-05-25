/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="TextElement.js"/>
/// CODE
/// <reference path="InlineCollection.js"/>

//#region Block
var Block = Nullstone.Create("Block", TextElement);

//#region Dependency Properties

Block.InlinesProperty = DependencyProperty.Register("Inlines", function () { return InlineCollection; }, Block);

Nullstone.AutoProperties(Block, [
    Block.InlinesProperty
]);

//#endregion

Nullstone.FinishCreate(Block);
//#endregion