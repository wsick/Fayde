/// <reference path="Primitives.js"/>
/// <reference path="Debug.js"/>

//#region TextLayout

TextLayout.prototype = new Object;
TextLayout.prototype.constructor = TextLayout;
function TextLayout() {
    this._SelectionStart = 0;
    this._SelectionLength = 0;
    
    this._Strategy = LineStackingStrategy.MaxHeight;
    this._Alignment = TextAlignment.Left;
    this._Trimming = TextTrimming.None;
    this._Wrapping = TextWrapping.NoWrap;

    this._AvailableWidth = Number.POSITIVE_INFINITY;
    this._MaxHeight = Number.POSITIVE_INFINITY;
    this._MaxWidth = Number.POSITIVE_INFINITY;
    this._BaseDescent = 0.0;
    this._BaseHeight = 0.0;
    this._ActualHeight = NaN;
    this._ActualWidth = NaN;
    this._LineHeight = NaN;
    this._Attributes = null;
    this._Lines = new Array();
    this._IsWrapped = true;
    this._Text = null;
    this._Length = 0;
    this._Count = 0;
}
TextLayout.prototype.GetSelectionLength = function () {
    return this._SelectionLength;
};
TextLayout.prototype.GetSelectionStart = function () {
    return this._SelectionStart;
};
TextLayout.prototype.GetLineStackingStrategy = function () {
    return this._Strategy;
};
TextLayout.prototype.SetLineStackingStrategy = function (value) {
    if (this._Strategy == value)
        return false;
    this._Strategy = value;
    this._ResetState();
    return true;
};
TextLayout.prototype.GetTextAttributes = function () {
    return this._Attributes;
};
TextLayout.prototype.SetTextAttributes = function (value) {
    if (this._Attributes) {
        this._Attributes._Clear(true);
    }
    this._Attributes = value;
    this._ResetState();
    return true;
};
TextLayout.prototype.GetTextAlignment = function () {
    return this._Alignment;
};
TextLayout.prototype.SetTextAlignment = function (value) {
    if (this._Alignment == value)
        return false;
    this._Alignment = alignment;
    this._ResetState();
    return true;
};
TextLayout.prototype.GetTextTrimming = function () {
    return this._Trimming;
};
TextLayout.prototype.SetTextTrimming = function (value) {
    if (this._Trimming == value)
        return false;
    this._Trimming = value;
    this._ResetState();
    return true;
};
TextLayout.prototype.GetTextWrapping = function () {
    return this._Wrapping;
};
TextLayout.prototype.SetTextWrapping = function (value) {
    switch (value) {
        case TextWrapping.NoWrap:
        case TextWrapping.Wrap:
            break;
        default:
            value = TextWrapping.Wrap;
            break;
    }

    if (this._Wrapping == value)
        return false;
    this._Wrapping = value;
    this._ResetState();
    return true;
};
TextLayout.prototype.GetLineHeight = function () {
    return this._LineHeight;
};
TextLayout.prototype.SetLineHeight = function (value) {
    if (this._LineHeight == value)
        return false;
    this._LineHeight = value;
    this._ResetState();
    return true;
};
TextLayout.prototype.GetMaxHeight = function () {
    return this._MaxHeight;
};
TextLayout.prototype.SetMaxHeight = function (value) {
    if (this._MaxHeight == value)
        return false;
    this._MaxHeight  = value;
    this._ResetState();
    return true;
};
TextLayout.prototype.GetMaxWidth = function () {
    return this._MaxWidth;
};
TextLayout.prototype.SetMaxWidth = function (value) {
    if (value == 0.0)
        value = Number.POSITIVE_INFINITY;
    if (this._MaxWidth == value)
        return false;
    if (!this._IsWrapped && (!isFinite(value) || value > this._ActualWidth)) {
        this._MaxWidth = value;
        return false;
    }
    this._MaxWidth = value;
    this._ResetState();
    return true;
};
TextLayout.prototype.GetAvailableWidth = function () {
    return this._AvailableWidth;
};
TextLayout.prototype.SetAvailableWidth = function (value) {
    this._AvailableWidth = value;
    return false;
};
TextLayout.prototype.GetText = function () {
    return this._Text;
};
TextLayout.prototype.SetText = function (value, length) {
    if (this._Text) {
        this._Text = value;
        this._Length = length == -1 ? value.length : length;
    } else {
        this._Text = null;
        this._Length = 0;
    }
    this._Count = -1;
    this._ResetState();
    return true;
};

TextLayout.prototype._ClearLines = function () {
    this._Lines = new Array();
};
TextLayout.prototype._ResetState = function () {
    this._ActualHeight = NaN;
    this._ActualWidth = NaN;
};
TextLayout.prototype.GetRenderExtents = function () {
    this.Layout();
    return new Rect(this._HorizontalAlignment(this._ActualWidth), 0.0, this._ActualWidth, this._ActualHeight);
};
TextLayout.prototype.GetActualExtents = function () {
    return new Size(this._ActualWidth, this._ActualHeight);
};
TextLayout.prototype.Layout = function () {
    NotImplemented("TextLayout.Layout");
};
TextLayout.prototype._HorizontalAlignment = function (lineWidth) {
    var deltax = 0.0;
    var width;
    switch (this._Alignment) {
        case TextAlignment.Center:
            width = TextLayout._GetWidthConstraint(this._AvailableWidth, this._MaxWidth, this._ActualWidth);
            if (lineWidth < width)
                deltax = (width - lineWidth) / 2.0;
            break;
        case TextAlignment.Right:
            width = TextLayout._GetWidthConstraint(this._AvailableWidth, this._MaxWidth, this._ActualWidth);
            if (lineWidth < width)
                deltax = width - lineWidth;
            break;
    }
    return deltax;
};

TextLayout._GetWidthConstraint = function (availWidth, maxWidth, actualWidth) {
    if (!isFinite(availWidth)) {
        if (!isFinite(maxWidth))
            return actualWidth;
        else
            return Math.min(actualWidth, maxWidth);
    }
    return availWidth;
};

//#endregion

//#region _TextLayoutLine

_TextLayoutLine.prototype = new Object;
_TextLayoutLine.prototype.constructor = _TextLayoutLine;
function _TextLayoutLine(layout, start, offset) {
    this._Runs = new Array();
    this._Layout = layout;
    this._Start = start;
    this._Offset = offset;
    this._Advance = 0.0;
    this._Descend = 0.0;
    this._Height = 0.0;
    this._Width = 0.0;
    this._Length = 0;
    this._Count = 0;
}

//#endregion

//#region _TextLayoutRun

_TextLayoutRun.prototype = new Object;
_TextLayoutRun.prototype.constructor = _TextLayoutRun;
function _TextLayoutRun(line, attrs, start) {
    this._Clusters = new Array();
    this._Attrs = attrs;
    this._Start = start;
    this._Line = line;
    this._Advance = 0.0;
    this._Length = 0;
    this._Count = 0;
}
_TextLayoutRun.prototype._GenerateCache = function () {
    NotImplemented("_TextLayoutRun._GenerateCache");
};
_TextLayoutRun.prototype._ClearCache = function () {
    this._Clusters = new Array();
};

//#endregion