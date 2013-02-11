var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Fayde;
(function (Fayde) {
    (function (Demos) {
        (function (SDB) {
            var root = (function (_super) {
                __extends(root, _super);
                function root() {
                    _super.apply(this, arguments);

                }
                return root;
            })(Fayde.Controls.Page);
            SDB.root = root;            
            Nullstone.RegisterType(root, "root", Fayde.Controls.Page);
        })(Demos.SDB || (Demos.SDB = {}));
        var SDB = Demos.SDB;
    })(Fayde.Demos || (Fayde.Demos = {}));
    var Demos = Fayde.Demos;
})(Fayde || (Fayde = {}));
