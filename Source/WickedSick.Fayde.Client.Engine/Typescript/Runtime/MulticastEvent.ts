/// <reference path="../Runtime/Nullstone.ts" />
/// CODE
/// <reference path="EventArgs.ts" />

class MulticastEvent {
    Subscribe(callback: (sender: any, e: EventArgs) => void , closure: any) {
        //TODO: Implement
    }
    Unsubscribe(callback: (sender: any, e: EventArgs) => void , closure: any) {
        //TODO: Implement
    }
    Raise(sender: any, args: EventArgs) {
        //TODO: Implement
    }
    RaiseAsync(sender: any, args: EventArgs) {
        //TODO: Implement
    }
}
Nullstone.RegisterType(MulticastEvent, "MulticastEvent");