module Fayde {
    export interface ILibraryAsyncContext {
        Resolving: Library[];
    }

    interface ILibraryHash {
        [id: string]: Library;
    }
    var libraries: ILibraryHash = <any>[];
    export class Library {
        Module: any;
        Theme: Theme;

        private _ModuleUrl: string;
        private _ThemeUrl: string;
        private _IsLoading = false;
        private _IsLoaded = false;
        private _LoadError: any = null;
        private _Deferrables: IDeferrable<any>[] = [];

        constructor(moduleUrl: string, themeUrl?: string) {
            this._ModuleUrl = moduleUrl;
            this._ThemeUrl = themeUrl;
        }

        static TryGetClass(xmlns: string, xmlname: string): any {
            var libName: string;
            if (xmlns.indexOf("lib:") === 0)
                libName = xmlns.substr("lib:".length);

            var library = Library.Get(xmlns);
            if (!library || !library.Module) {
                if (libName)
                    throw new Exception("Could not find library: '" + libName + "'.");
                return undefined;
            }

            var c = library.Module[xmlname];
            if (c)
                return c;

            if (libName)
                throw new Exception("Could not find type [" + xmlname + "] in library: '" + libName + "'.");
        }

        static Get(url: string): Library {
            if (url.indexOf("lib:") !== 0)
                return undefined;
            return libraries[url.substr("lib:".length)];
        }

        static GetImplicitStyle(type: any): Style {
            for (var id in libraries) {
                var library = libraries[id];
                if (!library.Theme)
                    continue;
                var style = library.Theme.GetImplicitStyle(type);
                if (style)
                    return style;
            }
            return undefined;
        }

        Resolve(ctx?: ILibraryAsyncContext): IAsyncRequest<Library> {
            ctx = ctx || { Resolving: [] };
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

        private _Load(ctx: ILibraryAsyncContext) {
            if (this._IsLoading || this._IsLoaded)
                return;
            this._IsLoading = true;

            (<Function>require)([this._ModuleUrl], res => {
                this.Module = res;
                if (!this._ThemeUrl) {
                    this._FinishLoad(ctx);
                    return;
                }
                (this.Theme = Theme.Get(this._ThemeUrl))
                    .Resolve(ctx)
                    .success(res => this._FinishLoad(ctx))
                    .error(error => this._FinishLoad(ctx, error));
            }, error => this._FinishLoad(ctx, error));
        }
        private _FinishLoad(ctx: ILibraryAsyncContext, error?: any) {
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
    }

    export function RegisterLibrary(name: string, moduleUrl: string, themeUrl?: string): Library {
        var library = libraries[name];
        if (library)
            throw new Exception("Library already registered: '" + name + "'.");
        return libraries[name] = new Library(moduleUrl, themeUrl);
    }
}