module Fayde.Controls.Internal {
    export class EventGesture<T extends UIElement> {
        Target: UIElement;
        private _Callback: (t: T, e: EventArgs) => void;

        Attach(event: MulticastEvent<EventArgs>, callback: (t: T, e: EventArgs) => void) {
            this._Callback = callback;
            event.Subscribe(this._OnEvent, this);
            this.Detach = () => {
                event.Unsubscribe(this._OnEvent, this);
                this.Detach = () => { };
            };
        }
        Detach() { }

        private _OnEvent(sender: any, e: RoutedEventArgs) {
            this._Callback && this._Callback(sender, e);
        }
    }
} 