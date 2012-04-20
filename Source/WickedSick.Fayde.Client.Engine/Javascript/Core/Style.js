/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="DependencyObject.js"/>
/// CODE
/// <reference path="SetterBaseCollection.js"/>
/// <reference path="Core.js"/>

//#region Style
var Style = Nullstone.Create("Style", DependencyObject);

//#region DEPENDENCY PROPERTIES

Style.SettersProperty = DependencyProperty.RegisterFull("Setters", function () { return SetterBaseCollection; }, Style, null, { GetValue: function () { return new SetterBaseCollection(); } });
Style.Instance.GetSetters = function () {
    return this.$GetValue(Style.SettersProperty);
};

Style.IsSealedProperty = DependencyProperty.Register("IsSealed", function () { return Boolean; }, Style);
Style.Instance.GetIsSealed = function () {
    return this.$GetValue(Style.IsSealedProperty);
};

Style.BasedOnProperty = DependencyProperty.Register("BasedOn", function () { return Function; }, Style);
Style.Instance.GetBasedOn = function () {
    return this.$GetValue(Style.BasedOnProperty);
};
Style.Instance.SetBasedOn = function (value) {
    this.$SetValue(Style.BasedOnProperty, value);
};

Style.TargetTypeProperty = DependencyProperty.Register("TargetType", function () { return Function; }, Style);
Style.Instance.GetTargetType = function () {
    return this.$GetValue(Style.TargetTypeProperty);
};
Style.Instance.SetTargetType = function (value) {
    this.$SetValue(Style.TargetTypeProperty, value);
};

//#endregion

//#region ANNOTATIONS

Style.Annotations = {
    ContentProperty: Style.SettersProperty
};

//#endregion

Style.Instance._Seal = function () {
    if (this.GetIsSealed())
        return;

    this._ConvertSetterValues();
    this.$SetValue(Style.IsSealedProperty, true);
    this.GetSetters()._Seal();

    var base = this.GetBasedOn();
    if (base != null)
        base._Seal();
};
Style.Instance._ConvertSetterValues = function () {
    var setters = this.GetSetters();
    for (var i = 0; i < setters.GetCount(); i++) {
        this._ConvertSetterValue(setters.GetValueAt(i));
    }
};
Style.Instance._ConvertSetterValue = function (setter) {
    /// <param name="setter" type="Setter"></param>
    var propd = setter.$GetValue(Setter.PropertyProperty);
    var val = setter.$GetValue(Setter.ValueProperty);

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

Style.Instance._AddSetter = function (dobj, propName, value) {
    this.GetSetters().Add(JsonParser.CreateSetter(dobj, propName, value));
};
Style.Instance._AddSetterJson = function (dobj, propName, json) {
    var parser = new JsonParser();
    this._AddSetter(dobj, propName, parser.CreateObject(json, new NameScope()));
};
Style.Instance._AddSetterControlTemplate = function (dobj, propName, templateJson) {
    this._AddSetter(dobj, propName, new ControlTemplate(dobj.constructor, templateJson));
};

Nullstone.FinishCreate(Style);
//#endregion