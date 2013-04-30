var Fayde;
(function (Fayde) {
    var XamlResolver = (function () {
        function XamlResolver(OnSuccess, OnSubSuccess, OnError) {
            this.OnSuccess = OnSuccess;
            this.OnSubSuccess = OnSubSuccess;
            this.OnError = OnError;
            this._IsXamlLoaded = false;
            this._IsScriptLoaded = false;
            this._BaseHref = null;
            this._ScriptResult = null;
            this._XamlResult = null;
        }
        XamlResolver.prototype.Load = function (href, hash) {
            var _this = this;
            this._BaseHref = href;
            var xamlRequest = new Fayde.AjaxJsonRequest(function (result) {
                return _this._HandleXamlSuccess(result);
            }, function (error) {
                return _this._HandleXamlFailed(error);
            });
            xamlRequest.Get(href, "p=" + hash);
            Nullstone.ImportJsFile(href + "?js=true&p=" + hash, function (script) {
                return _this._HandleScriptSuccess(script);
            });
        };
        XamlResolver.prototype.LoadGeneric = function (href, hash) {
            var _this = this;
            this._BaseHref = href;
            var xamlRequest = new Fayde.AjaxJsonRequest(function (result) {
                return _this._HandleXamlSuccess(result);
            }, function (error) {
                return _this._HandleXamlFailed(error);
            });
            xamlRequest.Get(href, hash);
            Nullstone.ImportJsFile(href + "?js=true&" + hash, function (script) {
                return _this._HandleScriptSuccess(script);
            });
        };
        XamlResolver.prototype._HandleScriptSuccess = function (script) {
            this._IsScriptLoaded = true;
            this._ScriptResult = script;
            this._CheckIfLoaded();
        };
        XamlResolver.prototype._HandleXamlSuccess = function (result) {
            this._IsXamlLoaded = true;
            this._XamlResult = result;
            this._CheckIfLoaded();
        };
        XamlResolver.prototype._HandleXamlFailed = function (error) {
            this.OnError(error);
        };
        XamlResolver.prototype._CheckIfLoaded = function () {
            var _this = this;
            if(!this._IsXamlLoaded || !this._IsScriptLoaded) {
                return;
            }
            this.ResolveDependencies(function () {
                return _this.OnSuccess(_this._XamlResult, _this._ScriptResult);
            }, function (error) {
                return _this.OnError(error);
            });
        };
        XamlResolver.prototype.ResolveDependencies = function (onResolve, onFail) {
            var dependencies = this._XamlResult.GetHeader("Dependencies");
            if(!dependencies) {
                onResolve();
                return;
            }
            var resolvers = dependencies.split("|");
            var len = resolvers.length;
            if(len < 1) {
                onResolve();
                return;
            }
            var completes = [];
            for(var i = 0; i < len; i++) {
                completes[i] = false;
            }
            function isFullyResolved(completedIndex) {
                completes[completedIndex] = true;
                for(var j = 0; j < len; j++) {
                    if(!completes[j]) {
                        return false;
                    }
                }
                return true;
            }
            for(var i = 0; i < len; i++) {
                resolve(this._BaseHref, resolvers[i], i, isFullyResolved, onResolve, this.OnSubSuccess, onFail);
            }
        };
        return XamlResolver;
    })();
    Fayde.XamlResolver = XamlResolver;    
    function resolve(href, hash, index, isFullyResolved, onSuccess, onSubSuccess, onFail) {
        var os = (function () {
            return function (xamlResult, scriptResult) {
                if(onSubSuccess) {
                    onSubSuccess(xamlResult, scriptResult);
                }
                if(isFullyResolved(index)) {
                    onSuccess();
                }
            };
        })();
        var resolver = new XamlResolver(os, onSubSuccess, onFail);
        resolver.LoadGeneric(href, hash);
    }
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=XamlResolver.js.map
