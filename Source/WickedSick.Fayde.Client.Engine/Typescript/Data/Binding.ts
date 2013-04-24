/// <reference path="BindingBase.ts" />
/// CODE
/// <reference path="RelativeSource.ts" />

module Fayde.Data {
    export interface IValueConverter {
        Convert(value: any, targetType: Function, parameter: any, culture: any): any;
        ConvertBack(value: any, targetType: Function, parameter: any, culture: any): any;
    }

    export class Binding extends BindingBase {
        private _Converter: IValueConverter;
        private _ConverterCulture: any;
        private _ElementName: string;
        private _Mode: BindingMode = BindingMode.OneWay;
        private _NotifyOnValidationError: bool = false;
        private _RelativeSource: RelativeSource;
        private _Path: PropertyPath;
        private _Source: any;
        private _UpdateSourceTrigger: UpdateSourceTrigger = UpdateSourceTrigger.Default;
        private _ValidationsOnExceptions: bool = false;
        private _ValidatesOnDataErrors: bool = false;
        private _ValidatesOnNotifyDataErrors: bool = true;

        constructor(path: string) {
            super();
            if (!path) path = "";
            this._Path = new PropertyPath(path);
        }

        get Converter(): IValueConverter { return this._Converter; }
        set Converter(value: IValueConverter) {
            this.CheckSealed();
            this._Converter = value;
        }
        
        get ConverterCulture(): any { return this._ConverterCulture; }
        set ConverterCulture(value: any) {
            this.CheckSealed();
            this._ConverterCulture = value;
        }
        
        get ElementName(): string { return this._ElementName; }
        set ElementName(value: string) {
            this.CheckSealed();
            this._ElementName = value;
        }
        
        get Mode(): BindingMode { return this._Mode; }
        set Mode(value: BindingMode) {
            this.CheckSealed();
            this._Mode = value;
        }
        
        get NotifyOnValidationError(): bool { return this._NotifyOnValidationError; }
        set NotifyOnValidationError(value: bool) {
            this.CheckSealed();
            this._NotifyOnValidationError = value;
        }
        
        get RelativeSource(): RelativeSource { return this._RelativeSource; }
        set RelativeSource(value: RelativeSource) {
            this.CheckSealed();
            this._RelativeSource = value;
        }
        
        get Path(): PropertyPath { return this._Path; }
        set Path(value: PropertyPath) {
            this.CheckSealed();
            this._Path = value;
        }
        
        get Source(): any { return this._Source; }
        set Source(value: any) {
            this.CheckSealed();
            this._Source = value;
        }
        
        get UpdateSourceTrigger(): UpdateSourceTrigger { return this._UpdateSourceTrigger; }
        set UpdateSourceTrigger(value: UpdateSourceTrigger) {
            this.CheckSealed();
            this._UpdateSourceTrigger = value;
        }
        
        get ValidationsOnExceptions(): bool { return this._ValidationsOnExceptions; }
        set ValidationsOnExceptions(value: bool) {
            this.CheckSealed();
            this._ValidationsOnExceptions = value;
        }
        
        get ValidatesOnDataErrors(): bool { return this._ValidatesOnDataErrors; }
        set ValidatesOnDataErrors(value: bool) {
            this.CheckSealed();
            this._ValidatesOnDataErrors = value;
        }
        
        get ValidatesOnNotifyDataErrors(): bool { return this._ValidatesOnNotifyDataErrors; }
        set ValidatesOnNotifyDataErrors(value: bool) {
            this.CheckSealed();
            this._ValidatesOnNotifyDataErrors = value;
        }

    }
    Nullstone.RegisterType(Binding, "Binding");
}