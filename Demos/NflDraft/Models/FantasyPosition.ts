module NflDraft.Models {
    export class FantasyPosition extends Fayde.MVVM.ObservableObject {
        Position: string;
        private _player: Models.Player;
        get Player(): Models.Player {
            return this._player;
        }
        set Player(value: Models.Player) {
            this._player = value;
            this.OnPropertyChanged("Player");
        }

        constructor(position: string) {
            super();
            this.Position = position;
        }
    }
}