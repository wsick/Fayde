
(function (namespace) {
    function AjaxJsonRequest(onSuccess, onError) {
        this.OnSuccess = onSuccess;
        this.OnError = onError;
    }

    AjaxJsonRequest.prototype.Get = function (url, query) {
        this._PrepareRequest();
        var fullUrl = url;
        if (query)
            fullUrl += "?" + query;
        this.xmlhttp.open("GET", fullUrl, true);
        this.xmlhttp.send();
    };
    AjaxJsonRequest.prototype.Post = function (url, query, data) {
        this._PrepareRequest();
        var fullUrl = url;
        if (query)
            fullUrl += "?" + query;
        this.xmlhttp.open("POST", fullUrl, true);
        this.xmlhttp.send(data);
    };

    AjaxJsonRequest.prototype.Cancel = function () {
        this.xmlhttp.abort();
    };

    AjaxJsonRequest.prototype._PrepareRequest = function () {
        var xmlhttp;
        if (window.XMLHttpRequest) {
            // code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
        } else {
            // code for IE6, IE5
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        var ajr = this;
        xmlhttp.onreadystatechange = function () { ajr._HandleStateChange(); };
        this.xmlhttp = xmlhttp;
    };
    AjaxJsonRequest.prototype._HandleStateChange = function () {
        if (this.xmlhttp.readyState === 4) {
            if (this.xmlhttp.status === 200) {
                this.OnSuccess(new AjaxJsonResult(this.xmlhttp));
            } else {
                this.OnError("Unsuccessful request: " + this.xmlhttp.status);
            }
        }
    };
    namespace.AjaxJsonRequest = AjaxJsonRequest;
})(window);

(function (namespace) {
    function AjaxJsonResult(xmlhttp) {
        this.xmlhttp = xmlhttp;
    }
    AjaxJsonResult.prototype.CreateJson = function () {
        var data = this.xmlhttp.responseText;
        if (!data)
            return null;

        if (window.JSON && window.JSON.parse) {
            try {
                return window.JSON.parse(data);
            } catch (err) {
            }
        }

        try {
            return new Function("return " + data)();
        } catch (err) {
            throw new InvalidJsonException(data, err);
        }
    };
    AjaxJsonResult.prototype.GetHeader = function (name) {
        return this.xmlhttp.getResponseHeader(name);
    };
    namespace.AjaxJsonResult = AjaxJsonResult;
})(window);