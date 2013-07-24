module NflDraft.Models {
    export class Team {
        Location: string;
        Nickname: string;
        Abbreviation: string;
        ByeWeek: number;
        Logo: string;

        FullName() {
            return this.Location + " " + this.Nickname;
        }
    }
}