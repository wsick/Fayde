/// <reference path="../../Core/DependencyObject.ts" />
/// CODE
/// <reference path="Curves.ts" />
/// <reference path="../../Primitives/Point.ts" />

module Fayde.Media.Animation {
    export class KeySpline extends DependencyObject {
        static PRECISION_LEVEL: number = 4;
        static TOTAL_COUNT: number = Math.pow(2, KeySpline.PRECISION_LEVEL);

        static ControlPoint1Property: DependencyProperty = DependencyProperty.RegisterCore("ControlPoint1", function () { return Point; }, KeySpline, new Point(0, 0), (d, args) => (<KeySpline>d).InvalidateControlPoints());
        static ControlPoint2Property: DependencyProperty = DependencyProperty.RegisterCore("ControlPoint2", function () { return Point; }, KeySpline, new Point(1.0, 1.0), (d, args) => (<KeySpline>d).InvalidateControlPoints());
        ControlPoint1: Point;
        ControlPoint2: Point;

        private _QuadraticsArray: IQuadraticCurve[] = null;
        GetSplineProgress(linearProgress: number): number {
            if (linearProgress >= 1.0)
                return 1.0;
            if (linearProgress <= 0.0)
                return 0.0;
            if (!this._QuadraticsArray)
                this._RegenerateQuadratics();
            return Curves.QuadraticArrayYForX(this._QuadraticsArray, linearProgress, KeySpline.TOTAL_COUNT);
        }
        private InvalidateControlPoints() {
            this._QuadraticsArray = null;
        }
        private _RegenerateQuadratics() {
            var c1 = this.ControlPoint1;
            var c2 = this.ControlPoint2;
            var src: ICubicCurve = {
                c0: { x: 0.0, y: 0.0 },
                c1: { x: c1.X, y: c1.Y },
                c2: { x: c2.X, y: c2.Y },
                c3: { x: 1.0, y: 1.0 }
            };

            var carr: ICubicCurve[] = [];
            Curves.SubdivideCubicAtLevel(carr, KeySpline.PRECISION_LEVEL, src);
            this._QuadraticsArray = Curves.ConvertCubicsToQuadratics(carr, KeySpline.TOTAL_COUNT);
        }
    }
    Fayde.RegisterType(KeySpline, {
    	Name: "KeySpline",
    	Namespace: "Fayde.Media.Animation",
    	XmlNamespace: Fayde.XMLNS
    });
}