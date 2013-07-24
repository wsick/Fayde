/// <reference path="DraftSpot.ts" />

module NflDraft.Models {
    export class Round {
        RoundNumber: number;
        DraftSpots: Array<DraftSpot>;
    }
}