module Fayde {
    export interface IDependencyAsyncContext {
        ThemeName: string;
        Resolving: Library[];
    }

    export class Library {
        private _Module: any = undefined;
        get Module(): any { return this._Module; }
        private _CurrentTheme: Theme = undefined;
        get CurrentTheme(): Theme { return this._CurrentTheme; }

        private _Themes: Theme[] = [];

        private _IsLoading = false;
        private _IsLoaded = false;
        private _LoadError: any = null;
        private _Deferrables: IDeferrable<any>[] = [];

        constructor(public Name: string) { }

        static TryGetClass(xmlns: string, xmlname: string): any {
            var libName: string;
            if (xmlns.indexOf("lib:") === 0)
                libName = xmlns.substr("lib:".length);

            var library = Library.Get(xmlns);
            if (!libName && (!library || !library.Module))
                return undefined;

            if (!library)
                throw new Exception("Could not find library: '" + libName + "'.");
            if (!library.Module)
                throw new Exception("Could not acquire module in library: '" + libName + "'.");

            var c = library.Module[xmlname];
            if (c)
                return c;

            if (libName)
                throw new Exception("Could not find type [" + xmlname + "] in library: '" + libName + "'.");
        }
        static Get(xmlns: string): Library {
            if (xmlns.indexOf("lib:") !== 0)
                return undefined;
            var name = xmlns.substr("lib:".length);
            return libraries[name] || (libraries[name] = new Library(name));
        }
        static GetThemeStyle(type: any): Style {
            for (var id in libraries) {
                var library = libraries[id];
                if (!library.CurrentTheme)
                    continue;
                var style = library.CurrentTheme.GetImplicitStyle(type);
                if (style)
                    return style;
            }
            return undefined;
        }
        static ChangeTheme(themeName: string): IAsyncRequest<any> {
            var reqs: IAsyncRequest<Theme>[] = [];
            var library: Library;
            for (var name in libraries) {
                library = libraries[name];
                reqs.push(library._LoadTheme({ ThemeName: themeName, Resolving: [] }));
            }
            return deferArraySimple(reqs);
        }

        Resolve(ctx: IDependencyAsyncContext): IAsyncRequest<Library> {
            ctx.Resolving.push(this);
            this._Load(ctx);

            var d = defer<Library>();
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
            if (this._IsLoading || this._IsLoaded)
                return;
            this._IsLoading = true;

            if (this.Name === "Fayde") {
                this._Module = Fayde;
                this._LoadTheme(ctx)
                    .success(theme => this._FinishLoad(ctx))
                    .error(err => this._FinishLoad(ctx, err));
                return;
            }

            var moduleUrl = this.GetModuleRequireUrl();
            (<Function>require)([moduleUrl], res => {
                this._Module = res;
                this._LoadTheme(ctx)
                    .success(theme => this._FinishLoad(ctx))
                    .error(err => this._FinishLoad(ctx, err));
            }, error => this._FinishLoad(ctx, error));
        }
        private _LoadTheme(ctx: IDependencyAsyncContext): IAsyncRequest<Theme> {
            var d = defer<Theme>();
            var themeUrl = this.GetThemeRequireUrl(ctx.ThemeName);
            if (!themeUrl) {
                this._CurrentTheme = undefined;
                d.resolve(undefined);
                return d.request;
            }
            var theme: Theme = this._Themes[ctx.ThemeName];
            if (theme) {
                d.resolve(this._CurrentTheme = theme);
                return d.request;
            }
            theme = this._Themes[ctx.ThemeName] = Theme.Get(themeUrl);
            theme.Resolve(ctx)
                .success(res => d.resolve(this._CurrentTheme = res))
                .error(d.reject);
            return d.request;
        }
        private _FinishLoad(ctx: IDependencyAsyncContext, error?: any) {
            this._LoadError = error;
            var index = ctx.Resolving.indexOf(this);
            if (index > -1)
                ctx.Resolving.splice(index, 1);

            this._IsLoading = false;
            this._IsLoaded = true;
            for (var i = 0, ds = this._Deferrables, len = ds.length; i < len; i++) {
                if (error)
                    ds[i].reject(error);
                else
                    ds[i].resolve(this);
            }
        }

        GetModuleRequireUrl(): string {
            return "lib/" + this.Name + "/" + this.Name;
        }
        GetThemeRequireUrl(themeName: string): string {
            return "lib/" + this.Name + "/Themes/" + themeName + ".theme.xml";
        }
    }

    interface ILibraryHash {
        [id: string]: Library;
    }
    var libraries: ILibraryHash = <any>[];
    export function RegisterLibrary(name: string, moduleUrl?: string, themeUrlFunc?: (themeName: string) => string): Library {
        var library = libraries[name];
        if (library)
            throw new Exception("Library already registered: '" + name + "'.");
        library = libraries[name] = new Library(name);
        if (moduleUrl)
            library.GetModuleRequireUrl = function (): string { return moduleUrl; };
        if (themeUrlFunc)
            library.GetThemeRequireUrl = themeUrlFunc;
        return library;
    }
}