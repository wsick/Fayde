module Fayde.Markup.Internal {
    export interface IActiveObject {
        obj: any;
        xo: XamlObject;
        dobj: DependencyObject;
        rd: ResourceDictionary;
        coll: nullstone.ICollection<any>;
        arr: any[];
        type: any;
        set(obj: any);
        setName(name: string);
        getKey(): any;
        setKey(key: any);
    }

    var KeyProperty = DependencyProperty.RegisterAttached("Key", () => Object, new Function());

    export function createActiveObject (namescope: NameScope, bindingSource: any): IActiveObject {
        return {
            obj: null,
            xo: null,
            dobj: null,
            rd: null,
            coll: null,
            arr: null,
            type: null,
            set (obj: any) {
                this.obj = obj;
                this.type = obj ? obj.constructor : null;
                this.rd = (obj instanceof ResourceDictionary) ? obj : null;
                this.dobj = (obj instanceof DependencyObject) ? obj : null;
                var xo = this.xo = (obj instanceof XamlObject) ? obj : null;
                if (xo) {
                    xo.XamlNode.DocNameScope = namescope;
                    xo.TemplateOwner = bindingSource;
                }
                this.coll = nullstone.ICollection_.as(obj);
                this.arr = (typeof obj === "array") ? obj : null;
            },
            setName (name: string) {
                if (this.xo) {
                    var xnode = this.xo.XamlNode;
                    namescope.RegisterName(name, xnode);
                    xnode.Name = name;
                }
            },
            getKey (): any {
                if (this.dobj)
                    return this.dobj.GetValue(KeyProperty);
                if (this.obj) {
                    var key = this.obj.$$key$$;
                    this.obj.$$key$$ = undefined;
                    return key;
                }
            },
            setKey (key: any) {
                if (this.dobj) {
                    this.dobj.SetValue(KeyProperty, key);
                } else if (this.obj) {
                    this.obj.$$key$$ = key;
                }
            }
        };
    }
}