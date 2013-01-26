/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="../Core/FrameworkTemplate.js"/>
/// CODE
/// <reference path="../Core/NameScope.js"/>
/// <reference path="../Markup/JsonParser.js"/>

(function (namespace) {
    var ControlTemplate = Nullstone.Create("ControlTemplate", Fayde.FrameworkTemplate, 2);

    ControlTemplate.Instance.Init = function (targetType, json) {
        this.Init$FrameworkTemplate();
        this.TargetType = targetType;
        this._TempJson = json;
    };

    //#region Properties

    ControlTemplate.TargetTypeProperty = DependencyProperty.Register("TargetType", function () { return Function; }, ControlTemplate);

    Nullstone.AutoProperties(ControlTemplate, [
        ControlTemplate.TargetTypeProperty
    ]);

    //#endregion

    ControlTemplate.Instance._GetVisualTreeWithError = function (templateBindingSource, error) {
        /// <param name="templateBindingSource" type="FrameworkElement"></param>
        /// <returns type="DependencyObject" />
        if (this._TempJson) {
            var namescope = new NameScope();
            var root = JsonParser.Parse(this._TempJson, templateBindingSource, namescope, this._ResChain);
            NameScope.SetNameScope(root, namescope);
            return root;
        }
        return this._GetVisualTreeWithError$FrameworkTemplate(templateBindingSource, error);
    };

    namespace.ControlTemplate = Nullstone.FinishCreate(ControlTemplate);
})(Nullstone.Namespace("Fayde.Controls"));