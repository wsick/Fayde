/// <reference path="DraftSpot.ts" />
/// <reference path="Team.ts" />
/// <reference path="Stats.ts" />

module NflDraft.Models {
    export class Player {
        Team: Team;
        Name: string;
        Positions: Array<string>;
        Headshot: string;
        Birthdate: Date;
        Height: string;
        Weight: string;
        Stats: Array<Models.Stats>;
    }
}