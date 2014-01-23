/// <reference path="../require.d.ts" />

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
            if (xaml)
                return null;
            return regXds[url] = new XamlDocument(xaml);
        }
        static Resolve(url: string): IAsyncRequest<XamlDocument> {
            var d = defer<XamlDocument>();

            var xamlUrl = "text!" + url;

            var xd = regXds[xamlUrl];
            if (xd) {
                d.resolve(xd);
                return d.request;
            }

            (<Function>require)([xamlUrl],
                (xaml: string) => {
                    xd = new XamlDocument(xaml);
                    xd.Resolve()
                        .success(o => d.resolve(regXds[xamlUrl] = xd))
                        .error(d.reject);
                }, d.reject);
            

            return d.request;
        }
        Resolve(): IAsyncRequest<any> {
            var d = defer<any>();
            var deps = this._RequiredDependencies;
            addDependencies(this.Document.documentElement, deps);
            if (deps.length > 0) {
                deferArray(deps, resolveDependency)
                    .success(ds => d.resolve(this))
                    .error(d.reject);
            } else {
                d.resolve(this);
            }
            return d.request;
        }
    }

    function resolveDependency(dep: string): IAsyncRequest<any> {
        if (dep.indexOf("library:") === 0)
            return Library.Resolve(dep);
        
        var d = defer<any>();
        (<Function>require)(dep, d.resolve, d.reject);
        return d.request;
    }
    
    function addDependencies(el: Element, list: string[]) {
        while (el) {
            getDependency(el, list);
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
            getDependency(attrs[i], list);
        }
    }
    function getDependency(node: Node, list: string[]) {
        var nsUri = node.namespaceURI;
        if (!nsUri || nsUri === W3URI ||  nsUri === Fayde.XMLNS || nsUri === Fayde.XMLNSX)
            return;
        var ln = node.localName;
        var index = ln.indexOf(".");
        if (index > -1)
            ln = ln.substr(0, index);
        var format = nsUri + "/" + ln;
        if (list.indexOf(format) > -1)
            return;
        if (nsUri.indexOf("library:") === 0)
            list.push(nsUri);
        else
            list.push(format);
    }
}