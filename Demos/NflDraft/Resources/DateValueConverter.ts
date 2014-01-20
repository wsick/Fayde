/// <reference path="../scripts/Fayde.d.ts" />

class DateValueConverter implements Fayde.Data.IValueConverter {
    Convert(value: any, targetType: IType, parameter: any, culture: any): any {
        if (value === undefined) return null;
        return value.getMonth() + "/" + value.getDate() + "/" + value.getFullYear();
    }
    ConvertBack(value: any, targetType: IType, parameter: any, culture: any): any {
        throw NotImplemented("This ValueConverter only does conversion. It cannot convert back.");
    }
}
Fayde.RegisterTypeInterfaces(DateValueConverter, Fayde.Data.IValueConverter_);
export = DateValueConverter;