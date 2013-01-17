/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="TextElement.js"/>
/// CODE
/// <reference path="InlineCollection.js"/>

(function (namespace) {
    var Block = Nullstone.Create("Block", TextElement);

    //#region Properties

    Block.InlinesProperty = DependencyProperty.Register("Inlines", function () { return InlineCollection; }, Block);

    Nullstone.AutoProperties(Block, [
        Block.InlinesProperty
    ]);

    //#endregion

    namespace.Block = Nullstone.FinishCreate(Block);
})(window);