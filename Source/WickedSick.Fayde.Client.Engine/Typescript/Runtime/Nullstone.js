var Nullstone = (function () {
    function Nullstone() { }
    Nullstone.RegisterType = function RegisterType(type, name, interfaces) {
        var t = type;
        t._TypeName = name;
        t._BaseClass = Object.getPrototypeOf(type.prototype).constructor;
        t._Interfaces = interfaces;
    };
    Nullstone.Equals = function Equals(val1, val2) {
        if(val1 == null && val2 == null) {
            return true;
        }
        if(val1 == null || val2 == null) {
            return false;
        }
        if(val1 === val2) {
            return true;
        }
        if(val1.Equals) {
            return val1.Equals(val2);
        }
        return false;
    };
    Nullstone.DoesInheritFrom = function DoesInheritFrom(t, type) {
        var temp = t;
        while(temp && temp !== type) {
            temp = (temp)._BaseClass;
        }
        return temp != null;
    };
    Nullstone.GetPropertyDescriptor = function GetPropertyDescriptor(obj, name) {
        if(!obj) {
            return;
        }
        var type = (obj).constructor;
        var propDesc = Object.getOwnPropertyDescriptor(type.prototype, name);
        if(propDesc) {
            return propDesc;
        }
        return Object.getOwnPropertyDescriptor(obj, name);
    };
    Nullstone.HasProperty = function HasProperty(obj, name) {
        if(!obj) {
            return false;
        }
        if(obj.hasOwnProperty(name)) {
            return true;
        }
        var type = obj.constructor;
        return type.prototype.hasOwnProperty(name);
    };
    Nullstone.RegisterInterface = function RegisterInterface(name) {
        return {
            Name: name
        };
    };
    Nullstone.ImplementsInterface = function ImplementsInterface(obj, i) {
        if(!obj) {
            return false;
        }
        var curType = obj.constructor;
        if(!curType) {
            return false;
        }
        var is;
        do {
            is = curType._Interfaces;
            if(!is) {
                continue;
            }
            if(is.indexOf(i) > -1) {
                return true;
            }
        }while(curType = curType._BaseClass);
        return false;
    };
    Nullstone.ImportJsFile = function ImportJsFile(url, onComplete) {
        var scripts = document.getElementsByTagName("script");
        var script = null;
        for(var i = 0; i < scripts.length; i++) {
            script = scripts[i];
            if(script.src === url) {
                if(onComplete) {
                    onComplete(script);
                }
                return;
            }
        }
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.src = url;
        script.onreadystatechange = function (e) {
            if(this.readyState === "completed") {
                if(onComplete) {
                    onComplete(script);
                }
                return;
            }
        };
        script.onload = function () {
            if(onComplete) {
                onComplete(script);
            }
        };
        var head = document.getElementsByTagName("head")[0];
        head.appendChild(script);
    };
    return Nullstone;
})();
function Warn(str) {
    if(window.console && console.warn) {
        console.warn(str);
    }
}
//@ sourceMappingURL=Nullstone.js.map
