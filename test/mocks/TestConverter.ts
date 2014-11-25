class TestConverter implements Fayde.Data.IValueConverter {
    Convert(value: any, targetType: IType, parameter: any, culture: any): any {
        return value;
    }
    ConvertBack(value: any, targetType: IType, parameter: any, culture: any): any {
        return value;
    }
}
nullstone.addTypeInterfaces(TestConverter, Fayde.Data.IValueConverter_);
export = TestConverter;