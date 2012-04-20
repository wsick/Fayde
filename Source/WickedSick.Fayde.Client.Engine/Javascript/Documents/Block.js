/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="TextElement.js"/>
/// CODE
/// <reference path="InlineCollection.js"/>

//#region Block
var Block = Nullstone.Create("Block", TextElement);

//#region DEPENDENCY PROPERTIES

Block.InlinesProperty = DependencyProperty.Register("Inlines", function () { return InlineCollection; }, Block);
Block.Instance.GetInlines = function () {
    /// <returns type="InlineCollection" />
    return this.$GetValue(Block.InlinesProperty);
};
Block.Instance.SetInlines = function (value) {
    /// <param name="value" type="InlineCollection"></param>
    this.$SetValue(Block.InlinesProperty, value);
};

//#endregion

Nullstone.FinishCreate(Block);
//#endregion