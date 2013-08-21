/// <reference path="../Runtime/TypeManagement.ts" />
/// CODE
/// <reference path="../Runtime/BatchLoad.ts" />

module Fayde.Xaml {
    export interface IResource extends Runtime.ILoadAsyncable {
        Url: string;
        LoadAsync(onLoaded: (resource: IResource) => void);
    }
    class Resource implements IResource {
        Url: string;
        IsLoaded: boolean = false;
        constructor(url: string) {
            Object.defineProperty(this, "Url", { value: url, writable: false });
        }
        LoadAsync(onLoaded: (resource: IResource) => void) {
            if (this.IsLoaded) {
                onLoaded(this);
                return;
            }

            //TODO: Implement
        }
    }

    var entireNamespaceName = "$_root_$";

    var resources: IResource[][] = [];
    export function MapResource(namespaceURI: string, localName: string): IResource {
        var nsuri = namespaceURI.toLowerCase();
        var names: IResource[] = resources[nsuri];
        if (!names)
            return undefined;
        var resource = names[localName];
        if (!resource)
            resource = names[entireNamespaceName];
        return resource;
    }

    export function RegisterResource(url: string, namespaceURI: string, localName: string): IResource {
        var nsuri = namespaceURI.toLowerCase();
        var names: IResource[] = resources[nsuri];
        if (!names)
            names = resources[nsuri] = [];
        var res = names[localName];
        if (!res)
            res = names[localName] = new Resource(url);
        return res;
    }
    export function RegisterRootResource(url: string, namespaceURI: string): IResource {
        var nsuri = namespaceURI.toLowerCase();
        var names: IResource[] = resources[nsuri];
        if (!names)
            names = resources[nsuri] = [];
        var res = names[entireNamespaceName];
        if (!res)
            res = names[entireNamespaceName] = new Resource(url);
        return res;
    }
}