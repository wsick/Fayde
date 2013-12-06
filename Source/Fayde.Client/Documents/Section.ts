/// <reference path="TextElement.ts"/>

module Fayde.Documents {
    export class Section extends TextElement implements IBlocksChangedListener {
        CreateNode(): TextElementNode {
            return new TextElementNode(this, "Blocks");
        }

        static BlocksProperty = DependencyProperty.RegisterImmutable<BlockCollection>("Blocks", () => BlockCollection, Section);

        static Annotations = { ContentProperty: Section.BlocksProperty };
        
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
    Fayde.RegisterType(Section, {
    	Name: "Section",
    	Namespace: "Fayde.Documents",
    	XmlNamespace: Fayde.XMLNS
    });
}