/// <reference path="Player.ts" />
/// <reference path="Stats.ts" />

module NflDraft.Models {
    export class FantasyPlayer extends Player {
        Rank: number;
        ADP: number;
        Projected: Stats;
        get LastSeason() {
            if (this.Stats != undefined)
                return this.Stats[2012];
            else {
                return null;
            }
        }
        get PlayerDisplay() {
            return this.Name + " " + this.Team.Abbreviation + " - " + this.Positions.toString();
        }
    }
}