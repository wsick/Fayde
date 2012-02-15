/// <reference path="FrameworkTemplate.js"/>
/// CODE
/// <reference path="NameScope.js"/>
/// <reference path="../Markup/JsonParser.js"/>

//#region DataTemplate

function DataTemplate() {
    FrameworkTemplate.call(this);
}
DataTemplate.InheritFrom(FrameworkTemplate);

DataTemplate.CreateTemplateFromJson = function (json) {
    var template = new DataTemplate();
    var namescope = new NameScope();
    var parser = new JsonParser();
    var root = parser.CreateObject(json, namescope);
    NameScope.SetNameScope(root, namescope);
    template._Hijack(root);
    return template;
};

//#endregion