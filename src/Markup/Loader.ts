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
        var cur: any;
        var xo: XamlObject;
        var rd: ResourceDictionary;
        var last: any;

        var parser = xm.createParser()
            .setNamespaces(Fayde.XMLNS, Fayde.XMLNSX)
            .on({
                resolveType: (uri, name) => {
                    TypeManager.resolveType(uri, name, oresolve);
                    return oresolve;
                },
                resolveObject: (type) => {
                    if (type === ResourceDictionary && cur === rd)
                        return rd;
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
                    if (obj instanceof FrameworkTemplate)
                        setTemplateRoot(<FrameworkTemplate>obj, root);
                },
                object: (obj) => {
                    cur = obj;
                    if (cur instanceof XamlObject) {
                        xo = <XamlObject>cur;
                        xo.XamlNode.DocNameScope = namescope;
                    } else if (cur instanceof ResourceDictionary) {
                        rd = <ResourceDictionary>cur;
                    }
                },
                objectEnd: (obj, prev) => {
                    last = obj;
                    cur = prev;
                    if (cur instanceof XamlObject)
                        xo = <XamlObject>cur;
                    else if (cur instanceof ResourceDictionary)
                        rd = <ResourceDictionary>cur;
                },
                contentObject: (obj) => {
                    cur = obj;
                    if (cur instanceof XamlObject) {
                        xo = <XamlObject>cur;
                        xo.XamlNode.DocNameScope = namescope;
                        xo.TemplateOwner = bindingSource;
                    }
                    //TODO: Validate duplicate content
                },
                contentText: (text) => {
                    //TODO: Validate duplicate content
                },
                name: (name) => {
                    if (xo) {
                        namescope.RegisterName(name, xo.XamlNode);
                        xo.XamlNode.Name = name;
                    }
                },
                key: (key) => {
                    //TODO: Prepare assignment in resources
                },
                propertyStart: (ownerType, propName) => {
                },
                propertyEnd: (ownerType, propName) => {
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