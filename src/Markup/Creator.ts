module Fayde.Markup {
    import XamlMarkup = nullstone.markup.xaml.XamlMarkup;
    var lastId = 0;

    export function CreateXaml (xaml: string): XamlMarkup;
    export function CreateXaml (el: Element): XamlMarkup;
    export function CreateXaml (obj: any): XamlMarkup {
        lastId++;
        var xm = new XamlMarkup("http://gen/" + lastId.toString());
        var root = (typeof obj === "string")
            ? xm.loadRoot(obj)
            : obj;
        xm.setRoot(root);
        return xm;
    }
}