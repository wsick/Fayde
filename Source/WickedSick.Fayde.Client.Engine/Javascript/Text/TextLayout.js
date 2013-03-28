/// <reference path="../Runtime/Nullstone.js" />
/// CODE
/// <reference path="../Engine/Surface.js"/>

(function (Text) {

    var breakType = {
        Unknown: 0,
        Space: 1,
        OpenPunctuation: 2,
        ClosePunctuation: 3,
        InFixSeparator: 4,
        Numeric: 5,
        Alphabetic: 6,
        WordJoiner: 7,
        ZeroWidthSpace: 8,
        BeforeAndAfter: 9,
        NonBreakingGlue: 10,
        Inseparable: 11,
        Before: 12,
        Ideographic: 13,
        CombiningMark: 14,
        Contingent: 15,
        Ambiguous: 16,
        Quotation: 17,
        Prefix: 18
    };
    var layoutWordType = {
        Unknown: 0,
        Numeric: 1,
        Alphabetic: 2,
        Ideographic: 3,
        Inseparable: 4
    };

    //#region _LayoutWord

    var _LayoutWord = Nullstone.Create("_LayoutWord");
    _LayoutWord.Instance.Init = function () {
        this._Advance = 0.0;
        this._LineAdvance = 0.0;
        this._Length = 0;
        this._BreakOps = null;
        this._Font = new Font();
    };
    Nullstone.FinishCreate(_LayoutWord);

    //#endregion

    //#region _WordBreakOp

    var _WordBreakOp = Nullstone.Create("_WordBreakOp");
    _WordBreakOp.Instance.Init = function () {
        this._Advance = 0.0;
        this._Index = 0;
        this._Btype = 0;
        this._C = '';
    };
    _WordBreakOp.Instance.Copy = function () {
        var newOp = new _WordBreakOp();
        newOp._Advance = this._Advance;
        newOp._Btype = this._Btype;
        newOp._C = this._C;
        newOp._Index = this._Index;
    };
    _WordBreakOp.Instance.SetWordBasics = function (word) {
        word._Length = this._Index;
        word._Advance = this._Advance;
    };
    Nullstone.FinishCreate(_WordBreakOp);

    //#endregion

    //#region _TextLayoutGlyphCluster

    var _TextLayoutGlyphCluster = Nullstone.Create("_TextLayoutGlyphCluster", undefined, 3);
    _TextLayoutGlyphCluster.Instance.Init = function (text, font, selected) {
        this._Text = text;
        this._Selected = selected == true;
        this._Advance = Surface.MeasureText(text, font).Width;
    };
    _TextLayoutGlyphCluster.Instance._Render = function (ctx, origin, attrs, x, y) {
        /// <param name="ctx" type="_RenderContext"></param>
        if (this._Text.length == 0 || this._Advance == 0.0)
            return;
        var font = attrs.GetFont();
        var y0 = font._Ascender();
        ctx.Translate(x, y - y0);

        var brush;
        var fontHeight = font.GetActualHeight();
        var area = new rect();
        rect.set(area, origin.X, origin.Y, this._Advance, fontHeight);
        if (this._Selected && (brush = attrs.GetBackground(true))) {
            ctx.FillRect(brush, area); //selection background
        }
        if (!(brush = attrs.GetForeground(this._Selected)))
            return;

        var canvasCtx = ctx.CanvasContext;
        brush.SetupBrush(canvasCtx, area);
        var brushHtml5 = brush.ToHtml5Object();
        canvasCtx.fillStyle = brushHtml5;
        canvasCtx.font = font.ToHtml5Object();
        canvasCtx.textAlign = "left";
        canvasCtx.textBaseline = "top";
        canvasCtx.fillText(this._Text, 0, 0);
        DrawDebug("Text: " + this._Text + " [" + canvasCtx.fillStyle.toString() + "]");

        if (attrs.IsUnderlined()) {
            canvasCtx.beginPath();
            canvasCtx.moveTo(0, fontHeight);
            canvasCtx.lineTo(this._Advance, fontHeight);
            canvasCtx.lineWidth = 2;
            canvasCtx.strokeStyle = brushHtml5;
            canvasCtx.stroke();
        }
    };
    Nullstone.FinishCreate(_TextLayoutGlyphCluster);

    //#endregion

    //#region _TextLayoutRun

    var _TextLayoutRun = Nullstone.Create("_TextLayoutRun", undefined, 3);

    _TextLayoutRun.Instance.Init = function (line, attrs, start) {
        this._Clusters = [];
        this._Attrs = attrs;
        this._Start = start;
        this._Line = line;
        this._Advance = 0.0; //after layout, will contain horizontal distance this run advances
        this._Length = 0;
    };

    _TextLayoutRun.Instance._GenerateCache = function () {
        var selectionLength = this._Line._Layout.GetSelectionLength();
        var selectionStart = this._Line._Layout.GetSelectionStart();
        var text = this._Line._Layout.GetText();
        var font = this._Attrs.GetFont();

        var len;
        var index = this._Start;
        var cluster1;
        var cluster2;
        //glyph before selection
        if (selectionLength === 0 || this._Start < selectionStart) {
            len = selectionLength > 0 ? Math.min(selectionStart - this._Start, this._Length) : this._Length;
            cluster1 = new _TextLayoutGlyphCluster(text.substr(this._Start, len), font);
            this._Clusters.push(cluster1);
            index += len;
        }

        //glyph with selection
        var selectionEnd = selectionStart + selectionLength;
        var runEnd = this._Start + this._Length;
        if (index < runEnd && index < selectionEnd) {
            len = Math.min(runEnd - index, selectionEnd - index);
            cluster2 = new _TextLayoutGlyphCluster(text.substr(index, len), font, true);
            this._Clusters.push(cluster2);
            index += len;
        }

        var cluster3;
        //glyph after selection
        if (index < runEnd) {
            len = runEnd - index;
            cluster3 = new _TextLayoutGlyphCluster(text.substr(index, len), font);
            this._Clusters.push(cluster3);
            index += len;
        }
    };
    _TextLayoutRun.Instance._ClearCache = function () {
        this._Clusters = [];
    };
    _TextLayoutRun.Instance._Render = function (ctx, origin, x, y) {
        var x0 = x;
        if (this._Clusters.length === 0)
            this._GenerateCache();

        for (var i = 0; i < this._Clusters.length; i++) {
            var cluster = this._Clusters[i];
            ctx.Save();
            cluster._Render(ctx, origin, this._Attrs, x0, y);
            ctx.Restore();
            x0 += cluster._Advance;
        }
    };
    _TextLayoutRun.Instance.__Debug = function (allText) {
        return allText.substr(this._Start, this._Length);
    };

    Nullstone.FinishCreate(_TextLayoutRun);

    //#endregion

    //#region _TextLayoutLine

    var _TextLayoutLine = Nullstone.Create("_TextLayoutLine", undefined, 3);
    _TextLayoutLine.Instance.Init = function (layout, start, offset) {
        this._Runs = [];
        this._Layout = layout;
        this._Start = start;
        this._Offset = offset;
        this._Advance = 0.0; //after layout, will contain horizontal distance this line advances
        this._Descend = 0.0;
        this._Height = 0.0;
        this._Width = 0.0;
        this._Length = 0;
    };
    _TextLayoutLine.Instance.GetCursorFromX = function (offset, x) {
        var run = null;
        var x0 = offset.X + this._Layout._HorizontalAlignment(this._Advance);
        var cursor = this._Offset;
        var text = this._Layout.GetText();
        var index = this._Start;
        var end;
        var c;

        var i;
        for (i = 0; i < this._Runs.length; i++) {
            run = this._Runs[i];
            if (x < (x0 + run._Advance))
                break; // x is somewhere inside this run

            cursor += run._Length;
            index += run._Length;
            x0 += run._Advance;
            run = null;
        }

        if (run != null) {
            index = run._Start;
            end = run._Start + run._Length;
            var font = run._Attrs.GetFont();
            var m;
            var ch;
            while (index < end) {
                ch = index;
                cursor++;
                c = text.charAt(index);
                index++;
                if (c === '\t')
                    c = ' ';
                m = Surface._MeasureWidth(c, font);
                if (x <= x0 + (m / 2.0)) {
                    index = ch;
                    cursor--;
                    break;
                }
                x0 += m;
            }
        } else if (i > 0) {
            // x is beyond the end of the last run
            run = this._Runs[i - 1];
            end = run._Start + run._Length;
            index = run._Start;
            c = end - 1 < 0 ? null : text.charAt(end - 1);
            if (c == '\n') {
                cursor--;
                end--;
                c = end - 1 < 0 ? null : text.charAt(end - 1);
                if (c == '\r') {
                    cursor--;
                    end--;
                }
            }
        }
        return cursor;
    };
    _TextLayoutLine.Instance._Render = function (ctx, origin, left, top) {
        var run;
        var x0 = left;
        //var y0 = top + this._Height + this._Descend; //not using this: we set html5 canvas to render top-left corner of text at x,y
        var y0 = top;

        for (var i = 0; i < this._Runs.length; i++) {
            run = this._Runs[i];
            run._Render(ctx, origin, x0, y0);
            x0 += run._Advance;
        }
    };
    _TextLayoutLine.Instance.__Debug = function (allText) {
        var t = "";
        t += "\t\tRuns: " + this._Runs.length.toString() + "\n";
        for (var i = 0; i < this._Runs.length; i++) {
            t += "\t\t\tRun " + i.toString() + ": ";
            t += this._Runs[i].__Debug(allText);
            t += "\n";
        }
        return t;
    };
    Nullstone.FinishCreate(_TextLayoutLine);

    //#endregion

    //#region TextLayout

    var TextLayout = Nullstone.Create("TextLayout");

    TextLayout.Instance.Init = function () {
        this._SelectionStart = 0;
        this._SelectionLength = 0;

        this._Strategy = Fayde.LineStackingStrategy.MaxHeight;
        this._Alignment = Fayde.TextAlignment.Left;
        this._Trimming = Fayde.Controls.TextTrimming.None;
        this._Wrapping = Fayde.Controls.TextWrapping.NoWrap;

        this._AvailableWidth = Number.POSITIVE_INFINITY;
        this._MaxHeight = Number.POSITIVE_INFINITY;
        this._MaxWidth = Number.POSITIVE_INFINITY;
        this._BaseDescent = 0.0;
        this._BaseHeight = 0.0;
        this._ActualHeight = NaN;
        this._ActualWidth = NaN;
        this._LineHeight = NaN;
        this._Attributes = null;
        this._Lines = [];
        this._IsWrapped = true;
        this._Text = null;
        this._Length = 0;
    };

    TextLayout.Instance.GetSelectionLength = function () {
        return this._SelectionLength;
    };
    TextLayout.Instance.GetSelectionStart = function () {
        return this._SelectionStart;
    };
    TextLayout.Instance.GetLineStackingStrategy = function () {
        return this._Strategy;
    };
    TextLayout.Instance.SetLineStackingStrategy = function (value) {
        if (this._Strategy == value)
            return false;
        this._Strategy = value;
        this._ResetState();
        return true;
    };
    TextLayout.Instance.GetTextAttributes = function () {
        return this._Attributes;
    };
    TextLayout.Instance.SetTextAttributes = function (value) {
        if (this._Attributes) {
            this._Attributes.Clear(true);
        }
        this._Attributes = value;
        this._ResetState();
        return true;
    };
    TextLayout.Instance.GetTextAlignment = function () {
        return this._Alignment;
    };
    TextLayout.Instance.SetTextAlignment = function (value) {
        if (this._Alignment == value)
            return false;
        this._Alignment = value;
        this._ResetState();
        return true;
    };
    TextLayout.Instance.GetTextTrimming = function () {
        return this._Trimming;
    };
    TextLayout.Instance.SetTextTrimming = function (value) {
        if (this._Trimming == value)
            return false;
        this._Trimming = value;
        this._ResetState();
        return true;
    };
    TextLayout.Instance.GetTextWrapping = function () {
        return this._Wrapping;
    };
    TextLayout.Instance.SetTextWrapping = function (value) {
        switch (value) {
            case Fayde.Controls.TextWrapping.NoWrap:
            case Fayde.Controls.TextWrapping.Wrap:
                break;
            default:
                value = Fayde.Controls.TextWrapping.Wrap;
                break;
        }

        if (this._Wrapping == value)
            return false;
        this._Wrapping = value;
        this._ResetState();
        return true;
    };
    TextLayout.Instance.GetLineHeight = function () {
        return this._LineHeight;
    };
    TextLayout.Instance.SetLineHeight = function (value) {
        if (this._LineHeight == value)
            return false;
        this._LineHeight = value;
        this._ResetState();
        return true;
    };
    TextLayout.Instance.GetMaxHeight = function () {
        return this._MaxHeight;
    };
    TextLayout.Instance.SetMaxHeight = function (value) {
        if (this._MaxHeight == value)
            return false;
        this._MaxHeight = value;
        this._ResetState();
        return true;
    };
    TextLayout.Instance.GetMaxWidth = function () {
        return this._MaxWidth;
    };
    TextLayout.Instance.SetMaxWidth = function (value) {
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
    TextLayout.Instance.GetAvailableWidth = function () {
        return this._AvailableWidth;
    };
    TextLayout.Instance.SetAvailableWidth = function (value) {
        this._AvailableWidth = value;
        return false;
    };
    TextLayout.Instance.GetText = function () {
        return this._Text;
    };
    TextLayout.Instance.SetText = function (value, length) {
        if (value != null) {
            this._Text = value;
            this._Length = length == -1 ? value.length : length;
        } else {
            this._Text = null;
            this._Length = 0;
        }
        this._ResetState();
        return true;
    };

    TextLayout.Instance.GetBaselineOffset = function () {
        if (this._Lines.length === 0)
            return 0;
        var line = this._Lines[0];
        return line._Height + line._Descend;
    };
    TextLayout.Instance.OverrideLineHeight = function () {
        return this.GetLineStackingStrategy() === Fayde.LineStackingStrategy.BlockLineHeight && this.GetLineHeight() !== 0;
    };
    TextLayout.Instance.GetLineHeightOverride = function () {
        if (isNaN(this.GetLineHeight()))
            return this._BaseHeight;
        return this.GetLineHeight();
    };
    TextLayout.Instance.GetDescendOverride = function () {
        if (isNaN(this.GetLineHeight()))
            return this._BaseDescent;

        if (this._BaseHeight == 0.0)
            return 0.0;

        return this.GetLineHeight() * (this._BaseDescent / this._BaseHeight);
    }

    TextLayout.Instance.GetLineFromY = function (offset, y, refIndex) {
        var line = null;
        var y0 = offset.Y;
        var y1;

        for (var i = 0; i < this._Lines.length; i++) {
            line = this._Lines[i];
            y1 = y0 + line._Height; //set y1 to top of next line
            if (y < y1) {
                //we found the line that the point is located on
                if (refIndex)
                    refIndex.Value = i;
                return line;
            }
            y0 = y1;
        }
        return null;
    };
    TextLayout.Instance.GetLineFromIndex = function (index) {
        if (index >= this._Lines.length || index < 0)
            return null;
        return this._Lines[index];
    };
    TextLayout.Instance.GetCursorFromXY = function (offset, x, y) {
        var line;
        if (y < offset.Y) {
            line = this._Lines[0];
        } else if (!(line = this.GetLineFromY(offset, y))) {
            line = this._Lines[this._Lines.length - 1];
        }
        return line.GetCursorFromX(offset, x);
    };
    TextLayout.Instance.GetSelectionCursor = function (offset, pos) {
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

                if (run._Start === pos)
                    break;
                //cursor is in this run
                var font = run._Attrs.GetFont();
                x0 += Surface._MeasureWidth(this._Text.slice(run._Start, pos), font);
                break;
            }
            break;
        }
        var r = new rect();
        rect.set(r, x0, y0, 1.0, height);
        return r;
    };
    TextLayout.Instance._FindLineWithIndex = function (index) {
        var cursor = 0;
        for (var i = 0; i < this._Lines.length; i++) {
            var line = this._Lines[i];
            if (index < cursor + line._Length)
                return line;
            cursor += line._Length;
        }
        return null;
    };

    TextLayout.Instance.Select = function (start, length) {
        if (!this._Text) {
            this._SelectionLength = 0;
            this._SelectionStart = 0;
            return;
        }

        var newSelectionStart;
        var newSelectionLength;
        var index;
        var end;
        if (!false) {
            newSelectionStart = index = start;
            end = index + length;
            newSelectionLength = length;
        } else {
            newSelectionLength = length;
            newSelectionStart = start;
        }

        if (this._SelectionStart === newSelectionStart && this._SelectionLength === newSelectionLength)
            return;

        if (this._SelectionLength > 0 || newSelectionLength > 0)
            this._ClearCache();

        this._SelectionLength = newSelectionLength;
        this._SelectionStart = newSelectionStart;
    };

    TextLayout.Instance._ClearCache = function () {
        var line;
        for (var i = 0; i < this._Lines.length; i++) {
            line = this._Lines[i];
            for (var j = 0; j < line._Runs.length; j++) {
                line._Runs[i]._ClearCache();
            }
        }
    };
    TextLayout.Instance._ClearLines = function () {
        this._Lines = [];
    };
    TextLayout.Instance._ResetState = function () {
        this._ActualHeight = NaN;
        this._ActualWidth = NaN;
    };
    TextLayout.Instance.GetRenderExtents = function () {
        this.Layout();
        var r = new rect();
        rect.set(r, this._HorizontalAlignment(this._ActualWidth), 0.0, this._ActualWidth, this._ActualHeight);
        return r;
    };
    TextLayout.Instance.GetActualExtents = function () {
        return size.fromRaw(this._ActualWidth, this._ActualHeight);
    };
    TextLayout.Instance.Layout = function () {
        if (!isNaN(this._ActualWidth))
            return;

        this._ActualHeight = 0.0;
        this._ActualWidth = 0.0;
        this._IsWrapped = false;
        this._ClearLines();

        if (this._Text == null || !TextLayout._ValidateAttrs(this._Attributes))
            return;

        var word = new _LayoutWord();
        if (this._Wrapping === Fayde.Controls.TextWrapping.Wrap)
            word._BreakOps = [];
        else
            word._BreakOps = null;

        var layoutWordFunc = this._Wrapping === Fayde.Controls.TextWrapping.NoWrap ? TextLayout._LayoutWordNoWrap : TextLayout._LayoutWordWrap;

        var line = new _TextLayoutLine(this, 0, 0);
        if (this.OverrideLineHeight()) {
            line._Descend = this.GetDescendOverride();
            line._Height = this.GetLineHeightOverride();
        }
        this._Lines.push(line);

        var index = 0;
        var attrs = this._Attributes.Head;
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
    TextLayout.Instance._HorizontalAlignment = function (lineWidth) {
        var deltax = 0.0;
        var width;
        switch (this._Alignment) {
            case Fayde.TextAlignment.Center:
                width = TextLayout._GetWidthConstraint(this._AvailableWidth, this._MaxWidth, this._ActualWidth);
                if (lineWidth < width)
                    deltax = (width - lineWidth) / 2.0;
                break;
            case Fayde.TextAlignment.Right:
                width = TextLayout._GetWidthConstraint(this._AvailableWidth, this._MaxWidth, this._ActualWidth);
                if (lineWidth < width)
                    deltax = width - lineWidth;
                break;
        }
        return deltax;
    };
    TextLayout.Instance._Render = function (ctx, origin, offset) {
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
    TextLayout.Instance.__Debug = function () {
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
        if (!(attrs = attributes.Head) || attrs._Start != 0)
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
        if (text.indexOf(" ", measuredIndex) === -1) {
            var advance = Surface._MeasureWidth(text, word._Font);
            if (isFinite(maxWidth) && (word._LineAdvance + advance) > maxWidth) {
                return true;
            }
            word._Advance = advance;
            word._LineAdvance = advance;
            word._Length = text.length;
            return false;
        }
        var tempText = text;
        while (true) {
            var index = tempText.indexOf(" ", measuredIndex);
            if (index === -1)
                break;
            index += 1; //include " "
            tempText = tempText.slice(measuredIndex, index);
            var advance = Surface._MeasureWidth(tempText, word._Font);
            if (isFinite(maxWidth) && (word._LineAdvance + advance) > maxWidth) {
                return true;
            }
            measuredIndex = index;
            measuredText = tempText;
            word._Advance += advance;
            word._LineAdvance += advance;
            word._Length += measuredText.length;
        }
        return false;
    };
    TextLayout._LayoutWordWrapMoon = function (word, text, maxWidth) {
        return false;
        var lineStart = word._LineAdvance == 0.0;
        if (!word._BreakOps)
            word._BreakOps = [];
        word._BreakOps.splice(0, word._BreakOps.length);
        word._Type = layoutWordType.Unknown;
        word._Advance = 0.0;

        var op = new _WordBreakOp();
        var ctype;
        var btype = breakType.Unknown;
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
            if (btype === breakType.ClosePunctuation) {
                // if anything comes after close punctuation (except infix separator), the 'word' is done
                btype = TextLayout._GetBreakType(c);
                if (btype !== breakType.InFixSeparator) {
                    index = start;
                    break;
                }
            } else if (btype === breakType.InFixSeparator) {
                btype = TextLayout._GetBreakType(c);
                if (word._Type === layoutWordType.Numeric) {
                    //only accept numbers after the infix
                    if (btype !== breakType.Numeric) {
                        index = start;
                        break;
                    }
                } else if (word._Type === layoutWordType.Unknown) {
                    //only accept alphanumerics after the infix
                    if (btype !== breakType.Alphabetic && btype !== breakType.Numeric) {
                        index = start;
                        break;
                    }
                    fixed = true;
                }
            } else if (btype === breakType.WordJoiner) {
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

            if (word._Type === layoutWordType.Unknown) {
                word._Type = TextLayout._GetWordType(ctype, btype);
            } else if (btype === breakType.OpenPunctuation) {
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
            btype = breakType.Space;

        while (index < end) {
            start = index;
            c = text.charAt(index);
            index++;

            if (TextLayout._IsLineBreak(text)) {
                btype = breakType.Space;
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
            case breakType.BeforeAndAfter:
                if (i > 1 && i === word._BreakOps.length) {
                    data.op = word._BreakOps[data.i - 2];
                    data.op.SetWordBasics(word);
                    return true;
                } else if (i < word._BreakOps.length) {
                    data.op.SetWordBasics(word);
                    return true;
                }
            case breakType.NonBreakingGlue:
            case breakType.WordJoiner:
                if (data.force && data.i < word._BreakOps.length) {
                    data.op.SetWordBasics(word);
                    return true;
                }
                if (data.i > 1) {
                    data.op = this._BreakOps[data.i - 2];
                    data.i--;
                }
                break;
            case breakType.Inseparable:
                if (data.lineStart && data.i < word._BreakOps.length) {
                    data.op.SetWordBasics(word);
                    return true;
                }
                break;
            case breakType.Before:
                if (data.i > 1) {
                    data.op = word._BreakOps[data.i - 2];
                    data.op.SetWordBasics(word);
                    return true;
                }
                break;
            case breakType.ClosePunctuation:
                if (data.i < word._BreakOps.length && (data.force || data.btype !== breakType.InFixSeparator)) {
                    data.op.SetWordBasics(word);
                    return true;
                }
                if (data.i > 1 && !data.force) {
                    data.op = word._BreakOps[data.i - 2];
                    i--;
                }
                break;
            case breakType.InFixSeparator:
                if (data.i < word._BreakOps.length && (data.force || data.btype !== breakType.Numeric)) {
                    data.op.SetWordBasics(word);
                    return true;
                }
                if (data.i > 1 && !data.force) {
                    data.op = word._BreakOps[data.i - 2];
                    if (data.op._Btype === breakType.InFixSeparator ||
                        data.op._Btype === breakType.ClosePunctuation) {
                        data.op = word._BreakOps[data.i - 1];
                    } else {
                        i--;
                    }
                }
                break;
            case breakType.Alphabetic:
                if ((data.lineStart || data.fixed || data.force) && data.i < word._BreakOps.length) {
                    data.op.SetWordBasics(word);
                    return true;
                }
                break;
            case breakType.Ideographic:
                if (data.i < word._BreakOps.length && data.btype !== breakType.NonStarter) {
                    data.op.SetWordBasics(word);
                    return true;
                }
                break;
            case breakType.Numeric:
                if (data.lineStart && data.i < word._BreakOps.length && (data.force || data.btype !== breakType.InFixSeparator)) {
                    data.op.SetWordBasics(word);
                    return true;
                }
                break;
            case breakType.OpenPunctuation:
            case breakType.CombiningMark:
            case breakType.Contingent:
            case breakType.Ambiguous:
            case breakType.Quotation:
            case breakType.Prefix:
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
    TextLayout._UpdateSelection = function (lines, pre, post) {
    };

    Text.TextLayout = Nullstone.FinishCreate(TextLayout);

    //#endregion
})(Nullstone.Namespace("Fayde.Text"));