
module Fayde.Path {
    export interface IStrokeParameters {
        thickness: number;
        join: Shapes.PenLineJoin;
        startCap: Shapes.PenLineCap;
        endCap: Shapes.PenLineCap;
        miterLimit: number;
    }
    export interface IBoundingBox {
        l: number;
        r: number;
        t: number;
        b: number;
    }
    export interface IPathEntry {
        isSingle: boolean;
        draw: (canvasCtx: CanvasRenderingContext2D) => void;
        extendFillBox: (box: IBoundingBox, prevX: number, prevY: number) => void;
        extendStrokeBox: (box: IBoundingBox, pars: IStrokeParameters, prevX: number, prevY: number, isStart: boolean, isEnd: boolean) => void;
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
        RoundedRectFull(x: number, y: number, width: number, height: number, topLeft: number, topRight: number, bottomRight: number, bottomLeft: number) {
            this._Path.push(RectRoundedFull(x, y, width, height, topLeft, topRight, bottomRight, bottomLeft));
            this._EndX = x;
            this._EndY = y;
        }
        RoundedRect(x: number, y: number, width: number, height: number, radiusX: number, radiusY: number) {
            this._Path.push(RectRounded(x, y, width, height, radiusX, radiusY));
            this._EndX = x;
            this._EndY = y;
        }
        QuadraticBezier(cpx: number, cpy: number, x: number, y: number) {
            this._Path.push(QuadraticBezier(cpx, cpy, x, y));
            this._EndX = x;
            this._EndY = y;
        }
        CubicBezier(cp1x: number, cp1y: number, cp2x: number, cp2y: number, x: number, y: number) {
            this._Path.push(CubicBezier(cp1x, cp1y, cp2x, cp2y, x, y));
            this._EndX = x;
            this._EndY = y;
        }
        Ellipse(x: number, y: number, width: number, height: number) {
            this._Path.push(Ellipse(x, y, width, height));
            this._EndX = x;
            this._EndY = y;
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
        CalculateBounds(pars?: IStrokeParameters): rect {
            var box = pars ? this._CalcStrokeBox(pars) : this._CalcFillBox();
            var r = new rect();
            rect.set(r, box.l, box.t, Math.max(0, box.r - box.l), Math.max(0, box.b - box.t));
            return r;
        }
        private _CalcFillBox(): IBoundingBox {
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
                entry.extendFillBox(box, prevX, prevY);
                if (!entry.isSingle) {
                    prevX = (<any>entry).x;
                    prevY = (<any>entry).y;
                }
            }
            return box;
        }
        private _CalcStrokeBox(pars: IStrokeParameters): IBoundingBox {
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
                entry.extendStrokeBox(box, pars, prevX, prevY, i === 0, (i + 1) === len);
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