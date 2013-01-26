/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="Enums.js"/>
/// CODE

(function (namespace) {
    var RelativeSource = Nullstone.Create("RelativeSource", undefined, 1);

    RelativeSource.Instance.Init = function (mode) {
        if (mode == null)
            mode = namespace.RelativeSourceMode.TemplatedParent;
        this.Mode = mode;
    };

    Nullstone.AutoProperties(RelativeSource, [
        "Mode"
    ]);

    namespace.RelativeSource = Nullstone.FinishCreate(RelativeSource);
})(Nullstone.Namespace("Fayde.Data"));