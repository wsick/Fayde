/// <reference path="../Runtime/TypeManagement.ts" />

module Fayde.Navigation {
    export class Route {
        View: Uri;
        HashParams: { [key: string]: string };
        DataContext: Object;

        constructor(view: Uri, hashParams: { [key: string]: string }, dataContext: Object ) {
            this.View = view;
            this.HashParams = hashParams;        
            this.DataContext = dataContext;
        }
    }
    Fayde.RegisterType(Route, "Fayde.Navigation", Fayde.XMLNS);
}