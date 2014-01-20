import Player = require("Models/Player");
import Stats = require("Models/Stats");

class FantasyPlayer extends Player {
    Rank: number;
    ADP: number;
    Projected: Stats;
    get LastSeason() {
        if (this.Stats != undefined) {
            var result = this.Stats.filter((stat: Stats) => { return stat.Year === 2012; });
            if (result.length === 1) return result[0];
            else return null;
        }
        else {
            return null;
        }
    }
    get PlayerDisplay() {
        return this.Name + " " + this.Team.Abbreviation + " - " + this.PrimaryPosition;
    }
}
export = FantasyPlayer;