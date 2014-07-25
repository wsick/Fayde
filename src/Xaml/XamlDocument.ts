
module Fayde.Xaml {
    var W3URI = "http://www.w3.org/2000/xmlns/";
    var parser = new DOMParser();

    var regXds: XamlDocument[] = [];

    export class XamlDocument {
        private _RequiredDependencies: string[] = [];
        Document: Document;
        constructor(xaml: string) {
            this.Document = parser.parseFromString(xaml, "text/xml");
        }

        static Get(url: Uri): XamlDocument;
        static Get(url: string): XamlDocument;
        static Get(url: any): XamlDocument {
            if (url instanceof Uri)
                url = (<Uri>url).toString();
            url = "text!" + url;
            var xd = regXds[url];
            if (xd) return xd;
            var xaml = require(url);
            if (!xaml)
                return null;
            return regXds[url] = new XamlDocument(xaml);
        }

        static GetAsync(url: string, ctx?: IDependencyAsyncContext): IAsyncRequest<XamlDocument>;
        static GetAsync(url: Uri, ctx?: IDependencyAsyncContext): IAsyncRequest<XamlDocument>;
        static GetAsync(url: any, ctx?: IDependencyAsyncContext): IAsyncRequest<XamlDocument> {
            if (url instanceof Uri)
                url = (<Uri>url).toString();
            var xamlUrl = "text!" + url;

            var d = defer<XamlDocument>();

            var xd = regXds[xamlUrl];
            if (xd) {
                d.resolve(xd);
                return d.request;
            }

            ctx = ctx || createContext();
            (<Function>require)([xamlUrl],
                (xaml: string) => {
                    xd = new XamlDocument(xaml);
                    xd.Resolve(ctx)
                        .success(o => d.resolve(regXds[xamlUrl] = xd))
                        .error(d.reject);
                }, d.reject);


            return d.request;
        }
        Resolve(ctx: IDependencyAsyncContext): IAsyncRequest<any> {
            var d = defer<any>();
            var deps = this._RequiredDependencies;
            addDependencies(this.Document.documentElement, deps);
            ignoreCircularReferences(deps, ctx);
            if (deps.length > 0) {
                discoverAppTheme(this.Document.documentElement, ctx);
                deferArray(deps, dep => resolveDependency(dep, ctx))
                    .success(ds => d.resolve(this))
                    .error(d.reject);
            } else {
                d.resolve(this);
            }
            return d.request;
        }
    }

    function resolveDependency(dep: string, ctx: IDependencyAsyncContext): IAsyncRequest<any> {
        var d = defer<any>();

        if (dep.indexOf("lib:") === 0) {
            var library = Library.Get(dep);
            if (!library) {
                d.reject("Could not resolve library: '" + dep + "'.");
                return d.request;
            }
            return library.Resolve(ctx);
        }

        (<Function>require)([dep], d.resolve, d.reject);
        return d.request;
    }
    function ignoreCircularReferences(list: string[], ctx: IDependencyAsyncContext) {
        if (!ctx)
            return;
        var index: number;
        for (var i = 0; i < list.length; i++) {
            var lib = Library.Get(list[i]);
            if (lib && (index = ctx.Resolving.indexOf(lib)) > -1) {
                list.splice(i, 1);
                i--;
            }
        }
    }

    function addDependencies(el: Element, list: string[]) {
        while (el) {
            getNodeDependency(el, list);
            getAttributeDependencies(el, list);
            getResourceDictionaryDependency(el, list);
            addDependencies(el.firstElementChild, list);
            el = el.nextElementSibling;
        }
    }
    function getResourceDictionaryDependency(el: Element, list: string[]) {
        if (el.localName !== "ResourceDictionary")
            return;
        if (el.namespaceURI !== Fayde.XMLNS)
            return;
        var srcAttr = el.getAttribute("Source");
        if (!srcAttr)
            return;
        list.push("text!" + srcAttr);
    }
    function getAttributeDependencies(el: Element, list: string[]) {
        var attrs = el.attributes;
        for (var i = 0, len = attrs.length; i < len; i++) {
            var attr = attrs[i];
            getNodeDependency(attr, list);
            getNodeValueDependency(attr, list);
            getNodeValueImplicitDependency(el, attr, list);
        }
    }
    function getNodeDependency(node: Node, list: string[]) {
        var nsUri = node.namespaceURI;
        if (!nsUri || nsUri === W3URI || nsUri === Fayde.XMLNS || nsUri === Fayde.XMLNSX)
            return;
        var ln = node.localName;
        var index = ln.indexOf(".");
        if (index > -1)
            ln = ln.substr(0, index);
        var format = nsUri + "/" + ln;
        if (nsUri.indexOf("lib:") === 0) {
            if (list.indexOf(nsUri) > -1)
                return;
            list.push(nsUri);
        } else {
            if (list.indexOf(format) > -1)
                return;
            list.push(format);
        }
    }
    function getNodeValueDependency(attr: Attr, list: string[]) {
        var val = attr.value;
        var components = MarkupExpressionParser.GetComponents(val);
        if (components && components[0] === "x:Type") {
            addFullyQualifiedType(attr, components[1], list);
        }
    }
    //DataTemplate.DataType
    //ControlTemplate.TargetType
    //Style.TargetType
    function getNodeValueImplicitDependency(ownerEl: Element, attr: Attr, list: string[]) {
        var val = attr.value;
        if (val[0] === "{")
            return;
        if (ownerEl.namespaceURI !== Fayde.XMLNS && ownerEl.namespaceURI !== null)
            return;
        switch (ownerEl.localName) {
            case "DataTemplate":
                if (attr.localName !== "DataType")
                    return;
                break;
            case "ControlTemplate":
                if (attr.localName !== "TargetType")
                    return;
                break;
            case "Style":
                if (attr.localName !== "TargetType")
                    return;
                break;
            default:
                return;
        }
        addFullyQualifiedType(attr, val, list);
    }
    function addFullyQualifiedType(attr: Attr, type: string, list: string[]) {
        var index = type.indexOf(":");
        if (index > -1) {
            var prefix = type.substr(0, index);
            var name = type.substr(index + 1);
            var nsUri = attr.lookupNamespaceURI(prefix);
            if (!nsUri)
                return;
            if (nsUri.indexOf("lib:") === 0) {
                if (list.indexOf(nsUri) > -1)
                    return;
                list.push(nsUri);
            } else {
                var format = nsUri + "/" + name;
                if (list.indexOf(format) > -1)
                    return;
                list.push(format);
            }
        }
    }
    function discoverAppTheme(el: Element, ctx: IDependencyAsyncContext) {
        if (el.localName === "Application") {
            if (!el.namespaceURI || el.namespaceURI === Fayde.XMLNS) {
                var tnattr = el.attributes.getNamedItem("ThemeName");
                if (tnattr)
                    ctx.ThemeName = tnattr.value;
            }
        }
    }

    function createContext(): IDependencyAsyncContext {
        var app = Application.Current;
        return {
            ThemeName: app ? app.ThemeName : "Default",
            Resolving: []
        };
    }
}