/// CODE

//#region _PropertyPathParser
function _PropertyPathParser(path) {
    this.Path = path;
}

_PropertyPathParser.prototype.Step = function (data) {
    var type = _PropertyNodeType.None;
    var path = this.Path;
    if (path.length === 0) {
        data.typeName = null;
        data.propertyName = null;
        data.index = null;
        return type;
    }

    var end;
    if (path.charAt(0) === '(') {
        type = _PropertyNodeType.AttachedProperty;
        end = path.indexOf(')');
        if (end === -1)
            throw new ArgumentException("Invalid property path. Attached property is missing the closing bracket");

        var splitIndex;
        var tickOpen = path.indexOf('\'');
        var tickClose = 0;
        var typeOpen;
        var typeClose;
        var propOpen;
        var propClose;

        typeOpen = path.indexOf('\'');
        if (typeOpen > 0) {
            typeOpen++;

            typeClose = path.indexOf('\'', typeOpen + 1);
            if (typeClose < 0)
                throw new Exception("Invalid property path, Unclosed type name '" + path + "'.");

            propOpen = path.indexOf('.', typeClose);
            if (propOpen < 0)
                throw new Exception("Invalid properth path, No property indexer found '" + path + "'.");

            propOpen++;
        } else {
            typeOpen = 1;
            typeClose = path.indexOf('.', typeOpen);
            if (typeClose < 0)
                throw new Exception("Invalid property path, No property indexer found on '" + path + "'.");
            propOpen = typeClose + 1;
        }

        propClose = end;

        data.typeName = path.slice(typeOpen, typeClose);
        data.propertyName = path.slice(propOpen, propClose);

        data.index = null;
        if (path.length > (end + 1) && path.charAt(end + 1) === '.')
            end++;
        path = path.substr(end + 1);
    } else if (path.charAt(0) === '[') {
        type = _PropertyNodeType.Indexed;
        end = path.indexOf(']');

        data.typeName = null;
        data.propertyName = null;
        data.index = path.substr(1, end - 1);
        path = path.substr(end + 1);
        if (path.charAt(0) === '.')
            path = path.substr(1);
    } else {
        type = _PropertyNodeType.Property;
        end = path.indexOfAny(['.', '[']);

        if (end === -1) {
            data.propertyName = path;
            path = "";
        } else {
            data.propertyName = path.substr(0, end);
            if (path.charAt(end) === '.')
                path = path.substr(end + 1);
            else
                path = path.substr(end);
        }

        data.typeName = null;
        data.index = null;
    }
    this.Path = path;

    return type;
};
//#endregion