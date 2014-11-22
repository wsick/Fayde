module Fayde.Data {
    export class RelativeSourceExpression implements ICloneable {
        Mode: RelativeSourceMode;
        AncestorLevel: number;
        AncestorType: Function = null;

        constructor (rse: RelativeSourceExpression);
        constructor (rs: RelativeSource);
        constructor (obj: any) {
            if (obj instanceof RelativeSourceExpression) {
                var rse = <RelativeSourceExpression>obj;
                this.Mode = rse.Mode;
                this.AncestorLevel = rse.AncestorLevel;
                this.AncestorType = rse.AncestorType;
            } else if (obj instanceof RelativeSource) {
                var rs = <RelativeSource>obj;
                this.Mode = RelativeSourceMode[this.Mode] || RelativeSourceMode.TemplatedParent;
                this.AncestorLevel = parseInt(rs.AncestorLevel) || 1;
                this.AncestorType = rs.AncestorType;
            }
            Object.freeze(this);
        }

        Clone (): RelativeSourceExpression {
            return new RelativeSourceExpression(this);
        }
    }
}