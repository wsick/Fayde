/// <reference path="../Runtime/RefObject.js" />
/// CODE

//#region _PropertyPathParser

function _PropertyPathParser(path) {
    RefObject.call(this);
    this.SetPath(path);
}
_PropertyPathParser.InheritFrom(RefObject);

_PropertyPathParser.prototype.Step = function (data) {
    var type = _PropertyNodeType.None;
    if (this.GetPath().length === 0) {
        data.typeName = null;
        data.propertyName = null;
        data.index = null;
        return type;
    }

    var end;
    if (this.GetPath().charAt(0) === '(') {
        type = _PropertyNodeType.AttachedProperty;
        end = this.GetPath().indexOf(')');
        if (end === -1)
            throw new ArgumentException("Invalid property path. Attached property is missing the closing bracket");

        var splitIndex;
        var tickOpen = this.GetPath().indexOf('\'');
        var tickClose = 0;
        var typeOpen;
        var typeClose;
        var propOpen;
        var propClose;

        typeOpen = this.GetPath().indexOf('\'');
        if (typeOpen > 0) {
            typeOpen++;

            typeClose = this.GetPath().indexOf('\'', typeOpen + 1);
            if (typeClose < 0)
                throw new Exception("Invalid property path, Unclosed type name '" + this.GetPath() + "'.");

            propOpen = this.GetPath().indexOf('.', typeClose);
            if (propOpen < 0)
                throw new Exception("Invalid properth path, No property indexer found '" + this.GetPath() + "'.");

            propOpen++;
        } else {
            typeOpen = 1;
            typeClose = this.GetPath().indexOf('.', typeOpen);
            if (typeClose < 0)
                throw new Exception("Invalid property path, No property indexer found on '" + this.GetPath() + "'.");
            propOpen = typeClose + 1;
        }

        propClose = end;

        data.typeName = this.GetPath().slice(typeOpen, typeClose);
        data.propertyName = this.GetPath().slice(propOpen, propClose);

        data.index = null;
        if (this.GetPath().length > (end + 1) && this.GetPath().charAt(end + 1) === '.')
            end++;
        this.SetPath(this.GetPath().substr(end + 1));
    } else if (this.GetPath().charAt(0) === '[') {
        type = _PropertyNodeType.Indexed;
        end = this.GetPath().indexOf(']');

        data.typeName = null;
        data.propertyName = null;
        data.index = this.GetPath().substr(1, end - 1);
        this.SetPath(this.GetPath().substr(end + 1));
        if (this.GetPath().charAt(0) === '.')
            this.SetPath(this.GetPath().substr(1));
    } else {
        type = _PropertyNodeType.Property;
        end = this.GetPath().indexOfAny(['.', '[']);

        if (end === -1) {
            data.propertyName = this.GetPath();
            this.SetPath("");
        } else {
            data.propertyName = this.GetPath().substr(0, end);
            if (this.GetPath().charAt(end) === '.')
                this.SetPath(this.GetPath().substr(end + 1));
            else
                this.SetPath(this.GetPath().substr(end));
        }

        data.typeName = null;
        data.index = null;
    }

    return type;
};

//#region PROPERTIES

_PropertyPathParser.prototype.GetPath = function () {
    /// <returns type="String" />
    return this._Path;
};
_PropertyPathParser.prototype.SetPath = function (value) {
    /// <param name="value" type="String"></param>
    this._Path = value;
};

//#endregion

//#endregion
