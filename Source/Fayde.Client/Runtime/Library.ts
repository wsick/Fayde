module Fayde {
    var libraries: Library[] = [];
    export class Library {
        constructor(public Module: any) { }

        static Get(url: string): Library {
            url = url.substr("library:".length);
            return libraries[url];
        }
        static Resolve(url: string): IAsyncRequest<Library> {
            url = url.substr("library:".length);

            var d = defer<Library>();

            var library = libraries[url];
            if (library) {
                d.resolve(library);
                return d.request;
            }

            (<Function>require)(url, (jsmodule: any) => d.resolve(new Library(jsmodule)), d.reject);
            return d.request;
        }
    }
} 