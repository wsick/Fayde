/// <reference path="Primitives.js"/>
/// <reference path="Debug.js"/>
/// <reference path="List.js"/>
/// <reference path="Surface.js"/>

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

TextLayout.prototype.GetBaselineOffset = function () {
    if (this._Lines.length == 0)
        return 0;
    var line = this._Lines[0];
    return line._Height + line._Descend;
};
TextLayout.prototype.OverrideLineHeight = function () {
    return this.GetLineStackingStrategy() == LineStackingStrategy.BlockLineHeight && this.GetLineHeight() != 0;
};
TextLayout.prototype.GetLineHeightOverride = function () {
    if (isNaN(this.GetLineHeight()))
        return this._BaseHeight;
    return this.GetLineHeight();
};
TextLayout.prototype.GetDescendOverride = function () {
    if (isNaN(this.GetLineHeight()))
        return this._BaseDescent;

    if (this._BaseHeight == 0.0)
        return 0.0;

    return this.GetLineHeight() * (this._BaseDescent / this._BaseHeight);
}

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
    if (!isNaN(this._ActualWidth))
        return;

    this._ActualHeight = 0.0;
    this._ActualWidth = 0.0;
    this._IsWrapped = false;
    this._ClearLines();
    this._Count = 0;

    if (this._Text == null || !TextLayout._ValidateAttrs(this._Attributes))
        return;

    var word = new _LayoutWord();
    if (this._Wrapping === TextWrapping.Wrap)
        word._BreakOps = new Array();
    else
        word._BreakOps = null;

    var layoutWordFunc = this._Wrapping === TextWrapping.NoWrap ? TextLayout._LayoutWordNoWrap : TextLayout._LayoutWordWrap;

    var line = new _TextLayoutLine(this, 0, 0);
    if (this.OverrideLineHeight()) {
        line._Descend = this.GetDescendOverride();
        line._Height = this.GetLineHeightOverride();
    }
    this._Lines.push(line);

    var index = 0;
    var attrs = this._Attributes.First();
    var nattrs;
    var end;
    var run;
    do {
        nattrs = attrs.Next;
        end = nattrs ? nattrs._Start : this._Length;
        run = new _TextLayoutRun(line, attrs, index);
        line._Runs.push(run);

        word._Font = attrs.GetFont();

        if (c == null) {
            if (!this.OverrideLineHeight()) {
                line._Descend = Math.min(line._Descend, font._Descender());
                line._Height = Math.max(line._Height, font._Height());
            }
            this._ActualHeight += line._Height;
            break;
        }

        //layout until attrs change
        while (index < end) {
            var linebreak = false;
            var wrapped = false;

            //layout until end of line or max width reached
            while (index < end) {
                var lineBreakLength = TextLayout.IsLineBreak(this._Text.slice(index, end - index));
                if (lineBreakLength > 0) {
                    if (line._Length == 0 && !this.OverrideLineHeight()) {
                        line._Descend = font._Descender();
                        line._Height = font._Height();
                    }

                    line._Length += lineBreakLength; //bytes
                    run._Length += lineBreakLength; //bytes
                    line._Count += lineBreakLength; //chars
                    run._Count += lineBreakLength; //chars
                    index += lineBreakLength;
                    linebreak = true;
                    break;
                }

                word._LineAdvance = line._Advance;
                if (layoutWordFunc(word, this._Text.slice(index, end - index), this._MaxWidth)) {
                    this._IsWrapped = true;
                    wrapped = true;
                }

                if (word._Length > 0) {
                    //append the word to the run/line
                    if (!this.OverrideLineHeight()) {
                        line._Descend = Math.min(line._Descend, font._Descender());
                        line._Height = Math.max(line._Height, font._Height());
                    }

                    line._Advance += word._Advance;
                    run._Advance += word._Advance;
                    line._Width = line._Advance;
                    line._Length += word._Length;
                    run._Length += word._Length;
                    line._Count += word._Count;
                    run._Count += word._Count;

                    index += word._Count;
                }

                if (wrapped)
                    break;

                word._LineAdvance = line._Advance;
                TextLayout._LayoutLwsp(word, this._Text.slice(index, end - index));

                if (word._Length > 0) {
                    if (!this.OverrideLineHeight()) {
                        line._Descend = Math.min(line._Descend, font._Descender());
                        line._Height = Math.max(line._Height, font._Height());
                    }

                    line._Advance += word._Advance;
                    run._Advance += word._Advance;
                    line._Width = line._Advance;
                    line._Length += word._Length;
                    run._Length += word._Length;
                    line._Count += word._Count;
                    run._Count += word._Count;

                    index += word._Count;
                }
            }

            var atend = this._Text.slice(index, end - index).length < 1;
            if (linebreak || wrapped || atend) {
                this._ActualWidth = Math.max(this._ActualWidth, atend ? line._Advance : line._Width);
                this._ActualHeight += line._Height;

                if (linebreak || wrapped) {
                    line = new _TextLayoutLine(this, index, index);
                    if (!this.OverrideLineHeight()) {
                        if (end - index < 1) {
                            line._Descend = font._Descender();
                            line._Height = font._Height();
                        }
                    } else {
                        line._Descend = this.GetDescendOverride();
                        line._Height = this.GetLineHeightOverride();
                    }

                    if (linebreak && (end - index < 1))
                        this._ActualHeight += line._Height;

                    this._Lines.push(line);
                }

                if (index < end) {
                    run = new _TextLayoutRun(line, attrs, index);
                    line._Runs.push(run);
                }
            }
        }

        attrs = nattrs;
    } while (c != null);
    this._Count = index;
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
TextLayout.prototype._Render = function (ctx, origin, offset) {
    var line;
    var x;
    var y = offset.Y;

    this.Layout();

    for (var i = 0; i < this._Lines.length; i++) {
        line = this._Lines[i];
        x = offset.X + this._HorizontalAlignment(line._Advance);
        line._Render(ctx, origin, x, y);
        y += line._Height;
    }
};

TextLayout._ValidateAttrs = function (/* List */attributes) {
    var attrs;
    if (!(attrs = attributes.First()) || attrs._Start != 0)
        return false;

    while (attrs != null) {
        if (!attrs.GetFont()) //WTF: This whole method may not be valid in our case
            return false;
        attrs = attrs.Next;
    }
    return true;
};
TextLayout.IsLineBreak = function (text) {
    NotImplemented("TextLayout.IsLineBreak");
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
TextLayout._LayoutWordWrap = function (word, text, maxWidth) {
    NotImplemented("TextLayout._LayoutWordWrap");
};
TextLayout._LayoutWordNoWrap = function (word, text) {
    var advance = Surface.MeasureText(text).Width;
    word._Advance = advance;
    word._LineAdvance += advance;
    word._Count = text.length;
    word._Length = text.length;
    return false;
};
TextLayout._LayoutLwsp = function (word, text) {
    var advance = Surface.MeasureText(text).Width;
    word._Advance = advance;
    word._LineAdvance += advance;
    word._Count = text.length;
    word._Length = text.length;
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
_TextLayoutLine.prototype._Render = function (ctx, origin, left, top) {
    var run;
    var x0 = left;
    var y0 = top + this._Height + this._Descend;

    for (var i = 0; i < this._Runs.length; i++) {
        run = this._Runs[i];
        run._Render(ctx, origin, x0, y0);
        x0 += run._Advance;
    }
};

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
    var selectionLength = this._Line._Layout.GetSelectionLength();
    var selectionStart = this._Line._Layout.GetSelectionStart();
    var text = this._Line._Layout.GetText();
    var font = this._Attrs.GetFont();

    var len;
    var index = this._Start;
    //glyph before selection
    if (selectionLength == 0 || this._Start < selectionStart) {
        len = selectionLength > 0 ? Math.min(selectionStart - this._Start, this._Length) : this._Length;
        this._Clusters.push(new _TextLayoutGlyphCluster(text.slice(this._Start, this._Length), font));
        index += len;
    }

    //glyph with selection
    var selectionEnd = this._Start + selectionStart + selectionLength;
    var runEnd = this.Start + this._Length;
    if (index < runEnd && index < selectionEnd) {
        len = Math.min(runEnd - index, selectionEnd - index);
        this._Clusters.push(new _TextLayoutGlyphCluster(text.slice(index, len), font, true));
        index += len;
    }

    //glyph after selection
    if (index < runEnd) {
        len = runEnd - index;
        this._Clusters.push(new _TextLayoutGlyphCluster(text.slice(index, len), font));
        index += len;
    }
};
_TextLayoutRun.prototype._ClearCache = function () {
    this._Clusters = new Array();
};
_TextLayoutRun.prototype._Render = function (ctx, origin, x, y) {
    var x0 = x;
    if (this._Clusters.length == 0)
        this._GenerateCache();

    for (var i = 0; i < this._Clusters.length; i++) {
        var cluster = this._Clusters[i];
        ctx.Save();
        cluster._Render(ctx, origin, this._Attributes, x0, y);
        ctx.Restore();
        x0 += cluster._Advance;
    }
};

//#endregion

//#region _TextLayoutGlyphCluster

_TextLayoutGlyphCluster.prototype = new Object;
_TextLayoutGlyphCluster.prototype.constructor = _TextLayoutGlyphCluster;
function _TextLayoutGlyphCluster(text, font, selected) {
    Object.call(this);
    this._Text = text;
    this._Selected = selected == true;
    this._Advance = Surface.MeasureText(text, font).Width;
}
_TextLayoutGlyphCluster.prototype._Render = function (ctx, origin, attrs, x, y) {
    if (this._Text.length == 0 || this._Advance == 0.0)
        return;
    var font = attrs.GetFont();
    var y0 = font._Ascender();
    ctx.Translate(x, y - y0);

    var brush;
    var area;
    if (this._Selected && (brush = attrs.GetBackground(true))) {
        area = new Rect(origin.X, origin.Y, this._Advance, font._Height());
        ctx.Fill(area, brush); //selection background
    }
    if (!(brush = attrs.GetForeground(selected)))
        return;
    ctx.CustomRender(_TextLayoutGlyphCluster.Painter, this._Text, attrs.GetForeground(), attrs.GetFont());
    if (attrs.IsUnderlined()) {
        //TODO: Underline
    }
};
_TextLayoutGlyphCluster.Painter = function (canvasCtx, text, foreground, font) {
    canvasCtx.fillStyle = foreground._Translate();
    canvasCtx.font = font._Translate();
    canvasCtx.textAlign = "left";
    canvasCtx.textBaseline = "top";
    canvasCtx.fillText(text, 0, 0);
};

//#endregion

//#region _TextLayoutAttributes

_TextLayoutAttributes.prototype = new Node;
_TextLayoutAttributes.prototype.constructor = _TextLayoutAttributes;
function _TextLayoutAttributes(source, start) {
    Node.call(this);
    this._Source = source;
    this._Start = start == null ? 0 : start;
}
_TextLayoutAttributes.prototype.GetBackground = function (selected) { return this._Source.GetBackground(selected); };
_TextLayoutAttributes.prototype.GetForeground = function (selected) { return this._Source.GetForeground(selected); };
_TextLayoutAttributes.prototype.GetFont = function () { return this._Source.GetFont(); };
_TextLayoutAttributes.prototype.GetDirection = function () { return this._Source.GetDirection(); };
_TextLayoutAttributes.prototype.IsUnderlined = function () { return this._Source.GetTextDecorations() & TextDecorations.Underline; };

//#endregion

//#region _LayoutWord

_LayoutWord.prototype = new Object;
_LayoutWord.prototype.constructor = _LayoutWord;
function _LayoutWord() {
    Object.call(this);
    this._Advance = 0.0;
    this._LineAdvance = 0.0;
    this._Length = 0;
    this._Count = 0;
    this._BreakOps = null;
    this._Font = new Font();
}

//#endregion