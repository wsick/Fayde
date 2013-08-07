/// <reference path="TextElement.ts" />
/// CODE

module Fayde.Documents {
    export interface IBlocksChangedListener {
        BlocksChanged(newBlock: Block, isAdd: boolean);
    }

    export class Block extends TextElement {
    }
    Nullstone.RegisterType(Block, "Block");
    
    export class BlockCollection extends XamlObjectCollection<Block> {
        private _Listener: IBlocksChangedListener;
        Listen(listener: IBlocksChangedListener) { this._Listener = listener; }
        Unlisten(listener: IBlocksChangedListener) { if (this._Listener === listener) this._Listener = null; }

        AddingToCollection(value: Block, error: BError): boolean {
            if (!super.AddingToCollection(value, error))
                return false;
            var listener = this._Listener;
            if (listener) listener.BlocksChanged(value, true);
            return true;
        }
        RemovedFromCollection(value: Block, isValueSafe: boolean) {
            super.RemovedFromCollection(value, isValueSafe);
            var listener = this._Listener;
            if (listener) listener.BlocksChanged(value, false);
        }
    }
    Nullstone.RegisterType(BlockCollection, "BlockCollection");
}