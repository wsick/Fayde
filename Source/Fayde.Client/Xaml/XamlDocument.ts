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
        static Resolve(url: string, isApp?: boolean): IAsyncRequest<XamlDocument> {
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

            function tryFinishResolve() {
                if (!jsdone || !xamldone)
                    return;
                xd.Resolve(isApp)
                    .success(o => d.resolve(regXds[xamlUrl] = xd))
                    .error(d.reject);
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
                    tryFinishResolve();
                },
                (err: RequireError) => {
                    jsdone = true;
                    tryFinishResolve();
                });

            return d.request;
        }
        Resolve(isApp?: boolean): IAsyncRequest<any> {
            var d = defer<any>();
            if (isApp) addThemeDependency(this.Document.documentElement, this._RequiredDependencies);
            addDependencies(this.Document.documentElement, this._RequiredDependencies);
            if (this._RequiredDependencies.length > 0) {
                resolveRecursive(this._RequiredDependencies)
                    .success(xds => d.resolve(this))
                    .error(errors => d.reject(errors));
            } else {
                d.resolve(this);
            }
            return d.request;
        }
    }

    function resolveRecursive(deps: string[]): IAsyncRequest<XamlDocument[]> {
        var d = defer<XamlDocument[]>();

        var xds: XamlDocument[] = [];
        var errors: any[] = [];
        for (var i = 0, len = deps.length; i < len; i++) {
            Xaml.XamlDocument.Resolve(deps[i])
                .success(xd => {
                    tryFinish(xd);
                })
                .error(error => {
                    errors.push(error);
                    tryFinish(null);
                });
        }

        function tryFinish(xd: XamlDocument) {
            xds.push(xd);
            if (xds.length === deps.length) {
                if (errors.length > 0)
                    return d.reject(errors);
                d.resolve(xds);
            }
        }

        return d.request;
    }

    //TODO: We need to collect ResourceDictionary.Source
    function addThemeDependency(el: Element, list: string[]) {
        var theme = el.getAttribute("Theme");
        if (theme)
            list.push("text!" + theme);
    }
    function addDependencies(el: Element, list: string[]) {
        while (el) {
            addDependency(el, list);
            getAttributeDependencies(el, list);
            addDependencies(el.firstElementChild, list);
            el = el.nextElementSibling;
        }
    }
    function getAttributeDependencies(el: Element, list: string[]) {
        var attrs = el.attributes;
        for (var i = 0, len = attrs.length; i < len; i++) {
            addDependency(attrs[i], list);
        }
    }
    function addDependency(node: Node, list: string[]) {
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