
module Fayde.Path {
    export interface IBoundingBox {
        l: number;
        r: number;
        t: number;
        b: number;
    }
    export interface IPathEntry {
        isSingle: boolean;
        draw: (canvasCtx: CanvasRenderingContext2D) => void;
        extendFillBox: (box: IBoundingBox) => void;
        extendStrokeBox: (box: IBoundingBox, thickness: number, prevX: number, prevY: number, isStart: boolean, isEnd: boolean) => void;
    }

    export class RawPath {
        private _Path: IPathEntry[] = [];
        private _EndX: number = 0.0;
        private _EndY: number = 0.0;
        get EndX(): number { return this._EndX; }
        get EndY(): number { return this._EndY; }
        Move(x: number, y: number) {
            this._Path.push(Move(x, y));
            this._EndX = x;
            this._EndY = y;
        }
        Line(x: number, y: number) {
            this._Path.push(Line(x, y));
            this._EndX = x;
            this._EndY = y;
        }
        Rect(x: number, y: number, width: number, height: number) {
            this._Path.push(Rect(x, y, width, height));
        }
        RoundedRectFull(left: number, top: number, width: number, height: number, topLeft: number, topRight: number, bottomRight: number, bottomLeft: number) {
            var right = left + width;
            var bottom = top + height;

            this.Move(left + topLeft, top);
            //top edge
            this.Line(right - topRight, top);
            //top right arc
            if (topRight > 0)
                this.Quadratic(right, top, right, top + topRight);
            //right edge
            this.Line(right, bottom - bottomRight);
            //bottom right arc
            if (bottomRight > 0)
                this.Quadratic(right, bottom, right - bottomRight, bottom);
            //bottom edge
            this.Line(left + bottomLeft, bottom);
            //bottom left arc
            if (bottomLeft > 0)
                this.Quadratic(left, bottom, left, bottom - bottomLeft);
            //left edge
            this.Line(left, top + topLeft);
            //top left arc
            if (topLeft > 0)
                this.Quadratic(left, top, left + topLeft, top);
            this.Close();
        }
        RoundedRect(left: number, top: number, width: number, height: number, radiusX: number, radiusY: number) {
            if (radiusX === 0.0 && radiusY === 0.0) {
                this.Rect(left, top, width, height);
                return;
            }

            var right = left + width;
            var bottom = top + height;
            this.Move(left + radiusX, top);
            //top edge
            this.Line(right - radiusX, top);
            //top right arc
            this.Quadratic(right, top, right, top + radiusY);
            //right edge
            this.Line(right, bottom - radiusY);
            //bottom right arc
            this.Quadratic(right, bottom, right - radiusX, bottom);
            //bottom edge
            this.Line(left + radiusX, bottom);
            //bottom left arc
            this.Quadratic(left, bottom, left, bottom - radiusY);
            //left edge
            this.Line(left, top + radiusY);
            //top left arc
            this.Quadratic(left, top, left + radiusX, top);
            this.Close();
        }
        Quadratic(cpx: number, cpy: number, x: number, y: number) {
            this._Path.push(QuadraticBezier(cpx, cpy, x, y));
            this._EndX = x;
            this._EndY = y;
        }
        Bezier(cp1x: number, cp1y: number, cp2x: number, cp2y: number, x: number, y: number) {
            this._Path.push(CubicBezier(cp1x, cp1y, cp2x, cp2y, x, y));
            this._EndX = x;
            this._EndY = y;
        }
        Ellipse(x: number, y: number, width: number, height: number) {
            var radiusX = width / 2;
            var radiusY = height / 2;
            var right = x + width;
            var bottom = y + height;
            var centerX = x + radiusX;
            var centerY = y + radiusY;
            if (width === height) { //circle
                this.Arc(centerX, centerY, radiusX, 0, Math.PI * 2, false);
            } else { //oval
                var kappa = .5522848; // 4 * ((sqrt(2) - 1) / 3)
                var ox = radiusX * kappa;
                var oy = radiusY * kappa;

                //move to left edge, halfway down
                this.Move(x, centerY);
                //top left bezier curve
                this.Bezier(x, centerY - oy, centerX - ox, y, centerX, y);
                //top right bezier curve
                this.Bezier(centerX + ox, y, right, centerY - oy, right, centerY);
                //bottom right bezier curve
                this.Bezier(right, centerY + oy, centerX + ox, bottom, centerX, bottom);
                //bottom left bezier curve
                this.Bezier(centerX - ox, bottom, x, centerY + oy, x, centerY);
                this.Close();
            }
        }
        EllipticalArc(width: number, height: number, rotationAngle: number, isLargeArcFlag: boolean, sweepDirectionFlag: Shapes.SweepDirection, ex: number, ey: number) {
            this._Path.push(EllipticalArc(width, height, rotationAngle, isLargeArcFlag, sweepDirectionFlag, ex, ey));
        }
        Arc(x: number, y: number, r: number, sAngle: number, eAngle: number, aClockwise: boolean) {
            this._Path.push(Arc(x, y, r, sAngle, eAngle, aClockwise));
        }
        ArcTo(cpx: number, cpy: number, x: number, y: number, radius: number) {
            this._Path.push(ArcTo(cpx, cpy, x, y, radius));
            this._EndX = x;
            this._EndY = y;
        }
        Close() {
            this._Path.push(Close());
        }

        DrawRenderCtx(ctx: RenderContext) {
            this.DrawCanvasCtx(ctx.CanvasContext);
        }
        DrawCanvasCtx(canvasCtx: CanvasRenderingContext2D) {
            canvasCtx.beginPath();
            var path = this._Path;
            var len = path.length;
            for (var i = 0; i < len; i++) {
                path[i].draw(canvasCtx);
            }
        }
        CalcFillBounds(): IBoundingBox {
            var path = this._Path;
            var len = path.length;
            var box: IBoundingBox = {
                l: null,
                r: null,
                t: null,
                b: null
            };
            for (var i = 0; i < len; i++) {
                path[i].extendFillBox(box);
            }
            return box;
        }
        CalcStrokeBounds(thickness: number): IBoundingBox {
            var path = this._Path;
            var len = path.length;
            var box: IBoundingBox = {
                l: null,
                r: null,
                t: null,
                b: null
            };
            var prevX = null;
            var prevY = null;
            var entry: IPathEntry;
            for (var i = 0; i < len; i++) {
                entry = path[i];
                entry.extendStrokeBox(box, thickness, prevX, prevY, i === 0, (i + 1) === len);
                if (!entry.isSingle) {
                    prevX = (<any>entry).x;
                    prevY = (<any>entry).y;
                }
            }
            return box;
        }

        static Merge(path1: RawPath, path2: RawPath) {
            path1._Path.push.apply(path1._Path, path2._Path);
            path1._EndX += path2._EndX;
            path1._EndY += path2._EndY;
        }

        Serialize(): string {
            var path = this._Path;
            var len = path.length;
            var s = "";
            for (var i = 0; i < len; i++) {
                if (i > 0) s += " ";
                s += path[i].toString();
            }
            return s;
        }
    }
}