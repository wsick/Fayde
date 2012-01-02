TextLayout.prototype = new Object;
TextLayout.prototype.constructor = TextLayout;
function TextLayout() {
}



_TextLayoutLine.prototype = new Object;
_TextLayoutLine.prototype.constructor = _TextLayoutLine;
function _TextLayoutLine() {
}



_TextLayoutRun.prototype = new Object;
_TextLayoutRun.prototype.constructor = _TextLayoutRun;
function _TextLayoutRun(line, attrs, start) {
    this._Attrs = attrs;
    this._Start = start;
    this._Line = line;
    this._Advance = 0.0;
    this._Length = 0;
    this._Count = 0;
}