/// <reference path="TextElement.ts"/>

module Fayde.Documents {
    export class Section extends TextElement implements IBlocksChangedListener {
        CreateNode(): TextElementNode {
            return new TextElementNode(this, "Blocks");
        }

        static BlocksProperty = DependencyProperty.RegisterImmutable<BlockCollection>("Blocks", () => BlockCollection, Section);
        Blocks: BlockCollection;

        constructor() {
            super();
            var coll = Section.BlocksProperty.Initialize(this);
            coll.AttachTo(this);
            coll.Listen(this);
        }
        BlocksChanged(newBlock: Block, isAdd: boolean) {
            if (isAdd)
                Providers.InheritedStore.PropagateInheritedOnAdd(this, newBlock.XamlNode);
        }
    }
    Fayde.RegisterType(Section, "Fayde.Documents", Fayde.XMLNS);
    Xaml.Content(Section, Section.BlocksProperty);
}