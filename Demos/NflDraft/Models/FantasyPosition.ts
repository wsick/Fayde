import Player = require("Models/Player");

class FantasyPosition extends Fayde.MVVM.ObservableObject {
    Position: string;
    private _player: Player;
    get Player(): Player {
        return this._player;
    }
    set Player(value: Player) {
        this._player = value;
        this.OnPropertyChanged("Player");
    }

    constructor(position: string) {
        super();
        this.Position = position;
    }
}
export = FantasyPosition;