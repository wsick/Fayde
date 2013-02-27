/// <reference path="../Runtime/Nullstone.js"/>

(function (Fayde) {
    var XamlResolver = Nullstone.Create("XamlResolver", undefined, 3);

    XamlResolver.Instance.Init = function (onSuccess, subOnSuccess, onError) {
        this._IsXamlLoaded = false;
        this._IsScriptLoaded = false;
        this.OnSuccess = onSuccess;
        this.SubOnSuccess = subOnSuccess;
        this.OnError = onError;
    };

    XamlResolver.Instance.Load = function (href, hash) {
        this._BaseHref = href;
        var that = this;
        var xamlRequest = new AjaxJsonRequest(function (result) { that._HandleXamlSuccess(result); }, function (error) { that._HandleXamlFailed(error); });
        xamlRequest.Get(href, "p=" + hash);
        Nullstone.ImportJsFile(href + "?js=true&p=" + hash, function (script) { that._HandleScriptSuccess(script); });
    };
    XamlResolver.Instance.LoadGeneric = function (href, hash) {
        this._BaseHref = href;
        var that = this;
        var xamlRequest = new AjaxJsonRequest(function (result) { that._HandleXamlSuccess(result); }, function (error) { that._HandleXamlFailed(error); });
        xamlRequest.Get(href, hash);
        Nullstone.ImportJsFile(href + "?js=true&" + hash, function (script) { that._HandleScriptSuccess(script); });
    };

    XamlResolver.Instance._HandleScriptSuccess = function (script) {
        this._IsScriptLoaded = true;
        this._ScriptResult = script;
        this._CheckIfLoaded();
    };
    XamlResolver.Instance._HandleXamlSuccess = function (result) {
        this._IsXamlLoaded = true;
        this._XamlResult = result;
        this._CheckIfLoaded();
    };
    XamlResolver.Instance._HandleXamlFailed = function (error) {
        this.OnError(error);
    };
    XamlResolver.Instance._CheckIfLoaded = function () {
        if (!this._IsXamlLoaded || !this._IsScriptLoaded)
            return;
        var that = this;
        this.ResolveDependencies(function () { that.OnSuccess(that._XamlResult, that._ScriptResult); },
            function (error) { that.OnError(error); });
    };
    function parseDependencies(dependenciesString) {
        /// <param name="dependenciesString" type="String"></param>
        /// <returns type="[]" />
        var funcs = [];
        
        var tokens = dependenciesString.split("|");
        var len = tokens.length;
        var completes = [];
        for (var i = 0; i < len; i++) {
            completes.push(false);
            var hash = tokens[i];
            var cur = i;
            funcs.push(function (href, s, f, e) {
                var resolver = new XamlResolver(
                    function (xamlResult, scriptResult) {
                        f(xamlResult, scriptResult);
                        completes[cur] = true;
                        for (var j = 0; j < len; j++) {
                            if (!completes[j])
                                return;
                        }
                        s();
                    },
                    f,
                    function (error) { e(error); });
                resolver.LoadGeneric(href, hash);
            });
        }

        return funcs;
    }
    XamlResolver.Instance.ResolveDependencies = function (onResolve, onFail) {
        var dependencies = this._XamlResult.GetHeader("Dependencies");
        if (!dependencies) {
            onResolve();
            return;
        }

        var resolvers = parseDependencies(dependencies);
        var len = resolvers.length;
        if (len < 1) {
            onResolve();
            return;
        }

        for (var i = 0; i < len; i++) {
            resolvers[i](this._BaseHref, onResolve, this.SubOnSuccess, onFail);
        }
    };

    Fayde.XamlResolver = Nullstone.FinishCreate(XamlResolver);
})(Nullstone.Namespace("Fayde"));