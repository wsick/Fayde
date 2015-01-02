import Entity = Fayde.MVVM.Entity;
import AutoModel = Fayde.MVVM.AutoModel;

class Person extends Entity {
    FirstName: string;
    LastName: string;
    Age: number = 10;
}
AutoModel(Person)
    .Notify("FirstName", "LastName", "Age")
    .Validate("FirstName", required)
    .Validate("Age", ageValidation)
    .Finish();

function required (value: any, propertyName: string, entity: any): any[] {
    if (value == null || value === "")
        return [propertyName + " is required."];
}

function ageValidation (value: any, propertyName: string, entity: any): any[] {
    if (value == null)
        return [propertyName + " is required."];
    if (value <= 0)
        return [propertyName + " must be greater than 0."];
}

function toArray (errors: nullstone.IEnumerable<string>): string[] {
    return errors ? nullstone.IEnumerable_.toArray(errors) : null;
}

export function load () {
    QUnit.module("MVVM:AutoModel Tests");

    QUnit.test("Initial", (assert) => {
        var person = new Person();
        var changed = {};
        person.PropertyChanged.on((sender, args) => changed[args.PropertyName] = (changed[args.PropertyName] || 0) + 1, {});

        person.Age = null;
        strictEqual(changed["Age"], 1);
        deepEqual(toArray(person.GetErrors("Age")), ["Age is required."]);
        person.Age = -1;
        strictEqual(changed["Age"], 2);
        deepEqual(toArray(person.GetErrors("Age")), ["Age must be greater than 0."]);
        person.Age = 10;
        strictEqual(changed["Age"], 3);
        equal(person.GetErrors("Age"), null);
    });
}