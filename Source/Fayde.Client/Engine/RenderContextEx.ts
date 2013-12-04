module Fayde {
    export interface RenderContextEx extends CanvasRenderingContext2D {
        currentTransform: number[];
        clear(r: rect);
    }

    export function ExtendRenderContext(ctx: CanvasRenderingContext2D): RenderContextEx {
        var c: any = ctx;
        Ex.Transforms(c);
        Ex.LineDash(c);
        Ex.Clear(c);
        return <RenderContextEx>c;
    }

    module Ex {
        export function Transforms(ctx: RenderContextEx): boolean {
            var hasct = !!Object.getOwnPropertyDescriptor(ctx, "currentTransform");
            if (hasct)
                return true;
            var mozct = Object.getOwnPropertyDescriptor(ctx, "mozCurrentTransform");
            if (mozct) {
                Object.defineProperty(ctx, "currentTransform", {
                    get: function () { return (<any>ctx).mozCurrentTransform; },
                    set: function (value) { (<any>ctx).mozCurrentTransform = value; }
                });
                return true;
            }

            //No browser implementation of currentTransform, we need to polyfill
            var transforms: number[][] = [];
            var super_ = CanvasRenderingContext2D.prototype;

            ctx.save = function () {
                super_.save.call(ctx);
                var ct = ctx.currentTransform;
                transforms.push(ct);
                ctx.currentTransform = !ct ? mat3.identity() : mat3.create(ct);
            };
            ctx.restore = function () {
                var cur = transforms.pop();
                ctx.currentTransform = cur;
                super_.restore.call(ctx);
            };

            ctx.transform = function (m11: number, m12: number, m21: number, m22: number, dx: number, dy: number) {
                var ct = ctx.currentTransform;
                mat3.multiply(ct, mat3.create([m11, m12, dx, m21, m22, dy]), ct);
                ctx.transform(m11, m12, m21, m22, dx, dy);
                ctx.currentTransform = ct;
            };
            ctx.rotate = function (angle: number) {
                var ct = ctx.currentTransform;
                var r = mat3.createRotate(angle);
                mat3.multiply(ct, r, ct);
                ctx.rotate(angle);
            };
            ctx.scale = function (x: number, y: number) {
                var ct = ctx.currentTransform;
                mat3.scale(ct, x, y);
                ctx.scale(x, y);
            };
            ctx.translate = function (x: number, y: number) {
                var ct = ctx.currentTransform;
                mat3.translate(ct, x, y);
                ctx.translate(x, y);
            };

            return false;
        }
        export function LineDash(ctx: RenderContextEx) {
            if (!ctx.setLineDash)
                ctx.setLineDash = function (segments: number[]) { };
        }
        export function Clear(ctx: RenderContextEx) {
            ctx.clear = function (r: rect) {
                ctx.clearRect(r.X, r.Y, r.Width, r.Height);
            };
        }
    }
}