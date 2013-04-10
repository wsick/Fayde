var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Exception = (function () {
    function Exception(message) {
        this.Message = message;
    }
    return Exception;
})();
var ArgumentException = (function (_super) {
    __extends(ArgumentException, _super);
    function ArgumentException(message) {
        _super.call(this, message);
    }
    return ArgumentException;
})(Exception);
var InvalidOperationException = (function (_super) {
    __extends(InvalidOperationException, _super);
    function InvalidOperationException(message) {
        _super.call(this, message);
    }
    return InvalidOperationException;
})(Exception);
var XamlParseException = (function (_super) {
    __extends(XamlParseException, _super);
    function XamlParseException(message) {
        _super.call(this, message);
    }
    return XamlParseException;
})(Exception);
var NotSupportedException = (function (_super) {
    __extends(NotSupportedException, _super);
    function NotSupportedException(message) {
        _super.call(this, message);
    }
    return NotSupportedException;
})(Exception);
var Fayde;
(function (Fayde) {
    var NameScope = (function () {
        function NameScope() {
            this.IsRoot = false;
            this.XNodes = {
            };
        }
        NameScope.prototype.FindName = function (name) {
            return this.XNodes[name];
        };
        NameScope.prototype.RegisterName = function (name, xnode) {
            var existing = this.XNodes[name];
            if(existing && existing !== xnode) {
                throw new InvalidOperationException("Name is already registered.");
            }
            this.XNodes[name] = xnode;
        };
        NameScope.prototype.UnregisterName = function (name) {
            this.XNodes[name] = undefined;
        };
        NameScope.prototype.Absorb = function (otherNs) {
            var on = otherNs.XNodes;
            for(var name in on) {
                this.RegisterName(name, on[name]);
            }
        };
        return NameScope;
    })();
    Fayde.NameScope = NameScope;    
})(Fayde || (Fayde = {}));
var BError = (function () {
    function BError() { }
    BError.Argument = 2;
    BError.InvalidOperation = 3;
    BError.prototype.ThrowException = function () {
        throw new Exception(this.Message);
    };
    return BError;
})();
var Fayde;
(function (Fayde) {
    var ArrayEx = (function () {
        function ArrayEx() { }
        ArrayEx.GetEnumerator = function GetEnumerator(arr, isReverse) {
            var len = arr.length;
            var e = {
                MoveNext: undefined,
                Current: undefined
            };
            var index;
            if(isReverse) {
                index = len;
                e.MoveNext = function () {
                    index--;
                    if(index < 0) {
                        e.Current = undefined;
                        return false;
                    }
                    e.Current = arr[index];
                    return true;
                };
            } else {
                index = -1;
                e.MoveNext = function () {
                    index++;
                    if(index >= len) {
                        e.Current = undefined;
                        return false;
                    }
                    e.Current = arr[index];
                    return true;
                };
            }
            return e;
        };
        return ArrayEx;
    })();
    Fayde.ArrayEx = ArrayEx;    
})(Fayde || (Fayde = {}));
var Fayde;
(function (Fayde) {
    (function (VisualTreeDirection) {
        VisualTreeDirection._map = [];
        VisualTreeDirection.Logical = 0;
        VisualTreeDirection.LogicalReverse = 1;
        VisualTreeDirection.ZFoward = 2;
        VisualTreeDirection.ZReverse = 3;
    })(Fayde.VisualTreeDirection || (Fayde.VisualTreeDirection = {}));
    var VisualTreeDirection = Fayde.VisualTreeDirection;
    var XamlNode = (function () {
        function XamlNode(xobj) {
            this.IsAttached = false;
            this.XObject = xobj;
        }
        XamlNode.prototype.FindNameScope = function () {
            var curNode = this;
            var ns;
            while(curNode) {
                ns = curNode.NameScope;
                if(ns) {
                    return ns;
                }
                curNode = curNode.ParentNode;
            }
            return undefined;
        };
        XamlNode.prototype.SetIsAttached = function (value) {
            if(this.IsAttached !== value) {
                return;
            }
            this.IsAttached = value;
            this.OnIsAttachedChanged(value);
        };
        XamlNode.prototype.OnIsAttachedChanged = function (newIsAttached) {
        };
        XamlNode.prototype.AttachTo = function (parentNode, error) {
            this.SetIsAttached(parentNode.IsAttached);
            var curNode = parentNode;
            while(curNode) {
                if(curNode === this) {
                    error.Message = "AddParentNode - Cycle found.";
                    return false;
                }
                curNode = curNode.ParentNode;
            }
            if(this.ParentNode) {
                error.Message = "Element is already a child of another element.";
                error.Number = BError.InvalidOperation;
                return false;
            }
            var parentScope = parentNode.FindNameScope();
            var thisScope = this.NameScope;
            if(thisScope) {
                if(!thisScope.IsRoot) {
                    parentScope.Absorb(thisScope);
                    this.NameScope = null;
                }
            } else if(parentScope) {
                var name = this.Name;
                if(name) {
                    var existing = parentScope.FindName(name);
                    if(existing && existing !== this) {
                        error.Message = "Name is already registered in parent namescope.";
                        error.Number = BError.Argument;
                        return false;
                    }
                    parentScope.RegisterName(name, this);
                }
            }
            this.ParentNode = parentNode;
            return true;
        };
        XamlNode.prototype.Detach = function () {
            var name = this.Name;
            if(name) {
                var ns = this.FindNameScope();
                if(ns) {
                    ns.UnregisterName(this.Name);
                }
            }
            this.SetIsAttached(false);
            this.ParentNode = null;
        };
        XamlNode.prototype.GetInheritedEnumerator = function () {
            return undefined;
        };
        XamlNode.prototype.GetVisualTreeEnumerator = function (direction) {
            return undefined;
        };
        return XamlNode;
    })();
    Fayde.XamlNode = XamlNode;    
})(Fayde || (Fayde = {}));
var Fayde;
(function (Fayde) {
    var XamlObject = (function () {
        function XamlObject() {
            this.XamlNode = this.CreateNode();
        }
        XamlObject.prototype.CreateNode = function () {
            return new Fayde.XamlNode(this);
        };
        Object.defineProperty(XamlObject.prototype, "Name", {
            get: function () {
                return this.XamlNode.Name;
            },
            enumerable: true,
            configurable: true
        });
        return XamlObject;
    })();
    Fayde.XamlObject = XamlObject;    
})(Fayde || (Fayde = {}));
var DependencyProperty = (function () {
    function DependencyProperty() { }
    DependencyProperty._IDs = [];
    DependencyProperty._Inherited = [];
    DependencyProperty._LastID = 0;
    DependencyProperty.Register = function Register(name, getTargetType, ownerType, defaultValue, changedCallback) {
        return DependencyProperty.RegisterFull(name, getTargetType, ownerType, defaultValue, changedCallback);
    };
    DependencyProperty.RegisterReadOnly = function RegisterReadOnly(name, getTargetType, ownerType, defaultValue, changedCallback) {
        return DependencyProperty.RegisterFull(name, getTargetType, ownerType, defaultValue, changedCallback, undefined, undefined, undefined, undefined, undefined, true);
    };
    DependencyProperty.RegisterAttached = function RegisterAttached(name, getTargetType, ownerType, defaultValue, changedCallback) {
        return DependencyProperty.RegisterFull(name, getTargetType, ownerType, defaultValue, changedCallback, undefined, undefined, undefined, undefined, undefined, undefined, true);
    };
    DependencyProperty.RegisterCore = function RegisterCore(name, getTargetType, ownerType, defaultValue, changedCallback) {
        return DependencyProperty.RegisterFull(name, getTargetType, ownerType, defaultValue, changedCallback, undefined, undefined, undefined, undefined, true);
    };
    DependencyProperty.RegisterReadOnlyCore = function RegisterReadOnlyCore(name, getTargetType, ownerType, defaultValue, changedCallback) {
        return DependencyProperty.RegisterFull(name, getTargetType, ownerType, defaultValue, changedCallback, undefined, undefined, undefined, undefined, true, true);
    };
    DependencyProperty.RegisterAttachedCore = function RegisterAttachedCore(name, getTargetType, ownerType, defaultValue, changedCallback) {
        return DependencyProperty.RegisterFull(name, getTargetType, ownerType, defaultValue, changedCallback, undefined, undefined, undefined, undefined, true, undefined, true);
    };
    DependencyProperty.RegisterInheritable = function RegisterInheritable(name, getTargetType, ownerType, defaultValue, changedCallback, autocreator, inheritable) {
        return DependencyProperty.RegisterFull(name, getTargetType, ownerType, defaultValue, changedCallback, autocreator, undefined, undefined, undefined, undefined, undefined, undefined, inheritable);
    };
    DependencyProperty.RegisterFull = function RegisterFull(name, getTargetType, ownerType, defaultValue, changedCallback, autocreator, coercer, alwaysChange, validator, isCustom, isReadOnly, isAttached, inheritable) {
        var registeredDPs = (ownerType)._RegisteredDPs;
        if(!registeredDPs) {
            (ownerType)._RegisteredDPs = registeredDPs = [];
        }
        if(registeredDPs[name] !== undefined) {
            throw new InvalidOperationException("Dependency Property is already registered. [" + (ownerType)._TypeName + "." + name + "]");
        }
        var propd = new DependencyProperty();
        propd.Name = name;
        propd.GetTargetType = getTargetType;
        propd.OwnerType = ownerType;
        propd.DefaultValue = defaultValue;
        propd._HasDefaultValue = defaultValue !== undefined;
        propd._ChangedCallback = changedCallback;
        propd._AutoCreator = autocreator;
        propd._IsAutoCreated = autocreator != null;
        propd._Coercer = coercer;
        propd._AlwaysChange = alwaysChange;
        propd._Validator = validator;
        propd.IsCustom = isCustom;
        propd.IsReadOnly = isReadOnly === true;
        propd._IsAttached = isAttached === true;
        propd._ID = DependencyProperty._LastID = DependencyProperty._LastID + 1;
        propd._BitmaskCache = Fayde.Provider.ProviderStore.BuildBitmask(propd);
        propd._Inheritable = inheritable;
        if(inheritable !== undefined) {
            var i = DependencyProperty._Inherited;
            if(!i[inheritable]) {
                i[inheritable] = [];
            }
            i[inheritable].push(propd);
        }
        registeredDPs[name] = propd;
        DependencyProperty._IDs[propd._ID] = propd;
        return propd;
    };
    DependencyProperty.prototype.ValidateSetValue = function (dobj, value, isValidOut) {
        isValidOut.IsValid = false;
        var coerced = value;
        if(this._Coercer && !(coerced = this._Coercer(dobj, this, coerced))) {
            return coerced;
        }
        if(this._Validator && !this._Validator(dobj, this, coerced)) {
            return coerced;
        }
        isValidOut.IsValid = true;
        return coerced;
    };
    return DependencyProperty;
})();
var Nullstone = (function () {
    function Nullstone() { }
    Nullstone.Equals = function Equals(val1, val2) {
        if(val1 == null && val2 == null) {
            return true;
        }
        if(val1 == null || val2 == null) {
            return false;
        }
        if(val1 === val2) {
            return true;
        }
        if(val1.Equals) {
            return val1.Equals(val2);
        }
        return false;
    };
    return Nullstone;
})();
var Enum = (function () {
    function Enum(Object) {
        this.Object = Object;
    }
    return Enum;
})();
var CornerRadius = (function () {
    function CornerRadius(topLeft, topRight, bottomRight, bottomLeft) {
        this.TopLeft = topLeft == null ? 0 : topLeft;
        this.TopRight = topRight == null ? 0 : topRight;
        this.BottomRight = bottomRight == null ? 0 : bottomRight;
        this.BottomLeft = bottomLeft == null ? 0 : bottomLeft;
    }
    CornerRadius._TypeName = "CornerRadius";
    CornerRadius.prototype.IsZero = function () {
        return this.TopLeft === 0 && this.TopRight === 0 && this.BottomRight === 0 && this.BottomLeft === 0;
    };
    CornerRadius.prototype.Equals = function (other) {
        return this.TopLeft === other.TopLeft && this.TopRight === other.TopRight && this.BottomRight === other.BottomRight && this.BottomLeft === other.BottomLeft;
    };
    CornerRadius.prototype.toString = function () {
        return "(" + this.TopLeft + ", " + this.TopRight + ", " + this.BottomRight + ", " + this.BottomLeft + ")";
    };
    return CornerRadius;
})();
var Color = (function () {
    function Color() {
        this.R = 0;
        this.G = 0;
        this.B = 0;
        this.A = 1.0;
    }
    Color.__NoAlphaRegex = /#([0-9a-fA-F][0-9a-fA-F]){1}([0-9a-fA-F][0-9a-fA-F]){1}([0-9a-fA-F][0-9a-fA-F]){1}/;
    Color.__AlphaRegex = /#([0-9a-fA-F][0-9a-fA-F]){1}([0-9a-fA-F][0-9a-fA-F]){1}([0-9a-fA-F][0-9a-fA-F]){1}([0-9a-fA-F][0-9a-fA-F]){1}/;
    Color.prototype.Add = function (color2) {
        var c = new Color();
        c.R = this.R + color2.R;
        c.G = this.G + color2.G;
        c.B = this.B + color2.B;
        c.A = this.A + color2.A;
        return c;
    };
    Color.prototype.Subtract = function (color2) {
        var c = new Color();
        c.R = this.R - color2.R;
        c.G = this.G - color2.G;
        c.B = this.B - color2.B;
        c.A = this.A - color2.A;
        return c;
    };
    Color.prototype.Multiply = function (factor) {
        var c = new Color();
        c.R = this.R * factor;
        c.G = this.G * factor;
        c.B = this.B * factor;
        c.A = this.A * factor;
        return c;
    };
    Color.prototype.Equals = function (other) {
        return this.R === other.R && this.G === other.G && this.B === other.B && this.A === other.A;
    };
    Color.prototype.toString = function () {
        return "rgba(" + this.R.toString() + "," + this.G.toString() + "," + this.B.toString() + "," + this.A.toString() + ")";
    };
    Color.prototype.ToHexStringNoAlpha = function () {
        return "#" + this.R.toString(16) + this.G.toString(16) + this.B.toString(16);
    };
    Color.LERP = function LERP(start, end, p) {
        var c = new Color();
        c.R = start.R + (end.R - start.R) * p;
        c.G = start.G + (end.G - start.G) * p;
        c.B = start.B + (end.B - start.B) * p;
        c.A = start.A + (end.A - start.A) * p;
        return c;
    };
    Color.FromRgba = function FromRgba(r, g, b, a) {
        var c = new Color();
        c.R = r;
        c.G = g;
        c.B = b;
        c.A = a;
        return c;
    };
    Color.FromHex = function FromHex(hex) {
        var match;
        var c = new Color();
        if((match = Color.__AlphaRegex.exec(hex)) != null) {
            c.A = parseInt(match[1], 16) / 255.0;
            c.R = parseInt(match[2], 16);
            c.G = parseInt(match[3], 16);
            c.B = parseInt(match[4], 16);
        } else if((match = Color.__NoAlphaRegex.exec(hex)) != null) {
            c.A = 1.0;
            c.R = parseInt(match[1], 16);
            c.G = parseInt(match[2], 16);
            c.B = parseInt(match[3], 16);
        }
        return c;
    };
    Color.KnownColors = {
        AliceBlue: Color.FromHex("#FFF0F8FF"),
        AntiqueWhite: Color.FromHex("#FFFAEBD7"),
        Aqua: Color.FromHex("#FF00FFFF"),
        Aquamarine: Color.FromHex("#FF7FFFD4"),
        Azure: Color.FromHex("#FFF0FFFF"),
        Beige: Color.FromHex("#FFF5F5DC"),
        Bisque: Color.FromHex("#FFFFE4C4"),
        Black: Color.FromHex("#FF000000"),
        BlanchedAlmond: Color.FromHex("#FFFFEBCD"),
        Blue: Color.FromHex("#FF0000FF"),
        BlueViolet: Color.FromHex("#FF8A2BE2"),
        Brown: Color.FromHex("#FFA52A2A"),
        BurlyWood: Color.FromHex("#FFDEB887"),
        CadetBlue: Color.FromHex("#FF5F9EA0"),
        Chartreuse: Color.FromHex("#FF7FFF00"),
        Chocolate: Color.FromHex("#FFD2691E"),
        Coral: Color.FromHex("#FFFF7F50"),
        CornflowerBlue: Color.FromHex("#FF6495ED"),
        Cornsilk: Color.FromHex("#FFFFF8DC"),
        Crimson: Color.FromHex("#FFDC143C"),
        Cyan: Color.FromHex("#FF00FFFF"),
        DarkBlue: Color.FromHex("#FF00008B"),
        DarkCyan: Color.FromHex("#FF008B8B"),
        DarkGoldenrod: Color.FromHex("#FFB8860B"),
        DarkGray: Color.FromHex("#FFA9A9A9"),
        DarkGreen: Color.FromHex("#FF006400"),
        DarkKhaki: Color.FromHex("#FFBDB76B"),
        DarkMagenta: Color.FromHex("#FF8B008B"),
        DarkOliveGreen: Color.FromHex("#FF556B2F"),
        DarkOrange: Color.FromHex("#FFFF8C00"),
        DarkOrchid: Color.FromHex("#FF9932CC"),
        DarkRed: Color.FromHex("#FF8B0000"),
        DarkSalmon: Color.FromHex("#FFE9967A"),
        DarkSeaGreen: Color.FromHex("#FF8FBC8F"),
        DarkSlateBlue: Color.FromHex("#FF483D8B"),
        DarkSlateGray: Color.FromHex("#FF2F4F4F"),
        DarkTurquoise: Color.FromHex("#FF00CED1"),
        DarkViolet: Color.FromHex("#FF9400D3"),
        DeepPink: Color.FromHex("#FFFF1493"),
        DeepSkyBlue: Color.FromHex("#FF00BFFF"),
        DimGray: Color.FromHex("#FF696969"),
        DodgerBlue: Color.FromHex("#FF1E90FF"),
        Firebrick: Color.FromHex("#FFB22222"),
        FloralWhite: Color.FromHex("#FFFFFAF0"),
        ForestGreen: Color.FromHex("#FF228B22"),
        Fuchsia: Color.FromHex("#FFFF00FF"),
        Gainsboro: Color.FromHex("#FFDCDCDC"),
        GhostWhite: Color.FromHex("#FFF8F8FF"),
        Gold: Color.FromHex("#FFFFD700"),
        Goldenrod: Color.FromHex("#FFDAA520"),
        Gray: Color.FromHex("#FF808080"),
        Green: Color.FromHex("#FF008000"),
        GreenYellow: Color.FromHex("#FFADFF2F"),
        Honeydew: Color.FromHex("#FFF0FFF0"),
        HotPink: Color.FromHex("#FFFF69B4"),
        IndianRed: Color.FromHex("#FFCD5C5C"),
        Indigo: Color.FromHex("#FF4B0082"),
        Ivory: Color.FromHex("#FFFFFFF0"),
        Khaki: Color.FromHex("#FFF0E68C"),
        Lavender: Color.FromHex("#FFE6E6FA"),
        LavenderBlush: Color.FromHex("#FFFFF0F5"),
        LawnGreen: Color.FromHex("#FF7CFC00"),
        LemonChiffon: Color.FromHex("#FFFFFACD"),
        LightBlue: Color.FromHex("#FFADD8E6"),
        LightCoral: Color.FromHex("#FFF08080"),
        LightCyan: Color.FromHex("#FFE0FFFF"),
        LightGoldenrodYellow: Color.FromHex("#FFFAFAD2"),
        LightGray: Color.FromHex("#FFD3D3D3"),
        LightGreen: Color.FromHex("#FF90EE90"),
        LightPink: Color.FromHex("#FFFFB6C1"),
        LightSalmon: Color.FromHex("#FFFFA07A"),
        LightSeaGreen: Color.FromHex("#FF20B2AA"),
        LightSkyBlue: Color.FromHex("#FF87CEFA"),
        LightSlateGray: Color.FromHex("#FF778899"),
        LightSteelBlue: Color.FromHex("#FFB0C4DE"),
        LightYellow: Color.FromHex("#FFFFFFE0"),
        Lime: Color.FromHex("#FF00FF00"),
        LimeGreen: Color.FromHex("#FF32CD32"),
        Linen: Color.FromHex("#FFFAF0E6"),
        Magenta: Color.FromHex("#FFFF00FF"),
        Maroon: Color.FromHex("#FF800000"),
        MediumAquamarine: Color.FromHex("#FF66CDAA"),
        MediumBlue: Color.FromHex("#FF0000CD"),
        MediumOrchid: Color.FromHex("#FFBA55D3"),
        MediumPurple: Color.FromHex("#FF9370DB"),
        MediumSeaGreen: Color.FromHex("#FF3CB371"),
        MediumSlateBlue: Color.FromHex("#FF7B68EE"),
        MediumSpringGreen: Color.FromHex("#FF00FA9A"),
        MediumTurquoise: Color.FromHex("#FF48D1CC"),
        MediumVioletRed: Color.FromHex("#FFC71585"),
        MidnightBlue: Color.FromHex("#FF191970"),
        MintCream: Color.FromHex("#FFF5FFFA"),
        MistyRose: Color.FromHex("#FFFFE4E1"),
        Moccasin: Color.FromHex("#FFFFE4B5"),
        NavajoWhite: Color.FromHex("#FFFFDEAD"),
        Navy: Color.FromHex("#FF000080"),
        OldLace: Color.FromHex("#FFFDF5E6"),
        Olive: Color.FromHex("#FF808000"),
        OliveDrab: Color.FromHex("#FF6B8E23"),
        Orange: Color.FromHex("#FFFFA500"),
        OrangeRed: Color.FromHex("#FFFF4500"),
        Orchid: Color.FromHex("#FFDA70D6"),
        PaleGoldenrod: Color.FromHex("#FFEEE8AA"),
        PaleGreen: Color.FromHex("#FF98FB98"),
        PaleTurquoise: Color.FromHex("#FFAFEEEE"),
        PaleVioletRed: Color.FromHex("#FFDB7093"),
        PapayaWhip: Color.FromHex("#FFFFEFD5"),
        PeachPuff: Color.FromHex("#FFFFDAB9"),
        Peru: Color.FromHex("#FFCD853F"),
        Pink: Color.FromHex("#FFFFC0CB"),
        Plum: Color.FromHex("#FFDDA0DD"),
        PowderBlue: Color.FromHex("#FFB0E0E6"),
        Purple: Color.FromHex("#FF800080"),
        Red: Color.FromHex("#FFFF0000"),
        RosyBrown: Color.FromHex("#FFBC8F8F"),
        RoyalBlue: Color.FromHex("#FF4169E1"),
        SaddleBrown: Color.FromHex("#FF8B4513"),
        Salmon: Color.FromHex("#FFFA8072"),
        SandyBrown: Color.FromHex("#FFF4A460"),
        SeaGreen: Color.FromHex("#FF2E8B57"),
        SeaShell: Color.FromHex("#FFFFF5EE"),
        Sienna: Color.FromHex("#FFA0522D"),
        Silver: Color.FromHex("#FFC0C0C0"),
        SkyBlue: Color.FromHex("#FF87CEEB"),
        SlateBlue: Color.FromHex("#FF6A5ACD"),
        SlateGray: Color.FromHex("#FF708090"),
        Snow: Color.FromHex("#FFFFFAFA"),
        SpringGreen: Color.FromHex("#FF00FF7F"),
        SteelBlue: Color.FromHex("#FF4682B4"),
        Tan: Color.FromHex("#FFD2B48C"),
        Teal: Color.FromHex("#FF008080"),
        Thistle: Color.FromHex("#FFD8BFD8"),
        Tomato: Color.FromHex("#FFFF6347"),
        Transparent: Color.FromHex("#00FFFFFF"),
        Turquoise: Color.FromHex("#FF40E0D0"),
        Violet: Color.FromHex("#FFEE82EE"),
        Wheat: Color.FromHex("#FFF5DEB3"),
        White: Color.FromHex("#FFFFFFFF"),
        WhiteSmoke: Color.FromHex("#FFF5F5F5"),
        Yellow: Color.FromHex("#FFFFFF00"),
        YellowGreen: Color.FromHex("#FF9ACD32")
    };
    return Color;
})();
var Thickness = (function () {
    function Thickness(left, top, right, bottom) {
        this.Left = left == null ? 0 : left;
        this.Top = top == null ? 0 : top;
        this.Right = right == null ? 0 : right;
        this.Bottom = bottom == null ? 0 : bottom;
    }
    Thickness._TypeName = "Thickness";
    Thickness.prototype.Plus = function (thickness2) {
        var t = new Thickness();
        t.Left = this.Left + thickness2.Left;
        t.Right = this.Right + thickness2.Right;
        t.Top = this.Top + thickness2.Top;
        t.Bottom = this.Bottom + thickness2.Bottom;
        return t;
    };
    Thickness.prototype.IsEmpty = function () {
        return this.Left == 0 && this.Top == 0 && this.Right == 0 && this.Bottom == 0;
    };
    Thickness.prototype.IsBalanced = function () {
        return this.Left === this.Top && this.Left === this.Right && this.Left === this.Bottom;
    };
    Thickness.prototype.toString = function () {
        return "(" + this.Left + ", " + this.Top + ", " + this.Right + ", " + this.Bottom + ")";
    };
    Thickness.Equals = function Equals(thickness1, thickness2) {
        if(thickness1 == null && thickness2 == null) {
            return true;
        }
        if(thickness1 == null || thickness2 == null) {
            return false;
        }
        return thickness1.Left === thickness2.Left && thickness1.Top === thickness2.Top && thickness1.Right === thickness2.Right && thickness1.Bottom === thickness2.Bottom;
    };
    return Thickness;
})();
var Fayde;
(function (Fayde) {
    (function (Media) {
        var Geometry = (function () {
            function Geometry() { }
            return Geometry;
        })();
        Media.Geometry = Geometry;        
    })(Fayde.Media || (Fayde.Media = {}));
    var Media = Fayde.Media;
})(Fayde || (Fayde = {}));
var Fayde;
(function (Fayde) {
    (function (Media) {
        function ParseGeometry(val) {
            return new Media.Geometry();
        }
        Media.ParseGeometry = ParseGeometry;
    })(Fayde.Media || (Fayde.Media = {}));
    var Media = Fayde.Media;
})(Fayde || (Fayde = {}));
var Fayde;
(function (Fayde) {
    (function (Shapes) {
        var PointCollection = (function () {
            function PointCollection() { }
            return PointCollection;
        })();
        Shapes.PointCollection = PointCollection;        
    })(Fayde.Shapes || (Fayde.Shapes = {}));
    var Shapes = Fayde.Shapes;
})(Fayde || (Fayde = {}));
var Fayde;
(function (Fayde) {
    (function (Shapes) {
        function ParsePointCollection(val) {
            return new Shapes.PointCollection();
        }
        Shapes.ParsePointCollection = ParsePointCollection;
    })(Fayde.Shapes || (Fayde.Shapes = {}));
    var Shapes = Fayde.Shapes;
})(Fayde || (Fayde = {}));
var Fayde;
(function (Fayde) {
    (function (Media) {
        var Brush = (function () {
            function Brush() { }
            return Brush;
        })();
        Media.Brush = Brush;        
    })(Fayde.Media || (Fayde.Media = {}));
    var Media = Fayde.Media;
})(Fayde || (Fayde = {}));
var Fayde;
(function (Fayde) {
    (function (Media) {
        var SolidColorBrush = (function (_super) {
            __extends(SolidColorBrush, _super);
            function SolidColorBrush() {
                _super.apply(this, arguments);

            }
            return SolidColorBrush;
        })(Media.Brush);
        Media.SolidColorBrush = SolidColorBrush;        
    })(Fayde.Media || (Fayde.Media = {}));
    var Media = Fayde.Media;
})(Fayde || (Fayde = {}));
var Fayde;
(function (Fayde) {
    var TypeConverters = (function () {
        function TypeConverters() { }
        TypeConverters.ThicknessConverter = function ThicknessConverter(str) {
            if(!str) {
                return new Thickness();
            }
            var tokens = str.split(",");
            var left, top, right, bottom;
            if(tokens.length === 1) {
                left = top = right = bottom = parseFloat(tokens[0]);
            } else if(tokens.length === 2) {
                left = right = parseFloat(tokens[0]);
                top = bottom = parseFloat(tokens[1]);
            } else if(tokens.length === 4) {
                left = parseFloat(tokens[0]);
                top = parseFloat(tokens[1]);
                right = parseFloat(tokens[2]);
                bottom = parseFloat(tokens[3]);
            } else {
                throw new XamlParseException("Cannot parse Thickness value '" + str + "'");
            }
            return new Thickness(left, top, right, bottom);
        };
        TypeConverters.CornerRadiusConverter = function CornerRadiusConverter(str) {
            if(!str) {
                return new CornerRadius();
            }
            var tokens = str.split(",");
            var topLeft, topRight, bottomRight, bottomLeft;
            if(tokens.length === 1) {
                topLeft = topRight = bottomRight = bottomLeft = parseFloat(tokens[0]);
            } else if(tokens.length === 4) {
                topLeft = parseFloat(tokens[0]);
                topRight = parseFloat(tokens[1]);
                bottomLeft = parseFloat(tokens[2]);
                bottomRight = parseFloat(tokens[3]);
            } else {
                throw new XamlParseException("Cannot parse CornerRadius value '" + str + "'");
            }
            return new CornerRadius(topLeft, topRight, bottomRight, bottomLeft);
        };
        TypeConverters.BrushConverter = function BrushConverter(str) {
            var scb = new Fayde.Media.SolidColorBrush();
            scb.Color = TypeConverters.ColorConverter(str);
            return scb;
        };
        TypeConverters.ColorConverter = function ColorConverter(str) {
            if(!str) {
                return new Color();
            }
            if(str.substr(0, 1) !== "#") {
                var color = Color.KnownColors[str];
                if(!color) {
                    throw new NotSupportedException("Unknown Color: " + str);
                }
                return color;
            }
            return Color.FromHex(str);
        };
        return TypeConverters;
    })();    
    var TypeConverter = (function () {
        function TypeConverter() { }
        TypeConverter.ConvertObject = function ConvertObject(propd, val, objectType, doStringConversion) {
            if(val == null) {
                return val;
            }
            var targetType = propd.GetTargetType();
            if(typeof targetType === "function" && (targetType)._IsNullstone) {
                if(val instanceof targetType) {
                    return val;
                }
                var converter = TypeConverters[(targetType)._TypeName + "Converter"];
                if(converter) {
                    return converter(val);
                }
            } else if(targetType instanceof Enum) {
                if(typeof val === "string") {
                    var ret = (targetType).Object[val];
                    if(ret !== undefined) {
                        return ret;
                    }
                    return val;
                }
            } else if(typeof targetType === "number" || targetType === Number) {
                if(typeof val === "number") {
                    return val;
                }
                if(!val) {
                    return 0;
                }
                if(val instanceof Thickness) {
                    return val.Left;
                }
                return parseFloat(val.toString());
            }
            if(typeof targetType === "string" || targetType === String) {
                return doStringConversion ? val.toString() : "";
            }
            var tc;
            if(propd._IsAttached) {
            } else {
            }
            return val;
        };
        TypeConverter.GeometryFromString = function GeometryFromString(val) {
            return Fayde.Media.ParseGeometry(val);
        };
        TypeConverter.PointCollectionFromString = function PointCollectionFromString(val) {
            return Fayde.Shapes.ParsePointCollection(val);
        };
        return TypeConverter;
    })();
    Fayde.TypeConverter = TypeConverter;    
})(Fayde || (Fayde = {}));
var Fayde;
(function (Fayde) {
    var SetterCollection = (function (_super) {
        __extends(SetterCollection, _super);
        function SetterCollection() {
            _super.apply(this, arguments);

            this._IsSealed = false;
        }
        SetterCollection.prototype._Seal = function (targetType) {
            if(this._IsSealed) {
                return;
            }
            var enumerator = this.GetEnumerator();
            while(enumerator.MoveNext()) {
                (enumerator.Current)._Seal(targetType);
            }
            this._IsSealed = true;
        };
        SetterCollection.prototype.AddedToCollection = function (value, error) {
            if(!value || !this._ValidateSetter(value, error)) {
                return false;
            }
            return _super.prototype.AddedToCollection.call(this, value, error);
        };
        SetterCollection.prototype._ValidateSetter = function (setter, error) {
            if(setter.Property === undefined) {
                error.Message = "Cannot have a null PropertyProperty value";
                return false;
            }
            if(setter.Value === undefined) {
                error.Message = "Cannot have a null ValueProperty value";
                return false;
            }
            if(this._IsSealed) {
                error.Message = "Cannot add a setter to a sealed style";
                return false;
            }
            return true;
        };
        return SetterCollection;
    })(Fayde.XamlObjectCollection);
    Fayde.SetterCollection = SetterCollection;    
    var Setter = (function (_super) {
        __extends(Setter, _super);
        function Setter() {
            _super.apply(this, arguments);

            this._IsSealed = false;
        }
        Setter.prototype._Seal = function (targetType) {
            var propd = this.Property;
            var val = this.Value;
            if(typeof propd.GetTargetType() === "string") {
                if(typeof val !== "string") {
                    throw new XamlParseException("Setter value does not match property type.");
                }
            }
            try  {
                this.ConvertedValue = Fayde.TypeConverter.ConvertObject(propd, val, targetType, true);
            } catch (err) {
                throw new XamlParseException(err.message);
            }
            this._IsSealed = true;
        };
        return Setter;
    })(Fayde.XamlObject);
    Fayde.Setter = Setter;    
})(Fayde || (Fayde = {}));
var Fayde;
(function (Fayde) {
    var Style = (function (_super) {
        __extends(Style, _super);
        function Style() {
            _super.apply(this, arguments);

            this._IsSealed = false;
        }
        Style.prototype.Seal = function () {
            if(this._IsSealed) {
                return;
            }
            this.Setters._Seal(this.TargetType);
            this._IsSealed = true;
            var base = this.BasedOn;
            if(base) {
                base.Seal();
            }
        };
        return Style;
    })(Fayde.XamlObject);
    Fayde.Style = Style;    
})(Fayde || (Fayde = {}));
var Fayde;
(function (Fayde) {
    function setterSort(setter1, setter2) {
        var a = setter1.Property;
        var b = setter2.Property;
        return (a === b) ? 0 : ((a._ID > b._ID) ? 1 : -1);
    }
    function mergeSetters(arr, dps, style) {
        var enumerator = style.Setters.GetEnumerator(true);
        var setter;
        while(enumerator.MoveNext()) {
            setter = enumerator.Current;
            if(!(setter instanceof Fayde.Setter)) {
                continue;
            }
            var propd = setter.Property;
            if(!propd) {
                continue;
            }
            if(dps[propd._ID]) {
                continue;
            }
            dps[propd._ID] = setter;
            arr.push(setter);
        }
    }
    function SingleStyleWalker(style) {
        var dps = [];
        var flattenedSetters = [];
        var cur = style;
        while(cur) {
            mergeSetters(flattenedSetters, dps, cur);
            cur = cur.BasedOn;
        }
        flattenedSetters.sort(setterSort);
        return {
            Step: function () {
                return flattenedSetters.shift();
            }
        };
    }
    Fayde.SingleStyleWalker = SingleStyleWalker;
    function MultipleStylesWalker(styles) {
        var flattenedSetters = [];
        if(styles) {
            var dps = [];
            var stylesSeen = [];
            var len = styles.length;
            for(var i = 0; i < length; i++) {
                var style = styles[i];
                while(style) {
                    if(stylesSeen.indexOf(style) > -1) {
                        continue;
                    }
                    mergeSetters(flattenedSetters, dps, style);
                    stylesSeen.push(style);
                    style = style.BasedOn;
                }
            }
            flattenedSetters.sort(setterSort);
        }
        return {
            Step: function () {
                return flattenedSetters.shift();
            }
        };
    }
    Fayde.MultipleStylesWalker = MultipleStylesWalker;
    function DeepTreeWalker(top, direction) {
        var last = undefined;
        var dir = Fayde.VisualTreeDirection.Logical;
        var walkList = [
            top.XamlNode
        ];
        if(direction) {
            dir = direction;
        }
        return {
            Step: function () {
                if(last) {
                    var enumerator = last.GetVisualTreeEnumerator(dir);
                    var insertIndex = 0;
                    while(enumerator.MoveNext()) {
                        walkList.splice(insertIndex, 0, enumerator.Current);
                        insertIndex++;
                    }
                }
                var next = walkList[0];
                if(!next) {
                    last = undefined;
                    return;
                }
                var curNode;
                return curNode;
            },
            SkipBranch: function () {
                last = undefined;
            }
        };
    }
    Fayde.DeepTreeWalker = DeepTreeWalker;
})(Fayde || (Fayde = {}));
var Fayde;
(function (Fayde) {
    var UINode = (function (_super) {
        __extends(UINode, _super);
        function UINode(xobj) {
                _super.call(this, xobj);
        }
        UINode.prototype.GetInheritedEnumerator = function () {
            return this.GetVisualTreeEnumerator(Fayde.VisualTreeDirection.Logical);
        };
        UINode.prototype.OnIsAttachedChanged = function (newIsAttached) {
            _super.prototype.OnIsAttachedChanged.call(this, newIsAttached);
            if(!newIsAttached) {
            }
        };
        UINode.prototype._ElementAdded = function (uie) {
            uie.XamlNode.VisualParentNode = this;
        };
        UINode.prototype._ElementRemoved = function (uie) {
            uie.XamlNode.VisualParentNode = null;
        };
        return UINode;
    })(Fayde.XamlNode);
    Fayde.UINode = UINode;    
    var UIElement = (function (_super) {
        __extends(UIElement, _super);
        function UIElement() {
            _super.apply(this, arguments);

        }
        UIElement.prototype.CreateNode = function () {
            return new UINode(this);
        };
        return UIElement;
    })(Fayde.DependencyObject);
    Fayde.UIElement = UIElement;    
})(Fayde || (Fayde = {}));
var RectOverlap = {
    Out: 0,
    In: 1,
    Part: 2
};
var rect = (function () {
    function rect() {
        this.X = 0;
        this.Y = 0;
        this.Width = 0;
        this.Height = 0;
    }
    rect.prototype.toString = function () {
        return "{" + this.X + "," + this.Y + "," + this.Width + "," + this.Height + "}";
    };
    rect._TypeName = "rect";
    rect.fromSize = function fromSize(size) {
        var r = new rect();
        r.Width = size.Width;
        r.Height = size.Height;
        return r;
    };
    rect.clear = function clear(dest) {
        dest.X = 0;
        dest.Y = 0;
        dest.Width = 0;
        dest.Height = 0;
    };
    rect.set = function set(dest, x, y, width, height) {
        dest.X = x;
        dest.Y = y;
        dest.Width = width;
        dest.Height = height;
    };
    rect.isEmpty = function isEmpty(rect1) {
        return rect1.Width <= 0 || rect1.Height <= 0;
    };
    rect.isEmptyLogical = function isEmptyLogical(rect1) {
        return rect1.Width <= 0 && rect1.Height <= 0;
    };
    rect.copyTo = function copyTo(src, dest) {
        dest.X = src.X;
        dest.Y = src.Y;
        dest.Width = src.Width;
        dest.Height = src.Height;
    };
    rect.clone = function clone(src) {
        var r = new rect();
        r.X = src.X;
        r.Y = src.Y;
        r.Width = src.Width;
        r.Height = src.Height;
        return r;
    };
    rect.isEqual = function isEqual(rect1, rect2) {
        return rect1.X === rect2.X && rect1.Y === rect2.Y && rect1.Width === rect2.Width && rect1.Height === rect2.Height;
    };
    rect.intersection = function intersection(rect1, rect2) {
        var x = Math.max(rect1.X, rect2.X);
        var y = Math.max(rect2.Y, rect2.Y);
        rect1.Width = Math.max(0, Math.min(rect1.X + rect1.Width, rect2.X + rect2.Width) - x);
        rect1.Height = Math.max(0, Math.min(rect1.Y + rect1.Height, rect2.Y + rect2.Height) - y);
        rect1.X = x;
        rect1.Y = y;
    };
    rect.union = function union(rect1, rect2) {
        if(rect.isEmpty(rect2)) {
            return;
        }
        if(rect.isEmpty(rect1)) {
            rect.copyTo(rect2, rect1);
            return;
        }
        var x = Math.min(rect1.X, rect2.X);
        var y = Math.min(rect1.Y, rect2.Y);
        rect1.Width = Math.max(rect1.X + rect1.Width, rect2.X + rect2.Width) - x;
        rect1.Height = Math.max(rect1.Y + rect1.Height, rect2.Y + rect2.Height) - y;
        rect1.X = x;
        rect1.Y = y;
    };
    rect.unionLogical = function unionLogical(rect1, rect2) {
        if(rect.isEmptyLogical(rect2)) {
            return;
        }
        if(rect.isEmptyLogical(rect1)) {
            rect.copyTo(rect2, rect1);
            return;
        }
        var x = Math.min(rect1.X, rect2.X);
        var y = Math.min(rect1.Y, rect2.Y);
        rect1.Width = Math.max(rect1.X + rect1.Width, rect2.X + rect2.Width) - x;
        rect1.Height = Math.max(rect1.Y + rect1.Height, rect2.Y + rect2.Height) - y;
        rect1.X = x;
        rect1.Y = y;
    };
    rect.growBy = function growBy(dest, left, top, right, bottom) {
        dest.X -= left;
        dest.Y -= top;
        dest.Width += left + right;
        dest.Height += top + bottom;
        if(dest.Width < 0) {
            dest.Width = 0;
        }
        if(dest.Height < 0) {
            dest.Height = 0;
        }
    };
    rect.growByThickness = function growByThickness(dest, thickness) {
        dest.X -= thickness.Left;
        dest.Y -= thickness.Top;
        dest.Width += thickness.Left + thickness.Right;
        dest.Height += thickness.Top + thickness.Bottom;
        if(dest.Width < 0) {
            dest.Width = 0;
        }
        if(dest.Height < 0) {
            dest.Height = 0;
        }
    };
    rect.shrinkBy = function shrinkBy(dest, left, top, right, bottom) {
        dest.X += left;
        dest.Y += top;
        dest.Width -= left + right;
        dest.Height -= top + bottom;
        if(dest.Width < 0) {
            dest.Width = 0;
        }
        if(dest.Height < 0) {
            dest.Height = 0;
        }
    };
    rect.shrinkByThickness = function shrinkByThickness(dest, thickness) {
        dest.X += thickness.Left;
        dest.Y += thickness.Top;
        dest.Width -= thickness.Left + thickness.Right;
        dest.Height -= thickness.Top + thickness.Bottom;
        if(dest.Width < 0) {
            dest.Width = 0;
        }
        if(dest.Height < 0) {
            dest.Height = 0;
        }
    };
    rect.extendTo = function extendTo(rect1, x, y) {
        var rx = rect1.X;
        var ry = rect1.Y;
        var rw = rect1.Width;
        var rh = rect1.Height;
        if(x < rx || x > (rx + rw)) {
            rw = Math.max(Math.abs(x - rx), Math.abs(x - rx - rw));
        }
        if(y < ry || y > (ry + rh)) {
            rh = Math.max(Math.abs(y - ry), Math.abs(y - ry - rh));
        }
        rect1.X = Math.min(rx, x);
        rect1.Y = Math.min(ry, y);
        rect1.Width = rw;
        rect1.Height = rh;
    };
    rect.transform = function transform(dest, xform) {
        if(!xform) {
            return;
        }
        var x = dest.X;
        var y = dest.Y;
        var width = dest.Width;
        var height = dest.Height;
        var p1 = vec2.createFrom(x, y);
        var p2 = vec2.createFrom(x + width, y);
        var p3 = vec2.createFrom(x + width, y + height);
        var p4 = vec2.createFrom(x, y + height);
        mat3.transformVec2(xform, p1);
        mat3.transformVec2(xform, p2);
        mat3.transformVec2(xform, p3);
        mat3.transformVec2(xform, p4);
        var l = Math.min(p1[0], p2[0], p3[0], p4[0]);
        var t = Math.min(p1[1], p2[1], p3[1], p4[1]);
        var r = Math.max(p1[0], p2[0], p3[0], p4[0]);
        var b = Math.max(p1[1], p2[1], p3[1], p4[1]);
        dest.X = l;
        dest.Y = t;
        dest.Width = r - l;
        dest.Height = b - t;
    };
    rect.clipmask = function clipmask(clip) {
        var mask = 0;
        if(-clip[0] + clip[3] < 0) {
            mask |= (1 << 0);
        }
        if(clip[0] + clip[3] < 0) {
            mask |= (1 << 1);
        }
        if(-clip[1] + clip[3] < 0) {
            mask |= (1 << 2);
        }
        if(clip[1] + clip[3] < 0) {
            mask |= (1 << 3);
        }
        if(clip[2] + clip[3] < 0) {
            mask |= (1 << 4);
        }
        if(-clip[2] + clip[3] < 0) {
            mask |= (1 << 5);
        }
        return mask;
    };
    rect.transform4 = function transform4(dest, projection) {
        if(!projection) {
            return;
        }
        var x = dest.X;
        var y = dest.Y;
        var width = dest.Width;
        var height = dest.Height;
        var p1 = vec4.createFrom(x, y, 0.0, 1.0);
        var p2 = vec4.createFrom(x + width, y, 0.0, 1.0);
        var p3 = vec4.createFrom(x + width, y + height, 0.0, 1.0);
        var p4 = vec4.createFrom(x, y + height, 0.0, 1.0);
        mat4.transformVec4(projection, p1);
        mat4.transformVec4(projection, p2);
        mat4.transformVec4(projection, p3);
        mat4.transformVec4(projection, p4);
        var vs = 65536.0;
        var vsr = 1.0 / vs;
        p1[0] *= vsr;
        p1[1] *= vsr;
        p2[0] *= vsr;
        p2[1] *= vsr;
        p3[0] *= vsr;
        p3[1] *= vsr;
        p4[0] *= vsr;
        p4[1] *= vsr;
        var cm1 = rect.clipmask(p1);
        var cm2 = rect.clipmask(p2);
        var cm3 = rect.clipmask(p3);
        var cm4 = rect.clipmask(p4);
        if((cm1 | cm2 | cm3 | cm4) !== 0) {
            if((cm1 & cm2 & cm3 & cm4) === 0) {
                rect.clear(dest);
            }
        } else {
            var p1w = 1.0 / p1[3];
            var p2w = 1.0 / p2[3];
            var p3w = 1.0 / p3[3];
            var p4w = 1.0 / p4[3];
            p1[0] *= p1w * vs;
            p1[1] *= p1w * vs;
            p2[0] *= p2w * vs;
            p2[1] *= p2w * vs;
            p3[0] *= p3w * vs;
            p3[1] *= p3w * vs;
            p4[0] *= p4w * vs;
            p4[1] *= p4w * vs;
            dest.X = p1[0];
            dest.Y = p1[1];
            dest.Width = 0;
            dest.Height = 0;
            rect.extendTo(dest, p2[0], p2[1]);
            rect.extendTo(dest, p3[0], p3[1]);
            rect.extendTo(dest, p4[0], p4[1]);
        }
    };
    rect.round = function round(dest) {
        dest.X = Math.round(dest.X);
        dest.Y = Math.round(dest.Y);
        dest.Width = Math.round(dest.Width);
        dest.Height = Math.round(dest.Height);
        return dest;
    };
    rect.roundOut = function roundOut(dest) {
        var x = Math.floor(dest.X);
        var y = Math.floor(dest.Y);
        dest.Width = Math.ceil(dest.X + dest.Width) - Math.floor(dest.X);
        dest.Height = Math.ceil(dest.Y + dest.Height) - Math.floor(dest.Y);
        dest.X = x;
        dest.Y = y;
        return dest;
    };
    rect.roundIn = function roundIn(dest) {
        var x = Math.ceil(dest.X);
        var y = Math.ceil(dest.Y);
        dest.Width = Math.floor(dest.X + dest.Width) - Math.ceil(dest.X);
        dest.Height = Math.floor(dest.Y + dest.Height) - Math.ceil(dest.Y);
        dest.X = x;
        dest.Y = y;
        return dest;
    };
    rect.copyGrowTransform = function copyGrowTransform(dest, src, thickness, xform) {
        rect.copyTo(src, dest);
        rect.growByThickness(dest, thickness);
        rect.transform(dest, xform);
    };
    rect.copyGrowTransform4 = function copyGrowTransform4(dest, src, thickness, projection) {
        rect.copyTo(src, dest);
        rect.growByThickness(dest, thickness);
        rect.transform4(dest, projection);
    };
    rect.containsPoint = function containsPoint(rect1, p) {
        return rect1.X <= p.X && rect1.Y <= p.Y && (rect1.X + rect1.Width) >= p.X && (rect1.Y + rect1.Height) >= p.Y;
    };
    rect.containsPointXY = function containsPointXY(rect1, x, y) {
        return rect1.X <= x && rect1.Y <= y && (rect1.X + rect1.Width) >= x && (rect1.Y + rect1.Height) >= y;
    };
    rect.rectIn = function rectIn(rect1, rect2) {
        var copy = rect.clone(rect1);
        rect.intersection(copy, rect2);
        if(rect.isEmpty(copy)) {
            return RectOverlap.Out;
        }
        if(rect.isEqual(copy, rect2)) {
            return RectOverlap.In;
        }
        return RectOverlap.Part;
    };
    rect.isRectContainedIn = function isRectContainedIn(src, test) {
        var copy = rect.clone(src);
        rect.intersection(copy, test);
        return !rect.isEqual(src, copy);
    };
    return rect;
})();
var size = (function () {
    function size() {
        this.Width = 0;
        this.Height = 0;
    }
    size.prototype.toString = function () {
        return "{" + this.Width + "," + this.Height + "}";
    };
    size._TypeName = "size";
    size.fromRaw = function fromRaw(width, height) {
        var s = new size();
        s.Width = width;
        s.Height = height;
        return s;
    };
    size.fromRect = function fromRect(src) {
        var s = new size();
        s.Width = src.Width;
        s.Height = src.Height;
        return s;
    };
    size.createInfinite = function createInfinite() {
        var s = new size();
        s.Width = Number.POSITIVE_INFINITY;
        s.Height = Number.POSITIVE_INFINITY;
        return s;
    };
    size.createNegativeInfinite = function createNegativeInfinite() {
        var s = new size();
        s.Width = Number.NEGATIVE_INFINITY;
        s.Height = Number.NEGATIVE_INFINITY;
        return s;
    };
    size.copyTo = function copyTo(src, dest) {
        dest.Width = src.Width;
        dest.Height = src.Height;
    };
    size.clone = function clone(src) {
        var s = new size();
        s.Width = src.Width;
        s.Height = src.Height;
        return s;
    };
    size.clear = function clear(dest) {
        dest.Width = 0;
        dest.Height = 0;
    };
    size.isEqual = function isEqual(size1, size2) {
        return size1.Width === size2.Width && size1.Height === size2.Height;
    };
    size.growBy = function growBy(dest, width, height) {
        var h = dest.Height;
        var w = dest.Width;
        if(h != Number.POSITIVE_INFINITY) {
            h += height;
        }
        if(w != Number.POSITIVE_INFINITY) {
            w += width;
        }
        dest.Width = w > 0 ? w : 0;
        dest.Height = h > 0 ? h : 0;
        return dest;
    };
    size.growByThickness = function growByThickness(dest, thickness) {
        var w = dest.Width;
        var h = dest.Height;
        if(w != Number.POSITIVE_INFINITY) {
            w += thickness.Left + thickness.Right;
        }
        if(h != Number.POSITIVE_INFINITY) {
            h += thickness.Top + thickness.Bottom;
        }
        dest.Width = w > 0 ? w : 0;
        dest.Height = h > 0 ? h : 0;
        return dest;
    };
    size.shrinkBy = function shrinkBy(dest, width, height) {
        var h = dest.Height;
        var w = dest.Width;
        if(h != Number.POSITIVE_INFINITY) {
            h -= height;
        }
        if(w != Number.POSITIVE_INFINITY) {
            w -= width;
        }
        dest.Width = w > 0 ? w : 0;
        dest.Height = h > 0 ? h : 0;
        return dest;
    };
    size.shrinkByThickness = function shrinkByThickness(dest, thickness) {
        var w = dest.Width;
        var h = dest.Height;
        if(w != Number.POSITIVE_INFINITY) {
            w -= thickness.Left + thickness.Right;
        }
        if(h != Number.POSITIVE_INFINITY) {
            h -= thickness.Top + thickness.Bottom;
        }
        dest.Width = w > 0 ? w : 0;
        dest.Height = h > 0 ? h : 0;
        return dest;
    };
    size.min = function min(dest, other) {
        dest.Width = Math.min(dest.Width, other.Width);
        dest.Height = Math.min(dest.Height, other.Height);
        return dest;
    };
    size.max = function max(dest, other) {
        dest.Width = Math.max(dest.Width, other.Width);
        dest.Height = Math.max(dest.Height, other.Height);
        return dest;
    };
    return size;
})();
var Fayde;
(function (Fayde) {
    var XamlObjectCollection = (function (_super) {
        __extends(XamlObjectCollection, _super);
        function XamlObjectCollection() {
            _super.apply(this, arguments);

            this._ht = [];
            this._listeners = [];
        }
        Object.defineProperty(XamlObjectCollection.prototype, "Count", {
            get: function () {
                return this._ht.length;
            },
            enumerable: true,
            configurable: true
        });
        XamlObjectCollection.prototype.GetValueAt = function (index) {
            return this._ht[index];
        };
        XamlObjectCollection.prototype.SetValueAt = function (index, value) {
            if(!this.CanAdd(value)) {
                return false;
            }
            if(index < 0 || index >= this._ht.length) {
                return false;
            }
            var removed = this._ht[index];
            var added = value;
            var error = new BError();
            if(this.AddedToCollection(added, error)) {
                this._ht[index] = added;
                this.RemovedFromCollection(removed, true);
                this._RaiseItemReplaced(removed, added, index);
                return true;
            }
            return false;
        };
        XamlObjectCollection.prototype.Add = function (value) {
            var rv = this.Insert(this._ht.length, value);
            return rv ? this._ht.length - 1 : -1;
        };
        XamlObjectCollection.prototype.Insert = function (index, value) {
            if(!this.CanAdd(value)) {
                return false;
            }
            if(index < 0) {
                return false;
            }
            var count = this._ht.length;
            if(index > count) {
                index = count;
            }
            var error = new BError();
            if(this.AddedToCollection(value, error)) {
                this._ht.splice(index, 0, value);
                this._RaiseItemAdded(value, index);
                return true;
            }
            if(error.Message) {
                throw new Exception(error.Message);
            }
            return false;
        };
        XamlObjectCollection.prototype.Remove = function (value) {
            var index = this.IndexOf(value);
            if(index == -1) {
                return false;
            }
            return this.RemoveAt(index);
        };
        XamlObjectCollection.prototype.RemoveAt = function (index) {
            if(index < 0 || index >= this._ht.length) {
                return false;
            }
            var value = this._ht[index];
            this._ht.splice(index, 1);
            this.RemovedFromCollection(value, true);
            this._RaiseItemRemoved(value, index);
            return true;
        };
        XamlObjectCollection.prototype.Clear = function () {
            var old = this._ht;
            this._ht = [];
            var len = old.length;
            for(var i = 0; i < len; i++) {
                this.RemovedFromCollection(old[i], true);
            }
            this._RaiseCleared();
            return true;
        };
        XamlObjectCollection.prototype.IndexOf = function (value) {
            var count = this._ht.length;
            for(var i = 0; i < count; i++) {
                if(Nullstone.Equals(value, this._ht[i])) {
                    return i;
                }
            }
            return -1;
        };
        XamlObjectCollection.prototype.Contains = function (value) {
            return this.IndexOf(value) > -1;
        };
        XamlObjectCollection.prototype.CanAdd = function (value) {
            return true;
        };
        XamlObjectCollection.prototype.AddedToCollection = function (value, error) {
            return value.XamlNode.AttachTo(this.XamlNode, error);
        };
        XamlObjectCollection.prototype.RemovedFromCollection = function (value, isValueSafe) {
            value.XamlNode.Detach();
        };
        XamlObjectCollection.prototype.GetEnumerator = function (reverse) {
            return Fayde.ArrayEx.GetEnumerator(this._ht, reverse);
        };
        XamlObjectCollection.prototype._RaiseItemAdded = function (value, index) {
        };
        XamlObjectCollection.prototype._RaiseItemRemoved = function (value, index) {
        };
        XamlObjectCollection.prototype._RaiseItemReplaced = function (removed, added, index) {
        };
        XamlObjectCollection.prototype._RaiseCleared = function () {
        };
        return XamlObjectCollection;
    })(Fayde.XamlObject);
    Fayde.XamlObjectCollection = XamlObjectCollection;    
})(Fayde || (Fayde = {}));
var Fayde;
(function (Fayde) {
    var ResourceDictionaryCollection = (function (_super) {
        __extends(ResourceDictionaryCollection, _super);
        function ResourceDictionaryCollection() {
            _super.apply(this, arguments);

        }
        ResourceDictionaryCollection.prototype.AddedToCollection = function (value, error) {
            if(!_super.prototype.AddedToCollection.call(this, value, error)) {
                return false;
            }
            return this._AssertNoCycles(value, value.XamlNode.ParentNode, error);
        };
        ResourceDictionaryCollection.prototype._AssertNoCycles = function (subtreeRoot, firstAncestorNode, error) {
            var curNode = firstAncestorNode;
            while(curNode) {
                var rd = curNode.XObject;
                if(rd instanceof ResourceDictionary) {
                    var cycleFound = false;
                    if(rd === subtreeRoot) {
                        cycleFound = true;
                    } else if(rd.Source === subtreeRoot.Source) {
                        cycleFound = true;
                    }
                    if(cycleFound) {
                        error.Message = "Cycle found in resource dictionaries.";
                        error.Number = BError.InvalidOperation;
                        return false;
                    }
                }
                curNode = curNode.ParentNode;
            }
            var enumerator = subtreeRoot.MergedDictionaries.GetEnumerator();
            while(enumerator.MoveNext()) {
                if(!this._AssertNoCycles(enumerator.Current, firstAncestorNode, error)) {
                    return false;
                }
            }
            return true;
        };
        return ResourceDictionaryCollection;
    })(Fayde.XamlObjectCollection);
    Fayde.ResourceDictionaryCollection = ResourceDictionaryCollection;    
    var ResourceDictionary = (function (_super) {
        __extends(ResourceDictionary, _super);
        function ResourceDictionary() {
                _super.call(this);
            this._KeyIndex = [];
            this.Source = "";
            Object.defineProperty(this, "MergedDictionaries", {
                value: new ResourceDictionaryCollection(),
                writable: false
            });
        }
        ResourceDictionary.prototype.ContainsKey = function (key) {
            return this._KeyIndex[key] !== undefined;
        };
        ResourceDictionary.prototype.Get = function (key) {
            var index = this._KeyIndex[key];
            if(index !== undefined) {
                return this.GetValueAt(index);
            }
            return this._GetFromMerged(key);
        };
        ResourceDictionary.prototype.Set = function (key, value) {
            var oldValue;
            if(this.ContainsKey(key)) {
                oldValue = this.Get(key);
                this.Remove(oldValue);
            }
            var index = _super.prototype.Add.call(this, value);
            this._KeyIndex[key] = index;
            this._RaiseItemReplaced(oldValue, value, index);
            return true;
        };
        ResourceDictionary.prototype.Add = function (value) {
            throw new InvalidOperationException("Cannot add to ResourceDictionary. Use Set instead.");
        };
        ResourceDictionary.prototype.Remove = function (value) {
            throw new InvalidOperationException("Cannot remove from ResourceDictionary. Use Set instead.");
        };
        ResourceDictionary.prototype._GetFromMerged = function (key) {
            var merged = this.MergedDictionaries;
            if(!merged) {
                return undefined;
            }
            var enumerator = merged.GetEnumerator();
            var cur;
            while(enumerator.MoveNext()) {
                cur = (enumerator.Current).Get(key);
                if(cur !== undefined) {
                    return cur;
                }
            }
            return undefined;
        };
        return ResourceDictionary;
    })(Fayde.XamlObjectCollection);
    Fayde.ResourceDictionary = ResourceDictionary;    
})(Fayde || (Fayde = {}));
var Fayde;
(function (Fayde) {
    var FENode = (function (_super) {
        __extends(FENode, _super);
        function FENode(xobj) {
                _super.call(this, xobj);
            this.IsLoaded = false;
        }
        FENode.prototype.SetSubtreeNode = function (subtreeNode) {
            var error = new BError();
            if(!subtreeNode.AttachTo(this, error)) {
                error.ThrowException();
            }
            this.SubtreeNode = subtreeNode;
        };
        FENode.prototype.SetIsLoaded = function (value) {
            if(this.IsLoaded === value) {
                return;
            }
            this.IsLoaded = value;
            this.OnIsLoadedChanged(value);
        };
        FENode.prototype.OnIsLoadedChanged = function (newIsLoaded) {
            var res = this.XObject.Resources;
            if(!newIsLoaded) {
            }
            var enumerator = this.GetVisualTreeEnumerator();
            while(enumerator.MoveNext()) {
                (enumerator.Current).SetIsLoaded(newIsLoaded);
            }
            if(newIsLoaded) {
            }
        };
        FENode.prototype.OnIsAttachedChanged = function (newIsAttached) {
            if(this.SubtreeNode) {
                this.SubtreeNode.SetIsAttached(newIsAttached);
            }
            _super.prototype.OnIsAttachedChanged.call(this, newIsAttached);
        };
        FENode.prototype.GetVisualTreeEnumerator = function (direction) {
            if(this.SubtreeNode) {
                if(this.SubtreeNode instanceof Fayde.XamlObjectCollection) {
                    return this.SubtreeNode.GetVisualTreeEnumerator();
                }
                return Fayde.ArrayEx.GetEnumerator([
                    this.SubtreeNode
                ]);
            }
        };
        return FENode;
    })(Fayde.UINode);
    Fayde.FENode = FENode;    
    var FrameworkElement = (function (_super) {
        __extends(FrameworkElement, _super);
        function FrameworkElement() {
                _super.call(this);
            Object.defineProperty(this, "Resources", {
                value: new Fayde.ResourceDictionary(),
                writable: false
            });
        }
        FrameworkElement.prototype.CreateNode = function () {
            return new FENode(this);
        };
        FrameworkElement.prototype._ComputeActualSize = function () {
            return new size();
        };
        return FrameworkElement;
    })(Fayde.UIElement);
    Fayde.FrameworkElement = FrameworkElement;    
})(Fayde || (Fayde = {}));
var Fayde;
(function (Fayde) {
    (function (Controls) {
        var Image = (function (_super) {
            __extends(Image, _super);
            function Image() {
                _super.apply(this, arguments);

            }
            return Image;
        })(Fayde.FrameworkElement);
        Controls.Image = Image;        
    })(Fayde.Controls || (Fayde.Controls = {}));
    var Controls = Fayde.Controls;
})(Fayde || (Fayde = {}));
var Fayde;
(function (Fayde) {
    (function (Controls) {
        var MediaElement = (function (_super) {
            __extends(MediaElement, _super);
            function MediaElement() {
                _super.apply(this, arguments);

            }
            return MediaElement;
        })(Fayde.FrameworkElement);
        Controls.MediaElement = MediaElement;        
    })(Fayde.Controls || (Fayde.Controls = {}));
    var Controls = Fayde.Controls;
})(Fayde || (Fayde = {}));
var Fayde;
(function (Fayde) {
    (function (Provider) {
        (function (Inherited) {
            var _InheritedContext = (function () {
                function _InheritedContext() { }
                _InheritedContext.FromSources = function FromSources(foregroundSource, fontFamilySource, fontStretchSource, fontStyleSource, fontWeightSource, fontSizeSource, languageSource, flowDirectionSource, useLayoutRoundingSource, textDecorationsSource) {
                    var ic = new _InheritedContext();
                    ic.ForegroundSource = foregroundSource;
                    ic.FontFamilySource = fontFamilySource;
                    ic.FontStretchSource = fontStretchSource;
                    ic.FontStyleSource = fontStyleSource;
                    ic.FontWeightSource = fontWeightSource;
                    ic.FontSizeSource = fontSizeSource;
                    ic.LanguageSource = languageSource;
                    ic.FlowDirectionSource = flowDirectionSource;
                    ic.UseLayoutRoundingSource = useLayoutRoundingSource;
                    ic.TextDecorationsSource = textDecorationsSource;
                    return ic;
                };
                _InheritedContext.FromObject = function FromObject(dobj, parentContext) {
                    var ic = new _InheritedContext();
                    ic.ForegroundSource = ic.GetLocalSource(dobj, _Inheritable.Foreground);
                    if(!ic.ForegroundSource && parentContext) {
                        ic.ForegroundSource = parentContext.ForegroundSource;
                    }
                    ic.FontFamilySource = ic.GetLocalSource(dobj, _Inheritable.FontFamily);
                    if(!ic.FontFamilySource && parentContext) {
                        ic.FontFamilySource = parentContext.FontFamilySource;
                    }
                    ic.FontStretchSource = ic.GetLocalSource(dobj, _Inheritable.FontStretch);
                    if(!ic.FontStretchSource && parentContext) {
                        ic.FontStretchSource = parentContext.FontStretchSource;
                    }
                    ic.FontStyleSource = ic.GetLocalSource(dobj, _Inheritable.FontStyle);
                    if(!ic.FontStretchSource && parentContext) {
                        ic.FontStretchSource = parentContext.FontStretchSource;
                    }
                    ic.FontWeightSource = ic.GetLocalSource(dobj, _Inheritable.FontWeight);
                    if(!ic.FontWeightSource && parentContext) {
                        ic.FontWeightSource = parentContext.FontWeightSource;
                    }
                    ic.FontSizeSource = ic.GetLocalSource(dobj, _Inheritable.FontSize);
                    if(!ic.FontSizeSource && parentContext) {
                        ic.FontSizeSource = parentContext.FontSizeSource;
                    }
                    ic.LanguageSource = ic.GetLocalSource(dobj, _Inheritable.Language);
                    if(!ic.LanguageSource && parentContext) {
                        ic.LanguageSource = parentContext.LanguageSource;
                    }
                    ic.FlowDirectionSource = ic.GetLocalSource(dobj, _Inheritable.FlowDirection);
                    if(!ic.FlowDirectionSource && parentContext) {
                        ic.FlowDirectionSource = parentContext.FlowDirectionSource;
                    }
                    ic.UseLayoutRoundingSource = ic.GetLocalSource(dobj, _Inheritable.UseLayoutRounding);
                    if(!ic.UseLayoutRoundingSource && parentContext) {
                        ic.UseLayoutRoundingSource = parentContext.UseLayoutRoundingSource;
                    }
                    ic.TextDecorationsSource = ic.GetLocalSource(dobj, _Inheritable.TextDecorations);
                    if(!ic.TextDecorationsSource && parentContext) {
                        ic.TextDecorationsSource = parentContext.TextDecorationsSource;
                    }
                    return ic;
                };
                _InheritedContext.prototype.Compare = function (withContext, props) {
                    var rv = _Inheritable.None;
                    if(props & _Inheritable.Foreground && withContext.ForegroundSource === this.ForegroundSource) {
                        rv |= _Inheritable.Foreground;
                    }
                    if(props & _Inheritable.FontFamily && withContext.FontFamilySource === this.FontFamilySource) {
                        rv |= _Inheritable.FontFamily;
                    }
                    if(props & _Inheritable.FontStretch && withContext.FontStretchSource === this.FontStretchSource) {
                        rv |= _Inheritable.FontStretch;
                    }
                    if(props & _Inheritable.FontStyle && withContext.FontStyleSource === this.FontStyleSource) {
                        rv |= _Inheritable.FontStyle;
                    }
                    if(props & _Inheritable.FontWeight && withContext.FontWeightSource === this.FontWeightSource) {
                        rv |= _Inheritable.FontWeight;
                    }
                    if(props & _Inheritable.FontSize && withContext.FontSizeSource === this.FontSizeSource) {
                        rv |= _Inheritable.FontSize;
                    }
                    if(props & _Inheritable.Language && withContext.LanguageSource === this.LanguageSource) {
                        rv |= _Inheritable.Language;
                    }
                    if(props & _Inheritable.FlowDirection && withContext.FlowDirectionSource === this.FlowDirectionSource) {
                        rv |= _Inheritable.FlowDirection;
                    }
                    if(props & _Inheritable.UseLayoutRounding && withContext.UseLayoutRoundingSource === this.UseLayoutRoundingSource) {
                        rv |= _Inheritable.UseLayoutRounding;
                    }
                    if(props & _Inheritable.TextDecorations && withContext.TextDecorationsSource === this.TextDecorationsSource) {
                        rv |= _Inheritable.TextDecorations;
                    }
                    return rv;
                };
                _InheritedContext.prototype.GetLocalSource = function (dobj, prop) {
                    var propd = getProperty(prop, dobj);
                    if(!propd) {
                        return;
                    }
                    if((dobj._Store._ProviderBitmasks[propd._ID] & ((1 << Provider._PropertyPrecedence.Inherited) - 1)) !== 0) {
                        return dobj;
                    }
                };
                return _InheritedContext;
            })();
            Inherited._InheritedContext = _InheritedContext;            
            function getInheritable(dobj, propd) {
                var inh = propd._Inheritable || 0;
                if(inh && propd.Name === "FlowDirection" && (dobj instanceof Fayde.Controls.Image || dobj instanceof Fayde.Controls.MediaElement)) {
                    inh = 0;
                }
                return inh;
            }
            function getProperty(inheritable, ancestor) {
                var list = DependencyProperty._Inherited[inheritable];
                if(!list) {
                    return;
                }
                var len = list.length;
                if(len > 0 && list[0].Name === "FlowDirection") {
                    if(ancestor instanceof Fayde.Controls.Image || ancestor instanceof Fayde.Controls.MediaElement) {
                        return;
                    }
                }
                for(var i = 0; i < len; i++) {
                    var propd = list[i];
                    if(ancestor instanceof propd.OwnerType) {
                        return propd;
                    }
                }
            }
            function propagateInheritedValue(inheritable, source, newValue) {
                var provider = this._InheritedProvider;
                if(!provider) {
                    return true;
                }
                provider._SetPropertySource(inheritable, source);
                var propd = getProperty(inheritable, this);
                if(!propd) {
                    return false;
                }
                var error = new BError();
                this._ProviderValueChanged(Provider._PropertyPrecedence.Inherited, propd, undefined, newValue, true, false, false, error);
            }
            function getInheritedValueSource(inheritable) {
                var provider = this._InheritedProvider;
                if(provider) {
                    return provider._GetPropertySource(inheritable);
                }
            }
            (function (_Inheritable) {
                _Inheritable._map = [];
                _Inheritable.Foreground = 1 << 0;
                _Inheritable.FontFamily = 1 << 1;
                _Inheritable.FontStretch = 1 << 2;
                _Inheritable.FontStyle = 1 << 3;
                _Inheritable.FontWeight = 1 << 4;
                _Inheritable.FontSize = 1 << 5;
                _Inheritable.Language = 1 << 6;
                _Inheritable.FlowDirection = 1 << 7;
                _Inheritable.UseLayoutRounding = 1 << 8;
                _Inheritable.TextDecorations = 1 << 9;
                _Inheritable.All = 2047;
                _Inheritable.None = 0;
            })(Inherited._Inheritable || (Inherited._Inheritable = {}));
            var _Inheritable = Inherited._Inheritable;
            var InheritedProvider = (function (_super) {
                __extends(InheritedProvider, _super);
                function InheritedProvider() {
                    _super.apply(this, arguments);

                    this._ht = [];
                }
                InheritedProvider.prototype.GetPropertyValue = function (store, propd) {
                    if(!getInheritable(store._Object, propd)) {
                        return undefined;
                    }
                    var inheritable = getInheritable(store._Object, propd);
                    var ancestor = this._GetPropertySource(inheritable);
                    if(!ancestor) {
                        return undefined;
                    }
                    var ancestorPropd = getProperty(inheritable, ancestor);
                    if(!ancestorPropd) {
                        return undefined;
                    }
                    var v = ancestor.GetValue(ancestorPropd);
                    if(v) {
                        return v;
                    }
                    return undefined;
                };
                InheritedProvider.prototype.WalkSubtree = function (rootParent, element, context, props, adding) {
                    var enumerator = element.XamlNode.GetInheritedEnumerator();
                    if(!enumerator) {
                        return;
                    }
                    while(enumerator.MoveNext()) {
                        this.WalkTree(rootParent, enumerator.Current, context, props, adding);
                    }
                };
                InheritedProvider.prototype.WalkTree = function (rootParent, element, context, props, adding) {
                    if(props === _Inheritable.None) {
                        return;
                    }
                    if(adding) {
                        this.MaybePropagateInheritedValue(context.ForegroundSource, _Inheritable.Foreground, props, element);
                        this.MaybePropagateInheritedValue(context.FontFamilySource, _Inheritable.FontFamily, props, element);
                        this.MaybePropagateInheritedValue(context.FontStretchSource, _Inheritable.FontStretch, props, element);
                        this.MaybePropagateInheritedValue(context.FontStyleSource, _Inheritable.FontStyle, props, element);
                        this.MaybePropagateInheritedValue(context.FontWeightSource, _Inheritable.FontWeight, props, element);
                        this.MaybePropagateInheritedValue(context.FontSizeSource, _Inheritable.FontSize, props, element);
                        this.MaybePropagateInheritedValue(context.LanguageSource, _Inheritable.Language, props, element);
                        this.MaybePropagateInheritedValue(context.FlowDirectionSource, _Inheritable.FlowDirection, props, element);
                        this.MaybePropagateInheritedValue(context.UseLayoutRoundingSource, _Inheritable.UseLayoutRounding, props, element);
                        this.MaybePropagateInheritedValue(context.TextDecorationsSource, _Inheritable.TextDecorations, props, element);
                        var eleContext = _InheritedContext.FromObject(element, context);
                        props = eleContext.Compare(context, props);
                        if(props === _Inheritable.None) {
                            return;
                        }
                        this.WalkSubtree(rootParent, element, eleContext, props, adding);
                    } else {
                        var eleContext2 = _InheritedContext.FromObject(element, context);
                        this.MaybeRemoveInheritedValue(context.ForegroundSource, _Inheritable.Foreground, props, element);
                        this.MaybeRemoveInheritedValue(context.FontFamilySource, _Inheritable.FontFamily, props, element);
                        this.MaybeRemoveInheritedValue(context.FontStretchSource, _Inheritable.FontStretch, props, element);
                        this.MaybeRemoveInheritedValue(context.FontStyleSource, _Inheritable.FontStyle, props, element);
                        this.MaybeRemoveInheritedValue(context.FontWeightSource, _Inheritable.FontWeight, props, element);
                        this.MaybeRemoveInheritedValue(context.FontSizeSource, _Inheritable.FontSize, props, element);
                        this.MaybeRemoveInheritedValue(context.LanguageSource, _Inheritable.Language, props, element);
                        this.MaybeRemoveInheritedValue(context.FlowDirectionSource, _Inheritable.FlowDirection, props, element);
                        this.MaybeRemoveInheritedValue(context.UseLayoutRoundingSource, _Inheritable.UseLayoutRounding, props, element);
                        this.MaybeRemoveInheritedValue(context.TextDecorationsSource, _Inheritable.TextDecorations, props, element);
                        props = eleContext2.Compare(context, props);
                        if(props === _Inheritable.None) {
                            return;
                        }
                        this.WalkSubtree(rootParent, element, context, props, adding);
                    }
                };
                InheritedProvider.prototype.MaybePropagateInheritedValue = function (source, prop, props, element) {
                    if(!source) {
                        return;
                    }
                    if((props & prop) == 0) {
                        return;
                    }
                    var sourceProperty = getProperty(prop, source);
                    var value = source.GetValue(sourceProperty);
                    if(value) {
                        propagateInheritedValue.call(element._Store, prop, source, value);
                    }
                };
                InheritedProvider.prototype.MaybeRemoveInheritedValue = function (source, prop, props, element) {
                    if(!source) {
                        return;
                    }
                    if((props & prop) == 0) {
                        return;
                    }
                    if(source === getInheritedValueSource.call(element, prop)) {
                        propagateInheritedValue.call(element._Store, prop, undefined, undefined);
                    }
                };
                InheritedProvider.prototype.PropagateInheritedPropertiesOnAddingToTree = function (store, subtree) {
                    var inhEnum = _Inheritable;
                    var baseContext = _InheritedContext.FromSources(this._GetPropertySource(inhEnum.Foreground), this._GetPropertySource(inhEnum.FontFamily), this._GetPropertySource(inhEnum.FontStretch), this._GetPropertySource(inhEnum.FontStyle), this._GetPropertySource(inhEnum.FontWeight), this._GetPropertySource(inhEnum.FontSize), this._GetPropertySource(inhEnum.Language), this._GetPropertySource(inhEnum.FlowDirection), this._GetPropertySource(inhEnum.UseLayoutRounding), this._GetPropertySource(inhEnum.TextDecorations));
                    var objContext = _InheritedContext.FromObject(store._Object, baseContext);
                    this.WalkTree(store._Object, subtree, objContext, inhEnum.All, true);
                };
                InheritedProvider.prototype.PropagateInheritedProperty = function (store, propd, source, subtree) {
                    var inheritable = getInheritable(source, propd);
                    if(inheritable === 0) {
                        return;
                    }
                    var objContext = _InheritedContext.FromObject(store._Object, null);
                    this.WalkSubtree(source, subtree, objContext, inheritable, true);
                };
                InheritedProvider.prototype.ClearInheritedPropertiesOnRemovingFromTree = function (store, subtree) {
                    var baseContext = _InheritedContext.FromSources(this._GetPropertySource(_Inheritable.Foreground), this._GetPropertySource(_Inheritable.FontFamily), this._GetPropertySource(_Inheritable.FontStretch), this._GetPropertySource(_Inheritable.FontStyle), this._GetPropertySource(_Inheritable.FontWeight), this._GetPropertySource(_Inheritable.FontSize), this._GetPropertySource(_Inheritable.Language), this._GetPropertySource(_Inheritable.FlowDirection), this._GetPropertySource(_Inheritable.UseLayoutRounding), this._GetPropertySource(_Inheritable.TextDecorations));
                    var objContext = _InheritedContext.FromObject(store._Object, baseContext);
                    this.WalkTree(store._Object, subtree, objContext, _Inheritable.All, false);
                };
                InheritedProvider.prototype._GetPropertySource = function (inheritable) {
                    return this._ht[inheritable];
                };
                InheritedProvider.prototype._SetPropertySource = function (inheritable, source) {
                    if(source) {
                        this._ht[inheritable] = source;
                    } else {
                        this._ht[inheritable] = undefined;
                    }
                };
                return InheritedProvider;
            })(Provider.PropertyProvider);
            Inherited.InheritedProvider = InheritedProvider;            
        })(Provider.Inherited || (Provider.Inherited = {}));
        var Inherited = Provider.Inherited;
    })(Fayde.Provider || (Fayde.Provider = {}));
    var Provider = Fayde.Provider;
})(Fayde || (Fayde = {}));
var Fayde;
(function (Fayde) {
    (function (Controls) {
        var Control = (function (_super) {
            __extends(Control, _super);
            function Control() {
                _super.apply(this, arguments);

            }
            return Control;
        })(Fayde.FrameworkElement);
        Controls.Control = Control;        
    })(Fayde.Controls || (Fayde.Controls = {}));
    var Controls = Fayde.Controls;
})(Fayde || (Fayde = {}));
var Fayde;
(function (Fayde) {
    (function (Provider) {
        (function (_PropertyPrecedence) {
            _PropertyPrecedence._map = [];
            _PropertyPrecedence.IsEnabled = 0;
            _PropertyPrecedence.LocalValue = 1;
            _PropertyPrecedence.DynamicValue = 2;
            _PropertyPrecedence.LocalStyle = 3;
            _PropertyPrecedence.ImplicitStyle = 4;
            _PropertyPrecedence.Inherited = 5;
            _PropertyPrecedence.InheritedDataContext = 6;
            _PropertyPrecedence.DefaultValue = 7;
            _PropertyPrecedence.AutoCreate = 8;
            _PropertyPrecedence.Lowest = 8;
            _PropertyPrecedence.Highest = 0;
            _PropertyPrecedence.Count = 9;
        })(Provider._PropertyPrecedence || (Provider._PropertyPrecedence = {}));
        var _PropertyPrecedence = Provider._PropertyPrecedence;
        (function (_StyleIndex) {
            _StyleIndex._map = [];
            _StyleIndex.VisualTree = 0;
            _StyleIndex.ApplicationResources = 1;
            _StyleIndex.GenericXaml = 2;
            _StyleIndex.Count = 3;
        })(Provider._StyleIndex || (Provider._StyleIndex = {}));
        var _StyleIndex = Provider._StyleIndex;
        (function (_StyleMask) {
            _StyleMask._map = [];
            _StyleMask.None = 0;
            _StyleMask.VisualTree = 1 << _StyleIndex.VisualTree;
            _StyleMask.ApplicationResources = 1 << _StyleIndex.ApplicationResources;
            _StyleMask.GenericXaml = 1 << _StyleIndex.GenericXaml;
            _StyleMask.All = _StyleMask.VisualTree | _StyleMask.ApplicationResources | _StyleMask.GenericXaml;
        })(Provider._StyleMask || (Provider._StyleMask = {}));
        var _StyleMask = Provider._StyleMask;
        var PropertyProvider = (function () {
            function PropertyProvider() { }
            PropertyProvider.prototype.GetPropertyValue = function (store, propd) {
            };
            PropertyProvider.prototype.RecomputePropertyValueOnClear = function (propd, error) {
            };
            PropertyProvider.prototype.RecomputePropertyValueOnLower = function (propd, error) {
            };
            return PropertyProvider;
        })();
        Provider.PropertyProvider = PropertyProvider;        
        var DefaultValueProvider = (function (_super) {
            __extends(DefaultValueProvider, _super);
            function DefaultValueProvider() {
                _super.apply(this, arguments);

            }
            DefaultValueProvider.prototype.GetPropertyValue = function (store, propd) {
                return propd.DefaultValue;
            };
            return DefaultValueProvider;
        })(PropertyProvider);
        Provider.DefaultValueProvider = DefaultValueProvider;        
        var AutoCreateProvider = (function (_super) {
            __extends(AutoCreateProvider, _super);
            function AutoCreateProvider() {
                _super.apply(this, arguments);

                this._ht = [];
            }
            AutoCreateProvider.prototype.GetPropertyValue = function (store, propd) {
                var value = this.ReadLocalValue(propd);
                if(value !== undefined) {
                    return value;
                }
                value = propd._IsAutoCreated ? propd._AutoCreator.GetValue(propd, store._Object) : undefined;
                if(value === undefined) {
                    return undefined;
                }
                this._ht[propd._ID] = value;
                var error = new BError();
                store._ProviderValueChanged(_PropertyPrecedence.AutoCreate, propd, undefined, value, false, true, false, error);
                return value;
            };
            AutoCreateProvider.prototype.ReadLocalValue = function (propd) {
                return this._ht[propd._ID];
            };
            AutoCreateProvider.prototype.RecomputePropertyValueOnClear = function (propd) {
                this._ht[propd._ID] = undefined;
            };
            AutoCreateProvider.prototype.ClearValue = function (propd) {
                this._ht[propd._ID] = undefined;
            };
            return AutoCreateProvider;
        })(PropertyProvider);
        Provider.AutoCreateProvider = AutoCreateProvider;        
        var LocalValueProvider = (function (_super) {
            __extends(LocalValueProvider, _super);
            function LocalValueProvider() {
                _super.apply(this, arguments);

                this._ht = [];
            }
            LocalValueProvider.prototype.GetPropertyValue = function (store, propd) {
                return this._ht[propd._ID];
            };
            LocalValueProvider.prototype.SetValue = function (propd, value) {
                this._ht[propd._ID] = value;
            };
            LocalValueProvider.prototype.ClearValue = function (propd) {
                this._ht[propd._ID] = undefined;
            };
            return LocalValueProvider;
        })(PropertyProvider);
        Provider.LocalValueProvider = LocalValueProvider;        
        var InheritedIsEnabledProvider = (function (_super) {
            __extends(InheritedIsEnabledProvider, _super);
            function InheritedIsEnabledProvider(store) {
                        _super.call(this);
                this._CurrentValue = true;
                this._Store = store;
            }
            InheritedIsEnabledProvider.prototype.GetPropertyValue = function (store, propd) {
                if(propd._ID === Fayde.Controls.Control.IsEnabledProperty._ID) {
                    return this._CurrentValue;
                }
                return undefined;
            };
            InheritedIsEnabledProvider.prototype.SetDataSource = function (source) {
                if(source) {
                    var curNode = source.XamlNode;
                    while(curNode) {
                        if(curNode.XObject instanceof Fayde.Controls.Control) {
                            break;
                        } else if(curNode.XObject instanceof Fayde.FrameworkElement) {
                            curNode = curNode.ParentNode;
                        } else {
                            curNode = null;
                        }
                    }
                    source = (curNode) ? (curNode.XObject) : null;
                }
                if(this._Source !== source) {
                    this._DetachListener(this._Source);
                    this._Source = source;
                    this._AttachListener(source);
                }
                if(!source && (this._Store._Object.XamlNode.IsAttached)) {
                    this.LocalValueChanged();
                }
            };
            InheritedIsEnabledProvider.prototype._AttachListener = function (source) {
                if(!source) {
                    return;
                }
                var matchFunc = function (sender, args) {
                    return this === args.Property;
                };
                (source).PropertyChanged.SubscribeSpecific(this._IsEnabledChanged, this, matchFunc, Fayde.Controls.Control.IsEnabledProperty);
            };
            InheritedIsEnabledProvider.prototype._DetachListener = function (source) {
                if(!source) {
                    return;
                }
                (source).PropertyChanged.Unsubscribe(this._IsEnabledChanged, this, Fayde.Controls.Control.IsEnabledProperty);
            };
            InheritedIsEnabledProvider.prototype._IsEnabledChanged = function (sender, args) {
                this.LocalValueChanged();
            };
            InheritedIsEnabledProvider.prototype.LocalValueChanged = function (propd) {
                if(propd && propd._ID !== Fayde.Controls.Control.IsEnabledProperty._ID) {
                    return false;
                }
                var store = this._Store;
                var localEnabled = store.GetValueSpec(Fayde.Controls.Control.IsEnabledProperty, _PropertyPrecedence.LocalValue);
                var parentEnabled = false;
                var source = this._Source;
                if(source && (store._Object.XamlNode).VisualParentNode) {
                    parentEnabled = source.GetValue(Fayde.Controls.Control.IsEnabledProperty) === true;
                }
                var newValue = localEnabled === true && parentEnabled;
                if(newValue !== this._CurrentValue) {
                    var oldValue = this._CurrentValue;
                    this._CurrentValue = newValue;
                    var error = new BError();
                    store._ProviderValueChanged(_PropertyPrecedence.IsEnabled, Fayde.Controls.Control.IsEnabledProperty, oldValue, newValue, true, false, false, error);
                    return true;
                }
                return false;
            };
            return InheritedIsEnabledProvider;
        })(PropertyProvider);
        Provider.InheritedIsEnabledProvider = InheritedIsEnabledProvider;        
        var InheritedDataContextProvider = (function (_super) {
            __extends(InheritedDataContextProvider, _super);
            function InheritedDataContextProvider(store) {
                        _super.call(this);
                this._Store = store;
            }
            InheritedDataContextProvider.prototype.GetPropertyValue = function (store, propd) {
                var source = this._Source;
                if(!source) {
                    return;
                }
                if(propd._ID !== Fayde.FrameworkElement.DataContextProperty._ID) {
                    return;
                }
                return source._Store.GetValue(Fayde.FrameworkElement.DataContextProperty);
            };
            InheritedDataContextProvider.prototype.SetDataSource = function (source) {
                var oldSource = this._Source;
                if(oldSource === source) {
                    return;
                }
                var oldValue = oldSource ? oldSource._Store.GetValue(Fayde.FrameworkElement.DataContextProperty) : undefined;
                var newValue = source ? source._Store.GetValue(Fayde.FrameworkElement.DataContextProperty) : undefined;
                this._DetachListener(oldSource);
                this._Source = source;
                this._AttachListener(source);
                if(!Nullstone.Equals(oldValue, newValue)) {
                    var error = new BError();
                    this._Store._ProviderValueChanged(_PropertyPrecedence.InheritedDataContext, Fayde.FrameworkElement.DataContextProperty, oldValue, newValue, false, false, false, error);
                }
            };
            InheritedDataContextProvider.prototype._AttachListener = function (source) {
                if(!source) {
                    return;
                }
                var matchFunc = function (sender, args) {
                    return this === args.Property;
                };
                (source).PropertyChanged.SubscribeSpecific(this._SourceDataContextChanged, this, matchFunc, Fayde.FrameworkElement.DataContextProperty);
            };
            InheritedDataContextProvider.prototype._DetachListener = function (source) {
                if(!source) {
                    return;
                }
                (source).PropertyChanged.Unsubscribe(this._SourceDataContextChanged, this, Fayde.FrameworkElement.DataContextProperty);
            };
            InheritedDataContextProvider.prototype._SourceDataContextChanged = function (sender, args) {
                var error = new BError();
                this._Store._ProviderValueChanged(_PropertyPrecedence.InheritedDataContext, Fayde.FrameworkElement.DataContextProperty, args.OldValue, args.NewValue, true, false, false, error);
            };
            InheritedDataContextProvider.prototype.EmitChanged = function () {
                if(this._Source) {
                    var error = new BError();
                    this._Store._ProviderValueChanged(_PropertyPrecedence.InheritedDataContext, Fayde.FrameworkElement.DataContextProperty, undefined, this._Source._Store.GetValue(Fayde.FrameworkElement.DataContextProperty), true, false, false, error);
                }
            };
            return InheritedDataContextProvider;
        })(PropertyProvider);
        Provider.InheritedDataContextProvider = InheritedDataContextProvider;        
        var LocalStyleProvider = (function (_super) {
            __extends(LocalStyleProvider, _super);
            function LocalStyleProvider(store) {
                        _super.call(this);
                this._ht = [];
                this._Store = store;
            }
            LocalStyleProvider.prototype.GetPropertyValue = function (store, propd) {
                return this._ht[propd._ID];
            };
            LocalStyleProvider.prototype.RecomputePropertyValueOnClear = function (propd, error) {
                var oldValue;
                var newValue;
                var walkPropd;
                var walker = Fayde.SingleStyleWalker(this._Style);
                var setter;
                while(setter = walker.Step()) {
                    walkPropd = setter.Property;
                    if(walkPropd._ID !== propd._ID) {
                        continue;
                    }
                    newValue = setter.ConvertedValue;
                    oldValue = this._ht[propd._ID];
                    this._ht[propd._ID] = newValue;
                    this._Store._ProviderValueChanged(_PropertyPrecedence.LocalStyle, propd, oldValue, newValue, true, true, true, error);
                    if(error.Message) {
                        return;
                    }
                }
            };
            LocalStyleProvider.prototype.UpdateStyle = function (style, error) {
                var store = this._Store;
                var oldValue = undefined;
                var newValue = undefined;
                var oldWalker = Fayde.SingleStyleWalker(this._Style);
                var newWalker = Fayde.SingleStyleWalker(style);
                style.Seal();
                var oldSetter = oldWalker.Step();
                var newSetter = newWalker.Step();
                var oldProp;
                var newProp;
                while(oldSetter || newSetter) {
                    if(oldSetter) {
                        oldProp = oldSetter.Property;
                    }
                    if(newSetter) {
                        newProp = newSetter.Property;
                    }
                    if(oldProp && (oldProp < newProp || !newProp)) {
                        oldValue = oldSetter.ConvertedValue;
                        newValue = undefined;
                        this._ht[oldProp._ID] = undefined;
                        store._ProviderValueChanged(_PropertyPrecedence.LocalStyle, oldProp, oldValue, newValue, true, true, false, error);
                        oldSetter = oldWalker.Step();
                    } else if(oldProp === newProp) {
                        oldValue = oldSetter.ConvertedValue;
                        newValue = newSetter.ConvertedValue;
                        this._ht[oldProp._ID] = newValue;
                        store._ProviderValueChanged(_PropertyPrecedence.LocalStyle, oldProp, oldValue, newValue, true, true, false, error);
                        oldSetter = oldWalker.Step();
                        newSetter = newWalker.Step();
                    } else {
                        oldValue = undefined;
                        newValue = newSetter.ConvertedValue;
                        this._ht[newProp._ID] = newValue;
                        store._ProviderValueChanged(_PropertyPrecedence.LocalStyle, newProp, oldValue, newValue, true, true, false, error);
                        newSetter = newWalker.Step();
                    }
                }
                this._Style = style;
            };
            return LocalStyleProvider;
        })(PropertyProvider);
        Provider.LocalStyleProvider = LocalStyleProvider;        
        var ImplicitStyleProvider = (function (_super) {
            __extends(ImplicitStyleProvider, _super);
            function ImplicitStyleProvider(store) {
                        _super.call(this);
                this._ht = [];
                this._Styles = [
                    null, 
                    null, 
                    null
                ];
                this._StyleMask = _StyleMask.None;
                this._Store = store;
            }
            ImplicitStyleProvider.prototype.GetPropertyValue = function (store, propd) {
                return this._ht[propd._ID];
            };
            ImplicitStyleProvider.prototype.RecomputePropertyValueOnClear = function (propd, error) {
                if(!this._Styles) {
                    return;
                }
                var oldValue;
                var newValue;
                var prop;
                var walker = Fayde.MultipleStylesWalker(this._Styles);
                var setter;
                while(setter = walker.Step()) {
                    prop = setter.Property;
                    if(prop._ID !== propd._ID) {
                        continue;
                    }
                    newValue = setter.ConvertedValue;
                    oldValue = this._ht[propd._ID];
                    this._ht[propd._ID] = newValue;
                    this._Store._ProviderValueChanged(_PropertyPrecedence.ImplicitStyle, propd, oldValue, newValue, true, true, true, error);
                    if(error.Message) {
                        return;
                    }
                }
            };
            ImplicitStyleProvider.prototype.SetStyles = function (styleMask, styles, error) {
                if(!styles) {
                    return;
                }
                var newStyles = [
                    null, 
                    null, 
                    null
                ];
                if(this._Styles) {
                    newStyles[_StyleIndex.GenericXaml] = this._Styles[_StyleIndex.GenericXaml];
                    newStyles[_StyleIndex.ApplicationResources] = this._Styles[_StyleIndex.ApplicationResources];
                    newStyles[_StyleIndex.VisualTree] = this._Styles[_StyleIndex.VisualTree];
                }
                if(styleMask & _StyleMask.GenericXaml) {
                    newStyles[_StyleIndex.GenericXaml] = styles[_StyleIndex.GenericXaml];
                }
                if(styleMask & _StyleMask.ApplicationResources) {
                    newStyles[_StyleIndex.ApplicationResources] = styles[_StyleIndex.ApplicationResources];
                }
                if(styleMask & _StyleMask.VisualTree) {
                    newStyles[_StyleIndex.VisualTree] = styles[_StyleIndex.VisualTree];
                }
                this._ApplyStyles(this._StyleMask | styleMask, newStyles, error);
            };
            ImplicitStyleProvider.prototype.ClearStyles = function (styleMask, error) {
                if(!this._Styles) {
                    return;
                }
                var newStyles = this._Styles.slice(0);
                if(styleMask & _StyleMask.GenericXaml) {
                    newStyles[_StyleIndex.GenericXaml] = null;
                }
                if(styleMask & _StyleMask.ApplicationResources) {
                    newStyles[_StyleIndex.ApplicationResources] = null;
                }
                if(styleMask & _StyleMask.VisualTree) {
                    newStyles[_StyleIndex.VisualTree] = null;
                }
                this._ApplyStyles(this._StyleMask & ~styleMask, newStyles, error);
            };
            ImplicitStyleProvider.prototype._ApplyStyles = function (styleMask, styles, error) {
                var isChanged = !this._Styles || styleMask !== this._StyleMask;
                if(!isChanged) {
                    for(var i = 0; i < _StyleIndex.Count; i++) {
                        if(styles[i] !== this._Styles[i]) {
                            isChanged = true;
                            break;
                        }
                    }
                }
                if(!isChanged) {
                    return;
                }
                var oldValue;
                var newValue;
                var oldWalker = Fayde.MultipleStylesWalker(this._Styles);
                var newWalker = Fayde.MultipleStylesWalker(styles);
                var oldSetter = oldWalker.Step();
                var newSetter = newWalker.Step();
                var oldProp;
                var newProp;
                while(oldSetter || newSetter) {
                    if(oldSetter) {
                        oldProp = oldSetter.Property;
                    }
                    if(newSetter) {
                        newProp = newSetter.Property;
                    }
                    if(oldProp && (oldProp < newProp || !newProp)) {
                        oldValue = oldSetter.ConvertedValue;
                        newValue = undefined;
                        this._ht[oldProp._ID] = undefined;
                        this._Store._ProviderValueChanged(_PropertyPrecedence.ImplicitStyle, oldProp, oldValue, newValue, true, true, false, error);
                        oldSetter = oldWalker.Step();
                    } else if(oldProp === newProp) {
                        oldValue = oldSetter.ConvertedValue;
                        newValue = newSetter.ConvertedValue;
                        this._ht[oldProp._ID] = newValue;
                        this._Store._ProviderValueChanged(_PropertyPrecedence.ImplicitStyle, oldProp, oldValue, newValue, true, true, false, error);
                        oldSetter = oldWalker.Step();
                        newSetter = newWalker.Step();
                    } else {
                        oldValue = undefined;
                        newValue = newSetter.ConvertedValue;
                        this._ht[newProp._ID] = newValue;
                        this._Store._ProviderValueChanged(_PropertyPrecedence.ImplicitStyle, newProp, oldValue, newValue, true, true, false, error);
                        newSetter = newWalker.Step();
                    }
                }
                this._Styles = styles;
                this._StyleMask = styleMask;
            };
            return ImplicitStyleProvider;
        })(PropertyProvider);
        Provider.ImplicitStyleProvider = ImplicitStyleProvider;        
        var FrameworkElementDynamicProvider = (function (_super) {
            __extends(FrameworkElementDynamicProvider, _super);
            function FrameworkElementDynamicProvider() {
                _super.apply(this, arguments);

            }
            FrameworkElementDynamicProvider.prototype.GetPropertyValue = function (store, propd) {
                var isWidth = propd._ID !== Fayde.FrameworkElement.ActualWidthProperty._ID;
                var isHeight = propd._ID !== Fayde.FrameworkElement.ActualHeightProperty._ID;
                if(!isWidth && !isHeight) {
                    return undefined;
                }
                var actual = (store._Object)._ComputeActualSize();
                this._ActualWidth = actual.Width;
                this._ActualHeight = actual.Height;
                if(isWidth) {
                    return this._ActualWidth;
                }
                return this._ActualHeight;
            };
            return FrameworkElementDynamicProvider;
        })(PropertyProvider);
        Provider.FrameworkElementDynamicProvider = FrameworkElementDynamicProvider;        
        var ProviderStore = (function () {
            function ProviderStore(dobj) {
                this._Providers = [
                    null, 
                    null, 
                    null, 
                    null, 
                    null, 
                    null, 
                    null, 
                    null, 
                    null
                ];
                this._PropertyChangedListeners = [];
                this._ProviderBitmasks = [];
                this._AnimStorage = [];
                this._Object = dobj;
            }
            ProviderStore.BuildBitmask = function BuildBitmask(propd) {
                var bitmask = (1 << _PropertyPrecedence.Inherited) | (1 << _PropertyPrecedence.DynamicValue);
                if(propd._IsAutoCreated) {
                    bitmask |= (1 << _PropertyPrecedence.AutoCreate);
                }
                if(propd._HasDefaultValue) {
                    bitmask |= (1 << _PropertyPrecedence.DefaultValue);
                }
                return bitmask;
            };
            ProviderStore.prototype.GetValue = function (propd) {
                var startingPrecedence = _PropertyPrecedence.Highest;
                var endingPrecedence = _PropertyPrecedence.Lowest;
                var bitmask = this._ProviderBitmasks[propd._ID] | propd._BitmaskCache;
                for(var i = startingPrecedence; i <= endingPrecedence; i++) {
                    if(!(bitmask & (1 << i))) {
                        continue;
                    }
                    var provider = this._Providers[i];
                    if(!provider) {
                        continue;
                    }
                    var val = provider.GetPropertyValue(this, propd);
                    if(val === undefined) {
                        continue;
                    }
                    return val;
                }
                return undefined;
            };
            ProviderStore.prototype.GetValueSpec = function (propd, startingPrecedence, endingPrecedence) {
                if(startingPrecedence === undefined) {
                    startingPrecedence = _PropertyPrecedence.Highest;
                }
                if(endingPrecedence === undefined) {
                    endingPrecedence = _PropertyPrecedence.Lowest;
                }
                var bitmask = this._ProviderBitmasks[propd._ID] | propd._BitmaskCache;
                for(var i = startingPrecedence; i <= endingPrecedence; i++) {
                    if(!(bitmask & (1 << i))) {
                        continue;
                    }
                    var provider = this._Providers[i];
                    if(!provider) {
                        continue;
                    }
                    var val = provider.GetPropertyValue(this, propd);
                    if(val === undefined) {
                        continue;
                    }
                    return val;
                }
                return undefined;
            };
            ProviderStore.prototype.SetValue = function (propd, value) {
                if(value instanceof Fayde.UnsetValue) {
                    this.ClearValue(propd, true);
                    return;
                }
                if(value && propd.GetTargetType() === String) {
                    if(typeof value !== "string") {
                        value = value.toString();
                    }
                }
                var isValidOut = {
                    IsValid: false
                };
                value = propd.ValidateSetValue(this._Object, value, isValidOut);
                if(!isValidOut) {
                    return;
                }
                var currentValue;
                var equal = false;
                if((currentValue = this.ReadLocalValue(propd)) === undefined) {
                    if(propd._IsAutoCreated) {
                        currentValue = this._AutoCreateProvider.ReadLocalValue(propd);
                    }
                }
                if(currentValue !== undefined && value !== undefined) {
                    equal = !propd._AlwaysChange && Nullstone.Equals(currentValue, value);
                } else {
                    equal = currentValue === undefined && value === undefined;
                }
                if(!equal) {
                    var newValue;
                    this._LocalValueProvider.ClearValue(propd);
                    if(propd._IsAutoCreated) {
                        this._AutoCreateProvider.ClearValue(propd);
                    }
                    newValue = value;
                    if(newValue !== undefined) {
                        this._LocalValueProvider.SetValue(propd, newValue);
                    }
                    var error = new BError();
                    this._ProviderValueChanged(_PropertyPrecedence.LocalValue, propd, currentValue, newValue, true, true, true, error);
                    if(error.Message) {
                        throw new Exception(error.Message);
                    }
                }
            };
            ProviderStore.prototype.ClearValue = function (propd, notifyListeners) {
                if(notifyListeners === undefined) {
                    notifyListeners = true;
                }
                if(this._GetAnimationStorageFor(propd)) {
                    return;
                }
                var oldLocalValue;
                if((oldLocalValue = this.ReadLocalValue(propd)) === undefined) {
                    if(propd._IsAutoCreated) {
                        oldLocalValue = this._AutoCreateProvider.ReadLocalValue(propd);
                    }
                }
                var error = new BError();
                if(oldLocalValue !== undefined) {
                    this._DetachValue(oldLocalValue);
                    this._LocalValueProvider.ClearValue(propd);
                    if(propd._IsAutoCreated) {
                        this._AutoCreateProvider.ClearValue(propd);
                    }
                }
                var count = _PropertyPrecedence.Count;
                for(var i = _PropertyPrecedence.LocalValue + 1; i < count; i++) {
                    var provider = this._Providers[i];
                    if(provider) {
                        provider.RecomputePropertyValueOnClear(propd, error);
                    }
                }
                if(oldLocalValue !== undefined) {
                    this._ProviderValueChanged(_PropertyPrecedence.LocalValue, propd, oldLocalValue, undefined, notifyListeners, true, false, error);
                    if(error.Message) {
                        throw new Exception(error.Message);
                    }
                }
            };
            ProviderStore.prototype.ReadLocalValue = function (propd) {
                var val = this._LocalValueProvider.GetPropertyValue(this, propd);
                if(val === undefined) {
                    return new Fayde.UnsetValue();
                }
                return val;
            };
            ProviderStore.prototype._ProviderValueChanged = function (providerPrecedence, propd, oldProviderValue, newProviderValue, notifyListeners, setParent, mergeNamesOnSetParent, error) {
                delete this._Object._CachedValues[propd._ID];
                var bitmask = this._ProviderBitmasks[propd._ID] | 0;
                if(newProviderValue !== undefined) {
                    bitmask |= 1 << providerPrecedence;
                } else {
                    bitmask &= ~(1 << providerPrecedence);
                }
                this._ProviderBitmasks[propd._ID] = bitmask;
                var higher = (((1 << (providerPrecedence + 1)) - 2) & bitmask) | propd._BitmaskCache;
                var propPrecHighest = _PropertyPrecedence.Highest;
                for(var j = providerPrecedence - 1; j >= propPrecHighest; j--) {
                    if(!(higher & (1 << j))) {
                        continue;
                    }
                    var provider = this._Providers[j];
                    if(!provider) {
                        continue;
                    }
                    if(provider.GetPropertyValue(this, propd) !== undefined) {
                        this._CallRecomputePropertyValueForProviders(propd, providerPrecedence);
                        return;
                    }
                }
                var oldValue;
                var newValue;
                if(oldProviderValue === undefined || newProviderValue === undefined) {
                    var lowerPriorityValue = this.GetValueSpec(propd, providerPrecedence + 1);
                    if(newProviderValue === undefined) {
                        oldValue = oldProviderValue;
                        newValue = lowerPriorityValue;
                    } else if(oldProviderValue === undefined) {
                        oldValue = lowerPriorityValue;
                        newValue = newProviderValue;
                    }
                } else {
                    oldValue = oldProviderValue;
                    newValue = newProviderValue;
                }
                if(oldValue === null && newValue === null) {
                    return;
                }
                if(oldValue === undefined && newValue === undefined) {
                    return;
                }
                if(!propd._AlwaysChange && Nullstone.Equals(oldValue, newValue)) {
                    return;
                }
                var iiep;
                if(providerPrecedence !== _PropertyPrecedence.IsEnabled && (iiep = this._InheritedIsEnabledProvider) && iiep.LocalValueChanged(propd)) {
                    return;
                }
                this._CallRecomputePropertyValueForProviders(propd, providerPrecedence);
                var setsParent = setParent && !propd.IsCustom;
                this._DetachValue(oldValue);
                this._AttachValue(newValue, error);
                if(notifyListeners) {
                    var args = {
                        Property: propd,
                        OldValue: oldValue,
                        NewValue: newValue
                    };
                    try  {
                        this._Object._OnPropertyChanged(args);
                    } catch (err) {
                        error.Message = err.Message;
                    }
                    this._RaisePropertyChanged(args);
                    if(propd && propd._ChangedCallback) {
                        propd._ChangedCallback(this._Object, args);
                    }
                    if(propd._Inheritable > 0 && providerPrecedence !== _PropertyPrecedence.Inherited) {
                        var inheritedProvider = this._InheritedProvider;
                        if(inheritedProvider && ((this._ProviderBitmasks[propd._ID] & ((1 << _PropertyPrecedence.Inherited) - 1)) !== 0)) {
                            inheritedProvider.PropagateInheritedProperty(this, propd, this._Object, this._Object);
                        }
                    }
                }
            };
            ProviderStore.prototype._GetAnimationStorageFor = function (propd) {
                var list = this._AnimStorage[propd._ID];
                if(list && list.length > 0) {
                    return list[list.length - 1];
                }
                return undefined;
            };
            ProviderStore.prototype._CloneAnimationStorage = function (sourceStore) {
                var srcRepo = sourceStore._AnimStorage;
                var thisRepo = this._AnimStorage;
                var list;
                for(var key in srcRepo) {
                    thisRepo[key] = srcRepo[0].slice(0);
                }
            };
            ProviderStore.prototype._AttachAnimationStorage = function (propd, storage) {
                var list = this._AnimStorage[propd._ID];
                if(!list) {
                    this._AnimStorage[propd._ID] = list = [
                        storage
                    ];
                    return undefined;
                }
                var attached = list[list.length - 1];
                if(attached) {
                    attached.Disable();
                }
                list.push(storage);
                return attached;
            };
            ProviderStore.prototype._DetachAnimationStorage = function (propd, storage) {
                var list = this._AnimStorage[propd._ID];
                if(!list) {
                    return;
                }
                var len = list.length;
                if(len < 1) {
                    return;
                }
                var i;
                var cur;
                for(i = len - 1; i >= 0; i++) {
                    cur = list[i];
                    if(cur === storage) {
                        break;
                    }
                }
                if(i === (len - 1)) {
                    list.pop();
                    if(len > 1) {
                        list[len - 2].Enable();
                    }
                } else {
                    list.splice(i, 1);
                    if(i > 0) {
                        list[i - 1].StopValue = storage.StopValue;
                    }
                }
            };
            ProviderStore.prototype._CallRecomputePropertyValueForProviders = function (propd, providerPrecedence) {
                var error = new BError();
                for(var i = 0; i < providerPrecedence; i++) {
                    var provider = this._Providers[i];
                    if(provider) {
                        provider.RecomputePropertyValueOnLower(propd, error);
                    }
                }
            };
            ProviderStore.prototype._SubscribePropertyChanged = function (listener) {
                var l = this._PropertyChangedListeners;
                if(l.indexOf(listener) < 0) {
                    l.push(listener);
                }
            };
            ProviderStore.prototype._UnsubscribePropertyChanged = function (listener) {
                var l = this._PropertyChangedListeners;
                var index = l.indexOf(listener);
                if(index > -1) {
                    l.splice(index, 1);
                }
            };
            ProviderStore.prototype._RaisePropertyChanged = function (args) {
                var l = this._PropertyChangedListeners;
                var len = l.length;
                for(var i = 0; i < len; i++) {
                    l[i].OnPropertyChanged(this._Object, args);
                }
            };
            ProviderStore.prototype._AttachValue = function (value, error) {
                if(!value) {
                    return true;
                }
                if(value instanceof Fayde.DependencyObject) {
                    return (value).XamlNode.AttachTo(this._Object.XamlNode, error);
                } else if(value instanceof Fayde.XamlObject) {
                    return (value).XamlNode.AttachTo(this._Object.XamlNode, error);
                }
            };
            ProviderStore.prototype._DetachValue = function (value) {
                if(!value) {
                    return;
                }
                if(value instanceof Fayde.DependencyObject) {
                    (value).XamlNode.Detach();
                } else if(value instanceof Fayde.XamlObject) {
                    (value).XamlNode.Detach();
                }
            };
            return ProviderStore;
        })();
        Provider.ProviderStore = ProviderStore;        
    })(Fayde.Provider || (Fayde.Provider = {}));
    var Provider = Fayde.Provider;
})(Fayde || (Fayde = {}));
var Fayde;
(function (Fayde) {
    var Expression = (function () {
        function Expression() { }
        Expression.prototype.GetValue = function (propd) {
        };
        Expression.prototype.OnAttached = function (dobj) {
            this.IsAttached = true;
        };
        Expression.prototype.OnDetached = function (dobj) {
            this.IsAttached = false;
        };
        return Expression;
    })();
    Fayde.Expression = Expression;    
})(Fayde || (Fayde = {}));
var Fayde;
(function (Fayde) {
    (function (Data) {
        (function (RelativeSourceMode) {
            RelativeSourceMode._map = [];
            RelativeSourceMode.TemplatedParent = 1;
            RelativeSourceMode.Self = 2;
            RelativeSourceMode.FindAncestor = 3;
        })(Data.RelativeSourceMode || (Data.RelativeSourceMode = {}));
        var RelativeSourceMode = Data.RelativeSourceMode;
        (function (BindingMode) {
            BindingMode._map = [];
            BindingMode.TwoWay = 0;
            BindingMode.OneWay = 1;
            BindingMode.OneTime = 2;
            BindingMode.OneWayToSource = 3;
        })(Data.BindingMode || (Data.BindingMode = {}));
        var BindingMode = Data.BindingMode;
        (function (UpdateSourceTrigger) {
            UpdateSourceTrigger._map = [];
            UpdateSourceTrigger.Default = 0;
            UpdateSourceTrigger.PropertyChanged = 1;
            UpdateSourceTrigger.Explicit = 3;
        })(Data.UpdateSourceTrigger || (Data.UpdateSourceTrigger = {}));
        var UpdateSourceTrigger = Data.UpdateSourceTrigger;
        (function (_PropertyNodeType) {
            _PropertyNodeType._map = [];
            _PropertyNodeType.AttachedProperty = 0;
            _PropertyNodeType.Property = 1;
            _PropertyNodeType.Indexed = 2;
            _PropertyNodeType.None = 3;
        })(Data._PropertyNodeType || (Data._PropertyNodeType = {}));
        var _PropertyNodeType = Data._PropertyNodeType;
    })(Fayde.Data || (Fayde.Data = {}));
    var Data = Fayde.Data;
})(Fayde || (Fayde = {}));
var Fayde;
(function (Fayde) {
    (function (Data) {
        var BindingExpressionBase = (function (_super) {
            __extends(BindingExpressionBase, _super);
            function BindingExpressionBase() {
                _super.apply(this, arguments);

            }
            Object.defineProperty(BindingExpressionBase.prototype, "Binding", {
                get: function () {
                    return this._Binding;
                },
                enumerable: true,
                configurable: true
            });
            BindingExpressionBase.prototype._TryUpdateSourceObject = function (value) {
            };
            return BindingExpressionBase;
        })(Fayde.Expression);
        Data.BindingExpressionBase = BindingExpressionBase;        
    })(Fayde.Data || (Fayde.Data = {}));
    var Data = Fayde.Data;
})(Fayde || (Fayde = {}));
var Fayde;
(function (Fayde) {
    var UnsetValue = (function () {
        function UnsetValue() { }
        return UnsetValue;
    })();
    Fayde.UnsetValue = UnsetValue;    
    var DependencyObject = (function (_super) {
        __extends(DependencyObject, _super);
        function DependencyObject() {
                _super.call(this);
            this._Expressions = [];
            this._CachedValues = [];
            this._Store = new Fayde.Provider.ProviderStore(this);
        }
        DependencyObject.prototype.GetValue = function (propd) {
            if(!propd) {
                throw new ArgumentException("No property specified.");
            }
            return this._Store.GetValue(propd);
        };
        DependencyObject.prototype.SetValue = function (propd, value) {
            if(!propd) {
                throw new ArgumentException("No property specified.");
            }
            if(propd.IsReadOnly) {
                throw new InvalidOperationException("DependencyProperty '" + (propd.OwnerType)._TypeName + "." + propd.Name + "' is read only.");
            }
            this.SetValueInternal(propd, value);
        };
        DependencyObject.prototype.SetValueInternal = function (propd, value) {
            var expression;
            if(value instanceof Fayde.Expression) {
                expression = value;
            }
            if(expression instanceof Fayde.Data.BindingExpressionBase) {
                var binding = (expression).Binding;
                var path = binding.Path.Path;
                if((!path || path === ".") && binding.Mode === Fayde.Data.BindingMode.TwoWay) {
                    throw new ArgumentException("TwoWay bindings require a non-empty Path.");
                }
                binding.Seal();
            }
            var existing = this._Expressions[propd._ID];
            var updateTwoWay = false;
            var addingExpression = false;
            if(expression) {
                if(expression !== existing) {
                    if(expression.IsAttached) {
                        throw new ArgumentException("Cannot attach the same Expression to multiple FrameworkElements");
                    }
                    if(existing) {
                        this._RemoveExpression(propd);
                    }
                    this._AddExpression(propd, expression);
                }
                addingExpression = true;
                value = expression.GetValue(propd);
            } else if(existing) {
                if(existing instanceof Fayde.Data.BindingExpressionBase) {
                    var binding = (existing).Binding;
                    if(binding.Mode === Fayde.Data.BindingMode.TwoWay) {
                        updateTwoWay = !existing.IsUpdating && !propd.IsCustom;
                    } else if(!existing.IsUpdating || binding.Mode === Fayde.Data.BindingMode.OneTime) {
                        this._RemoveExpression(propd);
                    }
                } else if(!existing.IsUpdating) {
                    this._RemoveExpression(propd);
                }
            }
            try  {
                this._Store.SetValue(propd, value);
                if(updateTwoWay) {
                    (existing)._TryUpdateSourceObject(value);
                }
            } catch (err) {
                if(!addingExpression) {
                    throw err;
                }
                this._Store.SetValue(propd, propd.DefaultValue);
                if(updateTwoWay) {
                    (existing)._TryUpdateSourceObject(value);
                }
            }
        };
        DependencyObject.prototype.ClearValue = function (propd) {
            if(!propd) {
                throw new ArgumentException("No dependency property.");
            }
            if(propd.IsReadOnly && !propd.IsCustom) {
                throw new ArgumentException("This property is readonly.");
            }
            this._RemoveExpression(propd);
            this._Store.ClearValue(propd, true);
        };
        DependencyObject.prototype.ReadLocalValue = function (propd) {
            if(!propd) {
                throw new ArgumentException("No property specified.");
            }
            var expr = this._Expressions[propd._ID];
            if(expr) {
                return expr;
            }
            return this._Store.ReadLocalValue(propd);
        };
        DependencyObject.prototype._OnPropertyChanged = function (args) {
        };
        DependencyObject.prototype._AddExpression = function (propd, expr) {
            this._Expressions[propd._ID] = expr;
            expr.OnAttached(this);
        };
        DependencyObject.prototype._RemoveExpression = function (propd) {
            var expr = this._Expressions[propd._ID];
            if(expr) {
                this._Expressions[propd._ID] = undefined;
                expr.OnDetached(this);
            }
        };
        return DependencyObject;
    })(Fayde.XamlObject);
    Fayde.DependencyObject = DependencyObject;    
})(Fayde || (Fayde = {}));
var Fayde;
(function (Fayde) {
    (function (Controls) {
        var TextBlockNode = (function (_super) {
            __extends(TextBlockNode, _super);
            function TextBlockNode() {
                _super.apply(this, arguments);

            }
            TextBlockNode.prototype.GetInheritedWalker = function () {
                var coll = (this.XObject).GetValue(TextBlock.InlinesProperty);
                if(coll) {
                    return (coll).GetEnumerator();
                }
            };
            return TextBlockNode;
        })(Fayde.UINode);
        Controls.TextBlockNode = TextBlockNode;        
        var TextBlock = (function (_super) {
            __extends(TextBlock, _super);
            function TextBlock() {
                _super.apply(this, arguments);

            }
            TextBlock.prototype.CreateNode = function () {
                return new TextBlockNode(this);
            };
            return TextBlock;
        })(Fayde.FrameworkElement);
        Controls.TextBlock = TextBlock;        
    })(Fayde.Controls || (Fayde.Controls = {}));
    var Controls = Fayde.Controls;
})(Fayde || (Fayde = {}));
var Fayde;
(function (Fayde) {
    (function (Controls) {
        (function (Primitives) {
            var PopupNode = (function (_super) {
                __extends(PopupNode, _super);
                function PopupNode() {
                    _super.apply(this, arguments);

                }
                PopupNode.prototype.GetInheritedWalker = function () {
                    var popup = (this.XObject);
                    if(!popup) {
                        return;
                    }
                    var index = -1;
                    return {
                        MoveNext: function () {
                            index++;
                            return index === 0;
                        },
                        Current: popup.Child
                    };
                };
                return PopupNode;
            })(Fayde.UINode);
            Primitives.PopupNode = PopupNode;            
            var Popup = (function (_super) {
                __extends(Popup, _super);
                function Popup() {
                    _super.apply(this, arguments);

                }
                Popup.prototype.CreateNode = function () {
                    return new PopupNode(this);
                };
                return Popup;
            })(Fayde.FrameworkElement);
            Primitives.Popup = Popup;            
        })(Controls.Primitives || (Controls.Primitives = {}));
        var Primitives = Controls.Primitives;
    })(Fayde.Controls || (Fayde.Controls = {}));
    var Controls = Fayde.Controls;
})(Fayde || (Fayde = {}));
test("AttachTo", function () {
    var root = new Fayde.XamlObject();
    root.XamlNode.NameScope = new Fayde.NameScope();
    root.XamlNode.SetIsAttached(true);
    var child = new Fayde.XamlObject();
    child.XamlNode.Name = "CHILD";
    var error = new BError();
    if(!child.XamlNode.AttachTo(root.XamlNode, error)) {
        ok(false, "Error should not happen when attaching child node:" + error.Message);
    }
    strictEqual(child.XamlNode.ParentNode, root.XamlNode, "ParentNode of child needs to be its direct logical parent.");
    strictEqual(child.XamlNode.IsAttached, root.XamlNode.IsAttached, "Child IsAttached should match Parent IsAttached after attaching.");
    var ns = root.XamlNode.FindNameScope();
    var found = ns.FindName("CHILD");
    strictEqual(found, child.XamlNode, "Registered child should be returned from FindNameScope.");
});
var Fayde;
(function (Fayde) {
    var DependencyObjectCollection = (function (_super) {
        __extends(DependencyObjectCollection, _super);
        function DependencyObjectCollection(handleItemChanged) {
                _super.call(this);
            this._HandleItemChanged = handleItemChanged;
        }
        DependencyObjectCollection.prototype.AddedToCollection = function (value, error) {
            _super.prototype.AddedToCollection.call(this, value, error);
            if(this._HandleItemChanged) {
                value._Store._SubscribePropertyChanged(this);
            }
            return true;
        };
        DependencyObjectCollection.prototype.RemovedFromCollection = function (value, isValueSafe) {
            _super.prototype.RemovedFromCollection.call(this, value, isValueSafe);
            if(this._HandleItemChanged) {
                value._Store._UnsubscribePropertyChanged(this);
            }
        };
        DependencyObjectCollection.prototype.OnPropertyChanged = function (sender, args) {
            this._RaiseItemChanged(sender, args.Property, args.OldValue, args.NewValue);
        };
        DependencyObjectCollection.prototype._RaiseItemChanged = function (item, propd, oldValue, newValue) {
        };
        return DependencyObjectCollection;
    })(Fayde.XamlObjectCollection);
    Fayde.DependencyObjectCollection = DependencyObjectCollection;    
})(Fayde || (Fayde = {}));
var Fayde;
(function (Fayde) {
    (function (Controls) {
        function zIndexComparer(uin1, uin2) {
            var zi1 = Fayde.Controls.Panel.GetZIndex(uin1.XObject);
            var zi2 = Fayde.Controls.Panel.GetZIndex(uin2.XObject);
            if(zi1 === zi2) {
                var z1 = Fayde.Controls.Panel.GetZ(uin1.XObject);
                var z2 = Fayde.Controls.Panel.GetZ(uin2.XObject);
                if(isNaN(z1) || isNaN(z2)) {
                    return 0;
                }
                return z1 > z2 ? 1 : (z1 < z2 ? -1 : 0);
            }
            return zi1 - zi2;
        }
        var PanelChildrenNode = (function (_super) {
            __extends(PanelChildrenNode, _super);
            function PanelChildrenNode() {
                _super.apply(this, arguments);

                this._Nodes = [];
                this._ZSorted = [];
            }
            PanelChildrenNode.prototype.ResortByZIndex = function () {
                var zs = this._Nodes.slice(0);
                this._ZSorted = zs;
                if(zs.length > 1) {
                    zs.sort(zIndexComparer);
                }
            };
            PanelChildrenNode.prototype.GetVisualTreeEnumerator = function (direction) {
                switch(direction) {
                    case Fayde.VisualTreeDirection.Logical:
                        return Fayde.ArrayEx.GetEnumerator(this._Nodes);
                    case Fayde.VisualTreeDirection.LogicalReverse:
                        return Fayde.ArrayEx.GetEnumerator(this._Nodes, true);
                    case Fayde.VisualTreeDirection.ZFoward:
                        if(this._ZSorted.length !== this._Nodes.length) {
                            this.ResortByZIndex();
                        }
                        return Fayde.ArrayEx.GetEnumerator(this._ZSorted);
                    case Fayde.VisualTreeDirection.ZReverse:
                        if(this._ZSorted.length !== this._Nodes.length) {
                            this.ResortByZIndex();
                        }
                        return Fayde.ArrayEx.GetEnumerator(this._ZSorted, true);
                }
            };
            return PanelChildrenNode;
        })(Fayde.XamlNode);        
        var PanelChildrenCollection = (function (_super) {
            __extends(PanelChildrenCollection, _super);
            function PanelChildrenCollection() {
                        _super.call(this, false);
            }
            PanelChildrenCollection.prototype.CreateNode = function () {
                return new PanelChildrenNode(this);
            };
            PanelChildrenCollection.prototype._RaiseItemAdded = function (value, index) {
                this.XamlNode.ParentNode._ElementAdded(value);
            };
            PanelChildrenCollection.prototype._RaiseItemRemoved = function (value, index) {
                this.XamlNode.ParentNode._ElementRemoved(value);
            };
            PanelChildrenCollection.prototype._RaiseItemReplaced = function (removed, added, index) {
                var panelNode = this.XamlNode.ParentNode;
                panelNode._ElementRemoved(removed);
                panelNode._ElementAdded(added);
            };
            return PanelChildrenCollection;
        })(Fayde.DependencyObjectCollection);        
        var PanelNode = (function (_super) {
            __extends(PanelNode, _super);
            function PanelNode(xobj) {
                        _super.call(this, xobj);
                var coll = new PanelChildrenCollection();
                Object.defineProperty(xobj, "Children", {
                    value: coll,
                    writable: false
                });
                this.SetSubtreeNode(coll.XamlNode);
            }
            PanelNode.prototype._ElementAdded = function (uie) {
                _super.prototype._ElementAdded.call(this, uie);
                this._InvalidateChildrenZIndices();
            };
            PanelNode.prototype._ElementRemoved = function (uie) {
                _super.prototype._ElementRemoved.call(this, uie);
                this._InvalidateChildrenZIndices();
            };
            PanelNode.prototype._InvalidateChildrenZIndices = function () {
                if(this.IsAttached) {
                }
            };
            return PanelNode;
        })(Fayde.FENode);
        Controls.PanelNode = PanelNode;        
        function zIndexPropertyChanged(dobj, args) {
            (dobj.XamlNode.ParentNode)._InvalidateChildrenZIndices();
        }
        var Panel = (function (_super) {
            __extends(Panel, _super);
            function Panel() {
                _super.apply(this, arguments);

            }
            Panel.BackgroundProperty = DependencyProperty.Register("Background", function () {
                return Fayde.Media.Brush;
            }, Panel);
            Panel.IsItemsHostProperty = DependencyProperty.Register("IsItemHost", function () {
                return Boolean;
            }, Panel, false);
            Panel.ZIndexProperty = DependencyProperty.RegisterAttached("ZIndex", function () {
                return Number;
            }, Panel, 0, zIndexPropertyChanged);
            Panel.ZProperty = DependencyProperty.RegisterAttached("Z", function () {
                return Number;
            }, Panel, NaN);
            Panel.GetZIndex = function GetZIndex(uie) {
                return uie.GetValue(Panel.ZIndexProperty);
            };
            Panel.SetZIndex = function SetZIndex(uie, value) {
                uie.SetValue(Panel.ZIndexProperty, value);
            };
            Panel.GetZ = function GetZ(uie) {
                return uie.GetValue(Panel.ZProperty);
            };
            Panel.SetZ = function SetZ(uie, value) {
                uie.SetValue(Panel.ZProperty, value);
            };
            Panel.prototype.CreateNode = function () {
                return new PanelNode(this);
            };
            return Panel;
        })(Fayde.FrameworkElement);
        Controls.Panel = Panel;        
    })(Fayde.Controls || (Fayde.Controls = {}));
    var Controls = Fayde.Controls;
})(Fayde || (Fayde = {}));
var Clip = (function () {
    function Clip(r) {
        var rounded = rect.roundOut(rect.clone(r));
        this.X = rounded.X;
        this.Y = rounded.Y;
        this.Width = rounded.Width;
        this.Height = rounded.Height;
    }
    Clip._TypeName = "Clip";
    return Clip;
})();
var Point = (function () {
    function Point(x, y) {
        this.X = x == null ? 0 : x;
        this.Y = y == null ? 0 : y;
    }
    Point._TypeName = "Point";
    Point.prototype.toString = function () {
        return "X=" + this.X.toString() + ";Y=" + this.Y.toString();
    };
    Point.prototype.Equals = function (other) {
        return this.X === other.X && this.Y === other.Y;
    };
    Point.Equals = function Equals(p1, p2) {
        if(p1 == null) {
            return p2 == null;
        }
        if(p2 == null) {
            return false;
        }
        return p1.X === p2.X && p1.Y === p2.Y;
    };
    Point.LERP = function LERP(start, end, p) {
        var x = start.X + (end.X - start.X) * p;
        var y = start.Y + (end.Y - start.Y) * p;
        return new Point(x, y);
    };
    return Point;
})();
var TimeSpan = (function () {
    function TimeSpan() {
        this._Ticks = 0;
    }
    TimeSpan._TypeName = "TimeSpan";
    TimeSpan._TicksPerMillisecond = 1;
    TimeSpan._TicksPerSecond = 1000;
    TimeSpan._TicksPerMinute = TimeSpan._TicksPerSecond * 60;
    TimeSpan._TicksPerHour = TimeSpan._TicksPerMinute * 60;
    TimeSpan._TicksPerDay = TimeSpan._TicksPerHour * 24;
    TimeSpan.FromTicks = function FromTicks(ticks) {
        var ts = new TimeSpan();
        ts._Ticks = ticks;
        return ts;
    };
    TimeSpan.FromArgs = function FromArgs(days, hours, minutes, seconds, milliseconds) {
        var ts = new TimeSpan();
        ts._Ticks = (days * TimeSpan._TicksPerDay) + (hours * TimeSpan._TicksPerHour) + (minutes * TimeSpan._TicksPerMinute) + (seconds * TimeSpan._TicksPerSecond) + (milliseconds * TimeSpan._TicksPerMillisecond);
        return ts;
    };
    Object.defineProperty(TimeSpan.prototype, "Days", {
        get: function () {
            return Math.floor(this._Ticks / TimeSpan._TicksPerDay);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimeSpan.prototype, "Hours", {
        get: function () {
            var remTicks = this._Ticks % TimeSpan._TicksPerDay;
            return Math.floor(remTicks / TimeSpan._TicksPerHour);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimeSpan.prototype, "Minutes", {
        get: function () {
            var remTicks = this._Ticks % TimeSpan._TicksPerDay;
            remTicks = remTicks % TimeSpan._TicksPerHour;
            return Math.floor(remTicks / TimeSpan._TicksPerMinute);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimeSpan.prototype, "Seconds", {
        get: function () {
            var remTicks = this._Ticks % TimeSpan._TicksPerDay;
            remTicks = remTicks % TimeSpan._TicksPerHour;
            remTicks = remTicks % TimeSpan._TicksPerMinute;
            return Math.floor(remTicks / TimeSpan._TicksPerSecond);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimeSpan.prototype, "Milliseconds", {
        get: function () {
            var remTicks = this._Ticks % TimeSpan._TicksPerDay;
            remTicks = remTicks % TimeSpan._TicksPerHour;
            remTicks = remTicks % TimeSpan._TicksPerMinute;
            remTicks = remTicks % TimeSpan._TicksPerSecond;
            return Math.floor(remTicks / TimeSpan._TicksPerMillisecond);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimeSpan.prototype, "Ticks", {
        get: function () {
            return this._Ticks;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimeSpan.prototype, "TotalDays", {
        get: function () {
            return this._Ticks / TimeSpan._TicksPerDay;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimeSpan.prototype, "TotalHours", {
        get: function () {
            return this._Ticks / TimeSpan._TicksPerHour;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimeSpan.prototype, "TotalMinutes", {
        get: function () {
            return this._Ticks / TimeSpan._TicksPerMinute;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimeSpan.prototype, "TotalSeconds", {
        get: function () {
            return this._Ticks / TimeSpan._TicksPerSecond;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimeSpan.prototype, "TotalMilliseconds", {
        get: function () {
            return this._Ticks / TimeSpan._TicksPerMillisecond;
        },
        enumerable: true,
        configurable: true
    });
    TimeSpan.prototype.AddTicks = function (ticks) {
        if(ticks == null) {
            return;
        }
        if(isNaN(ticks)) {
            return;
        }
        this._Ticks += ticks;
    };
    TimeSpan.prototype.AddMilliseconds = function (milliseconds) {
        this.AddTicks(milliseconds * TimeSpan._TicksPerMillisecond);
    };
    TimeSpan.prototype.Add = function (ts2) {
        var ts = new TimeSpan();
        ts._Ticks = this._Ticks + ts2._Ticks;
        return ts;
    };
    TimeSpan.prototype.Subtract = function (ts2) {
        var ts = new TimeSpan();
        ts._Ticks = this._Ticks - ts2._Ticks;
        return ts;
    };
    TimeSpan.prototype.Multiply = function (v) {
        var ts = new TimeSpan();
        ts._Ticks = Math.round(this._Ticks * v);
        return ts;
    };
    TimeSpan.prototype.Divide = function (ts2) {
        var ts = new TimeSpan();
        ts._Ticks = this._Ticks / ts2._Ticks;
        return ts;
    };
    TimeSpan.prototype.CompareTo = function (ts2) {
        if(this._Ticks === ts2._Ticks) {
            return 0;
        }
        return (this._Ticks > ts2._Ticks) ? 1 : -1;
    };
    TimeSpan.prototype.IsZero = function () {
        return this._Ticks === 0;
    };
    TimeSpan.prototype.GetJsDelay = function () {
        return this._Ticks * TimeSpan._TicksPerMillisecond;
    };
    return TimeSpan;
})();
var DurationType;
(function (DurationType) {
    DurationType._map = [];
    DurationType.Automatic = 0;
    DurationType.Forever = 1;
    DurationType.TimeSpan = 2;
})(DurationType || (DurationType = {}));
var Duration = (function () {
    function Duration() { }
    Duration._TypeName = "Duration";
    Duration.CreateAutomatic = function CreateAutomatic() {
        var d = new Duration();
        d._Type = DurationType.Automatic;
        return d;
    };
    Duration.CreateForever = function CreateForever() {
        var d = new Duration();
        d._Type = DurationType.Forever;
        return d;
    };
    Duration.CreateTimeSpan = function CreateTimeSpan(ts) {
        var d = new Duration();
        d._Type = DurationType.TimeSpan;
        d._TimeSpan = ts;
        return d;
    };
    Object.defineProperty(Duration.prototype, "Type", {
        get: function () {
            return this._Type;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Duration.prototype, "TimeSpan", {
        get: function () {
            if(this._Type === DurationType.TimeSpan) {
                return this._TimeSpan;
            }
            throw new InvalidOperationException("");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Duration.prototype, "HasTimeSpan", {
        get: function () {
            return this._Type === DurationType.TimeSpan;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Duration.prototype, "IsForever", {
        get: function () {
            return this._Type === DurationType.Forever;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Duration.prototype, "IsAutomatic", {
        get: function () {
            return this._Type === DurationType.Automatic;
        },
        enumerable: true,
        configurable: true
    });
    return Duration;
})();
var KeyTime = (function () {
    function KeyTime() {
        this._IsPaced = false;
        this._IsUniform = false;
        this._TimeSpan = null;
        this._Percent = 0;
    }
    KeyTime._TypeName = "KeyTime";
    KeyTime.CreateUniform = function CreateUniform() {
        var kt = new KeyTime();
        kt._IsUniform = true;
        return kt;
    };
    KeyTime.CreateTimeSpan = function CreateTimeSpan(ts) {
        var kt = new KeyTime();
        kt._TimeSpan = ts;
        return kt;
    };
    Object.defineProperty(KeyTime.prototype, "IsPaced", {
        get: function () {
            return this._IsPaced;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(KeyTime.prototype, "IsUniform", {
        get: function () {
            return this._IsUniform;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(KeyTime.prototype, "HasTimeSpan", {
        get: function () {
            return this._TimeSpan != null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(KeyTime.prototype, "TimeSpan", {
        get: function () {
            return this._TimeSpan;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(KeyTime.prototype, "HasPercent", {
        get: function () {
            return this._Percent != null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(KeyTime.prototype, "Percent", {
        get: function () {
            return this._Percent;
        },
        enumerable: true,
        configurable: true
    });
    return KeyTime;
})();
var FontStyle = {
    Normal: "normal",
    Italic: "italic",
    Oblique: "oblique"
};
var FontStretch = {
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
var FontWeight = {
    Thin: 100,
    ExtraLight: 200,
    Light: 300,
    Normal: 400,
    Medium: 500,
    SemiBold: 600,
    Bold: 700,
    ExtraBold: 800,
    Black: 900,
    ExtraBlack: 950
};
var Font = (function () {
    function Font() {
        this._Family = Font.DEFAULT_FAMILY;
        this._Stretch = Font.DEFAULT_STRETCH;
        this._Style = Font.DEFAULT_STYLE;
        this._Weight = Font.DEFAULT_WEIGHT;
        this._Size = Font.DEFAULT_SIZE;
    }
    Font._TypeName = "Font";
    Font.DEFAULT_FAMILY = "Segoe UI, Lucida Sans Unicode, Verdana";
    Font.DEFAULT_STRETCH = FontStretch.Normal;
    Font.DEFAULT_STYLE = FontStyle.Normal;
    Font.DEFAULT_WEIGHT = FontWeight.Normal;
    Font.DEFAULT_SIZE = 14;
    Object.defineProperty(Font.prototype, "Family", {
        get: function () {
            return this._Family;
        },
        set: function (value) {
            if(this._Family == value) {
                return;
            }
            this._Family = value;
            this._PurgeCache();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Font.prototype, "Stretch", {
        get: function () {
            return this._Stretch;
        },
        set: function (value) {
            if(this._Stretch == value) {
                return;
            }
            this._Stretch = value;
            this._PurgeCache();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Font.prototype, "Style", {
        get: function () {
            return this._Style;
        },
        set: function (value) {
            if(this._Style == value) {
                return;
            }
            this._Style = value;
            this._PurgeCache();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Font.prototype, "Weight", {
        get: function () {
            return this._Weight;
        },
        set: function (value) {
            if(this._Weight == value) {
                return;
            }
            this._Weight = value;
            this._PurgeCache();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Font.prototype, "Size", {
        get: function () {
            return this._Size;
        },
        set: function (value) {
            if(this._Size == value) {
                return;
            }
            this._Size = value;
            this._PurgeCache();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Font.prototype, "IsChanged", {
        get: function () {
            return this._CachedTranslation == null;
        },
        enumerable: true,
        configurable: true
    });
    Font.prototype.GetActualHeight = function () {
        return Font._MeasureHeight(this);
    };
    Font.prototype._Descender = function () {
        return 0.0;
    };
    Font.prototype._Ascender = function () {
        return 0.0;
    };
    Font.prototype._PurgeCache = function () {
        this._CachedHeight = undefined;
        this._CachedTranslation = undefined;
    };
    Font.prototype.ToHtml5Object = function () {
        if(!this._CachedTranslation) {
            this._CachedTranslation = this._BuildTranslation();
        }
        return this._CachedTranslation;
    };
    Font.prototype._BuildTranslation = function () {
        var s = "";
        s += this.Style.toString() + " ";
        s += "normal ";
        s += this.Weight.toString() + " ";
        s += this.Size + "px ";
        s += this.Family.toString();
        return s;
    };
    Font._MeasureHeight = function _MeasureHeight(font) {
        if(font._CachedHeight) {
            return font._CachedHeight;
        }
        var body = document.getElementsByTagName("body")[0];
        var dummy = document.createElement("div");
        var dummyText = document.createTextNode("M");
        dummy.appendChild(dummyText);
        dummy.setAttribute("style", "font: " + font.ToHtml5Object() + ";");
        body.appendChild(dummy);
        var result = dummy.offsetHeight;
        body.removeChild(dummy);
        font._CachedHeight = result;
        return result;
    };
    return Font;
})();
var FontFamily = (function () {
    function FontFamily(FamilyNames) {
        this.FamilyNames = FamilyNames;
    }
    FontFamily._TypeName = "FontFamily";
    FontFamily.prototype.toString = function () {
        return this.FamilyNames;
    };
    return FontFamily;
})();
var Uri = (function () {
    function Uri(originalString) {
        this._OriginalString = originalString;
    }
    Uri._TypeName = "Uri";
    Uri.prototype.GetFragment = function () {
        return "";
    };
    Uri.prototype.toString = function () {
        return this._OriginalString;
    };
    Uri.IsNullOrEmpty = function IsNullOrEmpty(uri) {
        if(uri == null) {
            return true;
        }
        if(uri._OriginalString) {
            return false;
        }
        return true;
    };
    return Uri;
})();
var Fayde;
(function (Fayde) {
    (function (Documents) {
        var TextElementNode = (function (_super) {
            __extends(TextElementNode, _super);
            function TextElementNode() {
                _super.apply(this, arguments);

            }
            TextElementNode.prototype.GetInheritedEnumerator = function () {
                var coll = this.XObject.GetValue(this.InheritedWalkProperty);
                if(coll) {
                    return (coll).GetEnumerator();
                }
            };
            return TextElementNode;
        })(Fayde.XamlNode);
        Documents.TextElementNode = TextElementNode;        
        var TextElement = (function (_super) {
            __extends(TextElement, _super);
            function TextElement() {
                _super.apply(this, arguments);

            }
            TextElement.prototype.CreateNode = function () {
                return new TextElementNode(this);
            };
            return TextElement;
        })(Fayde.DependencyObject);
        Documents.TextElement = TextElement;        
    })(Fayde.Documents || (Fayde.Documents = {}));
    var Documents = Fayde.Documents;
})(Fayde || (Fayde = {}));
var Fayde;
(function (Fayde) {
    (function (Documents) {
        var Inline = (function (_super) {
            __extends(Inline, _super);
            function Inline() {
                _super.apply(this, arguments);

            }
            return Inline;
        })(Documents.TextElement);
        Documents.Inline = Inline;        
    })(Fayde.Documents || (Fayde.Documents = {}));
    var Documents = Fayde.Documents;
})(Fayde || (Fayde = {}));
var Fayde;
(function (Fayde) {
    (function (Documents) {
        var Span = (function (_super) {
            __extends(Span, _super);
            function Span() {
                _super.apply(this, arguments);

            }
            Span.prototype.CreateNode = function () {
                var tenode = new Documents.TextElementNode(this);
                tenode.InheritedWalkProperty = Span.InlinesProperty;
                return tenode;
            };
            return Span;
        })(Documents.Inline);
        Documents.Span = Span;        
    })(Fayde.Documents || (Fayde.Documents = {}));
    var Documents = Fayde.Documents;
})(Fayde || (Fayde = {}));
var Fayde;
(function (Fayde) {
    (function (Documents) {
        var Block = (function (_super) {
            __extends(Block, _super);
            function Block() {
                _super.apply(this, arguments);

            }
            return Block;
        })(Documents.TextElement);
        Documents.Block = Block;        
    })(Fayde.Documents || (Fayde.Documents = {}));
    var Documents = Fayde.Documents;
})(Fayde || (Fayde = {}));
var Fayde;
(function (Fayde) {
    (function (Documents) {
        var Paragraph = (function (_super) {
            __extends(Paragraph, _super);
            function Paragraph() {
                _super.apply(this, arguments);

            }
            Paragraph.prototype.CreateNode = function () {
                var tenode = new Documents.TextElementNode(this);
                tenode.InheritedWalkProperty = Paragraph.InlinesProperty;
                return tenode;
            };
            return Paragraph;
        })(Documents.Block);
        Documents.Paragraph = Paragraph;        
    })(Fayde.Documents || (Fayde.Documents = {}));
    var Documents = Fayde.Documents;
})(Fayde || (Fayde = {}));
var Fayde;
(function (Fayde) {
    (function (Documents) {
        var Section = (function (_super) {
            __extends(Section, _super);
            function Section() {
                _super.apply(this, arguments);

            }
            Section.prototype.CreateNode = function () {
                var tenode = new Documents.TextElementNode(this);
                tenode.InheritedWalkProperty = Section.BlocksProperty;
                return tenode;
            };
            return Section;
        })(Documents.TextElement);
        Documents.Section = Section;        
    })(Fayde.Documents || (Fayde.Documents = {}));
    var Documents = Fayde.Documents;
})(Fayde || (Fayde = {}));
