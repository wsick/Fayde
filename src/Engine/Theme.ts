module Fayde {
    export class Theme {
        Name: string;
        LibraryUri: Uri;
        Resources: ResourceDictionary = null;

        private $$loaded = false;

        static WarnMissing = false;

        constructor(name: string, libUri: Uri) {
            this.Name = name;
            this.LibraryUri = libUri;
        }

        LoadAsync(): Promise<Theme> {
            var reqUri = ThemeConfig.GetRequestUri(this.LibraryUri, this.Name);
            if (!reqUri || this.$$loaded)
                return Promise.resolve(this);
            return new Promise((resolve, reject) => {
                return Markup.Resolve(reqUri, this.LibraryUri)
                    .then(md => {
                        this.$$loaded = true;
                        var rd = Markup.Load<ResourceDictionary>(null, md);
                        if (!(rd instanceof ResourceDictionary))
                            throw new Error("Theme root must be a ResourceDictionary.");
                        Object.defineProperty(this, "Resources", {value: rd, writable: false});
                        resolve(md);
                    }, () => {
                        if (Theme.WarnMissing)
                            console.warn("Failed to load Theme. [" + this.LibraryUri + "][" + this.Name + "]");
                        resolve(null);
                    });
            }).then(md => this);
        }

        GetImplicitStyle(type: any): Style {
            var rd = this.Resources;
            if (!rd)
                return undefined;
            var style = <Style>rd.Get(type);
            if (style instanceof Style)
                return style;
            return undefined;
        }
    }
    Fayde.CoreLibrary.add(Theme);
}