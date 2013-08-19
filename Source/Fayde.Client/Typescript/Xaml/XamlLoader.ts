/// CODE
/// <reference path="../Runtime/TypeManagement.ts" />
/// <reference path="MarkupExpressionParser.ts" />

module Fayde.Xaml {
    var parser = new DOMParser();

    export class FrameworkTemplate {
        ResourceChain: ResourceDictionary[] = [];
        constructor() {
        }
        Load(xaml: string, bindingSource: DependencyObject): XamlObject {
            var ctx: IXamlLoadContext = {
                Document: parser.parseFromString(xaml, "text/xml"),
                ResourceChain: this.ResourceChain,
                NameScope: new NameScope(true),
                ObjectStack: [],
                TemplateBindingSource: bindingSource,
            };
            validateDocument(ctx.Document);
            var xobj = <XamlObject>createObject(ctx.Document.firstChild, ctx);
            xobj.XamlNode.NameScope = ctx.NameScope;
            return xobj;
        }
    }

    export class Theme {
        Name: string;
        private _ResourceDictionary: ResourceDictionary;
        constructor(name: string) {
            this.Name = name;
        }

        get ResourceDictionary(): ResourceDictionary {
            if (!this._ResourceDictionary) {
                this._ResourceDictionary = new ResourceDictionary();
                //JsonParser.ParseResourceDictionary(this._ResourceDictionary, this.Json);
            }
            return this._ResourceDictionary;

        }
    }

    interface IOutValue {
        Value: any
    }

    interface IXamlLoadContext {
        Document: Document;
        ResourceChain: ResourceDictionary[];
        NameScope: NameScope;
        ObjectStack: any[];
        TemplateBindingSource: DependencyObject;
    }
    export function Load(xaml: string): XamlObject {
        var ctx: IXamlLoadContext = {
            Document: parser.parseFromString(xaml, "text/xml"),
            ResourceChain: [],
            NameScope: new NameScope(true),
            ObjectStack: [],
            TemplateBindingSource: null,
        };
        validateDocument(ctx.Document);
        return <XamlObject>createObject(ctx.Document.firstChild, ctx);
    }
    export function LoadApplication(xaml: string, canvas: HTMLCanvasElement, onLoaded: (app: Application) => void) {
        ResolveXamlDependencies(xaml, (doc: Document) => {
            var ctx: IXamlLoadContext = {
                Document: doc,
                ResourceChain: [],
                NameScope: null,
                ObjectStack: [],
                TemplateBindingSource: null,
            };
            validateDocument(ctx.Document);

            var node = ctx.Document.firstChild;
            var resolution = TypeResolver.Resolve(node.namespaceURI, node.localName);
            if (resolution === undefined)
                throw new XamlParseException("Could not resolve type '" + node.namespaceURI + ":" + node.localName + "'");

            var app = new (<any>resolution.Type)();
            if (!(app instanceof Application))
                throw new XamlParseException("Root Element must be an Application.");

            app.MainSurface.Register(canvas);

            ctx.NameScope = app.XamlNode.NameScope;
            ctx.ObjectStack.push(app);
            var childProcessor = createXamlChildProcessor(app, resolution.Type, ctx);
            childProcessor.Process(node);
            onLoaded(ctx.ObjectStack.pop());
        });
    }
    function createObject(node: Node, ctx: IXamlLoadContext): any {
        var resolution = TypeResolver.Resolve(node.namespaceURI, node.localName);
        if (resolution === undefined)
            throw new XamlParseException("Could not resolve type '" + node.namespaceURI + ":" + node.localName + "'");
        if (resolution.IsPrimitive)
            return createPrimitive(resolution.Type, node, ctx);
        if (resolution.IsSystem)
            return Fayde.ConvertAnyToType(node.textContent, resolution.Type);

        var val = new (<any>resolution.Type)();
        ctx.ObjectStack.push(val);

        if (val instanceof FrameworkTemplate)
            (<FrameworkTemplate>val).ResourceChain = ctx.ResourceChain.slice(0);
        if (val instanceof XamlObject) {
            var xobj = <XamlObject>val;
            var xnode = xobj.XamlNode;

            var nameAttr = node.attributes.getNamedItemNS(Fayde.XMLNSX, "Name");
            if (nameAttr) {
                var name = nameAttr.value;
                ctx.NameScope.RegisterName(name, xnode);
                xnode.Name = name;
            }
            xobj.TemplateOwner = ctx.TemplateBindingSource;
        }

        var childProcessor = createXamlChildProcessor(val, resolution.Type, ctx);
        childProcessor.Process(node);

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

    interface IXamlChildProcessor {
        Process(node: Node);
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
                    var contentTargetType = contentPropd.GetTargetType();
                    if (Nullstone.DoesInheritFrom(contentTargetType, XamlObjectCollection)) {
                        contentCollection = <XamlObjectCollection<any>>new (<any>contentTargetType)();
                        dobj.SetValue(contentPropd, contentCollection);
                    }
                }
            }
        }

        function createObjectInResources(node: Node, rd: ResourceDictionary) {
            var cur = createObject(node, ctx);
            var key = getNodeKey(node);
            if (key) {
                rd.Set(key, cur);
            } else {
                if (!(cur instanceof Style))
                    throw new XamlParseException("An object in a ResourceDictionary must have x:Key.");
                var targetType = cur.TargetType;
                if (!targetType)
                    throw new XamlParseException("A Style in a ResourceDictionary must have x:Key or TargetType.");
                rd.Set(targetType, cur);
            }
        }
        function getNodeKey(node: Node): string {
            var attrs = node.attributes;
            var keyn = attrs.getNamedItemNS(Fayde.XMLNSX, "Key");
            if (keyn)
                return keyn.value;
            var keyn = attrs.getNamedItemNS(Fayde.XMLNSX, "Name");
            if (keyn)
                return keyn.value;
            return "";
        }
        function createAttributeObject(attr: Attr, dobj: DependencyObject, propd: DependencyProperty): any {
            var value = attr.textContent;
            if (value[0] === "{") {
                var parseCtx: IMarkupParseContext = {
                    Owner: dobj,
                    Property: propd,
                    Resolver: attr,
                    ResourceChain: ctx.ResourceChain,
                    TemplateBindingSource: ctx.TemplateBindingSource
                };
                var result = MarkupExpressionParser.Parse(value, parseCtx);
                if (result !== undefined)
                    return result;
            }

            if (propd === Fayde.Style.TargetTypeProperty) {
                var resolution = TypeResolver.ResolveFullyQualifiedName(value, attr);
                if (resolution === undefined)
                    throw new XamlParseException("Could not resolve type '" + value + "'");
                return resolution.Type;
            } else if (propd === Fayde.Setter.PropertyProperty) {
                var ownerStyle = findOwnerStyle();
                return resolveDependencyProperty(value, ownerStyle.TargetType, attr);
            }
            var targetType = <Function>propd.GetTargetType();
            if (targetType === String)
                return value;
            return Fayde.ConvertAnyToType(value, targetType);
        }
        function findOwnerStyle(): Style {
            var s = ctx.ObjectStack;
            var len = s.length;
            var cur: any;
            for (var i = len - 1; i >= 0; i--) {
                cur = s[i];
                if (cur instanceof Style)
                    return cur;
            }
            return undefined;
        }
        function resolveDependencyProperty(val: string, targetType: Function, resolver: INamespacePrefixResolver): DependencyProperty {
            var tokens = val.split(".");
            if (tokens.length === 1)
                return DependencyProperty.GetDependencyProperty(targetType, val);
            var resolution = TypeResolver.ResolveFullyQualifiedName(tokens[0], resolver);
            if (resolution === undefined)
                throw new XamlParseException("Could not resolve DependencyProperty type '" + val + "'");
            return DependencyProperty.GetDependencyProperty(resolution.Type, tokens[1]);
        }
        function getResourcesChildNode(node: Node): Node {
            if (!dobj)
                return undefined;
            
            var uri = node.namespaceURI;
            var expectedname = node.localName + ".Resources";

            var child = node.firstChild;
            while (child) {
                if (child.namespaceURI === uri && child.localName === expectedname)
                    return child;
                child = child.nextSibling;
            }
            return undefined;
        }

        var hasSetContent = false;
        var propertiesSet = [];
        function ensurePropertyNotSet(propertyName: string) {
            if (propertiesSet.indexOf(propertyName) > -1)
                throw new XamlParseException("Cannot set a property in XAML more than once.");
            propertiesSet.push(propertyName);
        }

        return {
            Process: function (node: Node) {
                //Handle Resources first
                var resNode = getResourcesChildNode(node);
                var rd: ResourceDictionary;
                if (resNode) {
                    rd = <ResourceDictionary>(<any>dobj).Resources;
                    if (rd) {
                        this.ProcessPropertyCollection(resNode, rd);
                        ctx.ResourceChain.push(rd);
                    }
                }

                var attrs = node.attributes;
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
                    this.ProcessAttribute(attr);
                }

                //Handle child nodes
                var child = node.firstChild;
                while (child) {
                    if (child !== resNode) //Skip Resources node
                        this.ProcessNode(child);
                    child = child.nextSibling;
                }

                if (rd)
                    ctx.ResourceChain.pop();
            },
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
                    dobj.SetValue(propd, createAttributeObject(attr, dobj, propd));
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
                    if (propd.IsImmutable) {
                        var val = dobj.GetValue(propd);
                        if (!(val instanceof XamlObjectCollection))
                            throw new XamlParseException("Cannot set immutable property.");
                        this.ProcessPropertyCollection(node, <XamlObjectCollection>val);
                    } else {
                        dobj.SetValue(propd, createObject(node.firstChild, ctx));
                    }
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
            },
            ProcessPropertyCollection: function (propertyNode: Node, coll: XamlObjectCollection<any>) {
                ctx.ObjectStack.push(coll);
                var children = propertyNode.childNodes;
                var len = children.length;
                if (coll instanceof ResourceDictionary) {
                    var rd = <ResourceDictionary>coll;
                    for (var i = 0; i < len; i++) {
                        createObjectInResources(children[i], rd);
                    }
                } else {
                    for (var i = 0; i < len; i++) {
                        coll.Add(createObject(children[i], ctx));
                    }
                }
                ctx.ObjectStack.pop();
            }
        };
    }

    /// VALIDATION
    function validateDocument(doc: Document) {
        if (doc.childNodes.length > 1)
            throw new XamlParseException("There must be 1 root node.");
        if (!doc.firstChild.isDefaultNamespace(Fayde.XMLNS))
            throw new XamlParseException("Invalid default namespace in XAML document.");
    }

    /// DEPENDENCIES
    export function ResolveXamlDependencies(xaml: string, onComplete: (doc: Document) => void) {
        var doc = parser.parseFromString(xaml, "text/xml");
        validateDocument(doc);
        var deps = collectDependencies(doc.firstChild);
        //TODO: Finish
        onComplete(doc);
    }
    interface IXamlDependency {
        NamespaceUri: string;
        Name: string;
    }
    function collectDependencies(curNode: Node): IXamlDependency[] {
        var deps: IXamlDependency[] = [];

        var next: Node;
        var attrs: NamedNodeMap;
        while (curNode) {
            if (curNode.namespaceURI !== Fayde.XMLNS || curNode.namespaceURI !== Fayde.XMLNSX)
                deps.push({ NamespaceUri: curNode.namespaceURI, Name: curNode.localName });

            attrs = curNode.attributes;
            //TODO: Finish finding needed dependencies in attributes

            next = curNode.nextSibling;
            if (!next) next = curNode.parentNode.nextSibling;
            curNode = next;
        }

        return deps;
    }
}