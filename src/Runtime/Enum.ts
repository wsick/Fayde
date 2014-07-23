/// <reference path="TypeManagement.ts" />

class Enum implements IType {
    constructor(public Object: any) {
    }
}
Fayde.RegisterType(Enum, "Fayde");
