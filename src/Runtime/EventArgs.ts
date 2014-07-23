/// <reference path="TypeManagement.ts" />

class EventArgs {
    static Empty: EventArgs = new EventArgs();
}
Fayde.RegisterType(EventArgs, "Fayde", Fayde.XMLNS);
