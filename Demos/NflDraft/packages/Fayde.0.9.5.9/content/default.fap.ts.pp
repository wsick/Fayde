/// <reference path="scripts/Fayde.d.ts"/>

module $rootnamespace$ {
    export class Application extends App {
        constructor() {
            super();
            this.Loaded.Subscribe(this.OnLoaded, this);
        }
        OnLoaded(sender, e: EventArgs) {
        }
    }
    Nullstone.RegisterType(Application, "Application");
}