/// <reference path="../Runtime/Nullstone.ts" />
/// CODE

class EventArgs {
    static Empty: EventArgs = new EventArgs();
}
Fayde.RegisterType(EventArgs, {
	Name: "EventArgs",
	Namespace: "Fayde",
	XmlNamespace: Fayde.XMLNS
});