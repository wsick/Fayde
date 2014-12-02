module Fayde.Markup {
    export class StaticResource implements nullstone.markup.IMarkupExtension {
        ResourceKey: string;

        private $$resources: ResourceDictionary[];

        init (val: string) {
            this.ResourceKey = val;
        }

        transmute (os: any[]): any {
            var res = this.$$resources;
            this.$$resources = undefined;

            var key = this.ResourceKey;
            var rd: ResourceDictionary;
            for (var i = os.length - 1; i >= 0; i--) {
                var cur = os[i];
                if (cur instanceof FrameworkElement) {
                    rd = (<FrameworkElement>cur).ReadLocalValue(FrameworkElement.ResourcesProperty);
                } else if (cur instanceof Application) {
                    rd = (<Application>cur).Resources;
                } else if (cur instanceof ResourceDictionary) {
                    rd = cur;
                }
                var o = rd ? rd.Get(key) : undefined;
                if (o !== undefined)
                    return o;
            }

            for (var i = res ? (res.length - 1) : -1; i >= 0; i--) {
                var o = res[i].Get(key);
                if (o !== undefined)
                    return o;
            }

            //TODO: Search in Application.Resources

            throw new Error("Could not resolve StaticResource: '" + key + "'.")
        }

        setResources (resources: ResourceDictionary[]) {
            this.$$resources = resources;
        }
    }
    Fayde.CoreLibrary.add(StaticResource);
}