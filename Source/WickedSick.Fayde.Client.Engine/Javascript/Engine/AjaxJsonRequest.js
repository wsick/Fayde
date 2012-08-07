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
    if (this.xmlhttp.readyState == 4) {
        if (this.xmlhttp.status == 200) {
            var responseJson = {};
            try {
                if (this.xmlhttp.responseText)
                    responseJson = eval("(" + this.xmlhttp.responseText + ")");
            } catch (err) {
                this.OnError("Could not create json from response.");
                return;
            }
            this.OnSuccess(responseJson);
        } else {
            this.OnError("Unsuccessful request: " + this.xmlhttp.status);
        }
    }
};