/// <reference path="../Runtime/RefObject.js" />
/// <reference path="TextElement.js"/>
/// CODE
/// <reference path="InlineCollection.js"/>

//#region Block

function Block() {
    TextElement.call(this);
}
Block.InheritFrom(TextElement);

//#region DEPENDENCY PROPERTIES

Block.InlinesProperty = DependencyProperty.Register("Inlines", function () { return InlineCollection; }, Block);
Block.prototype.GetInlines = function () {
    /// <returns type="InlineCollection" />
    return this.GetValue(Block.InlinesProperty);
};
Block.prototype.SetInlines = function (value) {
    /// <param name="value" type="InlineCollection"></param>
    this.SetValue(Block.InlinesProperty, value);
};

//#endregion

//#endregion
