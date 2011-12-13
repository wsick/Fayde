function DependencyProperty(name, ownerType, defaultValue) {
    this.Name = name;
    this.OwnerType = ownerType;
    this.DefaultValue = defaultValue;
    this.toString = function () {
        var funcNameRegex = /function (.{1,})\(/;
        var results = (funcNameRegex).exec(this.OwnerType.toString());
        var ownerTypeName = (results && results.length > 1) ? results[1] : "";
        return ownerTypeName + "." + this.Name.toString();
    };
    this._HasDefaultValue = function () {
        return this.DefaultValue != null;
    };
}
DependencyProperty.prototype = new Object();
DependencyProperty.Register = function (name, ownerType, defaultValue) {
    if (!DependencyProperty._Registered)
        DependencyProperty._Registered = new Array();
    if (!DependencyProperty._Registered[ownerType])
        DependencyProperty._Registered[ownerType] = new Array();
    var propd = new DependencyProperty(name, ownerType, defaultValue);
    DependencyProperty._Registered[ownerType][name] = propd;
    return propd;
}
DependencyProperty.RegisterAttached = function (name, ownerType, defaultValue) {
    if (!DependencyProperty._Registered)
        DependencyProperty._Registered = new Array();
    if (!DependencyProperty._Registered[ownerType])
        DependencyProperty._Registered[ownerType] = new Array();
    var propd = new DependencyProperty(name, ownerType, defaultValue);
    propd._IsAttached = true;
    DependencyProperty._Registered[ownerType][name] = propd;
    return propd;
}