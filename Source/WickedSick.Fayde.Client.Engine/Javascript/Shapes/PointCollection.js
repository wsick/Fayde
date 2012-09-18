/// <reference path="../Core/Collections/Collection.js"/>
/// CODE

//#region PointCollection
var PointCollection = Nullstone.Create("PointCollection", Collection);

PointCollection.Instance.Init = function () {
    this.Init$Collection();
};

Nullstone.FinishCreate(PointCollection);
//#endregion