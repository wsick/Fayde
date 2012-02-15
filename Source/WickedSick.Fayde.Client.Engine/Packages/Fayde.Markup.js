function Markup() {
    RefObject.call(this);
}
Markup.InheritFrom(RefObject);
Markup.prototype.Transmute = function (propd, templateBindingSource) {
    AbstractMethod("Markup.Transmute");
};

function BindingMarkup(data) {
    Markup.call(this);
    if (!data)
        data = {};
    this._Data = data;
}
BindingMarkup.InheritFrom(Markup);
BindingMarkup.prototype.Transmute = function (target, propd, templateBindingSource) {
    return new BindingExpression(this._BuildBinding(), target, propd);
};
BindingMarkup.prototype._BuildBinding = function () {
    var b = new Binding(this._Data.Path);
    if (this._Data.FallbackValue !== undefined)
        b.SetFallbackValue(this._Data.FallbackValue);
    if (this._Data.Mode !== undefined)
        b.SetMode(this._Data.Mode);
    return b;
};

function JsonParser() {
    RefObject.call(this);
}
JsonParser.InheritFrom(RefObject);
JsonParser.prototype.CreateObject = function (json, namescope) {
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
        for (var i in json.AttachedProps) {
            var attachedDef = json.AttachedProps[i];
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
            dobj.SetValue(contentPropd, this.CreateObject(json.Content, namescope));
        }
    } else if (contentPropd != null && contentPropd.constructor === String) {
        var setFunc = dobj["Set" + contentPropd];
        var getFunc = dobj["Get" + contentPropd];
        if (setFunc) {
            setFunc.call(dobj, this.CreateObject(json.Content, namescope));
        } else if (getFunc) {
            var coll = getFunc.call(dobj);
            for (var j in json.Children) {
                coll.Add(this.CreateObject(json.Children[j], namescope));
            }
        }
    }
    return dobj;
};
JsonParser.prototype.TrySetPropertyValue = function (dobj, propd, propValue, namescope, isAttached, ownerType, propName) {
    if (!(propValue instanceof RefObject) && propValue.Type) {
        propValue = this.CreateObject(propValue, namescope);
    }
    if (propValue instanceof Markup)
        propValue = propValue.Transmute(dobj, propd, this._TemplateBindingSource);
    if (propd) {
        if (this.TrySetCollectionProperty(propValue, dobj, propd, namescope))
            return;
        dobj.SetValue(propd, propValue);
    } else if (!isAttached) {
        var func = dobj["Set" + propName];
        if (func && func instanceof Function)
            func.call(dobj, propValue);
    } else {
        Warn("Could not find attached property: " + ownerType.GetName() + "." + propName);
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

function StaticResourceMarkup(key) {
    Markup.call(this);
    this.Key = key;
}
StaticResourceMarkup.InheritFrom(Markup);
StaticResourceMarkup.prototype.Transmute = function (propd, templateBindingSource) {
    NotImplemented("StaticResourceMarkup.Transmute");
};

function TemplateBindingMarkup(path) {
    Markup.call(this);
    this.Path = path;
}
TemplateBindingMarkup.InheritFrom(Markup);
TemplateBindingMarkup.prototype.Transmute = function (target, propd, templateBindingSource) {
    var sourcePropd = DependencyProperty.GetDependencyProperty(templateBindingSource.constructor, this.Path);
    return new TemplateBindingExpression(sourcePropd, propd);
};

