class AngleConverter implements Fayde.Data.IValueConverter {
    Convert (value: any, targetType: IType, parameter: any, culture: any): any {
        return value.toString();
    }

    ConvertBack (value: any, targetType: IType, parameter: any, culture: any): any {
        var num = Math.abs(parseFloat(value));
        num = num % 360;
        return num;
    }
}
Fayde.Data.IValueConverter_.mark(AngleConverter);
export = AngleConverter;