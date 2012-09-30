/// <reference path="../Core/DependencyObject.js"/>
/// CODE

//#region CacheMode
var CacheMode = Nullstone.Create("CacheMode", DependencyObject);

CacheMode.Instance._GetTransform = function () { };

Nullstone.FinishCreate(CacheMode);
//#endregion