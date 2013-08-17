/// <reference path="../Runtime/Nullstone.ts" />
/// CODE
/// <reference path="../Engine/Application.ts" />
/// <reference path="../Runtime/MulticastEvent.ts" />
/// <reference path="../Runtime/EventArgs.ts" />

module Fayde.Navigation {
    export class NavService {
        App: Application;
        Href: string;
        Hash: string;
        LocationChanged: MulticastEvent<EventArgs> = new MulticastEvent<EventArgs>();

        constructor(app: Application) {
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
    Fayde.RegisterType(NavService, {
    	Name: "NavService",
    	Namespace: "Fayde.Navigation",
    	XmlNamespace: Fayde.XMLNS
    });
}