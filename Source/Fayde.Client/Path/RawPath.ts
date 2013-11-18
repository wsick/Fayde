
module Fayde.Path {
    //NOTE: HTML5 Canvas does not support start and end cap. 
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
        extendStrokeBox: (box: IBoundingBox, pars: IStrokeParameters, prevX: number, prevY: number) => void;
        //Start Vector must be in direction of path at start
        getStartVector(): number[];
        //End Vector must be in direction of path at end
        getEndVector(): number[];
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
                l: Number.POSITIVE_INFINITY,
                r: Number.NEGATIVE_INFINITY,
                t: Number.POSITIVE_INFINITY,
                b: Number.NEGATIVE_INFINITY
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
            var box: IBoundingBox = {
                l: Number.POSITIVE_INFINITY,
                r: Number.NEGATIVE_INFINITY,
                t: Number.POSITIVE_INFINITY,
                b: Number.NEGATIVE_INFINITY
            };
            processStrokedBounds(box, this._Path, pars);
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
    function expandStartCap(box: IBoundingBox, p: number[], d: number[], pars: IStrokeParameters) {
        var hs = pars.thickness / 2.0;
        var cap = pars.startCap || pars.endCap || 0; //HTML5 doesn't support start and end cap
        switch (cap) {
            case Shapes.PenLineCap.Round:
                box.l = Math.min(box.l, p[0] - hs);
                box.r = Math.max(box.r, p[0] + hs);
                box.t = Math.min(box.t, p[1] - hs);
                box.b = Math.max(box.b, p[1] + hs);
                break;
            case Shapes.PenLineCap.Square:
                break;
            case Shapes.PenLineCap.Flat:
            default:
                break;
        }
    }
    function expandEndCap(box: IBoundingBox, p: number[], d: number[], pars: IStrokeParameters) {
        var hs = pars.thickness / 2.0;
        var cap = pars.startCap || pars.endCap || 0; //HTML5 doesn't support start and end cap
        switch (cap) {
            case Shapes.PenLineCap.Round:
                box.l = Math.min(box.l, p[0] - hs);
                box.r = Math.max(box.r, p[0] + hs);
                box.t = Math.min(box.t, p[1] - hs);
                box.b = Math.max(box.b, p[1] + hs);
                break;
            case Shapes.PenLineCap.Square:
                break;
            case Shapes.PenLineCap.Flat:
            default:
                break;
        }
    }
    function expandLineJoin(box: IBoundingBox, p: number[], nd: number[], xd: number[], pars: IStrokeParameters) {
        var hs = pars.thickness / 2.0;
        switch (pars.join) {
            case Shapes.PenLineJoin.Miter:
                break;
            case Shapes.PenLineJoin.Round:
                box.l = Math.min(box.l, p[0] - hs);
                box.r = Math.max(box.r, p[0] + hs);
                box.t = Math.min(box.t, p[1] - hs);
                box.b = Math.max(box.b, p[1] + hs);
                break;
            case Shapes.PenLineJoin.Bevel:
            default:
                break;
        }
    }

    function processStrokedBounds(box: IBoundingBox, entries: IPathEntry[], pars: IStrokeParameters) {
        var len = entries.length;
        var last: IPathEntry = null;
        var prev: number[] = [null, null];

        var isLastEntryMove = false;

        function processEntry(entry: IPathEntry, i: number) {
            if (!entry.isSingle) {
                if (!(<IMove>entry).isMove && isLastEntryMove)
                    expandStartCap(box, prev, entry.getStartVector(), pars);
                if (!isLastEntryMove && i > 0)
                    expandLineJoin(box, prev, last.getEndVector(), entry.getStartVector(), pars);
            }

            entry.extendStrokeBox(box, pars, prev[0], prev[1]);

            if (!entry.isSingle) {
                prev[0] = (<any>entry).x;
                prev[1] = (<any>entry).y;
                if (i + 1 >= len)
                    expandEndCap(box, prev, entry.getEndVector(), pars);
            }

            isLastEntryMove = !!(<IMove>entry).isMove;
            last = entry;
        }

        for (var i = 0; i < len; i++) {
            processEntry(entries[i], i);
        }
    }
}