/// <reference path="../../Core/DependencyObject.js"/>
/// CODE
/// <reference path="../../Primitives/Thickness.js"/>

(function (namespace) {
    var Effect = Nullstone.Create("Effect", Fayde.DependencyObject);

    //#region Properties

    Effect.EffectMappingProperty = DependencyProperty.Register("EffectMapping", function () { return Fayde.Media.GeneralTransform; }, Effect);

    Nullstone.AutoProperties(Effect, [
        Effect.EffectMappingProperty
    ]);

    //#endregion

    Effect.Instance.Padding = function () {
        return new Thickness();
    };
    Effect.Instance.GetPadding = function (thickness) {
        /// <param name="thickness" type="Thickness"></param>
        //DO NOTHING
        return false;
    };

    Effect.Instance.PreRender = function (ctx) {
        AbstractMethod("Effect.PreRender");
    };

    namespace.Effect = Nullstone.FinishCreate(Effect);
})(Nullstone.Namespace("Fayde.Media.Effects"));