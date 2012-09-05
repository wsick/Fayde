function GradientMetrics() {
}

//#region Direction Calculations

//+x,0y
GradientMetrics.prototype.E = function (dir, first, last, bounds) {
    var maxX = bounds.X + bounds.Width;
    while (first.x > bounds.X)
        first.x -= dir.x;
    while (last.x < maxX)
        last.x += dir.x;
};
//-x,0y
GradientMetrics.prototype.W = function (dir, first, last, bounds) {
    var maxX = bounds.X + bounds.Width;
    while (first.x < maxX)
        first.x -= dir.x;
    while (last.x > bounds.X)
        last.x += dir.x;
};

//0x,+y
GradientMetrics.prototype.S = function (dir, first, last, bounds) {
    var maxY = bounds.Y + bounds.Height;
    while (first.y > bounds.Y)
        first.y -= dir.y;
    while (last.y < maxY)
        last.y += dir.y;
};
//0x,-y
GradientMetrics.prototype.N = function (dir, first, last, bounds) {
    var maxY = bounds.Y + bounds.Height;
    while (first.y < maxY)
        first.y -= dir.y;
    while (last.y > bounds.Y)
        last.y += dir.y;
};

//-x,-y
GradientMetrics.prototype.NW = function (dir, first, last, bounds) {
    var maxX = bounds.X + bounds.Width;
    var maxY = bounds.Y + bounds.Height;
    while (first.x < maxX && first.y < maxY) {
        first.x -= dir.x;
        first.y -= dir.y;
    }
    while (last.x > bounds.X && last.y > bounds.Y) {
        last.x += dir.x;
        last.y += dir.y;
    }

};
//-x,+y
GradientMetrics.prototype.SW = function (dir, first, last, bounds) {
    var maxX = bounds.X + bounds.Width;
    var maxY = bounds.Y + bounds.Height;
    while (first.x < maxX && first.y > bounds.Y) {
        first.x -= dir.x;
        first.y -= dir.y;
    }
    while (last.x > bounds.X && last.y < maxY) {
        last.x += dir.x;
        last.y += dir.y;
    }
};

//+x,-y
GradientMetrics.prototype.NE = function (dir, first, last, bounds) {
    var maxX = bounds.X + bounds.Width;
    var maxY = bounds.Y + bounds.Height;
    while (first.x > bounds.X && first.y < maxY) {
        first.x -= dir.x;
        first.y -= dir.y;
    }
    while (last.x < maxX && last.y > bounds.Y) {
        last.x += dir.x;
        last.y += dir.y;
    }
};
//+x,+y
GradientMetrics.prototype.SE = function (dir, first, last, bounds) {
    var maxX = bounds.X + bounds.Width;
    var maxY = bounds.Y + bounds.Height;
    while (first.x > bounds.X && first.y > bounds.Y) {
        first.x -= dir.x;
        first.y -= dir.y;
    }
    while (last.x < maxX && last.y < maxY) {
        last.x += dir.x;
        last.y += dir.y;
    }
};

//#endregion

GradientMetrics.Calculate = function (dir, first, last, bounds) {
    var instance = GradientMetrics.Instance;
    if (dir.y === 0) {
        if (dir.x < 0)
            instance.W(dir, first, last, bounds);
        else
            instance.E(dir, first, last, bounds);
    } else if (dir.x === 0) {
        if (dir.y < 0)
            instance.N(dir, first, last, bounds);
        else
            instance.S(dir, first, last, bounds);
    } else if (dir.x < 0 && dir.y < 0) { // e\s
        instance.NW(dir, first, last, bounds);
    } else if (dir.x < 0 && dir.y > 0) { // e/s
        instance.SW(dir, first, last, bounds);
    } else if (dir.x > 0 && dir.y < 0) { // s/e
        instance.NE(dir, first, last, bounds);
    } else if (dir.x > 0 && dir.y > 0) { // s\e
        instance.SE(dir, first, last, bounds);
    }
};

GradientMetrics.Instance = new GradientMetrics();