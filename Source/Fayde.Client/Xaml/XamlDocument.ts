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
            if (url.substr(0, 5) === "text!")
                xamlUrl = url;

            var xd = regXds[xamlUrl];
            if (xd) {
                d.resolve(xd);
                return d.request;
            }

            var xamldone = false;
            var jsdone = xamlUrl === url;
            var js: any = null;

            function tryFinishResolve() {
                if (!jsdone || !xamldone)
                    return;
                if (!xd && !js) {
                    d.reject("No module found at '" + url + "'.");
                } else if (!js) {
                    xd.Resolve()
                        .success(o => d.resolve(regXds[xamlUrl] = xd))
                        .error(d.reject);
                } else {
                    d.resolve(null);
                }
            }
            (<Function>require)([xamlUrl],
                (xaml: string) => {
                    xamldone = true;
                    xd = new XamlDocument(xaml);
                    tryFinishResolve();
                },
                (err: RequireError) => {
                    xamldone = true;
                    tryFinishResolve();
                });
            
            if (jsdone)
                return d.request;
            (<Function>require)([url],
                (jsmodule: any) => {
                    jsdone = true;
                    js = jsmodule;
                    tryFinishResolve();
                },
                (err: RequireError) => {
                    jsdone = true;
                    tryFinishResolve();
                });

            return d.request;
        }
        Resolve(): IAsyncRequest<any> {
            var d = defer<any>();
            addDependencies(this.Document.documentElement, this._RequiredDependencies);
            if (this._RequiredDependencies.length > 0) {
                deferArray(this._RequiredDependencies, Xaml.XamlDocument.Resolve)
                    .success(xds => d.resolve(this))
                    .error(errors => d.reject(errors));
            } else {
                d.resolve(this);
            }
            return d.request;
        }
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
        list.push(format);
    }
}