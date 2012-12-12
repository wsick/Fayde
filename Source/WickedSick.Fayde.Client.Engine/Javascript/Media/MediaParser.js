/// <reference path="../Core/Core.js"/>
/// CODE
/// <reference path="Geometry.js"/>
/// <reference path="../Primitives/Point.js"/>
/// <reference path="PathGeometry.js"/>
/// <reference path="../Shapes/RawPath.js"/>
/// <reference path="../Shapes/PointCollection.js"/>

//#region _MediaParser

// Path Markup Syntax: http://msdn.microsoft.com/en-us/library/cc189041(v=vs.95).aspx

//FigureDescription Syntax
// MoveCommand DrawCommands [CloseCommand]

//Double Syntax
// digits
// digits.digits
// 'Infinity'
// '-Infinity'
// 'NaN'

//Point Syntax
// x,y
// x y

//Loop until exhausted
//  Parse FigureDescription
//      Find "M" or "m"? - Parse MoveCommand (start point)
//          <point>
//
//      Find "L" or "l"? - Parse LineCommand (end point)
//          <point>
//      Find "H" or "h"? - Parse HorizontalLineCommand (x)
//          <double>
//      Find "V" or "v"? - Parse VerticalLineCommand (y)
//          <double>
//      Find "C" or "c"? - Parse CubicBezierCurveCommand (control point 1, control point 2, end point)
//          <point> <point> <point>
//      Find "Q" or "q"? - Parse QuadraticBezierCurveCommand (control point, end point)
//          <point> <point>
//      Find "S" or "s"? - Parse SmoothCubicBezierCurveCommand (control point 2, end point)
//          <point> <point>
//      Find "T" or "t"? - Parse SmoothQuadraticBezierCurveCommand (control point, end point)
//          <point> <point>
//      Find "A" or "a"? - Parse EllipticalArcCommand (size, rotationAngle, isLargeArcFlag, sweepDirectionFlag, endPoint)
//          <point> <double> <1,0> <1,0> <point>
//
//      Find "Z" or "z"? - CloseCommand

Fayde._MediaParser = function (str) {
    this.str = str;
    this.len = str.length;
    this.index = 0;
};

Fayde._MediaParser.ParseGeometry = function (str) {
    /// <param name="str" type="String"></param>
    /// <returns type="Geometry" />
    return (new Fayde._MediaParser(str)).ParseGeometryImpl();
};
Fayde._MediaParser.ParsePointCollection = function (str) {
    /// <param name="str" type="String"></param>
    /// <returns type="PointCollection" />
    return (new Fayde._MediaParser(str)).ParsePointCollectionImpl();
};

Fayde._MediaParser.prototype.ParseGeometryImpl = function () {
    /// <returns type="Geometry" />
    var cp = new Point();
    var cp1, cp2, cp3;
    var start = new Point();
    var fillRule = FillRule.EvenOdd;
    var cbz = false; // last figure is a cubic bezier curve
    var qbz = false; // last figure is a quadratic bezier curve
    var cbzp = new Point(); // points needed to create "smooth" beziers
    var qbzp = new Point(); // points needed to create "smooth" beziers

    var path = new RawPath();
    while (this.index < this.len) {
        var c;
        while (this.index < this.len && (c = this.str.charAt(this.index)) === ' ') {
            this.index++;
        }
        this.index++
        var relative = false;
        switch (c) {
            case 'f':
            case 'F':
                c = this.str.charAt(this.index);
                if (c === '0')
                    fillRule = FillRule.EvenOdd;
                else if (c === '1')
                    fillRule = FillRule.Nonzero;
                else
                    return null;
                this.index++
                c = this.str.charAt(this.index);
                break;
            case 'm':
                relative = true;
            case 'M':
                cp1 = this.ParsePoint(this);
                if (cp1 == null)
                    break;
                if (relative) {
                    cp1.X += cp.X;
                    cp1.Y += cp.Y;
                }
                path.Move(cp1.X, cp1.Y);
                start.X = cp.X = cp1.X;
                start.Y = cp.Y = cp1.Y;
                this.Advance();
                while (this.MorePointsAvailable()) {
                    if ((cp1 = this.ParsePoint()) == null)
                        break;
                    if (relative) {
                        cp1.X += cp.X;
                        cp1.Y += cp.Y;
                    }
                    path.Line(cp1.X, cp1.Y);
                }
                cp.X = cp1.X;
                cp.Y = cp1.Y;
                cbz = qbz = false;
                break;
            case 'l':
                relative = true;
            case 'L':
                while (this.MorePointsAvailable()) {
                    if ((cp1 = this.ParsePoint()) == null)
                        break;

                    if (relative) {
                        cp1.X += cp.X;
                        cp1.Y += cp.Y;
                    }

                    path.Line(cp1.X, cp1.Y);

                    cp.X = cp1.X;
                    cp.Y = cp1.Y;
                    this.Advance();
                }
                cbz = qbz = false;
                break;
            case 'h':
                relative = true;
            case 'H':
                var x = this.ParseDouble();
                if (x == null)
                    break;

                if (relative)
                    x += cp.X;
                cp = new Point(x, cp.Y);

                path.Line(cp.X, cp.Y);
                cbz = qbz = false;
                break;
            case 'v':
                relative = true;
            case 'V':
                var y = this.ParseDouble();
                if (y == null)
                    break;

                if (relative)
                    y += cp.Y;
                cp = new Point(cp.X, y);

                path.Line(cp.X, cp.Y);
                cbz = qbz = false;
                break;
            case 'c':
                relative = true;
            case 'C':
                while (this.MorePointsAvailable()) {
                    if ((cp1 = this.ParsePoint()) == null)
                        break;
                    if (relative) {
                        cp1.X += cp.X;
                        cp1.Y += cp.Y;
                    }
                    this.Advance();
                    if ((cp2 = this.ParsePoint()) == null)
                        break;
                    if (relative) {
                        cp2.X += cp.X;
                        cp2.Y += cp.Y;
                    }
                    this.Advance();
                    if ((cp3 = this.ParsePoint()) == null)
                        break;
                    if (relative) {
                        cp3.X += cp.X;
                        cp3.Y += cp.Y;
                    }
                    this.Advance();

                    path.Bezier(cp1.X, cp1.Y, cp2.X, cp2.Y, cp3.X, cp3.Y);

                    cp1.X = cp3.X;
                    cp1.Y = cp3.Y;
                }
                cp.X = cp3.X;
                cp.Y = cp3.Y;
                cbz = true;
                cbzp.X = cp2.X;
                cbzp.Y = cp2.Y;
                qbz = false;
                break;
            case 's':
                relative = true;
            case 'S':
                while (this.MorePointsAvailable()) {
                    if ((cp2 = this.ParsePoint()) == null)
                        break;
                    if (relative) {
                        cp2.X += cp.X;
                        cp2.Y += cp.Y;
                    }
                    this.Advance();
                    if ((cp3 = this.ParsePoint()) == null)
                        break;
                    if (relative) {
                        cp3.X += cp.X;
                        cp3.Y += cp.Y;
                    }

                    if (cbz) {
                        cp1.X = 2 * cp.X - cbzp.X;
                        cp1.Y = 2 * cp.Y - cbzp.Y;
                    } else
                        cp1 = cp;

                    path.Bezier(cp1.X, cp1.Y, cp2.X, cp2.Y, cp3.X, cp3.Y);

                    cbz = true;
                    cbzp.X = cp2.X;
                    cbzp.Y = cp2.Y;

                    cp.X = cp3.X;
                    cp.Y = cp3.Y;

                    this.Advance();
                }
                qbz = false;
                break;
            case 'q':
                relative = true;
            case 'Q':
                while (this.MorePointsAvailable()) {
                    if ((cp1 = this.ParsePoint()) == null)
                        break;
                    if (relative) {
                        cp1.X += cp.X;
                        cp1.Y += cp.Y;
                    }
                    this.Advance();
                    if ((cp2 = this.ParsePoint()) == null)
                        break;
                    if (relative) {
                        cp2.X += cp.X;
                        cp2.Y += cp.Y;
                    }
                    this.Advance();

                    path.Quadratic(cp1.X, cp1.Y, cp2.X, cp2.Y);

                    cp.X = cp2.X;
                    cp.Y = cp2.Y;
                }
                qbz = true;
                qbzp.X = cp1.X;
                qbzp.Y = cp1.Y;
                cbz = false;
                break;
            case 't':
                relative = true;
            case 'T':
                while (this.MorePointsAvailable()) {
                    if ((cp2 = this.ParsePoint()) == null)
                        break;
                    if (relative) {
                        cp2.X += cp.X;
                        cp2.Y += cp.Y;
                    }

                    if (qbz) {
                        cp1.X = 2 * cp.X - qbzp.X;
                        cp1.Y = 2 * cp.Y - qbzp.Y;
                    } else
                        cp1 = cp;

                    path.Quadratic(cp1.X, cp1.Y, cp2.X, cp2.Y);

                    qbz = true;
                    qbzp.X = cp1.X;
                    qbzp.Y = cp1.Y;

                    cp.X = cp2.X;
                    cp.Y = cp2.Y;

                    this.Advance();
                }
                cbz = false;
                break;
            case 'a':
                relative = true;
            case 'A':
                while (this.MorePointsAvailable()) {
                    if ((cp1 = this.ParsePoint()) == null)
                        break;

                    var angle = this.ParseDouble();
                    var is_large = this.ParseDouble() !== 0;
                    var sweep = this.ParseDouble() !== 0;

                    if ((cp2 = this.ParsePoint()) == null)
                        break;
                    if (relative) {
                        cp2.X += cp.X;
                        cp2.Y += cp.Y;
                    }

                    path.EllipticalArc(cp1.X, cp1.Y, angle, is_large, sweep, cp2.X, cp2.Y);

                    cp.X = cp2.X;
                    cp.Y = cp2.Y;

                    this.Advance();
                }
                cbz = qbz = false;
                break;
            case 'z':
            case 'Z':
                path.Line(start.X, start.Y);
                path.Close();
                path.Move(start.X, start.Y);

                cp.X = start.X;
                cp.Y = start.Y;
                cbz = qbz = false;
                break;
            default:
                break;
        }
    }
    var pg = new PathGeometry();
    pg.$Path = path;
    pg.FillRule = fillRule;
    return pg;
};
Fayde._MediaParser.prototype.ParsePointCollectionImpl = function () {
    /// <returns type="PointCollection" />
    var p;
    var points = new PointCollection();
    while (this.MorePointsAvailable() && (p = this.ParsePoint()) != null) {
        points.Add(p);
    }
    return points;
};

Fayde._MediaParser.prototype.ParsePoint = function () {
    /// <returns type="Point" />
    var x = this.ParseDouble();
    if (x == null)
        return null;

    var c;
    while (this.index < this.len && ((c = this.str.charAt(this.index)) === ' ' || c === ',')) {
        this.index++;
    }
    if (this.index >= this.len)
        return null;

    var y = this.ParseDouble();
    if (y == null)
        return null;

    return new Point(x, y);
};
Fayde._MediaParser.prototype.ParseDouble = function () {
    /// <returns type="Number" />
    this.Advance();
    var isNegative = false;
    if (this.Match('-')) {
        isNegative = true;
        this.index++;
    } else if (this.Match('+')) {
        this.index++;
    }
    if (this.Match('Infinity')) {
        this.index += 8;
        return isNegative ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY;
    }
    if (this.Match('NaN'))
        return NaN;

    var temp = '';
    while (this.index < this.len) {
        var code = this.str.charCodeAt(this.index);
        var c = String.fromCharCode(code);
        //0-9, ., E, e
        if (code >= 48 && code <= 57)
            temp += c;
        else if (code === 46)
            temp += c;
        else if (c === 'E' || c === 'e')
            temp += c;
        else
            break;
        this.index++;
    }
    if (temp.length === 0)
        return null;
    var f = parseFloat(temp);
    return isNegative ? -f : f;
};
Fayde._MediaParser.prototype.Match = function (matchStr) {
    /// <param name="matchStr" type="String"></param>
    /// <returns type="Boolean" />
    var c1;
    var c2;
    for (var i = 0; i < matchStr.length && (this.index + i) < this.len; i++) {
        c1 = matchStr.charAt(i);
        c2 = this.str.charAt(this.index + i);
        if (c1 !== c2)
            return false;
    }
    return true;
};
Fayde._MediaParser.prototype.Advance = function () {
    var code;
    while (this.index < this.len) {
        code = this.str.charCodeAt(this.index);
        //alphanum
        if ((code >= 65 && code <= 90) || (code >= 97 && code <= 122) || (code >= 48 && code <= 57))
            break;
        c = String.fromCharCode(code);
        if (c === '.')
            break;
        if (c === '-')
            break;
        if (c === '+')
            break;
        this.index++;
    }
};
Fayde._MediaParser.prototype.MorePointsAvailable = function () {
    var c;
    while (this.index < this.len && ((c = this.str.charAt(this.index)) === ',' || c === ' ')) {
        this.index++;
    }
    if (this.index >= this.len)
        return false;
    if (c === '.' || c === '-' || c === '+')
        return true;
    var code = this.str.charCodeAt(this.index);
    return code >= 48 && code <= 57;
};

//#endregion