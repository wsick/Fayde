var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Fayde;
(function (Fayde) {
    (function (Demos) {
        (function (MarchMadnessDemo) {
            (function (ViewModels) {
                var BracketViewModel = (function (_super) {
                    __extends(BracketViewModel, _super);
                    function BracketViewModel() {
                        _super.apply(this, arguments);

                        this.AllMatches = [];
                        this.MatchColumns = new Fayde.Collections.ObservableCollection();
                    }
                    BracketViewModel.ROUND_BASES = [
                        0, 
                        32, 
                        48, 
                        56, 
                        60, 
                        62
                    ];
                    BracketViewModel.prototype.Load = function () {
                        this.LoadMatches();
                        this.HookupSelection();
                        this.LoadTeams();
                    };
                    BracketViewModel.prototype.LoadMatches = function () {
                        this.MatchColumns = Enumerable.ToObservable(Enumerable.Range(1, 11).map(function (i) {
                            return new ViewModels.MatchColumn();
                        }));
                        this.AllMatches = this.CreateMatches();
                        var tempMatches = this.AllMatches.slice(0);
                        for(var i = 0; i < 5; i++) {
                            var numMatches = Math.pow(2, 4 - i);
                            var curCol = (this.MatchColumns.GetValueAt(i * 2));
                            curCol.Matches = Enumerable.ToObservable(tempMatches.slice(0, numMatches));
                            tempMatches = tempMatches.slice(numMatches);
                            curCol = (this.MatchColumns.GetValueAt(i * 2 + 1));
                            curCol.Matches = Enumerable.ToObservable(tempMatches.slice(0, numMatches));
                            tempMatches = tempMatches.slice(numMatches);
                        }
                        this.MatchColumns.GetValueAt(10).Matches = Enumerable.ToObservable(tempMatches);
                    };
                    BracketViewModel.prototype.HookupSelection = function () {
                        var matches = this.AllMatches;
                        var len = matches.length;
                        for(var i = 0; i < len; i++) {
                            var match = matches[i];
                            match.PropertyChanged.Subscribe(this.match_PropertyChanged, this);
                        }
                    };
                    BracketViewModel.prototype.LoadTeams = function () {
                        for(var i = 1; i <= 64; i++) {
                            var team = new ViewModels.Team();
                            team.Name = "" , team.Seed = i;
                            this.SetTeamAt(i, team);
                        }
                    };
                    BracketViewModel.prototype.CreateMatches = function () {
                        return Enumerable.Range(1, 63).map(this.CreateMatch, this);
                    };
                    BracketViewModel.prototype.CreateMatch = function (matchNumber) {
                        var match = new ViewModels.Match();
                        match.MatchNumber = matchNumber;
                        match.Round = this.GetRoundFromMatchNumber(matchNumber);
                        return match;
                    };
                    BracketViewModel.prototype.GetRoundFromMatchNumber = function (matchNumber) {
                        var remainder = matchNumber;
                        var round;
                        for(round = 0; round < 5 && remainder > 0; round++) {
                            remainder -= Math.pow(2, 5 - round);
                        }
                        return round;
                    };
                    BracketViewModel.prototype.match_PropertyChanged = function (sender, e) {
                        if(e.PropertyName === "SelectedTeam") {
                            this.AdvanceTeam(sender);
                        }
                    };
                    BracketViewModel.prototype.AdvanceTeam = function (match) {
                        var winnerMatch = this.GetWinnerMatch(match);
                        if(winnerMatch == null) {
                            return;
                        }
                        if(match.MatchNumber % 2 == 1) {
                            if(match.SelectedTeam != winnerMatch.Team1) {
                                winnerMatch.SelectedTeam = null;
                            }
                            winnerMatch.Team1 = match.SelectedTeam;
                        } else {
                            if(match.SelectedTeam != winnerMatch.Team2) {
                                winnerMatch.SelectedTeam = null;
                            }
                            winnerMatch.Team2 = match.SelectedTeam;
                        }
                    };
                    BracketViewModel.prototype.GetWinnerMatch = function (curMatch) {
                        var roundMatchNumber = curMatch.MatchNumber - BracketViewModel.ROUND_BASES[curMatch.Round - 1];
                        var nextRoundMatchNumber = Math.ceil(roundMatchNumber / 2.0);
                        var nextMatchNumber = nextRoundMatchNumber + BracketViewModel.ROUND_BASES[curMatch.Round];
                        return this.AllMatches.filter(function (m) {
                            return m.MatchNumber == nextMatchNumber;
                        }, this)[0];
                    };
                    BracketViewModel.prototype.GetTeamAt = function (position) {
                        return (position % 2 == 1) ? this.GetMatchAt(position).Team1 : this.GetMatchAt(position).Team2;
                    };
                    BracketViewModel.prototype.SetTeamAt = function (position, team) {
                        if(position % 2 == 1) {
                            this.GetMatchAt(position).Team1 = team;
                        } else {
                            this.GetMatchAt(position).Team2 = team;
                        }
                    };
                    BracketViewModel.prototype.GetMatchAt = function (position) {
                        var reqMatchNumber = Math.ceil(position / 2.0);
                        return this.AllMatches.filter(function (m) {
                            return m.MatchNumber == reqMatchNumber;
                        }, this)[0];
                    };
                    return BracketViewModel;
                })(Fayde.MVVM.ViewModelBase);
                ViewModels.BracketViewModel = BracketViewModel;                
                Nullstone.RegisterType(BracketViewModel, "BracketViewModel", Fayde.MVVM.ViewModelBase);
                Nullstone.AutoNotifyProperty(BracketViewModel, "MatchColumns");
                var Enumerable = (function () {
                    function Enumerable() { }
                    Enumerable.Range = function Range(start, count) {
                        var arr = [];
                        for(var i = start; i < start + count; i++) {
                            arr.push(i);
                        }
                        return arr;
                    };
                    Enumerable.ToObservable = function ToObservable(items) {
                        var obs = new Fayde.Collections.ObservableCollection();
                        obs.AddRange(items);
                        return obs;
                    };
                    return Enumerable;
                })();                
            })(MarchMadnessDemo.ViewModels || (MarchMadnessDemo.ViewModels = {}));
            var ViewModels = MarchMadnessDemo.ViewModels;
        })(Demos.MarchMadnessDemo || (Demos.MarchMadnessDemo = {}));
        var MarchMadnessDemo = Demos.MarchMadnessDemo;
    })(Fayde.Demos || (Fayde.Demos = {}));
    var Demos = Fayde.Demos;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=BracketViewModel.js.map
