/// <reference path="../Runtime/Nullstone.js" />
/// CODE
/// <reference path="Style.js"/>
/// <reference path="Setter.js"/>

(function (namespace) {
    var _DeepStyleWalker = Nullstone.Create("_DeepStyleWalker", undefined, 1);

    _DeepStyleWalker.Instance.Init = function (styles) {
        this._Setters = [];
        this._Offset = 0;

        if (styles instanceof Fayde.Style)
            this._InitializeStyle(styles);
        else if (styles instanceof Array)
            this._InitializeStyles(styles);
    };

    _DeepStyleWalker.Instance.Step = function () {
        /// <returns type="Setter" />
        if (this._Offset < this._Setters.length) {
            var s = this._Setters[this._Offset];
            this._Offset++;
            return s;
        }
        return undefined;
    };
    _DeepStyleWalker.Instance._InitializeStyle = function (style) {
        var dps = [];
        var cur = style;
        while (cur) {
            var setters = cur.Setters;
            var count = setters.GetCount();
            for (var i = count - 1; i >= 0; i--) {
                var setter = Nullstone.As(setters.GetValueAt(i), Fayde.Setter);
                if (!setter)
                    continue;
                var propd = setter._GetValue(Fayde.Setter.PropertyProperty);
                if (!propd)
                    continue;
                if (dps[propd])
                    continue;
                dps[propd] = setter;
                this._Setters.push(setter);
            }
            cur = cur.BasedOn;
        }
        this._Setters.sort(_DeepStyleWalker.SetterSort);
    };
    _DeepStyleWalker.Instance._InitializeStyles = function (styles) {
        if (!styles)
            return;

        var dps = [];
        var stylesSeen = [];
        for (var i = 0; i < _StyleIndex.Count; i++) {
            var style = styles[i];
            while (style) {
                if (stylesSeen[style._ID])
                    continue;

                var setters = style.Setters;
                var count = setters ? setters.GetCount() : 0;
                for (var j = count - 1; j >= 0; j--) {
                    var setter = Nullstone.As(setters.GetValueAt(j), Fayde.Setter);
                    if (!setter)
                        continue;
                    var propd = setter._GetValue(Fayde.Setter.PropertyProperty);
                    if (!propd)
                        continue;
                    if (dps[propd])
                        continue;
                    dps[propd] = setter;
                    this._Setters.push(setter);
                }

                stylesSeen[style._ID] = true;
                style = style.BasedOn;
            }
        }
        this._Setters.sort(_DeepStyleWalker.SetterSort);
    };

    _DeepStyleWalker.SetterSort = function (setter1, setter2) {
        /// <param name="setter1" type="Setter"></param>
        /// <param name="setter2" type="Setter"></param>
        var a = setter1._GetValue(Fayde.Setter.PropertyProperty);
        var b = setter2._GetValue(Fayde.Setter.PropertyProperty);
        return (a === b) ? 0 : ((a > b) ? 1 : -1);
    };

    namespace._DeepStyleWalker = Nullstone.FinishCreate(_DeepStyleWalker);
})(window);