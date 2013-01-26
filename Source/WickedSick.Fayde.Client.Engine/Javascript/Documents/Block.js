/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="TextElement.js"/>
/// CODE
/// <reference path="Inline.js"/>

(function (namespace) {
    var Block = Nullstone.Create("Block", namespace.TextElement);

    //#region Properties

    Block.InlinesProperty = DependencyProperty.Register("Inlines", function () { return namespace.InlineCollection; }, Block);

    Nullstone.AutoProperties(Block, [
        Block.InlinesProperty
    ]);

    //#endregion

    namespace.Block = Nullstone.FinishCreate(Block);
})(Nullstone.Namespace("Fayde.Documents"));

(function (namespace) {
    var BlockCollection = Nullstone.Create("BlockCollection", namespace.TextElementCollection);
    BlockCollection.Instance.IsElementType = function (value) {
        return value instanceof namespace.Block;
    };
    namespace.BlockCollection = Nullstone.FinishCreate(BlockCollection);
})(Nullstone.Namespace("Fayde.Documents"));