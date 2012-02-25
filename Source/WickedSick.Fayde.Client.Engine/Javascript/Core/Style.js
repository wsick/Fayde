/// <reference path="../Runtime/RefObject.js" />
/// <reference path="DependencyObject.js"/>
/// CODE
/// <reference path="SetterBaseCollection.js"/>
/// <reference path="Core.js"/>

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

    this._ConvertSetterValues();
    this.SetValue(Style.IsSealedProperty, true);
    this.GetSetters()._Seal();

    var base = this.GetBasedOn();
    if (base != null)
        base._Seal();
};
Style.prototype._ConvertSetterValues = function () {
    var setters = this.GetSetters();
    for (var i = 0; i < setters.GetCount(); i++) {
        this._ConvertSetterValue(setters.GetValueAt(i));
    }
};
Style.prototype._ConvertSetterValue = function (setter) {
    /// <param name="setter" type="Setter"></param>
    var propd = setter.GetValue(Setter.PropertyProperty);
    var val = setter.GetValue(Setter.ValueProperty);

    if (propd.GetTargetType() === String) {
        //if (val == null)
        //throw new ArgumentException("Empty value in setter.");
        if (!String.isString(val))
            throw new XamlParseException("Setter value does not match property type.");
    }

    try {
        setter.SetValue(Setter.ConvertedValueProperty, Fayde.TypeConverter.ConvertObject(propd, val, this.GetTargetType(), true));
    } catch (err) {
        throw new XamlParseException(err.message);
    }
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
