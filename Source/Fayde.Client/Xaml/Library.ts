/// <reference path="../Core/DependencyObject.ts" />

module Fayde.Xaml {
    export class Library extends DependencyObject implements Runtime.ILoadAsyncable {
        static PackageUriProperty = DependencyProperty.Register("PackageUri", () => Uri, Library);
        PackageUri: Uri;

        private _Script: Xaml.IResource;
        private _GenericXaml: Xaml.IXamlResource;
        private _ResourceDictionary: ResourceDictionary;
        
        Register() {
            var pkg = this.PackageUri;
            if (!pkg)
                return;
            var pkgstr = pkg.OriginalString;
            if (pkgstr[pkgstr.length - 1] !== "/") pkgstr += "/";

            this._Script = Xaml.RegisterResource(ResourceType.Script, pkgstr + "source.js", "package:" + pkgstr, "source");
            this._GenericXaml = Xaml.RegisterResourceDictionary(new Uri(pkgstr + "generic.xml"));
        }

        GetImplicitStyle(type: any): Style {
            var rd = this._ResourceDictionary;
            if (!rd)
                return undefined;
            var s = rd.Get(type);
            if (!s)
                return undefined;
            if (s instanceof Style)
                return s;
            return undefined;
        }

        LoadAsync(onLoaded: (state: any) => void) {
            var loaders: Runtime.ILoadAsyncable[] = [];
            if (this._GenericXaml)
                loaders.push(this._GenericXaml);
            if (this._Script)
                loaders.push(this._Script);
            Runtime.LoadBatchAsync(loaders, () => this._OnLoaded(onLoaded));
        }

        private _OnLoaded(onLoaded: (state: any) => void) {
            this._ResourceDictionary = <ResourceDictionary>Xaml.Load(this._GenericXaml.Document);
            onLoaded(this);
        }
    }
    Fayde.RegisterType(Library, "Fayde.Xaml", Fayde.XMLNS);
}