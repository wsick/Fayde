/// <reference path="TextElement.ts" />
/// CODE

module Fayde.Documents {
    export interface IBlocksChangedListener {
        BlocksChanged(newBlock: Block, isAdd: bool);
    }

    export class Block extends TextElement {
    }
    Nullstone.RegisterType(Block, "Block");
    
    export class BlockCollection extends XamlObjectCollection {
        private _Listener: IBlocksChangedListener;
        Listen(listener: IBlocksChangedListener) { this._Listener = listener; }
        Unlisten(listener: IBlocksChangedListener) { if (this._Listener === listener) this._Listener = null; }

        AddedToCollection(value: Block, error: BError): bool {
            if (!super.AddedToCollection(value, error))
                return false;
            var listener = this._Listener;
            if (listener) listener.BlocksChanged(value, true);
            return true;
        }
        RemovedFromCollection(value: Block, isValueSafe: bool) {
            super.RemovedFromCollection(value, isValueSafe);
            var listener = this._Listener;
            if (listener) listener.BlocksChanged(value, false);
        }
    }
    Nullstone.RegisterType(BlockCollection, "BlockCollection");
}