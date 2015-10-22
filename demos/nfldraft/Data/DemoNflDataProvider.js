define(["require", "exports", "../Models/FantasyTeam", "../Models/Round", "../Models/FantasyPlayer", "../Models/FantasyPosition", "../Models/Team", "../Models/DraftSpot", "../Models/Stats"], function (require, exports, FantasyTeam, Round, FantasyPlayer, FantasyPosition, Team, DraftSpot, Stats) {
    var DemoNflDataProvider = (function () {
        function DemoNflDataProvider() {
        }
        Object.defineProperty(DemoNflDataProvider.prototype, "FantasyTeams", {
            get: function () {
                if (this._fantasyTeams)
                    return this._fantasyTeams;
                this._fantasyTeams = [];
                var ft = ["Victorious Secret", "Somewhere Over Dwayne Bowe", "The Blair Walsh Project", "Forgetting Brandon Marshall", "Show Me Your TDs",
                    "Boston Tebow Party", "Saved by the Le'Von Bell", "Stafford Infection", "I Pitta the Fool", "Cruz Control"];
                for (var i = 0; i < ft.length; i++) {
                    this._fantasyTeams.push(new FantasyTeam(ft[i], this.FantasyPositions));
                }
                return this._fantasyTeams;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DemoNflDataProvider.prototype, "DraftSpots", {
            get: function () {
                var rounds = new Fayde.Collections.ObservableCollection();
                var ft = this.FantasyTeams;
                var overall = 1;
                for (var i = 0; i < 3; i++) {
                    var r = new Round();
                    r.RoundNumber = i + 1;
                    r.DraftSpots = new Fayde.Collections.ObservableCollection();
                    if (i % 2 == 0) {
                        for (var j = 1; j <= 10; j++) {
                            var ds = new DraftSpot();
                            ds.Round = r;
                            ds.Overall = overall;
                            ds.Team = ft[j - 1];
                            r.DraftSpots.Add(ds);
                            overall++;
                        }
                    }
                    else {
                        for (var j = 10; j >= 1; j--) {
                            var ds = new DraftSpot();
                            ds.Round = r;
                            ds.Overall = overall;
                            ds.Team = ft[j - 1];
                            r.DraftSpots.Add(ds);
                            overall++;
                        }
                    }
                    rounds.Add(r);
                }
                return rounds;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DemoNflDataProvider.prototype, "FantasyPlayers", {
            get: function () {
                if (this._fantasyPlayers)
                    return this._fantasyPlayers;
                this._fantasyPlayers = new Fayde.Collections.ObservableCollection();
                var fp = [
                    {
                        "Name": "Adrian Peterson", "Team": this.Teams[27], "Headshot": "Images/Player Headshots/adrian_peterson.png", "Positions": "RB", "Birthdate": new Date("1985-03-21"), "Height": "6'1\"", "Weight": "217", "ADP": 1.50,
                        "Stats": [
                            [2007, this.Teams[27], 14, 238, 1341, 12, 3, 29, 19, 268, 1, 0, 0, 0, 0, 0],
                            [2008, this.Teams[27], 16, 363, 1760, 10, 4, 39, 21, 125, 0, 0, 0, 0, 0, 0],
                            [2009, this.Teams[27], 16, 314, 1383, 18, 5, 57, 43, 436, 0, 0, 0, 0, 0, 0],
                            [2010, this.Teams[27], 15, 283, 1298, 12, 1, 50, 36, 341, 1, 0, 0, 0, 0, 0],
                            [2011, this.Teams[27], 12, 208, 970, 12, 0, 23, 18, 139, 1, 0, 0, 0, 0, 0],
                            [2012, this.Teams[27], 16, 348, 2097, 12, 2, 51, 40, 217, 1, 0, 0, 0, 0, 0],
                            [2013, this.Teams[27], 16, 328, 1692, 13, 2, 58, 39, 308, 1, 0, 0, 0, 0, 0]
                        ]
                    },
                    {
                        "Name": "Arian Foster", "Team": this.Teams[8], "Headshot": "Images/Player Headshots/arian_foster.png", "Positions": "RB", "Birthdate": new Date("1986-08-24"), "Height": "6'1\"", "Weight": "228", "ADP": 1.8,
                        "Stats": [
                            [2009, this.Teams[8], 6, 54, 257, 3, 1, 9, 8, 93, 0, 0, 0, 0, 0, 0],
                            [2010, this.Teams[8], 16, 327, 1616, 16, 2, 84, 66, 604, 2, 0, 0, 0, 0, 0],
                            [2011, this.Teams[8], 13, 278, 1224, 10, 3, 71, 53, 617, 2, 0, 0, 0, 0, 0],
                            [2012, this.Teams[8], 16, 351, 1424, 15, 2, 58, 40, 240, 2, 0, 0, 0, 0, 0],
                            [2013, this.Teams[8], 16, 319, 1354, 13, 2, 58, 44, 406, 2, 0, 0, 0, 0, 0]
                        ]
                    },
                    {
                        "Name": "Ray Rice", "Team": this.Teams[18], "Headshot": "Images/Player Headshots/ray_rice.png", "Positions": "RB", "Birthdate": new Date("1987-01-22"), "Height": "5'8\"", "Weight": "212", "ADP": 3.25,
                        "Stats": [
                            [2008, this.Teams[18], 13, 107, 454, 0, 1, 43, 33, 273, 0, 0, 0, 0, 0, 0],
                            [2009, this.Teams[18], 16, 254, 1339, 7, 2, 103, 78, 702, 1, 0, 0, 0, 0, 0],
                            [2010, this.Teams[18], 16, 307, 1220, 5, 0, 82, 63, 556, 1, 0, 0, 0, 0, 0],
                            [2011, this.Teams[18], 16, 291, 1364, 12, 2, 104, 76, 704, 3, 0, 0, 0, 0, 0],
                            [2012, this.Teams[18], 16, 257, 1143, 9, 0, 84, 61, 478, 1, 0, 0, 0, 0, 0],
                            [2013, this.Teams[18], 16, 265, 1190, 9, 2, 90, 58, 498, 2, 0, 0, 0, 0, 0]
                        ]
                    },
                    {
                        "Name": "Doug Martin", "Team": this.Teams[21], "Headshot": "Images/Player Headshots/doug_martin.png", "Positions": "RB", "Birthdate": new Date("1989-01-13"), "Height": "5'9\"", "Weight": "215", "ADP": 28.45,
                        "Stats": [
                            [2012, this.Teams[21], 16, 319, 1454, 11, 1, 71, 49, 472, 1, 0, 0, 0, 0, 0],
                            [2013, this.Teams[21], 16, 308, 1294, 8, 2, 80, 58, 470, 1, 0, 0, 0, 0, 0]
                        ]
                    },
                    {
                        "Name": "Jamaal Charles", "Team": this.Teams[12], "Headshot": "Images/Player Headshots/jamaal_charles.png", "Positions": "RB", "Birthdate": new Date("1986-12-27"), "Height": "5'11\"", "Weight": "199", "ADP": 28.45,
                        "Stats": [
                            [2008, this.Teams[12], 16, 67, 357, 0, 1, 40, 27, 273, 1, 0, 0, 0, 0, 0],
                            [2009, this.Teams[12], 15, 190, 1120, 7, 2, 55, 40, 702, 1, 0, 0, 0, 0, 0],
                            [2010, this.Teams[12], 16, 230, 1467, 5, 1, 66, 45, 556, 3, 0, 0, 0, 0, 0],
                            [2011, this.Teams[12], 2, 12, 83, 0, 1, 6, 5, 9, 1, 0, 0, 0, 0, 0],
                            [2012, this.Teams[12], 16, 285, 1509, 5, 3, 48, 35, 236, 1, 0, 0, 0, 0, 0],
                            [2013, this.Teams[12], 16, 247, 1499, 4, 2, 70, 51, 474, 2, 0, 0, 0, 0, 0]
                        ]
                    },
                    {
                        "Name": "Trent Richardson", "Team": this.Teams[25], "Headshot": "Images/Player Headshots/trent_richardson.png", "Positions": "RB", "Birthdate": new Date("1991-07-10"), "Height": "5'9\"", "Weight": "225", "ADP": 28.45,
                        "Stats": [
                            [2012, this.Teams[25], 15, 267, 950, 11, 0, 70, 51, 367, 1, 0, 0, 0, 0, 0],
                            [2013, this.Teams[25], 16, 295, 1251, 10, 1, 66, 48, 374, 1, 0, 0, 0, 0, 0]
                        ]
                    },
                    {
                        "Name": "C.J. Spiller", "Team": this.Teams[15], "Headshot": "Images/Player Headshots/cj_spiller.png", "Positions": "RB", "Birthdate": new Date("1987-08-05"), "Height": "5'11\"", "Wieght": "200", "ADP": 28.45,
                        "Stats": [
                            [2010, this.Teams[15], 14, 74, 283, 0, 1, 31, 24, 157, 1, 0, 0, 0, 0, 0],
                            [2011, this.Teams[15], 16, 107, 561, 4, 0, 53, 39, 269, 2, 0, 0, 0, 0, 0],
                            [2012, this.Teams[15], 16, 207, 1244, 6, 2, 56, 43, 459, 2, 0, 0, 0, 0, 0],
                            [2013, this.Teams[15], 15, 252, 1498, 5, 1, 55, 40, 429, 2, 0, 0, 0, 0, 0]
                        ]
                    },
                    {
                        "Name": "LeSean McCoy", "Team": this.Teams[19], "Headshot": "Images/Player Headshots/lesean_mccoy.png", "Positions": "RB", "Birthdate": new Date("1988-07-12"), "Height": "5'11\"", "Weight": "208", "ADP": 5.11,
                        "Stats": [
                            [2009, this.Teams[19], 16, 155, 637, 4, 1, 56, 40, 308, 0, 0, 0, 0, 0, 0],
                            [2010, this.Teams[19], 15, 207, 1080, 7, 1, 90, 78, 592, 2, 0, 0, 0, 0, 0],
                            [2011, this.Teams[19], 15, 273, 1309, 17, 1, 69, 48, 315, 3, 0, 0, 0, 0, 0],
                            [2012, this.Teams[19], 12, 200, 840, 6, 3, 67, 54, 373, 3, 0, 0, 0, 0, 0],
                            [2013, this.Teams[19], 16, 233, 1120, 4, 1, 82, 67, 529, 3, 0, 0, 0, 0, 0]
                        ]
                    },
                    {
                        "Name": "Aaron Rodgers", "Team": this.Teams[10], "Headshot": "Images/Player Headshots/aaron_rodgers.png", "Positions": "QB", "Birthdate": new Date("1983-12-02"), "Height": "6'2\"", "Weight": "225", "ADP": 1.91,
                        "Stats": [
                            [2005, this.Teams[10], 3, 2, 7, 0, 0, 0, 0, 0, 0, 9, 16, 65, 0, 1],
                            [2006, this.Teams[10], 2, 2, 11, 0, 0, 0, 0, 0, 0, 6, 15, 46, 0, 0],
                            [2007, this.Teams[10], 2, 7, 29, 0, 0, 0, 0, 0, 0, 20, 28, 218, 1, 0],
                            [2008, this.Teams[10], 16, 56, 207, 4, 0, 0, 0, 0, 0, 341, 536, 4038, 28, 13],
                            [2009, this.Teams[10], 16, 58, 316, 5, 0, 0, 0, 0, 0, 350, 541, 4434, 30, 7],
                            [2010, this.Teams[10], 15, 64, 356, 4, 1, 0, 0, 0, 0, 312, 475, 3922, 28, 11],
                            [2011, this.Teams[10], 15, 60, 257, 3, 0, 0, 0, 0, 0, 343, 502, 4643, 45, 6],
                            [2012, this.Teams[10], 16, 54, 259, 2, 0, 0, 0, 0, 0, 371, 552, 4295, 39, 8],
                            [2013, this.Teams[10], 16, 53, 271, 3, 0, 0, 0, 0, 0, 360, 540, 4279, 39, 7],
                        ]
                    },
                    {
                        "Name": "Calvin Johnson", "Team": this.Teams[1], "Headshot": "Images/Player Headshots/calvin_johnson.png", "Positions": "WR", "Birthdate": new Date("1985-09-29"), "Height": "6'5\"", "Weight": "236", "ADP": 7.86,
                        "Stats": [
                            [2007, this.Teams[1], 15, 0, 0, 0, 0, 95, 48, 756, 4, 0, 0, 0, 0, 0],
                            [2008, this.Teams[1], 16, 0, 0, 0, 0, 151, 78, 1331, 12, 0, 0, 0, 0, 0],
                            [2009, this.Teams[1], 14, 0, 0, 0, 0, 136, 67, 984, 5, 0, 0, 0, 0, 0],
                            [2010, this.Teams[1], 15, 0, 0, 0, 0, 137, 77, 1120, 12, 0, 0, 0, 0, 0],
                            [2011, this.Teams[1], 16, 0, 0, 0, 0, 158, 96, 1681, 16, 0, 0, 0, 0, 0],
                            [2012, this.Teams[1], 16, 0, 0, 0, 0, 205, 122, 1964, 5, 0, 0, 0, 0, 0],
                            [2013, this.Teams[1], 16, 0, 0, 0, 0, 172, 103, 1698, 12, 0, 0, 0, 0, 0],
                        ]
                    },
                    {
                        "Name": "Marshawn Lynch", "Team": this.Teams[24], "Headshot": "Images/Player Headshots/marshawn_lynch.png", "Positions": "RB", "Birthdate": new Date("1986-04-22"), "Height": "5'11\"", "Weight": "215", "ADP": 7.86,
                        "Stats": [
                            [2007, this.Teams[15], 13, 280, 1115, 7, 1, 26, 18, 184, 0, 0, 0, 0, 0, 0],
                            [2008, this.Teams[15], 15, 250, 1036, 8, 1, 67, 47, 300, 1, 0, 0, 0, 0, 0],
                            [2009, this.Teams[15], 13, 120, 450, 2, 1, 37, 28, 179, 0, 0, 0, 0, 0, 0],
                            [2010, this.Teams[24], 16, 202, 737, 6, 2, 28, 22, 145, 0, 0, 0, 0, 0, 0],
                            [2011, this.Teams[24], 15, 285, 1204, 12, 2, 41, 28, 212, 1, 0, 0, 0, 0, 0],
                            [2012, this.Teams[24], 16, 315, 1590, 11, 2, 30, 23, 196, 1, 0, 0, 0, 0, 0],
                            [2013, this.Teams[24], 16, 298, 1439, 12, 1, 38, 20, 165, 1, 0, 0, 0, 0, 0],
                        ]
                    },
                    {
                        "Name": "Drew Brees", "Team": this.Teams[0], "Headshot": "Images/Player Headshots/drew_brees.png", "Positions": "QB", "Birthdate": new Date("1979-01-15"), "Height": "6'0\"", "Weight": "209", "ADP": 6.21,
                        "Stats": [
                            [2001, this.Teams[14], 1, 2, 18, 0, 0, 0, 0, 0, 0, 343, 547, 4131, 26, 23],
                            [2002, this.Teams[14], 16, 38, 130, 1, 0, 0, 0, 0, 0, 392, 591, 4200, 27, 19],
                            [2003, this.Teams[14], 11, 21, 84, 0, 0, 0, 0, 0, 0, 379, 566, 4267, 29, 10],
                            [2004, this.Teams[14], 15, 53, 85, 2, 1, 0, 0, 0, 0, 336, 497, 4557, 49, 10],
                            [2005, this.Teams[14], 16, 21, 49, 1, 0, 0, 0, 0, 0, 305, 453, 3747, 28, 10],
                            [2006, this.Teams[0], 16, 42, 32, 0, 1, 0, 0, 0, 0, 362, 557, 4397, 31, 9],
                            [2007, this.Teams[0], 16, 23, 52, 1, 0, 0, 0, 0, 0, 337, 515, 4040, 31, 14],
                            [2008, this.Teams[0], 16, 22, -1, 0, 0, 0, 0, 0, 0, 371, 555, 4002, 27, 12],
                            [2009, this.Teams[0], 15, 22, 33, 2, 0, 0, 0, 0, 0, 393, 571, 4500, 33, 16],
                            [2010, this.Teams[0], 16, 18, -3, 0, 0, 0, 0, 0, 0, 450, 679, 4700, 33, 17],
                            [2011, this.Teams[0], 16, 21, 86, 1, 1, 0, 0, 0, 0, 450, 679, 4700, 33, 17],
                            [2012, this.Teams[0], 16, 15, 5, 1, 0, 0, 0, 0, 0, 400, 583, 4659, 37, 11],
                            [2013, this.Teams[0], 16, 35, 52, 3, 0, 0, 0, 0, 0, 400, 602, 4870, 38, 13]
                        ]
                    },
                    {
                        "Name": "Brandon Marshall", "Team": this.Teams[7], "Headshot": "Images/Player Headshots/brandon_marshall.png", "Positions": "WR", "Birthdate": new Date("1984-03-23"), "Height": "6'4\"", "Weight": "230", "ADP": 6.21,
                        "Stats": [
                            [2006, this.Teams[29], 15, 2, 12, 0, 0, 37, 20, 309, 2, 0, 0, 0, 0, 0],
                            [2007, this.Teams[29], 16, 5, 57, 0, 0, 170, 102, 1325, 7, 0, 0, 0, 0, 0],
                            [2008, this.Teams[29], 15, 2, -4, 0, 1, 183, 104, 1265, 6, 0, 0, 0, 0, 0],
                            [2009, this.Teams[29], 15, 7, 39, 0, 0, 154, 101, 1120, 10, 0, 0, 0, 0, 0],
                            [2010, this.Teams[20], 14, 2, 3, 0, 0, 147, 86, 1014, 3, 0, 1, 0, 0, 0],
                            [2011, this.Teams[20], 16, 1, 13, 0, 0, 145, 81, 1214, 6, 0, 0, 0, 0, 0],
                            [2012, this.Teams[7], 16, 1, -2, 0, 0, 194, 118, 1508, 11, 0, 0, 0, 0, 0],
                            [2013, this.Teams[7], 16, 0, 0, 0, 0, 163, 100, 1295, 12, 0, 0, 0, 0, 0]
                        ]
                    },
                    {
                        "Name": "Stephen Jackson", "Team": this.Teams[6], "Headshot": "Images/Player Headshots/stephen_jackson.png", "Positions": "RB", "Birthdate": new Date("1983-07-22"), "Height": "6'2\"", "Weight": "240", "ADP": 6.21,
                        "Stats": [
                            [2004, this.Teams[23], 14, 134, 673, 4, 1, 0, 19, 189, 0, 0, 0, 0, 0, 0],
                            [2005, this.Teams[23], 15, 254, 1046, 8, 3, 0, 43, 320, 2, 0, 0, 0, 0, 0],
                            [2006, this.Teams[23], 16, 346, 1528, 13, 2, 110, 90, 806, 3, 0, 0, 0, 0, 0],
                            [2007, this.Teams[23], 12, 237, 1002, 5, 3, 52, 38, 271, 1, 1, 1, 2, 1, 0],
                            [2008, this.Teams[23], 12, 253, 1042, 7, 5, 62, 40, 379, 1, 0, 0, 0, 0, 0],
                            [2009, this.Teams[23], 15, 324, 1416, 4, 2, 75, 51, 322, 0, 0, 0, 0, 0, 0],
                            [2010, this.Teams[23], 16, 330, 1241, 6, 1, 62, 46, 383, 0, 0, 0, 0, 0, 0],
                            [2011, this.Teams[23], 15, 260, 1145, 5, 1, 58, 42, 333, 1, 0, 0, 0, 0, 0],
                            [2012, this.Teams[23], 16, 258, 1045, 4, 0, 54, 38, 321, 0, 0, 0, 0, 0, 0],
                            [2013, this.Teams[6], 12, 157, 543, 6, 0, 49, 33, 191, 1, 0, 0, 0, 0, 0]
                        ]
                    },
                    {
                        "Name": "Dez Bryant", "Team": this.Teams[11], "Headshot": "Images/Player Headshots/dez_bryant.png", "Positions": "WR", "Birthdate": new Date("1988-11-04"), "Height": "6'2\"", "Weight": "222", "ADP": 6.21,
                        "Stats": [
                            [2010, this.Teams[11], 12, 1, 0, 0, 0, 72, 45, 561, 6, 0, 0, 0, 0, 0],
                            [2011, this.Teams[11], 15, 1, 5, 0, 0, 103, 63, 928, 9, 0, 0, 0, 0, 0],
                            [2012, this.Teams[11], 16, 2, 5, 0, 0, 138, 92, 1382, 12, 0, 0, 0, 0, 0],
                            [2013, this.Teams[11], 16, 1, 1, 0, 0, 160, 93, 1233, 13, 0, 0, 0, 0, 0]
                        ]
                    },
                    {
                        "Name": "Darren Sproles", "Team": this.Teams[0], "Headshot": "Images/Player Headshots/darren_sproles.png", "Positions": "RB", "Birthdate": new Date("1983-06-20"), "Height": "5'6\"", "Weight": "190", "ADP": 6.21,
                        "Stats": [
                            [2005, this.Teams[14], 15, 8, 50, 0, 0, 0, 3, 10, 0, 0, 0, 0, 0, 0],
                            [2007, this.Teams[14], 15, 37, 164, 2, 0, 12, 10, 31, 0, 0, 0, 0, 0, 0],
                            [2008, this.Teams[14], 16, 61, 330, 1, 0, 34, 29, 342, 5, 0, 0, 0, 0, 0],
                            [2009, this.Teams[14], 16, 93, 343, 3, 0, 57, 45, 497, 4, 0, 0, 0, 0, 0],
                            [2010, this.Teams[14], 16, 50, 267, 0, 1, 75, 59, 520, 2, 0, 0, 0, 0, 0],
                            [2011, this.Teams[0], 16, 87, 603, 2, 0, 111, 86, 710, 7, 0, 0, 0, 0, 0],
                            [2012, this.Teams[0], 13, 48, 244, 1, 0, 104, 75, 667, 7, 0, 0, 0, 0, 0],
                            [2013, this.Teams[0], 15, 53, 220, 2, 1, 89, 71, 604, 2, 0, 0, 0, 0, 0]
                        ]
                    },
                    {
                        "Name": "Peyton Manning", "Team": this.Teams[29], "Headshot": "Images/Player Headshots/peyton_manning.png", "Positions": "QB", "Birthdate": new Date("1976-03-24"), "Height": "6'5\"", "Weight": "230", "ADP": 6.21,
                        "Stats": [
                            [1998, this.Teams[29], 16, 15, 62, 0, 0, 0, 0, 0, 0, 326, 575, 3739, 26, 28],
                            [1999, this.Teams[29], 16, 35, 73, 2, 2, 0, 0, 0, 0, 331, 533, 4135, 26, 15],
                            [2000, this.Teams[29], 16, 37, 116, 1, 1, 0, 0, 0, 0, 357, 571, 4413, 33, 15],
                            [2001, this.Teams[29], 16, 35, 157, 4, 1, 0, 0, 0, 0, 343, 547, 4131, 26, 23],
                            [2002, this.Teams[29], 16, 38, 148, 2, 0, 0, 0, 0, 0, 392, 591, 4200, 27, 19],
                            [2003, this.Teams[29], 16, 28, 26, 0, 0, 0, 0, 0, 0, 379, 566, 4267, 29, 10],
                            [2004, this.Teams[29], 16, 25, 38, 0, 1, 0, 0, 0, 0, 336, 497, 4557, 49, 10],
                            [2005, this.Teams[29], 16, 33, 45, 0, 1, 0, 0, 0, 0, 305, 453, 3747, 28, 10],
                            [2006, this.Teams[29], 16, 23, 36, 4, 0, 0, 0, 0, 0, 362, 557, 4397, 31, 9],
                            [2007, this.Teams[29], 16, 20, -5, 3, 0, 0, 0, 0, 0, 337, 515, 4040, 31, 14],
                            [2008, this.Teams[29], 16, 20, 21, 1, 0, 0, 0, 0, 0, 371, 555, 4002, 27, 12],
                            [2009, this.Teams[29], 16, 19, -13, 0, 0, 0, 0, 0, 0, 393, 571, 4500, 33, 16],
                            [2010, this.Teams[29], 16, 18, 18, 0, 0, 0, 0, 0, 0, 450, 679, 4700, 33, 17],
                            [2012, this.Teams[25], 16, 23, 6, 0, 0, 0, 0, 0, 0, 400, 583, 4659, 37, 11],
                            [2013, this.Teams[25], 16, 20, 4, 1, 3, 0, 0, 0, 0, 400, 602, 4870, 38, 13]
                        ]
                    },
                    {
                        "Name": "A.J. Green", "Team": this.Teams[9], "Headshot": "Images/Player Headshots/aj_green.png", "Positions": "WR", "Birthdate": new Date("1988-07-31"), "Height": "6'4\"", "Weight": "207", "ADP": 26.17,
                        "Stats": [
                            [2011, this.Teams[9], 15, 5, 53, 0, 1, 116, 65, 1057, 7, 0, 0, 0, 0, 0],
                            [2012, this.Teams[9], 16, 4, 38, 0, 0, 164, 97, 1350, 11, 0, 0, 0, 0, 0],
                            [2013, this.Teams[9], 16, 0, 0, 0, 0, 180, 98, 1426, 11, 0, 0, 0, 0, 0]
                        ]
                    },
                    {
                        "Name": "Reggie Bush", "Team": this.Teams[1], "Headshot": "Images/Player Headshots/reggie_bush.png", "Positions": "RB", "Birthdate": new Date("1985-03-02"), "Height": "6'0\"", "Weight": "203", "ADP": 26.17,
                        "Stats": [
                            [2006, this.Teams[0], 16, 155, 565, 6, 2, 119, 88, 742, 2, 0, 1, 0, 0, 1],
                            [2007, this.Teams[0], 12, 157, 581, 4, 7, 99, 73, 417, 2, 0, 0, 0, 0, 0],
                            [2008, this.Teams[0], 10, 106, 404, 2, 2, 72, 52, 440, 4, 0, 0, 0, 0, 0],
                            [2009, this.Teams[0], 14, 70, 390, 5, 2, 68, 47, 335, 3, 0, 0, 0, 0, 0],
                            [2010, this.Teams[0], 8, 36, 150, 0, 0, 43, 34, 208, 1, 0, 0, 0, 0, 0],
                            [2011, this.Teams[20], 15, 216, 1086, 6, 4, 52, 43, 296, 1, 0, 0, 0, 0, 0],
                            [2012, this.Teams[20], 16, 227, 986, 6, 4, 52, 35, 292, 2, 0, 0, 0, 0, 0],
                            [2013, this.Teams[1], 14, 223, 1006, 4, 5, 80, 54, 506, 3, 0, 0, 0, 0, 0]
                        ]
                    },
                    {
                        "Name": "Matt Forte", "Team": this.Teams[7], "Headshot": "Images/Player Headshots/matt_forte.png", "Positions": "RB", "Birthdate": new Date("1985-12-10"), "Height": "6'2\"", "Weight": "218", "ADP": 16.71,
                        "Stats": [
                            [2008, this.Teams[7], 16, 316, 1238, 8, 1, 77, 63, 477, 4, 0, 0, 0, 0, 0],
                            [2009, this.Teams[7], 16, 258, 929, 4, 5, 71, 57, 471, 0, 0, 0, 0, 0, 0],
                            [2010, this.Teams[7], 16, 237, 1069, 6, 0, 70, 51, 547, 3, 0, 0, 0, 0, 0],
                            [2011, this.Teams[7], 12, 203, 997, 3, 1, 76, 52, 490, 1, 0, 1, 0, 0, 0],
                            [2012, this.Teams[7], 15, 248, 1094, 5, 2, 60, 44, 340, 1, 0, 0, 0, 0, 0],
                            [2013, this.Teams[7], 16, 289, 1339, 9, 2, 94, 74, 594, 3, 0, 0, 0, 0, 0]
                        ]
                    },
                    {
                        "Name": "Tom Brady", "Team": this.Teams[5], "Headshot": "Images/Player Headshots/tom_brady.png", "Positions": "QB", "Birthdate": new Date("1977-08-03"), "Height": "6'4\"", "Weight": "225", "ADP": 5.97,
                        "Stats": [
                            [2000, this.Teams[5], 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 3, 6, 0, 0],
                            [2001, this.Teams[5], 15, 36, 43, 0, 1, 0, 0, 0, 0, 264, 413, 2843, 18, 12],
                            [2002, this.Teams[5], 16, 42, 110, 1, 2, 0, 0, 0, 0, 373, 601, 3764, 28, 14],
                            [2003, this.Teams[5], 16, 42, 63, 1, 2, 0, 0, 0, 0, 317, 527, 3620, 23, 12],
                            [2004, this.Teams[5], 16, 43, 28, 0, 2, 0, 0, 0, 0, 288, 474, 3692, 28, 14],
                            [2005, this.Teams[5], 16, 27, 89, 1, 0, 0, 0, 0, 0, 334, 530, 4110, 26, 14],
                            [2006, this.Teams[5], 16, 49, 102, 0, 1, 0, 0, 0, 0, 319, 516, 3529, 24, 12],
                            [2007, this.Teams[5], 16, 37, 98, 2, 1, 0, 0, 0, 0, 398, 578, 4806, 50, 8],
                            [2008, this.Teams[5], 1, 0, 0, 0, 0, 0, 0, 0, 0, 7, 11, 76, 0, 0],
                            [2009, this.Teams[5], 16, 29, 44, 1, 0, 0, 0, 0, 0, 371, 565, 4398, 28, 13],
                            [2010, this.Teams[5], 16, 31, 30, 1, 0, 0, 0, 0, 0, 324, 492, 3900, 36, 4],
                            [2011, this.Teams[5], 16, 43, 109, 3, 0, 0, 0, 0, 0, 401, 611, 5235, 39, 12],
                            [2012, this.Teams[5], 16, 23, 32, 4, 0, 0, 0, 0, 0, 401, 637, 4827, 34, 8],
                            [2013, this.Teams[5], 16, 23, 57, 2, 2, 0, 0, 0, 0, 393, 605, 4765, 34, 8]
                        ]
                    },
                    {
                        "Name": "Alfred Morris", "Team": this.Teams[26], "Headshot": "Images/Player Headshots/alfred_morris.png", "Positions": "RB", "Birthdate": new Date("1988-12-12"), "Height": "5'10\"", "Weight": "218", "ADP": 5.97,
                        "Stats": [
                            [2012, this.Teams[26], 16, 335, 1613, 13, 4, 16, 11, 77, 0, 0, 0, 0, 0, 0],
                            [2013, this.Teams[26], 16, 276, 1275, 7, 5, 12, 9, 78, 0, 0, 0, 0, 0, 0]
                        ]
                    },
                    {
                        "Name": "Andre Johnson", "Team": this.Teams[8], "Headshot": "Images/Player Headshots/andre_johnson.png", "Positions": "WR", "Birthdate": new Date("1981-07-11"), "Height": "6'3\"", "Weight": "230", "ADP": 18.43,
                        "Stats": [
                            [2003, this.Teams[8], 16, 5, 10, 0, 0, 0, 66, 976, 4, 0, 0, 0, 0, 0],
                            [2004, this.Teams[8], 16, 4, 12, 0, 0, 0, 79, 1142, 6, 0, 0, 0, 0, 0],
                            [2005, this.Teams[8], 13, 6, 10, 0, 1, 0, 63, 688, 2, 0, 0, 0, 0, 0],
                            [2006, this.Teams[8], 16, 3, 14, 0, 0, 166, 103, 1147, 5, 0, 0, 0, 0, 0],
                            [2007, this.Teams[8], 9, 0, 0, 0, 0, 86, 60, 851, 8, 0, 0, 0, 0, 0],
                            [2008, this.Teams[8], 16, 0, 0, 0, 0, 170, 115, 1575, 8, 0, 0, 0, 0, 0],
                            [2009, this.Teams[8], 16, 2, 10, 0, 0, 170, 101, 1569, 9, 0, 0, 0, 0, 0],
                            [2010, this.Teams[8], 13, 2, 10, 0, 0, 138, 86, 1216, 8, 0, 0, 0, 0, 0],
                            [2011, this.Teams[8], 7, 1, 8, 0, 0, 51, 33, 492, 2, 0, 0, 0, 0, 0],
                            [2012, this.Teams[8], 16, 0, 0, 0, 0, 164, 112, 1598, 4, 0, 0, 0, 0, 0],
                            [2013, this.Teams[8], 16, 0, 0, 0, 0, 181, 109, 1407, 5, 0, 0, 0, 0, 0]
                        ]
                    },
                    {
                        "Name": "Cam Newton", "Team": this.Teams[20], "Headshot": "Images/Player Headshots/cam_newton.png", "Positions": "QB", "Birthdate": new Date("1989-05-11"), "Height": "6'5\"", "Weight": "245", "ADP": 9.2,
                        "Stats": [
                            [2011, this.Teams[16], 16, 126, 706, 14, 2, 1, 1, 27, 0, 310, 517, 4051, 21, 17],
                            [2012, this.Teams[16], 16, 127, 741, 8, 4, 0, 0, 0, 0, 280, 485, 3869, 19, 12],
                            [2013, this.Teams[16], 16, 111, 585, 6, 1, 0, 0, 0, 0, 292, 473, 3379, 24, 13]
                        ]
                    },
                    {
                        "Name": "Roddy White", "Team": this.Teams[6], "Headshot": "Images/Player Headshots/roddy_white.png", "Positions": "WR", "Birthdate": new Date("1981-11-02"), "Height": "6'0\"", "Weight": "211", "ADP": 22.64,
                        "Stats": [
                            [2005, this.Teams[6], 16, 4, 12, 0, 0, 0, 29, 446, 3, 0, 0, 0, 0, 0],
                            [2006, this.Teams[6], 16, 0, 0, 0, 0, 66, 30, 506, 0, 0, 0, 0, 0, 0],
                            [2007, this.Teams[6], 16, 1, 2, 0, 0, 137, 83, 1202, 6, 0, 0, 0, 0, 0],
                            [2008, this.Teams[6], 16, 2, 4, 0, 0, 148, 88, 1382, 7, 0, 0, 0, 0, 0],
                            [2009, this.Teams[6], 16, 1, 2, 0, 0, 165, 85, 1153, 11, 0, 0, 0, 0, 0],
                            [2010, this.Teams[6], 16, 1, 3, 0, 0, 179, 115, 1389, 10, 0, 0, 0, 0, 0],
                            [2011, this.Teams[6], 16, 0, 0, 0, 0, 181, 100, 1296, 8, 0, 0, 0, 0, 0],
                            [2012, this.Teams[6], 16, 0, 0, 0, 0, 143, 92, 1351, 7, 0, 0, 0, 0, 0],
                            [2013, this.Teams[6], 13, 0, 0, 0, 0, 99, 63, 711, 3, 0, 0, 0, 0, 0]
                        ]
                    },
                    {
                        "Name": "Randall Cobb", "Team": this.Teams[10], "Headshot": "Images/Player Headshots/randall_cobb.png", "Positions": "WR", "Birthdate": new Date("1990-08-22"), "Height": "5'10\"", "Weight": "192", "ADP": 22.64,
                        "Stats": [
                            [2011, this.Teams[10], 15, 2, 5, 0, 0, 31, 25, 375, 1, 0, 1, 0, 0, 0],
                            [2012, this.Teams[10], 15, 10, 132, 0, 0, 104, 80, 954, 8, 0, 0, 0, 0, 0],
                            [2013, this.Teams[10], 6, 4, 78, 0, 0, 46, 31, 433, 4, 0, 0, 0, 0, 0]
                        ]
                    },
                    {
                        "Name": "Jimmy Graham", "Team": this.Teams[0], "Headshot": "Images/Player Headshots/jimmy_graham.png", "Positions": "TE", "Birthdate": new Date("1986-11-24"), "ADP": 19.76,
                        "Stats": [
                            [2010, this.Teams[0], 15, 1, 3, 0, 0, 43, 31, 356, 5, 0, 0, 0, 0, 0],
                            [2011, this.Teams[0], 16, 0, 0, 0, 0, 149, 99, 1310, 11, 0, 0, 0, 0, 0],
                            [2012, this.Teams[0], 15, 0, 0, 0, 0, 135, 85, 982, 9, 0, 0, 0, 0, 0],
                            [2013, this.Teams[0], 16, 0, 0, 0, 0, 144, 86, 1215, 16, 0, 0, 0, 0, 0]
                        ]
                    },
                    {
                        "Name": "Julio Jones", "Team": this.Teams[6], "Headshot": "Images/Player Headshots/julio_jones.png", "Positions": "WR", "Birthdate": new Date("1989-02-03"), "Height": "6'3\"", "Weight": "220", "ADP": 19.79,
                        "Stats": [
                            [2011, this.Teams[6], 13, 6, 56, 0, 0, 96, 54, 959, 8, 0, 0, 0, 0, 0],
                            [2012, this.Teams[6], 16, 6, 30, 0, 0, 129, 79, 1198, 10, 0, 0, 0, 0, 0],
                            [2013, this.Teams[6], 5, 1, 7, 0, 0, 60, 41, 580, 2, 0, 0, 0, 0, 0]
                        ]
                    },
                    {
                        "Name": "Demaryius Thomas", "Team": this.Teams[29], "Headshot": "Images/Player Headshots/demaryius_thomas.png", "Positions": "WR", "Birthdate": new Date("1987-12-25"), "Height": "6'3\"", "Weight": "229", "ADP": 19.79,
                        "Stats": [
                            [2010, this.Teams[29], 10, 2, 1, 0, 1, 39, 22, 283, 2, 0, 0, 0, 0, 0],
                            [2011, this.Teams[29], 11, 1, 5, 0, 0, 70, 32, 551, 4, 0, 1, 0, 0, 0],
                            [2012, this.Teams[29], 16, 0, 0, 0, 0, 141, 94, 1434, 10, 0, 0, 0, 0, 0],
                            [2013, this.Teams[29], 16, 0, 0, 0, 0, 143, 92, 1430, 14, 0, 0, 0, 0, 0]
                        ]
                    },
                    {
                        "Name": "Darren McFadden", "Team": this.Teams[3], "Headshot": "Images/Player Headshots/darren_mcfadden.png", "Positions": "RB", "Birthdate": new Date("1987-08-27"), "Height": "6'1\"", "Weight": "218", "ADP": 13.79,
                        "Stats": [
                            [2008, this.Teams[3], 13, 113, 499, 4, 3, 39, 29, 285, 0, 0, 0, 0, 0, 0],
                            [2009, this.Teams[3], 12, 104, 357, 1, 4, 35, 21, 245, 0, 0, 0, 0, 0, 0],
                            [2010, this.Teams[3], 13, 223, 1157, 7, 3, 61, 47, 507, 3, 0, 1, 0, 0, 0],
                            [2011, this.Teams[3], 7, 113, 614, 4, 1, 23, 19, 154, 1, 0, 0, 0, 0, 0],
                            [2012, this.Teams[3], 12, 216, 707, 2, 1, 62, 42, 258, 1, 0, 0, 0, 0, 0],
                            [2013, this.Teams[3], 10, 114, 379, 5, 1, 26, 17, 108, 0, 1, 1, 16, 1, 0]
                        ]
                    }
                ];
                for (var i = 0; i < fp.length; i++) {
                    var fantasyPlayer = new FantasyPlayer();
                    fantasyPlayer.Rank = i + 1;
                    fantasyPlayer.Birthdate = fp[i]["Birthdate"];
                    fantasyPlayer.Headshot = fp[i]["Headshot"];
                    fantasyPlayer.Height = fp[i]["Height"];
                    fantasyPlayer.Name = fp[i]["Name"];
                    fantasyPlayer.PrimaryPosition = fp[i]["Positions"];
                    fantasyPlayer.Team = fp[i]["Team"];
                    fantasyPlayer.Weight = fp[i]["Weight"];
                    fantasyPlayer.ADP = fp[i]["ADP"];
                    fantasyPlayer.Stats = new Array();
                    var stats = fp[i]["Stats"];
                    if (stats) {
                        for (var j = 0; j < stats.length; j++) {
                            var array = stats[j];
                            var s = new Stats();
                            s.Year = array[0];
                            s.Team = array[1];
                            s.GamesPlayed = array[2];
                            s.RushingAttempts = array[3];
                            s.RushingYards = array[4];
                            s.RushingTouchdowns = array[5];
                            s.FumblesLost = array[6];
                            s.Targets = array[7];
                            s.Receptions = array[8];
                            s.ReceivingYards = array[9];
                            s.ReceivingTouchdowns = array[10];
                            s.Completions = array[11];
                            s.PassingAttempts = array[12];
                            s.PassingYards = array[13];
                            s.PassingTouchdowns = array[14];
                            s.Interceptions = array[15];
                            if (j === fp[i]["Stats"].length - 1)
                                fantasyPlayer.Projected = s;
                            else
                                fantasyPlayer.Stats.push(s);
                        }
                    }
                    this._fantasyPlayers.Add(fantasyPlayer);
                }
                return this._fantasyPlayers;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DemoNflDataProvider.prototype, "Positions", {
            get: function () {
                return ["ALL", "QB", "RB", "WR", "RB/WR", "TE"];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DemoNflDataProvider.prototype, "Teams", {
            get: function () {
                if (this._teams)
                    return this._teams;
                this._teams = [];
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
                    { "Abbreviation": "KAN", "Logo": "Images/Team Logos/KC.png", "Location": "Kansas City", "Nickname": "Chiefs", "ByeWeek": 7 },
                    { "Abbreviation": "NYG", "Logo": "Images/Team Logos/NYG.png", "Location": "New York", "Nickname": "Giants", "ByeWeek": 11 },
                    { "Abbreviation": "SD", "Logo": "Images/Team Logos/SD.png", "Location": "San Diego", "Nickname": "Chargers", "ByeWeek": 7 },
                    { "Abbreviation": "BUF", "Logo": "Images/Team Logos/BUF.png", "Location": "Buffalo", "Nickname": "Bills", "ByeWeek": 8 },
                    { "Abbreviation": "CAR", "Logo": "Images/Team Logos/CAR.png", "Location": "Carolina", "Nickname": "Panthers", "ByeWeek": 6 },
                    { "Abbreviation": "PIT", "Logo": "Images/Team Logos/PIT.png", "Location": "Pittsburgh", "Nickname": "Steelers", "ByeWeek": 4 },
                    { "Abbreviation": "BAL", "Logo": "Images/Team Logos/BAL.png", "Location": "Baltimore", "Nickname": "Ravens", "ByeWeek": 8 },
                    { "Abbreviation": "PHI", "Logo": "Images/Team Logos/PHI.png", "Location": "Philadelphia", "Nickname": "Eagles", "ByeWeek": 7 },
                    { "Abbreviation": "MIA", "Logo": "Images/Team Logos/MIA.png", "Location": "Miami", "Nickname": "Dolphins", "ByeWeek": 6 },
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
                    this._teams.push(team);
                }
                return this._teams;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DemoNflDataProvider.prototype, "FantasyPositions", {
            get: function () {
                var _fantasyPositions = [];
                var p = ["QB", "RB", "RB", "WR", "WR", "TE", "BE", "BE"];
                for (var i = 0; i < p.length; i++) {
                    _fantasyPositions.push(new FantasyPosition(p[i]));
                }
                return _fantasyPositions;
            },
            enumerable: true,
            configurable: true
        });
        return DemoNflDataProvider;
    })();
    return DemoNflDataProvider;
});
//# sourceMappingURL=DemoNflDataProvider.js.map