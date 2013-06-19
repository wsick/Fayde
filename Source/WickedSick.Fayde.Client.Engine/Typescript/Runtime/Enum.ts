/// <reference path="../Runtime/Nullstone.ts" />
/// CODE

class Enum implements IType {
    constructor(public Object: any) {
    }
}
Nullstone.RegisterType(Enum, "Enum");