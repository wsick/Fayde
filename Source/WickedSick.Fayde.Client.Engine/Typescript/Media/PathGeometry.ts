/// <reference path="Geometry.ts" />
/// <reference path="Geometry.ts" />
/// CODE
/// <reference path="../Shapes/Enums.ts" />
/// <reference path="PathFigure.ts" />

module Fayde.Media {
    export class PathGeometry extends Geometry implements IPathFigureListener {
        static Annotations = { ContentProperty: "Figures" }
        static FillRuleProperty: DependencyProperty = DependencyProperty.Register("FillRule", () => new Enum(Shapes.FillRule), PathGeometry, Shapes.FillRule.EvenOdd, (d, args) => (<Geometry>d)._InvalidateGeometry());
        FillRule: Shapes.FillRule;
        Figures: PathFigureCollection;

        constructor() {
            super();
            var coll = new PathFigureCollection();
            coll.Listen(this);
            Object.defineProperty(this, "Figures", {
                value: coll,
                writable: false
            });
        }

        SetPath(path: Shapes.RawPath) {
            (<any>this)._Path = path;
        }

        private _Build(): Shapes.RawPath {
            var p = new Shapes.RawPath();
            var figures = this.Figures;
            if (!figures)
                return;

            var enumerator = figures.GetEnumerator();
            while (enumerator.MoveNext()) {
                (<PathFigure>enumerator.Current).MergeInto(p);
            }
            return p;
        }

        private PathFigureChanged(newPathFigure: PathFigure) {
            this._InvalidateGeometry();
        }
    }
    Nullstone.RegisterType(PathGeometry, "PathGeometry");
}