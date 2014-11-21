module Fayde {
    interface IThemeHash {
        [id: string]: Theme;
    }
    var themes: IThemeHash = <any>[];
    export class Theme {
        constructor (uri?: Uri) {
            if (uri)
                this.Uri = uri;
        }

        private _Uri: Uri;
        get Uri (): Uri {
            return this._Uri;
        }

        set Uri (value: Uri) {
            if (this._Uri) //readonly once it has been set
                return;
            this._Uri = value;
            themes[value.toString()] = this;
        }

        Resources: ResourceDictionary = null;

        static Get (url: string): Theme {
            return themes[url]
                || new Theme(new Uri(url));
        }

        Resolve (): nullstone.async.IAsyncRequest<Theme> {
            var uri = this.Uri;
            if (!uri)
                return nullstone.async.resolve({});
            var theme = this;
            return nullstone.async.create((resolve, reject) => {
                Markup.Resolve(uri)
                    .then(md => {
                        var rd = Markup.Load<ResourceDictionary>(null, md);
                        if (!(rd instanceof ResourceDictionary))
                            reject(new Error("Theme root must be a ResourceDictionary."));
                        Object.defineProperty(this, "Resources", {value: rd, writable: false});
                        resolve(theme);
                    }, reject);
            });
        }

        GetImplicitStyle (type: any): Style {
            var rd = this.Resources;
            if (!rd)
                return undefined;
            var style = <Style>rd.Get(type);
            if (style instanceof Style)
                return style;
            return undefined;
        }
    }
    Fayde.RegisterType(Theme, "Fayde", Fayde.XMLNS);
}