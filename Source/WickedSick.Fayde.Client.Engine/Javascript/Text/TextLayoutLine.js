/// <reference path="../Runtime/Nullstone.js" />
/// CODE
/// <reference path="../Engine/Surface.js"/>

(function (namespace) {
    var _TextLayoutLine = Nullstone.Create("_TextLayoutLine", null, 3);

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

    namespace._TextLayoutLine = Nullstone.FinishCreate(_TextLayoutLine);
})(window);