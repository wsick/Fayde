var Fayde;
(function (Fayde) {
    /// CODE
    /// <reference path="TypeResolver.ts" />
    (function (Xaml) {
        var parser = new DOMParser();

        function Load(xaml) {
            var ctx = {
                Document: parser.parseFromString(xaml, "text/xml"),
                ResourceChain: [],
                NameScope: new Fayde.NameScope(),
                ObjectStack: [],
                TemplateBindingSource: null
            };
            if (ctx.Document.childNodes.length > 1)
                throw new XamlParseException("There must be 1 root node.");
            return createObject(ctx.Document.firstChild, ctx);
        }
        Xaml.Load = Load;

        function createObject(node, ctx) {
            var resolution = Xaml.TypeResolver.Resolve(node.namespaceURI, node.localName);
            if (resolution === undefined)
                throw new XamlParseException("Could not resolve type '" + node.namespaceURI + ":" + node.localName + "'");
            if (resolution.IsPrimitive)
                return createPrimitive(resolution.Type, node, ctx);

            var val = new (resolution.Type)();

            if (val instanceof Fayde.FrameworkTemplate) {
                (val).ResChain = ctx.ResourceChain.slice(0);
            }

            ctx.ObjectStack.push(val);

            var dobj;

            var attrs = node.attributes;
            if (val instanceof Fayde.XamlObject) {
                var xobj = val;
                var xnode = xobj.XamlNode;

                var nameAttr = attrs.getNamedItemNS(Fayde.XMLNSX, "Name");
                if (nameAttr) {
                    var name = nameAttr.value;
                    ctx.NameScope.RegisterName(name, xnode);
                    xnode.Name = name;
                }

                xobj.TemplateOwner = ctx.TemplateBindingSource;

                if (xobj instanceof Fayde.DependencyObject)
                    dobj = xobj;
            }

            //Handle attributes
            var len = attrs.length;
            var attr;
            for (var i = 0; i < len; i++) {
                attr = attrs[i];
                if (attr.namespaceURI === Fayde.XMLNSX)
                    continue;
            }

            var children = node.childNodes;
            len = children.length;
            for (var i = 0; i < len; i++) {
                //1. Content Element - <StackPanel><Border /></StackPanel>
                //2. Property - <Border><Border.Background /></Border>
            }

            ctx.ObjectStack.pop();
        }

        function createPrimitive(type, node, ctx) {
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
    })(Fayde.Xaml || (Fayde.Xaml = {}));
    var Xaml = Fayde.Xaml;
})(Fayde || (Fayde = {}));
//# sourceMappingURL=XamlLoader.js.map
