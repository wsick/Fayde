/// <reference path="RefObject.js"/>
/// CODE
/// <reference path="Collection.js"/>
/// <reference path="Expression.js"/>

//#region JsonParser

function JsonParser() {
    RefObject.call(this);
}
JsonParser.InheritFrom(RefObject);

JsonParser.prototype.CreateObject = function (json, namescope) {
    var dobj = new json.Type();
    dobj._TemplateOwner = this._TemplateBindingSource;
    if (json.Name)
        dobj.SetNameOnScope(json.Name, namescope);

    var propd;
    var propValue;
    if (json.Props) {
        for (var propName in json.Props) {
            propValue = json.Props[propName];
            if (propValue == undefined)
                continue;

            var propd = dobj.GetDependencyProperty(propName);
            this.TrySetPropertyValue(dobj, propd, propValue, namescope, false);
        }
    }

    if (json.AttachedProps) {
        for (var i in json.AttachedProps) {
            var attachedDef = json.AttachedProps[i];
            //TODO: Namespace Prefixes?
            propd = DependencyProperty.GetDependencyProperty(attachedDef.Owner, attachedDef.Prop);
            propValue = attachedDef.Value;
            this.TrySetPropertyValue(dobj, propd, propValue, namescope, true);
        }
    }

    var contentPropd = this.GetAnnotationMember(json.Type, "ContentProperty");
    if (contentPropd instanceof DependencyProperty) {
        if (json.Children) {
            this.TrySetCollectionProperty(json.Children, dobj, contentPropd, namescope);
        } else if (json.Content) {
            dobj.SetValue(contentPropd, this.CreateObject(json.Content, namescope));
        }
    } else if (contentPropd instanceof String) {
        var setFunc = dobj["Set" + contentPropd];
        if (setFunc) {
            setFunc.call(dobj, this.CreateObject(json.Content, namescope));
        }
    }
    return dobj;
};

JsonParser.prototype.TrySetPropertyValue = function (dobj, propd, propValue, namescope, isAttached) {
    //If the object is not a RefObject, let's parse it
    if (!(propValue instanceof RefObject) && propValue.Type) {
        propValue = this.CreateObject(propValue, namescope);
    }

    //Set property value
    if (propd) {
        if (this.TrySetCollectionProperty(propValue, dobj, propd, namescope))
            return;
        if (this.TrySetTemplateBindingProperty(dobj, propValue, propd))
            return;
        dobj.SetValue(propd, propValue);
    } else if (!isAttached) {
        var func = dobj["Set" + propd.Name];
        if (func && func instanceof Function)
            func.call(dobj, propValue);
    } else {
        //There is no fallback if we can't find attached property
        Warn("Could not find attached property: " + attachedDef.Prop);
    }
};
JsonParser.prototype.TrySetCollectionProperty = function (subJson, dobj, propd, namescope) {
    var targetType = propd.GetTargetType();
    if (!targetType.DoesInheritFrom(Collection))
        return false;
    if (!(subJson instanceof Array))
        return false;

    var coll;
    if (propd._IsAutoCreated()) {
        coll = dobj.GetValue(propd);
    } else {
        coll = new targetType();
        dobj.SetValue(propd, coll);
    }

    for (var i in subJson) {
        coll.Add(this.CreateObject(subJson[i], namescope));
    }

    return true;
};
JsonParser.prototype.TrySetTemplateBindingProperty = function (dobj, propValue, propd) {
    if (!(propValue instanceof TemplateBindingMarkup))
        return false;
    var sourcePropd = DependencyProperty.GetDependencyProperty(this._TemplateBindingSource.constructor, propValue.Path);
    propValue = new TemplateBindingExpression(sourcePropd, propd);
    dobj.SetValue(propd, propValue);
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

//#region Markup

function Markup() {
    RefObject.call(this);
}
Markup.InheritFrom(RefObject);

//#endregion

//#region BindingMarkup

function BindingMarkup(data) {
    Markup.call(this);
}
BindingMarkup.InheritFrom(Markup);

//#endregion

//#region TemplateBindingMarkup

function TemplateBindingMarkup(path) {
    Markup.call(this);
    this.Path = path;
}
TemplateBindingMarkup.InheritFrom(Markup);

//#endregion

//#region StaticResourceMarkup

function StaticResourceMarkup(key) {
    Markup.call(this);
    this.Key = key;
}
StaticResourceMarkup.InheritFrom(Markup);

//#endregion