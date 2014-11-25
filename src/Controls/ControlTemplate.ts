/// <reference path="../Markup/Loader" />

module Fayde.Controls {
    export class ControlTemplate extends Markup.FrameworkTemplate {
        static TargetTypeProperty = DependencyProperty.Register("TargetType", () => IType_, ControlTemplate);
        TargetType: Function;
    }
    Fayde.CoreLibrary.add(ControlTemplate);
}