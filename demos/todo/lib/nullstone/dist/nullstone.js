var nullstone;
(function (nullstone) {
    nullstone.version = '0.3.9';
})(nullstone || (nullstone = {}));
var nullstone;
(function (nullstone) {
    var DirResolver = (function () {
        function DirResolver() {
        }
        DirResolver.prototype.loadAsync = function (moduleName, name) {
            var reqUri = moduleName + '/' + name;
            return nullstone.async.create(function (resolve, reject) {
                require([reqUri], function (rootModule) {
                    resolve(rootModule);
                }, function (err) {
                    return reject(new nullstone.DirLoadError(reqUri, err));
                });
            });
        };

        DirResolver.prototype.resolveType = function (moduleName, name, oresolve) {
            oresolve.isPrimitive = false;
            oresolve.type = require(moduleName + '/' + name);
            return oresolve.type !== undefined;
        };
        return DirResolver;
    })();
    nullstone.DirResolver = DirResolver;
})(nullstone || (nullstone = {}));
var nullstone;
(function (nullstone) {
    var Enum = (function () {
        function Enum(Object) {
            this.Object = Object;
        }
        Enum.fromAny = function (enuType, val, fallback) {
            if (typeof val === "number")
                return val;
            if (!val)
                return (fallback || 0);
            var obj = enuType[val.toString()];
            return (obj == null) ? (fallback || 0) : obj;
        };
        return Enum;
    })();
    nullstone.Enum = Enum;
})(nullstone || (nullstone = {}));
var nullstone;
(function (nullstone) {
    var Event = (function () {
        function Event() {
            this.$$callbacks = [];
            this.$$scopes = [];
        }
        Object.defineProperty(Event.prototype, "has", {
            get: function () {
                return this.$$callbacks.length > 0;
            },
            enumerable: true,
            configurable: true
        });

        Event.prototype.on = function (callback, scope) {
            this.$$callbacks.push(callback);
            this.$$scopes.push(scope);
        };

        Event.prototype.off = function (callback, scope) {
            var cbs = this.$$callbacks;
            var scopes = this.$$scopes;
            var search = cbs.length - 1;
            while (search > -1) {
                search = cbs.lastIndexOf(callback, search);
                if (scopes[search] === scope) {
                    cbs.splice(search, 1);
                    scopes.splice(search, 1);
                }
                search--;
            }
        };

        Event.prototype.raise = function (sender, args) {
            for (var i = 0, cbs = this.$$callbacks.slice(0), scopes = this.$$scopes.slice(0), len = cbs.length; i < len; i++) {
                cbs[i].call(scopes[i], sender, args);
            }
        };

        Event.prototype.raiseAsync = function (sender, args) {
            var _this = this;
            window.setTimeout(function () {
                return _this.raise(sender, args);
            }, 1);
        };
        return Event;
    })();
    nullstone.Event = Event;
})(nullstone || (nullstone = {}));
var nullstone;
(function (nullstone) {
    var Interface = (function () {
        function Interface(name) {
            Object.defineProperty(this, "name", { value: name, writable: false });
        }
        Interface.prototype.is = function (o) {
            if (!o)
                return false;
            var type = o.constructor;
            while (type) {
                var is = type.$$interfaces;
                if (is && is.indexOf(this) > -1)
                    return true;
                type = nullstone.getTypeParent(type);
            }
            return false;
        };

        Interface.prototype.as = function (o) {
            if (!this.is(o))
                return undefined;
            return o;
        };

        Interface.prototype.mark = function (type) {
            nullstone.addTypeInterfaces(type, this);
            return this;
        };
        return Interface;
    })();
    nullstone.Interface = Interface;
})(nullstone || (nullstone = {}));
var nullstone;
(function (nullstone) {
    nullstone.ICollection_ = new nullstone.Interface("ICollection");
})(nullstone || (nullstone = {}));
var nullstone;
(function (nullstone) {
    nullstone.IEnumerable_ = new nullstone.Interface("IEnumerable");
    nullstone.IEnumerable_.is = function (o) {
        return o && o.getEnumerator && typeof o.getEnumerator === "function";
    };

    nullstone.IEnumerable_.empty = {
        getEnumerator: function (isReverse) {
            return nullstone.IEnumerator_.empty;
        }
    };

    nullstone.IEnumerable_.fromArray = function (arr) {
        return {
            $$arr: arr,
            getEnumerator: function (isReverse) {
                return nullstone.IEnumerator_.fromArray(this.$$arr, isReverse);
            }
        };
    };

    nullstone.IEnumerable_.toArray = function (en) {
        var a = [];
        for (var e = en.getEnumerator(); e.moveNext();) {
            a.push(e.current);
        }
        return a;
    };
})(nullstone || (nullstone = {}));
var nullstone;
(function (nullstone) {
    nullstone.IEnumerator_ = new nullstone.Interface("IEnumerator");

    nullstone.IEnumerator_.empty = {
        current: undefined,
        moveNext: function () {
            return false;
        }
    };

    nullstone.IEnumerator_.fromArray = function (arr, isReverse) {
        var len = arr.length;
        var e = { moveNext: undefined, current: undefined };
        var index;
        if (isReverse) {
            index = len;
            e.moveNext = function () {
                index--;
                if (index < 0) {
                    e.current = undefined;
                    return false;
                }
                e.current = arr[index];
                return true;
            };
        } else {
            index = -1;
            e.moveNext = function () {
                index++;
                if (index >= len) {
                    e.current = undefined;
                    return false;
                }
                e.current = arr[index];
                return true;
            };
        }
        return e;
    };
})(nullstone || (nullstone = {}));
var nullstone;
(function (nullstone) {
    var IndexedPropertyInfo = (function () {
        function IndexedPropertyInfo() {
        }
        Object.defineProperty(IndexedPropertyInfo.prototype, "propertyType", {
            get: function () {
                return undefined;
            },
            enumerable: true,
            configurable: true
        });

        IndexedPropertyInfo.prototype.getValue = function (ro, index) {
            if (this.GetFunc)
                return this.GetFunc.call(ro, index);
        };

        IndexedPropertyInfo.prototype.setValue = function (ro, index, value) {
            if (this.SetFunc)
                this.SetFunc.call(ro, index, value);
        };

        IndexedPropertyInfo.find = function (typeOrObj) {
            var o = typeOrObj;
            var isType = typeOrObj instanceof Function;
            if (isType)
                o = new typeOrObj();

            if (o instanceof Array) {
                var pi = new IndexedPropertyInfo();
                pi.GetFunc = function (index) {
                    return this[index];
                };
                pi.SetFunc = function (index, value) {
                    this[index] = value;
                };
                return pi;
            }
            var coll = nullstone.ICollection_.as(o);
            if (coll) {
                var pi = new IndexedPropertyInfo();
                pi.GetFunc = function (index) {
                    return this.GetValueAt(index);
                };
                pi.SetFunc = function (index, value) {
                    return this.SetValueAt(index, value);
                };
                return pi;
            }
        };
        return IndexedPropertyInfo;
    })();
    nullstone.IndexedPropertyInfo = IndexedPropertyInfo;
})(nullstone || (nullstone = {}));
var nullstone;
(function (nullstone) {
    var Library = (function () {
        function Library(name) {
            this.$$module = null;
            this.$$sourcePath = null;
            this.$$primtypes = {};
            this.$$types = {};
            this.$$loaded = false;
            Object.defineProperty(this, "name", { value: name, writable: false });
            var uri = name;
            if (name.indexOf("http://") !== 0)
                uri = "lib://" + name;
            Object.defineProperty(this, "uri", { value: new nullstone.Uri(uri), writable: false });
        }
        Object.defineProperty(Library.prototype, "sourcePath", {
            get: function () {
                var base = this.$$sourcePath || 'lib/' + this.name + '/dist/' + this.name;
                if (!this.useMin)
                    return base;
                return base + ".min";
            },
            set: function (value) {
                if (value.substr(value.length - 3) === '.js')
                    value = value.substr(0, value.length - 3);
                if (this.useMin && value.substr(value.length - 4) === ".min")
                    value = value.substr(0, value.length - 4);
                this.$$sourcePath = value;
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(Library.prototype, "rootModule", {
            get: function () {
                return this.$$module = this.$$module || require(this.sourcePath);
            },
            enumerable: true,
            configurable: true
        });

        Library.prototype.loadAsync = function () {
            var _this = this;
            if (!this.$$sourcePath && this.uri.scheme === "http")
                this.$$loaded = true;
            if (this.$$loaded)
                return nullstone.async.resolve(this);
            this.$configModule();
            return nullstone.async.create(function (resolve, reject) {
                require([_this.name], function (rootModule) {
                    _this.$$module = rootModule;
                    _this.$$loaded = true;
                    resolve(_this);
                }, function (err) {
                    return reject(new nullstone.LibraryLoadError(_this, err));
                });
            });
        };

        Library.prototype.$configModule = function () {
            var co = {
                paths: {},
                shim: {},
                map: {
                    "*": {}
                }
            };
            var srcPath = this.sourcePath;
            co.paths[this.name] = srcPath;
            co.shim[this.name] = {
                exports: this.exports,
                deps: this.deps
            };
            co.map['*'][srcPath] = this.name;
            require.config(co);
        };

        Library.prototype.resolveType = function (moduleName, name, oresolve) {
            if (!moduleName) {
                oresolve.isPrimitive = true;
                if ((oresolve.type = this.$$primtypes[name]) !== undefined)
                    return true;
                oresolve.isPrimitive = false;
                return (oresolve.type = this.$$types[name]) !== undefined;
            }

            var curModule = this.rootModule;
            oresolve.isPrimitive = false;
            oresolve.type = undefined;
            if (moduleName !== "/") {
                for (var i = 0, tokens = moduleName.substr(1).split('.'); i < tokens.length && !!curModule; i++) {
                    curModule = curModule[tokens[i]];
                }
            }
            if (!curModule)
                return false;
            oresolve.type = curModule[name];
            var type = oresolve.type;
            if (type === undefined)
                return false;
            setTypeUri(type, this.uri);
            return true;
        };

        Library.prototype.add = function (type, name) {
            if (!type)
                throw new Error("A type must be specified when registering '" + name + "'`.");
            name = name || nullstone.getTypeName(type);
            if (!name)
                throw new Error("No type name found.");
            setTypeUri(type, this.uri);
            this.$$types[name] = type;
            return this;
        };

        Library.prototype.addPrimitive = function (type, name) {
            if (!type)
                throw new Error("A type must be specified when registering '" + name + "'`.");
            name = name || nullstone.getTypeName(type);
            if (!name)
                throw new Error("No type name found.");
            setTypeUri(type, this.uri);
            this.$$primtypes[name] = type;
            return this;
        };

        Library.prototype.addEnum = function (enu, name) {
            this.addPrimitive(enu, name);
            Object.defineProperty(enu, "$$enum", { value: true, writable: false });
            enu.name = name;
            return this;
        };
        return Library;
    })();
    nullstone.Library = Library;

    function setTypeUri(type, uri) {
        if (type.$$uri)
            return;
        Object.defineProperty(type, "$$uri", { value: uri.toString(), enumerable: false });
    }
})(nullstone || (nullstone = {}));
var nullstone;
(function (nullstone) {
    var LibraryResolver = (function () {
        function LibraryResolver() {
            this.$$libs = {};
            this.libraryCreated = new nullstone.Event();
            this.dirResolver = new nullstone.DirResolver();
        }
        LibraryResolver.prototype.createLibrary = function (uri) {
            return new nullstone.Library(uri);
        };

        LibraryResolver.prototype.loadTypeAsync = function (uri, name) {
            var lib = this.resolve(uri);
            if (!lib)
                return this.dirResolver.loadAsync(uri, name);
            return nullstone.async.create(function (resolve, reject) {
                lib.loadAsync().then(function (lib) {
                    var oresolve = { isPrimitive: false, type: undefined };
                    if (lib.resolveType(null, name, oresolve))
                        resolve(oresolve.type);
                    else
                        resolve(null);
                }, reject);
            });
        };

        LibraryResolver.prototype.resolve = function (uri) {
            var libUri = new nullstone.Uri(uri);
            var scheme = libUri.scheme;
            if (!scheme)
                return null;

            var libName = (scheme === "lib") ? libUri.host : uri;
            var lib = this.$$libs[libName];
            if (!lib) {
                lib = this.$$libs[libName] = this.createLibrary(libName);
                this.$$onLibraryCreated(lib);
            }
            return lib;
        };

        LibraryResolver.prototype.resolveType = function (uri, name, oresolve) {
            var libUri = new nullstone.Uri(uri);
            var scheme = libUri.scheme;
            if (!scheme)
                return this.dirResolver.resolveType(uri, name, oresolve);

            var libName = (scheme === "lib") ? libUri.host : uri;
            var modName = (scheme === "lib") ? libUri.absolutePath : "";
            var lib = this.$$libs[libName];
            if (!lib) {
                lib = this.$$libs[libName] = this.createLibrary(libName);
                this.$$onLibraryCreated(lib);
            }
            return lib.resolveType(modName, name, oresolve);
        };

        LibraryResolver.prototype.$$onLibraryCreated = function (lib) {
            this.libraryCreated.raise(this, Object.freeze({ library: lib }));
        };
        return LibraryResolver;
    })();
    nullstone.LibraryResolver = LibraryResolver;
})(nullstone || (nullstone = {}));
var nullstone;
(function (nullstone) {
    var Memoizer = (function () {
        function Memoizer(creator) {
            this.$$cache = {};
            this.$$creator = creator;
        }
        Memoizer.prototype.memoize = function (key) {
            var obj = this.$$cache[key];
            if (!obj)
                this.$$cache[key] = obj = this.$$creator(key);
            return obj;
        };
        return Memoizer;
    })();
    nullstone.Memoizer = Memoizer;
})(nullstone || (nullstone = {}));
var nullstone;
(function (nullstone) {
    function getPropertyDescriptor(obj, name) {
        if (!obj)
            return undefined;
        var type = obj.constructor;
        var propDesc = Object.getOwnPropertyDescriptor(type.prototype, name);
        if (propDesc)
            return propDesc;
        return Object.getOwnPropertyDescriptor(obj, name);
    }
    nullstone.getPropertyDescriptor = getPropertyDescriptor;

    function hasProperty(obj, name) {
        if (!obj)
            return false;
        if (obj.hasOwnProperty(name))
            return true;
        var type = obj.constructor;
        return type.prototype.hasOwnProperty(name);
    }
    nullstone.hasProperty = hasProperty;
})(nullstone || (nullstone = {}));
var nullstone;
(function (nullstone) {
    var PropertyInfo = (function () {
        function PropertyInfo() {
        }
        PropertyInfo.prototype.getValue = function (obj) {
            if (this.$$getFunc)
                return this.$$getFunc.call(obj);
        };

        PropertyInfo.prototype.setValue = function (obj, value) {
            if (this.$$setFunc)
                return this.$$setFunc.call(obj, value);
        };

        PropertyInfo.find = function (typeOrObj, name) {
            var o = typeOrObj;
            var isType = typeOrObj instanceof Function;
            if (isType)
                o = new typeOrObj();

            if (!(o instanceof Object))
                return null;

            var nameClosure = name;
            var propDesc = nullstone.getPropertyDescriptor(o, name);
            if (propDesc) {
                var pi = new PropertyInfo();
                pi.name = name;
                pi.$$getFunc = propDesc.get;
                if (!pi.$$getFunc)
                    pi.$$getFunc = function () {
                        return this[nameClosure];
                    };
                pi.$$setFunc = propDesc.set;
                if (!pi.$$setFunc && propDesc.writable)
                    pi.$$setFunc = function (value) {
                        this[nameClosure] = value;
                    };
                return pi;
            }

            var type = isType ? typeOrObj : typeOrObj.constructor;
            var pi = new PropertyInfo();
            pi.name = name;
            pi.$$getFunc = type.prototype["Get" + name];
            pi.$$setFunc = type.prototype["Set" + name];
            return pi;
        };
        return PropertyInfo;
    })();
    nullstone.PropertyInfo = PropertyInfo;
})(nullstone || (nullstone = {}));
var nullstone;
(function (nullstone) {
    function getTypeName(type) {
        var t = type;
        if (!t)
            return "";
        var name = t.name;
        if (name)
            return name;
        var name = t.toString().match(/function ([^\(]+)/)[1];
        Object.defineProperty(t, "name", { enumerable: false, value: name, writable: false });
        return name;
    }
    nullstone.getTypeName = getTypeName;

    function getTypeParent(type) {
        if (type === Object)
            return null;
        var p = type.$$parent;
        if (!p) {
            if (!type.prototype)
                return undefined;
            p = Object.getPrototypeOf(type.prototype).constructor;
            Object.defineProperty(type, "$$parent", { value: p, writable: false });
        }
        return p;
    }
    nullstone.getTypeParent = getTypeParent;

    function addTypeInterfaces(type) {
        var interfaces = [];
        for (var _i = 0; _i < (arguments.length - 1); _i++) {
            interfaces[_i] = arguments[_i + 1];
        }
        if (!interfaces)
            return;
        for (var j = 0, len = interfaces.length; j < len; j++) {
            if (!interfaces[j]) {
                console.warn("Registering undefined interface on type.", type);
                break;
            }
        }
        Object.defineProperty(type, "$$interfaces", { value: interfaces, writable: false });
    }
    nullstone.addTypeInterfaces = addTypeInterfaces;

    function doesInheritFrom(t, type) {
        var temp = t;
        while (temp && temp !== type) {
            temp = getTypeParent(temp);
        }
        return temp != null;
    }
    nullstone.doesInheritFrom = doesInheritFrom;
})(nullstone || (nullstone = {}));
var nullstone;
(function (nullstone) {
    var converters = [];
    converters[Boolean] = function (val) {
        if (val == null)
            return null;
        if (typeof val === "boolean")
            return val;
        var c = val.toString().toUpperCase();
        return c === "TRUE" ? true : (c === "FALSE" ? false : null);
    };
    converters[String] = function (val) {
        if (val == null)
            return "";
        return val.toString();
    };
    converters[Number] = function (val) {
        if (!val)
            return 0;
        if (typeof val === "number")
            return val;
        return parseFloat(val.toString());
    };
    converters[Date] = function (val) {
        if (val == null)
            return new Date(0);
        return new Date(val.toString());
    };
    converters[RegExp] = function (val) {
        if (val instanceof RegExp)
            return val;
        if (val = null)
            throw new Error("Cannot specify an empty RegExp.");
        val = val.toString();
        return new RegExp(val);
    };

    function convertAnyToType(val, type) {
        var converter = converters[type];
        if (converter)
            return converter(val);
        if (type instanceof nullstone.Enum) {
            var enumo = type.Object;
            if (enumo.Converter)
                return enumo.Converter(val);
            val = val || 0;
            if (typeof val === "string")
                return enumo[val];
            return val;
        }
        return val;
    }
    nullstone.convertAnyToType = convertAnyToType;

    function convertStringToEnum(val, en) {
        if (!val)
            return 0;
        return en[val];
    }
    nullstone.convertStringToEnum = convertStringToEnum;

    function registerTypeConverter(type, converter) {
        converters[type] = converter;
    }
    nullstone.registerTypeConverter = registerTypeConverter;

    function registerEnumConverter(e, converter) {
        e.Converter = converter;
    }
    nullstone.registerEnumConverter = registerEnumConverter;
})(nullstone || (nullstone = {}));
var nullstone;
(function (nullstone) {
    (function (UriKind) {
        UriKind[UriKind["RelativeOrAbsolute"] = 0] = "RelativeOrAbsolute";
        UriKind[UriKind["Absolute"] = 1] = "Absolute";
        UriKind[UriKind["Relative"] = 2] = "Relative";
    })(nullstone.UriKind || (nullstone.UriKind = {}));
    var UriKind = nullstone.UriKind;
    var Uri = (function () {
        function Uri(uri, kind) {
            if (typeof uri === "string") {
                this.$$originalString = uri;
                this.$$kind = kind || 0 /* RelativeOrAbsolute */;
            } else if (uri instanceof Uri) {
                this.$$originalString = uri.$$originalString;
                this.$$kind = uri.$$kind;
            }
        }
        Object.defineProperty(Uri.prototype, "kind", {
            get: function () {
                return this.$$kind;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Uri.prototype, "host", {
            get: function () {
                var s = this.$$originalString;
                var ind = Math.max(3, s.indexOf("://") + 3);
                var end = s.indexOf("/", ind);

                return (end < 0) ? s.substr(ind) : s.substr(ind, end - ind);
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Uri.prototype, "absolutePath", {
            get: function () {
                var s = this.$$originalString;
                var ind = Math.max(3, s.indexOf("://") + 3);
                var start = s.indexOf("/", ind);
                if (start < 0 || start < ind)
                    return "/";
                var qstart = s.indexOf("?", start);
                if (qstart < 0 || qstart < start)
                    return s.substr(start);
                return s.substr(start, qstart - start);
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Uri.prototype, "scheme", {
            get: function () {
                var s = this.$$originalString;
                var ind = s.indexOf("://");
                if (ind < 0)
                    return null;
                return s.substr(0, ind);
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Uri.prototype, "fragment", {
            get: function () {
                var s = this.$$originalString;
                var ind = s.indexOf("#");
                if (ind < 0)
                    return "";
                return s.substr(ind);
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Uri.prototype, "originalString", {
            get: function () {
                return this.$$originalString.toString();
            },
            enumerable: true,
            configurable: true
        });

        Uri.prototype.toString = function () {
            return this.$$originalString.toString();
        };

        Uri.prototype.equals = function (other) {
            return this.$$originalString === other.$$originalString;
        };

        Uri.isNullOrEmpty = function (uri) {
            if (uri == null)
                return true;
            return !uri.$$originalString;
        };
        return Uri;
    })();
    nullstone.Uri = Uri;
    nullstone.registerTypeConverter(Uri, function (val) {
        if (val == null)
            val = "";
        return new Uri(val.toString());
    });
})(nullstone || (nullstone = {}));
var nullstone;
(function (nullstone) {
    var TypeManager = (function () {
        function TypeManager(defaultUri, xUri) {
            this.defaultUri = defaultUri;
            this.xUri = xUri;
            this.libResolver = new nullstone.LibraryResolver();
            this.libResolver.resolve(defaultUri).add(Array, "Array");

            this.libResolver.resolve(xUri).addPrimitive(String, "String").addPrimitive(Number, "Number").addPrimitive(Number, "Double").addPrimitive(Date, "Date").addPrimitive(RegExp, "RegExp").addPrimitive(Boolean, "Boolean").addPrimitive(nullstone.Uri, "Uri");
        }
        TypeManager.prototype.resolveLibrary = function (uri) {
            return this.libResolver.resolve(uri || this.defaultUri);
        };

        TypeManager.prototype.loadTypeAsync = function (uri, name) {
            return this.libResolver.loadTypeAsync(uri || this.defaultUri, name);
        };

        TypeManager.prototype.resolveType = function (uri, name, oresolve) {
            oresolve.isPrimitive = false;
            oresolve.type = undefined;
            return this.libResolver.resolveType(uri || this.defaultUri, name, oresolve);
        };

        TypeManager.prototype.add = function (uri, name, type) {
            var lib = this.libResolver.resolve(uri || this.defaultUri);
            if (lib)
                lib.add(type, name);
            return this;
        };

        TypeManager.prototype.addPrimitive = function (uri, name, type) {
            var lib = this.libResolver.resolve(uri || this.defaultUri);
            if (lib)
                lib.addPrimitive(type, name);
            return this;
        };

        TypeManager.prototype.addEnum = function (uri, name, enu) {
            var lib = this.libResolver.resolve(uri || this.defaultUri);
            if (lib)
                lib.addEnum(enu, name);
            return this;
        };
        return TypeManager;
    })();
    nullstone.TypeManager = TypeManager;
})(nullstone || (nullstone = {}));
var nullstone;
(function (nullstone) {
    function Annotation(type, name, value, forbidMultiple) {
        var at = type;
        var anns = at.$$annotations;
        if (!anns)
            Object.defineProperty(at, "$$annotations", { value: (anns = []), writable: false });
        var ann = anns[name];
        if (!ann)
            anns[name] = ann = [];
        if (forbidMultiple && ann.length > 0)
            throw new Error("Only 1 '" + name + "' annotation allowed per type [" + type.constructor.name + "].");
        ann.push(value);
    }
    nullstone.Annotation = Annotation;

    function GetAnnotations(type, name) {
        var at = type;
        var anns = at.$$annotations;
        if (!anns)
            return undefined;
        return (anns[name] || []).slice(0);
    }
    nullstone.GetAnnotations = GetAnnotations;

    function CreateTypedAnnotation(name) {
        function ta(type) {
            var values = [];
            for (var _i = 0; _i < (arguments.length - 1); _i++) {
                values[_i] = arguments[_i + 1];
            }
            for (var i = 0, len = values.length; i < len; i++) {
                Annotation(type, name, values[i]);
            }
        }

        ta.Get = function (type) {
            return GetAnnotations(type, name);
        };
        return ta;
    }
    nullstone.CreateTypedAnnotation = CreateTypedAnnotation;
})(nullstone || (nullstone = {}));
var nullstone;
(function (nullstone) {
    (function (async) {
        function create(resolution) {
            var onSuccess;
            var onError;

            var resolvedResult;

            function resolve(result) {
                resolvedResult = result;
                onSuccess && onSuccess(result);
            }

            var resolvedError;

            function reject(error) {
                resolvedError = error;
                onError && onError(error);
            }

            resolution(resolve, reject);

            var req = {
                then: function (success, errored) {
                    onSuccess = success;
                    onError = errored;
                    if (resolvedResult !== undefined)
                        onSuccess && onSuccess(resolvedResult);
                    else if (resolvedError !== undefined)
                        onError && onError(resolvedError);
                    return req;
                }
            };
            return req;
        }
        async.create = create;

        function resolve(obj) {
            return async.create(function (resolve, reject) {
                resolve(obj);
            });
        }
        async.resolve = resolve;

        function reject(err) {
            return async.create(function (resolve, reject) {
                reject(err);
            });
        }
        async.reject = reject;

        function many(arr) {
            if (!arr || arr.length < 1)
                return resolve([]);

            return create(function (resolve, reject) {
                var resolves = new Array(arr.length);
                var errors = new Array(arr.length);
                var finished = 0;
                var count = arr.length;
                var anyerrors = false;

                function completeSingle(i, res, err) {
                    resolves[i] = res;
                    errors[i] = err;
                    anyerrors = anyerrors || err !== undefined;
                    finished++;
                    if (finished >= count)
                        anyerrors ? reject(new nullstone.AggregateError(errors)) : resolve(resolves);
                }

                for (var i = 0; i < count; i++) {
                    arr[i].then(function (resi) {
                        return completeSingle(i, resi, undefined);
                    }, function (erri) {
                        return completeSingle(i, undefined, erri);
                    });
                }
            });
        }
        async.many = many;
    })(nullstone.async || (nullstone.async = {}));
    var async = nullstone.async;
})(nullstone || (nullstone = {}));
var nullstone;
(function (nullstone) {
    function equals(val1, val2) {
        if (val1 == null && val2 == null)
            return true;
        if (val1 == null || val2 == null)
            return false;
        if (val1 === val2)
            return true;
        return !!val1.equals && val1.equals(val2);
    }
    nullstone.equals = equals;
})(nullstone || (nullstone = {}));
var nullstone;
(function (nullstone) {
    var AggregateError = (function () {
        function AggregateError(errors) {
            this.errors = errors.filter(function (e) {
                return !!e;
            });
            Object.freeze(this);
        }
        Object.defineProperty(AggregateError.prototype, "flat", {
            get: function () {
                var flat = [];
                for (var i = 0, errs = this.errors; i < errs.length; i++) {
                    var err = errs[i];
                    if (err instanceof AggregateError) {
                        flat = flat.concat(err.flat);
                    } else {
                        flat.push(err);
                    }
                }
                return flat;
            },
            enumerable: true,
            configurable: true
        });
        return AggregateError;
    })();
    nullstone.AggregateError = AggregateError;
})(nullstone || (nullstone = {}));
var nullstone;
(function (nullstone) {
    var DirLoadError = (function () {
        function DirLoadError(path, error) {
            this.path = path;
            this.error = error;
            Object.freeze(this);
        }
        return DirLoadError;
    })();
    nullstone.DirLoadError = DirLoadError;
})(nullstone || (nullstone = {}));
var nullstone;
(function (nullstone) {
    var LibraryLoadError = (function () {
        function LibraryLoadError(library, error) {
            this.library = library;
            this.error = error;
            Object.freeze(this);
        }
        return LibraryLoadError;
    })();
    nullstone.LibraryLoadError = LibraryLoadError;
})(nullstone || (nullstone = {}));
var nullstone;
(function (nullstone) {
    (function (markup) {
        function finishMarkupExtension(me, prefixResolver, resolver, os) {
            if (!me)
                return me;
            if (typeof me.resolveTypeFields === "function") {
                me.resolveTypeFields(function (full) {
                    return parseType(full, prefixResolver, resolver);
                });
            }
            if (typeof me.transmute === "function") {
                return me.transmute(os);
            }
            return me;
        }
        markup.finishMarkupExtension = finishMarkupExtension;

        function parseType(full, prefixResolver, resolver) {
            var prefix = null;
            var name = full;
            var ind = name.indexOf(":");
            if (ind > -1) {
                prefix = name.substr(0, ind);
                name = name.substr(ind + 1);
            }
            var uri = prefixResolver.lookupNamespaceURI(prefix);
            var ort = resolver(uri, name);
            return ort.type;
        }
    })(nullstone.markup || (nullstone.markup = {}));
    var markup = nullstone.markup;
})(nullstone || (nullstone = {}));
var nullstone;
(function (nullstone) {
    (function (markup) {
        markup.NO_PARSER = {
            on: function (listener) {
                return markup.NO_PARSER;
            },
            setNamespaces: function (defaultXmlns, xXmlns) {
                return markup.NO_PARSER;
            },
            setExtensionParser: function (parser) {
                return markup.NO_PARSER;
            },
            parse: function (root) {
            },
            skipBranch: function () {
            },
            resolvePrefix: function (prefix) {
                return "";
            },
            walkUpObjects: function () {
                return nullstone.IEnumerator_.empty;
            }
        };

        var oresolve = {
            isPrimitive: false,
            type: Object
        };

        function createMarkupSax(listener) {
            return {
                resolveType: listener.resolveType || (function (uri, name) {
                    return oresolve;
                }),
                resolveObject: listener.resolveObject || (function (type) {
                    return new (type)();
                }),
                resolvePrimitive: listener.resolvePrimitive || (function (type, text) {
                    return new (type)(text);
                }),
                resolveResources: listener.resolveResources || (function (owner, ownerType) {
                    return new Object();
                }),
                branchSkip: listener.branchSkip || (function (root, obj) {
                }),
                object: listener.object || (function (obj, isContent) {
                }),
                objectEnd: listener.objectEnd || (function (obj, isContent, prev) {
                }),
                contentText: listener.contentText || (function (text) {
                }),
                name: listener.name || (function (name) {
                }),
                propertyStart: listener.propertyStart || (function (ownerType, propName) {
                }),
                propertyEnd: listener.propertyEnd || (function (ownerType, propName) {
                }),
                attributeStart: listener.attributeStart || (function (ownerType, attrName) {
                }),
                attributeEnd: listener.attributeEnd || (function (ownerType, attrName, obj) {
                }),
                error: listener.error || (function (e) {
                    return true;
                }),
                end: listener.end || (function () {
                })
            };
        }
        markup.createMarkupSax = createMarkupSax;
    })(nullstone.markup || (nullstone.markup = {}));
    var markup = nullstone.markup;
})(nullstone || (nullstone = {}));
var nullstone;
(function (nullstone) {
    (function (_markup) {
        var Markup = (function () {
            function Markup(uri) {
                this.uri = new nullstone.Uri(uri);
            }
            Markup.prototype.createParser = function () {
                return _markup.NO_PARSER;
            };

            Markup.prototype.resolve = function (typemgr, customCollector) {
                var resolver = new _markup.MarkupDependencyResolver(typemgr, this.createParser());
                resolver.collect(this.root, customCollector);
                return resolver.resolve();
            };

            Markup.prototype.loadAsync = function () {
                var reqUri = "text!" + this.uri.toString();
                var md = this;
                return nullstone.async.create(function (resolve, reject) {
                    require([reqUri], function (data) {
                        md.setRoot(md.loadRoot(data));
                        resolve(md);
                    }, reject);
                });
            };

            Markup.prototype.loadRoot = function (data) {
                return data;
            };

            Markup.prototype.setRoot = function (markup) {
                this.root = markup;
                return this;
            };
            return Markup;
        })();
        _markup.Markup = Markup;
    })(nullstone.markup || (nullstone.markup = {}));
    var markup = nullstone.markup;
})(nullstone || (nullstone = {}));
var nullstone;
(function (nullstone) {
    (function (markup) {
        var MarkupDependencyResolver = (function () {
            function MarkupDependencyResolver(typeManager, parser) {
                this.typeManager = typeManager;
                this.parser = parser;
                this.$$uris = [];
                this.$$names = [];
                this.$$resolving = [];
            }
            MarkupDependencyResolver.prototype.collect = function (root, customCollector) {
                var _this = this;
                var blank = {};
                var oresolve = {
                    isPrimitive: false,
                    type: Object
                };
                var last = {
                    uri: "",
                    name: "",
                    obj: undefined
                };
                var parse = {
                    resolveType: function (uri, name) {
                        _this.add(uri, name);
                        last.uri = uri;
                        last.name = name;
                        return oresolve;
                    },
                    resolveObject: function (type) {
                        return blank;
                    },
                    objectEnd: function (obj, isContent, prev) {
                        last.obj = obj;
                    },
                    propertyEnd: function (ownerType, propName) {
                    },
                    attributeEnd: function (ownerType, attrName, obj) {
                    }
                };
                if (customCollector) {
                    parse.propertyEnd = function (ownerType, propName) {
                        customCollector(last.uri, last.name, propName, last.obj);
                    };
                    parse.attributeEnd = function (ownerType, attrName, obj) {
                        customCollector(last.uri, last.name, attrName, obj);
                    };
                }

                this.parser.on(parse).parse(root);
            };

            MarkupDependencyResolver.prototype.add = function (uri, name) {
                var uris = this.$$uris;
                var names = this.$$names;
                var ind = uris.indexOf(uri);
                if (ind > -1 && names[ind] === name)
                    return false;
                if (this.$$resolving.indexOf(uri + "/" + name) > -1)
                    return false;
                uris.push(uri);
                names.push(name);
                return true;
            };

            MarkupDependencyResolver.prototype.resolve = function () {
                var as = [];
                for (var i = 0, uris = this.$$uris, names = this.$$names, tm = this.typeManager, resolving = this.$$resolving; i < uris.length; i++) {
                    var uri = uris[i];
                    var name = names[i];
                    resolving.push(uri + "/" + name);
                    as.push(tm.loadTypeAsync(uri, name));
                }
                return nullstone.async.many(as);
            };
            return MarkupDependencyResolver;
        })();
        markup.MarkupDependencyResolver = MarkupDependencyResolver;
    })(nullstone.markup || (nullstone.markup = {}));
    var markup = nullstone.markup;
})(nullstone || (nullstone = {}));
var nullstone;
(function (nullstone) {
    (function (markup) {
        (function (xaml) {
            
            var XamlExtensionParser = (function () {
                function XamlExtensionParser() {
                    this.$$defaultXmlns = "http://schemas.wsick.com/fayde";
                    this.$$xXmlns = "http://schemas.wsick.com/fayde/x";
                }
                XamlExtensionParser.prototype.setNamespaces = function (defaultXmlns, xXmlns) {
                    this.$$defaultXmlns = defaultXmlns;
                    this.$$xXmlns = xXmlns;
                    return this;
                };

                XamlExtensionParser.prototype.parse = function (value, resolver, os) {
                    if (!isAlpha(value[1]))
                        return value;
                    this.$$ensure();
                    var ctx = {
                        text: value,
                        i: 1,
                        acc: "",
                        error: "",
                        resolver: resolver
                    };
                    var obj = this.$$doParse(ctx, os);
                    if (ctx.error)
                        this.$$onError(ctx.error);
                    obj = markup.finishMarkupExtension(obj, resolver, this.$$onResolveType, os);
                    return obj;
                };

                XamlExtensionParser.prototype.$$doParse = function (ctx, os) {
                    if (!this.$$parseName(ctx))
                        return undefined;
                    this.$$startExtension(ctx, os);

                    while (ctx.i < ctx.text.length) {
                        if (!this.$$parseKeyValue(ctx, os))
                            break;
                        if (ctx.text[ctx.i] === "}") {
                            break;
                        }
                    }

                    return os.pop();
                };

                XamlExtensionParser.prototype.$$parseName = function (ctx) {
                    var ind = ctx.text.indexOf(" ", ctx.i);
                    if (ind > ctx.i) {
                        ctx.acc = ctx.text.substr(ctx.i, ind - ctx.i);
                        ctx.i = ind + 1;
                        return true;
                    }
                    ind = ctx.text.indexOf("}", ctx.i);
                    if (ind > ctx.i) {
                        ctx.acc = ctx.text.substr(ctx.i, ind - ctx.i);
                        ctx.i = ind;
                        return true;
                    }
                    ctx.error = "Missing closing bracket.";
                    return false;
                };

                XamlExtensionParser.prototype.$$startExtension = function (ctx, os) {
                    var full = ctx.acc;
                    var ind = full.indexOf(":");
                    var prefix = (ind < 0) ? null : full.substr(0, ind);
                    var name = (ind < 0) ? full : full.substr(ind + 1);
                    var uri = prefix ? ctx.resolver.lookupNamespaceURI(prefix) : xaml.DEFAULT_XMLNS;

                    var obj;
                    if (uri === this.$$xXmlns) {
                        if (name === "Null")
                            obj = this.$$parseXNull(ctx);
                        else if (name === "Type")
                            obj = this.$$parseXType(ctx);
                        else if (name === "Static")
                            obj = this.$$parseXStatic(ctx);
                        else
                            throw new Error("Unknown markup extension. [" + prefix + ":" + name + "]");
                    } else {
                        var ort = this.$$onResolveType(uri, name);
                        obj = this.$$onResolveObject(ort.type);
                    }
                    os.push(obj);
                };

                XamlExtensionParser.prototype.$$parseXNull = function (ctx) {
                    var ind = ctx.text.indexOf("}", ctx.i);
                    if (ind < ctx.i)
                        throw new Error("Unterminated string constant.");
                    ctx.i = ind;
                    return null;
                };

                XamlExtensionParser.prototype.$$parseXType = function (ctx) {
                    var end = ctx.text.indexOf("}", ctx.i);
                    if (end < ctx.i)
                        throw new Error("Unterminated string constant.");
                    var val = ctx.text.substr(ctx.i, end - ctx.i);
                    ctx.i = end;

                    var ind = val.indexOf(":");
                    var prefix = (ind < 0) ? null : val.substr(0, ind);
                    var name = (ind < 0) ? val : val.substr(ind + 1);
                    var uri = ctx.resolver.lookupNamespaceURI(prefix);
                    var ort = this.$$onResolveType(uri, name);
                    return ort.type;
                };

                XamlExtensionParser.prototype.$$parseXStatic = function (ctx) {
                    var text = ctx.text;
                    var len = text.length;
                    var start = ctx.i;
                    for (; ctx.i < len; ctx.i++) {
                        if (text[ctx.i] === "}" && text[ctx.i - 1] !== "\\")
                            break;
                    }
                    var val = text.substr(start, ctx.i - start);

                    var func = new Function("return (" + val + ");");
                    return func();
                };

                XamlExtensionParser.prototype.$$parseKeyValue = function (ctx, os) {
                    var text = ctx.text;
                    ctx.acc = "";
                    var key = "";
                    var val = undefined;
                    var len = text.length;
                    var nonalpha = false;
                    for (; ctx.i < len; ctx.i++) {
                        var cur = text[ctx.i];
                        if (cur === "\\") {
                            ctx.i++;
                            ctx.acc += text[ctx.i];
                        } else if (cur === "{") {
                            if (nonalpha || !isAlpha(text[ctx.i + 1])) {
                                ctx.acc += cur;
                                nonalpha = true;
                                continue;
                            }
                            if (!key) {
                                ctx.error = "A sub extension must be set to a key.";
                                return false;
                            }
                            ctx.i++;
                            val = this.$$doParse(ctx, os);
                            if (ctx.error)
                                return false;
                        } else if (cur === "=") {
                            key = ctx.acc.trim();
                            ctx.acc = "";
                        } else if (cur === "}") {
                            if (nonalpha) {
                                nonalpha = false;
                                ctx.acc += cur;
                            }
                            this.$$finishKeyValue(ctx, key, val, os);
                            return true;
                        } else if (cur === ",") {
                            ctx.i++;
                            this.$$finishKeyValue(ctx, key, val, os);
                            return true;
                        } else if (key && !ctx.acc && cur === "'") {
                            ctx.i++;
                            this.$$parseSingleQuoted(ctx);
                            val = ctx.acc;
                            ctx.acc = "";
                        } else {
                            ctx.acc += cur;
                        }
                    }
                    throw new Error("Unterminated string constant.");
                };

                XamlExtensionParser.prototype.$$finishKeyValue = function (ctx, key, val, os) {
                    if (val === undefined) {
                        if (!(val = ctx.acc.trim()))
                            return;
                    }

                    val = markup.finishMarkupExtension(val, ctx.resolver, this.$$onResolveType, os);
                    var co = os[os.length - 1];
                    if (!key) {
                        co.init && co.init(val);
                    } else {
                        co[key] = val;
                    }
                };

                XamlExtensionParser.prototype.$$parseSingleQuoted = function (ctx) {
                    var text = ctx.text;
                    var len = text.length;
                    for (; ctx.i < len; ctx.i++) {
                        var cur = text[ctx.i];
                        if (cur === "\\") {
                            ctx.i++;
                            ctx.acc += text[ctx.i];
                        } else if (cur === "'") {
                            return;
                        } else {
                            ctx.acc += cur;
                        }
                    }
                };

                XamlExtensionParser.prototype.$$ensure = function () {
                    this.onResolveType(this.$$onResolveType).onResolveObject(this.$$onResolveObject).onError(this.$$onError);
                };

                XamlExtensionParser.prototype.onResolveType = function (cb) {
                    var oresolve = {
                        isPrimitive: false,
                        type: Object
                    };
                    this.$$onResolveType = cb || (function (xmlns, name) {
                        return oresolve;
                    });
                    return this;
                };

                XamlExtensionParser.prototype.onResolveObject = function (cb) {
                    this.$$onResolveObject = cb || (function (type) {
                        return new type();
                    });
                    return this;
                };

                XamlExtensionParser.prototype.onResolvePrimitive = function (cb) {
                    this.$$onResolvePrimitive = cb || (function (type, text) {
                        return new type(text);
                    });
                    return this;
                };

                XamlExtensionParser.prototype.onError = function (cb) {
                    this.$$onError = cb || (function (e) {
                    });
                    return this;
                };
                return XamlExtensionParser;
            })();
            xaml.XamlExtensionParser = XamlExtensionParser;

            function isAlpha(c) {
                if (!c)
                    return false;
                var code = c[0].toUpperCase().charCodeAt(0);
                return code >= 65 && code <= 90;
            }
        })(markup.xaml || (markup.xaml = {}));
        var xaml = markup.xaml;
    })(nullstone.markup || (nullstone.markup = {}));
    var markup = nullstone.markup;
})(nullstone || (nullstone = {}));
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var nullstone;
(function (nullstone) {
    (function (markup) {
        (function (xaml) {
            var parser = new DOMParser();
            var xcache = new nullstone.Memoizer(function (key) {
                return new XamlMarkup(key);
            });

            var XamlMarkup = (function (_super) {
                __extends(XamlMarkup, _super);
                function XamlMarkup() {
                    _super.apply(this, arguments);
                }
                XamlMarkup.create = function (uri) {
                    return xcache.memoize(uri.toString());
                };

                XamlMarkup.prototype.createParser = function () {
                    return new xaml.XamlParser();
                };

                XamlMarkup.prototype.loadRoot = function (data) {
                    var doc = parser.parseFromString(data, "text/xml");
                    return doc.documentElement;
                };
                return XamlMarkup;
            })(markup.Markup);
            xaml.XamlMarkup = XamlMarkup;
        })(markup.xaml || (markup.xaml = {}));
        var xaml = markup.xaml;
    })(nullstone.markup || (nullstone.markup = {}));
    var markup = nullstone.markup;
})(nullstone || (nullstone = {}));
var nullstone;
(function (nullstone) {
    (function (markup) {
        (function (xaml) {
            xaml.DEFAULT_XMLNS = "http://schemas.wsick.com/fayde";
            xaml.DEFAULT_XMLNS_X = "http://schemas.wsick.com/fayde/x";
            var ERROR_XMLNS = "http://www.w3.org/1999/xhtml";
            var ERROR_NAME = "parsererror";

            var XamlParser = (function () {
                function XamlParser() {
                    this.$$onEnd = null;
                    this.$$objectStack = [];
                    this.$$skipnext = false;
                    this.$$curel = null;
                    this.$$curkey = undefined;
                    this.setExtensionParser(new xaml.XamlExtensionParser()).setNamespaces(xaml.DEFAULT_XMLNS, xaml.DEFAULT_XMLNS_X).on({});
                }
                XamlParser.prototype.on = function (listener) {
                    listener = markup.createMarkupSax(listener);

                    this.$$onResolveType = listener.resolveType;
                    this.$$onResolveObject = listener.resolveObject;
                    this.$$onResolvePrimitive = listener.resolvePrimitive;
                    this.$$onResolveResources = listener.resolveResources;
                    this.$$onBranchSkip = listener.branchSkip;
                    this.$$onObject = listener.object;
                    this.$$onObjectEnd = listener.objectEnd;
                    this.$$onContentText = listener.contentText;
                    this.$$onName = listener.name;
                    this.$$onPropertyStart = listener.propertyStart;
                    this.$$onPropertyEnd = listener.propertyEnd;
                    this.$$onAttributeStart = listener.attributeStart;
                    this.$$onAttributeEnd = listener.attributeEnd;
                    this.$$onError = listener.error;
                    this.$$onEnd = listener.end;

                    if (this.$$extension) {
                        this.$$extension.onResolveType(this.$$onResolveType).onResolveObject(this.$$onResolveObject).onResolvePrimitive(this.$$onResolvePrimitive);
                    }

                    return this;
                };

                XamlParser.prototype.setNamespaces = function (defaultXmlns, xXmlns) {
                    this.$$defaultXmlns = defaultXmlns;
                    this.$$xXmlns = xXmlns;
                    if (this.$$extension)
                        this.$$extension.setNamespaces(this.$$defaultXmlns, this.$$xXmlns);
                    return this;
                };

                XamlParser.prototype.setExtensionParser = function (parser) {
                    this.$$extension = parser;
                    if (parser) {
                        parser.setNamespaces(this.$$defaultXmlns, this.$$xXmlns).onResolveType(this.$$onResolveType).onResolveObject(this.$$onResolveObject).onResolvePrimitive(this.$$onResolvePrimitive).onError(function (e) {
                            throw e;
                        });
                    }
                    return this;
                };

                XamlParser.prototype.parse = function (el) {
                    if (!this.$$extension)
                        throw new Error("No extension parser exists on parser.");
                    this.$$handleElement(el, true);
                    this.$$destroy();
                    return this;
                };

                XamlParser.prototype.skipBranch = function () {
                    this.$$skipnext = true;
                };

                XamlParser.prototype.walkUpObjects = function () {
                    var os = this.$$objectStack;
                    var i = os.length;
                    return {
                        current: undefined,
                        moveNext: function () {
                            i--;
                            return (this.current = os[i]) !== undefined;
                        }
                    };
                };

                XamlParser.prototype.resolvePrefix = function (prefix) {
                    return this.$$curel.lookupNamespaceURI(prefix);
                };

                XamlParser.prototype.$$handleElement = function (el, isContent) {
                    var old = this.$$curel;
                    this.$$curel = el;
                    var name = el.localName;
                    var xmlns = el.namespaceURI;
                    if (this.$$tryHandleError(el, xmlns, name) || this.$$tryHandlePropertyTag(el, xmlns, name)) {
                        this.$$curel = old;
                        return;
                    }

                    var os = this.$$objectStack;
                    var ort = this.$$onResolveType(xmlns, name);
                    if (this.$$tryHandlePrimitive(el, ort, isContent)) {
                        this.$$curel = old;
                        return;
                    }

                    var obj = this.$$onResolveObject(ort.type);
                    if (obj !== undefined) {
                        os.push(obj);
                        this.$$onObject(obj, isContent);
                    }

                    var resEl = findResourcesElement(el, xmlns, name);
                    if (resEl)
                        this.$$handleResources(obj, ort.type, resEl);

                    this.$$curkey = undefined;

                    this.$$processAttributes(el);
                    var key = this.$$curkey;

                    if (this.$$skipnext) {
                        this.$$skipnext = false;
                        os.pop();
                        this.$$onObjectEnd(obj, key, isContent, os[os.length - 1]);
                        this.$$onBranchSkip(el.firstElementChild, obj);
                        this.$$curel = old;
                        return;
                    }

                    var child = el.firstElementChild;
                    var hasChildren = !!child;
                    while (child) {
                        if (!resEl || child !== resEl)
                            this.$$handleElement(child, true);
                        child = child.nextElementSibling;
                    }

                    if (!hasChildren) {
                        var text = el.textContent;
                        if (text && (text = text.trim()))
                            this.$$onContentText(text);
                    }

                    if (obj !== undefined) {
                        os.pop();
                        this.$$onObjectEnd(obj, key, isContent, os[os.length - 1]);
                    }
                    this.$$curel = old;
                };

                XamlParser.prototype.$$handleResources = function (owner, ownerType, resEl) {
                    var os = this.$$objectStack;
                    var rd = this.$$onResolveResources(owner, ownerType);
                    os.push(rd);
                    this.$$onObject(rd, false);
                    var child = resEl.firstElementChild;
                    while (child) {
                        this.$$handleElement(child, true);
                        child = child.nextElementSibling;
                    }
                    os.pop();
                    this.$$onObjectEnd(rd, undefined, false, os[os.length - 1]);
                };

                XamlParser.prototype.$$tryHandleError = function (el, xmlns, name) {
                    if (xmlns !== ERROR_XMLNS || name !== ERROR_NAME)
                        return false;
                    this.$$onError(new Error(el.textContent));
                    return true;
                };

                XamlParser.prototype.$$tryHandlePropertyTag = function (el, xmlns, name) {
                    var ind = name.indexOf('.');
                    if (ind < 0)
                        return false;

                    var ort = this.$$onResolveType(xmlns, name.substr(0, ind));
                    var type = ort.type;
                    name = name.substr(ind + 1);

                    this.$$onPropertyStart(type, name);

                    var child = el.firstElementChild;
                    while (child) {
                        this.$$handleElement(child, false);
                        child = child.nextElementSibling;
                    }

                    this.$$onPropertyEnd(type, name);

                    return true;
                };

                XamlParser.prototype.$$tryHandlePrimitive = function (el, oresolve, isContent) {
                    if (!oresolve.isPrimitive)
                        return false;
                    var text = el.textContent;
                    var obj = this.$$onResolvePrimitive(oresolve.type, text ? text.trim() : "");
                    this.$$onObject(obj, isContent);
                    this.$$curkey = undefined;
                    this.$$processAttributes(el);
                    var key = this.$$curkey;
                    var os = this.$$objectStack;
                    this.$$onObjectEnd(obj, key, isContent, os[os.length - 1]);
                    return true;
                };

                XamlParser.prototype.$$processAttributes = function (el) {
                    for (var i = 0, attrs = el.attributes, len = attrs.length; i < len; i++) {
                        this.$$processAttribute(attrs[i]);
                    }
                };

                XamlParser.prototype.$$processAttribute = function (attr) {
                    var prefix = attr.prefix;
                    var name = attr.localName;
                    if (this.$$shouldSkipAttr(prefix, name))
                        return true;
                    var uri = attr.namespaceURI;
                    var value = attr.value;
                    if (this.$$tryHandleXAttribute(uri, name, value))
                        return true;
                    return this.$$handleAttribute(uri, name, value, attr);
                };

                XamlParser.prototype.$$shouldSkipAttr = function (prefix, name) {
                    if (prefix === "xmlns")
                        return true;
                    return (!prefix && name === "xmlns");
                };

                XamlParser.prototype.$$tryHandleXAttribute = function (uri, name, value) {
                    if (uri !== this.$$xXmlns)
                        return false;
                    if (name === "Name")
                        this.$$onName(value);
                    if (name === "Key")
                        this.$$curkey = value;
                    return true;
                };

                XamlParser.prototype.$$handleAttribute = function (uri, name, value, attr) {
                    var type = null;
                    var name = name;
                    var ind = name.indexOf('.');
                    if (ind > -1) {
                        var ort = this.$$onResolveType(uri, name.substr(0, ind));
                        type = ort.type;
                        name = name.substr(ind + 1);
                    }
                    this.$$onAttributeStart(type, name);
                    var val = this.$$getAttrValue(value, attr);
                    this.$$onAttributeEnd(type, name, val);
                    return true;
                };

                XamlParser.prototype.$$getAttrValue = function (val, attr) {
                    if (val[0] !== "{")
                        return val;
                    return this.$$extension.parse(val, attr, this.$$objectStack);
                };

                XamlParser.prototype.$$destroy = function () {
                    this.$$onEnd && this.$$onEnd();
                };
                return XamlParser;
            })();
            xaml.XamlParser = XamlParser;

            function findResourcesElement(ownerEl, uri, name) {
                var expected = name + ".Resources";
                var child = ownerEl.firstElementChild;
                while (child) {
                    if (child.localName === expected && child.namespaceURI === uri)
                        return child;
                    child = child.nextElementSibling;
                }
                return null;
            }
        })(markup.xaml || (markup.xaml = {}));
        var xaml = markup.xaml;
    })(nullstone.markup || (nullstone.markup = {}));
    var markup = nullstone.markup;
})(nullstone || (nullstone = {}));
//# sourceMappingURL=nullstone.js.map
