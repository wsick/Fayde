/// <reference path="Team.ts" />

module NflDraft.Models {
    export class Stats {
        Team: Team;
        GamesPlayed: number;
        Completions: number;
        PassingAttempts: number;
        PassingYards: number;
        PassingTouchdowns: number;
        Interceptions: number;
        Fumbles: number;
        FumblesLost: number;
        QBR: number;
        Rating: number;
        RushingAttempts: number;
        RushingYards: number;
        RushingAverage() { return this.RushingYards / this.RushingAttempts; }
        RushingTouchdowns: number;
        Targets: number;
        Receptions: number;
        ReceivingYards: number;
        ReceivingAverage() { return this.ReceivingYards / this.Receptions; }
        ReceivingTouchdowns: number;
    }
}