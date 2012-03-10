/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="TextElementCollection.js"/>
/// CODE

//#region InlineCollection
var InlineCollection = Nullstone.Create("InlineCollection", TextElementCollection);

InlineCollection.Instance.AddedToCollection = function (value, error) {
    if (this._ForHyperlink) {
        if (false) { //TODO: if (!this._IsValueSupportedInHyperlinkn(value)) {
            error.SetErrored(BError.Argument, "Invalid value in Hyperlink");
            return false;
        }
    }
    return this.AddedToCollection$TextElementCollection(value, error);
};
InlineCollection.Instance.Equals = function (inlines) {
    NotImplemented("InlineCollection.Equals");
};
InlineCollection.Instance.IsElementType = function (value) {
    return value instanceof Inline;
};
InlineCollection.Instance._SetIsForHyperlink = function () { this._ForHyperlink = true; };

Nullstone.FinishCreate(InlineCollection);
//#endregion