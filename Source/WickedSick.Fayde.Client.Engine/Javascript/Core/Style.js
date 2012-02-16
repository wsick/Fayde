/// <reference path="../Runtime/RefObject.js" />
/// <reference path="DependencyObject.js"/>
/// CODE
/// <reference path="SetterBaseCollection.js"/>

//#region Style

function Style() {
    DependencyObject.call(this);
}
Style.InheritFrom(DependencyObject);

//#region DEPENDENCY PROPERTIES

Style.SettersProperty = DependencyProperty.RegisterFull("Setters", function () { return SetterBaseCollection; }, Style, null, { GetValue: function () { return new SetterBaseCollection(); } });
Style.prototype.GetSetters = function () {
    return this.GetValue(Style.SettersProperty);
};

Style.IsSealedProperty = DependencyProperty.Register("IsSealed", function () { return Boolean; }, Style);
Style.prototype.GetIsSealed = function () {
    return this.GetValue(Style.IsSealedProperty);
};

Style.BasedOnProperty = DependencyProperty.Register("BasedOn", function () { return Function; }, Style);
Style.prototype.GetBasedOn = function () {
    return this.GetValue(Style.BasedOnProperty);
};
Style.prototype.SetBasedOn = function (value) {
    this.SetValue(Style.BasedOnProperty, value);
};

Style.TargetTypeProperty = DependencyProperty.Register("TargetType", function () { return Function; }, Style);
Style.prototype.GetTargetType = function () {
    return this.GetValue(Style.TargetTypeProperty);
};
Style.prototype.SetTargetType = function (value) {
    this.SetValue(Style.TargetTypeProperty, value);
};

//#endregion

//#region ANNOTATIONS

Style.Annotations = {
    ContentProperty: Style.SettersProperty
};

//#endregion

Style.prototype._Seal = function () {
    if (this.GetIsSealed())
        return;

    var app = App.Instance;
    if (!app)
        return;

    app.ConvertSetterValues(this);
    this.SetValue(Style.IsSealedProperty, true);
    var setters = this.GetSetters();
    for (var i = 0; i < setters.length; i++) {
        setters[i]._Seal();
    }

    var base = this.GetBasedOn();
    if (base)
        base._Seal();
};

Style.prototype._AddSetter = function (dobj, propName, value) {
    this.GetSetters().Add(JsonParser.CreateSetter(dobj, propName, value));
};
Style.prototype._AddSetterJson = function (dobj, propName, json) {
    var parser = new JsonParser();
    this._AddSetter(dobj, propName, parser.CreateObject(json, new NameScope()));
};
Style.prototype._AddSetterControlTemplate = function (dobj, propName, templateJson) {
    this._AddSetter(dobj, propName, new ControlTemplate(dobj.constructor, templateJson));
};

//#endregion
