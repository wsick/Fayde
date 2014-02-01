import Team = require("Models/Team");

class Stats {
    Year: number;
    Team: Team;
    GamesPlayed: number;
    Completions: number = 0;
    PassingAttempts: number = 0;
    PassingYards: number = 0;
    PassingTouchdowns: number = 0;
    Interceptions: number = 0;
    Fumbles: number = 0;
    FumblesLost: number = 0;
    QBR: number = 0;
    Rating: number = 0;
    RushingAttempts: number = 0;
    RushingYards: number = 0;
    get RushingAverage() { return this.RushingYards / this.RushingAttempts; }
    RushingTouchdowns: number = 0;
    Targets: number = 0;
    Receptions: number = 0;
    ReceivingYards: number = 0;
    get ReceivingAverage() { return this.ReceivingYards / this.Receptions; }
    ReceivingTouchdowns: number = 0;
    get FantasyPoints() {
        var passingPoints = (this.PassingYards / 25) + (this.PassingTouchdowns * 4) + (this.Interceptions * -2);
        var rushingPoints = (this.RushingYards / 10) + (this.RushingTouchdowns * 6);
        var receivingPoints = (this.ReceivingYards / 10) + (this.ReceivingTouchdowns * 6);
        return passingPoints + rushingPoints + receivingPoints + (this.FumblesLost * -2);
    }
}
export = Stats;