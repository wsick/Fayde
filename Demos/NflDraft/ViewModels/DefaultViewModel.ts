/// <reference path="../scripts/Fayde.d.ts" />
/// <reference path="../Models/Round.ts" />
/// <reference path="../Models/DraftSpot.ts" />
/// <reference path="../Models/FantasyTeam.ts" />
/// <reference path="../Models/Team.ts" />
/// <reference path="../Models/Stats.ts" />
/// <reference path="../Models/Player.ts" />
/// <reference path="../Models/PlayerStats.ts" />

module NflDraft.ViewModels {
    export class DefaultViewModel extends Fayde.MVVM.ViewModelBase {
        Rounds: Fayde.Collections.ObservableCollection<Models.Round> = new Fayde.Collections.ObservableCollection<Models.Round>();
        Positions: string[] = [];
        PlayerStats: Models.PlayerStats[] = [];
        private _selectedPlayer: Models.PlayerStats;
        get SelectedPlayer(): Models.PlayerStats { return this._selectedPlayer; }
        set SelectedPlayer(value: Models.PlayerStats) {
            this._selectedPlayer = value;
            this.OnPropertyChanged("SelectedPlayer");
        }

        constructor() {
            super();
            this.Load();
        }

        Load() {
            var _fantasyTeams: Models.FantasyTeam[] = [];
            var ft = ["Team 1", "Team 2", "Team 3", "Team 4", "Team 5", "Team 6", "Team 7", "Team 8", "Team 9", "Team 10"];
            for (var i = 0; i < ft.length; i++) {
                _fantasyTeams.push(new Models.FantasyTeam(ft[i]));
            }

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
                r.DraftSpots = new Array<Models.DraftSpot>();
                if (i % 2 == 0) {
                    for (var j = 1; j <= 10; j++) {
                        var ds = new Models.DraftSpot();
                        ds.Overall = overall;
                        ds.Team = _fantasyTeams[j - 1];
                        r.DraftSpots.push(ds);
                        overall++;
                    }
                } else {
                    for (var j = 10; j >= 1; j--) {
                        var ds = new Models.DraftSpot();
                        ds.Overall = overall;
                        ds.Team = _fantasyTeams[j - 1];
                        r.DraftSpots.push(ds);
                        overall++;
                    }
                }
                this.Rounds.Add(r);
            }

            this.Positions.push("ALL", "QB", "RB", "WR", "RB/WR", "TE", "K", "DEF");

            var p = [{ "Name": "Arian Foster", "Team": _teams[8], "Headshot": "Images/Player Headshots/arian_foster.png", "Positions": "RB", "Birthdate": new Date("1986-08-24"), "Height": "6'11\"", "Weight": "228" },
                { "Name": "Aaron Rodgers", "Team": _teams[10], "Headshot": "Images/Player Headshots/aaron_rodgers.png", "Positions": "QB" },
                { "Name": "Ray Rice", "Team": _teams[18], "Headshot": "Images/Player Headshots/ray_rice.png", "Positions": "RB" },
                { "Name": "LeSean McCoy", "Team": _teams[19], "Headshot": "Images/Player Headshots/lesean_mccoy.png", "Positions": "RB" },
                { "Name": "Cam Newton", "Team": _teams[20], "Headshot": "Images/Player Headshots/cam_newton.png", "Positions": "QB" },
                { "Name": "Tom Brady", "Team": _teams[5], "Headshot": "Images/Player Headshots/tom_brady.png", "Positions": "QB" },
                { "Name": "Drew Brees", "Team": _teams[0], "Headshot": "Images/Player Headshots/drew_brees.png", "Positions": "QB" },
                { "Name": "Matthew Stafford", "Team": _teams[1], "Headshot": "Images/Player Headshots/matthew_stafford.png", "Positions": "QB" },
                { "Name": "Calvin Johnson", "Team": _teams[1], "Headshot": "Images/Player Headshots/calvin_johnson.png", "Positions": "WR" },
                { "Name": "Chris Johnson", "Team": _teams[2], "Headshot": "Images/Player Headshots/chris_johnson.png", "Positions": "RB" },
                { "Name": "Darren McFadden", "Team": _teams[3], "Headshot": "Images/Player Headshots/darren_mcfadden.png", "Positions": "RB" },
                { "Name": "Larry Fitzgerald", "Team": _teams[4], "Headshot": "Images/Player Headshots/larry_fitzgerald.png", "Positions": "WR" },
                { "Name": "Rob Gronkowski", "Team": _teams[5], "Headshot": "Images/Player Headshots/rob_gronkowski.png", "Positions": "TE" },
                { "Name": "Julio Jones", "Team": _teams[6], "Headshot": "Images/Player Headshots/julio_jones.png", "Positions": "WR" },
                { "Name": "Jimmy Graham", "Team": _teams[0], "Headshot": "Images/Player Headshots/jimmy_graham.png", "Positions": "TE" },
                { "Name": "Matt Forte", "Team": _teams[7], "Headshot": "Images/Player Headshots/matt_forte.png", "Positions": "RB" },
                { "Name": "Andre Johnson", "Team": _teams[8], "Headshot": "Images/Player Headshots/andre_johnson.png", "Positions": "WR" },
                { "Name": "Roddy White", "Team": _teams[6], "Headshot": "Images/Player Headshots/roddy_white.png", "Positions": "WR" },
                { "Name": "A.J. Green", "Team": _teams[9], "Headshot": "Images/Player Headshots/aj_green.png", "Positions": "WR" },
                { "Name": "Greg Jennings", "Team": _teams[10], "Headshot": "Images/Player Headshots/greg_jennings.png", "Positions": "WR" },
                { "Name": "DeMarco Murray", "Team": _teams[11], "Headshot": "Images/Player Headshots/demarco_murray.png", "Positions": "RB" },
                { "Name": "Jamaal Charles", "Team": _teams[12], "Headshot": "Images/Player Headshots/jamaal_charles.png", "Positions": "RB" },
                { "Name": "Wes Welker", "Team": _teams[5], "Headshot": "Images/Player Headshots/wes_welker.png", "Positions": "WR" },
                { "Name": "Mike Wallace", "Team": _teams[17], "Headshot": "Images/Player Headshots/mike_wallace.png", "Positions": "WR" }];
            var _players = new Array<Models.Player>();
            for (var i = 0; i < p.length; i++) {
                var player = new Models.Player();
                player.Birthdate = p[i]["Birthdate"];
                player.Headshot = p[i]["Headshot"];
                player.Height = p[i]["Height"];
                player.Name = p[i]["Name"];
                player.Positions = p[i]["Positions"].split(',');
                player.Team = p[i]["Team"];
                player.Weight = p[i]["Weight"];
                _players.push(player);
            }

            var ps = [{ "Player": 0, "Projected": { "Team": 8, "GamesPlayed": 16, "RushingAttempts": 351, "RushingYards": 1424, "RushingTouchdowns": 15, "Fumbles": 3, "FumblesLost": 2 }, "ADP": 1.8 },
                { "Player": 1, "ADP": 1.91 },
                { "Player": 2, "ADP": 3.25 },
                { "Player": 3, "ADP": 5.11 },
                { "Player": 4, "ADP": 9.2 },
                { "Player": 5, "ADP": 5.97 },
                { "Player": 6, "ADP": 6.21 },
                { "Player": 7, "ADP": 9.9 },
                { "Player": 8, "ADP": 7.86 },
                { "Player": 9, "ADP": 11.4 },
                { "Player": 10, "ADP": 13.79 },
                { "Player": 11, "ADP": 13.81 },
                { "Player": 12, "ADP": 14.26 },
                { "Player": 13, "ADP": 19.79 },
                { "Player": 14, "ADP": 19.76 },
                { "Player": 15, "ADP": 16.71 },
                { "Player": 16, "ADP": 18.43 },
                { "Player": 17, "ADP": 22.64 },
                { "Player": 18, "ADP": 26.17 },
                { "Player": 19, "ADP": 22.38 },
                { "Player": 20, "ADP": 25.86 },
                { "Player": 21, "ADP": 28.45 },
                { "Player": 22, "ADP": 23.36 },
                { "Player": 23, "ADP": 32.73 }];
            for (var i = 0; i < ps.length; i++) {
                var playerStats = new Models.PlayerStats();
                playerStats.Player = _players[ps[i]["Player"]];
                playerStats.ADP = ps[i]["ADP"];
                if (ps[i]["Projected"]) {
                    var projected = new Models.Stats();
                    projected.Team = _teams[ps[i]["Projected"]["Team"]];
                    projected.GamesPlayed = ps[i]["Projected"]["GamesPlayed"];
                    projected.RushingAttempts = ps[i]["Projected"]["RushingAttempts"];
                    projected.RushingYards = ps[i]["Projected"]["RushingYards"];
                    projected.RushingTouchdowns = ps[i]["Projected"]["RushingTouchdowns"];
                    projected.Fumbles = ps[i]["Projected"]["Fumbles"];
                    projected.FumblesLost = ps[i]["Projected"]["FumblesLost"];
                    playerStats.Projected = projected;
                }
                this.PlayerStats.push(playerStats);
            }

            this.SelectedPlayer = this.PlayerStats[0];
            //setInterval(Tick(), 1000);
        }

        //Tick() {
        //}
        //private static ctor = (() => {
        //    Fayde.MVVM.NotifyProperties(DefaultViewModel, ["Rounds"]);
        //})();
    }
    Fayde.RegisterType(DefaultViewModel, {
        Name: "DefaultViewModel",
        Namespace: "NflDraft.ViewModels",
        XmlNamespace: "folder:ViewModels"
    });
}