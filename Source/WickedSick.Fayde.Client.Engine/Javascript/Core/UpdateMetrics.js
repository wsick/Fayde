/// <reference path="../Primitives.js"/>
/// CODE

(function (Fayde) {
    "use asm";
    function CreateUpdateMetrics() {
        var metrics = {
            Width: +NaN,
            Height: +NaN,
            MinWidth: +0,
            MinHeight: +0,
            MaxWidth: +Infinity,
            MaxHeight: +Infinity,
            UseLayoutRounding: +1,
            CoerceSize: function (s) {
                var spw = this.Width;
                var sph = this.Height;
                var cw = this.MinWidth;
                var ch = this.MinHeight;

                cw = Math.max(cw, s.Width);
                ch = Math.max(ch, s.Height);

                if (!isNaN(spw))
                    cw = spw;

                if (!isNaN(sph))
                    ch = sph;

                cw = Math.max(Math.min(cw, this.MaxWidth), this.MinWidth);
                ch = Math.max(Math.min(ch, this.MaxHeight), this.MinHeight);

                if (this.UseLayoutRounding) {
                    cw = Math.round(cw);
                    ch = Math.round(ch);
                }

                s.Width = cw;
                s.Height = ch;
                return s;
            }
        };
        return metrics;
    };
    Fayde.CreateMeasurePass = CreateMeasurePass;
    Fayde.CreateUpdateMetrics = CreateUpdateMetrics;
})(Fayde || (Fayde = {}));