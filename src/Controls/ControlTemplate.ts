/// <reference path="../Markup/Loader" />

module Fayde.Controls {
    export class ControlTemplate extends Markup.FrameworkTemplate {
        TargetType: Function;
    }
    Fayde.CoreLibrary.add(ControlTemplate);
}