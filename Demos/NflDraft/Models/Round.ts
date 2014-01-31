import DraftSpot = require("Models/DraftSpot");

class Round {
    RoundNumber: number;
    DraftSpots: Fayde.Collections.ObservableCollection<DraftSpot>;
}
export = Round;