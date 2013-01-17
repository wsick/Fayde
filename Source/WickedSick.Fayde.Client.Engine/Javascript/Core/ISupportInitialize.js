/// <reference path="../Runtime/Nullstone.js"/>
/// CODE

//#region ISupportInitialize
var ISupportInitialize = Nullstone.Create("ISupportInitialize");

(function (namespace) {
    var ISupportInitialize = Nullstone.Create("ISupportInitialize");

    ISupportInitialize.Instance.BeginInit = function () { };
    ISupportInitialize.Instance.EndInit = function () { };

    namespace.ISupportInitialize = Nullstone.FinishCreate(ISupportInitialize);
})(window);

Nullstone.FinishCreate(ISupportInitialize);
//#endregion