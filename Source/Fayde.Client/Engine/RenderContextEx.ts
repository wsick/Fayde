module Fayde {
    export interface RenderContextEx extends CanvasRenderingContext2D {
        currentTransform: number[];
        resetTransform();
        transformMatrix(mat: number[]);
        transformTransform(transform: Media.Transform);
        pretransformMatrix(mat: number[]);
        pretransformTransform(transform: Media.Transform);

        clear(r: rect);
        fillEx(brush: Media.Brush, r: rect);
        fillRectEx(brush: Media.Brush, r: rect);

        setupStroke(pars: Path.IStrokeParameters): boolean;
        strokeEx(brush: Media.Brush, pars: Path.IStrokeParameters, region: rect);
        isPointInStroke(x: number, y: number);
        isPointInStrokeEx(pars: Path.IStrokeParameters, x: number, y: number);

        clipRect(r: rect);
        clipGeometry(g: Media.Geometry);
    }

    export function ExtendRenderContext(ctx: CanvasRenderingContext2D): RenderContextEx {
        var c: any = ctx;
        Ex.Transforms(c);
        Ex.TransformEx(c);
        Ex.LineDash(c);
        Ex.Clear(c);
        Ex.Fill(c);
        Ex.Stroke(c);
        Ex.Clip(c);
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
            
            ctx.setTransform = function (m11: number, m12: number, m21: number, m22: number, dx: number, dy: number) {
                ctx.currentTransform = mat3.create([m11, m12, dx, m21, m22, dy, 0, 0, 1]);
                super_.setTransform.call(ctx, m11, m12, m21, m22, dx, dy);
            };
            
            ctx.resetTransform = function () {
                ctx.currentTransform = mat3.identity();
                if ((<any>super_).resetTransform)
                    (<any>super_).resetTransform.call(ctx);
            };
            ctx.transform = function (m11: number, m12: number, m21: number, m22: number, dx: number, dy: number) {
                var ct = ctx.currentTransform;
                mat3.multiply(ct, mat3.create([m11, m12, dx, m21, m22, dy, 0, 0, 1]), ct);
                super_.transform.call(ctx, m11, m12, m21, m22, dx, dy);
                ctx.currentTransform = ct;
            };
            ctx.rotate = function (angle: number) {
                var ct = ctx.currentTransform;
                var r = mat3.createRotate(angle);
                mat3.multiply(ct, r, ct);
                super_.rotate.call(ctx, angle);
            };
            ctx.scale = function (x: number, y: number) {
                var ct = ctx.currentTransform;
                mat3.scale(ct, x, y);
                super_.scale.call(ctx, x, y);
            };
            ctx.translate = function (x: number, y: number) {
                var ct = ctx.currentTransform;
                mat3.translate(ct, x, y);
                super_.translate.call(ctx, x, y);
            };

            return false;
        }
        export function TransformEx(ctx: RenderContextEx) {
            ctx.transformMatrix = function (mat: number[]) {
                var ct = ctx.currentTransform;
                mat3.multiply(ct, mat, ct); //ct = matrix * ct
                ctx.setTransform(ct[0], ct[1], ct[3], ct[4], ct[2], ct[5]);
            };
            ctx.transformTransform = function (transform: Media.Transform) {
                var v = transform.Value;
                var mat: number[];
                if (!v || !(mat = v._Raw))
                    return;
                ctx.transformMatrix(mat);
            };
            ctx.pretransformMatrix = function (mat: number[]) {
                var ct = ctx.currentTransform;
                mat3.multiply(mat, ct, ct); //ct = ct * matrix
                ctx.setTransform(ct[0], ct[1], ct[3], ct[4], ct[2], ct[5]);
            };
            ctx.pretransformTransform = function (transform: Media.Transform) {
                var v = transform.Value;
                var mat: number[];
                if (!v || !(mat = v._Raw))
                    return;
                ctx.pretransformMatrix(mat);
            };
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
        export function Fill(ctx: RenderContextEx) {
            ctx.fillEx = function (brush: Media.Brush, r: rect) {
                brush.SetupBrush(ctx, r);
                ctx.fillStyle = brush.ToHtml5Object();
                ctx.fill();
            };
            ctx.fillRectEx = function (brush: Media.Brush, r: rect) {
                brush.SetupBrush(ctx, r);
                ctx.fillStyle = brush.ToHtml5Object();
                ctx.beginPath();
                ctx.rect(r.X, r.Y, r.Width, r.Height);
                ctx.fill();
            };
        }
        export function Stroke(ctx: RenderContextEx) {
            var caps: string[] = [
                "butt", //flat
                "square", //square
                "round", //round
                "butt" //triangle
            ];
            var joins: string[] = [
                "miter",
                "bevel",
                "round"
            ];
            ctx.setupStroke = function (pars: Path.IStrokeParameters): boolean {
                if (!pars) return false;
                ctx.lineWidth = pars.thickness;
                ctx.lineCap = caps[pars.startCap || pars.endCap || 0] || caps[0];
                ctx.lineJoin = joins[pars.join || 0] || joins[0];
                ctx.miterLimit = pars.miterLimit;
                return true;
            };
            ctx.strokeEx = function (brush: Media.Brush, pars: Path.IStrokeParameters, region: rect) {
                if (!region || !ctx.setupStroke(pars))
                    return;
                brush.SetupBrush(ctx, region);
                ctx.strokeStyle = brush.ToHtml5Object();
                ctx.stroke();
            };
            ctx.isPointInStroke = ctx.isPointInStroke || function (x: number, y: number) { return false; };
            ctx.isPointInStrokeEx = function (pars: Path.IStrokeParameters, x: number, y: number): boolean {
                if (!pars) return;
                ctx.setupStroke(pars);
                return ctx.isPointInStroke(x, y);
            };
        }
        export function Clip(ctx: RenderContextEx) {
            ctx.clipRect = function (r: rect) {
                ctx.beginPath();
                ctx.rect(r.X, r.Y, r.Width, r.Height);
                ctx.clip();
            };
            ctx.clipGeometry = function (g: Media.Geometry) {
                g.Draw(ctx);
                ctx.clip();
            };
        }
    }
}