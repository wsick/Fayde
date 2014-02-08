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

class DefaultViewModel extends Fayde.MVVM.ViewModelBase {
    private _interval_id: number;
    MyTeam: FantasyTeam;
    Rounds: Fayde.Collections.ObservableCollection<Round> = new Fayde.Collections.ObservableCollection<Round>();
    DraftSelections: Fayde.Collections.ObservableCollection<DraftSelection> = new Fayde.Collections.ObservableCollection<DraftSelection>();
    Positions: string[] = [];
    FantasyTeams: Array<FantasyTeam> = new Array<FantasyTeam>();
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
        }
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
    FantasyPositions() {
        var positions = ["QB", "RB", "RB", "WR", "WR", "TE", "BE", "BE"];
        var fantasy_positions = new Fayde.Collections.ObservableCollection<FantasyPosition>();
        for (var i = 0; i < positions.length; i++) {
            fantasy_positions.Add(new FantasyPosition(positions[i]));
        }
        return fantasy_positions;
    }
    Load() {
        var ft = ["Victorious Secret", "Somewhere Over Dwayne Bowe", "The Blair Walsh Project", "Forgetting Brandon Marshall", "Show Me Your TDs",
            "Boston Tebow Party", "Saved by the Le'Von Bell", "Stafford Infection", "I Pitta the Fool", "Cruz Control"];
        for (var i = 0; i < ft.length; i++) {
            this.FantasyTeams.push(new FantasyTeam(ft[i], this.FantasyPositions()));
        }
        this.MyTeam = this.FantasyTeams[0];

        var _teams: Team[] = [];
        var t = [{ "Abbreviation": "NO", "Logo": "Images/Team Logos/NO.png", "Location": "New Orleans", "Nickname": "Saints", "ByeWeek": 6 },
            { "Abbreviation": "DET", "Logo": "Images/Team Logos/DET.png", "Location": "Detroit", "Nickname": "Lions", "ByeWeek": 5 },
            { "Abbreviation": "TEN", "Logo": "Images/Team Logos/TEN.png", "Location": "Tennessee", "Nickname": "Titans", "ByeWeek": 11 },
            { "Abbreviation": "OAK", "Logo": "Images/Team Logos/OAK.png", "Location": "Oakland", "Nickname": "Raiders", "ByeWeek": 5 },
            { "Abbreviation": "ARI", "Logo": "Images/Team Logos/ARI.png", "Location": "Arizona", "Nickname": "Cardinals", "ByeWeek": 10 },
            { "Abbreviation": "NE", "Logo": "Images/Team Logos/NE.png", "Location": "New England", "Nickname": "Patriots", "ByeWeek": 9 },
            { "Abbreviation": "ATL", "Logo": "Images/Team Logos/ATL.png", "Location": "Atlanta", "Nickname": "Falcons", "ByeWeek": 7 },
            { "Abbreviation": "CHI", "Logo": "Images/Team Logos/CHI.png", "Location": "Chicago", "Nickname": "Bears", "ByeWeek": 6 },
            { "Abbreviation": "HOU", "Logo": "Images/Team Logos/HOU.png", "Location": "Houston", "Nickname": "Texans", "ByeWeek": 8 },
            { "Abbreviation": "CIN", "Logo": "Images/Team Logos/CIN.png", "Location": "Cincinnati", "Nickname": "Bengals", "ByeWeek": 8 },
            { "Abbreviation": "GB", "Logo": "Images/Team Logos/GB.png", "Location": "Green Bay", "Nickname": "Packers", "ByeWeek": 10 },
            { "Abbreviation": "DAL", "Logo": "Images/Team Logos/DAL.png", "Location": "Dallas", "Nickname": "Cowboys", "ByeWeek": 5 },
            { "Abbreviation": "KAN", "Logo": "Images/Team Logos/KC.png", "Location": "Kansas City", "Nickname": "Falcons", "ByeWeek": 7 },
            { "Abbreviation": "NYG", "Logo": "Images/Team Logos/NYG.png", "Location": "New York", "Nickname": "Giants", "ByeWeek": 11 },
            { "Abbreviation": "SD", "Logo": "Images/Team Logos/SD.png", "Location": "San Diego", "Nickname": "Chargers", "ByeWeek": 7 },
            { "Abbreviation": "BUF", "Logo": "Images/Team Logos/BUF.png", "Location": "Buffalo", "Nickname": "Bills", "ByeWeek": 8 },
            { "Abbreviation": "CAR", "Logo": "Images/Team Logos/CAR.png", "Location": "Carolina", "Nickname": "Panthers", "ByeWeek": 6 },
            { "Abbreviation": "PIT", "Logo": "Images/Team Logos/PIT.png", "Location": "Pittsburgh", "Nickname": "Steelers", "ByeWeek": 4 },
            { "Abbreviation": "BAL", "Logo": "Images/Team Logos/BAL.png", "Location": "Baltimore", "Nickname": "Ravens", "ByeWeek": 8 },
            { "Abbreviation": "PHI", "Logo": "Images/Team Logos/PHI.png", "Location": "Philadelphia", "Nickname": "Eagles", "ByeWeek": 7 },
            { "Abbreviation": "CAR", "Logo": "Images/Team Logos/CAR.png", "Location": "Carolina", "Nickname": "Panthers", "ByeWeek": 6 },
            { "Abbreviation": "TB", "Logo": "Images/Team Logos/TB.png", "Location": "Tampa Bay", "Nickname": "Buccaneers", "ByeWeek": 0 },
            { "Abbreviation": "SF", "Logo": "Images/Team Logos/SF.png", "Location": "San Francisco", "Nickname": "49ers", "ByeWeek": 0 },
            { "Abbreviation": "STL", "Logo": "Images/Team Logos/STL.png", "Location": "St Louis", "Nickname": "Rams", "ByeWeek": 0 },
            { "Abbreviation": "SEA", "Logo": "Images/Team Logos/SEA.png", "Location": "Seattle", "Nickname": "Seahawks", "ByeWeek": 0 },
            { "Abbreviation": "CLE", "Logo": "Images/Team Logos/CLE.png", "Location": "Cleveland", "Nickname": "Browns", "ByeWeek": 0 },
            { "Abbreviation": "WAS", "Logo": "Images/Team Logos/WAS.png", "Location": "Washington", "Nickname": "Redskins", "ByeWeek": 0 },
            { "Abbreviation": "MIN", "Logo": "Images/Team Logos/MIN.png", "Location": "Minnesota", "Nickname": "Vikings", "ByeWeek": 0 },
            { "Abbreviation": "NYJ", "Logo": "Images/Team Logos/NYJ.png", "Location": "New York", "Nickname": "Jets", "ByeWeek": 0 },
            { "Abbreviation": "DEN", "Logo": "Images/Team Logos/DEN.png", "Location": "Denver", "Nickname": "Broncos", "ByeWeek": 0 },
            { "Abbreviation": "IND", "Logo": "Images/Team Logos/IND.png", "Location": "Indianapolis", "Nickname": "Colts", "ByeWeek": 0 },
            { "Abbreviation": "JAC", "Logo": "Images/Team Logos/JAC.png", "Location": "Jacksonville", "Nickname": "Jaguars", "ByeWeek": 0 }];
        for (var i = 0; i < t.length; i++) {
            var team = new Team();
            team.Abbreviation = t[i]["Abbreviation"];
            team.ByeWeek = t[i]["ByeWeek"];
            team.Location = t[i]["Location"];
            team.Logo = t[i]["Logo"];
            team.Nickname = t[i]["Nickname"];
            _teams.push(team);
        }

        var overall = 1;
        for (var i = 0; i < 3; i++) {
            var r = new Round();
            r.RoundNumber = i + 1;
            r.DraftSpots = new Fayde.Collections.ObservableCollection<DraftSpot>();
            if (i % 2 == 0) {
                for (var j = 1; j <= 10; j++) {
                    var ds = new DraftSpot();
                    ds.Round = r;
                    ds.Overall = overall;
                    ds.Team = this.FantasyTeams[j - 1];
                    r.DraftSpots.Add(ds);
                    overall++;
                }
            } else {
                for (var j = 10; j >= 1; j--) {
                    var ds = new DraftSpot();
                    ds.Round = r;
                    ds.Overall = overall;
                    ds.Team = this.FantasyTeams[j - 1];
                    r.DraftSpots.Add(ds);
                    overall++;
                }
            }
            this.Rounds.Add(r);
        }

        this.Positions.push("ALL", "QB", "RB", "WR", "RB/WR", "TE");

        var fp = [
            {
                "Name": "Adrian Peterson", "Team": _teams[27], "Headshot": "Images/Player Headshots/adrian_peterson.png", "Positions": "RB", "Birthdate": new Date("1985-03-21"), "Height": "6'1\"", "Weight": "217", "ADP": 1.50,
                "Projected":
                { "Year": 2013, "Team": _teams[27], "GamesPlayed": 16, "RushingAttempts": 351, "RushingYards": 1424, "RushingTouchdowns": 15, "FumblesLost": 2, "Targets": 58, "Receptions": 40, "ReceivingYards": 240, "ReceivingTouchdowns": 2 },
                "Stats":
                [{ "Year": 2007, "Team": _teams[27], "GamesPlayed": 14, "RushingAttempts": 238, "RushingYards": 1341, "RushingTouchdowns": 12, "FumblesLost": 3, "Targets": 29, "Receptions": 19, "ReceivingYards": 268, "ReceivingTouchdowns": 1 },
                    { "Year": 2008, "Team": _teams[27], "GamesPlayed": 16, "RushingAttempts": 363, "RushingYards": 1760, "RushingTouchdowns": 10, "FumblesLost": 4, "Targets": 39, "Receptions": 21, "ReceivingYards": 125, "ReceivingTouchdowns": 0 },
                    { "Year": 2009, "Team": _teams[27], "GamesPlayed": 16, "RushingAttempts": 314, "RushingYards": 1383, "RushingTouchdowns": 18, "FumblesLost": 5, "Targets": 57, "Receptions": 43, "ReceivingYards": 436, "ReceivingTouchdowns": 0 },
                    { "Year": 2010, "Team": _teams[27], "GamesPlayed": 15, "RushingAttempts": 283, "RushingYards": 1298, "RushingTouchdowns": 12, "FumblesLost": 1, "Targets": 50, "Receptions": 36, "ReceivingYards": 341, "ReceivingTouchdowns": 1 },
                    { "Year": 2011, "Team": _teams[27], "GamesPlayed": 12, "RushingAttempts": 208, "RushingYards": 970, "RushingTouchdowns": 12, "FumblesLost": 0, "Targets": 23, "Receptions": 18, "ReceivingYards": 139, "ReceivingTouchdowns": 1 },
                    { "Year": 2012, "Team": _teams[27], "GamesPlayed": 16, "RushingAttempts": 348, "RushingYards": 1266, "RushingTouchdowns": 12, "FumblesLost": 2, "Targets": 51, "Receptions": 40, "ReceivingYards": 217, "ReceivingTouchdowns": 1 }]
            },
            {
                "Name": "Arian Foster", "Team": _teams[8], "Headshot": "Images/Player Headshots/arian_foster.png", "Positions": "RB", "Birthdate": new Date("1986-08-24"), "Height": "6'1\"", "Weight": "228", "ADP": 1.8,
                "Projected":
                { "Year": 2013, "Team": _teams[8], "GamesPlayed": 16, "RushingAttempts": 351, "RushingYards": 1424, "RushingTouchdowns": 15, "FumblesLost": 2, "Targets": 58, "Receptions": 40, "ReceivingYards": 240, "ReceivingTouchdowns": 2 },
                "Stats":
                [{ "Year": 2009, "Team": _teams[8], "GamesPlayed": 6, "RushingAttempts": 54, "RushingYards": 257, "RushingTouchdowns": 3, "FumblesLost": 1, "Targets": 9, "Receptions": 8, "ReceivingYards": 93, "ReceivingTouchdowns": 0 },
                    { "Year": 2010, "Team": _teams[8], "GamesPlayed": 16, "RushingAttempts": 327, "RushingYards": 1616, "RushingTouchdowns": 16, "FumblesLost": 2, "Targets": 84, "Receptions": 66, "ReceivingYards": 604, "ReceivingTouchdowns": 2 },
                    { "Year": 2011, "Team": _teams[8], "GamesPlayed": 13, "RushingAttempts": 278, "RushingYards": 1224, "RushingTouchdowns": 10, "FumblesLost": 3, "Targets": 71, "Receptions": 53, "ReceivingYards": 617, "ReceivingTouchdowns": 2 },
                    { "Year": 2012, "Team": _teams[8], "GamesPlayed": 16, "RushingAttempts": 351, "RushingYards": 1424, "RushingTouchdowns": 15, "FumblesLost": 2, "Targets": 58, "Receptions": 40, "ReceivingYards": 240, "ReceivingTouchdowns": 2 }]
            },
            {
                "Name": "Ray Rice", "Team": _teams[18], "Headshot": "Images/Player Headshots/ray_rice.png", "Positions": "RB", "Birthdate": new Date("1987-01-22"), "Height": "5'8\"", "Weight": "212", "ADP": 3.25,
                "Projected":
                { "Year": 2013, "Team": _teams[18], "GamesPlayed": 16, "RushingAttempts": 351, "RushingYards": 1424, "RushingTouchdowns": 15, "FumblesLost": 2, "Targets": 58, "Receptions": 40, "ReceivingYards": 240, "ReceivingTouchdowns": 2 },
                "Stats":
                [{ "Year": 2008, "Team": _teams[18], "GamesPlayed": 13, "RushingAttempts": 107, "RushingYards": 454, "RushingTouchdowns": 0, "FumblesLost": 1, "Targets": 43, "Receptions": 33, "ReceivingYards": 273, "ReceivingTouchdowns": 0 },
                    { "Year": 2009, "Team": _teams[18], "GamesPlayed": 16, "RushingAttempts": 254, "RushingYards": 1339, "RushingTouchdowns": 7, "FumblesLost": 2, "Targets": 103, "Receptions": 78, "ReceivingYards": 702, "ReceivingTouchdowns": 1 },
                    { "Year": 2010, "Team": _teams[18], "GamesPlayed": 16, "RushingAttempts": 307, "RushingYards": 1220, "RushingTouchdowns": 5, "FumblesLost": 0, "Targets": 82, "Receptions": 63, "ReceivingYards": 556, "ReceivingTouchdowns": 1 },
                    { "Year": 2011, "Team": _teams[18], "GamesPlayed": 16, "RushingAttempts": 291, "RushingYards": 1364, "RushingTouchdowns": 12, "FumblesLost": 2, "Targets": 104, "Receptions": 76, "ReceivingYards": 704, "ReceivingTouchdowns": 3 },
                    { "Year": 2012, "Team": _teams[18], "GamesPlayed": 16, "RushingAttempts": 257, "RushingYards": 1143, "RushingTouchdowns": 9, "FumblesLost": 0, "Targets": 84, "Receptions": 61, "ReceivingYards": 478, "ReceivingTouchdowns": 1 }]
            },
            {
                "Name": "Doug Martin", "Team": _teams[21], "Headshot": "Images/Player Headshots/doug_martin.png", "Positions": "RB", "Birthdate": new Date("1989-01-13"), "Height": "5'9\"", "Weight": "215", "ADP": 28.45,
                "Projected":
                { "Year": 2013, "Team": _teams[21], "GamesPlayed": 16, "RushingAttempts": 351, "RushingYards": 1424, "RushingTouchdowns": 15, "FumblesLost": 2, "Targets": 58, "Receptions": 40, "ReceivingYards": 240, "ReceivingTouchdowns": 2 },
                "Stats":
                [{ "Year": 2012, "Team": _teams[21], "GamesPlayed": 16, "RushingAttempts": 319, "RushingYards": 1454, "RushingTouchdowns": 11, "FumblesLost": 1, "Targets": 71, "Receptions": 49, "ReceivingYards": 472, "ReceivingTouchdowns": 1 }]
            },
            {
                "Name": "Jamaal Charles", "Team": _teams[12], "Headshot": "Images/Player Headshots/jamaal_charles.png", "Positions": "RB", "Birthdate": new Date("1986-12-27"), "Height": "5'11\"", "Weight": "199", "ADP": 28.45,
                "Projected":
                { "Year": 2013, "Team": _teams[12], "GamesPlayed": 16, "RushingAttempts": 351, "RushingYards": 1424, "RushingTouchdowns": 15, "FumblesLost": 2, "Targets": 58, "Receptions": 40, "ReceivingYards": 240, "ReceivingTouchdowns": 2 },
                "Stats":
                [{ "Year": 2008, "Team": _teams[12], "GamesPlayed": 16, "RushingAttempts": 67, "RushingYards": 357, "RushingTouchdowns": 0, "FumblesLost": 1, "Targets": 40, "Receptions": 27, "ReceivingYards": 273, "ReceivingTouchdowns": 1 },
                    { "Year": 2009, "Team": _teams[12], "GamesPlayed": 15, "RushingAttempts": 190, "RushingYards": 1120, "RushingTouchdowns": 7, "FumblesLost": 2, "Targets": 55, "Receptions": 40, "ReceivingYards": 702, "ReceivingTouchdowns": 1 },
                    { "Year": 2010, "Team": _teams[12], "GamesPlayed": 16, "RushingAttempts": 230, "RushingYards": 1467, "RushingTouchdowns": 5, "FumblesLost": 1, "Targets": 66, "Receptions": 45, "ReceivingYards": 556, "ReceivingTouchdowns": 3 },
                    { "Year": 2011, "Team": _teams[12], "GamesPlayed": 2, "RushingAttempts": 12, "RushingYards": 83, "RushingTouchdowns": 0, "FumblesLost": 1, "Targets": 6, "Receptions": 5, "ReceivingYards": 704, "ReceivingTouchdowns": 1 },
                    { "Year": 2012, "Team": _teams[12], "GamesPlayed": 16, "RushingAttempts": 285, "RushingYards": 1509, "RushingTouchdowns": 5, "FumblesLost": 3, "Targets": 48, "Receptions": 35, "ReceivingYards": 478, "ReceivingTouchdowns": 1 }]
            },
            { "Name": "Trent Richardson", "Team": _teams[25], "Headshot": "Images/Player Headshots/trent_richardson.png", "Positions": "RB", "ADP": 28.45 },
            { "Name": "C.J. Spiller", "Team": _teams[15], "Headshot": "Images/Player Headshots/cj_spiller.png", "Positions": "RB", "ADP": 28.45 },
            { "Name": "LeSean McCoy", "Team": _teams[19], "Headshot": "Images/Player Headshots/lesean_mccoy.png", "Positions": "RB", "ADP": 5.11 },
            { "Name": "Aaron Rodgers", "Team": _teams[10], "Headshot": "Images/Player Headshots/aaron_rodgers.png", "Positions": "QB", "ADP": 1.91 },
            { "Name": "Calvin Johnson", "Team": _teams[1], "Headshot": "Images/Player Headshots/calvin_johnson.png", "Positions": "WR", "ADP": 7.86 },
            { "Name": "Marshawn Lynch", "Team": _teams[24], "Headshot": "Images/Player Headshots/marshawn_lynch.png", "Positions": "RB", "ADP": 7.86 },
            { "Name": "Drew Brees", "Team": _teams[0], "Headshot": "Images/Player Headshots/drew_brees.png", "Positions": "QB", "ADP": 6.21 },
            { "Name": "Brandon Marshall", "Team": _teams[7], "Headshot": "Images/Player Headshots/brandon_marshall.png", "Positions": "WR", "ADP": 6.21 },
            { "Name": "Stephen Jackson", "Team": _teams[6], "Headshot": "Images/Player Headshots/stephen_jackson.png", "Positions": "RB", "ADP": 6.21 },
            { "Name": "Dez Bryant", "Team": _teams[11], "Headshot": "Images/Player Headshots/dez_bryant.png", "Positions": "WR", "ADP": 6.21 },
            { "Name": "Darren Sproles", "Team": _teams[0], "Headshot": "Images/Player Headshots/darren_sproles.png", "Positions": "RB", "ADP": 6.21 },
            {
                "Name": "Peyton Manning", "Team": _teams[29], "Headshot": "Images/Player Headshots/peyton_manning.png", "Positions": "QB", "Birthdate": new Date("1976-03-24"), "Height": "6'5\"", "Weight": "230", "ADP": 6.21,
                "Projected":
                { "Year": 2013, "Team": _teams[29], "GamesPlayed": 16, "RushingAttempts": 32, "RushingYards": -31, "RushingTouchdowns": 1, "FumblesLost": 3, "Completions": 450, "PassingAttempts": 659, "PassingYards": 5477, "PassingTouchdowns": 55, "Interceptions": 10, "Targets": 0, "Receptions": 0, "ReceivingYards": 0, "ReceivingTouchdowns": 0 },
                "Stats":
                [{ "Year": 1998, "Team": _teams[29], "GamesPlayed": 16, "RushingAttempts": 15, "RushingYards": 62, "RushingTouchdowns": 0, "FumblesLost": 0, "Completions": 326, "PassingAttempts": 575, "PassingYards": 3739, "PassingTouchdowns": 26, "Interceptions": 28, "Targets": 0, "Receptions": 0, "ReceivingYards": 0, "ReceivingTouchdowns": 0 },
                    { "Year": 1999, "Team": _teams[29], "GamesPlayed": 16, "RushingAttempts": 35, "RushingYards": 73, "RushingTouchdowns": 2, "FumblesLost": 2, "Completions": 331, "PassingAttempts": 533, "PassingYards": 4135, "PassingTouchdowns": 26, "Interceptions": 15, "Targets": 0, "Receptions": 0, "ReceivingYards": 0, "ReceivingTouchdowns": 0 },
                    { "Year": 2000, "Team": _teams[29], "GamesPlayed": 16, "RushingAttempts": 37, "RushingYards": 116, "RushingTouchdowns": 1, "FumblesLost": 1, "Completions": 357, "PassingAttempts": 571, "PassingYards": 4413, "PassingTouchdowns": 33, "Interceptions": 15, "Targets": 0, "Receptions": 0, "ReceivingYards": 0, "ReceivingTouchdowns": 0 },
                    { "Year": 2001, "Team": _teams[29], "GamesPlayed": 16, "RushingAttempts": 35, "RushingYards": 157, "RushingTouchdowns": 4, "FumblesLost": 1, "Completions": 343, "PassingAttempts": 547, "PassingYards": 4131, "PassingTouchdowns": 26, "Interceptions": 23, "Targets": 0, "Receptions": 0, "ReceivingYards": 0, "ReceivingTouchdowns": 0 },
                    { "Year": 2002, "Team": _teams[29], "GamesPlayed": 16, "RushingAttempts": 38, "RushingYards": 148, "RushingTouchdowns": 2, "FumblesLost": 0, "Completions": 392, "PassingAttempts": 591, "PassingYards": 4200, "PassingTouchdowns": 27, "Interceptions": 19, "Targets": 0, "Receptions": 0, "ReceivingYards": 0, "ReceivingTouchdowns": 0 },
                    { "Year": 2003, "Team": _teams[29], "GamesPlayed": 16, "RushingAttempts": 28, "RushingYards": 26, "RushingTouchdowns": 0, "FumblesLost": 0, "Completions": 379, "PassingAttempts": 566, "PassingYards": 4267, "PassingTouchdowns": 29, "Interceptions": 10, "Targets": 0, "Receptions": 0, "ReceivingYards": 0, "ReceivingTouchdowns": 0 },
                    { "Year": 2004, "Team": _teams[29], "GamesPlayed": 16, "RushingAttempts": 25, "RushingYards": 38, "RushingTouchdowns": 0, "FumblesLost": 1, "Completions": 336, "PassingAttempts": 497, "PassingYards": 4557, "PassingTouchdowns": 49, "Interceptions": 10, "Targets": 0, "Receptions": 0, "ReceivingYards": 0, "ReceivingTouchdowns": 0 },
                    { "Year": 2005, "Team": _teams[29], "GamesPlayed": 16, "RushingAttempts": 33, "RushingYards": 45, "RushingTouchdowns": 0, "FumblesLost": 1, "Completions": 305, "PassingAttempts": 453, "PassingYards": 3747, "PassingTouchdowns": 28, "Interceptions": 10, "Targets": 0, "Receptions": 0, "ReceivingYards": 0, "ReceivingTouchdowns": 0 },
                    { "Year": 2006, "Team": _teams[29], "GamesPlayed": 16, "RushingAttempts": 23, "RushingYards": 36, "RushingTouchdowns": 4, "FumblesLost": 0, "Completions": 362, "PassingAttempts": 557, "PassingYards": 4397, "PassingTouchdowns": 31, "Interceptions": 9, "Targets": 0, "Receptions": 0, "ReceivingYards": 0, "ReceivingTouchdowns": 0 },
                    { "Year": 2007, "Team": _teams[29], "GamesPlayed": 16, "RushingAttempts": 20, "RushingYards": -5, "RushingTouchdowns": 3, "FumblesLost": 0, "Completions": 337, "PassingAttempts": 515, "PassingYards": 4040, "PassingTouchdowns": 31, "Interceptions": 14, "Targets": 0, "Receptions": 0, "ReceivingYards": 0, "ReceivingTouchdowns": 0 },
                    { "Year": 2008, "Team": _teams[29], "GamesPlayed": 16, "RushingAttempts": 20, "RushingYards": 21, "RushingTouchdowns": 1, "FumblesLost": 0, "Completions": 371, "PassingAttempts": 555, "PassingYards": 4002, "PassingTouchdowns": 27, "Interceptions": 12, "Targets": 0, "Receptions": 0, "ReceivingYards": 0, "ReceivingTouchdowns": 0 },
                    { "Year": 2009, "Team": _teams[29], "GamesPlayed": 16, "RushingAttempts": 19, "RushingYards": -13, "RushingTouchdowns": 0, "FumblesLost": 0, "Completions": 393, "PassingAttempts": 571, "PassingYards": 4500, "PassingTouchdowns": 33, "Interceptions": 16, "Targets": 0, "Receptions": 0, "ReceivingYards": 0, "ReceivingTouchdowns": 0 },
                    { "Year": 2010, "Team": _teams[29], "GamesPlayed": 16, "RushingAttempts": 18, "RushingYards": 18, "RushingTouchdowns": 0, "FumblesLost": 0, "Completions": 450, "PassingAttempts": 679, "PassingYards": 4700, "PassingTouchdowns": 33, "Interceptions": 17, "Targets": 0, "Receptions": 0, "ReceivingYards": 0, "ReceivingTouchdowns": 0 },
                    { "Year": 2012, "Team": _teams[29], "GamesPlayed": 16, "RushingAttempts": 23, "RushingYards": 6, "RushingTouchdowns": 0, "FumblesLost": 0, "Completions": 400, "PassingAttempts": 583, "PassingYards": 4659, "PassingTouchdowns": 37, "Interceptions": 11, "Targets": 0, "Receptions": 0, "ReceivingYards": 0, "ReceivingTouchdowns": 0 }]
            },
            { "Name": "A.J. Green", "Team": _teams[9], "Headshot": "Images/Player Headshots/aj_green.png", "Positions": "WR", "ADP": 26.17 },
            { "Name": "Reggie Bush", "Team": _teams[1], "Headshot": "Images/Player Headshots/reggie_bush.png", "Positions": "RB", "ADP": 26.17 },
            { "Name": "Matt Forte", "Team": _teams[7], "Headshot": "Images/Player Headshots/matt_forte.png", "Positions": "RB", "ADP": 16.71 },
            { "Name": "Tom Brady", "Team": _teams[5], "Headshot": "Images/Player Headshots/tom_brady.png", "Positions": "QB", "ADP": 5.97 },
            { "Name": "Alfred Morris", "Team": _teams[26], "Headshot": "Images/Player Headshots/alfred_morris.png", "Positions": "RB", "ADP": 5.97 },
            { "Name": "Andre Johnson", "Team": _teams[8], "Headshot": "Images/Player Headshots/andre_johnson.png", "Positions": "WR", "ADP": 18.43 },
            { "Name": "Cam Newton", "Team": _teams[20], "Headshot": "Images/Player Headshots/cam_newton.png", "Positions": "QB", "ADP": 9.2 },
            { "Name": "Roddy White", "Team": _teams[6], "Headshot": "Images/Player Headshots/roddy_white.png", "Positions": "WR", "ADP": 22.64 },
            { "Name": "Randall Cobb", "Team": _teams[10], "Headshot": "Images/Player Headshots/randall_cobb.png", "Positions": "WR", "ADP": 22.64 },
            { "Name": "Jimmy Graham", "Team": _teams[0], "Headshot": "Images/Player Headshots/jimmy_graham.png", "Positions": "TE", "ADP": 19.76 },
            { "Name": "Julio Jones", "Team": _teams[6], "Headshot": "Images/Player Headshots/julio_jones.png", "Positions": "WR", "ADP": 19.79 },
            { "Name": "Demaryius Thomas", "Team": _teams[29], "Headshot": "Images/Player Headshots/demaryius_thomas.png", "Positions": "WR", "ADP": 19.79 },
            { "Name": "Darren McFadden", "Team": _teams[3], "Headshot": "Images/Player Headshots/darren_mcfadden.png", "Positions": "RB", "ADP": 13.79 }];
        for (var i = 0; i < fp.length; i++) {
            var fantasyPlayer = new FantasyPlayer();
            fantasyPlayer.Birthdate = fp[i]["Birthdate"];
            fantasyPlayer.Headshot = fp[i]["Headshot"];
            fantasyPlayer.Height = fp[i]["Height"];
            fantasyPlayer.Name = fp[i]["Name"];
            fantasyPlayer.PrimaryPosition = fp[i]["Positions"];
            fantasyPlayer.Team = fp[i]["Team"];
            fantasyPlayer.Weight = fp[i]["Weight"];
            fantasyPlayer.ADP = fp[i]["ADP"];
            if (fp[i]["Projected"]) {
                var projected = new Stats();
                projected.Team = fp[i]["Projected"]["Team"];
                projected.GamesPlayed = fp[i]["Projected"]["GamesPlayed"];
                projected.RushingAttempts = fp[i]["Projected"]["RushingAttempts"];
                projected.RushingYards = fp[i]["Projected"]["RushingYards"];
                projected.RushingTouchdowns = fp[i]["Projected"]["RushingTouchdowns"];
                projected.FumblesLost = fp[i]["Projected"]["FumblesLost"];
                projected.Targets = fp[i]["Projected"]["Targets"];
                projected.Receptions = fp[i]["Projected"]["Receptions"];
                projected.ReceivingYards = fp[i]["Projected"]["ReceivingYards"];
                projected.ReceivingTouchdowns = fp[i]["Projected"]["ReceivingTouchdowns"];
                projected.Completions = fp[i]["Projected"]["Completions"];
                projected.PassingAttempts = fp[i]["Projected"]["PassingAttempts"];
                projected.PassingYards = fp[i]["Projected"]["PassingYards"];
                projected.PassingTouchdowns = fp[i]["Projected"]["PassingTouchdowns"];
                projected.Interceptions = fp[i]["Projected"]["Interceptions"];
                fantasyPlayer.Projected = projected;
            }
            fantasyPlayer.Stats = new Array<Stats>();
            if (fp[i]["Stats"]) {
                for (var j = 0; j < fp[i]["Stats"].length; j++) {
                    var hash = fp[i]["Stats"][j];
                    var s = new Stats();
                    s.Year = hash["Year"];
                    s.Team = hash["Team"];
                    s.GamesPlayed = hash["GamesPlayed"];
                    s.RushingAttempts = hash["RushingAttempts"];
                    s.RushingYards = hash["RushingYards"];
                    s.RushingTouchdowns = hash["RushingTouchdowns"];
                    s.FumblesLost = hash["FumblesLost"];
                    s.Targets = hash["Targets"];
                    s.Receptions = hash["Receptions"];
                    s.ReceivingYards = hash["ReceivingYards"];
                    s.ReceivingTouchdowns = hash["ReceivingTouchdowns"];
                    s.Completions = hash["Completions"];
                    s.PassingAttempts = hash["PassingAttempts"];
                    s.PassingYards = hash["PassingYards"];
                    s.PassingTouchdowns = hash["PassingTouchdowns"];
                    s.Interceptions = hash["Interceptions"];
                    fantasyPlayer.Stats.push(s);
                }
            }
            this.FantasyPlayers.Add(fantasyPlayer);
        }

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
        for (var i = 0; i < team.Roster.Count; i++) {
            var fantasy_position = team.Roster.GetValueAt(i);
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