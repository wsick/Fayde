module Fayde.Markup {
    import XamlMarkup = nullstone.markup.xaml.XamlMarkup;

    export function Retrieve(uri: string): Promise<XamlMarkup>;
    export function Retrieve(uri: Uri): Promise<XamlMarkup>;
    export function Retrieve(uri: any): Promise<XamlMarkup> {
        var xm = XamlMarkup.create(uri);
        if (xm.isLoaded)
            return Promise.resolve(xm);
        return xm.loadAsync();
    }
}
