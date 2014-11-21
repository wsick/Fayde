module Fayde.Markup {
    import XamlMarkup = nullstone.markup.xaml.XamlMarkup;

    export function Resolve (uri: string);
    export function Resolve (uri: Uri);
    export function Resolve (uri: any): nullstone.async.IAsyncRequest<XamlMarkup> {
        return nullstone.async.create((resolve, reject) => {
            XamlMarkup.create(uri)
                .loadAsync()
                .then(xm => {
                    return xm.resolve(Fayde.TypeManager)
                        .then(() => resolve(xm), reject);
                }, reject);
        });
    }
}