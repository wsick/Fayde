/// <reference path="../Runtime/Nullstone.ts" />
/// <reference path="../Controls/TextBlock.ts" />
/// <reference path="../Controls/Primitives/Popup.ts" />
/// CODE
/// <reference path="../Core/DependencyProperty.ts" />
/// <reference path="../Core/Clone.ts" />

module Fayde.Data {
    declare var Warn;

    interface IParseData {
        index: number;
        i: number;
        end: number;
        path: string;
        parenOpen: bool;
        tickOpen: bool;
        prop: string;
        res: DependencyProperty;
        cloned: bool;
        expressionFound: bool;
        lu: DependencyObject;
        collection: XamlObjectCollection;
        promotedValues: any[];
        explicitType: bool;
        type: Function;
        objRes: any[];
    }

    var lookupNamespaces: any[];
    function lookupType(name: string) {
        if (!lookupNamespaces) {
            lookupNamespaces = [
                Fayde,
                Fayde.Controls,
                Fayde.Media,
                Fayde.Controls.Primitives, 
                Fayde.Shapes, 
                window];
        }

        var len = lookupNamespaces.length;
        for (var i = 0; i < len; i++) {
            var potentialType = lookupNamespaces[i][name];
            if (potentialType)
                return potentialType;
        }
        return eval(name);
    }

    function handlePeriod(data: IParseData): bool {
        if (data.tickOpen)
            return true;
        if (data.res != null) {
            var value = null;
            if ((value = data.lu._Store.GetValue(data.res)) == null)
                return false;
            if (!(value instanceof DependencyObject))
                return false;

            var newLu = value;
            if (data.promotedValues && data.promotedValues[value._ID] == null && !(value instanceof UIElement)) {
                var clonedValue = Fayde.Clone(value);
                if (clonedValue instanceof DependencyObject) {
                    newLu = clonedValue;
                    data.lu._Store.SetValue(data.res, clonedValue);
                    clonedValue = data.lu._Store.GetValue(data.res);
                    data.promotedValues[clonedValue._ID] = clonedValue;
                }
            }

            data.objRes.push(data.res);
            data.lu = newLu;
        }
        data.expressionFound = false;
        data.prop = data.path.substr(data.index);
        return true;
    }
    function handleLeftBracket (data: IParseData): bool {
        if (data.index >= data.end)
            return;

        var hasLeadingZeroes = false;
        while (data.path.charAt(data.index) === '0') {
            hasLeadingZeroes = true;
            data.index++;
        }
        data.i = parseInt(data.path.substr(data.index), 10);
        if (!isNaN(data.i))
            data.index += data.i.toString().length;
        if (isNaN(data.i) && hasLeadingZeroes)
            data.i = 0;

        if (data.path.charAt(data.index) !== ']' || data.path.charAt(data.index + 1) !== '.')
            return true;

        data.prop = data.path = data.path.substr(data.index + 2);
        data.index = 0;
        data.end = data.path.length;

        var value = null;
        if (data.expressionFound) {
            data.expressionFound = false;
            if ((value = data.lu.GetValue(data.res)) == null)
                return false;
        }

        if (value instanceof XamlObjectCollection) {
            data.collection = <XamlObjectCollection>value;
        } else {
            data.collection = null;
            return false;
        }

        if ((value = (<XamlObjectCollection>data.collection).GetValueAt(data.i)) == null)
            return false;

        if (value instanceof DependencyObject) {
            data.lu = <DependencyObject>value;
            data.objRes.push(data.res);
            data.objRes.push(data.i);
        } else {
            data.lu = null;
            return false;
        }

        return true;
    }
    function handleDefault(data: IParseData): bool {
        var explicitType = false;
        data.expressionFound = true;
        var start = data.index - 1;

        var c;
        while (data.index < data.end) {
            c = data.path.charAt(data.index);
            if (!((c !== '.' || data.tickOpen) && (!data.parenOpen || c !== ')') && c !== '['))
                break;
            data.index++;
            if (c === '\'') {
                data.tickOpen = !data.tickOpen;
                if (!data.tickOpen)
                    break;
            }
        }

        if (data.index === data.end) {
            // This happened because a property at the end of the path ended like this: '.Property'
            // We only fail if we can't find the property
            data.type = (<any>data.lu).constructor;
        } else {
            c = data.path.charAt(data.index);
            if (c === '.') {
                // we found a type name, now find the property name
                if ((data.index - start) === 11 && data.path.substr(start, 11).toLowerCase() === "textelement") { //bug workaround from Blend
                    data.type = Controls.TextBlock;
                    data.explicitType = true;
                } else {
                    var s = data.index;
                    if (data.path.charAt(data.index - 1) === '\'' && !data.tickOpen) {
                        s = data.index - 1;
                    }
                    var name = data.path.slice(start, s);
                    data.type = lookupType(name);
                    data.explicitType = true;
                    if (!data.type)
                        data.type = (<any>data.lu).constructor;
                }
                data.index++;
                start = data.index;
                while (data.index < data.end) {
                    c = data.path.charAt(data.index);
                    if (!((!data.parenOpen || c !== ')') && (c !== '.' || data.tickOpen)))
                        break;
                    data.index++;
                    if (c === '\'') {
                        data.tickOpen = !data.tickOpen;
                        if (!data.tickOpen)
                            break;
                    }
                }
                if (data.index === start)
                    return false;
            } else {
                data.type = (<any>data.lu).constructor;
                data.explicitType = false;
            }

            c = data.path.charAt(data.index);
            if ((c !== ')' && data.parenOpen) || data.type == null)
                return false;
        }
        name = data.path.slice(start, data.index);
        if ((data.res = DependencyProperty.GetDependencyProperty(data.type, name)) == null && data.lu)
            data.res = DependencyProperty.GetDependencyProperty((<any>data.lu).constructor, name);

        if (data.res == null)
            return false;

        if (!data.res.IsAttached && !(data.lu instanceof data.type)) {
            if ((data.res = DependencyProperty.GetDependencyProperty((<any>data.lu).constructor, name)) == null)
                return false;
        }

        if (data.res.IsAttached && data.explicitType && !data.parenOpen)
            return false;

        return true;
    }

    export class PropertyPath implements ICloneable {
        private _Path: string;
        private _ExpandedPath: string;
        private _Propd: DependencyProperty = null;
        private _ObjRes: any[] = null;
        constructor(path?: string, expandedPath?: string) {
            this._Path = path;
            this._ExpandedPath = expandedPath;
        }

        static CreateFromParameter(parameter) {
            var p = new PropertyPath();
            if (parameter instanceof DependencyProperty)
                p._Propd = <DependencyProperty>parameter;
            p._Path = null;
            if (parameter instanceof String)
                p._Path = parameter;
            return p;
        }

        TryResolveDependencyProperty(refobj: IOutValue, promotedValues: any[]): DependencyProperty {
            var or = this._ObjRes;
            if (!or)
                return this._Propd = PropertyPath.ResolvePropertyPath(refobj, this, promotedValues);

            var val = refobj.Value;
            var len = or.length;
            var key: any;
            for (var i = 0; i < len; i++) {
                key = or[i];
                if (typeof key === "number")
                    val = val[key];
                else
                    val = val.GetValue(key);
            }
            refobj.Value = val;
            return this._Propd;
        }

        get Path(): string { return !this._Propd ? this._Path : "(0)"; }
        get ExpandedPath(): string { return !this._Propd ? this._ExpandedPath : "(0)"; }
        get ParsePath(): string {
            if (this._Propd)
                return "(0)";
            if (this._ExpandedPath)
                return this._ExpandedPath;
            return this._Path;
        }
        get HasDependencyProperty() { return this._Propd != null; }
        get DependencyProperty() { return this._Propd; }

        static ResolvePropertyPath(refobj: IOutValue, propertyPath: PropertyPath, promotedValues: any[]): DependencyProperty {
            var path = propertyPath.Path;
            var expanded = propertyPath.ExpandedPath;
            if (expanded != null)
                path = expanded;

            var data: IParseData = {
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
                type: null,
                objRes: []
            };

            var success;
            while (data.index < data.end) {
                success = true;
                var c = data.path.charAt(data.index);
                data.index++;
                if (c === '(') {
                    data.parenOpen = true;
                } else if (c === ')') {
                    data.parenOpen = false;
                } else if (c === '\'') {//Ticks only legal in expanded path
                    if (propertyPath.ExpandedPath == null)
                        Warn("The ' character is not legal in property paths.");
                    else
                        data.tickOpen = !data.tickOpen;
                } else if (c === '.') {
                    success = handlePeriod(data);
                } else if (c === '[') {
                    success = handleLeftBracket(data);
                } else {
                    success = handleDefault(data);
                }
                if (!success) {
                    refobj.Value = null;
                    return null;
                }
            }
            refobj.Value = data.lu;
            propertyPath._ObjRes = data.objRes;
            return data.res;
        }

        Clone(): PropertyPath {
            return new PropertyPath(this._Path, this._ExpandedPath);
        }
    }
    Nullstone.RegisterType(PropertyPath, "PropertyPath");
}