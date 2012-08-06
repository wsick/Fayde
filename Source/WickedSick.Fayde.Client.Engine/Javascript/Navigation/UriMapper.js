/// <reference path="../Runtime/Nullstone.js"/>
///CODE
/// <reference path="../Primitives/Uri.js"/>

//#region UriMapper
var UriMapper = Nullstone.Create("UriMapper");

Nullstone.AutoProperty(UriMapper, "UriMappings");

UriMapper.Instance.MapUri = function (uri) {
    /// <param name="uri" type="Uri"></param>
};

//#region Annotations

UriMapper.Annotations = {
    ContentProperty: "UriMappings"
};

//#endregion

Nullstone.FinishCreate(UriMapper);
//#endregion