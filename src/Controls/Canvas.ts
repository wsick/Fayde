/// <reference path="Panel.ts" />

module Fayde.Controls {
    export class Canvas extends Panel {
        CreateLayoutUpdater() { return new minerva.controls.canvas.CanvasUpdater(); }

        static TopProperty: DependencyProperty = DependencyProperty.RegisterAttached("Top", () => Number, Canvas, 0.0);
        static GetTop(d: DependencyObject): number { return d.GetValue(Canvas.TopProperty); }
        static SetTop(d: DependencyObject, value: number) { d.SetValue(Canvas.TopProperty, value); }
        static LeftProperty: DependencyProperty = DependencyProperty.RegisterAttached("Left", () => Number, Canvas, 0.0);
        static GetLeft(d: DependencyObject): number { return d.GetValue(Canvas.LeftProperty); }
        static SetLeft(d: DependencyObject, value: number) { d.SetValue(Canvas.LeftProperty, value); }
    }
    Fayde.RegisterType(Canvas, "Fayde.Controls", Fayde.XMLNS);

    module reactions {
        UIReactionAttached<number>(Canvas.TopProperty, (upd, ov, nv, uie?) => invalidateTopLeft(upd, uie));
        UIReactionAttached<number>(Canvas.LeftProperty, (upd, ov, nv, uie?) => invalidateTopLeft(upd, uie));
        function invalidateTopLeft (updater: minerva.core.Updater, uie: UIElement) {
            var vp = updater.tree.visualParent;
            if (updater instanceof Canvas && !vp) {
                updater.assets.dirtyFlags |= minerva.DirtyFlags.LocalTransform;
                minerva.core.Updater.$$addDownDirty(updater);
                updater.invalidateArrange();
            }

            if (!(vp instanceof minerva.controls.canvas.CanvasUpdater))
                return;

            var ls = updater.assets.layoutSlot;
            minerva.Size.copyTo(updater.assets.desiredSize, ls);
            ls.x = uie.GetValue(Canvas.LeftProperty);
            ls.y = uie.GetValue(Canvas.TopProperty);
            if (updater.assets.useLayoutRounding) {
                ls.x = Math.round(ls.x);
                ls.y = Math.round(ls.y);
                ls.width = Math.round(ls.width);
                ls.height = Math.round(ls.height);
            }
            updater.invalidateArrange();
        }
    }
}