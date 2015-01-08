var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "Models/DraftSelection", "Models/ChatMessage", "Data/DemoNflDataProvider"], function (require, exports, DraftSelection, ChatMessage, DemoNflDataProvider) {
    var DefaultViewModel = (function (_super) {
        __extends(DefaultViewModel, _super);
        function DefaultViewModel() {
            _super.call(this);
            this.NflDataProvider = new DemoNflDataProvider();
            this.Rounds = new Fayde.Collections.ObservableCollection();
            this.DraftSelections = new Fayde.Collections.ObservableCollection();
            this.Positions = [];
            this.FantasyPlayers = new Fayde.Collections.ObservableCollection();
            this.ChatMessages = new Fayde.Collections.ObservableCollection();
            this._currentDraftSpot = null;
            this._showDraftedFilter = false;
            this._draft_player_command = null;
            this.Load();
        }
        Object.defineProperty(DefaultViewModel.prototype, "Countdown", {
            get: function () {
                return this._countdown;
            },
            set: function (value) {
                this._countdown = value;
                this.OnPropertyChanged("Countdown");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DefaultViewModel.prototype, "SelectedPlayer", {
            get: function () {
                return this._selectedPlayer;
            },
            set: function (value) {
                if (value != null) {
                    this._selectedPlayer = value;
                    this.OnPropertyChanged("SelectedPlayer");
                    this.OnPropertyChanged("SelectedPlayerQb");
                    this.OnPropertyChanged("SelectedPlayerNotQb");
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DefaultViewModel.prototype, "SelectedPlayerQb", {
            get: function () {
                return this.SelectedPlayer.PrimaryPosition === "QB";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DefaultViewModel.prototype, "SelectedPlayerNotQb", {
            get: function () {
                return this.SelectedPlayer.PrimaryPosition != "QB";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DefaultViewModel.prototype, "CurrentDraftSpot", {
            get: function () {
                return this._currentDraftSpot;
            },
            set: function (value) {
                this._currentDraftSpot = value;
                this.OnPropertyChanged("CurrentDraftSpot");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DefaultViewModel.prototype, "PositionFilter", {
            get: function () {
                return this._positionFilter;
            },
            set: function (value) {
                this._positionFilter = value;
                this.FilterFantasyPlayerVisibility();
                this.OnPropertyChanged("PositionFilter");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DefaultViewModel.prototype, "ShowDraftedFilter", {
            get: function () {
                return this._showDraftedFilter;
            },
            set: function (value) {
                this._showDraftedFilter = value;
                this.FilterFantasyPlayerVisibility();
                this.OnPropertyChanged("ShowDraftedFilter");
            },
            enumerable: true,
            configurable: true
        });
        DefaultViewModel.prototype.NameFilterSubmitted = function (e) {
            var value = e.sender.Text;
            if (value.length > 2) {
                this._nameFilter = value;
                this.FilterFantasyPlayerVisibility();
            }
            else if (this._nameFilter) {
                this._nameFilter = undefined;
                this.FilterFantasyPlayerVisibility();
            }
        };
        DefaultViewModel.prototype.ChatSubmitted = function (e) {
            if (e.args.Key === 3 /* Enter */) {
                var message = new ChatMessage();
                message.FantasyTeam = this.MyTeam;
                message.Message = e.parameter.Text;
                this.ChatMessages.Add(message);
                e.parameter.Text = "";
            }
        };
        Object.defineProperty(DefaultViewModel.prototype, "DraftPlayerCommand", {
            get: function () {
                var _this = this;
                if (this._draft_player_command === null) {
                    this._draft_player_command = new Fayde.MVVM.RelayCommand(function () { return _this.DraftPlayer(_this.SelectedPlayer); }, function () { return _this.CanDraftPlayer(); });
                }
                return this._draft_player_command;
            },
            enumerable: true,
            configurable: true
        });
        DefaultViewModel.prototype.DraftPlayer = function (player) {
            this.SelectPlayer(this.Rounds.GetValueAt(0).DraftSpots.GetValueAt(0), player);
        };
        DefaultViewModel.prototype.CanDraftPlayer = function () {
            return this.CurrentDraftSpot.Team === this.MyTeam;
        };
        DefaultViewModel.prototype.Load = function () {
            var _this = this;
            this.FantasyTeams = this.NflDataProvider.FantasyTeams;
            this.MyTeam = this.FantasyTeams[2];
            this.Rounds = this.NflDataProvider.DraftSpots;
            this.Positions = this.NflDataProvider.Positions;
            this.FantasyPlayers = this.NflDataProvider.FantasyPlayers;
            this.Countdown = 10;
            this.CurrentDraftSpot = this.Rounds.GetValueAt(0).DraftSpots.GetValueAt(0);
            this.SelectedPlayer = this.FantasyPlayers.GetValueAt(0);
            this.PositionFilter = "ALL";
            this._interval_id = setInterval(function () { return _this.DraftLoop(); }, 1000);
        };
        DefaultViewModel.prototype.DraftLoop = function () {
            var current = this.Countdown;
            if (current == 0) {
                var spot = this.Rounds.GetValueAt(0).DraftSpots.GetValueAt(0);
                this.SelectPlayer(spot, this.NextAutodraftPlayer());
            }
            else
                this.Countdown = this.Countdown - 1;
            if (this.DraftFinished()) {
                clearInterval(this._interval_id);
            }
        };
        DefaultViewModel.prototype.NextAutodraftPlayer = function () {
            for (var i = 0; i < this.FantasyPlayers.Count; i++) {
                var fp = this.FantasyPlayers.GetValueAt(i);
                if (!fp.FantasyTeam)
                    return fp;
            }
        };
        DefaultViewModel.prototype.DraftFinished = function () {
            return this.Rounds.Count == 0 || this.FantasyPlayers.Count == 0;
        };
        DefaultViewModel.prototype.SelectPlayer = function (spot, player) {
            this.RemovePlayerAvailability(player, spot.Team);
            this.AddDraftSelection(spot, player);
            this.UpdateTeamRoster(spot.Team, player);
            this.Rounds.GetValueAt(0).DraftSpots.RemoveAt(0);
            if (this.Rounds.GetValueAt(0).DraftSpots.Count == 0)
                this.Rounds.RemoveAt(0);
            if (!this.DraftFinished()) {
                this.CurrentDraftSpot = this.Rounds.GetValueAt(0).DraftSpots.GetValueAt(0);
                this.Countdown = 10;
            }
            this._draft_player_command.ForceCanExecuteChanged();
        };
        DefaultViewModel.prototype.AddDraftSelection = function (spot, player) {
            var ds = new DraftSelection();
            ds.DraftSpot = spot;
            ds.FantasyPlayer = player;
            this.DraftSelections.Add(ds);
        };
        DefaultViewModel.prototype.UpdateTeamRoster = function (team, player) {
            for (var i = 0; i < team.Roster.length; i++) {
                var fantasy_position = team.Roster[i];
                if ((fantasy_position.Position === "BE" || fantasy_position.Position === player.PrimaryPosition) && fantasy_position.Player === undefined) {
                    fantasy_position.Player = player;
                    break;
                }
            }
        };
        DefaultViewModel.prototype.RemovePlayerAvailability = function (player, team) {
            for (var i = 0; i < this.FantasyPlayers.Count; i++) {
                if (this.FantasyPlayers.GetValueAt(i).Name === player.Name) {
                    this.FantasyPlayers.GetValueAt(i).FantasyTeam = team;
                    break;
                }
            }
            this.FilterFantasyPlayerVisibility();
        };
        DefaultViewModel.prototype.FilterFantasyPlayerVisibility = function () {
            for (var i = 0; i < this.FantasyPlayers.Count; i++) {
                var fp = this.FantasyPlayers.GetValueAt(i);
                if (!this.ShowDraftedFilter && fp.FantasyTeam) {
                    fp.Visible = false;
                    continue;
                }
                if (this.PositionFilter.toLowerCase() != "all" && this.PositionFilter.indexOf(fp.PrimaryPosition) < 0) {
                    fp.Visible = false;
                    continue;
                }
                if (this._nameFilter && fp.Name.toLowerCase().substring(0, this._nameFilter.length) != this._nameFilter.toLowerCase()) {
                    fp.Visible = false;
                    continue;
                }
                fp.Visible = true;
            }
        };
        return DefaultViewModel;
    })(Fayde.MVVM.ViewModelBase);
    return DefaultViewModel;
});
//# sourceMappingURL=DefaultViewModel.js.map