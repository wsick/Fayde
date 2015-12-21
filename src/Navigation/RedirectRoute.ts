module Fayde.Navigation {
    export class RedirectRoute extends Route {
        NewUri: Uri;

        constructor(route: Route, newUri: string);
        constructor(route: Route, newUri: Uri);
        constructor(route: Route, newUri: any) {
            super(route.View, route.HashParams, route.DataContext);
            this.NewUri = new Uri(newUri)
        }
    }
}