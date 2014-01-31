/// <reference path="../../Runtime/EventArgs.ts" />

module Fayde.Controls.Primitives {
    export class ItemsChangedEventArgs extends EventArgs {
        Action: Collections.NotifyCollectionChangedAction;
        ItemCount: number;
        ItemUICount: number;
        OldPosition: IGeneratorPosition;
        Position: IGeneratorPosition;
        constructor(action: Collections.NotifyCollectionChangedAction, itemCount: number, itemUICount: number, oldPosition: IGeneratorPosition, position: IGeneratorPosition) {
            super();
            Object.defineProperty(this, "Action", { value: action, writable: false });
            Object.defineProperty(this, "ItemCount", { value: itemCount, writable: false });
            Object.defineProperty(this, "ItemUICount", { value: itemUICount, writable: false });
            Object.defineProperty(this, "OldPosition", { value: oldPosition, writable: false });
            Object.defineProperty(this, "Position", { value: position, writable: false });
        }
    }
    Fayde.RegisterType(ItemsChangedEventArgs, "Fayde.Controls.Primitives", Fayde.XMLNS);
}