/// <reference path="TextElement.ts"/>
/// CODE
/// <reference path="Block.ts"/>

module Fayde.Documents {
    export class Section extends TextElement implements IBlocksChangedListener {
        CreateNode(): TextElementNode {
            return new TextElementNode(this, "Blocks");
        }

        static Annotations = { ContentProperty: "Blocks" }
        
        Blocks: BlockCollection;
        constructor() {
            super();
            var coll = new BlockCollection();
            coll.AttachTo(this);
            coll.Listen(this);
            Object.defineProperty(this, "Blocks", {
                value: coll,
                writable: false
            });
        }
        private BlocksChanged(newBlock: Block, isAdd: bool) {
            if (isAdd)
                this._Store.PropagateInheritedOnAdd(newBlock.XamlNode);
        }
    }
    Nullstone.RegisterType(Section, "Section");
}