var MasterDetail;
(function (MasterDetail) {
    var Default = (function () {
        function Default(repository) {
            this._repository = repository;
            Object.defineProperty(this, "Players", {
                get: function () {
                    return this._Players;
                },
                set: function (value) {
                    this._Players = value;
                    this.PropertyChanged.Raise(this, {
                    });
                }
            });
        }
        Default.prototype.Load = function () {
            this.Players = this._repository.getPlayers();
        };
        return Default;
    })();
    MasterDetail.Default = Default;    
})(MasterDetail || (MasterDetail = {}));

