module Fayde.Media {
    export interface ICoordinates {
        x: number;
        y: number;
    }

    export class GradientMetrics {
        static Calculate (dir: ICoordinates, first: ICoordinates, last: ICoordinates, bounds: minerva.Rect) {
            if (dir.y === 0) {
                if (dir.x < 0)
                    GradientMetrics.W(dir, first, last, bounds);
                else
                    GradientMetrics.E(dir, first, last, bounds);
            } else if (dir.x === 0) {
                if (dir.y < 0)
                    GradientMetrics.N(dir, first, last, bounds);
                else
                    GradientMetrics.S(dir, first, last, bounds);
            } else if (dir.x < 0 && dir.y < 0) { // e\s
                GradientMetrics.NW(dir, first, last, bounds);
            } else if (dir.x < 0 && dir.y > 0) { // e/s
                GradientMetrics.SW(dir, first, last, bounds);
            } else if (dir.x > 0 && dir.y < 0) { // s/e
                GradientMetrics.NE(dir, first, last, bounds);
            } else if (dir.x > 0 && dir.y > 0) { // s\e
                GradientMetrics.SE(dir, first, last, bounds);
            }
        }

        //+x,0y
        private static E (dir: ICoordinates, first: ICoordinates, last: ICoordinates, bounds: minerva.Rect) {
            var maxX = bounds.x + bounds.width;
            while (first.x >= bounds.x)
                first.x -= dir.x;
            while (last.x <= maxX)
                last.x += dir.x;
        }

        //-x,0y
        private static W (dir: ICoordinates, first: ICoordinates, last: ICoordinates, bounds: minerva.Rect) {
            var maxX = bounds.x + bounds.width;
            while (first.x <= maxX)
                first.x -= dir.x;
            while (last.x >= bounds.x)
                last.x += dir.x;
        }

        //0x,+y
        private static S (dir: ICoordinates, first: ICoordinates, last: ICoordinates, bounds: minerva.Rect) {
            var maxY = bounds.y + bounds.height;
            while (first.y >= bounds.y)
                first.y -= dir.y;
            while (last.y <= maxY)
                last.y += dir.y;
        }

        //0x,-y
        private static N (dir: ICoordinates, first: ICoordinates, last: ICoordinates, bounds: minerva.Rect) {
            var maxY = bounds.y + bounds.height;
            while (first.y <= maxY)
                first.y -= dir.y;
            while (last.y >= bounds.y)
                last.y += dir.y;
        }

        //-x,-y
        private static NW (dir: ICoordinates, first: ICoordinates, last: ICoordinates, bounds: minerva.Rect) {
            var maxX = bounds.x + bounds.width;
            var maxY = bounds.y + bounds.height;
            while (first.x <= maxX && first.y <= maxY) {
                first.x -= dir.x;
                first.y -= dir.y;
            }
            while (last.x >= bounds.x && last.y >= bounds.y) {
                last.x += dir.x;
                last.y += dir.y;
            }

        }

        //-x,+y
        private static SW (dir: ICoordinates, first: ICoordinates, last: ICoordinates, bounds: minerva.Rect) {
            var maxX = bounds.x + bounds.width;
            var maxY = bounds.y + bounds.height;
            while (first.x <= maxX && first.y >= bounds.y) {
                first.x -= dir.x;
                first.y -= dir.y;
            }
            while (last.x >= bounds.x && last.y <= maxY) {
                last.x += dir.x;
                last.y += dir.y;
            }
        }

        //+x,-y
        private static NE (dir: ICoordinates, first: ICoordinates, last: ICoordinates, bounds: minerva.Rect) {
            var maxX = bounds.x + bounds.width;
            var maxY = bounds.y + bounds.height;
            while (first.x >= bounds.x && first.y <= maxY) {
                first.x -= dir.x;
                first.y -= dir.y;
            }
            while (last.x <= maxX && last.y >= bounds.y) {
                last.x += dir.x;
                last.y += dir.y;
            }
        }

        //+x,+y
        private static SE (dir: ICoordinates, first: ICoordinates, last: ICoordinates, bounds: minerva.Rect) {
            var maxX = bounds.x + bounds.width;
            var maxY = bounds.y + bounds.height;
            while (first.x >= bounds.x && first.y >= bounds.y) {
                first.x -= dir.x;
                first.y -= dir.y;
            }
            while (last.x <= maxX && last.y <= maxY) {
                last.x += dir.x;
                last.y += dir.y;
            }
        }
    }
}