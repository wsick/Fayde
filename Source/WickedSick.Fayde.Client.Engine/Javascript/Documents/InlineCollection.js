/// <reference path="TextElementCollection.js"/>
/// CODE

//#region InlineCollection

function InlineCollection() {
    TextElementCollection.call(this);
}
InlineCollection.InheritFrom(TextElementCollection);

//#endregion

//#region InlineCollection

function InlineCollection() {
    TextElementCollection.call(this);
}
InlineCollection.InheritFrom(TextElementCollection);

InlineCollection.prototype.AddedToCollection = function (value, error) {
    if (this._ForHyperlink) {
        if (false) { //TODO: if (!this._IsValueSupportedInHyperlinkn(value)) {
            error.SetErrored(BError.Argument, "Invalid value in Hyperlink");
            return false;
        }
    }
    return TextElementCollection.prototype.AddedToCollection.call(this, value, error);
};
InlineCollection.prototype.Equals = function (inlines) {
    NotImplemented("InlineCollection.Equals");
};
InlineCollection.prototype.IsElementType = function (value) {
    return value instanceof Inline;
};
InlineCollection.prototype._SetIsForHyperlink = function () { this._ForHyperlink = true; };

//#endregion