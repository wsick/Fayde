/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="TextElement.js"/>
/// CODE
/// <reference path="BlockCollection.js"/>

//#region Section
var Section = Nullstone.Create("Section", TextElement);

//#region DEPENDENCY PROPERTIES

Section.BlocksProperty = DependencyProperty.Register("Blocks", function () { return BlockCollection; }, Section);
Section.Instance.GetBlocks = function () {
    /// <returns type="BlockCollection" />
    return this.$GetValue(Section.BlocksProperty);
};
Section.Instance.SetBlocks = function (value) {
    /// <param name="value" type="BlockCollection"></param>
    this.SetValue(Section.BlocksProperty, value);
};

//#endregion

Nullstone.FinishCreate(Section);
//#endregion