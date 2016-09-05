export function load() {
    QUnit.module("LinearGradientBrush");

    test("LinearGradientBrush", () => {
        var radBrush = new Fayde.Media.LinearGradientBrush();
        var g1 = new Fayde.Media.GradientStop();
        g1.Offset = 0.982;
        radBrush.GradientStops.Add(g1);
        var canvas = <CanvasRenderingContext2D>document.createElement('canvas').getContext('2d');
        var bounds = new minerva.Rect();
        bounds.width = 10;
        bounds.height = 10;
        bounds.x = 1;
        bounds.y = 1;
        var pad = radBrush.CreatePad(canvas, bounds);
        ok(pad, "Pad should be ok even when no gradient stop color is passed.");
    });
}