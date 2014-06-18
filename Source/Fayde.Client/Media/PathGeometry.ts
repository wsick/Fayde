/// <reference path="Geometry.ts" />

module Fayde.Media {
    export class PathGeometry extends Geometry implements IPathFigureListener {
        private _OverridePath: Path.RawPath = null;
        static FillRuleProperty: DependencyProperty = DependencyProperty.Register("FillRule", () => new Enum(Shapes.FillRule), PathGeometry, Shapes.FillRule.EvenOdd, (d, args) => (<Geometry>d)._InvalidateGeometry());
        static FiguresProperty = DependencyProperty.RegisterImmutable<PathFigureCollection>("Figures", () => PathFigureCollection, PathGeometry);
        FillRule: Shapes.FillRule;
        Figures: PathFigureCollection;

        constructor() {
            super();
            var coll = PathGeometry.FiguresProperty.Initialize(this);
            coll.AttachTo(this);
            coll.Listen(this);
        }

        OverridePath(path: Path.RawPath) {
            this._OverridePath = path;
        }

        _Build(): Path.RawPath {
            if (this._OverridePath)
                return this._OverridePath;

            var p = new Path.RawPath();
            var figures = this.Figures;
            if (!figures)
                return;

            var enumerator = figures.GetEnumerator();
            while (enumerator.moveNext()) {
                (<PathFigure>enumerator.current).MergeInto(p);
            }
            return p;
        }

        PathFigureChanged(newPathFigure: PathFigure) {
            this._OverridePath = null; //Any change in PathFigures invalidates a path override
            this._InvalidateGeometry();
        }
    }
    Fayde.RegisterType(PathGeometry, "Fayde.Media", Fayde.XMLNS);
    Xaml.Content(PathGeometry, PathGeometry.FiguresProperty);
}