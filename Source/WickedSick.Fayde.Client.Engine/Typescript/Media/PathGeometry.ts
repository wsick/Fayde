/// <reference path="Geometry.ts" />
/// <reference path="Geometry.ts" />
/// CODE
/// <reference path="../Shapes/Enums.ts" />
/// <reference path="PathFigure.ts" />

module Fayde.Media {
    export class PathGeometry extends Geometry implements IPathFigureListener {
        private _OverridePath: Shapes.RawPath = null;
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

        OverridePath(path: Shapes.RawPath) {
            this._OverridePath = path;
        }

        private _Build(): Shapes.RawPath {
            if (this._OverridePath)
                return this._OverridePath;

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
            this._OverridePath = null; //Any change in PathFigures invalidates a path override
            this._InvalidateGeometry();
        }
    }
    Nullstone.RegisterType(PathGeometry, "PathGeometry");
}