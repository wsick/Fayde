/// <reference path="../Runtime/TypeManagement.ts" />
/// CODE
/// <reference path="../Runtime/MulticastEvent.ts" />
/// <reference path="../Runtime/EventArgs.ts" />

module Fayde.Navigation {
    export class NavigationService {
        Href: string;
        Hash: string;
        LocationChanged: MulticastEvent<EventArgs> = new MulticastEvent<EventArgs>();

        constructor() {
            this.Href = window.location.href;
            this.Hash = window.location.hash;
            if (this.Hash) {
                this.Hash = this.Hash.substr(1);
                this.Href = this.Href.substring(0, this.Href.indexOf('#'));
            }
            window.onhashchange = () => this._HandleFragmentChange();
        }

        private _HandleFragmentChange() {
            this.Hash = window.location.hash;
            if (this.Hash) {
                this.Hash = this.Hash.substr(1);
            }
            this.LocationChanged.Raise(this, EventArgs.Empty);
        }
    }
    Fayde.RegisterType(NavigationService, {
    	Name: "NavigationService",
    	Namespace: "Fayde.Navigation",
    	XmlNamespace: Fayde.XMLNS
    });
}