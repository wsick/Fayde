/// <reference path="../Runtime/Nullstone.ts" />
/// CODE

class Enum implements IType {
    constructor(public Object: any) {
    }
}
Fayde.RegisterType(Enum, {
	Name: "Enum",
	Namespace: "Fayde"
});