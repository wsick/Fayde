/// <reference path="../Runtime/TypeManagement.ts" />

module Fayde.Data {
    export interface IValueConverter {
        Convert(value: any, targetType: IType, parameter: any, culture: any): any;
        ConvertBack(value: any, targetType: IType, parameter: any, culture: any): any;
    }
    export var IValueConverter_ = Fayde.RegisterInterface("IValueConverter");

    export class Binding implements Xaml.IMarkup {
        private _IsSealed: boolean = false;
        
        private _StringFormat: string = undefined;
        private _FallbackValue: any = undefined;
        private _TargetNullValue: any = undefined;

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

        constructor(path?: string) {
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

        get StringFormat(): string { return this._StringFormat; }
        set StringFormat(value: string) {
            this.CheckSealed();
            this._StringFormat = value;
        }

        get FallbackValue(): any { return this._FallbackValue; }
        set FallbackValue(value: any) {
            this.CheckSealed();
            this._FallbackValue = value;
        }

        get TargetNullValue():any { return this._TargetNullValue; }
        set TargetNullValue(value: any) {
            this.CheckSealed();
            this._TargetNullValue = value;
        }

        private CheckSealed() {
            if (this._IsSealed)
                throw new InvalidOperationException("The Binding cannot be changed after it has been used.");
        }

        Seal() { this._IsSealed = true; }
        
        Transmute(ctx: Xaml.ITransmuteContext): Expression {
            return new Data.BindingExpression(this, ctx.Owner, ctx.Property);
        }
    }
    Fayde.RegisterType(Binding, {
    	Name: "Binding",
    	Namespace: "Fayde.Data",
    	XmlNamespace: Fayde.XMLNS
    });
}