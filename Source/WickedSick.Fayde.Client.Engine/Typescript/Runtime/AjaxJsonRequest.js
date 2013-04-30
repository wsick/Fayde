var Fayde;
(function (Fayde) {
    var AjaxJsonResult = (function () {
        function AjaxJsonResult(xmlhttp) {
            this.xmlhttp = xmlhttp;
        }
        AjaxJsonResult.prototype.CreateJson = function () {
            var data = this.xmlhttp.responseText;
            if(!data) {
                return null;
            }
            if((window).JSON && JSON.parse) {
                try  {
                    return JSON.parse(data);
                } catch (err) {
                }
            }
            try  {
                return new Function("return " + data)();
            } catch (err) {
                throw new InvalidJsonException(data, err);
            }
        };
        AjaxJsonResult.prototype.GetHeader = function (name) {
            return this.xmlhttp.getResponseHeader(name);
        };
        return AjaxJsonResult;
    })();
    Fayde.AjaxJsonResult = AjaxJsonResult;    
    var AjaxJsonRequest = (function () {
        function AjaxJsonRequest(OnSuccess, OnError) {
            this.OnSuccess = OnSuccess;
            this.OnError = OnError;
            this.xmlhttp = null;
        }
        AjaxJsonRequest.prototype.Get = function (url, query) {
            this._PrepareRequest();
            var fullUrl = url;
            if(query) {
                fullUrl += "?" + query;
            }
            this.xmlhttp.open("GET", fullUrl, true);
            this.xmlhttp.send();
        };
        AjaxJsonRequest.prototype.Post = function (url, query, data) {
            this._PrepareRequest();
            var fullUrl = url;
            if(query) {
                fullUrl += "?" + query;
            }
            this.xmlhttp.open("POST", fullUrl, true);
            this.xmlhttp.send(data);
        };
        AjaxJsonRequest.prototype.Cancel = function () {
            this.xmlhttp.abort();
        };
        AjaxJsonRequest.prototype._PrepareRequest = function () {
            var _this = this;
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = function () {
                return _this._HandleStateChange();
            };
            this.xmlhttp = xmlhttp;
        };
        AjaxJsonRequest.prototype._HandleStateChange = function () {
            if(this.xmlhttp.readyState === 4) {
                var req = this.xmlhttp;
                this.xmlhttp = undefined;
                if(req.status === 200) {
                    this.OnSuccess(new AjaxJsonResult(req));
                } else {
                    this.OnError("Unsuccessful request: " + req.status);
                }
            }
        };
        return AjaxJsonRequest;
    })();
    Fayde.AjaxJsonRequest = AjaxJsonRequest;    
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=AjaxJsonRequest.js.map
