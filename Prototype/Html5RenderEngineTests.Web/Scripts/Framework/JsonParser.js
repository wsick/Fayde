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
    var annotations = json.Type.Annotations;
    if (annotations && (contentPropd = annotations.ContentProperty)) {
        if (contentPropd._IsAutoCreated()) {
            var content = dobj.GetValue(contentPropd);
            if (content instanceof Collection) {
                for (var i in json.Children) {
                    content.Add(JsonParser.CreateObject(json.Children[i], namescope));
                }
            }
        } else {
            dobj.SetValue(contentPropd, JsonParser.CreateObject(json.Content));
        }
    }
};
