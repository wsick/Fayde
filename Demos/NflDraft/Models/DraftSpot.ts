/// <reference path="FantasyTeam.ts" />

module NflDraft.Models {
    export class DraftSpot {
        Round: Models.Round;
        Overall: number;
        Team: FantasyTeam;
    }
}