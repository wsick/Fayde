import FantasyPosition = require("Models/FantasyPosition");

class FantasyTeam {
    Name: string;
    Roster: Fayde.Collections.ObservableCollection<FantasyPosition>;

    constructor(name: string, roster: Fayde.Collections.ObservableCollection<FantasyPosition>) {
        this.Name = name;
        this.Roster = roster;
    }
}
export = FantasyTeam;