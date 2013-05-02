/// <reference path="../../Runtime/EventArgs.ts" />
/// CODE
/// <reference path="../../Collections/NotifyCollectionChangedEventArgs.ts" />
/// <reference path="../ItemContainerGenerator.ts" />

module Fayde.Controls.Primitives {
    export class ItemsChangedEventArgs extends EventArgs {
        Action: Collections.NotifyCollectionChangedAction;
        ItemCount: number;
        ItemUICount: number;
        OldPosition: IGeneratorPosition;
        Position: IGeneratorPosition;
        constructor(action: Collections.NotifyCollectionChangedAction, itemCount: number, itemUICount: number, oldPosition: IGeneratorPosition, position: IGeneratorPosition) {
            super();
            this.Action = action;
            this.ItemCount = itemCount;
            this.ItemUICount = itemUICount;
            this.OldPosition = oldPosition;
            this.Position = position;
        }
    }
    Nullstone.RegisterType(ItemsChangedEventArgs, "ItemsChangedEventArgs");
}