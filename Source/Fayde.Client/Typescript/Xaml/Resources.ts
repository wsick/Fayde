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
    class XamlResource implements IResource {
        Url: string;
        private _Xaml: string = null;
        private _Document: Document;
        constructor(url: string) {
            Object.defineProperty(this, "Url", { value: url, writable: false });
        }
        LoadAsync(onLoaded: (resource: IResource) => void) {
            var request = new AjaxRequest(
                (result) => {
                    this._Xaml = result.GetData();
                    var parser = new DOMParser();
                    this._Document = parser.parseFromString(this._Xaml, "text/xml");
                    onLoaded(this);
                }, (error) => {
                    console.warn("Could not load xaml resource: " + error.toString());
                    onLoaded(this);
                });
            request.Get(this.Url);
        }
    }
    class ScriptResource implements IResource {
        Url: string;
        private _IsLoaded: boolean = false;
        private _Script: HTMLScriptElement = null;
        constructor(url: string) {
            Object.defineProperty(this, "Url", { value: url, writable: false });
        }
        LoadAsync(onLoaded: (resource: IResource) => void) {
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
}