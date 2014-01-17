/// <reference path="../scripts/Fayde.d.ts" />

module NflDraft.Resources {
    export class DoubleValueConverter implements Fayde.Data.IValueConverter {
        Convert(value: any, targetType: IType, parameter: any, culture: any): any {
            if (value === undefined) return null;
            return value.toFixed(2);
        }
        ConvertBack(value: any, targetType: IType, parameter: any, culture: any): any {
            throw NotImplemented("This ValueConverter only does conversion. It cannot convert back.");
        }
    }
    Fayde.RegisterType(DoubleValueConverter, "NflDraft.Resources", "folder:Resources");
    Fayde.RegisterTypeInterfaces(DoubleValueConverter, Fayde.Data.IValueConverter_);
}