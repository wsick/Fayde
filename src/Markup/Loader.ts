module Fayde.Markup {
    export class FrameworkTemplate extends XamlObject {
        private $$markup: nullstone.markup.Markup<any>;

        GetVisualTree (bindingSource: DependencyObject): UIElement {
            var uie = LoadImpl<UIElement>(bindingSource, this.$$markup, bindingSource);
            if (!(uie instanceof UIElement))
                throw new XamlParseException("Template root visual is not a UIElement.");
            return uie;
        }
    }

    function setTemplateRoot (ft: FrameworkTemplate, root: any) {
        if (root instanceof Element)
            (<any>ft).$$markup = CreateXaml(root);
    }

    export function LoadXaml<T extends XamlObject>(initiator: DependencyObject, xaml: string): T;
    export function LoadXaml<T extends XamlObject>(initiator: DependencyObject, el: Element): T;
    export function LoadXaml<T extends XamlObject>(initiator: DependencyObject, xaml: any): T {
        var markup = CreateXaml(xaml);
        return Load<T>(initiator, markup);
    }

    export function Load<T extends XamlObject>(initiator: DependencyObject, xm: nullstone.markup.Markup<any>): T {
        return LoadImpl<T>(initiator, xm);
    }

    function LoadImpl<T>(initiator: DependencyObject, xm: nullstone.markup.Markup<any>, bindingSource?: DependencyObject): T {
        var namescope = new NameScope(true);

        var oresolve: nullstone.IOutType = {
            isPrimitive: false,
            type: undefined
        };

        //TODO: Implement
        var cur = {
            obj: null,
            xo: <XamlObject>null,
            dobj: <DependencyObject>null,
            rd: <ResourceDictionary>null,
            coll: <nullstone.ICollection<any>>null,
            arr: <any[]>null,
            set: function (obj: any) {
                this.obj = obj;
                this.rd = (obj instanceof ResourceDictionary) ? obj : null;
                this.dobj = (obj instanceof DependencyObject) ? obj : null;
                var xo = this.xo = (obj instanceof XamlObject) ? obj : null;
                if (xo) {
                    xo.XamlNode.DocNameScope = namescope;
                    xo.TemplateOwner = bindingSource;
                }
                this.coll = nullstone.ICollection_.as(obj);
                this.arr = (typeof obj === "array") ? obj : null;
            }
        };
        var props = {
            arr: [],
            carr: null,
            start: function () {
                this.arr.push(this.carr = []);
            },
            end: function () {
                this.arr.pop();
                this.carr = this.arr[this.arr.length - 1];
            },
            verify: function (ownerType: any, name: string) {
                var fullName = (ownerType ? ownerType.name + "." : "") + name;
                if (this.carr.indexOf(fullName) > -1)
                    throw new XamlParseException("Cannot set '" + fullName + "' more than once.");
                this.carr.push(fullName);
            },
            setProp: function (ownerType: any, name: string, val: any) {
                if (!cur.obj)
                    return;
                ownerType = ownerType || cur.obj.constructor;
                this.verify(ownerType, name);
                if (cur.dobj) {
                    var propd = DependencyProperty.GetDependencyProperty(ownerType, name);
                    cur.dobj.SetValue(propd, val);
                } else if (cur.obj.constructor === ownerType) {
                    cur.obj[name] = val;
                }
            },
            setContent: function (val: any) {
                if (cur.dobj) {
                    var ownerType = cur.dobj.constructor;
                    this.verify(ownerType);
                    var cprop = Content.Get(ownerType);
                    cur.dobj.SetValue(cprop, val);
                } else if (cur.coll) {
                    cur.coll.Add(val);
                } else if (cur.arr) {
                    cur.arr.push(val);
                }
            },
            setContentText: function (text: string) {
                if (cur.dobj) {
                    var ownerType = cur.dobj.constructor;
                    this.verify(ownerType);
                    var tcprop = TextContent.Get(ownerType);
                    cur.dobj.SetValue(tcprop, text);
                }
            }
        };
        var last: any;

        var parser = xm.createParser()
            .setNamespaces(Fayde.XMLNS, Fayde.XMLNSX)
            .on({
                resolveType: (uri, name) => {
                    TypeManager.resolveType(uri, name, oresolve);
                    return oresolve;
                },
                resolveObject: (type) => {
                    //TODO: Ignore <ResourceDictionary> inside <.Resources> tag
                    var obj = new (type)();
                    if (obj instanceof FrameworkTemplate)
                        parser.skipBranch();
                    return obj;
                },
                resolvePrimitive: (type, text) => {
                    return nullstone.convertAnyToType(text, type);
                },
                resolveResources: (ownerType, owner) => {
                    var rd = owner.Resources;
                    return rd;
                },
                branchSkip: (root: any, obj: any) => {
                    if (obj instanceof FrameworkTemplate) {
                        last = obj;
                        setTemplateRoot(<FrameworkTemplate>obj, root);
                    }
                },
                object: (obj) => {
                    cur.set(obj);
                    props.start();
                },
                objectEnd: (obj, prev) => {
                    last = obj;
                    props.end();
                    cur.set(prev);
                },
                contentObject: (obj) => {
                    props.setContent(obj);
                    cur.set(obj);
                    props.start();
                },
                contentText: (text) => {
                    props.setContentText(text);
                },
                name: (name) => {
                    if (cur.xo) {
                        var xnode = cur.xo.XamlNode;
                        namescope.RegisterName(name, xnode);
                        xnode.Name = name;
                    }
                },
                key: (key) => {
                    //TODO: Prepare assignment in resources
                },
                propertyStart: (ownerType, propName) => {
                },
                propertyEnd: (ownerType, propName) => {
                    props.setProp(ownerType, propName, last);
                },
                error: (err) => false,
                end: () => {
                }
            });
        parser.parse(xm.root);
        //TODO: Return result
        return last;
    }
}