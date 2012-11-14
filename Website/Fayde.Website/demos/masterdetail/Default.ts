/// <reference path="INflRepository.ts"/>

module MasterDetail {
    export class Default {
        private _Players: NFL.Player[];
        private _repository: MasterDetail.INflRepository;
        public PropertyChanged: any;
        
        constructor (repository: MasterDetail.INflRepository) {
            this._repository = repository;
            this.PropertyChanged = new MulticastEvent();
            autoproperty(this, "Players");
            Object.defineProperty(this, "Players", {
                get: function () {
                    return this._Players;
                },
                set: function (value) {
                    this._Players = value;
                    this.PropertyChanged.Raise(this, {});
                }
            });
        }
        public Load() {
            this.Players = this._repository.getPlayers();
        }

        public Players: NFL.Player[];
    }
}

function autoproperty(obj, name) { 
    var t;
    Object.defineProperty(obj, name, {
        get: function () {
            return t;
        },
        set: function (value) {
            t = value;
                }
    });
}