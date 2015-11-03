/// <reference path="./ThemedLibrary" />

module Fayde {
    export class ThemedLibraryResolver extends nullstone.LibraryResolver {
        createLibrary(uri: string): nullstone.ILibrary {
            return new ThemedLibrary(uri);
        }
    }
}