/// <reference path="Geometry.ts" />
/// <reference path="Geometry.ts" />
/// CODE
/// <reference path="../Shapes/Enums.ts" />
/// <reference path="PathFigure.ts" />

module Fayde.Media {
    export class PathGeometry extends Geometry {
        static FillRuleProperty: DependencyProperty = DependencyProperty.Register("FillRule", () => new Enum(Shapes.FillRule), PathGeometry, Shapes.FillRule.EvenOdd);
        static FiguresProperty: DependencyProperty = DependencyProperty.Register("Figures", () => PathFigureCollection, PathGeometry);
        FillRule: Shapes.FillRule;
        Figures: PathFigureCollection;
        SetPath(path: Shapes.RawPath) {
            (<any>this)._Path = path;
        }
    }
    Nullstone.RegisterType(PathGeometry, "PathGeometry");
}