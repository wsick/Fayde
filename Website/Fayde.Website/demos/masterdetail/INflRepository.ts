/// <reference path="Player.ts"/>

module MasterDetail {
    interface INflRepository {
        getPlayers(): NFL.Player[];
    }
}