/// <reference path="TypeManagement.ts" />
/// CODE

interface IOutValue {
    Value: any;
}
interface ICloneable {
    Clone(): any;
}

interface IJsFileImportToken {
    IsCompleted: boolean;
    Script: HTMLScriptElement;
    DoOnComplete(callback: (token: IJsFileImportToken) => void);
}

interface IJsFilesImportToken {
    IsCompleted: boolean;
    Scripts: HTMLScriptElement[];
    DoOnComplete(callback: (token: IJsFilesImportToken) => void );
}

class Nullstone {
    static RegisterType(type: any, name: string, interfaces?: IInterfaceDeclaration[]): ITypeRegistration {
        var t: any = type;
        t._TypeName = name;
        t._BaseClass = Object.getPrototypeOf(type.prototype).constructor;
        t._Interfaces = interfaces;
        return t;
    }

    static Equals(val1: any, val2: any): boolean {
        if (val1 == null && val2 == null)
            return true;
        if (val1 == null || val2 == null)
            return false;
        if (val1 === val2)
            return true;
        if (val1.Equals)
            return val1.Equals(val2);
        return false;
    }
    static DoesInheritFrom(t: IType, type: any): boolean {
        var temp = t;
        while (temp && temp !== type) {
            temp = (<any>temp)._BaseClass;
        }
        return temp != null;
    }
    static GetPropertyDescriptor(obj: any, name: string): PropertyDescriptor {
        if (!obj)
            return;
        var type: Function = (<any>obj).constructor;
        var propDesc = Object.getOwnPropertyDescriptor(type.prototype, name);
        if (propDesc)
            return propDesc;
        return Object.getOwnPropertyDescriptor(obj, name);
    }
    static HasProperty(obj: any, name: string): boolean {
        if (!obj)
            return false;
        if (obj.hasOwnProperty(name))
            return true;
        var type = obj.constructor;
        return type.prototype.hasOwnProperty(name);
    }

    static ImplementsInterface(obj: any, i: IInterfaceDeclaration): boolean {
        if (!obj)
            return false;
        var curType: any = obj.constructor;
        if (!curType)
            return false;
        var is: IInterfaceDeclaration[];
        do {
            is = curType._Interfaces;
            if (!is)
                continue;
            if (is.indexOf(i) > -1)
                return true;
        } while (curType = curType._BaseClass);
        return false;
    }

    static ImportJsFile(url: string, onComplete?: (token: IJsFileImportToken) => void ): IJsFileImportToken {
        var token = {
            IsCompleted: false,
            Script: undefined,
            OnComplete: onComplete || () => { },
            DoOnComplete: function (callback: () => void ) {
                this.OnComplete = callback || () => { };
                if (!this.IsCompleted)
                    return;
                this.OnComplete();
            }
        };

        var scripts = document.getElementsByTagName("script");
        var script: HTMLScriptElement = null;
        for (var i = 0; i < scripts.length; i++) {
            script = <HTMLScriptElement>scripts[i];
            if (script.src === url) {
                token.Script = script;
                token.IsCompleted = true;
                token.OnComplete(token);
                return;
            }
        }

        var script = <HTMLScriptElement>document.createElement("script");
        token.Script = script;
        script.type = "text/javascript";
        script.src = url;
        script.onreadystatechange = function (e: Event) {
            if (this.readyState === "completed") {
                token.IsCompleted = true;
                token.OnComplete(token);
            }
        };
        script.onload = function () {
            token.IsCompleted = true;
            token.OnComplete(token);
        };

        var head = <HTMLHeadElement>document.getElementsByTagName("head")[0];
        head.appendChild(script);

        return token;
    }
    static ImportJsFiles(urls: string[], onComplete?: (token: IJsFilesImportToken) => void ): IJsFilesImportToken {
        var token = {
            IsCompleted: false,
            Scripts: [],
            OnComplete: onComplete || () => { },
            DoOnComplete: function (callback: () => void ) {
                this.OnComplete = callback || () => { };
                if (!this.IsCompleted)
                    return;
                this.OnComplete();
            }
        };

        var allsubtokens = [];
        var len = urls.length;
        
        var check = function (t: IJsFileImportToken) {
            allsubtokens.push(t);
            if (allsubtokens.length === len) {
                token.IsCompleted = true;
                token.OnComplete(token);
            }
        }

        for (var i = 0; i < len; i++) {
            var subtoken = Nullstone.ImportJsFile(urls[i]);
            token.Scripts.push(subtoken.Script);
            subtoken.DoOnComplete(check);
        }
        
        return token;
    }
}

function NotImplemented(str: string) {
    if (window.console && console.warn)
        console.warn("NotImplemented: " + str);
}
function Warn(str: string) {
    if (window.console && console.warn)
        console.warn(str);
}