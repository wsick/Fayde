/// <reference path="Brush.ts" />

module Fayde.Media {
    export class SolidColorBrush extends Brush {
        static ColorProperty = DependencyProperty.Register("Color", () => Color, SolidColorBrush, undefined, (d, args) => (<Brush>d).InvalidateBrush());
        Color: Color;

        constructor(...args: any[]) {
            super();
            if (args && args.length === 1 && args[0] instanceof Color)
                this.Color = args[0];
        }

        isTransparent(): boolean {
            var color = this.Color;
            return !color || (color.A <= 0);
        }

        static FromColor(color: Color): SolidColorBrush {
            var scb = new SolidColorBrush();
            scb.Color = color;
            return scb;
        }

        CreateBrush(ctx: CanvasRenderingContext2D, bounds: minerva.Rect): any {
            var color = this.Color;
            if (!color)
                return "#000000";
            return color.toString();
        }
    }
    Fayde.RegisterType(SolidColorBrush, "Fayde.Media", Fayde.XMLNS);

    function brushConverter(val: any): Brush {
        if (!val)
            return undefined;
        if (val instanceof Brush)
            return val;
        var scb = new SolidColorBrush();
        scb.Color = Fayde.ConvertAnyToType(val, Color);
        return scb;
    }

    Fayde.RegisterTypeConverter(Brush, brushConverter);
    Fayde.RegisterTypeConverter(SolidColorBrush, brushConverter);
}