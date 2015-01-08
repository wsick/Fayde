define(["require", "exports"], function (require, exports) {
    var Team = (function () {
        function Team() {
        }
        Object.defineProperty(Team.prototype, "FullName", {
            get: function () {
                return this.Location + " " + this.Nickname;
            },
            enumerable: true,
            configurable: true
        });
        return Team;
    })();
    return Team;
});
//# sourceMappingURL=Team.js.map