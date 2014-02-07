import Player = require("Models/Player");
import Stats = require("Models/Stats");
import FantasyTeam = require("Models/FantasyTeam");

class FantasyPlayer extends Player {
    Rank: number;
    ADP: number;
    Projected: Stats;
    private _fantasyTeam: FantasyTeam;
    get FantasyTeam(): FantasyTeam {
        return this._fantasyTeam;
    }
    set FantasyTeam(value: FantasyTeam) {
        this._fantasyTeam = value;
        this.OnPropertyChanged("FantasyTeam");
    }
    private _visible: boolean = true;
    get Visible(): boolean {
        return this._visible;
    }
    set Visible(value: boolean) {
        this._visible = value;
        this.OnPropertyChanged("Visible");
    }
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