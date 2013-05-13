/// <reference path="Markup.ts" />
/// CODE
/// <reference path="../Data/BindingExpression.ts" />

module Fayde {
    export interface IBindingData {
        Path: string;
        FallbackValue: any;
        Mode: Data.BindingMode;
        StringFormat: string;
    }

    export class BindingMarkup extends Markup {
        private _Data: IBindingData;
        constructor(data: any) {
            super();
            if (!data) data = {};
            this._Data = data;
        }

        Transmute(target: XamlObject, propd: DependencyProperty, propName: string, templateBindingSource: DependencyObject, resChain: ResourceDictionary[]) {
            return new Data.BindingExpression(this._BuildBinding(), <DependencyObject>target, propd);
        }
        private _BuildBinding(): Data.Binding {
            var b = new Fayde.Data.Binding(this._Data.Path);
            if (this._Data.FallbackValue !== undefined)
                b.FallbackValue = this._Data.FallbackValue;
            if (this._Data.Mode !== undefined)
                b.Mode = this._Data.Mode;
            if (this._Data.StringFormat !== undefined)
                b.StringFormat = this._Data.StringFormat;
            //TODO: Finish
            return b;
        }
    }
    Nullstone.RegisterType(BindingMarkup, "BindingMarkup");
}