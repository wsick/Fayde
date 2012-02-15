/// CODE
/// <reference path="../Engine/Surface.js"/>

//#region TextLayout

function TextLayout() {
    RefObject.call(this);
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
}
TextLayout.InheritFrom(RefObject);

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
    this._Alignment = value;
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
    if (value === 0.0)
        value = Number.POSITIVE_INFINITY;
    if (this._MaxWidth === value)
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
    if (value) {
        this._Text = value;
        this._Length = length == -1 ? value.length : length;
    } else {
        this._Text = null;
        this._Length = 0;
    }
    this._ResetState();
    return true;
};

TextLayout.prototype.GetBaselineOffset = function () {
    if (this._Lines.length === 0)
        return 0;
    var line = this._Lines[0];
    return line._Height + line._Descend;
};
TextLayout.prototype.OverrideLineHeight = function () {
    return this.GetLineStackingStrategy() === LineStackingStrategy.BlockLineHeight && this.GetLineHeight() !== 0;
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

TextLayout.prototype.GetLineFromY = function (offset, y) {
    NotImplemented("TextLayout.GetLineFromY");
};
TextLayout.prototype.GetLineFromIndex = function (index) {
    NotImplemented("TextLayout.GetLineFromIndex");
};
TextLayout.prototype.GetCursorFromXY = function (offset, x, y) {
    NotImplemented("TextLayout.GetCursorFromXY");
};
TextLayout.prototype.GetCursor = function (offset, pos) {
    var x0 = offset.X;
    var y0 = offset.Y;
    var height = 0.0;
    var y1 = 0.0;

    var cursor = 0;
    for (var i = 0; i < this._Lines.length; i++) {
        var line = this._Lines[i];

        //adjust x0 for horizontal alignment
        x0 = offset.X + this._HorizontalAlignment(line._Advance);

        //set y1 to baseline
        y1 = y0 + line._Height + line._Descend;
        height = line._Height;

        if (pos >= cursor + line._Length) {
            if ((i + 1) === this._Lines.length) {
                if (TextLayout._IsLineBreak(this._Text.substr(line._Start + line._Length - 1, 2))) {
                    //cursor is lonely just below the last line
                    x0 = offset.X + this._HorizontalAlignment(0.0);
                    y0 += line._Height;
                } else {
                    //cursor is at the end of the last line
                    x0 += line._Advance;
                }
                break;
            }
            cursor += line._Length;
            y0 += line._Height;
            continue;
        }

        //cursor is on this line...
        for (var j = 0; j < line._Runs.length; j++) {
            var run = line._Runs[j];
            end = run._Start + run._Length;

            if (pos >= cursor + run._Length) {
                cursor += run._Length;
                x0 += run._Advance;
                continue;
            }

            //cursor is in this run
            var font = run._Attrs.GetFont();
            var remainingSize = Surface.MeasureText(this._Text.slice(run._Start, pos), font);
            x0 += remainingSize.Width;
            break;
        }
        break;
    }
    return new Rect(x0, y0, 1.0, height);
};
TextLayout.prototype._FindLineWithIndex = function (index) {
    var cursor = 0;
    for (var i = 0; i < this._Lines.length; i++) {
        var line = this._Lines[i];
        if (index < cursor + line._Length)
            return line;
        cursor += line._Length;
    }
    return null;
};

TextLayout.prototype.Select = function (start, length) {
    NotImplemented("TextLayout.Select");
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
    if (!isNaN(this._ActualWidth))
        return;

    this._ActualHeight = 0.0;
    this._ActualWidth = 0.0;
    this._IsWrapped = false;
    this._ClearLines();

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
    var font;
    do {
        nattrs = attrs.Next;
        end = nattrs ? nattrs._Start : this._Length;
        run = new _TextLayoutRun(line, attrs, index);
        line._Runs.push(run);

        word._Font = font = attrs.GetFont();

        if (end - index <= 0) {
            if (!this.OverrideLineHeight()) {
                line._Descend = Math.min(line._Descend, font._Descender());
                line._Height = Math.max(line._Height, font.GetActualHeight());
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
                var lineBreakLength = TextLayout._IsLineBreak(this._Text.slice(index, end));
                if (lineBreakLength > 0) {
                    if (line._Length == 0 && !this.OverrideLineHeight()) {
                        line._Descend = font._Descender();
                        line._Height = font.GetActualHeight();
                    }

                    line._Length += lineBreakLength;
                    run._Length += lineBreakLength;
                    index += lineBreakLength;
                    linebreak = true;
                    break;
                }

                word._LineAdvance = line._Advance;
                if (layoutWordFunc(word, this._Text.slice(index, end), this.GetMaxWidth())) {
                    this._IsWrapped = true;
                    wrapped = true;
                }

                if (word._Length > 0) {
                    //append the word to the run/line
                    if (!this.OverrideLineHeight()) {
                        line._Descend = Math.min(line._Descend, font._Descender());
                        line._Height = Math.max(line._Height, font.GetActualHeight());
                    }

                    line._Advance += word._Advance;
                    run._Advance += word._Advance;
                    line._Width = line._Advance;
                    line._Length += word._Length;
                    run._Length += word._Length;

                    index += word._Length;
                }

                if (wrapped)
                    break;

                word._LineAdvance = line._Advance;
                TextLayout._LayoutLwsp(word, this._Text.slice(index, end), font);

                if (word._Length > 0) {
                    if (!this.OverrideLineHeight()) {
                        line._Descend = Math.min(line._Descend, font._Descender());
                        line._Height = Math.max(line._Height, font.GetActualHeight());
                    }

                    line._Advance += word._Advance;
                    run._Advance += word._Advance;
                    line._Width = line._Advance;
                    line._Length += word._Length;
                    run._Length += word._Length;

                    index += word._Length;
                }
            }

            var atend = index >= end;
            if (linebreak || wrapped || atend) {
                this._ActualWidth = Math.max(this._ActualWidth, atend ? line._Advance : line._Width);
                this._ActualHeight += line._Height;

                if (linebreak || wrapped) {
                    line = new _TextLayoutLine(this, index, index);
                    if (!this.OverrideLineHeight()) {
                        if (end - index < 1) {
                            line._Descend = font._Descender();
                            line._Height = font.GetActualHeight();
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
    } while (end - index > 0);
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
TextLayout.prototype.__Debug = function () {
    var allText = this.GetText();
    var t = "";
    t += "Lines: " + this._Lines.length.toString() + "\n";
    for (var i = 0; i < this._Lines.length; i++) {
        t += "\tLine " + i.toString() + ":\n";
        t += this._Lines[i].__Debug(allText);
    }
    return t;
};

TextLayout._ValidateAttrs = function (attributes) {
    /// <param name="attributes" type="LinkedList"></param>
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
TextLayout._IsLineBreak = function (text) {
    var c0 = text.charAt(0);
    if (c0 === '\n')
        return 1;
    var c1 = text.charAt(1);
    if (c0 === '\r' && c1 === '\n')
        return 2;
    return 0;
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
    word._Length = 0;
    word._Advance = 0.0;
    var measuredIndex = 0;
    var measuredText = "";
    while (true) {
        var index = text.indexOf(" ", measuredIndex);
        if (index === -1)
            break;
        index += 1; //include " "
        var tempText = text.slice(measuredIndex, index);
        var advance = Surface.MeasureText(tempText, word._Font).Width;
        if (isFinite(maxWidth) && (word._LineAdvance + advance) > maxWidth) {
            return true;
        }
        measuredIndex = index;
        measuredText = tempText;
        word._Advance += advance;
        word._LineAdvance += advance;
        word._Length += measuredText.length;
    }
    word._Length = text.length;
    return false;
};
TextLayout._LayoutWordWrapMoon = function (word, text, maxWidth) {
    return false;
    var lineStart = word._LineAdvance == 0.0;
    if (!word._BreakOps)
        word._BreakOps = new Array();
    word._BreakOps.splice(0, word._BreakOps.length);
    word._Type = _LayoutWordType.Unknown;
    word._Advance = 0.0;

    var op = new _WordBreakOp();
    var ctype;
    var btype = _BreakType.Unknown;
    var fixed = false;
    var newGlyph = false;
    var glyphs = 0;

    var wrap = false;

    var index = 0;
    var end = text.length;
    var start;
    var c;
    while (index < end) {
        start = index;
        c = text.charAt(index);
        index++;
        if (TextLayout._IsLineBreak(text)) {
            index = start;
            break;
        }

        //check previous break-type
        if (btype === _BreakType.ClosePunctuation) {
            // if anything comes after close punctuation (except infix separator), the 'word' is done
            btype = TextLayout._GetBreakType(c);
            if (btype !== _BreakType.InFixSeparator) {
                index = start;
                break;
            }
        } else if (btype === _BreakType.InFixSeparator) {
            btype = TextLayout._GetBreakType(c);
            if (word._Type === _LayoutWordType.Numeric) {
                //only accept numbers after the infix
                if (btype !== _BreakType.Numeric) {
                    index = start;
                    break;
                }
            } else if (word._Type === _LayoutWordType.Unknown) {
                //only accept alphanumerics after the infix
                if (btype !== _BreakType.Alphabetic && btype !== _BreakType.Numeric) {
                    index = start;
                    break;
                }
                fixed = true;
            }
        } else if (btype === _BreakType.WordJoiner) {
            btype = TextLayout._GetBreakType(c);
            fixed = true;
        } else {
            btype = TextLayout._GetBreakType(c);
        }

        if (TextLayout._BreakSpace(c, btype)) {
            index = start;
            break;
        }

        ctype = TextLayout._GetCharType(c);

        if (word._Type === _LayoutWordType.Unknown) {
            word._Type = TextLayout._GetWordType(ctype, btype);
        } else if (btype === _BreakType.OpenPunctuation) {
            index = start;
            break;
        } else if (TextLayout._WordTypeChanged(word._Type, c, ctype, btype)) {
            index = start;
            break;
        }

        //NOTE: Combining glyphs not implemented
        var newGlyph = true;
        glyphs++;

        var advance = Surface.MeasureText(c, word._Font).Width;
        word._LineAdvance += advance;
        word._Advance += advance;

        if (newGlyph) {
            op.advance = word._Advance;
            op.index = index;
            op.btype = btype;
            op.c = c;
        }
        word._BreakOps.push(op);
        op = op.Copy();

        if (Number.isFinite(maxWidth) && word._LineAdvance > maxWidth) {
            wrap = true;
            break;
        }
    }

    if (!wrap) {
        word._Length = index;
        return false;
    }

    if (index === end)
        btype = _BreakType.Space;

    while (index < end) {
        start = index;
        c = text.charAt(index);
        index++;

        if (TextLayout._IsLineBreak(text)) {
            btype = _BreakType.Space;
            index = start;
            break;
        }

        btype = TextLayout._GetBreakType(c);
        if (TextLayout._BreakSpace(c, btype)) {
            index = start;
            break;
        }

        var advance = Surface.MeasureText(c, word._Font).Width;
        word._LineAdvance += advance;
        word._Advance += advance;

        word._BreakOps.pop();
        op.advance += advance;
        op.index = index;
        op.count++;
        word._BreakOps.push(op);
        op = op.Copy();
    }

    if (lineStart && glyphs === 1) {
        word._Length = index;
        return true;
    }

    var data = {
        index: index,
        lineStart: lineStart,
        fixed: fixed,
        btype: btype,
        force: false
    };
    while (true) {
        for (var i = word._BreakOps.Length; i > 0; i--) {
            data.op = word._BreakOps[i - 1];
            data.i = i;
            if (TextLayout._LayoutWordWrapSearch(word, data) == true)
                return true;
            btype = data.op._Btype;
            c = data.op._C;
            i = data.i;
            index = data.index;
        }

        if (lineStart && !data.force) {
            data.force = true;
            continue;
        }
        break;
    }

    word._Advance = 0.0;
    word._Length = 0;

    return true;
};
TextLayout._LayoutWordWrapSearch = function (word, data) {
    switch (data.op.btype) {
        case _BreakType.BeforeAndAfter:
            if (i > 1 && i === word._BreakOps.length) {
                data.op = word._BreakOps[data.i - 2];
                data.op.SetWordBasics(word);
                return true;
            } else if (i < word._BreakOps.length) {
                data.op.SetWordBasics(word);
                return true;
            }
        case _BreakType.NonBreakingGlue:
        case _BreakType.WordJoiner:
            if (data.force && data.i < word._BreakOps.length) {
                data.op.SetWordBasics(word);
                return true;
            }
            if (data.i > 1) {
                data.op = this._BreakOps[data.i - 2];
                data.i--;
            }
            break;
        case _BreakType.Inseparable:
            if (data.lineStart && data.i < word._BreakOps.length) {
                data.op.SetWordBasics(word);
                return true;
            }
            break;
        case _BreakType.Before:
            if (data.i > 1) {
                data.op = word._BreakOps[data.i - 2];
                data.op.SetWordBasics(word);
                return true;
            }
            break;
        case _BreakType.ClosePunctuation:
            if (data.i < word._BreakOps.length && (data.force || data.btype !== _BreakType.InFixSeparator)) {
                data.op.SetWordBasics(word);
                return true;
            }
            if (data.i > 1 && !data.force) {
                data.op = word._BreakOps[data.i - 2];
                i--;
            }
            break;
        case _BreakType.InFixSeparator:
            if (data.i < word._BreakOps.length && (data.force || data.btype !== _BreakType.Numeric)) {
                data.op.SetWordBasics(word);
                return true;
            }
            if (data.i > 1 && !data.force) {
                data.op = word._BreakOps[data.i - 2];
                if (data.op._Btype === _BreakType.InFixSeparator ||
                    data.op._Btype === _BreakType.ClosePunctuation) {
                    data.op = word._BreakOps[data.i - 1];
                } else {
                    i--;
                }
            }
            break;
        case _BreakType.Alphabetic:
            if ((data.lineStart || data.fixed || data.force) && data.i < word._BreakOps.length) {
                data.op.SetWordBasics(word);
                return true;
            }
            break;
        case _BreakType.Ideographic:
            if (data.i < word._BreakOps.length && data.btype !== _BreakType.NonStarter) {
                data.op.SetWordBasics(word);
                return true;
            }
            break;
        case _BreakType.Numeric:
            if (data.lineStart && data.i < word._BreakOps.length && (data.force || data.btype !== _BreakType.InFixSeparator)) {
                data.op.SetWordBasics(word);
                return true;
            }
            break;
        case _BreakType.OpenPunctuation:
        case _BreakType.CombiningMark:
        case _BreakType.Contingent:
        case _BreakType.Ambiguous:
        case _BreakType.Quotation:
        case _BreakType.Prefix:
            if (data.force && data.i < word._BreakOps.length) {
                data.op.SetWordBasics(word);
                return true;
            }
            break;
        default:
            if (data.i < word._BreakOps.length) {
                data.op.SetWordBasics(word);
                return true;
            }
            break;
    }
    return false;
};
TextLayout._LayoutWordNoWrap = function (word, text) {
    var advance = Surface.MeasureText(text, word._Font).Width;
    word._Advance = advance;
    word._LineAdvance += advance;
    word._Length = text.length;
    return false;
};
TextLayout._LayoutLwsp = function (word, text, font) {
    var advance = Surface.MeasureText(text, font).Width;
    word._Advance = advance;
    word._LineAdvance += advance;
    word._Length = text.length;
};
TextLayout._GetBreakType = function (c) {
    NotImplemented("TextLayout._GetBreakType");
};
TextLayout._GetCharType = function (c) {
    NotImplemented("TextLayout._GetCharType");
};
TextLayout._GetWordType = function (ctype, btype) {
    NotImplemented("TextLayout._GetWordType");
};
TextLayout._BreakSpace = function (c, btype) {
    NotImplemented("TextLayout._BreakSpace");
};

//#endregion