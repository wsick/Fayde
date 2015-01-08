var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports"], function (require, exports) {
    var FantasyPosition = (function (_super) {
        __extends(FantasyPosition, _super);
        function FantasyPosition(position) {
            _super.call(this);
            this.Position = position;
        }
        Object.defineProperty(FantasyPosition.prototype, "Player", {
            get: function () {
                return this._player;
            },
            set: function (value) {
                this._player = value;
                this.OnPropertyChanged("Player");
            },
            enumerable: true,
            configurable: true
        });
        return FantasyPosition;
    })(Fayde.MVVM.ObservableObject);
    return FantasyPosition;
});
//# sourceMappingURL=FantasyPosition.js.map