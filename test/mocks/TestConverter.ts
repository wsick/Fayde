class TestConverter implements Fayde.Data.IValueConverter {
    Convert(value: any, targetType: IType, parameter: any, culture: any): any {
        return value;
    }
    ConvertBack(value: any, targetType: IType, parameter: any, culture: any): any {
        return value;
    }
}
Fayde.RegisterType(TestConverter, "window", "http://schemas.test.com");
Fayde.RegisterTypeInterfaces(TestConverter, Fayde.Data.IValueConverter_); 