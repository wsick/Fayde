module Fayde {
    export class Theme {
        private _IsLoaded = false;
        private _LoadError: any = null;

        private _Uri: Uri = null;
        get Uri(): Uri { return this._Uri; }
        set Uri(value: Uri) {
            this._Uri = value;
            this._Load();
        }
        Resources: ResourceDictionary = null;

        private _ActiveDeferrable: IDeferrable<Theme> = null;
        Resolve(): IAsyncRequest<Theme> {
            var d = defer<Theme>();
            if (this._IsLoaded) {
                if (!this._LoadError)
                    d.resolve(this);
                else
                    d.reject(this._LoadError);
            } else {
                this._ActiveDeferrable = d;
            }
            return d.request;
        }

        private _Load() {
            var uri = this.Uri;
            if (!uri)
                return;
            Xaml.LoadAsync("text!" + uri.toString())
                .success(xobj => this._HandleSuccess(xobj))
                .error(error => this._HandleError(error));
        }
        private _HandleSuccess(xobj: XamlObject) {
            var rd = <ResourceDictionary>xobj;
            if (!(rd instanceof ResourceDictionary))
                return this._HandleError("Theme root must be a ResourceDictionary.");
            Object.defineProperty(this, "Resources", { value: rd, writable: false });
            this._IsLoaded = true;
            if (this._ActiveDeferrable) {
                this._ActiveDeferrable.resolve(this);
                this._ActiveDeferrable = null;
            }
        }
        private _HandleError(error: any) {
            this._LoadError = error;
            this._IsLoaded = true;
            if (this._ActiveDeferrable) {
                this._ActiveDeferrable.reject(error);
                this._ActiveDeferrable = null;
            }
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
    Fayde.RegisterTypeConverter(Theme, (val: any): Theme => {
        if (!val)
            return undefined;
        if (typeof val === "string") {
            var theme = new Theme();
            theme.Uri = new Uri(val);
            return theme;
        }
        return val;
    });
}