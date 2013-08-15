/// <reference path="../Runtime/Nullstone.ts" />
/// CODE

class EventArgs {
    static Empty: EventArgs = new EventArgs();
}
Nullstone.RegisterType(EventArgs, "EventArgs");