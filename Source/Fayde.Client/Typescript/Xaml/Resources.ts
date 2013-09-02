/// <reference path="../Runtime/TypeManagement.ts" />
/// CODE
/// <reference path="../Runtime/BatchLoad.ts" />

module Fayde.Xaml {
    export enum ResourceType {
        Script,
        Xaml
    }
    export interface IResource extends Runtime.ILoadAsyncable {
        Url: string;
        LoadAsync(onLoaded: (resource: IResource) => void);
    }
    export interface IXamlResource extends IResource {
        Document: Document;
    }
    class XamlResource implements IXamlResource {
        Url: string;
        private _IsLoaded: boolean = false;
        private _Xaml: string = null;
        private _Document: Document;
        private _Error: string = null;
        get Document(): Document { return this._Document; }
        get IsLoaded(): boolean { return this._IsLoaded; }
        get Error(): string { return this._Error; }
        constructor(url: string) {
            Object.defineProperty(this, "Url", { value: url, writable: false });
        }
        LoadAsync(onLoaded: (resource: XamlResource) => void) {
            if (this._IsLoaded && this._Document) {
                onLoaded(this);
                return;
            }
            var request = new AjaxRequest(
                (result) => {
                    this._Xaml = result.GetData();
                    var parser = new DOMParser();
                    this._Document = parser.parseFromString(this._Xaml, "text/xml");
                    this._IsLoaded = true;
                    onLoaded(this);
                }, (error) => {
                    this._IsLoaded = true;
                    console.warn("Could not load xaml resource: " + error.toString());
                    this._Error = error;
                    onLoaded(this);
                });
            request.Get(this.Url);
        }
    }
    class ScriptResource implements IResource {
        Url: string;
        private _IsLoaded: boolean = false;
        private _Script: HTMLScriptElement = null;
        private _Error: string;
        get IsLoaded(): boolean { return this._IsLoaded; }
        constructor(url: string) {
            Object.defineProperty(this, "Url", { value: url, writable: false });
        }
        LoadAsync(onLoaded: (resource: ScriptResource) => void) {
            if (this._IsLoaded && this._Script) {
                onLoaded(this);
                return;
            }
            var script = this._Script = <HTMLScriptElement>document.createElement("script");
            script.type = "text/javascript";
            script.src = this.Url;
            script.onreadystatechange = (e: Event) => {
                if (this._IsLoaded || script.readyState !== "completed")
                    return;
                this._IsLoaded = true;
                onLoaded(this);
            };
            script.onload = () => {
                if (this._IsLoaded)
                    return;
                this._IsLoaded = true;
                onLoaded(this);
            };
            script.onerror = (error) => {
                this._Error = "Could not load script file.";
                this._IsLoaded = true;
                onLoaded(this);
            };
            var head = <HTMLHeadElement>document.getElementsByTagName("head")[0];
            head.appendChild(script);
        }
    }

    var entireNamespaceName = "$_root_$";

    var xamlresources: IResource[][] = [];
    var scriptresources: IResource[][] = [];
    export function MapResource(type: ResourceType, namespaceURI: string, localName: string): IResource {
        var r: IResource[][];
        if (type === ResourceType.Xaml) {
            r = xamlresources;
        } else if (type === ResourceType.Script) {
            r = scriptresources;
        } else {
            return undefined;
        }

        var nsuri = namespaceURI.toLowerCase();
        var names: IResource[] = r[nsuri];
        if (!names)
            return undefined;
        var resource = names[localName];
        if (!resource)
            resource = names[entireNamespaceName];
        return resource;
    }

    export function RegisterResource(type: ResourceType, url: string, namespaceURI: string, localName: string): IResource {
        var r: IResource[][];
        if (type === ResourceType.Xaml) {
            r = xamlresources;
        } else if (type === ResourceType.Script) {
            r = scriptresources;
        } else {
            return undefined;
        }

        var nsuri = namespaceURI.toLowerCase();
        var names: IResource[] = r[nsuri];
        if (!names)
            names = r[nsuri] = [];
        var res = names[localName];
        if (!res) {
            if (type === ResourceType.Xaml) {
                names[localName] = res = new XamlResource(url);
            } else if (type === ResourceType.Script) {
                names[localName] = res = new ScriptResource(url);
            }
        }
        return res;
    }
    export function RegisterRootResource(url: string, namespaceURI: string): IResource {
        var r = scriptresources;
        var nsuri = namespaceURI.toLowerCase();
        var names: IResource[] = r[nsuri];
        if (!names)
            names = r[nsuri] = [];
        var res = names[entireNamespaceName];
        if (!res)
            res = names[entireNamespaceName] = new ScriptResource(url);
        return res;
    }

    var rdresources: IXamlResource[] = [];
    export function RegisterResourceDictionary(source: Uri): IXamlResource {
        var url = source.toString();
        if (!url)
            return null;
        var r = rdresources[url];
        if (r)
            return r;
        return new XamlResource(url);
    }
    export function MapResourceDictionary(source: Uri): IXamlResource {
        var url: string;
        if (!source || !(url = source.toString()))
            return null;
        return rdresources[url];
    }

    export class PageResolver {
        private _Url: string;
        private _Xaml: XamlResource;
        private _Script: ScriptResource;
        private _OnSuccess: (xaml: Document) => void;
        private _OnError: (error: string) => void;

        static Resolve(url: string, onSuccess: (xaml: Document) => void, onError: (error: string) => void): PageResolver {
            var resolver = new PageResolver();
            resolver._OnSuccess = onSuccess;
            resolver._OnError = onError;
            resolver._Url = url;
            resolver._Xaml = new XamlResource(url);
            resolver._Script = new ScriptResource(url + ".js");
            resolver._Xaml.LoadAsync((xr) => resolver._TryFinish());
            resolver._Script.LoadAsync((sr) => resolver._TryFinish());
            return resolver;
        }

        Stop() {
            //Nothing for now
        }

        private _TryFinish() {
            if (!this._Xaml.IsLoaded || !this._Script.IsLoaded)
                return;
            if (this._Xaml.Error)
                this._OnError(this._Xaml.Error);
            else
                this._OnSuccess(this._Xaml.Document);
        }
    }

}