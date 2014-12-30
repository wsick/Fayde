class NumberConverter implements Fayde.Data.IValueConverter {
    Minimum = 0;
    Maximum = 100;

    Convert (value: any, targetType: IType, parameter: any, culture: any): any {
        return value.toString();
    }

    ConvertBack (value: any, targetType: IType, parameter: any, culture: any): any {
        var min = parseFloat(this.Minimum.toString());
        var max = parseFloat(this.Maximum.toString());
        var num = parseFloat(value);
        num = Math.min(Math.max(value, min), max);
        return num;
    }
}
Fayde.Data.IValueConverter_.mark(NumberConverter);
export = NumberConverter;