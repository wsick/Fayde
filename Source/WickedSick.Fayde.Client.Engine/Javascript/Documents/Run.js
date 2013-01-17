/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="Inline.js"/>
/// CODE

(function (namespace) {
    var Run = Nullstone.Create("Run", Inline);

    //#region Properties

    Run.FlowDirectionProperty = DependencyProperty.RegisterInheritable("FlowDirection", function () { return new Enum(FlowDirection); }, Run, FlowDirection.LeftToRight, undefined, undefined, _Inheritable.FlowDirection);
    Run.TextProperty = DependencyProperty.Register("Text", function () { return String; }, Run);

    Nullstone.AutoProperties(Run, [
        Run.FlowDirectionProperty,
        Run.TextProperty
    ]);

    //#endregion

    Run.Instance._SerializeText = function () {
        /// <returns type="String" />
        return this.Text;
    };

    namespace.Run = Nullstone.FinishCreate(Run);
})(window);