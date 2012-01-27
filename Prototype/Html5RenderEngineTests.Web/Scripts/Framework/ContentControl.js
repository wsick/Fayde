/// <reference path="Control.js"/>
/// CODE
/// <reference path="Templates.js"/>
/// <reference path="Grid.js"/>

//#region ContentControl

ContentControl.prototype = new Control;
ContentControl.prototype.constructor = ContentControl;
function ContentControl() {
    Control.call(this);
}
ContentControl.GetBaseClass = function () { return Control; };

ContentControl._FallbackTemplate = (function () {
    //TODO: Create fallback template
    // <ControlTemplate><Grid><TextBlock Text="{Binding}" /></Grid></ControlTemplate>
    ControlTemplate.CreateTemplateFromJson({
        Type: Grid,
        Children: [
            {
                Type: TextBlock
            }
        ]
    });
    NotImplemented("ContentControl._FallbackTemplate");
    return new ControlTemplate();
})();

//#region DEPENDENCY PROPERTIES

ContentControl.ContentProperty = DependencyProperty.Register("Content", ContentControl);
ContentControl.prototype.GetContent = function () {
    return this.GetValue(ContentControl.ContentProperty);
};
ContentControl.prototype.SetContent = function (value) {
    this.SetValue(ContentControl.ContentProperty, value);
};

ContentControl.ContentTemplateProperty = DependencyProperty.Register("ContentTemplate", ContentControl);
ContentControl.prototype.GetContentTemplate = function () {
    return this.GetValue(ContentControl.ContentTemplateProperty);
};
ContentControl.prototype.SetContentTemplate = function (value) {
    this.SetValue(ContentControl.ContentTemplateProperty, value);
};

//#endregion

//#region INSTANCE METHODS

ContentControl.prototype._GetFallbackRoot = function () {
    if (this._FallbackRoot == null)
        this._FallbackRoot = ContentControl._FallbackTemplate.GetVisualTree(this);
    return this._FallbackRoot;
};
ContentControl.prototype._GetDefaultTemplate = function () {
    return this._FallbackRoot;
};

//#endregion

//#region ANNOTATIONS

ContentControl.Annotations = {
    ContentProperty: ContentControl.ContentProperty
};

//#endregion

//#endregion