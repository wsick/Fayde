/// <reference path="../../scripts/Fayde.js"/>

var Fayde;
(function (Fayde) {
    var Demos;
    (function (Demos) {
        var SDB;
        (function (SDB) {
            var root = Nullstone.Create("root", Page);

            root.Instance.Init = function () {
                this.Init$Page();
                this.Loaded.Subscribe(this.OnLoaded, this);
            };

            root.Instance.OnLoaded = function (o, e) {
                alert("hey");
            };

            Nullstone.FinishCreate(root);
            SDB.root = root;
        })(SDB || (SDB = {}));
        Demos.SDB = SDB;
    })(Demos || (Demos = {}));
    Fayde.Demos = Demos;
})(Fayde || (Fayde = {}));