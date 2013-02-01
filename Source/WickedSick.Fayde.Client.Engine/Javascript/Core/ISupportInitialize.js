/// <reference path="../Runtime/Nullstone.js"/>
/// CODE

(function (namespace) {
    var ISupportInitialize = Nullstone.Create("ISupportInitialize");

    ISupportInitialize.Instance.BeginInit = function () { };
    ISupportInitialize.Instance.EndInit = function () { };

    namespace.ISupportInitialize = Nullstone.FinishCreate(ISupportInitialize);
})(Nullstone.Namespace("Fayde"));