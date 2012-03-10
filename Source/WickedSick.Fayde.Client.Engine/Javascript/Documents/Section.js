/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="TextElement.js"/>
/// CODE
/// <reference path="BlockCollection.js"/>

//#region Section

function Section() {
    if (!Nullstone.IsReady)
        return;
    this.$super();
}
Nullstone.Extend(Section, "Section", TextElement);

//#region DEPENDENCY PROPERTIES

Section.BlocksProperty = DependencyProperty.Register("Blocks", function () { return BlockCollection; }, Section);
Section.prototype.GetBlocks = function () {
    /// <returns type="BlockCollection" />
    return this.GetValue(Section.BlocksProperty);
};
Section.prototype.SetBlocks = function (value) {
    /// <param name="value" type="BlockCollection"></param>
    this.SetValue(Section.BlocksProperty, value);
};

//#endregion

//#endregion
