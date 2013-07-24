/// <reference path="Player.ts" />
/// <reference path="Stats.ts" />

module NflDraft.Models {
    export class PlayerStats {
        Player: Player;
        ADP: number;
        Projected: Stats;
        LastSeason: Stats;
    }
}