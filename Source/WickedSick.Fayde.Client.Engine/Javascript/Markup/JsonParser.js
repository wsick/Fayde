/// <reference path="../Runtime/Nullstone.js"/>
/// CODE
/// <reference path="Markup.js"/>
/// <reference path="../Core/Collections/Collection.js"/>

//#region JsonParser
var JsonParser = Nullstone.Create("JsonParser");

JsonParser.Instance.Init = function () {
    this.$SRExpressions = [];
};

JsonParser.Instance.CreateObject = function (json, namescope, ignoreResolve) {
    if (json.Type === ControlTemplate) {
        return new json.Type(json.Props.TargetType, json.Content);
    }
    var dobj = new json.Type();
    dobj.SetTemplateOwner(this._TemplateBindingSource);
    if (json.Name)
        dobj.SetNameOnScope(json.Name, namescope);

    var propd;
    var propValue;
    if (json.Props) {
        for (var propName in json.Props) {
            propValue = json.Props[propName];
            if (propValue == undefined)
                continue;

            propd = dobj.GetDependencyProperty(propName);
            this.TrySetPropertyValue(dobj, propd, propValue, namescope, false, dobj.constructor, propName);
        }
    }

    if (json.AttachedProps) {
        if (!(json.AttachedProps instanceof Array))
            throw new Error("json.AttachedProps is not an array");
        for (var i in json.AttachedProps) {
            var attachedDef = json.AttachedProps[i];
            //TODO: Namespace Prefixes?
            propd = DependencyProperty.GetDependencyProperty(attachedDef.Owner, attachedDef.Prop);
            propValue = attachedDef.Value;
            this.TrySetPropertyValue(dobj, propd, propValue, namescope, true, attachedDef.Owner, attachedDef.Prop);
        }
    }

    var contentPropd = this.GetAnnotationMember(json.Type, "ContentProperty");
    if (contentPropd instanceof DependencyProperty) {
        if (json.Children) {
            this.TrySetCollectionProperty(json.Children, dobj, contentPropd, namescope);
        } else if (json.Content) {
            var content = json.Content;
            if (content instanceof Markup)
                content = content.Transmute(dobj, contentPropd, "Content", this._TemplateBindingSource);
            else
                content = this.CreateObject(json.Content, namescope, true);
            this.SetValue(dobj, contentPropd, content);
        }
    } else if (contentPropd != null && contentPropd.constructor === String) {
        var setFunc = dobj["Set" + contentPropd];
        var getFunc = dobj["Get" + contentPropd];
        if (setFunc) {
            setFunc.call(dobj, this.CreateObject(json.Content, namescope, true));
        } else if (getFunc) {
            var coll = getFunc.call(dobj);
            for (var j in json.Children) {
                var fobj = this.CreateObject(json.Children[j], namescope, true);
                if (fobj instanceof DependencyObject)
                    fobj._AddParent(coll, true);
                coll.Add(fobj);
            }
        }
    }

    if (!ignoreResolve) {
        this.ResolveStaticResourceExpressions();
    }
    return dobj;
};

JsonParser.Instance.TrySetPropertyValue = function (dobj, propd, propValue, namescope, isAttached, ownerType, propName) {
    //If the object is not a Nullstone, let's parse it
    if (!propValue.constructor._IsNullstone && propValue.Type) {
        propValue = this.CreateObject(propValue, namescope);
    }

    if (propValue instanceof Markup)
        propValue = propValue.Transmute(dobj, propd, propName, this._TemplateBindingSource);

    if (propValue instanceof StaticResourceExpression) {
        this.$SRExpressions.push(propValue);
        return;
    }

    //Set property value
    if (propd) {
        //TODO: TrySetCollectionProperty expects json ??
        if (this.TrySetCollectionProperty(propValue, dobj, propd, namescope))
            return;

        if (!(propValue instanceof Expression)) {
            var targetType = propd.GetTargetType();
            if (targetType._IsNullstone && !(propValue instanceof targetType)) {
                var setFunc = dobj["Set" + propName];
                if (setFunc && setFunc.Converter && setFunc.Converter instanceof Function)
                    propValue = setFunc.Converter(propValue);
            }
        }
        this.SetValue(dobj, propd, propValue);
    } else if (!isAttached) {
        var func = dobj["Set" + propName];
        if (func && func instanceof Function)
            func.call(dobj, propValue);
    } else {
        //There is no fallback if we can't find attached property
        Warn("Could not find attached property: " + ownerType._TypeName + "." + propName);
    }
};
JsonParser.Instance.TrySetCollectionProperty = function (subJson, dobj, propd, namescope) {
    var targetType = propd.GetTargetType();
    if (!Nullstone.DoesInheritFrom(targetType, Collection))
        return false;
    if (!(subJson instanceof Array))
        return false;

    var coll;
    if (propd._IsAutoCreated) {
        coll = dobj.$GetValue(propd);
    } else {
        coll = new targetType();
        if (coll instanceof DependencyObject)
            coll._AddParent(dobj, true);
        dobj.$SetValue(propd, coll);
    }

    var rd = Nullstone.As(coll, ResourceDictionary);
    for (var i in subJson) {
        var fobj = this.CreateObject(subJson[i], namescope, true);
        if (fobj instanceof DependencyObject)
            fobj._AddParent(coll, true);
        if (rd == null) {
            coll.Add(fobj);
        } else {
            var key = subJson[i].Key;
            if (key)
                rd.Set(key, fobj);
        }
    }

    return true;
};
JsonParser.Instance.ResolveStaticResourceExpressions = function () {
    var srs = this.$SRExpressions;
    if (srs == null)
        return;
    if (srs.length > 0) {
        for (var i = 0; i < srs.length; i++) {
            srs[i].Resolve(this);
        }
    }
    this.$SRExpressions = [];
};
JsonParser.Instance.SetValue = function (dobj, propd, value) {
    if (value instanceof Expression)
        dobj.$SetValueInternal(propd, value);
    else
        dobj._SetValue(propd, value);
};

JsonParser.Instance.GetAnnotationMember = function (type, member) {
    if (type == null || !type._IsNullstone)
        return null;
    if (type.Annotations == null)
        return this.GetAnnotationMember(type._BaseClass, member);
    var annotation = type.Annotations[member];
    if (annotation == null)
        return this.GetAnnotationMember(type._BaseClass, member);
    return annotation;
};

JsonParser.CreateSetter = function (dobj, propName, value) {
    var setter = new Setter();
    var propd = dobj.GetDependencyProperty(propName);
    setter.SetProperty(propd);
    setter.SetValue_Prop(value);
    return setter;
};

JsonParser.CreateRoot = function (json) {
    var namescope = new NameScope();
    var parser = new JsonParser();
    return parser.CreateObject(json, namescope);
}

Nullstone.FinishCreate(JsonParser);
//#endregion