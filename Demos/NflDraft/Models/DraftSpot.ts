import Round = require("Models/Round");
import FantasyTeam = require("Models/FantasyTeam");

class DraftSpot {
    Round: Round;
    Overall: number;
    Team: FantasyTeam;
}
export = DraftSpot;