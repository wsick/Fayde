/// <reference path="RefObject.js"/>
/// CODE
/// <reference path="Collection.js"/>
/// <reference path="Expression.js"/>

//#region JsonParser

JsonParser.prototype = new RefObject;
JsonParser.prototype.constructor = JsonParser;
function JsonParser() {
    RefObject.call(this);
}
JsonParser.GetBaseClass = function () { return RefObject; };

JsonParser.prototype.CreateObject = function (json, namescope) {
    var dobj = new json.Type();
    dobj._TemplateOwner = this._TemplateBindingSource;
    if (json.Name)
        dobj.SetNameOnScope(json.Name, namescope);
    if (json.Props) {
        for (var propName in json.Props) {
            var propValue = json.Props[propName];
            if (propValue == undefined)
                continue;

            var propd = dobj.GetDependencyProperty(propName);
            if (propd) {
                if (this.TrySetCollectionProperty(propValue, dobj, propd, namescope))
                    continue;
                if (propValue instanceof TemplateBinding) {
                    var sourcePropd = DependencyProperty.GetDependencyProperty(this._TemplateBindingSource.constructor, propValue.Path);
                    propValue = new TemplateBindingExpression(sourcePropd, propd);
                }
                dobj.SetValue(propd, propValue);
            } else {
                var func = dobj["Set" + propName];
                if (func && func instanceof Function)
                    func.call(dobj, propValue);
            }
        }
    }

    var contentPropd = this.GetAnnotationMember(json.Type, "ContentProperty");
    if (contentPropd) {
        if (json.Children) {
            this.TrySetCollectionProperty(json.Children, dobj, contentPropd, namescope);
        } else if (json.Content) {
            dobj.SetValue(contentPropd, this.CreateObject(json.Content, namescope));
        }
    }
    return dobj;
};
JsonParser.prototype.TrySetCollectionProperty = function (subJson, dobj, propd, namescope) {
    if (!propd._IsAutoCreated())
        return false;
    var val = dobj.GetValue(propd);
    if (!(val instanceof Collection))
        return false;
    for (var i in subJson) {
        val.Add(this.CreateObject(subJson[i], namescope));
    }
    return true;
};
JsonParser.prototype.GetAnnotationMember = function (type, member) {
    if (type === RefObject)
        return null;
    if (type.Annotations == null)
        return this.GetAnnotationMember(type.GetBaseClass(), member);
    var annotation = type.Annotations[member];
    if (annotation == null)
        return this.GetAnnotationMember(type.GetBaseClass(), member);
    return annotation;
};

JsonParser.CreateSetter = function (dobj, propName, value) {
    var setter = new Setter();
    var propd = dobj.GetDependencyProperty(propName);
    setter.SetProperty(propd);
    setter.SetValue_Prop(value);
    return setter;
};

//#endregion

//#region TemplateBinding

TemplateBinding.prototype = new RefObject;
TemplateBinding.prototype.constructor = TemplateBinding;
function TemplateBinding(path) {
    RefObject.call(this);
    this.Path = path;
}
TemplateBinding.GetBaseClass = function () { return RefObject; };

//#endregion