/// <reference path="../lib/Fayde/Fayde.d.ts" />

class StatVisibilityValueConverter implements Fayde.Data.IValueConverter {
    Convert(value: any, targetType: IType, parameter: any, culture: any): any {        
        switch (value.PrimaryPosition)
        {
            case "QB":
                if (parameter == "Passing" || parameter == "Rushing") return "Visible";
                break;
            case "RB":
                if (parameter == "Rushing" || parameter == "Receiving") return "Visible";
                break;
            case "WR":
                if (parameter == "Receiving" || parameter == "Rushing") return "Visible";
                break;
            case "TE":
                if (parameter == "Receiving" || parameter == "Rushing") return "Visible";
                break;                
        }
        return "Collapsed";
    }
    ConvertBack(value: any, targetType: IType, parameter: any, culture: any): any {
        throw NotImplemented("This ValueConverter only does conversion. It cannot convert back.");
    }
}
Fayde.RegisterTypeInterfaces(StatVisibilityValueConverter, Fayde.Data.IValueConverter_);
export = StatVisibilityValueConverter;