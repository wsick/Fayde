var NflDraft;
(function (NflDraft) {
    (function (Models) {
        var Team = (function () {
            function Team() {
            }
            Team.prototype.FullName = function () {
                return this.Location + " " + this.Nickname;
            };
            return Team;
        })();
        Models.Team = Team;
    })(NflDraft.Models || (NflDraft.Models = {}));
    var Models = NflDraft.Models;
})(NflDraft || (NflDraft = {}));
//@ sourceMappingURL=Team.js.map
