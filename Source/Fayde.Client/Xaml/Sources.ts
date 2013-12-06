/// <reference path="../Runtime/TypeManagement.ts" />
/// <reference path="../Core/DependencyObject.ts" />

module Fayde.Xaml {
    export class Namespace extends DependencyObject implements Runtime.ILoadAsyncable {
        static NameProperty = DependencyProperty.Register("Name", () => String, Namespace);
        static SourceProperty = DependencyProperty.Register("Source", () => Uri, Namespace);
        static SourcesProperty = DependencyProperty.RegisterImmutable<XamlObjectCollection<Source>>("Sources", () => XamlObjectCollection, Namespace);
        Name: string;
        Source: Uri;
        Sources: XamlObjectCollection<Source>;

        static Annotations = { ContentProperty: Namespace.SourcesProperty };

        private _Resource: IResource;

        constructor() {
            super();
            Namespace.SourcesProperty.Initialize(this);
        }

        RegisterSource() {
            if (this.Source)
                this._Resource = Xaml.RegisterRootResource(this.Source.toString(), this.Name);
            var enumerator = this.Sources.GetEnumerator();
            while (enumerator.MoveNext()) {
                enumerator.Current.RegisterSource(this.Name);
            }
        }

        LoadAsync(onLoaded: (state: any) => void) {
            var loaders: Runtime.ILoadAsyncable[] = [];
            if (this._Resource)
                loaders.push(this._Resource);
            var enumerator = this.Sources.GetEnumerator();
            while (enumerator.MoveNext()) {
                loaders.push(enumerator.Current);
            }
            Runtime.LoadBatchAsync(loaders, () => onLoaded(this));
        }
    }
    Fayde.RegisterType(Namespace, {
        Name: "Namespace",
        Namespace: "Fayde.Xaml",
        XmlNamespace: Fayde.XMLNS
    });


    export class Source extends DependencyObject implements Runtime.ILoadAsyncable {
        static NameProperty = DependencyProperty.Register("Name", () => String, Source);
        static SourceProperty = DependencyProperty.Register("Source", () => Uri, Source);
        Name: string;
        Source: Uri;

        private _Resource: IResource;

        RegisterSource(namespace: string) {
            if (this.Source)
                this._Resource = Xaml.RegisterResource(ResourceType.Script, this.Source.toString(), namespace, this.Name);
        }

        LoadAsync(onLoaded: (state: any) => void) {
            if (!this._Resource)
                onLoaded(this);
            else
                this._Resource.LoadAsync(() => onLoaded(this));
        }
    }
    Fayde.RegisterType(Source, {
        Name: "Source",
        Namespace: "Fayde.Xaml",
        XmlNamespace: Fayde.XMLNS
    });

    export class XamlSource extends Source {
        static CodeSourcesProperty = DependencyProperty.RegisterImmutable<XamlObjectCollection<Source>>("CodeSources", () => XamlObjectCollection, XamlSource);
        CodeSources: XamlObjectCollection<Source>;

        static Annotations = { ContentProperty: XamlSource.CodeSourcesProperty };

        constructor() {
            super();
            XamlSource.CodeSourcesProperty.Initialize(this);
        }

        RegisterSource(namespace: string) {
            if (this.Source)
                (<any>this)._Resource = Xaml.RegisterResource(ResourceType.Xaml, this.Source.toString(), namespace, this.Name);
            var enumerator = this.CodeSources.GetEnumerator();
            while (enumerator.MoveNext()) {
                enumerator.Current.RegisterSource(namespace);
            }
        }

        LoadAsync(onLoaded: (state: any) => void) {
            var loaders: Runtime.ILoadAsyncable[] = [];
            var res: IResource = (<any>this)._Resource;
            if (res)
                loaders.push(res);
            var enumerator = this.CodeSources.GetEnumerator();
            while (enumerator.MoveNext()) {
                loaders.push(enumerator.Current);
            }
            Runtime.LoadBatchAsync(loaders, () => onLoaded(this));
        }
    }
    Fayde.RegisterType(XamlSource, {
        Name: "XamlSource",
        Namespace: "Fayde.Xaml",
        XmlNamespace: Fayde.XMLNS
    });
}