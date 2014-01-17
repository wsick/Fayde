/// <reference path="../scripts/Fayde.d.ts" />

module NflDraft.Resources {
    export class AgeValueConverter implements Fayde.Data.IValueConverter {
        Convert(value: any, targetType: IType, parameter: any, culture: any): any {
            if (value === undefined) return null;
            var today = new Date();
            var age = today.getFullYear() - value.getFullYear();
            if (today.getMonth() < value.getMonth())
                age--;
            if (value.getMonth() - 1 == today.getMonth() && today.getDate() < value.getDate())
                age--;
            return age;
        }
        ConvertBack(value: any, targetType: IType, parameter: any, culture: any): any {
            throw NotImplemented("This ValueConverter only does conversion. It cannot convert back.");
        }
    }
    Fayde.RegisterType(AgeValueConverter, "NflDraft.Resources", "folder:Resources");
    Fayde.RegisterTypeInterfaces(AgeValueConverter, Fayde.Data.IValueConverter_);
}