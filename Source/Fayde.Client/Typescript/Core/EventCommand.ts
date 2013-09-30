/// <reference path="XamlObject.ts" />

module Fayde {
    export class EventCommand {
        private _PathWalker: Data.PropertyPathWalker = null;
        private _Target: XamlObject = null;
        private _Event: MulticastEvent<EventArgs> = null;
        constructor(path: string) {
            this._PathWalker = new Data.PropertyPathWalker(path, true, false, true);
        }
        Attach(target: XamlObject, eventName: string) {
            if (!target)
                throw new InvalidOperationException("No target specified for EventCommand.");
            this._Target = target;
            this._Event = target[eventName];
            if (!(this._Event instanceof MulticastEvent)) {
                this._Event = null;
                throw new InvalidOperationException("Cannot attach event '" + eventName + "' to target.");
            }
            this._Event.Subscribe(this._Callback, this);
        }
        Detach() {
            if (this._Event)
                this._Event.Unsubscribe(this._Callback, this);
        }
        private _Callback(sender: any, e: EventArgs) {
            var dc = this._Target.XamlNode.DataContext;
            var method = <Function>this._PathWalker.GetValue(dc);
            method.call(dc, { Sender: sender, EventArgs: e });
        }
    }
}