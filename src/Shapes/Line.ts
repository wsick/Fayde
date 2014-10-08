/// <reference path="Shape.ts" />

module Fayde.Shapes {
    import ShapeUpdater = minerva.shapes.shape.ShapeUpdater;
    export class Line extends Shape {
        //CreateLayoutUpdater(node: UINode) { return new LineLayoutUpdater(node); }

        static X1Property = DependencyProperty.Register("X1", () => Number, Line, 0.0);
        static Y1Property = DependencyProperty.Register("Y1", () => Number, Line, 0.0);
        static X2Property = DependencyProperty.Register("X2", () => Number, Line, 0.0);
        static Y2Property = DependencyProperty.Register("Y2", () => Number, Line, 0.0);
        X1: number;
        Y1: number;
        X2: number;
        Y2: number;
    }
    Fayde.RegisterType(Line, "Fayde.Shapes", Fayde.XMLNS);

    module reactions {
        UIReaction<number>(Line.X1Property, (upd: ShapeUpdater, ov, nv) => upd.invalidateNaturalBounds(), false);
        UIReaction<number>(Line.Y1Property, (upd: ShapeUpdater, ov, nv) => upd.invalidateNaturalBounds(), false);
        UIReaction<number>(Line.X2Property, (upd: ShapeUpdater, ov, nv) => upd.invalidateNaturalBounds(), false);
        UIReaction<number>(Line.Y2Property, (upd: ShapeUpdater, ov, nv) => upd.invalidateNaturalBounds(), false);
    }

    //TODO: Implement line updater
    /*
    export class LineLayoutUpdater extends ShapeLayoutUpdater {
        X1: number = 0;
        Y1: number = 0;
        X2: number = 0;
        Y2: number = 0;

        BuildPath(): Fayde.Path.RawPath {
            this.SFlags = ShapeFlags.Normal;

            var x1 = this.X1;
            var y1 = this.Y1;
            var x2 = this.X2;
            var y2 = this.Y2;
            
            var path = new Fayde.Path.RawPath();
            path.Move(x1, y1);
            path.Line(x2, y2);
            return path;
        }
    }
    */
}