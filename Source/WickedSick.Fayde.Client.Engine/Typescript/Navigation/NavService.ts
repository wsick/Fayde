/// <reference path="../Runtime/Nullstone.ts" />
/// CODE
/// <reference path="../Engine/App.ts" />
/// <reference path="../Runtime/MulticastEvent.ts" />
/// <reference path="../Runtime/EventArgs.ts" />

module Fayde.Navigation {
    export class NavService {
        App: App;
        Href: string;
        Hash: string;
        LocationChanged: MulticastEvent = new MulticastEvent();

        constructor(app: App) {
            this.App = app;
            this.Href = window.location.href;
            this.Hash = window.location.hash;
            if (this.Hash) {
                this.Hash = this.Hash.substr(1);
                this.Href = this.Href.substring(0, this.Href.indexOf('#'));
            }
            window.onhashchange = () => this._HandleFragmentChange();
        }

        private _HandleFragmentChange() {
            this.App.Address = new Uri(document.URL);
            this.Hash = window.location.hash;
            if (this.Hash) {
                this.Hash = this.Hash.substr(1);
            }
            this.LocationChanged.Raise(this, EventArgs.Empty);
        }
    }
    Nullstone.RegisterType(NavService, "NavService");
}