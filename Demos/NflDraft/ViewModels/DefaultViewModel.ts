/// <reference path="../scripts/Fayde.d.ts" />
/// <reference path="../Models/Round.ts" />
/// <reference path="../Models/DraftSpot.ts" />
/// <reference path="../Models/FantasyTeam.ts" />
/// <reference path="../Models/Team.ts" />
/// <reference path="../Models/Stats.ts" />
/// <reference path="../Models/Player.ts" />
/// <reference path="../Models/FantasyPlayer.ts" />
/// <reference path="../Models/DraftSelection.ts" />
/// <reference path="../Models/ChatMessage.ts" />

module NflDraft.ViewModels {
    export class DefaultViewModel extends Fayde.MVVM.ViewModelBase {
        MyTeam: Models.FantasyTeam;
        Rounds: Fayde.Collections.ObservableCollection<Models.Round> = new Fayde.Collections.ObservableCollection<Models.Round>();
        DraftSelections: Fayde.Collections.ObservableCollection<Models.DraftSelection> = new Fayde.Collections.ObservableCollection<Models.DraftSelection>();
        Positions: string[] = [];
        FantasyTeams: Array<Models.FantasyTeam> = new Array<Models.FantasyTeam>();
        FantasyPlayers: Fayde.Collections.ObservableCollection<Models.FantasyPlayer> = new Fayde.Collections.ObservableCollection<Models.FantasyPlayer>();
        ChatMessages: Fayde.Collections.ObservableCollection<Models.ChatMessage> = new Fayde.Collections.ObservableCollection<Models.ChatMessage>();
        private _countdown: number;
        get Countdown(): number {
            return this._countdown;
        }
        set Countdown(value: number) {
            this._countdown = value;
            this.OnPropertyChanged("Countdown");
        }
        private _selectedPlayer: Models.FantasyPlayer;
        get SelectedPlayer(): Models.FantasyPlayer { return this._selectedPlayer; }
        set SelectedPlayer(value: Models.FantasyPlayer) {
            if (value != null) {
                this._selectedPlayer = value;
                this.OnPropertyChanged("SelectedPlayer");
            }
        }
        private _interval_id: number;

        ChatSubmitted(e: Fayde.IEventBindingArgs<Fayde.Input.KeyEventArgs>) {
            if (e.args.Key === Fayde.Input.Key.Enter) {
                var message = new Models.ChatMessage();
                message.FantasyTeam = this.MyTeam;
                message.Message = e.parameter.Text;
                this.ChatMessages.Add(message);
                e.parameter.Text = "";
            }
        }

        constructor() {
            super();
            this.Load();
        }

        Load() {
            var ft = ["Victorious Secret", "Somewhere Over Dwayne Bowe", "The Blair Walsh Project", "Forgetting Brandon Marshall", "Show Me Your TDs",
                "Boston Tebow Party", "Saved by the Le'Von Bell", "Stafford Infection", "I Pitta the Fool", "Cruz Control"];
            for (var i = 0; i < ft.length; i++) {
                this.FantasyTeams.push(new Models.FantasyTeam(ft[i]));
            }
            this.MyTeam = this.FantasyTeams[0];

            var _teams: Models.Team[] = [];
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
                var team = new Models.Team();
                team.Abbreviation = t[i]["Abbreviation"];
                team.ByeWeek = t[i]["ByeWeek"];
                team.Location = t[i]["Location"];
                team.Logo = t[i]["Logo"];
                team.Nickname = t[i]["Nickname"];
                _teams.push(team);
            }

            var overall = 1;
            for (var i = 0; i < 4; i++) {
                var r = new Models.Round();
                r.RoundNumber = i + 1;
                r.DraftSpots = new Fayde.Collections.ObservableCollection<Models.DraftSpot>();
                if (i % 2 == 0) {
                    for (var j = 1; j <= 10; j++) {
                        var ds = new Models.DraftSpot();
                        ds.Overall = overall;
                        ds.Team = this.FantasyTeams[j - 1];
                        r.DraftSpots.Add(ds);
                        overall++;
                    }
                } else {
                    for (var j = 10; j >= 1; j--) {
                        var ds = new Models.DraftSpot();
                        ds.Overall = overall;
                        ds.Team = this.FantasyTeams[j - 1];
                        r.DraftSpots.Add(ds);
                        overall++;
                    }
                }
                this.Rounds.Add(r);
            }

            this.Positions.push("ALL", "QB", "RB", "WR", "RB/WR", "TE", "K", "DEF");

            var fp = [{
                "Name": "Arian Foster", "Team": _teams[8], "Headshot": "Images/Player Headshots/arian_foster.png", "Positions": "RB", "Birthdate": new Date("1986-08-24"), "Height": "6'11\"", "Weight": "228", "ADP": 1.8,
                "Projected":
                    { "Year": 2013, "Team": _teams[8], "GamesPlayed": 16, "RushingAttempts": 351, "RushingYards": 1424, "RushingTouchdowns": 15, "FumblesLost": 2, "Targets": 58, "Receptions": 40, "ReceivingYards": 240, "ReceivingTouchdowns": 2 },
                "Stats":
                   [{ "Year": 2009, "Team": _teams[8], "GamesPlayed": 6, "RushingAttempts": 54, "RushingYards": 257, "RushingTouchdowns": 3, "FumblesLost": 1, "Targets": 9, "Receptions": 8, "ReceivingYards": 93, "ReceivingTouchdowns": 0 },
                    { "Year": 2010, "Team": _teams[8], "GamesPlayed": 16, "RushingAttempts": 327, "RushingYards": 1616, "RushingTouchdowns": 16, "FumblesLost": 2, "Targets": 84, "Receptions": 66, "ReceivingYards": 604, "ReceivingTouchdowns": 2 },
                    { "Year": 2011, "Team": _teams[8], "GamesPlayed": 13, "RushingAttempts": 278, "RushingYards": 1224, "RushingTouchdowns": 10, "FumblesLost": 3, "Targets": 71, "Receptions": 53, "ReceivingYards": 617, "ReceivingTouchdowns": 2 },
                    { "Year": 2012, "Team": _teams[8], "GamesPlayed": 16, "RushingAttempts": 351, "RushingYards": 1424, "RushingTouchdowns": 15, "FumblesLost": 2, "Targets": 58, "Receptions": 40, "ReceivingYards": 240, "ReceivingTouchdowns": 2 }]
            },
                { "Name": "Aaron Rodgers", "Team": _teams[10], "Headshot": "Images/Player Headshots/aaron_rodgers.png", "Positions": "QB", "ADP": 1.91 },
                { "Name": "Ray Rice", "Team": _teams[18], "Headshot": "Images/Player Headshots/ray_rice.png", "Positions": "RB", "ADP": 3.25 },
                { "Name": "LeSean McCoy", "Team": _teams[19], "Headshot": "Images/Player Headshots/lesean_mccoy.png", "Positions": "RB", "ADP": 5.11 },
                { "Name": "Cam Newton", "Team": _teams[20], "Headshot": "Images/Player Headshots/cam_newton.png", "Positions": "QB", "ADP": 9.2 },
                { "Name": "Tom Brady", "Team": _teams[5], "Headshot": "Images/Player Headshots/tom_brady.png", "Positions": "QB", "ADP": 5.97 },
                { "Name": "Drew Brees", "Team": _teams[0], "Headshot": "Images/Player Headshots/drew_brees.png", "Positions": "QB", "ADP": 6.21 },
                { "Name": "Matthew Stafford", "Team": _teams[1], "Headshot": "Images/Player Headshots/matthew_stafford.png", "Positions": "QB", "ADP": 9.9 },
                { "Name": "Calvin Johnson", "Team": _teams[1], "Headshot": "Images/Player Headshots/calvin_johnson.png", "Positions": "WR", "ADP": 7.86 },
                { "Name": "Chris Johnson", "Team": _teams[2], "Headshot": "Images/Player Headshots/chris_johnson.png", "Positions": "RB", "ADP": 11.4 },
                { "Name": "Darren McFadden", "Team": _teams[3], "Headshot": "Images/Player Headshots/darren_mcfadden.png", "Positions": "RB", "ADP": 13.79 },
                { "Name": "Larry Fitzgerald", "Team": _teams[4], "Headshot": "Images/Player Headshots/larry_fitzgerald.png", "Positions": "WR", "ADP": 13.81 },
                { "Name": "Rob Gronkowski", "Team": _teams[5], "Headshot": "Images/Player Headshots/rob_gronkowski.png", "Positions": "TE", "ADP": 14.26 },
                { "Name": "Julio Jones", "Team": _teams[6], "Headshot": "Images/Player Headshots/julio_jones.png", "Positions": "WR", "ADP": 19.79 },
                { "Name": "Jimmy Graham", "Team": _teams[0], "Headshot": "Images/Player Headshots/jimmy_graham.png", "Positions": "TE", "ADP": 19.76 },
                { "Name": "Matt Forte", "Team": _teams[7], "Headshot": "Images/Player Headshots/matt_forte.png", "Positions": "RB", "ADP": 16.71 },
                { "Name": "Andre Johnson", "Team": _teams[8], "Headshot": "Images/Player Headshots/andre_johnson.png", "Positions": "WR", "ADP": 18.43 },
                { "Name": "Roddy White", "Team": _teams[6], "Headshot": "Images/Player Headshots/roddy_white.png", "Positions": "WR", "ADP": 22.64 },
                { "Name": "A.J. Green", "Team": _teams[9], "Headshot": "Images/Player Headshots/aj_green.png", "Positions": "WR", "ADP": 26.17 },
                { "Name": "Greg Jennings", "Team": _teams[10], "Headshot": "Images/Player Headshots/greg_jennings.png", "Positions": "WR", "ADP": 22.38 },
                { "Name": "DeMarco Murray", "Team": _teams[11], "Headshot": "Images/Player Headshots/demarco_murray.png", "Positions": "RB", "ADP": 25.86 },
                { "Name": "Jamaal Charles", "Team": _teams[12], "Headshot": "Images/Player Headshots/jamaal_charles.png", "Positions": "RB", "ADP": 28.45 },
                { "Name": "Wes Welker", "Team": _teams[5], "Headshot": "Images/Player Headshots/wes_welker.png", "Positions": "WR", "ADP": 23.36 },
                { "Name": "Mike Wallace", "Team": _teams[17], "Headshot": "Images/Player Headshots/mike_wallace.png", "Positions": "WR", "ADP": 32.73 }];
            for (var i = 0; i < fp.length; i++) {
                var fantasyPlayer = new Models.FantasyPlayer();
                fantasyPlayer.Birthdate = fp[i]["Birthdate"];
                fantasyPlayer.Headshot = fp[i]["Headshot"];
                fantasyPlayer.Height = fp[i]["Height"];
                fantasyPlayer.Name = fp[i]["Name"];
                fantasyPlayer.Positions = fp[i]["Positions"].split(',');
                fantasyPlayer.Team = fp[i]["Team"];
                fantasyPlayer.Weight = fp[i]["Weight"];
                fantasyPlayer.ADP = fp[i]["ADP"];
                if (fp[i]["Projected"]) {
                    var projected = new Models.Stats();
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
                    fantasyPlayer.Projected = projected;
                }
                fantasyPlayer.Stats = new Array<Models.Stats>();
                if (fp[i]["Stats"]) {
                    for (var j = 0; j < fp[i]["Stats"].length; j++) {
                        var hash = fp[i]["Stats"][j];
                        var s = new Models.Stats();
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
                        fantasyPlayer.Stats.push(s);
                    }
                }
                this.FantasyPlayers.Add(fantasyPlayer);
            }

            this.Countdown = 10;
            this.SelectedPlayer = this.FantasyPlayers.GetValueAt(0);
            this._interval_id = setInterval(() => this.DoWork(), 1000);
        }

        DoWork() {
            var current = this.Countdown;
            if (current == 0) {
                var spot = this.Rounds.GetValueAt(0).DraftSpots.GetValueAt(0);
                var ds = new Models.DraftSelection();
                ds.DraftSpot = spot;
                ds.FantasyPlayer = this.FantasyPlayers.GetValueAt(0);
                this.FantasyPlayers.RemoveAt(0);
                this.DraftSelections.Add(ds);
                this.Rounds.GetValueAt(0).DraftSpots.RemoveAt(0);
                if (this.Rounds.GetValueAt(0).DraftSpots.Count == 0)
                    this.Rounds.RemoveAt(0);
                current = 10;
            }
            else
                current = current - 1;
            this.Countdown = current;

            if (this.Rounds.Count == 0 || this.FantasyPlayers.Count == 0) {
                clearInterval(this._interval_id);
            }
        }
    }
    Fayde.RegisterType(DefaultViewModel, {
        Name: "DefaultViewModel",
        Namespace: "NflDraft.ViewModels",
        XmlNamespace: "folder:ViewModels"
    });
}