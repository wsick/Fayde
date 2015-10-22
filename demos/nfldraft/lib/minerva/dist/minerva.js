var minerva;
(function (minerva) {
    minerva.version = '0.7.2';
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    (function (HorizontalAlignment) {
        HorizontalAlignment[HorizontalAlignment["Left"] = 0] = "Left";
        HorizontalAlignment[HorizontalAlignment["Center"] = 1] = "Center";
        HorizontalAlignment[HorizontalAlignment["Right"] = 2] = "Right";
        HorizontalAlignment[HorizontalAlignment["Stretch"] = 3] = "Stretch";
    })(minerva.HorizontalAlignment || (minerva.HorizontalAlignment = {}));
    var HorizontalAlignment = minerva.HorizontalAlignment;
    (function (VerticalAlignment) {
        VerticalAlignment[VerticalAlignment["Top"] = 0] = "Top";
        VerticalAlignment[VerticalAlignment["Center"] = 1] = "Center";
        VerticalAlignment[VerticalAlignment["Bottom"] = 2] = "Bottom";
        VerticalAlignment[VerticalAlignment["Stretch"] = 3] = "Stretch";
    })(minerva.VerticalAlignment || (minerva.VerticalAlignment = {}));
    var VerticalAlignment = minerva.VerticalAlignment;
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var CornerRadius = (function () {
        function CornerRadius(topLeft, topRight, bottomRight, bottomLeft) {
            this.topLeft = topLeft == null ? 0 : topLeft;
            this.topRight = topRight == null ? 0 : topRight;
            this.bottomRight = bottomRight == null ? 0 : bottomRight;
            this.bottomLeft = bottomLeft == null ? 0 : bottomLeft;
        }
        CornerRadius.isEmpty = function (cr) {
            return cr.topLeft === 0
                && cr.topRight === 0
                && cr.bottomRight === 0
                && cr.bottomLeft === 0;
        };
        CornerRadius.isEqual = function (cr1, cr2) {
            return cr1.topLeft === cr2.topLeft
                && cr1.topRight === cr2.topRight
                && cr1.bottomRight === cr2.bottomRight
                && cr1.bottomLeft === cr2.bottomLeft;
        };
        CornerRadius.clear = function (dest) {
            dest.topLeft = dest.topRight = dest.bottomRight = dest.bottomLeft = 0;
        };
        CornerRadius.copyTo = function (cr2, dest) {
            dest.topLeft = cr2.topLeft;
            dest.topRight = cr2.topRight;
            dest.bottomRight = cr2.bottomRight;
            dest.bottomLeft = cr2.bottomLeft;
        };
        return CornerRadius;
    })();
    minerva.CornerRadius = CornerRadius;
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    (function (Orientation) {
        Orientation[Orientation["Horizontal"] = 0] = "Horizontal";
        Orientation[Orientation["Vertical"] = 1] = "Vertical";
    })(minerva.Orientation || (minerva.Orientation = {}));
    var Orientation = minerva.Orientation;
    (function (PenLineJoin) {
        PenLineJoin[PenLineJoin["Miter"] = 0] = "Miter";
        PenLineJoin[PenLineJoin["Bevel"] = 1] = "Bevel";
        PenLineJoin[PenLineJoin["Round"] = 2] = "Round";
    })(minerva.PenLineJoin || (minerva.PenLineJoin = {}));
    var PenLineJoin = minerva.PenLineJoin;
    (function (PenLineCap) {
        PenLineCap[PenLineCap["Flat"] = 0] = "Flat";
        PenLineCap[PenLineCap["Square"] = 1] = "Square";
        PenLineCap[PenLineCap["Round"] = 2] = "Round";
        PenLineCap[PenLineCap["Triangle"] = 3] = "Triangle";
    })(minerva.PenLineCap || (minerva.PenLineCap = {}));
    var PenLineCap = minerva.PenLineCap;
    (function (FillRule) {
        FillRule[FillRule["EvenOdd"] = 0] = "EvenOdd";
        FillRule[FillRule["NonZero"] = 1] = "NonZero";
    })(minerva.FillRule || (minerva.FillRule = {}));
    var FillRule = minerva.FillRule;
    (function (Stretch) {
        Stretch[Stretch["None"] = 0] = "None";
        Stretch[Stretch["Fill"] = 1] = "Fill";
        Stretch[Stretch["Uniform"] = 2] = "Uniform";
        Stretch[Stretch["UniformToFill"] = 3] = "UniformToFill";
    })(minerva.Stretch || (minerva.Stretch = {}));
    var Stretch = minerva.Stretch;
    (function (FlowDirection) {
        FlowDirection[FlowDirection["LeftToRight"] = 0] = "LeftToRight";
        FlowDirection[FlowDirection["RightToLeft"] = 1] = "RightToLeft";
    })(minerva.FlowDirection || (minerva.FlowDirection = {}));
    var FlowDirection = minerva.FlowDirection;
    (function (LineStackingStrategy) {
        LineStackingStrategy[LineStackingStrategy["MaxHeight"] = 0] = "MaxHeight";
        LineStackingStrategy[LineStackingStrategy["BlockLineHeight"] = 1] = "BlockLineHeight";
    })(minerva.LineStackingStrategy || (minerva.LineStackingStrategy = {}));
    var LineStackingStrategy = minerva.LineStackingStrategy;
    (function (TextAlignment) {
        TextAlignment[TextAlignment["Left"] = 0] = "Left";
        TextAlignment[TextAlignment["Center"] = 1] = "Center";
        TextAlignment[TextAlignment["Right"] = 2] = "Right";
        TextAlignment[TextAlignment["Justify"] = 3] = "Justify";
    })(minerva.TextAlignment || (minerva.TextAlignment = {}));
    var TextAlignment = minerva.TextAlignment;
    (function (TextTrimming) {
        TextTrimming[TextTrimming["None"] = 0] = "None";
        TextTrimming[TextTrimming["WordEllipsis"] = 1] = "WordEllipsis";
        TextTrimming[TextTrimming["CharacterEllipsis"] = 2] = "CharacterEllipsis";
    })(minerva.TextTrimming || (minerva.TextTrimming = {}));
    var TextTrimming = minerva.TextTrimming;
    (function (TextWrapping) {
        TextWrapping[TextWrapping["NoWrap"] = 0] = "NoWrap";
        TextWrapping[TextWrapping["Wrap"] = 1] = "Wrap";
        TextWrapping[TextWrapping["WrapWithOverflow"] = 2] = "WrapWithOverflow";
    })(minerva.TextWrapping || (minerva.TextWrapping = {}));
    var TextWrapping = minerva.TextWrapping;
    (function (TextDecorations) {
        TextDecorations[TextDecorations["None"] = 0] = "None";
        TextDecorations[TextDecorations["Underline"] = 1] = "Underline";
    })(minerva.TextDecorations || (minerva.TextDecorations = {}));
    var TextDecorations = minerva.TextDecorations;
    (function (FontWeight) {
        FontWeight[FontWeight["Thin"] = 100] = "Thin";
        FontWeight[FontWeight["ExtraLight"] = 200] = "ExtraLight";
        FontWeight[FontWeight["Light"] = 300] = "Light";
        FontWeight[FontWeight["Normal"] = 400] = "Normal";
        FontWeight[FontWeight["Medium"] = 500] = "Medium";
        FontWeight[FontWeight["SemiBold"] = 600] = "SemiBold";
        FontWeight[FontWeight["Bold"] = 700] = "Bold";
        FontWeight[FontWeight["ExtraBold"] = 800] = "ExtraBold";
        FontWeight[FontWeight["Black"] = 900] = "Black";
        FontWeight[FontWeight["ExtraBlack"] = 950] = "ExtraBlack";
    })(minerva.FontWeight || (minerva.FontWeight = {}));
    var FontWeight = minerva.FontWeight;
    (function (SweepDirection) {
        SweepDirection[SweepDirection["Counterclockwise"] = 0] = "Counterclockwise";
        SweepDirection[SweepDirection["Clockwise"] = 1] = "Clockwise";
    })(minerva.SweepDirection || (minerva.SweepDirection = {}));
    var SweepDirection = minerva.SweepDirection;
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    (function (DirtyFlags) {
        DirtyFlags[DirtyFlags["Transform"] = 1] = "Transform";
        DirtyFlags[DirtyFlags["LocalTransform"] = 2] = "LocalTransform";
        DirtyFlags[DirtyFlags["Clip"] = 8] = "Clip";
        DirtyFlags[DirtyFlags["LocalClip"] = 16] = "LocalClip";
        DirtyFlags[DirtyFlags["LayoutClip"] = 32] = "LayoutClip";
        DirtyFlags[DirtyFlags["RenderVisibility"] = 64] = "RenderVisibility";
        DirtyFlags[DirtyFlags["HitTestVisibility"] = 128] = "HitTestVisibility";
        DirtyFlags[DirtyFlags["ImageMetrics"] = 256] = "ImageMetrics";
        DirtyFlags[DirtyFlags["Measure"] = 512] = "Measure";
        DirtyFlags[DirtyFlags["Arrange"] = 1024] = "Arrange";
        DirtyFlags[DirtyFlags["Bounds"] = 1048576] = "Bounds";
        DirtyFlags[DirtyFlags["NewBounds"] = 2097152] = "NewBounds";
        DirtyFlags[DirtyFlags["Invalidate"] = 4194304] = "Invalidate";
        DirtyFlags[DirtyFlags["InUpDirtyList"] = 1073741824] = "InUpDirtyList";
        DirtyFlags[DirtyFlags["InDownDirtyList"] = -2147483648] = "InDownDirtyList";
        DirtyFlags[DirtyFlags["DownDirtyState"] = 507] = "DownDirtyState";
        DirtyFlags[DirtyFlags["UpDirtyState"] = 7340032] = "UpDirtyState";
        DirtyFlags[DirtyFlags["PropagateDown"] = 225] = "PropagateDown";
    })(minerva.DirtyFlags || (minerva.DirtyFlags = {}));
    var DirtyFlags = minerva.DirtyFlags;
    (function (UIFlags) {
        UIFlags[UIFlags["None"] = 0] = "None";
        UIFlags[UIFlags["RenderVisible"] = 2] = "RenderVisible";
        UIFlags[UIFlags["HitTestVisible"] = 4] = "HitTestVisible";
        UIFlags[UIFlags["TotalRenderVisible"] = 8] = "TotalRenderVisible";
        UIFlags[UIFlags["TotalHitTestVisible"] = 16] = "TotalHitTestVisible";
        UIFlags[UIFlags["MeasureHint"] = 2048] = "MeasureHint";
        UIFlags[UIFlags["ArrangeHint"] = 4096] = "ArrangeHint";
        UIFlags[UIFlags["SizeHint"] = 8192] = "SizeHint";
        UIFlags[UIFlags["Hints"] = 14336] = "Hints";
    })(minerva.UIFlags || (minerva.UIFlags = {}));
    var UIFlags = minerva.UIFlags;
    (function (ShapeFlags) {
        ShapeFlags[ShapeFlags["None"] = 0] = "None";
        ShapeFlags[ShapeFlags["Empty"] = 1] = "Empty";
        ShapeFlags[ShapeFlags["Normal"] = 2] = "Normal";
        ShapeFlags[ShapeFlags["Degenerate"] = 4] = "Degenerate";
        ShapeFlags[ShapeFlags["Radii"] = 8] = "Radii";
    })(minerva.ShapeFlags || (minerva.ShapeFlags = {}));
    var ShapeFlags = minerva.ShapeFlags;
})(minerva || (minerva = {}));
/// <reference path="Enums.ts" />
var minerva;
(function (minerva) {
    minerva.FontStyle = {
        Normal: "normal",
        Italic: "italic",
        Oblique: "oblique"
    };
    minerva.FontStretch = {
        UltraCondensed: "ultra-condensed",
        ExtraCondensed: "extra-condensed",
        Condensed: "condensed",
        SemiCondensed: "semi-condensed",
        Normal: "normal",
        SemiExpanded: "semi-expanded",
        Expanded: "expanded",
        ExtraExpanded: "extra-expanded",
        UltraExpanded: "ultra-expanded"
    };
    var Font = (function () {
        function Font() {
            this.family = Font.DEFAULT_FAMILY;
            this.size = Font.DEFAULT_SIZE;
            this.stretch = Font.DEFAULT_STRETCH;
            this.style = Font.DEFAULT_STYLE;
            this.weight = Font.DEFAULT_WEIGHT;
            this.$$cachedObj = null;
            this.$$cachedHeight = null;
        }
        Font.mergeInto = function (font, family, size, stretch, style, weight) {
            var changed = font.family !== family
                || font.size !== size
                || font.stretch !== stretch
                || font.style !== style
                || font.weight !== weight;
            font.family = family;
            font.size = size;
            font.stretch = stretch;
            font.style = style;
            font.weight = weight;
            if (changed) {
                font.$$cachedObj = null;
                font.$$cachedHeight = null;
            }
            return changed;
        };
        Font.prototype.toHtml5Object = function () {
            return this.$$cachedObj = this.$$cachedObj || translateFont(this);
        };
        Font.prototype.getHeight = function () {
            if (this.$$cachedHeight == null)
                this.$$cachedHeight = minerva.fontHeight.get(this);
            return this.$$cachedHeight;
        };
        Font.prototype.getAscender = function () {
            return 0;
        };
        Font.prototype.getDescender = function () {
            return 0;
        };
        Font.DEFAULT_FAMILY = "Segoe UI, Lucida Grande, Verdana";
        Font.DEFAULT_STRETCH = minerva.FontStretch.Normal;
        Font.DEFAULT_STYLE = minerva.FontStyle.Normal;
        Font.DEFAULT_WEIGHT = minerva.FontWeight.Normal;
        Font.DEFAULT_SIZE = 14;
        return Font;
    })();
    minerva.Font = Font;
    function translateFont(font) {
        var s = "";
        s += font.style.toString() + " ";
        s += "normal ";
        s += font.weight.toString() + " ";
        s += font.size + "px ";
        s += font.family.toString();
        return s;
    }
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var fontHeight;
    (function (fontHeight) {
        var heights = [];
        fontHeight.cache = {
            hits: 0,
            misses: 0
        };
        function get(font) {
            var serial = font.toHtml5Object();
            var height = heights[serial];
            if (height == null) {
                heights[serial] = height = measure(serial);
                fontHeight.cache.misses++;
            }
            else {
                fontHeight.cache.hits++;
            }
            return height;
        }
        fontHeight.get = get;
        var dummy;
        function measure(serial) {
            perfex.timer.start('MeasureFontHeight', serial);
            if (!dummy) {
                dummy = document.createElement("div");
                dummy.appendChild(document.createTextNode("Hg"));
                document.body.appendChild(dummy);
            }
            dummy.style.display = "";
            dummy.style.font = serial;
            var result = dummy.offsetHeight;
            dummy.style.display = "none";
            perfex.timer.stop();
            return result;
        }
    })(fontHeight = minerva.fontHeight || (minerva.fontHeight = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var FakeBrush = (function () {
        function FakeBrush(raw) {
            this.raw = raw;
        }
        FakeBrush.prototype.isTransparent = function () {
            return false;
        };
        FakeBrush.prototype.setupBrush = function (ctx, region) {
        };
        FakeBrush.prototype.toHtml5Object = function () {
            return this.raw;
        };
        return FakeBrush;
    })();
    minerva.FakeBrush = FakeBrush;
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    minerva.NO_SIZE_UPDATER = {
        setActualWidth: function (value) {
        },
        setActualHeight: function (value) {
        },
        onSizeChanged: function (oldSize, newSize) {
        }
    };
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    (function (WalkDirection) {
        WalkDirection[WalkDirection["Forward"] = 0] = "Forward";
        WalkDirection[WalkDirection["Reverse"] = 1] = "Reverse";
        WalkDirection[WalkDirection["ZForward"] = 2] = "ZForward";
        WalkDirection[WalkDirection["ZReverse"] = 3] = "ZReverse";
    })(minerva.WalkDirection || (minerva.WalkDirection = {}));
    var WalkDirection = minerva.WalkDirection;
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var Point = (function () {
        function Point(x, y) {
            this.x = x == null ? 0 : x;
            this.y = y == null ? 0 : y;
        }
        Point.isEqual = function (p1, p2) {
            return p1.x === p2.x
                && p1.y === p2.y;
        };
        Point.copyTo = function (src, dest) {
            dest.x = src.x;
            dest.y = src.y;
        };
        return Point;
    })();
    minerva.Point = Point;
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var createTypedArray;
    if (typeof Float32Array !== "undefined") {
        createTypedArray = function (length) {
            return new Float32Array(length);
        };
    }
    else {
        createTypedArray = function (length) {
            return new Array(length);
        };
    }
    minerva.vec2 = {
        create: function (x, y) {
            var dest = createTypedArray(2);
            dest[0] = x;
            dest[1] = y;
            return dest;
        },
        init: function (x, y, dest) {
            if (!dest)
                dest = createTypedArray(2);
            dest[0] = x;
            dest[1] = y;
            return dest;
        }
    };
})(minerva || (minerva = {}));
var vec2 = minerva.vec2;
/// <reference path="mat/vec2" />
var minerva;
(function (minerva) {
    (function (RectOverlap) {
        RectOverlap[RectOverlap["Out"] = 0] = "Out";
        RectOverlap[RectOverlap["In"] = 1] = "In";
        RectOverlap[RectOverlap["Part"] = 2] = "Part";
    })(minerva.RectOverlap || (minerva.RectOverlap = {}));
    var RectOverlap = minerva.RectOverlap;
    var p1 = minerva.vec2.create(0, 0);
    var p2 = minerva.vec2.create(0, 0);
    var p3 = minerva.vec2.create(0, 0);
    var p4 = minerva.vec2.create(0, 0);
    var Rect = (function () {
        function Rect(x, y, width, height) {
            this.x = x == null ? 0 : x;
            this.y = y == null ? 0 : y;
            this.width = width == null ? 0 : width;
            this.height = height == null ? 0 : height;
        }
        Rect.clear = function (rect) {
            rect.x = rect.y = rect.width = rect.height = 0;
        };
        Rect.getBottom = function (rect) {
            return rect.y + rect.height;
        };
        Rect.getRight = function (rect) {
            return rect.x + rect.width;
        };
        Rect.isEqual = function (rect1, rect2) {
            return rect1.x === rect2.x
                && rect1.y === rect2.y
                && rect1.width === rect2.width
                && rect1.height === rect2.height;
        };
        Rect.isEmpty = function (src) {
            return src.width === 0
                || src.height === 0;
        };
        Rect.copyTo = function (src, dest) {
            dest.x = src.x;
            dest.y = src.y;
            dest.width = src.width;
            dest.height = src.height;
        };
        Rect.roundOut = function (dest) {
            var x = Math.floor(dest.x);
            var y = Math.floor(dest.y);
            dest.width = Math.ceil(dest.x + dest.width) - x;
            dest.height = Math.ceil(dest.y + dest.height) - y;
            dest.x = x;
            dest.y = y;
        };
        Rect.roundIn = function (dest) {
            var x = Math.ceil(dest.x);
            var y = Math.ceil(dest.y);
            dest.width = Math.floor(dest.x + dest.width) - Math.ceil(dest.x);
            dest.height = Math.floor(dest.y + dest.height) - Math.ceil(dest.y);
            dest.x = x;
            dest.y = y;
            return dest;
        };
        Rect.intersection = function (dest, rect2) {
            var x = Math.max(dest.x, rect2.x);
            var y = Math.max(dest.y, rect2.y);
            dest.width = Math.max(0, Math.min(dest.x + dest.width, rect2.x + rect2.width) - x);
            dest.height = Math.max(0, Math.min(dest.y + dest.height, rect2.y + rect2.height) - y);
            dest.x = x;
            dest.y = y;
        };
        Rect.union = function (dest, rect2) {
            if (rect2.width <= 0 || rect2.height <= 0)
                return;
            if (dest.width <= 0 || dest.height <= 0) {
                Rect.copyTo(rect2, dest);
                return;
            }
            var x = Math.min(dest.x, rect2.x);
            var y = Math.min(dest.y, rect2.y);
            dest.width = Math.max(dest.x + dest.width, rect2.x + rect2.width) - x;
            dest.height = Math.max(dest.y + dest.height, rect2.y + rect2.height) - y;
            dest.x = x;
            dest.y = y;
        };
        Rect.isContainedIn = function (src, test) {
            var sl = src.x;
            var st = src.y;
            var sr = src.x + src.width;
            var sb = src.y + src.height;
            var tl = test.x;
            var tt = test.y;
            var tr = test.x + test.width;
            var tb = test.y + test.height;
            if (sl < tl || st < tt || sl > tr || st > tb)
                return false;
            if (sr < tl || sb < tt || sr > tr || sb > tb)
                return false;
            return true;
        };
        Rect.containsPoint = function (rect1, p) {
            return rect1.x <= p.x
                && rect1.y <= p.y
                && (rect1.x + rect1.width) >= p.x
                && (rect1.y + rect1.height) >= p.y;
        };
        Rect.extendTo = function (dest, x, y) {
            var rx = dest.x;
            var ry = dest.y;
            var rw = dest.width;
            var rh = dest.height;
            if (x < rx || x > (rx + rw))
                rw = Math.max(Math.abs(x - rx), Math.abs(x - rx - rw));
            if (y < ry || y > (ry + rh))
                rh = Math.max(Math.abs(y - ry), Math.abs(y - ry - rh));
            dest.x = Math.min(rx, x);
            dest.y = Math.min(ry, y);
            dest.width = rw;
            dest.height = rh;
        };
        Rect.grow = function (dest, left, top, right, bottom) {
            dest.x -= left;
            dest.y -= top;
            dest.width += left + right;
            dest.height += top + bottom;
            if (dest.width < 0)
                dest.width = 0;
            if (dest.height < 0)
                dest.height = 0;
            return dest;
        };
        Rect.shrink = function (dest, left, top, right, bottom) {
            dest.x += left;
            dest.y += top;
            dest.width -= left + right;
            dest.height -= top + bottom;
            if (dest.width < 0)
                dest.width = 0;
            if (dest.height < 0)
                dest.height = 0;
        };
        Rect.rectIn = function (rect1, rect2) {
            var copy = new Rect();
            Rect.copyTo(rect1, copy);
            Rect.intersection(copy, rect2);
            if (Rect.isEmpty(copy))
                return RectOverlap.Out;
            if (Rect.isEqual(copy, rect2))
                return RectOverlap.In;
            return RectOverlap.Part;
        };
        Rect.transform = function (dest, mat) {
            if (!mat)
                return dest;
            var x = dest.x;
            var y = dest.y;
            var width = dest.width;
            var height = dest.height;
            minerva.vec2.init(x, y, p1);
            minerva.vec2.init(x + width, y, p2);
            minerva.vec2.init(x + width, y + height, p3);
            minerva.vec2.init(x, y + height, p4);
            minerva.mat3.transformVec2(mat, p1);
            minerva.mat3.transformVec2(mat, p2);
            minerva.mat3.transformVec2(mat, p3);
            minerva.mat3.transformVec2(mat, p4);
            var l = Math.min(p1[0], p2[0], p3[0], p4[0]);
            var t = Math.min(p1[1], p2[1], p3[1], p4[1]);
            var r = Math.max(p1[0], p2[0], p3[0], p4[0]);
            var b = Math.max(p1[1], p2[1], p3[1], p4[1]);
            dest.x = l;
            dest.y = t;
            dest.width = r - l;
            dest.height = b - t;
            return dest;
        };
        Rect.transform4 = function (dest, projection) {
        };
        return Rect;
    })();
    minerva.Rect = Rect;
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var Size = (function () {
        function Size(width, height) {
            this.width = width == null ? 0 : width;
            this.height = height == null ? 0 : height;
        }
        Size.copyTo = function (src, dest) {
            dest.width = src.width;
            dest.height = src.height;
        };
        Size.isEqual = function (size1, size2) {
            return size1.width === size2.width
                && size1.height === size2.height;
        };
        Size.isEmpty = function (size) {
            return size.width === 0
                || size.height === 0;
        };
        Size.min = function (dest, size2) {
            dest.width = Math.min(dest.width, size2.width);
            dest.height = Math.min(dest.height, size2.height);
        };
        Size.isUndef = function (size) {
            return isNaN(size.width) && isNaN(size.height);
        };
        Size.undef = function (size) {
            size.width = NaN;
            size.height = NaN;
        };
        return Size;
    })();
    minerva.Size = Size;
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var Thickness = (function () {
        function Thickness(left, top, right, bottom) {
            this.left = left == null ? 0 : left;
            this.top = top == null ? 0 : top;
            this.right = right == null ? 0 : right;
            this.bottom = bottom == null ? 0 : bottom;
        }
        Thickness.add = function (dest, t2) {
            dest.left += t2.left;
            dest.top += t2.top;
            dest.right += t2.right;
            dest.bottom += t2.bottom;
        };
        Thickness.copyTo = function (thickness, dest) {
            dest.left = thickness.left;
            dest.top = thickness.top;
            dest.right = thickness.right;
            dest.bottom = thickness.bottom;
        };
        Thickness.isEmpty = function (thickness) {
            return thickness.left === 0 && thickness.top === 0 && thickness.right === 0 && thickness.bottom === 0;
        };
        Thickness.isBalanced = function (thickness) {
            return thickness.left === thickness.top
                && thickness.left === thickness.right
                && thickness.left === thickness.bottom;
        };
        Thickness.shrinkSize = function (thickness, dest) {
            var w = dest.width;
            var h = dest.height;
            if (w != Number.POSITIVE_INFINITY)
                w -= thickness.left + thickness.right;
            if (h != Number.POSITIVE_INFINITY)
                h -= thickness.top + thickness.bottom;
            dest.width = w > 0 ? w : 0;
            dest.height = h > 0 ? h : 0;
            return dest;
        };
        Thickness.shrinkRect = function (thickness, dest) {
            dest.x += thickness.left;
            dest.y += thickness.top;
            dest.width -= thickness.left + thickness.right;
            dest.height -= thickness.top + thickness.bottom;
            if (dest.width < 0)
                dest.width = 0;
            if (dest.height < 0)
                dest.height = 0;
        };
        Thickness.shrinkCornerRadius = function (thickness, dest) {
            dest.topLeft = Math.max(dest.topLeft - Math.max(thickness.left, thickness.top) * 0.5, 0);
            dest.topRight = Math.max(dest.topRight - Math.max(thickness.right, thickness.top) * 0.5, 0);
            dest.bottomRight = Math.max(dest.bottomRight - Math.max(thickness.right, thickness.bottom) * 0.5, 0);
            dest.bottomLeft = Math.max(dest.bottomLeft - Math.max(thickness.left, thickness.bottom) * 0.5, 0);
        };
        Thickness.growSize = function (thickness, dest) {
            var w = dest.width;
            var h = dest.height;
            if (w != Number.POSITIVE_INFINITY)
                w += thickness.left + thickness.right;
            if (h != Number.POSITIVE_INFINITY)
                h += thickness.top + thickness.bottom;
            dest.width = w > 0 ? w : 0;
            dest.height = h > 0 ? h : 0;
            return dest;
        };
        Thickness.growRect = function (thickness, dest) {
            dest.x -= thickness.left;
            dest.y -= thickness.top;
            dest.width += thickness.left + thickness.right;
            dest.height += thickness.top + thickness.bottom;
            if (dest.width < 0)
                dest.width = 0;
            if (dest.height < 0)
                dest.height = 0;
        };
        Thickness.growCornerRadius = function (thickness, dest) {
            dest.topLeft = dest.topLeft ? Math.max(dest.topLeft + Math.max(thickness.left, thickness.top) * 0.5, 0) : 0;
            dest.topRight = dest.topRight ? Math.max(dest.topRight + Math.max(thickness.right, thickness.top) * 0.5, 0) : 0;
            dest.bottomRight = dest.bottomRight ? Math.max(dest.bottomRight + Math.max(thickness.right, thickness.bottom) * 0.5, 0) : 0;
            dest.bottomLeft = dest.bottomLeft ? Math.max(dest.bottomLeft + Math.max(thickness.left, thickness.bottom) * 0.5, 0) : 0;
        };
        return Thickness;
    })();
    minerva.Thickness = Thickness;
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var Vector;
    (function (Vector) {
        var EPSILON = 1e-10;
        function create(x, y) {
            return [x, y];
        }
        Vector.create = create;
        function reverse(v) {
            v[0] = -v[0];
            v[1] = -v[1];
            return v;
        }
        Vector.reverse = reverse;
        function orthogonal(v) {
            var x = v[0], y = v[1];
            v[0] = -y;
            v[1] = x;
            return v;
        }
        Vector.orthogonal = orthogonal;
        function normalize(v) {
            var x = v[0], y = v[1];
            var len = Math.sqrt(x * x + y * y);
            v[0] = x / len;
            v[1] = y / len;
            return v;
        }
        Vector.normalize = normalize;
        function rotate(v, theta) {
            var c = Math.cos(theta);
            var s = Math.sin(theta);
            var x = v[0];
            var y = v[1];
            v[0] = x * c - y * s;
            v[1] = x * s + y * c;
            return v;
        }
        Vector.rotate = rotate;
        function angleBetween(u, v) {
            var ux = u[0], uy = u[1], vx = v[0], vy = v[1];
            var num = ux * vx + uy * vy;
            var den = Math.sqrt(ux * ux + uy * uy) * Math.sqrt(vx * vx + vy * vy);
            return Math.acos(num / den);
        }
        Vector.angleBetween = angleBetween;
        function isClockwiseTo(v1, v2) {
            var theta = angleBetween(v1, v2);
            var nv1 = normalize(v1.slice(0));
            var nv2 = normalize(v2.slice(0));
            rotate(nv1, theta);
            var nx = Math.abs(nv1[0] - nv2[0]);
            var ny = Math.abs(nv1[1] - nv2[1]);
            return nx < EPSILON
                && ny < EPSILON;
        }
        Vector.isClockwiseTo = isClockwiseTo;
        function intersection(s1, d1, s2, d2) {
            var x1 = s1[0];
            var y1 = s1[1];
            var x2 = x1 + d1[0];
            var y2 = y1 + d1[1];
            var x3 = s2[0];
            var y3 = s2[1];
            var x4 = x3 + d2[0];
            var y4 = y3 + d2[1];
            var det = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
            if (det === 0)
                return null;
            var xn = ((x1 * y2 - y1 * x2) * (x3 - x4)) - ((x1 - x2) * (x3 * y4 - y3 * x4));
            var yn = ((x1 * y2 - y1 * x2) * (y3 - y4)) - ((y1 - y2) * (x3 * y4 - y3 * x4));
            return [xn / det, yn / det];
        }
        Vector.intersection = intersection;
    })(Vector = minerva.Vector || (minerva.Vector = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    (function (Visibility) {
        Visibility[Visibility["Visible"] = 0] = "Visible";
        Visibility[Visibility["Collapsed"] = 1] = "Collapsed";
    })(minerva.Visibility || (minerva.Visibility = {}));
    var Visibility = minerva.Visibility;
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var hitTestCtx = null;
    function findElementsInHostSpace(pos, host) {
        hitTestCtx = hitTestCtx || new minerva.core.render.RenderContext(document.createElement('canvas').getContext('2d'));
        var inv = minerva.mat3.inverse(host.assets.renderXform, minerva.mat3.create());
        hitTestCtx.save();
        hitTestCtx.preapply(inv);
        var list = [];
        host.hitTest(pos, list, hitTestCtx, true);
        hitTestCtx.restore();
        return list;
    }
    minerva.findElementsInHostSpace = findElementsInHostSpace;
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    minerva.errors = [];
    function layoutError(tree, pipedef, message) {
        minerva.errors.push({
            tree: tree,
            pipedef: pipedef,
            message: message
        });
    }
    minerva.layoutError = layoutError;
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    function getNaturalCanvasSize(canvas) {
        var zoomFactor = minerva.zoom.calc();
        return new minerva.Size(canvas.offsetWidth * zoomFactor, canvas.offsetHeight * zoomFactor);
    }
    minerva.getNaturalCanvasSize = getNaturalCanvasSize;
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    function singleton(type) {
        var x = type;
        if (!x.$$instance)
            Object.defineProperty(x, '$$instance', { value: new x(), enumerable: false });
        return x.$$instance;
    }
    minerva.singleton = singleton;
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var zoom;
    (function (zoom_1) {
        zoom_1.calc = (function () {
            if (document.frames)
                return ie();
            return chrome();
        })();
        function ie() {
            return function () {
                var screen = document.frames.screen;
                var zoom = screen.deviceXDPI / screen.systemXDPI;
                return Math.round(zoom * 100) / 100;
            };
        }
        function chrome() {
            var svg;
            function memoizeSvg() {
                if (!!svg || !document.body)
                    return;
                svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
                svg.setAttribute('version', '1.1');
                document.body.appendChild(svg);
                (function (style) {
                    style.opacity = "0.0";
                    style.position = "absolute";
                    style.left = "-300px";
                })(svg.style);
            }
            return function () {
                memoizeSvg();
                return !svg ? 1 : svg.currentScale;
            };
        }
    })(zoom = minerva.zoom || (minerva.zoom = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var pipe;
    (function (pipe) {
        var ITriPipe = (function () {
            function ITriPipe() {
            }
            return ITriPipe;
        })();
        pipe.ITriPipe = ITriPipe;
        function createTriPipe(pipedef) {
            return {
                def: pipedef,
                state: pipedef.createState(),
                output: pipedef.createOutput()
            };
        }
        pipe.createTriPipe = createTriPipe;
    })(pipe = minerva.pipe || (minerva.pipe = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var pipe;
    (function (pipe) {
        var PipeDef = (function () {
            function PipeDef() {
                this.$$names = [];
                this.$$tapins = [];
            }
            PipeDef.prototype.addTapin = function (name, tapin) {
                this.$$names.push(name);
                this.$$tapins.push(tapin);
                return this;
            };
            PipeDef.prototype.addTapinBefore = function (before, name, tapin) {
                var names = this.$$names;
                var tapins = this.$$tapins;
                var index = !before ? -1 : names.indexOf(before);
                if (index === -1) {
                    names.unshift(name);
                    tapins.unshift(tapin);
                }
                else {
                    names.splice(index, 0, name);
                    tapins.splice(index, 0, tapin);
                }
                return this;
            };
            PipeDef.prototype.addTapinAfter = function (after, name, tapin) {
                var names = this.$$names;
                var tapins = this.$$tapins;
                var index = !after ? -1 : names.indexOf(after);
                if (index === -1 || index === names.length - 1) {
                    names.push(name);
                    tapins.push(tapin);
                }
                else {
                    names.splice(index + 1, 0, name);
                    tapins.splice(index + 1, 0, tapin);
                }
                return this;
            };
            PipeDef.prototype.replaceTapin = function (name, tapin) {
                var names = this.$$names;
                var tapins = this.$$tapins;
                var index = names.indexOf(name);
                if (index === -1)
                    throw new Error("Could not replace pipe tap-in. No pipe tap-in named `" + name + "`.");
                tapins[index] = tapin;
                return this;
            };
            PipeDef.prototype.removeTapin = function (name) {
                var names = this.$$names;
                var index = names.indexOf(name);
                if (index === -1)
                    throw new Error("Could not replace pipe tap-in. No pipe tap-in named `" + name + "`.");
                names.splice(index, 1);
                this.$$tapins.splice(index, 1);
                return this;
            };
            PipeDef.prototype.run = function (data) {
                var contexts = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    contexts[_i - 1] = arguments[_i];
                }
                contexts.unshift(data);
                this.prepare.apply(this, contexts);
                var flag = true;
                for (var i = 0, tapins = this.$$tapins, len = tapins.length; i < len; i++) {
                    if (!tapins[i].apply(this, contexts)) {
                        flag = false;
                        break;
                    }
                }
                this.flush.apply(this, contexts);
                return flag;
            };
            PipeDef.prototype.prepare = function (data) {
                var contexts = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    contexts[_i - 1] = arguments[_i];
                }
            };
            PipeDef.prototype.flush = function (data) {
                var contexts = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    contexts[_i - 1] = arguments[_i];
                }
            };
            return PipeDef;
        })();
        pipe.PipeDef = PipeDef;
    })(pipe = minerva.pipe || (minerva.pipe = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var pipe;
    (function (pipe) {
        var TriPipeDef = (function () {
            function TriPipeDef() {
                this.$$names = [];
                this.$$tapins = [];
            }
            TriPipeDef.prototype.addTapin = function (name, tapin) {
                this.$$names.push(name);
                this.$$tapins.push(tapin);
                return this;
            };
            TriPipeDef.prototype.addTapinBefore = function (before, name, tapin) {
                var names = this.$$names;
                var tapins = this.$$tapins;
                var index = !before ? -1 : names.indexOf(before);
                if (index === -1) {
                    names.unshift(name);
                    tapins.unshift(tapin);
                }
                else {
                    names.splice(index, 0, name);
                    tapins.splice(index, 0, tapin);
                }
                return this;
            };
            TriPipeDef.prototype.addTapinAfter = function (after, name, tapin) {
                var names = this.$$names;
                var tapins = this.$$tapins;
                var index = !after ? -1 : names.indexOf(after);
                if (index === -1 || index === names.length - 1) {
                    names.push(name);
                    tapins.push(tapin);
                }
                else {
                    names.splice(index + 1, 0, name);
                    tapins.splice(index + 1, 0, tapin);
                }
                return this;
            };
            TriPipeDef.prototype.replaceTapin = function (name, tapin) {
                var names = this.$$names;
                var tapins = this.$$tapins;
                var index = names.indexOf(name);
                if (index === -1)
                    throw new Error("Could not replace pipe tap-in. No pipe tap-in named `" + name + "`.");
                tapins[index] = tapin;
                return this;
            };
            TriPipeDef.prototype.removeTapin = function (name) {
                var names = this.$$names;
                var index = names.indexOf(name);
                if (index === -1)
                    throw new Error("Could not replace pipe tap-in. No pipe tap-in named `" + name + "`.");
                names.splice(index, 1);
                this.$$tapins.splice(index, 1);
                return this;
            };
            TriPipeDef.prototype.run = function (input, state, output) {
                var contexts = [];
                for (var _i = 3; _i < arguments.length; _i++) {
                    contexts[_i - 3] = arguments[_i];
                }
                contexts.unshift(output);
                contexts.unshift(state);
                contexts.unshift(input);
                this.prepare.apply(this, contexts);
                var flag = true;
                for (var i = 0, tapins = this.$$tapins, len = tapins.length; i < len; i++) {
                    if (!tapins[i].apply(this, contexts)) {
                        flag = false;
                        break;
                    }
                }
                this.flush.apply(this, contexts);
                return flag;
            };
            TriPipeDef.prototype.createState = function () {
                return null;
            };
            TriPipeDef.prototype.createOutput = function () {
                return null;
            };
            TriPipeDef.prototype.prepare = function (input, state, output) {
                var contexts = [];
                for (var _i = 3; _i < arguments.length; _i++) {
                    contexts[_i - 3] = arguments[_i];
                }
            };
            TriPipeDef.prototype.flush = function (input, state, output) {
                var contexts = [];
                for (var _i = 3; _i < arguments.length; _i++) {
                    contexts[_i - 3] = arguments[_i];
                }
            };
            return TriPipeDef;
        })();
        pipe.TriPipeDef = TriPipeDef;
    })(pipe = minerva.pipe || (minerva.pipe = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var core;
    (function (core) {
        var Updater = (function () {
            function Updater() {
                this.$$measure = null;
                this.$$measureBinder = null;
                this.$$arrange = null;
                this.$$arrangeBinder = null;
                this.$$sizing = null;
                this.$$processdown = null;
                this.$$processup = null;
                this.$$render = null;
                this.$$hittest = null;
                this.$$inDownDirty = false;
                this.$$inUpDirty = false;
                this.$$attached = {};
                this.$$sizeupdater = minerva.NO_SIZE_UPDATER;
                this.assets = {
                    width: NaN,
                    height: NaN,
                    minWidth: 0.0,
                    minHeight: 0.0,
                    maxWidth: Number.POSITIVE_INFINITY,
                    maxHeight: Number.POSITIVE_INFINITY,
                    useLayoutRounding: true,
                    margin: new minerva.Thickness(),
                    horizontalAlignment: minerva.HorizontalAlignment.Stretch,
                    verticalAlignment: minerva.VerticalAlignment.Stretch,
                    clip: null,
                    effect: null,
                    visibility: minerva.Visibility.Visible,
                    opacity: 1.0,
                    isHitTestVisible: true,
                    renderTransform: null,
                    renderTransformOrigin: new minerva.Point(),
                    effectPadding: new minerva.Thickness(),
                    previousConstraint: new minerva.Size(),
                    desiredSize: new minerva.Size(),
                    hiddenDesire: new minerva.Size(Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY),
                    renderSize: new minerva.Size(),
                    visualOffset: new minerva.Point(),
                    lastRenderSize: undefined,
                    layoutSlot: new minerva.Rect(),
                    layoutClip: new minerva.Rect(),
                    compositeLayoutClip: new minerva.Rect(),
                    breakLayoutClip: false,
                    actualWidth: 0,
                    actualHeight: 0,
                    z: NaN,
                    totalIsRenderVisible: true,
                    totalOpacity: 1.0,
                    totalIsHitTestVisible: true,
                    extents: new minerva.Rect(),
                    extentsWithChildren: new minerva.Rect(),
                    surfaceBoundsWithChildren: new minerva.Rect(),
                    globalBoundsWithChildren: new minerva.Rect(),
                    layoutXform: minerva.mat3.identity(),
                    carrierXform: null,
                    renderXform: minerva.mat3.identity(),
                    absoluteXform: minerva.mat3.identity(),
                    dirtyRegion: new minerva.Rect(),
                    dirtyFlags: 0,
                    uiFlags: minerva.UIFlags.RenderVisible | minerva.UIFlags.HitTestVisible,
                    forceInvalidate: false
                };
                this.tree = null;
                perfex.timer.start("CreateUpdater", null);
                this.setMeasureBinder()
                    .setArrangeBinder()
                    .init();
                perfex.timer.stop();
            }
            Updater.prototype.init = function () {
                this.setTree(this.tree);
                if (!this.$$measure)
                    this.setMeasurePipe();
                if (!this.$$arrange)
                    this.setArrangePipe();
                if (!this.$$sizing)
                    this.setSizingPipe();
                if (!this.$$processdown)
                    this.setProcessDownPipe();
                if (!this.$$processup)
                    this.setProcessUpPipe();
                if (!this.$$render)
                    this.setRenderPipe();
                if (!this.$$hittest)
                    this.setHitTestPipe();
                if (!this.$$hittest.data.tree)
                    this.$$hittest.data.tree = this.tree;
            };
            Updater.prototype.setTree = function (tree) {
                this.tree = tree || new core.UpdaterTree();
                return this;
            };
            Updater.prototype.getAttachedValue = function (name) {
                return this.$$attached[name];
            };
            Updater.prototype.setAttachedValue = function (name, value) {
                this.$$attached[name] = value;
            };
            Updater.prototype.onDetached = function () {
                core.reactTo.helpers.invalidateParent(this);
                this.invalidateMeasure();
                if (this.tree.visualParent)
                    this.tree.visualParent.invalidateMeasure();
                var ls = this.assets.layoutSlot;
                ls.x = ls.y = ls.width = ls.height = 0;
                var lc = this.assets.layoutClip;
                lc.x = lc.y = lc.width = lc.height = 0;
            };
            Updater.prototype.onAttached = function () {
                var assets = this.assets;
                minerva.Size.undef(assets.previousConstraint);
                assets.dirtyFlags |= (minerva.DirtyFlags.RenderVisibility | minerva.DirtyFlags.HitTestVisibility | minerva.DirtyFlags.LocalTransform);
                var lc = assets.layoutClip;
                lc.x = lc.y = lc.width = lc.height = 0;
                var rs = assets.renderSize;
                rs.width = rs.height = 0;
                this.invalidateMeasure()
                    .invalidateArrange()
                    .invalidate()
                    .updateBounds(true);
                Updater.$$addDownDirty(this);
                if ((assets.uiFlags & minerva.UIFlags.SizeHint) > 0 || assets.lastRenderSize !== undefined)
                    Updater.$$propagateUiFlagsUp(this, minerva.UIFlags.SizeHint);
            };
            Updater.prototype.setVisualParent = function (visualParent) {
                if (!visualParent && this.tree.visualParent) {
                    this.onDetached();
                    this.tree.visualParent.tree.onChildDetached(this);
                }
                this.tree.visualParent = visualParent;
                this.setSurface(visualParent ? visualParent.tree.surface : undefined);
                if (visualParent) {
                    visualParent.tree.onChildAttached(this);
                    this.onAttached();
                }
                return this;
            };
            Updater.prototype.setSurface = function (surface) {
                var cur;
                var newUps = [];
                for (var walker = this.walkDeep(); walker.step();) {
                    cur = walker.current;
                    if (cur.tree.surface === surface) {
                        walker.skipBranch();
                        continue;
                    }
                    var olds = cur.tree.surface;
                    cur.tree.surface = surface;
                    cur.onSurfaceChanged(olds, surface);
                    if (surface) {
                        if ((cur.assets.dirtyFlags & minerva.DirtyFlags.DownDirtyState) > 0) {
                            cur.$$inDownDirty = true;
                            surface.addDownDirty(cur);
                        }
                        if ((cur.assets.dirtyFlags & minerva.DirtyFlags.UpDirtyState) > 0)
                            newUps.push(cur);
                    }
                }
                while ((cur = newUps.pop()) != null) {
                    cur.$$inUpDirty = true;
                    surface.addUpDirty(cur);
                }
                return this;
            };
            Updater.prototype.onSurfaceChanged = function (oldSurface, newSurface) {
            };
            Updater.prototype.walkDeep = function (dir) {
                var last = undefined;
                var walkList = [this];
                dir = dir || minerva.WalkDirection.Forward;
                var revdir = (dir === minerva.WalkDirection.Forward || dir === minerva.WalkDirection.ZForward) ? dir + 1 : dir - 1;
                return {
                    current: undefined,
                    step: function () {
                        if (last) {
                            for (var subwalker = last.tree.walk(revdir); subwalker.step();) {
                                walkList.unshift(subwalker.current);
                            }
                        }
                        this.current = last = walkList.shift();
                        return this.current !== undefined;
                    },
                    skipBranch: function () {
                        last = undefined;
                    }
                };
            };
            Updater.prototype.setMeasurePipe = function (pipedef) {
                if (this.$$measure)
                    return this;
                var def = pipedef || new core.measure.MeasurePipeDef();
                this.$$measure = minerva.pipe.createTriPipe(def);
                return this;
            };
            Updater.prototype.setMeasureBinder = function (mb) {
                this.$$measureBinder = mb || new core.measure.MeasureBinder();
                return this;
            };
            Updater.prototype.setArrangePipe = function (pipedef) {
                if (this.$$arrange)
                    return this;
                var def = pipedef || new core.arrange.ArrangePipeDef();
                this.$$arrange = minerva.pipe.createTriPipe(def);
                return this;
            };
            Updater.prototype.setArrangeBinder = function (ab) {
                this.$$arrangeBinder = ab || new core.arrange.ArrangeBinder();
                return this;
            };
            Updater.prototype.setSizingPipe = function (pipedef) {
                if (this.$$sizing)
                    return this;
                var def = pipedef;
                if (!def)
                    def = new core.sizing.SizingPipeDef();
                this.$$sizing = minerva.pipe.createTriPipe(def);
                return this;
            };
            Updater.prototype.setProcessDownPipe = function (pipedef) {
                var def = pipedef;
                if (!def)
                    def = new core.processdown.ProcessDownPipeDef();
                this.$$processdown = minerva.pipe.createTriPipe(def);
                return this;
            };
            Updater.prototype.setProcessUpPipe = function (pipedef) {
                if (this.$$processup)
                    return this;
                var def = pipedef;
                if (!def)
                    def = new core.processup.ProcessUpPipeDef();
                this.$$processup = minerva.pipe.createTriPipe(def);
                return this;
            };
            Updater.prototype.setRenderPipe = function (pipedef) {
                if (this.$$render)
                    return this;
                var def = pipedef || new core.render.RenderPipeDef();
                this.$$render = minerva.pipe.createTriPipe(def);
                return this;
            };
            Updater.prototype.setHitTestPipe = function (pipedef) {
                if (this.$$hittest)
                    return this;
                var def = pipedef || new core.hittest.HitTestPipeDef();
                this.$$hittest = {
                    def: def,
                    data: {
                        updater: this,
                        assets: this.assets,
                        tree: this.tree,
                        hitChildren: false,
                        bounds: new minerva.Rect(),
                        layoutClipBounds: new minerva.Rect()
                    }
                };
                return this;
            };
            Updater.prototype.doMeasure = function () {
                this.$$measureBinder.bind(this);
            };
            Updater.prototype.measure = function (availableSize) {
                var pipe = this.$$measure;
                var output = pipe.output;
                var success = pipe.def.run(this.assets, pipe.state, output, this.tree, availableSize);
                if (output.newUpDirty)
                    Updater.$$addUpDirty(this);
                if (output.newDownDirty)
                    Updater.$$addDownDirty(this);
                if (output.newUiFlags)
                    Updater.$$propagateUiFlagsUp(this, output.newUiFlags);
                return success;
            };
            Updater.prototype.doArrange = function () {
                this.$$arrangeBinder.bind(this);
            };
            Updater.prototype.arrange = function (finalRect) {
                var pipe = this.$$arrange;
                var output = pipe.output;
                var success = pipe.def.run(this.assets, pipe.state, output, this.tree, finalRect);
                if (output.newUpDirty)
                    Updater.$$addUpDirty(this);
                if (output.newDownDirty)
                    Updater.$$addDownDirty(this);
                if (output.newUiFlags)
                    Updater.$$propagateUiFlagsUp(this, output.newUiFlags);
                return success;
            };
            Updater.prototype.sizing = function (oldSize, newSize) {
                var pipe = this.$$sizing;
                var assets = this.assets;
                if (assets.lastRenderSize)
                    minerva.Size.copyTo(assets.lastRenderSize, oldSize);
                var success = pipe.def.run(assets, pipe.state, pipe.output, this.tree);
                minerva.Size.copyTo(pipe.output.actualSize, newSize);
                this.$$sizeupdater.setActualWidth(newSize.width);
                this.$$sizeupdater.setActualHeight(newSize.height);
                assets.lastRenderSize = undefined;
                return success;
            };
            Updater.prototype.processDown = function () {
                if (!this.tree.surface)
                    this.$$inDownDirty = false;
                if (!this.$$inDownDirty)
                    return true;
                var vp = this.tree.visualParent;
                if (vp && vp.$$inDownDirty) {
                    return false;
                }
                var pipe = this.$$processdown;
                var success = pipe.def.run(this.assets, pipe.state, pipe.output, vp ? vp.assets : null, this.tree);
                this.$$inDownDirty = false;
                if (pipe.output.newUpDirty)
                    Updater.$$addUpDirty(this);
                return success;
            };
            Updater.prototype.processUp = function () {
                if (!this.tree.surface)
                    this.$$inUpDirty = false;
                if (!this.$$inUpDirty)
                    return true;
                var pipe = this.$$processup;
                var success = pipe.def.run(this.assets, pipe.state, pipe.output, this.tree);
                this.$$inUpDirty = false;
                return success;
            };
            Updater.prototype.render = function (ctx, region) {
                var pipe = this.$$render;
                return pipe.def.run(this.assets, pipe.state, pipe.output, ctx, region, this.tree);
            };
            Updater.prototype.preRender = function () {
            };
            Updater.prototype.hitTest = function (pos, list, ctx, includeAll) {
                var pipe = this.$$hittest;
                return pipe.def.run(pipe.data, pos, list, ctx, includeAll === true);
            };
            Updater.prototype.onSizeChanged = function (oldSize, newSize) {
                this.$$sizeupdater.onSizeChanged(oldSize, newSize);
            };
            Updater.prototype.setSizeUpdater = function (updater) {
                this.$$sizeupdater = updater || minerva.NO_SIZE_UPDATER;
            };
            Updater.prototype.invalidateMeasure = function () {
                this.assets.dirtyFlags |= minerva.DirtyFlags.Measure;
                Updater.$$propagateUiFlagsUp(this, minerva.UIFlags.MeasureHint);
                return this;
            };
            Updater.prototype.invalidateArrange = function () {
                this.assets.dirtyFlags |= minerva.DirtyFlags.Arrange;
                Updater.$$propagateUiFlagsUp(this, minerva.UIFlags.ArrangeHint);
                return this;
            };
            Updater.prototype.updateBounds = function (forceRedraw) {
                var assets = this.assets;
                assets.dirtyFlags |= minerva.DirtyFlags.Bounds;
                Updater.$$addUpDirty(this);
                if (forceRedraw === true)
                    assets.forceInvalidate = true;
                return this;
            };
            Updater.prototype.fullInvalidate = function (invTransforms) {
                var assets = this.assets;
                this.invalidate(assets.surfaceBoundsWithChildren);
                if (invTransforms) {
                    assets.dirtyFlags |= minerva.DirtyFlags.LocalTransform;
                    Updater.$$addDownDirty(this);
                }
                this.updateBounds(true);
                return this;
            };
            Updater.prototype.invalidate = function (region) {
                var assets = this.assets;
                if (!assets.totalIsRenderVisible || (assets.totalOpacity * 255) < 0.5)
                    return this;
                assets.dirtyFlags |= minerva.DirtyFlags.Invalidate;
                Updater.$$addUpDirty(this);
                if (!region)
                    region = assets.surfaceBoundsWithChildren;
                minerva.Rect.union(assets.dirtyRegion, region);
                return this;
            };
            Updater.prototype.findChildInList = function (list) {
                for (var i = 0, len = list.length; i < len; i++) {
                    if (list[i].tree.visualParent === this)
                        return i;
                }
                return -1;
            };
            Updater.$$addUpDirty = function (updater) {
                var surface = updater.tree.surface;
                if (surface && !updater.$$inUpDirty) {
                    surface.addUpDirty(updater);
                    updater.$$inUpDirty = true;
                }
            };
            Updater.$$addDownDirty = function (updater) {
                var surface = updater.tree.surface;
                if (surface && !updater.$$inDownDirty) {
                    surface.addDownDirty(updater);
                    updater.$$inDownDirty = true;
                }
            };
            Updater.$$propagateUiFlagsUp = function (updater, flags) {
                updater.assets.uiFlags |= flags;
                var vpu = updater;
                while ((vpu = vpu.tree.visualParent) != null && (vpu.assets.uiFlags & flags) === 0) {
                    vpu.assets.uiFlags |= flags;
                }
            };
            Updater.transformToVisual = function (fromUpdater, toUpdater) {
                if (!fromUpdater.tree.surface || (toUpdater && !toUpdater.tree.surface))
                    return null;
                var m = minerva.mat3.create();
                var a = fromUpdater.assets.absoluteXform;
                if (toUpdater) {
                    var invB = minerva.mat3.inverse(toUpdater.assets.absoluteXform, minerva.mat3.create());
                    minerva.mat3.multiply(a, invB, m);
                }
                else {
                    minerva.mat3.copyTo(a, m);
                }
                return m;
            };
            Updater.transformPoint = function (updater, p) {
                var inverse = minerva.mat3.inverse(updater.assets.absoluteXform, minerva.mat3.create());
                if (!inverse) {
                    console.warn("Could not get inverse of Absolute Transform for UIElement.");
                    return;
                }
                var p2 = minerva.vec2.create(p.x, p.y);
                minerva.mat3.transformVec2(inverse, p2);
                p.x = p2[0];
                p.y = p2[1];
            };
            return Updater;
        })();
        core.Updater = Updater;
    })(core = minerva.core || (minerva.core = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var core;
    (function (core) {
        var NO_VO = {
            updateBounds: function () {
            },
            invalidate: function (region) {
            }
        };
        var UpdaterTree = (function () {
            function UpdaterTree() {
                this.isTop = false;
                this.surface = null;
                this.visualParent = null;
                this.isContainer = false;
                this.isLayoutContainer = false;
                this.subtree = null;
            }
            Object.defineProperty(UpdaterTree.prototype, "visualOwner", {
                get: function () {
                    if (this.visualParent)
                        return this.visualParent;
                    if (this.isTop && this.surface)
                        return this.surface;
                    return NO_VO;
                },
                enumerable: true,
                configurable: true
            });
            UpdaterTree.prototype.walk = function (direction) {
                var visited = false;
                var _this = this;
                return {
                    current: undefined,
                    step: function () {
                        if (visited)
                            return false;
                        visited = true;
                        this.current = _this.subtree;
                        return this.current != null;
                    }
                };
            };
            UpdaterTree.prototype.onChildAttached = function (child) {
                this.subtree = child;
            };
            UpdaterTree.prototype.onChildDetached = function (child) {
                this.subtree = null;
            };
            UpdaterTree.prototype.setTemplateApplier = function (applier) {
                this.applyTemplate = applier;
            };
            UpdaterTree.prototype.applyTemplate = function () {
                return false;
            };
            return UpdaterTree;
        })();
        core.UpdaterTree = UpdaterTree;
    })(core = minerva.core || (minerva.core = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var core;
    (function (core) {
        var helpers;
        (function (helpers) {
            function coerceSize(size, assets) {
                var cw = Math.max(assets.minWidth, size.width);
                var ch = Math.max(assets.minHeight, size.height);
                if (!isNaN(assets.width))
                    cw = assets.width;
                if (!isNaN(assets.height))
                    ch = assets.height;
                cw = Math.max(Math.min(cw, assets.maxWidth), assets.minWidth);
                ch = Math.max(Math.min(ch, assets.maxHeight), assets.minHeight);
                if (assets.useLayoutRounding) {
                    cw = Math.round(cw);
                    ch = Math.round(ch);
                }
                size.width = cw;
                size.height = ch;
            }
            helpers.coerceSize = coerceSize;
            function intersectBoundsWithClipPath(dest, src, thickness, xform, clip, layoutClip) {
                minerva.Rect.copyTo(src, dest);
                minerva.Thickness.growRect(thickness, dest);
                if (clip)
                    minerva.Rect.intersection(dest, clip.GetBounds());
                if (!minerva.Rect.isEmpty(layoutClip))
                    minerva.Rect.intersection(dest, layoutClip);
                if (xform)
                    minerva.Rect.transform(dest, xform);
            }
            helpers.intersectBoundsWithClipPath = intersectBoundsWithClipPath;
            var offset = new minerva.Point();
            function renderLayoutClip(ctx, assets, tree) {
                var lc;
                offset.x = 0;
                offset.y = 0;
                var raw = ctx.raw;
                var cur;
                while (assets) {
                    lc = assets.layoutClip;
                    if (!minerva.Rect.isEmpty(lc)) {
                        raw.beginPath();
                        raw.rect(lc.x, lc.y, lc.width, lc.height);
                        raw.clip();
                    }
                    if (assets.breakLayoutClip)
                        break;
                    var vo = assets.visualOffset;
                    offset.x += vo.x;
                    offset.y += vo.y;
                    ctx.translate(-vo.x, -vo.y);
                    if (!tree)
                        break;
                    cur = tree.visualParent;
                    tree = cur ? cur.tree : null;
                    assets = (cur ? cur.assets : null);
                }
                ctx.translate(offset.x, offset.y);
            }
            helpers.renderLayoutClip = renderLayoutClip;
        })(helpers = core.helpers || (core.helpers = {}));
    })(core = minerva.core || (minerva.core = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var core;
    (function (core) {
        var reactTo;
        (function (reactTo) {
            var helpers;
            (function (helpers) {
                function invalidateParent(updater) {
                    updater.tree.visualOwner.invalidate(updater.assets.surfaceBoundsWithChildren);
                }
                helpers.invalidateParent = invalidateParent;
                function sizeChanged(updater) {
                    var vp = updater.tree.visualParent;
                    if (vp)
                        vp.invalidateMeasure();
                    var origin = updater.assets.renderTransformOrigin;
                    updater.fullInvalidate(origin.x !== 0.0 || origin.y !== 0)
                        .invalidateMeasure()
                        .invalidateArrange();
                }
                helpers.sizeChanged = sizeChanged;
                function alignmentChanged(updater) {
                    updater.invalidateArrange();
                    updater.fullInvalidate(true);
                }
                helpers.alignmentChanged = alignmentChanged;
            })(helpers = reactTo.helpers || (reactTo.helpers = {}));
            function isHitTestVisible(updater, oldValue, newValue) {
                updater.assets.dirtyFlags |= minerva.DirtyFlags.HitTestVisibility;
                core.Updater.$$addDownDirty(updater);
            }
            reactTo.isHitTestVisible = isHitTestVisible;
            function useLayoutRounding(updater, oldValue, newValue) {
                updater.invalidateMeasure();
                updater.invalidateArrange();
            }
            reactTo.useLayoutRounding = useLayoutRounding;
            function opacity(updater, oldValue, newValue) {
                updater.assets.dirtyFlags |= minerva.DirtyFlags.RenderVisibility;
                core.Updater.$$addDownDirty(updater);
                helpers.invalidateParent(updater);
            }
            reactTo.opacity = opacity;
            function visibility(updater, oldValue, newValue) {
                updater.assets.dirtyFlags |= minerva.DirtyFlags.RenderVisibility;
                core.Updater.$$addDownDirty(updater);
                helpers.invalidateParent(updater);
                updater.invalidateMeasure();
                var vp = updater.tree.visualParent;
                if (vp)
                    vp.invalidateMeasure();
            }
            reactTo.visibility = visibility;
            function effect(updater, oldValue, newValue) {
                helpers.invalidateParent(updater);
                var changed = (newValue) ? newValue.GetPadding(updater.assets.effectPadding) : false;
                if (changed)
                    updater.updateBounds();
                if (oldValue !== newValue && updater.tree.surface) {
                    updater.assets.dirtyFlags |= minerva.DirtyFlags.LocalTransform;
                    core.Updater.$$addDownDirty(updater);
                }
            }
            reactTo.effect = effect;
            function clip(updater, oldValue, newValue) {
                var assets = updater.assets;
                helpers.invalidateParent(updater);
                updater.updateBounds(true);
                assets.dirtyFlags |= minerva.DirtyFlags.LocalClip;
                core.Updater.$$addDownDirty(updater);
            }
            reactTo.clip = clip;
            function renderTransform(updater, oldValue, newValue) {
                updater.assets.dirtyFlags |= minerva.DirtyFlags.LocalTransform;
                core.Updater.$$addDownDirty(updater);
            }
            reactTo.renderTransform = renderTransform;
            function renderTransformOrigin(updater, oldValue, newValue) {
                updater.assets.dirtyFlags |= minerva.DirtyFlags.LocalTransform;
                core.Updater.$$addDownDirty(updater);
            }
            reactTo.renderTransformOrigin = renderTransformOrigin;
            reactTo.width = helpers.sizeChanged;
            reactTo.height = helpers.sizeChanged;
            reactTo.minWidth = helpers.sizeChanged;
            reactTo.minHeight = helpers.sizeChanged;
            reactTo.maxWidth = helpers.sizeChanged;
            reactTo.maxHeight = helpers.sizeChanged;
            reactTo.margin = helpers.sizeChanged;
            reactTo.flowDirection = helpers.sizeChanged;
            reactTo.horizontalAlignment = helpers.alignmentChanged;
            reactTo.verticalAlignment = helpers.alignmentChanged;
        })(reactTo = core.reactTo || (core.reactTo = {}));
    })(core = minerva.core || (minerva.core = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var core;
    (function (core) {
        var arrange;
        (function (arrange) {
            var ArrangeBinder = (function () {
                function ArrangeBinder() {
                }
                ArrangeBinder.prototype.bind = function (updater) {
                    var assets = updater.assets;
                    var tree = updater.tree;
                    var last = assets.layoutSlot || undefined;
                    if (!tree.visualParent) {
                        last = new minerva.Rect();
                        this.expandViewport(last, assets, tree);
                        this.shiftViewport(last, updater);
                    }
                    if (last) {
                        return updater.arrange(last);
                    }
                    else if (tree.visualParent) {
                        tree.visualParent.invalidateArrange();
                    }
                    return false;
                };
                ArrangeBinder.prototype.expandViewport = function (viewport, assets, tree) {
                    if (tree.isLayoutContainer) {
                        minerva.Size.copyTo(assets.desiredSize, viewport);
                        if (tree.surface) {
                            var measure = assets.previousConstraint;
                            if (!minerva.Size.isUndef(measure)) {
                                viewport.width = Math.max(viewport.width, measure.width);
                                viewport.height = Math.max(viewport.height, measure.height);
                            }
                            else {
                                viewport.width = tree.surface.width;
                                viewport.height = tree.surface.height;
                            }
                        }
                    }
                    else {
                        viewport.width = assets.actualWidth;
                        viewport.height = assets.actualHeight;
                    }
                };
                ArrangeBinder.prototype.shiftViewport = function (viewport, updater) {
                    viewport.x = updater.getAttachedValue("Canvas.Left") || 0;
                    viewport.y = updater.getAttachedValue("Canvas.Top") || 0;
                };
                return ArrangeBinder;
            })();
            arrange.ArrangeBinder = ArrangeBinder;
        })(arrange = core.arrange || (core.arrange = {}));
    })(core = minerva.core || (minerva.core = {}));
})(minerva || (minerva = {}));
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var minerva;
(function (minerva) {
    var core;
    (function (core) {
        var arrange;
        (function (arrange) {
            var ArrangePipeDef = (function (_super) {
                __extends(ArrangePipeDef, _super);
                function ArrangePipeDef() {
                    _super.call(this);
                    this.addTapin('applyRounding', arrange.tapins.applyRounding)
                        .addTapin('validateFinalRect', arrange.tapins.validateFinalRect)
                        .addTapin('validateVisibility', arrange.tapins.validateVisibility)
                        .addTapin('checkNeedArrange', arrange.tapins.checkNeedArrange)
                        .addTapin('invalidateFuture', arrange.tapins.invalidateFuture)
                        .addTapin('calcStretched', arrange.tapins.calcStretched)
                        .addTapin('prepareOverride', arrange.tapins.prepareOverride)
                        .addTapin('doOverride', arrange.tapins.doOverride)
                        .addTapin('completeOverride', arrange.tapins.completeOverride)
                        .addTapin('calcFlip', arrange.tapins.calcFlip)
                        .addTapin('calcVisualOffset', arrange.tapins.calcVisualOffset)
                        .addTapin('buildLayoutClip', arrange.tapins.buildLayoutClip)
                        .addTapin('buildLayoutXform', arrange.tapins.buildLayoutXform)
                        .addTapin('buildRenderSize', arrange.tapins.buildRenderSize);
                }
                ArrangePipeDef.prototype.createState = function () {
                    return {
                        arrangedSize: new minerva.Size(),
                        finalRect: new minerva.Rect(),
                        finalSize: new minerva.Size(),
                        childRect: new minerva.Rect(),
                        framework: new minerva.Size(),
                        stretched: new minerva.Size(),
                        constrained: new minerva.Size(),
                        flipHorizontal: false
                    };
                };
                ArrangePipeDef.prototype.createOutput = function () {
                    return {
                        dirtyFlags: 0,
                        uiFlags: 0,
                        layoutSlot: new minerva.Rect(),
                        layoutXform: minerva.mat3.identity(),
                        layoutClip: new minerva.Rect(),
                        renderSize: new minerva.Size(),
                        lastRenderSize: undefined,
                        visualOffset: new minerva.Point(),
                        origDirtyFlags: 0,
                        origUiFlags: 0,
                        newUpDirty: 0,
                        newDownDirty: 0,
                        newUiFlags: 0
                    };
                };
                ArrangePipeDef.prototype.prepare = function (input, state, output) {
                    output.origDirtyFlags = output.dirtyFlags = input.dirtyFlags;
                    output.origUiFlags = output.uiFlags = input.uiFlags;
                    minerva.Rect.copyTo(input.layoutSlot, output.layoutSlot);
                    minerva.Rect.copyTo(input.layoutClip, output.layoutClip);
                    minerva.Size.copyTo(input.renderSize, output.renderSize);
                    output.lastRenderSize = input.lastRenderSize;
                    minerva.mat3.copyTo(input.layoutXform, output.layoutXform);
                    minerva.Point.copyTo(input.visualOffset, output.visualOffset);
                };
                ArrangePipeDef.prototype.flush = function (input, state, output) {
                    var newDirty = (output.dirtyFlags | input.dirtyFlags) & ~output.origDirtyFlags;
                    output.newUpDirty = newDirty & minerva.DirtyFlags.UpDirtyState;
                    output.newDownDirty = newDirty & minerva.DirtyFlags.DownDirtyState;
                    output.newUiFlags = (output.uiFlags | input.uiFlags) & ~output.origUiFlags;
                    input.dirtyFlags = output.dirtyFlags;
                    input.uiFlags = output.uiFlags;
                    minerva.Rect.copyTo(output.layoutSlot, input.layoutSlot);
                    minerva.Rect.copyTo(output.layoutClip, input.layoutClip);
                    minerva.Size.copyTo(output.renderSize, input.renderSize);
                    input.lastRenderSize = output.lastRenderSize;
                    minerva.mat3.copyTo(output.layoutXform, input.layoutXform);
                    minerva.Point.copyTo(output.visualOffset, input.visualOffset);
                };
                return ArrangePipeDef;
            })(minerva.pipe.TriPipeDef);
            arrange.ArrangePipeDef = ArrangePipeDef;
        })(arrange = core.arrange || (core.arrange = {}));
    })(core = minerva.core || (minerva.core = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var core;
    (function (core) {
        var draft;
        (function (draft) {
            var DraftPipeDef = (function (_super) {
                __extends(DraftPipeDef, _super);
                function DraftPipeDef() {
                    _super.call(this);
                    this.addTapin('flushPrevious', draft.tapins.flushPrevious)
                        .addTapin('determinePhase', draft.tapins.determinePhase)
                        .addTapin('prepareMeasure', draft.tapins.prepareMeasure)
                        .addTapin('measure', draft.tapins.measure)
                        .addTapin('prepareArrange', draft.tapins.prepareArrange)
                        .addTapin('arrange', draft.tapins.arrange)
                        .addTapin('prepareSizing', draft.tapins.prepareSizing)
                        .addTapin('sizing', draft.tapins.sizing)
                        .addTapin('notifyResize', draft.tapins.notifyResize);
                }
                DraftPipeDef.prototype.prepare = function (data) {
                };
                DraftPipeDef.prototype.flush = function (data) {
                };
                return DraftPipeDef;
            })(minerva.pipe.PipeDef);
            draft.DraftPipeDef = DraftPipeDef;
        })(draft = core.draft || (core.draft = {}));
    })(core = minerva.core || (minerva.core = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var core;
    (function (core) {
        var hittest;
        (function (hittest) {
            var HitTestPipeDef = (function (_super) {
                __extends(HitTestPipeDef, _super);
                function HitTestPipeDef() {
                    _super.call(this);
                    this.addTapin('canHit', hittest.tapins.canHit)
                        .addTapin('prepareCtx', hittest.tapins.prepareCtx)
                        .addTapin('insideClip', hittest.tapins.insideClip)
                        .addTapin('insideChildren', hittest.tapins.insideChildren)
                        .addTapin('canHitInside', hittest.tapins.canHitInside)
                        .addTapin('insideObject', hittest.tapins.insideObject)
                        .addTapin('insideLayoutClip', hittest.tapins.insideLayoutClip)
                        .addTapin('completeCtx', hittest.tapins.completeCtx);
                }
                return HitTestPipeDef;
            })(minerva.pipe.PipeDef);
            hittest.HitTestPipeDef = HitTestPipeDef;
        })(hittest = core.hittest || (core.hittest = {}));
    })(core = minerva.core || (minerva.core = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var core;
    (function (core) {
        var measure;
        (function (measure) {
            var MeasureBinder = (function () {
                function MeasureBinder() {
                }
                MeasureBinder.prototype.bind = function (updater) {
                    var assets = updater.assets;
                    var last = assets.previousConstraint;
                    var old = new minerva.Size();
                    var tree = updater.tree;
                    if (!tree.surface && minerva.Size.isUndef(last) && !tree.visualParent && tree.isLayoutContainer)
                        last.width = last.height = Number.POSITIVE_INFINITY;
                    var success = false;
                    if (!minerva.Size.isUndef(last)) {
                        minerva.Size.copyTo(assets.desiredSize, old);
                        success = updater.measure(last);
                        if (minerva.Size.isEqual(old, assets.desiredSize))
                            return success;
                    }
                    if (tree.visualParent)
                        tree.visualParent.invalidateMeasure();
                    assets.dirtyFlags &= ~minerva.DirtyFlags.Measure;
                    return success;
                };
                return MeasureBinder;
            })();
            measure.MeasureBinder = MeasureBinder;
        })(measure = core.measure || (core.measure = {}));
    })(core = minerva.core || (minerva.core = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var core;
    (function (core) {
        var measure;
        (function (measure) {
            var MeasurePipeDef = (function (_super) {
                __extends(MeasurePipeDef, _super);
                function MeasurePipeDef() {
                    _super.call(this);
                    this.addTapin('validate', measure.tapins.validate)
                        .addTapin('validateVisibility', measure.tapins.validateVisibility)
                        .addTapin('applyTemplate', measure.tapins.applyTemplate)
                        .addTapin('checkNeedMeasure', measure.tapins.checkNeedMeasure)
                        .addTapin('invalidateFuture', measure.tapins.invalidateFuture)
                        .addTapin('prepareOverride', measure.tapins.prepareOverride)
                        .addTapin('doOverride', measure.tapins.doOverride)
                        .addTapin('completeOverride', measure.tapins.completeOverride)
                        .addTapin('finishDesired', measure.tapins.finishDesired);
                }
                MeasurePipeDef.prototype.createState = function () {
                    return {
                        availableSize: new minerva.Size()
                    };
                };
                MeasurePipeDef.prototype.createOutput = function () {
                    return {
                        previousConstraint: new minerva.Size(),
                        desiredSize: new minerva.Size(),
                        hiddenDesire: new minerva.Size(),
                        dirtyFlags: 0,
                        uiFlags: 0,
                        origDirtyFlags: 0,
                        origUiFlags: 0,
                        newUpDirty: 0,
                        newDownDirty: 0,
                        newUiFlags: 0
                    };
                };
                MeasurePipeDef.prototype.prepare = function (input, state, output) {
                    minerva.Size.copyTo(input.previousConstraint, output.previousConstraint);
                    minerva.Size.copyTo(input.desiredSize, output.desiredSize);
                    minerva.Size.copyTo(input.hiddenDesire, output.hiddenDesire);
                    output.origDirtyFlags = output.dirtyFlags = input.dirtyFlags;
                    output.origUiFlags = output.uiFlags = input.uiFlags;
                };
                MeasurePipeDef.prototype.flush = function (input, state, output) {
                    var newDirty = (output.dirtyFlags | input.dirtyFlags) & ~output.origDirtyFlags;
                    output.newUpDirty = newDirty & minerva.DirtyFlags.UpDirtyState;
                    output.newDownDirty = newDirty & minerva.DirtyFlags.DownDirtyState;
                    output.newUiFlags = (output.uiFlags | input.uiFlags) & ~output.origUiFlags;
                    input.dirtyFlags = output.dirtyFlags;
                    input.uiFlags = output.uiFlags;
                    minerva.Size.copyTo(output.previousConstraint, input.previousConstraint);
                    minerva.Size.copyTo(output.hiddenDesire, input.hiddenDesire);
                    minerva.Size.copyTo(output.desiredSize, input.desiredSize);
                };
                return MeasurePipeDef;
            })(minerva.pipe.TriPipeDef);
            measure.MeasurePipeDef = MeasurePipeDef;
        })(measure = core.measure || (core.measure = {}));
    })(core = minerva.core || (minerva.core = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var core;
    (function (core) {
        var processdown;
        (function (processdown) {
            var ProcessDownPipeDef = (function (_super) {
                __extends(ProcessDownPipeDef, _super);
                function ProcessDownPipeDef() {
                    _super.call(this);
                    this.addTapin('processRenderVisibility', processdown.tapins.processRenderVisibility)
                        .addTapin('processHitTestVisibility', processdown.tapins.processHitTestVisibility)
                        .addTapin('calcXformOrigin', processdown.tapins.calcXformOrigin)
                        .addTapin('processLocalXform', processdown.tapins.processLocalXform)
                        .addTapin('calcRenderXform', processdown.tapins.calcRenderXform)
                        .addTapin('calcAbsoluteXform', processdown.tapins.calcAbsoluteXform)
                        .addTapin('processXform', processdown.tapins.processXform)
                        .addTapin('processLayoutClip', processdown.tapins.processLayoutClip)
                        .addTapin('propagateDirtyToChildren', processdown.tapins.propagateDirtyToChildren);
                }
                ProcessDownPipeDef.prototype.createState = function () {
                    return {
                        xformOrigin: new minerva.Point(),
                        localXform: minerva.mat3.identity(),
                        subtreeDownDirty: 0
                    };
                };
                ProcessDownPipeDef.prototype.createOutput = function () {
                    return {
                        totalIsRenderVisible: false,
                        totalOpacity: 1.0,
                        totalIsHitTestVisible: false,
                        z: NaN,
                        compositeLayoutClip: new minerva.Rect(),
                        renderXform: minerva.mat3.identity(),
                        absoluteXform: minerva.mat3.identity(),
                        dirtyFlags: 0,
                        newUpDirty: 0
                    };
                };
                ProcessDownPipeDef.prototype.prepare = function (input, state, output, vpinput, tree) {
                    if ((input.dirtyFlags & minerva.DirtyFlags.LocalTransform) > 0) {
                        input.dirtyFlags |= minerva.DirtyFlags.Transform;
                    }
                    output.dirtyFlags = input.dirtyFlags;
                    output.totalIsRenderVisible = input.totalIsRenderVisible;
                    output.totalOpacity = input.totalOpacity;
                    output.totalIsHitTestVisible = input.totalIsHitTestVisible;
                    output.z = input.z;
                    minerva.Rect.copyTo(input.compositeLayoutClip, output.compositeLayoutClip);
                    minerva.mat3.copyTo(input.renderXform, output.renderXform);
                    minerva.mat3.copyTo(input.absoluteXform, output.absoluteXform);
                    state.subtreeDownDirty = 0;
                };
                ProcessDownPipeDef.prototype.flush = function (input, state, output, vpinput, tree) {
                    output.newUpDirty = (output.dirtyFlags & ~input.dirtyFlags) & minerva.DirtyFlags.UpDirtyState;
                    input.dirtyFlags = output.dirtyFlags & ~minerva.DirtyFlags.DownDirtyState;
                    input.totalIsRenderVisible = output.totalIsRenderVisible;
                    input.totalOpacity = output.totalOpacity;
                    input.totalIsHitTestVisible = output.totalIsHitTestVisible;
                    input.z = output.z;
                    minerva.Rect.copyTo(output.compositeLayoutClip, input.compositeLayoutClip);
                    minerva.mat3.copyTo(output.renderXform, input.renderXform);
                    minerva.mat3.copyTo(output.absoluteXform, input.absoluteXform);
                };
                return ProcessDownPipeDef;
            })(minerva.pipe.TriPipeDef);
            processdown.ProcessDownPipeDef = ProcessDownPipeDef;
        })(processdown = core.processdown || (core.processdown = {}));
    })(core = minerva.core || (minerva.core = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var core;
    (function (core) {
        var processup;
        (function (processup) {
            var ProcessUpPipeDef = (function (_super) {
                __extends(ProcessUpPipeDef, _super);
                function ProcessUpPipeDef() {
                    _super.call(this);
                    this.addTapin('calcActualSize', processup.tapins.calcActualSize)
                        .addTapin('calcExtents', processup.tapins.calcExtents)
                        .addTapin('calcPaintBounds', processup.tapins.calcPaintBounds)
                        .addTapin('processBounds', processup.tapins.processBounds)
                        .addTapin('processNewBounds', processup.tapins.processNewBounds)
                        .addTapin('processInvalidate', processup.tapins.processInvalidate);
                }
                ProcessUpPipeDef.prototype.createState = function () {
                    return {
                        invalidateSubtreePaint: false,
                        actualSize: new minerva.Size(),
                        hasNewBounds: false,
                        hasInvalidate: false
                    };
                };
                ProcessUpPipeDef.prototype.createOutput = function () {
                    return {
                        extents: new minerva.Rect(),
                        extentsWithChildren: new minerva.Rect(),
                        globalBoundsWithChildren: new minerva.Rect(),
                        surfaceBoundsWithChildren: new minerva.Rect(),
                        dirtyFlags: 0,
                        dirtyRegion: new minerva.Rect(),
                        forceInvalidate: false
                    };
                };
                ProcessUpPipeDef.prototype.prepare = function (input, state, output) {
                    output.dirtyFlags = input.dirtyFlags;
                    minerva.Rect.copyTo(input.extents, output.extents);
                    minerva.Rect.copyTo(input.extentsWithChildren, output.extentsWithChildren);
                    minerva.Rect.copyTo(input.globalBoundsWithChildren, output.globalBoundsWithChildren);
                    minerva.Rect.copyTo(input.surfaceBoundsWithChildren, output.surfaceBoundsWithChildren);
                    minerva.Rect.copyTo(input.dirtyRegion, output.dirtyRegion);
                    output.forceInvalidate = input.forceInvalidate;
                };
                ProcessUpPipeDef.prototype.flush = function (input, state, output) {
                    input.dirtyFlags = output.dirtyFlags & ~minerva.DirtyFlags.UpDirtyState;
                    minerva.Rect.copyTo(output.extents, input.extents);
                    minerva.Rect.copyTo(output.extentsWithChildren, input.extentsWithChildren);
                    minerva.Rect.copyTo(output.globalBoundsWithChildren, input.globalBoundsWithChildren);
                    minerva.Rect.copyTo(output.surfaceBoundsWithChildren, input.surfaceBoundsWithChildren);
                    minerva.Rect.copyTo(output.dirtyRegion, input.dirtyRegion);
                    input.forceInvalidate = output.forceInvalidate;
                };
                return ProcessUpPipeDef;
            })(minerva.pipe.TriPipeDef);
            processup.ProcessUpPipeDef = ProcessUpPipeDef;
        })(processup = core.processup || (core.processup = {}));
    })(core = minerva.core || (minerva.core = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var core;
    (function (core) {
        var render;
        (function (render) {
            var caps = [
                "butt",
                "square",
                "round",
                "butt"
            ];
            var joins = [
                "miter",
                "bevel",
                "round"
            ];
            var RenderContext = (function () {
                function RenderContext(ctx) {
                    this.$$transforms = [];
                    this.currentTransform = minerva.mat3.identity();
                    Object.defineProperties(this, {
                        "raw": { value: ctx, writable: false },
                        "currentTransform": { value: minerva.mat3.identity(), writable: false },
                        "hasFillRule": { value: RenderContext.hasFillRule, writable: false },
                        "size": { value: new render.RenderContextSize(), writable: false },
                    });
                    this.size.init(ctx);
                }
                Object.defineProperty(RenderContext, "hasFillRule", {
                    get: function () {
                        if (navigator.appName === "Microsoft Internet Explorer") {
                            var version = getIEVersion();
                            return version < 0 || version > 10;
                        }
                        return true;
                    },
                    enumerable: true,
                    configurable: true
                });
                RenderContext.prototype.applyDpiRatio = function () {
                    var ratio = this.size.dpiRatio;
                    this.scale(ratio, ratio);
                };
                RenderContext.prototype.save = function () {
                    this.$$transforms.push(minerva.mat3.create(this.currentTransform));
                    this.raw.save();
                };
                RenderContext.prototype.restore = function () {
                    var old = this.$$transforms.pop();
                    if (old)
                        minerva.mat3.copyTo(old, this.currentTransform);
                    this.raw.restore();
                };
                RenderContext.prototype.setTransform = function (m11, m12, m21, m22, dx, dy) {
                    minerva.mat3.copyTo([m11, m12, m21, m22, dx, dy], this.currentTransform);
                    this.raw.setTransform(m11, m12, m21, m22, dx, dy);
                };
                RenderContext.prototype.resetTransform = function () {
                    minerva.mat3.identity(this.currentTransform);
                    var raw = this.raw;
                    if (raw.resetTransform)
                        raw.resetTransform();
                };
                RenderContext.prototype.transform = function (m11, m12, m21, m22, dx, dy) {
                    var ct = this.currentTransform;
                    minerva.mat3.multiply(ct, minerva.mat3.create([m11, m12, m21, m22, dx, dy]), ct);
                    this.raw.transform(m11, m12, m21, m22, dx, dy);
                };
                RenderContext.prototype.scale = function (x, y) {
                    minerva.mat3.scale(this.currentTransform, x, y);
                    this.raw.scale(x, y);
                };
                RenderContext.prototype.rotate = function (angle) {
                    var ct = this.currentTransform;
                    var r = minerva.mat3.createRotate(angle);
                    minerva.mat3.multiply(ct, r, ct);
                    this.raw.rotate(angle);
                };
                RenderContext.prototype.translate = function (x, y) {
                    minerva.mat3.translate(this.currentTransform, x, y);
                    this.raw.translate(x, y);
                };
                RenderContext.prototype.apply = function (mat) {
                    var ct = minerva.mat3.apply(this.currentTransform, mat);
                    this.raw.setTransform(ct[0], ct[1], ct[2], ct[3], ct[4], ct[5]);
                };
                RenderContext.prototype.preapply = function (mat) {
                    var ct = minerva.mat3.preapply(this.currentTransform, mat);
                    this.raw.setTransform(ct[0], ct[1], ct[2], ct[3], ct[4], ct[5]);
                };
                RenderContext.prototype.clipGeometry = function (geom) {
                    geom.Draw(this);
                    this.raw.clip();
                };
                RenderContext.prototype.clipRect = function (rect) {
                    var raw = this.raw;
                    raw.beginPath();
                    raw.rect(rect.x, rect.y, rect.width, rect.height);
                    raw.clip();
                };
                RenderContext.prototype.fillEx = function (brush, region, fillRule) {
                    var raw = this.raw;
                    brush.setupBrush(raw, region);
                    raw.fillStyle = brush.toHtml5Object();
                    if (fillRule == null) {
                        raw.fillRule = raw.msFillRule = "nonzero";
                        raw.fill();
                    }
                    else {
                        var fr = fillRule === minerva.FillRule.EvenOdd ? "evenodd" : "nonzero";
                        raw.fillRule = raw.msFillRule = fr;
                        raw.fill(fr);
                    }
                };
                RenderContext.prototype.isPointInStrokeEx = function (strokePars, x, y) {
                    var raw = this.raw;
                    raw.lineWidth = strokePars.strokeThickness;
                    raw.lineCap = caps[strokePars.strokeStartLineCap || strokePars.strokeEndLineCap || 0] || caps[0];
                    raw.lineJoin = joins[strokePars.strokeLineJoin || 0] || joins[0];
                    raw.miterLimit = strokePars.strokeMiterLimit;
                    return raw.isPointInStroke(x, y);
                };
                return RenderContext;
            })();
            render.RenderContext = RenderContext;
            function getIEVersion() {
                var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
                if (re.exec(navigator.userAgent) != null)
                    return parseFloat(RegExp.$1);
                return -1;
            }
        })(render = core.render || (core.render = {}));
    })(core = minerva.core || (minerva.core = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var core;
    (function (core) {
        var render;
        (function (render) {
            var epsilon = 1e-10;
            var RenderContextSize = (function () {
                function RenderContextSize() {
                    this.$$ctx = null;
                    this.$$desiredWidth = 0;
                    this.$$desiredHeight = 0;
                    this.$$changed = null;
                    this.$$lastDpiRatio = 1;
                }
                Object.defineProperty(RenderContextSize.prototype, "desiredWidth", {
                    get: function () {
                        return this.$$desiredWidth;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RenderContextSize.prototype, "desiredHeight", {
                    get: function () {
                        return this.$$desiredHeight;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RenderContextSize.prototype, "paintWidth", {
                    get: function () {
                        return this.$$desiredWidth * this.dpiRatio;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RenderContextSize.prototype, "paintHeight", {
                    get: function () {
                        return this.$$desiredHeight * this.dpiRatio;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RenderContextSize.prototype, "dpiRatio", {
                    get: function () {
                        return (window.devicePixelRatio || 1) / this.$$ctx.backingStorePixelRatio;
                    },
                    enumerable: true,
                    configurable: true
                });
                RenderContextSize.prototype.init = function (ctx) {
                    this.$$ctx = ctx;
                    var desired = minerva.getNaturalCanvasSize(ctx.canvas);
                    this.$$desiredWidth = desired.width;
                    this.$$desiredHeight = desired.height;
                    this.$adjustCanvas();
                };
                RenderContextSize.prototype.queueResize = function (width, height) {
                    if (this.$$changed) {
                        this.$$changed.width = width;
                        this.$$changed.height = height;
                    }
                    else {
                        this.$$changed = {
                            width: width,
                            height: height
                        };
                    }
                    return this;
                };
                RenderContextSize.prototype.commitResize = function () {
                    if (this.$$changed) {
                        if (Math.abs(this.$$changed.width - this.$$desiredWidth) < epsilon && Math.abs(this.$$changed.height - this.$$desiredHeight) < epsilon)
                            return;
                        this.$$desiredWidth = this.$$changed.width;
                        this.$$desiredHeight = this.$$changed.height;
                        this.$$changed = null;
                        this.$adjustCanvas();
                    }
                    return this;
                };
                RenderContextSize.prototype.updateDpiRatio = function () {
                    if (this.$$lastDpiRatio === this.dpiRatio)
                        return false;
                    this.$adjustCanvas();
                    return true;
                };
                RenderContextSize.prototype.$adjustCanvas = function () {
                    var canvas = this.$$ctx.canvas;
                    var dpiRatio = this.dpiRatio;
                    if (Math.abs(dpiRatio - 1) < epsilon) {
                        canvas.width = this.desiredWidth;
                        canvas.height = this.desiredHeight;
                    }
                    else {
                        canvas.width = this.paintWidth;
                        canvas.height = this.paintHeight;
                        canvas.style.width = this.desiredWidth.toString() + "px";
                        canvas.style.height = this.desiredHeight.toString() + "px";
                    }
                    this.$$lastDpiRatio = dpiRatio;
                };
                return RenderContextSize;
            })();
            render.RenderContextSize = RenderContextSize;
        })(render = core.render || (core.render = {}));
    })(core = minerva.core || (minerva.core = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var core;
    (function (core) {
        var render;
        (function (render) {
            var RenderPipeDef = (function (_super) {
                __extends(RenderPipeDef, _super);
                function RenderPipeDef() {
                    _super.call(this);
                    this.addTapin('validate', render.tapins.validate)
                        .addTapin('validateRegion', render.tapins.validateRegion)
                        .addTapin('prepareContext', render.tapins.prepareContext)
                        .addTapin('applyClip', render.tapins.applyClip)
                        .addTapin('preRender', render.tapins.preRender)
                        .addTapin('doRender', render.tapins.doRender)
                        .addTapin('postRender', render.tapins.postRender)
                        .addTapin('renderChildren', render.tapins.renderChildren)
                        .addTapin('restoreContext', render.tapins.restoreContext);
                }
                RenderPipeDef.prototype.createState = function () {
                    return {
                        renderRegion: new minerva.Rect()
                    };
                };
                RenderPipeDef.prototype.createOutput = function () {
                    return {};
                };
                return RenderPipeDef;
            })(minerva.pipe.TriPipeDef);
            render.RenderPipeDef = RenderPipeDef;
        })(render = core.render || (core.render = {}));
    })(core = minerva.core || (minerva.core = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var core;
    (function (core) {
        var sizing;
        (function (sizing) {
            var SizingPipeDef = (function (_super) {
                __extends(SizingPipeDef, _super);
                function SizingPipeDef() {
                    _super.call(this);
                    this.addTapin('calcUseRender', sizing.tapins.calcUseRender)
                        .addTapin('computeActual', sizing.tapins.computeActual);
                }
                SizingPipeDef.prototype.createState = function () {
                    return {
                        useRender: false
                    };
                };
                SizingPipeDef.prototype.createOutput = function () {
                    return {
                        actualSize: new minerva.Size()
                    };
                };
                SizingPipeDef.prototype.prepare = function (input, state, output, tree) {
                };
                SizingPipeDef.prototype.flush = function (input, state, output, tree) {
                    var as = output.actualSize;
                    input.actualWidth = as.width;
                    input.actualHeight = as.height;
                };
                return SizingPipeDef;
            })(minerva.pipe.TriPipeDef);
            sizing.SizingPipeDef = SizingPipeDef;
        })(sizing = core.sizing || (core.sizing = {}));
    })(core = minerva.core || (minerva.core = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var core;
    (function (core) {
        var arrange;
        (function (arrange) {
            var tapins;
            (function (tapins) {
                tapins.applyRounding = function (input, state, output, tree, finalRect) {
                    var fr = state.finalRect;
                    if (input.useLayoutRounding) {
                        fr.x = Math.round(finalRect.x);
                        fr.y = Math.round(finalRect.y);
                        fr.width = Math.round(finalRect.width);
                        fr.height = Math.round(finalRect.height);
                    }
                    else {
                        minerva.Rect.copyTo(finalRect, fr);
                    }
                    return true;
                };
            })(tapins = arrange.tapins || (arrange.tapins = {}));
        })(arrange = core.arrange || (core.arrange = {}));
    })(core = minerva.core || (minerva.core = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var core;
    (function (core) {
        var arrange;
        (function (arrange) {
            var tapins;
            (function (tapins) {
                var testRect = new minerva.Rect();
                var fwClip = new minerva.Rect();
                tapins.buildLayoutClip = function (input, state, output, tree, finalRect) {
                    var lc = output.layoutClip;
                    minerva.Rect.copyTo(state.finalRect, lc);
                    var vo = output.visualOffset;
                    lc.x = Math.max(lc.x - vo.x, 0);
                    lc.y = Math.max(lc.y - vo.y, 0);
                    if (input.useLayoutRounding) {
                        lc.x = Math.round(lc.x);
                        lc.y = Math.round(lc.y);
                    }
                    testRect.x = testRect.y = 0;
                    var as = state.arrangedSize;
                    minerva.Size.copyTo(as, testRect);
                    if ((!tree.isTop && !minerva.Rect.isContainedIn(testRect, lc)) || !minerva.Size.isEqual(state.constrained, as)) {
                        fwClip.x = fwClip.y = 0;
                        fwClip.width = fwClip.height = Number.POSITIVE_INFINITY;
                        core.helpers.coerceSize(fwClip, input);
                        minerva.Rect.intersection(lc, fwClip);
                    }
                    else {
                        lc.x = lc.y = lc.width = lc.height = 0;
                    }
                    if (!minerva.Rect.isEqual(output.layoutClip, input.layoutClip)) {
                        output.dirtyFlags |= minerva.DirtyFlags.LayoutClip;
                    }
                    return true;
                };
            })(tapins = arrange.tapins || (arrange.tapins = {}));
        })(arrange = core.arrange || (core.arrange = {}));
    })(core = minerva.core || (minerva.core = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var core;
    (function (core) {
        var arrange;
        (function (arrange) {
            var tapins;
            (function (tapins) {
                tapins.buildLayoutXform = function (input, state, output, tree, finalRect) {
                    var vo = output.visualOffset;
                    var layoutXform = minerva.mat3.createTranslate(vo.x, vo.y, output.layoutXform);
                    if (state.flipHorizontal) {
                        minerva.mat3.translate(layoutXform, state.arrangedSize.width, 0);
                        minerva.mat3.scale(layoutXform, -1, 1);
                    }
                    if (!minerva.mat3.equal(input.layoutXform, output.layoutXform))
                        output.dirtyFlags |= minerva.DirtyFlags.LocalTransform;
                    return true;
                };
            })(tapins = arrange.tapins || (arrange.tapins = {}));
        })(arrange = core.arrange || (core.arrange = {}));
    })(core = minerva.core || (minerva.core = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var core;
    (function (core) {
        var arrange;
        (function (arrange) {
            var tapins;
            (function (tapins) {
                tapins.buildRenderSize = function (input, state, output, tree, finalRect) {
                    minerva.Size.copyTo(state.arrangedSize, output.renderSize);
                    if (!minerva.Size.isEqual(input.renderSize, output.renderSize)) {
                        if (!output.lastRenderSize) {
                            output.lastRenderSize = output.renderSize;
                            output.uiFlags |= minerva.UIFlags.SizeHint;
                        }
                    }
                    return true;
                };
            })(tapins = arrange.tapins || (arrange.tapins = {}));
        })(arrange = core.arrange || (core.arrange = {}));
    })(core = minerva.core || (minerva.core = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var core;
    (function (core) {
        var arrange;
        (function (arrange) {
            var tapins;
            (function (tapins) {
                tapins.calcFlip = function (input, state, output, tree, finalRect) {
                    /* TODO: IMPLEMENT
                     var flipHoriz = false;
                     var flowDirection = fe.FlowDirection;
                     var visualParentNode = <FENode>node.VisualParentNode;
                     if (visualParentNode)
                     flipHoriz = visualParentNode.XObject.FlowDirection !== flowDirection;
                     else if (node.ParentNode instanceof Controls.Primitives.PopupNode)
                     flipHoriz = (<Controls.Primitives.PopupNode>node.ParentNode).XObject.FlowDirection !== flowDirection;
                     else
                     flipHoriz = flowDirection === FlowDirection.RightToLeft;
                     */
                    state.flipHorizontal = false;
                    return true;
                };
            })(tapins = arrange.tapins || (arrange.tapins = {}));
        })(arrange = core.arrange || (core.arrange = {}));
    })(core = minerva.core || (minerva.core = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var core;
    (function (core) {
        var arrange;
        (function (arrange) {
            var tapins;
            (function (tapins) {
                tapins.calcStretched = function (input, state, output, tree, finalRect) {
                    minerva.Rect.copyTo(finalRect, output.layoutSlot);
                    var fr = state.finalRect;
                    minerva.Thickness.shrinkRect(input.margin, fr);
                    var stretched = state.stretched;
                    stretched.width = fr.width;
                    stretched.height = fr.height;
                    core.helpers.coerceSize(stretched, input);
                    return true;
                };
            })(tapins = arrange.tapins || (arrange.tapins = {}));
        })(arrange = core.arrange || (core.arrange = {}));
    })(core = minerva.core || (minerva.core = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var core;
    (function (core) {
        var arrange;
        (function (arrange) {
            var tapins;
            (function (tapins) {
                tapins.calcVisualOffset = function (input, state, output, tree, finalRect) {
                    var vo = output.visualOffset;
                    var fr = state.finalRect;
                    var constrained = state.constrained;
                    vo.x = fr.x;
                    vo.y = fr.y;
                    if (!tree.isTop) {
                        switch (input.horizontalAlignment) {
                            case minerva.HorizontalAlignment.Left:
                                break;
                            case minerva.HorizontalAlignment.Right:
                                vo.x += fr.width - constrained.width;
                                break;
                            case minerva.HorizontalAlignment.Center:
                                vo.x += (fr.width - constrained.width) * 0.5;
                                break;
                            default:
                                vo.x += Math.max((fr.width - constrained.width) * 0.5, 0);
                                break;
                        }
                        switch (input.verticalAlignment) {
                            case minerva.VerticalAlignment.Top:
                                break;
                            case minerva.VerticalAlignment.Bottom:
                                vo.y += fr.height - constrained.height;
                                break;
                            case minerva.VerticalAlignment.Center:
                                vo.y += (fr.height - constrained.height) * 0.5;
                                break;
                            default:
                                vo.y += Math.max((fr.height - constrained.height) * 0.5, 0);
                                break;
                        }
                    }
                    if (input.useLayoutRounding) {
                        vo.x = Math.round(vo.x);
                        vo.y = Math.round(vo.y);
                    }
                    return true;
                };
            })(tapins = arrange.tapins || (arrange.tapins = {}));
        })(arrange = core.arrange || (core.arrange = {}));
    })(core = minerva.core || (minerva.core = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var core;
    (function (core) {
        var arrange;
        (function (arrange) {
            var tapins;
            (function (tapins) {
                tapins.checkNeedArrange = function (input, state, output, tree, finalRect) {
                    if ((input.dirtyFlags & minerva.DirtyFlags.Arrange) > 0)
                        return true;
                    return !minerva.Rect.isEqual(output.layoutSlot, state.finalRect);
                };
            })(tapins = arrange.tapins || (arrange.tapins = {}));
        })(arrange = core.arrange || (core.arrange = {}));
    })(core = minerva.core || (minerva.core = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var core;
    (function (core) {
        var arrange;
        (function (arrange) {
            var tapins;
            (function (tapins) {
                tapins.completeOverride = function (input, state, output, tree, finalRect) {
                    output.dirtyFlags &= ~minerva.DirtyFlags.Arrange;
                    var as = state.arrangedSize;
                    if (input.horizontalAlignment === minerva.HorizontalAlignment.Stretch)
                        as.width = Math.max(as.width, state.framework.width);
                    if (input.verticalAlignment === minerva.VerticalAlignment.Stretch)
                        as.height = Math.max(as.height, state.framework.height);
                    if (input.useLayoutRounding) {
                        as.width = Math.round(as.width);
                        as.height = Math.round(as.height);
                    }
                    var constrained = state.constrained;
                    minerva.Size.copyTo(as, constrained);
                    core.helpers.coerceSize(constrained, input);
                    constrained.width = Math.min(constrained.width, as.width);
                    constrained.height = Math.min(constrained.height, as.height);
                    return true;
                };
            })(tapins = arrange.tapins || (arrange.tapins = {}));
        })(arrange = core.arrange || (core.arrange = {}));
    })(core = minerva.core || (minerva.core = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var core;
    (function (core) {
        var arrange;
        (function (arrange) {
            var tapins;
            (function (tapins) {
                tapins.doOverride = function (input, state, output, tree, finalRect) {
                    var cr = state.childRect;
                    cr.x = cr.y = 0;
                    minerva.Size.copyTo(state.finalSize, cr);
                    for (var walker = tree.walk(); walker.step();) {
                        var child = walker.current;
                        child.arrange(state.childRect);
                    }
                    minerva.Size.copyTo(cr, state.arrangedSize);
                    return true;
                };
            })(tapins = arrange.tapins || (arrange.tapins = {}));
        })(arrange = core.arrange || (core.arrange = {}));
    })(core = minerva.core || (minerva.core = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var core;
    (function (core) {
        var arrange;
        (function (arrange) {
            var tapins;
            (function (tapins) {
                tapins.invalidateFuture = function (input, state, output, tree, finalRect) {
                    var lc = output.layoutClip;
                    lc.x = lc.y = lc.width = lc.height = 0;
                    output.dirtyFlags |= minerva.DirtyFlags.LocalTransform;
                    output.dirtyFlags |= minerva.DirtyFlags.Bounds;
                    return true;
                };
            })(tapins = arrange.tapins || (arrange.tapins = {}));
        })(arrange = core.arrange || (core.arrange = {}));
    })(core = minerva.core || (minerva.core = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var core;
    (function (core) {
        var arrange;
        (function (arrange) {
            var tapins;
            (function (tapins) {
                tapins.prepareOverride = function (input, state, output, tree, finalRect) {
                    var framework = state.framework;
                    framework.width = 0;
                    framework.height = 0;
                    core.helpers.coerceSize(framework, input);
                    if (input.horizontalAlignment === minerva.HorizontalAlignment.Stretch)
                        framework.width = Math.max(framework.width, state.stretched.width);
                    if (input.verticalAlignment === minerva.VerticalAlignment.Stretch)
                        framework.height = Math.max(framework.height, state.stretched.height);
                    var fs = state.finalSize;
                    var hd = input.hiddenDesire;
                    fs.width = Math.max(hd.width, framework.width);
                    fs.height = Math.max(hd.height, framework.height);
                    return true;
                };
            })(tapins = arrange.tapins || (arrange.tapins = {}));
        })(arrange = core.arrange || (core.arrange = {}));
    })(core = minerva.core || (minerva.core = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var core;
    (function (core) {
        var arrange;
        (function (arrange) {
            var tapins;
            (function (tapins) {
                tapins.validateFinalRect = function (input, state, output, tree, finalRect) {
                    var fr = state.finalRect;
                    if (fr.width < 0 || fr.height < 0
                        || !isFinite(fr.width) || !isFinite(fr.height)
                        || isNaN(fr.width) || isNaN(fr.height)) {
                        minerva.layoutError(tree, this, "Invalid arguments to Arrange.");
                        return false;
                    }
                    return true;
                };
            })(tapins = arrange.tapins || (arrange.tapins = {}));
        })(arrange = core.arrange || (core.arrange = {}));
    })(core = minerva.core || (minerva.core = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var core;
    (function (core) {
        var arrange;
        (function (arrange) {
            var tapins;
            (function (tapins) {
                tapins.validateVisibility = function (input, state, output, tree, finalRect) {
                    if (input.visibility !== minerva.Visibility.Visible) {
                        minerva.Rect.copyTo(state.finalRect, output.layoutSlot);
                        return false;
                    }
                    return true;
                };
            })(tapins = arrange.tapins || (arrange.tapins = {}));
        })(arrange = core.arrange || (core.arrange = {}));
    })(core = minerva.core || (minerva.core = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var core;
    (function (core) {
        var draft;
        (function (draft) {
            var tapins;
            (function (tapins) {
                tapins.arrange = function (data) {
                    if (data.flag !== minerva.UIFlags.ArrangeHint)
                        return true;
                    if (data.arrangeList.length <= 0)
                        return false;
                    var updater;
                    while ((updater = data.arrangeList.shift()) != null) {
                        updater.doArrange();
                    }
                    return true;
                };
            })(tapins = draft.tapins || (draft.tapins = {}));
        })(draft = core.draft || (core.draft = {}));
    })(core = minerva.core || (minerva.core = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var core;
    (function (core) {
        var draft;
        (function (draft) {
            var tapins;
            (function (tapins) {
                tapins.determinePhase = function (data) {
                    data.flag = minerva.UIFlags.None;
                    var assets = data.assets;
                    if (assets.visibility !== minerva.Visibility.Visible)
                        return true;
                    if ((assets.uiFlags & minerva.UIFlags.MeasureHint) > 0) {
                        data.flag = minerva.UIFlags.MeasureHint;
                    }
                    else if ((assets.uiFlags & minerva.UIFlags.ArrangeHint) > 0) {
                        data.flag = minerva.UIFlags.ArrangeHint;
                    }
                    else if ((assets.uiFlags & minerva.UIFlags.SizeHint) > 0) {
                        data.flag = minerva.UIFlags.SizeHint;
                    }
                    else {
                        return false;
                    }
                    return true;
                };
            })(tapins = draft.tapins || (draft.tapins = {}));
        })(draft = core.draft || (core.draft = {}));
    })(core = minerva.core || (minerva.core = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var core;
    (function (core) {
        var draft;
        (function (draft) {
            var tapins;
            (function (tapins) {
                tapins.flushPrevious = function (data) {
                    var updater;
                    while ((updater = data.arrangeList.shift()) != null) {
                        core.Updater.$$propagateUiFlagsUp(updater, minerva.UIFlags.ArrangeHint);
                    }
                    while ((updater = data.sizingList.shift()) != null) {
                        core.Updater.$$propagateUiFlagsUp(updater, minerva.UIFlags.SizeHint);
                    }
                    return true;
                };
            })(tapins = draft.tapins || (draft.tapins = {}));
        })(draft = core.draft || (core.draft = {}));
    })(core = minerva.core || (minerva.core = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var core;
    (function (core) {
        var draft;
        (function (draft) {
            var tapins;
            (function (tapins) {
                tapins.measure = function (data) {
                    if (data.flag !== minerva.UIFlags.MeasureHint)
                        return true;
                    if (data.measureList.length <= 0)
                        return false;
                    var updater;
                    while ((updater = data.measureList.shift()) != null) {
                        updater.doMeasure();
                    }
                    return true;
                };
            })(tapins = draft.tapins || (draft.tapins = {}));
        })(draft = core.draft || (core.draft = {}));
    })(core = minerva.core || (minerva.core = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var core;
    (function (core) {
        var draft;
        (function (draft) {
            var tapins;
            (function (tapins) {
                tapins.notifyResize = function (data) {
                    if (data.flag !== minerva.UIFlags.SizeHint)
                        return true;
                    if (data.sizingUpdates.length <= 0)
                        return true;
                    var update;
                    while ((update = data.sizingUpdates.pop()) != null) {
                        update.updater.onSizeChanged(update.oldSize, update.newSize);
                    }
                    return true;
                };
            })(tapins = draft.tapins || (draft.tapins = {}));
        })(draft = core.draft || (core.draft = {}));
    })(core = minerva.core || (minerva.core = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var core;
    (function (core) {
        var draft;
        (function (draft) {
            var tapins;
            (function (tapins) {
                tapins.prepareArrange = function (data) {
                    if (data.flag !== minerva.UIFlags.ArrangeHint)
                        return true;
                    for (var walker = data.updater.walkDeep(); walker.step();) {
                        var assets = walker.current.assets;
                        if (assets.visibility !== minerva.Visibility.Visible) {
                            walker.skipBranch();
                            continue;
                        }
                        if ((assets.uiFlags & minerva.UIFlags.ArrangeHint) === 0) {
                            walker.skipBranch();
                            continue;
                        }
                        assets.uiFlags &= ~minerva.UIFlags.ArrangeHint;
                        if ((assets.dirtyFlags & minerva.DirtyFlags.Arrange) > 0)
                            data.arrangeList.push(walker.current);
                    }
                    return true;
                };
            })(tapins = draft.tapins || (draft.tapins = {}));
        })(draft = core.draft || (core.draft = {}));
    })(core = minerva.core || (minerva.core = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var core;
    (function (core) {
        var draft;
        (function (draft) {
            var tapins;
            (function (tapins) {
                tapins.prepareMeasure = function (data) {
                    if (data.flag !== minerva.UIFlags.MeasureHint)
                        return true;
                    var last = data.assets.previousConstraint;
                    if (data.tree.isContainer && (minerva.Size.isUndef(last) || (!minerva.Size.isEqual(last, data.surfaceSize)))) {
                        data.assets.dirtyFlags |= minerva.DirtyFlags.Measure;
                        minerva.Size.copyTo(data.surfaceSize, data.assets.previousConstraint);
                    }
                    for (var walker = data.updater.walkDeep(); walker.step();) {
                        var assets = walker.current.assets;
                        if (assets.visibility !== minerva.Visibility.Visible) {
                            walker.skipBranch();
                            continue;
                        }
                        if ((assets.uiFlags & minerva.UIFlags.MeasureHint) === 0) {
                            walker.skipBranch();
                            continue;
                        }
                        assets.uiFlags &= ~minerva.UIFlags.MeasureHint;
                        if ((assets.dirtyFlags & minerva.DirtyFlags.Measure) > 0)
                            data.measureList.push(walker.current);
                    }
                    return true;
                };
            })(tapins = draft.tapins || (draft.tapins = {}));
        })(draft = core.draft || (core.draft = {}));
    })(core = minerva.core || (minerva.core = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var core;
    (function (core) {
        var draft;
        (function (draft) {
            var tapins;
            (function (tapins) {
                tapins.prepareSizing = function (data) {
                    if (data.flag !== minerva.UIFlags.SizeHint)
                        return true;
                    for (var walker = data.updater.walkDeep(); walker.step();) {
                        var assets = walker.current.assets;
                        if (assets.visibility !== minerva.Visibility.Visible) {
                            walker.skipBranch();
                            continue;
                        }
                        if ((assets.uiFlags & minerva.UIFlags.SizeHint) === 0) {
                            walker.skipBranch();
                            continue;
                        }
                        assets.uiFlags &= ~minerva.UIFlags.SizeHint;
                        if (assets.lastRenderSize !== undefined)
                            data.sizingList.push(walker.current);
                    }
                    return true;
                };
            })(tapins = draft.tapins || (draft.tapins = {}));
        })(draft = core.draft || (core.draft = {}));
    })(core = minerva.core || (minerva.core = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var core;
    (function (core) {
        var draft;
        (function (draft) {
            var tapins;
            (function (tapins) {
                tapins.sizing = function (data) {
                    if (data.flag !== minerva.UIFlags.SizeHint)
                        return true;
                    if (data.sizingList.length <= 0)
                        return false;
                    var updater;
                    var oldSize = new minerva.Size();
                    var newSize = new minerva.Size();
                    while ((updater = data.sizingList.pop()) != null) {
                        updater.sizing(oldSize, newSize);
                        if (!minerva.Size.isEqual(oldSize, new minerva.Size)) {
                            data.sizingUpdates.push({
                                updater: updater,
                                oldSize: oldSize,
                                newSize: newSize
                            });
                            oldSize = new minerva.Size();
                            newSize = new minerva.Size();
                        }
                    }
                    return true;
                };
            })(tapins = draft.tapins || (draft.tapins = {}));
        })(draft = core.draft || (core.draft = {}));
    })(core = minerva.core || (minerva.core = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var core;
    (function (core) {
        var hittest;
        (function (hittest) {
            var tapins;
            (function (tapins) {
                function canHit(data, pos, hitList, ctx, includeAll) {
                    var assets = data.assets;
                    return !!assets.totalIsRenderVisible
                        && !!assets.totalIsHitTestVisible;
                }
                tapins.canHit = canHit;
            })(tapins = hittest.tapins || (hittest.tapins = {}));
        })(hittest = core.hittest || (core.hittest = {}));
    })(core = minerva.core || (minerva.core = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var core;
    (function (core) {
        var hittest;
        (function (hittest) {
            var tapins;
            (function (tapins) {
                function canHitInside(data, pos, hitList, ctx, includeAll) {
                    if (data.hitChildren)
                        return true;
                    hitList.shift();
                    ctx.restore();
                    return false;
                }
                tapins.canHitInside = canHitInside;
            })(tapins = hittest.tapins || (hittest.tapins = {}));
        })(hittest = core.hittest || (core.hittest = {}));
    })(core = minerva.core || (minerva.core = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var core;
    (function (core) {
        var hittest;
        (function (hittest) {
            var tapins;
            (function (tapins) {
                function completeCtx(data, pos, hitList, ctx, includeAll) {
                    ctx.restore();
                    return true;
                }
                tapins.completeCtx = completeCtx;
            })(tapins = hittest.tapins || (hittest.tapins = {}));
        })(hittest = core.hittest || (core.hittest = {}));
    })(core = minerva.core || (minerva.core = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var core;
    (function (core) {
        var hittest;
        (function (hittest) {
            var tapins;
            (function (tapins) {
                function insideChildren(data, pos, hitList, ctx, includeAll) {
                    hitList.unshift(data.updater);
                    var hit = false;
                    for (var walker = data.tree.walk(minerva.WalkDirection.ZReverse); walker.step();) {
                        hit = walker.current.hitTest(pos, hitList, ctx, includeAll) || hit;
                        if (hit && !includeAll)
                            break;
                    }
                    data.hitChildren = hit;
                    return true;
                }
                tapins.insideChildren = insideChildren;
            })(tapins = hittest.tapins || (hittest.tapins = {}));
        })(hittest = core.hittest || (core.hittest = {}));
    })(core = minerva.core || (minerva.core = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var core;
    (function (core) {
        var hittest;
        (function (hittest) {
            var tapins;
            (function (tapins) {
                function insideClip(data, pos, hitList, ctx, includeAll) {
                    var clip = data.assets.clip;
                    if (!clip)
                        return true;
                    var bounds = clip.GetBounds();
                    minerva.Rect.transform(bounds, ctx.currentTransform);
                    if (!minerva.Rect.containsPoint(bounds, pos)) {
                        ctx.restore();
                        return false;
                    }
                    clip.Draw(ctx);
                    if (!ctx.raw.isPointInPath(pos.x, pos.y)) {
                        ctx.restore();
                        return false;
                    }
                    return true;
                }
                tapins.insideClip = insideClip;
            })(tapins = hittest.tapins || (hittest.tapins = {}));
        })(hittest = core.hittest || (core.hittest = {}));
    })(core = minerva.core || (minerva.core = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var core;
    (function (core) {
        var hittest;
        (function (hittest) {
            var tapins;
            (function (tapins) {
                function insideLayoutClip(data, pos, hitList, ctx, includeAll) {
                    if (data.hitChildren)
                        return true;
                    var clc = data.assets.compositeLayoutClip;
                    if (!clc || minerva.Rect.isEmpty(clc))
                        return true;
                    var lcbounds = data.layoutClipBounds;
                    minerva.Rect.copyTo(clc, lcbounds);
                    minerva.Rect.transform(lcbounds, ctx.currentTransform);
                    if (!minerva.Rect.containsPoint(lcbounds, pos)) {
                        hitList.shift();
                        ctx.restore();
                        return false;
                    }
                    return true;
                }
                tapins.insideLayoutClip = insideLayoutClip;
            })(tapins = hittest.tapins || (hittest.tapins = {}));
        })(hittest = core.hittest || (core.hittest = {}));
    })(core = minerva.core || (minerva.core = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var core;
    (function (core) {
        var hittest;
        (function (hittest) {
            var tapins;
            (function (tapins) {
                function insideObject(data, pos, hitList, ctx, includeAll) {
                    if (data.hitChildren)
                        return true;
                    var bounds = data.bounds;
                    minerva.Rect.copyTo(data.assets.extents, bounds);
                    minerva.Rect.transform(bounds, ctx.currentTransform);
                    if (!minerva.Rect.containsPoint(bounds, pos)) {
                        hitList.shift();
                        ctx.restore();
                        return false;
                    }
                    return true;
                }
                tapins.insideObject = insideObject;
            })(tapins = hittest.tapins || (hittest.tapins = {}));
        })(hittest = core.hittest || (core.hittest = {}));
    })(core = minerva.core || (minerva.core = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var core;
    (function (core) {
        var hittest;
        (function (hittest) {
            var tapins;
            (function (tapins) {
                function prepareCtx(data, pos, hitList, ctx, includeAll) {
                    ctx.save();
                    ctx.preapply(data.assets.renderXform);
                    return true;
                }
                tapins.prepareCtx = prepareCtx;
            })(tapins = hittest.tapins || (hittest.tapins = {}));
        })(hittest = core.hittest || (core.hittest = {}));
    })(core = minerva.core || (minerva.core = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var core;
    (function (core) {
        var measure;
        (function (measure) {
            var tapins;
            (function (tapins) {
                tapins.applyTemplate = function (input, state, output, tree, availableSize) {
                    tree.applyTemplate();
                    return true;
                };
            })(tapins = measure.tapins || (measure.tapins = {}));
        })(measure = core.measure || (core.measure = {}));
    })(core = minerva.core || (minerva.core = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var core;
    (function (core) {
        var measure;
        (function (measure) {
            var tapins;
            (function (tapins) {
                tapins.checkNeedMeasure = function (input, state, output, tree, availableSize) {
                    if ((input.dirtyFlags & minerva.DirtyFlags.Measure) > 0)
                        return true;
                    var pc = input.previousConstraint;
                    if (minerva.Size.isUndef(pc) || pc.width !== availableSize.width || pc.height !== availableSize.height) {
                        minerva.Size.copyTo(availableSize, output.previousConstraint);
                        return true;
                    }
                    return false;
                };
            })(tapins = measure.tapins || (measure.tapins = {}));
        })(measure = core.measure || (core.measure = {}));
    })(core = minerva.core || (minerva.core = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var core;
    (function (core) {
        var measure;
        (function (measure) {
            var tapins;
            (function (tapins) {
                tapins.completeOverride = function (input, state, output, tree, availableSize) {
                    output.dirtyFlags &= ~minerva.DirtyFlags.Measure;
                    minerva.Size.copyTo(output.desiredSize, output.hiddenDesire);
                    return true;
                };
            })(tapins = measure.tapins || (measure.tapins = {}));
        })(measure = core.measure || (core.measure = {}));
    })(core = minerva.core || (minerva.core = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var core;
    (function (core) {
        var measure;
        (function (measure) {
            var tapins;
            (function (tapins) {
                tapins.doOverride = function (input, state, output, tree, availableSize) {
                    var ds = output.desiredSize;
                    ds.width = ds.height = 0;
                    for (var walker = tree.walk(); walker.step();) {
                        var child = walker.current;
                        child.measure(state.availableSize);
                        minerva.Size.copyTo(child.assets.desiredSize, ds);
                    }
                    return true;
                };
            })(tapins = measure.tapins || (measure.tapins = {}));
        })(measure = core.measure || (core.measure = {}));
    })(core = minerva.core || (minerva.core = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var core;
    (function (core) {
        var measure;
        (function (measure) {
            var tapins;
            (function (tapins) {
                tapins.finishDesired = function (input, state, output, tree, availableSize) {
                    var ds = output.desiredSize;
                    core.helpers.coerceSize(ds, input);
                    minerva.Thickness.growSize(input.margin, ds);
                    ds.width = Math.min(ds.width, availableSize.width);
                    ds.height = Math.min(ds.height, availableSize.height);
                    if (input.useLayoutRounding) {
                        ds.width = Math.round(ds.width);
                        ds.height = Math.round(ds.height);
                    }
                    return true;
                };
            })(tapins = measure.tapins || (measure.tapins = {}));
        })(measure = core.measure || (core.measure = {}));
    })(core = minerva.core || (minerva.core = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var core;
    (function (core) {
        var measure;
        (function (measure) {
            var tapins;
            (function (tapins) {
                tapins.invalidateFuture = function (input, state, output, tree, availableSize) {
                    output.dirtyFlags |= minerva.DirtyFlags.Arrange;
                    output.uiFlags |= minerva.UIFlags.ArrangeHint;
                    output.dirtyFlags |= minerva.DirtyFlags.Bounds;
                    return true;
                };
            })(tapins = measure.tapins || (measure.tapins = {}));
        })(measure = core.measure || (core.measure = {}));
    })(core = minerva.core || (minerva.core = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var core;
    (function (core) {
        var measure;
        (function (measure) {
            var tapins;
            (function (tapins) {
                tapins.prepareOverride = function (input, state, output, tree, availableSize) {
                    minerva.Size.copyTo(availableSize, state.availableSize);
                    minerva.Thickness.shrinkSize(input.margin, state.availableSize);
                    core.helpers.coerceSize(state.availableSize, input);
                    return true;
                };
            })(tapins = measure.tapins || (measure.tapins = {}));
        })(measure = core.measure || (core.measure = {}));
    })(core = minerva.core || (minerva.core = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var core;
    (function (core) {
        var measure;
        (function (measure) {
            var tapins;
            (function (tapins) {
                tapins.validate = function (input, state, output, tree, availableSize) {
                    if (isNaN(availableSize.width) || isNaN(availableSize.height)) {
                        minerva.layoutError(tree, this, "Cannot call Measure using a size with NaN values.");
                        return false;
                    }
                    return true;
                };
            })(tapins = measure.tapins || (measure.tapins = {}));
        })(measure = core.measure || (core.measure = {}));
    })(core = minerva.core || (minerva.core = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var core;
    (function (core) {
        var measure;
        (function (measure) {
            var tapins;
            (function (tapins) {
                tapins.validateVisibility = function (input, state, output, tree, availableSize) {
                    if (input.visibility !== minerva.Visibility.Visible) {
                        minerva.Size.copyTo(availableSize, output.previousConstraint);
                        var ds = output.desiredSize;
                        ds.width = ds.height = 0;
                        return false;
                    }
                    return true;
                };
            })(tapins = measure.tapins || (measure.tapins = {}));
        })(measure = core.measure || (core.measure = {}));
    })(core = minerva.core || (minerva.core = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var core;
    (function (core) {
        var processdown;
        (function (processdown) {
            var tapins;
            (function (tapins) {
                tapins.calcAbsoluteXform = function (input, state, output, vpinput, tree) {
                    if ((input.dirtyFlags & minerva.DirtyFlags.Transform) === 0)
                        return true;
                    var ax = output.absoluteXform;
                    minerva.mat3.copyTo(output.renderXform, ax);
                    if (vpinput)
                        minerva.mat3.apply(ax, vpinput.absoluteXform);
                    return true;
                };
            })(tapins = processdown.tapins || (processdown.tapins = {}));
        })(processdown = core.processdown || (core.processdown = {}));
    })(core = minerva.core || (minerva.core = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var core;
    (function (core) {
        var processdown;
        (function (processdown) {
            var tapins;
            (function (tapins) {
                tapins.calcRenderXform = function (input, state, output, vpinput, tree) {
                    if ((input.dirtyFlags & minerva.DirtyFlags.Transform) === 0)
                        return true;
                    var rx = output.renderXform;
                    minerva.mat3.copyTo(state.localXform, rx);
                    minerva.mat3.apply(rx, input.layoutXform);
                    if (input.carrierXform)
                        minerva.mat3.apply(rx, input.carrierXform);
                    return true;
                };
            })(tapins = processdown.tapins || (processdown.tapins = {}));
        })(processdown = core.processdown || (core.processdown = {}));
    })(core = minerva.core || (minerva.core = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var core;
    (function (core) {
        var processdown;
        (function (processdown) {
            var tapins;
            (function (tapins) {
                tapins.calcXformOrigin = function (input, state, output, vpinput, tree) {
                    var xo = state.xformOrigin;
                    var userxo = input.renderTransformOrigin;
                    if (!userxo) {
                        xo.x = 0;
                        xo.y = 0;
                    }
                    else {
                        xo.x = input.actualWidth * userxo.x;
                        xo.y = input.actualHeight * userxo.y;
                    }
                    return true;
                };
            })(tapins = processdown.tapins || (processdown.tapins = {}));
        })(processdown = core.processdown || (core.processdown = {}));
    })(core = minerva.core || (minerva.core = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var core;
    (function (core) {
        var processdown;
        (function (processdown) {
            var tapins;
            (function (tapins) {
                tapins.processHitTestVisibility = function (input, state, output, vpinput, tree) {
                    if ((input.dirtyFlags & minerva.DirtyFlags.HitTestVisibility) === 0)
                        return true;
                    if (vpinput) {
                        output.totalIsHitTestVisible = vpinput.totalIsHitTestVisible && input.isHitTestVisible;
                    }
                    else {
                        output.totalIsHitTestVisible = input.isHitTestVisible;
                    }
                    if (output.totalIsHitTestVisible !== input.totalIsHitTestVisible)
                        state.subtreeDownDirty |= minerva.DirtyFlags.HitTestVisibility;
                    return true;
                };
            })(tapins = processdown.tapins || (processdown.tapins = {}));
        })(processdown = core.processdown || (core.processdown = {}));
    })(core = minerva.core || (minerva.core = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var core;
    (function (core) {
        var processdown;
        (function (processdown) {
            var tapins;
            (function (tapins) {
                tapins.processLayoutClip = function (input, state, output, vpinput, tree) {
                    if ((input.dirtyFlags & minerva.DirtyFlags.LayoutClip) === 0)
                        return true;
                    var lc = input.layoutClip;
                    var clc = output.compositeLayoutClip;
                    if (!vpinput || minerva.Rect.isEmpty(vpinput.compositeLayoutClip)) {
                        minerva.Rect.copyTo(lc, clc);
                    }
                    else {
                        minerva.Rect.copyTo(vpinput.compositeLayoutClip, clc);
                        if (!minerva.Rect.isEmpty(lc))
                            minerva.Rect.intersection(clc, lc);
                    }
                    if (!minerva.Rect.isEqual(input.compositeLayoutClip, output.compositeLayoutClip)) {
                        state.subtreeDownDirty |= minerva.DirtyFlags.LayoutClip;
                    }
                    return true;
                };
            })(tapins = processdown.tapins || (processdown.tapins = {}));
        })(processdown = core.processdown || (core.processdown = {}));
    })(core = minerva.core || (minerva.core = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var core;
    (function (core) {
        var processdown;
        (function (processdown) {
            var tapins;
            (function (tapins) {
                tapins.processLocalXform = function (input, state, output, vpinput, tree) {
                    if ((input.dirtyFlags & minerva.DirtyFlags.LocalTransform) === 0)
                        return true;
                    var local = minerva.mat3.identity(state.localXform);
                    var render = input.renderTransform;
                    if (!render)
                        return true;
                    var origin = state.xformOrigin;
                    minerva.mat3.translate(local, -origin.x, -origin.y);
                    minerva.mat3.apply(local, render.getRaw());
                    minerva.mat3.translate(local, origin.x, origin.y);
                    return true;
                };
            })(tapins = processdown.tapins || (processdown.tapins = {}));
        })(processdown = core.processdown || (core.processdown = {}));
    })(core = minerva.core || (minerva.core = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var core;
    (function (core) {
        var processdown;
        (function (processdown) {
            var tapins;
            (function (tapins) {
                tapins.processRenderVisibility = function (input, state, output, vpinput, tree) {
                    if ((input.dirtyFlags & minerva.DirtyFlags.RenderVisibility) === 0)
                        return true;
                    output.dirtyFlags |= minerva.DirtyFlags.Bounds;
                    if (vpinput) {
                        output.totalOpacity = vpinput.totalOpacity * input.opacity;
                        output.totalIsRenderVisible = vpinput.totalIsRenderVisible && (input.visibility === minerva.Visibility.Visible);
                    }
                    else {
                        output.totalOpacity = input.opacity;
                        output.totalIsRenderVisible = input.visibility === minerva.Visibility.Visible;
                    }
                    if (input.totalIsRenderVisible !== output.totalIsRenderVisible) {
                        output.dirtyFlags |= minerva.DirtyFlags.NewBounds;
                        state.subtreeDownDirty |= minerva.DirtyFlags.RenderVisibility;
                    }
                    if (input.totalOpacity !== output.totalOpacity) {
                        state.subtreeDownDirty |= minerva.DirtyFlags.RenderVisibility;
                    }
                    return true;
                };
            })(tapins = processdown.tapins || (processdown.tapins = {}));
        })(processdown = core.processdown || (core.processdown = {}));
    })(core = minerva.core || (minerva.core = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var core;
    (function (core) {
        var processdown;
        (function (processdown) {
            var tapins;
            (function (tapins) {
                tapins.processXform = function (input, state, output, vpinput, tree) {
                    if ((input.dirtyFlags & minerva.DirtyFlags.Transform) === 0)
                        return true;
                    if (!minerva.mat3.equal(input.renderXform, output.renderXform)) {
                        output.dirtyFlags |= minerva.DirtyFlags.NewBounds;
                        state.subtreeDownDirty |= minerva.DirtyFlags.Transform;
                    }
                    else if (!minerva.mat3.equal(input.absoluteXform, output.absoluteXform)) {
                        state.subtreeDownDirty |= minerva.DirtyFlags.Transform;
                    }
                    output.dirtyFlags |= minerva.DirtyFlags.Bounds;
                    return true;
                };
            })(tapins = processdown.tapins || (processdown.tapins = {}));
        })(processdown = core.processdown || (core.processdown = {}));
    })(core = minerva.core || (minerva.core = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var core;
    (function (core) {
        var processdown;
        (function (processdown) {
            var tapins;
            (function (tapins) {
                tapins.propagateDirtyToChildren = function (input, state, output, vpinput, tree) {
                    var newDownDirty = state.subtreeDownDirty & minerva.DirtyFlags.PropagateDown;
                    if (newDownDirty === 0)
                        return true;
                    for (var walker = tree.walk(); walker.step();) {
                        walker.current.assets.dirtyFlags |= newDownDirty;
                        core.Updater.$$addDownDirty(walker.current);
                    }
                    return true;
                };
            })(tapins = processdown.tapins || (processdown.tapins = {}));
        })(processdown = core.processdown || (core.processdown = {}));
    })(core = minerva.core || (minerva.core = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var core;
    (function (core) {
        var processup;
        (function (processup) {
            var tapins;
            (function (tapins) {
                tapins.calcActualSize = function (input, state, output, tree) {
                    if ((input.dirtyFlags & minerva.DirtyFlags.Bounds) === 0)
                        return true;
                    var actual = state.actualSize;
                    actual.width = input.actualWidth;
                    actual.height = input.actualHeight;
                    core.helpers.coerceSize(actual, input);
                    if (isNaN(actual.width))
                        actual.width = 0;
                    if (isNaN(actual.height))
                        actual.height = 0;
                    return true;
                };
            })(tapins = processup.tapins || (processup.tapins = {}));
        })(processup = core.processup || (core.processup = {}));
    })(core = minerva.core || (minerva.core = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var core;
    (function (core) {
        var processup;
        (function (processup) {
            var tapins;
            (function (tapins) {
                tapins.calcExtents = function (input, state, output, tree) {
                    if ((input.dirtyFlags & minerva.DirtyFlags.Bounds) === 0)
                        return true;
                    var e = output.extents;
                    var ewc = output.extentsWithChildren;
                    e.x = ewc.x = 0;
                    e.y = ewc.y = 0;
                    var as = state.actualSize;
                    e.width = ewc.width = as.width;
                    e.height = ewc.height = as.height;
                    var assets;
                    for (var walker = tree.walk(); walker.step();) {
                        assets = walker.current.assets;
                        if (assets.totalIsRenderVisible)
                            minerva.Rect.union(ewc, assets.globalBoundsWithChildren);
                    }
                    return true;
                };
            })(tapins = processup.tapins || (processup.tapins = {}));
        })(processup = core.processup || (core.processup = {}));
    })(core = minerva.core || (minerva.core = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var core;
    (function (core) {
        var processup;
        (function (processup) {
            var tapins;
            (function (tapins) {
                tapins.calcPaintBounds = function (input, state, output, tree) {
                    if ((input.dirtyFlags & minerva.DirtyFlags.Bounds) === 0)
                        return true;
                    core.helpers.intersectBoundsWithClipPath(output.globalBoundsWithChildren, output.extentsWithChildren, input.effectPadding, input.renderXform, input.clip, input.layoutClip);
                    core.helpers.intersectBoundsWithClipPath(output.surfaceBoundsWithChildren, output.extentsWithChildren, input.effectPadding, input.absoluteXform, input.clip, input.layoutClip);
                    return true;
                };
            })(tapins = processup.tapins || (processup.tapins = {}));
        })(processup = core.processup || (core.processup = {}));
    })(core = minerva.core || (minerva.core = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var core;
    (function (core) {
        var processup;
        (function (processup) {
            var tapins;
            (function (tapins) {
                tapins.processBounds = function (input, state, output, tree) {
                    if ((input.dirtyFlags & minerva.DirtyFlags.Bounds) === 0)
                        return true;
                    state.hasNewBounds = false;
                    if (!minerva.Rect.isEqual(input.globalBoundsWithChildren, output.globalBoundsWithChildren)) {
                        var vo = tree.visualOwner;
                        vo.updateBounds();
                        vo.invalidate(input.surfaceBoundsWithChildren);
                        state.hasNewBounds = true;
                    }
                    else if (!minerva.Rect.isEqual(input.extentsWithChildren, output.extentsWithChildren) || input.forceInvalidate) {
                        state.hasNewBounds = true;
                    }
                    output.forceInvalidate = false;
                    return true;
                };
            })(tapins = processup.tapins || (processup.tapins = {}));
        })(processup = core.processup || (core.processup = {}));
    })(core = minerva.core || (minerva.core = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var core;
    (function (core) {
        var processup;
        (function (processup) {
            var tapins;
            (function (tapins) {
                tapins.processInvalidate = function (input, state, output, tree) {
                    if ((input.dirtyFlags & minerva.DirtyFlags.Invalidate) === 0 && !state.hasInvalidate)
                        return true;
                    var dirty = output.dirtyRegion;
                    tree.visualOwner.invalidate(dirty);
                    dirty.x = dirty.y = dirty.width = dirty.height = 0;
                    return true;
                };
            })(tapins = processup.tapins || (processup.tapins = {}));
        })(processup = core.processup || (core.processup = {}));
    })(core = minerva.core || (minerva.core = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var core;
    (function (core) {
        var processup;
        (function (processup) {
            var tapins;
            (function (tapins) {
                tapins.processNewBounds = function (input, state, output, tree) {
                    if ((input.dirtyFlags & minerva.DirtyFlags.NewBounds) === 0 && !state.hasNewBounds)
                        return true;
                    output.dirtyFlags |= minerva.DirtyFlags.Invalidate;
                    state.hasInvalidate = true;
                    minerva.Rect.union(output.dirtyRegion, output.surfaceBoundsWithChildren);
                    return true;
                };
            })(tapins = processup.tapins || (processup.tapins = {}));
        })(processup = core.processup || (core.processup = {}));
    })(core = minerva.core || (minerva.core = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var core;
    (function (core) {
        var render;
        (function (render) {
            var tapins;
            (function (tapins) {
                tapins.applyClip = function (input, state, output, ctx, region, tree) {
                    var clip = input.clip;
                    if (clip)
                        ctx.clipGeometry(clip);
                    return true;
                };
            })(tapins = render.tapins || (render.tapins = {}));
        })(render = core.render || (core.render = {}));
    })(core = minerva.core || (minerva.core = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var core;
    (function (core) {
        var render;
        (function (render) {
            var tapins;
            (function (tapins) {
                tapins.doRender = function (input, state, output, ctx, region, tree) {
                    return true;
                };
            })(tapins = render.tapins || (render.tapins = {}));
        })(render = core.render || (core.render = {}));
    })(core = minerva.core || (minerva.core = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var core;
    (function (core) {
        var render;
        (function (render) {
            var tapins;
            (function (tapins) {
                tapins.postRender = function (input, state, output, ctx, region, tree) {
                    var effect = input.effect;
                    if (!effect)
                        return true;
                    effect.PostRender(ctx);
                    ctx.restore();
                    return true;
                };
            })(tapins = render.tapins || (render.tapins = {}));
        })(render = core.render || (core.render = {}));
    })(core = minerva.core || (minerva.core = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var core;
    (function (core) {
        var render;
        (function (render) {
            var tapins;
            (function (tapins) {
                tapins.preRender = function (input, state, output, ctx, region, tree) {
                    var effect = input.effect;
                    if (!effect)
                        return true;
                    ctx.save();
                    effect.PreRender(ctx);
                    return true;
                };
            })(tapins = render.tapins || (render.tapins = {}));
        })(render = core.render || (core.render = {}));
    })(core = minerva.core || (minerva.core = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var core;
    (function (core) {
        var render;
        (function (render) {
            var tapins;
            (function (tapins) {
                tapins.prepareContext = function (input, state, output, ctx, region, tree) {
                    ctx.save();
                    ctx.preapply(input.renderXform);
                    ctx.raw.globalAlpha = input.totalOpacity;
                    return true;
                };
            })(tapins = render.tapins || (render.tapins = {}));
        })(render = core.render || (core.render = {}));
    })(core = minerva.core || (minerva.core = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var core;
    (function (core) {
        var render;
        (function (render) {
            var tapins;
            (function (tapins) {
                tapins.renderChildren = function (input, state, output, ctx, region, tree) {
                    for (var walker = tree.walk(minerva.WalkDirection.ZForward); walker.step();) {
                        walker.current.render(ctx, state.renderRegion);
                    }
                    return true;
                };
            })(tapins = render.tapins || (render.tapins = {}));
        })(render = core.render || (core.render = {}));
    })(core = minerva.core || (minerva.core = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var core;
    (function (core) {
        var render;
        (function (render) {
            var tapins;
            (function (tapins) {
                tapins.restoreContext = function (input, state, output, ctx, region, tree) {
                    ctx.restore();
                    return true;
                };
            })(tapins = render.tapins || (render.tapins = {}));
        })(render = core.render || (core.render = {}));
    })(core = minerva.core || (minerva.core = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var core;
    (function (core) {
        var render;
        (function (render) {
            var tapins;
            (function (tapins) {
                tapins.validate = function (input, state, output, ctx, region, tree) {
                    return !!input.totalIsRenderVisible
                        && ((input.totalOpacity * 255) >= 0.5);
                };
            })(tapins = render.tapins || (render.tapins = {}));
        })(render = core.render || (core.render = {}));
    })(core = minerva.core || (minerva.core = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var core;
    (function (core) {
        var render;
        (function (render) {
            var tapins;
            (function (tapins) {
                tapins.validateRegion = function (input, state, output, ctx, region, tree) {
                    var r = state.renderRegion;
                    minerva.Rect.copyTo(input.surfaceBoundsWithChildren, r);
                    minerva.Rect.roundOut(r);
                    minerva.Rect.intersection(r, region);
                    return r.width > 0 && r.height > 0;
                };
            })(tapins = render.tapins || (render.tapins = {}));
        })(render = core.render || (core.render = {}));
    })(core = minerva.core || (minerva.core = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var core;
    (function (core) {
        var sizing;
        (function (sizing) {
            var tapins;
            (function (tapins) {
                tapins.calcUseRender = function (input, state, output, tree) {
                    state.useRender = true;
                    return true;
                };
            })(tapins = sizing.tapins || (sizing.tapins = {}));
        })(sizing = core.sizing || (core.sizing = {}));
    })(core = minerva.core || (minerva.core = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var core;
    (function (core) {
        var sizing;
        (function (sizing) {
            var tapins;
            (function (tapins) {
                tapins.computeActual = function (input, state, output, tree) {
                    var as = output.actualSize;
                    as.width = as.height = 0;
                    if (input.visibility !== minerva.Visibility.Visible) {
                        return true;
                    }
                    if (state.useRender) {
                        minerva.Size.copyTo(input.renderSize, as);
                        return true;
                    }
                    core.helpers.coerceSize(as, input);
                    return true;
                };
            })(tapins = sizing.tapins || (sizing.tapins = {}));
        })(sizing = core.sizing || (core.sizing = {}));
    })(core = minerva.core || (minerva.core = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var controls;
    (function (controls) {
        var border;
        (function (border) {
            var arrange;
            (function (arrange) {
                var BorderArrangePipeDef = (function (_super) {
                    __extends(BorderArrangePipeDef, _super);
                    function BorderArrangePipeDef() {
                        _super.call(this);
                        this.addTapinBefore('doOverride', 'preOverride', preOverride)
                            .replaceTapin('doOverride', doOverride);
                    }
                    BorderArrangePipeDef.prototype.createState = function () {
                        var state = _super.prototype.createState.call(this);
                        state.totalBorder = new minerva.Thickness();
                        return state;
                    };
                    return BorderArrangePipeDef;
                })(minerva.core.arrange.ArrangePipeDef);
                arrange.BorderArrangePipeDef = BorderArrangePipeDef;
                function preOverride(input, state, output, tree, finalRect) {
                    if (!tree.subtree)
                        return true;
                    var tb = state.totalBorder;
                    minerva.Thickness.copyTo(input.padding, tb);
                    minerva.Thickness.add(tb, input.borderThickness);
                    var cr = state.childRect;
                    cr.x = cr.y = 0;
                    minerva.Size.copyTo(state.finalSize, cr);
                    minerva.Thickness.shrinkRect(tb, cr);
                    return true;
                }
                arrange.preOverride = preOverride;
                function doOverride(input, state, output, tree, finalRect) {
                    if (tree.subtree)
                        tree.subtree.arrange(state.childRect);
                    minerva.Size.copyTo(state.finalSize, state.arrangedSize);
                    return true;
                }
                arrange.doOverride = doOverride;
            })(arrange = border.arrange || (border.arrange = {}));
        })(border = controls.border || (controls.border = {}));
    })(controls = minerva.controls || (minerva.controls = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var controls;
    (function (controls) {
        var border;
        (function (border) {
            var hittest;
            (function (hittest) {
                var BorderHitTestPipeDef = (function (_super) {
                    __extends(BorderHitTestPipeDef, _super);
                    function BorderHitTestPipeDef() {
                        _super.call(this);
                        this.replaceTapin('canHitInside', tapins.canHitInside);
                    }
                    return BorderHitTestPipeDef;
                })(minerva.core.hittest.HitTestPipeDef);
                hittest.BorderHitTestPipeDef = BorderHitTestPipeDef;
                var tapins;
                (function (tapins) {
                    function canHitInside(data, pos, hitList, ctx) {
                        if (data.hitChildren)
                            return true;
                        if (!data.assets.background && !data.assets.borderBrush) {
                            hitList.shift();
                            ctx.restore();
                            return false;
                        }
                        return true;
                    }
                    tapins.canHitInside = canHitInside;
                })(tapins = hittest.tapins || (hittest.tapins = {}));
            })(hittest = border.hittest || (border.hittest = {}));
        })(border = controls.border || (controls.border = {}));
    })(controls = minerva.controls || (minerva.controls = {}));
})(minerva || (minerva = {}));
/// <reference path="../../../core/measure/MeasurePipeDef" />
var minerva;
(function (minerva) {
    var controls;
    (function (controls) {
        var border;
        (function (border) {
            var measure;
            (function (measure) {
                var BorderMeasurePipeDef = (function (_super) {
                    __extends(BorderMeasurePipeDef, _super);
                    function BorderMeasurePipeDef() {
                        _super.call(this);
                        this.addTapinBefore('doOverride', 'preOverride', preOverride)
                            .replaceTapin('doOverride', doOverride)
                            .addTapinAfter('doOverride', 'postOverride', postOverride);
                    }
                    BorderMeasurePipeDef.prototype.createState = function () {
                        var state = _super.prototype.createState.call(this);
                        state.totalBorder = new minerva.Thickness();
                        return state;
                    };
                    return BorderMeasurePipeDef;
                })(minerva.core.measure.MeasurePipeDef);
                measure.BorderMeasurePipeDef = BorderMeasurePipeDef;
                function preOverride(input, state, output, tree, availableSize) {
                    var tb = state.totalBorder;
                    minerva.Thickness.copyTo(input.padding, tb);
                    minerva.Thickness.add(tb, input.borderThickness);
                    minerva.Thickness.shrinkSize(tb, state.availableSize);
                    return true;
                }
                measure.preOverride = preOverride;
                function doOverride(input, state, output, tree, availableSize) {
                    var ds = output.desiredSize;
                    if (tree.subtree) {
                        tree.subtree.measure(state.availableSize);
                        minerva.Size.copyTo(tree.subtree.assets.desiredSize, ds);
                    }
                    return true;
                }
                measure.doOverride = doOverride;
                function postOverride(input, state, output, tree, availableSize) {
                    minerva.Thickness.growSize(state.totalBorder, output.desiredSize);
                    minerva.Size.min(output.desiredSize, state.availableSize);
                    return true;
                }
                measure.postOverride = postOverride;
            })(measure = border.measure || (border.measure = {}));
        })(border = controls.border || (controls.border = {}));
    })(controls = minerva.controls || (minerva.controls = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var controls;
    (function (controls) {
        var border;
        (function (border) {
            var render;
            (function (render) {
                var BorderRenderPipeDef = (function (_super) {
                    __extends(BorderRenderPipeDef, _super);
                    function BorderRenderPipeDef() {
                        _super.call(this);
                        this.addTapinBefore('doRender', 'calcShouldRender', render.tapins.calcShouldRender)
                            .addTapinBefore('doRender', 'calcInnerOuter', render.tapins.calcInnerOuter)
                            .replaceTapin('doRender', render.tapins.doRender);
                    }
                    BorderRenderPipeDef.prototype.createState = function () {
                        var state = _super.prototype.createState.call(this);
                        state.fillExtents = new minerva.Rect();
                        state.innerCornerRadius = new minerva.CornerRadius();
                        state.outerCornerRadius = new minerva.CornerRadius();
                        return state;
                    };
                    return BorderRenderPipeDef;
                })(minerva.core.render.RenderPipeDef);
                render.BorderRenderPipeDef = BorderRenderPipeDef;
            })(render = border.render || (border.render = {}));
        })(border = controls.border || (controls.border = {}));
    })(controls = minerva.controls || (minerva.controls = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var controls;
    (function (controls) {
        var border;
        (function (border) {
            var render;
            (function (render) {
                var ShimBorderRenderPipeDef = (function (_super) {
                    __extends(ShimBorderRenderPipeDef, _super);
                    function ShimBorderRenderPipeDef() {
                        _super.call(this);
                        this.addTapinBefore('doRender', 'calcBalanced', render.tapins.shim.calcBalanced)
                            .addTapinBefore('doRender', 'invalidatePattern', render.tapins.shim.invalidatePattern)
                            .addTapinBefore('doRender', 'createPattern', render.tapins.shim.createPattern)
                            .replaceTapin('doRender', render.tapins.shim.doRender);
                    }
                    ShimBorderRenderPipeDef.prototype.createState = function () {
                        var state = _super.prototype.createState.call(this);
                        state.middleCornerRadius = new minerva.CornerRadius();
                        state.strokeExtents = new minerva.Rect();
                        state.pattern = null;
                        state.oldMetrics = null;
                        return state;
                    };
                    return ShimBorderRenderPipeDef;
                })(render.BorderRenderPipeDef);
                render.ShimBorderRenderPipeDef = ShimBorderRenderPipeDef;
            })(render = border.render || (border.render = {}));
        })(border = controls.border || (controls.border = {}));
    })(controls = minerva.controls || (minerva.controls = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var controls;
    (function (controls) {
        var panel;
        (function (panel) {
            var arrange;
            (function (arrange) {
                var PanelArrangePipeDef = (function (_super) {
                    __extends(PanelArrangePipeDef, _super);
                    function PanelArrangePipeDef() {
                        _super.call(this);
                        this.replaceTapin('doOverride', arrange.tapins.doOverride);
                    }
                    return PanelArrangePipeDef;
                })(minerva.core.arrange.ArrangePipeDef);
                arrange.PanelArrangePipeDef = PanelArrangePipeDef;
            })(arrange = panel.arrange || (panel.arrange = {}));
        })(panel = controls.panel || (controls.panel = {}));
    })(controls = minerva.controls || (minerva.controls = {}));
})(minerva || (minerva = {}));
/// <reference path="../../panel/arrange/PanelArrangePipeDef" />
var minerva;
(function (minerva) {
    var controls;
    (function (controls) {
        var canvas;
        (function (canvas) {
            var arrange;
            (function (arrange) {
                var CanvasArrangePipeDef = (function (_super) {
                    __extends(CanvasArrangePipeDef, _super);
                    function CanvasArrangePipeDef() {
                        _super.call(this);
                        this.replaceTapin('doOverride', arrange.tapins.doOverride)
                            .replaceTapin('buildLayoutClip', arrange.tapins.buildLayoutClip);
                    }
                    return CanvasArrangePipeDef;
                })(controls.panel.arrange.PanelArrangePipeDef);
                arrange.CanvasArrangePipeDef = CanvasArrangePipeDef;
            })(arrange = canvas.arrange || (canvas.arrange = {}));
        })(canvas = controls.canvas || (controls.canvas = {}));
    })(controls = minerva.controls || (minerva.controls = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var controls;
    (function (controls) {
        var panel;
        (function (panel) {
            var measure;
            (function (measure) {
                var PanelMeasurePipeDef = (function (_super) {
                    __extends(PanelMeasurePipeDef, _super);
                    function PanelMeasurePipeDef() {
                        _super.call(this);
                        this.replaceTapin('doOverride', doOverride);
                    }
                    return PanelMeasurePipeDef;
                })(minerva.core.measure.MeasurePipeDef);
                measure.PanelMeasurePipeDef = PanelMeasurePipeDef;
                function doOverride(input, state, output, tree, availableSize) {
                    var desired = output.desiredSize;
                    desired.width = desired.height = 0;
                    for (var walker = tree.walk(); walker.step();) {
                        walker.current.measure(state.availableSize);
                        var childds = walker.current.assets.desiredSize;
                        desired.width = Math.max(desired.width, childds.width);
                        desired.height = Math.max(desired.height, childds.height);
                    }
                    return true;
                }
            })(measure = panel.measure || (panel.measure = {}));
        })(panel = controls.panel || (controls.panel = {}));
    })(controls = minerva.controls || (minerva.controls = {}));
})(minerva || (minerva = {}));
/// <reference path="../../panel/measure/PanelMeasurePipeDef" />
var minerva;
(function (minerva) {
    var controls;
    (function (controls) {
        var canvas;
        (function (canvas) {
            var measure;
            (function (measure) {
                var CanvasMeasurePipeDef = (function (_super) {
                    __extends(CanvasMeasurePipeDef, _super);
                    function CanvasMeasurePipeDef() {
                        _super.call(this);
                        this.replaceTapin('doOverride', measure.tapins.doOverride);
                    }
                    return CanvasMeasurePipeDef;
                })(controls.panel.measure.PanelMeasurePipeDef);
                measure.CanvasMeasurePipeDef = CanvasMeasurePipeDef;
            })(measure = canvas.measure || (canvas.measure = {}));
        })(canvas = controls.canvas || (controls.canvas = {}));
    })(controls = minerva.controls || (minerva.controls = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var controls;
    (function (controls) {
        var canvas;
        (function (canvas) {
            var processdown;
            (function (processdown) {
                var CanvasProcessDownPipeDef = (function (_super) {
                    __extends(CanvasProcessDownPipeDef, _super);
                    function CanvasProcessDownPipeDef() {
                        _super.call(this);
                        this.replaceTapin('processLayoutClip', tapins.processLayoutClip);
                    }
                    return CanvasProcessDownPipeDef;
                })(minerva.core.processdown.ProcessDownPipeDef);
                processdown.CanvasProcessDownPipeDef = CanvasProcessDownPipeDef;
                var tapins;
                (function (tapins) {
                    function processLayoutClip(input, state, output, vpinput, tree) {
                        if ((input.dirtyFlags & minerva.DirtyFlags.LayoutClip) === 0)
                            return true;
                        var clc = input.compositeLayoutClip;
                        clc.x = clc.y = clc.width = clc.height;
                        return true;
                    }
                    tapins.processLayoutClip = processLayoutClip;
                })(tapins = processdown.tapins || (processdown.tapins = {}));
            })(processdown = canvas.processdown || (canvas.processdown = {}));
        })(canvas = controls.canvas || (controls.canvas = {}));
    })(controls = minerva.controls || (minerva.controls = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var controls;
    (function (controls) {
        var canvas;
        (function (canvas) {
            var processup;
            (function (processup) {
                var CanvasProcessUpPipeDef = (function (_super) {
                    __extends(CanvasProcessUpPipeDef, _super);
                    function CanvasProcessUpPipeDef() {
                        _super.call(this);
                        this.replaceTapin('calcPaintBounds', processup.tapins.calcPaintBounds);
                    }
                    return CanvasProcessUpPipeDef;
                })(minerva.core.processup.ProcessUpPipeDef);
                processup.CanvasProcessUpPipeDef = CanvasProcessUpPipeDef;
            })(processup = canvas.processup || (canvas.processup = {}));
        })(canvas = controls.canvas || (controls.canvas = {}));
    })(controls = minerva.controls || (minerva.controls = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var controls;
    (function (controls) {
        var control;
        (function (control) {
            var hittest;
            (function (hittest) {
                var ControlHitTestPipeDef = (function (_super) {
                    __extends(ControlHitTestPipeDef, _super);
                    function ControlHitTestPipeDef() {
                        _super.call(this);
                        this.addTapinBefore('canHit', 'shouldSkip', tapins.shouldSkip)
                            .replaceTapin('canHitInside', tapins.canHitInside);
                    }
                    return ControlHitTestPipeDef;
                })(minerva.core.hittest.HitTestPipeDef);
                hittest.ControlHitTestPipeDef = ControlHitTestPipeDef;
                var tapins;
                (function (tapins) {
                    function shouldSkip(data, pos, hitList, ctx) {
                        return !!data.assets.isEnabled;
                    }
                    tapins.shouldSkip = shouldSkip;
                    function canHitInside(data, pos, hitList, ctx) {
                        if (data.hitChildren)
                            return true;
                        hitList.shift();
                        ctx.restore();
                        return false;
                    }
                    tapins.canHitInside = canHitInside;
                })(tapins = hittest.tapins || (hittest.tapins = {}));
            })(hittest = control.hittest || (control.hittest = {}));
        })(control = controls.control || (controls.control = {}));
    })(controls = minerva.controls || (minerva.controls = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var controls;
    (function (controls) {
        var grid;
        (function (grid) {
            var arrange;
            (function (arrange) {
                var GridArrangePipeDef = (function (_super) {
                    __extends(GridArrangePipeDef, _super);
                    function GridArrangePipeDef() {
                        _super.call(this);
                        this.addTapinBefore('doOverride', 'restoreMeasureResults', arrange.tapins.restoreMeasureResults)
                            .addTapinBefore('doOverride', 'calcConsumed', arrange.tapins.calcConsumed)
                            .addTapinBefore('doOverride', 'setActuals', arrange.tapins.setActuals)
                            .replaceTapin('doOverride', arrange.tapins.doOverride);
                    }
                    GridArrangePipeDef.prototype.createState = function () {
                        var state = _super.prototype.createState.call(this);
                        state.consumed = new minerva.Size();
                        return state;
                    };
                    return GridArrangePipeDef;
                })(controls.panel.arrange.PanelArrangePipeDef);
                arrange.GridArrangePipeDef = GridArrangePipeDef;
            })(arrange = grid.arrange || (grid.arrange = {}));
        })(grid = controls.grid || (controls.grid = {}));
    })(controls = minerva.controls || (minerva.controls = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var controls;
    (function (controls) {
        var grid;
        (function (grid) {
            var helpers;
            (function (helpers) {
                function allocateDesiredSize(rowMat, colMat) {
                    for (var i = 0; i < 2; i++) {
                        var matrix = i === 0 ? rowMat : colMat;
                        var count = matrix.length;
                        for (var row = count - 1; row >= 0; row--) {
                            for (var col = row; col >= 0; col--) {
                                var spansStar = false;
                                for (var j = row; j >= col; j--) {
                                    spansStar = spansStar || (matrix[j][j].type === grid.GridUnitType.Star);
                                }
                                var current = matrix[row][col].desired;
                                var totalAllocated = 0;
                                for (var a = row; a >= col; a--) {
                                    totalAllocated += matrix[a][a].desired;
                                }
                                if (totalAllocated < current) {
                                    var additional = current - totalAllocated;
                                    if (spansStar) {
                                        additional = helpers.assignSize(matrix, col, row, additional, grid.GridUnitType.Star, true);
                                    }
                                    else {
                                        additional = helpers.assignSize(matrix, col, row, additional, grid.GridUnitType.Pixel, true);
                                        additional = helpers.assignSize(matrix, col, row, additional, grid.GridUnitType.Auto, true);
                                    }
                                }
                            }
                        }
                    }
                    for (var i = 0; i < rowMat.length; i++) {
                        rowMat[i][i].offered = rowMat[i][i].desired;
                    }
                    for (var i = 0; i < matrix.length; i++) {
                        colMat[i][i].offered = colMat[i][i].desired;
                    }
                }
                helpers.allocateDesiredSize = allocateDesiredSize;
            })(helpers = grid.helpers || (grid.helpers = {}));
        })(grid = controls.grid || (controls.grid = {}));
    })(controls = minerva.controls || (minerva.controls = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var controls;
    (function (controls) {
        var grid;
        (function (grid) {
            var helpers;
            (function (helpers) {
                function assignSize(mat, start, end, size, unitType, desiredSize) {
                    var count = 0;
                    var assigned = false;
                    var segmentSize = 0;
                    for (var i = start; i <= end; i++) {
                        var cur = mat[i][i];
                        segmentSize = desiredSize ? cur.desired : cur.offered;
                        if (segmentSize < cur.max)
                            count += (unitType === grid.GridUnitType.Star) ? cur.stars : 1;
                    }
                    do {
                        assigned = false;
                        var contribution = size / count;
                        for (i = start; i <= end; i++) {
                            cur = mat[i][i];
                            segmentSize = desiredSize ? cur.desired : cur.offered;
                            if (!(cur.type === unitType && segmentSize < cur.max))
                                continue;
                            var newSize = segmentSize;
                            newSize += contribution * (unitType === grid.GridUnitType.Star ? cur.stars : 1);
                            newSize = Math.min(newSize, cur.max);
                            assigned = assigned || (newSize > segmentSize);
                            size -= newSize - segmentSize;
                            if (desiredSize)
                                cur.desired = newSize;
                            else
                                cur.offered = newSize;
                        }
                    } while (assigned);
                    return size;
                }
                helpers.assignSize = assignSize;
            })(helpers = grid.helpers || (grid.helpers = {}));
        })(grid = controls.grid || (controls.grid = {}));
    })(controls = minerva.controls || (minerva.controls = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var controls;
    (function (controls) {
        var grid;
        (function (grid) {
            var helpers;
            (function (helpers) {
                function expandStarCols(mat, coldefs, availableSize) {
                    var aw = availableSize.width;
                    for (var i = 0; i < mat.length; i++) {
                        var cur = mat[i][i];
                        if (cur.type === grid.GridUnitType.Star)
                            cur.offered = 0;
                        else
                            aw = Math.max(aw - cur.offered, 0);
                    }
                    aw = helpers.assignSize(mat, 0, mat.length - 1, aw, grid.GridUnitType.Star, false);
                    for (var i = 0; i < coldefs.length; i++) {
                        var cur = mat[i][i];
                        if (cur.type === grid.GridUnitType.Star)
                            coldefs[i].setActualWidth(cur.offered);
                    }
                }
                helpers.expandStarCols = expandStarCols;
            })(helpers = grid.helpers || (grid.helpers = {}));
        })(grid = controls.grid || (controls.grid = {}));
    })(controls = minerva.controls || (minerva.controls = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var controls;
    (function (controls) {
        var grid;
        (function (grid) {
            var helpers;
            (function (helpers) {
                function expandStarRows(mat, rowdefs, availableSize) {
                    var ah = availableSize.height;
                    for (var i = 0; i < mat.length; i++) {
                        var cur = mat[i][i];
                        if (cur.type === grid.GridUnitType.Star)
                            cur.offered = 0;
                        else
                            ah = Math.max(ah - cur.offered, 0);
                    }
                    ah = helpers.assignSize(mat, 0, mat.length - 1, ah, grid.GridUnitType.Star, false);
                    for (var i = 0; i < rowdefs.length; i++) {
                        var cur = mat[i][i];
                        if (cur.type === grid.GridUnitType.Star)
                            rowdefs[i].setActualHeight(cur.offered);
                    }
                }
                helpers.expandStarRows = expandStarRows;
            })(helpers = grid.helpers || (grid.helpers = {}));
        })(grid = controls.grid || (controls.grid = {}));
    })(controls = minerva.controls || (minerva.controls = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var controls;
    (function (controls) {
        var grid;
        (function (grid) {
            var measure;
            (function (measure) {
                var GridChildPlacement = (function () {
                    function GridChildPlacement(matrix, row, col, size) {
                        this.matrix = matrix;
                        this.row = row;
                        this.col = col;
                        this.size = size;
                    }
                    GridChildPlacement.row = function (matrix, childShape, child) {
                        return new GridChildPlacement(matrix, childShape.row + childShape.rowspan - 1, childShape.row, child.assets.desiredSize.height);
                    };
                    GridChildPlacement.col = function (matrix, childShape, child) {
                        return new GridChildPlacement(matrix, childShape.col + childShape.colspan - 1, childShape.col, child.assets.desiredSize.width);
                    };
                    return GridChildPlacement;
                })();
                measure.GridChildPlacement = GridChildPlacement;
            })(measure = grid.measure || (grid.measure = {}));
        })(grid = controls.grid || (controls.grid = {}));
    })(controls = minerva.controls || (minerva.controls = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var controls;
    (function (controls) {
        var grid;
        (function (grid) {
            var measure;
            (function (measure) {
                (function (OverridePass) {
                    OverridePass[OverridePass["AutoAuto"] = 0] = "AutoAuto";
                    OverridePass[OverridePass["StarAuto"] = 1] = "StarAuto";
                    OverridePass[OverridePass["AutoStar"] = 2] = "AutoStar";
                    OverridePass[OverridePass["StarAutoAgain"] = 3] = "StarAutoAgain";
                    OverridePass[OverridePass["NonStar"] = 4] = "NonStar";
                    OverridePass[OverridePass["RemainingStar"] = 5] = "RemainingStar";
                })(measure.OverridePass || (measure.OverridePass = {}));
                var OverridePass = measure.OverridePass;
                var GridChildShape = (function () {
                    function GridChildShape() {
                    }
                    GridChildShape.prototype.init = function (child, rm, cm) {
                        var col = this.col = Math.min(child.getAttachedValue("Grid.Column"), cm.length - 1);
                        if (isNaN(col))
                            this.col = col = 0;
                        var row = this.row = Math.min(child.getAttachedValue("Grid.Row"), rm.length - 1);
                        if (isNaN(row))
                            this.row = row = 0;
                        var colspan = this.colspan = Math.min(child.getAttachedValue("Grid.ColumnSpan"), cm.length - col);
                        if (isNaN(colspan))
                            this.colspan = colspan = 1;
                        var rowspan = this.rowspan = Math.min(child.getAttachedValue("Grid.RowSpan"), rm.length - row);
                        if (isNaN(rowspan))
                            this.rowspan = rowspan = 1;
                        this.starRow = this.autoRow = this.starCol = this.autoCol = false;
                        for (var i = row; i < row + rowspan; i++) {
                            this.starRow = this.starRow || (rm[i][i].type === grid.GridUnitType.Star);
                            this.autoRow = this.autoRow || (rm[i][i].type === grid.GridUnitType.Auto);
                        }
                        for (var i = col; i < col + colspan; i++) {
                            this.starCol = this.starCol || (cm[i][i].type === grid.GridUnitType.Star);
                            this.autoCol = this.autoCol || (cm[i][i].type === grid.GridUnitType.Auto);
                        }
                        return this;
                    };
                    GridChildShape.prototype.shouldMeasurePass = function (gridShape, childSize, pass) {
                        childSize.width = childSize.height = 0;
                        if (this.autoRow && this.autoCol && !this.starRow && !this.starCol) {
                            if (pass !== OverridePass.AutoAuto)
                                return false;
                            childSize.width = Number.POSITIVE_INFINITY;
                            childSize.height = Number.POSITIVE_INFINITY;
                            return true;
                        }
                        if (this.starRow && this.autoCol && !this.starCol) {
                            if (pass !== OverridePass.StarAuto && pass !== OverridePass.StarAutoAgain)
                                return false;
                            if (pass === OverridePass.AutoAuto && gridShape.hasAutoStar)
                                childSize.height = Number.POSITIVE_INFINITY;
                            childSize.width = Number.POSITIVE_INFINITY;
                            return true;
                        }
                        if (this.autoRow && this.starCol && !this.starRow) {
                            if (pass !== OverridePass.AutoStar)
                                return false;
                            childSize.height = Number.POSITIVE_INFINITY;
                            return true;
                        }
                        if ((this.autoRow || this.autoCol) && !(this.starRow || this.starCol)) {
                            if (pass !== OverridePass.NonStar)
                                return false;
                            if (this.autoRow)
                                childSize.height = Number.POSITIVE_INFINITY;
                            if (this.autoCol)
                                childSize.width = Number.POSITIVE_INFINITY;
                            return true;
                        }
                        if (!(this.starRow || this.starCol))
                            return pass === OverridePass.NonStar;
                        return pass === OverridePass.RemainingStar;
                    };
                    GridChildShape.prototype.size = function (childSize, rm, cm) {
                        for (var i = this.row; i < this.row + this.rowspan; i++) {
                            childSize.height += rm[i][i].offered;
                        }
                        for (var i = this.col; i < this.col + this.colspan; i++) {
                            childSize.width += cm[i][i].offered;
                        }
                    };
                    return GridChildShape;
                })();
                measure.GridChildShape = GridChildShape;
            })(measure = grid.measure || (grid.measure = {}));
        })(grid = controls.grid || (controls.grid = {}));
    })(controls = minerva.controls || (minerva.controls = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var controls;
    (function (controls) {
        var grid;
        (function (grid) {
            var measure;
            (function (measure) {
                var GridMeasurePipeDef = (function (_super) {
                    __extends(GridMeasurePipeDef, _super);
                    function GridMeasurePipeDef() {
                        _super.call(this);
                        this.addTapinBefore('doOverride', 'ensureRowMatrix', measure.tapins.ensureRowMatrix)
                            .addTapinBefore('doOverride', 'prepareRowMatrix', measure.tapins.prepareRowMatrix)
                            .addTapinBefore('doOverride', 'ensureColMatrix', measure.tapins.ensureColMatrix)
                            .addTapinBefore('doOverride', 'prepareColMatrix', measure.tapins.prepareColMatrix)
                            .addTapinBefore('doOverride', 'buildShape', measure.tapins.buildShape)
                            .addTapinBefore('doOverride', 'doOverrideAutoAuto', measure.tapins.createDoOverridePass(measure.OverridePass.AutoAuto))
                            .addTapinBefore('doOverride', 'doOverrideStarAuto', measure.tapins.createDoOverridePass(measure.OverridePass.StarAuto))
                            .addTapinBefore('doOverride', 'doOverrideAutoStar', measure.tapins.createDoOverridePass(measure.OverridePass.AutoStar))
                            .addTapinBefore('doOverride', 'doOverrideStarAutoAgain', measure.tapins.createDoOverridePass(measure.OverridePass.StarAutoAgain))
                            .addTapinBefore('doOverride', 'doOverrideNonStar', measure.tapins.createDoOverridePass(measure.OverridePass.NonStar))
                            .addTapinBefore('doOverride', 'doOverrideRemainingStar', measure.tapins.createDoOverridePass(measure.OverridePass.RemainingStar))
                            .replaceTapin('doOverride', measure.tapins.doOverride)
                            .addTapinAfter('doOverride', 'saveMeasureResults', measure.tapins.saveMeasureResults);
                    }
                    GridMeasurePipeDef.prototype.createState = function () {
                        var state = _super.prototype.createState.call(this);
                        state.totalStars = new minerva.Size();
                        state.gridShape = new measure.GridShape();
                        state.childShapes = [];
                        state.childSize = new minerva.Size();
                        state.placements = [];
                        state.placementIndex = 0;
                        return state;
                    };
                    return GridMeasurePipeDef;
                })(controls.panel.measure.PanelMeasurePipeDef);
                measure.GridMeasurePipeDef = GridMeasurePipeDef;
            })(measure = grid.measure || (grid.measure = {}));
        })(grid = controls.grid || (controls.grid = {}));
    })(controls = minerva.controls || (minerva.controls = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var controls;
    (function (controls) {
        var grid;
        (function (grid) {
            var measure;
            (function (measure) {
                var GridShape = (function () {
                    function GridShape() {
                        this.hasAutoAuto = false;
                        this.hasStarAuto = false;
                        this.hasAutoStar = false;
                    }
                    GridShape.prototype.init = function (childShapes) {
                        this.hasAutoAuto = this.hasStarAuto = this.hasAutoStar = false;
                        for (var i = 0; i < childShapes.length; i++) {
                            var cs = childShapes[i];
                            this.hasAutoAuto = this.hasAutoAuto || (cs.autoRow && cs.autoCol && !cs.starRow && !cs.starCol);
                            this.hasStarAuto = this.hasStarAuto || (cs.starRow && cs.autoCol);
                            this.hasAutoStar = this.hasAutoStar || (cs.autoRow && cs.starCol);
                        }
                    };
                    return GridShape;
                })();
                measure.GridShape = GridShape;
            })(measure = grid.measure || (grid.measure = {}));
        })(grid = controls.grid || (controls.grid = {}));
    })(controls = minerva.controls || (minerva.controls = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var controls;
    (function (controls) {
        var panel;
        (function (panel) {
            var processup;
            (function (processup) {
                var PanelProcessUpPipeDef = (function (_super) {
                    __extends(PanelProcessUpPipeDef, _super);
                    function PanelProcessUpPipeDef() {
                        _super.call(this);
                        this.addTapinBefore('calcExtents', 'preCalcExtents', processup.tapins.preCalcExtents);
                    }
                    return PanelProcessUpPipeDef;
                })(minerva.core.processup.ProcessUpPipeDef);
                processup.PanelProcessUpPipeDef = PanelProcessUpPipeDef;
            })(processup = panel.processup || (panel.processup = {}));
        })(panel = controls.panel || (controls.panel = {}));
    })(controls = minerva.controls || (minerva.controls = {}));
})(minerva || (minerva = {}));
/// <reference path="../../panel/processup/PanelProcessUpPipeDef" />
var minerva;
(function (minerva) {
    var controls;
    (function (controls) {
        var grid;
        (function (grid) {
            var processup;
            (function (processup) {
                var GridProcessUpPipeDef = (function (_super) {
                    __extends(GridProcessUpPipeDef, _super);
                    function GridProcessUpPipeDef() {
                        _super.call(this);
                        this.replaceTapin('preCalcExtents', processup.tapins.preCalcExtents)
                            .replaceTapin('calcExtents', processup.tapins.calcExtents);
                    }
                    return GridProcessUpPipeDef;
                })(controls.panel.processup.PanelProcessUpPipeDef);
                processup.GridProcessUpPipeDef = GridProcessUpPipeDef;
            })(processup = grid.processup || (grid.processup = {}));
        })(grid = controls.grid || (controls.grid = {}));
    })(controls = minerva.controls || (minerva.controls = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var controls;
    (function (controls) {
        var panel;
        (function (panel) {
            var render;
            (function (render) {
                var PanelRenderPipeDef = (function (_super) {
                    __extends(PanelRenderPipeDef, _super);
                    function PanelRenderPipeDef() {
                        _super.call(this);
                        this.replaceTapin('doRender', doRender);
                    }
                    return PanelRenderPipeDef;
                })(minerva.core.render.RenderPipeDef);
                render.PanelRenderPipeDef = PanelRenderPipeDef;
                function doRender(input, state, output, ctx, region, tree) {
                    var background = input.background;
                    if (!background || background.isTransparent())
                        return true;
                    var extents = input.extents;
                    if (minerva.Rect.isEmpty(extents))
                        return true;
                    ctx.save();
                    minerva.core.helpers.renderLayoutClip(ctx, input, tree);
                    var raw = ctx.raw;
                    raw.beginPath();
                    raw.rect(extents.x, extents.y, extents.width, extents.height);
                    ctx.fillEx(background, extents);
                    ctx.restore();
                    return true;
                }
            })(render = panel.render || (panel.render = {}));
        })(panel = controls.panel || (controls.panel = {}));
    })(controls = minerva.controls || (minerva.controls = {}));
})(minerva || (minerva = {}));
/// <reference path="../../panel/render/PanelRenderPipeDef" />
var minerva;
(function (minerva) {
    var controls;
    (function (controls) {
        var grid;
        (function (grid) {
            var render;
            (function (render) {
                var GridRenderPipeDef = (function (_super) {
                    __extends(GridRenderPipeDef, _super);
                    function GridRenderPipeDef() {
                        _super.call(this);
                        this.addTapinAfter('doRender', 'renderGridLines', tapins.renderGridLines);
                    }
                    GridRenderPipeDef.prototype.createState = function () {
                        var state = _super.prototype.createState.call(this);
                        state.framework = new minerva.Size();
                        return state;
                    };
                    return GridRenderPipeDef;
                })(controls.panel.render.PanelRenderPipeDef);
                render.GridRenderPipeDef = GridRenderPipeDef;
                var tapins;
                (function (tapins) {
                    function renderGridLines(input, state, output, ctx, region, tree) {
                        if (!input.showGridLines)
                            return true;
                        var framework = state.framework;
                        framework.width = input.actualWidth;
                        framework.height = input.actualHeight;
                        minerva.core.helpers.coerceSize(framework, input);
                        var raw = ctx.raw;
                        raw.save();
                        for (var cols = input.columnDefinitions, i = 0, x = 0; i < cols.length; i++) {
                            x += cols[i].ActualWidth;
                            raw.beginPath();
                            raw.setLineDash([5]);
                            raw.moveTo(x, 0);
                            raw.lineTo(x, framework.height);
                            raw.stroke();
                        }
                        for (var rows = input.rowDefinitions, i = 0, y = 0; i < rows.length; i++) {
                            y += rows[i].ActualHeight;
                            raw.beginPath();
                            raw.setLineDash([5]);
                            raw.moveTo(0, y);
                            raw.lineTo(framework.width, y);
                            raw.stroke();
                        }
                        raw.restore();
                        return true;
                    }
                    tapins.renderGridLines = renderGridLines;
                })(tapins = render.tapins || (render.tapins = {}));
            })(render = grid.render || (grid.render = {}));
        })(grid = controls.grid || (controls.grid = {}));
    })(controls = minerva.controls || (minerva.controls = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var controls;
    (function (controls) {
        var image;
        (function (image) {
            var arrange;
            (function (arrange) {
                var ImageArrangePipeDef = (function (_super) {
                    __extends(ImageArrangePipeDef, _super);
                    function ImageArrangePipeDef() {
                        _super.call(this);
                        this.addTapinAfter('invalidateFuture', 'invalidateMetrics', arrange.tapins.invalidateMetrics)
                            .addTapinBefore('doOverride', 'calcImageBounds', arrange.tapins.calcImageBounds)
                            .addTapinBefore('doOverride', 'calcStretch', arrange.tapins.calcStretch)
                            .replaceTapin('doOverride', arrange.tapins.doOverride);
                    }
                    ImageArrangePipeDef.prototype.createState = function () {
                        var state = _super.prototype.createState.call(this);
                        state.imageBounds = new minerva.Rect();
                        state.stretchX = 0;
                        state.stretchY = 0;
                        return state;
                    };
                    return ImageArrangePipeDef;
                })(minerva.core.arrange.ArrangePipeDef);
                arrange.ImageArrangePipeDef = ImageArrangePipeDef;
            })(arrange = image.arrange || (image.arrange = {}));
        })(image = controls.image || (controls.image = {}));
    })(controls = minerva.controls || (minerva.controls = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var controls;
    (function (controls) {
        var image;
        (function (image) {
            var hittest;
            (function (hittest) {
                var ImageHitTestPipeDef = (function (_super) {
                    __extends(ImageHitTestPipeDef, _super);
                    function ImageHitTestPipeDef() {
                        _super.call(this);
                        this.replaceTapin('insideChildren', hittest.tapins.insideChildren)
                            .replaceTapin('canHitInside', hittest.tapins.canHitInside)
                            .addTapinAfter('insideObject', 'insideStretch', hittest.tapins.insideStretch);
                    }
                    ImageHitTestPipeDef.prototype.prepare = function (data) {
                        data.imgRect = data.imgRect || new minerva.Rect();
                    };
                    return ImageHitTestPipeDef;
                })(minerva.core.hittest.HitTestPipeDef);
                hittest.ImageHitTestPipeDef = ImageHitTestPipeDef;
            })(hittest = image.hittest || (image.hittest = {}));
        })(image = controls.image || (controls.image = {}));
    })(controls = minerva.controls || (minerva.controls = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var controls;
    (function (controls) {
        var image;
        (function (image) {
            var measure;
            (function (measure) {
                var ImageMeasurePipeDef = (function (_super) {
                    __extends(ImageMeasurePipeDef, _super);
                    function ImageMeasurePipeDef() {
                        _super.call(this);
                        this.addTapinBefore('doOverride', 'calcImageBounds', measure.tapins.calcImageBounds)
                            .addTapinBefore('doOverride', 'calcStretch', measure.tapins.calcStretch)
                            .replaceTapin('doOverride', measure.tapins.doOverride);
                    }
                    ImageMeasurePipeDef.prototype.createState = function () {
                        var state = _super.prototype.createState.call(this);
                        state.imageBounds = new minerva.Rect();
                        state.stretchX = 0;
                        state.stretchY = 0;
                        return state;
                    };
                    return ImageMeasurePipeDef;
                })(minerva.core.measure.MeasurePipeDef);
                measure.ImageMeasurePipeDef = ImageMeasurePipeDef;
            })(measure = image.measure || (image.measure = {}));
        })(image = controls.image || (controls.image = {}));
    })(controls = minerva.controls || (minerva.controls = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var controls;
    (function (controls) {
        var image;
        (function (image) {
            var processdown;
            (function (processdown) {
                var ImageProcessDownPipeDef = (function (_super) {
                    __extends(ImageProcessDownPipeDef, _super);
                    function ImageProcessDownPipeDef() {
                        _super.call(this);
                        this.addTapinBefore('processLayoutClip', 'checkNeedImageMetrics', processdown.tapins.checkNeedImageMetrics)
                            .addTapinAfter('checkNeedImageMetrics', 'prepareImageMetrics', processdown.tapins.prepareImageMetrics)
                            .addTapinAfter('prepareImageMetrics', 'calcImageTransform', processdown.tapins.calcImageTransform)
                            .addTapinAfter('calcImageTransform', 'calcOverlap', processdown.tapins.calcOverlap);
                    }
                    ImageProcessDownPipeDef.prototype.createState = function () {
                        var state = _super.prototype.createState.call(this);
                        state.imgRect = new minerva.Rect();
                        state.paintRect = new minerva.Rect();
                        state.calcImageMetrics = false;
                        state.imgAdjust = false;
                        return state;
                    };
                    ImageProcessDownPipeDef.prototype.createOutput = function () {
                        var output = _super.prototype.createOutput.call(this);
                        output.imgXform = minerva.mat3.identity();
                        output.overlap = minerva.RectOverlap.In;
                        return output;
                    };
                    ImageProcessDownPipeDef.prototype.prepare = function (input, state, output, vpinput, tree) {
                        _super.prototype.prepare.call(this, input, state, output, vpinput, tree);
                        output.overlap = input.overlap;
                        minerva.mat3.copyTo(input.imgXform, output.imgXform);
                    };
                    ImageProcessDownPipeDef.prototype.flush = function (input, state, output, vpinput, tree) {
                        _super.prototype.flush.call(this, input, state, output, vpinput, tree);
                        input.overlap = output.overlap;
                        minerva.mat3.copyTo(output.imgXform, input.imgXform);
                    };
                    return ImageProcessDownPipeDef;
                })(minerva.core.processdown.ProcessDownPipeDef);
                processdown.ImageProcessDownPipeDef = ImageProcessDownPipeDef;
            })(processdown = image.processdown || (image.processdown = {}));
        })(image = controls.image || (controls.image = {}));
    })(controls = minerva.controls || (minerva.controls = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var controls;
    (function (controls) {
        var image;
        (function (image) {
            var render;
            (function (render) {
                var ImageRenderPipeDef = (function (_super) {
                    __extends(ImageRenderPipeDef, _super);
                    function ImageRenderPipeDef() {
                        _super.call(this);
                        this.replaceTapin('doRender', render.tapins.doRender);
                    }
                    return ImageRenderPipeDef;
                })(minerva.core.render.RenderPipeDef);
                render.ImageRenderPipeDef = ImageRenderPipeDef;
            })(render = image.render || (image.render = {}));
        })(image = controls.image || (controls.image = {}));
    })(controls = minerva.controls || (minerva.controls = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var controls;
    (function (controls) {
        var overlay;
        (function (overlay) {
            var hittest;
            (function (hittest) {
                var OverlayHitTestPipeDef = (function (_super) {
                    __extends(OverlayHitTestPipeDef, _super);
                    function OverlayHitTestPipeDef() {
                        _super.call(this);
                        this.addTapinBefore('canHit', 'shouldSkip', tapins.shouldSkip);
                    }
                    return OverlayHitTestPipeDef;
                })(minerva.core.hittest.HitTestPipeDef);
                hittest.OverlayHitTestPipeDef = OverlayHitTestPipeDef;
                var tapins;
                (function (tapins) {
                    function shouldSkip(data, pos, hitList, ctx) {
                        return !!data.assets.isVisible;
                    }
                    tapins.shouldSkip = shouldSkip;
                })(tapins = hittest.tapins || (hittest.tapins = {}));
            })(hittest = overlay.hittest || (overlay.hittest = {}));
        })(overlay = controls.overlay || (controls.overlay = {}));
    })(controls = minerva.controls || (minerva.controls = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var controls;
    (function (controls) {
        var overlay;
        (function (overlay) {
            var processup;
            (function (processup) {
                var OverlayProcessUpPipeDef = (function (_super) {
                    __extends(OverlayProcessUpPipeDef, _super);
                    function OverlayProcessUpPipeDef() {
                        _super.call(this);
                        this.removeTapin('calcActualSize')
                            .removeTapin('calcExtents')
                            .removeTapin('calcPaintBounds');
                    }
                    return OverlayProcessUpPipeDef;
                })(minerva.core.processup.ProcessUpPipeDef);
                processup.OverlayProcessUpPipeDef = OverlayProcessUpPipeDef;
            })(processup = overlay.processup || (overlay.processup = {}));
        })(overlay = controls.overlay || (controls.overlay = {}));
    })(controls = minerva.controls || (minerva.controls = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var controls;
    (function (controls) {
        var panel;
        (function (panel) {
            var hittest;
            (function (hittest) {
                var PanelHitTestPipeDef = (function (_super) {
                    __extends(PanelHitTestPipeDef, _super);
                    function PanelHitTestPipeDef() {
                        _super.call(this);
                        this.replaceTapin('canHitInside', tapins.canHitInside);
                    }
                    return PanelHitTestPipeDef;
                })(minerva.core.hittest.HitTestPipeDef);
                hittest.PanelHitTestPipeDef = PanelHitTestPipeDef;
                var tapins;
                (function (tapins) {
                    function canHitInside(data, pos, hitList, ctx) {
                        if (data.hitChildren)
                            return true;
                        if (!data.assets.background) {
                            hitList.shift();
                            ctx.restore();
                            return false;
                        }
                        return true;
                    }
                    tapins.canHitInside = canHitInside;
                })(tapins = hittest.tapins || (hittest.tapins = {}));
            })(hittest = panel.hittest || (panel.hittest = {}));
        })(panel = controls.panel || (controls.panel = {}));
    })(controls = minerva.controls || (minerva.controls = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var controls;
    (function (controls) {
        var popup;
        (function (popup) {
            var hittest;
            (function (hittest) {
                var PopupHitTestPipeDef = (function (_super) {
                    __extends(PopupHitTestPipeDef, _super);
                    function PopupHitTestPipeDef() {
                        _super.call(this);
                        this.addTapinBefore('canHit', 'shouldSkip', tapins.shouldSkip);
                    }
                    return PopupHitTestPipeDef;
                })(minerva.core.hittest.HitTestPipeDef);
                hittest.PopupHitTestPipeDef = PopupHitTestPipeDef;
                var tapins;
                (function (tapins) {
                    function shouldSkip(data, pos, hitList, ctx) {
                        return !!data.assets.isVisible;
                    }
                    tapins.shouldSkip = shouldSkip;
                })(tapins = hittest.tapins || (hittest.tapins = {}));
            })(hittest = popup.hittest || (popup.hittest = {}));
        })(popup = controls.popup || (controls.popup = {}));
    })(controls = minerva.controls || (minerva.controls = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var controls;
    (function (controls) {
        var popup;
        (function (popup) {
            var processdown;
            (function (processdown) {
                var PopupProcessDownPipeDef = (function (_super) {
                    __extends(PopupProcessDownPipeDef, _super);
                    function PopupProcessDownPipeDef() {
                        _super.call(this);
                        this.addTapinBefore('processXform', 'preProcessXform', processdown.tapins.preProcessXform)
                            .addTapinAfter('processXform', 'postProcessXform', processdown.tapins.postProcessXform);
                    }
                    return PopupProcessDownPipeDef;
                })(minerva.core.processdown.ProcessDownPipeDef);
                processdown.PopupProcessDownPipeDef = PopupProcessDownPipeDef;
            })(processdown = popup.processdown || (popup.processdown = {}));
        })(popup = controls.popup || (controls.popup = {}));
    })(controls = minerva.controls || (minerva.controls = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var controls;
    (function (controls) {
        var popup;
        (function (popup) {
            var processup;
            (function (processup) {
                var PopupProcessUpPipeDef = (function (_super) {
                    __extends(PopupProcessUpPipeDef, _super);
                    function PopupProcessUpPipeDef() {
                        _super.call(this);
                        this.removeTapin('calcActualSize')
                            .removeTapin('calcExtents')
                            .removeTapin('calcPaintBounds');
                    }
                    return PopupProcessUpPipeDef;
                })(minerva.core.processup.ProcessUpPipeDef);
                processup.PopupProcessUpPipeDef = PopupProcessUpPipeDef;
            })(processup = popup.processup || (popup.processup = {}));
        })(popup = controls.popup || (controls.popup = {}));
    })(controls = minerva.controls || (minerva.controls = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var controls;
    (function (controls) {
        var scrollcontentpresenter;
        (function (scrollcontentpresenter) {
            var arrange;
            (function (arrange) {
                var ScrollContentPresenterArrangePipeDef = (function (_super) {
                    __extends(ScrollContentPresenterArrangePipeDef, _super);
                    function ScrollContentPresenterArrangePipeDef() {
                        _super.call(this);
                        this.replaceTapin('doOverride', arrange.tapins.doOverride)
                            .addTapinAfter('completeOverride', 'updateClip', arrange.tapins.updateClip)
                            .addTapinAfter('updateClip', 'updateExtents', arrange.tapins.updateExtents);
                    }
                    ScrollContentPresenterArrangePipeDef.prototype.createOutput = function () {
                        var output = _super.prototype.createOutput.call(this);
                        output.internalClip = new minerva.Rect();
                        return output;
                    };
                    ScrollContentPresenterArrangePipeDef.prototype.prepare = function (input, state, output) {
                        minerva.Rect.copyTo(input.internalClip, output.internalClip);
                        _super.prototype.prepare.call(this, input, state, output);
                    };
                    ScrollContentPresenterArrangePipeDef.prototype.flush = function (input, state, output) {
                        _super.prototype.flush.call(this, input, state, output);
                        minerva.Rect.copyTo(output.internalClip, input.internalClip);
                    };
                    return ScrollContentPresenterArrangePipeDef;
                })(minerva.core.arrange.ArrangePipeDef);
                arrange.ScrollContentPresenterArrangePipeDef = ScrollContentPresenterArrangePipeDef;
            })(arrange = scrollcontentpresenter.arrange || (scrollcontentpresenter.arrange = {}));
        })(scrollcontentpresenter = controls.scrollcontentpresenter || (controls.scrollcontentpresenter = {}));
    })(controls = minerva.controls || (minerva.controls = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var controls;
    (function (controls) {
        var scrollcontentpresenter;
        (function (scrollcontentpresenter) {
            var measure;
            (function (measure) {
                var ScrollContentPresenterMeasurePipeDef = (function (_super) {
                    __extends(ScrollContentPresenterMeasurePipeDef, _super);
                    function ScrollContentPresenterMeasurePipeDef() {
                        _super.call(this);
                        this.replaceTapin('doOverride', measure.tapins.doOverride)
                            .addTapinAfter('doOverride', 'updateExtents', measure.tapins.updateExtents)
                            .addTapinAfter('updateExtents', 'finishDoOverride', measure.tapins.finishDoOverride);
                    }
                    ScrollContentPresenterMeasurePipeDef.prototype.createState = function () {
                        var state = _super.prototype.createState.call(this);
                        state.idealSize = new minerva.Size();
                        return state;
                    };
                    return ScrollContentPresenterMeasurePipeDef;
                })(minerva.core.measure.MeasurePipeDef);
                measure.ScrollContentPresenterMeasurePipeDef = ScrollContentPresenterMeasurePipeDef;
            })(measure = scrollcontentpresenter.measure || (scrollcontentpresenter.measure = {}));
        })(scrollcontentpresenter = controls.scrollcontentpresenter || (controls.scrollcontentpresenter = {}));
    })(controls = minerva.controls || (minerva.controls = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var controls;
    (function (controls) {
        var scrollcontentpresenter;
        (function (scrollcontentpresenter) {
            var render;
            (function (render) {
                var ScrollContentPresenterRenderPipeDef = (function (_super) {
                    __extends(ScrollContentPresenterRenderPipeDef, _super);
                    function ScrollContentPresenterRenderPipeDef() {
                        _super.call(this);
                        this.addTapinAfter('applyClip', 'applyInternalClip', tapins.applyInternalClip);
                    }
                    return ScrollContentPresenterRenderPipeDef;
                })(minerva.core.render.RenderPipeDef);
                render.ScrollContentPresenterRenderPipeDef = ScrollContentPresenterRenderPipeDef;
                var tapins;
                (function (tapins) {
                    function applyInternalClip(input, state, output, ctx, region, tree) {
                        if (minerva.Rect.isEmpty(input.internalClip))
                            return true;
                        ctx.clipRect(input.internalClip);
                        return true;
                    }
                    tapins.applyInternalClip = applyInternalClip;
                })(tapins = render.tapins || (render.tapins = {}));
            })(render = scrollcontentpresenter.render || (scrollcontentpresenter.render = {}));
        })(scrollcontentpresenter = controls.scrollcontentpresenter || (controls.scrollcontentpresenter = {}));
    })(controls = minerva.controls || (minerva.controls = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var controls;
    (function (controls) {
        var stackpanel;
        (function (stackpanel) {
            var arrange;
            (function (arrange) {
                var StackPanelArrangePipeDef = (function (_super) {
                    __extends(StackPanelArrangePipeDef, _super);
                    function StackPanelArrangePipeDef() {
                        _super.call(this);
                        this.replaceTapin('doOverride', arrange.tapins.doOverride)
                            .addTapinAfter('doOverride', 'doHorizontal', arrange.tapins.doHorizontal)
                            .addTapinAfter('doOverride', 'doVertical', arrange.tapins.doVertical);
                    }
                    return StackPanelArrangePipeDef;
                })(controls.panel.arrange.PanelArrangePipeDef);
                arrange.StackPanelArrangePipeDef = StackPanelArrangePipeDef;
            })(arrange = stackpanel.arrange || (stackpanel.arrange = {}));
        })(stackpanel = controls.stackpanel || (controls.stackpanel = {}));
    })(controls = minerva.controls || (minerva.controls = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var controls;
    (function (controls) {
        var stackpanel;
        (function (stackpanel) {
            var measure;
            (function (measure) {
                var StackPanelMeasurePipeDef = (function (_super) {
                    __extends(StackPanelMeasurePipeDef, _super);
                    function StackPanelMeasurePipeDef() {
                        _super.call(this);
                        this.replaceTapin('doOverride', measure.tapins.doOverride)
                            .addTapinAfter('doOverride', 'doHorizontal', measure.tapins.doHorizontal)
                            .addTapinAfter('doOverride', 'doVertical', measure.tapins.doVertical);
                    }
                    StackPanelMeasurePipeDef.prototype.createState = function () {
                        var state = _super.prototype.createState.call(this);
                        state.childAvailable = new minerva.Size();
                        return state;
                    };
                    return StackPanelMeasurePipeDef;
                })(controls.panel.measure.PanelMeasurePipeDef);
                measure.StackPanelMeasurePipeDef = StackPanelMeasurePipeDef;
            })(measure = stackpanel.measure || (stackpanel.measure = {}));
        })(stackpanel = controls.stackpanel || (controls.stackpanel = {}));
    })(controls = minerva.controls || (minerva.controls = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var controls;
    (function (controls) {
        var textblock;
        (function (textblock) {
            var arrange;
            (function (arrange) {
                var TextBlockArrangePipeDef = (function (_super) {
                    __extends(TextBlockArrangePipeDef, _super);
                    function TextBlockArrangePipeDef() {
                        _super.call(this);
                        this.replaceTapin('doOverride', tapins.doOverride);
                    }
                    return TextBlockArrangePipeDef;
                })(minerva.core.arrange.ArrangePipeDef);
                arrange.TextBlockArrangePipeDef = TextBlockArrangePipeDef;
                var tapins;
                (function (tapins) {
                    function doOverride(input, state, output, tree, finalRect) {
                        var fs = state.finalSize;
                        var as = state.arrangedSize;
                        minerva.Thickness.shrinkSize(input.padding, fs);
                        minerva.Size.copyTo(tree.layout(fs, input), as);
                        as.width = Math.max(as.width, fs.width);
                        as.height = Math.max(as.height, fs.height);
                        tree.setAvailableWidth(fs.width);
                        minerva.Thickness.growSize(input.padding, as);
                        return true;
                    }
                    tapins.doOverride = doOverride;
                })(tapins = arrange.tapins || (arrange.tapins = {}));
            })(arrange = textblock.arrange || (textblock.arrange = {}));
        })(textblock = controls.textblock || (controls.textblock = {}));
    })(controls = minerva.controls || (minerva.controls = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var controls;
    (function (controls) {
        var textblock;
        (function (textblock) {
            var hittest;
            (function (hittest) {
                var TextBlockHitTestPipeDef = (function (_super) {
                    __extends(TextBlockHitTestPipeDef, _super);
                    function TextBlockHitTestPipeDef() {
                        _super.call(this);
                        this.replaceTapin('canHitInside', tapins.canHitInside);
                    }
                    return TextBlockHitTestPipeDef;
                })(minerva.core.hittest.HitTestPipeDef);
                hittest.TextBlockHitTestPipeDef = TextBlockHitTestPipeDef;
                var tapins;
                (function (tapins) {
                    function canHitInside(data, pos, hitList, ctx) {
                        return true;
                    }
                    tapins.canHitInside = canHitInside;
                })(tapins = hittest.tapins || (hittest.tapins = {}));
            })(hittest = textblock.hittest || (textblock.hittest = {}));
        })(textblock = controls.textblock || (controls.textblock = {}));
    })(controls = minerva.controls || (minerva.controls = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var controls;
    (function (controls) {
        var textblock;
        (function (textblock) {
            var measure;
            (function (measure) {
                var TextBlockMeasurePipeDef = (function (_super) {
                    __extends(TextBlockMeasurePipeDef, _super);
                    function TextBlockMeasurePipeDef() {
                        _super.call(this);
                        this.replaceTapin('doOverride', tapins.doOverride);
                    }
                    return TextBlockMeasurePipeDef;
                })(minerva.core.measure.MeasurePipeDef);
                measure.TextBlockMeasurePipeDef = TextBlockMeasurePipeDef;
                var tapins;
                (function (tapins) {
                    function doOverride(input, state, output, tree, availableSize) {
                        var ds = output.desiredSize;
                        minerva.Thickness.shrinkSize(input.padding, state.availableSize);
                        tree.setMaxWidth(state.availableSize.width, input);
                        minerva.Size.copyTo(tree.layout(state.availableSize, input), ds);
                        minerva.Thickness.growSize(input.padding, ds);
                        return true;
                    }
                    tapins.doOverride = doOverride;
                })(tapins = measure.tapins || (measure.tapins = {}));
            })(measure = textblock.measure || (textblock.measure = {}));
        })(textblock = controls.textblock || (controls.textblock = {}));
    })(controls = minerva.controls || (minerva.controls = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var controls;
    (function (controls) {
        var textblock;
        (function (textblock) {
            var processup;
            (function (processup) {
                var TextBlockProcessUpPipeDef = (function (_super) {
                    __extends(TextBlockProcessUpPipeDef, _super);
                    function TextBlockProcessUpPipeDef() {
                        _super.call(this);
                        this.replaceTapin('calcActualSize', tapins.calcActualSize)
                            .replaceTapin('calcExtents', tapins.calcExtents);
                    }
                    return TextBlockProcessUpPipeDef;
                })(minerva.core.processup.ProcessUpPipeDef);
                processup.TextBlockProcessUpPipeDef = TextBlockProcessUpPipeDef;
                var tapins;
                (function (tapins) {
                    function calcActualSize(input, state, output, tree) {
                        if ((input.dirtyFlags & minerva.DirtyFlags.Bounds) === 0)
                            return true;
                        var actual = state.actualSize;
                        actual.width = Number.POSITIVE_INFINITY;
                        actual.height = Number.POSITIVE_INFINITY;
                        minerva.core.helpers.coerceSize(actual, input);
                        minerva.Thickness.shrinkSize(input.padding, actual);
                        minerva.Size.copyTo(tree.layout(actual, input), actual);
                        minerva.Thickness.growSize(input.padding, actual);
                        return true;
                    }
                    tapins.calcActualSize = calcActualSize;
                    function calcExtents(input, state, output, tree) {
                        if ((input.dirtyFlags & minerva.DirtyFlags.Bounds) === 0)
                            return true;
                        var e = output.extents;
                        e.x = tree.getHorizontalOffset(input);
                        e.y = 0;
                        minerva.Size.copyTo(state.actualSize, e);
                        var padding = input.padding;
                        e.x += padding.left;
                        e.y += padding.top;
                        minerva.Rect.copyTo(e, output.extentsWithChildren);
                        return true;
                    }
                    tapins.calcExtents = calcExtents;
                })(tapins = processup.tapins || (processup.tapins = {}));
            })(processup = textblock.processup || (textblock.processup = {}));
        })(textblock = controls.textblock || (controls.textblock = {}));
    })(controls = minerva.controls || (minerva.controls = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var controls;
    (function (controls) {
        var textblock;
        (function (textblock) {
            var render;
            (function (render) {
                var TextBlockRenderPipeDef = (function (_super) {
                    __extends(TextBlockRenderPipeDef, _super);
                    function TextBlockRenderPipeDef() {
                        _super.call(this);
                        this.replaceTapin('doRender', tapins.doRender);
                    }
                    return TextBlockRenderPipeDef;
                })(minerva.core.render.RenderPipeDef);
                render.TextBlockRenderPipeDef = TextBlockRenderPipeDef;
                var tapins;
                (function (tapins) {
                    function doRender(input, state, output, ctx, region, tree) {
                        ctx.save();
                        minerva.core.helpers.renderLayoutClip(ctx, input, tree);
                        var padding = input.padding;
                        if (padding)
                            ctx.translate(padding.left, padding.top);
                        tree.render(ctx, input);
                        ctx.restore();
                        return true;
                    }
                    tapins.doRender = doRender;
                })(tapins = render.tapins || (render.tapins = {}));
            })(render = textblock.render || (textblock.render = {}));
        })(textblock = controls.textblock || (controls.textblock = {}));
    })(controls = minerva.controls || (minerva.controls = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var controls;
    (function (controls) {
        var textboxview;
        (function (textboxview) {
            var arrange;
            (function (arrange) {
                var TextBoxViewArrangePipeDef = (function (_super) {
                    __extends(TextBoxViewArrangePipeDef, _super);
                    function TextBoxViewArrangePipeDef() {
                        _super.call(this);
                        this.replaceTapin('doOverride', tapins.doOverride);
                    }
                    return TextBoxViewArrangePipeDef;
                })(minerva.core.arrange.ArrangePipeDef);
                arrange.TextBoxViewArrangePipeDef = TextBoxViewArrangePipeDef;
                var tapins;
                (function (tapins) {
                    function doOverride(input, state, output, tree, finalRect) {
                        var fs = state.finalSize;
                        var as = state.arrangedSize;
                        minerva.Size.copyTo(tree.layout(fs, input), as);
                        as.width = Math.max(as.width, fs.width);
                        as.height = Math.max(as.height, fs.height);
                        tree.setAvailableWidth(fs.width);
                        return true;
                    }
                    tapins.doOverride = doOverride;
                })(tapins = arrange.tapins || (arrange.tapins = {}));
            })(arrange = textboxview.arrange || (textboxview.arrange = {}));
        })(textboxview = controls.textboxview || (controls.textboxview = {}));
    })(controls = minerva.controls || (minerva.controls = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var controls;
    (function (controls) {
        var textboxview;
        (function (textboxview) {
            var hittest;
            (function (hittest) {
                var TextBoxViewHitTestPipeDef = (function (_super) {
                    __extends(TextBoxViewHitTestPipeDef, _super);
                    function TextBoxViewHitTestPipeDef() {
                        _super.call(this);
                        this.replaceTapin('canHitInside', tapins.canHitInside);
                    }
                    return TextBoxViewHitTestPipeDef;
                })(minerva.core.hittest.HitTestPipeDef);
                hittest.TextBoxViewHitTestPipeDef = TextBoxViewHitTestPipeDef;
                var tapins;
                (function (tapins) {
                    function canHitInside(data, pos, hitList, ctx) {
                        return true;
                    }
                    tapins.canHitInside = canHitInside;
                })(tapins = hittest.tapins || (hittest.tapins = {}));
            })(hittest = textboxview.hittest || (textboxview.hittest = {}));
        })(textboxview = controls.textboxview || (controls.textboxview = {}));
    })(controls = minerva.controls || (minerva.controls = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var controls;
    (function (controls) {
        var textboxview;
        (function (textboxview) {
            var measure;
            (function (measure) {
                var TextBoxViewMeasurePipeDef = (function (_super) {
                    __extends(TextBoxViewMeasurePipeDef, _super);
                    function TextBoxViewMeasurePipeDef() {
                        _super.call(this);
                        this.replaceTapin('doOverride', tapins.doOverride);
                    }
                    return TextBoxViewMeasurePipeDef;
                })(minerva.core.measure.MeasurePipeDef);
                measure.TextBoxViewMeasurePipeDef = TextBoxViewMeasurePipeDef;
                var tapins;
                (function (tapins) {
                    function doOverride(input, state, output, tree, availableSize) {
                        var ds = output.desiredSize;
                        var available = state.availableSize;
                        tree.setMaxWidth(available.width, input);
                        minerva.Size.copyTo(tree.layout(available, input), ds);
                        if (!isFinite(available.width))
                            ds.width = Math.max(ds.width, 11);
                        ds.width = Math.min(ds.width, available.width);
                        ds.height = Math.min(ds.height, available.height);
                        return true;
                    }
                    tapins.doOverride = doOverride;
                })(tapins = measure.tapins || (measure.tapins = {}));
            })(measure = textboxview.measure || (textboxview.measure = {}));
        })(textboxview = controls.textboxview || (controls.textboxview = {}));
    })(controls = minerva.controls || (minerva.controls = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var controls;
    (function (controls) {
        var textboxview;
        (function (textboxview) {
            var processup;
            (function (processup) {
                var TextBoxViewProcessUpPipeDef = (function (_super) {
                    __extends(TextBoxViewProcessUpPipeDef, _super);
                    function TextBoxViewProcessUpPipeDef() {
                        _super.call(this);
                        this.replaceTapin('calcActualSize', tapins.calcActualSize)
                            .replaceTapin('calcExtents', tapins.calcExtents);
                    }
                    return TextBoxViewProcessUpPipeDef;
                })(minerva.core.processup.ProcessUpPipeDef);
                processup.TextBoxViewProcessUpPipeDef = TextBoxViewProcessUpPipeDef;
                var tapins;
                (function (tapins) {
                    function calcActualSize(input, state, output, tree) {
                        if ((input.dirtyFlags & minerva.DirtyFlags.Bounds) === 0)
                            return true;
                        var as = state.actualSize;
                        as.width = Number.POSITIVE_INFINITY;
                        as.height = Number.POSITIVE_INFINITY;
                        minerva.core.helpers.coerceSize(as, input);
                        minerva.Size.copyTo(tree.layout(as, input), as);
                        return true;
                    }
                    tapins.calcActualSize = calcActualSize;
                    function calcExtents(input, state, output, tree) {
                        if ((input.dirtyFlags & minerva.DirtyFlags.Bounds) === 0)
                            return true;
                        var e = output.extents;
                        e.x = e.y = 0;
                        minerva.Size.copyTo(state.actualSize, e);
                        minerva.Rect.copyTo(e, output.extentsWithChildren);
                        output.extentsWithChildren.width++;
                        return true;
                    }
                    tapins.calcExtents = calcExtents;
                })(tapins = processup.tapins || (processup.tapins = {}));
            })(processup = textboxview.processup || (textboxview.processup = {}));
        })(textboxview = controls.textboxview || (controls.textboxview = {}));
    })(controls = minerva.controls || (minerva.controls = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var controls;
    (function (controls) {
        var textboxview;
        (function (textboxview) {
            var render;
            (function (render) {
                var TextBoxViewRenderPipeDef = (function (_super) {
                    __extends(TextBoxViewRenderPipeDef, _super);
                    function TextBoxViewRenderPipeDef() {
                        _super.call(this);
                        this.replaceTapin('doRender', tapins.doRender)
                            .addTapinAfter('doRender', 'calcCaretRegion', tapins.calcCaretRegion)
                            .addTapinAfter('calcCaretRegion', 'renderCaret', tapins.renderCaret);
                    }
                    TextBoxViewRenderPipeDef.prototype.createOutput = function () {
                        var output = _super.prototype.createOutput.call(this);
                        output.caretRegion = new minerva.Rect();
                        return output;
                    };
                    TextBoxViewRenderPipeDef.prototype.prepare = function (input, state, output) {
                        minerva.Rect.copyTo(input.caretRegion, output.caretRegion);
                        _super.prototype.prepare.call(this, input, state, output);
                    };
                    TextBoxViewRenderPipeDef.prototype.flush = function (input, state, output) {
                        _super.prototype.flush.call(this, input, state, output);
                        minerva.Rect.copyTo(output.caretRegion, input.caretRegion);
                    };
                    return TextBoxViewRenderPipeDef;
                })(minerva.core.render.RenderPipeDef);
                render.TextBoxViewRenderPipeDef = TextBoxViewRenderPipeDef;
                var tapins;
                (function (tapins) {
                    function doRender(input, state, output, ctx, region, tree) {
                        ctx.save();
                        minerva.core.helpers.renderLayoutClip(ctx, input, tree);
                        tree.render(ctx, input);
                        ctx.restore();
                        return true;
                    }
                    tapins.doRender = doRender;
                    function calcCaretRegion(input, state, output, ctx, region, tree) {
                        if (!minerva.Rect.isEmpty(output.caretRegion) || input.selectionLength > 0)
                            return true;
                        minerva.Rect.copyTo(tree.getCaretRegion(input), output.caretRegion);
                        return true;
                    }
                    tapins.calcCaretRegion = calcCaretRegion;
                    function renderCaret(input, state, output, ctx, region, tree) {
                        if (!input.isCaretVisible || input.selectionLength > 0)
                            return true;
                        var region = output.caretRegion;
                        var brush = input.caretBrush;
                        var raw = ctx.raw;
                        raw.beginPath();
                        raw.moveTo(region.x + 0.5, region.y);
                        raw.lineTo(region.x + 0.5, region.y + region.height);
                        raw.lineWidth = 1.0;
                        if (brush) {
                            brush.setupBrush(raw, region);
                            raw.strokeStyle = brush.toHtml5Object();
                        }
                        else {
                            raw.strokeStyle = "#000000";
                        }
                        raw.stroke();
                        return true;
                    }
                    tapins.renderCaret = renderCaret;
                })(tapins = render.tapins || (render.tapins = {}));
            })(render = textboxview.render || (textboxview.render = {}));
        })(textboxview = controls.textboxview || (controls.textboxview = {}));
    })(controls = minerva.controls || (minerva.controls = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var controls;
    (function (controls) {
        var usercontrol;
        (function (usercontrol) {
            var arrange;
            (function (arrange) {
                var UserControlArrangePipeDef = (function (_super) {
                    __extends(UserControlArrangePipeDef, _super);
                    function UserControlArrangePipeDef() {
                        _super.call(this);
                        this.addTapinBefore('doOverride', 'preOverride', arrange.tapins.preOverride)
                            .replaceTapin('doOverride', arrange.tapins.doOverride);
                    }
                    UserControlArrangePipeDef.prototype.createState = function () {
                        var state = _super.prototype.createState.call(this);
                        state.totalBorder = new minerva.Thickness();
                        return state;
                    };
                    return UserControlArrangePipeDef;
                })(minerva.core.arrange.ArrangePipeDef);
                arrange.UserControlArrangePipeDef = UserControlArrangePipeDef;
            })(arrange = usercontrol.arrange || (usercontrol.arrange = {}));
        })(usercontrol = controls.usercontrol || (controls.usercontrol = {}));
    })(controls = minerva.controls || (minerva.controls = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var controls;
    (function (controls) {
        var usercontrol;
        (function (usercontrol) {
            var measure;
            (function (measure) {
                var UserControlMeasurePipeDef = (function (_super) {
                    __extends(UserControlMeasurePipeDef, _super);
                    function UserControlMeasurePipeDef() {
                        _super.call(this);
                        this.addTapinBefore('doOverride', 'preOverride', measure.tapins.preOverride)
                            .replaceTapin('doOverride', measure.tapins.doOverride)
                            .addTapinAfter('doOverride', 'postOverride', measure.tapins.postOverride);
                    }
                    UserControlMeasurePipeDef.prototype.createState = function () {
                        var state = _super.prototype.createState.call(this);
                        state.totalBorder = new minerva.Thickness();
                        return state;
                    };
                    return UserControlMeasurePipeDef;
                })(minerva.core.measure.MeasurePipeDef);
                measure.UserControlMeasurePipeDef = UserControlMeasurePipeDef;
            })(measure = usercontrol.measure || (usercontrol.measure = {}));
        })(usercontrol = controls.usercontrol || (controls.usercontrol = {}));
    })(controls = minerva.controls || (minerva.controls = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var controls;
    (function (controls) {
        var usercontrol;
        (function (usercontrol) {
            var processdown;
            (function (processdown) {
                var UserControlProcessDownPipeDef = (function (_super) {
                    __extends(UserControlProcessDownPipeDef, _super);
                    function UserControlProcessDownPipeDef() {
                        _super.call(this);
                        this.replaceTapin('processLayoutClip', tapins.processLayoutClip);
                    }
                    return UserControlProcessDownPipeDef;
                })(minerva.core.processdown.ProcessDownPipeDef);
                processdown.UserControlProcessDownPipeDef = UserControlProcessDownPipeDef;
                var tapins;
                (function (tapins) {
                    function processLayoutClip(input, state, output, vpinput, tree) {
                        if ((input.dirtyFlags & minerva.DirtyFlags.LayoutClip) === 0)
                            return true;
                        var clc = input.compositeLayoutClip;
                        clc.x = clc.y = clc.width = clc.height;
                        return true;
                    }
                    tapins.processLayoutClip = processLayoutClip;
                })(tapins = processdown.tapins || (processdown.tapins = {}));
            })(processdown = usercontrol.processdown || (usercontrol.processdown = {}));
        })(usercontrol = controls.usercontrol || (controls.usercontrol = {}));
    })(controls = minerva.controls || (minerva.controls = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var controls;
    (function (controls) {
        var virtualizingstackpanel;
        (function (virtualizingstackpanel) {
            var arrange;
            (function (arrange) {
                var VirtualizingStackPanelArrangePipeDef = (function (_super) {
                    __extends(VirtualizingStackPanelArrangePipeDef, _super);
                    function VirtualizingStackPanelArrangePipeDef() {
                        _super.call(this);
                        this.replaceTapin('doOverride', arrange.tapins.doOverride)
                            .addTapinAfter('doOverride', 'doHorizontal', arrange.tapins.doHorizontal)
                            .addTapinAfter('doOverride', 'doVertical', arrange.tapins.doVertical);
                    }
                    return VirtualizingStackPanelArrangePipeDef;
                })(controls.panel.arrange.PanelArrangePipeDef);
                arrange.VirtualizingStackPanelArrangePipeDef = VirtualizingStackPanelArrangePipeDef;
            })(arrange = virtualizingstackpanel.arrange || (virtualizingstackpanel.arrange = {}));
        })(virtualizingstackpanel = controls.virtualizingstackpanel || (controls.virtualizingstackpanel = {}));
    })(controls = minerva.controls || (minerva.controls = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var controls;
    (function (controls) {
        var virtualizingstackpanel;
        (function (virtualizingstackpanel) {
            var measure;
            (function (measure) {
                var VirtualizingStackPanelMeasurePipeDef = (function (_super) {
                    __extends(VirtualizingStackPanelMeasurePipeDef, _super);
                    function VirtualizingStackPanelMeasurePipeDef() {
                        _super.call(this);
                        this.replaceTapin('doOverride', measure.tapins.doOverride)
                            .addTapinAfter('doOverride', 'doHorizontal', measure.tapins.doHorizontal)
                            .addTapinAfter('doOverride', 'doVertical', measure.tapins.doVertical);
                    }
                    VirtualizingStackPanelMeasurePipeDef.prototype.createState = function () {
                        var state = _super.prototype.createState.call(this);
                        state.childAvailable = new minerva.Size();
                        return state;
                    };
                    return VirtualizingStackPanelMeasurePipeDef;
                })(controls.panel.measure.PanelMeasurePipeDef);
                measure.VirtualizingStackPanelMeasurePipeDef = VirtualizingStackPanelMeasurePipeDef;
            })(measure = virtualizingstackpanel.measure || (virtualizingstackpanel.measure = {}));
        })(virtualizingstackpanel = controls.virtualizingstackpanel || (controls.virtualizingstackpanel = {}));
    })(controls = minerva.controls || (minerva.controls = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var shapes;
    (function (shapes) {
        var ellipse;
        (function (ellipse) {
            var helpers;
            (function (helpers) {
                function draw(ctx, x, y, width, height) {
                    var radiusX = width / 2;
                    var radiusY = height / 2;
                    var right = x + width;
                    var bottom = y + height;
                    var centerX = x + radiusX;
                    var centerY = y + radiusY;
                    ctx.beginPath();
                    if (width === height) {
                        ctx.arc(centerX, centerY, radiusX, 0, Math.PI * 2, false);
                        return;
                    }
                    var kappa = .5522848;
                    var ox = radiusX * kappa;
                    var oy = radiusY * kappa;
                    ctx.moveTo(x, centerY);
                    ctx.bezierCurveTo(x, centerY - oy, centerX - ox, y, centerX, y);
                    ctx.bezierCurveTo(centerX + ox, y, right, centerY - oy, right, centerY);
                    ctx.bezierCurveTo(right, centerY + oy, centerX + ox, bottom, centerX, bottom);
                    ctx.bezierCurveTo(centerX - ox, bottom, x, centerY + oy, x, centerY);
                    ctx.closePath();
                }
                helpers.draw = draw;
            })(helpers = ellipse.helpers || (ellipse.helpers = {}));
        })(ellipse = shapes.ellipse || (shapes.ellipse = {}));
    })(shapes = minerva.shapes || (minerva.shapes = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var shapes;
    (function (shapes) {
        var shape;
        (function (shape) {
            var hittest;
            (function (hittest) {
                var ShapeHitTestPipeDef = (function (_super) {
                    __extends(ShapeHitTestPipeDef, _super);
                    function ShapeHitTestPipeDef() {
                        _super.call(this);
                        this.replaceTapin('canHitInside', hittest.tapins.canHitInside)
                            .replaceTapin('insideChildren', hittest.tapins.insideChildren)
                            .addTapinAfter('insideObject', 'canHitShape', hittest.tapins.canHitShape)
                            .addTapinAfter('canHitShape', 'prepareShape', hittest.tapins.prepareShape)
                            .addTapinAfter('prepareShape', 'drawShape', hittest.tapins.drawShape)
                            .addTapinAfter('drawShape', 'finishShape', hittest.tapins.finishShape);
                    }
                    return ShapeHitTestPipeDef;
                })(minerva.core.hittest.HitTestPipeDef);
                hittest.ShapeHitTestPipeDef = ShapeHitTestPipeDef;
            })(hittest = shape.hittest || (shape.hittest = {}));
        })(shape = shapes.shape || (shapes.shape = {}));
    })(shapes = minerva.shapes || (minerva.shapes = {}));
})(minerva || (minerva = {}));
/// <reference path="../../shape/hittest/ShapeHitTestPipeDef" />
var minerva;
(function (minerva) {
    var shapes;
    (function (shapes) {
        var ellipse;
        (function (ellipse) {
            var hittest;
            (function (hittest) {
                var EllipseHitTestPipeDef = (function (_super) {
                    __extends(EllipseHitTestPipeDef, _super);
                    function EllipseHitTestPipeDef() {
                        _super.call(this);
                        this.replaceTapin('drawShape', tapins.drawShape);
                    }
                    return EllipseHitTestPipeDef;
                })(shapes.shape.hittest.ShapeHitTestPipeDef);
                hittest.EllipseHitTestPipeDef = EllipseHitTestPipeDef;
                var tapins;
                (function (tapins) {
                    function drawShape(data, pos, hitList, ctx) {
                        var sr = data.assets.shapeRect;
                        ellipse.helpers.draw(ctx.raw, sr.x, sr.y, sr.width, sr.height);
                        return true;
                    }
                    tapins.drawShape = drawShape;
                })(tapins = hittest.tapins || (hittest.tapins = {}));
            })(hittest = ellipse.hittest || (ellipse.hittest = {}));
        })(ellipse = shapes.ellipse || (shapes.ellipse = {}));
    })(shapes = minerva.shapes || (minerva.shapes = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var shapes;
    (function (shapes) {
        var shape;
        (function (shape) {
            var measure;
            (function (measure) {
                var ShapeMeasurePipeDef = (function (_super) {
                    __extends(ShapeMeasurePipeDef, _super);
                    function ShapeMeasurePipeDef() {
                        _super.call(this);
                        this.addTapinBefore('doOverride', 'calcNaturalBounds', measure.tapins.calcNaturalBounds)
                            .replaceTapin('doOverride', measure.tapins.doOverride);
                    }
                    ShapeMeasurePipeDef.prototype.createOutput = function () {
                        var output = _super.prototype.createOutput.call(this);
                        output.naturalBounds = new minerva.Rect();
                        return output;
                    };
                    ShapeMeasurePipeDef.prototype.prepare = function (input, state, output) {
                        minerva.Rect.copyTo(input.naturalBounds, output.naturalBounds);
                        _super.prototype.prepare.call(this, input, state, output);
                    };
                    ShapeMeasurePipeDef.prototype.flush = function (input, state, output) {
                        _super.prototype.flush.call(this, input, state, output);
                        minerva.Rect.copyTo(output.naturalBounds, input.naturalBounds);
                    };
                    return ShapeMeasurePipeDef;
                })(minerva.core.measure.MeasurePipeDef);
                measure.ShapeMeasurePipeDef = ShapeMeasurePipeDef;
            })(measure = shape.measure || (shape.measure = {}));
        })(shape = shapes.shape || (shapes.shape = {}));
    })(shapes = minerva.shapes || (minerva.shapes = {}));
})(minerva || (minerva = {}));
/// <reference path="../../shape/measure/ShapeMeasurePipeDef" />
var minerva;
(function (minerva) {
    var shapes;
    (function (shapes) {
        var ellipse;
        (function (ellipse) {
            var measure;
            (function (measure) {
                var EllipseMeasurePipeDef = (function (_super) {
                    __extends(EllipseMeasurePipeDef, _super);
                    function EllipseMeasurePipeDef() {
                        _super.call(this);
                        this.addTapinBefore('doOverride', 'shrinkAvailable', tapins.shrinkAvailable);
                    }
                    return EllipseMeasurePipeDef;
                })(shapes.shape.measure.ShapeMeasurePipeDef);
                measure.EllipseMeasurePipeDef = EllipseMeasurePipeDef;
                var tapins;
                (function (tapins) {
                    function shrinkAvailable(input, state, output, tree) {
                        var available = state.availableSize;
                        available.width = available.height = 0;
                        return true;
                    }
                    tapins.shrinkAvailable = shrinkAvailable;
                })(tapins = measure.tapins || (measure.tapins = {}));
            })(measure = ellipse.measure || (ellipse.measure = {}));
        })(ellipse = shapes.ellipse || (shapes.ellipse = {}));
    })(shapes = minerva.shapes || (minerva.shapes = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var shapes;
    (function (shapes) {
        var shape;
        (function (shape) {
            var render;
            (function (render) {
                var ShapeRenderPipeDef = (function (_super) {
                    __extends(ShapeRenderPipeDef, _super);
                    function ShapeRenderPipeDef() {
                        _super.call(this);
                        this.addTapinBefore('doRender', 'calcShouldDraw', render.tapins.calcShouldDraw)
                            .addTapinBefore('doRender', 'prepareDraw', render.tapins.prepareDraw)
                            .replaceTapin('doRender', render.tapins.doRender)
                            .addTapinAfter('doRender', 'fill', render.tapins.fill)
                            .addTapinAfter('fill', 'finishDraw', render.tapins.finishDraw)
                            .addTapinAfter('finishDraw', 'stroke', render.tapins.stroke);
                    }
                    ShapeRenderPipeDef.prototype.createState = function () {
                        var state = _super.prototype.createState.call(this);
                        state.shouldDraw = false;
                        return state;
                    };
                    return ShapeRenderPipeDef;
                })(minerva.core.render.RenderPipeDef);
                render.ShapeRenderPipeDef = ShapeRenderPipeDef;
            })(render = shape.render || (shape.render = {}));
        })(shape = shapes.shape || (shapes.shape = {}));
    })(shapes = minerva.shapes || (minerva.shapes = {}));
})(minerva || (minerva = {}));
/// <reference path="../../shape/render/ShapeRenderPipeDef" />
var minerva;
(function (minerva) {
    var shapes;
    (function (shapes) {
        var ellipse;
        (function (ellipse) {
            var render;
            (function (render) {
                var EllipseRenderPipeDef = (function (_super) {
                    __extends(EllipseRenderPipeDef, _super);
                    function EllipseRenderPipeDef() {
                        _super.call(this);
                        this.replaceTapin('doRender', tapins.doRender);
                    }
                    return EllipseRenderPipeDef;
                })(shapes.shape.render.ShapeRenderPipeDef);
                render.EllipseRenderPipeDef = EllipseRenderPipeDef;
                var tapins;
                (function (tapins) {
                    function doRender(input, state, output, ctx, region) {
                        if (!state.shouldDraw)
                            return true;
                        var sr = input.shapeRect;
                        ellipse.helpers.draw(ctx.raw, sr.x, sr.y, sr.width, sr.height);
                        return true;
                    }
                    tapins.doRender = doRender;
                })(tapins = render.tapins || (render.tapins = {}));
            })(render = ellipse.render || (ellipse.render = {}));
        })(ellipse = shapes.ellipse || (shapes.ellipse = {}));
    })(shapes = minerva.shapes || (minerva.shapes = {}));
})(minerva || (minerva = {}));
/// <reference path="../../shape/measure/ShapeMeasurePipeDef" />
var minerva;
(function (minerva) {
    var shapes;
    (function (shapes) {
        var path;
        (function (path) {
            var measure;
            (function (measure) {
                var PathMeasurePipeDef = (function (_super) {
                    __extends(PathMeasurePipeDef, _super);
                    function PathMeasurePipeDef() {
                        _super.call(this);
                        this.addTapinBefore('calcNaturalBounds', 'buildPath', tapins.buildPath)
                            .replaceTapin('calcNaturalBounds', tapins.calcNaturalBounds);
                    }
                    return PathMeasurePipeDef;
                })(shapes.shape.measure.ShapeMeasurePipeDef);
                measure.PathMeasurePipeDef = PathMeasurePipeDef;
                var tapins;
                (function (tapins) {
                    function buildPath(input, state, output, tree) {
                        return true;
                    }
                    tapins.buildPath = buildPath;
                    function calcNaturalBounds(input, state, output, tree) {
                        var nb = output.naturalBounds;
                        nb.x = nb.y = nb.width = nb.height = 0;
                        if (input.data) {
                            var bounds = input.data.GetBounds(input);
                            minerva.Rect.copyTo(bounds, nb);
                        }
                        return true;
                    }
                    tapins.calcNaturalBounds = calcNaturalBounds;
                })(tapins = measure.tapins || (measure.tapins = {}));
            })(measure = path.measure || (path.measure = {}));
        })(path = shapes.path || (shapes.path = {}));
    })(shapes = minerva.shapes || (minerva.shapes = {}));
})(minerva || (minerva = {}));
/// <reference path="../../path/measure/PathMeasurePipeDef" />
var minerva;
(function (minerva) {
    var shapes;
    (function (shapes) {
        var line;
        (function (line) {
            var measure;
            (function (measure) {
                var LineMeasurePipeDef = (function (_super) {
                    __extends(LineMeasurePipeDef, _super);
                    function LineMeasurePipeDef() {
                        _super.call(this);
                        this.replaceTapin('buildPath', tapins.buildPath);
                    }
                    return LineMeasurePipeDef;
                })(shapes.path.measure.PathMeasurePipeDef);
                measure.LineMeasurePipeDef = LineMeasurePipeDef;
                var tapins;
                (function (tapins) {
                    function buildPath(input, state, output, tree) {
                        if (!input.data.old)
                            return true;
                        var path = input.data.path;
                        path.reset();
                        path.move(input.x1, input.y1);
                        path.line(input.x2, input.y2);
                        input.data.old = false;
                        return true;
                    }
                    tapins.buildPath = buildPath;
                })(tapins = measure.tapins || (measure.tapins = {}));
            })(measure = line.measure || (line.measure = {}));
        })(line = shapes.line || (shapes.line = {}));
    })(shapes = minerva.shapes || (minerva.shapes = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var shapes;
    (function (shapes) {
        var path;
        (function (path) {
            var hittest;
            (function (hittest) {
                var PathHitTestPipeDef = (function (_super) {
                    __extends(PathHitTestPipeDef, _super);
                    function PathHitTestPipeDef() {
                        _super.call(this);
                        this.replaceTapin('drawShape', tapins.drawShape);
                    }
                    return PathHitTestPipeDef;
                })(shapes.shape.hittest.ShapeHitTestPipeDef);
                hittest.PathHitTestPipeDef = PathHitTestPipeDef;
                var tapins;
                (function (tapins) {
                    function drawShape(data, pos, hitList, ctx) {
                        var assets = data.assets;
                        ctx.preapply(assets.stretchXform);
                        assets.data.Draw(ctx);
                        return true;
                    }
                    tapins.drawShape = drawShape;
                })(tapins = hittest.tapins || (hittest.tapins = {}));
            })(hittest = path.hittest || (path.hittest = {}));
        })(path = shapes.path || (shapes.path = {}));
    })(shapes = minerva.shapes || (minerva.shapes = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var shapes;
    (function (shapes) {
        var shape;
        (function (shape) {
            var processup;
            (function (processup) {
                var ShapeProcessUpPipeDef = (function (_super) {
                    __extends(ShapeProcessUpPipeDef, _super);
                    function ShapeProcessUpPipeDef() {
                        _super.call(this);
                        this.addTapinBefore('calcExtents', 'calcShapeRect', processup.tapins.calcShapeRect)
                            .replaceTapin('calcExtents', processup.tapins.calcExtents);
                    }
                    ShapeProcessUpPipeDef.prototype.createOutput = function () {
                        var output = _super.prototype.createOutput.call(this);
                        output.shapeFlags = minerva.ShapeFlags.None;
                        output.shapeRect = new minerva.Rect();
                        return output;
                    };
                    ShapeProcessUpPipeDef.prototype.prepare = function (input, state, output) {
                        output.shapeFlags = input.shapeFlags;
                        minerva.Rect.copyTo(input.shapeRect, output.shapeRect);
                        _super.prototype.prepare.call(this, input, state, output);
                    };
                    ShapeProcessUpPipeDef.prototype.flush = function (input, state, output) {
                        _super.prototype.flush.call(this, input, state, output);
                        minerva.Rect.copyTo(output.shapeRect, input.shapeRect);
                        input.shapeFlags = output.shapeFlags;
                    };
                    return ShapeProcessUpPipeDef;
                })(minerva.core.processup.ProcessUpPipeDef);
                processup.ShapeProcessUpPipeDef = ShapeProcessUpPipeDef;
            })(processup = shape.processup || (shape.processup = {}));
        })(shape = shapes.shape || (shapes.shape = {}));
    })(shapes = minerva.shapes || (minerva.shapes = {}));
})(minerva || (minerva = {}));
/// <reference path="../../shape/processup/ShapeProcessUpPipeDef" />
var minerva;
(function (minerva) {
    var shapes;
    (function (shapes) {
        var path;
        (function (path) {
            var processup;
            (function (processup) {
                var PathProcessUpPipeDef = (function (_super) {
                    __extends(PathProcessUpPipeDef, _super);
                    function PathProcessUpPipeDef() {
                        _super.call(this);
                        this.replaceTapin('calcActualSize', processup.tapins.calcActualSize)
                            .replaceTapin('calcShapeRect', processup.tapins.calcShapeRect)
                            .addTapinBefore('calcExtents', 'calcStretch', processup.tapins.calcStretch)
                            .replaceTapin('calcExtents', processup.tapins.calcExtents);
                    }
                    PathProcessUpPipeDef.prototype.createOutput = function () {
                        var output = _super.prototype.createOutput.call(this);
                        output.stretchXform = minerva.mat3.identity();
                        return output;
                    };
                    PathProcessUpPipeDef.prototype.prepare = function (input, state, output) {
                        minerva.mat3.copyTo(input.stretchXform, output.stretchXform);
                        _super.prototype.prepare.call(this, input, state, output);
                    };
                    PathProcessUpPipeDef.prototype.flush = function (input, state, output) {
                        _super.prototype.flush.call(this, input, state, output);
                        minerva.mat3.copyTo(output.stretchXform, input.stretchXform);
                    };
                    return PathProcessUpPipeDef;
                })(shapes.shape.processup.ShapeProcessUpPipeDef);
                processup.PathProcessUpPipeDef = PathProcessUpPipeDef;
            })(processup = path.processup || (path.processup = {}));
        })(path = shapes.path || (shapes.path = {}));
    })(shapes = minerva.shapes || (minerva.shapes = {}));
})(minerva || (minerva = {}));
/// <reference path="../../shape/render/ShapeRenderPipeDef" />
var minerva;
(function (minerva) {
    var shapes;
    (function (shapes) {
        var path;
        (function (path) {
            var render;
            (function (render) {
                var PathRenderPipeDef = (function (_super) {
                    __extends(PathRenderPipeDef, _super);
                    function PathRenderPipeDef() {
                        _super.call(this);
                        this.replaceTapin('doRender', render.tapins.doRender)
                            .replaceTapin('fill', render.tapins.fill);
                    }
                    return PathRenderPipeDef;
                })(shapes.shape.render.ShapeRenderPipeDef);
                render.PathRenderPipeDef = PathRenderPipeDef;
            })(render = path.render || (path.render = {}));
        })(path = shapes.path || (shapes.path = {}));
    })(shapes = minerva.shapes || (minerva.shapes = {}));
})(minerva || (minerva = {}));
/// <reference path="../../path/measure/PathMeasurePipeDef" />
var minerva;
(function (minerva) {
    var shapes;
    (function (shapes) {
        var polyline;
        (function (polyline) {
            var measure;
            (function (measure) {
                var PolylineMeasurePipeDef = (function (_super) {
                    __extends(PolylineMeasurePipeDef, _super);
                    function PolylineMeasurePipeDef() {
                        _super.call(this);
                        this.replaceTapin('buildPath', tapins.buildPath);
                    }
                    return PolylineMeasurePipeDef;
                })(shapes.path.measure.PathMeasurePipeDef);
                measure.PolylineMeasurePipeDef = PolylineMeasurePipeDef;
                var tapins;
                (function (tapins) {
                    function buildPath(input, state, output, tree) {
                        if (!input.data.old)
                            return true;
                        var path = input.data.path;
                        path.reset();
                        var points = input.points;
                        if (points.length < 2)
                            return true;
                        var p0 = points[0];
                        var p = points[1];
                        if (points.length === 2) {
                            extendLine(p0, p, input.strokeThickness);
                            path.move(p0.x, p0.y);
                            path.line(p.x, p.y);
                        }
                        else {
                            path.move(p0.x, p0.y);
                            for (var i = 1; i < points.length; i++) {
                                var p = points[i];
                                path.line(p.x, p.y);
                            }
                        }
                        if (input.isClosed)
                            path.close();
                        input.data.old = false;
                        return true;
                    }
                    tapins.buildPath = buildPath;
                    function extendLine(p1, p2, thickness) {
                        var t5 = thickness * 5.0;
                        var dx = p1.x - p2.x;
                        var dy = p1.y - p2.y;
                        if (dy === 0.0) {
                            t5 -= thickness / 2.0;
                            if (dx > 0.0) {
                                p1.x += t5;
                                p2.x -= t5;
                            }
                            else {
                                p1.x -= t5;
                                p2.x += t5;
                            }
                        }
                        else if (dx === 0.0) {
                            t5 -= thickness / 2.0;
                            if (dy > 0.0) {
                                p1.y += t5;
                                p2.y -= t5;
                            }
                            else {
                                p1.y -= t5;
                                p2.y += t5;
                            }
                        }
                        else {
                            var angle = Math.atan2(dy, dx);
                            var ax = Math.abs(Math.sin(angle) * t5);
                            if (dx > 0.0) {
                                p1.x += ax;
                                p2.x -= ax;
                            }
                            else {
                                p1.x -= ax;
                                p2.x += ax;
                            }
                            var ay = Math.abs(Math.sin(Math.PI / 2 - angle)) * t5;
                            if (dy > 0.0) {
                                p1.y += ay;
                                p2.y -= ay;
                            }
                            else {
                                p1.y -= ay;
                                p2.y += ay;
                            }
                        }
                    }
                })(tapins = measure.tapins || (measure.tapins = {}));
            })(measure = polyline.measure || (polyline.measure = {}));
        })(polyline = shapes.polyline || (shapes.polyline = {}));
    })(shapes = minerva.shapes || (minerva.shapes = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var shapes;
    (function (shapes) {
        var rectangle;
        (function (rectangle) {
            var helpers;
            (function (helpers) {
                function draw(ctx, left, top, width, height, radiusX, radiusY) {
                    var right = left + width;
                    var bottom = top + height;
                    if (!radiusX && !radiusY) {
                        ctx.beginPath();
                        ctx.rect(left, top, right - left, bottom - top);
                    }
                    ctx.beginPath();
                    ctx.moveTo(left + radiusX, top);
                    ctx.lineTo(right - radiusX, top);
                    ctx.ellipse(right - radiusX, top + radiusY, radiusX, radiusY, 0, 3 * Math.PI / 2, 2 * Math.PI);
                    ctx.lineTo(right, bottom - radiusY);
                    ctx.ellipse(right - radiusX, bottom - radiusY, radiusX, radiusY, 0, 0, Math.PI / 2);
                    ctx.lineTo(left + radiusX, bottom);
                    ctx.ellipse(left + radiusX, bottom - radiusY, radiusX, radiusY, 0, Math.PI / 2, Math.PI);
                    ctx.lineTo(left, top + radiusY);
                    ctx.ellipse(left + radiusX, top + radiusY, radiusX, radiusY, 0, Math.PI, 3 * Math.PI / 2);
                    ctx.closePath();
                }
                helpers.draw = draw;
            })(helpers = rectangle.helpers || (rectangle.helpers = {}));
        })(rectangle = shapes.rectangle || (shapes.rectangle = {}));
    })(shapes = minerva.shapes || (minerva.shapes = {}));
})(minerva || (minerva = {}));
/// <reference path="../../shape/hittest/ShapeHitTestPipeDef" />
var minerva;
(function (minerva) {
    var shapes;
    (function (shapes) {
        var rectangle;
        (function (rectangle) {
            var hittest;
            (function (hittest) {
                var RectangleHitTestPipeDef = (function (_super) {
                    __extends(RectangleHitTestPipeDef, _super);
                    function RectangleHitTestPipeDef() {
                        _super.call(this);
                        this.replaceTapin('drawShape', tapins.drawShape);
                    }
                    return RectangleHitTestPipeDef;
                })(shapes.shape.hittest.ShapeHitTestPipeDef);
                hittest.RectangleHitTestPipeDef = RectangleHitTestPipeDef;
                var tapins;
                (function (tapins) {
                    function drawShape(data, pos, hitList, ctx) {
                        var assets = data.assets;
                        var sr = assets.shapeRect;
                        var rx = Math.min(Math.abs(assets.radiusX), sr.width / 2.0);
                        if (isNaN(rx))
                            rx = 0;
                        var ry = Math.min(Math.abs(assets.radiusY), sr.height / 2.0);
                        if (isNaN(ry))
                            ry = 0;
                        rectangle.helpers.draw(ctx.raw, sr.x, sr.y, sr.width, sr.height, rx, ry);
                        return true;
                    }
                    tapins.drawShape = drawShape;
                })(tapins = hittest.tapins || (hittest.tapins = {}));
            })(hittest = rectangle.hittest || (rectangle.hittest = {}));
        })(rectangle = shapes.rectangle || (shapes.rectangle = {}));
    })(shapes = minerva.shapes || (minerva.shapes = {}));
})(minerva || (minerva = {}));
/// <reference path="../../shape/measure/ShapeMeasurePipeDef" />
var minerva;
(function (minerva) {
    var shapes;
    (function (shapes) {
        var rectangle;
        (function (rectangle) {
            var measure;
            (function (measure) {
                var RectangleMeasurePipeDef = (function (_super) {
                    __extends(RectangleMeasurePipeDef, _super);
                    function RectangleMeasurePipeDef() {
                        _super.call(this);
                        this.addTapinBefore('doOverride', 'shrinkAvailable', tapins.shrinkAvailable);
                    }
                    return RectangleMeasurePipeDef;
                })(shapes.shape.measure.ShapeMeasurePipeDef);
                measure.RectangleMeasurePipeDef = RectangleMeasurePipeDef;
                var tapins;
                (function (tapins) {
                    function shrinkAvailable(input, state, output, tree) {
                        var available = state.availableSize;
                        available.width = available.height = 0;
                        return true;
                    }
                    tapins.shrinkAvailable = shrinkAvailable;
                })(tapins = measure.tapins || (measure.tapins = {}));
            })(measure = rectangle.measure || (rectangle.measure = {}));
        })(rectangle = shapes.rectangle || (shapes.rectangle = {}));
    })(shapes = minerva.shapes || (minerva.shapes = {}));
})(minerva || (minerva = {}));
/// <reference path="../../shape/render/ShapeRenderPipeDef" />
var minerva;
(function (minerva) {
    var shapes;
    (function (shapes) {
        var rectangle;
        (function (rectangle) {
            var render;
            (function (render) {
                var RectangleRenderPipeDef = (function (_super) {
                    __extends(RectangleRenderPipeDef, _super);
                    function RectangleRenderPipeDef() {
                        _super.call(this);
                        this.replaceTapin('doRender', tapins.doRender);
                    }
                    return RectangleRenderPipeDef;
                })(shapes.shape.render.ShapeRenderPipeDef);
                render.RectangleRenderPipeDef = RectangleRenderPipeDef;
                var tapins;
                (function (tapins) {
                    function doRender(input, state, output, ctx, region) {
                        if (!state.shouldDraw)
                            return true;
                        var sr = input.shapeRect;
                        var rx = Math.min(Math.max(0, input.radiusX), sr.width / 2.0);
                        if (isNaN(rx))
                            rx = 0;
                        var ry = Math.min(Math.max(0, input.radiusY), sr.height / 2.0);
                        if (isNaN(ry))
                            ry = 0;
                        rectangle.helpers.draw(ctx.raw, sr.x, sr.y, sr.width, sr.height, rx, ry);
                        return true;
                    }
                    tapins.doRender = doRender;
                })(tapins = render.tapins || (render.tapins = {}));
            })(render = rectangle.render || (rectangle.render = {}));
        })(rectangle = shapes.rectangle || (shapes.rectangle = {}));
    })(shapes = minerva.shapes || (minerva.shapes = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var shapes;
    (function (shapes) {
        var shape;
        (function (shape) {
            var arrange;
            (function (arrange) {
                var ShapeArrangePipeDef = (function (_super) {
                    __extends(ShapeArrangePipeDef, _super);
                    function ShapeArrangePipeDef() {
                        _super.call(this);
                        this.replaceTapin('doOverride', arrange.tapins.doOverride);
                    }
                    return ShapeArrangePipeDef;
                })(minerva.core.arrange.ArrangePipeDef);
                arrange.ShapeArrangePipeDef = ShapeArrangePipeDef;
            })(arrange = shape.arrange || (shape.arrange = {}));
        })(shape = shapes.shape || (shapes.shape = {}));
    })(shapes = minerva.shapes || (minerva.shapes = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var controls;
    (function (controls) {
        var border;
        (function (border) {
            var render;
            (function (render) {
                var helpers;
                (function (helpers) {
                    var ARC_TO_BEZIER = 0.55228475;
                    function drawBorderRect(ctx, extents, cr) {
                        if (!cr || minerva.CornerRadius.isEmpty(cr)) {
                            ctx.rect(extents.x, extents.y, extents.width, extents.height);
                            return;
                        }
                        var top_adj = Math.max(cr.topLeft + cr.topRight - extents.width, 0) / 2;
                        var bottom_adj = Math.max(cr.bottomLeft + cr.bottomRight - extents.width, 0) / 2;
                        var left_adj = Math.max(cr.topLeft + cr.bottomLeft - extents.height, 0) / 2;
                        var right_adj = Math.max(cr.topRight + cr.bottomRight - extents.height, 0) / 2;
                        var tlt = cr.topLeft - top_adj;
                        ctx.moveTo(extents.x + tlt, extents.y);
                        var trt = cr.topRight - top_adj;
                        var trr = cr.topRight - right_adj;
                        ctx.lineTo(extents.x + extents.width - trt, extents.y);
                        ctx.bezierCurveTo(extents.x + extents.width - trt + trt * ARC_TO_BEZIER, extents.y, extents.x + extents.width, extents.y + trr - trr * ARC_TO_BEZIER, extents.x + extents.width, extents.y + trr);
                        var brr = cr.bottomRight - right_adj;
                        var brb = cr.bottomRight - bottom_adj;
                        ctx.lineTo(extents.x + extents.width, extents.y + extents.height - brr);
                        ctx.bezierCurveTo(extents.x + extents.width, extents.y + extents.height - brr + brr * ARC_TO_BEZIER, extents.x + extents.width + brb * ARC_TO_BEZIER - brb, extents.y + extents.height, extents.x + extents.width - brb, extents.y + extents.height);
                        var blb = cr.bottomLeft - bottom_adj;
                        var bll = cr.bottomLeft - left_adj;
                        ctx.lineTo(extents.x + blb, extents.y + extents.height);
                        ctx.bezierCurveTo(extents.x + blb - blb * ARC_TO_BEZIER, extents.y + extents.height, extents.x, extents.y + extents.height - bll + bll * ARC_TO_BEZIER, extents.x, extents.y + extents.height - bll);
                        var tll = cr.topLeft - left_adj;
                        ctx.lineTo(extents.x, extents.y + tll);
                        ctx.bezierCurveTo(extents.x, extents.y + tll - tll * ARC_TO_BEZIER, extents.x + tlt - tlt * ARC_TO_BEZIER, extents.y, extents.x + tlt, extents.y);
                    }
                    helpers.drawBorderRect = drawBorderRect;
                })(helpers = render.helpers || (render.helpers = {}));
            })(render = border.render || (border.render = {}));
        })(border = controls.border || (controls.border = {}));
    })(controls = minerva.controls || (minerva.controls = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var controls;
    (function (controls) {
        var border;
        (function (border) {
            var render;
            (function (render) {
                var tapins;
                (function (tapins) {
                    function calcInnerOuter(input, state, output, ctx, region, tree) {
                        if (!state.shouldRender)
                            return true;
                        minerva.Rect.copyTo(input.extents, state.fillExtents);
                        var bt = input.borderThickness;
                        minerva.Thickness.shrinkRect(bt, state.fillExtents);
                        var ia = state.innerCornerRadius;
                        minerva.CornerRadius.copyTo(input.cornerRadius, ia);
                        minerva.Thickness.shrinkCornerRadius(bt, ia);
                        var oa = state.outerCornerRadius;
                        minerva.CornerRadius.copyTo(input.cornerRadius, oa);
                        minerva.Thickness.growCornerRadius(bt, oa);
                        return true;
                    }
                    tapins.calcInnerOuter = calcInnerOuter;
                })(tapins = render.tapins || (render.tapins = {}));
            })(render = border.render || (border.render = {}));
        })(border = controls.border || (controls.border = {}));
    })(controls = minerva.controls || (minerva.controls = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var controls;
    (function (controls) {
        var border;
        (function (border) {
            var render;
            (function (render) {
                var tapins;
                (function (tapins) {
                    function calcShouldRender(input, state, output, ctx, region, tree) {
                        state.shouldRender = false;
                        if (!input.background && !input.borderBrush)
                            return true;
                        if (minerva.Rect.isEmpty(input.extents))
                            return true;
                        var fillOnly = !input.borderBrush || !input.borderThickness || minerva.Thickness.isEmpty(input.borderThickness);
                        if (fillOnly && !input.background)
                            return true;
                        state.shouldRender = true;
                        return true;
                    }
                    tapins.calcShouldRender = calcShouldRender;
                })(tapins = render.tapins || (render.tapins = {}));
            })(render = border.render || (border.render = {}));
        })(border = controls.border || (controls.border = {}));
    })(controls = minerva.controls || (minerva.controls = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var controls;
    (function (controls) {
        var border;
        (function (border) {
            var render;
            (function (render) {
                var tapins;
                (function (tapins) {
                    function doRender(input, state, output, ctx, region, tree) {
                        if (!state.shouldRender)
                            return true;
                        ctx.save();
                        minerva.core.helpers.renderLayoutClip(ctx, input, tree);
                        var borderBrush = input.borderBrush;
                        var extents = input.extents;
                        var fillExtents = state.fillExtents;
                        var raw = ctx.raw;
                        if (borderBrush && !minerva.Rect.isEmpty(extents)) {
                            raw.beginPath();
                            render.helpers.drawBorderRect(raw, extents, state.outerCornerRadius);
                            render.helpers.drawBorderRect(raw, fillExtents, state.innerCornerRadius);
                            ctx.fillEx(borderBrush, extents, minerva.FillRule.EvenOdd);
                        }
                        var background = input.background;
                        if (background && !minerva.Rect.isEmpty(fillExtents)) {
                            raw.beginPath();
                            render.helpers.drawBorderRect(raw, fillExtents, state.innerCornerRadius);
                            ctx.fillEx(background, fillExtents);
                        }
                        ctx.restore();
                        return true;
                    }
                    tapins.doRender = doRender;
                })(tapins = render.tapins || (render.tapins = {}));
            })(render = border.render || (border.render = {}));
        })(border = controls.border || (controls.border = {}));
    })(controls = minerva.controls || (minerva.controls = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var controls;
    (function (controls) {
        var canvas;
        (function (canvas) {
            var arrange;
            (function (arrange) {
                var tapins;
                (function (tapins) {
                    function buildLayoutClip(input, state, output, tree, finalRect) {
                        var lc = output.layoutClip;
                        lc.x = lc.y = lc.width = lc.height = 0;
                        return true;
                    }
                    tapins.buildLayoutClip = buildLayoutClip;
                })(tapins = arrange.tapins || (arrange.tapins = {}));
            })(arrange = canvas.arrange || (canvas.arrange = {}));
        })(canvas = controls.canvas || (controls.canvas = {}));
    })(controls = minerva.controls || (minerva.controls = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var controls;
    (function (controls) {
        var canvas;
        (function (canvas) {
            var arrange;
            (function (arrange) {
                var tapins;
                (function (tapins) {
                    function doOverride(input, state, output, tree, finalRect) {
                        var cr = state.childRect;
                        var child;
                        for (var walker = tree.walk(); walker.step();) {
                            child = walker.current;
                            minerva.Size.copyTo(child.assets.desiredSize, cr);
                            cr.x = child.getAttachedValue("Canvas.Left") || 0;
                            cr.y = child.getAttachedValue("Canvas.Top") || 0;
                            child.arrange(cr);
                        }
                        minerva.Size.copyTo(state.finalSize, state.arrangedSize);
                        return true;
                    }
                    tapins.doOverride = doOverride;
                })(tapins = arrange.tapins || (arrange.tapins = {}));
            })(arrange = canvas.arrange || (canvas.arrange = {}));
        })(canvas = controls.canvas || (controls.canvas = {}));
    })(controls = minerva.controls || (minerva.controls = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var controls;
    (function (controls) {
        var canvas;
        (function (canvas) {
            var measure;
            (function (measure) {
                var tapins;
                (function (tapins) {
                    function doOverride(input, state, output, tree, availableSize) {
                        var available = state.availableSize;
                        available.width = available.height = Number.POSITIVE_INFINITY;
                        for (var walker = tree.walk(); walker.step();) {
                            walker.current.measure(available);
                        }
                        var desired = output.desiredSize;
                        desired.width = desired.height = 0;
                        return true;
                    }
                    tapins.doOverride = doOverride;
                })(tapins = measure.tapins || (measure.tapins = {}));
            })(measure = canvas.measure || (canvas.measure = {}));
        })(canvas = controls.canvas || (controls.canvas = {}));
    })(controls = minerva.controls || (minerva.controls = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var controls;
    (function (controls) {
        var canvas;
        (function (canvas) {
            var processup;
            (function (processup) {
                var tapins;
                (function (tapins) {
                    tapins.calcPaintBounds = function (input, state, output, tree) {
                        if ((input.dirtyFlags & minerva.DirtyFlags.Bounds) === 0)
                            return true;
                        minerva.core.helpers.intersectBoundsWithClipPath(output.globalBoundsWithChildren, output.extentsWithChildren, input.effectPadding, input.renderXform, input.clip, input.layoutClip);
                        var sbwc = output.surfaceBoundsWithChildren;
                        var surface = tree.surface;
                        if (surface && tree.isTop) {
                            sbwc.x = sbwc.y = 0;
                            sbwc.width = surface.width;
                            sbwc.height = surface.height;
                        }
                        else {
                            minerva.core.helpers.intersectBoundsWithClipPath(sbwc, output.extentsWithChildren, input.effectPadding, input.absoluteXform, input.clip, input.layoutClip);
                        }
                        return true;
                    };
                })(tapins = processup.tapins || (processup.tapins = {}));
            })(processup = canvas.processup || (canvas.processup = {}));
        })(canvas = controls.canvas || (controls.canvas = {}));
    })(controls = minerva.controls || (minerva.controls = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var controls;
    (function (controls) {
        var grid;
        (function (grid) {
            var arrange;
            (function (arrange) {
                var tapins;
                (function (tapins) {
                    function calcConsumed(input, state, output, tree, finalRect) {
                        var con = state.consumed;
                        con.width = con.height = 0;
                        var fs = state.finalSize;
                        var cm = input.gridState.colMatrix;
                        for (var i = 0; i < cm.length; i++) {
                            con.width += (cm[i][i].offered = cm[i][i].desired);
                        }
                        var rm = input.gridState.rowMatrix;
                        for (var i = 0; i < rm.length; i++) {
                            con.height += (rm[i][i].offered = rm[i][i].desired);
                        }
                        if (con.width !== fs.width)
                            grid.helpers.expandStarCols(cm, input.columnDefinitions, fs);
                        if (con.height !== fs.height)
                            grid.helpers.expandStarRows(rm, input.rowDefinitions, fs);
                        return true;
                    }
                    tapins.calcConsumed = calcConsumed;
                })(tapins = arrange.tapins || (arrange.tapins = {}));
            })(arrange = grid.arrange || (grid.arrange = {}));
        })(grid = controls.grid || (controls.grid = {}));
    })(controls = minerva.controls || (minerva.controls = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var controls;
    (function (controls) {
        var grid;
        (function (grid) {
            var arrange;
            (function (arrange) {
                var tapins;
                (function (tapins) {
                    function doOverride(input, state, output, tree, finalRect) {
                        var cr = state.childRect;
                        var rm = input.gridState.rowMatrix;
                        var cm = input.gridState.colMatrix;
                        for (var walker = tree.walk(); walker.step();) {
                            var child = walker.current;
                            var col = Math.min(child.getAttachedValue("Grid.Column"), cm.length - 1);
                            if (isNaN(col))
                                col = 0;
                            var row = Math.min(child.getAttachedValue("Grid.Row"), rm.length - 1);
                            if (isNaN(row))
                                row = 0;
                            var colspan = Math.min(child.getAttachedValue("Grid.ColumnSpan"), cm.length - col);
                            if (isNaN(colspan))
                                colspan = 1;
                            var rowspan = Math.min(child.getAttachedValue("Grid.RowSpan"), rm.length - row);
                            if (isNaN(rowspan))
                                rowspan = 1;
                            cr.x = cr.y = cr.width = cr.height = 0;
                            for (var i = 0; i < col; i++) {
                                cr.x += cm[i][i].offered;
                            }
                            for (var i = col; i < col + colspan; i++) {
                                cr.width += cm[i][i].offered;
                            }
                            for (var i = 0; i < row; i++) {
                                cr.y += rm[i][i].offered;
                            }
                            for (var i = row; i < row + rowspan; i++) {
                                cr.height += rm[i][i].offered;
                            }
                            child.arrange(cr);
                        }
                        minerva.Size.copyTo(state.finalSize, state.arrangedSize);
                        return true;
                    }
                    tapins.doOverride = doOverride;
                })(tapins = arrange.tapins || (arrange.tapins = {}));
            })(arrange = grid.arrange || (grid.arrange = {}));
        })(grid = controls.grid || (controls.grid = {}));
    })(controls = minerva.controls || (minerva.controls = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var controls;
    (function (controls) {
        var grid;
        (function (grid) {
            var arrange;
            (function (arrange) {
                var tapins;
                (function (tapins) {
                    function restoreMeasureResults(input, state, output, tree, finalRect) {
                        for (var rm = input.gridState.rowMatrix, i = 0; i < rm.length; i++) {
                            for (var j = 0; j <= i; j++) {
                                rm[i][j].offered = rm[i][j].original;
                            }
                        }
                        for (var cm = input.gridState.colMatrix, i = 0; i < cm.length; i++) {
                            for (var j = 0; j <= i; j++) {
                                cm[i][j].offered = cm[i][j].original;
                            }
                        }
                        return true;
                    }
                    tapins.restoreMeasureResults = restoreMeasureResults;
                })(tapins = arrange.tapins || (arrange.tapins = {}));
            })(arrange = grid.arrange || (grid.arrange = {}));
        })(grid = controls.grid || (controls.grid = {}));
    })(controls = minerva.controls || (minerva.controls = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var controls;
    (function (controls) {
        var grid;
        (function (grid) {
            var arrange;
            (function (arrange) {
                var tapins;
                (function (tapins) {
                    function setActuals(input, state, output, tree, finalRect) {
                        for (var coldefs = input.columnDefinitions, cm = input.gridState.colMatrix, i = 0; i < coldefs.length; i++) {
                            coldefs[i].setActualWidth(cm[i][i].offered);
                        }
                        for (var rowdefs = input.rowDefinitions, rm = input.gridState.rowMatrix, i = 0; i < rowdefs.length; i++) {
                            rowdefs[i].setActualHeight(rm[i][i].offered);
                        }
                        return true;
                    }
                    tapins.setActuals = setActuals;
                })(tapins = arrange.tapins || (arrange.tapins = {}));
            })(arrange = grid.arrange || (grid.arrange = {}));
        })(grid = controls.grid || (controls.grid = {}));
    })(controls = minerva.controls || (minerva.controls = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var controls;
    (function (controls) {
        var grid;
        (function (grid) {
            var measure;
            (function (measure) {
                var tapins;
                (function (tapins) {
                    function buildShape(input, state, output, tree, finalRect) {
                        var shapes = state.childShapes;
                        var cm = input.gridState.colMatrix;
                        var rm = input.gridState.rowMatrix;
                        for (var walker = tree.walk(), i = 0; walker.step(); i++) {
                            if (i > shapes.length)
                                shapes.push(new measure.GridChildShape().init(walker.current, rm, cm));
                            else
                                (shapes[i] = shapes[i] || new measure.GridChildShape()).init(walker.current, rm, cm);
                        }
                        if (i < shapes.length)
                            shapes.slice(i, shapes.length - i);
                        state.gridShape.init(state.childShapes);
                        state.placements.length = 0;
                        state.placements.push(new measure.GridChildPlacement(null, 0, 0, 0));
                        state.placementIndex = 0;
                        return true;
                    }
                    tapins.buildShape = buildShape;
                })(tapins = measure.tapins || (measure.tapins = {}));
            })(measure = grid.measure || (grid.measure = {}));
        })(grid = controls.grid || (controls.grid = {}));
    })(controls = minerva.controls || (minerva.controls = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var controls;
    (function (controls) {
        var grid;
        (function (grid) {
            var measure;
            (function (measure) {
                var tapins;
                (function (tapins) {
                    function createDoOverridePass(pass) {
                        return function doOverridePass(input, state, output, tree, finalRect) {
                            var rm = input.gridState.rowMatrix;
                            var cm = input.gridState.colMatrix;
                            if (tree.children.length > 0) {
                                grid.helpers.expandStarCols(cm, input.columnDefinitions, state.availableSize);
                                grid.helpers.expandStarRows(rm, input.rowDefinitions, state.availableSize);
                            }
                            var placements = state.placements;
                            var placement;
                            var separator = placements[0];
                            var shapes = state.childShapes;
                            var childSize = state.childSize;
                            for (var walker = tree.walk(), i = 0; walker.step(); i++) {
                                var child = walker.current;
                                var childShape = shapes[i];
                                if (!childShape.shouldMeasurePass(state.gridShape, childSize, pass))
                                    continue;
                                childShape.size(childSize, rm, cm);
                                child.measure(childSize);
                                if (pass !== measure.OverridePass.StarAuto) {
                                    placement = measure.GridChildPlacement.row(rm, childShape, child);
                                    if (placement.row === placement.col) {
                                        placements.splice(state.placementIndex + 1, 0, placement);
                                    }
                                    else {
                                        placements.splice(state.placementIndex, 0, placement);
                                        state.placementIndex++;
                                    }
                                }
                                placement = measure.GridChildPlacement.col(cm, childShape, child);
                                if (placement.row === placement.col) {
                                    placements.splice(state.placementIndex + 1, 0, placement);
                                }
                                else {
                                    placements.splice(state.placementIndex, 0, placement);
                                    state.placementIndex++;
                                }
                            }
                            placements.splice(state.placementIndex, 1);
                            state.placementIndex = -1;
                            while (placement = placements.pop()) {
                                var cell = placement.matrix[placement.row][placement.col];
                                cell.desired = Math.max(cell.desired, placement.size);
                                grid.helpers.allocateDesiredSize(rm, cm);
                            }
                            state.placementIndex = placements.push(separator) - 1;
                            return true;
                        };
                    }
                    tapins.createDoOverridePass = createDoOverridePass;
                })(tapins = measure.tapins || (measure.tapins = {}));
            })(measure = grid.measure || (grid.measure = {}));
        })(grid = controls.grid || (controls.grid = {}));
    })(controls = minerva.controls || (minerva.controls = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var controls;
    (function (controls) {
        var grid;
        (function (grid) {
            var measure;
            (function (measure) {
                var tapins;
                (function (tapins) {
                    function doOverride(input, state, output, tree, finalRect) {
                        var desired = output.desiredSize;
                        desired.width = desired.height = 0;
                        for (var cm = input.gridState.colMatrix, i = 0; i < cm.length; i++) {
                            desired.width += cm[i][i].desired;
                        }
                        for (var rm = input.gridState.rowMatrix, i = 0; i < rm.length; i++) {
                            desired.height += rm[i][i].desired;
                        }
                        return true;
                    }
                    tapins.doOverride = doOverride;
                })(tapins = measure.tapins || (measure.tapins = {}));
            })(measure = grid.measure || (grid.measure = {}));
        })(grid = controls.grid || (controls.grid = {}));
    })(controls = minerva.controls || (minerva.controls = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var controls;
    (function (controls) {
        var grid;
        (function (grid) {
            var measure;
            (function (measure) {
                var tapins;
                (function (tapins) {
                    function ensureColMatrix(input, state, output, tree, finalRect) {
                        var colCount = input.columnDefinitions.length || 1;
                        var cm = input.gridState.colMatrix;
                        if (cm.length > colCount)
                            cm.splice(colCount, cm.length - colCount);
                        for (var c = 0; c < colCount; c++) {
                            if (cm.length <= c)
                                cm.push([]);
                            var mrow = cm[c];
                            if (mrow.length > c)
                                mrow.splice(c, mrow.length - c);
                            for (var cc = 0; cc <= c; cc++) {
                                if (mrow.length <= cc)
                                    mrow.push(new grid.Segment());
                                else
                                    grid.Segment.init(mrow[cc]);
                            }
                        }
                        return true;
                    }
                    tapins.ensureColMatrix = ensureColMatrix;
                })(tapins = measure.tapins || (measure.tapins = {}));
            })(measure = grid.measure || (grid.measure = {}));
        })(grid = controls.grid || (controls.grid = {}));
    })(controls = minerva.controls || (minerva.controls = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var controls;
    (function (controls) {
        var grid;
        (function (grid) {
            var measure;
            (function (measure) {
                var tapins;
                (function (tapins) {
                    function ensureRowMatrix(input, state, output, tree, finalRect) {
                        var rowCount = input.rowDefinitions.length || 1;
                        var rm = input.gridState.rowMatrix;
                        if (rm.length > rowCount)
                            rm.splice(rowCount, rm.length - rowCount);
                        for (var r = 0; r < rowCount; r++) {
                            if (rm.length <= r)
                                rm.push([]);
                            var mrow = rm[r];
                            if (mrow.length > (r + 1))
                                mrow.splice(r, mrow.length - r - 1);
                            for (var rr = 0; rr <= r; rr++) {
                                if (mrow.length <= rr)
                                    mrow.push(new grid.Segment());
                                else
                                    grid.Segment.init(mrow[rr]);
                            }
                        }
                        return true;
                    }
                    tapins.ensureRowMatrix = ensureRowMatrix;
                })(tapins = measure.tapins || (measure.tapins = {}));
            })(measure = grid.measure || (grid.measure = {}));
        })(grid = controls.grid || (controls.grid = {}));
    })(controls = minerva.controls || (minerva.controls = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var controls;
    (function (controls) {
        var grid;
        (function (grid) {
            (function (GridUnitType) {
                GridUnitType[GridUnitType["Auto"] = 0] = "Auto";
                GridUnitType[GridUnitType["Pixel"] = 1] = "Pixel";
                GridUnitType[GridUnitType["Star"] = 2] = "Star";
            })(grid.GridUnitType || (grid.GridUnitType = {}));
            var GridUnitType = grid.GridUnitType;
        })(grid = controls.grid || (controls.grid = {}));
    })(controls = minerva.controls || (minerva.controls = {}));
})(minerva || (minerva = {}));
/// <reference path="../../GridUnitType.ts" />
var minerva;
(function (minerva) {
    var controls;
    (function (controls) {
        var grid;
        (function (grid) {
            var measure;
            (function (measure) {
                var tapins;
                (function (tapins) {
                    var DEFAULT_GRID_LEN = {
                        Value: 1.0,
                        Type: grid.GridUnitType.Star
                    };
                    function prepareColMatrix(input, state, output, tree, finalRect) {
                        var coldefs = input.columnDefinitions;
                        var cm = input.gridState.colMatrix;
                        var ts = state.totalStars;
                        ts.width = 0.0;
                        if (coldefs.length === 0) {
                            var mcell = cm[0][0];
                            mcell.type = grid.GridUnitType.Star;
                            mcell.stars = 1.0;
                            ts.width += 1.0;
                            return true;
                        }
                        for (var i = 0; i < coldefs.length; i++) {
                            var coldef = coldefs[i];
                            var width = coldef.Width || DEFAULT_GRID_LEN;
                            coldef.setActualWidth(Number.POSITIVE_INFINITY);
                            var cell = grid.Segment.init(cm[i][i], 0.0, coldef.MinWidth, coldef.MaxWidth, width.Type);
                            if (width.Type === grid.GridUnitType.Pixel) {
                                cell.desired = cell.offered = cell.clamp(width.Value);
                                coldef.setActualWidth(cell.desired);
                            }
                            else if (width.Type === grid.GridUnitType.Star) {
                                cell.stars = width.Value;
                                ts.width += width.Value;
                            }
                            else if (width.Type === grid.GridUnitType.Auto) {
                                cell.desired = cell.offered = cell.clamp(0);
                            }
                        }
                        return true;
                    }
                    tapins.prepareColMatrix = prepareColMatrix;
                })(tapins = measure.tapins || (measure.tapins = {}));
            })(measure = grid.measure || (grid.measure = {}));
        })(grid = controls.grid || (controls.grid = {}));
    })(controls = minerva.controls || (minerva.controls = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var controls;
    (function (controls) {
        var grid;
        (function (grid) {
            var measure;
            (function (measure) {
                var tapins;
                (function (tapins) {
                    var DEFAULT_GRID_LEN = {
                        Value: 1.0,
                        Type: grid.GridUnitType.Star
                    };
                    function prepareRowMatrix(input, state, output, tree, finalRect) {
                        var rowdefs = input.rowDefinitions;
                        var rm = input.gridState.rowMatrix;
                        var ts = state.totalStars;
                        ts.height = 0.0;
                        if (rowdefs.length === 0) {
                            var mcell = rm[0][0];
                            mcell.type = grid.GridUnitType.Star;
                            mcell.stars = 1.0;
                            ts.height += 1.0;
                            return true;
                        }
                        for (var i = 0; i < rowdefs.length; i++) {
                            var rowdef = rowdefs[i];
                            var height = rowdef.Height || DEFAULT_GRID_LEN;
                            rowdef.setActualHeight(Number.POSITIVE_INFINITY);
                            var cell = grid.Segment.init(rm[i][i], 0.0, rowdef.MinHeight, rowdef.MaxHeight, height.Type);
                            if (height.Type === grid.GridUnitType.Pixel) {
                                cell.desired = cell.offered = cell.clamp(height.Value);
                                rowdef.setActualHeight(cell.desired);
                            }
                            else if (height.Type === grid.GridUnitType.Star) {
                                cell.stars = height.Value;
                                ts.height += height.Value;
                            }
                            else if (height.Type === grid.GridUnitType.Auto) {
                                cell.desired = cell.offered = cell.clamp(0);
                            }
                        }
                        return true;
                    }
                    tapins.prepareRowMatrix = prepareRowMatrix;
                })(tapins = measure.tapins || (measure.tapins = {}));
            })(measure = grid.measure || (grid.measure = {}));
        })(grid = controls.grid || (controls.grid = {}));
    })(controls = minerva.controls || (minerva.controls = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var controls;
    (function (controls) {
        var grid;
        (function (grid) {
            var measure;
            (function (measure) {
                var tapins;
                (function (tapins) {
                    function saveMeasureResults(input, state, output, tree, finalRect) {
                        for (var rm = input.gridState.rowMatrix, i = 0; i < rm.length; i++) {
                            for (var j = 0; j <= i; j++) {
                                rm[i][j].original = rm[i][j].offered;
                            }
                        }
                        for (var cm = input.gridState.colMatrix, i = 0; i < cm.length; i++) {
                            for (j = 0; j <= i; j++) {
                                cm[i][j].original = cm[i][j].offered;
                            }
                        }
                        return true;
                    }
                    tapins.saveMeasureResults = saveMeasureResults;
                })(tapins = measure.tapins || (measure.tapins = {}));
            })(measure = grid.measure || (grid.measure = {}));
        })(grid = controls.grid || (controls.grid = {}));
    })(controls = minerva.controls || (minerva.controls = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var controls;
    (function (controls) {
        var grid;
        (function (grid) {
            var processup;
            (function (processup) {
                var tapins;
                (function (tapins) {
                    function calcExtents(input, state, output, tree) {
                        if ((input.dirtyFlags & minerva.DirtyFlags.Bounds) === 0)
                            return true;
                        var e = output.extents;
                        var ewc = output.extentsWithChildren;
                        e.x = ewc.x = 0;
                        e.y = ewc.y = 0;
                        var as = state.actualSize;
                        e.width = ewc.width = as.width;
                        e.height = ewc.height = as.height;
                        if (input.showGridLines)
                            return true;
                        var assets;
                        for (var walker = tree.walk(); walker.step();) {
                            assets = walker.current.assets;
                            if (assets.totalIsRenderVisible)
                                minerva.Rect.union(ewc, assets.globalBoundsWithChildren);
                        }
                        return true;
                    }
                    tapins.calcExtents = calcExtents;
                })(tapins = processup.tapins || (processup.tapins = {}));
            })(processup = grid.processup || (grid.processup = {}));
        })(grid = controls.grid || (controls.grid = {}));
    })(controls = minerva.controls || (minerva.controls = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var controls;
    (function (controls) {
        var grid;
        (function (grid) {
            var processup;
            (function (processup) {
                var tapins;
                (function (tapins) {
                    function preCalcExtents(input, state, output, tree) {
                        if ((input.dirtyFlags & minerva.DirtyFlags.Bounds) === 0)
                            return true;
                        if (!input.background && !input.showGridLines) {
                            var as = state.actualSize;
                            as.width = as.height = 0;
                        }
                        return true;
                    }
                    tapins.preCalcExtents = preCalcExtents;
                })(tapins = processup.tapins || (processup.tapins = {}));
            })(processup = grid.processup || (grid.processup = {}));
        })(grid = controls.grid || (controls.grid = {}));
    })(controls = minerva.controls || (minerva.controls = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var controls;
    (function (controls) {
        var image;
        (function (image) {
            var arrange;
            (function (arrange) {
                var tapins;
                (function (tapins) {
                    function calcImageBounds(input, state, output, tree, finalRect) {
                        var ib = state.imageBounds;
                        ib.x = ib.y = ib.width = ib.height = 0;
                        if (input.source) {
                            ib.width = input.source.pixelWidth;
                            ib.height = input.source.pixelHeight;
                        }
                        var fs = state.finalSize;
                        if (ib.width === 0)
                            ib.width = fs.width;
                        if (ib.height === 0)
                            ib.height = fs.height;
                        return true;
                    }
                    tapins.calcImageBounds = calcImageBounds;
                })(tapins = arrange.tapins || (arrange.tapins = {}));
            })(arrange = image.arrange || (image.arrange = {}));
        })(image = controls.image || (controls.image = {}));
    })(controls = minerva.controls || (minerva.controls = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var controls;
    (function (controls) {
        var image;
        (function (image) {
            var arrange;
            (function (arrange) {
                var tapins;
                (function (tapins) {
                    function calcStretch(input, state, output, tree, finalRect) {
                        var ib = state.imageBounds;
                        var sx = 1.0;
                        var sy = 1.0;
                        var fs = state.finalSize;
                        if (ib.width !== fs.width)
                            sx = fs.width / ib.width;
                        if (ib.height !== fs.height)
                            sy = fs.height / ib.height;
                        switch (input.stretch) {
                            case minerva.Stretch.Uniform:
                                sx = sy = Math.min(sx, sy);
                                break;
                            case minerva.Stretch.UniformToFill:
                                sx = sy = Math.max(sx, sy);
                                break;
                            case minerva.Stretch.None:
                                sx = sy = 1.0;
                                break;
                            case minerva.Stretch.Fill:
                            default:
                                break;
                        }
                        state.stretchX = sx;
                        state.stretchY = sy;
                        return true;
                    }
                    tapins.calcStretch = calcStretch;
                })(tapins = arrange.tapins || (arrange.tapins = {}));
            })(arrange = image.arrange || (image.arrange = {}));
        })(image = controls.image || (controls.image = {}));
    })(controls = minerva.controls || (minerva.controls = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var controls;
    (function (controls) {
        var image;
        (function (image) {
            var arrange;
            (function (arrange) {
                var tapins;
                (function (tapins) {
                    function doOverride(input, state, output, tree, finalRect) {
                        var as = state.arrangedSize;
                        as.width = state.imageBounds.width * state.stretchX;
                        as.height = state.imageBounds.height * state.stretchY;
                        return true;
                    }
                    tapins.doOverride = doOverride;
                })(tapins = arrange.tapins || (arrange.tapins = {}));
            })(arrange = image.arrange || (image.arrange = {}));
        })(image = controls.image || (controls.image = {}));
    })(controls = minerva.controls || (minerva.controls = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var controls;
    (function (controls) {
        var image;
        (function (image) {
            var arrange;
            (function (arrange) {
                var tapins;
                (function (tapins) {
                    function invalidateMetrics(input, state, output, tree, finalRect) {
                        output.dirtyFlags |= minerva.DirtyFlags.ImageMetrics;
                        return true;
                    }
                    tapins.invalidateMetrics = invalidateMetrics;
                })(tapins = arrange.tapins || (arrange.tapins = {}));
            })(arrange = image.arrange || (image.arrange = {}));
        })(image = controls.image || (controls.image = {}));
    })(controls = minerva.controls || (minerva.controls = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var controls;
    (function (controls) {
        var image;
        (function (image) {
            var hittest;
            (function (hittest) {
                var tapins;
                (function (tapins) {
                    function canHitInside(data, pos, hitList, ctx) {
                        return true;
                    }
                    tapins.canHitInside = canHitInside;
                })(tapins = hittest.tapins || (hittest.tapins = {}));
            })(hittest = image.hittest || (image.hittest = {}));
        })(image = controls.image || (controls.image = {}));
    })(controls = minerva.controls || (minerva.controls = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var controls;
    (function (controls) {
        var image;
        (function (image) {
            var hittest;
            (function (hittest) {
                var tapins;
                (function (tapins) {
                    function insideChildren(data, pos, hitList, ctx) {
                        hitList.unshift(data.updater);
                        data.hitChildren = false;
                        return true;
                    }
                    tapins.insideChildren = insideChildren;
                })(tapins = hittest.tapins || (hittest.tapins = {}));
            })(hittest = image.hittest || (image.hittest = {}));
        })(image = controls.image || (controls.image = {}));
    })(controls = minerva.controls || (minerva.controls = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var controls;
    (function (controls) {
        var image;
        (function (image) {
            var hittest;
            (function (hittest) {
                var tapins;
                (function (tapins) {
                    function insideStretch(data, pos, hitList, ctx) {
                        var source = data.assets.source;
                        if (!source || source.pixelWidth === 0 || source.pixelHeight === 0) {
                            hitList.shift();
                            ctx.restore();
                            return false;
                        }
                        var stretch = data.assets.stretch;
                        if (stretch === minerva.Stretch.Fill || stretch === minerva.Stretch.UniformToFill)
                            return true;
                        var ir = data.imgRect;
                        ir.x = ir.y = 0;
                        ir.width = source.pixelWidth;
                        ir.height = source.pixelHeight;
                        minerva.Rect.transform(ir, data.assets.imgXform);
                        minerva.Rect.transform(ir, ctx.currentTransform);
                        if (!minerva.Rect.containsPoint(ir, pos)) {
                            hitList.shift();
                            ctx.restore();
                            return false;
                        }
                        return true;
                    }
                    tapins.insideStretch = insideStretch;
                })(tapins = hittest.tapins || (hittest.tapins = {}));
            })(hittest = image.hittest || (image.hittest = {}));
        })(image = controls.image || (controls.image = {}));
    })(controls = minerva.controls || (minerva.controls = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var controls;
    (function (controls) {
        var image;
        (function (image) {
            var measure;
            (function (measure) {
                var tapins;
                (function (tapins) {
                    function calcImageBounds(input, state, output, tree, availableSize) {
                        var ib = state.imageBounds;
                        ib.x = ib.y = ib.width = ib.height = 0;
                        if (!input.source)
                            return true;
                        ib.width = input.source.pixelWidth;
                        ib.height = input.source.pixelHeight;
                        return true;
                    }
                    tapins.calcImageBounds = calcImageBounds;
                })(tapins = measure.tapins || (measure.tapins = {}));
            })(measure = image.measure || (image.measure = {}));
        })(image = controls.image || (controls.image = {}));
    })(controls = minerva.controls || (minerva.controls = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var controls;
    (function (controls) {
        var image;
        (function (image) {
            var measure;
            (function (measure) {
                var tapins;
                (function (tapins) {
                    function calcStretch(input, state, output, tree, availableSize) {
                        var as = state.availableSize;
                        var dw = as.width;
                        var dh = as.height;
                        var ib = state.imageBounds;
                        if (!isFinite(dw))
                            dw = ib.width;
                        if (!isFinite(dh))
                            dh = ib.height;
                        var sx = 0.0;
                        var sy = 0.0;
                        if (ib.width > 0)
                            sx = dw / ib.width;
                        if (ib.height > 0)
                            sy = dh / ib.height;
                        if (!isFinite(as.width))
                            sx = sy;
                        if (!isFinite(as.height))
                            sy = sx;
                        switch (input.stretch) {
                            default:
                            case minerva.Stretch.Uniform:
                                sx = sy = Math.min(sx, sy);
                                break;
                            case minerva.Stretch.UniformToFill:
                                sx = sy = Math.max(sx, sy);
                                break;
                            case minerva.Stretch.Fill:
                                if (!isFinite(as.width))
                                    sx = sy;
                                if (!isFinite(as.height))
                                    sy = sx;
                                break;
                            case minerva.Stretch.None:
                                sx = sy = 1.0;
                                break;
                        }
                        state.stretchX = sx;
                        state.stretchY = sy;
                        return true;
                    }
                    tapins.calcStretch = calcStretch;
                })(tapins = measure.tapins || (measure.tapins = {}));
            })(measure = image.measure || (image.measure = {}));
        })(image = controls.image || (controls.image = {}));
    })(controls = minerva.controls || (minerva.controls = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var controls;
    (function (controls) {
        var image;
        (function (image) {
            var measure;
            (function (measure) {
                var tapins;
                (function (tapins) {
                    function doOverride(input, state, output, tree, availableSize) {
                        var ds = output.desiredSize;
                        ds.width = state.imageBounds.width * state.stretchX;
                        ds.height = state.imageBounds.height * state.stretchY;
                        return true;
                    }
                    tapins.doOverride = doOverride;
                })(tapins = measure.tapins || (measure.tapins = {}));
            })(measure = image.measure || (image.measure = {}));
        })(image = controls.image || (controls.image = {}));
    })(controls = minerva.controls || (minerva.controls = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var controls;
    (function (controls) {
        var image;
        (function (image) {
            var processdown;
            (function (processdown) {
                var tapins;
                (function (tapins) {
                    function calcImageTransform(input, state, output, vpinput, tree) {
                        if (!state.calcImageMetrics)
                            return true;
                        var w = state.paintRect.width;
                        var h = state.paintRect.height;
                        var sw = state.imgRect.width;
                        var sh = state.imgRect.height;
                        var sx = w / sw;
                        var sy = h / sh;
                        if (w === 0)
                            sx = 1.0;
                        if (h === 0)
                            sy = 1.0;
                        var xform = output.imgXform;
                        if (input.stretch === minerva.Stretch.Fill) {
                            minerva.mat3.createScale(sx, sy, xform);
                            return true;
                        }
                        var scale = 1.0;
                        switch (input.stretch) {
                            case minerva.Stretch.Uniform:
                                scale = sx < sy ? sx : sy;
                                break;
                            case minerva.Stretch.UniformToFill:
                                scale = sx < sy ? sy : sx;
                                break;
                            case minerva.Stretch.None:
                                break;
                        }
                        var dx = (w - (scale * sw)) / 2;
                        var dy = (h - (scale * sh)) / 2;
                        minerva.mat3.createScale(scale, scale, xform);
                        minerva.mat3.translate(xform, dx, dy);
                        return true;
                    }
                    tapins.calcImageTransform = calcImageTransform;
                })(tapins = processdown.tapins || (processdown.tapins = {}));
            })(processdown = image.processdown || (image.processdown = {}));
        })(image = controls.image || (controls.image = {}));
    })(controls = minerva.controls || (minerva.controls = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var controls;
    (function (controls) {
        var image;
        (function (image) {
            var processdown;
            (function (processdown) {
                var tapins;
                (function (tapins) {
                    function calcOverlap(input, state, output, vpinput, tree) {
                        if (!state.calcImageMetrics)
                            return true;
                        if (input.stretch === minerva.Stretch.UniformToFill || state.imgAdjust) {
                            var paint = state.paintRect;
                            minerva.Rect.roundOut(paint);
                            var imgRect = state.imgRect;
                            minerva.Rect.transform(imgRect, output.imgXform);
                            minerva.Rect.roundIn(imgRect);
                            output.overlap = minerva.Rect.rectIn(paint, imgRect);
                        }
                        return true;
                    }
                    tapins.calcOverlap = calcOverlap;
                })(tapins = processdown.tapins || (processdown.tapins = {}));
            })(processdown = image.processdown || (image.processdown = {}));
        })(image = controls.image || (controls.image = {}));
    })(controls = minerva.controls || (minerva.controls = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var controls;
    (function (controls) {
        var image;
        (function (image) {
            var processdown;
            (function (processdown) {
                var tapins;
                (function (tapins) {
                    function checkNeedImageMetrics(input, state, output, vpinput, tree) {
                        state.calcImageMetrics = false;
                        if ((input.dirtyFlags & minerva.DirtyFlags.ImageMetrics) === 0)
                            return true;
                        minerva.mat3.identity(output.imgXform);
                        output.overlap = minerva.RectOverlap.In;
                        var imgRect = state.imgRect;
                        imgRect.x = imgRect.y = imgRect.width = imgRect.height = 0;
                        state.calcImageMetrics = !!input.source;
                        return true;
                    }
                    tapins.checkNeedImageMetrics = checkNeedImageMetrics;
                })(tapins = processdown.tapins || (processdown.tapins = {}));
            })(processdown = image.processdown || (image.processdown = {}));
        })(image = controls.image || (controls.image = {}));
    })(controls = minerva.controls || (minerva.controls = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var controls;
    (function (controls) {
        var image;
        (function (image) {
            var processdown;
            (function (processdown) {
                var tapins;
                (function (tapins) {
                    function prepareImageMetrics(input, state, output, vpinput, tree) {
                        if (!state.calcImageMetrics)
                            return true;
                        var imgRect = state.imgRect;
                        imgRect.x = imgRect.y = 0;
                        var source = input.source;
                        imgRect.width = source.pixelWidth;
                        imgRect.height = source.pixelHeight;
                        var paintRect = state.paintRect;
                        paintRect.x = paintRect.y = 0;
                        paintRect.width = input.actualWidth;
                        paintRect.height = input.actualHeight;
                        state.imgAdjust = !minerva.Size.isEqual(paintRect, input.renderSize);
                        if (input.stretch === minerva.Stretch.None)
                            minerva.Rect.union(paintRect, imgRect);
                        return true;
                    }
                    tapins.prepareImageMetrics = prepareImageMetrics;
                })(tapins = processdown.tapins || (processdown.tapins = {}));
            })(processdown = image.processdown || (image.processdown = {}));
        })(image = controls.image || (controls.image = {}));
    })(controls = minerva.controls || (minerva.controls = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var controls;
    (function (controls) {
        var image;
        (function (image) {
            var render;
            (function (render) {
                var tapins;
                (function (tapins) {
                    function doRender(input, state, output, ctx, region, tree) {
                        var source = input.source;
                        if (!source || source.pixelWidth === 0 || source.pixelHeight === 0)
                            return true;
                        ctx.save();
                        minerva.core.helpers.renderLayoutClip(ctx, input, tree);
                        ctx.preapply(input.imgXform);
                        source.draw(ctx.raw);
                        ctx.restore();
                        return true;
                    }
                    tapins.doRender = doRender;
                })(tapins = render.tapins || (render.tapins = {}));
            })(render = image.render || (image.render = {}));
        })(image = controls.image || (controls.image = {}));
    })(controls = minerva.controls || (minerva.controls = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var controls;
    (function (controls) {
        var panel;
        (function (panel) {
            var arrange;
            (function (arrange) {
                var tapins;
                (function (tapins) {
                    function doOverride(input, state, output, tree, finalRect) {
                        var cr = state.childRect;
                        cr.x = cr.y = 0;
                        minerva.Size.copyTo(state.finalSize, cr);
                        for (var walker = tree.walk(); walker.step();) {
                            walker.current.arrange(cr);
                        }
                        minerva.Size.copyTo(state.finalSize, state.arrangedSize);
                        return true;
                    }
                    tapins.doOverride = doOverride;
                })(tapins = arrange.tapins || (arrange.tapins = {}));
            })(arrange = panel.arrange || (panel.arrange = {}));
        })(panel = controls.panel || (controls.panel = {}));
    })(controls = minerva.controls || (minerva.controls = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var controls;
    (function (controls) {
        var panel;
        (function (panel) {
            var processup;
            (function (processup) {
                var tapins;
                (function (tapins) {
                    function preCalcExtents(input, state, output, tree) {
                        if ((input.dirtyFlags & minerva.DirtyFlags.Bounds) === 0)
                            return true;
                        if (!input.background) {
                            var as = state.actualSize;
                            as.width = as.height = 0;
                        }
                        return true;
                    }
                    tapins.preCalcExtents = preCalcExtents;
                })(tapins = processup.tapins || (processup.tapins = {}));
            })(processup = panel.processup || (panel.processup = {}));
        })(panel = controls.panel || (controls.panel = {}));
    })(controls = minerva.controls || (minerva.controls = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var controls;
    (function (controls) {
        var popup;
        (function (popup) {
            var processdown;
            (function (processdown) {
                var tapins;
                (function (tapins) {
                    tapins.postProcessXform = function (input, state, output, vpinput, tree) {
                        if ((input.dirtyFlags & minerva.DirtyFlags.Transform) === 0)
                            return true;
                        var child = tree.popupChild;
                        if (!child)
                            return true;
                        child.assets.dirtyFlags |= minerva.DirtyFlags.LocalTransform;
                        var carrier = child.assets.carrierXform;
                        if (!carrier)
                            carrier = child.assets.carrierXform || minerva.mat3.create();
                        minerva.mat3.copyTo(output.absoluteXform, carrier);
                        minerva.mat3.translate(carrier, input.horizontalOffset, input.verticalOffset);
                        minerva.core.Updater.$$addDownDirty(child);
                        return true;
                    };
                })(tapins = processdown.tapins || (processdown.tapins = {}));
            })(processdown = popup.processdown || (popup.processdown = {}));
        })(popup = controls.popup || (controls.popup = {}));
    })(controls = minerva.controls || (minerva.controls = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var controls;
    (function (controls) {
        var popup;
        (function (popup) {
            var processdown;
            (function (processdown) {
                var tapins;
                (function (tapins) {
                    tapins.preProcessXform = function (input, state, output, vpinput, tree) {
                        if ((input.dirtyFlags & minerva.DirtyFlags.Transform) === 0)
                            return true;
                        var child = tree.popupChild;
                        if (child) {
                            child.assets.dirtyFlags |= minerva.DirtyFlags.LocalTransform;
                            minerva.core.Updater.$$addDownDirty(child);
                        }
                        return true;
                    };
                })(tapins = processdown.tapins || (processdown.tapins = {}));
            })(processdown = popup.processdown || (popup.processdown = {}));
        })(popup = controls.popup || (controls.popup = {}));
    })(controls = minerva.controls || (minerva.controls = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var controls;
    (function (controls) {
        var scrollcontentpresenter;
        (function (scrollcontentpresenter) {
            var arrange;
            (function (arrange) {
                var tapins;
                (function (tapins) {
                    function doOverride(input, state, output, tree, finalRect) {
                        var as = state.arrangedSize;
                        if (!tree.subtree) {
                            as.width = as.height = 0;
                            return true;
                        }
                        var sd = input.scrollData;
                        if (scrollcontentpresenter.helpers.clampOffsets(sd)) {
                            sd.invalidate();
                        }
                        var desired = tree.subtree.assets.desiredSize;
                        var cr = state.childRect;
                        cr.x = -sd.offsetX;
                        cr.y = -sd.offsetY;
                        cr.width = Math.max(state.finalSize.width, desired.width);
                        cr.height = Math.max(state.finalSize.height, desired.height);
                        tree.subtree.arrange(cr);
                        return true;
                    }
                    tapins.doOverride = doOverride;
                })(tapins = arrange.tapins || (arrange.tapins = {}));
            })(arrange = scrollcontentpresenter.arrange || (scrollcontentpresenter.arrange = {}));
        })(scrollcontentpresenter = controls.scrollcontentpresenter || (controls.scrollcontentpresenter = {}));
    })(controls = minerva.controls || (minerva.controls = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var controls;
    (function (controls) {
        var scrollcontentpresenter;
        (function (scrollcontentpresenter) {
            var arrange;
            (function (arrange) {
                var tapins;
                (function (tapins) {
                    function updateClip(input, state, output, tree, availableSize) {
                        var ic = output.internalClip;
                        ic.x = ic.y = 0;
                        minerva.Size.copyTo(state.arrangedSize, ic);
                        return true;
                    }
                    tapins.updateClip = updateClip;
                })(tapins = arrange.tapins || (arrange.tapins = {}));
            })(arrange = scrollcontentpresenter.arrange || (scrollcontentpresenter.arrange = {}));
        })(scrollcontentpresenter = controls.scrollcontentpresenter || (controls.scrollcontentpresenter = {}));
    })(controls = minerva.controls || (minerva.controls = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var controls;
    (function (controls) {
        var scrollcontentpresenter;
        (function (scrollcontentpresenter) {
            var arrange;
            (function (arrange) {
                var tapins;
                (function (tapins) {
                    function updateExtents(input, state, output, tree, availableSize) {
                        var sd = input.scrollData;
                        var viewport = state.finalSize;
                        var changed = sd.viewportWidth !== viewport.width
                            || sd.viewportHeight !== viewport.height;
                        sd.viewportWidth = viewport.width;
                        sd.viewportHeight = viewport.height;
                        if (scrollcontentpresenter.helpers.clampOffsets(sd) || changed) {
                            sd.invalidate();
                        }
                        return true;
                    }
                    tapins.updateExtents = updateExtents;
                })(tapins = arrange.tapins || (arrange.tapins = {}));
            })(arrange = scrollcontentpresenter.arrange || (scrollcontentpresenter.arrange = {}));
        })(scrollcontentpresenter = controls.scrollcontentpresenter || (controls.scrollcontentpresenter = {}));
    })(controls = minerva.controls || (minerva.controls = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var controls;
    (function (controls) {
        var scrollcontentpresenter;
        (function (scrollcontentpresenter) {
            var measure;
            (function (measure) {
                var tapins;
                (function (tapins) {
                    tapins.doOverride = function (input, state, output, tree, availableSize) {
                        var ds = output.desiredSize;
                        ds.width = ds.height = 0;
                        if (!tree.subtree)
                            return true;
                        var sd = input.scrollData;
                        var ideal = state.idealSize;
                        ideal.width = !sd.canHorizontallyScroll ? state.availableSize.width : Number.POSITIVE_INFINITY;
                        ideal.height = !sd.canVerticallyScroll ? state.availableSize.height : Number.POSITIVE_INFINITY;
                        tree.subtree.measure(ideal);
                        return true;
                    };
                })(tapins = measure.tapins || (measure.tapins = {}));
            })(measure = scrollcontentpresenter.measure || (scrollcontentpresenter.measure = {}));
        })(scrollcontentpresenter = controls.scrollcontentpresenter || (controls.scrollcontentpresenter = {}));
    })(controls = minerva.controls || (minerva.controls = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var controls;
    (function (controls) {
        var scrollcontentpresenter;
        (function (scrollcontentpresenter) {
            var measure;
            (function (measure) {
                var tapins;
                (function (tapins) {
                    function finishDoOverride(input, state, output, tree, availableSize) {
                        var ds = output.desiredSize;
                        var sd = input.scrollData;
                        minerva.Size.copyTo(state.availableSize, ds);
                        ds.width = Math.min(ds.width, sd.extentWidth);
                        ds.height = Math.min(ds.height, sd.extentHeight);
                        return true;
                    }
                    tapins.finishDoOverride = finishDoOverride;
                })(tapins = measure.tapins || (measure.tapins = {}));
            })(measure = scrollcontentpresenter.measure || (scrollcontentpresenter.measure = {}));
        })(scrollcontentpresenter = controls.scrollcontentpresenter || (controls.scrollcontentpresenter = {}));
    })(controls = minerva.controls || (minerva.controls = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var controls;
    (function (controls) {
        var scrollcontentpresenter;
        (function (scrollcontentpresenter) {
            var measure;
            (function (measure) {
                var tapins;
                (function (tapins) {
                    function updateExtents(input, state, output, tree, availableSize) {
                        var sd = input.scrollData;
                        var viewport = state.availableSize;
                        var extent = tree.subtree.assets.desiredSize;
                        var changed = sd.viewportWidth !== viewport.width
                            || sd.viewportHeight !== viewport.height
                            || sd.extentWidth !== extent.width
                            || sd.extentHeight !== extent.height;
                        sd.viewportWidth = viewport.width;
                        sd.viewportHeight = viewport.height;
                        sd.extentWidth = extent.width;
                        sd.extentHeight = extent.height;
                        if (scrollcontentpresenter.helpers.clampOffsets(sd) || changed) {
                            sd.invalidate();
                        }
                        return true;
                    }
                    tapins.updateExtents = updateExtents;
                })(tapins = measure.tapins || (measure.tapins = {}));
            })(measure = scrollcontentpresenter.measure || (scrollcontentpresenter.measure = {}));
        })(scrollcontentpresenter = controls.scrollcontentpresenter || (controls.scrollcontentpresenter = {}));
    })(controls = minerva.controls || (minerva.controls = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var controls;
    (function (controls) {
        var stackpanel;
        (function (stackpanel) {
            var arrange;
            (function (arrange) {
                var tapins;
                (function (tapins) {
                    function doHorizontal(input, state, output, tree, finalRect) {
                        if (input.orientation !== minerva.Orientation.Horizontal)
                            return true;
                        var fs = state.finalSize;
                        var arranged = state.arrangedSize;
                        arranged.width = 0;
                        var childRect = state.childRect;
                        var child;
                        var childDesired;
                        for (var walker = tree.walk(); walker.step();) {
                            child = walker.current;
                            childDesired = child.assets.desiredSize;
                            childDesired.height = fs.height;
                            minerva.Size.copyTo(childDesired, childRect);
                            childRect.x = arranged.width;
                            if (minerva.Rect.isEmpty(childRect))
                                childRect.x = childRect.y = childRect.width = childRect.height = 0;
                            child.arrange(childRect);
                            arranged.width += childDesired.width;
                            arranged.height = Math.max(arranged.height, childDesired.height);
                        }
                        arranged.width = Math.max(arranged.width, state.finalSize.width);
                        return true;
                    }
                    tapins.doHorizontal = doHorizontal;
                })(tapins = arrange.tapins || (arrange.tapins = {}));
            })(arrange = stackpanel.arrange || (stackpanel.arrange = {}));
        })(stackpanel = controls.stackpanel || (controls.stackpanel = {}));
    })(controls = minerva.controls || (minerva.controls = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var controls;
    (function (controls) {
        var stackpanel;
        (function (stackpanel) {
            var arrange;
            (function (arrange) {
                var tapins;
                (function (tapins) {
                    function doOverride(input, state, output, tree, finalRect) {
                        var cr = state.childRect;
                        cr.x = cr.y = 0;
                        minerva.Size.copyTo(state.finalSize, cr);
                        minerva.Size.copyTo(state.finalSize, state.arrangedSize);
                        return true;
                    }
                    tapins.doOverride = doOverride;
                })(tapins = arrange.tapins || (arrange.tapins = {}));
            })(arrange = stackpanel.arrange || (stackpanel.arrange = {}));
        })(stackpanel = controls.stackpanel || (controls.stackpanel = {}));
    })(controls = minerva.controls || (minerva.controls = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var controls;
    (function (controls) {
        var stackpanel;
        (function (stackpanel) {
            var arrange;
            (function (arrange) {
                var tapins;
                (function (tapins) {
                    function doVertical(input, state, output, tree, finalRect) {
                        if (input.orientation !== minerva.Orientation.Vertical)
                            return true;
                        var fs = state.finalSize;
                        var arranged = state.arrangedSize;
                        arranged.height = 0;
                        var childRect = state.childRect;
                        var child;
                        var childDesired;
                        for (var walker = tree.walk(); walker.step();) {
                            child = walker.current;
                            childDesired = child.assets.desiredSize;
                            childDesired.width = fs.width;
                            minerva.Size.copyTo(childDesired, childRect);
                            childRect.y = arranged.height;
                            if (minerva.Rect.isEmpty(childRect))
                                childRect.x = childRect.y = childRect.width = childRect.height = 0;
                            child.arrange(childRect);
                            arranged.width = Math.max(arranged.width, childDesired.width);
                            arranged.height += childDesired.height;
                        }
                        arranged.height = Math.max(arranged.height, state.finalSize.height);
                        return true;
                    }
                    tapins.doVertical = doVertical;
                })(tapins = arrange.tapins || (arrange.tapins = {}));
            })(arrange = stackpanel.arrange || (stackpanel.arrange = {}));
        })(stackpanel = controls.stackpanel || (controls.stackpanel = {}));
    })(controls = minerva.controls || (minerva.controls = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var controls;
    (function (controls) {
        var stackpanel;
        (function (stackpanel) {
            var measure;
            (function (measure) {
                var tapins;
                (function (tapins) {
                    function doHorizontal(input, state, output, tree, availableSize) {
                        if (input.orientation !== minerva.Orientation.Horizontal)
                            return true;
                        var ca = state.childAvailable;
                        ca.height = state.availableSize.height;
                        var height = input.height;
                        if (!isNaN(height))
                            ca.height = height;
                        ca.height = Math.max(Math.min(ca.height, input.maxHeight), input.minHeight);
                        var desired = output.desiredSize;
                        for (var walker = tree.walk(), child, childDesired; walker.step();) {
                            child = walker.current;
                            child.measure(ca);
                            childDesired = child.assets.desiredSize;
                            desired.width += childDesired.width;
                            desired.height = Math.max(desired.height, childDesired.height);
                        }
                        return true;
                    }
                    tapins.doHorizontal = doHorizontal;
                })(tapins = measure.tapins || (measure.tapins = {}));
            })(measure = stackpanel.measure || (stackpanel.measure = {}));
        })(stackpanel = controls.stackpanel || (controls.stackpanel = {}));
    })(controls = minerva.controls || (minerva.controls = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var controls;
    (function (controls) {
        var stackpanel;
        (function (stackpanel) {
            var measure;
            (function (measure) {
                var tapins;
                (function (tapins) {
                    function doOverride(input, state, output, tree, availableSize) {
                        var ca = state.childAvailable;
                        ca.width = ca.height = Number.POSITIVE_INFINITY;
                        var desired = output.desiredSize;
                        desired.width = desired.height = 0;
                        return true;
                    }
                    tapins.doOverride = doOverride;
                })(tapins = measure.tapins || (measure.tapins = {}));
            })(measure = stackpanel.measure || (stackpanel.measure = {}));
        })(stackpanel = controls.stackpanel || (controls.stackpanel = {}));
    })(controls = minerva.controls || (minerva.controls = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var controls;
    (function (controls) {
        var stackpanel;
        (function (stackpanel) {
            var measure;
            (function (measure) {
                var tapins;
                (function (tapins) {
                    function doVertical(input, state, output, tree, availableSize) {
                        if (input.orientation !== minerva.Orientation.Vertical)
                            return true;
                        var ca = state.childAvailable;
                        ca.width = state.availableSize.width;
                        var width = input.width;
                        if (!isNaN(width))
                            ca.width = width;
                        ca.width = Math.max(Math.min(ca.width, input.maxWidth), input.minWidth);
                        var desired = output.desiredSize;
                        for (var walker = tree.walk(), child, childDesired; walker.step();) {
                            child = walker.current;
                            child.measure(ca);
                            childDesired = child.assets.desiredSize;
                            desired.height += childDesired.height;
                            desired.width = Math.max(desired.width, childDesired.width);
                        }
                        return true;
                    }
                    tapins.doVertical = doVertical;
                })(tapins = measure.tapins || (measure.tapins = {}));
            })(measure = stackpanel.measure || (stackpanel.measure = {}));
        })(stackpanel = controls.stackpanel || (controls.stackpanel = {}));
    })(controls = minerva.controls || (minerva.controls = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var controls;
    (function (controls) {
        var usercontrol;
        (function (usercontrol) {
            var arrange;
            (function (arrange) {
                var tapins;
                (function (tapins) {
                    function doOverride(input, state, output, tree, finalRect) {
                        if (tree.subtree)
                            tree.subtree.arrange(state.childRect);
                        minerva.Size.copyTo(state.finalSize, state.arrangedSize);
                        return true;
                    }
                    tapins.doOverride = doOverride;
                })(tapins = arrange.tapins || (arrange.tapins = {}));
            })(arrange = usercontrol.arrange || (usercontrol.arrange = {}));
        })(usercontrol = controls.usercontrol || (controls.usercontrol = {}));
    })(controls = minerva.controls || (minerva.controls = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var controls;
    (function (controls) {
        var usercontrol;
        (function (usercontrol) {
            var arrange;
            (function (arrange) {
                var tapins;
                (function (tapins) {
                    function preOverride(input, state, output, tree, availableSize) {
                        if (!tree.subtree)
                            return true;
                        var tb = state.totalBorder;
                        minerva.Thickness.copyTo(input.padding, tb);
                        minerva.Thickness.add(tb, input.borderThickness);
                        var cr = state.childRect;
                        cr.x = cr.y = 0;
                        minerva.Size.copyTo(state.finalSize, cr);
                        minerva.Thickness.shrinkSize(tb, cr);
                        return true;
                    }
                    tapins.preOverride = preOverride;
                })(tapins = arrange.tapins || (arrange.tapins = {}));
            })(arrange = usercontrol.arrange || (usercontrol.arrange = {}));
        })(usercontrol = controls.usercontrol || (controls.usercontrol = {}));
    })(controls = minerva.controls || (minerva.controls = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var controls;
    (function (controls) {
        var usercontrol;
        (function (usercontrol) {
            var measure;
            (function (measure) {
                var tapins;
                (function (tapins) {
                    function doOverride(input, state, output, tree, availableSize) {
                        var ds = output.desiredSize;
                        var subtree = tree.subtree;
                        if (subtree) {
                            subtree.measure(state.availableSize);
                            minerva.Size.copyTo(subtree.assets.desiredSize, ds);
                        }
                        return true;
                    }
                    tapins.doOverride = doOverride;
                })(tapins = measure.tapins || (measure.tapins = {}));
            })(measure = usercontrol.measure || (usercontrol.measure = {}));
        })(usercontrol = controls.usercontrol || (controls.usercontrol = {}));
    })(controls = minerva.controls || (minerva.controls = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var controls;
    (function (controls) {
        var usercontrol;
        (function (usercontrol) {
            var measure;
            (function (measure) {
                var tapins;
                (function (tapins) {
                    function postOverride(input, state, output, tree, availableSize) {
                        minerva.Thickness.growSize(state.totalBorder, output.desiredSize);
                        minerva.Size.min(output.desiredSize, state.availableSize);
                        return true;
                    }
                    tapins.postOverride = postOverride;
                })(tapins = measure.tapins || (measure.tapins = {}));
            })(measure = usercontrol.measure || (usercontrol.measure = {}));
        })(usercontrol = controls.usercontrol || (controls.usercontrol = {}));
    })(controls = minerva.controls || (minerva.controls = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var controls;
    (function (controls) {
        var usercontrol;
        (function (usercontrol) {
            var measure;
            (function (measure) {
                var tapins;
                (function (tapins) {
                    function preOverride(input, state, output, tree, availableSize) {
                        var tb = state.totalBorder;
                        minerva.Thickness.copyTo(input.padding, tb);
                        minerva.Thickness.add(tb, input.borderThickness);
                        minerva.Thickness.shrinkSize(tb, state.availableSize);
                        return true;
                    }
                    tapins.preOverride = preOverride;
                })(tapins = measure.tapins || (measure.tapins = {}));
            })(measure = usercontrol.measure || (usercontrol.measure = {}));
        })(usercontrol = controls.usercontrol || (controls.usercontrol = {}));
    })(controls = minerva.controls || (minerva.controls = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var controls;
    (function (controls) {
        var virtualizingstackpanel;
        (function (virtualizingstackpanel) {
            var arrange;
            (function (arrange) {
                var tapins;
                (function (tapins) {
                    function doHorizontal(input, state, output, tree, finalRect) {
                        if (input.orientation !== minerva.Orientation.Horizontal)
                            return true;
                        var fs = state.finalSize;
                        var arranged = state.arrangedSize;
                        arranged.width = 0;
                        var childRect = state.childRect;
                        var sd = input.scrollData;
                        var child;
                        var childDesired;
                        for (var walker = tree.walk(); walker.step();) {
                            child = walker.current;
                            childDesired = child.assets.desiredSize;
                            childDesired.height = fs.height;
                            minerva.Size.copyTo(childDesired, childRect);
                            childRect.x = arranged.width;
                            childRect.y = -sd.offsetY;
                            if (minerva.Rect.isEmpty(childRect))
                                childRect.x = childRect.y = childRect.width = childRect.height = 0;
                            child.arrange(childRect);
                            arranged.width += childDesired.width;
                            arranged.height = Math.max(arranged.height, childDesired.height);
                        }
                        arranged.width = Math.max(arranged.width, fs.width);
                        return true;
                    }
                    tapins.doHorizontal = doHorizontal;
                })(tapins = arrange.tapins || (arrange.tapins = {}));
            })(arrange = virtualizingstackpanel.arrange || (virtualizingstackpanel.arrange = {}));
        })(virtualizingstackpanel = controls.virtualizingstackpanel || (controls.virtualizingstackpanel = {}));
    })(controls = minerva.controls || (minerva.controls = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var controls;
    (function (controls) {
        var virtualizingstackpanel;
        (function (virtualizingstackpanel) {
            var arrange;
            (function (arrange) {
                var tapins;
                (function (tapins) {
                    function doOverride(input, state, output, tree, finalRect) {
                        var cr = state.childRect;
                        cr.x = cr.y = 0;
                        minerva.Size.copyTo(state.finalSize, cr);
                        minerva.Size.copyTo(state.finalSize, state.arrangedSize);
                        return true;
                    }
                    tapins.doOverride = doOverride;
                })(tapins = arrange.tapins || (arrange.tapins = {}));
            })(arrange = virtualizingstackpanel.arrange || (virtualizingstackpanel.arrange = {}));
        })(virtualizingstackpanel = controls.virtualizingstackpanel || (controls.virtualizingstackpanel = {}));
    })(controls = minerva.controls || (minerva.controls = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var controls;
    (function (controls) {
        var virtualizingstackpanel;
        (function (virtualizingstackpanel) {
            var arrange;
            (function (arrange) {
                var tapins;
                (function (tapins) {
                    function doVertical(input, state, output, tree, finalRect) {
                        if (input.orientation !== minerva.Orientation.Vertical)
                            return true;
                        var fs = state.finalSize;
                        var arranged = state.arrangedSize;
                        arranged.height = 0;
                        var childRect = state.childRect;
                        var sd = input.scrollData;
                        var child;
                        var childDesired;
                        for (var walker = tree.walk(); walker.step();) {
                            child = walker.current;
                            childDesired = child.assets.desiredSize;
                            childDesired.width = fs.width;
                            minerva.Size.copyTo(childDesired, childRect);
                            childRect.x = -sd.offsetX;
                            childRect.y = arranged.height;
                            if (minerva.Rect.isEmpty(childRect))
                                childRect.x = childRect.y = childRect.width = childRect.height = 0;
                            child.arrange(childRect);
                            arranged.width = Math.max(arranged.width, childDesired.width);
                            arranged.height += childDesired.height;
                        }
                        arranged.height = Math.max(arranged.height, fs.height);
                        return true;
                    }
                    tapins.doVertical = doVertical;
                })(tapins = arrange.tapins || (arrange.tapins = {}));
            })(arrange = virtualizingstackpanel.arrange || (virtualizingstackpanel.arrange = {}));
        })(virtualizingstackpanel = controls.virtualizingstackpanel || (controls.virtualizingstackpanel = {}));
    })(controls = minerva.controls || (minerva.controls = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var controls;
    (function (controls) {
        var virtualizingstackpanel;
        (function (virtualizingstackpanel) {
            var measure;
            (function (measure) {
                var tapins;
                (function (tapins) {
                    function doHorizontal(input, state, output, tree, availableSize) {
                        if (input.orientation !== minerva.Orientation.Horizontal)
                            return true;
                        var ca = state.childAvailable;
                        var sd = input.scrollData;
                        if (sd.canVerticallyScroll)
                            ca.height = Number.POSITIVE_INFINITY;
                        var index = Math.floor(sd.offsetX);
                        var count = tree.containerOwner.itemCount;
                        tree.containerOwner.remove(0, index);
                        var viscount = 0;
                        var ds = output.desiredSize;
                        for (var generator = tree.containerOwner.createGenerator(index, count); generator.generate();) {
                            viscount++;
                            var child = generator.current;
                            child.measure(ca);
                            var childDesired = child.assets.desiredSize;
                            ds.height = Math.max(ds.height, childDesired.height);
                            ds.width += childDesired.width;
                            if (ds.width > ca.width)
                                break;
                        }
                        tree.containerOwner.remove(index + viscount, count - (index + viscount));
                        var changed = sd.extentHeight !== ds.height
                            || sd.extentWidth !== count
                            || sd.viewportHeight !== ca.height
                            || sd.viewportWidth !== viscount;
                        sd.extentHeight = ds.height;
                        sd.extentWidth = count;
                        sd.viewportHeight = ca.height;
                        sd.viewportWidth = viscount;
                        if (changed)
                            sd.invalidate();
                        return true;
                    }
                    tapins.doHorizontal = doHorizontal;
                })(tapins = measure.tapins || (measure.tapins = {}));
            })(measure = virtualizingstackpanel.measure || (virtualizingstackpanel.measure = {}));
        })(virtualizingstackpanel = controls.virtualizingstackpanel || (controls.virtualizingstackpanel = {}));
    })(controls = minerva.controls || (minerva.controls = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var controls;
    (function (controls) {
        var virtualizingstackpanel;
        (function (virtualizingstackpanel) {
            var measure;
            (function (measure) {
                var tapins;
                (function (tapins) {
                    function doOverride(input, state, output, tree, availableSize) {
                        var ca = state.childAvailable;
                        minerva.Size.copyTo(state.availableSize, ca);
                        var desired = output.desiredSize;
                        desired.width = desired.height = 0;
                        return true;
                    }
                    tapins.doOverride = doOverride;
                })(tapins = measure.tapins || (measure.tapins = {}));
            })(measure = virtualizingstackpanel.measure || (virtualizingstackpanel.measure = {}));
        })(virtualizingstackpanel = controls.virtualizingstackpanel || (controls.virtualizingstackpanel = {}));
    })(controls = minerva.controls || (minerva.controls = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var controls;
    (function (controls) {
        var virtualizingstackpanel;
        (function (virtualizingstackpanel) {
            var measure;
            (function (measure) {
                var tapins;
                (function (tapins) {
                    function doVertical(input, state, output, tree, availableSize) {
                        if (input.orientation !== minerva.Orientation.Vertical)
                            return true;
                        var ca = state.childAvailable;
                        var sd = input.scrollData;
                        if (sd.canHorizontallyScroll)
                            ca.width = Number.POSITIVE_INFINITY;
                        var index = Math.floor(sd.offsetY);
                        var count = tree.containerOwner.itemCount;
                        tree.containerOwner.remove(0, index);
                        var viscount = 0;
                        var ds = output.desiredSize;
                        for (var generator = tree.containerOwner.createGenerator(index, count); generator.generate();) {
                            viscount++;
                            var child = generator.current;
                            child.measure(ca);
                            var childDesired = child.assets.desiredSize;
                            ds.width = Math.max(ds.width, childDesired.width);
                            ds.height += childDesired.height;
                            if (ds.height > ca.height)
                                break;
                        }
                        tree.containerOwner.remove(index + viscount, count - (index + viscount));
                        var changed = sd.extentHeight !== count
                            || sd.extentWidth !== ds.width
                            || sd.viewportHeight !== viscount
                            || sd.viewportWidth !== ca.width;
                        sd.extentHeight = count;
                        sd.extentWidth = ds.width;
                        sd.viewportHeight = viscount;
                        sd.viewportWidth = ca.width;
                        if (changed)
                            sd.invalidate();
                        return true;
                    }
                    tapins.doVertical = doVertical;
                })(tapins = measure.tapins || (measure.tapins = {}));
            })(measure = virtualizingstackpanel.measure || (virtualizingstackpanel.measure = {}));
        })(virtualizingstackpanel = controls.virtualizingstackpanel || (controls.virtualizingstackpanel = {}));
    })(controls = minerva.controls || (minerva.controls = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var shapes;
    (function (shapes) {
        var path;
        (function (path) {
            var processup;
            (function (processup) {
                var tapins;
                (function (tapins) {
                    function calcActualSize(input, state, output, tree) {
                        if ((input.dirtyFlags & minerva.DirtyFlags.Bounds) === 0)
                            return true;
                        var actual = state.actualSize;
                        actual.width = input.actualWidth;
                        actual.height = input.actualHeight;
                        var natural = input.naturalBounds;
                        if ((natural.width <= 0.0 || natural.height <= 0) || (input.width <= 0.0 || input.height <= 0.0)) {
                            actual.width = 0.0;
                            actual.height = 0.0;
                            return true;
                        }
                        if (tree.visualParent instanceof minerva.controls.canvas.CanvasUpdater) {
                            actual.width = actual.width === 0.0 ? natural.width : actual.width;
                            actual.height = actual.height === 0.0 ? natural.height : actual.height;
                            if (!isNaN(input.width))
                                actual.width = input.width;
                            if (!isNaN(input.height))
                                actual.height = input.height;
                        }
                        return true;
                    }
                    tapins.calcActualSize = calcActualSize;
                })(tapins = processup.tapins || (processup.tapins = {}));
            })(processup = path.processup || (path.processup = {}));
        })(path = shapes.path || (shapes.path = {}));
    })(shapes = minerva.shapes || (minerva.shapes = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var shapes;
    (function (shapes) {
        var path;
        (function (path) {
            var processup;
            (function (processup) {
                var tapins;
                (function (tapins) {
                    function calcExtents(input, state, output, tree) {
                        if ((input.dirtyFlags & minerva.DirtyFlags.Bounds) === 0)
                            return true;
                        if (minerva.Size.isEmpty(state.actualSize)) {
                            minerva.Rect.clear(output.extents);
                        }
                        else {
                            minerva.Rect.copyTo(output.shapeRect, output.extents);
                            minerva.Rect.transform(output.extents, output.stretchXform);
                        }
                        minerva.Rect.copyTo(output.extents, output.extentsWithChildren);
                        return true;
                    }
                    tapins.calcExtents = calcExtents;
                })(tapins = processup.tapins || (processup.tapins = {}));
            })(processup = path.processup || (path.processup = {}));
        })(path = shapes.path || (shapes.path = {}));
    })(shapes = minerva.shapes || (minerva.shapes = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var shapes;
    (function (shapes) {
        var path;
        (function (path) {
            var processup;
            (function (processup) {
                var tapins;
                (function (tapins) {
                    function calcShapeRect(input, state, output, tree) {
                        if ((input.dirtyFlags & minerva.DirtyFlags.Bounds) === 0)
                            return true;
                        minerva.Rect.copyTo(input.naturalBounds, output.shapeRect);
                        return true;
                    }
                    tapins.calcShapeRect = calcShapeRect;
                })(tapins = processup.tapins || (processup.tapins = {}));
            })(processup = path.processup || (path.processup = {}));
        })(path = shapes.path || (shapes.path = {}));
    })(shapes = minerva.shapes || (minerva.shapes = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var shapes;
    (function (shapes) {
        var path;
        (function (path) {
            var processup;
            (function (processup) {
                var tapins;
                (function (tapins) {
                    function calcStretch(input, state, output, tree) {
                        if ((input.dirtyFlags & minerva.DirtyFlags.Bounds) === 0)
                            return true;
                        var xform = minerva.mat3.identity(output.stretchXform);
                        var actual = state.actualSize;
                        if (minerva.Size.isEmpty(actual) || input.stretch === minerva.Stretch.None)
                            return true;
                        var shapeRect = output.shapeRect;
                        var sx = actual.width / shapeRect.width;
                        var sy = actual.height / shapeRect.height;
                        var xp = 0;
                        var yp = 0;
                        switch (input.stretch) {
                            case minerva.Stretch.Uniform:
                                sx = sy = Math.min(sx, sy);
                                xp = (actual.width - (shapeRect.width * sx)) / 2.0;
                                yp = (actual.height - (shapeRect.height * sy)) / 2.0;
                                break;
                            case minerva.Stretch.UniformToFill:
                                sx = sy = Math.max(sx, sy);
                                break;
                        }
                        minerva.mat3.translate(xform, -shapeRect.x, -shapeRect.y);
                        minerva.mat3.scale(xform, sx, sy);
                        minerva.mat3.translate(xform, xp, yp);
                        return true;
                    }
                    tapins.calcStretch = calcStretch;
                })(tapins = processup.tapins || (processup.tapins = {}));
            })(processup = path.processup || (path.processup = {}));
        })(path = shapes.path || (shapes.path = {}));
    })(shapes = minerva.shapes || (minerva.shapes = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var shapes;
    (function (shapes) {
        var path;
        (function (path) {
            var render;
            (function (render) {
                var tapins;
                (function (tapins) {
                    function doRender(input, state, output, ctx, region) {
                        if (!state.shouldDraw)
                            return true;
                        ctx.preapply(input.stretchXform);
                        input.data.Draw(ctx);
                        return true;
                    }
                    tapins.doRender = doRender;
                })(tapins = render.tapins || (render.tapins = {}));
            })(render = path.render || (path.render = {}));
        })(path = shapes.path || (shapes.path = {}));
    })(shapes = minerva.shapes || (minerva.shapes = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var shapes;
    (function (shapes) {
        var path;
        (function (path) {
            var render;
            (function (render) {
                var tapins;
                (function (tapins) {
                    function fill(input, state, output, ctx, region) {
                        if (!state.shouldDraw)
                            return true;
                        if (input.fill)
                            ctx.fillEx(input.fill, input.shapeRect, input.data ? input.data.fillRule : minerva.FillRule.EvenOdd);
                        return true;
                    }
                    tapins.fill = fill;
                })(tapins = render.tapins || (render.tapins = {}));
            })(render = path.render || (path.render = {}));
        })(path = shapes.path || (shapes.path = {}));
    })(shapes = minerva.shapes || (minerva.shapes = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var shapes;
    (function (shapes) {
        var shape;
        (function (shape) {
            var arrange;
            (function (arrange) {
                var tapins;
                (function (tapins) {
                    function doOverride(input, state, output, tree) {
                        var arranged = state.arrangedSize;
                        minerva.Size.copyTo(state.finalSize, arranged);
                        var nb = input.naturalBounds;
                        if (input.stretch === minerva.Stretch.None) {
                            arranged.width = Math.max(arranged.width, nb.x + nb.width);
                            arranged.height = Math.max(arranged.height, nb.y + nb.height);
                            return true;
                        }
                        if (nb.width === 0)
                            nb.width = arranged.width;
                        if (nb.height === 0)
                            nb.height = arranged.height;
                        var sx = 1.0, sy = 1.0;
                        if (nb.width !== arranged.width)
                            sx = arranged.width / nb.width;
                        if (nb.height !== arranged.height)
                            sy = arranged.height / nb.height;
                        switch (input.stretch) {
                            case minerva.Stretch.Uniform:
                                sx = sy = Math.min(sx, sy);
                                break;
                            case minerva.Stretch.UniformToFill:
                                sx = sy = Math.max(sx, sy);
                                break;
                        }
                        arranged.width = (nb.width * sx) || 0;
                        arranged.height = (nb.height * sy) || 0;
                        return true;
                    }
                    tapins.doOverride = doOverride;
                })(tapins = arrange.tapins || (arrange.tapins = {}));
            })(arrange = shape.arrange || (shape.arrange = {}));
        })(shape = shapes.shape || (shapes.shape = {}));
    })(shapes = minerva.shapes || (minerva.shapes = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var shapes;
    (function (shapes) {
        var shape;
        (function (shape) {
            var hittest;
            (function (hittest) {
                var tapins;
                (function (tapins) {
                    function canHitInside(data, pos, hitList, ctx) {
                        if (!data.assets.fill && !data.assets.stroke) {
                            hitList.shift();
                            ctx.restore();
                            return false;
                        }
                        return true;
                    }
                    tapins.canHitInside = canHitInside;
                })(tapins = hittest.tapins || (hittest.tapins = {}));
            })(hittest = shape.hittest || (shape.hittest = {}));
        })(shape = shapes.shape || (shapes.shape = {}));
    })(shapes = minerva.shapes || (minerva.shapes = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var shapes;
    (function (shapes) {
        var shape;
        (function (shape) {
            var hittest;
            (function (hittest) {
                var tapins;
                (function (tapins) {
                    function canHitShape(data, pos, hitList, ctx) {
                        if ((data.assets.shapeFlags & minerva.ShapeFlags.Empty) === minerva.ShapeFlags.Empty) {
                            hitList.shift();
                            ctx.restore();
                            return false;
                        }
                        return true;
                    }
                    tapins.canHitShape = canHitShape;
                })(tapins = hittest.tapins || (hittest.tapins = {}));
            })(hittest = shape.hittest || (shape.hittest = {}));
        })(shape = shapes.shape || (shapes.shape = {}));
    })(shapes = minerva.shapes || (minerva.shapes = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var shapes;
    (function (shapes) {
        var shape;
        (function (shape) {
            var hittest;
            (function (hittest) {
                var tapins;
                (function (tapins) {
                    function drawShape(data, pos, hitList, ctx) {
                        return true;
                    }
                    tapins.drawShape = drawShape;
                })(tapins = hittest.tapins || (hittest.tapins = {}));
            })(hittest = shape.hittest || (shape.hittest = {}));
        })(shape = shapes.shape || (shapes.shape = {}));
    })(shapes = minerva.shapes || (minerva.shapes = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var shapes;
    (function (shapes) {
        var shape;
        (function (shape) {
            var hittest;
            (function (hittest) {
                var tapins;
                (function (tapins) {
                    function finishShape(data, pos, hitList, ctx) {
                        var assets = data.assets;
                        var inside = (!!assets.fill && ctx.raw.isPointInPath(pos.x, pos.y))
                            || (!!assets.stroke && ctx.isPointInStrokeEx(assets, pos.x, pos.y));
                        ctx.restore();
                        if (!inside) {
                            hitList.shift();
                            ctx.restore();
                            return false;
                        }
                        return true;
                    }
                    tapins.finishShape = finishShape;
                })(tapins = hittest.tapins || (hittest.tapins = {}));
            })(hittest = shape.hittest || (shape.hittest = {}));
        })(shape = shapes.shape || (shapes.shape = {}));
    })(shapes = minerva.shapes || (minerva.shapes = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var shapes;
    (function (shapes) {
        var shape;
        (function (shape) {
            var hittest;
            (function (hittest) {
                var tapins;
                (function (tapins) {
                    function insideChildren(data, pos, hitList, ctx) {
                        hitList.unshift(data.updater);
                        data.hitChildren = false;
                        return true;
                    }
                    tapins.insideChildren = insideChildren;
                })(tapins = hittest.tapins || (hittest.tapins = {}));
            })(hittest = shape.hittest || (shape.hittest = {}));
        })(shape = shapes.shape || (shapes.shape = {}));
    })(shapes = minerva.shapes || (minerva.shapes = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var shapes;
    (function (shapes) {
        var shape;
        (function (shape) {
            var hittest;
            (function (hittest) {
                var tapins;
                (function (tapins) {
                    function prepareShape(data, pos, hitList, ctx) {
                        ctx.save();
                        return true;
                    }
                    tapins.prepareShape = prepareShape;
                })(tapins = hittest.tapins || (hittest.tapins = {}));
            })(hittest = shape.hittest || (shape.hittest = {}));
        })(shape = shapes.shape || (shapes.shape = {}));
    })(shapes = minerva.shapes || (minerva.shapes = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var shapes;
    (function (shapes) {
        var shape;
        (function (shape) {
            var measure;
            (function (measure) {
                var tapins;
                (function (tapins) {
                    function calcNaturalBounds(input, state, output, tree) {
                        var nb = output.naturalBounds;
                        nb.x = nb.y = 0;
                        nb.width = nb.height = 1;
                        return true;
                    }
                    tapins.calcNaturalBounds = calcNaturalBounds;
                })(tapins = measure.tapins || (measure.tapins = {}));
            })(measure = shape.measure || (shape.measure = {}));
        })(shape = shapes.shape || (shapes.shape = {}));
    })(shapes = minerva.shapes || (minerva.shapes = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var shapes;
    (function (shapes) {
        var shape;
        (function (shape) {
            var measure;
            (function (measure) {
                var tapins;
                (function (tapins) {
                    function doOverride(input, state, output, tree) {
                        var ds = output.desiredSize;
                        var nb = output.naturalBounds;
                        if (input.stretch === minerva.Stretch.None) {
                            ds.width = nb.x + nb.width;
                            ds.height = nb.y + nb.height;
                            return true;
                        }
                        var available = state.availableSize;
                        minerva.Size.copyTo(available, ds);
                        if (!isFinite(available.width))
                            ds.width = nb.width;
                        if (!isFinite(available.height))
                            ds.height = nb.height;
                        var sx = 0, sy = 0;
                        if (nb.width > 0)
                            sx = ds.width / nb.width;
                        if (nb.height > 0)
                            sy = ds.height / nb.height;
                        if (!isFinite(available.width))
                            sx = sy;
                        if (!isFinite(available.height))
                            sy = sx;
                        switch (input.stretch) {
                            case minerva.Stretch.Uniform:
                                sx = sy = Math.min(sx, sy);
                                break;
                            case minerva.Stretch.UniformToFill:
                                sx = sy = Math.max(sx, sy);
                                break;
                            case minerva.Stretch.Fill:
                                if (!isFinite(available.width))
                                    sx = 1.0;
                                if (!isFinite(available.height))
                                    sy = 1.0;
                                break;
                        }
                        ds.width = nb.width * sx;
                        ds.height = nb.height * sy;
                        return true;
                    }
                    tapins.doOverride = doOverride;
                })(tapins = measure.tapins || (measure.tapins = {}));
            })(measure = shape.measure || (shape.measure = {}));
        })(shape = shapes.shape || (shapes.shape = {}));
    })(shapes = minerva.shapes || (minerva.shapes = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var shapes;
    (function (shapes) {
        var shape;
        (function (shape) {
            var processup;
            (function (processup) {
                var tapins;
                (function (tapins) {
                    function calcExtents(input, state, output, tree) {
                        if ((input.dirtyFlags & minerva.DirtyFlags.Bounds) === 0)
                            return true;
                        output.extents.x = output.extents.y = 0;
                        minerva.Size.copyTo(state.actualSize, output.extents);
                        minerva.Rect.copyTo(output.extents, output.extentsWithChildren);
                        return true;
                    }
                    tapins.calcExtents = calcExtents;
                })(tapins = processup.tapins || (processup.tapins = {}));
            })(processup = shape.processup || (shape.processup = {}));
        })(shape = shapes.shape || (shapes.shape = {}));
    })(shapes = minerva.shapes || (minerva.shapes = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var shapes;
    (function (shapes) {
        var shape;
        (function (shape) {
            var processup;
            (function (processup) {
                var tapins;
                (function (tapins) {
                    function calcShapeRect(input, state, output, tree) {
                        if ((input.dirtyFlags & minerva.DirtyFlags.Bounds) === 0)
                            return true;
                        var sr = output.shapeRect;
                        sr.x = sr.y = 0;
                        minerva.Size.copyTo(state.actualSize, sr);
                        output.shapeFlags = minerva.ShapeFlags.Empty;
                        if (minerva.Rect.isEmpty(sr))
                            return true;
                        var t = !!input.stroke ? input.strokeThickness : 0.0;
                        if (t >= sr.width || t >= sr.height) {
                            sr.width = Math.max(sr.width, t + t * 0.001);
                            sr.height = Math.max(sr.height, t + t * 0.001);
                            output.shapeFlags = minerva.ShapeFlags.Degenerate;
                        }
                        else {
                            output.shapeFlags = minerva.ShapeFlags.Normal;
                        }
                        var ht = t / 2;
                        minerva.Rect.shrink(sr, ht, ht, ht, ht);
                        return true;
                    }
                    tapins.calcShapeRect = calcShapeRect;
                })(tapins = processup.tapins || (processup.tapins = {}));
            })(processup = shape.processup || (shape.processup = {}));
        })(shape = shapes.shape || (shapes.shape = {}));
    })(shapes = minerva.shapes || (minerva.shapes = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var shapes;
    (function (shapes) {
        var shape;
        (function (shape) {
            var render;
            (function (render) {
                var tapins;
                (function (tapins) {
                    function calcShouldDraw(input, state, output, ctx, region) {
                        state.shouldDraw = false;
                        if (input.shapeFlags === minerva.ShapeFlags.Empty)
                            return true;
                        if (!input.fill && !input.stroke)
                            return true;
                        state.shouldDraw = true;
                        return true;
                    }
                    tapins.calcShouldDraw = calcShouldDraw;
                })(tapins = render.tapins || (render.tapins = {}));
            })(render = shape.render || (shape.render = {}));
        })(shape = shapes.shape || (shapes.shape = {}));
    })(shapes = minerva.shapes || (minerva.shapes = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var shapes;
    (function (shapes) {
        var shape;
        (function (shape) {
            var render;
            (function (render) {
                var tapins;
                (function (tapins) {
                    function doRender(input, state, output, ctx, region) {
                        if (!state.shouldDraw)
                            return true;
                        return true;
                    }
                    tapins.doRender = doRender;
                })(tapins = render.tapins || (render.tapins = {}));
            })(render = shape.render || (shape.render = {}));
        })(shape = shapes.shape || (shapes.shape = {}));
    })(shapes = minerva.shapes || (minerva.shapes = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var shapes;
    (function (shapes) {
        var shape;
        (function (shape) {
            var render;
            (function (render) {
                var tapins;
                (function (tapins) {
                    function fill(input, state, output, ctx, region) {
                        if (!state.shouldDraw)
                            return true;
                        if (input.fill)
                            ctx.fillEx(input.fill, input.shapeRect, input.fillRule);
                        return true;
                    }
                    tapins.fill = fill;
                })(tapins = render.tapins || (render.tapins = {}));
            })(render = shape.render || (shape.render = {}));
        })(shape = shapes.shape || (shapes.shape = {}));
    })(shapes = minerva.shapes || (minerva.shapes = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var shapes;
    (function (shapes) {
        var shape;
        (function (shape) {
            var render;
            (function (render) {
                var tapins;
                (function (tapins) {
                    function finishDraw(input, state, output, ctx, region) {
                        if (!state.shouldDraw)
                            return true;
                        ctx.restore();
                        return true;
                    }
                    tapins.finishDraw = finishDraw;
                })(tapins = render.tapins || (render.tapins = {}));
            })(render = shape.render || (shape.render = {}));
        })(shape = shapes.shape || (shapes.shape = {}));
    })(shapes = minerva.shapes || (minerva.shapes = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var shapes;
    (function (shapes) {
        var shape;
        (function (shape) {
            var render;
            (function (render) {
                var tapins;
                (function (tapins) {
                    function prepareDraw(input, state, output, ctx, region, tree) {
                        if (!state.shouldDraw)
                            return true;
                        ctx.save();
                        minerva.core.helpers.renderLayoutClip(ctx, input, tree);
                        return true;
                    }
                    tapins.prepareDraw = prepareDraw;
                })(tapins = render.tapins || (render.tapins = {}));
            })(render = shape.render || (shape.render = {}));
        })(shape = shapes.shape || (shapes.shape = {}));
    })(shapes = minerva.shapes || (minerva.shapes = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var shapes;
    (function (shapes) {
        var shape;
        (function (shape) {
            var render;
            (function (render) {
                var tapins;
                (function (tapins) {
                    var caps = [
                        "butt",
                        "square",
                        "round",
                        "butt"
                    ];
                    var joins = [
                        "miter",
                        "bevel",
                        "round"
                    ];
                    function stroke(input, state, output, ctx, region) {
                        if (!state.shouldDraw)
                            return true;
                        var stroke = input.stroke;
                        if (!stroke || !(input.strokeThickness > 0))
                            return true;
                        var raw = ctx.raw;
                        raw.lineWidth = input.strokeThickness;
                        raw.lineCap = caps[input.strokeStartLineCap || input.strokeEndLineCap || 0] || caps[0];
                        raw.lineJoin = joins[input.strokeLineJoin || 0] || joins[0];
                        raw.miterLimit = input.strokeMiterLimit;
                        stroke.setupBrush(raw, input.shapeRect);
                        raw.strokeStyle = stroke.toHtml5Object();
                        raw.stroke();
                        return true;
                    }
                    tapins.stroke = stroke;
                })(tapins = render.tapins || (render.tapins = {}));
            })(render = shape.render || (shape.render = {}));
        })(shape = shapes.shape || (shapes.shape = {}));
    })(shapes = minerva.shapes || (minerva.shapes = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var controls;
    (function (controls) {
        var border;
        (function (border) {
            var render;
            (function (render) {
                var tapins;
                (function (tapins) {
                    var shim;
                    (function (shim) {
                        function calcBalanced(input, state, output, ctx, region, tree) {
                            if (!state.shouldRender || minerva.Thickness.isEmpty(input.borderThickness))
                                return true;
                            if (minerva.Thickness.isBalanced(input.borderThickness)) {
                                var icr = state.innerCornerRadius;
                                var ocr = state.outerCornerRadius;
                                var mcr = state.middleCornerRadius;
                                mcr.topLeft = (icr.topLeft + ocr.topLeft) / 2.0;
                                mcr.topRight = (icr.topRight + ocr.topRight) / 2.0;
                                mcr.bottomRight = (icr.bottomRight + ocr.bottomRight) / 2.0;
                                mcr.bottomLeft = (icr.bottomLeft + ocr.bottomLeft) / 2.0;
                                minerva.Rect.copyTo(input.extents, state.strokeExtents);
                                var bt = input.borderThickness;
                                minerva.Rect.shrink(state.strokeExtents, bt.left / 2.0, bt.top / 2.0, bt.right / 2.0, bt.bottom / 2.0);
                            }
                            return true;
                        }
                        shim.calcBalanced = calcBalanced;
                    })(shim = tapins.shim || (tapins.shim = {}));
                })(tapins = render.tapins || (render.tapins = {}));
            })(render = border.render || (border.render = {}));
        })(border = controls.border || (controls.border = {}));
    })(controls = minerva.controls || (minerva.controls = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var controls;
    (function (controls) {
        var border;
        (function (border) {
            var render;
            (function (render) {
                var tapins;
                (function (tapins) {
                    var shim;
                    (function (shim) {
                        function createPattern(input, state, output, ctx, region, tree) {
                            if (!state.shouldRender || minerva.Thickness.isBalanced(input.borderThickness))
                                return true;
                            if (!state.pattern) {
                                state.pattern = createBorderPattern(input.borderBrush, input.extents, state.fillExtents, state.outerCornerRadius, state.innerCornerRadius);
                            }
                            return true;
                        }
                        shim.createPattern = createPattern;
                        var tempCtx;
                        function createBorderPattern(borderBrush, extents, fillExtents, oa, ia) {
                            tempCtx = tempCtx || new minerva.core.render.RenderContext(document.createElement('canvas').getContext('2d'));
                            var raw = tempCtx.raw;
                            minerva.Size.copyTo(extents, raw.canvas);
                            raw.beginPath();
                            render.helpers.drawBorderRect(raw, extents, oa);
                            tempCtx.fillEx(borderBrush, extents);
                            raw.globalCompositeOperation = "xor";
                            raw.beginPath();
                            render.helpers.drawBorderRect(raw, fillExtents, ia);
                            raw.fill();
                            return raw.createPattern(raw.canvas, "no-repeat");
                        }
                    })(shim = tapins.shim || (tapins.shim = {}));
                })(tapins = render.tapins || (render.tapins = {}));
            })(render = border.render || (border.render = {}));
        })(border = controls.border || (controls.border = {}));
    })(controls = minerva.controls || (minerva.controls = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var controls;
    (function (controls) {
        var border;
        (function (border) {
            var render;
            (function (render) {
                var tapins;
                (function (tapins) {
                    var shim;
                    (function (shim) {
                        function doRender(input, state, output, ctx, region, tree) {
                            if (!state.shouldRender)
                                return true;
                            ctx.save();
                            minerva.core.helpers.renderLayoutClip(ctx, input, tree);
                            if (input.background)
                                renderBackground(ctx, input, state);
                            if (state.pattern) {
                                renderPattern(ctx, input, state);
                            }
                            else if (input.borderBrush) {
                                renderBorder(ctx, input, state);
                            }
                            ctx.restore();
                            return true;
                        }
                        shim.doRender = doRender;
                        function renderPattern(ctx, input, state) {
                            var raw = ctx.raw;
                            raw.beginPath();
                            raw.fillStyle = state.pattern;
                            render.helpers.drawBorderRect(raw, input.extents, state.outerCornerRadius);
                            raw.fill();
                        }
                        function renderBackground(ctx, input, state) {
                            ctx.raw.beginPath();
                            render.helpers.drawBorderRect(ctx.raw, state.fillExtents, state.innerCornerRadius);
                            ctx.fillEx(input.background, state.fillExtents);
                        }
                        function renderBorder(ctx, input, state) {
                            var raw = ctx.raw;
                            raw.beginPath();
                            render.helpers.drawBorderRect(raw, state.strokeExtents, state.middleCornerRadius);
                            raw.lineWidth = input.borderThickness.left;
                            raw.lineCap = "butt";
                            raw.lineJoin = "miter";
                            raw.miterLimit = 0;
                            input.borderBrush.setupBrush(raw, state.strokeExtents);
                            raw.strokeStyle = input.borderBrush.toHtml5Object();
                            raw.stroke();
                        }
                    })(shim = tapins.shim || (tapins.shim = {}));
                })(tapins = render.tapins || (render.tapins = {}));
            })(render = border.render || (border.render = {}));
        })(border = controls.border || (controls.border = {}));
    })(controls = minerva.controls || (minerva.controls = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var controls;
    (function (controls) {
        var border;
        (function (border) {
            var render;
            (function (render) {
                var tapins;
                (function (tapins) {
                    var shim;
                    (function (shim) {
                        function invalidatePattern(input, state, output, ctx, region, tree) {
                            if (!state.shouldRender)
                                return true;
                            if (minerva.Thickness.isEmpty(input.borderThickness)) {
                                state.pattern = null;
                                return true;
                            }
                            if (!state.oldMetrics) {
                                state.oldMetrics = {};
                                setOldMetrics(input, state, state.oldMetrics);
                                state.pattern = null;
                                return true;
                            }
                            if (didMetricsChange(input, state, state.oldMetrics))
                                state.pattern = null;
                            setOldMetrics(input, state, state.oldMetrics);
                            return true;
                        }
                        shim.invalidatePattern = invalidatePattern;
                        function setOldMetrics(input, state, metrics) {
                            metrics.borderBrush = input.borderBrush;
                            metrics.borderThickness = input.borderThickness;
                            metrics.extents = input.extents;
                            metrics.fillExtents = state.fillExtents;
                            metrics.outerCornerRadius = state.outerCornerRadius;
                            metrics.innerCornerRadius = state.innerCornerRadius;
                        }
                        function didMetricsChange(input, state, metrics) {
                            return metrics.borderBrush !== input.borderBrush
                                || !minerva.Rect.isEqual(metrics.extents, input.extents)
                                || !minerva.Rect.isEqual(metrics.fillExtents, state.fillExtents)
                                || !minerva.CornerRadius.isEqual(metrics.outerCornerRadius, state.outerCornerRadius)
                                || !minerva.CornerRadius.isEqual(metrics.innerCornerRadius, state.innerCornerRadius);
                        }
                    })(shim = tapins.shim || (tapins.shim = {}));
                })(tapins = render.tapins || (render.tapins = {}));
            })(render = border.render || (border.render = {}));
        })(border = controls.border || (controls.border = {}));
    })(controls = minerva.controls || (minerva.controls = {}));
})(minerva || (minerva = {}));
/// <reference path="../core/Updater" />
var minerva;
(function (minerva) {
    var anon;
    (function (anon) {
        var AnonymousUpdater = (function (_super) {
            __extends(AnonymousUpdater, _super);
            function AnonymousUpdater() {
                _super.apply(this, arguments);
            }
            AnonymousUpdater.prototype.init = function () {
                this.setMeasurePipe(new anon.measure.AnonymousMeasurePipeDef(this))
                    .setArrangePipe(new anon.arrange.AnonymousArrangePipeDef(this));
                _super.prototype.init.call(this);
            };
            AnonymousUpdater.prototype.measureOverride = function (availableSize) {
                return availableSize;
            };
            AnonymousUpdater.prototype.arrangeOverride = function (arrangeSize) {
                return arrangeSize;
            };
            return AnonymousUpdater;
        })(minerva.core.Updater);
        anon.AnonymousUpdater = AnonymousUpdater;
    })(anon = minerva.anon || (minerva.anon = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var engine;
    (function (engine) {
        var fontCtx = null;
        var hitTestCtx = null;
        var Surface = (function () {
            function Surface() {
                this.$$layout = new minerva.core.draft.DraftPipeDef();
                this.$$canvas = null;
                this.$$ctx = null;
                this.$$layers = [];
                this.$$prerenderhooks = [];
                this.$$downDirty = [];
                this.$$upDirty = [];
                this.$$dirtyRegion = null;
                this.$$width = 0;
                this.$$height = 0;
            }
            Object.defineProperty(Surface.prototype, "width", {
                get: function () {
                    return this.$$width;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Surface.prototype, "height", {
                get: function () {
                    return this.$$height;
                },
                enumerable: true,
                configurable: true
            });
            Surface.prototype.init = function (canvas) {
                this.$$canvas = canvas;
                this.$$ctx = new minerva.core.render.RenderContext(canvas.getContext('2d', { alpha: false }));
            };
            Surface.prototype.attachLayer = function (layer, root) {
                if (root === true)
                    this.$$layers.unshift(layer);
                else
                    this.$$layers.push(layer);
                layer.tree.isTop = true;
                layer.invalidateMeasure();
                layer.fullInvalidate();
                layer.setSurface(this);
            };
            Surface.prototype.detachLayer = function (layer) {
                layer.tree.isTop = false;
                layer.setSurface(null);
                var index = this.$$layers.indexOf(layer);
                if (index > -1)
                    this.$$layers.splice(index, 1);
                this.invalidate(layer.assets.surfaceBoundsWithChildren);
            };
            Surface.prototype.walkLayers = function (reverse) {
                var layers = this.$$layers;
                var i = -1;
                if (reverse === true) {
                    i = layers.length;
                    return {
                        current: undefined,
                        step: function () {
                            i--;
                            this.current = layers[i];
                            return this.current !== undefined;
                        }
                    };
                }
                else {
                    return {
                        current: undefined,
                        step: function () {
                            i++;
                            this.current = layers[i];
                            return this.current !== undefined;
                        }
                    };
                }
            };
            Surface.prototype.updateBounds = function () {
            };
            Surface.prototype.invalidate = function (region) {
                region = region || new minerva.Rect(0, 0, this.width, this.height);
                if (!this.$$dirtyRegion)
                    this.$$dirtyRegion = new minerva.Rect(region.x, region.y, region.width, region.height);
                else
                    minerva.Rect.union(this.$$dirtyRegion, region);
            };
            Surface.prototype.render = function () {
                for (var i = 0, hooks = this.$$prerenderhooks; i < hooks.length; i++) {
                    hooks[i].preRender();
                }
                var region = this.$$dirtyRegion;
                if (!region || minerva.Rect.isEmpty(region))
                    return;
                this.$$dirtyRegion = null;
                minerva.Rect.roundOut(region);
                var ctx = this.$$ctx;
                ctx.size.commitResize();
                ctx.save();
                ctx.applyDpiRatio();
                ctx.raw.fillStyle = "#ffffff";
                ctx.raw.fillRect(region.x, region.y, region.width, region.height);
                ctx.clipRect(region);
                for (var layers = this.$$layers, i = 0, len = layers.length; i < len; i++) {
                    layers[i].render(ctx, region);
                }
                ctx.restore();
            };
            Surface.prototype.hookPrerender = function (updater) {
                this.$$prerenderhooks.push(updater);
            };
            Surface.prototype.unhookPrerender = function (updater) {
                var index = this.$$prerenderhooks.indexOf(updater);
                if (index > -1) {
                    this.$$prerenderhooks.splice(index, 1);
                }
            };
            Surface.prototype.addUpDirty = function (updater) {
                this.$$upDirty.push(updater);
            };
            Surface.prototype.addDownDirty = function (updater) {
                this.$$downDirty.push(updater);
            };
            Surface.prototype.updateLayout = function () {
                var pass = {
                    count: 0,
                    maxCount: 250,
                    updater: null,
                    assets: null,
                    tree: null,
                    flag: minerva.UIFlags.None,
                    measureList: [],
                    arrangeList: [],
                    sizingList: [],
                    surfaceSize: new minerva.Size(this.width, this.height),
                    sizingUpdates: []
                };
                var updated = false;
                var layersUpdated = true;
                while (pass.count < pass.maxCount && layersUpdated) {
                    layersUpdated = engine.draft(this.$$layers, this.$$layout, pass);
                    updated = engine.process(this.$$downDirty, this.$$upDirty) || layersUpdated || updated;
                }
                if (pass.count >= pass.maxCount) {
                    console.error("[MINERVA] Aborting infinite update loop");
                }
                return updated;
            };
            Surface.prototype.resize = function (width, height) {
                if (this.$$width === width && this.$$height === height)
                    return;
                var region = new minerva.Rect(0, 0, this.$$width, this.$$height);
                minerva.Rect.union(region, new minerva.Rect(0, 0, width, height));
                minerva.Rect.roundOut(region);
                this.$$width = width;
                this.$$height = height;
                this.$$ctx.size.queueResize(width, height);
                this.invalidate(region);
                for (var layers = this.$$layers, i = 0; i < layers.length; i++) {
                    layers[i].invalidateMeasure();
                }
            };
            Surface.prototype.hitTest = function (pos) {
                if (this.$$layers.length < 1)
                    return null;
                hitTestCtx = hitTestCtx || new minerva.core.render.RenderContext(document.createElement('canvas').getContext('2d'));
                hitTestCtx.size
                    .queueResize(this.width, this.height)
                    .commitResize();
                var list = [];
                for (var layers = this.$$layers, i = layers.length - 1; i >= 0 && list.length === 0; i--) {
                    layers[i].hitTest(pos, list, hitTestCtx, false);
                }
                return list;
            };
            Surface.prototype.updateDpiRatio = function () {
                if (this.$$ctx.size.updateDpiRatio())
                    this.invalidate();
            };
            Surface.measureWidth = function (text, font) {
                fontCtx = fontCtx || document.createElement('canvas').getContext('2d');
                fontCtx.font = font.toHtml5Object();
                return fontCtx.measureText(text).width;
            };
            return Surface;
        })();
        engine.Surface = Surface;
    })(engine = minerva.engine || (minerva.engine = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var engine;
    (function (engine) {
        function draft(layers, draftPipe, pass) {
            var updated = false;
            for (var i = 0, len = layers.length; i < len; i++) {
                pass.updater = layers[i];
                if ((pass.updater.assets.uiFlags & minerva.UIFlags.Hints) === 0)
                    continue;
                pass.tree = pass.updater.tree;
                pass.assets = pass.updater.assets;
                while (pass.count < pass.maxCount) {
                    if (!draftPipe.run(pass))
                        break;
                    updated = true;
                    pass.count++;
                }
            }
            return updated;
        }
        engine.draft = draft;
    })(engine = minerva.engine || (minerva.engine = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var engine;
    (function (engine) {
        function process(down, up) {
            var updated = down.length > 0 || up.length > 0;
            processDown(down);
            processUp(up);
            return updated;
        }
        engine.process = process;
        function processDown(list) {
            for (var updater; (updater = list[0]) != null;) {
                if (updater.processDown()) {
                    list.shift();
                }
                else {
                    list.push(list.shift());
                }
            }
            if (list.length > 0) {
                console.warn("[MINERVA] Finished DownDirty pass, not empty.");
            }
        }
        function processUp(list) {
            for (var updater; (updater = list[0]) != null;) {
                var childIndex = updater.findChildInList(list);
                if (childIndex > -1) {
                    list.splice(childIndex + 1, 0, list.shift());
                }
                else if (updater.processUp()) {
                    list.shift();
                }
            }
            if (list.length > 0) {
                console.warn("[MINERVA] Finished UpDirty pass, not empty.");
            }
        }
    })(engine = minerva.engine || (minerva.engine = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var FLOAT_EPSILON = 0.000001;
    var createTypedArray;
    if (typeof Float32Array !== "undefined") {
        createTypedArray = function (length) {
            return new Float32Array(length);
        };
    }
    else {
        createTypedArray = function (length) {
            return new Array(length);
        };
    }
    minerva.mat3 = {
        create: function (src) {
            var dest = createTypedArray(6);
            if (src) {
                dest[0] = src[0];
                dest[1] = src[1];
                dest[2] = src[2];
                dest[3] = src[3];
                dest[4] = src[4];
                dest[5] = src[5];
            }
            else {
                dest[0] = dest[1] = dest[2] = dest[3] = dest[4] = dest[5] = 0;
            }
            return dest;
        },
        copyTo: function (src, dest) {
            dest[0] = src[0];
            dest[1] = src[1];
            dest[2] = src[2];
            dest[3] = src[3];
            dest[4] = src[4];
            dest[5] = src[5];
            return dest;
        },
        init: function (dest, m11, m12, m21, m22, x0, y0) {
            dest[0] = m11;
            dest[1] = m12;
            dest[2] = m21;
            dest[3] = m22;
            dest[4] = x0;
            dest[5] = y0;
            return dest;
        },
        identity: function (dest) {
            if (!dest)
                dest = minerva.mat3.create();
            dest[0] = 1;
            dest[1] = 0;
            dest[2] = 0;
            dest[3] = 1;
            dest[4] = 0;
            dest[5] = 0;
            return dest;
        },
        equal: function (a, b) {
            return a === b || (Math.abs(a[0] - b[0]) < FLOAT_EPSILON &&
                Math.abs(a[1] - b[1]) < FLOAT_EPSILON &&
                Math.abs(a[2] - b[2]) < FLOAT_EPSILON &&
                Math.abs(a[3] - b[3]) < FLOAT_EPSILON &&
                Math.abs(a[4] - b[4]) < FLOAT_EPSILON &&
                Math.abs(a[5] - b[5]) < FLOAT_EPSILON);
        },
        multiply: function (a, b, dest) {
            if (!dest)
                dest = a;
            var a11 = a[0], a12 = a[1], a21 = a[2], a22 = a[3], ax0 = a[4], ay0 = a[5], b11 = b[0], b12 = b[1], b21 = b[2], b22 = b[3], bx0 = b[4], by0 = b[5];
            dest[0] = a11 * b11 + a12 * b21;
            dest[1] = a11 * b12 + a12 * b22;
            dest[2] = a21 * b11 + a22 * b21;
            dest[3] = a21 * b12 + a22 * b22;
            dest[4] = ax0 * b11 + ay0 * b21 + bx0;
            dest[5] = ax0 * b12 + ay0 * b22 + by0;
            return dest;
        },
        inverse: function (mat, dest) {
            if (Math.abs(mat[1]) < FLOAT_EPSILON && Math.abs(mat[2]) < FLOAT_EPSILON)
                return simple_inverse(mat, dest);
            else
                return complex_inverse(mat, dest);
        },
        transformVec2: function (mat, vec, dest) {
            if (!dest)
                dest = vec;
            var x = vec[0], y = vec[1];
            dest[0] = (mat[0] * x) + (mat[2] * y) + mat[4];
            dest[1] = (mat[1] * x) + (mat[3] * y) + mat[5];
            return dest;
        },
        createTranslate: function (x, y, dest) {
            if (!dest)
                dest = minerva.mat3.create();
            dest[0] = 1;
            dest[1] = 0;
            dest[2] = 0;
            dest[3] = 1;
            dest[4] = x;
            dest[5] = y;
            return dest;
        },
        translate: function (mat, x, y) {
            mat[4] += x;
            mat[5] += y;
            return mat;
        },
        createScale: function (sx, sy, dest) {
            if (!dest)
                dest = minerva.mat3.create();
            dest[0] = sx;
            dest[1] = 0;
            dest[2] = 0;
            dest[3] = sy;
            dest[4] = 0;
            dest[5] = 0;
            return dest;
        },
        scale: function (mat, sx, sy) {
            mat[0] *= sx;
            mat[2] *= sx;
            mat[4] *= sx;
            mat[1] *= sy;
            mat[3] *= sy;
            mat[5] *= sy;
            return mat;
        },
        createRotate: function (angleRad, dest) {
            if (!dest)
                dest = minerva.mat3.create();
            var c = Math.cos(angleRad);
            var s = Math.sin(angleRad);
            dest[0] = c;
            dest[1] = s;
            dest[2] = -s;
            dest[3] = c;
            dest[4] = 0;
            dest[5] = 0;
            return dest;
        },
        createSkew: function (angleRadX, angleRadY, dest) {
            if (!dest)
                dest = minerva.mat3.create();
            dest[0] = 1;
            dest[1] = Math.tan(angleRadY);
            dest[2] = Math.tan(angleRadX);
            dest[3] = 1;
            dest[4] = 0;
            dest[5] = 0;
            return dest;
        },
        preapply: function (dest, mat) {
            return minerva.mat3.multiply(mat, dest, dest);
        },
        apply: function (dest, mat) {
            return minerva.mat3.multiply(dest, mat, dest);
        }
    };
    function simple_inverse(mat, dest) {
        var m11 = mat[0];
        if (Math.abs(m11) < FLOAT_EPSILON)
            return null;
        var m22 = mat[3];
        if (Math.abs(m22) < FLOAT_EPSILON)
            return null;
        if (!dest) {
            dest = mat;
        }
        else {
            dest[1] = mat[1];
            dest[2] = mat[2];
        }
        var x0 = -mat[4];
        var y0 = -mat[5];
        if (Math.abs(m11 - 1) > FLOAT_EPSILON) {
            m11 = 1 / m11;
            x0 *= m11;
        }
        if (Math.abs(m22 - 1) > FLOAT_EPSILON) {
            m22 = 1 / m22;
            y0 *= m22;
        }
        dest[0] = m11;
        dest[3] = m22;
        dest[4] = x0;
        dest[5] = y0;
        return dest;
    }
    function complex_inverse(mat, dest) {
        if (!dest)
            dest = mat;
        var m11 = mat[0], m12 = mat[1], m21 = mat[2], m22 = mat[3];
        var det = m11 * m22 - m12 * m21;
        if (det === 0 || !isFinite(det))
            return null;
        var id = 1 / det;
        var x0 = mat[4], y0 = mat[5];
        dest[0] = m22 * id;
        dest[1] = -m12 * id;
        dest[2] = -m21 * id;
        dest[3] = m11 * id;
        dest[4] = (m21 * y0 - m22 * x0) * id;
        dest[5] = (m12 * x0 - m11 * y0) * id;
        return dest;
    }
})(minerva || (minerva = {}));
var mat3 = minerva.mat3;
var minerva;
(function (minerva) {
    var Indexes;
    (function (Indexes) {
        Indexes[Indexes["M11"] = 0] = "M11";
        Indexes[Indexes["M12"] = 1] = "M12";
        Indexes[Indexes["M13"] = 2] = "M13";
        Indexes[Indexes["M14"] = 3] = "M14";
        Indexes[Indexes["M21"] = 4] = "M21";
        Indexes[Indexes["M22"] = 5] = "M22";
        Indexes[Indexes["M23"] = 6] = "M23";
        Indexes[Indexes["M24"] = 7] = "M24";
        Indexes[Indexes["M31"] = 8] = "M31";
        Indexes[Indexes["M32"] = 9] = "M32";
        Indexes[Indexes["M33"] = 10] = "M33";
        Indexes[Indexes["M34"] = 11] = "M34";
        Indexes[Indexes["OffsetX"] = 12] = "OffsetX";
        Indexes[Indexes["OffsetY"] = 13] = "OffsetY";
        Indexes[Indexes["OffsetZ"] = 14] = "OffsetZ";
        Indexes[Indexes["M44"] = 15] = "M44";
    })(Indexes || (Indexes = {}));
    var FLOAT_EPSILON = 0.000001;
    var createTypedArray;
    if (typeof Float32Array !== "undefined") {
        createTypedArray = function (length) {
            return new Float32Array(length);
        };
    }
    else {
        createTypedArray = function (length) {
            return new Array(length);
        };
    }
    minerva.mat4 = {
        create: function (src) {
            var dest = createTypedArray(16);
            if (src) {
                dest[Indexes.M11] = src[Indexes.M11];
                dest[Indexes.M12] = src[Indexes.M12];
                dest[Indexes.M13] = src[Indexes.M13];
                dest[Indexes.M14] = src[Indexes.M14];
                dest[Indexes.M21] = src[Indexes.M21];
                dest[Indexes.M22] = src[Indexes.M22];
                dest[Indexes.M23] = src[Indexes.M23];
                dest[Indexes.M24] = src[Indexes.M24];
                dest[Indexes.M31] = src[Indexes.M31];
                dest[Indexes.M32] = src[Indexes.M32];
                dest[Indexes.M33] = src[Indexes.M33];
                dest[Indexes.M34] = src[Indexes.M34];
                dest[Indexes.OffsetX] = src[Indexes.OffsetX];
                dest[Indexes.OffsetY] = src[Indexes.OffsetY];
                dest[Indexes.OffsetZ] = src[Indexes.OffsetZ];
                dest[Indexes.M44] = src[Indexes.M44];
            }
            return dest;
        },
        copyTo: function (src, dest) {
            dest[Indexes.M11] = src[Indexes.M11];
            dest[Indexes.M12] = src[Indexes.M12];
            dest[Indexes.M13] = src[Indexes.M13];
            dest[Indexes.M14] = src[Indexes.M14];
            dest[Indexes.M21] = src[Indexes.M21];
            dest[Indexes.M22] = src[Indexes.M22];
            dest[Indexes.M23] = src[Indexes.M23];
            dest[Indexes.M24] = src[Indexes.M24];
            dest[Indexes.M31] = src[Indexes.M31];
            dest[Indexes.M32] = src[Indexes.M32];
            dest[Indexes.M33] = src[Indexes.M33];
            dest[Indexes.M34] = src[Indexes.M34];
            dest[Indexes.OffsetX] = src[Indexes.OffsetX];
            dest[Indexes.OffsetY] = src[Indexes.OffsetY];
            dest[Indexes.OffsetZ] = src[Indexes.OffsetZ];
            dest[Indexes.M44] = src[Indexes.M44];
            return dest;
        },
        identity: function (dest) {
            if (!dest)
                dest = minerva.mat4.create();
            dest[Indexes.M11] = 1;
            dest[Indexes.M12] = 0;
            dest[Indexes.M13] = 0;
            dest[Indexes.M14] = 0;
            dest[Indexes.M21] = 0;
            dest[Indexes.M22] = 1;
            dest[Indexes.M23] = 0;
            dest[Indexes.M24] = 0;
            dest[Indexes.M31] = 0;
            dest[Indexes.M32] = 0;
            dest[Indexes.M33] = 1;
            dest[Indexes.M34] = 0;
            dest[Indexes.OffsetX] = 0;
            dest[Indexes.OffsetY] = 0;
            dest[Indexes.OffsetZ] = 0;
            dest[Indexes.M44] = 1;
            return dest;
        },
        equal: function (a, b) {
            return a === b || (Math.abs(a[Indexes.M11] - b[Indexes.M11]) < FLOAT_EPSILON &&
                Math.abs(a[Indexes.M12] - b[Indexes.M12]) < FLOAT_EPSILON &&
                Math.abs(a[Indexes.M13] - b[Indexes.M13]) < FLOAT_EPSILON &&
                Math.abs(a[Indexes.M14] - b[Indexes.M14]) < FLOAT_EPSILON &&
                Math.abs(a[Indexes.M21] - b[Indexes.M21]) < FLOAT_EPSILON &&
                Math.abs(a[Indexes.M22] - b[Indexes.M22]) < FLOAT_EPSILON &&
                Math.abs(a[Indexes.M23] - b[Indexes.M23]) < FLOAT_EPSILON &&
                Math.abs(a[Indexes.M24] - b[Indexes.M24]) < FLOAT_EPSILON &&
                Math.abs(a[Indexes.M31] - b[Indexes.M31]) < FLOAT_EPSILON &&
                Math.abs(a[Indexes.M32] - b[Indexes.M32]) < FLOAT_EPSILON &&
                Math.abs(a[Indexes.M33] - b[Indexes.M33]) < FLOAT_EPSILON &&
                Math.abs(a[Indexes.M34] - b[Indexes.M34]) < FLOAT_EPSILON &&
                Math.abs(a[Indexes.OffsetX] - b[Indexes.OffsetX]) < FLOAT_EPSILON &&
                Math.abs(a[Indexes.OffsetY] - b[Indexes.OffsetY]) < FLOAT_EPSILON &&
                Math.abs(a[Indexes.OffsetZ] - b[Indexes.OffsetZ]) < FLOAT_EPSILON &&
                Math.abs(a[Indexes.M44] - b[Indexes.M44]) < FLOAT_EPSILON);
        },
        multiply: function (a, b, dest) {
            if (!dest)
                dest = a;
            var m11 = a[Indexes.M11], m12 = a[Indexes.M12], m13 = a[Indexes.M13], m14 = a[Indexes.M14], m21 = a[Indexes.M21], m22 = a[Indexes.M22], m23 = a[Indexes.M23], m24 = a[Indexes.M24], m31 = a[Indexes.M31], m32 = a[Indexes.M32], m33 = a[Indexes.M33], m34 = a[Indexes.M34], mx0 = a[Indexes.OffsetX], my0 = a[Indexes.OffsetY], mz0 = a[Indexes.OffsetZ], m44 = a[Indexes.M44];
            var n11 = b[Indexes.M11], n12 = b[Indexes.M12], n13 = b[Indexes.M13], n14 = b[Indexes.M14], n21 = b[Indexes.M21], n22 = b[Indexes.M22], n23 = b[Indexes.M23], n24 = b[Indexes.M24], n31 = b[Indexes.M31], n32 = b[Indexes.M32], n33 = b[Indexes.M33], n34 = b[Indexes.M34], nx0 = b[Indexes.OffsetX], ny0 = b[Indexes.OffsetY], nz0 = b[Indexes.OffsetZ], n44 = b[Indexes.M44];
            dest[Indexes.M11] = m11 * n11 + m12 * n21 + m13 * n31 + m14 * nx0;
            dest[Indexes.M12] = m11 * n12 + m12 * n22 + m13 * n32 + m14 * ny0;
            dest[Indexes.M13] = m11 * n13 + m12 * n23 + m13 * n33 + m14 * nz0;
            dest[Indexes.M14] = m11 * n14 + m12 * n24 + m13 * n34 + m14 * n44;
            dest[Indexes.M21] = m21 * n11 + m22 * n21 + m23 * n31 + m24 * nx0;
            dest[Indexes.M22] = m21 * n12 + m22 * n22 + m23 * n32 + m24 * ny0;
            dest[Indexes.M23] = m21 * n13 + m22 * n23 + m23 * n33 + m24 * nz0;
            dest[Indexes.M24] = m21 * n14 + m22 * n24 + m23 * n34 + m24 * n44;
            dest[Indexes.M31] = m31 * n11 + m32 * n21 + m33 * n31 + m34 * nx0;
            dest[Indexes.M32] = m31 * n12 + m32 * n22 + m33 * n32 + m34 * ny0;
            dest[Indexes.M33] = m31 * n13 + m32 * n23 + m33 * n33 + m34 * nz0;
            dest[Indexes.M34] = m31 * n14 + m32 * n24 + m33 * n34 + m34 * n44;
            dest[Indexes.OffsetX] = mx0 * n11 + my0 * n21 + mz0 * n31 + m44 * nx0;
            dest[Indexes.OffsetY] = mx0 * n12 + my0 * n22 + mz0 * n32 + m44 * ny0;
            dest[Indexes.OffsetZ] = mx0 * n13 + my0 * n23 + mz0 * n33 + m44 * nz0;
            dest[Indexes.M44] = mx0 * n14 + my0 * n24 + mz0 * n34 + m44 * n44;
            return dest;
        },
        inverse: function (mat, dest) {
            if (!dest)
                dest = mat;
            var a00 = mat[Indexes.M11], a01 = mat[Indexes.M12], a02 = mat[Indexes.M13], a03 = mat[Indexes.M14], a10 = mat[Indexes.M21], a11 = mat[Indexes.M22], a12 = mat[Indexes.M23], a13 = mat[Indexes.M24], a20 = mat[Indexes.M31], a21 = mat[Indexes.M32], a22 = mat[Indexes.M33], a23 = mat[Indexes.M34], a30 = mat[Indexes.OffsetX], a31 = mat[Indexes.OffsetY], a32 = mat[Indexes.OffsetZ], a33 = mat[Indexes.M44], b00 = a00 * a11 - a01 * a10, b01 = a00 * a12 - a02 * a10, b02 = a00 * a13 - a03 * a10, b03 = a01 * a12 - a02 * a11, b04 = a01 * a13 - a03 * a11, b05 = a02 * a13 - a03 * a12, b06 = a20 * a31 - a21 * a30, b07 = a20 * a32 - a22 * a30, b08 = a20 * a33 - a23 * a30, b09 = a21 * a32 - a22 * a31, b10 = a21 * a33 - a23 * a31, b11 = a22 * a33 - a23 * a32;
            var d = (b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06);
            if (!isFinite(d) || !d)
                return null;
            var id = 1 / d;
            dest[Indexes.M11] = (a11 * b11 - a12 * b10 + a13 * b09) * id;
            dest[Indexes.M12] = (-a01 * b11 + a02 * b10 - a03 * b09) * id;
            dest[Indexes.M13] = (a31 * b05 - a32 * b04 + a33 * b03) * id;
            dest[Indexes.M14] = (-a21 * b05 + a22 * b04 - a23 * b03) * id;
            dest[Indexes.M21] = (-a10 * b11 + a12 * b08 - a13 * b07) * id;
            dest[Indexes.M22] = (a00 * b11 - a02 * b08 + a03 * b07) * id;
            dest[Indexes.M23] = (-a30 * b05 + a32 * b02 - a33 * b01) * id;
            dest[Indexes.M24] = (a20 * b05 - a22 * b02 + a23 * b01) * id;
            dest[Indexes.M31] = (a10 * b10 - a11 * b08 + a13 * b06) * id;
            dest[Indexes.M32] = (-a00 * b10 + a01 * b08 - a03 * b06) * id;
            dest[Indexes.M33] = (a30 * b04 - a31 * b02 + a33 * b00) * id;
            dest[Indexes.M34] = (-a20 * b04 + a21 * b02 - a23 * b00) * id;
            dest[Indexes.OffsetX] = (-a10 * b09 + a11 * b07 - a12 * b06) * id;
            dest[Indexes.OffsetY] = (a00 * b09 - a01 * b07 + a02 * b06) * id;
            dest[Indexes.OffsetZ] = (-a30 * b03 + a31 * b01 - a32 * b00) * id;
            dest[Indexes.M44] = (a20 * b03 - a21 * b01 + a22 * b00) * id;
            return dest;
        },
        transformVec4: function (mat, vec, dest) {
            if (!dest)
                dest = vec;
            var x = vec[0], y = vec[1], z = vec[2], w = vec[3];
            var m11 = mat[Indexes.M11], m12 = mat[Indexes.M12], m13 = mat[Indexes.M13], m14 = mat[Indexes.M14], m21 = mat[Indexes.M21], m22 = mat[Indexes.M22], m23 = mat[Indexes.M23], m24 = mat[Indexes.M24], m31 = mat[Indexes.M31], m32 = mat[Indexes.M32], m33 = mat[Indexes.M33], m34 = mat[Indexes.M34], mx0 = mat[Indexes.OffsetX], my0 = mat[Indexes.OffsetY], mz0 = mat[Indexes.OffsetZ], m44 = mat[Indexes.M44];
            dest[0] = m11 * x + m12 * y + m13 * z + m14 * w;
            dest[1] = m21 * x + m22 * y + m23 * z + m24 * w;
            dest[2] = m31 * x + m32 * y + m33 * z + m34 * w;
            dest[3] = mx0 * x + my0 * y + mz0 * z + m44 * w;
            return dest;
        },
        createTranslate: function (x, y, z, dest) {
            if (!dest)
                dest = minerva.mat4.create();
            dest[Indexes.M11] = 1;
            dest[Indexes.M12] = 0;
            dest[Indexes.M13] = 0;
            dest[Indexes.M14] = 0;
            dest[Indexes.M21] = 0;
            dest[Indexes.M22] = 1;
            dest[Indexes.M23] = 0;
            dest[Indexes.M24] = 0;
            dest[Indexes.M31] = 0;
            dest[Indexes.M32] = 0;
            dest[Indexes.M33] = 1;
            dest[Indexes.M34] = 0;
            dest[Indexes.OffsetX] = x;
            dest[Indexes.OffsetY] = y;
            dest[Indexes.OffsetZ] = z;
            dest[Indexes.M44] = 1;
            return dest;
        },
        createScale: function (x, y, z, dest) {
            if (!dest)
                dest = minerva.mat4.create();
            dest[Indexes.M11] = x;
            dest[Indexes.M12] = 0;
            dest[Indexes.M13] = 0;
            dest[Indexes.M14] = 0;
            dest[Indexes.M11] = 0;
            dest[Indexes.M12] = y;
            dest[Indexes.M13] = 0;
            dest[Indexes.M14] = 0;
            dest[Indexes.M31] = 0;
            dest[Indexes.M32] = 0;
            dest[Indexes.M33] = z;
            dest[Indexes.M34] = 0;
            dest[Indexes.OffsetX] = 0;
            dest[Indexes.OffsetY] = 0;
            dest[Indexes.OffsetZ] = 0;
            dest[Indexes.M44] = 1;
            return dest;
        },
        createRotateX: function (theta, dest) {
            if (!dest)
                dest = minerva.mat4.create();
            var s = Math.sin(theta);
            var c = Math.cos(theta);
            dest[Indexes.M11] = 1;
            dest[Indexes.M12] = 0;
            dest[Indexes.M13] = 0;
            dest[Indexes.M14] = 0;
            dest[Indexes.M21] = 0;
            dest[Indexes.M22] = c;
            dest[Indexes.M23] = s;
            dest[Indexes.M24] = 0;
            dest[Indexes.M31] = 0;
            dest[Indexes.M32] = -s;
            dest[Indexes.M33] = c;
            dest[Indexes.M34] = 0;
            dest[Indexes.OffsetX] = 0;
            dest[Indexes.OffsetY] = 0;
            dest[Indexes.OffsetZ] = 0;
            dest[Indexes.M44] = 1;
            return dest;
        },
        createRotateY: function (theta, dest) {
            if (!dest)
                dest = minerva.mat4.create();
            var s = Math.sin(theta);
            var c = Math.cos(theta);
            dest[Indexes.M11] = c;
            dest[Indexes.M12] = 0;
            dest[Indexes.M13] = -s;
            dest[Indexes.M14] = 0;
            dest[Indexes.M21] = 0;
            dest[Indexes.M22] = 1;
            dest[Indexes.M23] = 0;
            dest[Indexes.M24] = 0;
            dest[Indexes.M31] = s;
            dest[Indexes.M32] = 0;
            dest[Indexes.M33] = c;
            dest[Indexes.M34] = 0;
            dest[Indexes.OffsetX] = 0;
            dest[Indexes.OffsetY] = 0;
            dest[Indexes.OffsetZ] = 0;
            dest[Indexes.M44] = 1;
            return dest;
        },
        createRotateZ: function (theta, dest) {
            if (!dest)
                dest = minerva.mat4.create();
            var s = Math.sin(theta);
            var c = Math.cos(theta);
            dest[Indexes.M11] = c;
            dest[Indexes.M12] = s;
            dest[Indexes.M13] = 0;
            dest[Indexes.M14] = 0;
            dest[Indexes.M21] = -s;
            dest[Indexes.M22] = c;
            dest[Indexes.M23] = 0;
            dest[Indexes.M24] = 0;
            dest[Indexes.M31] = 0;
            dest[Indexes.M32] = 0;
            dest[Indexes.M33] = 1;
            dest[Indexes.M34] = 0;
            dest[Indexes.OffsetX] = 0;
            dest[Indexes.OffsetY] = 0;
            dest[Indexes.OffsetZ] = 0;
            dest[Indexes.M44] = 1;
            return dest;
        },
        createPerspective: function (fieldOfViewY, aspectRatio, zNearPlane, zFarPlane, dest) {
            if (!dest)
                dest = minerva.mat4.create();
            var height = 1.0 / Math.tan(fieldOfViewY / 2.0);
            var width = height / aspectRatio;
            var d = zNearPlane - zFarPlane;
            dest[Indexes.M11] = width;
            dest[Indexes.M12] = 0;
            dest[Indexes.M13] = 0;
            dest[Indexes.M14] = 0;
            dest[Indexes.M21] = 0;
            dest[Indexes.M22] = height;
            dest[Indexes.M23] = 0;
            dest[Indexes.M24] = 0;
            dest[Indexes.M31] = 0;
            dest[Indexes.M32] = 0;
            dest[Indexes.M33] = zFarPlane / d;
            dest[Indexes.M34] = -1.0;
            dest[Indexes.OffsetX] = 0;
            dest[Indexes.OffsetY] = 0;
            dest[Indexes.OffsetZ] = zNearPlane * zFarPlane / d;
            dest[Indexes.M44] = 0.0;
            return dest;
        },
        createViewport: function (width, height, dest) {
            if (!dest)
                dest = minerva.mat4.create();
            dest[Indexes.M11] = width / 2.0;
            dest[Indexes.M12] = 0;
            dest[Indexes.M13] = 0;
            dest[Indexes.M14] = 0;
            dest[Indexes.M21] = 0;
            dest[Indexes.M22] = -height / 2.0;
            dest[Indexes.M23] = 0;
            dest[Indexes.M24] = 0;
            dest[Indexes.M31] = 0;
            dest[Indexes.M32] = 0;
            dest[Indexes.M33] = 1;
            dest[Indexes.M34] = 0;
            dest[Indexes.OffsetX] = width / 2.0;
            dest[Indexes.OffsetY] = height / 2.0;
            dest[Indexes.OffsetZ] = 0;
            dest[Indexes.M44] = 1;
            return dest;
        }
    };
})(minerva || (minerva = {}));
var mat4 = minerva.mat4;
/// <reference path="../Rect" />
var minerva;
(function (minerva) {
    minerva.Rect.transform4 = function (dest, projection) {
        console.warn("[Rect.transform4] Not implemented");
    };
    function clipmask(clip) {
        var mask = 0;
        if (-clip[0] + clip[3] < 0)
            mask |= (1 << 0);
        if (clip[0] + clip[3] < 0)
            mask |= (1 << 1);
        if (-clip[1] + clip[3] < 0)
            mask |= (1 << 2);
        if (clip[1] + clip[3] < 0)
            mask |= (1 << 3);
        if (clip[2] + clip[3] < 0)
            mask |= (1 << 4);
        if (-clip[2] + clip[3] < 0)
            mask |= (1 << 5);
        return mask;
    }
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var createTypedArray;
    if (typeof Float32Array !== "undefined") {
        createTypedArray = function (length) {
            return new Float32Array(length);
        };
    }
    else {
        createTypedArray = function (length) {
            return new Array(length);
        };
    }
    minerva.vec4 = {
        create: function (x, y, z, w) {
            var dest = createTypedArray(4);
            dest[0] = x;
            dest[1] = y;
            dest[2] = z;
            dest[3] = w;
            return dest;
        },
        init: function (x, y, z, w, dest) {
            if (!dest)
                dest = createTypedArray(4);
            dest[0] = x;
            dest[1] = y;
            dest[2] = z;
            dest[3] = w;
            return dest;
        }
    };
})(minerva || (minerva = {}));
var vec4 = minerva.vec4;
var minerva;
(function (minerva) {
    var path;
    (function (path_1) {
        var Path = (function () {
            function Path() {
                this.$$entries = [];
                this.$$endX = 0.0;
                this.$$endY = 0.0;
            }
            Object.defineProperty(Path.prototype, "endX", {
                get: function () {
                    return this.$$endX;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Path.prototype, "endY", {
                get: function () {
                    return this.$$endY;
                },
                enumerable: true,
                configurable: true
            });
            Path.prototype.reset = function () {
                this.$$entries.length = 0;
                this.$$endX = 0;
                this.$$endY = 0;
            };
            Path.prototype.move = function (x, y) {
                this.$$entries.push(path_1.segments.move(x, y));
                this.$$endX = x;
                this.$$endY = y;
            };
            Path.prototype.line = function (x, y) {
                this.$$entries.push(path_1.segments.line(x, y));
                this.$$endX = x;
                this.$$endY = y;
            };
            Path.prototype.quadraticBezier = function (cpx, cpy, x, y) {
                this.$$entries.push(path_1.segments.quadraticBezier(cpx, cpy, x, y));
                this.$$endX = x;
                this.$$endY = y;
            };
            Path.prototype.cubicBezier = function (cp1x, cp1y, cp2x, cp2y, x, y) {
                this.$$entries.push(path_1.segments.cubicBezier(cp1x, cp1y, cp2x, cp2y, x, y));
                this.$$endX = x;
                this.$$endY = y;
            };
            Path.prototype.ellipse = function (x, y, width, height) {
                this.$$entries.push(path_1.segments.ellipse(x, y, width, height));
                this.$$endX = x;
                this.$$endY = y;
            };
            Path.prototype.ellipticalArc = function (rx, ry, rotationAngle, isLargeArcFlag, sweepDirectionFlag, ex, ey) {
                this.$$entries.push(path_1.segments.ellipticalArc(rx, ry, rotationAngle, isLargeArcFlag, sweepDirectionFlag, ex, ey));
                this.$$endX = ex;
                this.$$endY = ey;
            };
            Path.prototype.arc = function (x, y, r, sAngle, eAngle, aClockwise) {
                this.$$entries.push(path_1.segments.arc(x, y, r, sAngle, eAngle, aClockwise));
            };
            Path.prototype.arcTo = function (cpx, cpy, x, y, radius) {
                var arcto = path_1.segments.arcTo(cpx, cpy, x, y, radius);
                this.$$entries.push(arcto);
                this.$$endX = arcto.ex;
                this.$$endY = arcto.ey;
            };
            Path.prototype.rect = function (x, y, width, height) {
                this.$$entries.push(path_1.segments.rect(x, y, width, height));
            };
            Path.prototype.roundedRect = function (x, y, width, height, radiusX, radiusY) {
                this.$$entries.push(path_1.segments.roundedRect(x, y, width, height, radiusX, radiusY));
                this.$$endX = x;
                this.$$endY = y;
            };
            Path.prototype.close = function () {
                this.$$entries.push(path_1.segments.close());
            };
            Path.prototype.draw = function (ctx) {
                ctx.beginPath();
                var path = this.$$entries;
                var len = path.length;
                for (var i = 0; i < len; i++) {
                    path[i].draw(ctx);
                }
            };
            Path.prototype.calcBounds = function (pars) {
                if (this.$$entries.length <= 0)
                    return new minerva.Rect();
                var box = pars && pars.strokeThickness > 1 ? this.$$calcStrokeBox(pars) : this.$$calcFillBox();
                return new minerva.Rect(box.l, box.t, Math.max(0, box.r - box.l), Math.max(0, box.b - box.t));
            };
            Path.prototype.$$calcFillBox = function () {
                var path = this.$$entries;
                var len = path.length;
                var box = {
                    l: Number.POSITIVE_INFINITY,
                    r: Number.NEGATIVE_INFINITY,
                    t: Number.POSITIVE_INFINITY,
                    b: Number.NEGATIVE_INFINITY
                };
                var curx = null;
                var cury = null;
                var entry;
                for (var i = 0; i < len; i++) {
                    entry = path[i];
                    entry.sx = curx;
                    entry.sy = cury;
                    entry.extendFillBox(box);
                    curx = entry.ex || 0;
                    cury = entry.ey || 0;
                }
                return box;
            };
            Path.prototype.$$calcStrokeBox = function (pars) {
                var box = {
                    l: Number.POSITIVE_INFINITY,
                    r: Number.NEGATIVE_INFINITY,
                    t: Number.POSITIVE_INFINITY,
                    b: Number.NEGATIVE_INFINITY
                };
                processStrokedBounds(box, this.$$entries, pars);
                return box;
            };
            Path.Merge = function (path1, path2) {
                path1.$$entries.push.apply(path1.$$entries, path2.$$entries);
                path1.$$endX += path2.$$endX;
                path1.$$endY += path2.$$endY;
            };
            Path.prototype.Serialize = function () {
                var path = this.$$entries;
                var len = path.length;
                var s = "";
                for (var i = 0; i < len; i++) {
                    if (i > 0)
                        s += " ";
                    s += path[i].toString();
                }
                return s;
            };
            return Path;
        })();
        path_1.Path = Path;
        function expandStartCap(box, entry, pars) {
            var v;
            var hs = pars.strokeThickness / 2.0;
            var cap = pars.strokeStartLineCap || pars.strokeEndLineCap || 0;
            switch (cap) {
                case minerva.PenLineCap.Round:
                    box.l = Math.min(box.l, entry.sx - hs);
                    box.r = Math.max(box.r, entry.sx + hs);
                    box.t = Math.min(box.t, entry.sy - hs);
                    box.b = Math.max(box.b, entry.sy + hs);
                    break;
                case minerva.PenLineCap.Square:
                    if (!(v = entry.getStartVector()))
                        return;
                    if (!v[0] || !v[1])
                        return;
                    var sd = minerva.Vector.reverse(minerva.Vector.normalize(v.slice(0)));
                    var sdo = minerva.Vector.orthogonal(sd.slice(0));
                    var x1 = entry.sx + hs * (sd[0] + sdo[0]);
                    var x2 = entry.sx + hs * (sd[0] - sdo[0]);
                    var y1 = entry.sy + hs * (sd[1] + sdo[1]);
                    var y2 = entry.sy + hs * (sd[1] - sdo[1]);
                    box.l = Math.min(box.l, x1, x2);
                    box.r = Math.max(box.r, x1, x2);
                    box.t = Math.min(box.t, y1, y2);
                    box.b = Math.max(box.b, y1, y2);
                    break;
                case minerva.PenLineCap.Flat:
                default:
                    if (!(v = entry.getStartVector()))
                        return;
                    if (!v[0] || !v[1])
                        return;
                    var sdo = minerva.Vector.orthogonal(minerva.Vector.normalize(v.slice(0)));
                    var x1 = entry.sx + hs * sdo[0];
                    var x2 = entry.sx + hs * -sdo[0];
                    var y1 = entry.sy + hs * sdo[1];
                    var y2 = entry.sy + hs * -sdo[1];
                    box.l = Math.min(box.l, x1, x2);
                    box.r = Math.max(box.r, x1, x2);
                    box.t = Math.min(box.t, y1, y2);
                    box.b = Math.max(box.b, y1, y2);
                    break;
            }
        }
        function expandEndCap(box, entry, pars) {
            var ex = entry.ex;
            var ey = entry.ey;
            var v;
            var hs = pars.strokeThickness / 2.0;
            var cap = pars.strokeStartLineCap || pars.strokeEndLineCap || 0;
            switch (cap) {
                case minerva.PenLineCap.Round:
                    box.l = Math.min(box.l, ex - hs);
                    box.r = Math.max(box.r, ex + hs);
                    box.t = Math.min(box.t, ey - hs);
                    box.b = Math.max(box.b, ey + hs);
                    break;
                case minerva.PenLineCap.Square:
                    if (!(v = entry.getEndVector()))
                        return;
                    var ed = minerva.Vector.normalize(v.slice(0));
                    var edo = minerva.Vector.orthogonal(ed.slice(0));
                    var x1 = ex + hs * (ed[0] + edo[0]);
                    var x2 = ex + hs * (ed[0] - edo[0]);
                    var y1 = ey + hs * (ed[1] + edo[1]);
                    var y2 = ey + hs * (ed[1] - edo[1]);
                    box.l = Math.min(box.l, x1, x2);
                    box.r = Math.max(box.r, x1, x2);
                    box.t = Math.min(box.t, y1, y2);
                    box.b = Math.max(box.b, y1, y2);
                    break;
                case minerva.PenLineCap.Flat:
                default:
                    if (!(v = entry.getEndVector()))
                        return;
                    var edo = minerva.Vector.orthogonal(minerva.Vector.normalize(v.slice(0)));
                    var x1 = ex + hs * edo[0];
                    var x2 = ex + hs * -edo[0];
                    var y1 = ey + hs * edo[1];
                    var y2 = ey + hs * -edo[1];
                    box.l = Math.min(box.l, x1, x2);
                    box.r = Math.max(box.r, x1, x2);
                    box.t = Math.min(box.t, y1, y2);
                    box.b = Math.max(box.b, y1, y2);
                    break;
            }
        }
        function expandLineJoin(box, previous, entry, pars) {
            var hs = pars.strokeThickness / 2.0;
            if (pars.strokeLineJoin === minerva.PenLineJoin.Round) {
                box.l = Math.min(box.l, entry.sx - hs);
                box.r = Math.max(box.r, entry.sx + hs);
                box.t = Math.min(box.t, entry.sy - hs);
                box.b = Math.max(box.b, entry.sy + hs);
            }
            var tips = (pars.strokeLineJoin === minerva.PenLineJoin.Miter) ? findMiterTips(previous, entry, hs, pars.strokeMiterLimit) : findBevelTips(previous, entry, hs);
            if (!tips)
                return;
            var x1 = tips[0].x;
            var x2 = tips[1].x;
            var y1 = tips[0].y;
            var y2 = tips[1].y;
            box.l = Math.min(box.l, x1, x2);
            box.r = Math.max(box.r, x1, x2);
            box.t = Math.min(box.t, y1, y2);
            box.b = Math.max(box.b, y1, y2);
        }
        function processStrokedBounds(box, segs, pars) {
            var len = segs.length;
            var last = null;
            var curx = null;
            var cury = null;
            var sx = null;
            var sy = null;
            var isLastEntryMove = false;
            function processEntry(entry, i) {
                entry.sx = curx;
                entry.sy = cury;
                if (!entry.isSingle) {
                    if (!entry.isMove && isLastEntryMove) {
                        sx = entry.sx;
                        sy = entry.sy;
                        expandStartCap(box, entry, pars);
                    }
                    if (!isLastEntryMove && i > 0)
                        expandLineJoin(box, last, entry, pars);
                }
                entry.extendStrokeBox(box, pars);
                curx = entry.ex || 0;
                cury = entry.ey || 0;
                isLastEntryMove = !!entry.isMove;
                last = entry;
            }
            for (var i = 0; i < len; i++) {
                processEntry(segs[i], i);
            }
            var end = segs[len - 1];
            if (end && !end.isSingle)
                expandEndCap(box, end, pars);
        }
        function findMiterTips(previous, entry, hs, miterLimit) {
            var x = entry.sx;
            var y = entry.sy;
            var av = previous.getEndVector();
            var bv = entry.getStartVector();
            if (!av || !bv)
                return null;
            minerva.Vector.reverse(av);
            var tau = minerva.Vector.angleBetween(av, bv) / 2;
            if (isNaN(tau))
                return null;
            var miterRatio = 1 / Math.sin(tau);
            if (miterRatio > miterLimit)
                return findBevelTips(previous, entry, hs);
            var cv = minerva.Vector.isClockwiseTo(av, bv) ? av.slice(0) : bv.slice(0);
            minerva.Vector.normalize(minerva.Vector.reverse(minerva.Vector.rotate(cv, tau)));
            var miterLen = hs * miterRatio;
            var tip = { x: x + miterLen * cv[0], y: y + miterLen * cv[1] };
            return [
                tip,
                tip
            ];
        }
        path_1.findMiterTips = findMiterTips;
        function findBevelTips(previous, entry, hs) {
            var x = entry.sx;
            var y = entry.sy;
            var av = previous.getEndVector();
            var bv = entry.getStartVector();
            if (!av || !bv)
                return;
            minerva.Vector.normalize(minerva.Vector.reverse(av));
            minerva.Vector.normalize(bv);
            var avo, bvo;
            if (minerva.Vector.isClockwiseTo(av, bv)) {
                avo = minerva.Vector.orthogonal(av.slice(0));
                bvo = minerva.Vector.reverse(minerva.Vector.orthogonal(bv.slice(0)));
            }
            else {
                avo = minerva.Vector.reverse(minerva.Vector.orthogonal(av.slice(0)));
                bvo = minerva.Vector.orthogonal(bv.slice(0));
            }
            return [
                { x: x - hs * avo[0], y: y - hs * avo[1] },
                { x: x - hs * bvo[0], y: y - hs * bvo[1] }
            ];
        }
        path_1.findBevelTips = findBevelTips;
    })(path = minerva.path || (minerva.path = {}));
})(minerva || (minerva = {}));
(function (context) {
    if (!context.perfex) {
        context.perfex = {};
    }
    if (!context.perfex.timer) {
        context.perfex.timer = {
            all: [],
            reset: function () {
            },
            start: function (tag) {
            },
            stop: function () {
            }
        };
    }
    if (!context.perfex.phases) {
        context.perfex.phases = {
            current: null,
            all: [],
            start: function (tag) {
            }
        };
    }
})(window);
var minerva;
(function (minerva) {
    var text;
    (function (text_1) {
        var DocumentLayoutDef = (function () {
            function DocumentLayoutDef() {
            }
            DocumentLayoutDef.prototype.createAssets = function () {
                return {
                    availableWidth: Number.POSITIVE_INFINITY,
                    actualWidth: NaN,
                    actualHeight: NaN,
                    maxWidth: Number.POSITIVE_INFINITY,
                    maxHeight: Number.POSITIVE_INFINITY,
                    lines: [],
                    selCached: false
                };
            };
            DocumentLayoutDef.prototype.setMaxWidth = function (docctx, docassets, width) {
                if (docassets.maxWidth === width)
                    return false;
                docassets.maxWidth = width;
                docassets.actualWidth = NaN;
                docassets.actualHeight = NaN;
                return true;
            };
            DocumentLayoutDef.prototype.layout = function (docctx, docassets, constraint, walker) {
                if (!isNaN(docassets.actualWidth))
                    return false;
                docassets.maxWidth = constraint.width;
                docassets.actualWidth = 0.0;
                docassets.actualHeight = 0.0;
                docassets.lines = [];
                for (var offset = 0; walker.step();) {
                    offset += walker.current.layout(docctx, docassets);
                }
                return true;
            };
            DocumentLayoutDef.prototype.render = function (ctx, docctx, docassets) {
                var _this = this;
                this.splitSelection(docctx, docassets);
                ctx.save();
                docassets.lines.forEach(function (line) {
                    var halign = _this.getHorizontalAlignmentX(docctx, docassets, line.width);
                    ctx.translate(halign, 0);
                    line.runs.forEach(function (run) {
                        if (run.pre) {
                            text_1.layout.Cluster.render(run.pre, run.attrs, ctx);
                            ctx.translate(run.pre.width, 0);
                        }
                        if (run.sel) {
                            text_1.layout.Cluster.render(run.sel, run.attrs, ctx);
                            ctx.translate(run.sel.width, 0);
                        }
                        if (run.post) {
                            text_1.layout.Cluster.render(run.post, run.attrs, ctx);
                            ctx.translate(run.post.width, 0);
                        }
                    });
                    ctx.translate(-line.width - halign, line.height);
                });
                ctx.restore();
            };
            DocumentLayoutDef.prototype.getCursorFromPoint = function (point, docctx, docassets) {
                var line = docassets.lines[0];
                if (!line)
                    return 0;
                var advance = 0;
                if (point.y > 0) {
                    for (var cury = 0, lines = docassets.lines, i = 0, len = lines.length; i < len; i++) {
                        line = lines[i];
                        if (point.y <= (cury + line.height))
                            break;
                        advance += line.runs.reduce(function (agg, r) { return agg + r.length; }, 0);
                        cury += line.height;
                    }
                }
                var px = point.x - this.getHorizontalAlignmentX(docctx, docassets, line.width);
                if (px < 0)
                    return advance;
                var curx = 0;
                var i = 0;
                for (var runs = line.runs, len = runs.length; i < len; i++) {
                    var run = runs[i];
                    if (px <= (curx + run.width))
                        break;
                    advance += run.length;
                    curx += run.width;
                }
                var run = runs[i];
                if (!run)
                    return advance;
                var end = Math.max(0, Math.min(run.text.length, Math.ceil((px - curx) / run.width * run.text.length)));
                var usedText = run.text.substr(0, end);
                var width;
                while (end > 0 && (width = this.measureTextWidth(usedText, run.attrs.font)) > px) {
                    end--;
                    usedText = run.text.substr(0, end);
                }
                var lastEnd = end;
                while (end < run.text.length && (width = this.measureTextWidth(usedText, run.attrs.font)) < px) {
                    lastEnd = end;
                    end++;
                    usedText = run.text.substr(0, end);
                }
                return advance + lastEnd;
            };
            DocumentLayoutDef.prototype.getCaretFromCursor = function (docctx, docassets) {
                var cursor = docctx.selectionStart;
                var advance = 0;
                var cr = new minerva.Rect(0, 0, 1, 0);
                var lastLineHeight = 0;
                for (var lines = docassets.lines, i = 0, len = lines.length; i < len; i++) {
                    var line = lines[i];
                    cr.x = this.getHorizontalAlignmentX(docctx, docassets, line.width);
                    cr.height = line.height;
                    for (var runs = line.runs, j = 0, len2 = runs.length; j < len2; j++) {
                        var run = runs[j];
                        if ((advance + run.length) > cursor) {
                            cr.x += this.measureTextWidth(run.text.substr(0, cursor - advance), run.attrs.font);
                            return cr;
                        }
                        advance += run.length;
                        cr.x += line.width;
                    }
                    cr.y += line.height;
                    lastLineHeight = line.height;
                }
                cr.y -= lastLineHeight;
                return cr;
            };
            DocumentLayoutDef.prototype.splitSelection = function (docctx, assets) {
                var _this = this;
                if (assets.selCached)
                    return;
                var start = docctx.selectionStart;
                assets.lines.forEach(function (line) {
                    return line.runs.forEach(function (run) {
                        text_1.layout.Run.splitSelection(run, start, start + docctx.selectionLength, function (text, attrs) { return _this.measureTextWidth(text, attrs.font); });
                        start -= run.length;
                    });
                });
                assets.selCached = true;
            };
            DocumentLayoutDef.prototype.getHorizontalAlignmentX = function (docctx, assets, lineWidth) {
                if (docctx.textAlignment === minerva.TextAlignment.Left || docctx.textAlignment === minerva.TextAlignment.Justify
                    || (docctx.textWrapping === minerva.TextWrapping.NoWrap && docctx.textTrimming !== minerva.TextTrimming.None))
                    return 0;
                var width = getWidthConstraint(assets);
                if (lineWidth >= width)
                    return 0;
                if (docctx.textAlignment === minerva.TextAlignment.Center)
                    return (width - lineWidth) / 2.0;
                return width - lineWidth;
            };
            DocumentLayoutDef.prototype.measureTextWidth = function (text, font) {
                return minerva.engine.Surface.measureWidth(text, font);
            };
            return DocumentLayoutDef;
        })();
        text_1.DocumentLayoutDef = DocumentLayoutDef;
        function getWidthConstraint(assets) {
            if (isFinite(assets.availableWidth))
                return assets.availableWidth;
            if (!isFinite(assets.maxWidth))
                return assets.actualWidth;
            return Math.min(assets.actualWidth, assets.maxWidth);
        }
    })(text = minerva.text || (minerva.text = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var text;
    (function (text) {
        function createDocumentLayout(def) {
            return {
                def: def,
                assets: def.createAssets()
            };
        }
        text.createDocumentLayout = createDocumentLayout;
    })(text = minerva.text || (minerva.text = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var text;
    (function (text) {
        var TextUpdater = (function () {
            function TextUpdater() {
                this.assets = {
                    fontFamily: minerva.Font.DEFAULT_FAMILY,
                    fontSize: minerva.Font.DEFAULT_SIZE,
                    fontStretch: minerva.Font.DEFAULT_STRETCH,
                    fontStyle: minerva.Font.DEFAULT_STYLE,
                    fontWeight: minerva.Font.DEFAULT_WEIGHT,
                    textDecorations: minerva.TextDecorations.None,
                    language: "",
                    background: null,
                    selectionBackground: null,
                    foreground: null,
                    selectionForeground: null,
                    isUnderlined: false,
                    font: new minerva.Font(),
                    text: ""
                };
                this.init();
            }
            TextUpdater.prototype.init = function () {
                this.setTextLayout();
            };
            TextUpdater.prototype.setTextLayout = function (tldef) {
                if (this.$$textlayout)
                    return this;
                this.$$textlayout = tldef || new text.run.RunLayoutDef();
                return this;
            };
            TextUpdater.prototype.layout = function (docctx, docassets) {
                this.$$textlayout.layout(docctx, docassets, this.assets);
                return this.assets.text.length;
            };
            TextUpdater.prototype.invalidateFont = function () {
                var assets = this.assets;
                return minerva.Font.mergeInto(assets.font, assets.fontFamily, assets.fontSize, assets.fontStretch, assets.fontStyle, assets.fontWeight);
            };
            return TextUpdater;
        })();
        text.TextUpdater = TextUpdater;
    })(text = minerva.text || (minerva.text = {}));
})(minerva || (minerva = {}));
/// <reference path="../../core/measure/MeasurePipeDef" />
var minerva;
(function (minerva) {
    var anon;
    (function (anon) {
        var arrange;
        (function (arrange) {
            var AnonymousArrangePipeDef = (function (_super) {
                __extends(AnonymousArrangePipeDef, _super);
                function AnonymousArrangePipeDef(upd) {
                    _super.call(this);
                    this.replaceTapin('doOverride', function (input, state, output, tree, finalRect) {
                        var finalSize = new minerva.Size();
                        minerva.Size.copyTo(state.finalSize, finalSize);
                        var val = upd.arrangeOverride(finalSize);
                        minerva.Size.copyTo(val, state.arrangedSize);
                        return true;
                    });
                }
                return AnonymousArrangePipeDef;
            })(minerva.core.arrange.ArrangePipeDef);
            arrange.AnonymousArrangePipeDef = AnonymousArrangePipeDef;
        })(arrange = anon.arrange || (anon.arrange = {}));
    })(anon = minerva.anon || (minerva.anon = {}));
})(minerva || (minerva = {}));
/// <reference path="../../core/measure/MeasurePipeDef" />
var minerva;
(function (minerva) {
    var anon;
    (function (anon) {
        var measure;
        (function (measure) {
            var AnonymousMeasurePipeDef = (function (_super) {
                __extends(AnonymousMeasurePipeDef, _super);
                function AnonymousMeasurePipeDef(upd) {
                    _super.call(this);
                    this.replaceTapin('doOverride', function (input, state, output, tree, availableSize) {
                        var availableSize = new minerva.Size();
                        minerva.Size.copyTo(state.availableSize, availableSize);
                        var val = upd.measureOverride(availableSize);
                        minerva.Size.copyTo(val, output.desiredSize);
                        return true;
                    });
                }
                return AnonymousMeasurePipeDef;
            })(minerva.core.measure.MeasurePipeDef);
            measure.AnonymousMeasurePipeDef = AnonymousMeasurePipeDef;
        })(measure = anon.measure || (anon.measure = {}));
    })(anon = minerva.anon || (minerva.anon = {}));
})(minerva || (minerva = {}));
/// <reference path="../../core/Updater" />
var minerva;
(function (minerva) {
    var controls;
    (function (controls) {
        var border;
        (function (border) {
            var BorderUpdater = (function (_super) {
                __extends(BorderUpdater, _super);
                function BorderUpdater() {
                    _super.apply(this, arguments);
                }
                BorderUpdater.prototype.init = function () {
                    this.setTree(new border.BorderUpdaterTree())
                        .setMeasurePipe(minerva.singleton(border.measure.BorderMeasurePipeDef))
                        .setArrangePipe(minerva.singleton(border.arrange.BorderArrangePipeDef))
                        .setRenderPipe(minerva.singleton(minerva.core.render.RenderContext.hasFillRule ? border.render.BorderRenderPipeDef : border.render.ShimBorderRenderPipeDef))
                        .setHitTestPipe(minerva.singleton(border.hittest.BorderHitTestPipeDef));
                    var assets = this.assets;
                    assets.padding = new minerva.Thickness();
                    assets.borderThickness = new minerva.Thickness();
                    assets.cornerRadius = new minerva.CornerRadius();
                    _super.prototype.init.call(this);
                };
                return BorderUpdater;
            })(minerva.core.Updater);
            border.BorderUpdater = BorderUpdater;
        })(border = controls.border || (controls.border = {}));
    })(controls = minerva.controls || (minerva.controls = {}));
})(minerva || (minerva = {}));
/// <reference path="../../core/UpdaterTree" />
var minerva;
(function (minerva) {
    var controls;
    (function (controls) {
        var border;
        (function (border) {
            var BorderUpdaterTree = (function (_super) {
                __extends(BorderUpdaterTree, _super);
                function BorderUpdaterTree() {
                    _super.apply(this, arguments);
                    this.isLayoutContainer = true;
                    this.isContainer = true;
                }
                BorderUpdaterTree.prototype.walk = function (direction) {
                    var visited = false;
                    var _this = this;
                    return {
                        current: undefined,
                        step: function () {
                            this.current = !visited ? _this.subtree : undefined;
                            visited = true;
                            return this.current != null;
                        }
                    };
                };
                return BorderUpdaterTree;
            })(minerva.core.UpdaterTree);
            border.BorderUpdaterTree = BorderUpdaterTree;
        })(border = controls.border || (controls.border = {}));
    })(controls = minerva.controls || (minerva.controls = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var controls;
    (function (controls) {
        var panel;
        (function (panel) {
            var PanelUpdater = (function (_super) {
                __extends(PanelUpdater, _super);
                function PanelUpdater() {
                    _super.apply(this, arguments);
                }
                PanelUpdater.prototype.init = function () {
                    var assets = this.assets;
                    assets.background = null;
                    this.setTree(new panel.PanelUpdaterTree())
                        .setMeasurePipe(minerva.singleton(panel.measure.PanelMeasurePipeDef))
                        .setArrangePipe(minerva.singleton(panel.arrange.PanelArrangePipeDef))
                        .setProcessUpPipe(minerva.singleton(panel.processup.PanelProcessUpPipeDef))
                        .setRenderPipe(minerva.singleton(panel.render.PanelRenderPipeDef))
                        .setHitTestPipe(minerva.singleton(panel.hittest.PanelHitTestPipeDef));
                    _super.prototype.init.call(this);
                };
                PanelUpdater.prototype.setChildren = function (children) {
                    this.tree.children = children;
                    return this;
                };
                return PanelUpdater;
            })(minerva.core.Updater);
            panel.PanelUpdater = PanelUpdater;
            var reactTo;
            (function (reactTo) {
                function zIndex(updater, oldValue, newValue) {
                    var vp = updater.tree.visualParent;
                    if (vp)
                        vp.tree.zSorted = null;
                }
                reactTo.zIndex = zIndex;
            })(reactTo = panel.reactTo || (panel.reactTo = {}));
        })(panel = controls.panel || (controls.panel = {}));
    })(controls = minerva.controls || (minerva.controls = {}));
})(minerva || (minerva = {}));
/// <reference path="../panel/PanelUpdater" />
var minerva;
(function (minerva) {
    var controls;
    (function (controls) {
        var canvas;
        (function (canvas) {
            var CanvasUpdater = (function (_super) {
                __extends(CanvasUpdater, _super);
                function CanvasUpdater() {
                    _super.apply(this, arguments);
                }
                CanvasUpdater.prototype.init = function () {
                    this.setMeasurePipe(minerva.singleton(canvas.measure.CanvasMeasurePipeDef))
                        .setArrangePipe(minerva.singleton(canvas.arrange.CanvasArrangePipeDef))
                        .setProcessDownPipe(minerva.singleton(canvas.processdown.CanvasProcessDownPipeDef))
                        .setProcessUpPipe(minerva.singleton(canvas.processup.CanvasProcessUpPipeDef));
                    var assets = this.assets;
                    assets.breakLayoutClip = true;
                    _super.prototype.init.call(this);
                };
                return CanvasUpdater;
            })(controls.panel.PanelUpdater);
            canvas.CanvasUpdater = CanvasUpdater;
            var reactTo;
            (function (reactTo) {
                function left(updater, oldValue, newValue) {
                    invalidateTopLeft(updater);
                }
                reactTo.left = left;
                function top(updater, oldValue, newValue) {
                    invalidateTopLeft(updater);
                }
                reactTo.top = top;
                function invalidateTopLeft(updater) {
                    var vp = updater.tree.visualParent;
                    if (updater instanceof CanvasUpdater && !vp) {
                        updater.assets.dirtyFlags |= minerva.DirtyFlags.LocalTransform;
                        minerva.core.Updater.$$addDownDirty(updater);
                        updater.invalidateArrange();
                    }
                    if (!(vp instanceof CanvasUpdater))
                        return;
                    var ls = updater.assets.layoutSlot;
                    minerva.Size.copyTo(updater.assets.desiredSize, ls);
                    ls.x = updater.getAttachedValue("Canvas.Left");
                    ls.y = updater.getAttachedValue("Canvas.Top");
                    if (updater.assets.useLayoutRounding) {
                        ls.x = Math.round(ls.x);
                        ls.y = Math.round(ls.y);
                        ls.width = Math.round(ls.width);
                        ls.height = Math.round(ls.height);
                    }
                    updater.invalidateArrange();
                }
            })(reactTo = canvas.reactTo || (canvas.reactTo = {}));
        })(canvas = controls.canvas || (controls.canvas = {}));
    })(controls = minerva.controls || (minerva.controls = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var controls;
    (function (controls) {
        var control;
        (function (control) {
            var ControlUpdater = (function (_super) {
                __extends(ControlUpdater, _super);
                function ControlUpdater() {
                    _super.apply(this, arguments);
                }
                ControlUpdater.prototype.init = function () {
                    this.setTree(new control.ControlUpdaterTree())
                        .setHitTestPipe(minerva.singleton(control.hittest.ControlHitTestPipeDef));
                    this.assets.isEnabled = true;
                    _super.prototype.init.call(this);
                };
                return ControlUpdater;
            })(minerva.core.Updater);
            control.ControlUpdater = ControlUpdater;
        })(control = controls.control || (controls.control = {}));
    })(controls = minerva.controls || (minerva.controls = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var controls;
    (function (controls) {
        var control;
        (function (control) {
            var ControlUpdaterTree = (function (_super) {
                __extends(ControlUpdaterTree, _super);
                function ControlUpdaterTree() {
                    _super.call(this);
                    this.isContainer = true;
                    this.isLayoutContainer = true;
                }
                return ControlUpdaterTree;
            })(minerva.core.UpdaterTree);
            control.ControlUpdaterTree = ControlUpdaterTree;
        })(control = controls.control || (controls.control = {}));
    })(controls = minerva.controls || (minerva.controls = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var controls;
    (function (controls) {
        var grid;
        (function (grid) {
            var GridUpdater = (function (_super) {
                __extends(GridUpdater, _super);
                function GridUpdater() {
                    _super.apply(this, arguments);
                }
                GridUpdater.prototype.init = function () {
                    this.setMeasurePipe(minerva.singleton(grid.measure.GridMeasurePipeDef))
                        .setArrangePipe(minerva.singleton(grid.arrange.GridArrangePipeDef))
                        .setProcessUpPipe(minerva.singleton(grid.processup.GridProcessUpPipeDef))
                        .setRenderPipe(minerva.singleton(grid.render.GridRenderPipeDef));
                    var assets = this.assets;
                    assets.showGridLines = false;
                    assets.columnDefinitions = [];
                    assets.rowDefinitions = [];
                    assets.gridState = grid.createGridState();
                    _super.prototype.init.call(this);
                };
                return GridUpdater;
            })(controls.panel.PanelUpdater);
            grid.GridUpdater = GridUpdater;
            var reactTo;
            (function (reactTo) {
                function invalidateCell(updater) {
                    var vp = updater.tree.visualParent;
                    if (vp instanceof GridUpdater)
                        vp.invalidateMeasure();
                    updater.invalidateMeasure();
                }
                function showGridLines(updater, ov, nv) {
                    updater.invalidateMeasure();
                    updater.invalidate();
                }
                reactTo.showGridLines = showGridLines;
                function column(updater, ov, nv) {
                    invalidateCell(updater);
                }
                reactTo.column = column;
                function columnSpan(updater, ov, nv) {
                    invalidateCell(updater);
                }
                reactTo.columnSpan = columnSpan;
                function row(updater, ov, nv) {
                    invalidateCell(updater);
                }
                reactTo.row = row;
                function rowSpan(updater, ov, nv) {
                    invalidateCell(updater);
                }
                reactTo.rowSpan = rowSpan;
            })(reactTo = grid.reactTo || (grid.reactTo = {}));
        })(grid = controls.grid || (controls.grid = {}));
    })(controls = minerva.controls || (minerva.controls = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var controls;
    (function (controls) {
        var grid;
        (function (grid) {
            function createGridState() {
                return {
                    rowMatrix: [],
                    colMatrix: []
                };
            }
            grid.createGridState = createGridState;
        })(grid = controls.grid || (controls.grid = {}));
    })(controls = minerva.controls || (minerva.controls = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var controls;
    (function (controls) {
        var grid;
        (function (grid) {
            var Segment = (function () {
                function Segment() {
                    this.desired = 0.0;
                    this.offered = 0.0;
                    this.original = 0.0;
                    this.min = 0.0;
                    this.max = Number.POSITIVE_INFINITY;
                    this.stars = 0;
                    this.type = grid.GridUnitType.Pixel;
                }
                Segment.prototype.clamp = function (value) {
                    if (value < this.min)
                        return this.min;
                    if (value > this.max)
                        return this.max;
                    return value;
                };
                Segment.init = function (segment, offered, min, max, unitType) {
                    segment.desired = 0.0;
                    segment.stars = 0;
                    segment.offered = offered || 0.0;
                    segment.min = min || 0.0;
                    segment.max = max != null ? max : Number.POSITIVE_INFINITY;
                    segment.type = unitType != null ? unitType : grid.GridUnitType.Pixel;
                    if (segment.offered < min)
                        segment.offered = min;
                    else if (segment.offered > max)
                        segment.offered = max;
                    return segment;
                };
                return Segment;
            })();
            grid.Segment = Segment;
        })(grid = controls.grid || (controls.grid = {}));
    })(controls = minerva.controls || (minerva.controls = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var controls;
    (function (controls) {
        var image;
        (function (image) {
            var ImageUpdater = (function (_super) {
                __extends(ImageUpdater, _super);
                function ImageUpdater() {
                    _super.apply(this, arguments);
                }
                ImageUpdater.prototype.init = function () {
                    this.setMeasurePipe(minerva.singleton(image.measure.ImageMeasurePipeDef))
                        .setArrangePipe(minerva.singleton(image.arrange.ImageArrangePipeDef))
                        .setProcessDownPipe(minerva.singleton(image.processdown.ImageProcessDownPipeDef))
                        .setRenderPipe(minerva.singleton(image.render.ImageRenderPipeDef))
                        .setHitTestPipe(minerva.singleton(image.hittest.ImageHitTestPipeDef));
                    var assets = this.assets;
                    assets.source = null;
                    assets.stretch = minerva.Stretch.Uniform;
                    assets.overlap = minerva.RectOverlap.In;
                    assets.imgXform = minerva.mat3.identity();
                    _super.prototype.init.call(this);
                };
                ImageUpdater.prototype.invalidateMetrics = function () {
                    this.assets.dirtyFlags |= minerva.DirtyFlags.ImageMetrics;
                    minerva.core.Updater.$$addDownDirty(this);
                    return this;
                };
                return ImageUpdater;
            })(minerva.core.Updater);
            image.ImageUpdater = ImageUpdater;
        })(image = controls.image || (controls.image = {}));
    })(controls = minerva.controls || (minerva.controls = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var controls;
    (function (controls) {
        var overlay;
        (function (overlay) {
            var OverlayUpdater = (function (_super) {
                __extends(OverlayUpdater, _super);
                function OverlayUpdater() {
                    _super.apply(this, arguments);
                }
                OverlayUpdater.prototype.init = function () {
                    this.setTree(new overlay.OverlayUpdaterTree())
                        .setProcessUpPipe(minerva.singleton(overlay.processup.OverlayProcessUpPipeDef))
                        .setHitTestPipe(minerva.singleton(overlay.hittest.OverlayHitTestPipeDef));
                    var assets = this.assets;
                    assets.isVisible = false;
                    assets.isOpen = false;
                    _super.prototype.init.call(this);
                };
                OverlayUpdater.prototype.setInitiator = function (initiator) {
                    this.tree.initiatorSurface = initiator.tree.surface;
                };
                OverlayUpdater.prototype.setLayer = function (layer) {
                    this.hide();
                    this.tree.layer = layer;
                    if (this.assets.isOpen)
                        this.show();
                };
                OverlayUpdater.prototype.hide = function () {
                    var layer = this.tree.layer;
                    if (!this.assets.isVisible || !layer)
                        return false;
                    this.assets.isVisible = false;
                    var surface = this.tree.initiatorSurface;
                    if (!surface)
                        return false;
                    surface.detachLayer(layer);
                    return true;
                };
                OverlayUpdater.prototype.show = function () {
                    var layer = this.tree.layer;
                    if (this.assets.isVisible || !layer)
                        return false;
                    this.assets.isVisible = true;
                    var surface = this.tree.initiatorSurface;
                    if (!surface)
                        return false;
                    surface.attachLayer(layer);
                    return true;
                };
                return OverlayUpdater;
            })(minerva.core.Updater);
            overlay.OverlayUpdater = OverlayUpdater;
            var reactTo;
            (function (reactTo) {
                function isOpen(updater, oldValue, newValue) {
                    (newValue === true) ? updater.show() : updater.hide();
                }
                reactTo.isOpen = isOpen;
            })(reactTo = overlay.reactTo || (overlay.reactTo = {}));
        })(overlay = controls.overlay || (controls.overlay = {}));
    })(controls = minerva.controls || (minerva.controls = {}));
})(minerva || (minerva = {}));
/// <reference path="../../core/UpdaterTree" />
var minerva;
(function (minerva) {
    var controls;
    (function (controls) {
        var overlay;
        (function (overlay) {
            var OverlayUpdaterTree = (function (_super) {
                __extends(OverlayUpdaterTree, _super);
                function OverlayUpdaterTree() {
                    _super.apply(this, arguments);
                    this.layer = undefined;
                    this.initiatorSurface = undefined;
                }
                return OverlayUpdaterTree;
            })(minerva.core.UpdaterTree);
            overlay.OverlayUpdaterTree = OverlayUpdaterTree;
        })(overlay = controls.overlay || (controls.overlay = {}));
    })(controls = minerva.controls || (minerva.controls = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var controls;
    (function (controls) {
        var panel;
        (function (panel) {
            var PanelUpdaterTree = (function (_super) {
                __extends(PanelUpdaterTree, _super);
                function PanelUpdaterTree() {
                    _super.call(this);
                    this.children = null;
                    this.zSorted = null;
                    this.isContainer = true;
                    this.isLayoutContainer = true;
                }
                PanelUpdaterTree.prototype.walk = function (direction) {
                    if (direction === minerva.WalkDirection.ZForward || direction === minerva.WalkDirection.ZReverse) {
                        this.zSort();
                        return walkArray(this.zSorted, direction === minerva.WalkDirection.ZReverse);
                    }
                    return walkArray(this.children, direction === minerva.WalkDirection.Reverse);
                };
                PanelUpdaterTree.prototype.zSort = function () {
                    var zs = this.zSorted;
                    if (zs)
                        return;
                    zs = this.zSorted = [];
                    for (var i = 0, walker = this.walk(); walker.step(); i++) {
                        var cur = walker.current;
                        cur.setAttachedValue("Panel.Index", i);
                        zs.push(cur);
                    }
                    zs.sort(zIndexComparer);
                };
                PanelUpdaterTree.prototype.onChildAttached = function (child) {
                    this.zSorted = null;
                };
                PanelUpdaterTree.prototype.onChildDetached = function (child) {
                    this.zSorted = null;
                };
                return PanelUpdaterTree;
            })(minerva.core.UpdaterTree);
            panel.PanelUpdaterTree = PanelUpdaterTree;
            function walkArray(arr, reverse) {
                var len = arr.length;
                var e = { step: undefined, current: undefined };
                var index;
                if (reverse) {
                    index = len;
                    e.step = function () {
                        index--;
                        if (index < 0) {
                            e.current = undefined;
                            return false;
                        }
                        e.current = arr[index];
                        return true;
                    };
                }
                else {
                    index = -1;
                    e.step = function () {
                        index++;
                        if (index >= len) {
                            e.current = undefined;
                            return false;
                        }
                        e.current = arr[index];
                        return true;
                    };
                }
                return e;
            }
            function zIndexComparer(upd1, upd2) {
                var zi1 = upd1.getAttachedValue("Panel.ZIndex");
                var zi2 = upd2.getAttachedValue("Panel.ZIndex");
                if (zi1 == null && zi2 == null) {
                    zi1 = upd1.getAttachedValue("Panel.Index");
                    zi2 = upd2.getAttachedValue("Panel.Index");
                }
                else if (zi1 == null) {
                    return zi2 > 0 ? -1 : 1;
                }
                else if (zi2 == null) {
                    return zi1 > 0 ? 1 : -1;
                }
                return zi1 === zi2 ? 0 : ((zi1 < zi2) ? -1 : 1);
            }
        })(panel = controls.panel || (controls.panel = {}));
    })(controls = minerva.controls || (minerva.controls = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var controls;
    (function (controls) {
        var popup;
        (function (popup) {
            var PopupUpdater = (function (_super) {
                __extends(PopupUpdater, _super);
                function PopupUpdater() {
                    _super.apply(this, arguments);
                }
                PopupUpdater.prototype.init = function () {
                    this.setTree(new popup.PopupUpdaterTree())
                        .setProcessDownPipe(minerva.singleton(popup.processdown.PopupProcessDownPipeDef))
                        .setProcessUpPipe(minerva.singleton(popup.processup.PopupProcessUpPipeDef))
                        .setHitTestPipe(minerva.singleton(popup.hittest.PopupHitTestPipeDef));
                    var assets = this.assets;
                    assets.horizontalOffset = 0;
                    assets.verticalOffset = 0;
                    assets.isVisible = false;
                    assets.isOpen = false;
                    _super.prototype.init.call(this);
                };
                PopupUpdater.prototype.setInitiator = function (initiator) {
                    this.tree.initiatorSurface = initiator.tree.surface;
                };
                PopupUpdater.prototype.setChild = function (child) {
                    var old = this.tree.popupChild;
                    if (old) {
                        old.assets.carrierXform = null;
                    }
                    this.tree.popupChild = child;
                    if (child) {
                        child.assets.carrierXform = minerva.mat3.identity();
                    }
                };
                PopupUpdater.prototype.setLayer = function (layer) {
                    this.hide();
                    this.tree.layer = layer;
                    if (this.assets.isOpen)
                        this.show();
                };
                PopupUpdater.prototype.hide = function () {
                    var layer = this.tree.layer;
                    if (!this.assets.isVisible || !layer)
                        return false;
                    this.assets.isVisible = false;
                    var surface = this.tree.initiatorSurface;
                    if (!surface)
                        return false;
                    surface.detachLayer(layer);
                    return true;
                };
                PopupUpdater.prototype.show = function () {
                    var layer = this.tree.layer;
                    if (this.assets.isVisible || !layer)
                        return false;
                    this.assets.isVisible = true;
                    var surface = this.tree.initiatorSurface;
                    if (!surface)
                        return false;
                    surface.attachLayer(layer);
                    return true;
                };
                return PopupUpdater;
            })(minerva.core.Updater);
            popup.PopupUpdater = PopupUpdater;
            var reactTo;
            (function (reactTo) {
                function isOpen(updater, oldValue, newValue) {
                    (newValue === true) ? updater.show() : updater.hide();
                }
                reactTo.isOpen = isOpen;
                function horizontalOffset(updater, oldValue, newValue) {
                    var tree = updater.tree;
                    var child = tree.popupChild;
                    if (!child)
                        return;
                    var tweenX = newValue - oldValue;
                    if (tweenX === 0)
                        return;
                    tweenOffset(child, tweenX, 0);
                    if (tree.layer)
                        tree.layer.invalidateMeasure();
                }
                reactTo.horizontalOffset = horizontalOffset;
                function verticalOffset(updater, oldValue, newValue) {
                    var tree = updater.tree;
                    var child = tree.popupChild;
                    if (!child)
                        return;
                    var tweenY = newValue - oldValue;
                    if (tweenY === 0)
                        return;
                    tweenOffset(child, 0, tweenY);
                    if (tree.layer)
                        tree.layer.invalidateMeasure();
                }
                reactTo.verticalOffset = verticalOffset;
                function tweenOffset(child, tweenX, tweenY) {
                    if (child.assets.carrierXform) {
                        minerva.mat3.translate(child.assets.carrierXform, tweenX, tweenY);
                    }
                }
            })(reactTo = popup.reactTo || (popup.reactTo = {}));
        })(popup = controls.popup || (controls.popup = {}));
    })(controls = minerva.controls || (minerva.controls = {}));
})(minerva || (minerva = {}));
/// <reference path="../../core/UpdaterTree" />
var minerva;
(function (minerva) {
    var controls;
    (function (controls) {
        var popup;
        (function (popup) {
            var PopupUpdaterTree = (function (_super) {
                __extends(PopupUpdaterTree, _super);
                function PopupUpdaterTree() {
                    _super.apply(this, arguments);
                    this.popupChild = undefined;
                    this.layer = undefined;
                    this.initiatorSurface = undefined;
                }
                return PopupUpdaterTree;
            })(minerva.core.UpdaterTree);
            popup.PopupUpdaterTree = PopupUpdaterTree;
        })(popup = controls.popup || (controls.popup = {}));
    })(controls = minerva.controls || (minerva.controls = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var controls;
    (function (controls) {
        var scrollcontentpresenter;
        (function (scrollcontentpresenter) {
            var ScrollContentPresenterUpdater = (function (_super) {
                __extends(ScrollContentPresenterUpdater, _super);
                function ScrollContentPresenterUpdater() {
                    _super.apply(this, arguments);
                }
                ScrollContentPresenterUpdater.prototype.init = function () {
                    this.setMeasurePipe(minerva.singleton(scrollcontentpresenter.measure.ScrollContentPresenterMeasurePipeDef))
                        .setArrangePipe(minerva.singleton(scrollcontentpresenter.arrange.ScrollContentPresenterArrangePipeDef))
                        .setRenderPipe(minerva.singleton(scrollcontentpresenter.render.ScrollContentPresenterRenderPipeDef));
                    var assets = this.assets;
                    assets.internalClip = new minerva.Rect();
                    assets.scrollData = {
                        canHorizontallyScroll: false,
                        canVerticallyScroll: false,
                        offsetX: 0,
                        offsetY: 0,
                        cachedOffsetX: 0,
                        cachedOffsetY: 0,
                        viewportWidth: 0,
                        viewportHeight: 0,
                        extentWidth: 0,
                        extentHeight: 0,
                        maxDesiredWidth: 0,
                        maxDesiredHeight: 0,
                        invalidate: function () {
                        }
                    };
                    _super.prototype.init.call(this);
                };
                return ScrollContentPresenterUpdater;
            })(minerva.core.Updater);
            scrollcontentpresenter.ScrollContentPresenterUpdater = ScrollContentPresenterUpdater;
        })(scrollcontentpresenter = controls.scrollcontentpresenter || (controls.scrollcontentpresenter = {}));
    })(controls = minerva.controls || (minerva.controls = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var controls;
    (function (controls) {
        var scrollcontentpresenter;
        (function (scrollcontentpresenter) {
            var helpers;
            (function (helpers) {
                function clampOffsets(sd) {
                    var changed = false;
                    var clampX = clampHorizontal(sd, sd.cachedOffsetX);
                    if (!areClose(clampX, sd.offsetX)) {
                        sd.offsetX = clampX;
                        changed = true;
                    }
                    var clampY = clampVertical(sd, sd.cachedOffsetY);
                    if (!areClose(clampY, sd.offsetY)) {
                        sd.offsetY = clampY;
                        changed = true;
                    }
                    return changed;
                }
                helpers.clampOffsets = clampOffsets;
                function clampHorizontal(sd, x) {
                    if (!sd.canHorizontallyScroll)
                        return 0;
                    return Math.max(0, Math.min(x, sd.extentWidth - sd.viewportWidth));
                }
                function clampVertical(sd, y) {
                    if (!sd.canVerticallyScroll)
                        return 0;
                    return Math.max(0, Math.min(y, sd.extentHeight - sd.viewportHeight));
                }
                var epsilon = 1.192093E-07;
                var adjustment = 10;
                function areClose(val1, val2) {
                    if (val1 === val2)
                        return true;
                    var softdiff = (Math.abs(val1) + Math.abs(val2) + adjustment) * epsilon;
                    var diff = val1 - val2;
                    return -softdiff < diff && diff < softdiff;
                }
            })(helpers = scrollcontentpresenter.helpers || (scrollcontentpresenter.helpers = {}));
        })(scrollcontentpresenter = controls.scrollcontentpresenter || (controls.scrollcontentpresenter = {}));
    })(controls = minerva.controls || (minerva.controls = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var controls;
    (function (controls) {
        var stackpanel;
        (function (stackpanel) {
            var StackPanelUpdater = (function (_super) {
                __extends(StackPanelUpdater, _super);
                function StackPanelUpdater() {
                    _super.apply(this, arguments);
                }
                StackPanelUpdater.prototype.init = function () {
                    this.setMeasurePipe(minerva.singleton(stackpanel.measure.StackPanelMeasurePipeDef))
                        .setArrangePipe(minerva.singleton(stackpanel.arrange.StackPanelArrangePipeDef));
                    this.assets.orientation = minerva.Orientation.Vertical;
                    _super.prototype.init.call(this);
                };
                return StackPanelUpdater;
            })(controls.panel.PanelUpdater);
            stackpanel.StackPanelUpdater = StackPanelUpdater;
        })(stackpanel = controls.stackpanel || (controls.stackpanel = {}));
    })(controls = minerva.controls || (minerva.controls = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var controls;
    (function (controls) {
        var textblock;
        (function (textblock) {
            var TextBlockUpdater = (function (_super) {
                __extends(TextBlockUpdater, _super);
                function TextBlockUpdater() {
                    _super.apply(this, arguments);
                }
                TextBlockUpdater.prototype.init = function () {
                    this.setTree(new textblock.TextBlockUpdaterTree())
                        .setMeasurePipe(minerva.singleton(textblock.measure.TextBlockMeasurePipeDef))
                        .setArrangePipe(minerva.singleton(textblock.arrange.TextBlockArrangePipeDef))
                        .setProcessUpPipe(minerva.singleton(textblock.processup.TextBlockProcessUpPipeDef))
                        .setRenderPipe(minerva.singleton(textblock.render.TextBlockRenderPipeDef))
                        .setHitTestPipe(minerva.singleton(textblock.hittest.TextBlockHitTestPipeDef));
                    this.setDocument();
                    var assets = this.assets;
                    assets.padding = new minerva.Thickness();
                    assets.selectionStart = 0;
                    assets.selectionLength = 0;
                    assets.textWrapping = minerva.TextWrapping.NoWrap;
                    assets.textAlignment = minerva.TextAlignment.Left;
                    assets.textTrimming = minerva.TextTrimming.None;
                    assets.lineStackingStrategy = minerva.LineStackingStrategy.MaxHeight;
                    assets.lineHeight = NaN;
                    _super.prototype.init.call(this);
                };
                TextBlockUpdater.prototype.setDocument = function (docdef) {
                    if (this.tree.doc)
                        return this;
                    this.tree.doc = minerva.text.createDocumentLayout(docdef || new minerva.text.DocumentLayoutDef());
                    return this;
                };
                TextBlockUpdater.prototype.invalidateFont = function (full) {
                    if (full === true) {
                        this.invalidateMeasure();
                        this.invalidateArrange();
                        this.updateBounds(true);
                    }
                    this.invalidate();
                };
                TextBlockUpdater.prototype.invalidateTextMetrics = function () {
                    this.invalidateMeasure();
                    this.invalidateArrange();
                    this.updateBounds(true);
                    this.invalidate();
                    var docassets = this.tree.doc.assets;
                    docassets.actualWidth = NaN;
                    docassets.actualHeight = NaN;
                };
                return TextBlockUpdater;
            })(minerva.core.Updater);
            textblock.TextBlockUpdater = TextBlockUpdater;
        })(textblock = controls.textblock || (controls.textblock = {}));
    })(controls = minerva.controls || (minerva.controls = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var controls;
    (function (controls) {
        var textblock;
        (function (textblock) {
            var TextBlockUpdaterTree = (function (_super) {
                __extends(TextBlockUpdaterTree, _super);
                function TextBlockUpdaterTree() {
                    _super.apply(this, arguments);
                    this.children = [];
                }
                TextBlockUpdaterTree.prototype.setMaxWidth = function (width, docctx) {
                    return this.doc.def.setMaxWidth(docctx, this.doc.assets, width);
                };
                TextBlockUpdaterTree.prototype.layout = function (constraint, docctx) {
                    var doc = this.doc;
                    doc.def.layout(docctx, doc.assets, constraint, this.walkText());
                    return new minerva.Size(doc.assets.actualWidth, doc.assets.actualHeight);
                };
                TextBlockUpdaterTree.prototype.render = function (ctx, docctx) {
                    var doc = this.doc;
                    doc.def.render(ctx, docctx, doc.assets);
                };
                TextBlockUpdaterTree.prototype.setAvailableWidth = function (width) {
                    this.doc.assets.availableWidth = width;
                };
                TextBlockUpdaterTree.prototype.getHorizontalOffset = function (docctx) {
                    var doc = this.doc;
                    return doc.def.getHorizontalAlignmentX(docctx, doc.assets, doc.assets.actualWidth);
                };
                TextBlockUpdaterTree.prototype.clearText = function () {
                    this.children.length = 0;
                };
                TextBlockUpdaterTree.prototype.walkText = function () {
                    var i = -1;
                    var children = this.children;
                    return {
                        current: undefined,
                        step: function () {
                            i++;
                            this.current = children[i];
                            return this.current !== undefined;
                        }
                    };
                };
                TextBlockUpdaterTree.prototype.onTextAttached = function (child, index) {
                    if (index == null || index < 0 || index >= this.children.length)
                        this.children.push(child);
                    else
                        this.children.splice(index, 0, child);
                };
                TextBlockUpdaterTree.prototype.onTextDetached = function (child) {
                    var index = this.children.indexOf(child);
                    if (index > -1)
                        this.children.splice(index, 1);
                };
                return TextBlockUpdaterTree;
            })(minerva.core.UpdaterTree);
            textblock.TextBlockUpdaterTree = TextBlockUpdaterTree;
        })(textblock = controls.textblock || (controls.textblock = {}));
    })(controls = minerva.controls || (minerva.controls = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var controls;
    (function (controls) {
        var textboxview;
        (function (textboxview) {
            var CURSOR_BLINK_DIVIDER = 3;
            var CURSOR_BLINK_OFF_MULTIPLIER = 2;
            var CURSOR_BLINK_DELAY_MULTIPLIER = 3;
            var CURSOR_BLINK_ON_MULTIPLIER = 4;
            var CURSOR_BLINK_TIMEOUT_DEFAULT = 900;
            var Blinker = (function () {
                function Blinker(onChange) {
                    this.isEnabled = true;
                    this.isVisible = false;
                    this.$$blink_delay = CURSOR_BLINK_TIMEOUT_DEFAULT;
                    this.$$timeout = 0;
                    this.$$onChange = onChange;
                }
                Blinker.prototype.delay = function () {
                    this.$disconnect();
                    this.$connect(CURSOR_BLINK_DELAY_MULTIPLIER);
                    this.$show();
                };
                Blinker.prototype.begin = function () {
                    if (this.$$timeout === 0) {
                        this.$connect(CURSOR_BLINK_ON_MULTIPLIER);
                        this.$show();
                    }
                };
                Blinker.prototype.end = function () {
                    this.$disconnect();
                    this.$hide();
                };
                Blinker.prototype.$connect = function (multiplier) {
                    var _this = this;
                    var delay = this.$$blink_delay * multiplier / CURSOR_BLINK_DIVIDER;
                    this.$$timeout = window.setTimeout(function () { return _this.$blink(); }, delay);
                };
                Blinker.prototype.$disconnect = function () {
                    if (this.$$timeout !== 0) {
                        window.clearTimeout(this.$$timeout);
                        this.$$timeout = 0;
                    }
                };
                Blinker.prototype.$blink = function () {
                    if (this.isVisible) {
                        this.$hide();
                        this.$connect(CURSOR_BLINK_OFF_MULTIPLIER);
                    }
                    else {
                        this.$show();
                        this.$connect(CURSOR_BLINK_ON_MULTIPLIER);
                    }
                };
                Blinker.prototype.$show = function () {
                    if (this.isVisible)
                        return;
                    this.isVisible = true;
                    this.$$onChange && this.$$onChange(true);
                };
                Blinker.prototype.$hide = function () {
                    if (!this.isVisible)
                        return;
                    this.isVisible = false;
                    this.$$onChange && this.$$onChange(false);
                };
                return Blinker;
            })();
            textboxview.Blinker = Blinker;
        })(textboxview = controls.textboxview || (controls.textboxview = {}));
    })(controls = minerva.controls || (minerva.controls = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var controls;
    (function (controls) {
        var textboxview;
        (function (textboxview) {
            var TextBoxViewUpdater = (function (_super) {
                __extends(TextBoxViewUpdater, _super);
                function TextBoxViewUpdater() {
                    _super.apply(this, arguments);
                }
                TextBoxViewUpdater.prototype.init = function () {
                    var _this = this;
                    this.setTree(new textboxview.TextBoxViewUpdaterTree())
                        .setMeasurePipe(minerva.singleton(textboxview.measure.TextBoxViewMeasurePipeDef))
                        .setArrangePipe(minerva.singleton(textboxview.arrange.TextBoxViewArrangePipeDef))
                        .setProcessUpPipe(minerva.singleton(textboxview.processup.TextBoxViewProcessUpPipeDef))
                        .setRenderPipe(minerva.singleton(textboxview.render.TextBoxViewRenderPipeDef))
                        .setHitTestPipe(minerva.singleton(textboxview.hittest.TextBoxViewHitTestPipeDef));
                    this.setDocument();
                    var assets = this.assets;
                    assets.selectionStart = 0;
                    assets.selectionLength = 0;
                    assets.textWrapping = minerva.TextWrapping.NoWrap;
                    assets.textAlignment = minerva.TextAlignment.Left;
                    assets.lineStackingStrategy = minerva.LineStackingStrategy.MaxHeight;
                    assets.lineHeight = NaN;
                    assets.isCaretVisible = false;
                    assets.caretBrush = null;
                    assets.caretRegion = new minerva.Rect();
                    assets.isReadOnly = false;
                    this.blinker = new textboxview.Blinker(function (isVisible) {
                        _this.assets.isCaretVisible = isVisible;
                        _this.invalidateCaret();
                    });
                    _super.prototype.init.call(this);
                };
                TextBoxViewUpdater.prototype.setDocument = function (docdef) {
                    if (this.tree.doc)
                        return this;
                    this.tree.doc = minerva.text.createDocumentLayout(docdef || new minerva.text.DocumentLayoutDef());
                    return this;
                };
                TextBoxViewUpdater.prototype.getCursorFromPoint = function (point) {
                    var doc = this.tree.doc;
                    return doc.def.getCursorFromPoint(point, this.assets, doc.assets);
                };
                TextBoxViewUpdater.prototype.invalidateFont = function (full) {
                    if (full === true) {
                        this.invalidateMeasure();
                        this.invalidateArrange();
                        this.updateBounds(true);
                    }
                    this.invalidate();
                };
                TextBoxViewUpdater.prototype.invalidateTextMetrics = function () {
                    this.invalidateMeasure()
                        .invalidateArrange()
                        .updateBounds(true)
                        .invalidate();
                    return this;
                };
                TextBoxViewUpdater.prototype.invalidateMeasure = function () {
                    _super.prototype.invalidateMeasure.call(this);
                    var docassets = this.tree.doc.assets;
                    docassets.actualWidth = NaN;
                    docassets.actualHeight = NaN;
                    return this;
                };
                TextBoxViewUpdater.prototype.invalidateCaret = function () {
                    var assets = this.assets;
                    var region = new minerva.Rect();
                    minerva.Rect.copyTo(assets.caretRegion, region);
                    minerva.Rect.transform(region, assets.absoluteXform);
                    this.invalidate(region);
                };
                TextBoxViewUpdater.prototype.invalidateSelectionStart = function () {
                    this.tree.doc.assets.selCached = false;
                    this.invalidateCaretRegion();
                    this.resetCaretBlinker(true);
                };
                TextBoxViewUpdater.prototype.invalidateSelectionLength = function (switching) {
                    this.tree.doc.assets.selCached = false;
                    this.invalidate();
                    this.resetCaretBlinker(switching);
                    if (switching)
                        this.invalidateCaretRegion();
                };
                TextBoxViewUpdater.prototype.invalidateCaretRegion = function () {
                    this.invalidateCaret();
                    var cr = this.assets.caretRegion;
                    cr.x = cr.y = cr.width = cr.height = 0;
                };
                TextBoxViewUpdater.prototype.resetCaretBlinker = function (shouldDelay) {
                    var assets = this.assets;
                    var blinker = this.blinker;
                    if (assets.selectionLength > 0 || assets.isReadOnly || !assets.isFocused)
                        return blinker.end();
                    if (shouldDelay)
                        return blinker.delay();
                    return blinker.begin();
                };
                return TextBoxViewUpdater;
            })(minerva.core.Updater);
            textboxview.TextBoxViewUpdater = TextBoxViewUpdater;
        })(textboxview = controls.textboxview || (controls.textboxview = {}));
    })(controls = minerva.controls || (minerva.controls = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var controls;
    (function (controls) {
        var textboxview;
        (function (textboxview) {
            var TextBoxViewUpdaterTree = (function (_super) {
                __extends(TextBoxViewUpdaterTree, _super);
                function TextBoxViewUpdaterTree() {
                    _super.apply(this, arguments);
                    this.children = [];
                }
                TextBoxViewUpdaterTree.prototype.setMaxWidth = function (width, docctx) {
                    return this.doc.def.setMaxWidth(docctx, this.doc.assets, width);
                };
                TextBoxViewUpdaterTree.prototype.layout = function (constraint, docctx) {
                    var doc = this.doc;
                    doc.def.layout(docctx, doc.assets, constraint, this.walkText());
                    return new minerva.Size(doc.assets.actualWidth, doc.assets.actualHeight);
                };
                TextBoxViewUpdaterTree.prototype.render = function (ctx, docctx) {
                    var doc = this.doc;
                    doc.def.render(ctx, docctx, doc.assets);
                };
                TextBoxViewUpdaterTree.prototype.setAvailableWidth = function (width) {
                    this.doc.assets.availableWidth = width;
                };
                TextBoxViewUpdaterTree.prototype.getHorizontalOffset = function (docctx) {
                    var doc = this.doc;
                    return doc.def.getHorizontalAlignmentX(docctx, doc.assets, doc.assets.actualWidth);
                };
                TextBoxViewUpdaterTree.prototype.getCaretRegion = function (docctx) {
                    var doc = this.doc;
                    return doc.def.getCaretFromCursor(docctx, doc.assets);
                };
                TextBoxViewUpdaterTree.prototype.clearText = function () {
                    this.children.length = 0;
                };
                TextBoxViewUpdaterTree.prototype.walkText = function () {
                    var i = -1;
                    var children = this.children;
                    return {
                        current: undefined,
                        step: function () {
                            i++;
                            this.current = children[i];
                            return this.current !== undefined;
                        }
                    };
                };
                TextBoxViewUpdaterTree.prototype.onTextAttached = function (child, index) {
                    if (index == null || index < 0 || index >= this.children.length)
                        this.children.push(child);
                    else
                        this.children.splice(index, 0, child);
                };
                TextBoxViewUpdaterTree.prototype.onTextDetached = function (child) {
                    var index = this.children.indexOf(child);
                    if (index > -1)
                        this.children.splice(index, 1);
                };
                return TextBoxViewUpdaterTree;
            })(minerva.core.UpdaterTree);
            textboxview.TextBoxViewUpdaterTree = TextBoxViewUpdaterTree;
        })(textboxview = controls.textboxview || (controls.textboxview = {}));
    })(controls = minerva.controls || (minerva.controls = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var controls;
    (function (controls) {
        var usercontrol;
        (function (usercontrol) {
            var UserControlUpdater = (function (_super) {
                __extends(UserControlUpdater, _super);
                function UserControlUpdater() {
                    _super.apply(this, arguments);
                }
                UserControlUpdater.prototype.init = function () {
                    this.setMeasurePipe(minerva.singleton(usercontrol.measure.UserControlMeasurePipeDef))
                        .setArrangePipe(minerva.singleton(usercontrol.arrange.UserControlArrangePipeDef))
                        .setProcessDownPipe(minerva.singleton(usercontrol.processdown.UserControlProcessDownPipeDef));
                    var assets = this.assets;
                    assets.breakLayoutClip = true;
                    assets.padding = new minerva.Thickness();
                    assets.borderThickness = new minerva.Thickness();
                    _super.prototype.init.call(this);
                };
                return UserControlUpdater;
            })(controls.control.ControlUpdater);
            usercontrol.UserControlUpdater = UserControlUpdater;
        })(usercontrol = controls.usercontrol || (controls.usercontrol = {}));
    })(controls = minerva.controls || (minerva.controls = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var controls;
    (function (controls) {
        var video;
        (function (video) {
            var VideoUpdater = (function (_super) {
                __extends(VideoUpdater, _super);
                function VideoUpdater() {
                    _super.apply(this, arguments);
                }
                VideoUpdater.prototype.onSurfaceChanged = function (oldSurface, newSurface) {
                    if (oldSurface)
                        oldSurface.unhookPrerender(this);
                    if (newSurface)
                        newSurface.hookPrerender(this);
                };
                VideoUpdater.prototype.preRender = function () {
                    var assets = this.assets;
                    if (assets.source && assets.source.getIsPlaying())
                        this.invalidate();
                };
                return VideoUpdater;
            })(controls.image.ImageUpdater);
            video.VideoUpdater = VideoUpdater;
        })(video = controls.video || (controls.video = {}));
    })(controls = minerva.controls || (minerva.controls = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var controls;
    (function (controls) {
        var virtualizingpanel;
        (function (virtualizingpanel) {
            var VirtualizingPanelUpdater = (function (_super) {
                __extends(VirtualizingPanelUpdater, _super);
                function VirtualizingPanelUpdater() {
                    _super.apply(this, arguments);
                }
                VirtualizingPanelUpdater.prototype.init = function () {
                    this.setTree(new virtualizingpanel.VirtualizingPanelUpdaterTree());
                    _super.prototype.init.call(this);
                };
                return VirtualizingPanelUpdater;
            })(controls.panel.PanelUpdater);
            virtualizingpanel.VirtualizingPanelUpdater = VirtualizingPanelUpdater;
        })(virtualizingpanel = controls.virtualizingpanel || (controls.virtualizingpanel = {}));
    })(controls = minerva.controls || (minerva.controls = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var controls;
    (function (controls) {
        var virtualizingpanel;
        (function (virtualizingpanel) {
            virtualizingpanel.NO_CONTAINER_OWNER = {
                itemCount: 0,
                createGenerator: function () {
                    return {
                        current: undefined,
                        generate: function () {
                            return false;
                        }
                    };
                },
                remove: function (index, count) {
                }
            };
            var VirtualizingPanelUpdaterTree = (function (_super) {
                __extends(VirtualizingPanelUpdaterTree, _super);
                function VirtualizingPanelUpdaterTree() {
                    _super.apply(this, arguments);
                    this.containerOwner = virtualizingpanel.NO_CONTAINER_OWNER;
                }
                return VirtualizingPanelUpdaterTree;
            })(controls.panel.PanelUpdaterTree);
            virtualizingpanel.VirtualizingPanelUpdaterTree = VirtualizingPanelUpdaterTree;
        })(virtualizingpanel = controls.virtualizingpanel || (controls.virtualizingpanel = {}));
    })(controls = minerva.controls || (minerva.controls = {}));
})(minerva || (minerva = {}));
/// <reference path="../virtualizingpanel/VirtualizingPanelUpdater" />
var minerva;
(function (minerva) {
    var controls;
    (function (controls) {
        var virtualizingstackpanel;
        (function (virtualizingstackpanel) {
            var VirtualizingStackPanelUpdater = (function (_super) {
                __extends(VirtualizingStackPanelUpdater, _super);
                function VirtualizingStackPanelUpdater() {
                    _super.apply(this, arguments);
                }
                VirtualizingStackPanelUpdater.prototype.init = function () {
                    this.setMeasurePipe(minerva.singleton(virtualizingstackpanel.measure.VirtualizingStackPanelMeasurePipeDef))
                        .setArrangePipe(minerva.singleton(virtualizingstackpanel.arrange.VirtualizingStackPanelArrangePipeDef));
                    var assets = this.assets;
                    assets.orientation = minerva.Orientation.Vertical;
                    assets.scrollData = {
                        canHorizontallyScroll: false,
                        canVerticallyScroll: false,
                        offsetX: 0,
                        offsetY: 0,
                        cachedOffsetX: 0,
                        cachedOffsetY: 0,
                        viewportWidth: 0,
                        viewportHeight: 0,
                        extentWidth: 0,
                        extentHeight: 0,
                        maxDesiredWidth: 0,
                        maxDesiredHeight: 0,
                        invalidate: function () {
                        }
                    };
                    _super.prototype.init.call(this);
                };
                return VirtualizingStackPanelUpdater;
            })(controls.virtualizingpanel.VirtualizingPanelUpdater);
            virtualizingstackpanel.VirtualizingStackPanelUpdater = VirtualizingStackPanelUpdater;
        })(virtualizingstackpanel = controls.virtualizingstackpanel || (controls.virtualizingstackpanel = {}));
    })(controls = minerva.controls || (minerva.controls = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var path;
    (function (path) {
        var segments;
        (function (segments) {
            function arc(x, y, radius, sa, ea, cc) {
                var inited = false;
                var sx;
                var sy;
                var ex;
                var ey;
                var l;
                var r;
                var t;
                var b;
                var cl;
                var cr;
                var ct;
                var cb;
                function init() {
                    if (inited)
                        return;
                    sx = x + (radius * Math.cos(sa));
                    sy = y + (radius * Math.sin(sa));
                    ex = x + (radius * Math.cos(ea));
                    ey = y + (radius * Math.sin(ea));
                    l = x - radius;
                    cl = arcContainsPoint(sx, sy, ex, ey, l, y, cc);
                    r = x + radius;
                    cr = arcContainsPoint(sx, sy, ex, ey, r, y, cc);
                    t = y - radius;
                    ct = arcContainsPoint(sx, sy, ex, ey, x, t, cc);
                    b = y + radius;
                    cb = arcContainsPoint(sx, sy, ex, ey, x, b, cc);
                    inited = true;
                }
                return {
                    sx: null,
                    sy: null,
                    isSingle: true,
                    x: x,
                    y: y,
                    ex: x,
                    ey: y,
                    radius: radius,
                    sAngle: sa,
                    eAngle: ea,
                    aClockwise: cc,
                    draw: function (ctx) {
                        ctx.arc(x, y, radius, sa, ea, cc);
                    },
                    extendFillBox: function (box) {
                        if (ea === sa)
                            return;
                        init();
                        this.ex = ex;
                        this.ey = ey;
                        box.l = Math.min(box.l, sx, ex);
                        box.r = Math.max(box.r, sx, ex);
                        box.t = Math.min(box.t, sy, ey);
                        box.b = Math.max(box.b, sy, ey);
                        if (cl)
                            box.l = Math.min(box.l, l);
                        if (cr)
                            box.r = Math.max(box.r, r);
                        if (ct)
                            box.t = Math.min(box.t, t);
                        if (cb)
                            box.b = Math.max(box.b, b);
                    },
                    extendStrokeBox: function (box, pars) {
                        if (ea === sa)
                            return;
                        init();
                        this.ex = ex;
                        this.ey = ey;
                        box.l = Math.min(box.l, sx, ex);
                        box.r = Math.max(box.r, sx, ex);
                        box.t = Math.min(box.t, sy, ey);
                        box.b = Math.max(box.b, sy, ey);
                        var hs = pars.strokeThickness / 2.0;
                        if (cl)
                            box.l = Math.min(box.l, l - hs);
                        if (cr)
                            box.r = Math.max(box.r, r + hs);
                        if (ct)
                            box.t = Math.min(box.t, t - hs);
                        if (cb)
                            box.b = Math.max(box.b, b + hs);
                        var cap = pars.strokeStartLineCap || pars.strokeEndLineCap || 0;
                        var sv = this.getStartVector();
                        sv[0] = -sv[0];
                        sv[1] = -sv[1];
                        var ss = getCapSpread(sx, sy, pars.strokeThickness, cap, sv);
                        var ev = this.getEndVector();
                        var es = getCapSpread(ex, ey, pars.strokeThickness, cap, ev);
                        box.l = Math.min(box.l, ss.x1, ss.x2, es.x1, es.x2);
                        box.r = Math.max(box.r, ss.x1, ss.x2, es.x1, es.x2);
                        box.t = Math.min(box.t, ss.y1, ss.y2, es.y1, es.y2);
                        box.b = Math.max(box.b, ss.y1, ss.y2, es.y1, es.y2);
                    },
                    toString: function () {
                        return "";
                    },
                    getStartVector: function () {
                        var rv = [
                            sx - x,
                            sy - y
                        ];
                        if (cc)
                            return [rv[1], -rv[0]];
                        return [-rv[1], rv[0]];
                    },
                    getEndVector: function () {
                        var rv = [
                            ex - x,
                            ey - y
                        ];
                        if (cc)
                            return [rv[1], -rv[0]];
                        return [-rv[1], rv[0]];
                    },
                };
            }
            segments.arc = arc;
            function arcContainsPoint(sx, sy, ex, ey, cpx, cpy, cc) {
                var n = (ex - sx) * (cpy - sy) - (cpx - sx) * (ey - sy);
                if (n === 0)
                    return true;
                if (n > 0 && cc)
                    return true;
                if (n < 0 && !cc)
                    return true;
                return false;
            }
            function getCapSpread(x, y, thickness, cap, vector) {
                var hs = thickness / 2.0;
                switch (cap) {
                    case minerva.PenLineCap.Round:
                        return {
                            x1: x - hs,
                            x2: x + hs,
                            y1: y - hs,
                            y2: y + hs
                        };
                        break;
                    case minerva.PenLineCap.Square:
                        var ed = normalizeVector(vector);
                        var edo = perpendicularVector(ed);
                        return {
                            x1: x + hs * (ed[0] + edo[0]),
                            x2: x + hs * (ed[0] - edo[0]),
                            y1: y + hs * (ed[1] + edo[1]),
                            y2: y + hs * (ed[1] - edo[1])
                        };
                        break;
                    case minerva.PenLineCap.Flat:
                    default:
                        var ed = normalizeVector(vector);
                        var edo = perpendicularVector(ed);
                        return {
                            x1: x + hs * edo[0],
                            x2: x + hs * -edo[0],
                            y1: y + hs * edo[1],
                            y2: y + hs * -edo[1]
                        };
                        break;
                }
            }
            function normalizeVector(v) {
                var len = Math.sqrt(v[0] * v[0] + v[1] * v[1]);
                return [
                    v[0] / len,
                    v[1] / len
                ];
            }
            function perpendicularVector(v) {
                return [
                    -v[1],
                    v[0]
                ];
            }
        })(segments = path.segments || (path.segments = {}));
    })(path = minerva.path || (minerva.path = {}));
})(minerva || (minerva = {}));
function radToDegrees(rad) {
    return rad * 180 / Math.PI;
}
var minerva;
(function (minerva) {
    var path;
    (function (path) {
        var segments;
        (function (segments) {
            var EPSILON = 1e-10;
            function arcTo(cpx, cpy, x, y, radius) {
                var line;
                var arc;
                var inited = false;
                function init(prevX, prevY) {
                    if (inited)
                        return;
                    if (line && arc)
                        return arc;
                    var v1 = [cpx - prevX, cpy - prevY];
                    var v2 = [x - cpx, y - cpy];
                    var inner_theta = Math.PI - minerva.Vector.angleBetween(v1, v2);
                    var a = getTangentPoint(inner_theta, radius, [prevX, prevY], v1, true);
                    var b = getTangentPoint(inner_theta, radius, [cpx, cpy], v2, false);
                    var c = getPerpendicularIntersections(a, v1, b, v2);
                    var cc = !minerva.Vector.isClockwiseTo(v1, v2);
                    var sa = Math.atan2(a[1] - c[1], a[0] - c[0]);
                    if (sa < 0)
                        sa = (2 * Math.PI) + sa;
                    var ea = Math.atan2(b[1] - c[1], b[0] - c[0]);
                    if (ea < 0)
                        ea = (2 * Math.PI) + ea;
                    line = segments.line(a[0], a[1]);
                    line.sx = prevX;
                    line.sy = prevY;
                    arc = segments.arc(c[0], c[1], radius, sa, ea, cc);
                    inited = true;
                }
                return {
                    sx: null,
                    sy: null,
                    isSingle: false,
                    cpx: cpx,
                    cpy: cpy,
                    x: x,
                    y: y,
                    ex: x,
                    ey: y,
                    radius: radius,
                    draw: function (ctx) {
                        ctx.arcTo(cpx, cpy, x, y, radius);
                    },
                    extendFillBox: function (box) {
                        init(this.sx, this.sy);
                        this.ex = arc.ex;
                        this.ey = arc.ey;
                        box.l = Math.min(box.l, this.sx);
                        box.r = Math.max(box.r, this.sx);
                        box.t = Math.min(box.t, this.sy);
                        box.b = Math.max(box.b, this.sy);
                        line.extendFillBox(box);
                        arc.extendFillBox(box);
                    },
                    extendStrokeBox: function (box, pars) {
                        init(this.sx, this.sy);
                        this.ex = arc.ex;
                        this.ey = arc.ey;
                        var hs = pars.strokeThickness / 2;
                        box.l = Math.min(box.l, this.sx - hs);
                        box.r = Math.max(box.r, this.sx + hs);
                        box.t = Math.min(box.t, this.sy - hs);
                        box.b = Math.max(box.b, this.sy + hs);
                        line.extendStrokeBox(box, pars);
                        arc.extendStrokeBox(box, pars);
                    },
                    toString: function () {
                        return "";
                    },
                    getStartVector: function () {
                        init(this.sx, this.sy);
                        return line.getStartVector();
                    },
                    getEndVector: function () {
                        return arc.getEndVector();
                    }
                };
            }
            segments.arcTo = arcTo;
            function getTangentPoint(theta, radius, s, d, invert) {
                var len = Math.sqrt(d[0] * d[0] + d[1] * d[1]);
                var f = radius / Math.tan(theta / 2);
                var t = f / len;
                if (invert)
                    t = 1 - t;
                return [s[0] + t * d[0], s[1] + t * d[1]];
            }
            function getPerpendicularIntersections(s1, d1, s2, d2) {
                return minerva.Vector.intersection(s1, minerva.Vector.orthogonal(d1.slice(0)), s2, minerva.Vector.orthogonal(d2.slice(0)));
            }
        })(segments = path.segments || (path.segments = {}));
    })(path = minerva.path || (minerva.path = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var path;
    (function (path) {
        var segments;
        (function (segments) {
            function close() {
                return {
                    sx: null,
                    sy: null,
                    ex: null,
                    ey: null,
                    isSingle: false,
                    isClose: true,
                    draw: function (ctx) {
                        ctx.closePath();
                    },
                    extendFillBox: function (box) {
                    },
                    extendStrokeBox: function (box, pars) {
                    },
                    toString: function () {
                        return "Z";
                    },
                    getStartVector: function () {
                        return null;
                    },
                    getEndVector: function () {
                        return null;
                    }
                };
            }
            segments.close = close;
        })(segments = path.segments || (path.segments = {}));
    })(path = minerva.path || (minerva.path = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var path;
    (function (path) {
        var segments;
        (function (segments) {
            function cubicBezier(cp1x, cp1y, cp2x, cp2y, x, y) {
                return {
                    sx: null,
                    sy: null,
                    ex: x,
                    ey: y,
                    isSingle: false,
                    cp1x: cp1x,
                    cp1y: cp1y,
                    cp2x: cp2x,
                    cp2y: cp2y,
                    x: x,
                    y: y,
                    draw: function (ctx) {
                        ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);
                    },
                    extendFillBox: function (box) {
                        var m = getMaxima(this.sx, cp1x, cp2x, x, this.sy, cp1y, cp2y, y);
                        if (m.x[0] != null) {
                            box.l = Math.min(box.l, m.x[0]);
                            box.r = Math.max(box.r, m.x[0]);
                        }
                        if (m.x[1] != null) {
                            box.l = Math.min(box.l, m.x[1]);
                            box.r = Math.max(box.r, m.x[1]);
                        }
                        if (m.y[0] != null) {
                            box.t = Math.min(box.t, m.y[0]);
                            box.b = Math.max(box.b, m.y[0]);
                        }
                        if (m.y[1] != null) {
                            box.t = Math.min(box.t, m.y[1]);
                            box.b = Math.max(box.b, m.y[1]);
                        }
                        box.l = Math.min(box.l, x);
                        box.r = Math.max(box.r, x);
                        box.t = Math.min(box.t, y);
                        box.b = Math.max(box.b, y);
                    },
                    extendStrokeBox: function (box, pars) {
                        var hs = pars.strokeThickness / 2.0;
                        var m = getMaxima(this.sx, cp1x, cp2x, x, this.sy, cp1y, cp2y, y);
                        if (m.x[0] != null) {
                            box.l = Math.min(box.l, m.x[0] - hs);
                            box.r = Math.max(box.r, m.x[0] + hs);
                        }
                        if (m.x[1] != null) {
                            box.l = Math.min(box.l, m.x[1] - hs);
                            box.r = Math.max(box.r, m.x[1] + hs);
                        }
                        if (m.y[0] != null) {
                            box.t = Math.min(box.t, m.y[0] - hs);
                            box.b = Math.max(box.b, m.y[0] + hs);
                        }
                        if (m.y[1] != null) {
                            box.t = Math.min(box.t, m.y[1] - hs);
                            box.b = Math.max(box.b, m.y[1] + hs);
                        }
                        box.l = Math.min(box.l, x);
                        box.r = Math.max(box.r, x);
                        box.t = Math.min(box.t, y);
                        box.b = Math.max(box.b, y);
                    },
                    toString: function () {
                        return "C" + cp1x.toString() + "," + cp1y.toString() + " " + cp2x.toString() + "," + cp2y.toString() + " " + x.toString() + "," + y.toString();
                    },
                    getStartVector: function () {
                        return [
                            3 * (cp1x - this.sx),
                            3 * (cp1y - this.sy)
                        ];
                    },
                    getEndVector: function () {
                        return [
                            3 * (x - cp2x),
                            3 * (y - cp2y)
                        ];
                    }
                };
            }
            segments.cubicBezier = cubicBezier;
            function getMaxima(x1, x2, x3, x4, y1, y2, y3, y4) {
                return {
                    x: cod(x1, x2, x3, x4),
                    y: cod(y1, y2, y3, y4)
                };
            }
            function cod(a, b, c, d) {
                var u = 2 * a - 4 * b + 2 * c;
                var v = b - a;
                var w = -a + 3 * b + d - 3 * c;
                var rt = Math.sqrt(u * u - 4 * v * w);
                var cods = [null, null];
                if (isNaN(rt))
                    return cods;
                var t, ot;
                t = (-u + rt) / (2 * w);
                if (t >= 0 && t <= 1) {
                    ot = 1 - t;
                    cods[0] = (a * ot * ot * ot) + (3 * b * t * ot * ot) + (3 * c * ot * t * t) + (d * t * t * t);
                }
                t = (-u - rt) / (2 * w);
                if (t >= 0 && t <= 1) {
                    ot = 1 - t;
                    cods[1] = (a * ot * ot * ot) + (3 * b * t * ot * ot) + (3 * c * ot * t * t) + (d * t * t * t);
                }
                return cods;
            }
        })(segments = path.segments || (path.segments = {}));
    })(path = minerva.path || (minerva.path = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var path;
    (function (path) {
        var segments;
        (function (segments) {
            function ellipse(x, y, width, height) {
                var radiusX = width / 2;
                var radiusY = height / 2;
                var right = x + width;
                var bottom = y + height;
                var centerX = x + radiusX;
                var centerY = y + radiusY;
                return {
                    sx: null,
                    sy: null,
                    ex: x,
                    ey: y,
                    isSingle: true,
                    x: x,
                    y: y,
                    width: width,
                    height: height,
                    draw: function (ctx) {
                        ctx.beginPath();
                        if (width === height) {
                            ctx.arc(centerX, centerY, radiusX, 0, Math.PI * 2, false);
                            return;
                        }
                        var kappa = .5522848;
                        var ox = radiusX * kappa;
                        var oy = radiusY * kappa;
                        ctx.moveTo(x, centerY);
                        ctx.bezierCurveTo(x, centerY - oy, centerX - ox, y, centerX, y);
                        ctx.bezierCurveTo(centerX + ox, y, right, centerY - oy, right, centerY);
                        ctx.bezierCurveTo(right, centerY + oy, centerX + ox, bottom, centerX, bottom);
                        ctx.bezierCurveTo(centerX - ox, bottom, x, centerY + oy, x, centerY);
                        ctx.closePath();
                    },
                    extendFillBox: function (box) {
                        box.l = Math.min(box.l, x);
                        box.r = Math.max(box.r, x + width);
                        box.t = Math.min(box.t, y);
                        box.b = Math.max(box.b, y + height);
                    },
                    extendStrokeBox: function (box, pars) {
                        var hs = pars.strokeThickness / 2.0;
                        box.l = Math.min(box.l, x - hs);
                        box.r = Math.max(box.r, x + width + hs);
                        box.t = Math.min(box.t, y - hs);
                        box.b = Math.max(box.b, y + height + hs);
                    },
                    getStartVector: function () {
                        return null;
                    },
                    getEndVector: function () {
                        return null;
                    }
                };
            }
            segments.ellipse = ellipse;
        })(segments = path.segments || (path.segments = {}));
    })(path = minerva.path || (minerva.path = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var path;
    (function (path) {
        var segments;
        (function (segments_1) {
            function ellipticalArc(rx, ry, rotationAngle, isLargeArcFlag, sweepDirectionFlag, ex, ey) {
                return {
                    sx: null,
                    sy: null,
                    isSingle: false,
                    rx: rx,
                    ry: ry,
                    rotationAngle: rotationAngle,
                    isLargeArcFlag: isLargeArcFlag,
                    sweepDirectionFlag: sweepDirectionFlag,
                    ex: ex,
                    ey: ey,
                    sub: null,
                    draw: function (ctx) {
                        this.sub = this.sub || buildSegments(this);
                        for (var i = 0, sub = this.sub, len = sub.length; i < len; i++) {
                            sub[i].draw(ctx);
                        }
                    },
                    extendFillBox: function (box) {
                        this.sub = this.sub || buildSegments(this);
                        for (var i = 0, sub = this.sub, len = sub.length; i < len; i++) {
                            sub[i].extendFillBox(box);
                        }
                    },
                    extendStrokeBox: function (box, pars) {
                        this.sub = this.sub || buildSegments(this);
                        for (var i = 0, sub = this.sub, len = sub.length; i < len; i++) {
                            sub[i].extendStrokeBox(box, pars);
                        }
                    },
                    toString: function () {
                        return "A" + rx.toString() + "," + ry.toString() + " " + rotationAngle.toString() + " " + isLargeArcFlag.toString() + " " + sweepDirectionFlag.toString() + " " + ex.toString() + "," + ey.toString();
                    },
                    getStartVector: function () {
                        this.sub = this.sub || buildSegments(this);
                        var sub = this.sub[0];
                        return sub ? sub.getStartVector() : [0, 0];
                    },
                    getEndVector: function () {
                        this.sub = this.sub || buildSegments(this);
                        var sub = this.sub[this.sub.length - 1];
                        return sub ? sub.getEndVector() : [0, 0];
                    }
                };
            }
            segments_1.ellipticalArc = ellipticalArc;
            var NO_DRAW_EPSILON = 0.000002;
            var ZERO_EPSILON = 0.000019;
            var SMALL_EPSILON = 0.000117;
            function buildSegments(ea) {
                // from tests it seems that Silverlight closely follows SVG arc
                // behavior (which is very different from the model used with GDI+)
                // some helpful stuff is available here:
                // http://www.w3.org/TR/SVG/implnote.html#ArcImplementationNotes
                var segments = [];
                var sx = ea.sx, sy = ea.sy, ex = ea.ex, ey = ea.ey, rx = ea.rx, ry = ea.ry;
                if (Math.abs(ex - sx) < NO_DRAW_EPSILON && Math.abs(ey - sy) < NO_DRAW_EPSILON)
                    return segments;
                if (Math.abs(rx) < ZERO_EPSILON || Math.abs(ry) < ZERO_EPSILON) {
                    segments.push(segments_1.line(ex, ey));
                    return segments;
                }
                if (Math.abs(rx) < SMALL_EPSILON || Math.abs(ry) < SMALL_EPSILON) {
                    return segments;
                }
                rx = Math.abs(rx);
                ry = Math.abs(ry);
                var angle = ea.rotationAngle * Math.PI / 180.0;
                var cos_phi = Math.cos(angle);
                var sin_phi = Math.sin(angle);
                var dx2 = (sx - ex) / 2.0;
                var dy2 = (sy - ey) / 2.0;
                var x1p = cos_phi * dx2 + sin_phi * dy2;
                var y1p = cos_phi * dy2 - sin_phi * dx2;
                var x1p2 = x1p * x1p;
                var y1p2 = y1p * y1p;
                var rx2 = rx * rx;
                var ry2 = ry * ry;
                var lambda = (x1p2 / rx2) + (y1p2 / ry2);
                if (lambda > 1.0) {
                    var lambda_root = Math.sqrt(lambda);
                    rx *= lambda_root;
                    ry *= lambda_root;
                    rx2 = rx * rx;
                    ry2 = ry * ry;
                }
                var cxp, cyp, cx, cy;
                var c = (rx2 * ry2) - (rx2 * y1p2) - (ry2 * x1p2);
                var large = ea.isLargeArcFlag === true;
                var sweep = ea.sweepDirectionFlag === minerva.SweepDirection.Clockwise;
                if (c < 0.0) {
                    var scale = Math.sqrt(1.0 - c / (rx2 * ry2));
                    rx *= scale;
                    ry *= scale;
                    rx2 = rx * rx;
                    ry2 = ry * ry;
                    cxp = 0.0;
                    cyp = 0.0;
                    cx = 0.0;
                    cy = 0.0;
                }
                else {
                    c = Math.sqrt(c / ((rx2 * y1p2) + (ry2 * x1p2)));
                    if (large === sweep)
                        c = -c;
                    cxp = c * (rx * y1p / ry);
                    cyp = c * (-ry * x1p / rx);
                    cx = cos_phi * cxp - sin_phi * cyp;
                    cy = sin_phi * cxp + cos_phi * cyp;
                }
                cx += (sx + ex) / 2.0;
                cy += (sy + ey) / 2.0;
                var at = Math.atan2(((y1p - cyp) / ry), ((x1p - cxp) / rx));
                var theta1 = (at < 0.0) ? 2.0 * Math.PI + at : at;
                var nat = Math.atan2(((-y1p - cyp) / ry), ((-x1p - cxp) / rx));
                var delta_theta = (nat < at) ? 2.0 * Math.PI - at + nat : nat - at;
                if (sweep) {
                    if (delta_theta < 0.0)
                        delta_theta += 2.0 * Math.PI;
                }
                else {
                    if (delta_theta > 0.0)
                        delta_theta -= 2.0 * Math.PI;
                }
                var segment_count = Math.floor(Math.abs(delta_theta / (Math.PI / 2))) + 1;
                var delta = delta_theta / segment_count;
                var bcp = 4.0 / 3 * (1 - Math.cos(delta / 2)) / Math.sin(delta / 2);
                var cos_phi_rx = cos_phi * rx;
                var cos_phi_ry = cos_phi * ry;
                var sin_phi_rx = sin_phi * rx;
                var sin_phi_ry = sin_phi * ry;
                var cos_theta1 = Math.cos(theta1);
                var sin_theta1 = Math.sin(theta1);
                for (var i = 0; i < segment_count; ++i) {
                    var theta2 = theta1 + delta;
                    var cos_theta2 = Math.cos(theta2);
                    var sin_theta2 = Math.sin(theta2);
                    var c1x = sx - bcp * (cos_phi_rx * sin_theta1 + sin_phi_ry * cos_theta1);
                    var c1y = sy + bcp * (cos_phi_ry * cos_theta1 - sin_phi_rx * sin_theta1);
                    var cur_ex = cx + (cos_phi_rx * cos_theta2 - sin_phi_ry * sin_theta2);
                    var cur_ey = cy + (sin_phi_rx * cos_theta2 + cos_phi_ry * sin_theta2);
                    var c2x = cur_ex + bcp * (cos_phi_rx * sin_theta2 + sin_phi_ry * cos_theta2);
                    var c2y = cur_ey + bcp * (sin_phi_rx * sin_theta2 - cos_phi_ry * cos_theta2);
                    segments.push(segments_1.cubicBezier(c1x, c1y, c2x, c2y, cur_ex, cur_ey));
                    sx = cur_ex;
                    sy = cur_ey;
                    theta1 = theta2;
                    cos_theta1 = cos_theta2;
                    sin_theta1 = sin_theta2;
                }
                return segments;
            }
        })(segments = path.segments || (path.segments = {}));
    })(path = minerva.path || (minerva.path = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var path;
    (function (path) {
        var segments;
        (function (segments) {
            function line(x, y) {
                return {
                    isSingle: false,
                    sx: null,
                    sy: null,
                    x: x,
                    y: y,
                    ex: x,
                    ey: y,
                    draw: function (ctx) {
                        ctx.lineTo(x, y);
                    },
                    extendFillBox: function (box) {
                        box.l = Math.min(box.l, x);
                        box.r = Math.max(box.r, x);
                        box.t = Math.min(box.t, y);
                        box.b = Math.max(box.b, y);
                    },
                    extendStrokeBox: function (box, pars) {
                        this.extendFillBox(box);
                    },
                    toString: function () {
                        return "L" + x.toString() + "," + y.toString();
                    },
                    getStartVector: function () {
                        return [
                            x - this.sx,
                            y - this.sy
                        ];
                    },
                    getEndVector: function () {
                        return [
                            x - this.sx,
                            y - this.sy
                        ];
                    }
                };
            }
            segments.line = line;
        })(segments = path.segments || (path.segments = {}));
    })(path = minerva.path || (minerva.path = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var path;
    (function (path) {
        var segments;
        (function (segments) {
            function move(x, y) {
                return {
                    sx: null,
                    sy: null,
                    ex: x,
                    ey: y,
                    isSingle: false,
                    isMove: true,
                    x: x,
                    y: y,
                    draw: function (ctx) {
                        ctx.moveTo(x, y);
                    },
                    extendFillBox: function (box) {
                        box.l = Math.min(box.l, x);
                        box.r = Math.max(box.r, x);
                        box.t = Math.min(box.t, y);
                        box.b = Math.max(box.b, y);
                    },
                    extendStrokeBox: function (box, pars) {
                        this.extendFillBox(box);
                    },
                    toString: function () {
                        return "M" + x.toString() + "," + y.toString();
                    },
                    getStartVector: function () {
                        return null;
                    },
                    getEndVector: function () {
                        return null;
                    }
                };
            }
            segments.move = move;
        })(segments = path.segments || (path.segments = {}));
    })(path = minerva.path || (minerva.path = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var path;
    (function (path) {
        var segments;
        (function (segments) {
            function quadraticBezier(cpx, cpy, x, y) {
                return {
                    sx: null,
                    sy: null,
                    ex: x,
                    ey: y,
                    isSingle: false,
                    cpx: cpx,
                    cpy: cpy,
                    x: x,
                    y: y,
                    draw: function (ctx) {
                        ctx.quadraticCurveTo(cpx, cpy, x, y);
                    },
                    extendFillBox: function (box) {
                        var m = getMaxima(this.sx, cpx, x, this.sy, cpy, y);
                        if (m.x != null) {
                            box.l = Math.min(box.l, m.x);
                            box.r = Math.max(box.r, m.x);
                        }
                        if (m.y != null) {
                            box.t = Math.min(box.t, m.y);
                            box.b = Math.max(box.b, m.y);
                        }
                        box.l = Math.min(box.l, x);
                        box.r = Math.max(box.r, x);
                        box.t = Math.min(box.t, y);
                        box.b = Math.max(box.b, y);
                    },
                    extendStrokeBox: function (box, pars) {
                        var hs = pars.strokeThickness / 2.0;
                        var m = getMaxima(this.sx, cpx, x, this.sy, cpy, y);
                        if (m.x) {
                            box.l = Math.min(box.l, m.x - hs);
                            box.r = Math.max(box.r, m.x + hs);
                        }
                        if (m.y) {
                            box.t = Math.min(box.t, m.y - hs);
                            box.b = Math.max(box.b, m.y + hs);
                        }
                        box.l = Math.min(box.l, x);
                        box.r = Math.max(box.r, x);
                        box.t = Math.min(box.t, y);
                        box.b = Math.max(box.b, y);
                    },
                    toString: function () {
                        return "Q" + cpx.toString() + "," + cpy.toString() + " " + x.toString() + "," + y.toString();
                    },
                    getStartVector: function () {
                        return [
                            2 * (cpx - this.sx),
                            2 * (cpy - this.sy)
                        ];
                    },
                    getEndVector: function () {
                        return [
                            2 * (x - cpx),
                            2 * (y - cpy)
                        ];
                    }
                };
            }
            segments.quadraticBezier = quadraticBezier;
            function getMaxima(x1, x2, x3, y1, y2, y3) {
                return {
                    x: cod(x1, x2, x3),
                    y: cod(y1, y2, y3)
                };
            }
            function cod(a, b, c) {
                var t = (a - b) / (a - 2 * b + c);
                if (t < 0 || t > 1)
                    return null;
                return (a * Math.pow(1 - t, 2)) + (2 * b * (1 - t) * t) + (c * Math.pow(t, 2));
            }
        })(segments = path.segments || (path.segments = {}));
    })(path = minerva.path || (minerva.path = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var path;
    (function (path) {
        var segments;
        (function (segments) {
            function rect(x, y, width, height) {
                return {
                    sx: null,
                    sy: null,
                    isSingle: true,
                    x: x,
                    y: y,
                    ex: x,
                    ey: y,
                    width: width,
                    height: height,
                    draw: function (ctx) {
                        ctx.rect(x, y, width, height);
                    },
                    extendFillBox: function (box) {
                        box.l = Math.min(box.l, x);
                        box.r = Math.max(box.r, x + width);
                        box.t = Math.min(box.t, y);
                        box.b = Math.max(box.b, y + height);
                    },
                    extendStrokeBox: function (box, pars) {
                        var hs = pars.strokeThickness / 2.0;
                        box.l = Math.min(box.l, x - hs);
                        box.r = Math.max(box.r, x + width + hs);
                        box.t = Math.min(box.t, y - hs);
                        box.b = Math.max(box.b, y + height + hs);
                    },
                    getStartVector: function () {
                        return null;
                    },
                    getEndVector: function () {
                        return null;
                    }
                };
            }
            segments.rect = rect;
        })(segments = path.segments || (path.segments = {}));
    })(path = minerva.path || (minerva.path = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var path;
    (function (path) {
        var segments;
        (function (segments) {
            function roundedRect(x, y, width, height, radiusX, radiusY) {
                if (radiusX === 0.0 && radiusY === 0.0)
                    return segments.rect(x, y, width, height);
                return {
                    sx: null,
                    sy: null,
                    ex: x,
                    ey: y,
                    isSingle: true,
                    x: x,
                    y: y,
                    width: width,
                    height: height,
                    radiusX: radiusX,
                    radiusY: radiusY,
                    draw: function (ctx) {
                        minerva.shapes.rectangle.helpers.draw(ctx, x, y, width, height, radiusX, radiusY);
                    },
                    extendFillBox: function (box) {
                        box.l = Math.min(box.l, x);
                        box.r = Math.max(box.r, x + width);
                        box.t = Math.min(box.t, y);
                        box.b = Math.max(box.b, y + height);
                    },
                    extendStrokeBox: function (box, pars) {
                        var hs = pars.strokeThickness / 2.0;
                        box.l = Math.min(box.l, x - hs);
                        box.r = Math.max(box.r, x + width + hs);
                        box.t = Math.min(box.t, y - hs);
                        box.b = Math.max(box.b, y + height + hs);
                    },
                    getStartVector: function () {
                        return null;
                    },
                    getEndVector: function () {
                        return null;
                    }
                };
            }
            segments.roundedRect = roundedRect;
        })(segments = path.segments || (path.segments = {}));
    })(path = minerva.path || (minerva.path = {}));
})(minerva || (minerva = {}));
if (!CanvasRenderingContext2D.prototype.hasOwnProperty("backingStorePixelRatio")) {
    Object.defineProperty(CanvasRenderingContext2D.prototype, "backingStorePixelRatio", {
        get: function () {
            var ctx = this;
            return ctx.webkitBackingStorePixelRatio
                || ctx.mozBackingStorePixelRatio
                || ctx.msBackingStorePixelRatio
                || ctx.oBackingStorePixelRatio
                || 1;
        }
    });
}
if (!CanvasRenderingContext2D.prototype.ellipse) {
    CanvasRenderingContext2D.prototype.ellipse = function (x, y, radiusX, radiusY, rotation, startAngle, endAngle, antiClockwise) {
        this.save();
        this.translate(x, y);
        this.rotate(rotation);
        this.scale(radiusX, radiusY);
        this.arc(0, 0, 1, startAngle, endAngle, antiClockwise);
        this.restore();
    };
}
if (!CanvasRenderingContext2D.prototype.isPointInStroke) {
    CanvasRenderingContext2D.prototype.isPointInStroke = function (x, y) {
        return false;
    };
}
/// <reference path="../../core/Updater" />
var minerva;
(function (minerva) {
    var shapes;
    (function (shapes) {
        var shape;
        (function (shape) {
            var ShapeUpdater = (function (_super) {
                __extends(ShapeUpdater, _super);
                function ShapeUpdater() {
                    _super.apply(this, arguments);
                }
                ShapeUpdater.prototype.init = function () {
                    this.setMeasurePipe(minerva.singleton(shape.measure.ShapeMeasurePipeDef))
                        .setArrangePipe(minerva.singleton(shape.arrange.ShapeArrangePipeDef))
                        .setRenderPipe(minerva.singleton(shape.render.ShapeRenderPipeDef))
                        .setProcessUpPipe(minerva.singleton(shape.processup.ShapeProcessUpPipeDef))
                        .setHitTestPipe(minerva.singleton(shape.hittest.ShapeHitTestPipeDef));
                    var assets = this.assets;
                    assets.naturalBounds = new minerva.Rect();
                    assets.shapeFlags = minerva.ShapeFlags.None;
                    assets.shapeRect = new minerva.Rect();
                    assets.fill = null;
                    assets.stretch = minerva.Stretch.None;
                    assets.stroke = null;
                    assets.strokeThickness = 1.0;
                    assets.strokeDashArray = [];
                    assets.strokeDashCap = minerva.PenLineCap.Flat;
                    assets.strokeDashOffset = 0;
                    assets.strokeStartLineCap = minerva.PenLineCap.Flat;
                    assets.strokeEndLineCap = minerva.PenLineCap.Flat;
                    assets.strokeLineJoin = minerva.PenLineJoin.Miter;
                    assets.strokeMiterLimit = 10;
                    _super.prototype.init.call(this);
                };
                ShapeUpdater.prototype.invalidateNaturalBounds = function () {
                    var nb = this.assets.naturalBounds;
                    nb.x = nb.y = nb.width = nb.height = 0;
                    this.invalidateMeasure();
                    this.updateBounds(true);
                };
                return ShapeUpdater;
            })(minerva.core.Updater);
            shape.ShapeUpdater = ShapeUpdater;
        })(shape = shapes.shape || (shapes.shape = {}));
    })(shapes = minerva.shapes || (minerva.shapes = {}));
})(minerva || (minerva = {}));
/// <reference path="../shape/ShapeUpdater" />
var minerva;
(function (minerva) {
    var shapes;
    (function (shapes) {
        var ellipse;
        (function (ellipse) {
            var EllipseUpdater = (function (_super) {
                __extends(EllipseUpdater, _super);
                function EllipseUpdater() {
                    _super.apply(this, arguments);
                }
                EllipseUpdater.prototype.init = function () {
                    this.setMeasurePipe(minerva.singleton(ellipse.measure.EllipseMeasurePipeDef))
                        .setRenderPipe(minerva.singleton(ellipse.render.EllipseRenderPipeDef))
                        .setHitTestPipe(minerva.singleton(ellipse.hittest.EllipseHitTestPipeDef));
                    var assets = this.assets;
                    assets.stretch = minerva.Stretch.Fill;
                    _super.prototype.init.call(this);
                };
                return EllipseUpdater;
            })(shapes.shape.ShapeUpdater);
            ellipse.EllipseUpdater = EllipseUpdater;
        })(ellipse = shapes.ellipse || (shapes.ellipse = {}));
    })(shapes = minerva.shapes || (minerva.shapes = {}));
})(minerva || (minerva = {}));
/// <reference path="../shape/ShapeUpdater" />
var minerva;
(function (minerva) {
    var shapes;
    (function (shapes) {
        var path;
        (function (path) {
            var PathUpdater = (function (_super) {
                __extends(PathUpdater, _super);
                function PathUpdater() {
                    _super.apply(this, arguments);
                }
                PathUpdater.prototype.init = function () {
                    this.setMeasurePipe(minerva.singleton(path.measure.PathMeasurePipeDef))
                        .setProcessUpPipe(minerva.singleton(path.processup.PathProcessUpPipeDef))
                        .setRenderPipe(minerva.singleton(path.render.PathRenderPipeDef))
                        .setHitTestPipe(minerva.singleton(path.hittest.PathHitTestPipeDef));
                    var assets = this.assets;
                    assets.stretch = minerva.Stretch.None;
                    assets.stretchXform = minerva.mat3.identity();
                    _super.prototype.init.call(this);
                };
                return PathUpdater;
            })(shapes.shape.ShapeUpdater);
            path.PathUpdater = PathUpdater;
        })(path = shapes.path || (shapes.path = {}));
    })(shapes = minerva.shapes || (minerva.shapes = {}));
})(minerva || (minerva = {}));
/// <reference path="../path/PathUpdater" />
var minerva;
(function (minerva) {
    var shapes;
    (function (shapes) {
        var line;
        (function (line) {
            var LineUpdater = (function (_super) {
                __extends(LineUpdater, _super);
                function LineUpdater() {
                    _super.apply(this, arguments);
                }
                LineUpdater.prototype.init = function () {
                    this.setMeasurePipe(minerva.singleton(line.measure.LineMeasurePipeDef));
                    var assets = this.assets;
                    assets.x1 = 0;
                    assets.y1 = 0;
                    assets.x2 = 0;
                    assets.y2 = 0;
                    assets.data = new shapes.path.AnonPathGeometry();
                    _super.prototype.init.call(this);
                };
                LineUpdater.prototype.invalidatePath = function () {
                    this.assets.data.old = true;
                    this.invalidateNaturalBounds();
                };
                return LineUpdater;
            })(shapes.path.PathUpdater);
            line.LineUpdater = LineUpdater;
        })(line = shapes.line || (shapes.line = {}));
    })(shapes = minerva.shapes || (minerva.shapes = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var shapes;
    (function (shapes) {
        var path;
        (function (path) {
            var AnonPathGeometry = (function () {
                function AnonPathGeometry() {
                    this.old = true;
                    this.path = new minerva.path.Path();
                    this.fillRule = minerva.FillRule.EvenOdd;
                }
                AnonPathGeometry.prototype.Draw = function (ctx) {
                    this.path.draw(ctx.raw);
                };
                AnonPathGeometry.prototype.GetBounds = function (pars) {
                    return this.path.calcBounds(pars);
                };
                return AnonPathGeometry;
            })();
            path.AnonPathGeometry = AnonPathGeometry;
        })(path = shapes.path || (shapes.path = {}));
    })(shapes = minerva.shapes || (minerva.shapes = {}));
})(minerva || (minerva = {}));
/// <reference path="../path/PathUpdater" />
var minerva;
(function (minerva) {
    var shapes;
    (function (shapes) {
        var polyline;
        (function (polyline) {
            var PolylineUpdater = (function (_super) {
                __extends(PolylineUpdater, _super);
                function PolylineUpdater() {
                    _super.apply(this, arguments);
                }
                PolylineUpdater.prototype.init = function () {
                    this.setMeasurePipe(minerva.singleton(polyline.measure.PolylineMeasurePipeDef));
                    var assets = this.assets;
                    assets.data = new shapes.path.AnonPathGeometry();
                    assets.isClosed = false;
                    _super.prototype.init.call(this);
                };
                PolylineUpdater.prototype.invalidateFillRule = function () {
                    this.assets.data.fillRule = this.assets.fillRule;
                    this.invalidate();
                };
                PolylineUpdater.prototype.invalidatePath = function () {
                    this.assets.data.old = true;
                    this.invalidateNaturalBounds();
                };
                return PolylineUpdater;
            })(shapes.path.PathUpdater);
            polyline.PolylineUpdater = PolylineUpdater;
        })(polyline = shapes.polyline || (shapes.polyline = {}));
    })(shapes = minerva.shapes || (minerva.shapes = {}));
})(minerva || (minerva = {}));
/// <reference path="../polyline/PolylineUpdater" />
var minerva;
(function (minerva) {
    var shapes;
    (function (shapes) {
        var polygon;
        (function (polygon) {
            var PolygonUpdater = (function (_super) {
                __extends(PolygonUpdater, _super);
                function PolygonUpdater() {
                    _super.apply(this, arguments);
                }
                PolygonUpdater.prototype.init = function () {
                    _super.prototype.init.call(this);
                    this.assets.isClosed = true;
                };
                return PolygonUpdater;
            })(shapes.polyline.PolylineUpdater);
            polygon.PolygonUpdater = PolygonUpdater;
        })(polygon = shapes.polygon || (shapes.polygon = {}));
    })(shapes = minerva.shapes || (minerva.shapes = {}));
})(minerva || (minerva = {}));
/// <reference path="../shape/ShapeUpdater" />
var minerva;
(function (minerva) {
    var shapes;
    (function (shapes) {
        var rectangle;
        (function (rectangle) {
            var RectangleUpdater = (function (_super) {
                __extends(RectangleUpdater, _super);
                function RectangleUpdater() {
                    _super.apply(this, arguments);
                }
                RectangleUpdater.prototype.init = function () {
                    this.setMeasurePipe(minerva.singleton(rectangle.measure.RectangleMeasurePipeDef))
                        .setRenderPipe(minerva.singleton(rectangle.render.RectangleRenderPipeDef))
                        .setHitTestPipe(minerva.singleton(rectangle.hittest.RectangleHitTestPipeDef));
                    var assets = this.assets;
                    assets.stretch = minerva.Stretch.Fill;
                    assets.radiusX = 0;
                    assets.radiusY = 0;
                    _super.prototype.init.call(this);
                };
                return RectangleUpdater;
            })(shapes.shape.ShapeUpdater);
            rectangle.RectangleUpdater = RectangleUpdater;
        })(rectangle = shapes.rectangle || (shapes.rectangle = {}));
    })(shapes = minerva.shapes || (minerva.shapes = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var text;
    (function (text) {
        var layout;
        (function (layout) {
            var isFirefox = /firefox/i.test(navigator.userAgent);
            var Cluster = (function () {
                function Cluster() {
                    this.isSelected = false;
                    this.text = null;
                    this.width = 0;
                }
                Cluster.render = function (cluster, assets, ctx) {
                    var fontHeight = assets.font.getHeight();
                    var area = new minerva.Rect(0, 0, cluster.width, fontHeight);
                    var raw = ctx.raw;
                    var bg = cluster.isSelected ? (assets.selectionBackground || Cluster.DEFAULT_SELECTION_BG) : assets.background;
                    if (bg) {
                        raw.beginPath();
                        raw.rect(area.x, area.y, area.width, area.height);
                        ctx.fillEx(bg, area);
                    }
                    var fg = cluster.isSelected ? (assets.selectionForeground || Cluster.DEFAULT_SELECTION_FG) : assets.foreground;
                    var fg5 = "#000000";
                    if (fg) {
                        fg.setupBrush(raw, area);
                        fg5 = fg.toHtml5Object();
                    }
                    raw.fillStyle = fg5;
                    raw.font = assets.font.toHtml5Object();
                    raw.textAlign = "left";
                    if (isFirefox) {
                        raw.textBaseline = "bottom";
                        raw.fillText(cluster.text, 0, fontHeight);
                    }
                    else {
                        raw.textBaseline = "top";
                        raw.fillText(cluster.text, 0, 0);
                    }
                    if (assets.isUnderlined) {
                        raw.beginPath();
                        raw.moveTo(0, fontHeight);
                        raw.lineTo(cluster.width, fontHeight);
                        raw.lineWidth = 2;
                        raw.strokeStyle = fg5;
                        raw.stroke();
                    }
                };
                Cluster.DEFAULT_SELECTION_BG = new minerva.FakeBrush("#444444");
                Cluster.DEFAULT_SELECTION_FG = new minerva.FakeBrush("#FFFFFF");
                return Cluster;
            })();
            layout.Cluster = Cluster;
        })(layout = text.layout || (text.layout = {}));
    })(text = minerva.text || (minerva.text = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var text;
    (function (text_2) {
        var layout;
        (function (layout) {
            var Line = (function () {
                function Line() {
                    this.runs = [];
                    this.width = 0;
                    this.height = 0;
                }
                Line.getLineFromY = function (lines, y) {
                    var line;
                    for (var i = 0, oy = 0.0; i < lines.length; i++) {
                        line = lines[i];
                        oy += line.height;
                        if (y < oy)
                            return line;
                    }
                    return lines[lines.length - 1];
                };
                Line.elliptify = function (docctx, docassets, line, measureTextWidth) {
                    if (docctx.textTrimming === minerva.TextTrimming.None
                        || docctx.textWrapping !== minerva.TextWrapping.NoWrap
                        || line.width <= docassets.maxWidth)
                        return false;
                    var newRuns = [];
                    for (var runs = line.runs, total = 0, i = 0; i < runs.length; i++) {
                        var run = runs[i];
                        total += run.width;
                        newRuns.push(run);
                        if (total >= docassets.maxWidth) {
                            total -= run.width;
                            layout.Run.elliptify(run, docassets.maxWidth - total, docctx.textTrimming, measureTextWidth);
                            line.width = total + run.width;
                            break;
                        }
                    }
                    line.runs = newRuns;
                    return true;
                };
                return Line;
            })();
            layout.Line = Line;
        })(layout = text_2.layout || (text_2.layout = {}));
    })(text = minerva.text || (minerva.text = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var text;
    (function (text_3) {
        var layout;
        (function (layout) {
            var Run = (function () {
                function Run() {
                    this.text = "";
                    this.start = 0;
                    this.length = 0;
                    this.width = 0;
                }
                Run.splitSelection = function (run, start, end, measureWidth) {
                    run.pre = run.sel = run.post = null;
                    var rs = run.start;
                    var re = rs + run.length;
                    var prelen = Math.min(run.length, Math.max(0, start - rs));
                    if (prelen > 0) {
                        var pre = run.pre = new layout.Cluster();
                        pre.text = run.text.substr(0, prelen);
                        pre.width = measureWidth(pre.text, run.attrs);
                    }
                    var postlen = Math.min(run.length, Math.max(0, re - end));
                    if (postlen > 0) {
                        var post = run.post = new layout.Cluster();
                        post.text = run.text.substr(run.length - postlen);
                        post.width = measureWidth(post.text, run.attrs);
                    }
                    var ss = Math.min(re, Math.max(rs, start));
                    var se = Math.max(rs, Math.min(re, end));
                    var sellen = Math.max(0, se - ss);
                    if (sellen > 0) {
                        var sel = run.sel = new layout.Cluster();
                        sel.isSelected = true;
                        sel.text = run.text.substr(ss - rs, sellen);
                        sel.width = measureWidth(sel.text, run.attrs);
                    }
                };
                Run.elliptify = function (run, available, textTrimming, measureTextWidth) {
                    if (run.width < available)
                        return;
                    var text = run.text;
                    var font = run.attrs.font;
                    var measure = function (index) { return measureTextWidth(text.substr(0, index), font); };
                    if (textTrimming === minerva.TextTrimming.WordEllipsis) {
                        shortenWord(run, available - measureTextWidth("...", font), measure);
                    }
                    else {
                        shortenChar(run, available - measureTextWidth("...", font), measure);
                    }
                };
                return Run;
            })();
            layout.Run = Run;
            function shortenWord(run, available, measure) {
                if (available > 0) {
                    var len = run.text.length;
                    for (var i = 0, next = 0; (i = next) < len && (next = run.text.indexOf(' ', i + 1)) !== -1;) {
                        if (measure(next) > available) {
                            run.text = run.text.substr(0, i);
                            break;
                        }
                    }
                    if (len === run.text.length)
                        return;
                }
                else {
                    run.text = "";
                }
                run.text += "...";
                run.length = run.text.length;
                run.width = measure(run.length);
            }
            function shortenChar(run, available, measure) {
                if (available > 0) {
                    var len = run.text.length;
                    var low = 0;
                    var high = len;
                    var i = Math.ceil(low + (high - low) / 2);
                    for (var rawr = 0; (high - low) > 1 && rawr < 1000; i = Math.ceil(low + (high - low) / 2), rawr++) {
                        if (measure(i) > available) {
                            high = i;
                        }
                        else {
                            low = i;
                        }
                    }
                    run.text = run.text.substr(0, low);
                    if (len === run.text.length)
                        return;
                }
                else {
                    run.text = "";
                }
                run.text += "...";
                run.length = run.text.length;
                run.width = measure(run.length);
            }
        })(layout = text_3.layout || (text_3.layout = {}));
    })(text = minerva.text || (minerva.text = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var text;
    (function (text_4) {
        var run;
        (function (run) {
            var RunLayoutDef = (function () {
                function RunLayoutDef() {
                }
                RunLayoutDef.prototype.layout = function (docctx, docassets, assets) {
                    var text = assets.text;
                    if (!text) {
                        var line = new text_4.layout.Line();
                        line.height = assets.font.getHeight();
                        docassets.lines.push(line);
                        var run1 = new text_4.layout.Run();
                        run1.attrs = assets;
                        line.runs.push(run1);
                        docassets.actualHeight = line.height;
                        return false;
                    }
                    if (docctx.textWrapping === minerva.TextWrapping.NoWrap)
                        run.doLayoutNoWrap(docctx, docassets, assets);
                    else
                        run.doLayoutWrap(docctx, docassets, assets);
                    docassets.selCached = false;
                    return true;
                };
                return RunLayoutDef;
            })();
            run.RunLayoutDef = RunLayoutDef;
        })(run = text_4.run || (text_4.run = {}));
    })(text = minerva.text || (minerva.text = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var text;
    (function (text_5) {
        var run;
        (function (run_1) {
            function doLayoutNoWrap(docctx, docassets, assets) {
                var pass = {
                    text: assets.text,
                    index: 0,
                    max: assets.text.length
                };
                var font = assets.font;
                var line = new text_5.layout.Line();
                line.height = font.getHeight();
                docassets.actualHeight += line.height;
                docassets.lines.push(line);
                var run = new text_5.layout.Run();
                run.attrs = assets;
                line.runs.push(run);
                while (pass.index < pass.max) {
                    var hitbreak = advance(run, pass, font);
                    if (hitbreak) {
                        docassets.actualWidth = Math.max(docassets.actualWidth, run.width);
                        line.width = run.width;
                        line = new text_5.layout.Line();
                        line.height = font.getHeight();
                        docassets.actualHeight += line.height;
                        docassets.lines.push(line);
                        run = new text_5.layout.Run();
                        run.attrs = assets;
                        line.runs.push(run);
                    }
                }
                line.width = run.width;
                text_5.layout.Line.elliptify(docctx, docassets, line, measureTextWidth);
                docassets.actualWidth = Math.max(docassets.actualWidth, run.width);
            }
            run_1.doLayoutNoWrap = doLayoutNoWrap;
            function advance(run, pass, font) {
                var remaining = pass.text.substr(pass.index);
                var rindex = remaining.indexOf('\r');
                var nindex = remaining.indexOf('\n');
                if (rindex < 0 && nindex < 0) {
                    run.length = remaining.length;
                    run.text = remaining;
                    run.width = measureTextWidth(run.text, font);
                    pass.index += run.length;
                    return false;
                }
                if (rindex > -1 && rindex + 1 === nindex) {
                    run.length = nindex + 1;
                    run.text = remaining.substr(0, run.length);
                    run.width = measureTextWidth(run.text, font);
                    pass.index += run.length;
                    return true;
                }
                if (rindex > -1 && rindex < nindex) {
                    run.length = rindex + 1;
                    run.text = remaining.substr(0, run.length);
                    run.width = measureTextWidth(run.text, font);
                    pass.index += run.length;
                    return true;
                }
                run.length = nindex + 1;
                run.text = remaining.substr(0, run.length);
                run.width = measureTextWidth(run.text, font);
                pass.index += run.length;
                return true;
            }
            function measureTextWidth(text, font) {
                return minerva.engine.Surface.measureWidth(text, font);
            }
        })(run = text_5.run || (text_5.run = {}));
    })(text = minerva.text || (minerva.text = {}));
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var text;
    (function (text_6) {
        var run;
        (function (run_2) {
            function doLayoutWrap(docctx, docassets, assets) {
                var pass = {
                    text: assets.text,
                    index: 0,
                    max: assets.text.length
                };
                var font = assets.font;
                var line = new text_6.layout.Line();
                line.height = font.getHeight();
                docassets.actualHeight += line.height;
                docassets.lines.push(line);
                var run = new text_6.layout.Run();
                run.attrs = assets;
                line.runs.push(run);
                while (pass.index < pass.max) {
                    var hitbreak = isFinite(docassets.maxWidth) ? advanceFinite(run, pass, font, docassets.maxWidth) : advanceInfinite(run, pass, font);
                    if (hitbreak) {
                        docassets.actualWidth = Math.max(docassets.actualWidth, run.width);
                        line.width = run.width;
                        line = new text_6.layout.Line();
                        line.height = font.getHeight();
                        docassets.actualHeight += line.height;
                        docassets.lines.push(line);
                        run = new text_6.layout.Run();
                        run.attrs = assets;
                        line.runs.push(run);
                    }
                }
                line.width = run.width;
                docassets.actualWidth = Math.max(docassets.actualWidth, run.width);
            }
            run_2.doLayoutWrap = doLayoutWrap;
            function advanceInfinite(run, pass, font) {
                var remaining = pass.text.substr(pass.index);
                var rindex = remaining.indexOf('\r');
                var nindex = remaining.indexOf('\n');
                if (rindex < 0 && nindex < 0) {
                    run.length = remaining.length;
                    run.text = remaining;
                    run.width = measureTextWidth(run.text, font);
                    pass.index += run.length;
                    return false;
                }
                if (rindex > -1 && rindex + 1 === nindex) {
                    run.length = nindex + 1;
                    run.text = remaining.substr(0, run.length);
                    run.width = measureTextWidth(run.text, font);
                    pass.index += run.length;
                    return true;
                }
                if (rindex > -1 && rindex < nindex) {
                    run.length = rindex + 1;
                    run.text = remaining.substr(0, run.length);
                    run.width = measureTextWidth(run.text, font);
                    pass.index += run.length;
                    return true;
                }
                run.length = nindex + 1;
                run.text = remaining.substr(0, run.length);
                run.width = measureTextWidth(run.text, font);
                pass.index += run.length;
                return true;
            }
            function advanceFinite(run, pass, font, maxWidth) {
                var text = pass.text;
                var start = pass.index;
                var lastSpace = -1;
                var c;
                var curText = "";
                var curWidth = 0;
                while (pass.index < pass.max) {
                    c = text.charAt(pass.index);
                    curText += c;
                    curWidth = measureTextWidth(curText, font);
                    if (c === '\n') {
                        run.length = pass.index - start + 1;
                        run.text = text.substr(start, run.length);
                        run.width = measureTextWidth(run.text, font);
                        pass.index++;
                        return true;
                    }
                    else if (c === '\r') {
                        run.length = pass.index - start + 1;
                        pass.index++;
                        if (text.charAt(pass.index) === '\n') {
                            run.length++;
                            pass.index++;
                        }
                        run.text = text.substr(start, run.length);
                        run.width = measureTextWidth(run.text, font);
                        return true;
                    }
                    if (curWidth > maxWidth) {
                        var breakIndex = (lastSpace > -1) ? lastSpace + 1 : pass.index;
                        run.length = (breakIndex - start) || 1;
                        run.text = text.substr(start, run.length);
                        run.width = measureTextWidth(run.text, font);
                        pass.index = start + run.length;
                        return pass.index < pass.max;
                    }
                    if (c === ' ')
                        lastSpace = pass.index;
                    pass.index++;
                }
                run.text = text.substr(start);
                run.length = run.text.length;
                run.width = measureTextWidth(run.text, font);
                return false;
            }
            function measureTextWidth(text, font) {
                return minerva.engine.Surface.measureWidth(text, font);
            }
        })(run = text_6.run || (text_6.run = {}));
    })(text = minerva.text || (minerva.text = {}));
})(minerva || (minerva = {}));

//# sourceMappingURL=minerva.js.map