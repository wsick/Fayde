
module Fayde.Text {
    export interface IBreakOp {
        Advance: number;
        Index: number;
        Btype: number;
        c: string;
    }
    export interface ILayoutWord {
        Advance: number;
        LineAdvance: number;
        Length: number;
        BreakOps: IBreakOp[];
        Font: Font;
    }

    var isFirefox = /firefox/i.test(navigator.userAgent);
    export class TextLayoutGlyphCluster {
        private _Text: string;
        private _Selected: boolean = false;
        _Advance: number = 0;
        constructor(text: string, font: Font, selected?: boolean) {
            this._Text = text;
            this._Selected = selected == true;
            this._Advance = Surface.MeasureWidth(text, font);
        }
        _Render(ctx: RenderContextEx, origin: Point, attrs: ITextAttributes, x: number, y: number) {
            if (this._Text.length == 0 || this._Advance == 0.0)
                return;
            var font = attrs.Font;
            var y0 = font._Ascender();
            ctx.translate(x, y - y0);

            var fontHeight = font.GetActualHeight();
            var area = new rect();
            var ox = 0;
            var oy = 0;
            if (origin) {
                ox = origin.X;
                oy = origin.Y;
            }
            rect.set(area, ox, oy, this._Advance, fontHeight);
            
            var brush = attrs.GetBackground(this._Selected);
            if (brush) {
                ctx.fillRectEx(brush, area); //selection background
            }

            brush = attrs.GetForeground(this._Selected);
            var brushHtml5 = "#000000";
            if (brush) {
                brush.SetupBrush(ctx, area);
                brushHtml5 = brush.ToHtml5Object();
            }
            ctx.fillStyle = brushHtml5;
            ctx.font = font.ToHtml5Object();
            ctx.textAlign = "left";
            if (isFirefox) {
                ctx.textBaseline = "bottom";
                ctx.fillText(this._Text, 0, fontHeight);
            } else {
                ctx.textBaseline = "top";
                ctx.fillText(this._Text, 0, 0);
            }

            if (attrs.IsUnderlined) {
                ctx.beginPath();
                ctx.moveTo(0, fontHeight);
                ctx.lineTo(this._Advance, fontHeight);
                ctx.lineWidth = 2;
                ctx.strokeStyle = brushHtml5;
                ctx.stroke();
            }
        }
    }
    export class TextLayoutRun {
        private _Clusters: TextLayoutGlyphCluster[] = [];
        _Attrs: ITextAttributes = null;
        _Start: number = 0;
        private _Line: TextLayoutLine = null;
        _Advance: number = 0.0; //after layout, will contain horizontal distance this run advances
        _Length: number = 0;
        constructor(line: TextLayoutLine, attrs: ITextAttributes, start: number) {
            this._Attrs = attrs;
            this._Start = start;
            this._Line = line;
        }

        _GenerateCache() {
            var layout = this._Line._Layout;
            var selectionLength = layout.SelectionLength;
            var selectionStart = layout.SelectionStart;
            var text = layout.Text;
            var font = this._Attrs.Font;

            var len;
            var index = this._Start;
            var cluster1;
            var cluster2;
            //glyph before selection
            if (selectionLength === 0 || this._Start < selectionStart) {
                len = selectionLength > 0 ? Math.min(selectionStart - this._Start, this._Length) : this._Length;
                cluster1 = new TextLayoutGlyphCluster(text.substr(this._Start, len), font);
                this._Clusters.push(cluster1);
                index += len;
            }

            //glyph with selection
            var selectionEnd = selectionStart + selectionLength;
            var runEnd = this._Start + this._Length;
            if (index < runEnd && index < selectionEnd) {
                len = Math.min(runEnd - index, selectionEnd - index);
                cluster2 = new TextLayoutGlyphCluster(text.substr(index, len), font, true);
                this._Clusters.push(cluster2);
                index += len;
            }

            var cluster3;
            //glyph after selection
            if (index < runEnd) {
                len = runEnd - index;
                cluster3 = new TextLayoutGlyphCluster(text.substr(index, len), font);
                this._Clusters.push(cluster3);
                index += len;
            }
        }
        _ClearCache() {
            this._Clusters = [];
        }
        _Render(ctx: RenderContextEx, origin: Point, x: number, y: number) {
            var x0 = x;
            if (this._Clusters.length === 0)
                this._GenerateCache();

            for (var i = 0; i < this._Clusters.length; i++) {
                var cluster = this._Clusters[i];
                ctx.save();
                cluster._Render(ctx, origin, this._Attrs, x0, y);
                ctx.restore();
                x0 += cluster._Advance;
            }
        }
        __Debug(allText) {
            return allText.substr(this._Start, this._Length);
        }
    }
    export class TextLayoutLine {
        _Runs: TextLayoutRun[] = [];
        _Layout: TextLayout = null;
        _Start: number = 0;
        private _Offset: number = 0;
        _Advance: number = 0.0; //after layout, will contain horizontal distance this line advances
        _Descend: number = 0.0;
        _Height: number = 0.0;
        _Width: number = 0.0;
        _Length: number = 0;

        constructor(layout: TextLayout, start: number, offset: number) {
            this._Layout = layout;
            this._Start = start;
            this._Offset = offset;
        }
        GetCursorFromX(offset: Point, x: number): number {
            var run: TextLayoutRun = null;
            var layout = this._Layout;
            var ox: number = 0;
            if (offset) ox = offset.X;
            var x0 = ox + layout._HorizontalAlignment(this._Advance);
            var cursor = this._Offset;
            var text = layout.Text;
            var index = this._Start;
            var end: number = 0;
            var c: string = null;

            var i: number;
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
                var font = run._Attrs.Font;
                var m: number = 0;
                var ch: number = 0;
                while (index < end) {
                    ch = index;
                    cursor++;
                    c = text.charAt(index);
                    index++;
                    if (c === '\t')
                        c = ' ';
                    m = Surface.MeasureWidth(c, font);
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
        }
        _Render(ctx, origin: Point, left: number, top: number) {
            var run: TextLayoutRun = null;
            var x0 = left;
            //var y0 = top + this._Height + this._Descend; //not using this: we set html5 canvas to render top-left corner of text at x,y
            var y0 = top;

            for (var i = 0; i < this._Runs.length; i++) {
                run = this._Runs[i];
                run._Render(ctx, origin, x0, y0);
                x0 += run._Advance;
            }
        }
        __Debug(allText) {
            var t = "";
            t += "\t\tRuns: " + this._Runs.length.toString() + "\n";
            for (var i = 0; i < this._Runs.length; i++) {
                t += "\t\t\tRun " + i.toString() + ": ";
                t += this._Runs[i].__Debug(allText);
                t += "\n";
            }
            return t;
        }
    }

    function cloneBreakOp(bop: IBreakOp):IBreakOp {
        return {
            Advance: bop.Advance,
            Index: bop.Index,
            Btype: bop.Btype,
            c: bop.c
        };
    }
    function setWordBasics(bop: IBreakOp, word: ILayoutWord) {
        word.Length = this.Index;
        word.Advance = this.Advance;
    }
    function layoutLwsp(word:ILayoutWord, text: string, font: Font) {
        var advance = Surface.MeasureWidth(text, font);
        word.Advance = advance;
        word.LineAdvance += advance;
        word.Length = text.length;
    }
    function isLineBreak(text: string): number {
        var c0 = text.charAt(0);
        if (c0 === '\n')
            return 1;
        var c1 = text.charAt(1);
        if (c0 === '\r' && c1 === '\n')
            return 2;
        return 0;
    }
    function getWidthConstraint(availWidth: number, maxWidth: number, actualWidth: number): number {
        if (!isFinite(availWidth)) {
            if (!isFinite(maxWidth))
                return actualWidth;
            else
                return Math.min(actualWidth, maxWidth);
        }
        return availWidth;
    }
    function validateAttributes(attributes: ITextAttributes[]): boolean {
        var len = attributes.length;
        var attr: ITextAttributes = attributes[0];
        if (!attr || attr.Start !== 0)
            return false;
        for (var i = 0 ; i < len; i++) {
            attr = attributes[i];
            if (!attr.Font) //WTF: This whole method may not be valid in our case
                return false;
        }
        return true;
    }
    function layoutWordWrap(word: ILayoutWord, text: string, maxWidth: number) {
        word.Length = 0;
        word.Advance = 0.0;
        var measuredIndex = 0;
        var measuredText = "";
        if (text.indexOf(" ", measuredIndex) === -1) {
            var advance = Surface.MeasureWidth(text, word.Font);
            if (isFinite(maxWidth) && (word.LineAdvance + advance) > maxWidth) {
                return true;
            }
            word.Advance = advance;
            word.LineAdvance = advance;
            word.Length = text.length;
            return false;
        }
        while (true) {
            var index = text.indexOf(" ", measuredIndex);
            if (index === -1)
                break;
            index += 1; //include " "
            measuredText = text.slice(measuredIndex, index);
            var advance = Surface.MeasureWidth(measuredText, word.Font);
            if (isFinite(maxWidth) && (word.LineAdvance + advance) > maxWidth) {
                return true;
            }
            measuredIndex = index;
            word.Advance += advance;
            word.LineAdvance += advance;
            word.Length += measuredText.length;
            
        }
        return false;
    }
    function layoutWordNoWrap(word: ILayoutWord, text: string, maxWidth: number): boolean {
        var advance = Surface.MeasureWidth(text, word.Font);
        word.Advance = advance;
        word.LineAdvance += advance;
        word.Length = text.length;
        return false;
    }

    export class TextLayout {
        private _Attrs: ITextAttributes[];

        private _SelectionStart: number = 0;
        private _SelectionLength: number = 0;
        private _Text: string = null;
        AvailableWidth: number = Number.POSITIVE_INFINITY;

        private _Strategy: LineStackingStrategy = LineStackingStrategy.MaxHeight;
        private _Alignment: TextAlignment = TextAlignment.Left;
        private _Trimming: Controls.TextTrimming = Controls.TextTrimming.None;
        private _Wrapping: Controls.TextWrapping = Controls.TextWrapping.NoWrap;

        private _MaxHeight: number = Number.POSITIVE_INFINITY;
        private _MaxWidth: number = Number.POSITIVE_INFINITY;
        private _BaseDescent: number = 0.0;
        private _BaseHeight: number = 0.0;
        private _ActualHeight: number = NaN;
        private _ActualWidth: number = NaN;
        private _LineHeight: number = NaN;
        private _Lines: TextLayoutLine[] = [];
        private _IsWrapped: boolean = true;
        private _Length: number = 0;


        get SelectionStart(): number { return this._SelectionStart; }
        get SelectionLength(): number { return this._SelectionLength; }

        get ActualExtents(): size {
            return size.fromRaw(this._ActualWidth, this._ActualHeight);
        }
        get RenderExtents(): rect {
            this.Layout();
            return rect.set(new rect(), this._HorizontalAlignment(this._ActualWidth), 0.0, this._ActualWidth, this._ActualHeight);
        }

        get MaxWidth(): number { return this._MaxWidth; }
        set MaxWidth(maxWidth: number) {
            if (maxWidth === 0.0)
                maxWidth = Number.POSITIVE_INFINITY;
            if (this._MaxWidth === maxWidth)
                return;
            if (!this._IsWrapped && (!isFinite(maxWidth) || maxWidth > this._ActualWidth)) {
                this._MaxWidth = maxWidth;
                return;
            }
            this._MaxWidth = maxWidth;
            this.ResetState();
        }

        get TextAlignment() { return this._Alignment; }
        set TextAlignment(align: TextAlignment) {
            if (this._Alignment === align)
                return;
            this._Alignment = align;
            this.ResetState();
        }
        SetTextAlignment(align: TextAlignment): boolean {
            if (this._Alignment === align)
                return false;
            this._Alignment = align;
            this.ResetState();
            return true;
        }

        get TextTrimming(): Controls.TextTrimming { return this._Trimming; }
        set TextTrimming(value: Controls.TextTrimming) { this.SetTextTrimming(value); }
        SetTextTrimming(value: Controls.TextTrimming): boolean {
            if (this._Trimming === value)
                return false;
            this._Trimming = value;
            this.ResetState();
            return true;
        }

        get TextWrapping(): Controls.TextWrapping { return this._Wrapping; }
        set TextWrapping(wrapping: Controls.TextWrapping) {
            this.SetTextWrapping(wrapping);
        }
        SetTextWrapping(wrapping: Controls.TextWrapping): boolean {
            switch (wrapping) {
                case Fayde.Controls.TextWrapping.NoWrap:
                case Fayde.Controls.TextWrapping.Wrap:
                    break;
                default:
                    wrapping = Fayde.Controls.TextWrapping.Wrap;
                    break;
            }

            if (this._Wrapping === wrapping)
                return false;
            this._Wrapping = wrapping;
            this.ResetState();
            return true;
        }

        get LineStackingStrategy(): LineStackingStrategy { return this._Strategy; }
        set LineStackingStategy(value) { this.SetLineStackingStategy(value); }
        SetLineStackingStategy(strategy: LineStackingStrategy): boolean {
            if (this._Strategy === strategy)
                return false;
            this._Strategy = strategy;
            this.ResetState();
            return true;
        }

        get LineHeight(): number { return this._LineHeight; }
        set LineHeight(value: number) { this.SetLineHeight(value); }
        SetLineHeight(value: number): boolean {
            if (this._LineHeight === value)
                return false;
            this._LineHeight = value;
            this.ResetState();
            return true;
        }

        get TextAttributes(): ITextAttributes[] { return this._Attrs; }
        set TextAttributes(attrs: ITextAttributes[]) {
            this._Attrs = attrs;
            this.ResetState();
        }

        get Text(): string { return this._Text; }
        set Text(text: string) {
            if (text != null) {
                this._Text = text;
                this._Length = text.length;
            } else {
                this._Text = null;
                this._Length = 0;
            }
            this.ResetState();
        }

        GetSelectionCursor(offset: Point, pos: number): rect {
            var ox: number = 0;
            var oy: number = 0;
            if (offset) {
                ox = offset.X;
                oy = offset.Y;
            }
            var x0 = ox;
            var y0 = oy;
            var height = 0.0;
            var y1 = 0.0;

            var cursor = 0;
            var end: number = 0;
            var line: TextLayoutLine;
            var lines = this._Lines;
            for (var i = 0; i < lines.length; i++) {
                line = lines[i];

                //adjust x0 for horizontal alignment
                x0 = ox + this._HorizontalAlignment(line._Advance);

                //set y1 to baseline
                y1 = y0 + line._Height + line._Descend;
                height = line._Height;

                if (pos >= cursor + line._Length) {
                    if ((i + 1) === this._Lines.length) {
                        if (isLineBreak(this._Text.substr(line._Start + line._Length - 1, 2))) {
                            //cursor is lonely just below the last line
                            x0 = ox + this._HorizontalAlignment(0.0);
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
                var runs = line._Runs;
                var run: TextLayoutRun = null;
                for (var j = 0; j < runs.length; j++) {
                    run = runs[j];
                    end = run._Start + run._Length;

                    if (pos >= cursor + run._Length) {
                        cursor += run._Length;
                        x0 += run._Advance;
                        continue;
                    }

                    if (run._Start === pos)
                        break;
                    //cursor is in this run
                    var font = run._Attrs.Font;
                    x0 += Surface.MeasureWidth(this._Text.slice(run._Start, pos), font);
                    break;
                }
                break;
            }
            var r = new rect();
            rect.set(r, x0, y0, 1.0, height);
            return r;
        }
        GetBaselineOffset(): number {
            var lines = this._Lines;
            if (lines.length === 0)
                return 0;
            var line = lines[0];
            return line._Height + line._Descend;
        }
        GetLineFromY(offset: Point, y: number): TextLayoutLine {
            var line: TextLayoutLine = null;
            var y0 = (offset) ? offset.Y : 0.0;
            var y1: number;
            var lines = this._Lines;
            for (var i = 0; i < lines.length; i++) {
                line = lines[i];
                y1 = y0 + line._Height; //set y1 to top of next line
                if (y < y1) {
                    //we found the line that the point is located on
                    return line;
                }
                y0 = y1;
            }
        }
        GetLineFromIndex(index: number): TextLayoutLine {
            var lines = this._Lines;
            if (index >= lines.length || index < 0)
                return null;
            return lines[index];
        }
        GetCursorFromXY(offset: Point, x: number, y: number): number {
            var oy: number = 0;
            if (offset) oy = offset.Y;
            var lines = this._Lines;
            var line: TextLayoutLine;
            if (y < oy) {
                line = lines[0];
            } else if (!(line = this.GetLineFromY(offset, y))) {
                line = lines[lines.length - 1];
            }
            return line.GetCursorFromX(offset, x);
        }
        Select(start: number, length: number) {
            if (!this._Text) {
                this._SelectionLength = 0;
                this._SelectionStart = 0;
                return;
            }

            var newSelectionStart: number = 0;
            var newSelectionLength: number = 0;
            var index: number = 0;
            var end: number = 0;
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
        }

        Layout() {
            if (!isNaN(this._ActualWidth))
                return;

            this._ActualHeight = 0.0;
            this._ActualWidth = 0.0;
            this._IsWrapped = false;
            this._ClearLines();

            if (this._Text == null || !validateAttributes(this._Attrs))
                return;

            var word: ILayoutWord = {
                Advance: 0.0,
                LineAdvance: 0.0,
                Length: 0.0,
                BreakOps: null,
                Font: new Font()
            };
            if (this._Wrapping === Controls.TextWrapping.Wrap)
                word.BreakOps = [];
            else
                word.BreakOps = null;
            var layoutWordFunc: (word: ILayoutWord, text: string, maxWidth: number) => boolean;
            layoutWordFunc = this._Wrapping === Controls.TextWrapping.NoWrap ? layoutWordNoWrap : layoutWordWrap;

            var line = new TextLayoutLine(this, 0, 0);
            if (this._OverrideLineHeight()) {
                line._Descend = this._GetDescendOverride();
                line._Height = this._GetLineHeightOverride();
            }
            this._Lines.push(line);

            var index = 0;
            var end: number;
            var run: TextLayoutRun;
            var font: Font;
            var attrindex = 0;
            var attrs = this._Attrs;
            var attr: ITextAttributes = attrs[0];
            var nattr: ITextAttributes = attrs[1];

            do {
                end = nattr ? nattr.Start : this._Length;
                run = new TextLayoutRun(line, attr, index);
                line._Runs.push(run);

                word.Font = font = attr.Font;

                if (end - index <= 0) {
                    if (!this._OverrideLineHeight()) {
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
                        var lineBreakLength = isLineBreak(this._Text.slice(index, end));
                        if (lineBreakLength > 0) {
                            if (line._Length == 0 && !this._OverrideLineHeight()) {
                                line._Descend = font._Descender();
                                line._Height = font.GetActualHeight();
                            }

                            line._Length += lineBreakLength;
                            run._Length += lineBreakLength;
                            index += lineBreakLength;
                            linebreak = true;
                            break;
                        }

                        word.LineAdvance = line._Advance;
                        if (layoutWordFunc(word, this._Text.slice(index, end), this._MaxWidth)) {
                            this._IsWrapped = true;
                            wrapped = true;
                        }

                        if (word.Length > 0) {
                            //append the word to the run/line
                            if (!this._OverrideLineHeight()) {
                                line._Descend = Math.min(line._Descend, font._Descender());
                                line._Height = Math.max(line._Height, font.GetActualHeight());
                            }

                            line._Advance += word.Advance;
                            run._Advance += word.Advance;
                            line._Width = line._Advance;
                            line._Length += word.Length;
                            run._Length += word.Length;

                            index += word.Length;
                        }

                        if (wrapped)
                            break;

                        word.LineAdvance = line._Advance;
                        layoutLwsp(word, this._Text.slice(index, end), font);

                        if (word.Length > 0) {
                            if (!this._OverrideLineHeight()) {
                                line._Descend = Math.min(line._Descend, font._Descender());
                                line._Height = Math.max(line._Height, font.GetActualHeight());
                            }

                            line._Advance += word.Advance;
                            run._Advance += word.Advance;
                            line._Width = line._Advance;
                            line._Length += word.Length;
                            run._Length += word.Length;

                            index += word.Length;
                        }
                    }

                    var atend = index >= end;
                    if (linebreak || wrapped || atend) {
                        this._ActualWidth = Math.max(this._ActualWidth, atend ? line._Advance : line._Width);
                        this._ActualHeight += line._Height;

                        if (linebreak || wrapped) {
                            line = new TextLayoutLine(this, index, index);
                            if (!this._OverrideLineHeight()) {
                                if (end - index < 1) {
                                    line._Descend = font._Descender();
                                    line._Height = font.GetActualHeight();
                                }
                            } else {
                                line._Descend = this._GetDescendOverride();
                                line._Height = this._GetLineHeightOverride();
                            }

                            if (linebreak && (end - index < 1))
                                this._ActualHeight += line._Height;

                            this._Lines.push(line);
                        }

                        if (index < end) {
                            run = new TextLayoutRun(line, attr, index);
                            line._Runs.push(run);
                        }
                    }
                }

                attrindex++;
                attr = nattr;
                nattr = attrs[attrindex + 1];
            } while (end - index > 0);
        }

        _HorizontalAlignment(lineWidth: number): number {
            var deltax = 0.0;
            var width: number;
            switch (this._Alignment) {
                case Fayde.TextAlignment.Center:
                    width = getWidthConstraint(this.AvailableWidth, this._MaxWidth, this._ActualWidth);
                    if (lineWidth < width)
                        deltax = (width - lineWidth) / 2.0;
                    break;
                case Fayde.TextAlignment.Right:
                    width = getWidthConstraint(this.AvailableWidth, this._MaxWidth, this._ActualWidth);
                    if (lineWidth < width)
                        deltax = width - lineWidth;
                    break;
            }
            return deltax;
        }
        Render(ctx: RenderContextEx, origin?: Point, offset?: Point) {
            //if origin is null -> {0,0}
            //if offset is null -> {0,0}
            var line: TextLayoutLine;
            var x: number = 0.0;
            var ox: number = (offset) ? offset.X : 0.0;
            var y = (offset) ? offset.Y : 0.0;

            this.Layout();

            for (var i = 0; i < this._Lines.length; i++) {
                line = this._Lines[i];
                x = ox + this._HorizontalAlignment(line._Advance);
                line._Render(ctx, origin, x, y);
                y += line._Height;
            }
        }
        __Debug(): string {
            var allText = this.Text;
            var t = "";
            t += "Lines: " + this._Lines.length.toString() + "\n";
            for (var i = 0; i < this._Lines.length; i++) {
                t += "\tLine " + i.toString() + ":\n";
                t += this._Lines[i].__Debug(allText);
            }
            return t;
        }

        ResetState() {
            this._ActualHeight = NaN;
            this._ActualWidth = NaN;
        }
        private _ClearCache() {
            for (var i = 0, lines = this._Lines, len = lines.length; i < len; i++) {
                for (var j = 0, runs = lines[i]._Runs, len2 = runs.length; j < len2; j++) {
                    runs[j]._ClearCache();
                }
            }
        }
        private _ClearLines() {
            this._Lines = [];
        }


        private _OverrideLineHeight(): boolean {
            return this._Strategy === LineStackingStrategy.BlockLineHeight && this._LineHeight !== 0;
        }
        private _GetLineHeightOverride(): number {
            if (isNaN(this._LineHeight))
                return this._BaseHeight;
            return this._LineHeight;
        }
        private _GetDescendOverride() {
            if (isNaN(this._LineHeight))
                return this._BaseDescent;

            if (this._BaseHeight == 0.0)
                return 0.0;

            return this._LineHeight * (this._BaseDescent / this._BaseHeight);
        }
    }
}