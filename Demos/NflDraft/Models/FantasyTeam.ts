import FantasyPosition = require("Models/FantasyPosition");

class FantasyTeam {
    Name: string;
    Roster: FantasyPosition[];

    constructor(name: string, roster: FantasyPosition[]) {
        this.Name = name;
        this.Roster = roster;
    }
}
export = FantasyTeam;