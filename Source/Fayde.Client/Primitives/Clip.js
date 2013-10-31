/// <reference path="../Runtime/TypeManagement.ts" />
var Clip = (function () {
    function Clip(r) {
        var rounded = rect.roundOut(rect.copyTo(r));
        this.X = rounded.X;
        this.Y = rounded.Y;
        this.Width = rounded.Width;
        this.Height = rounded.Height;
    }
    return Clip;
})();
Fayde.RegisterType(Clip, {
    Name: "Clip",
    Namespace: "window",
    XmlNamespace: Fayde.XMLNSX
});
//# sourceMappingURL=Clip.js.map
