module Fayde.Data {
    export class RelativeSource implements nullstone.markup.IMarkupExtension {
        Mode: string;
        AncestorLevel: string;
        AncestorType: string;

        init (val: string) {
            this.Mode = val;
        }

        transmute (os: any[]): any {
            //TODO: How can we force extension parser to give us AncestorType as a type?
            return new Data.RelativeSourceExpression(this);
        }
    }
    Fayde.RegisterType(RelativeSource, Fayde.XMLNS, "RelativeSource");
}