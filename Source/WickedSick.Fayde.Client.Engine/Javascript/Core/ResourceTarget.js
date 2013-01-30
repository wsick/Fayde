/// <reference path="../Runtime/Nullstone.js"/>
/// CODE
/// <reference path="../Markup/JsonParser.js"/>

(function (Fayde) {
    var ResourceTarget = Nullstone.Create("ResourceTarget", undefined, 4);

    ResourceTarget.Instance.Init = function (json, namescope, templateBindingSource, resChain) {
        this._Json = json;
        this._Namescope = namescope;
        this._TemplateBindingSource = templateBindingSource;
        this._ResChain = resChain;
    };

    ResourceTarget.Instance.CreateResource = function () {
        return JsonParser.Parse(this._Json, this._Namescope, this._TemplateBindingSource, this._ResChain);
    };

    Fayde.ResourceTarget = Nullstone.FinishCreate(ResourceTarget);
})(Nullstone.Namespace("Fayde"));