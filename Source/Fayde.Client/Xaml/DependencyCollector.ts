module Fayde.Xaml {
    export function CollectDependencies(doc: Document): string[]{
        var list: string[] = [];
        addDependencies(doc.documentElement, list);
        return list;
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

    var W3URI = "http://www.w3.org/2000/xmlns/";
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