var Fayde;
(function (Fayde) {
    var AjaxRequest = (function () {
        function AjaxRequest(OnSuccess, OnError) {
            this.OnSuccess = OnSuccess;
            this.OnError = OnError;
            this.xmlhttp = null;
        }
        AjaxRequest.prototype.Get = function (url, query) {
            this._PrepareRequest();
            var fullUrl = url;
            if (query)
                fullUrl += "?" + query;
            this.xmlhttp.open("GET", fullUrl, true);
            this.xmlhttp.send();
        };
        AjaxRequest.prototype.Post = function (url, query, data) {
            this._PrepareRequest();
            var fullUrl = url;
            if (query)
                fullUrl += "?" + query;
            this.xmlhttp.open("POST", fullUrl, true);
            this.xmlhttp.send(data);
        };
        AjaxRequest.prototype.Cancel = function () {
            this.xmlhttp.abort();
        };

        AjaxRequest.prototype._PrepareRequest = function () {
            var _this = this;
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = function () {
                return _this._HandleStateChange();
            };
            this.xmlhttp = xmlhttp;
        };
        AjaxRequest.prototype._HandleStateChange = function () {
            if (this.xmlhttp.readyState === 4) {
                var req = this.xmlhttp;
                this.xmlhttp = undefined;
                if (req.status === 200) {
                    this.OnSuccess(new AjaxResult(req));
                } else {
                    this.OnError("Unsuccessful request: " + req.status);
                }
            }
        };
        return AjaxRequest;
    })();
    Fayde.AjaxRequest = AjaxRequest;

    var AjaxResult = (function () {
        function AjaxResult(xmlhttp) {
            this.xmlhttp = xmlhttp;
        }
        AjaxResult.prototype.GetData = function () {
            var data = this.xmlhttp.responseText;
            if (!data)
                return null;
            return data;
        };
        AjaxResult.prototype.CreateJson = function () {
            var data = this.xmlhttp.responseText;
            if (!data)
                return null;

            if ((window).JSON && JSON.parse) {
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
        AjaxResult.prototype.GetHeader = function (name) {
            return this.xmlhttp.getResponseHeader(name);
        };
        return AjaxResult;
    })();
})(Fayde || (Fayde = {}));
//# sourceMappingURL=AjaxRequest.js.map
