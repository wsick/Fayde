/// <reference path="Collection.js"/>

function JsonParser() {
}
JsonParser.CreateObject = function (json, namescope) {
    var dobj = new json.Type();
    if (json.Name)
        dobj.SetNameOnScope(json.Name, namescope);
    if (json.Props) {
        for (var propName in json.Props) {
            var propValue = json.Props[propName];
            if (propValue == undefined)
                continue;

            var propd = dobj.GetDependencyProperty(propName);
            if (propd) {
                dobj.SetValue(propd, propValue);
            } else {
                var func = dobj["Set" + propName];
                if (func && func instanceof Function)
                    func.call(this, propValue);
            }
        }
    }

    var contentPropd = JsonParser.GetAnnotationMember(json.Type, "ContentProperty");
    if (contentPropd) {
        if (contentPropd._IsAutoCreated()) {
            var content = dobj.GetValue(contentPropd);
            if (content instanceof Collection) {
                if (json.Children) {
                    for (var i in json.Children) {
                        content.Add(JsonParser.CreateObject(json.Children[i], namescope));
                    }
                }
            }
        } else {
            if (json.Content)
                dobj.SetValue(contentPropd, JsonParser.CreateObject(json.Content, namescope));
        }
    }
    return dobj;
};

JsonParser.GetAnnotationMember = function (type, member) {
    if (type === RefObject)
        return null;
    if (type.Annotations == null)
        return JsonParser.GetAnnotationMember(type.GetBaseClass(), member);
    var annotation = type.Annotations[member];
    if (annotation == null)
        return JsonParser.GetAnnotationMember(type.GetBaseClass(), member);
    return annotation;
};