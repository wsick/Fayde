/// <reference path="BindingBase.ts" />
/// CODE
/// <reference path="RelativeSource.ts" />

module Fayde.Data {
    export interface IValueConverter {
        Convert(value: any, targetType: IType, parameter: any, culture: any): any;
        ConvertBack(value: any, targetType: IType, parameter: any, culture: any): any;
    }

    export class Binding extends BindingBase {
        private _BindsDirectlyToSource: boolean = false;
        private _Converter: IValueConverter;
        private _ConverterParameter: any;
        private _ConverterCulture: any;
        private _ElementName: string;
        private _Mode: BindingMode = BindingMode.OneWay;
        private _NotifyOnValidationError: boolean = false;
        private _RelativeSource: RelativeSource;
        private _Path: Data.PropertyPath;
        private _Source: any;
        private _UpdateSourceTrigger: UpdateSourceTrigger = UpdateSourceTrigger.Default;
        private _ValidatesOnExceptions: boolean = false;
        private _ValidatesOnDataErrors: boolean = false;
        private _ValidatesOnNotifyDataErrors: boolean = true;

        constructor(path: string) {
            super();
            if (!path) path = "";
            this._Path = new PropertyPath(path);
        }

        get BindsDirectlyToSource(): boolean { return this._BindsDirectlyToSource; }
        set BindsDirectlyToSource(value: boolean) {
            this.CheckSealed();
            this._BindsDirectlyToSource = value;
        }

        get Converter(): IValueConverter { return this._Converter; }
        set Converter(value: IValueConverter) {
            this.CheckSealed();
            this._Converter = value;
        }

        get ConverterParameter(): any { return this._ConverterParameter; }
        set ConverterParameter(value: any) {
            this.CheckSealed();
            this._ConverterParameter = value;
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
        
        get NotifyOnValidationError(): boolean { return this._NotifyOnValidationError; }
        set NotifyOnValidationError(value: boolean) {
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
        
        get ValidatesOnExceptions(): boolean { return this._ValidatesOnExceptions; }
        set ValidatesOnExceptions(value: boolean) {
            this.CheckSealed();
            this._ValidatesOnExceptions = value;
        }
        
        get ValidatesOnDataErrors(): boolean { return this._ValidatesOnDataErrors; }
        set ValidatesOnDataErrors(value: boolean) {
            this.CheckSealed();
            this._ValidatesOnDataErrors = value;
        }
        
        get ValidatesOnNotifyDataErrors(): boolean { return this._ValidatesOnNotifyDataErrors; }
        set ValidatesOnNotifyDataErrors(value: boolean) {
            this.CheckSealed();
            this._ValidatesOnNotifyDataErrors = value;
        }

    }
    Nullstone.RegisterType(Binding, "Binding");
}