module Fayde.Documents {
    export class InlineCollection extends XamlObjectCollection<Inline> {
        AddingToCollection (value: Inline, error: BError): boolean {
            if (!super.AddingToCollection(value, error))
                return false;
            Incite(this, {
                item: value,
                add: true
            });
            return true;
        }

        RemovedFromCollection (value: Inline, isValueSafe: boolean) {
            super.RemovedFromCollection(value, isValueSafe);
            Incite(this, {
                item: value,
                add: false
            });
        }
    }
    Fayde.RegisterType(InlineCollection, "Fayde.Documents", Fayde.XMLNS);
}