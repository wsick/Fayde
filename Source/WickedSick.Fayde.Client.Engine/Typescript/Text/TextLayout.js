var Fayde;
(function (Fayde) {
    /// CODE
    /// <reference path="TextAttributes.ts" />
    /// <reference path="../Primitives/size.ts" />
    /// <reference path="../Engine/RenderContext.ts" />
    /// <reference path="../Engine/Surface.ts" />
    /// <reference path="../Core/Enums.ts" />
    /// <reference path="../Controls/Enums.ts" />
    (function (Text) {
        var TextLayoutGlyphCluster = (function () {
            function TextLayoutGlyphCluster(text, font, selected) {
                this._Selected = false;
                this._Advance = 0;
                this._Text = text;
                this._Selected = selected == true;
                this._Advance = Surface.MeasureWidth(text, font);
            }
            TextLayoutGlyphCluster.prototype._Render = function (ctx, origin, attrs, x, y) {
                if(this._Text.length == 0 || this._Advance == 0.0) {
                    return;
                }
                var font = attrs.Font;
                var y0 = font._Ascender();
                ctx.Translate(x, y - y0);
                var brush;
                var fontHeight = font.GetActualHeight();
                var area = new rect();
                var ox = 0;
                var oy = 0;
                if(origin) {
                    ox = origin.X;
                    oy = origin.Y;
                }
                rect.set(area, ox, oy, this._Advance, fontHeight);
                if(this._Selected && (brush = attrs.GetBackground(true))) {
                    ctx.FillRect(brush, area)//selection background
                    ;
                }
                var canvasCtx = ctx.CanvasContext;
                brush = attrs.GetForeground(this._Selected);
                if(brush) {
                    brush.SetupBrush(canvasCtx, area);
                    var brushHtml5 = brush.ToHtml5Object();
                    canvasCtx.fillStyle = brushHtml5;
                } else {
                    canvasCtx.fillStyle = "#000000";
                }
                canvasCtx.font = font.ToHtml5Object();
                canvasCtx.textAlign = "left";
                canvasCtx.textBaseline = "top";
                canvasCtx.fillText(this._Text, 0, 0);
                //DrawDebug("Text: " + this._Text + " [" + canvasCtx.fillStyle.toString() + "]");
                if(attrs.IsUnderlined) {
                    canvasCtx.beginPath();
                    canvasCtx.moveTo(0, fontHeight);
                    canvasCtx.lineTo(this._Advance, fontHeight);
                    canvasCtx.lineWidth = 2;
                    canvasCtx.strokeStyle = brushHtml5;
                    canvasCtx.stroke();
                }
            };
            return TextLayoutGlyphCluster;
        })();
        Text.TextLayoutGlyphCluster = TextLayoutGlyphCluster;        
        var TextLayoutRun = (function () {
            function TextLayoutRun(line, attrs, start) {
                this._Clusters = [];
                this._Attrs = null;
                this._Start = 0;
                this._Line = null;
                this._Advance = 0.0;
                //after layout, will contain horizontal distance this run advances
                this._Length = 0;
                this._Attrs = attrs;
                this._Start = start;
                this._Line = line;
            }
            TextLayoutRun.prototype._GenerateCache = function () {
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
                if(selectionLength === 0 || this._Start < selectionStart) {
                    len = selectionLength > 0 ? Math.min(selectionStart - this._Start, this._Length) : this._Length;
                    cluster1 = new TextLayoutGlyphCluster(text.substr(this._Start, len), font);
                    this._Clusters.push(cluster1);
                    index += len;
                }
                //glyph with selection
                var selectionEnd = selectionStart + selectionLength;
                var runEnd = this._Start + this._Length;
                if(index < runEnd && index < selectionEnd) {
                    len = Math.min(runEnd - index, selectionEnd - index);
                    cluster2 = new TextLayoutGlyphCluster(text.substr(index, len), font, true);
                    this._Clusters.push(cluster2);
                    index += len;
                }
                var cluster3;
                //glyph after selection
                if(index < runEnd) {
                    len = runEnd - index;
                    cluster3 = new TextLayoutGlyphCluster(text.substr(index, len), font);
                    this._Clusters.push(cluster3);
                    index += len;
                }
            };
            TextLayoutRun.prototype._ClearCache = function () {
                this._Clusters = [];
            };
            TextLayoutRun.prototype._Render = function (ctx, origin, x, y) {
                var x0 = x;
                if(this._Clusters.length === 0) {
                    this._GenerateCache();
                }
                for(var i = 0; i < this._Clusters.length; i++) {
                    var cluster = this._Clusters[i];
                    ctx.Save();
                    cluster._Render(ctx, origin, this._Attrs, x0, y);
                    ctx.Restore();
                    x0 += cluster._Advance;
                }
            };
            TextLayoutRun.prototype.__Debug = function (allText) {
                return allText.substr(this._Start, this._Length);
            };
            return TextLayoutRun;
        })();
        Text.TextLayoutRun = TextLayoutRun;        
        var TextLayoutLine = (function () {
            function TextLayoutLine(layout, start, offset) {
                this._Runs = [];
                this._Layout = null;
                this._Start = 0;
                this._Offset = 0;
                this._Advance = 0.0;
                //after layout, will contain horizontal distance this line advances
                this._Descend = 0.0;
                this._Height = 0.0;
                this._Width = 0.0;
                this._Length = 0;
                this._Layout = layout;
                this._Start = start;
                this._Offset = offset;
            }
            TextLayoutLine.prototype.GetCursorFromX = function (offset, x) {
                var run = null;
                var layout = this._Layout;
                var ox = 0;
                if(offset) {
                    ox = offset.X;
                }
                var x0 = ox + layout._HorizontalAlignment(this._Advance);
                var cursor = this._Offset;
                var text = layout.Text;
                var index = this._Start;
                var end = 0;
                var c = null;
                var i;
                for(i = 0; i < this._Runs.length; i++) {
                    run = this._Runs[i];
                    if(x < (x0 + run._Advance)) {
                        break;
                    }// x is somewhere inside this run
                    
                    cursor += run._Length;
                    index += run._Length;
                    x0 += run._Advance;
                    run = null;
                }
                if(run != null) {
                    index = run._Start;
                    end = run._Start + run._Length;
                    var font = run._Attrs.Font;
                    var m = 0;
                    var ch = 0;
                    while(index < end) {
                        ch = index;
                        cursor++;
                        c = text.charAt(index);
                        index++;
                        if(c === '\t') {
                            c = ' ';
                        }
                        m = Surface.MeasureWidth(c, font);
                        if(x <= x0 + (m / 2.0)) {
                            index = ch;
                            cursor--;
                            break;
                        }
                        x0 += m;
                    }
                } else if(i > 0) {
                    // x is beyond the end of the last run
                    run = this._Runs[i - 1];
                    end = run._Start + run._Length;
                    index = run._Start;
                    c = end - 1 < 0 ? null : text.charAt(end - 1);
                    if(c == '\n') {
                        cursor--;
                        end--;
                        c = end - 1 < 0 ? null : text.charAt(end - 1);
                        if(c == '\r') {
                            cursor--;
                            end--;
                        }
                    }
                }
                return cursor;
            };
            TextLayoutLine.prototype._Render = function (ctx, origin, left, top) {
                var run = null;
                var x0 = left;
                //var y0 = top + this._Height + this._Descend; //not using this: we set html5 canvas to render top-left corner of text at x,y
                var y0 = top;
                for(var i = 0; i < this._Runs.length; i++) {
                    run = this._Runs[i];
                    run._Render(ctx, origin, x0, y0);
                    x0 += run._Advance;
                }
            };
            TextLayoutLine.prototype.__Debug = function (allText) {
                var t = "";
                t += "\t\tRuns: " + this._Runs.length.toString() + "\n";
                for(var i = 0; i < this._Runs.length; i++) {
                    t += "\t\t\tRun " + i.toString() + ": ";
                    t += this._Runs[i].__Debug(allText);
                    t += "\n";
                }
                return t;
            };
            return TextLayoutLine;
        })();
        Text.TextLayoutLine = TextLayoutLine;        
        function cloneBreakOp(bop) {
            return {
                Advance: bop.Advance,
                Index: bop.Index,
                Btype: bop.Btype,
                c: bop.c
            };
        }
        function setWordBasics(bop, word) {
            word.Length = this.Index;
            word.Advance = this.Advance;
        }
        function layoutLwsp(word, text, font) {
            var advance = Surface.MeasureWidth(text, font);
            word.Advance = advance;
            word.LineAdvance += advance;
            word.Length = text.length;
        }
        function isLineBreak(text) {
            var c0 = text.charAt(0);
            if(c0 === '\n') {
                return 1;
            }
            var c1 = text.charAt(1);
            if(c0 === '\r' && c1 === '\n') {
                return 2;
            }
            return 0;
        }
        function getWidthConstraint(availWidth, maxWidth, actualWidth) {
            if(!isFinite(availWidth)) {
                if(!isFinite(maxWidth)) {
                    return actualWidth;
                } else {
                    return Math.min(actualWidth, maxWidth);
                }
            }
            return availWidth;
        }
        function validateAttributes(attributes) {
            var len = attributes.length;
            var attr = attributes[0];
            if(!attr || attr.Start !== 0) {
                return false;
            }
            for(var i = 0; i < len; i++) {
                attr = attributes[i];
                if(!attr.Font) {
                    //WTF: This whole method may not be valid in our case
                    return false;
                }
            }
            return true;
        }
        function layoutWordWrap(word, text, maxWidth) {
            word.Length = 0;
            word.Advance = 0.0;
            var measuredIndex = 0;
            var measuredText = "";
            if(text.indexOf(" ", measuredIndex) === -1) {
                var advance = Surface.MeasureWidth(text, word.Font);
                if(isFinite(maxWidth) && (word.LineAdvance + advance) > maxWidth) {
                    return true;
                }
                word.Advance = advance;
                word.LineAdvance = advance;
                word.Length = text.length;
                return false;
            }
            var tempText = text;
            while(true) {
                var index = tempText.indexOf(" ", measuredIndex);
                if(index === -1) {
                    break;
                }
                index += 1//include " "
                ;
                tempText = tempText.slice(measuredIndex, index);
                var advance = Surface.MeasureWidth(tempText, word.Font);
                if(isFinite(maxWidth) && (word.LineAdvance + advance) > maxWidth) {
                    return true;
                }
                measuredIndex = index;
                measuredText = tempText;
                word.Advance += advance;
                word.LineAdvance += advance;
                word.Length += measuredText.length;
            }
            return false;
        }
        function layoutWordNoWrap(word, text, maxWidth) {
            var advance = Surface.MeasureWidth(text, word.Font);
            word.Advance = advance;
            word.LineAdvance += advance;
            word.Length = text.length;
            return false;
        }
        var TextLayout = (function () {
            function TextLayout() {
                this._SelectionStart = 0;
                this._SelectionLength = 0;
                this._Text = null;
                this.AvailableWidth = Number.POSITIVE_INFINITY;
                this._Strategy = Fayde.LineStackingStrategy.MaxHeight;
                this._Alignment = Fayde.TextAlignment.Left;
                this._Trimming = Fayde.Controls.TextTrimming.None;
                this._Wrapping = Fayde.Controls.TextWrapping.NoWrap;
                this._MaxHeight = Number.POSITIVE_INFINITY;
                this._MaxWidth = Number.POSITIVE_INFINITY;
                this._BaseDescent = 0.0;
                this._BaseHeight = 0.0;
                this._ActualHeight = NaN;
                this._ActualWidth = NaN;
                this._LineHeight = NaN;
                this._Lines = [];
                this._IsWrapped = true;
                this._Length = 0;
            }
            Object.defineProperty(TextLayout.prototype, "SelectionStart", {
                get: function () {
                    return this._SelectionStart;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TextLayout.prototype, "SelectionLength", {
                get: function () {
                    return this._SelectionLength;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TextLayout.prototype, "ActualExtents", {
                get: function () {
                    return size.fromRaw(this._ActualWidth, this._ActualHeight);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TextLayout.prototype, "RenderExtents", {
                get: function () {
                    this.Layout();
                    var r = new rect();
                    rect.set(r, this._HorizontalAlignment(this._ActualWidth), 0.0, this._ActualWidth, this._ActualHeight);
                    return r;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TextLayout.prototype, "MaxWidth", {
                get: function () {
                    return this._MaxWidth;
                },
                set: function (maxWidth) {
                    if(maxWidth === 0.0) {
                        maxWidth = Number.POSITIVE_INFINITY;
                    }
                    if(this._MaxWidth === maxWidth) {
                        return false;
                    }
                    if(!this._IsWrapped && (!isFinite(maxWidth) || maxWidth > this._ActualWidth)) {
                        this._MaxWidth = maxWidth;
                        return false;
                    }
                    this._MaxWidth = maxWidth;
                    this.ResetState();
                    return true;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TextLayout.prototype, "TextAlignment", {
                get: function () {
                    return this._Alignment;
                },
                set: function (align) {
                    if(this._Alignment === align) {
                        return;
                    }
                    this._Alignment = align;
                    this.ResetState();
                },
                enumerable: true,
                configurable: true
            });
            TextLayout.prototype.SetTextAlignment = function (align) {
                if(this._Alignment === align) {
                    return false;
                }
                this._Alignment = align;
                this.ResetState();
                return true;
            };
            Object.defineProperty(TextLayout.prototype, "TextTrimming", {
                get: function () {
                    return this._Trimming;
                },
                set: function (value) {
                    this.SetTextTrimming(value);
                },
                enumerable: true,
                configurable: true
            });
            TextLayout.prototype.SetTextTrimming = function (value) {
                if(this._Trimming === value) {
                    return false;
                }
                this._Trimming = value;
                this.ResetState();
                return true;
            };
            Object.defineProperty(TextLayout.prototype, "TextWrapping", {
                get: function () {
                    return this._Wrapping;
                },
                set: function (wrapping) {
                    this.SetTextWrapping(wrapping);
                },
                enumerable: true,
                configurable: true
            });
            TextLayout.prototype.SetTextWrapping = function (wrapping) {
                switch(wrapping) {
                    case Fayde.Controls.TextWrapping.NoWrap:
                    case Fayde.Controls.TextWrapping.Wrap:
                        break;
                    default:
                        wrapping = Fayde.Controls.TextWrapping.Wrap;
                        break;
                }
                if(this._Wrapping === wrapping) {
                    return false;
                }
                this._Wrapping = wrapping;
                this.ResetState();
                return true;
            };
            Object.defineProperty(TextLayout.prototype, "LineStackingStrategy", {
                get: function () {
                    return this._Strategy;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TextLayout.prototype, "LineStackingStategy", {
                set: function (value) {
                    this.SetLineStackingStategy(value);
                },
                enumerable: true,
                configurable: true
            });
            TextLayout.prototype.SetLineStackingStategy = function (strategy) {
                if(this._Strategy === strategy) {
                    return false;
                }
                this._Strategy = strategy;
                this.ResetState();
                return true;
            };
            Object.defineProperty(TextLayout.prototype, "LineHeight", {
                get: function () {
                    return this._LineHeight;
                },
                set: function (value) {
                    this.SetLineHeight(value);
                },
                enumerable: true,
                configurable: true
            });
            TextLayout.prototype.SetLineHeight = function (value) {
                if(this._LineHeight === value) {
                    return false;
                }
                this._LineHeight = value;
                this.ResetState();
                return true;
            };
            Object.defineProperty(TextLayout.prototype, "TextAttributes", {
                get: function () {
                    return this._Attrs;
                },
                set: function (attrs) {
                    this._Attrs = attrs;
                    this.ResetState();
                    return true;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TextLayout.prototype, "Text", {
                get: function () {
                    return this._Text;
                },
                set: function (text) {
                    if(text != null) {
                        this._Text = text;
                        this._Length = text.length;
                    } else {
                        this._Text = null;
                        this._Length = 0;
                    }
                    this.ResetState();
                    return true;
                },
                enumerable: true,
                configurable: true
            });
            TextLayout.prototype.GetSelectionCursor = function (offset, pos) {
                var ox = 0;
                var oy = 0;
                if(offset) {
                    ox = offset.X;
                    oy = offset.Y;
                }
                var x0 = ox;
                var y0 = oy;
                var height = 0.0;
                var y1 = 0.0;
                var cursor = 0;
                var end = 0;
                var line;
                var lines = this._Lines;
                for(var i = 0; i < lines.length; i++) {
                    line = lines[i];
                    //adjust x0 for horizontal alignment
                    x0 = ox + this._HorizontalAlignment(line._Advance);
                    //set y1 to baseline
                    y1 = y0 + line._Height + line._Descend;
                    height = line._Height;
                    if(pos >= cursor + line._Length) {
                        if((i + 1) === this._Lines.length) {
                            if(isLineBreak(this._Text.substr(line._Start + line._Length - 1, 2))) {
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
                    var run = null;
                    for(var j = 0; j < runs.length; j++) {
                        run = runs[j];
                        end = run._Start + run._Length;
                        if(pos >= cursor + run._Length) {
                            cursor += run._Length;
                            x0 += run._Advance;
                            continue;
                        }
                        if(run._Start === pos) {
                            break;
                        }
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
            };
            TextLayout.prototype.GetBaselineOffset = function () {
                var lines = this._Lines;
                if(lines.length === 0) {
                    return 0;
                }
                var line = lines[0];
                return line._Height + line._Descend;
            };
            TextLayout.prototype.GetLineFromY = function (offset, y) {
                var line = null;
                var y0 = (offset) ? offset.Y : 0.0;
                var y1;
                var lines = this._Lines;
                for(var i = 0; i < lines.length; i++) {
                    line = lines[i];
                    y1 = y0 + line._Height//set y1 to top of next line
                    ;
                    if(y < y1) {
                        //we found the line that the point is located on
                        return line;
                    }
                    y0 = y1;
                }
            };
            TextLayout.prototype.GetLineFromIndex = function (index) {
                var lines = this._Lines;
                if(index >= lines.length || index < 0) {
                    return null;
                }
                return lines[index];
            };
            TextLayout.prototype.GetCursorFromXY = function (offset, x, y) {
                var oy = 0;
                if(offset) {
                    oy = offset.Y;
                }
                var lines = this._Lines;
                var line;
                if(y < oy) {
                    line = lines[0];
                } else if(!(line = this.GetLineFromY(offset, y))) {
                    line = lines[lines.length - 1];
                }
                return line.GetCursorFromX(offset, x);
            };
            TextLayout.prototype.Select = function (start, length) {
                if(!this._Text) {
                    this._SelectionLength = 0;
                    this._SelectionStart = 0;
                    return;
                }
                var newSelectionStart = 0;
                var newSelectionLength = 0;
                var index = 0;
                var end = 0;
                if(!false) {
                    newSelectionStart = index = start;
                    end = index + length;
                    newSelectionLength = length;
                } else {
                    newSelectionLength = length;
                    newSelectionStart = start;
                }
                if(this._SelectionStart === newSelectionStart && this._SelectionLength === newSelectionLength) {
                    return;
                }
                if(this._SelectionLength > 0 || newSelectionLength > 0) {
                    this._ClearCache();
                }
                this._SelectionLength = newSelectionLength;
                this._SelectionStart = newSelectionStart;
            };
            TextLayout.prototype.Layout = function () {
                if(!isNaN(this._ActualWidth)) {
                    return;
                }
                this._ActualHeight = 0.0;
                this._ActualWidth = 0.0;
                this._IsWrapped = false;
                this._ClearLines();
                if(this._Text == null || !validateAttributes(this._Attrs)) {
                    return;
                }
                var word = {
                    Advance: 0.0,
                    LineAdvance: 0.0,
                    Length: 0.0,
                    BreakOps: null,
                    Font: new Font()
                };
                if(this._Wrapping === Fayde.Controls.TextWrapping.Wrap) {
                    word.BreakOps = [];
                } else {
                    word.BreakOps = null;
                }
                var layoutWordFunc;
                layoutWordFunc = this._Wrapping === Fayde.Controls.TextWrapping.NoWrap ? layoutWordNoWrap : layoutWordWrap;
                var line = new TextLayoutLine(this, 0, 0);
                if(this._OverrideLineHeight()) {
                    line._Descend = this._GetDescendOverride();
                    line._Height = this._GetLineHeightOverride();
                }
                this._Lines.push(line);
                var index = 0;
                var end;
                var run;
                var font;
                var attrindex = 0;
                var attrs = this._Attrs;
                var attr = attrs[0];
                var nattr = attrs[1];
                do {
                    end = nattr ? nattr.Start : this._Length;
                    run = new TextLayoutRun(line, attr, index);
                    line._Runs.push(run);
                    word.Font = font = attr.Font;
                    if(end - index <= 0) {
                        if(!this._OverrideLineHeight()) {
                            line._Descend = Math.min(line._Descend, font._Descender());
                            line._Height = Math.max(line._Height, font.GetActualHeight());
                        }
                        this._ActualHeight += line._Height;
                        break;
                    }
                    //layout until attrs change
                    while(index < end) {
                        var linebreak = false;
                        var wrapped = false;
                        //layout until end of line or max width reached
                        while(index < end) {
                            var lineBreakLength = isLineBreak(this._Text.slice(index, end));
                            if(lineBreakLength > 0) {
                                if(line._Length == 0 && !this._OverrideLineHeight()) {
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
                            if(layoutWordFunc(word, this._Text.slice(index, end), this._MaxWidth)) {
                                this._IsWrapped = true;
                                wrapped = true;
                            }
                            if(word.Length > 0) {
                                //append the word to the run/line
                                if(!this._OverrideLineHeight()) {
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
                            if(wrapped) {
                                break;
                            }
                            word.LineAdvance = line._Advance;
                            layoutLwsp(word, this._Text.slice(index, end), font);
                            if(word.Length > 0) {
                                if(!this._OverrideLineHeight()) {
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
                        if(linebreak || wrapped || atend) {
                            this._ActualWidth = Math.max(this._ActualWidth, atend ? line._Advance : line._Width);
                            this._ActualHeight += line._Height;
                            if(linebreak || wrapped) {
                                line = new TextLayoutLine(this, index, index);
                                if(!this._OverrideLineHeight()) {
                                    if(end - index < 1) {
                                        line._Descend = font._Descender();
                                        line._Height = font.GetActualHeight();
                                    }
                                } else {
                                    line._Descend = this._GetDescendOverride();
                                    line._Height = this._GetLineHeightOverride();
                                }
                                if(linebreak && (end - index < 1)) {
                                    this._ActualHeight += line._Height;
                                }
                                this._Lines.push(line);
                            }
                            if(index < end) {
                                run = new TextLayoutRun(line, attr, index);
                                line._Runs.push(run);
                            }
                        }
                    }
                    attrindex++;
                    attr = nattr;
                    nattr = attrs[attrindex + 1];
                }while(end - index > 0);
            };
            TextLayout.prototype._HorizontalAlignment = function (lineWidth) {
                var deltax = 0.0;
                var width;
                switch(this._Alignment) {
                    case Fayde.TextAlignment.Center:
                        width = getWidthConstraint(this.AvailableWidth, this._MaxWidth, this._ActualWidth);
                        if(lineWidth < width) {
                            deltax = (width - lineWidth) / 2.0;
                        }
                        break;
                    case Fayde.TextAlignment.Right:
                        width = getWidthConstraint(this.AvailableWidth, this._MaxWidth, this._ActualWidth);
                        if(lineWidth < width) {
                            deltax = width - lineWidth;
                        }
                        break;
                }
                return deltax;
            };
            TextLayout.prototype.Render = function (ctx, origin, offset) {
                //if origin is null -> {0,0}
                //if offset is null -> {0,0}
                var line;
                var x = 0.0;
                var ox = (offset) ? offset.X : 0.0;
                var y = (offset) ? offset.Y : 0.0;
                this.Layout();
                for(var i = 0; i < this._Lines.length; i++) {
                    line = this._Lines[i];
                    x = ox + this._HorizontalAlignment(line._Advance);
                    line._Render(ctx, origin, x, y);
                    y += line._Height;
                }
            };
            TextLayout.prototype.__Debug = function () {
                var allText = this.Text;
                var t = "";
                t += "Lines: " + this._Lines.length.toString() + "\n";
                for(var i = 0; i < this._Lines.length; i++) {
                    t += "\tLine " + i.toString() + ":\n";
                    t += this._Lines[i].__Debug(allText);
                }
                return t;
            };
            TextLayout.prototype.ResetState = function () {
                this._ActualHeight = NaN;
                this._ActualWidth = NaN;
            };
            TextLayout.prototype._ClearCache = function () {
                var line = null;
                var lines = this._Lines;
                var len = lines.length;
                var runs;
                var runlen = 0;
                for(var i = 0; i < len; i++) {
                    line = lines[i];
                    runs = line._Runs;
                    runlen = runs.length;
                    for(var j = 0; j < runlen; j++) {
                        runs[i]._ClearCache();
                    }
                }
            };
            TextLayout.prototype._ClearLines = function () {
                this._Lines = [];
            };
            TextLayout.prototype._OverrideLineHeight = function () {
                return this._Strategy === Fayde.LineStackingStrategy.BlockLineHeight && this._LineHeight !== 0;
            };
            TextLayout.prototype._GetLineHeightOverride = function () {
                if(isNaN(this._LineHeight)) {
                    return this._BaseHeight;
                }
                return this._LineHeight;
            };
            TextLayout.prototype._GetDescendOverride = function () {
                if(isNaN(this._LineHeight)) {
                    return this._BaseDescent;
                }
                if(this._BaseHeight == 0.0) {
                    return 0.0;
                }
                return this._LineHeight * (this._BaseDescent / this._BaseHeight);
            };
            return TextLayout;
        })();
        Text.TextLayout = TextLayout;        
    })(Fayde.Text || (Fayde.Text = {}));
    var Text = Fayde.Text;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=TextLayout.js.map
