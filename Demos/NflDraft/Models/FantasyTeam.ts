module NflDraft.Models {
    export class FantasyTeam {
        Name: string;
        Roster: Fayde.Collections.ObservableCollection<Models.FantasyPosition>;

        constructor(name: string, roster: Fayde.Collections.ObservableCollection<Models.FantasyPosition>) {
            this.Name = name;
            this.Roster = roster;
        }
    }
}