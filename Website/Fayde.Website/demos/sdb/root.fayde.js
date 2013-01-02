/// <reference path="../../scripts/Fayde.js"/>

var Fayde;
(function (Fayde) {
    (function (Demos) {
        (function (SDB) {
            var root = Nullstone.Create("root", Page);

            root.Instance.Init = function () {
                this.Init$Page();
            };

            Nullstone.FinishCreate(root);
            SDB.root = root;
        })(Demos.SDB || (Demos.SDB = {}));
        var SDB = Demos.SDB;
    })(Fayde.Demos || (Fayde.Demos = {}));
    var Demos = Fayde.Demos;
})(Fayde || (Fayde = {}));