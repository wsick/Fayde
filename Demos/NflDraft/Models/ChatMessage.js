var NflDraft;
(function (NflDraft) {
    (function (Models) {
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
        Models.Team = Team;
    })(NflDraft.Models || (NflDraft.Models = {}));
    var Models = NflDraft.Models;
})(NflDraft || (NflDraft = {}));
//# sourceMappingURL=ChatMessage.js.map
