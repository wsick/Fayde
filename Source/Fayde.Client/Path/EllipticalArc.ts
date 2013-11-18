module Fayde.Path {
    export interface IEllipticalArc extends IPathEntry {
        width: number;
        height: number;
        rotationAngle: number;
        isLargeArcFlag: boolean;
        sweepDirectionFlag: Shapes.SweepDirection;
        ex: number;
        ey: number;
    }
    export function EllipticalArc(width: number, height: number, rotationAngle: number, isLargeArcFlag: boolean, sweepDirectionFlag: Shapes.SweepDirection, ex: number, ey: number): IEllipticalArc {
        return {
            isSingle: false,
            width: width,
            height: height,
            rotationAngle: rotationAngle,
            isLargeArcFlag: isLargeArcFlag,
            sweepDirectionFlag: sweepDirectionFlag,
            ex: ex,
            ey: ey,
            draw: function (ctx: CanvasRenderingContext2D) {
                console.warn("[NOT IMPLEMENTED] Draw Elliptical Arc");
            },
            extendFillBox: function (box: IBoundingBox, prevX: number, prevY: number) {
                console.warn("[NOT IMPLEMENTED] Measure Elliptical Arc");
            },
            extendStrokeBox: function (box: IBoundingBox, pars: IStrokeParameters, prevX: number, prevY: number) {
                console.warn("[NOT IMPLEMENTED] Measure Elliptical Arc (with stroke)");
            },
            toString: function (): string {
                return "A" + width.toString() + "," + height.toString() + " " + rotationAngle.toString() + " " + isLargeArcFlag.toString() + " " + sweepDirectionFlag.toString() + " " + ex.toString() + "," + ey.toString();
            },
            getStartVector: function (): number[] {
                return null;
            },
            getEndVector: function (): number[] {
                return null;
            }
        };
    }
}