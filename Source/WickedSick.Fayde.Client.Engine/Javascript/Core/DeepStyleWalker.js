/// <reference path="../Runtime/RefObject.js" />
/// CODE
/// <reference path="Style.js"/>
/// <reference path="Setter.js"/>

//#region _DeepStyleWalker

function _DeepStyleWalker(styles) {
    RefObject.call(this);
    
    if (!IsDocumentReady())
        return;

    this._Setters = new Array();
    this._Offset = 0;

    if (styles instanceof Style)
        this._InitializeStyle(styles);
    else if (styles instanceof Array)
        this._InitializeStyles(styles);
}
_DeepStyleWalker.InheritFrom(RefObject);

_DeepStyleWalker.prototype.Step = function () {
    if (this._Offset < this._Setters.length) {
        var s = this._Setters[this._Offset];
        this._Offset++;
        return s;
    }
    return undefined;
};
_DeepStyleWalker.prototype._InitializeStyle = function (style) {
    var dps = new Array();
    var cur = style;
    while (cur) {
        var setters = cur.GetSetters();
        for (var i = setters.length; i >= 0; i--) {
            var setter = setters[i];
            var propd = setter.GetProperty();
            if (!dps[propd]) {
                dps[propd] = true;
                this._Setters.push(setter);
            }
        }
        cur = cur.GetBasedOn();
    }
    this._Setters.sort(_DeepStyleWalker.SetterSort);
};
_DeepStyleWalker.prototype._InitializeStyles = function (styles) {
    if (!styles)
        return;

    var dps = new Array();
    var stylesSeen = new Array();
    for (var i = 0; i < _StyleIndex.Count; i++) {
        var style = styles[i];
        while (style != null) {
            if (stylesSeen[style]) //FIX: NOT GONNA WORK
                continue;

            var setters = style.GetSetters();
            var count = setters ? setters.GetCount() : 0;
            for (var j = count - 1; j >= 0; j--) {
                var setter = setters.GetValueAt(j);
                if (!setter || !(setter instanceof Setter))
                    continue;

                var dpVal = setter.GetValue(Setter.PropertyProperty);
                if (!dpVal)
                    continue;

                if (!dps[dpVal]) {
                    dps[dpVal] = setter;
                    this._Setters.push(setter);
                }
            }

            stylesSeen[style] = true;
            style = style.GetBasedOn();
        }
    }
    this._Setters.sort(_DeepStyleWalker.SetterSort);
};

_DeepStyleWalker.SetterSort = function (a, b) {
    var as = a.toString();
    var bs = a.toString();
    return (as == bs) ? 0 : ((as > bs) ? 1 : -1);
};

//#endregion
