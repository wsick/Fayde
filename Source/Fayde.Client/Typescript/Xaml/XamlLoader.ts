/// CODE
/// <reference path="../Runtime/TypeManagement.ts" />

module Fayde.Xaml {
    var parser = new DOMParser();

    interface IOutValue {
        Value: any
    }

    interface IXamlLoadContext {
        Document: Document;
        ResourceChain: ResourceDictionary[];
        NameScope: NameScope;
        ObjectStack: any[];
        TemplateBindingSource: DependencyObject; //TODO: Allow injection
    }

    export function Load(xaml: string): XamlObject {
        var ctx: IXamlLoadContext = {
            Document: parser.parseFromString(xaml, "text/xml"),
            ResourceChain: [],
            NameScope: new NameScope(),
            ObjectStack: [],
            TemplateBindingSource: null
        };
        if (ctx.Document.childNodes.length > 1)
            throw new XamlParseException("There must be 1 root node.");
        if (!ctx.Document.firstChild.isDefaultNamespace(Fayde.XMLNS))
            throw new XamlParseException("Invalid default namespace in XAML document.");
        return <XamlObject>createObject(ctx.Document.firstChild, ctx);
    }



    function createObject(node: Node, ctx: IXamlLoadContext): any {
        var resolution = TypeResolver.Resolve(node.namespaceURI, node.localName);
        if (resolution === undefined)
            throw new XamlParseException("Could not resolve type '" + node.namespaceURI + ":" + node.localName + "'");
        if (resolution.IsPrimitive)
            return createPrimitive(resolution.Type, node, ctx);

        var val = new (<any>resolution.Type)();

        if (val instanceof FrameworkTemplate) {
            (<FrameworkTemplate>val).ResChain = ctx.ResourceChain.slice(0);
        }

        ctx.ObjectStack.push(val);

        var dobj: DependencyObject;

        var attrs = node.attributes;
        if (val instanceof XamlObject) {
            var xobj = <XamlObject>val;
            var xnode = xobj.XamlNode;

            var nameAttr = attrs.getNamedItemNS(Fayde.XMLNSX, "Name");
            if (nameAttr) {
                var name = nameAttr.value;
                ctx.NameScope.RegisterName(name, xnode);
                xnode.Name = name;
            }

            xobj.TemplateOwner = ctx.TemplateBindingSource;

            if (xobj instanceof DependencyObject)
                dobj = <DependencyObject>xobj;
        }

        var childProcessor = createXamlChildProcessor(val, resolution.Type, ctx);

        //Handle attributes
        var len = attrs.length;
        var attr: Attr;
        for (var i = 0; i < len; i++) {
            attr = attrs[i];
            if (attr.name === "xmlns")
                continue;
            if (attr.prefix === "xmlns")
                continue;
            if (attr.namespaceURI === Fayde.XMLNSX)
                continue;
            childProcessor.ProcessAttribute(attr);
        }

        //Handle child nodes
        var children = node.childNodes;
        var child: Node;
        len = children.length;
        for (var i = 0; i < len; i++) {
            child = children[i];
            childProcessor.ProcessNode(child);
        }

        return ctx.ObjectStack.pop();
    }

    function createPrimitive(type: Function, node: Node, ctx: IXamlLoadContext): any {
        if (type === null)
            return null;
        if (type === Number)
            return parseFloat(node.textContent);
        if (type === String)
            return node.textContent;
        if (type === Boolean) {
            var c = node.textContent.toUpperCase();
            return c === "TRUE" ? true : (c === "FALSE" ? false : null);
        }
        if (type === Date)
            return new Date(node.textContent);
        if (type === RegExp)
            return new RegExp(node.textContent);
        if (type === Array) {
            var arr = [];
            ctx.ObjectStack.push(arr);
            var children = node.childNodes;
            var len = children.length;
            for (var i = 0; i < len; i++) {
                arr.push(createObject(children[i], ctx));
            }
            ctx.ObjectStack.pop();
            return arr;
        }
        return undefined;
    }

    function createAttributeObject(propd: DependencyProperty, value: string, ctx: IXamlLoadContext): any {
        var targetType = propd.GetTargetType();
        if (targetType === String)
            return value;
        NotImplemented("createAttributeObject");
    }


    interface IXamlChildProcessor {
        ProcessAttribute(attr: Attr);
        ProcessNode(node: Node);
    }
    function createXamlChildProcessor(owner: any, ownerType: Function, ctx: IXamlLoadContext): IXamlChildProcessor {
        var dobj: DependencyObject;
        var contentPropd: DependencyProperty;
        var contentCollection: XamlObjectCollection<any>;
        if (owner instanceof DependencyObject) {
            dobj = owner;
            contentPropd = TypeResolver.GetAnnotation(ownerType, "ContentProperty");
            if (contentPropd instanceof DependencyProperty) {
                if (contentPropd.IsImmutable) {
                    contentCollection = dobj[contentPropd.Name];
                } else {
                    var targetType = contentPropd.GetTargetType();
                    if (Nullstone.DoesInheritFrom(targetType, XamlObjectCollection)) {
                        contentCollection = <XamlObjectCollection<any>>new (<any>targetType)();
                        dobj.SetValue(contentPropd, contentCollection);
                    }
                }
            }
        }
        
        var hasSetContent = false;
        var propertiesSet = [];
        function ensurePropertyNotSet(propertyName: string) {
            if (propertiesSet.indexOf(propertyName) > -1)
                throw new XamlParseException("Cannot set a property in XAML more than once.");
            propertiesSet.push(propertyName);
        }

        return {
            ProcessAttribute: function (attr: Attr) {
                var tokens = attr.localName.split(".");
                var propd: DependencyProperty;
                var propertyName: string;
                if (tokens.length > 1) { // <Tag [ns:]Type.Property="...">
                    var typeRes = TypeResolver.Resolve(attr.namespaceURI, tokens[0]);
                    propertyName = tokens[1];
                    propd = DependencyProperty.GetDependencyProperty(typeRes.Type, propertyName, true);
                    if (!propd)
                        throw new XamlParseException("Could not find attached property '" + attr.namespaceURI + ":" + attr.localName + "'");
                    if (!dobj)
                        throw new XamlParseException("Cannot set an attached property on an object that is not a DependencyObject.");
                } else { // <[Tag] Property="...">
                    propertyName = attr.localName
                    if (dobj)
                        propd = DependencyProperty.GetDependencyProperty(ownerType, propertyName, true);
                }

                ensurePropertyNotSet(propertyName);

                if (propd) {
                    dobj.SetValue(propd, createAttributeObject(propd, attr.textContent, ctx));
                } else {
                    //TODO: Add checks for read-only, etc.
                    owner[propertyName] = attr.textContent;
                }
            },
            ProcessNode: function (node: Node) {
                var tokens = node.localName.split(".");
                var propd: DependencyProperty;
                var propertyName: string;
                if (tokens.length > 1) { // <[ns:]Type.Property /> (DP or Attached DP)
                    var typeRes = TypeResolver.Resolve(node.namespaceURI, tokens[0]);
                    propertyName = tokens[1];
                    propd = DependencyProperty.GetDependencyProperty(typeRes.Type, propertyName, true);
                    if (!propd)
                        throw new XamlParseException("Could not find property '" + node.namespaceURI + ":" + node.localName + "'");
                    ensurePropertyNotSet(propertyName);
                    if (node.childNodes.length !== 1)
                        throw new XamlParseException("Missing inner value for property.");
                    dobj.SetValue(propd, createObject(node.firstChild, ctx));
                } else { //<[ns:]Type> (Content)
                    if (!contentPropd)
                        throw new XamlParseException("Attempting to set content on an object that does not have a Content Property.");
                    if (contentCollection) {
                        contentCollection.Add(createObject(node, ctx));
                    } else {
                        ensurePropertyNotSet(propertyName);
                        if (hasSetContent)
                            throw new XamlParseException("Content has already been set.");
                        hasSetContent = true;
                        dobj.SetValue(contentPropd, createObject(node, ctx));
                    }
                }
            }
        };
    }
}