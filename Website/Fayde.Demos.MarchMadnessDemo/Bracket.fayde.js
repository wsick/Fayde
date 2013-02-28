var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Fayde;
(function (Fayde) {
    (function (Demos) {
        (function (MarchMadnessDemo) {
            (function (BracketDirection) {
                BracketDirection._map = [];
                BracketDirection._map[0] = "Right";
                BracketDirection.Right = 0;
                BracketDirection._map[1] = "Left";
                BracketDirection.Left = 1;
                BracketDirection._map[2] = "Center";
                BracketDirection.Center = 2;
            })(MarchMadnessDemo.BracketDirection || (MarchMadnessDemo.BracketDirection = {}));
            var BracketDirection = MarchMadnessDemo.BracketDirection;
            var Bracket = (function (_super) {
                __extends(Bracket, _super);
                function Bracket() {
                    _super.apply(this, arguments);

                    this._TemplateApplied = false;
                    this._TextHeight = 0;
                }
                Bracket.RoundNumberProperty = DependencyProperty.Register("RoundNumber", function () {
                    return Number;
                }, Bracket, 1);
                Bracket.InitialMarginProperty = DependencyProperty.Register("InitialMargin", function () {
                    return Number;
                }, Bracket, 2.0);
                Bracket.BracketBorderThicknessProperty = DependencyProperty.Register("BracketBorderThickness", function () {
                    return Number;
                }, Bracket, 1.0, function (d, args) {
                    (d).BracketBorderThicknessChanged(args);
                });
                Bracket.prototype.BracketBorderThicknessChanged = function (args) {
                    this.UpdateBorder();
                    this.Update();
                };
                Bracket.DirectionProperty = DependencyProperty.Register("Direction", function () {
                    return new Enum(BracketDirection);
                }, Bracket, BracketDirection.Right, function (d, args) {
                    (d).DirectionChanged(args);
                });
                Bracket.prototype.DirectionChanged = function (args) {
                    this.UpdateBorder();
                };
                Bracket.prototype.OnApplyTemplate = function () {
                    _super.prototype.OnApplyTemplate.call(this);
                    this.BracketBorder = this.FindName("BracketBorder");
                    this.LayoutInner = this.FindName("LayoutInner");
                    this._TemplateApplied = true;
                    this.UpdateBorder();
                    this.Update();
                };
                Bracket.prototype.UpdateBorder = function () {
                    if(!this._TemplateApplied) {
                        return;
                    }
                    var thickness = this.BracketBorderThickness;
                    if(this.Direction === BracketDirection.Right) {
                        this.BracketBorder.BorderThickness = new Thickness(0, thickness, thickness, thickness);
                    } else {
                        this.BracketBorder.BorderThickness = new Thickness(thickness, thickness, 0, thickness);
                    }
                };
                Bracket.prototype.Update = function () {
                    if(!this._TemplateApplied) {
                        return;
                    }
                    this.Height = this.CalculateBracketHeight(this.RoundNumber);
                    var length = new Fayde.Controls.GridLength();
                    length.Value = this.CalculateInnerHeight(this.RoundNumber);
                    length.Type = Fayde.Controls.GridUnitType.Pixel;
                    this.LayoutInner.RowDefinitions[1].Height = length;
                };
                Bracket.prototype.CalculateBracketHeight = function (roundNumber) {
                    if(roundNumber == 0) {
                        throw new Error("Invalid argument: RoundNumber");
                    }
                    if(roundNumber == 1) {
                        return this.InitialMargin * 4 + this._TextHeight * 2 + this.BracketBorderThickness * 2;
                    }
                    return this.CalculateBracketHeight(roundNumber - 1) * 2;
                };
                Bracket.prototype.CalculateInnerHeight = function (roundNumber) {
                    var m = this.InitialMargin;
                    var b = this.BracketBorderThickness;
                    var th = this._TextHeight;
                    switch(roundNumber) {
                        case 1:
                            return m * 2 + b;
                        case 2:
                            return m * 4 + b * 2;
                        case 3:
                            return m * 8 + b * 6 + th * 2;
                        case 4:
                            return m * 16 + b * 18 + th * 4;
                        case 5:
                            return m * 32 + b * 54 + th * 6;
                    }
                    return 0;
                };
                Bracket.prototype.Team_SizeChanged = function (sender, e) {
                    this._TextHeight = (sender).ActualHeight;
                    this.Update();
                };
                Bracket.prototype.Team_MouseLeftButtonUp = function (sender, e) {
                    var fe = sender;
                    var match = this.DataContext;
                    match.SelectedTeam = fe.DataContext;
                };
                return Bracket;
            })(Fayde.Controls.UserControl);
            MarchMadnessDemo.Bracket = Bracket;            
            Nullstone.RegisterType(Bracket, "Bracket", Fayde.Controls.UserControl);
            Nullstone.AutoProperties(Bracket, [
                Bracket.RoundNumberProperty, 
                Bracket.InitialMarginProperty, 
                Bracket.BracketBorderThicknessProperty, 
                Bracket.DirectionProperty
            ]);
        })(Demos.MarchMadnessDemo || (Demos.MarchMadnessDemo = {}));
        var MarchMadnessDemo = Demos.MarchMadnessDemo;
    })(Fayde.Demos || (Fayde.Demos = {}));
    var Demos = Fayde.Demos;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=Bracket.fayde.js.map
