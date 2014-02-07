/// <reference path="DraftSpot.ts" />

import Team = require("Models/Team");
import Stats = require("Models/Stats");

class Player extends Fayde.MVVM.ObservableObject {
    Team: Team;
    Name: string;
    PrimaryPosition: string;
    Headshot: string;
    Birthdate: Date;
    Height: string;
    Weight: string;
    Stats: Array<Stats>;
}
export = Player;