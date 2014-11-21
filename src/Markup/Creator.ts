module Fayde.Markup {
    import XamlMarkup = nullstone.markup.xaml.XamlMarkup;
    var lastId = 0;

    export function CreateXaml (xaml: string): XamlMarkup {
        lastId++;
        var xm = new XamlMarkup("http://gen/" + lastId.toString());
        xm.setRoot(xm.loadRoot(xaml));
        return xm;
    }
}