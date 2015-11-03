module Fayde.Markup {
    import XamlMarkup = nullstone.markup.xaml.XamlMarkup;

    export function Resolve(uri: string|Uri): Promise<XamlMarkup>;
    export function Resolve(uri: string|Uri, excludeUri: string|Uri): Promise<XamlMarkup>;
    export function Resolve(uri: any, excludeUri?: string|Uri): Promise<XamlMarkup> {
        return Retrieve(uri)
            .tap(xm => {
                var co = collector.create(excludeUri);
                return Promise.all([
                    xm.resolve(Fayde.TypeManager, co.collect, co.exclude),
                    co.resolve()
                ]);
            });
    }

    module collector {
        export interface ICollector {
            collect(ownerUri: string, ownerName: string, propName: string, val: any);
            exclude(uri: string, name: string): boolean;
            resolve(): Promise<any>;
        }

        export function create(excludeUri?: Uri|string): ICollector {
            var rduris: string[] = [];
            var coll = {
                collect(ownerUri: string, ownerName: string, propName: string, val: any) {
                    if (ownerUri === Fayde.XMLNS && ownerName === "ResourceDictionary" && propName === "Source")
                        rduris.push(val);
                },
                exclude(uri: string, name: string): boolean {
                    return false;
                },
                resolve(): Promise<any> {
                    return Promise.all(rduris.map(Resolve));
                }
            };
            if (!!excludeUri)
                coll.exclude = (uri, name) => excludeUri.toString() === uri;
            return coll;
        }
    }
}