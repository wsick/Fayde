var Fayde;
(function (Fayde) {
    /// CODE
    /// <reference path="../Primitives/rect.ts" />
    (function (Media) {
        var GradientMetrics = (function () {
            function GradientMetrics() { }
            GradientMetrics.Calculate = function Calculate(dir, first, last, bounds) {
                if(dir.y === 0) {
                    if(dir.x < 0) {
                        GradientMetrics.W(dir, first, last, bounds);
                    } else {
                        GradientMetrics.E(dir, first, last, bounds);
                    }
                } else if(dir.x === 0) {
                    if(dir.y < 0) {
                        GradientMetrics.N(dir, first, last, bounds);
                    } else {
                        GradientMetrics.S(dir, first, last, bounds);
                    }
                } else if(dir.x < 0 && dir.y < 0) {
                    // e\s
                    GradientMetrics.NW(dir, first, last, bounds);
                } else if(dir.x < 0 && dir.y > 0) {
                    // e/s
                    GradientMetrics.SW(dir, first, last, bounds);
                } else if(dir.x > 0 && dir.y < 0) {
                    // s/e
                    GradientMetrics.NE(dir, first, last, bounds);
                } else if(dir.x > 0 && dir.y > 0) {
                    // s\e
                    GradientMetrics.SE(dir, first, last, bounds);
                }
            };
            GradientMetrics.E = //+x,0y
            function E(dir, first, last, bounds) {
                var maxX = bounds.X + bounds.Width;
                while(first.x >= bounds.X) {
                    first.x -= dir.x;
                }
                while(last.x <= maxX) {
                    last.x += dir.x;
                }
            };
            GradientMetrics.W = //-x,0y
            function W(dir, first, last, bounds) {
                var maxX = bounds.X + bounds.Width;
                while(first.x <= maxX) {
                    first.x -= dir.x;
                }
                while(last.x >= bounds.X) {
                    last.x += dir.x;
                }
            };
            GradientMetrics.S = //0x,+y
            function S(dir, first, last, bounds) {
                var maxY = bounds.Y + bounds.Height;
                while(first.y >= bounds.Y) {
                    first.y -= dir.y;
                }
                while(last.y <= maxY) {
                    last.y += dir.y;
                }
            };
            GradientMetrics.N = //0x,-y
            function N(dir, first, last, bounds) {
                var maxY = bounds.Y + bounds.Height;
                while(first.y <= maxY) {
                    first.y -= dir.y;
                }
                while(last.y >= bounds.Y) {
                    last.y += dir.y;
                }
            };
            GradientMetrics.NW = //-x,-y
            function NW(dir, first, last, bounds) {
                var maxX = bounds.X + bounds.Width;
                var maxY = bounds.Y + bounds.Height;
                while(first.x <= maxX && first.y <= maxY) {
                    first.x -= dir.x;
                    first.y -= dir.y;
                }
                while(last.x >= bounds.X && last.y >= bounds.Y) {
                    last.x += dir.x;
                    last.y += dir.y;
                }
            };
            GradientMetrics.SW = //-x,+y
            function SW(dir, first, last, bounds) {
                var maxX = bounds.X + bounds.Width;
                var maxY = bounds.Y + bounds.Height;
                while(first.x <= maxX && first.y >= bounds.Y) {
                    first.x -= dir.x;
                    first.y -= dir.y;
                }
                while(last.x >= bounds.X && last.y <= maxY) {
                    last.x += dir.x;
                    last.y += dir.y;
                }
            };
            GradientMetrics.NE = //+x,-y
            function NE(dir, first, last, bounds) {
                var maxX = bounds.X + bounds.Width;
                var maxY = bounds.Y + bounds.Height;
                while(first.x >= bounds.X && first.y <= maxY) {
                    first.x -= dir.x;
                    first.y -= dir.y;
                }
                while(last.x <= maxX && last.y >= bounds.Y) {
                    last.x += dir.x;
                    last.y += dir.y;
                }
            };
            GradientMetrics.SE = //+x,+y
            function SE(dir, first, last, bounds) {
                var maxX = bounds.X + bounds.Width;
                var maxY = bounds.Y + bounds.Height;
                while(first.x >= bounds.X && first.y >= bounds.Y) {
                    first.x -= dir.x;
                    first.y -= dir.y;
                }
                while(last.x <= maxX && last.y <= maxY) {
                    last.x += dir.x;
                    last.y += dir.y;
                }
            };
            return GradientMetrics;
        })();
        Media.GradientMetrics = GradientMetrics;        
    })(Fayde.Media || (Fayde.Media = {}));
    var Media = Fayde.Media;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=GradientMetrics.js.map
