var Fayde;
(function (Fayde) {
    /// <reference path="../Runtime/Nullstone.ts" />
    /// <reference path="../Controls/TextBlock.ts" />
    /// <reference path="../Controls/Primitives/Popup.ts" />
    /// CODE
    /// <reference path="../Core/DependencyProperty.ts" />
    /// <reference path="../Core/Clone.ts" />
    (function (Data) {
        var lookupNamespaces;
        function lookupType(name) {
            lookupNamespaces.push(Fayde);
            lookupNamespaces.push(Fayde.Controls);
            lookupNamespaces.push(Fayde.Media);
            lookupNamespaces.push(Fayde.Controls.Primitives);
            lookupNamespaces.push(Fayde.Shapes);
            lookupNamespaces.push(window);
            var len = lookupNamespaces.length;
            for(var i = 0; i < len; i++) {
                var potentialType = lookupNamespaces[i][name];
                if(potentialType) {
                    return potentialType;
                }
            }
            return eval(name);
        }
        function handlePeriod(data) {
            if(data.tickOpen) {
                return true;
            }
            if(data.res != null) {
                var value = null;
                if((value = data.lu._Store.GetValue(data.res)) == null) {
                    return false;
                }
                if(!(value instanceof Fayde.DependencyObject)) {
                    return false;
                }
                var newLu = value;
                if(data.promotedValues && data.promotedValues[value._ID] == null && !(value instanceof Fayde.UIElement)) {
                    var clonedValue = Fayde.Clone(value);
                    if(clonedValue instanceof Fayde.DependencyObject) {
                        newLu = clonedValue;
                        data.lu._Store.SetValue(data.res, clonedValue);
                        clonedValue = data.lu._Store.GetValue(data.res);
                        data.promotedValues[clonedValue._ID] = clonedValue;
                    }
                }
                data.lu = newLu;
            }
            data.expressionFound = false;
            data.prop = data.path.substr(data.index);
            return true;
        }
        function handleLeftBracket(data) {
            if(data.index >= data.end) {
                return;
            }
            var hasLeadingZeroes = false;
            while(data.path.charAt(data.index) === '0') {
                hasLeadingZeroes = true;
                data.index++;
            }
            data.i = parseInt(data.path.substr(data.index), 10);
            if(!isNaN(data.i)) {
                data.index += data.i.toString().length;
            }
            if(isNaN(data.i) && hasLeadingZeroes) {
                data.i = 0;
            }
            if(data.path.charAt(data.index) !== ']' || data.path.charAt(data.index + 1) !== '.') {
                return true;
            }
            data.prop = data.path = data.path.substr(data.index + 2);
            data.index = 0;
            data.end = data.path.length;
            var value = null;
            if(data.expressionFound) {
                data.expressionFound = false;
                if((value = data.lu.GetValue(data.res)) == null) {
                    return false;
                }
            }
            if(value instanceof Fayde.XamlObjectCollection) {
                data.collection = value;
            } else {
                data.collection = null;
                return false;
            }
            if((value = (data.collection).GetValueAt(data.i)) == null) {
                return false;
            }
            if(value instanceof Fayde.DependencyObject) {
                data.lu = value;
            } else {
                data.lu = null;
                return false;
            }
            return true;
        }
        function handleDefault(data) {
            var explicitType = false;
            data.expressionFound = true;
            var start = data.index - 1;
            var c;
            while(data.index < data.end) {
                c = data.path.charAt(data.index);
                if(!((c !== '.' || data.tickOpen) && (!data.parenOpen || c !== ')') && c !== '[')) {
                    break;
                }
                data.index++;
                if(c === '\'') {
                    data.tickOpen = !data.tickOpen;
                    if(!data.tickOpen) {
                        break;
                    }
                }
            }
            if(data.index === data.end) {
                // This happened because a property at the end of the path ended like this: '.Property'
                // We only fail if we can't find the property
                data.type = (data.lu).constructor;
            } else {
                c = data.path.charAt(data.index);
                if(c === '.') {
                    // we found a type name, now find the property name
                    if((data.index - start) === 11 && data.path.substr(start, 11).toLowerCase() === "textelement") {
                        //bug workaround from Blend
                        data.type = Fayde.Controls.TextBlock;
                        data.explicitType = true;
                    } else {
                        var s = data.index;
                        if(data.path.charAt(data.index - 1) === '\'' && !data.tickOpen) {
                            s = data.index - 1;
                        }
                        var name = data.path.slice(start, s);
                        data.type = lookupType(name);
                        data.explicitType = true;
                        if(!data.type) {
                            data.type = (data.lu).constructor;
                        }
                    }
                    data.index++;
                    start = data.index;
                    while(data.index < data.end) {
                        c = data.path.charAt(data.index);
                        if(!((!data.parenOpen || c !== ')') && (c !== '.' || data.tickOpen))) {
                            break;
                        }
                        data.index++;
                        if(c === '\'') {
                            data.tickOpen = !data.tickOpen;
                            if(!data.tickOpen) {
                                break;
                            }
                        }
                    }
                    if(data.index === start) {
                        return false;
                    }
                } else {
                    data.type = (data.lu).constructor;
                    data.explicitType = false;
                }
                c = data.path.charAt(data.index);
                if((c !== ')' && data.parenOpen) || data.type == null) {
                    return false;
                }
            }
            name = data.path.slice(start, data.index);
            if((data.res = DependencyProperty.GetDependencyProperty(data.type, name)) == null && data.lu) {
                data.res = DependencyProperty.GetDependencyProperty((data.lu).constructor, name);
            }
            if(data.res == null) {
                return false;
            }
            if(!data.res._IsAttached && !(data.lu instanceof data.type)) {
                if((data.res = DependencyProperty.GetDependencyProperty((data.lu).constructor, name)) == null) {
                    return false;
                }
            }
            if(data.res._IsAttached && data.explicitType && !data.parenOpen) {
                return false;
            }
            return true;
        }
        var PropertyPath = (function () {
            function PropertyPath(path, expandedPath) {
                this._Propd = null;
                this._Path = path;
                this._ExpandedPath = expandedPath;
            }
            PropertyPath.CreateFromParameter = function CreateFromParameter(parameter) {
                var p = new PropertyPath();
                if(parameter instanceof DependencyProperty) {
                    p._Propd = parameter;
                }
                p._Path = null;
                if(parameter instanceof String) {
                    p._Path = parameter;
                }
                return p;
            };
            PropertyPath.prototype.TryResolveDependencyProperty = function (dobj) {
                if(this.HasDependencyProperty) {
                    return;
                }
                if(dobj) {
                    this._Propd = DependencyProperty.GetDependencyProperty((dobj).constructor, this.Path);
                }
            };
            Object.defineProperty(PropertyPath.prototype, "Path", {
                get: function () {
                    return !this._Propd ? this._Path : "(0)";
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(PropertyPath.prototype, "ExpandedPath", {
                get: function () {
                    return !this._Propd ? this._ExpandedPath : "(0)";
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(PropertyPath.prototype, "ParsePath", {
                get: function () {
                    if(this._Propd) {
                        return "(0)";
                    }
                    if(this._ExpandedPath) {
                        return this._ExpandedPath;
                    }
                    return this._Path;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(PropertyPath.prototype, "HasDependencyProperty", {
                get: function () {
                    return this._Propd != null;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(PropertyPath.prototype, "DependencyProperty", {
                get: function () {
                    return this._Propd;
                },
                enumerable: true,
                configurable: true
            });
            PropertyPath.ResolvePropertyPath = function ResolvePropertyPath(refobj, propertyPath, promotedValues) {
                if(propertyPath.HasDependencyProperty) {
                    return propertyPath.DependencyProperty;
                }
                var path = propertyPath.Path;
                if(propertyPath.ExpandedPath != null) {
                    path = propertyPath.ExpandedPath;
                }
                var data = {
                    index: 0,
                    i: 0,
                    end: path.length,
                    path: path,
                    parenOpen: false,
                    tickOpen: false,
                    prop: path,
                    res: null,
                    cloned: false,
                    expressionFound: false,
                    lu: refobj.Value,
                    collection: null,
                    promotedValues: promotedValues,
                    explicitType: false,
                    type: null
                };
                var success;
                while(data.index < data.end) {
                    success = true;
                    var c = data.path.charAt(data.index);
                    data.index++;
                    if(c === '(') {
                        data.parenOpen = true;
                    } else if(c === ')') {
                        data.parenOpen = false;
                    } else if(c === '\'') {
                        //Ticks only legal in expanded path
                        if(propertyPath.ExpandedPath == null) {
                            Warn("The ' character is not legal in property paths.");
                        } else {
                            data.tickOpen = !data.tickOpen;
                        }
                    } else if(c === '.') {
                        success = handlePeriod(data);
                    } else if(c === '[') {
                        success = handleLeftBracket(data);
                    } else {
                        success = handleDefault(data);
                    }
                    if(!success) {
                        refobj.Value = null;
                        return null;
                    }
                }
                refobj.Value = data.lu;
                return data.res;
            };
            PropertyPath.prototype.Clone = function () {
                return new PropertyPath(this._Path, this._ExpandedPath);
            };
            return PropertyPath;
        })();
        Data.PropertyPath = PropertyPath;        
        Nullstone.RegisterType(PropertyPath, "PropertyPath");
    })(Fayde.Data || (Fayde.Data = {}));
    var Data = Fayde.Data;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=PropertyPath.js.map
