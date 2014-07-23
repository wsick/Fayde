module Fayde {
    interface IThemeHash {
        [id: string]: Theme;
    }
    var themes: IThemeHash = <any>[];
    export class Theme {
        constructor(uri?: Uri) {
            if (uri)
                this.Uri = uri;
        }

        private _Uri: Uri;
        get Uri(): Uri { return this._Uri; }
        set Uri(value: Uri) {
            if (this._Uri) //readonly once it has been set
                return;
            this._Uri = value;
            themes[value.toString()] = this;
        }
        Resources: ResourceDictionary = null;

        static Get(url: string): Theme {
            return themes[url]
                || new Theme(new Uri(url));
        }
        
        private _IsLoaded = false;
        private _LoadError: any = null;
        private _Deferrables: IDeferrable<Theme>[] = [];
        Resolve(ctx: IDependencyAsyncContext): IAsyncRequest<Theme> {
            this._Load(ctx);

            var d = defer<Theme>();
            if (this._IsLoaded) {
                d.resolve(this);
                return d.request;
            }
            if (this._LoadError) {
                d.reject(this._LoadError);
                return d.request;
            }
            this._Deferrables.push(d);
            return d.request;
        }

        private _Load(ctx: IDependencyAsyncContext) {
            var uri = this.Uri;
            if (!uri)
                return;
            Xaml.XamlDocument.GetAsync(uri.toString(), ctx)
                .success(xd => this._HandleSuccess(xd))
                .error(error => this._HandleError(error));
        }
        private _HandleSuccess(xd: Xaml.XamlDocument) {
            var rd = <ResourceDictionary>Xaml.Load(xd.Document);
            if (!(rd instanceof ResourceDictionary))
                return this._HandleError("Theme root must be a ResourceDictionary.");
            Object.defineProperty(this, "Resources", { value: rd, writable: false });
            this._IsLoaded = true;
            for (var i = 0, ds = this._Deferrables, len = ds.length; i < len; i++) {
                ds[i].resolve(this);
            }
            this._Deferrables = [];
        }
        private _HandleError(error: any) {
            this._LoadError = error;
            this._IsLoaded = true;
            for (var i = 0, ds = this._Deferrables, len = ds.length; i < len; i++) {
                ds[i].reject(error);
            }
            this._Deferrables = [];
        }

        GetImplicitStyle(type: any): Style {
            var rd = this.Resources;
            if (!rd)
                return;
            var style = <Style>rd.Get(type);
            if (style instanceof Style)
                return style;
            return undefined;
        }
    }
    Fayde.RegisterType(Theme, "Fayde", Fayde.XMLNS);
}