/// CODE
/// <reference path="../Core/NameScope.ts" />
/// <reference path="../Core/ResourceDictionary.ts" />
/// <reference path="../Controls/UserControl.ts" />
/// <reference path="../Controls/ControlTemplate.ts" />
/// <reference path="../Core/DataTemplate.ts" />
var Fayde;
(function (Fayde) {
    var JsonParser = (function () {
        function JsonParser() {
            this._ResChain = [];
            this._RootXamlObject = null;
            this._TemplateBindingSource = null;
        }
        JsonParser.Parse = function Parse(json, templateBindingSource, namescope, resChain, rootXamlObject) {
            var parser = new JsonParser();
            if(resChain) {
                parser._ResChain = resChain;
            }
            parser._TemplateBindingSource = templateBindingSource;
            parser._RootXamlObject = rootXamlObject;
            if(!namescope) {
                namescope = new Fayde.NameScope();
            }
            //var app = App.Instance;
            //var perfTimer = new Fayde.PerfTimer();
            //perfTimer.ReportFunc = function (elapsed) { app._NotifyDebugParserPass(json.Type, elapsed); };
            //perfTimer.IsDisabled = app._DebugFunc[5] == null;
            //perfTimer.Start();
            var xobj = parser.CreateObject(json, namescope);
            //perfTimer.Stop();
            return xobj;
        };
        JsonParser.ParseUserControl = function ParseUserControl(uc, json) {
            var parser = new JsonParser();
            parser._RootXamlObject = uc;
            parser.SetObject(json, uc, new Fayde.NameScope(true));
        };
        JsonParser.ParseResourceDictionary = function ParseResourceDictionary(rd, json) {
            var parser = new JsonParser();
            parser._RootXamlObject = rd;
            parser.SetObject(json, rd, rd.XamlNode.NameScope);
        };
        JsonParser.prototype.CreateObject = function (json, namescope, ignoreResolve) {
            var type = json.Type;
            if(!type) {
                return json;
            }
            if(type === Number || type === String || type === Boolean) {
                return json.Value;
            }
            if(type === Fayde.Controls.ControlTemplate) {
                var targetType = json.Props == null ? null : json.Props.TargetType;
                return new Fayde.Controls.ControlTemplate(targetType, json.Content, this._ResChain);
            }
            if(type === Fayde.DataTemplate) {
                return new Fayde.DataTemplate(json.Content, this._ResChain);
            }
            var xobj = new type();
            if(!this._RootXamlObject) {
                this._RootXamlObject = xobj;
            }
            this.SetObject(json, xobj, namescope, ignoreResolve);
            return xobj;
        };
        JsonParser.prototype.SetObject = function (json, xobj, namescope, ignoreResolve) {
            if(xobj && namescope) {
                xobj.XamlNode.NameScope = namescope;
            }
            //TODO: Implement
                    };
        return JsonParser;
    })();
    Fayde.JsonParser = JsonParser;    
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=JsonParser.js.map
