/// CODE
/// <reference path="../Core/NameScope.ts" />
/// <reference path="../Core/ResourceDictionary.ts" />
/// <reference path="../Controls/UserControl.ts" />
/// <reference path="../Controls/ControlTemplate.ts" />
/// <reference path="../Core/DataTemplate.ts" />

module Fayde {
    export class JsonParser {
        private _ResChain: any[] = [];
        private _RootXamlObject: XamlObject = null;
        private _TemplateBindingSource: DependencyObject = null;

        static Parse(json: any, templateBindingSource?: DependencyObject, namescope?: NameScope, resChain?: Fayde.ResourceDictionary[], rootXamlObject?: XamlObject): XamlObject {
            var parser = new JsonParser();
            if (resChain)
                parser._ResChain = resChain;
            parser._TemplateBindingSource = templateBindingSource;
            parser._RootXamlObject = rootXamlObject;

            if (!namescope)
                namescope = new Fayde.NameScope();

            //var app = App.Instance;
            //var perfTimer = new Fayde.PerfTimer();
            //perfTimer.ReportFunc = function (elapsed) { app._NotifyDebugParserPass(json.Type, elapsed); };
            //perfTimer.IsDisabled = app._DebugFunc[5] == null;

            //perfTimer.Start();
            var xobj = parser.CreateObject(json, namescope);
            //perfTimer.Stop();

            return xobj;
        }
        static ParseUserControl(uc: Controls.UserControl, json: any) {
            var parser = new JsonParser();
            parser._RootXamlObject = uc;
            parser.SetObject(json, uc, new Fayde.NameScope(true));
        }
        static ParseResourceDictionary(rd: Fayde.ResourceDictionary, json: any) {
            var parser = new JsonParser();
            parser._RootXamlObject = rd;
            parser.SetObject(json, rd, rd.XamlNode.NameScope);
        }

        CreateObject(json: any, namescope: NameScope, ignoreResolve?: bool): XamlObject {
            var type = json.Type;
            if (!type)
                return json;

            if (type === Number || type === String || type === Boolean)
                return json.Value;

            if (type === Controls.ControlTemplate) {
                var targetType = json.Props == null ? null : json.Props.TargetType;
                return new Controls.ControlTemplate(targetType, json.Content, this._ResChain);
            }
            if (type === DataTemplate)
                return new DataTemplate(json.Content, this._ResChain);

            var xobj = new type();
            if (!this._RootXamlObject)
                this._RootXamlObject = xobj;
            this.SetObject(json, xobj, namescope, ignoreResolve);
            return xobj;
        }
        SetObject(json: any, xobj: XamlObject, namescope: NameScope, ignoreResolve?: bool) {
            if (xobj && namescope)
                xobj.XamlNode.NameScope = namescope;
            //TODO: Implement
        }
    }
}