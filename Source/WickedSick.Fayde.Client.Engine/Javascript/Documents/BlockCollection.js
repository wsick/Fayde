/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="TextElementCollection.js"/>
/// CODE

(function (namespace) {
    var BlockCollection = Nullstone.Create("BlockCollection", TextElementCollection);
    namespace.BlockCollection = Nullstone.FinishCreate(BlockCollection);
})(window);