/// <reference path="../lib/Fayde/Fayde.d.ts" />

import Round = require("Models/Round");
import DraftSpot = require("Models/DraftSpot");
import FantasyTeam = require("Models/FantasyTeam");
import Team = require("Models/Team");
import Stats = require("Models/Stats");
import FantasyPlayer = require("Models/FantasyPlayer");
import DraftSelection = require("Models/DraftSelection");
import ChatMessage = require("Models/ChatMessage");
import FantasyPosition = require("Models/FantasyPosition");
import DemoNflDataProvider = require("Data/DemoNflDataProvider");

class DefaultViewModel extends Fayde.MVVM.ViewModelBase {
    NflDataProvider = new DemoNflDataProvider();
    private _interval_id: number;
    MyTeam: FantasyTeam;
    Rounds: Fayde.Collections.ObservableCollection<Round> = new Fayde.Collections.ObservableCollection<Round>();
    DraftSelections: Fayde.Collections.ObservableCollection<DraftSelection> = new Fayde.Collections.ObservableCollection<DraftSelection>();
    Positions: string[] = [];
    FantasyTeams: FantasyTeam[];
    FantasyPlayers: Fayde.Collections.ObservableCollection<FantasyPlayer> = new Fayde.Collections.ObservableCollection<FantasyPlayer>();
    ChatMessages: Fayde.Collections.ObservableCollection<ChatMessage> = new Fayde.Collections.ObservableCollection<ChatMessage>();
    private _countdown: number;
    get Countdown(): number {
        return this._countdown;
    }
    set Countdown(value: number) {
        this._countdown = value;
        this.OnPropertyChanged("Countdown");
    }
    private _selectedPlayer: FantasyPlayer;
    get SelectedPlayer(): FantasyPlayer { return this._selectedPlayer; }
    set SelectedPlayer(value: FantasyPlayer) {
        if (value != null) {
            this._selectedPlayer = value;
            this.OnPropertyChanged("SelectedPlayer");
            this.OnPropertyChanged("SelectedPlayerQb");
            this.OnPropertyChanged("SelectedPlayerNotQb");
        }
    }
    get SelectedPlayerQb(): boolean {
        return this.SelectedPlayer.PrimaryPosition === "QB";
    }
    get SelectedPlayerNotQb(): boolean {
        return this.SelectedPlayer.PrimaryPosition != "QB";
    }
    private _currentDraftSpot: DraftSpot = null;
    get CurrentDraftSpot(): DraftSpot {
        return this._currentDraftSpot;
    }
    set CurrentDraftSpot(value: DraftSpot) {
        this._currentDraftSpot = value;
        this.OnPropertyChanged("CurrentDraftSpot");
    }
    private _positionFilter: string;
    get PositionFilter(): string {
        return this._positionFilter;
    }
    set PositionFilter(value: string) {
        this._positionFilter = value;
        this.FilterFantasyPlayerVisibility();
        this.OnPropertyChanged("PositionFilter");
    }
    private _showDraftedFilter: boolean = true;
    get ShowDraftedFilter(): boolean {
        return this._showDraftedFilter;
    }
    set ShowDraftedFilter(value: boolean) {
        this._showDraftedFilter = value;
        this.FilterFantasyPlayerVisibility();
        this.OnPropertyChanged("ShowDraftedFilter");
    }
    private _nameFilter: string;
    NameFilterSubmitted(e: Fayde.IEventBindingArgs<Fayde.Input.KeyEventArgs>) {
        var value = e.sender.Text;
        if (value.length > 2) {
            this._nameFilter = value;
            this.FilterFantasyPlayerVisibility();
        }
        else if (this._nameFilter) {
            this._nameFilter = undefined;
            this.FilterFantasyPlayerVisibility();
        }
    }

    ChatSubmitted(e: Fayde.IEventBindingArgs<Fayde.Input.KeyEventArgs>) {
        if (e.args.Key === Fayde.Input.Key.Enter) {
            var message = new ChatMessage();
            message.FantasyTeam = this.MyTeam;
            message.Message = e.parameter.Text;
            this.ChatMessages.Add(message);
            e.parameter.Text = "";
        }
    }
    private _draft_player_command: Fayde.Input.ICommand = null;
    get DraftPlayerCommand(): Fayde.Input.ICommand {
        if (this._draft_player_command === null) {
            this._draft_player_command = new Fayde.MVVM.RelayCommand(
                () => this.DraftPlayer(this.SelectedPlayer),
                () => this.CanDraftPlayer());
        }
        return this._draft_player_command;
    }
    DraftPlayer(player: FantasyPlayer) {
        this.SelectPlayer(this.Rounds.GetValueAt(0).DraftSpots.GetValueAt(0), player);
    }
    CanDraftPlayer() {
        return this.CurrentDraftSpot.Team === this.MyTeam;
    }

    constructor() {
        super();
        this.Load();
    }
    Load() {
        this.FantasyTeams = this.NflDataProvider.FantasyTeams;
        this.MyTeam = this.FantasyTeams[0];
        this.Rounds = this.NflDataProvider.DraftSpots;
        this.Positions = this.NflDataProvider.Positions;
        this.FantasyPlayers = this.NflDataProvider.FantasyPlayers;

        this.Countdown = 10;
        this.CurrentDraftSpot = this.Rounds.GetValueAt(0).DraftSpots.GetValueAt(0);
        this.SelectedPlayer = this.FantasyPlayers.GetValueAt(0);
        this.PositionFilter = "ALL";
        this._interval_id = setInterval(() => this.DraftLoop(), 1000);
    }
    DraftLoop() {
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
    }
    NextAutodraftPlayer(): FantasyPlayer {
        for (var i = 0; i < this.FantasyPlayers.Count; i++) {
            var fp = this.FantasyPlayers.GetValueAt(i);
            if (!fp.FantasyTeam)
                return fp;
        }
    }
    DraftFinished() {
        return this.Rounds.Count == 0 || this.FantasyPlayers.Count == 0;
    }
    SelectPlayer(spot: DraftSpot, player: FantasyPlayer) {
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
    }
    AddDraftSelection(spot: DraftSpot, player: FantasyPlayer) {
        var ds = new DraftSelection();
        ds.DraftSpot = spot;
        ds.FantasyPlayer = player;
        this.DraftSelections.Add(ds);
    }
    UpdateTeamRoster(team: FantasyTeam, player: FantasyPlayer) {
        for (var i = 0; i < team.Roster.length; i++) {
            var fantasy_position = team.Roster[i];
            if ((fantasy_position.Position === "BE" || fantasy_position.Position === player.PrimaryPosition) && fantasy_position.Player === undefined) {
                fantasy_position.Player = player;
                break;
            }
        }
    }
    RemovePlayerAvailability(player: FantasyPlayer, team: FantasyTeam) {
        for (var i = 0; i < this.FantasyPlayers.Count; i++) {
            if (this.FantasyPlayers.GetValueAt(i).Name === player.Name) {
                this.FantasyPlayers.GetValueAt(i).FantasyTeam = team;
                break;
            }
        }
        this.FilterFantasyPlayerVisibility();
    }
    FilterFantasyPlayerVisibility() {
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
    }
}
export = DefaultViewModel;